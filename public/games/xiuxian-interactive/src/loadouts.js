(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./encounters.js'):root.XiuxianEngine;
  const names=['方案一','方案二','方案三'],empty=()=>[null,null,null],copy=x=>JSON.parse(JSON.stringify(x));
  const validSlot=i=>Number.isInteger(i)&&i>=0&&i<names.length;
  function checkPreset(p,s){
    if(!p||typeof p!=='object'||Array.isArray(p)||Object.keys(p).length!==3||!['gear','skill','stance'].every(k=>Object.hasOwn(p,k)))throw Error('配装方案格式异常。');
    if(!Array.isArray(p.gear)||p.gear.length>3||Array.from(p.gear).some(id=>typeof id!=='string')||new Set(p.gear).size!==p.gear.length)throw Error('配装方案法宝记录异常。');
    const gear=p.gear.map(id=>s.collection.gear.find(g=>g.id===id));
    if(gear.some(g=>!g))throw Error('配装方案包含尚未获得的法宝。');
    if(new Set(gear.map(g=>g.base)).size!==gear.length)throw Error('配装方案不能重复装备同名法宝。');
    if(p.skill!==null&&(typeof p.skill!=='string'||!s.chapter.quests.includes(p.skill)))throw Error('配装方案包含尚未习得的功法。');
    if(typeof p.stance!=='string'||!Object.hasOwn(Base.stances,p.stance))throw Error('配装方案御敌方式异常。');
    return {gear:[...p.gear],skill:p.skill,stance:p.stance};
  }
  function validateSave(value){
    const s=Base.validateSave(value);
    if(value.loadouts===undefined)s.loadouts=empty();
    else{
      if(!Array.isArray(value.loadouts)||value.loadouts.length!==3)throw Error('配装方案数量异常。');
      s.loadouts=Array.from(value.loadouts,p=>p===null?null:checkPreset(p,s));
    }
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){const save=options.save?validateSave(options.save):null;super(save?{...options,save}:options);this.state.loadouts=save?copy(save.loadouts):empty();}
    loadoutReason(){
      if(this.isChild())return '成年入山后，可在药庐整理配装方案。';
      if(this.state.hp<=0)return '先回山调息，再整理配装。';
      if(this.state.run||this.state.map!=='garden')return '回到药庐、结束本局后，才能保存、套用或删除方案。';
      if(this.state.chapter.training||this.activeEnemies().some(e=>e.hp>0)||this.state.chapter.tomb.stage==='battle')return '先结束当前试炼或战斗，再整理配装。';
      if(this.events.some(e=>['dialogue','chapter','story','expedition','expeditionEnd','complete','defeat'].includes(e.type)))return '先处理当前剧情或结算，再整理配装。';
      return '';
    }
    currentLoadout(){return {gear:[...this.state.collection.equipped],skill:this.state.chapter.skill,stance:this.stance()};}
    loadoutPreview(slot){
      if(!validSlot(slot))return {reason:'配装方案位置异常。'};
      const p=this.state.loadouts[slot];if(!p)return {empty:true,reason:this.loadoutReason()};
      let checked;try{checked=checkPreset(p,this.state);}catch(e){return {reason:e.message,invalid:true};}
      const gear=checked.gear.map(id=>this.state.collection.gear.find(g=>g.id===id));
      // Project only equipped(); reuse the actual buildPaths/resonances methods without mutating state.
      const projection=Object.create(this);projection.equipped=()=>gear;
      const active=projection.resonances(),now=this.resonances(),current=this.currentLoadout();
      return {...checked,gear:gear.map(copy),active,added:active.filter(id=>!now.includes(id)),lost:now.filter(id=>!active.includes(id)),same:checked.skill===current.skill&&checked.stance===current.stance&&checked.gear.length===current.gear.length&&checked.gear.every(id=>current.gear.includes(id)),reason:this.loadoutReason()};
    }
    saveLoadout(slot){
      const reason=this.loadoutReason();if(reason||!validSlot(slot)){this.message(reason||'配装方案位置异常。');return false;}
      let p;try{p=checkPreset(this.currentLoadout(),this.state);}catch(e){this.message(e.message);return false;}
      this.state.loadouts[slot]=p;this.message(names[slot]+'已记下当前法宝、功法与御敌方式。');this.checkpoint();return true;
    }
    applyLoadout(slot){
      const reason=this.loadoutReason();if(reason||!validSlot(slot)){this.message(reason||'配装方案位置异常。');return false;}
      const p=this.state.loadouts[slot];if(!p){this.message('这个位置还没有配装方案。');return false;}
      let next;try{next=checkPreset(p,this.state);}catch(e){this.message(e.message);return false;}
      // All checks precede the atomic state change; inventory, gear growth and shared cooldown remain intact.
      this.state.collection.equipped=next.gear;
      this.state.chapter.skill=next.skill;
      this.state.battlePlan={stance:next.stance};
      this.counter=0;this.afterDash=0;this.strikes=0;
      this.guard=false;this.autoGuard=false;this.cancelInputs();this.commandTarget=null;
      this.message('已套用'+names[slot]+'，功法调息继续保留。');this.checkpoint();return true;
    }
    deleteLoadout(slot){
      const reason=this.loadoutReason();if(reason||!validSlot(slot)){this.message(reason||'配装方案位置异常。');return false;}
      if(!this.state.loadouts[slot])return false;
      this.state.loadouts[slot]=null;this.message('已清空'+names[slot]+'；法宝与功法仍然保留。');this.checkpoint();return true;
    }
  }
  const api={...Base,Game,validateSave,loadoutNames:names};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
