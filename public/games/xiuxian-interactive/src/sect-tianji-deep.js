/*
 * 天机阁批次 B 引擎层：独门两篇（信息型）与观星台经营（只记次数）。
 * 案卷需亲历秘传与值夜，结案一次记入本宗既有功绩与威望。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const Base = node ? require('./sect-story.js') : root.XiuxianEngine;
  const BaseGame = Base.Game;
  const D = node ? require('./sect-tianji-deep-data.js') : root.XiuxianSectTianjiDeepData;
  const T = node ? require('./sect-tianji-data.js') : root.XiuxianSectTianjiData;

  const fail = () => { throw new Error('天机阁批次记录异常。'); };
  const clean = v => v && typeof v === 'object' && !Array.isArray(v);

  class Game extends BaseGame {
    constructor(options) {
      super(options);
      this.state = this.state || {};
      const save = options && options.save;
      this.state.sectTianjiDeep = save && clean(save.sectTianjiDeep) ? this.copyDeep(save.sectTianjiDeep) : this.freshDeep();
    }

    copyDeep(v) {
      return {
        schema: D.schema,
        tiers: Array.isArray(v.tiers) ? v.tiers.slice() : [],
        dispatch: Number(v.dispatch) || 0,
        prove: Number(v.prove) || 0,
        ...(v.reviews ? { reviews: v.reviews } : {})
      };
    }

    freshDeep() {
      return { schema: D.schema, tiers: [], dispatch: 0, prove: 0 };
    }

    validateSave(save) {
      Base.validateSave(save);
      const v = save && save.sectTianjiDeep;
      if (v === undefined) return;
      if (!clean(v)) fail();
      const keys = Object.keys(v).sort().join(',');
      if (keys !== 'dispatch,prove,schema,tiers' && keys !== 'dispatch,prove,reviews,schema,tiers') fail();
      if (v.schema !== D.schema) fail();
      if (!Array.isArray(v.tiers)) fail();
      const known = D.order;
      const seen = new Set();
      for (const id of v.tiers) {
        if (!known.includes(id) || seen.has(id)) fail();
        const need = D.secrets[id].requires.tier;
        if (need && !seen.has(need)) fail();
        seen.add(id);
      }
      for (const key of ['dispatch', 'prove']) {
        const n = v[key];
        if (!Number.isInteger(n) || n < 0 || n > 1000) fail();
      }
      if (v.prove > v.dispatch) fail();
      const member = !!(save.sectTianji && save.sectTianji.office);
      if (!member && (v.tiers.length || v.dispatch || v.prove)) fail();
      if (Object.hasOwn(v, 'reviews')) {
        if (!member || !Number.isInteger(v.reviews) || v.reviews < 1 || v.reviews > D.reviews.length) fail();
        const review = D.reviews[v.reviews - 1], t = save.sectTianji;
        const desk = T.offices[review.office];
        if (T.officeOrder.indexOf(t.office) < T.officeOrder.indexOf(review.office) ||
            !seen.has(review.tier) || v.prove < review.pairs ||
            t.merit < desk.merit + review.merit || t.prestige < desk.prestige + review.prestige) fail();
      }
    }

    exportSave() {
      const s = BaseGame.prototype.exportSave.call(this);
      const v = s.sectTianjiDeep;
      if (v && !v.tiers.length && !v.dispatch && !v.prove) delete s.sectTianjiDeep;
      return s;
    }

    deep() {
      if (!this.state.sectTianjiDeep) this.state.sectTianjiDeep = this.freshDeep();
      return this.state.sectTianjiDeep;
    }

    tianjiMember() {
      return !!(this.state.sectTianji && this.state.sectTianji.office);
    }

    tianjiLevel(pathId) {
      const t = this.state.sectTianji;
      return (t && t.levels && Number(t.levels[pathId])) || 0;
    }

    deepReason(id) {
      const def = D.secrets[id];
      if (!def) return '没有这一篇。';
      if (!this.tianjiMember()) return '要先入天机阁，才谈本门秘传。';
      if (this.deep().tiers.includes(id)) return '这一篇已经修成了。';
      const need = def.requires;
      if (need.tier && !this.deep().tiers.includes(need.tier)) return '两篇有先后：先修「' + D.secrets[need.tier].name + '」。';
      const level = this.tianjiLevel(need.path);
      if (level < need.level) return '门径不足：' + ((T.paths[need.path] && T.paths[need.path].name) || need.path) + ' 需第 ' + need.level + ' 层，当前第 ' + level + ' 层。';
      const prestige = (this.state.sectTianji && this.state.sectTianji.prestige) || 0;
      if (prestige < def.contribution) return '组织威望不足：这一篇要求持有 ' + def.contribution + ' 点（只作门槛，不扣）。';
      for (const [item, n] of Object.entries(def.cost)) {
        if ((this.state.inventory[item] || 0) < n) return '材料不足：还需 ' + item + ' ×' + (n - (this.state.inventory[item] || 0)) + '。';
      }
      if (this.state.map !== 'ruins') return '秘传只能在观星台（山南遗址高台）请传。';
      return '';
    }

    learnTianjiDeep(id, agreed) {
      const reason = this.deepReason(id);
      if (reason) { this.message(reason); return false; }
      if (agreed !== true) { this.message('先明确同意本次修习约定；未同意不会扣材料。'); return false; }
      const def = D.secrets[id];
      for (const [item, n] of Object.entries(def.cost)) this.state.inventory[item] -= n;
      const v = this.deep();
      v.tiers.push(id);
      v.tiers.sort((a, b) => D.order.indexOf(a) - D.order.indexOf(b));
      this.message('请传了「' + def.name + '」：' + def.effect);
      this.checkpoint();
      return true;
    }

    manageReason(id) {
      const def = D.manage[id];
      if (!def) return '没有这件经营。';
      if (!this.tianjiMember()) return '要先入天机阁，才谈经营。';
      if (def.requires && !this.deep()[def.requires]) return '先办成「' + D.manage[def.requires].name + '」。';
      if (id === 'prove' && this.deep().prove >= this.deep().dispatch) return '这一班已经核过，先等下一班观测。';
      if (this.deep()[id] >= 1000) return '这一册已经写满了。';
      const office = this.state.sectTianji.office;
      const perms = (T.offices[office] || {}).permissions || {};
      if (!perms[def.permission]) {
        return '当前阶位没有这项经营之权。';
      }
      for (const [item, n] of Object.entries(def.cost || {})) {
        if ((this.state.inventory[item] || 0) < n) return '材料不足：还需 ' + item + ' ×' + (n - (this.state.inventory[item] || 0)) + '。';
      }
      if (this.state.map !== 'ruins') return '经营都在观星台办理。';
      return '';
    }

    runTianjiManage(id) {
      const reason = this.manageReason(id);
      if (reason) { this.message(reason); return false; }
      const def = D.manage[id];
      for (const [item, n] of Object.entries(def.cost || {})) this.state.inventory[item] -= n;
      this.deep()[id] += 1;
      this.message(def.text);
      this.checkpoint();
      return true;
    }

    tianjiReviewReason(id) {
      const index = D.reviews.findIndex(r => r.id === id);
      if (index < 0) return '没有这件案卷。';
      const r = D.reviews[index], t = this.state.sectTianji, v = this.deep();
      const count = v.reviews || 0;
      if (count > index) return '此案已经落款。';
      if (count < index) return '先结清前一桩星表案。';
      if (!this.tianjiMember() || T.officeOrder.indexOf(t.office) < T.officeOrder.indexOf(r.office)) return '须先任' + T.offices[r.office].name + '。';
      if (!v.tiers.includes(r.tier)) return '先请传《' + D.secrets[r.tier].name + '》。';
      if (v.prove < r.pairs) return '还需亲自校对 ' + (r.pairs - v.prove) + ' 班观测。';
      if (this.state.map !== T.map) return '带案卷到观星台，再与谢观澜议定。';
      if (this.state.hp <= 0 || this.activeEnemies().some(e => e.hp > 0)) return '先脱身疗伤，再上台议事。';
      return '';
    }

    resolveTianjiReview(id, choice) {
      const reason = this.tianjiReviewReason(id);
      if (reason) { this.message(reason); return false; }
      const r = D.reviews.find(r => r.id === id);
      if (choice !== r.answer) { this.message(r.retry); return false; }
      this.deep().reviews = (this.deep().reviews || 0) + 1;
      const t = this.state.sectTianji;
      t.merit += r.merit;
      t.prestige += r.prestige;
      this.message(r.close);
      this.checkpoint();
      return true;
    }

    tianjiDeepStatus() {
      const v = this.deep();
      const secrets = D.order.map(id => {
        const def = D.secrets[id];
        return {
          id, name: def.name, text: def.text, effect: def.effect,
          done: v.tiers.includes(id), reason: this.deepReason(id)
        };
      });
      const manage = D.manageOrder.map(id => {
        const def = D.manage[id];
        return { id, name: def.name, text: def.text, count: v[id], reason: this.manageReason(id) };
      });
      return {
        secrets, manage, notes: Object.assign({}, D.notes),
        reviews: D.reviews.map((r, i) => ({
          id: r.id, name: r.name, office: T.offices[r.office].name, tier: D.secrets[r.tier].name, pairs: r.pairs,
          merit: r.merit, prestige: r.prestige, scene: r.scene, question: r.question, choices: r.choices, close: r.close, retry: r.retry,
          done: (v.reviews || 0) > i, reason: this.tianjiReviewReason(r.id)
        })),
        info: {
          summitLead: v.tiers.includes('first'),
          manageLead: v.tiers.includes('reserve')
        },
        source: D.source
      };
    }

    tianjiStatus() {
      const st = BaseGame.prototype.tianjiStatus.call(this);
      st.deep = this.tianjiDeepStatus();
      return st;
    }

    sectStatus() {
      const st = BaseGame.prototype.sectStatus.call(this);
      st.tianjiDeep = this.tianjiDeepStatus();
      return st;
    }
  }

  const api = Object.assign({}, Base, { Game, validateSave: Game.prototype.validateSave, sectTianjiDeep: D });
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
