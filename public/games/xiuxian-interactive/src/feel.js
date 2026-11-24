(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./feedback.js'):root.XiuxianEngine;
  const Combat=node?require('./combat.js'):root.XiuxianCombat;
  class Game extends Base.Game{
    constructor(options={}){super(options);this.resetFeel();this.hitPauseEnabled=true;}
    resetFeel(){this.combo=0;this.comboLife=0;this.swingIndex=0;this.parryWindow=0;this.parryCd=0;this.guardHeld=false;this.riposte=0;this.hitStop=0;this.attackBuffer=null;this.dodgeBuffer=null;this.incomingEnemy=null;this.swingActive=false;this.warningGap=0;this.enemyRecovery=new WeakMap();}
    resetTransient(){super.resetTransient();this.resetFeel();}
    cancelInputs(){this.attackBuffer=null;this.dodgeBuffer=null;this.parryWindow=0;this.guardHeld=false;}
    canFight(){return this.state.hp>0&&!this.isChild()&&(!this.state.run||this.state.run.phase==='active')&&!this.inCase();}
    requestAttack(target){
      if(this.attack(target))return true;
      if(this.canFight()&&((this.attackCd>0&&this.attackCd<=.14)||(this.dash>0&&this.dash<=.14)))this.attackBuffer={target:target?{x:target.x,y:target.y}:null,life:.14};
      return false;
    }
    requestDodge(vector){
      if(this.dodge(vector))return true;
      if(this.canFight()&&this.dashCd>0&&this.dashCd<=.14)this.dodgeBuffer={vector:{...vector},life:.14};
      return false;
    }
    attack(target){
      if(!this.canFight())return super.attack(target);
      if(this.attackCd>0||this.dash>0)return false;
      const s=this.state,dx=(target?.x??s.x+this.face.x*100)-s.x,dy=(target?.y??s.y+this.face.y*100)-s.y,len=Math.hypot(dx,dy)||1;
      // A narrow assist cone still requires the player to aim; it never targets behind them.
      const near=this.activeEnemies().filter(e=>e.hp>0&&Math.hypot(e.x-s.x,e.y-s.y)<110&&((e.x-s.x)*dx+(e.y-s.y)*dy)/(Math.hypot(e.x-s.x,e.y-s.y)*len||1)>.94).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];
      this.swingIndex=this.comboLife>0?this.combo%3+1:1;this.swingHit=false;this.swingActive=true;
      if(near){target={x:near.x,y:near.y};const d=Math.hypot(near.x-s.x,near.y-s.y)||1;if(d>58)this.move(s,(near.x-s.x)/d*10,(near.y-s.y)/d*10);}
      let ok;try{ok=super.attack(target);}finally{this.swingActive=false;}
      if(ok){this.attackCd=[.3,.34,.48][this.swingIndex-1];this.combo=this.swingHit?this.swingIndex:0;this.comboLife=this.swingHit?.9:0;this.attackBuffer=null;}
      return ok;
    }
    dodge(vector=this.face){const ok=super.dodge(vector);if(ok){this.attackBuffer=null;this.dodgeBuffer=null;this.parryWindow=0;this.feedback.swing=0;}return ok;}
    hitEnemy(e,amount){
      const blade=this.swingActive&&this.hitSource==='blade',hp=e.hp;
      if(blade){if(this.swingIndex===3)amount+=8;if(this.riposte>0){amount+=12;this.riposte=0;this.effect('riposte',e.x,e.y-35,{life:.35});}}
      super.hitEnemy(e,amount);
      if(blade&&e.hp<hp){this.swingHit=true;this.hitStop=Math.max(this.hitStop,this.swingIndex===3?.055:.032);if(this.swingIndex===3)this.effect('finisher',e.x,e.y-25,{life:.3,angle:Math.atan2(this.face.y,this.face.x)});}
    }
    recoveryFor(e){return this.enemyRecovery?.get(e)||0;}
    move(actor,dx,dy,radius){if(actor!==this.state&&this.recoveryFor(actor)>0)return;return super.move(actor,dx,dy,radius);}
    enemyStep(e,dt){
      const old=this.incomingEnemy,wind=e.wind,weak=e.weak||0,map=this.state.map,run=this.state.run;
      this.enemyRecovery.set(e,Math.max(0,this.recoveryFor(e)-dt));
      // Stagger new wind-ups; already visible attacks keep their original target and timing.
      if(e.kind!=='lesson'&&e.wind<=0&&(this.warningGap>0||this.recoveryFor(e)>0))e.cooldown=Math.max(e.cooldown,dt+.04);
      this.incomingEnemy=e;try{super.enemyStep(e,dt);}finally{this.incomingEnemy=old;}
      if(e.hp<=0||map!==this.state.map||run!==this.state.run||!this.activeEnemies().includes(e))return;
      if(wind<=0&&e.wind>0){e.wind*=this.relaxed?1.35:1;Combat.warningDurations.set(e,e.wind);}
      if(e.kind!=='lesson'&&wind<=0&&e.wind>0){this.warningGap=.36;this.sound('warning',.55);}
      if(e.kind!=='lesson'&&wind>0&&wind<=dt&&e.wind<=0&&(e.weak||0)<=weak)this.enemyRecovery.set(e,['wang','keeper'].includes(e.kind)?.46:.32);
      if(e.parried){this.enemyRecovery.set(e,Math.max(this.recoveryFor(e),.65));e.cooldown=Math.max(e.cooldown,.7);delete e.parried;}
    }
    takeDamage(amount){
      const e=this.incomingEnemy,perfect=e&&e.kind!=='lesson'&&this.guard&&this.parryWindow>0&&this.dash<=0&&this.hurtCd<=0&&this.state.hp>0&&this.state.mp>=8;
      if(!perfect)return super.takeDamage(amount);
      this.parryWindow=0;super.takeDamage(0);this.restoreSpirit(Math.min(100,this.state.mp+4));this.riposte=2;this.hitStop=.06;e.parried=true;
      this.effect('perfectGuard',this.state.x,this.state.y-35,{life:.5});this.sound('block',1);this.message('精准格挡 · 2 秒内下一剑额外 +12。');
    }
    effect(kind,x,y,extra={}){if(kind==='number'&&extra.text==='-0')return;if(kind==='slash'&&this.swingActive)extra={...extra,combo:this.swingIndex};return super.effect(kind,x,y,extra);}
    step(dt,input={}){
      dt=Math.max(0,Math.min(.04,dt));
      if(this.hitPauseEnabled&&this.hitStop>0){const n=Math.min(dt,this.hitStop);this.hitStop-=n;dt-=n;if(!dt)return;}else this.hitStop=0;
      for(const key of ['comboLife','parryWindow','parryCd','riposte','warningGap'])this[key]=Math.max(0,this[key]-dt);
      if(this.comboLife<=0)this.combo=0;
      const guard=!!input.guard;if(guard&&!this.guardHeld&&this.parryCd<=0&&this.dash<=0&&this.canFight()){this.parryWindow=.16;this.parryCd=.6;}if(!guard)this.parryWindow=0;this.guardHeld=guard;
      const map=this.state.map,run=this.state.run;super.step(dt,input);
      if(map!==this.state.map||run!==this.state.run||this.state.hp<=0){this.resetFeel();return;}
      const d=this.dodgeBuffer;if(d){d.life-=dt;if(d.life<0)this.dodgeBuffer=null;else if(this.dashCd<=0)this.dodge(d.vector);}
      const a=this.attackBuffer;if(a){a.life-=dt;if(a.life<0)this.attackBuffer=null;else if(this.attackCd<=0&&this.dash<=0)this.attack(a.target);}
    }
  }
  const api={...Base,Game};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
