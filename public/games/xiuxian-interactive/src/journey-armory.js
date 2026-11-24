(function(root){
  'use strict';
  const A=typeof module==='object'&&module.exports?require('./armory'):root.XiuxianArmory;
  const META='xiuxian-account-meta-v1', SNAP='xiuxian-armory-snapshots-v1', JOURNAL='xiuxian-save-transaction-v1';
  const fields=['talents','unlockedEvolutions','bestWave','clears'];
  const unique=list=>[...new Set(list)];
  function split(state){
    const character=JSON.parse(JSON.stringify(state));
    const meta={unlockedAppearances:character.unlockedAppearances,achievements:character.achievements,rogue:{}};
    delete character.unlockedAppearances;delete character.achievements;
    for(const key of fields){meta.rogue[key]=character.rogue[key];delete character.rogue[key];}
    return {character,meta};
  }
  function join(character,meta){
    const {meta:base}=split(A.fresh());
    const s={...character,rogue:{...character.rogue,...base.rogue,...meta?.rogue},
      achievements:meta?.achievements||[],unlockedAppearances:unique([...base.unlockedAppearances,...(meta?.unlockedAppearances||[]),
        ...Object.values(character.transmog).filter(v=>typeof v==='string'),...character.homestead.rack.filter(Boolean)])};
    return A.validate(s);
  }
  function merge(a,b){
    const talents={...a.rogue.talents};for(const [id,n] of Object.entries(b.rogue.talents))talents[id]=Math.max(talents[id]||0,n);
    return {unlockedAppearances:unique([...a.unlockedAppearances,...b.unlockedAppearances]),achievements:unique([...a.achievements,...b.achievements]),
      rogue:{talents,unlockedEvolutions:unique([...a.rogue.unlockedEvolutions,...b.rogue.unlockedEvolutions]),bestWave:Math.max(a.rogue.bestWave,b.rogue.bestWave),clears:Math.max(a.rogue.clears,b.rogue.clears)}};
  }
  function create(storage){
    // Stage journey-records' own verified writes as well as the sidecars. A write-ahead
    // undo record makes a closed tab between two setItem calls recoverable on reopen.
    let staged=null;
    function write(k,v){if(v===null)storage.removeItem(k);else storage.setItem(k,v);}
    function recover(){
      const journal=storage.getItem(JOURNAL);if(!journal)return;
      for(const [k,v] of JSON.parse(journal))if(storage.getItem(k)!==v)write(k,v);
      storage.removeItem(JOURNAL);
    }
    const io={getItem:k=>staged?.has(k)?staged.get(k):storage.getItem(k),
      setItem:(k,v)=>staged?staged.set(k,v):storage.setItem(k,v),removeItem:k=>staged?staged.set(k,null):storage.removeItem(k)};
    function atomic(fn){
      if(staged)return fn();
      recover();staged=new Map();
      try{
        const result=fn(),entries=[...staged].filter(([k,v])=>storage.getItem(k)!==v);
        if(entries.length===1){write(...entries[0]);return result;}
        if(entries.length){
          const prior=entries.map(([k])=>[k,storage.getItem(k)]);
          storage.setItem(JOURNAL,JSON.stringify(prior));
          try{for(const [k,v] of entries){write(k,v);if(storage.getItem(k)!==v)throw Error('记录未完整写入');}storage.removeItem(JOURNAL);}
          catch(error){recover();throw error;}
        }
        return result;
      }finally{staged=null;}
    }
    const get=k=>JSON.parse(io.getItem(k)),put=(k,v)=>io.setItem(k,JSON.stringify(v));
    const account=()=>split(join(split(A.fresh()).character,get(META))).meta;
    function save(key,state){const {character,meta}=split(state);put(key+'-armory',character);put(META,meta);}
    function load(key,existing){
      const current=get(key+'-armory');if(current)return join(current,account());
      const old=existing&&get(A.KEY);
      const s=old?A.validate(old):A.fresh(),parts=split(s);
      const next=join(parts.character,merge(account(),parts.meta));
      if(old)atomic(()=>{save(key,next);io.removeItem(A.KEY);});
      return next;
    }
    function reset(key,value,keep=true){
      const parts=split(A.validate(value||A.fresh()));
      const next=join(parts.character,keep?merge(account(),parts.meta):parts.meta);
      save(key,next);io.setItem(key+'-incarnation',root.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2));io.removeItem(A.KEY);return next;
    }
    function snapshot(id,state){const map=get(SNAP)||{};map[id]=split(state).character;put(SNAP,map);}
    function at(id){const c=get(SNAP)?.[id];return join(c||split(A.fresh()).character,account());}
    function archive(id,key,recovery,state){
      snapshot('journey/'+id,state);
      const map=get(SNAP)||{};
      for(const [name,stages] of Object.entries(recovery.points))for(const stage of Object.keys(stages)){
        const c=map[point(key,name,stage)];if(c)map[point(id,name,stage)]=c;
      }
      put(SNAP,map);
    }
    function rememberSlot(key,title){
      const map=get(SNAP)||{};map.slots??={};map.slots[key]=title;put(SNAP,map);
    }
    function slots(){return Object.entries(get(SNAP)?.slots||{});}
    function restorePoints(owner,dest,recovery){
      const map=get(SNAP)||{};
      for(const [name,stages] of Object.entries(recovery.points))for(const stage of Object.keys(stages)){
        const from=point(owner,name,stage),to=point(dest,name,stage);
        if(map[from])map[to]=map[from];else delete map[to];
      }
      put(SNAP,map);
    }
    function matchesArchive(id,key,recovery,state){
      const map=get(SNAP)||{};
      if(JSON.stringify(map['journey/'+id])!==JSON.stringify(split(state).character))return false;
      return Object.entries(recovery.points).every(([name,stages])=>Object.keys(stages).every(stage=>
        JSON.stringify(map[point(key,name,stage)])===JSON.stringify(map[point(id,name,stage)])));
    }
    const point=(owner,key,stage)=>'point/'+owner+'/'+key+'/'+stage;
    const clearPoints=owner=>{const map=get(SNAP)||{};for(const id of Object.keys(map))if(id.startsWith('point/'+owner+'/'))delete map[id];put(SNAP,map);};
    return {io,recover,atomic,save,load,reset,snapshot,at,archive,matchesArchive,slots,rememberSlot,restorePoints,point,clearPoints};
  }
  const api={META,SNAP,create,split,join};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianJourneyArmory=api;
})(globalThis);
