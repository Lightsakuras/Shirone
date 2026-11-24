/*
 * 七宗会武的具名出场层（DSH 新增）：只把赛事对手换成具名人物，不改任何规则与数值。
 * 画像、场景和参赛名录只用于显示。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const Base = node ? require('./sect-summit.js') : root.XiuxianEngine;
  const F = node ? require('./sect-factions-data.js') : root.XiuxianSectFactionsData;

  class Game extends Base.Game {
    constructor(options) {
      super(options);
      this.state = this.state || {};
    }

    factionOf(id) {
      const f = F.factions[id];
      return f ? Object.assign({}, f) : null;
    }

    namedForRound(round) {
      const row = F.rounds.find(r => r.round === round);
      if (!row) return null;
      const person = F.people[row.main];
      if (!person) return null;
      const faction = F.factions[person.faction];
      return {
        round: row.round,
        title: row.title,
        id: person.id,
        name: person.name,
        role: person.role,
        faction: person.faction,
        factionName: faction ? faction.name : '',
        line: person.line,
        look: person.look,
        art: person.art,
        artId: person.artId,
        backup: row.backup ? (F.people[row.backup] || null) : null
      };
    }

    sectSummitRoster() {
      return F.rounds.map(row => this.namedForRound(row.round)).filter(Boolean);
    }

    // 只改显示名与归属，不出现在存档里，也不影响 maxHp/damage 等真实数值。
    summitSpawn(round) {
      const foe = super.summitSpawn(round);
      if (!foe) return foe;
      const person = this.namedForRound(round);
      if (!person) return foe;
      foe.name = person.name;
      foe.faction = person.factionName;
      foe.persona = person.id;
      foe.spriteKey = 'summit-' + person.id;
      return foe;
    }

    sectFactionsStatus() {
      return {
        grounds: {
          id: F.grounds.id,
          name: F.grounds.name,
          host: this.factionOf(F.grounds.hostFaction),
          hostPerson: F.people[F.grounds.hostPerson] ? F.people[F.grounds.hostPerson].name : null,
          note: F.grounds.note,
          art: F.grounds.art,
          artId: F.grounds.artId
        },
        factions: Object.keys(F.factions).map(id => this.factionOf(id)),
        roster: this.sectSummitRoster(),
        notes: Object.assign({}, F.notes),
        artPending: F.artPending.slice(),
        source: F.source
      };
    }

    sectSummitStatus() {
      const st = super.sectSummitStatus();
      const named = this.namedForRound(this.state.sectSummit && this.state.sectSummit.battle
        ? this.state.sectSummit.round
        : (st && st.round ? st.round : 1));
      st.grounds = F.grounds.name;
      st.intro = '本届七宗会武由蜀山剑宗在照心坪主持。依次打过三轮，再回行旅药站向云照报名次。';
      st.rewardNote = '名次只记入本门会武档案。';
      st.host = F.people[F.grounds.hostPerson] ? F.people[F.grounds.hostPerson].name : null;
      st.hostProfile = F.people[F.grounds.hostPerson];
      st.groundsArt = F.grounds.art;
      st.currentOpponent = named ? named.name : null;
      st.currentOpponentFaction = named ? named.factionName : null;
      st.roster = this.sectSummitRoster();
      st.factionNotes = Object.assign({}, F.notes);
      return st;
    }
  }

  const api = Object.assign({}, Base, { Game, validateSave: Base.validateSave, sectFactions: F });
  if (node) module.exports = api; else root.XiuxianEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
