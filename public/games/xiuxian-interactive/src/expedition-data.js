(function (root) {
  'use strict';
  const D = typeof module === 'object' && module.exports ? require('./data.js') : root.XiuxianData;
  const relics = {
    jade: { name: '流碧佩', cell: 0, path: 'ward', desc: '架剑成功格挡敌招时立即回复气血（每 2 秒至多触发一次），适合守势反击流。', values: [2, 4, 6] },
    bell: { name: '听雨铃', cell: 1, path: 'scent', desc: '挥剑斩击正被引灵香吸引或身处香雾范围内的敌手时，每剑附加额外伤害。', values: [10, 17, 25] },
    flask: { name: '含露瓶', cell: 2, path: 'herb', desc: '每当服下回气丹、温养茶或杏花糕时，额外凝成数秒护身减伤状态。', values: [2, 3, 5] },
    mirror: { name: '照雪鉴', cell: 3, path: 'frost', desc: '挥剑斩击正处于迟缓状态的敌手时附加额外伤害（寒针与定脉诀所造成的减速皆可触发）。', values: [10, 17, 25] },
    scroll: { name: '云篆卷', cell: 4, path: 'ember', desc: '投出燃火符每灼中一名敌手，立即为你返还一笔灵力，人多处投符最划算。', values: [4, 7, 10] },
    bamboo: { name: '风竹扣', cell: 5, path: 'blade', desc: '运灵闪避后的 3 秒内，紧接而出的下一记剑击附加高额斩伤。', values: [10, 18, 28] },
    censer: { name: '留香鼎', cell: 6, path: 'scent', desc: '点燃引灵香后，香雾驻留与诱敌的持续秒数显著延长。', values: [3, 5, 8] },
    bracers: { name: '镇岳腕', cell: 7, path: 'ward', desc: '架剑格挡接下敌招后，紧接反击的下一剑附加高额破敌伤害。', values: [12, 21, 32] },
    inkstone: { name: '流金砚', cell: 8, path: 'ember', desc: '在每间秘境首次投出燃火符时，自动化余墨回补寒针，令火符与寒针循环不绝。', values: [1, 2, 3] },
    lantern: { name: '长明盏', cell: 9, path: 'ember', desc: '每当击散正处于灼烧状态的敌手时，立即为你回复一笔气血。', values: [4, 7, 11] },
    map: { name: '寻脉图', cell: 10, path: 'herb', desc: '每闯过一间秘境房间，过关结算时额外为你回补一笔灵力。', values: [12, 20, 30] },
    chime: { name: '断云磬', cell: 11, path: 'blade', desc: '每打出第三次有效剑击，磬音即向周遭敌手震出一圈额外范围伤害。', values: [8, 14, 22] }
  };
  const paths = {
    blade: { name: '剑鸣', color: '#e8c978', desc: '剑击伤害 +3', cell: 0 },
    frost: { name: '凝霜', color: '#a4e6f6', desc: '剑击减速敌人额外 +6', cell: 1 },
    ember: { name: '余烬', color: '#ffba68', desc: '火符伤害 +7', cell: 2 },
    scent: { name: '留香', color: '#d6b3f2', desc: '剑击引香敌人额外 +7', cell: 3 },
    ward: { name: '守心', color: '#e6ce8e', desc: '受到伤害减少 8%', cell: 4 },
    herb: { name: '生息', color: '#aee5ae', desc: '药食额外回复气血 +4', cell: 5 }
  };
  const boons = {
    frost: { name: '霜后见刃', path: 'frost', desc: '寒针减速延长 3 秒；剑击减速敌人 +14 伤害。' },
    ember: { name: '借火还灵', path: 'ember', desc: '火符命中回复 8 灵力，直接伤害 +12。' },
    scent: { name: '循香不争', path: 'scent', desc: '引灵香延长 4 秒；剑击引香敌人 +16 伤害。' },
    ward: { name: '守而后发', path: 'ward', desc: '格挡每 2 秒至多回复 3 气血；格挡后下一剑 +20 伤害。' },
    blade: { name: '踏风留痕', path: 'blade', desc: '闪避耗灵降为 8；闪避后下一剑 +18 伤害。' },
    herb: { name: '草木回春', path: 'herb', desc: '服药额外回复 15 气血；每间通关回复 10 气血。' }
  };
  const affixes = {
    keen: { name: '鸣锋', desc: '剑击伤害 +2' },
    calm: { name: '养息', desc: '灵力每秒恢复 +0.4' },
    kind: { name: '温玉', desc: '药食回复气血 +2' },
    firm: { name: '坚心', desc: '受到伤害减少 3%' }
  };
  const rooms = {
    hunt: { name: '听雨试锋', map: 'bamboo', label: '战斗', desc: '击散房内三道阵灵即可过关。器物掉落稳妥，最适合试演法宝与功法联动。', reward: 'blade' },
    herb: { name: '月露寻药', map: 'valley', label: '采集 / 绕行', desc: '在谷中采齐三株月露草即可过关离去，沿途守护灵无须逐一击杀。', reward: 'herb' },
    seal: { name: '残碑问脉', map: 'bamboo', label: '解阵', desc: '依「木生火、火归土」之序依次触通三面脉碑即可破阵，途中可投香引开阵灵。', reward: 'ward' },
    boss: { name: '古磬归鸣', map: 'sanctum', label: '守关', desc: '击败守关的守阵古磬。注意避开地面金红落雷圈；古磬半血后攻势将更为急促。', reward: 'blade' }
  };
  const enemies = {
    reed: { name: '竹甲阵卫', cell: 0, kind: 'reed', maxHp: 76, speed: 72, damage: 11, reach: 63, radius: 71, height: 105 },
    moth: { name: '篆火灵蛾', cell: 1, kind: 'moth', maxHp: 52, speed: 55, damage: 10, reach: 235, radius: 55, height: 70 },
    deer: { name: '月露灵鹿', cell: 2, kind: 'deer', maxHp: 85, speed: 90, damage: 12, reach: 75, radius: 78, height: 106 },
    wisp: { name: '游墨残灵', cell: 3, kind: 'wisp', maxHp: 58, speed: 60, damage: 11, reach: 220, radius: 57, height: 92 },
    sentinel: { name: '金纹石卫', cell: 4, kind: 'sentinel', maxHp: 115, speed: 53, damage: 16, reach: 73, radius: 87, height: 126 },
    keeper: { name: '守阵古磬', cell: 5, kind: 'keeper', maxHp: 380, speed: 45, damage: 20, reach: 210, radius: 102, height: 155 }
  };
  const notes = {
    rain: { title: '雨声里的剑痕', text: '旧阵石阶上留着历代无名弟子的试剑刻痕。沈灵薇俯身认出其中一道旧迹：“这人后来转修医道了。不过曾经握过剑的手，底子总不会白费。”' },
    herb: { title: '药性随水而变', text: '同是一株月露草，生在溪畔与长在岩隙的药性便大相径庭。药庐旧簿把救治病患的始末记比丹方还细——做医者的，既要认得草，更要记得吃药的人。' },
    seal: { title: '经阁漏记的一页', text: '三面古碑所载原是疏导山中灵脉的法门，而非镇杀妖邪的凶阵。碑阴还留着一处被人刻意磨平的署名。你将碑文拓印收妥，留待日后向经阁查证。' },
    women: { title: '女修的行药笺', text: '前辈女修在页边留有一行小注：出山远行宜备温养茶与洁净软布，若逢身子不适便择地歇脚，万勿强撑。旁侧另有后人添笔：“纵使凝结金丹后不再有月事，这份顾惜己身的习惯仍当传予后辈。”' },
    keeper: { title: '古磬听过的人', text: '古磬余音里封存着历代弟子习剑、受挫、再提剑起身的回响。它既未指认灭村元凶，也替不得青阳查案；却叫你听清，蜀山数百年来并非只有一种声音。' }
  };
  D.items.tea = { name: '温养茶', mark: '茶', type: '药食', color: '#bdd99b', self: true, desc: '饮下后回复 20 点气血与 45 点灵力。其煎制茶方可在「月露寻药」路线中领悟。' };
  Object.assign(D.recipes, {
    needle: { cost: { paper: 1, dust: 1 }, amount: 3, label: '凝针', unlock: true },
    incense: { cost: { herb: 1, dust: 1 }, amount: 2, label: '合香', unlock: true },
    tea: { cost: { herb: 1, water: 1 }, amount: 2, label: '煎茶', unlock: true }
  });
  for (const [id, name] of [['bamboo', '听雨竹庭'], ['valley', '月露幽谷'], ['sanctum', '古磬灵台']]) D.maps[id] = {
    name, sub: '蜀山旧阵 · 器物留痕', objects: [],
    walls: [{ x: 0, y: 0, w: 1280, h: 183 }, { x: 0, y: 690, w: 1280, h: 70 }, { x: 0, y: 0, w: 78, h: 760 }, { x: 1202, y: 0, w: 78, h: 760 }]
  };
  // A material's name or acquisition alone never grants a magical effect.
  const visualProfiles = {
    jade: { awakeAt: 3, strength: 1 }, flask: { awakeAt: 3, strength: 1 },
    bamboo: { awakeAt: 3, strength: 1 }, bracers: { awakeAt: 3, strength: 1 },
    map: { awakeAt: 3, strength: 1 }, inkstone: { awakeAt: 3, strength: 1 },
    bell: { awakeAt: 2, strength: 2 }, mirror: { awakeAt: 2, strength: 2 },
    scroll: { awakeAt: 2, strength: 2 }, censer: { awakeAt: 2, strength: 2 },
    lantern: { awakeAt: 2, strength: 3 }, chime: { awakeAt: 2, strength: 3 }
  };
  function visualFor(id, level = 1) {
    const p = visualProfiles[id];
    if (!p) return { strength: 0, awakened: false, orbit: false };
    return { strength: level === 1 ? 0 : level === 2 ? 1 : p.strength, awakened: level >= p.awakeAt, orbit: level === 3 && p.strength === 3 };
  }
  const camps={rest:{name:'温炉调息',desc:'回复 35 气血、35 灵力；辨药所学再回复 10 气血。'},supply:{name:'理符备药',desc:'选择一份行囊补给，供接下来两段使用。'},insight:{name:'循痕问器',desc:'获得 1 次重观；下一段奖励至少有一件通灵法宝，重观后仍保留。'}};
  const supplies={blade:{ward:1,needle:2},frost:{needle:3},ember:{fire:3},scent:{incense:2,ward:1},ward:{ward:2},herb:{potion:1,tea:1}};
  const trials={none:{name:'稳行',desc:'按原有强度探索。',speed:1,damage:1},swift:{name:'疾行阵',desc:'阵灵移速 +35%；额外 10 灵蕴，三选一至少一件通灵法宝。',speed:1.35,damage:1},fierce:{name:'重锋阵',desc:'阵灵伤害 +35%；额外 10 灵蕴，三选一至少一件通灵法宝。',speed:1,damage:1.35}};
  const resonances={
    frostblade:{name:'霜锋回响',paths:['blade','frost'],desc:'第三剑命中减速目标时额外 +12（寒针或定脉诀均可）；周围 140 范围阵灵减速 2 秒。'},
    emberherb:{name:'借火生息',paths:['ember','herb'],desc:'火符或灼烧击散阵灵，回补 1 张火符、6 灵力；每间最多 2 次。'},
    scentward:{name:'镇香回澜',paths:['scent','ward'],desc:'在香炉 180 范围内成功格挡，回复 6 灵力并护身 1.5 秒；冷却 3 秒。'}
  };
  const startingSupplies=Object.freeze({fire:3,needle:3,incense:3,potion:3,ward:1});
  const data = { startingSupplies, camps, supplies, trials, resonances, relics, paths, boons, affixes, rooms, enemies, notes, visualFor, recipeIds: ['needle', 'incense', 'tea'], tiers: ['初识', '通灵', '宝器'] };
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.XiuxianExpeditionData = data;
})(globalThis);
