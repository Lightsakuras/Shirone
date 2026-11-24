(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./workshop.js'):root.XiuxianEngine;
  const D=node?require('./provisions-data.js'):root.XiuxianProvisionsData,Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),empty=()=>({seen:false,prepared:null}),known=id=>typeof id==='string'&&Object.hasOwn(D.kits,id);
  const shape=(value,keys)=>value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===keys.length&&keys.every(k=>Object.hasOwn(value,k));
  function checkPrepared(value){
    if(!shape(value,['seen','prepared'])||typeof value.seen!=='boolean'||value.prepared!==null&&!known(value.prepared)||value.prepared!==null&&!value.seen)throw Error('药庐合备记录异常。');
    return {seen:value.seen,prepared:value.prepared};
  }
  function checkRunProvision(value){
    if(value===undefined||value===null)return null;
    if(!shape(value,['id','used'])||!known(value.id)||typeof value.used!=='boolean'||value.id==='scholar'&&!value.used)throw Error('本局合备记录异常。');
    return {id:value.id,used:value.used};
  }
  function validateSave(value){
    const s=Base.validateSave(value);
    s.provisions=value.provisions===undefined?empty():checkPrepared(value.provisions);
    if(s.run)s.run.provision=checkRunProvision(value.run.provision);
    if(s.lastRun)s.lastRun.provision=checkRunProvision(value.lastRun.provision);
    if(s.run&&s.provisions.prepared!==null)throw Error('已入阵时不能同时保留未携入的合备。');
    if((s.run?.provision||s.lastRun?.provision)&&!s.provisions.seen)throw Error('本局合备缺少已合备记录。');
    const projection=Object.create(Base.Game.prototype);projection.state=s;
    if(s.provisions.seen&&(projection.isChild()||!s.flags.complete||!s.collection.shared.length))throw Error('合备缺少成年取匣与分享札记的经历。');
    for(const id of [s.provisions.prepared,s.run?.provision?.id,s.lastRun?.provision?.id])if(id&&!projection.learned(id))throw Error('合备所需专长尚未习得。');
    const ward=s.buffs.ward;
    if(ward>D.baseWardSeconds&&(s.run?.phase!=='active'||s.run.provision?.id!=='sword'||!s.run.provision.used||ward>D.baseWardSeconds+D.kits.sword.effect.wardSeconds))throw Error('延长护身缺少已生效的本局剑庐合备。');
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;super(save?{...options,save}:options);
      // Ancestors rebuild their state shapes; restore only this layer's validated additions.
      this.state.provisions=save?copy(save.provisions):empty();
      if(this.state.run)this.state.run.provision=save?copy(save.run.provision):null;
      if(this.state.lastRun)this.state.lastRun.provision=save?copy(save.lastRun.provision):null;
    }
    provisionUnlocked(){return !this.isChild()&&this.state.flags.complete&&this.state.collection.shared.length>0;}
    provisionReason(){
      if(!this.provisionUnlocked())return '成年后完成药庐取匣，并与沈灵薇分享至少一篇旧阵札记，即可一起合备。';
      return this.loadoutReason().replace(/整理配装方案|保存、套用或删除方案|整理配装/g,'整理合备');
    }
    prepareProvisionReason(id){
      if(!known(id))return '没有这份合备方。';
      const reason=this.provisionReason();if(reason)return reason;
      if(this.state.provisions.prepared!==null)return '已有一份合备，入阵携走或先完整拆回材料，再准备另一份。';
      if(!this.learned(id))return '尚未学会这门专长；可凭成长经历，或在旧阵旁修习得。';
      if(Object.entries(D.kits[id].cost).some(([key,n])=>this.state.inventory[key]<n))return '材料不足，备齐本份全部用料后再合备。';
      return '';
    }
    unpackProvisionReason(){
      const reason=this.provisionReason();if(reason)return reason;
      const id=this.state.provisions.prepared;if(!known(id))return '尚无待携入旧阵的合备。';
      const full=Object.entries(D.kits[id].cost).find(([key,n])=>this.state.inventory[key]+n>D.itemLimit);
      return full?Items.items[full[0]].name+'余量不足，无法完整拆回；材料会继续留在合备中。':'';
    }
    provisionStatus(){
      const s=this.state.provisions;
      return {unlocked:this.provisionUnlocked(),reason:this.provisionReason(),prepared:s.prepared,seen:s.seen,unpackReason:this.unpackProvisionReason(),kits:Object.entries(D.kits).map(([id,kit])=>{const reason=this.prepareProvisionReason(id);return {id,name:kit.name,desc:kit.desc,cost:copy(kit.cost),available:!reason,reason};})};
    }
    prepareProvision(id){
      const reason=this.prepareProvisionReason(id);if(reason){this.message(reason);return false;}
      for(const [item,n]of Object.entries(D.kits[id].cost))this.state.inventory[item]-=n;
      this.state.provisions={seen:true,prepared:id};this.message('与沈灵薇备好'+D.kits[id].name+'，下次入阵时携上。');this.checkpoint();return true;
    }
    unpackProvision(){
      const reason=this.unpackProvisionReason();if(reason){this.message(reason);return false;}
      const id=this.state.provisions.prepared;
      for(const [item,n]of Object.entries(D.kits[id].cost))this.state.inventory[item]+=n;
      this.state.provisions.prepared=null;this.message('已拆回'+D.kits[id].name+'的全部材料。');this.checkpoint();return true;
    }
    activeProvision(){
      const p=this.state.run?.provision;if(!p)return null;
      const kit=D.kits[p.id];return {id:p.id,name:kit.name,desc:kit.desc,used:p.used};
    }
    startRun(seed,seek=null){
      const prepared=this.state.provisions.prepared,ok=super.startRun(seed,seek);if(!ok)return false;
      const r=this.state.run;r.provision=prepared?{id:prepared,used:prepared==='scholar'}:null;
      if(prepared){
        this.state.provisions.prepared=null;
        if(prepared==='scholar')r.redraws=Math.min(D.redrawLimit,r.redraws+D.kits.scholar.effect.redraws);
        this.message(D.kits[prepared].name+'已携入旧阵'+(prepared==='scholar'?'，重观机会增加。':'。'));this.checkpoint();
      }
      return true;
    }
    useItem(id,target){
      const r=this.state.run,p=r?.provision,before=this.state.inventory[id],ok=super.useItem(id,target);
      if(!ok||!p||p.used||r!==this.state.run||r.phase!=='active'||this.state.hp<=0||!(this.state.inventory[id]<before))return ok;
      if(p.id==='sword'&&id==='ward')this.ward+=D.kits.sword.effect.wardSeconds;
      else if(p.id==='medicine'&&['potion','tea','cake'].includes(id)){
        const e=D.kits.medicine.effect;this.state.hp=Math.min(D.resourceLimit,this.state.hp+e.hp);this.restoreSpirit(Math.min(D.resourceLimit,this.state.mp+e.mp));
      }else return ok;
      p.used=true;this.message(D.kits[p.id].name+'发挥了作用，本局这一份合备已用过。');this.checkpoint();return ok;
    }
    finishRun(result){
      const provision=copy(this.state.run?.provision??null),ok=super.finishRun(result);
      if(ok&&this.state.lastRun)this.state.lastRun.provision=provision;
      return ok;
    }
  }
  const api={...Base,Game,validateSave,provisions:D};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
