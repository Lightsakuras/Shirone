/*
 * 天机阁引擎层（DSH 新增，批次 B 第一步）：第二个可加入宗门。
 * 只读既有记录，独立存档域 state.sectTianji；不新增货币，不改合欢宗的三本账。
 * 与合欢宗互斥：已在合欢宗门下不能入天机阁，反之亦然。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const Base = node ? require('./sect-factions.js') : root.XiuxianEngine;
  const T = node ? require('./sect-tianji-data.js') : root.XiuxianSectTianjiData;
  const BaseGame = Base.Game;

  const ITEMS = ['herb', 'water', 'paper', 'dust', 'potion'];
  const fail = () => { throw new Error('天机阁记录异常。'); };
  const clean = v => v && typeof v === 'object' && !Array.isArray(v);

  class Game extends Base.Game {
    constructor(options) {
      super(options);
      this.state = this.state || {};
      const save = options && options.save;
      this.state.sectTianji = save && clean(save.sectTianji) ? this.copyTianji(save.sectTianji) : this.freshTianji();
    }

    copyTianji(v) {
      return {
        schema: T.schema,
        greeted: v.greeted === true,
        service: v.service || null,
        office: v.office || null,
        merit: Number(v.merit) || 0,
        prestige: Number(v.prestige) || 0,
        duties: Array.isArray(v.duties) ? v.duties.slice() : [],
        levels: Object.assign({ divine: 0, scheme: 0 }, v.levels || {})
      };
    }

    freshTianji() {
      return { schema: T.schema, greeted: false, service: null, office: null, merit: 0, prestige: 0, duties: [], levels: { divine: 0, scheme: 0 } };
    }

    validateSave(save) {
      Base.validateSave(save);
      const v = save && save.sectTianji;
      if (v === undefined) return;
      if (!clean(v)) fail();
      const keys = Object.keys(v).sort().join(',');
      if (keys !== 'duties,greeted,levels,merit,office,prestige,schema,service') fail();
      if (v.schema !== T.schema) fail();
      if (typeof v.greeted !== 'boolean') fail();
      if (v.service !== null && !T.duties[v.service]) fail();
      if (v.office !== null && !T.offices[v.office]) fail();
      if (!Number.isInteger(v.merit) || v.merit < 0) fail();
      if (!Number.isInteger(v.prestige) || v.prestige < 0) fail();
      if (!Array.isArray(v.duties)) fail();
      if (v.duties.some(id => !T.duties[id])) fail();
      if (new Set(v.duties).size !== v.duties.length) fail();
      if (!clean(v.levels)) fail();
      if (Object.keys(v.levels).sort().join(',') !== T.pathOrder.slice().sort().join(',')) fail();
      for (const id of T.pathOrder) {
        const l = v.levels[id];
        if (!Number.isInteger(l) || l < 0 || l > T.maxLevel) fail();
      }
      if (v.office === null) {
        if (v.merit !== 0 || v.prestige !== 0 || v.duties.length) fail();
        if (T.pathOrder.some(id => v.levels[id] > 0)) fail();
      }
    }

    exportSave() {
      const s = BaseGame.prototype.exportSave.call(this);
      const t = s.sectTianji;
      if (t && !t.greeted && !t.service && t.office === null && !t.duties.length &&
        t.merit === 0 && t.prestige === 0 && T.pathOrder.every(id => t.levels[id] === 0)) {
        delete s.sectTianji;
      }
      return s;
    }

    tianjiState() {
      if (!this.state.sectTianji) this.state.sectTianji = this.freshTianji();
      return this.state.sectTianji;
    }

    tianjiMember() {
      return !!this.tianjiState().office;
    }

    tianjiOffice() {
      const t = this.tianjiState();
      return t.office ? T.offices[t.office] : null;
    }

    tianjiPermissions() {
      const o = this.tianjiOffice();
      return Object.assign({ recommend: false, lead: false, recruit: false, teach: false, govern: false }, o ? o.permissions : {});
    }

    tianjiIntroStatus() {
      const t = this.tianjiState();
      const done = { greet: t.greeted, service: !!t.service, confirm: this.tianjiMember() };
      return {
        sect: T.id,
        name: T.name,
        place: T.place,
        mentor: Object.assign({}, T.mentor),
        steps: T.intro.steps.map(s => Object.assign({}, s, { done: !!done[s.id] })),
        rules: T.intro.rules.slice(),
        greeted: t.greeted,
        service: t.service,
        member: this.tianjiMember(),
        ready: !this.tianjiMember() && t.greeted === true && !!t.service && !(this.state.sect && this.state.sect.id),
        note: !t.greeted ? T.intro.notes.beforeGreet : (t.service ? '' : T.intro.notes.beforeService),
        otherSect: !!(this.state.sect && this.state.sect.id),
        notes: Object.assign({}, T.intro.notes),
        source: T.source
      };
    }

    greetTianjiReason() {
      const t = this.tianjiState();
      if (this.tianjiMember()) return '已在天机阁名下。';
      if (this.state.sect && this.state.sect.id) return T.intro.notes.otherSect;
      if (this.isChild && this.isChild()) return '童年时不谈入宗的事。';
      if (this.state.map !== T.map) return T.intro.notes.beforeGreet;
      if (t.greeted) return '门规已经听过了。';
      if (this.state.map !== T.map) return T.intro.notes.beforeGreet;
      return '';
    }

    greetTianji() {
      const reason = this.greetTianjiReason();
      if (reason) { this.message(reason); return false; }
      this.tianjiState().greeted = true;
      this.message('谢观澜把三条门规说了一遍：只报实情、不换利、不抢地。');
      this.checkpoint();
      return true;
    }

    tianjiDutyReason(id) {
      const d = T.duties[id];
      if (!d) return '没有这件差事。';
      const t = this.tianjiState();
      if (this.state.sect && this.state.sect.id) return T.intro.notes.otherSect;
      if (this.isChild && this.isChild()) return '童年时不办门内差事。';
      if (!t.greeted) return T.intro.notes.beforeGreet;
      if (this.state.map !== T.map) return T.intro.notes.noService;
      if (t.office && t.duties.includes(id)) return '这件差事已经办过并记档了。';
      if (this.sectMaterialReason && this.sectMaterialReason(d.cost)) return this.sectMaterialReason(d.cost);
      if (this.state.hp <= 0) return '气血不足，先处置伤势。';
      if (typeof this.activeEnemies === 'function' && this.activeEnemies().filter(e => e && e.hp > 0).length) return '此刻还在打斗，脱身再说。';
      return '';
    }

    runTianjiDuty(id) {
      const reason = this.tianjiDutyReason(id);
      if (reason) { this.message(reason); return false; }
      const d = T.duties[id];
      const t = this.tianjiState();
      for (const item of ITEMS) if (d.cost[item]) this.state.inventory[item] -= d.cost[item];
      if (!t.office) {
        t.service = id;
        this.message('把「' + d.name + '」办完了，谢观澜把你的手法记在册上。');
      } else {
        t.duties.push(id);
        t.merit += d.merit;
        t.prestige += d.prestige;
        this.message('「' + d.name + '」记档：功绩 +' + d.merit + '，威望 +' + d.prestige + '。');
      }
      this.checkpoint();
      return true;
    }

    tianjiJoinReason(agreed) {
      const t = this.tianjiState();
      if (this.tianjiMember()) return '已在册中，不必再入门。';
      if (this.state.sect && this.state.sect.id) return T.intro.notes.otherSect;
      if (agreed !== true) return '先明确同意门规；未同意不会入门。';
      if (!t.greeted) return T.intro.notes.beforeGreet;
      if (!t.service) return T.intro.notes.beforeService;
      return '';
    }

    joinTianji(agreed) {
      const reason = this.tianjiJoinReason(agreed);
      if (reason) { this.message(reason); return false; }
      const t = this.tianjiState();
      t.office = 'novice';
      this.message('天机阁把你记在册上：只记归属，来处与原有委托都保留。');
      this.checkpoint();
      return true;
    }

    // 合欢宗与本宗互斥：已在合欢宗名下时不能入天机阁，反之亦然。
    joinSect(id, agreed) {
      if (this.tianjiMember()) { this.message('已在天机阁名下，改换门庭须先退出本宗。'); return false; }
      return super.joinSect(id, agreed);
    }

    admitSectDirect(id) {
      if (this.tianjiMember()) { this.message('已在天机阁名下，改换门庭须先退出本宗。'); return false; }
      return super.admitSectDirect.apply(this, arguments);
    }

    tianjiPromoteReason() {
      const t = this.tianjiState();
      if (!this.tianjiMember()) return '入门之后才谈晋升。';
      const idx = T.officeOrder.indexOf(t.office);
      if (idx >= T.officeOrder.length - 1) return '已是本宗最高阶。';
      const next = T.offices[T.officeOrder[idx + 1]];
      if (t.merit < next.merit) return '功绩还差 ' + (next.merit - t.merit) + ' 点。';
      if (t.prestige < next.prestige) return '威望还差 ' + (next.prestige - t.prestige) + ' 点。';
      return '';
    }

    promoteTianjiOffice() {
      const reason = this.tianjiPromoteReason();
      if (reason) { this.message(reason); return false; }
      const t = this.tianjiState();
      const idx = T.officeOrder.indexOf(t.office);
      t.office = T.officeOrder[idx + 1];
      this.message('报请通过：现任' + T.offices[t.office].name + '。');
      this.checkpoint();
      return true;
    }

    tianjiTrainingCost(id) {
      const p = T.paths[id], next = (this.tianjiState().levels[id] || 0) + 1;
      return Object.fromEntries(Object.entries(p.cost).map(([item, n]) => [item, n * next]));
    }

    tianjiTrainReason(id) {
      const p = T.paths[id];
      if (!p) return '没有这条门径。';
      const t = this.tianjiState();
      if (!this.tianjiMember()) return '入门之后才能修习本宗门径。';
      const level = t.levels[id] || 0;
      if (level >= T.maxLevel) return '这门门径已经修满。';
      const missing = this.sectMaterialReason(this.tianjiTrainingCost(id));
      if (missing) return missing;
      if (t.prestige < p.contribution) return '门内威望不足：这条门径要求持有 ' + p.contribution + ' 点威望（只作门槛，不扣）。';
      if (this.state.map !== T.map) return '门径要在观星台上修。';
      if (this.state.hp <= 0) return '气血不足，先处置伤势。';
      return '';
    }

    trainTianjiPath(id, agreed) {
      if (agreed !== true) { this.message('先明确同意本次修习约定；未同意不会扣材料。'); return false; }
      const reason = this.tianjiTrainReason(id);
      if (reason) { this.message(reason); return false; }
      const p = T.paths[id];
      const t = this.tianjiState();
      const level = t.levels[id] || 0;
      for (const [item, n] of Object.entries(this.tianjiTrainingCost(id))) this.state.inventory[item] -= n;
      t.levels[id] = level + 1;
      this.message('「' + p.name + '」修到第' + (level + 1) + '重。');
      this.checkpoint();
      return true;
    }

    tianjiStatus() {
      const t = this.tianjiState();
      const office = this.tianjiOffice();
      const nextId = T.officeOrder[T.officeOrder.indexOf(t.office) + 1];
      return {
        id: T.id,
        name: T.name,
        motto: T.motto,
        place: T.place,
        map: T.map,
        mentor: Object.assign({}, T.mentor),
        member: this.tianjiMember(),
        joined: this.tianjiMember(),
        office: t.office,
        officeName: office ? office.name : null,
        merit: t.merit,
        prestige: t.prestige,
        duties: t.duties.slice(),
        dutyList: T.order.map(id => Object.assign({}, T.duties[id], { done: t.duties.includes(id), reason: this.tianjiDutyReason(id) })),
        paths: T.pathOrder.map(id => Object.assign({}, T.paths[id], { cost: t.levels[id] < T.maxLevel ? this.tianjiTrainingCost(id) : {}, level: t.levels[id] || 0, reason: this.tianjiTrainReason(id) })),
        promote: { next: nextId ? T.offices[nextId].name : null, reason: this.tianjiPromoteReason() },
        intro: this.tianjiIntroStatus(),
        permissions: this.tianjiPermissions(),
        notYet: T.notYet.slice(),
        artPending: T.artPending.slice(),
        notes: Object.assign({}, T.intro.notes),
        source: T.source
      };
    }

    sectStatus() {
      const st = BaseGame.prototype.sectStatus.call(this);
      st.tianji = this.tianjiStatus();
      return st;
    }
  }

  const api = Object.assign({}, Base, { Game, validateSave: Game.prototype.validateSave, sectTianji: T });
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
