(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./feel.js'):root.XiuxianEngine,R=node?require('./expedition-data.js'):root.XiuxianExpeditionData;
  class Game extends Base.Game{
    constructor(options={}){super(options);this.resonanceCooldown=0;this.frostSpent=false;}
    resetTransient(){super.resetTransient();this.resonanceCooldown=0;this.frostSpent=false;}
    buildPaths(){if(!this.canUseSpiritualPower())return new Set();return new Set([...this.equipped().flatMap(g=>[R.relics[g.base].path,g.memory].filter(Boolean)),...(this.state.run?.boons||[])]);}
    resonances(){const p=this.buildPaths();return Object.keys(R.resonances).filter(id=>R.resonances[id].paths.every(x=>p.has(x)));}
    useItem(id,target){const r=this.state.run,ok=super.useItem(id,target);if(ok&&r&&Object.hasOwn(r.report.used,id))r.report.used[id]++;return ok;}
    attack(target){if(this.attackCd<=0)this.frostSpent=false;return super.attack(target);}
    hitEnemy(e,amount){
      const r=this.state.run,hp=e.hp,active=this.resonances(),frost=this.swingActive&&this.hitSource==='blade'&&this.swingIndex===3&&e.slow>0&&!this.frostSpent&&active.includes('frostblade'),fire=this.hitSource==='fire'||e.burn>0;
      if(frost){amount+=12;this.frostSpent=true;}
      super.hitEnemy(e,amount);
      if(frost&&e.hp<hp){for(const other of this.activeEnemies())if(other.hp>0&&Math.hypot(other.x-e.x,other.y-e.y)<140)other.slow=Math.max(other.slow,2);this.effect('frostResonance',e.x,e.y-25,{life:.55});}
      if(r&&r===this.state.run&&hp>0&&e.hp<=0&&fire&&active.includes('emberherb')&&r.supplyRefunds<2){r.supplyRefunds++;this.gain('fire',1);this.restoreSpirit(Math.min(100,this.state.mp+6));this.effect('emberResonance',this.state.x,this.state.y-35,{life:.6});this.message('借火生息 · 回补火符，本间 '+r.supplyRefunds+'/2。');this.checkpoint();}
    }
    takeDamage(amount){
      const r=this.state.run,old=this.hurtCd,guarded=this.guard&&this.state.mp>=8&&this.dash<=0&&this.hurtCd<=0&&this.state.hp>0;
      super.takeDamage(amount);
      if(guarded&&this.hurtCd>old&&this.state.hp>0&&r===this.state.run&&this.resonanceCooldown<=0&&this.lure&&Math.hypot(this.lure.x-this.state.x,this.lure.y-this.state.y)<180&&this.resonances().includes('scentward')){this.restoreSpirit(Math.min(100,this.state.mp+6));this.ward=Math.max(this.ward,1.5);this.resonanceCooldown=3;this.effect('scentResonance',this.state.x,this.state.y-35,{life:.6});}
    }
    step(dt,input={}){const before=this.state.playTime;super.step(dt,input);this.resonanceCooldown=Math.max(0,this.resonanceCooldown-(this.state.playTime-before));}
  }
  const api={...Base,Game};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
