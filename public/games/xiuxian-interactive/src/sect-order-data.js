(function (root) {
  'use strict';
  const node = typeof module !== 'undefined' && module.exports;
  const api = {
    schema: 1,
    id: 'sectOrder',
    title: '批次 C：丹鼎门与百草谷',
    orders: {
      danding: {
        id: 'danding',
        name: '丹鼎门',
        motto: '火候到了，药才知道自己的名字',
        place: '药庐后院 · 丹房',
        map: 'garden',
        mentor: { id: 'lu-qinghe', name: '陆青禾' },
        intro: {
          greet: '在丹房听陆青禾讲一遍火候与账目的规矩。',
          service: '替丹鼎门办成一件真实炉务（焙药、试火、守炉或清炉）。',
          confirm: '明确同意「药不认人，只认火候；不以外泄炉方换利」的门规。',
          rules: [
            '成丹与失败都照实记，不以外泄炉方换利。',
            '同一炉务只记一次，成绩随实际炉况。',
            '两宗不抢地，也不能同时入门。'
          ]
        },
        duties: [
          { id: 'roast', label: '焙药', desc: '按火候翻焙一批青灵草，连烤焦失手的那几叶也如实记下。', cost: { herb: 1 }, merit: 4, prestige: 2 },
          { id: 'tryfire', label: '试火', desc: '试烧一炉新火，只将能够稳定复现的火候写进炉册。', cost: { dust: 1 }, merit: 6, prestige: 3 },
          { id: 'tend', label: '守炉', desc: '彻夜看守丹炉，将每一次添炭时辰与焰色变化逐笔录清。', cost: { water: 1 }, merit: 8, prestige: 4 },
          { id: 'sweep', label: '清炉', desc: '扫净炉膛积灰与焦渣，挑出尚可续用的旧炉砖。', cost: { paper: 1 }, merit: 10, prestige: 5 }
        ],
        offices: [
          { id: 'novice', name: '记名炉工', merit: 0, prestige: 0, permissions: { recommend: false, lead: false, recruit: false, teach: false, govern: false } },
          { id: 'stoker', name: '掌火', merit: 8, prestige: 4, permissions: { recommend: true, lead: false, recruit: false, teach: false, govern: false } },
          { id: 'tender', name: '司炉', merit: 16, prestige: 8, permissions: { recommend: true, lead: true, recruit: false, teach: false, govern: false } },
          { id: 'craftsman', name: '炉匠', merit: 24, prestige: 12, permissions: { recommend: true, lead: true, recruit: true, teach: false, govern: false } },
          { id: 'elder', name: '炉主', merit: 48, prestige: 24, permissions: { recommend: true, lead: true, recruit: true, teach: true, govern: true } }
        ],
        paths: [
          { id: 'temper', name: '候火', desc: '把既有功法的收放练到火候不乱：同息一味回得更稳。', cost: { herb: 2, water: 2 }, contribution: 10 },
          { id: 'forge', name: '淬锋', desc: '把出手的力道收在一线：掠灵一味少漏一些。', cost: { dust: 2, paper: 2 }, contribution: 14 }
        ],
        chapters: [
          {
            id: 'embers', name: '《辨火篇》', path: 'temper', job: '照看焙炉',
            teaching: '陆青禾拿火钳拨开炉灰：「盯紧砖缝。火舌往外舔，就把风门掩小三分；若连灰底都暗透了，才轮得到你添炭。」',
            choices: { vent: '掩小风门', fuel: '拨灰添炭' },
            rounds: [
              { sign: '炉砖缝里蹿出赤红火舌，竹筛边缘的药叶已微微发卷。', answer: 'vent', result: '你推掩半扇风门。火舌缩回砖底，筛中药片借余温慢焙透亮。' },
              { sign: '药筛底下仍泛潮气，拨开浮灰，炉膛深处连半点红星也不见。', answer: 'fuel', result: '新添的硬炭稳稳接住底火，筛上潮气随之散尽。' }
            ]
          },
          {
            id: 'quench', name: '《收锋篇》', path: 'forge', job: '淬制药刀',
            teaching: '陆青禾用铁钳夹稳刀背，叫你看准刃口：「一头亮一头暗，此时入水必弯。先把炭火走匀，待整条刃口烧成同一色，再下水淬。」',
            choices: { dip: '将刀刃入水', turn: '翻转刀坯匀火' },
            rounds: [
              { sign: '药刀前尖已烧得透亮，靠近刀柄那一截却还发暗。', answer: 'turn', result: '你将发暗那截送回炭心，待火色通体走匀方才出炉。试斩干药根，切口齐整如削。' },
              { sign: '自刀尖至刀根，窄窄一线尽是均匀的赤红。', answer: 'dip', result: '你持稳铁钳，将刀刃平直送入冷水槽。待白雾散尽拎起再看，刃线笔直不偏。' }
            ]
          }
        ],
        notes: {
          dutiesOnce: '这四件炉务各自的记档只算一次；再做同一件不再加功绩。',
          noBuff: '门径只记档，不额外改战斗数值，也不产生新货币。'
        },
        sceneArt: 'art-faction-danding-workshop',
        officeArt: 'art-danding-master'
      },
      baicao: {
        id: 'baicao',
        name: '百草谷',
        motto: '先认草木的脾气，再谈用它',
        place: '山南遗址 · 野圃',
        map: 'ruins',
        mentor: { id: 'ye-zhiqiu', name: '叶知秋' },
        intro: {
          greet: '在野圃听叶知秋讲一遍辨草与采种的规矩。',
          service: '替百草谷办成一件真实圃务（辨草、采种、驱虫或晒药）。',
          confirm: '明确同意「药性说清，采多少说多少，不以外泄圃址换利」的门规。',
          rules: [
            '采多少说多少，不把野圃说成自家药园。',
            '同一圃务只记一次，收成随实际节气。',
            '两宗不抢地，也不能同时入门。'
          ]
        },
        duties: [
          { id: 'identify', label: '辨草', desc: '将混在药苗间的野草逐株分拣出来，连认错的那几棵也如实记档。', cost: { paper: 1 }, merit: 4, prestige: 2 },
          { id: 'seed', label: '采种', desc: '采收一批熟透能活的草种，绝不连根拔绝。', cost: { herb: 1 }, merit: 6, prestige: 3 },
          { id: 'ward', label: '驱虫', desc: '捉净药畦里的害虫，把虫啮残叶留作病害样本。', cost: { water: 1 }, merit: 8, prestige: 4 },
          { id: 'dry', label: '晒药', desc: '趁晴翻晒新收药草，受潮霉变的批次亦如实登账。', cost: { dust: 1 }, merit: 10, prestige: 5 }
        ],
        offices: [
          { id: 'novice', name: '记名圃工', merit: 0, prestige: 0, permissions: { recommend: false, lead: false, recruit: false, teach: false, govern: false } },
          { id: 'picker', name: '采药人', merit: 8, prestige: 4, permissions: { recommend: true, lead: false, recruit: false, teach: false, govern: false } },
          { id: 'gardener', name: '圃师', merit: 16, prestige: 8, permissions: { recommend: true, lead: true, recruit: false, teach: false, govern: false } },
          { id: 'herbalist', name: '药谷录事', merit: 24, prestige: 12, permissions: { recommend: true, lead: true, recruit: true, teach: false, govern: false } },
          { id: 'elder', name: '谷老', merit: 48, prestige: 24, permissions: { recommend: true, lead: true, recruit: true, teach: true, govern: true } }
        ],
        paths: [
          { id: 'know', name: '识性', desc: '把药性记进手底：同息一味回得更稳。', cost: { herb: 2, dust: 2 }, contribution: 10 },
          { id: 'guide', name: '引脉', desc: '把采来的草木用在该用的地方：掠灵一味少漏一些。', cost: { water: 2, paper: 2 }, contribution: 14 }
        ],
        chapters: [
          {
            id: 'leaves', name: '《察叶篇》', path: 'know', job: '照料新苗',
            teaching: '叶知秋蹲在畦边，一把按住你伸向水瓢的手，引到苗根旁：「同是蔫叶，病因却分两头。先拿手捻土——干得散沙才浇水，湿得粘手就得赶紧通沟。」',
            choices: { drain: '疏通垄沟', water: '沿根浇水' },
            rounds: [
              { sign: '新苗低垂着叶片。你从根旁捻起一撮浮土，干土粒顺着指缝簌簌滑落。', answer: 'water', result: '清水顺着根窝慢慢渗入土中。待日暮复查，先前贴地的两片嫩叶已重新挺起。' },
              { sign: '新苗低垂着叶片。泥土湿黏沾指，垄沟里还积着一洼浊水。', answer: 'drain', result: '你用竹铲挑开堵死沟口的泥团。积水顺沟退净，苗根四周重新透出干爽土色。' }
            ]
          },
          {
            id: 'seedstock', name: '《留种篇》', path: 'guide', job: '收存圃种',
            teaching: '叶知秋掐下一枚种荚，凑在你耳畔轻轻一晃：「听见籽响了么？这等熟透的，须拿布兜在底下收；捏着还发软的，乖乖给它留回枝头。」',
            choices: { wait: '系线留在枝头', gather: '兜布收种' },
            rounds: [
              { sign: '荚皮虽已泛黄，指腹轻按仍有韧劲，晃动时里头毫无声响。', answer: 'wait', result: '你在枝头系上一根红线作记。待隔数日循线复看，荚中草籽方才真正饱熟。' },
              { sign: '枝头种荚已晒得干脆，山风一拂，壳内便传出细碎沙沙声。', answer: 'gather', result: '你先在枝下张开布兜，再轻触果蒂。荚壳应声轻裂，饱满草籽一粒不落地滚入布中。' }
            ]
          }
        ],
        notes: {
          dutiesOnce: '这四件圃务各自的记档只算一次；再做同一件不再加功绩。',
          noBuff: '门径只记档，不额外改战斗数值，也不产生新货币。'
        },
        sceneArt: 'art-faction-baicao-garden',
        officeArt: 'art-baicao-master'
      }
    },
    order: ['danding', 'baicao'],
    maxLevel: 3,
    firstWork: { merit: 10, prestige: 5 },
    source: 'src/sect-order-data.js'
  };
  if (node) module.exports = api; else root.XiuxianSectOrderData = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
