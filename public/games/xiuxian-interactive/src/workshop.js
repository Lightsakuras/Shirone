(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./research.js'):root.XiuxianEngine;
  const D=node?require('./data.js'):root.XiuxianData,limit=99,itemLimit=999,statLimit=1000000;
  const known=id=>typeof id==='string'&&Object.hasOwn(D.recipes,id);
  class Game extends Base.Game{
    workshopReason(){
      const reason=this.loadoutReason();
      if(reason)return reason.replace(/整理配装方案|保存、套用或删除方案|整理配装/g,'炼丹制符');
      return Math.hypot(this.state.x-489,this.state.y-288)>93?'走到药庐丹炉旁，再炼丹制符。':'';
    }
    maxCraft(id){
      if(!known(id))return 0;
      const r=D.recipes[id],s=this.state;
      if(this.workshopReason()||(r.unlock&&!s.collection.recipes.includes(id)))return 0;
      return Math.max(0,Math.min(limit,statLimit-s.stats.crafted,Math.floor((itemLimit-s.inventory[id])/(r.amount+this.recipeBonus)),...Object.entries(r.cost).map(([key,n])=>Math.floor(s.inventory[key]/n))));
    }
    craftPlan(id,count=1){
      if(!known(id))return {id,count,max:0,amount:0,cost:[],reason:'没有这份丹符配方。'};
      const r=D.recipes[id],s=this.state,valid=Number.isInteger(count)&&count>=1&&count<=limit;
      const cost=Object.entries(r.cost).map(([key,n])=>({id:key,need:n*(valid?count:0),have:s.inventory[key]}));
      let reason=this.workshopReason();
      if(!reason&&r.unlock&&!s.collection.recipes.includes(id))reason='尚未领悟这份配方，可在旧阵的相应路线寻找图谱。';
      if(!reason&&!valid)reason='每次可炼制 1–'+limit+' 炉。';
      if(!reason&&s.inventory[id]+(r.amount+this.recipeBonus)*count>itemLimit)reason='行囊余量不足；本次不会消耗材料。';
      if(!reason&&s.stats.crafted+count>statLimit)reason='炼制记录已达上限。';
      if(!reason&&cost.some(x=>x.have<x.need))reason='材料不足，需备齐本次全部用料。';
      return {id,count,max:this.maxCraft(id),amount:valid?(r.amount+this.recipeBonus)*count:0,cost,reason};
    }
    craftBatch(id,count=1){
      const p=this.craftPlan(id,count);if(p.reason){this.message(p.reason);return false;}
      for(const x of p.cost)this.state.inventory[x.id]-=x.need;
      this.gain(id,p.amount);this.state.stats.crafted+=count;this.recordCraft(id);
      this.message('制成'+D.items[id].name+' ×'+p.amount+'（'+count+'炉）。');this.sound('craft');return true;
    }
    craft(id){return this.craftBatch(id,1);}
  }
  const api={...Base,Game,workshopLimit:limit};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
