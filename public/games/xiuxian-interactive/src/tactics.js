(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./delve.js'):root.XiuxianEngine;
  const C=node?require('./chapter-data.js'):root.XiuxianChapterData,D=node?require('./data.js'):root.XiuxianData;
  const stances={advance:{name:'迎敌',desc:'接近附近可直达的敌人，自主出剑；移动指令优先。'},guard:{name:'守势',desc:'原地御敌并持续格挡；格挡消耗灵力，不自动精准格挡。'},quiet:{name:'收势',desc:'停止自主攻防，便于引香绕行；仍可手动出剑。'}};
  const ranks=[{blade:0,spell:0,defence:0,regen:0},{blade:4,spell:.1,defence:.04,regen:.4},{blade:8,spell:.2,defence:.08,regen:.8},{blade:12,spell:.3,defence:.12,regen:1.2},{blade:20,spell:.5,defence:.22,regen:2}];
  function validateSave(value){const s=Base.validateSave(value),stance=value.battlePlan?.stance??'advance';if(value.battlePlan!==undefined&&(!value.battlePlan||typeof value.battlePlan!=='object'||Array.isArray(value.battlePlan)||!Object.hasOwn(stances,stance)))throw Error('御敌方式记录异常。');s.battlePlan={stance};return s;}
  class Game extends Base.Game{
    constructor(options={}){const save=options.save?validateSave(options.save):null;super(save?{...options,save}:options);this.state.battlePlan=save?.battlePlan||{stance:'advance'};this.resetOrders();}
    resetOrders(){this.commandTarget=null;this.seals=new WeakMap();this.autoGuard=false;this.castingSkill=null;this.autoSwing=false;}
    resetTransient(){super.resetTransient();this.resetOrders();}
    combatProfile(){const rank=this.isChild()?0:this.state.chapter.rank,active=this.canUseSpiritualPower(),effective=active?rank:0;return {...ranks[effective],rank,regenTotal:active?4+ranks[effective].regen+this.affix('calm')*.4:0,name:this.isChild()||!active?'凡人':C.ranks[rank]};}
    stance(){return this.state.battlePlan?.stance||'advance';}
    move(actor,dx,dy,radius){if(actor===this.state&&this.autoSwing)return;return super.move(actor,dx,dy,radius);}
    setStance(id){if(!Object.hasOwn(stances,id))return false;this.state.battlePlan={stance:id};this.guard=false;this.autoGuard=false;this.cancelInputs();this.checkpoint();return true;}
    combatReady(){return this.canFight()&&!this.events.some(e=>['dialogue','chapter','story','expedition','expeditionEnd','complete','defeat'].includes(e.type));}
    objective(){if(this.state.chapter?.training)return ['守而后发','按 V 选守势接住两次试招，再选迎敌自动收势；也可手动格挡与出剑。'];return super.objective();}
    clearLine(a,b,radius=6){const d=Base.distance(a,b),steps=Math.max(1,Math.ceil(d/6));for(let i=1;i<steps;i++)if(this.collides(a.x+(b.x-a.x)*i/steps,a.y+(b.y-a.y)*i/steps,radius))return false;return true;}
    visibleEnemies(){return this.activeEnemies().filter(e=>e.hp>0).sort((a,b)=>Base.distance(this.state,a)-Base.distance(this.state,b));}
    selectedEnemy(){return this.activeEnemies().find(e=>e.hp>0&&e.id===this.commandTarget)||null;}
    selectEnemy(id){if(id===null){this.commandTarget=null;return true;}if(!this.activeEnemies().some(e=>e.hp>0&&e.id===id))return false;this.commandTarget=id;return true;}
    selectAt(point){if(!point)return false;const e=this.visibleEnemies().filter(e=>Base.distance(e,point)<48).sort((a,b)=>Base.distance(a,point)-Base.distance(b,point))[0];return e?this.selectEnemy(e.id):false;}
    sealFor(e){return this.seals?.get(e)||0;}
    healingAmount(){return this.canUseSpiritualPower()&&!this.isChild()?22+this.combatProfile().rank*2+this.memory('herb')*4:0;}
    skillInfo(id=this.state.chapter.skill){const def=C.skills[id];if(!def)return null;const p=this.combatProfile(),heal=this.healingAmount(),ward=Math.max(2,this.power('flask')),active=this.canUseSpiritualPower()&&!this.isChild();
      const detail=id==='sword'?'剑气 '+Math.round(38*(1+p.spell))+'；减速目标额外 '+Math.round(14*(1+p.spell))+'，护身 1.5 秒。':id==='scholar'?'定脉 '+Math.round(22*(1+p.spell))+'；减速 5 秒，6 秒内下一张火符或寒针额外 '+Math.round(18*(1+p.spell))+'。':active?'回气血 '+heal+'，清毒；护身 '+ward+' 秒。生息器忆、含露瓶可增益。':'当前不能运灵，回春不可施展。';return {...def,...(id==='medicine'?{healing:heal,desc:active?'恢复 '+heal+' 气血，清毒并护身；实际恢复不超过气血上限。':'当前不能运灵，回春不可施展。'}:{}),detail};}
    castSkill(){const id=this.state.chapter.skill,old=this.castingSkill;this.castingSkill=id;let ok;try{ok=super.castSkill();}finally{this.castingSkill=old;}if(ok&&id==='medicine')this.ward=Math.max(this.ward,this.power('flask'));return !!ok;}
    hitEnemy(e,amount){
      if(e.hp<=0)return;const source=this.hitSource,p=this.combatProfile();
      if((['blade','fire','needle'].includes(source)||this.castingSkill)&&!this.clearLine(this.state,e,2))return;
      if(e.kind!=='lesson'){
        if(source==='blade')amount+=p.blade-this.spiritualRank()*2;
        if(this.castingSkill||source==='fire'||source==='needle')amount*=1+p.spell;
        if(this.castingSkill==='sword'&&e.slow>0)amount+=14*(1+p.spell);
        if(['fire','needle'].includes(source)&&this.sealFor(e)>0){amount+=18*(1+p.spell);this.seals.delete(e);this.effect('attune',e.x,e.y,{life:.4});this.message('定脉接符 · 符力贯入气隙。');}
      }
      const hp=e.hp;super.hitEnemy(e,amount);if(this.castingSkill==='scholar'&&e.hp>0&&e.hp<hp)this.seals.set(e,6);
    }
    takeDamage(amount){if(this.autoGuard)this.parryWindow=0;if(this.incomingEnemy&&this.incomingEnemy.kind!=='lesson')amount*=1-this.combatProfile().defence;return super.takeDamage(amount);}
    orderCheck(order){
      if(!order||!this.canFight())return '此时无法御敌。';
      if(!this.canUseSpiritualPower()&&(order.type==='skill'||order.type==='item'&&['fire','needle','ward','incense'].includes(order.id)))return '凡人之身不能运灵施诀或催动符香。';
      if(order.type==='skill'){const info=this.skillInfo();if(!info)return '先完成一门经历，习得功法。';if(this.state.chapter.skillCd>0)return '功法仍在调息。';if(this.state.mp<info.cost)return '灵力不足。';return '';}
      if(order.type!=='item'||!['fire','needle','incense','potion','ward','tea','qingxin','cake'].includes(order.id))return '请选择可用指令。';
      if(this.state.inventory[order.id]<=0)return '行囊中已无此物。';
      if(['fire','needle','incense'].includes(order.id)){const e=this.activeEnemies().find(e=>e.hp>0&&e.id===order.target);if(!e)return '先选择仍在场的目标。';if(Base.distance(this.state,e)>250)return '目标超出施符距离，先接近再下令。';if(!this.clearLine(this.state,e,2))return '目标被障碍遮挡。';if(order.id==='incense'&&this.collides(e.x,e.y,5))return '目标脚下无法放香。';}
      if(['potion','tea'].includes(order.id)&&this.state.hp>=100&&(!this.canUseSpiritualPower()||this.state.mp>=100)||order.id==='cake'&&this.state.hp>=100)return '当前无需药食，先留在行囊。';
      if(order.id==='ward'&&this.ward>0)return '护身符仍在生效。';
      if(order.id==='qingxin'&&this.cleanAir>15&&!this.poison)return '清心散仍在护持。';return '';
    }
    executeOrder(order){const reason=this.orderCheck(order);if(reason){this.message(reason);return false;}if(order.type==='skill')return this.castSkill();const e=this.activeEnemies().find(e=>e.hp>0&&e.id===order.target);return this.useItem(order.id,e?{x:e.x,y:e.y}:undefined);}
    step(dt,input={}){
      const s=this.state,map=s.map,run=s.run,before=s.playTime,stance=this.stance();let target=null;
      const reach=this.canUseSpiritualPower()&&!s.chapter.training?this.arsenal?.range||0:0;
      const ready=this.combatReady(),manual=!!input.manual||!!input.guard||!!input.sneak;
      if(ready&&stance!=='quiet'&&!manual){target=this.selectedEnemy();if(target&&(Base.distance(s,target)>Math.max(320,reach)||!this.clearLine(s,target,16)))target=null;if(!target)target=this.visibleEnemies().find(e=>Base.distance(s,e)<Math.max(reach,260+(this.relaxed?18:0))&&this.clearLine(s,e,16))||null;}
      const orders={...input};this.autoGuard=!!(target&&stance==='guard'&&!input.guard);
      if(this.autoGuard)orders.guard=true;
      if(target&&stance==='advance'&&!input.x&&!input.y&&Base.distance(s,target)>Math.max(68,reach-14)){const d=Base.distance(s,target);orders.x=(target.x-s.x)/d;orders.y=(target.y-s.y)/d;orders.aim=target;}
      super.step(dt,orders);
      const elapsed=s.playTime-before;if(map!==s.map||run!==s.run||s.hp<=0){this.resetOrders();return;}
      for(const e of this.activeEnemies())if(this.sealFor(e)>0)this.seals.set(e,Math.max(0,this.sealFor(e)-elapsed));
      const fighting=this.activeEnemies().some(e=>e.hp>0&&(e.wind>0||Base.distance(s,e)<360))||this.poison>0;
      this.peaceTime=fighting?0:this.peaceTime+elapsed;
      this.recovering=this.relaxed&&this.peaceTime>=2.5&&!this.guard&&(s.hp<100||this.canUseSpiritualPower()&&s.mp<100);
      if(this.recovering){s.hp=Math.min(100,s.hp+18*elapsed);this.restoreSpirit(Math.min(100,s.mp+14*elapsed));}
      if(elapsed>0&&!this.recovering&&!this.guard&&!this.isChild())this.restoreSpirit(Math.min(100,s.mp+this.combatProfile().regen*elapsed));
      if(elapsed>0&&ready&&target&&this.combatReady()&&target.hp>0&&this.activeEnemies().includes(target)&&Base.distance(s,target)<Math.max(reach,88+(this.relaxed?18:0))&&this.clearLine(s,target,2)&&(!s.chapter.training||s.chapter.blocks>=2)){this.autoSwing=true;try{this.attack(target);}finally{this.autoSwing=false;}}
      if(this.commandTarget&&!this.selectedEnemy())this.commandTarget=null;
    }
  }
  const api={...Base,Game,validateSave,stances,combatRanks:ranks};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
