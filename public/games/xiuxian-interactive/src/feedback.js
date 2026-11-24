(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./tomb.js'):root.XiuxianEngine;
  class Game extends Base.Game{
    constructor(options={}){super(options);this.feedback={swing:0,cast:0,hurt:0,block:0,shake:0,stride:0};this.reactions=new Map();this.enemyMotion=new Map();this.fallen=[];}
    motionFor(e){if(!this.enemyMotion.has(e))this.enemyMotion.set(e,{strike:0,hurt:0,walk:0,flip:false,mode:e.mode});return this.enemyMotion.get(e);}
    resetTransient(){super.resetTransient();this.enemyMotion?.clear();this.reactions?.clear();this.fallen=[];}
    enemyStep(e,dt){
      const before={map:this.state.map,wind:e.wind,weak:e.weak||0,x:e.x,y:e.y};super.enemyStep(e,dt);
      if(this.state.map!==before.map||e.hp<=0||!this.activeEnemies().includes(e))return;
      const m=this.motionFor(e);m.walk=Math.hypot(e.x-before.x,e.y-before.y);
      if(e.wind>0){m.flip=e.targetX<e.x;m.mode=e.mode;}
      else if(m.walk>.01&&m.strike<=0)m.flip=e.x<before.x;
      if(before.wind>0&&before.wind<=dt&&e.wind<=0&&(e.weak||0)<=before.weak){m.strike=.28;m.mode=e.mode;}
    }
    sound(name,volume=1){this.events.push({type:'sound',name,volume});}
    effect(kind,x,y,extra={}){
      super.effect(kind,x,y,extra);if(!this.feedback)return;
      const sound={slash:'sword',dash:'dash',fire:'fire',needle:'needle',heal:'heal',ascend:'breakthrough',attune:'ward',foxAssist:'fox',farewell:'fox',impact:'impact',resonance:'ward'}[kind];if(sound)this.sound(sound);
      if(kind==='slash'&&Math.hypot(x-this.state.x,y-this.state.y)<40)this.feedback.swing=.24;
      if(['fire','needle','heal','resonance'].includes(kind))this.feedback.cast=.32;
      if(kind==='ascend')this.feedback.shake=.14;
    }
    hitEnemy(e,amount){
      const before=e.hp,hits=this.state.chapter.swordHits,wind=e.wind;super.hitEnemy(e,amount);
      if(e.hp<before||this.state.chapter.swordHits>hits){
        const m=this.motionFor(e);m.hurt=.18;if(wind>0&&e.wind<=0&&e.weak>0)m.strike=0;
        this.reactions.set(e,.13);this.effect('contact',e.x,e.y-28,{life:.15,source:this.hitSource});this.sound('hit',this.hitSource==='blade'?1:.55);
        if(before>0&&e.hp<=0&&e.kind!=='wang'){this.fallen.push({enemy:{...e},flip:m.flip,age:0,life:1.15});if(this.fallen.length>16)this.fallen.shift();}
      }
    }
    takeDamage(amount){
      const old=this.hurtCd,hp=this.state.hp,map=this.state.map,blocks=this.state.chapter.blocks,wasGuard=this.guard&&this.state.mp>=8;
      super.takeDamage(amount);
      if(this.hurtCd>old||this.state.hp<hp||map!==this.state.map||this.state.chapter.blocks>blocks){
        if(wasGuard){this.feedback.block=.18;this.sound('block');this.effect('parry',this.state.x,this.state.y-35,{life:.16});}
        else{this.feedback.hurt=.2;this.feedback.shake=.16;this.sound('hurt');}
      }
    }
    useItem(id,target){const ok=super.useItem(id,target);if(ok&&['ward','incense'].includes(id)){this.feedback.cast=.3;this.sound(id==='ward'?'ward':'pickup');}return ok;}
    gain(id,n){super.gain(id,n);if(this.feedback&&n>0)this.sound('pickup',.55);}
    craft(id){const ok=super.craft(id);if(ok)this.sound('craft');return ok;}
    claimBossRelic(id){const ok=super.claimBossRelic(id);if(ok)this.sound('loot');return ok;}
    reportChapter(focus){const ok=super.reportChapter(focus);if(ok)this.sound('complete');return ok;}
    step(dt,input={}){
      dt=Math.max(0,Math.min(.04,dt));for(const k of ['swing','cast','hurt','block','shake'])this.feedback[k]=Math.max(0,this.feedback[k]-dt);
      for(const [e,n] of this.reactions){if(n>dt)this.reactions.set(e,n-dt);else this.reactions.delete(e);}
      for(const m of this.enemyMotion.values()){m.strike=Math.max(0,m.strike-dt);m.hurt=Math.max(0,m.hurt-dt);m.walk=0;}
      for(const f of this.fallen)f.age+=dt;this.fallen=this.fallen.filter(f=>f.age<f.life);
      const before={x:this.state.x,y:this.state.y,map:this.state.map,dash:this.dash};super.step(dt,input);
      const d=Math.hypot(this.state.x-before.x,this.state.y-before.y);
      if(this.state.map!==before.map){this.reactions.clear();this.enemyMotion.clear();this.fallen=[];for(const k of Object.keys(this.feedback))this.feedback[k]=0;}
      else if(this.moving&&this.dash<=0&&before.dash<=0&&d<20){this.feedback.stride+=d;if(this.feedback.stride>63){this.feedback.stride%=63;this.sound(this.state.map==='temple'?'stepRain':['garden','forest','bamboo','valley'].includes(this.state.map)?'stepGrass':'stepStone',input.sneak?.3:.6);}}
      const active=this.activeEnemies();for(const e of this.enemyMotion.keys())if(!active.includes(e))this.enemyMotion.delete(e);
    }
  }
  const api={...Base,Game};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
