/*
 * 天机阁数据层（DSH 新增，批次 B 第一步）：可加入的第二宗门。
 * 观星台借既有遗址高台地景，门内页有独立场景和棋盘。
 */
(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;

  const D = {
    schema: 1,
    id: 'tianji',
    name: '天机阁',
    motto: '先看一步，再落一子',
    color: '#3f5d74',
    // 山门：借既有遗址（高台）作观星台，不新建地图，也不抢合欢宗的药站。
    place: '观星台',
    map: 'ruins',
    mentor: { id: 'xie-guanlan', name: '谢观澜', role: '天机阁执棋人' },
    intro: {
      steps: [
        { id: 'greet', label: '相识', detail: '在观星台上听谢观澜讲门规：推演只报实情，不以外泄结果换利。' },
        { id: 'service', label: '公开事务', detail: '在观星台替天机阁办成一件真实差事（校历、推棋、验算或清障）。' },
        { id: 'confirm', label: '确认', detail: '明确同意门规后入门；入门只新增归属，来处与原有委托都保留。' }
      ],
      rules: [
        '推演只报实情：算得住就说算得住，算不住就说算不住。',
        '不以外泄推演结果换利；他门来问，只答本门公开的那部分。',
        '两宗不抢地：药站归合欢宗，天机阁的差事在观星台办。'
      ],
      notes: {
        beforeGreet: '先到观星台（山南遗址高台）听门规。',
        beforeService: '门内要看真实做过的事：在观星台办成一件差事即可。',
        noService: '差事须在观星台亲手办：校历、推棋、验算、清障。',
        otherSect: '已在合欢宗门下，不能同时入天机阁；要改换门庭须先退宗。'
      }
    },
    // 门内事务：只记功绩与威望，不产出新货币，也不改贡献账。
    duties: {
      calendar: { id: 'calendar', name: '校历', detail: '校对观星台旧历与今岁星位，把误差记在册上。', cost: { paper: 1 }, merit: 4, prestige: 2 },
      chess: { id: 'chess', name: '推棋', detail: '按棋谱推演三路应对，只把算得出的写法记档。', cost: { dust: 1 }, merit: 6, prestige: 3 },
      reckon: { id: 'reckon', name: '验算', detail: '复核门内旧账里的推演结论，错的标出来。', cost: { water: 1 }, merit: 8, prestige: 4 },
      clear: { id: 'clear', name: '清障', detail: '清掉观星台积下的杂物与旧碑土石，留出视野。', cost: { herb: 1 }, merit: 10, prestige: 5 }
    },
    order: ['calendar', 'chess', 'reckon', 'clear'],
    // 阶位：与合欢宗同构五阶，权限逐项开放；本步只做阶位与事务，招录与经营留后续批次。
    offices: {
      novice: { name: '记名弟子', merit: 0, prestige: 0, permissions: { recommend: false, lead: false, recruit: false, teach: false, govern: false } },
      compiler: { name: '执历', merit: 12, prestige: 6, permissions: { recommend: true, lead: false, recruit: false, teach: false, govern: false } },
      reckoner: { name: '掌算', merit: 28, prestige: 14, permissions: { recommend: true, lead: true, recruit: false, teach: false, govern: false } },
      keeper: { name: '主簿', merit: 48, prestige: 24, permissions: { recommend: true, lead: true, recruit: true, teach: true, govern: false } },
      elder: { name: '阁老', merit: 72, prestige: 36, permissions: { recommend: true, lead: true, recruit: true, teach: true, govern: true } }
    },
    officeOrder: ['novice', 'compiler', 'reckoner', 'keeper', 'elder'],
    // 天机阁自己的两条门径（与合欢宗的双修/采补不同，落地在推演与布局）。
    paths: {
      divine: {
        id: 'divine',
        name: '推演',
        detail: '把对手的起手算在内：先看清一手，再决定怎么应。',
        cost: { water: 2, dust: 2 },
        contribution: 10
      },
      scheme: {
        id: 'scheme',
        name: '布局',
        detail: '留一手不急着用：把可用的一次机会留到真正要紧的时候。',
        cost: { paper: 2, dust: 2 },
        contribution: 14
      }
    },
    pathOrder: ['divine', 'scheme'],
    maxLevel: 3,
    place_note: '观星台借山南遗址高台，地景与合欢宗药站分开；本宗不设药站职能。',
    notYet: [
      '四件差事办齐可当掌算。再上一步，要带着亲手核过的星表，到观星台接案。报请主簿须功绩 48、威望 24，阁老须功绩 72、威望 36。'
    ],
    artPending: [],
    source: 'src/sect-tianji-data.js#D'
  };

  if (node) module.exports = D; else root.XiuxianSectTianjiData = D;
})(typeof globalThis !== 'undefined' ? globalThis : this);
