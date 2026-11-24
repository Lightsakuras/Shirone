(function (root) {
  'use strict';
  // 赴会赛事与返宗评注。会场沿用既有药庐庭院，对手是赴会而来的未具名同道；
  // 不新增具名人物、不造新会场，也不改名冒充主线金顶的七宗试剑。
  const Data = {
    schema: 1,
    id: 'sectEvent',
    title: '赴会赛事',
    map: 'garden',
    place: '药庐庭院',
    settleMap: 'hehuan',
    settlePlace: '行旅药站',
    maxEvents: 999,
    roundCount: 2,
    rounds: [
      { id: 'event_first', name: '赴会同道 · 剑修', kind: 'stone', x: 930, y: 470, maxHp: 168, damage: 14, speed: 66 },
      { id: 'event_final', name: '赴会同道 · 术修', kind: 'sprite', x: 1050, y: 470, maxHp: 196, damage: 17, speed: 60 }
    ],
    kit: {},
    notes: {
      win: '两场比试皆已稳稳拿下，返宗后可凭此战绩记入一笔评注。',
      loss: '这一届未能走到底，先返宗补修招法，再报下一届。',
      settled: '云照把你的赛果记进门内档案。'
    },
    notYet: '七宗合流的主线大比尚未开启：此处仅为代表本门出战的两场赴会赛与返宗评注，不冒充金顶试剑。',
    source: '会场与对手沿用既有庭院与未具名同道；具名赛事人物与新会场仍待核定。'
  };
  if (typeof module === 'object' && module.exports) module.exports = Data;
  else root.XiuxianSectEventData = Data;
})(typeof window !== 'undefined' ? window : globalThis);
