(function(root){
  'use strict';
  const stages=[
    {name:'凡铁初鸣',xp:0,rank:0,grade:0},
    {name:'青莲开锋',xp:60,rank:1,grade:2},
    {name:'紫电惊鸿',xp:240,rank:2,grade:3},
    {name:'太虚本命仙剑',xp:700,rank:4,grade:5}
  ];
  const soulId='soul_sword';
  const soul=()=>({stage:1,xp:0,rank:0,school:'sword'});
  const spare=(s,i)=>!!i&&i.base!==soulId&&!i.locked&&!Object.values(s.equipped).includes(i.id);
  function materialize(s,createItem){
    let item=s.bag.find(i=>i.id===soulId);
    if(!item){item={...createItem(soulId,0,()=>0),id:soulId,locked:true};s.bag.push(item);if(!s.unlockedAppearances.includes(soulId))s.unlockedAppearances.push(soulId);}
    return item;
  }
  function ingredients(s,ids){
    if(!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length)return null;
    const items=ids.map(id=>s.bag.find(i=>i.id===id));
    return items.every(i=>spare(s,i))?items:null;
  }
  function remove(s,items){const ids=new Set(items.map(i=>i.id));s.bag=s.bag.filter(i=>!ids.has(i.id));}
  function actions({award,change,acquire,createItem,fill,ranges,D,rng,rank}){
    const pool=Object.values(D.bases).filter(b=>b.set&&!b.route||b.id==='plain_swarm');
    return {
      fuse:(ids,targetSlot)=>change(s=>{
        const items=ingredients(s,ids);
        if(items?.length!==3||items[0].grade>4||!items.every(i=>i.grade===items[0].grade))return false;
        if(targetSlot&&(!Object.hasOwn(D.slots,targetSlot)||s.currency.essence<6))return false;
        const grade=Math.min(4,items[0].grade+Number(rng()<.65)),critical=rng()<.15;
        const bases=targetSlot?pool.filter(b=>b.slot===targetSlot):pool;
        const item=createItem(bases[Math.floor(rng()*bases.length)].id,grade,rng);
        D.legendary.imbue(item,rng);
        if(critical){
          fill(item,item.affixes.length+1,rng);const bonus=item.affixes.at(-1);
          bonus.value=ranges[bonus.key][1];item.masterwork=true;
        }
        if(targetSlot)s.currency.essence-=6;
        if(critical&&grade>items[0].grade)award(s,'furnace');
        remove(s,items);return {id:acquire(s,item),grade,critical};
      }),
      extractAffix:(id,index)=>change(s=>{
        const items=ingredients(s,[id]);if(!items)return false;
        const item=items[0],legendary=index===item.affixes.length&&item.legendary;
        if(!Number.isInteger(index)||!legendary&&!item.affixes[index])return false;
        let orbId;do{orbId='orb_'+s.nextId++;}while(s.orbs.some(o=>o.id===orbId));
        const orb=legendary?{id:orbId,legendary}:{id:orbId,affix:{...item.affixes[index]}};
        s.orbs.push(orb);remove(s,items);return orb.id;
      }),
      imprintAffix:(id,orbId,index)=>change(s=>{
        const item=s.bag.find(i=>i.id===id),orb=s.orbs.find(o=>o.id===orbId);
        if(!item||!orb||!Number.isInteger(index))return false;
        if(orb.legendary){if(index!==item.affixes.length)return false;item.legendary=orb.legendary;s.orbs=s.orbs.filter(o=>o!==orb);award(s,'imprint');return true;}
        if(!item.affixes[index]||item.locks.includes(item.affixes[index].key))return false;
        if(item.affixes.some((a,n)=>n!==index&&a.key===orb.affix.key))return false;
        item.affixes[index]={...orb.affix};s.orbs=s.orbs.filter(o=>o!==orb);award(s,'imprint');return true;
      }),
      archive:id=>change(s=>{
        const items=ingredients(s,[id]);if(!items)return false;
        const b=D.bases[items[0].base];if((!b.set&&!b.route)||s.archive.includes(b.id))return false;
        remove(s,items);s.archive.push(b.id);
        if(s.archive.length===3&&!s.unlockedAppearances.includes('archive_robe'))s.unlockedAppearances.push('archive_robe');
        return true;
      }),
      soulForm:school=>change(s=>{if(!Object.hasOwn(D.weapons,school))return false;s.soul.school=school;}),
      feedSoulWeapon:(ids)=>change(s=>{
        if(!Array.isArray(ids))return false;
        const consumed=ids.length?ingredients(s,ids):[];
        if(!consumed||s.soul.stage===4)return false;
        const xp=consumed.reduce((sum,i)=>sum+8*(i.grade+1)**2+i.level*3,0);
        const start=s.soul.stage;s.soul.xp+=xp;s.soul.rank=Math.max(s.soul.rank,rank());
        while(s.soul.stage<4){
          const next=stages[s.soul.stage];
          if(s.soul.rank<next.rank||s.soul.xp<next.xp||next.grade===5&&s.currency.crystal<1)break;
          if(next.grade===5)s.currency.crystal--;
          const sword=materialize(s,createItem);sword.grade=next.grade;
          fill(sword,D.grades[next.grade].min,rng);s.soul.stage++;
        }
        if(!xp&&start===s.soul.stage)return false;
        remove(s,consumed);return {xp,stage:s.soul.stage};
      })
    };
  }
  const api={stages,soulId,soul,materialize,spare,actions};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianCrafting=api;
})(globalThis);
