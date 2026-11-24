(function (root) {
  'use strict';
  const data = {
    width: 1280, height: 760,
    origins: {
      sword: { name: '剑庐随修', line: '剑开前路', desc: '随剑庐习得凌厉剑路，可挥剑斩开挡路枯藤；入山时随身多带一张护身符。' },
      medicine: { name: '药庐学徒', line: '草木皆有用', desc: '熟稔草木药理，采药时可多得嫩叶、辨识奇草；入山时随身多带一枚回气丹。' },
      scholar: { name: '经阁研习', line: '知阵而行', desc: '能读懂旧阵残碑上的引气方位，直接拨开藤障捷径，并多获两张旧藏符箓。' }
    },
    items: {
      fire: { name: '燃火符', mark: '焰', type: '符箓', color: '#e99b63', desc: '点选后投向指针方位，灼伤落点四周的石傀或阵灵；对竹甲破甲效率翻倍，亦可直接烧除挡路枯藤。', key: '1' },
      needle: { name: '寒针', mark: '针', type: '暗器', color: '#99c9db', desc: '点选后掷向指针方位，对小范围敌手造成伤害并令其迟缓 5 秒；对石纹护甲破甲极快，亦可打断邪功蓄力。', key: '2' },
      incense: { name: '引灵香', mark: '引', type: '诱饵', color: '#a3b88d', desc: '点选空地燃起一缕灵香，将附近石傀或普通阵灵引诱至香旁 8 秒；适合配合「收势」不战绕行取匣。', key: '3' },
      potion: { name: '回气丹', mark: '丹', type: '丹药', color: '#d0ad67', desc: '随手服下立回 45 点气血与 30 点灵力；气血与灵力双满时不会误耗。', key: '4', self: true },
      ward: { name: '护身符', mark: '御', type: '符箓', color: '#b9badf', desc: '激发后凝成 12 秒护体灵光，期间所受一切攻击伤害降低 65%；生效中不会重复消耗。', key: '5', self: true },
      herb: { name: '青灵草', mark: '草', type: '材料', color: '#96ba90', desc: '药庐与后山常见的入药灵草。集齐两份青灵草与一份山泉水，可在丹炉炼成一枚回气丹。' },
      water: { name: '山泉水', mark: '泉', type: '材料', color: '#9ec6ce', desc: '自药庐石井汲取的清冽泉水，可在丹炉配伍青灵草炼制回气丹，或煎煮温养茶。' },
      paper: { name: '符纸', mark: '纸', type: '材料', color: '#d4c5a6', desc: '裁制齐整的空白黄符纸。在药庐丹炉旁的制符台配以灵砂，可制成燃火符或护身符。' },
      dust: { name: '灵砂', mark: '砂', type: '材料', color: '#cbad80', desc: '击散石傀或开启旧阵残箱所得的细碎灵砂。在药庐制符台配以符纸，可绘成各式符箓与引灵香。' },
      box: { name: '药庐木匣', mark: '匣', type: '任务', color: '#c8a878', desc: '沈灵薇托你从后山旧阵寻回的药匣。取到手后带回药庐交予她即可，属任务专物，不会被炼制消耗。' },
      cake: { name: '杏花糕', mark: '糕', type: '食物', color: '#dcbead', desc: '沈灵薇亲手留给你的药庐茶点，服下立回 18 点气血；配含露瓶或生息器忆另有加成。', self: true }
    },
    recipes: {
      potion: { label: '炼回气丹', cost: { herb: 2, water: 1 }, amount: 1 },
      fire: { label: '制燃火符', cost: { paper: 1, dust: 1 }, amount: 2 },
      ward: { label: '制护身符', cost: { paper: 1, herb: 1 }, amount: 1 }
    },
    maps: {
      garden: {
        name: '蜀山 · 药庐', sub: '山雨初歇，草木含香',
        walls: [{ x: 60, y: 70, w: 440, h: 220 }, { x: 770, y: 70, w: 180, h: 130 }],
        objects: [
          { id: 'sister', kind: 'npc', x: 300, y: 350, name: '沈灵薇' },
          { id: 'furnace', kind: 'furnace', x: 489, y: 288, name: '丹炉 · 制符台' },
          { id: 'well', kind: 'well', x: 360, y: 533, name: '石井' },
          { id: 'training', kind: 'training', x: 601, y: 535, name: '试剑桩' },
          { id: 'herb1', kind: 'herb', x: 780, y: 340, name: '青灵草' },
          { id: 'herb2', kind: 'herb', x: 888, y: 390, name: '青灵草' },
          { id: 'herb3', kind: 'herb', x: 965, y: 510, name: '青灵草' },
          { id: 'supply', kind: 'supply', x: 660, y: 250, name: '试炼物资' },
          { id: 'toRuins', kind: 'portal', x: 1160, y: 384, name: '前往后山旧阵' }
        ]
      },
      ruins: {
        name: '后山 · 旧阵', sub: '香引石灵，符破藤障',
        walls: [{ x: 520, y: 72, w: 135, h: 244 }, { x: 510, y: 446, w: 145, h: 244 }, { x: 893, y: 130, w: 92, h: 90 }, { x: 853, y: 572, w: 100, h: 100 }],
        objects: [
          { id: 'toGarden', kind: 'portal', x: 107, y: 384, name: '返回药庐' },
          { id: 'inscription', kind: 'stone', x: 400, y: 238, name: '旧阵碑文' },
          { id: 'wildHerb', kind: 'herb', x: 310, y: 535, name: '石隙灵草' },
          { id: 'vine', kind: 'vine', x: 634, y: 381, name: '挡路枯藤' },
          { id: 'chest', kind: 'chest', x: 1084, y: 302, name: '遗落药匣' },
          { id: 'cache', kind: 'cache', x: 1100, y: 586, name: '旧阵残箱' }
        ]
      }
    },
    enemies: [
      { id: 'guard', kind: 'stone', x: 1010, y: 370, maxHp: 115, speed: 55, damage: 17 },
      { id: 'sprite', kind: 'sprite', x: 825, y: 462, maxHp: 65, speed: 85, damage: 10 }
    ]
  };
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.XiuxianData = data;
})(globalThis);
