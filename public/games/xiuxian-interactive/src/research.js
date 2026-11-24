(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./loadouts.js'):root.XiuxianEngine;
  const D=node?require('./research-data.js'):root.XiuxianResearchData,Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),empty=()=>({observed:[],claimed:[]});
  const owns=(o,k)=>typeof k==='string'&&Object.hasOwn(o,k);
  function checkKeys(values,allowed,label){
    if(!Array.isArray(values)||values.length>Object.keys(allowed).length||Array.from(values).some(k=>!owns(allowed,k))||new Set(values).size!==values.length)throw Error('器物试录'+label+'记录异常。');
    return [...values];
  }
  function checkResearch(value){
    if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==2||!['observed','claimed'].every(k=>Object.hasOwn(value,k)))throw Error('器物试录格式异常。');
    const observed=checkKeys(value.observed,D.observations,'见闻'),claimed=checkKeys(value.claimed,D.records,'领取');
    if(claimed.some(id=>!D.records[id].requires.every(k=>observed.includes(k))))throw Error('器物试录领取记录缺少已完成的见闻。');
    return {observed,claimed};
  }
  // Reuse the real resonance calculation on a read-only projection of validated state.
  // A missing historical log can only recover evidence still present in that state.
  function currentEvidence(state){
    const result=[],projection=Object.create(Base.Game.prototype);projection.state=state;
    if(state.collection.gear.some(g=>g.memory))result.push('memory');
    if(projection.resonances().length)result.push('resonance');
    return result;
  }
  function validateSave(value){
    const s=Base.validateSave(value);
    s.research=value.research===undefined?{observed:currentEvidence(s),claimed:[]}:checkResearch(value.research);
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;
      super(save?{...options,save}:options);
      // Ancestor validators rebuild their own save shapes. Restore this outer field explicitly.
      this.state.research=save?copy(save.research):empty();this.reconcileResearch(false);
    }
    observeResearch(key,checkpoint=true){
      const research=this.state.research;
      if(!research||!owns(D.observations,key)||research.observed.includes(key))return false;
      research.observed.push(key);if(checkpoint)this.checkpoint();return true;
    }
    reconcileResearch(checkpoint=true){
      if(!this.state.research)return false;
      let changed=false;for(const key of currentEvidence(this.state))changed=this.observeResearch(key,false)||changed;
      if(changed&&checkpoint)this.checkpoint();return changed;
    }
    recordCraft(id){return owns(D.craftObservations,id)&&this.observeResearch(D.craftObservations[id]);}
    craft(id){const before=this.state.inventory[id],ok=super.craft(id);if(ok&&this.state.inventory[id]>before)this.recordCraft(id);return ok;}
    researchReason(){return this.loadoutReason().replace(/整理配装方案|保存、套用或删除方案|整理配装/g,'领取试录馈赠');}
    researchClaimReason(id){
      if(!owns(D.records,id))return '没有这卷器物试录。';
      const record=D.records[id],research=this.state.research;
      if(research.claimed.includes(id))return '这卷馈赠已领取，每卷只可领一次。';
      if(!record.requires.every(k=>research.observed.includes(k)))return '尚有见闻未完成，试录随山行慢慢记下即可。';
      const reason=this.researchReason();if(reason)return reason;
      if(this.state.collection.spirit+record.reward.spirit>D.spiritLimit)return '灵蕴已近上限；先用于法宝升阶，馈赠会完整保留。';
      const full=Object.entries(record.reward.items).find(([id,n])=>this.state.inventory[id]+n>D.itemLimit);
      if(full)return Items.items[full[0]].name+'已近行囊上限；先腾出余量，馈赠会完整保留。';
      return '';
    }
    researchStatus(){
      return Object.entries(D.records).map(([id,record])=>{
        const progress=record.requires.map(key=>({key,label:D.observations[key],done:this.state.research.observed.includes(key)}));
        return {id,title:record.title,desc:record.desc,progress,ready:progress.every(p=>p.done),claimed:this.state.research.claimed.includes(id),reward:copy(record.reward),reason:this.researchClaimReason(id)};
      });
    }
    claimResearch(id){
      const reason=this.researchClaimReason(id);if(reason){this.message(reason);return false;}
      const {reward,title}=D.records[id],s=this.state;
      // All capacity and eligibility checks precede every persistent mutation.
      s.collection.spirit+=reward.spirit;
      for(const [item,n]of Object.entries(reward.items))s.inventory[item]+=n;
      s.research.claimed.push(id);
      this.message('器物试录「'+title+'」已收录，馈赠入囊。');this.checkpoint();return true;
    }
    resolveEnemyDamage(e,amount){
      const run=this.state.run,info=this.encounterInfo(e),impact=this.armorImpact;
      const direct=run?.phase==='active'&&e.hp>0&&info?.armor>0&&impact?.target===e&&!impact.resolved&&this.burnFinisher!==e;
      const source=direct?(impact.skill||impact.source):null;
      const resolved=super.resolveEnemyDamage(e,amount);
      if(direct&&run===this.state.run&&e.armorLeft===0){
        if(e.kind==='reed'&&source==='fire')this.observeResearch('burnBamboo');
        if(e.kind==='sentinel'&&['needle','scholar'].includes(source))this.observeResearch('coldStone');
      }
      return resolved;
    }
    clearRoom(){
      const run=this.state.run,alive=run?.phase==='active'&&run.enemies.length>0&&run.enemies.every(e=>e.hp>0);
      const key=alive&&run.room==='herb'&&['moon0','moon1','moon2'].every(id=>run.gathered.includes(id))?'herbPeace':alive&&run.room==='seal'&&run.sealStep===3?'sealPeace':null;
      const ok=super.clearRoom();if(ok&&key&&run===this.state.run)this.observeResearch(key);return ok;
    }
    practice(path){const result=super.practice(path);this.reconcileResearch();return result;}
    equip(id){const ok=super.equip(id);if(ok)this.reconcileResearch();return ok;}
    applyLoadout(slot){const ok=super.applyLoadout(slot);if(ok)this.reconcileResearch();return ok;}
    chooseBoon(id){const ok=super.chooseBoon(id);if(ok)this.reconcileResearch();return ok;}
    claimLoot(index){const ok=super.claimLoot(index);if(ok)this.reconcileResearch();return ok;}
    claimBossRelic(base){const ok=super.claimBossRelic(base);if(ok)this.reconcileResearch();return ok;}
  }
  const api={...Base,Game,validateSave,research:D};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
