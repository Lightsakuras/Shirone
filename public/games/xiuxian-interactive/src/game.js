(function (root) {
  'use strict';
  const Combat=typeof module==='object'&&module.exports?require('./combat.js'):root.XiuxianCombat;
  const D = typeof module === 'object' && module.exports ? require('./data.js') : root.XiuxianData;
  const clone = x => JSON.parse(JSON.stringify(x));
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const FLAGS = ['accepted', 'trained', 'inscription', 'supplied', 'cache', 'complete', 'wildStudy'];
  function fresh(gender = 'female', origin = 'sword') {
    const inventory = Object.fromEntries(Object.keys(D.items).map(k => [k, 0]));
    Object.assign(inventory, { fire: 3, needle: 3, incense: 2, potion: 2, ward: 1, paper: 2, dust: 1 });
    if (origin === 'sword') inventory.ward++;
    if (origin === 'medicine') { inventory.potion++; inventory.herb = 2; }
    if (origin === 'scholar') inventory.fire += 2;
    return { version: 1, gender, origin, map: 'garden', x: 560, y: 392, hp: 100, mp: 100,
      inventory, flags: Object.fromEntries(FLAGS.map(k => [k, false])), gathered: [], vineHp: 90,
      bond: 0, playTime: 0, exploration: { version: 1, visited: [] }, buffs: { ward: 0 }, stats: { kills: 0, used: 0, crafted: 0 },
      enemies: D.enemies.map(e => ({ ...e, hp: e.maxHp, slow: 0, burn: 0, wind: 0, cooldown: 0.8, targetX: e.x, targetY: e.y })) };
  }
  function validateSave(value) {
    if (!value || typeof value !== 'object' || value.version !== 1 || !['female', 'male'].includes(value.gender) || !Object.hasOwn(D.origins, value.origin) || !Object.hasOwn(D.maps, value.map)) throw Error('不是此原型支持的存档。');
    const s = fresh(value.gender, value.origin);
    const number = (n, min, max, label, integer = false) => {
      if (typeof n !== 'number' || !Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw Error('存档数据异常：' + label);
      return n;
    };
    s.map = value.map;
    if(value.exploration!==undefined){
      const e=value.exploration,allowed=Object.keys(D.maps).filter(id=>!['bamboo','valley','sanctum'].includes(id));
      if(!e||typeof e!=='object'||Array.isArray(e)||Object.keys(e).length!==2||e.version!==1||!Array.isArray(e.visited)||e.visited.length>allowed.length||new Set(e.visited).size!==e.visited.length||e.visited.some(id=>!allowed.includes(id)))throw Error('存档探索足迹异常。');
      s.exploration={version:1,visited:[...e.visited]};
    }else delete s.exploration;
    s.buffs.ward = number(value.buffs?.ward ?? 0, 0, 15, '护身状态');
    for (const [key, max] of [['x', 1240], ['y', 710], ['hp', 100], ['mp', 100], ['vineHp', 90], ['bond', 99], ['playTime', 100000000]]) s[key] = number(value[key], 0, max, key);
    if (s.x < 40 || s.y < 70) throw Error('存档位置不在地图内。');
    for (const id of Object.keys(D.items)) s.inventory[id] = number(value.inventory?.[id], 0, 999, id, true);
    for (const key of FLAGS) {
      if (typeof value.flags?.[key] !== 'boolean') throw Error('存档任务记录不完整。');
      s.flags[key] = value.flags[key];
    }
    const ids = ['herb1', 'herb2', 'herb3', 'wildHerb'];
    if (!Array.isArray(value.gathered) || value.gathered.length > ids.length || value.gathered.some(id => !ids.includes(id)) || new Set(value.gathered).size !== value.gathered.length) throw Error('存档采集记录异常。');
    s.gathered = [...value.gathered];
    for (const key of Object.keys(s.stats)) s.stats[key] = number(value.stats?.[key], 0, 1000000, key, true);
    if (!Array.isArray(value.enemies) || value.enemies.length !== D.enemies.length) throw Error('存档敌人记录异常。');
    s.enemies = D.enemies.map(def => {
      const e = value.enemies.find(e => e?.id === def.id);
      if (!e) throw Error('存档缺少石傀记录。');
      return { ...def, hp: number(e.hp, 0, def.maxHp, def.id), x: number(e.x, 40, 1240, '石傀位置'), y: number(e.y, 70, 710, '石傀位置'), slow: 0, burn: 0, wind: 0, cooldown: 1, targetX: e.x, targetY: e.y };
    });
    if (s.flags.complete && (!s.flags.accepted || s.inventory.box !== 0)) throw Error('存档交付记录异常。');
    return s;
  }
  class Game {
    constructor(options = {}) {
      this.state = options.save ? validateSave(options.save) : fresh(options.gender, options.origin);
      this.playMode=['relaxed','challenge'].includes(options.playMode)?options.playMode:'classic';
      this.peaceTime=0;
      this.events = []; this.effects = []; this.lure = null; this.face = { x: 1, y: 0 };
      this.attackCd = 0; this.dashCd = 0; this.dash = 0; this.ward = this.state.buffs.ward; this.hurtCd = 0; this.guard = false;
      this.dashVector = { x: 1, y: 0 };
      if (this.collides(this.state.x, this.state.y)) { this.state.x = this.state.map === 'garden' ? 560 : 150; this.state.y = 390; }
    }
    get relaxed(){return this.playMode==='relaxed';}
    get taskRecipe(){
      const s=this.state;
      return s.map==='garden'&&s.flags.accepted&&!s.flags.complete&&!s.inventory.box&&!s.research?.observed.includes('craftPotion')?'potion':null;
    }
    get recipeBonus(){return this.relaxed?1:0;}
    message(text) { this.events.push({ type: 'message', text }); }
    effect(kind, x, y, extra = {}) { this.effects.push({ kind, x, y, age: 0, life: .55, ...extra }); }
    gain(id, amount) { this.state.inventory[id] = Math.min(999, this.state.inventory[id] + amount); }
    objects() {
      return D.maps[this.state.map].objects.filter(o => !(o.kind === 'herb' && this.state.gathered.includes(o.id)) && !(o.id === 'vine' && this.state.vineHp <= 0) && !(o.id === 'chest' && (this.state.inventory.box || this.state.flags.complete)));
    }
    canUseSpiritualPower() { return true; }
    spiritualRank() { return this.canUseSpiritualPower() ? (this.state.chapter?.rank || 0) : 0; }
    restoreSpirit(value) { this.state.mp = this.canUseSpiritualPower() ? clamp(value, 0, 100) : 0; return this.state.mp; }
    activeEnemies() { return this.state.map === 'ruins' ? this.state.enemies : []; }
    nearest() { return this.objects().filter(o => distance(this.state, o) < 93).sort((a, b) => distance(this.state, a) - distance(this.state, b))[0]; }
    walls() {
      const walls = D.maps[this.state.map].walls.slice();
      if (this.state.map === 'ruins' && this.state.vineHp > 0) walls.push({ x: 604, y: 316, w: 60, h: 130 });
      return walls;
    }
    collides(x, y, radius = 15) {
      if (x < 40 + radius || x > 1240 - radius || y < 70 + radius || y > 710 - radius) return true;
      return this.walls().some(r => Math.hypot(x - clamp(x, r.x, r.x + r.w), y - clamp(y, r.y, r.y + r.h)) < radius);
    }
    move(actor, dx, dy, radius = 15) {
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 8));
      for (let i = 0; i < steps; i++) {
        if (!this.collides(actor.x + dx / steps, actor.y, radius)) actor.x += dx / steps;
        if (!this.collides(actor.x, actor.y + dy / steps, radius)) actor.y += dy / steps;
      }
    }
    step(dt, input = {}) {
      dt = clamp(dt, 0, .04);
      const s = this.state;
      if (s.hp <= 0) return;
      s.playTime += dt;
      for (const key of ['attackCd', 'dashCd', 'dash', 'ward', 'hurtCd']) this[key] = Math.max(0, this[key] - dt);
      this.guard = this.canUseSpiritualPower() && !!input.guard && s.mp > 1 && this.dash <= 0;
      this.restoreSpirit(clamp(s.mp + (this.guard ? -4 : 4) * dt, 0, 100));
      let x = input.x || 0, y = input.y || 0;
      const length = Math.hypot(x, y);
      if (length) { x /= length; y /= length; this.face = { x, y }; this.moveFacing = { x, y }; }
      if (input.aim) {
        const ax = input.aim.x - s.x, ay = input.aim.y - s.y, l = Math.hypot(ax, ay);
        if (l > 5) this.face = { x: ax / l, y: ay / l };
      }
      this.moving = length > 0;
      if (this.dash > 0) this.move(s, this.dashVector.x * 640 * dt, this.dashVector.y * 640 * dt);
      else this.move(s, x * (this.guard ? 90 : 195) * (this.walkFactor || 1) * dt, y * (this.guard ? 90 : 195) * (this.walkFactor || 1) * dt);
      this.effects.forEach(e => e.age += dt); this.effects = this.effects.filter(e => e.age < e.life);
      if (this.lure) { this.lure.life -= dt; if (this.lure.life <= 0) this.lure = null; }
      for (const e of this.activeEnemies()) this.enemyStep(e, dt);
    }
    dodge(vector = this.face) {
      if (!this.canUseSpiritualPower()) { this.message('凡人之身不能运灵闪避，可步行避开来势。'); return false; }
      if (this.state.hp <= 0 || this.dashCd > 0) return false;
      if (this.state.mp < 12) { this.message('灵力不足，稍息片刻再闪避。'); return false; }
      const len = Math.hypot(vector.x, vector.y) || 1;
      this.dashVector = { x: vector.x / len, y: vector.y / len };
      this.restoreSpirit(this.state.mp-(12)); this.dash = .19; this.dashCd = .85;
      this.effect('dash', this.state.x, this.state.y); return true;
    }
    resolveEnemyDamage(e, amount) { return amount; }
    hitEnemy(e, amount) {
      if (e.hp <= 0) return;
      amount = this.resolveEnemyDamage(e, amount) * (this.relaxed ? 1.65 : 1);
      if (amount <= 0) return;
      e.hp = Math.max(0, e.hp - amount);
      this.effect('number', e.x, e.y - 28, { text: '-' + Math.round(amount), color: '#efd7a2', life: .8, recipientId: e.id, recipientName: e.name || '石傀', numberChannel: 'hp' });
      if (e.hp === 0) { this.state.stats.kills++; this.gain('dust', 2); this.message((e.name || '石傀') + '散去，获得灵砂 ×2。'); this.effect('burst', e.x, e.y); }
    }
    attack(target) {
      if (this.state.hp <= 0 || this.attackCd > 0) return false;
      const s = this.state;
      if (target && distance(s, target) > 1) { const l = distance(s, target); this.face = { x: (target.x - s.x) / l, y: (target.y - s.y) / l }; }
      this.attackCd = .36;
      this.effect('slash', s.x, s.y, { angle: Math.atan2(this.face.y, this.face.x), life: .24 });
      const inArc = p => { const l = distance(s, p); return l < 88 + (this.autoSwing && this.relaxed ? 18 : 0) && (l < 32 || ((p.x - s.x) * this.face.x + (p.y - s.y) * this.face.y) / l > .2); };
      {
        if(this.arsenal?.gear.school&&this.canFight()&&!this.state.chapter?.training&&this.canUseSpiritualPower())this.arsenal.attack(target);
        else for (const e of this.activeEnemies()) if (e.hp > 0 && inArc(e)) this.hitEnemy(e, 23 + (s.flags.trained ? (s.origin === 'sword' ? 9 : 3) : 0));
        if (s.map === 'ruins' && s.vineHp > 0 && inArc({ x: 634, y: 381 })) { s.vineHp = Math.max(0, s.vineHp - 18); this.effect('leaf', 634, 381); if (!s.vineHp) this.message('枯藤斩断，前路已通。'); }
      }
      return true;
    }
    useItem(id, target) {
      if (!this.canUseSpiritualPower() && ['fire','needle','ward','incense'].includes(id)) { this.message('凡人之身不能催动符箓或引灵香。'); return false; }
      const s = this.state, def = D.items[id];
      if (s.hp <= 0 || !def || (!def.key && id !== 'cake')) return false;
      if (s.inventory[id] <= 0) { this.message(def.name + '已用完，可返回药庐补充。'); return false; }
      if (id === 'potion' && s.hp >= 100 && (!this.canUseSpiritualPower() || s.mp >= 100) || id === 'cake' && s.hp >= 100) { this.message('当前状态已满，这份药食先留着。'); return false; }
      if (id === 'ward' && this.ward > 0) { this.message('护身符仍在生效，不必重复消耗。'); return false; }
      const point = target || { x: s.x + this.face.x * 130, y: s.y + this.face.y * 130 };
      const length = distance(s, point), scale = length > 250 ? 250 / length : 1;
      const p = { x: clamp(s.x + (point.x - s.x) * scale, 55, 1225), y: clamp(s.y + (point.y - s.y) * scale, 85, 695) };
      if (id === 'incense' && this.collides(p.x, p.y, 5)) { this.message('此处放不下引灵香，请指向空地。'); return false; }
      s.inventory[id]--; s.stats.used++;
      if (id === 'potion' || id === 'cake') {
        s.hp = Math.min(100, s.hp + (id === 'potion' ? 45 : 18)); if (id === 'potion') this.restoreSpirit(Math.min(100, s.mp + 30));
        this.effect('heal', s.x, s.y); this.message('服用' + def.name + '，气息渐稳。');
      } else if (id === 'ward') { this.ward = 12; this.message('护身符生效，12 秒内减伤 65%。'); }
      else if (id === 'incense') { this.lure = { ...p, life: 8 }; this.message('引灵香已点燃，附近石傀会追随香气。'); }
      else {
        this.effect(id, p.x, p.y, { life: .7 });
        {
          for (const e of this.activeEnemies()) if (e.hp > 0 && distance(e, p) < (id === 'fire' ? 92 : 60)) { this.hitEnemy(e, id === 'fire' ? 36 : 15); if (id === 'fire') e.burn = 3; else e.slow = 5; }
          if (s.map === 'ruins' && id === 'fire' && s.vineHp > 0 && distance(p, { x: 634, y: 381 }) < 105) { s.vineHp = 0; this.message('燃火符烧除了枯藤，一条小径显露出来。'); }
        }
      }
      return true;
    }
    enemyStep(e, dt) {
      if (e.hp <= 0) return;
      e.slow = Math.max(0, e.slow - dt);
      if (e.burn > 0) { e.burn = Math.max(0, e.burn - dt); const old = e.hp; e.hp = Math.max(.001, e.hp - dt * (this.relaxed ? 13.2 : 8)); if (old <= dt * (this.relaxed ? 13.2 : 8)) this.hitEnemy(e, 1); if (e.hp <= 0) return; }
      e.cooldown = Math.max(0, e.cooldown - dt);
      if (e.wind > 0) {
        e.wind -= dt;
        if (e.wind <= 0) {
          this.effect('impact', e.targetX, e.targetY, { life: .45 });
          if (Combat.hits(e,this.state)) this.takeDamage(e.damage);
          e.cooldown = 1.1;
        }
        return;
      }
      const attracted = this.lure && distance(e, this.lure) < 470;
      const target = attracted ? this.lure : this.state;
      const d = distance(e, target);
      if (d > (attracted ? 470 : 360)) return;
      if (d < (attracted ? 22 : 63)) {
        if (!attracted && e.cooldown <= 0) { e.wind = .75; e.targetX = this.state.x; e.targetY = this.state.y; }
      } else this.move(e, (target.x - e.x) / d * e.speed * (e.slow > 0 ? .32 : 1) * dt, (target.y - e.y) / d * e.speed * (e.slow > 0 ? .32 : 1) * dt, 20);
    }
    takeDamage(amount) {
      if (this.dash > 0 || this.hurtCd > 0 || this.state.hp <= 0) return;
      const blocked = this.canUseSpiritualPower() && this.guard && this.state.mp >= 8;
      if (blocked) this.restoreSpirit(this.state.mp-(8));
      this.peaceTime=0;
      amount *= (this.relaxed ? .45 : 1) * (blocked ? .2 : 1) * (this.canUseSpiritualPower() && this.ward > 0 ? .35 : 1);
      if(this.trialProfile?.origin==='rain'&&!this.lockTriggered&&amount>=this.state.hp-25){this.lockTriggered=true;this.hurtCd=2.5;this.effect('resonance',this.state.x,this.state.y);return;}
      if(amount>=this.state.hp && this.arsenal?.gear.sets.star>=4 && this.arsenal.shield<=0){amount=Math.max(0,this.state.hp-1);this.arsenal.shield=45;this.ward=3;this.effect('resonance',this.state.x,this.state.y);}
      this.state.hp = Math.max(0, this.state.hp - amount); this.hurtCd = .6;
      if(this.state.hp===0&&this.arsenal?.store.state.trial?.ward&&this.arsenal.store.useDeathWard()){this.state.hp=50;this.hurtCd=1.5;this.effect('resonance',this.state.x,this.state.y);this.message('渡劫护道符护住心脉，气血回复五成。');}
      this.effect('number', this.state.x, this.state.y - 35, { text: '-' + Math.round(amount), color: '#e89788', life: .8, recipientId: 'player', recipientName: '自身', numberChannel: 'hp' });
      if (this.state.hp <= 0) {
        if(this.relaxed)for(const [id,n] of Object.entries({potion:2,fire:3,needle:3,ward:1,incense:2,qingxin:2})){
          if(id in this.state.inventory)this.state.inventory[id]=Math.max(n,this.state.inventory[id]);
        }
        this.events.push({type:'defeat'});
      }
    }
    retry() {
      const s = this.state; s.map = 'garden'; s.x = 560; s.y = 392; s.hp = 100; this.restoreSpirit(100);
      this.resetTransient(); this.message('师姐替你调息。已获得的物品与调查记录保留，再去试试。');
    }
    resetTransient() { this.effects = []; this.lure = null; this.ward = 0; this.dash = 0; this.hurtCd = 0; this.guard = false; this.state.enemies.forEach(e => { e.wind = 0; e.cooldown = 1; e.slow = 0; e.burn = 0; }); }
    interact() {
      if (this.state.hp <= 0) return;
      const s = this.state, o = this.nearest();
      if (!o) { this.message('走近物件，按 E 查看或拾取。'); return; }
      const dialogue = text => this.events.push({ type: 'dialogue', title: o.name, text, portrait: o.kind === 'npc' ? 'shen_ling_wei' : null });
      if (o.kind === 'npc') {
        if (!s.flags.accepted) { s.flags.accepted = true; if(this.relaxed&&!s.inventory.water){this.gain('water',1);this.message('师姐递给你一份山泉水，留作开炉。');} dialogue('“后山旧阵的石傀又醒了，我装药的木匣还落在里头。你先在院里采些青灵草、开炉炼枚丹，再替我跑一趟吧。\n记得领上燃火符和引灵香——遇上石傀未必非要硬拼。把木匣带回来，我给你留着杏花糕。”'); }
        else if (s.inventory.box > 0) { s.inventory.box = 0; s.flags.complete = true; s.bond += s.origin === 'medicine' ? 3 : 2; this.gain('cake', 2); this.events.push({ type: 'complete' }); }
        else dialogue(s.flags.complete ? '“带回来的药材我都点清收好了。那两块杏花糕趁热吃，别整日只知道闷头练剑。今日这趟差事，辛苦你啦。”' : '“旧阵入口就在药庐东侧。挡路的枯藤拿燃火符一烧便开，用剑慢慢劈也成。守在药匣旁的石傀笨重，点炷引灵香把它引开，就能顺顺当当绕过去。”');
      } else if (o.kind === 'furnace') this.events.push({ type: 'craft' });
      else if (o.kind === 'well') { this.gain('water', 2); s.hp = 100; this.restoreSpirit(100); this.message(this.canUseSpiritualPower()?'取得山泉水 ×2。在井边调息，气血和灵力恢复。':'取得山泉水 ×2。在井边歇脚，气血恢复。'); }
      else if (o.kind === 'herb') {
        const amount = (s.origin === 'medicine' ? 3 : 2) + this.recipeBonus; this.gain('herb', amount); s.gathered.push(o.id);
        this.message('采得青灵草 ×' + amount + (s.origin === 'medicine' ? '。药庐所学让你辨出更多可用的嫩叶。' : '。'));
        if (o.id === 'wildHerb' && s.origin === 'medicine') { s.flags.wildStudy = true; this.gain('potion', 1); this.message('辨药：石隙凝露可直接调制一份回气丹，额外获得 ×1。'); }
      } else if (o.kind === 'training') {
        if (!s.flags.trained) { s.flags.trained = true; this.message(s.origin === 'sword' ? '剑庐试剑完成：普通剑击伤害增加 9。' : '学得基础运剑：普通剑击伤害增加 3。'); this.effect('slash', o.x, o.y, { angle: 0 }); }
        else dialogue('剑势已熟。左键出剑，按住右键格挡，空格闪避。看清石傀脚下的红圈再出手。');
      } else if (o.kind === 'supply') {
        if (s.flags.supplied) this.message('试炼物资已领取。灵草与泉水可以继续用于准备。');
        else { s.flags.supplied = true; for (const [id, n] of Object.entries({ fire: 2, incense: 2, paper: 2 })) this.gain(id, n); this.message('领取燃火符 ×2、引灵香 ×2、符纸 ×2。'); }
      } else if (o.kind === 'portal') {
        if (o.id === 'toRuins' && !s.flags.accepted) { this.message('先与沈灵薇交谈，了解这次委托。'); return; }
        s.map = s.map === 'garden' ? 'ruins' : 'garden'; s.x = s.map === 'ruins' ? 190 : 1050; s.y = 384;
        this.resetTransient(); this.events.push({ type: 'map' }); this.message('来到' + D.maps[s.map].name + '。');
      } else if (o.kind === 'vine') dialogue('枯藤横在石壁之间。燃火符能将它烧除，也可用普通剑击逐步斩断。');
      else if (o.kind === 'stone') {
        if (s.origin === 'scholar' && !s.flags.inscription) { s.flags.inscription = true; s.vineHp = 0; this.gain('fire', 2); dialogue('你认出经阁残卷所载的导气次序。按序拨转碑阴石钮，盘结的枯藤应声退开，碑底露出一格暗匣与两张旧符。\n获得燃火符 ×2，后山旧阵捷径已打通。'); }
        else dialogue('残碑上隐约可见八字：“石灵逐香，枯藤惧火。”药匣旁有石傀巡守时无法开锁；点香将其引开或正面击散，方可取走木匣。');
      } else if (o.kind === 'chest') {
        if (s.enemies.some(e => e.hp > 0 && distance(e, o) < 175)) { this.message('石傀守得太近：用引灵香将它引开，或先击散守卫。'); return; }
        this.gain('box', 1); this.message('找到药庐木匣！带回药庐，交给沈灵薇。'); this.events.push({ type: 'checkpoint' });
      } else if (o.kind === 'cache') {
        if (!s.flags.cache) { s.flags.cache = true; this.gain('dust', 3); this.gain('paper', 2); this.message('打开旧阵残箱，获得灵砂 ×3、符纸 ×2。'); }
        else this.message('残箱已空。');
      }
      this.events.push({ type: 'changed' });
    }
    craft(id) {
      const recipe = D.recipes[id];
      if (!recipe || this.state.hp <= 0 || this.state.map !== 'garden' || distance(this.state, { x: 489, y: 288 }) > 93) return false;
      if (Object.entries(recipe.cost).some(([key, n]) => this.state.inventory[key] < n)) { this.message('材料不足，先采药、取水或寻找灵砂。'); return false; }
      for (const [key, n] of Object.entries(recipe.cost)) this.state.inventory[key] -= n;
      this.gain(id, recipe.amount + this.recipeBonus); this.state.stats.crafted++; this.message('制成' + D.items[id].name + ' ×' + (recipe.amount + this.recipeBonus) + '。'); return true;
    }
    objective() {
      const s = this.state;
      if (s.flags.complete) return ['药匣归山', '委托已完成，可继续探索或换一种经历重玩。'];
      if (!s.flags.accepted) return ['与沈灵薇交谈', '走近师姐，按 E 接取药庐委托。'];
      if (s.inventory.box) return ['回山交付药匣', '从西侧山径返回药庐，找到沈灵薇。'];
      if (s.map === 'garden') return ['准备前往后山', '采药、炼丹、领取物资后，从东侧山径出发。'];
      if (s.vineHp > 0) return ['穿过藤障', '燃火符可烧藤；普通剑击也能开路。'];
      return ['取回遗落药匣', '药匣在旧阵东北侧。引开守卫，或正面破敌。'];
    }
    exportSave() { return clone({ ...this.state, buffs: { ward: this.ward } }); }
  }
  const api = { Game, fresh, validateSave, distance };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.XiuxianEngine = api;
})(globalThis);
