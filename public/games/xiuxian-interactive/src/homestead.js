(function(root){
  'use strict';
  const beds=[
    {name:'灵锻草',icon:'herb',reward:'灵锻石 ×24',key:'stone',amount:24},
    {name:'淬魄花',icon:'flower',reward:'淬灵精魄 ×12',key:'essence',amount:12},
    {name:'仙露莲',icon:'dew',reward:'回气丹 ×2、青灵草 ×3'}
  ];
  const fresh=()=>({rack:[null,null,null,null,null],plots:[null,null,null]});
  const slot=n=>n<3?'weapon':'robe';
  function valid(home,state,bases){
    return Array.isArray(home?.rack)&&home.rack.length===5&&home.rack.every((id,n)=>id===null||state.exhibits.includes(id)&&bases[id]?.slot===slot(n)&&home.rack.indexOf(id)===n)&&
      Array.isArray(home.plots)&&home.plots.length===3&&home.plots.every(n=>n===null||Number.isInteger(n)&&n>=0&&n<=3);
  }
  function display(store,index,id,bases){
    return store.change(s=>{
      if(!Number.isInteger(index)||index<0||index>=5||id!==null&&(bases[id]?.slot!==slot(index)||!s.exhibits.includes(id)))return false;
      const rack=s.homestead.rack,old=id===null?-1:rack.indexOf(id);
      if(old>=0)rack[old]=null;rack[index]=id;
    });
  }
  function plant(store,n){return store.change(s=>{if(!beds[n]||s.homestead.plots[n]!==null)return false;s.homestead.plots[n]=0;});}
  function grow(s){s.homestead.plots=s.homestead.plots.map(n=>n===null?null:Math.min(3,n+1));}
  function battle(store){if(store.state.homestead.plots.some(n=>n!==null&&n<3))store.change(grow);}
  function harvest(store,game,save){
    const before=store.state,inv=game.state.inventory,old={potion:inv.potion,herb:inv.herb};
    const picked=store.change(s=>{
      const ready=s.homestead.plots.map((stage,i)=>stage===3?i:-1).filter(i=>i>=0&&(i!==2||inv.potion<=997&&inv.herb<=996));
      if(!ready.length)return false;
      for(const n of ready){const b=beds[n];if(b.key)s.currency[b.key]+=b.amount;s.homestead.plots[n]=null;}
      return ready;
    });
    if(picked&&picked.includes(2)){
      game.gain('potion',2);game.gain('herb',3);
      if(!save(true)){Object.assign(inv,old);store.restore(before);return false;}
    }
    return picked;
  }
  function bonus(home){
    const weapons=home.rack.slice(0,3).filter(Boolean).length,robes=home.rack.slice(3).filter(Boolean).length;
    return {damage:weapons/3*.05,move:robes/2*.05,loot:(weapons+robes)/5*.08};
  }
  const api={beds,fresh,slot,valid,display,plant,grow,battle,harvest,bonus};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianHomestead=api;
})(globalThis);
