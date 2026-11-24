/*
 * 剧情与小改写引擎层（DSH 新增）：读真实记录，只写自己的档案域 state.sectStory。
 * 不含好感数值、不含战斗加成、不改原作结局与既有四人伴侣路径。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const Base = node ? require('./sect-tianji.js') : root.XiuxianEngine;
  const BaseGame = Base.Game;
  const D = node ? require('./sect-story-data.js') : root.XiuxianSectStoryData;

  const fail = () => { throw new Error('宗门小记异常。'); };
  const clean = v => v && typeof v === 'object' && !Array.isArray(v);

  class Game extends BaseGame {
    constructor(options) {
      super(options);
      this.state = this.state || {};
      const save = options && options.save;
      this.state.sectStory = save && clean(save.sectStory) ? this.copyStory(save.sectStory) : this.freshStory();
    }

    copyStory(v) {
      return {
        schema: D.schema,
        yun: { asked: v.yun && v.yun.asked === true, answer: v.yun ? (v.yun.answer === true ? true : (v.yun.answer === false ? false : null)) : null },
        stone: v.stone === true,
        prescription: v.prescription === true,
        letter: ['sent', 'burned'].includes(v.letter) ? v.letter : null,
        fate: Array.isArray(v.fate) ? v.fate.filter(id => D.fate.steps.some(s => s.id === id)).slice(0, D.fate.steps.length) : []
      };
    }

    freshStory() {
      return { schema: D.schema, yun: { asked: false, answer: null }, stone: false, prescription: false, letter: null, fate: [] };
    }

    validateSave(save) {
      Base.validateSave(save);
      const v = save && save.sectStory;
      if (v === undefined) return;
      if (!clean(v)) fail();
      if (Object.keys(v).sort().join(',') !== 'fate,letter,prescription,schema,stone,yun') fail();
      if (v.schema !== D.schema) fail();
      if (typeof v.stone !== 'boolean' || typeof v.prescription !== 'boolean') fail();
      if (![null, 'sent', 'burned'].includes(v.letter)) fail();
      if (!Array.isArray(v.fate)) fail();
      if (v.fate.some(id => !D.fate.steps.some(s => s.id === id))) fail();
      if (new Set(v.fate).size !== v.fate.length) fail();
      if (!clean(v.yun)) fail();
      if (Object.keys(v.yun).sort().join(',') !== 'answer,asked') fail();
      if (typeof v.yun.asked !== 'boolean') fail();
      if (![true, false, null].includes(v.yun.answer)) fail();
      if (v.yun.answer !== null && v.yun.asked !== true) fail();
    }

    exportSave() {
      const s = BaseGame.prototype.exportSave.call(this);
      const v = s.sectStory;
      if (v && !v.stone && !v.prescription && !v.yun.asked && v.yun.answer === null && v.letter === null && !v.fate.length) delete s.sectStory;
      return s;
    }

    storyState() {
      if (!this.state.sectStory) this.state.sectStory = this.freshStory();
      return this.state.sectStory;
    }

    deepTalkedYun() {
      const b = this.state.sectBond;
      return !!(b && b.talks && Array.isArray(b.talks.yun) && b.talks.yun.includes(D.partner.id === 'yun' ? 'yun-ledger' : ''));
    }

    yunReason() {
      if (!(this.state.sect && this.state.sect.id)) return '要先把宗门的事办明白，才谈这段。';
      if (this.state.map !== 'hehuan') return '这段要在行旅药站当面说。';
      if (!this.deepTalkedYun()) return D.partner.needs;
      if (this.storyState().yun.answer !== null) return '这话已经说定了，往后仍按实际做过的事记。';
      if (this.state.hp <= 0) return '气血不足，先处置伤势。';
      return '';
    }

    askYun() {
      const reason = this.yunReason();
      if (reason) { this.message(reason); return false; }
      const v = this.storyState();
      v.yun.asked = true;
      this.message(D.partner.ask);
      this.checkpoint();
      return true;
    }

    answerYun(agree) {
      if (typeof agree !== 'boolean') { this.message('这件事要自己选：同意或只做同事。'); return false; }
      const v = this.storyState();
      if (!v.yun.asked) { this.message('先把话说清楚，再谈答复。'); return false; }
      if (v.yun.answer !== null) { this.message('这话已经说定了。'); return false; }
      v.yun.answer = agree;
      this.message(agree ? D.partner.accept : D.partner.decline);
      this.checkpoint();
      return true;
    }

    stoneReason() {
      const reported = (this.state.sectSummit && this.state.sectSummit.reported) || 0;
      if (this.storyState().stone) return '碑上已经刻过了。';
      if (reported < 1) return D.stone.needs;
      return '';
    }

    carveStone() {
      const reason = this.stoneReason();
      if (reason) { this.message(reason); return false; }
      this.storyState().stone = true;
      this.message(D.stone.done);
      this.checkpoint();
      return true;
    }

    prescriptionReason() {
      const settled = (this.state.sectEvent && this.state.sectEvent.settled) || 0;
      if (this.storyState().prescription) return '旧方已经读过了。';
      if (settled < 1) return D.prescription.needs;
      return '';
    }

    readPrescription() {
      const reason = this.prescriptionReason();
      if (reason) { this.message(reason); return false; }
      this.storyState().prescription = true;
      this.message(D.prescription.lines.join(''));
      this.checkpoint();
      return true;
    }

    letterReason() {
      const v = this.storyState();
      const reported = (this.state.sectSummit && this.state.sectSummit.reported) || 0;
      if (v.letter) return D.letter.doneSent && v.letter === 'sent' ? D.letter.doneSent : D.letter.doneBurned;
      if (reported < 1) return D.letter.needs;
      if (!['hehuan', 'garden'].includes(this.state.map)) return D.letter.place;
      if (this.state.hp <= 0) return '气血不足，先处置伤势。';
      return '';
    }

    letterChoice(choice) {
      if (!['sent', 'burned'].includes(choice)) { this.message('这件事只有两条路：送出去，或当场烧了。'); return false; }
      const reason = this.letterReason();
      if (reason) { this.message(reason); return false; }
      this.storyState().letter = choice;
      this.message(choice === 'sent' ? D.letter.sent : D.letter.burned);
      this.checkpoint();
      return true;
    }

    sendLetter() { return this.letterChoice('sent'); }
    burnLetter() { return this.letterChoice('burned'); }

    fateJoined() {
      return !!(this.state.sectTianji && this.state.sectTianji.office);
    }

    fateNeedsMet(id) {
      if (id === 'reckon') return !!(this.state.sectTianji && Array.isArray(this.state.sectTianji.duties) && this.state.sectTianji.duties.includes('reckon'));
      if (id === 'first') return !!(this.state.sectTianjiDeep && Array.isArray(this.state.sectTianjiDeep.tiers) && this.state.sectTianjiDeep.tiers.includes('first'));
      if (id === 'clear') return !!(this.state.sectTianji && Array.isArray(this.state.sectTianji.duties) && this.state.sectTianji.duties.includes('clear'));
      return false;
    }

    fateStepReason(id) {
      const step = D.fate.steps.find(s => s.id === id);
      if (!step) return '没有这一处记档。';
      if (!this.fateJoined()) return '这条要在天机阁入门之后才谈。';
      const v = this.storyState();
      if (v.fate.includes(id)) return '这一处已经记下了。';
      if (!this.fateNeedsMet(id)) return step.needs;
      if (this.state.map !== 'ruins') return '这段要在观星台当面说。';
      return '';
    }

    stepFate(id) {
      const reason = this.fateStepReason(id);
      if (reason) { this.message(reason); return false; }
      const v = this.storyState();
      v.fate.push(id);
      const step = D.fate.steps.find(s => s.id === id);
      this.message(step.text + (v.fate.length === D.fate.steps.length ? D.fate.conclusion : ''));
      this.checkpoint();
      return true;
    }

    fateConcluded() {
      return this.storyState().fate.length === D.fate.steps.length;
    }

    storyStatus() {
      const v = this.storyState();
      return {
        name: D.name,
        partner: {
          id: D.partner.id,
          name: D.partner.name,
          role: D.partner.role,
          askText: D.partner.ask,
          askLabel: D.partner.askLabel,
          declineLabel: D.partner.declineLabel,
          asked: v.yun.asked,
          answer: v.yun.answer,
          reason: this.yunReason(),
          boundary: D.partner.boundary.slice()
        },
        stone: Object.assign({}, D.stone, { done_already: v.stone, reason: this.stoneReason() }),
        prescription: Object.assign({}, D.prescription, { done_already: v.prescription, reason: this.prescriptionReason() }),
        letter: Object.assign({}, D.letter, { choice: v.letter, reason: this.letterReason() }),
        fate: {
          title: D.fate.title,
          text: D.fate.text,
          note: D.fate.note,
          conclusion: D.fate.conclusion,
          concluded: this.fateConcluded(),
          done: v.fate.length,
          total: D.fate.steps.length,
          steps: D.fate.steps.map(s => Object.assign({}, s, { done: v.fate.includes(s.id), reason: this.fateStepReason(s.id) }))
        },
        notes: Object.assign({}, D.notes),
        source: D.source
      };
    }

    sectStatus() {
      const st = BaseGame.prototype.sectStatus.call(this);
      st.story = this.storyStatus();
      return st;
    }
  }

  const api = Object.assign({}, Base, { Game, validateSave: Game.prototype.validateSave, sectStory: D });
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
