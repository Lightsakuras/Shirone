(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,D=node?require('./armory-data.js'):root.XiuxianArmoryData;
  const rogueData=node?require('./rogue-data.js'):root.XiuxianRogueData;
  const Legacy=node?require('./trial-legacy.js'):root.XiuxianTrialLegacy;
  const Home=node?require('./homestead.js'):root.XiuxianHomestead;
  const Craft=node?require('./armory-crafting.js'):root.XiuxianCrafting;
  const bounties=node?require('./bounty-data.js'):root.XiuxianBountyData;
  const Ach=node?require('./achievements'):root.XiuxianAchievements;
  const Rhythm=node?require('./combat-rhythm'):root.XiuxianCombatRhythm;
  const KEY='xiuxian-armory-v1',keys=Object.keys,copy=o=>JSON.parse(JSON.stringify(o)),pick=(list,rng)=>list[Math.floor(rng()*list.length)];
  const ranges={attack:[2,10],defense:[1,7],crit:[1,6],haste:[2,8],skill:[3,10],pickup:[3,14]};
  function roll(key,grade,rng){
    const [min,max]=ranges[key],span=max-min;
    return min+Math.floor(span*grade/10)+Math.floor(rng()*(1+Math.ceil(span*(grade+2)/7)-Math.floor(span*grade/10)));
  }
  function fill(item,count,rng){
    const pool=keys(D.affixes).filter(k=>!item.affixes.some(a=>a.key===k));
    while(item.affixes.length<count){const key=pool.splice(Math.floor(rng()*pool.length),1)[0];item.affixes.push({key,value:roll(key,item.grade,rng)});}
  }
  function createItem(base,grade=0,rng=Math.random){
    if(!Object.hasOwn(D.bases,base)||!D.grades[grade])throw Error('装备品阶或外观无效');
    const g=D.grades[grade],item={base,grade,level:0,affixes:[],locks:[],locked:false};
    fill(item,g.min+Math.floor(rng()*(g.max-g.min+1)),rng);return item;
  }
  function fresh(){
    const equipped=Object.fromEntries(keys(D.slots).map(k=>[k,null])),bag=[];
    for(const base of ['starter_sword','starter_robe','starter_boots','starter_pouch']){
      bag.push({...createItem(base,0,()=>0),id:base});equipped[D.bases[base].slot]=base;
    }

    return {perfectDodges:0,exhibits:bag.map(i=>i.base),presets:[null,null,null],soul:Craft.soul(),archive:[],orbs:[],version:1,nextId:1,currency:{stone:120,essence:30,jade:0,crystal:0},equipped,transmog:{enabled:true,...Object.fromEntries(D.visible.map(k=>[k,null]))},
      recipes:[],fortune:0,bag,unlockedAppearances:[],abyss:{demonSlain:false,contracts:[],heatBoss:0,forgeBoxes:0,highestFloor:0,clearedBosses:[],totalRuns:0},rogue:{bestWave:0,clears:0,talents:{},unlockedEvolutions:[],redeemed:[]},trial:Legacy.fresh(),homestead:Home.fresh(),bounty:{wins:{},scrolls:0,insight:0},achievements:[],fragments:0};
  }
  const validInt=(n,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=0&&n<=max;
  function validate(value){
    const s=copy(value),ids=new Set();
    const fail=()=>{throw Error('装备档案格式异常');};
    if(s?.version!==1||!validInt(s.nextId)||!Array.isArray(s.bag)||!s.currency||!s.equipped||!s.transmog||!s.abyss||!s.rogue)fail();
    s.abyss.contracts??=[];s.abyss.heatBoss??=0;s.abyss.forgeBoxes??=0;
    if(!Array.isArray(s.abyss.contracts)||new Set(s.abyss.contracts).size!==s.abyss.contracts.length||
      !s.abyss.contracts.every(k=>Object.hasOwn(D.legendary.contracts,k))||!validInt(s.abyss.heatBoss,5)||!validInt(s.abyss.forgeBoxes))fail();
    s.currency.crystal??=0;s.recipes??=[];s.fortune??=0;
    if(!validInt(s.fortune,100)||!Array.isArray(s.recipes)||!s.recipes.every(id=>D.bases[id]?.style==='ancient')||new Set(s.recipes).size!==s.recipes.length)fail();
    for(const k of ['stone','essence','jade','crystal'])if(!validInt(s.currency[k]))fail();
    if(s.soul===undefined){
      s.soul=Craft.soul();

    }
    s.archive??=[];s.orbs??=[];
    const soul=s.soul;
    if(!soul||!validInt(soul.stage,4)||!soul.stage||!validInt(soul.xp)||!validInt(soul.rank,6)||!Object.hasOwn(D.weapons,soul.school))fail();
    if(!Array.isArray(s.archive)||new Set(s.archive).size!==s.archive.length||!s.archive.every(k=>Object.hasOwn(D.bases,k)&&(D.bases[k].set||D.bases[k].route)))fail();
    const legendaryId=k=>typeof k==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(k);
    if(!Array.isArray(s.orbs)||!s.orbs.every(o=>o&&/^orb_\d+$/.test(o.id)&&(o.legendary!==undefined?legendaryId(o.legendary)&&!o.affix:Object.hasOwn(D.affixes,o.affix?.key)&&validInt(o.affix.value,100)))||new Set(s.orbs.map(o=>o.id)).size!==s.orbs.length)fail();
    if((soul.stage>1||s.bag.some(i=>i?.id===Craft.soulId))&&!s.bag.some(i=>i?.base===Craft.soulId&&i.id===Craft.soulId&&i.grade===Craft.stages[soul.stage-1].grade))fail();
    for(const i of s.bag){
      if(!i||typeof i.id!=='string'||(i.id===Craft.soulId)!==(i.base===Craft.soulId)||!/^(?:soul_sword|starter_(?:robe|boots|sword|pouch)|gear_\d+)$/.test(i.id)||ids.has(i.id)||!Object.hasOwn(D.bases,i.base)||!validInt(i.grade,5)||!validInt(i.level,D.grades[i.grade].cap))fail();
      if(i.legendary!==undefined&&!legendaryId(i.legendary)||i.masterwork!==undefined&&typeof i.masterwork!=='boolean')fail();
      ids.add(i.id);
      if(!Array.isArray(i.affixes)||i.affixes.length<D.grades[i.grade].min||i.affixes.length>D.grades[i.grade].max+Number(i.masterwork===true)||!i.affixes.every(a=>Object.hasOwn(D.affixes,a.key)&&validInt(a.value,100))||new Set(i.affixes.map(a=>a.key)).size!==i.affixes.length)fail();
      for(const a of i.affixes)a.value=Math.min(a.value,ranges[a.key][1]);
      if(i.curseConfirmed!==undefined&&typeof i.curseConfirmed!=='boolean')fail();
      if(!Array.isArray(i.locks)||i.locks.length>2||new Set(i.locks).size!==i.locks.length||!i.locks.every(k=>i.affixes.some(a=>a.key===k))||typeof i.locked!=='boolean')fail();
    }
    if(!Array.isArray(s.unlockedAppearances)||!s.unlockedAppearances.every(k=>Object.hasOwn(D.bases,k))||typeof s.transmog.enabled!=='boolean')fail();
    for(const k of keys(D.slots))if(s.equipped[k]!==null&&!s.bag.some(i=>i.id===s.equipped[k]&&D.bases[i.base].slot===k))fail();
    for(const k of D.visible)if(s.transmog[k]!==null&&(!s.unlockedAppearances.includes(s.transmog[k])||D.bases[s.transmog[k]].slot!==k))fail();
    if(!validInt(s.abyss.highestFloor)||!validInt(s.abyss.totalRuns)||!Array.isArray(s.abyss.clearedBosses)||!s.abyss.clearedBosses.every(n=>validInt(n)&&n>0&&n%5===0&&n<=s.abyss.highestFloor)||!Array.isArray(s.achievements)||!s.achievements.every(k=>typeof k==='string')||!validInt(s.fragments??0))fail();
    if(s.homestead===undefined)s.homestead=Home.fresh();
    if(s.bounty===undefined)s.bounty={wins:{},scrolls:0,insight:0};
    const b=s.bounty;
    s.exhibits??=[...new Set([...s.unlockedAppearances,...s.bag.map(i=>i.base)])];
    if(!Array.isArray(s.exhibits)||!s.exhibits.every(id=>Object.hasOwn(D.bases,id)))fail();
    if(!Home.valid(s.homestead,s,D.bases)||!b||!validInt(b.scrolls)||!validInt(b.insight)||!b.wins||typeof b.wins!=='object'||Array.isArray(b.wins)||!Object.entries(b.wins).every(([id,n])=>bounties.some(row=>row.id===id)&&validInt(n)))fail();
    if(s.trial===undefined)s.trial=Legacy.fresh();
    if(s.trial.bookEvolutions===undefined)s.trial.bookEvolutions=Array.isArray(s.rogue.unlockedEvolutions)?[...s.rogue.unlockedEvolutions]:[];
    if(!Legacy.valid(s.trial))fail();
    const r=s.rogue;
    if(!validInt(r.bestWave)||!validInt(r.clears)||!validInt(r.totalKills??0)||!r.talents||Array.isArray(r.talents)||typeof r.talents!=='object')fail();
    for(const [key,n] of Object.entries(r.talents))if(!Object.hasOwn(rogueData.talents,key)||!validInt(n,rogueData.talents[key][2]))fail();
    for(const [list,table] of [[r.unlockedEvolutions,rogueData.families],[r.redeemed,rogueData.treasures]])
      if(!Array.isArray(list)||new Set(list).size!==list.length||!list.every(k=>typeof k==='string'&&Object.hasOwn(table,k)))fail();
    s.perfectDodges??=0;if(!validInt(s.perfectDodges))fail();
    s.abyss.demonSlain??=s.achievements.includes('斩魔问心');if(typeof s.abyss.demonSlain!=='boolean')fail();
    s.presets??=[null,null,null];
    if(!Array.isArray(s.presets)||s.presets.length!==3||s.presets.some(p=>p!==null&&(!p||typeof p!=='object'||Array.isArray(p))))fail();
    cleanPresets(s);
    return s;
  }
  function cleanPresets(s){
    const items=new Map(s.bag.map(i=>[i.id,i]));
    s.presets=s.presets.map(p=>p&&Object.fromEntries(keys(D.slots).map(slot=>{
      const i=items.get(p[slot]);return [slot,i&&D.bases[i.base].slot===slot?i.id:null];
    })));
  }
  function stats(item){
    const out=Object.fromEntries(keys(D.affixes).map(k=>[k,0]));if(!item)return out;
    const slot=D.bases[item.base].slot,k={weapon:'attack',ring:'crit',amulet:'skill',pouch:'pickup',boots:'haste'}[slot]||'defense';
    out[k]=Math.ceil((k==='attack'?7:3)*D.grades[item.grade].mult*(1+item.level*.08));
    for(const a of item.affixes)out[a.key]+=Math.min(a.value,ranges[a.key][1]);if(item.grade===5&&slot!=='weapon')out.defense+=5;return out;
  }
  const power=i=>Object.entries(stats(i)).reduce((v,[k,n])=>v+n*({pickup:1,defense:3,attack:5,crit:4,skill:3,haste:3}[k]),0);
  function create(storage,rng=Math.random,persistence=null){
    const listeners=new Set();
    let state=fresh(),revision=0,cache,raw,realmRank=()=>0;
    try{raw=storage?.getItem(KEY);}catch{}
    if(raw)state=validate(JSON.parse(raw));else if(storage)try{storage.setItem(KEY,JSON.stringify(state));}catch{}
    function adopt(next){state=next;revision++;cache=null;return true;}
    function replace(next){
      if(persistence)persistence.write(next);
      else {const serialized=JSON.stringify(next);storage?.setItem(KEY,serialized);raw=serialized;}
      return adopt(next);
    }
    function change(fn){
      // Rebase on the latest persisted inventory before applying a player action.
      const latest=storage?.getItem(KEY);
      const before=persistence?.read()||(latest&&latest!==raw?validate(JSON.parse(latest)):state);
      const s=copy(before),events=[],result=fn(s,events);if(result===false)return false;
      if(s.nextId!==before.nextId){
        const known=new Set(before.bag.map(i=>i.id));
        for(const i of s.bag)if(!known.has(i.id)){
          if(i.grade>=3)Ach.award(s,'relic');if(i.legendary)Ach.award(s,'legend');
          if(i.grade>=3||i.legendary||D.legendary.curses[i.base]||result?.id===i.id)events.push({type:'appraisal',item:copy(i),source:result?.id===i.id?'furnace':'loot'});
        }
      }
      Ach.transitions(before,s);
      for(const title of s.achievements)if(!before.achievements.includes(title))events.push({type:'achievement',title});
      cleanPresets(s);replace(s);
      for(const event of events)for(const listener of listeners)listener(event);
      return result??true;
    }
    function acquire(s,item){
      let id;do{id='gear_'+s.nextId++;}while(s.bag.some(i=>i.id===id));
      s.bag.push({...copy(item),id});if(!s.exhibits.includes(item.base))s.exhibits.push(item.base);if(!s.unlockedAppearances.includes(item.base))s.unlockedAppearances.push(item.base);return id;
    }
    const edit=(id,fn)=>change(s=>{const i=s.bag.find(i=>i.id===id);return i?fn(i,s):false;});
    function summary(){
      if(cache)return cache;const total=stats(null),sets={},worn={},look={};let score=0;
      for(const slot of keys(D.slots)){
        const i=state.bag.find(i=>i.id===state.equipped[slot]);worn[slot]=i||null;
        look[slot]=D.bases[(state.transmog.enabled&&state.transmog[slot])||i?.base]||null;
        if(!i)continue;const b=D.bases[i.base];if(b.set)sets[b.set]=(sets[b.set]||0)+1;score+=power(i);
        for(const [k,v] of Object.entries(stats(i)))total[k]+=v;
      }
      const effects=new Set(Object.values(worn).filter(Boolean).flatMap(i=>[i.legendary,i.base]));
      const rawHaste=total.haste;
      if(effects.has('demon_boots'))total.defense=0;
      if(effects.has('leverage'))total.attack+=3*Math.floor(total.defense/20);
      total.haste=Math.min(65,total.haste);total.crit=Math.min(75,total.crit);
      const aura=Home.bonus(state.homestead),fruit=Math.min(10,Math.floor(state.archive.length/3));
      if(effects.has('demon_boots'))aura.move+=.35;
      aura.damage+=fruit*.01;aura.loot+=fruit*.02;
      const soulStage=worn.weapon?.base===Craft.soulId?state.soul.stage:0;
      const school=soulStage?state.soul.school:D.bases[worn.weapon?.base]?.school||null;
      if(look.weapon?.id===Craft.soulId)look.weapon={...look.weapon,school:state.soul.school,style:state.soul.stage===4?'ancient':look.weapon.style};
      return cache={effects,rawHaste,aura,total,sets,worn,look,power:score,school,soulStage};
    }
    function salvage(s,predicate){
      const equipped=new Set(Object.values(s.equipped)),removed=s.bag.filter(i=>i.base!==Craft.soulId&&!i.locked&&!equipped.has(i.id)&&predicate(i));
      if(!removed.length)return false;const ids=new Set(removed.map(i=>i.id));s.bag=s.bag.filter(i=>!ids.has(i.id));
      for(const i of removed){s.currency.stone+=4+i.grade*6+i.level*2;s.currency.essence+=1+i.grade*2;}return removed.length;
    }
    return {...Craft.actions({award:Ach.award,change,acquire,createItem,fill,ranges,D,rng,rank:()=>realmRank()}),bindRealm:read=>{realmRank=read;},useDeathWard:()=>change(s=>{if(!s.trial.ward)return false;s.trial.ward--;}),get state(){return state;},subscribe(fn){listeners.add(fn);return ()=>listeners.delete(fn);},
      award:id=>!state.achievements.includes(Ach.data[id].title)&&change(s=>Ach.award(s,id)),
      recordDodge:()=>!state.achievements.includes(Ach.data.dodge5.title)&&change(s=>{s.perfectDodges++;if(s.perfectDodges>=5)Ach.award(s,'dodge5');}),
      get revision(){return revision;},summary,change,acquire,adopt,
      savePreset:index=>Number.isInteger(index)&&index>=0&&index<3&&change(s=>{s.presets[index]={...s.equipped};}),
      applyPreset:index=>Number.isInteger(index)&&index>=0&&index<3&&change(s=>{
        const p=s.presets[index];if(!p)return false;
        for(const slot of keys(D.slots)){
          const i=s.bag.find(item=>item.id===p[slot]);s.equipped[slot]=i&&(!D.legendary.curses[i.base]||i.curseConfirmed===true)?i.id:null;
        }
      }),
      equipBest:()=>change(s=>{
        let delta=0;
        for(const slot of keys(D.slots)){
          const worn=s.bag.find(i=>i.id===s.equipped[slot]);let best=worn;
          for(const i of s.bag)if(D.bases[i.base].slot===slot&&(!D.legendary.curses[i.base]||i.curseConfirmed===true)&&power(i)>power(best))best=i;
          s.equipped[slot]=best?.id||null;delta+=power(best)-power(worn);
        }
        return {delta};
      }),
      openForgeBox:school=>change(s=>{
        if(!s.abyss.forgeBoxes||!Object.hasOwn(D.weapons,school))return false;
        s.abyss.forgeBoxes--;return acquire(s,createItem('ancient_'+school,5,rng));
      }),
      forgeAncient:base=>change(s=>{
        if(!s.recipes.includes(base)||s.currency.crystal<5)return false;
        s.currency.crystal-=5;s.recipes.splice(s.recipes.indexOf(base),1);return acquire(s,createItem(base,5,rng));
      }),restore:v=>replace(validate(v)),gain:item=>change(s=>acquire(s,item)),equip:id=>change(s=>{
        const i=id===Craft.soulId?Craft.materialize(s,createItem):s.bag.find(v=>v.id===id);if(!i)return false;
        if(D.legendary.curses[i.base])i.curseConfirmed=true;
        s.equipped[D.bases[i.base].slot]=id;
      }),
      unequip:slot=>change(s=>{if(!Object.hasOwn(D.slots,slot))return false;s.equipped[slot]=null;}),
      enhance:id=>edit(id,(i,s)=>{const cost=D.costs.enhance(i.level);if(i.level>=D.grades[i.grade].cap||s.currency.stone<cost)return false;s.currency.stone-=cost;i.level++;}),
      promote:id=>edit(id,(i,s)=>{const cost=D.costs.promote(i.grade);if(i.base===Craft.soulId||i.grade>=5||s.currency.essence<cost)return false;s.currency.essence-=cost;i.grade++;fill(i,D.grades[i.grade].min,rng);}),
      lock:id=>edit(id,i=>{if(i.base===Craft.soulId)return false;i.locked=!i.locked;}),
      lockAffix:(id,key)=>edit(id,i=>{if(!i.affixes.some(a=>a.key===key))return false;if(i.locks.includes(key))i.locks=i.locks.filter(k=>k!==key);else if(i.locks.length<2)i.locks.push(key);else return false;}),
      reroll:id=>edit(id,(i,s)=>{const cost=D.costs.reroll(i.locks.length),n=i.affixes.length;if(s.currency.essence<cost||n===i.locks.length)return false;
        s.currency.essence-=cost;const kept=i.affixes.filter(a=>i.locks.includes(a.key)),tmp={grade:i.grade,affixes:[...kept]};fill(tmp,n,rng);
        const draws=tmp.affixes.slice(kept.length);i.affixes=i.affixes.map(a=>i.locks.includes(a.key)?a:draws.shift());}),
      salvage:id=>change(s=>salvage(s,i=>i.id===id)),salvageBelow:g=>change(s=>salvage(s,i=>i.grade<=g)),
      appearance:(slot,base)=>change(s=>{if(!D.visible.includes(slot)||base!==null&&(!(s.unlockedAppearances.includes(base)||s.bag.some(i=>i.base===base))||D.bases[base].slot!==slot))return false;if(base&&!s.unlockedAppearances.includes(base))s.unlockedAppearances.push(base);s.transmog[slot]=base;}),
      toggle:()=>change(s=>{s.transmog.enabled=!s.transmog.enabled;})};
  }
  const api={Rhythm,Ach,Craft,Poise:node?require('./enemy-poise.js'):root.XiuxianPoise,Geo:node?require('./hazard-geo.js'):root.XiuxianHazardGeo,Home,Legacy,KEY,create,fresh,validate,createItem,stats,power,pick};if(node)module.exports=api;else root.XiuxianArmory=api;
})(globalThis);
