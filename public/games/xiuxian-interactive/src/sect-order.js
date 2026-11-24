(function (root) {
  'use strict';
  const node = typeof module !== 'undefined' && module.exports;
  const Base = node ? require('./sect-tianji-deep.js') : root.XiuxianEngine;
  const BaseGame = Base.Game;
  const O = node ? require('./sect-order-data.js') : root.XiuxianSectOrderData;
  const fail = message => { throw new Error(message); };
  const copy = value => JSON.parse(JSON.stringify(value));
  const shape = (value, keys) => !!value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
  const INT = value => Number.isInteger(value) && value >= 0;

  function fresh() {
    return { schema: O.schema, id: null, greeted: false, service: false, office: null, merit: 0, prestige: 0, duties: [], levels: {} };
  }

  function validateWorkshop(v, D, office) {
    const w = v.workshop;
    if (!shape(w, ['records', 'active']) || !w.records || typeof w.records !== 'object' || Array.isArray(w.records)) fail('新宗门记录异常。');
    const learned = Object.keys(w.records).length;
    if (!learned || learned > D.chapters.length) fail('新宗门记录异常。');
    let firstWorks = 0;
    for (const c of D.chapters.slice(0, learned)) {
      const count = w.records[c.id];
      if (!Object.hasOwn(w.records, c.id) || !Number.isSafeInteger(count) || count < 0 || v.levels[c.path] !== O.maxLevel) fail('新宗门记录异常。');
      if (count > 0) firstWorks++;
    }
    if (w.active !== null && (typeof w.active !== 'string' || !Object.hasOwn(w.records, w.active))) fail('新宗门记录异常。');
    if (w.active !== null && w.records[w.active] === Number.MAX_SAFE_INTEGER) fail('新宗门记录异常。');
    if ((w.active !== null || firstWorks) && !office.permissions.lead) fail('新宗门记录异常。');
    const duties = D.duties.filter(d => v.duties.includes(d.id));
    for (const key of ['merit', 'prestige']) {
      if (v[key] !== duties.reduce((sum, d) => sum + d[key], firstWorks * O.firstWork[key])) fail('新宗门记录异常。');
    }
  }

  class Game extends BaseGame {
    constructor(options) {
      super(options);
      const save = options && options.save;
      this.state.sectOrder = save && save.sectOrder ? copy(save.sectOrder) : fresh();
      const check = Game.validateSave;
      if (save) check(save);
    }

    static validateSave(save) {
      Base.validateSave(save);
      const v = save.sectOrder;
      if (v === undefined) return save;
      const fields = Object.keys(fresh());
      const hasWorkshop = v && Object.hasOwn(v, 'workshop');
      if (hasWorkshop) fields.push('workshop');
      if (!shape(v, fields)) fail('新宗门记录异常。');
      if (v.schema !== O.schema) fail('新宗门记录异常。');
      if (v.id !== null && !O.order.includes(v.id)) fail('新宗门记录异常。');
      if (v.id === null) {
        if (v.greeted !== false || v.service !== false || v.office !== null || v.merit !== 0 || v.prestige !== 0) fail('新宗门记录异常。');
        if (!Array.isArray(v.duties) || v.duties.length !== 0) fail('新宗门记录异常。');
        if (hasWorkshop || !shape(v.levels, [])) fail('新宗门记录异常。');
        return save;
      }
      const D = O.orders[v.id];
      const office = D.offices.find(o => o.id === v.office);
      if (v.greeted !== true || typeof v.service !== 'boolean') fail('新宗门记录异常。');
      if (!INT(v.merit) || !INT(v.prestige)) fail('新宗门记录异常。');
      if (!Array.isArray(v.duties) || v.duties.length > D.duties.length) fail('新宗门记录异常。');
      if (new Set(v.duties).size !== v.duties.length) fail('新宗门记录异常。');
      if (v.duties.some(id => !D.duties.some(d => d.id === id))) fail('新宗门记录异常。');
      const keys = D.paths.map(p => p.id).sort();
      if (!shape(v.levels, keys)) fail('新宗门记录异常。');
      for (const key of keys) {
        if (!Number.isInteger(v.levels[key]) || v.levels[key] < 0 || v.levels[key] > O.maxLevel) fail('新宗门记录异常。');
      }
      if (v.office === null) {
        if (hasWorkshop || v.duties.length || v.merit || v.prestige || keys.some(k => v.levels[k] !== 0)) fail('新宗门记录异常。');
      } else {
        if (!office || !v.service || v.merit < office.merit || v.prestige < office.prestige) fail('新宗门记录异常。');
        if (hasWorkshop) validateWorkshop(v, D, office);
      }
      return save;
    }

    exportSave() {
      const s = BaseGame.prototype.exportSave.call(this);
      const v = s.sectOrder;
      if (v && v.id === null) delete s.sectOrder;
      return s;
    }

    orderSpend(cost) {
      const inv = this.state.inventory;
      Object.keys(cost).forEach(id => { inv[id] = (inv[id] || 0) - cost[id]; });
    }

    orderMember() { return this.state.sectOrder.id; }
    orderOtherSect() {
      if (this.state.sect && this.state.sect.id) return '已在合欢宗门下。';
      if (this.state.sectTianji && this.state.sectTianji.office) return '已在天机阁门下。';
      const id = this.orderMember();
      if (id && this.state.sectOrder.office) return '已在' + O.orders[id].name + '门下。';
      return '';
    }
    orderDuty(id) {
      const D = O.orders[this.orderMember()];
      return D ? D.duties.find(d => d.id === id) || null : null;
    }
    orderOffice() {
      const D = O.orders[this.orderMember()];
      if (!D) return null;
      return D.offices.find(o => o.id === this.state.sectOrder.office) || D.offices[0];
    }
    orderPermissions() { const o = this.orderOffice(); return o ? copy(o.permissions) : null; }
    orderLevel(id) { return this.state.sectOrder.levels[id] || 0; }
    orderAtPlace() {
      const id = this.orderMember();
      return id ? this.state.map === O.orders[id].map : false;
    }
    orderSafeReason() {
      if (this.state.hp <= 0) return '气血未复，先把伤养住。';
      if (this.state.sectTrial && this.state.sectTrial.battle) return '较技未收，先打完这一场。';
      if (this.state.sectMeet && this.state.sectMeet.battle) return '门内会武未收，先打完这一场。';
      if (this.state.sectEvent && this.state.sectEvent.battle) return '赛事未收，先打完这一场。';
      if (this.state.sectGrand && this.state.sectGrand.battle) return '天下大比未收，先打完这一场。';
      if (this.state.sectSummit && this.state.sectSummit.battle) return '七宗会武未收，先打完这一场。';
      if (this.state.sectWorld && this.state.sectWorld.escort && this.state.sectWorld.escort.phase === 'walking') return '护路未收，先走完这一趟。';
      return '';
    }
    orderJoinReason(id) {
      const D = O.orders[id];
      if (!D) return '没有这个可加入的宗门。';
      if (this.sectAge() < 18) return '这条门径要成年之后才谈。';
      if (this.state.chapter.prologue === 'pending' || this.state.chapter.rank !== 4) return '筑基之前不谈入门。';
      const other = this.orderOtherSect();
      if (other) return other;
      const v = this.state.sectOrder;
      if (v.id === id && v.office) return '已在' + D.name + '门下。';
      if (v.id === id && !v.service) return '门里还要看你在' + D.place + '办成一件差事。';
      if (v.id && v.id !== id) return '已入' + O.orders[v.id].name + '，一门之内不谈第二门。';
      return '';
    }

    orderGreet(id) {
      const reason = this.orderJoinReason(id);
      if (reason) return reason;
      const D = O.orders[id];
      if (this.state.sectOrder.greeted && this.state.sectOrder.id === id) return '门规已听过一次。';
      if (this.state.map !== D.map) return '先到' + D.place + '听' + D.mentor.name + '讲门规。';
      const v = this.state.sectOrder;
      v.id = id; v.greeted = true; v.service = v.service || false;
      v.levels = {}; D.paths.forEach(p => { v.levels[p.id] = 0; });
      this.message('你在' + D.place + '听' + D.mentor.name + '讲完了门规；接下来要看你在炉（圃）上做过什么。');
      this.checkpoint();
      return '';
    }

    orderDutyReason(id) {
      const D = O.orders[this.orderMember()];
      if (!D) return '先在这门听门规。';
      const duty = D.duties.find(d => d.id === id);
      if (!duty) return '没有这件差事。';
      if (!this.orderAtPlace()) return '这件差事要在' + D.place + '做。';
      const safe = this.orderSafeReason();
      if (safe) return safe;
      if (this.state.sectOrder.service && !this.state.sectOrder.office) return '门里已记下这件差事，可以去确认入门。';
      if (this.state.sectOrder.duties.includes(id)) return '这件差事已经办过并记档了。';
      return this.sectMaterialReason(duty.cost);
    }

    runOrderDuty(id) {
      const reason = this.orderDutyReason(id);
      if (reason) return reason;
      const D = O.orders[this.orderMember()];
      const duty = D.duties.find(d => d.id === id);
      this.orderSpend(duty.cost);
      const v = this.state.sectOrder;
      if (v.office) {
        v.duties.push(id);
        v.merit += duty.merit;
        v.prestige += duty.prestige;
        this.message('办成「' + duty.label + '」，功绩 ' + v.merit + '，威望 ' + v.prestige + '。');
      } else {
        v.service = true;
        this.message('替' + D.name + '办成「' + duty.label + '」；门里要看的就是这一件。');
      }
      this.checkpoint();
      return '';
    }

    joinOrder(id, agreed) {
      const reason = this.orderJoinReason(id);
      if (reason) return reason;
      const v = this.state.sectOrder;
      if (v.id !== id) return '先到' + O.orders[id].place + '听门规。';
      if (!v.service) return '门里还要看你在' + O.orders[id].place + '办成一件差事。';
      if (agreed !== true) return '先明确同意门规；未同意不会入门。';
      const D = O.orders[id];
      v.office = D.offices[0].id;
      v.merit = 0; v.prestige = 0;
      this.message('入门：' + D.name + ' · ' + D.offices[0].name + '。只新增归属，来处与原有委托都保留。');
      this.checkpoint();
      return '';
    }

    orderPromoteReason() {
      const id = this.orderMember();
      if (!id) return '还没入门。';
      const D = O.orders[id];
      const v = this.state.sectOrder;
      if (!v.service) return '先替门里办成一件差事。';
      const i = D.offices.findIndex(o => o.id === v.office);
      if (i < 0) return '阶位记录异常。';
      if (i >= D.offices.length - 1) return '已是最高阶位。';
      const next = D.offices[i + 1];
      if (v.merit < next.merit) return '功绩还差 ' + (next.merit - v.merit) + ' 点。';
      if (v.prestige < next.prestige) return '威望还差 ' + (next.prestige - v.prestige) + ' 点。';
      return '';
    }

    promoteOrderOffice() {
      const reason = this.orderPromoteReason();
      if (reason) return reason;
      const D = O.orders[this.orderMember()];
      const i = D.offices.findIndex(o => o.id === this.state.sectOrder.office);
      this.state.sectOrder.office = D.offices[i + 1].id;
      this.message('报请晋升：' + D.offices[i + 1].name + '。');
      this.checkpoint();
      return '';
    }

    orderTrainReason(pid) {
      const id = this.orderMember();
      if (!id) return '还没入门。';
      const D = O.orders[id];
      const path = D.paths.find(p => p.id === pid);
      if (!path) return '没有这条门径。';
      const level = this.orderLevel(pid);
      if (level >= O.maxLevel) return '这条门径已经修满三层。';
      if (this.state.sectOrder.prestige < path.contribution) return '威望不足：这条门径要求持有 ' + path.contribution + ' 点威望（只作门槛，不扣）。';
      if (!this.orderAtPlace()) return '修习要在' + D.place + '。';
      const cost = {};
      Object.keys(path.cost).forEach(k => { cost[k] = path.cost[k] * (level + 1); });
      return this.sectMaterialReason(cost);
    }

    trainOrderPath(pid, agreed) {
      const reason = this.orderTrainReason(pid);
      if (reason) return reason;
      if (agreed !== true) return '先明确同意本次修习约定；未同意不会扣材料。';
      const D = O.orders[this.orderMember()];
      const path = D.paths.find(p => p.id === pid);
      const level = this.orderLevel(pid);
      const cost = {};
      Object.keys(path.cost).forEach(k => { cost[k] = path.cost[k] * (level + 1); });
      this.orderSpend(cost);
      this.state.sectOrder.levels[pid] = level + 1;
      this.message('「' + path.name + '」修到第 ' + (level + 1) + ' 层。');
      this.checkpoint();
      return '';
    }

    orderChapter(id) {
      return O.orders[this.orderMember()]?.chapters.find(c => c.id === id);
    }

    orderWorkshopReason() {
      const v = this.state.sectOrder;
      if (!v.office) return '须先入门。';
      if (!this.orderAtPlace()) return '请回' + O.orders[v.id].place + '。';
      return this.orderSafeReason();
    }

    orderChapterReason(id) {
      const c = this.orderChapter(id);
      if (!c) return '本门没有这篇秘传。';
      const v = this.state.sectOrder;
      if (v.workshop && Object.hasOwn(v.workshop.records, id)) return '这篇已经学过了。';
      const reason = this.orderWorkshopReason();
      if (reason) return reason;
      const D = O.orders[v.id];
      if (c !== D.chapters[0] && !v.workshop) return '先学' + D.chapters[0].name + '。';
      const path = D.paths.find(p => p.id === c.path);
      if (this.orderLevel(c.path) !== O.maxLevel) return '先将「' + path.name + '」修到三层。';
      return '';
    }

    learnOrderChapter(id) {
      const reason = this.orderChapterReason(id);
      if (reason) return reason;
      const v = this.state.sectOrder;
      if (!v.workshop) v.workshop = { records: {}, active: null };
      v.workshop.records[id] = 0;
      this.message(this.orderChapter(id).teaching);
      this.checkpoint();
      return '';
    }

    orderWorkReason(id, settling) {
      const reason = this.orderWorkshopReason();
      if (reason) return reason;
      const v = this.state.sectOrder;
      const c = this.orderChapter(id);
      if (!c || !v.workshop || !Object.hasOwn(v.workshop.records, id)) return '先向师父学会这篇秘传。';
      if (!this.orderPermissions().lead) return '升到' + O.orders[v.id].offices.find(o => o.permissions.lead).name + '后，才可独自当值。';
      if (settling) return v.workshop.active === id ? '' : '这件事务还没接手。';
      if (v.workshop.active) return '先把手头的事务办完。';
      if (v.workshop.records[id] === Number.MAX_SAFE_INTEGER) return '这本值簿已写满。';
      return '';
    }

    startOrderWork(id) {
      const reason = this.orderWorkReason(id, false);
      if (reason) return reason;
      this.state.sectOrder.workshop.active = id;
      this.checkpoint();
      return '';
    }

    orderWorkRound(c) {
      return c.rounds[this.state.sectOrder.workshop.records[c.id] % c.rounds.length];
    }

    finishOrderWork(id, choice) {
      const reason = this.orderWorkReason(id, true);
      if (reason) return reason;
      const c = this.orderChapter(id);
      const round = this.orderWorkRound(c);
      if (choice !== round.answer) return '再对照一遍师父教的诀窍，眼前的情形该怎么处置？';
      const v = this.state.sectOrder;
      const first = v.workshop.records[id] === 0;
      v.workshop.records[id]++;
      v.workshop.active = null;
      if (first) {
        v.merit += O.firstWork.merit;
        v.prestige += O.firstWork.prestige;
      }
      this.message(round.result + (first ? ' 首次独办，记功绩 ' + O.firstWork.merit + '、威望 ' + O.firstWork.prestige + '。' : ' 值簿已记。'));
      this.checkpoint();
      return '';
    }

    orderBlockOther() {
      const id = this.orderMember();
      return id ? '已在' + O.orders[id].name + '门下，一门之内不谈第二门。' : '';
    }

    joinSect(id, agreed) {
      const blocked = this.orderBlockOther();
      if (blocked) return blocked;
      return super.joinSect(id, agreed);
    }

    admitSectDirect(id) {
      const blocked = this.orderBlockOther();
      if (blocked) return blocked;
      return super.admitSectDirect.apply(this, arguments);
    }

    joinTianji(agreed) {
      const blocked = this.orderBlockOther();
      if (blocked) return blocked;
      return super.joinTianji(agreed);
    }

    orderStatus() {
      const v = this.state.sectOrder;
      const current = v.id;
      const orders = O.order.map(id => {
        const D = O.orders[id];
        const joined = current === id && !!v.office;
        const greeted = current === id && v.greeted;
        return {
          id,
          name: D.name,
          motto: D.motto,
          place: D.place,
          mentor: D.mentor,
          joined,
          greeted,
          service: current === id ? v.service : false,
          office: joined ? this.orderOffice().name : '',
          merit: current === id ? v.merit : 0,
          prestige: current === id ? v.prestige : 0,
          steps: [
            { id: 'greet', label: '相识', done: greeted, detail: D.intro.greet, reason: joined || greeted ? '' : this.orderJoinReason(id) || (this.state.map !== D.map ? '先到' + D.place + '听' + D.mentor.name + '讲门规。' : '') },
            { id: 'service', label: '公开事务', done: current === id && v.service, detail: D.intro.service, reason: current === id && v.service ? '' : (greeted ? '门里要看真实做过的事：在' + D.place + '办成一件差事即可。' : '还没听门规。') },
            { id: 'confirm', label: '确认', done: joined, detail: D.intro.confirm, reason: joined ? '' : (greeted && v.service ? '三步已具备：勾选门规后可入门。' : '先办成一件差事。') }
          ],
          rules: D.intro.rules,
          duties: D.duties.map(d => ({
            id: d.id,
            label: d.label,
            desc: d.desc,
            cost: d.cost,
            merit: d.merit,
            prestige: d.prestige,
            done: current === id && v.duties.includes(d.id),
            reason: current === id ? this.orderDutyReason(d.id) : this.orderJoinReason(id) || '先到' + D.place + '听门规。'
          })),
          paths: D.paths.map(p => ({
            id: p.id,
            name: p.name,
            desc: p.desc,
            level: current === id ? this.orderLevel(p.id) : 0,
            max: O.maxLevel,
            contribution: p.contribution,
            reason: current === id ? this.orderTrainReason(p.id) : this.orderJoinReason(id) || '先听门规。'
          })),
          permissions: joined ? this.orderPermissions() : null,
          chapters: D.chapters.map(c => {
            const w = joined && v.workshop;
            const learned = !!w && Object.hasOwn(w.records, c.id);
            const active = learned && w.active === c.id;
            return {
              id: c.id, name: c.name, job: c.job, learned, active,
              learnReason: joined ? this.orderChapterReason(c.id) : '须先入' + D.name + '。',
              teaching: learned ? c.teaching : '', count: learned ? w.records[c.id] : 0,
              workReason: learned ? this.orderWorkReason(c.id, active) : '',
              sign: active ? this.orderWorkRound(c).sign : '', choices: active ? c.choices : {}
            };
          }),
          notes: D.notes,
          sceneArt: D.sceneArt,
          officeArt: joined && v.office === 'elder' ? D.officeArt : null,
          artPending: []
        };
      });
      return {
        current,
        firstWork: O.firstWork,
        noBuff: '门径修满三层可学对应秘传，不额外改战斗数值。',
        orders
      };
    }

    sectStatus() {
      const status = BaseGame.prototype.sectStatus.call(this);
      status.order = this.orderStatus();
      return status;
    }
  }

  const api = Object.assign({}, Base, { Game, validateSave: Game.validateSave, sectOrder: O });
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
