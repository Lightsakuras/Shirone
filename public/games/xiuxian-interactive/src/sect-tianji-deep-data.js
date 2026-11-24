/*
 * 天机阁批次 B：独门两篇（先手 / 留子）与观星台经营（派遣观星 / 校对地方志）。
 * 两篇只给公开信息，不改任何数值；经营只记次数与名册，不改三本账、不发新货币。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;

  const D = {
    schema: 1,
    sect: 'tianji',
    secrets: {
      first: {
        id: 'first', order: 1, name: '先手篇',
        requires: { path: 'divine', level: 3, tier: null },
        cost: { paper: 2, dust: 3 }, contribution: 10,
        gives: 'info-summit',
        text: '所谓先手，不在抢快出招，而在未战先明：修成此篇后，赴七宗会武前即可在宗门面板看清本届主对手及其路数。',
        effect: '面板多显示本届主对手与门径；不改任何战斗数值。'
      },
      reserve: {
        id: 'reserve', order: 2, name: '留子篇',
        requires: { path: 'scheme', level: 3, tier: 'first' },
        cost: { paper: 3, dust: 2 }, contribution: 14,
        gives: 'info-manage',
        text: '所谓留子，是在棋盘上给自己留一条未动之径：修成此篇后，核校观星台账目时可多看出一层隐伏结论。',
        effect: '经营面板多显示一条核对结论；不改任何收益。'
      }
    },
    order: ['first', 'reserve'],
    manage: {
      dispatch: { id: 'dispatch', name: '派遣观星', permission: 'lead', cost: {}, text: '点一队同门上观星台值夜，只记一次排班。' },
      prove: { id: 'prove', name: '校对地方志', permission: 'lead', cost: { paper: 1 }, requires: 'dispatch', text: '把观星台记录与地方志对照一次，只记一次核对。' }
    },
    manageOrder: ['dispatch', 'prove'],
    reviews: [
      { id: 'dates', name: '两册差一日', office: 'reckoner', tier: 'first', pairs: 1, merit: 20, prestige: 10,
        scene: '谢观澜将两册星表推至你手边：东台把那一夜记作二月初一，西台却记作正月三十。而两张星图上，月轮皆刚擦过井宿边缘。',
        question: '东台换过历。你打算从哪里查起？',
        choices: [{ id: 'average', label: '取两册的中数入档' }, { id: 'rebase', label: '先对两台换历的日子，再重排星图' }],
        answer: 'rebase', retry: '谢观澜拿指节叩了叩两个日子：“天上只有一轮月亮，被你硬生生多添了半宿。再去查查两台各自从哪一日换历起算。”',
        close: '你先核准两台换历的起算日，月行轨迹顿时严丝合缝。谢观澜将笔递来：“签上你的名。这一笔落下，日后必有人上台来问。”' },
      { id: 'cloud', name: '云后的那颗星', office: 'keeper', tier: 'reserve', pairs: 2, merit: 24, prestige: 12,
        scene: '次日一早便要向山下发付星报。北台记丑时见客星掠境，南台同一栏却空着，纸角只注「云厚」二字。值夜弟子捏着两页草报，等你落印定夺。',
        question: '你怎样签这份星报？',
        choices: [{ id: 'retain', label: '分录两台所见，留空处待下次复测' }, { id: 'unanimous', label: '并作两台同见，一起盖印' }],
        answer: 'retain', retry: '谢观澜抽走南台那页纸，淡淡睨来：“人家写的是云厚——是谁替南台隔着浓云看见了星？”',
        close: '你在南台空栏旁注下待复测的时辰，将两台所见分列呈报。谢观澜过目后把阁印留在案角：“山下催得再急，天机阁也只能送出亲眼看准的东西。”' }
    ],
    notes: {
      secretGate: '两篇都要先把对应门径修满三层，再用实物换；宗门贡献只作门槛，不扣。',
      manageNote: '掌算起可排班值夜。每班的观测可拿来校对一次地方志，核过的班次写进案卷履历。',
      noBuff: '两篇只给公开信息，不提供任何数值加成，也不是可攻略对象。'
    },
    source: 'src/sect-tianji-deep-data.js#D'
  };

  if (node) module.exports = D; else root.XiuxianSectTianjiDeepData = D;
})(typeof globalThis !== 'undefined' ? globalThis : this);
