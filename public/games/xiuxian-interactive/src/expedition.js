(function (root) {
  'use strict';
  const Combat=typeof module==='object'&&module.exports?require('./combat.js'):root.XiuxianCombat;
  const node = typeof module === 'object' && module.exports;
  const Base = node ? require('./game.js') : root.XiuxianEngine;
  const D = node ? require('./data.js') : root.XiuxianData;
  const R = node ? require('./expedition-data.js') : root.XiuxianExpeditionData;
  const Records=node?require('./run-records.js'):root.XiuxianRunRecords;
  const copy = x => JSON.parse(JSON.stringify(x)), dist = Base.distance;
  const cap = (x, max = 100) => Math.max(0, Math.min(max, x));
  const owns = (o, key) => typeof key === 'string' && Object.hasOwn(o, key);
  const list = o => Object.keys(o);
  const emptyCollection = () => ({ gear: [], equipped: [], recipes: [], notes: [], shared: [], spirit: 0, runs: 0, clears: 0, study: { sword: 0, medicine: 0, scholar: 0 }, companionship: null });
  const number = (v, max, name, integer = true) => {
    if (typeof v !== 'number' || !Number.isFinite(v) || v < 0 || v > max || integer && !Number.isInteger(v)) throw Error('存档数据异常：' + name);
    return v;
  };
  function enumList(v, allowed, max, name) {
    if (!Array.isArray(v) || v.length > max || new Set(v).size !== v.length || v.some(id => !allowed.includes(id))) throw Error('存档数据异常：' + name);
    return [...v];
  }
  function checkGear(g, owned = true) {
    if (!g || !owns(R.relics, g.base) || !owns(R.affixes, g.affix) || ![1, 2, 3].includes(g.level)) throw Error('法宝记录异常。');
    const out = { base: g.base, affix: g.affix, level: g.level };
    if (owned) {
      if (g.id !== g.base + '_' + g.affix || g.memory !== null && !owns(R.paths, g.memory)) throw Error('器忆记录异常。');
      Object.assign(out, { id: g.id, memory: g.memory, practice: {} });
      for (const p of list(R.paths)) out.practice[p] = number(g.practice?.[p], 6, '器物修习');
    }
    return out;
  }
  function validateSave(value) {
    if (!value || ![1, 2].includes(value.version)) throw Error('不是此版本支持的存档。');
    const legacy = value.version === 1;
    if (legacy && !['garden', 'ruins'].includes(value.map)) throw Error('旧存档地图异常。');
    const base = Base.validateSave({ ...value, version: 1, map: value.run ? 'garden' : value.map, inventory: { ...value.inventory, tea: value.inventory?.tea ?? 0 } });
    const s = { ...base, version: 2, collection: emptyCollection(), run: null, lastRun: null };
    if (legacy) return s;
    const c = value.collection;
    if (!c || !Array.isArray(c.gear) || c.gear.length > 48) throw Error('法宝藏品记录异常。');
    s.collection.gear = c.gear.map(g => checkGear(g));
    const ids = s.collection.gear.map(g => g.id);
    if (new Set(ids).size !== ids.length) throw Error('法宝记录重复。');
    s.collection.equipped = enumList(c.equipped, ids, 3, '装备栏');
    const equippedBases = s.collection.gear.filter(g => s.collection.equipped.includes(g.id)).map(g => g.base);
    if (new Set(equippedBases).size !== equippedBases.length) throw Error('同名法宝不能重复装备。');
    for (const key of ['recipes', 'notes', 'shared']) s.collection[key] = enumList(c[key], key === 'recipes' ? R.recipeIds : list(R.notes), 6, key);
    if (s.collection.shared.some(id => !s.collection.notes.includes(id))) throw Error('札记交付记录异常。');
    for (const k of ['spirit', 'runs', 'clears']) s.collection[k] = number(c[k], 1000000, k);
    for (const k of list(c.study || {})) if (!owns(s.collection.study, k)) throw Error('修习记录异常。');
    for (const k of list(s.collection.study)) s.collection.study[k] = number(c.study?.[k], 99, '修习');
    if (![null, 'close', 'friend'].includes(c.companionship)) throw Error('同门关系记录异常。');
    s.collection.companionship = c.companionship;
    if (value.run) {
      const r = value.run;
      if (!['route', 'active', 'loot', 'boon', 'camp'].includes(r.phase) || r.room !== null && !owns(R.rooms, r.room)) throw Error('秘境阶段异常。');
      const depth = number(r.depth, 5, '秘境深度');
      const seek=r.seek??null,trial=r.trial??'none';
      if(seek!==null&&!owns(R.paths,seek)||!owns(R.trials,trial))throw Error('寻器或险阵记录异常。');
      if (r.phase === 'active' && (!r.room || depth === 0) || r.room && value.map !== R.rooms[r.room].map || !r.room && (depth !== 0 || value.map !== 'bamboo')) throw Error('秘境位置记录不一致。');
      const seed = number(r.seed, 0xffffffff, '秘境种子');
      if (!seed) throw Error('秘境种子无效。');
      const allowed = r.phase === 'route' ? list(R.rooms) : r.phase === 'boon' ? list(R.boons) : r.phase==='camp'?list(R.camps):[];
      const choices = enumList(r.choices, allowed, 3, '秘境选项');
      if (['route', 'boon', 'camp'].includes(r.phase) && !choices.length) throw Error('秘境选项缺失。');
      if (r.phase === 'route' && (depth === 4 ? choices.length !== 1 || choices[0] !== 'boss' : choices.includes('boss'))) throw Error('秘境路线异常。');
      if (depth === 5 && !['active', 'loot'].includes(r.phase)) throw Error('守关阶段异常。');
      const records=Records.validate(r,depth);
      if(r.phase==='camp'&&(![2,4].includes(depth)||records.camps.some(c=>c.depth===depth)||choices.length!==3))throw Error('歇脚阶段异常。');
      for(const k of ['pendingInsight','lootBlessed'])if(r[k]!==undefined&&typeof r[k]!=='boolean')throw Error('问器记录异常。');
      const boons = enumList(r.boons, list(R.boons), 5, '临时灵契');
      if (r.phase === 'boon' && choices.some(id => boons.includes(id))) throw Error('灵契选项重复。');
      if (!Array.isArray(r.loot) || r.loot.length > 3 || r.phase === 'loot' && r.loot.length !== 3) throw Error('秘境掉落异常。');
      if (!Array.isArray(r.enemies) || r.enemies.length > 4) throw Error('秘境阵灵异常。');
      const enemies = r.enemies.map((e, i) => {
        if (!owns(R.enemies, e.kind) || e.id !== 'echo-' + i) throw Error('阵灵种类异常。');
        const def = R.enemies[e.kind], maxHp = def.maxHp + (e.kind === 'keeper' ? 0 : Math.max(0, depth - 1) * 8);
        return { ...def, speed:def.speed*R.trials[trial].speed, damage:def.damage*R.trials[trial].damage, id: e.id, maxHp, hp: number(e.hp, maxHp, '阵灵气血', false), x: number(e.x, 1240, '阵灵位置', false), y: number(e.y, 710, '阵灵位置', false), slow: number(e.slow, 8, '寒针', false), burn: number(e.burn, 3, '燃烧', false), wind: 0, cooldown: 1, targetX: e.x, targetY: e.y };
      });
      s.run = { ...records,pendingInsight:r.pendingInsight??false,lootBlessed:r.lootBlessed??false,seek,trial,redraws:number(r.redraws??1,3,'重观次数'),supplyRefunds:number(r.supplyRefunds??0,2,'回补次数'),challenges:number(r.challenges??0,5,'险阵完成'),seed, depth, phase: r.phase, room: r.room, choices, boons, loot: r.loot.map(g => checkGear(g, false)), enemies,
        gathered: enumList(r.gathered, ['moon0', 'moon1', 'moon2'], 3, '秘境采集'), sealStep: number(r.sealStep, 3, '解阵进度'),
        inkUsed: r.inkUsed === true, found: enumList(r.found, ids, 5, '本局法宝'), recipeFound: enumList(r.recipeFound, R.recipeIds, 3, '本局图谱'),
        spiritGained: number(r.spiritGained, 1000, '本局灵蕴') };
      s.map = value.map;
    } else if (!['garden', 'ruins'].includes(value.map)) throw Error('秘境存档缺少本局记录。');
    // Result text is reconstructed from trusted local definitions; it cannot inject HTML.
    if (value.lastRun) {
      const r = value.lastRun;
      if (!['win', 'defeat', 'retreat'].includes(r.result)) throw Error('结算记录异常。');
      s.lastRun = { ...Records.validate(r),result: r.result, rooms: number(r.rooms, 5, '结算房间'), found: enumList(r.found, ids, 5, '结算法宝'), recipes: enumList(r.recipes, R.recipeIds, 3, '结算图谱'), spirit: number(r.spirit, 1000, '结算灵蕴'), challenges:number(r.challenges??0,5,'结算险阵') };
    }
    return s;
  }
  class Game extends Base.Game {
    constructor(options = {}) {
      const restored = options.save ? validateSave(options.save) : null;
      super(restored ? { ...options, save: { ...restored, version: 1, map: restored.run ? 'garden' : restored.map } } : options);
      if (restored) this.state = restored;
      else Object.assign(this.state, { version: 2, collection: emptyCollection(), run: null, lastRun: null });
      this.strikes = 0; this.counter = 0; this.afterDash = 0; this.jadeCd = 0;
      if (this.collides(this.state.x, this.state.y)) { this.state.x = this.state.run ? 180 : 560; this.state.y = 420; }
    }
    activeEnemies() { return this.state.run?.enemies || super.activeEnemies(); }
    equipped() { const c = this.state.collection; return c ? c.gear.filter(g => c.equipped.includes(g.id)) : []; }
    power(id) { if(!this.canUseSpiritualPower())return 0; const g = this.equipped().find(g => g.base === id); return g ? R.relics[id].values[g.level - 1] : 0; }
    hasBoon(id) { return this.canUseSpiritualPower() && !!this.state.run?.boons.includes(id); }
    memory(id) { if(!this.canUseSpiritualPower())return 0; return this.equipped().filter(g => g.memory === id).length; }
    affix(id) { if(!this.canUseSpiritualPower())return 0; return this.equipped().filter(g => g.affix === id).length; }
    learned(id) { return this.state.origin === id || this.state.collection.study[id] >= 2; }
    rng() { let n = this.state.run.seed; n ^= n << 13; n ^= n >>> 17; n ^= n << 5; this.state.run.seed = n >>> 0; return (n >>> 0) / 4294967296; }
    shuffled(values) { const a = [...values]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
    checkpoint() { this.events.push({ type: 'checkpoint' }); }
    proc(id, x = this.state.x, y = this.state.y) {
      if(!this.canUseSpiritualPower())return;
      const g = this.equipped().find(g => g.base === id);
      if (!g || this.effects.some(e => e.kind === 'relicProc' && e.age < .25)) return;
      this.effect('relicProc', x, y, { relic: id, level: g.level, life: .55 });
    }
    practice(path) {
      if(!this.canUseSpiritualPower())return;
      for (const g of this.equipped()) {
        if (g.memory) continue;
        g.practice[path] = Math.min(6, g.practice[path] + 1);
        if (g.practice[path] === 6) { g.memory = path; this.message(R.relics[g.base].name + '留下「' + R.paths[path].name + '」器忆：' + R.paths[path].desc); this.effect('attune', this.state.x, this.state.y, { life: .7 }); this.checkpoint(); }
      }
    }
    objects() {
      const r = this.state.run;
      if (!r) return [...super.objects(), ...(this.state.map === 'garden' ? [{ id: 'echoGate', kind: 'echoGate', name: '旧阵寻宝', x: 1030, y: 600 }] : [])];
      const objects = [{ id: 'return', kind: 'runExit', name: '撤离回山', x: 150, y: 600 }];
      if (r.phase !== 'active') return [...objects, { id: 'altar', kind: 'altar', name: r.phase === 'loot' ? '收取法宝' : '续行旧阵', x: 1015, y: 410 }];
      if (r.room === 'herb') [[550, 305], [900, 505], [650, 615]].forEach(([x, y], i) => { if (!r.gathered.includes('moon' + i)) objects.push({ id: 'moon' + i, kind: 'moonHerb', name: '月露草', x, y }); });
      if (r.room === 'seal') ['木', '火', '土'].forEach((name, i) => { if (i >= r.sealStep) objects.push({ id: 'seal' + i, kind: 'sealStone', name: name + '脉碑', x: [515, 880, 675][i], y: [305, 340, 585][i] }); });
      return objects;
    }
    startRun(seed = Date.now() >>> 0, seek = null) {
      if(!this.canUseSpiritualPower()){this.message('凡人之身不能再入旧阵修行，已藏器物仍在。');return false;}
      const s = this.state;
      if (s.run || s.map !== 'garden' || !s.flags.complete || s.hp <= 0 || seek!==null&&!owns(R.paths,seek)) return false;
      s.collection.runs = Math.min(1000000, s.collection.runs + 1); s.lastRun = null;
      s.run = { originSeed:(seed>>>0)||1,report:Records.fresh(),camps:[],history:[],pendingInsight:false,lootBlessed:false,seek,trial:'none',redraws:1,supplyRefunds:0,challenges:0,seed: (seed >>> 0) || 1, depth: 0, phase: 'boon', room: null, choices: [], boons: [], loot: [], enemies: [], gathered: [], sealStep: 0, inkUsed: false, found: [], recipeFound: [], spiritGained: 0 };
      for (const [id,minimum] of Object.entries(R.startingSupplies)) s.inventory[id] = Math.max(s.inventory[id], minimum);
      s.hp = 100; this.restoreSpirit(100); s.map = 'bamboo'; s.x = 180; s.y = 420; this.resetTransient();
      const favored = { sword: 'blade', medicine: 'herb', scholar: 'ward' }[s.origin];
      s.run.choices = [...new Set([favored,...(seek?[seek]:[]),...this.shuffled(list(R.boons).filter(id => id !== favored))])].slice(0,3);
      this.message('旧阵补足随身符药。法宝、图谱与札记随得随存；灵契仅在本局生效。'); this.checkpoint(); return true;
    }
    chooseBoon(id) {
      const r = this.state.run;
      if (!r || r.phase !== 'boon' || !r.choices.includes(id)) return false;
      r.boons.push(id); r.phase = 'route'; r.choices = r.depth === 4 ? ['boss'] : this.shuffled(['hunt', 'herb', 'seal']);
      this.checkpoint(); return true;
    }
    chooseCamp(id,kit=null){
      const s=this.state,r=s.run;
      if(!r||r.phase!=='camp'||!r.choices.includes(id)||r.camps.some(c=>c.depth===r.depth)||id==='supply'&&!owns(R.supplies,kit))return false;
      if(id==='rest'){s.hp=cap(s.hp+35+(this.learned('medicine')?10:0));this.restoreSpirit(cap(s.mp+35));}
      if(id==='supply')for(const [item,n]of Object.entries(R.supplies[kit]))this.gain(item,n);
      if(id==='insight'){r.redraws=Math.min(3,r.redraws+1);r.pendingInsight=true;}
      r.camps.push({depth:r.depth,choice:id,kit:id==='supply'?kit:null});
      this.nextBoon();this.message(R.camps[id].name+'已成，继续下一段山行。');this.checkpoint();return true;
    }
    nextBoon(){const r=this.state.run;r.phase='boon';r.choices=this.shuffled(list(R.boons).filter(id=>!r.boons.includes(id))).slice(0,3);}
    chooseRoute(id, trial='none') {
      const s = this.state, r = s.run;
      if (!r || r.phase !== 'route' || !r.choices.includes(id) || !owns(R.trials,trial)) return false;
      r.trial=trial;r.supplyRefunds=0;r.lootBlessed=false;
      r.depth++; r.history.push({depth:r.depth,room:id,trial});r.room = id; r.phase = 'active'; r.choices = []; r.loot = []; r.gathered = []; r.sealStep = 0; r.inkUsed = false;
      s.map = R.rooms[id].map; s.x = 180; s.y = 420; this.resetTransient();
      const kinds = id === 'boss' ? ['keeper'] : id === 'herb' ? ['deer', 'moth'] : id === 'seal' ? ['wisp', 'sentinel'] : this.shuffled(['reed', 'moth', 'sentinel', 'wisp']).slice(0, 3);
      const spots=this.shuffled([[[800,400],[990,520],[720,260]],[[740,540],[1030,300],[800,260]],[[910,400],[650,580],[1050,570]]])[0];
      r.enemies = kinds.map((kind, i) => {
        const def = R.enemies[kind], maxHp = def.maxHp + (kind === 'keeper' ? 0 : (r.depth - 1) * 8);
        return { ...def, speed:def.speed*R.trials[trial].speed, damage:def.damage*R.trials[trial].damage, id: 'echo-' + i, maxHp, hp: maxHp, x: spots[i][0], y: spots[i][1], slow: 0, burn: 0, wind: 0, cooldown: 1, targetX: 800, targetY: 400 };
      });
      if (id === 'seal' && this.learned('scholar')) { r.sealStep = 1; this.message('辨脉所学先解木碑：接下来触碰火碑、土碑。'); }
      if (this.learned('sword')) this.message('运剑所学：在秘境中闪避后，下一次有效剑击额外 +6 伤害。');
      this.message(R.rooms[id].desc); this.checkpoint(); return true;
    }
    learnRecipe(id) {
      const c = this.state.collection;
      if (!c.recipes.includes(id)) { c.recipes.push(id); this.state.run?.recipeFound.push(id); this.message('永久习得图谱：' + D.items[id].name + '，回药庐即可炼制。'); }
    }
    note(id) { const c = this.state.collection; if (!c.notes.includes(id)) { c.notes.push(id); this.message('记下札记「' + R.notes[id].title + '」，回山可以与沈灵薇谈起。'); } }
    clearRoom() {
      const s = this.state, r = s.run;
      if (!r || r.phase !== 'active') return false;
      r.phase = 'loot'; r.choices = [];
      const amount = (r.room === 'boss' ? 30 : 15)+(r.trial!=='none'?10:0);
      if(r.trial!=='none')r.challenges++;
      s.collection.spirit = Math.min(1000000, s.collection.spirit + amount); r.spiritGained += amount;
      s.hp = cap(s.hp + 12 + (this.hasBoon('herb') ? 10 : 0)); this.restoreSpirit(cap(s.mp + 12 + this.power('map')));
      if (r.room !== 'boss') {
        const study = { hunt: 'sword', herb: 'medicine', seal: 'scholar' }[r.room], prev = s.collection.study[study];
        s.collection.study[study] = Math.min(99, prev + 1);
        if (prev === 1 && s.origin !== study) this.message('旁修有成：习得' + D.origins[study].name + '的秘境专长。');
      }
      this.note({ hunt: 'rain', herb: 'herb', seal: 'seal', boss: 'keeper' }[r.room]);
      if (r.room === 'herb') { this.learnRecipe('tea'); if (s.gender === 'female') this.note('women'); }
      if (r.room === 'seal') this.learnRecipe('incense');
      if (r.room === 'hunt') this.learnRecipe('needle');
      r.lootBlessed=r.pendingInsight;r.pendingInsight=false;
      r.loot = this.rollLoot();
      r.enemies.forEach(e => { e.wind = 0; }); this.resetTransient();
      if (r.room === 'boss') this.effect('resonance', s.x, s.y, { life: .8 });
      this.events.push({ type: 'expedition' }); this.checkpoint(); return true;
    }
    rollLoot(){
      const r=this.state.run,c=this.state.collection,all=this.shuffled(list(R.relics));
      const desired=r.seek||R.rooms[r.room].reward;
      const favored=all.find(id=>R.relics[id].path===desired&&!c.gear.some(g=>g.base===id))||all.find(id=>R.relics[id].path===desired);
      return [favored,...all.filter(id=>id!==favored)].slice(0,3).map((base,i)=>{
        const unseen=list(R.affixes).filter(a=>!c.gear.some(g=>g.id===base+'_'+a)),pool=unseen.length?unseen:list(R.affixes);
        return {base,affix:pool[Math.floor(this.rng()*pool.length)],level:r.room==='boss'||(r.trial!=='none'||r.lootBlessed)&&i===0||this.rng()<.14?2:1};
      });
    }
    redrawLoot(){const r=this.state.run;if(!r||r.phase!=='loot'||r.redraws<=0)return false;r.redraws--;r.loot=this.rollLoot();this.message('重观三件法宝，剩余 '+r.redraws+' 次。寻器方向与本段通灵机缘保留。');this.checkpoint();return true;}
    claimLoot(index) {
      const r = this.state.run, c = this.state.collection;
      if (!r || r.phase !== 'loot' || !Number.isInteger(index) || !r.loot[index]) return false;
      const item = r.loot[index], id = item.base + '_' + item.affix;
      let owned = c.gear.find(g => g.id === id);
      if (owned) { owned.level = Math.max(owned.level, item.level); c.spirit = Math.min(1000000, c.spirit + 10); r.spiritGained += 10; this.message('同源法宝融入收藏，品质择高，并获得灵蕴 ×10。'); }
      else {
        owned = { ...item, id, memory: null, practice: Object.fromEntries(list(R.paths).map(p => [p, 0])) }; c.gear.push(owned);
        if (c.equipped.length < 3 && !this.equipped().some(g => g.base === owned.base)) c.equipped.push(id);
        this.message('法宝入藏：' + R.relics[item.base].name + ' · ' + R.affixes[item.affix].name);
      }
      if (!r.found.includes(id)) r.found.push(id);
      r.loot = [];
      if (r.depth === 5) this.finishRun('win');
      else if([2,4].includes(r.depth)&&!r.camps.some(c=>c.depth===r.depth)){r.phase='camp';r.choices=list(R.camps);}
      else this.nextBoon();
      this.checkpoint(); return true;
    }
    finishRun(result) {
      const s = this.state, r = s.run;
      if (!r) return false;
      s.lastRun = { originSeed:r.originSeed,history:copy(r.history),camps:copy(r.camps),report:copy(r.report),result, rooms: r.phase === 'active' ? r.depth - 1 : r.depth, found: [...r.found], recipes: [...r.recipeFound], spirit: r.spiritGained, challenges:r.challenges };
      if (result === 'win') s.collection.clears = Math.min(1000000, s.collection.clears + 1);
      s.run = null; s.map = 'garden'; s.x = 920; s.y = 585; s.hp = 100; this.restoreSpirit(100);
      this.resetTransient(); this.events = this.events.filter(e => !['defeat', 'expedition'].includes(e.type));
      this.events.push({ type: 'expeditionEnd' }); this.checkpoint(); return true;
    }
    equip(id) {
      const c = this.state.collection, g = c.gear.find(g => g.id === id);
      if (!g || this.state.hp <= 0) return false;
      if (c.equipped.includes(id)) c.equipped = c.equipped.filter(x => x !== id);
      else {
        const same = this.equipped().find(x => x.base === g.base);
        if (same) c.equipped = c.equipped.filter(x => x !== same.id);
        if (c.equipped.length >= 3) { this.message('最多携带三件法宝，请先卸下一件。'); return false; }
        c.equipped.push(id);
      }
      this.counter = 0; this.afterDash = 0; this.strikes = 0; this.checkpoint(); return true;
    }
    upgrade(id) {
      if (!this.canUseSpiritualPower()) { this.message('归凡或封功后不能再以灵力炼器升品，已有器物与灵蕴保留。'); return false; }
      const c = this.state.collection, g = c.gear.find(g => g.id === id), cost = g?.level === 1 ? 25 : 60;
      if (!g || g.level === 3 || c.spirit < cost || this.state.run || this.state.map !== 'garden') return false;
      c.spirit -= cost; g.level++;
      this.effect('ascend', this.state.x, this.state.y, { life: 1.8 }); this.message(R.relics[g.base].name + '升为' + R.tiers[g.level - 1] + '，器物效用与灵光一并增强。'); this.checkpoint(); return true;
    }
    craft(id) { if (D.recipes[id]?.unlock && !this.state.collection.recipes.includes(id)) return false; return super.craft(id); }
    useItem(id, target) {
      const s = this.state; let used = false;
      if (s.run && s.run.phase !== 'active') return false;
      if (id === 'tea') {
        if (s.hp <= 0 || s.inventory.tea <= 0 || s.hp === 100 && (!this.canUseSpiritualPower() || s.mp === 100)) { this.message('当前无需用茶，或行囊中已无温养茶。'); return false; }
        s.inventory.tea--; s.stats.used++; s.hp = cap(s.hp + 20); this.restoreSpirit(cap(s.mp + 45)); this.effect('heal', s.x, s.y); used = true;
      } else { this.hitSource = id; try { used = super.useItem(id, target); } finally { this.hitSource = null; } }
      if (!used) return false;
      if (id === 'incense') {
        this.lure.life += this.power('censer') + (this.hasBoon('scent') ? 4 : 0);
        if (this.activeEnemies().some(e => e.hp > 0 && dist(e, this.lure) < 470)) this.practice('scent');
      }
      if (id === 'needle' && this.hasBoon('frost')) for (const e of this.activeEnemies()) if (e.slow >= 5) e.slow = 8;
      if (['potion', 'tea', 'cake'].includes(id)) {
        s.hp = cap(s.hp + this.memory('herb') * 4 + this.affix('kind') * 2 + (this.hasBoon('herb') ? 15 : 0));
        this.ward = Math.max(this.ward, this.power('flask')); this.practice('herb'); this.proc('flask');
      }
      const r = s.run;
      if (id === 'fire' && r && this.power('inkstone') && !r.inkUsed) { r.inkUsed = true; this.gain('needle', this.power('inkstone')); this.message('流金砚化余墨为寒针。'); }
      return true;
    }
    attack(target) { if (this.state.run && this.state.run.phase !== 'active') return false; this.hitSource = 'blade'; this.swingCounted = false; try { return super.attack(target); } finally { this.hitSource = null; } }
    dodge(vector) {
      if (this.state.run && this.state.run.phase !== 'active') return false;
      const reduced = this.hasBoon('blade'), s = this.state;
      const initial = s.mp;
      if (reduced && s.mp >= 8 && s.mp < 12) this.restoreSpirit(s.mp+(4));
      else if (reduced && s.mp < 8) return false;
      const ok = super.dodge(vector);
      if (ok) { if (reduced) this.restoreSpirit(initial - 8); this.afterDash = 3; }
      else this.restoreSpirit(initial);
      return ok;
    }
    hitEnemy(e, amount) {
      if (e.hp <= 0) return;
      const s = this.state, source = this.hitSource;
      const lured = this.lure && dist(e, this.lure) < 470;
      if (source === 'blade') {
        amount += this.affix('keen') * 2 + this.memory('blade') * 3;
        if (e.slow > 0) { amount += this.power('mirror') + this.memory('frost') * 6 + (this.hasBoon('frost') ? 14 : 0); this.proc('mirror',e.x,e.y); }
        if (lured) { amount += this.power('bell') + this.memory('scent') * 7 + (this.hasBoon('scent') ? 16 : 0); this.proc('bell',e.x,e.y); }
        if (this.afterDash > 0) { amount += this.power('bamboo') + (this.hasBoon('blade') ? 18 : 0) + (s.run && this.learned('sword') ? 6 : 0); this.afterDash = 0; }
        amount += this.counter; this.counter = 0;
        if (!this.swingCounted) { this.swingCounted = true; this.strikes++; this.practice('blade'); }
      } else if (source === 'fire') {
        amount += this.memory('ember') * 7 + (this.hasBoon('ember') ? 12 : 0);
        this.restoreSpirit(cap(s.mp + this.power('scroll') + (this.hasBoon('ember') ? 8 : 0))); this.practice('ember');
      } else if (source === 'needle') this.practice('frost');
      const wasBurning = e.burn > 0 || source === 'fire';
      super.hitEnemy(e, amount);
      if (e.hp <= 0 && wasBurning) s.hp = cap(s.hp + this.power('lantern'));
      if (source === 'blade' && this.strikes >= 3 && this.power('chime')) {
        this.strikes = 0; this.effect('resonance', e.x, e.y, { life: .7 });
        for (const other of this.activeEnemies()) if (other.hp > 0 && dist(e, other) < 145) {
          const burning = other.burn > 0; super.hitEnemy(other, this.power('chime'));
          if (other.hp <= 0 && burning) s.hp = cap(s.hp + this.power('lantern'));
        }
      }
    }
    takeDamage(amount) {
      const run=this.state.run,hp=this.state.hp,hurt=this.hurtCd;
      const blocked = this.guard && this.state.mp >= 8 && this.dash <= 0 && this.hurtCd <= 0 && this.state.hp > 0;
      super.takeDamage(amount * Math.max(.5, 1 - this.memory('ward') * .08 - this.affix('firm') * .03));
      if(run&&this.hurtCd>hurt){const damage=Math.max(0,hp-this.state.hp);run.report.damage+=damage;if(damage>0){run.report.hits++;run.report.lastThreat=owns(R.enemies,this.incomingEnemy?.kind)?this.incomingEnemy.kind:null;}if(blocked)run.report.blocks++;}
      if (this.state.hp <= 0) { if (this.state.run) this.finishRun('defeat'); return; }
      if (blocked) {
        this.counter = this.power('bracers') + (this.hasBoon('ward') ? 20 : 0);
        if (this.jadeCd <= 0) { this.state.hp = cap(this.state.hp + this.power('jade') + (this.hasBoon('ward') ? 3 : 0)); this.jadeCd = 2; }
        this.practice('ward');
      }
    }
    enemyStep(e, dt) {
      if (!this.state.run) { if (!owns(R.enemies, e.kind)) return super.enemyStep(e, dt); return; }
      if (e.hp <= 0 || this.state.run.phase !== 'active') return;
      e.slow = Math.max(0, e.slow - dt);
      if (e.burn > 0) { e.burn = Math.max(0, e.burn - dt); const hp = e.hp; e.hp = Math.max(.001, e.hp - dt * (this.relaxed ? 13.2 : 8)); if (hp <= dt * (this.relaxed ? 13.2 : 8)) this.hitEnemy(e, 1); if (e.hp <= 0) return; }
      e.cooldown = Math.max(0, e.cooldown - dt);
      if (e.wind > 0) {
        e.wind -= dt;
        if (e.wind <= 0) {
          this.effect('impact', e.targetX, e.targetY, { life: .5 });
          if (Combat.hits(e,this.state)) this.takeDamage(e.damage);
          e.cooldown = e.kind === 'keeper' && e.hp < e.maxHp / 2 ? .7 : 1.25;
        }
        return;
      }
      const attracted = e.kind !== 'keeper' && this.lure && dist(e, this.lure) < 470;
      const target = attracted ? this.lure : this.state, d = dist(e, target);
      if (d > 560) return;
      if (d < (attracted ? 24 : e.reach)) {
        if (!attracted && e.cooldown <= 0) { e.wind = e.kind === 'keeper' ? 1.05 : .85; e.targetX = this.state.x; e.targetY = this.state.y; }
      } else this.move(e, (target.x - e.x) / d * e.speed * (e.slow > 0 ? .32 : 1) * dt, (target.y - e.y) / d * e.speed * (e.slow > 0 ? .32 : 1) * dt, 20);
    }
    step(dt, input) {
      if (this.state.run && this.state.run.phase !== 'active') return;
      const activeRun = this.state.run;
      if(activeRun)activeRun.report.elapsed+=Math.max(0,Math.min(dt,.04));
      super.step(dt, input);
      this.afterDash = Math.max(0, this.afterDash - Math.min(dt, .04)); this.jadeCd = Math.max(0, this.jadeCd - Math.min(dt, .04));
      this.restoreSpirit(cap(this.state.mp + this.affix('calm') * .4 * Math.min(dt, .04)));
      const r = this.state.run;
      if (r && r === activeRun && ['hunt', 'boss'].includes(r.room) && r.enemies.every(e => e.hp <= 0)) this.clearRoom();
    }
    resetTransient() {
      super.resetTransient(); this.counter = 0; this.afterDash = 0; this.strikes = 0; this.jadeCd = 0;
      this.state.run?.enemies.forEach(e => { e.wind = 0; e.cooldown = 1; e.slow = 0; e.burn = 0; });
    }
    interact() {
      const o = this.nearest(), r = this.state.run;
      if (!o || this.state.hp <= 0) return super.interact();
      if (o.kind === 'echoGate' || o.kind === 'altar') { this.events.push({ type: 'expedition' }); return; }
      if (o.kind === 'runExit') { this.events.push({ type: 'retreat' }); return; }
      if (r?.phase === 'active' && o.kind === 'moonHerb') {
        r.gathered.push(o.id); this.gain('herb', (this.learned('medicine') ? 3 : 2)+this.recipeBonus); this.practice('herb');
        if (this.learned('medicine')) { this.state.hp = cap(this.state.hp + 8); this.message('辨药所学：多取一份嫩叶，并以清露回复 8 气血。'); }
        if (r.gathered.length === 3) this.clearRoom(); else this.message('已采得月露草 ' + r.gathered.length + '/3。可绕开守护灵继续寻药。');
        this.checkpoint(); return;
      }
      if (r?.phase === 'active' && o.kind === 'sealStone') {
        if (o.id === 'seal' + r.sealStep) { r.sealStep++; this.effect('resonance', o.x, o.y, { life: .8 }); if (r.sealStep === 3) this.clearRoom(); else this.message('灵脉相接。下一处是' + ['木', '火', '土'][r.sealStep] + '碑。'); }
        else this.message('灵脉没有相接。碑文提示：木生火，火归土。顺序应是木 → 火 → 土。');
        this.checkpoint(); return;
      }
      if (o.kind === 'npc' && this.state.flags.complete && this.state.collection.notes.some(id => !this.state.collection.shared.includes(id))) {
        this.events.push({ type: 'reunion' }); return;
      }
      super.interact();
    }
    shareNotes(companionship) {
      const s = this.state, c = s.collection;
      if (!['close', 'friend'].includes(companionship) || s.map !== 'garden' || !s.flags.complete || dist(s, { x: 300, y: 350 }) >= 93) return false;
      const fresh = c.notes.filter(id => !c.shared.includes(id)); if (!fresh.length) return false;
      c.shared.push(...fresh); c.companionship = companionship; s.bond = Math.min(99, s.bond + fresh.length);
      this.gain('tea', fresh.includes('women') ? 2 : 1); this.checkpoint(); return true;
    }
    objective() {
      const r = this.state.run;
      if (!r) return this.state.flags.complete ? ['旧阵有余音', '从药庐东南阵台开始短局寻宝；获得的法宝可在「法宝」中装备与升级。'] : super.objective();
      if (r.phase !== 'active') return ['收获已留下', '打开「秘境」或走近阵台，选择法宝、灵契与下一段路线。'];
      const progress = r.room === 'herb' ? r.gathered.length + '/3 株月露草' : r.room === 'seal' ? r.sealStep + '/3 处灵脉' : r.enemies.filter(e => e.hp <= 0).length + '/' + r.enemies.length + ' 道阵灵';
      return [r.depth + '/5 · ' + R.rooms[r.room].name, progress + '。' + R.rooms[r.room].desc];
    }
    exportSave() { return copy({ ...this.state, buffs: { ward: this.ward } }); }
  }
  const api = { ...Base, Game, validateSave, expedition: R };
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(globalThis);
