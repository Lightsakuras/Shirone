/*
 * 天下七宗与具名赛事人物（DSH 新增设定数据）。
 * 人物画像、会场与剧情特写使用随包静态图。
 * 备案清单见 项目接力/DSH接续/新设定/06-美术留空备案.json 与 docs 说明。
 * 这里只放叙事与出场表，不含任何数值 buff。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.XiuxianSectFactionsData = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const factions = {
    shushan: { id: 'shushan', name: '蜀山剑宗', path: '剑修正统', motto: '剑先立心，再论胜负', color: '#3f5c74', emblem: null },
    hehuan: { id: 'hehuan', name: '合欢宗', path: '合修与摄元两脉', motto: '同行有约，行事自择', color: '#5c4a3f', emblem: null },
    tianji: { id: 'tianji', name: '天机阁', path: '推演、机关、棋局', motto: '先算后动，落子无悔', color: '#42465c', emblem: null },
    danding: { id: 'danding', name: '丹鼎门', path: '丹火与炉鼎', motto: '一炉一气，火候即人心', color: '#6b4630', emblem: null },
    baicao: { id: 'baicao', name: '百草谷', path: '药草、毒理、治病', motto: '认得草，也认得人', color: '#3f5b40', emblem: null },
    fahua: { id: 'fahua', name: '法华宗', path: '音律与律条', motto: '音落处，心不可欺', color: '#6a5540', emblem: null },
    moyu: { id: 'moyu', name: '魔域十二部', path: '散部结盟', motto: '盟约写在骨头上', color: '#4a3a44', emblem: null }
  };

  const people = {
    'cui-minghe': {
      id: 'cui-minghe', faction: 'shushan', name: '崔明河', role: '本届主家 · 蜀山执事长老',
      gender: 'male', age: 57,
      look: '身形瘦削挺拔，左腕常年拢在袖底，腰悬一枚磨得发白的旧剑穗。',
      temper: '视规矩如吐纳；铁面无私，唯独对「按规矩认输」的后辈格外以礼相待。',
      line: '先立规矩，再论胜负。',
      foreshadow: '左手终年不出袖口：二十年前青阳旧案里，那只手曾替同门硬生生挡下一剑。',
      artId: 'art-summit-cui-minghe'
    },
    'pei-zhao': {
      id: 'pei-zhao', faction: 'shushan', name: '裴照', role: '试锋堂首座弟子',
      gender: 'male', age: 28,
      look: '玄青窄袖束腕，剑鞘素净无饰，左耳后留着一道浅白旧疤。',
      temper: '平日惜字如金；无论胜败皆只抱拳道一句「受教」，半点不占规矩之外的便宜。',
      line: '先让三招并非客套，是为了看清你的剑路从何处起。',
      foreshadow: '贴身总揣着一叠写往「青阳」的书信，却一封也未曾寄出。',
      artId: 'art-summit-pei-zhao'
    },
    'xie-guanlan': {
      id: 'xie-guanlan', faction: 'tianji', name: '谢观澜', role: '推演局执棋人',
      gender: 'female', age: 31,
      look: '一袭素白长衫，袖缘暗绣星图，右手指间常年捻着一枚黑玉棋子。',
      temper: '寡言少语，说话总留下半句；从不给人打包票，只报推演出的成算。',
      line: '我算准了你会出这一招，却没算透你为何偏要在此刻出它。',
      foreshadow: '她曾起局推演过你的命数，盘上只落三字：「不可测」。',
      artId: 'art-summit-xie-guanlan'
    },
    'su-jiulian': {
      id: 'su-jiulian', faction: 'danding', name: '苏九炼', role: '炉火长老',
      gender: 'male', age: 45,
      look: '粗灰短袍，十指指节满是旧年火疤，身后常背一只矮脚铜炉。',
      temper: '性子急直、极护自家晚辈；最瞧不上只会死背丹方不看炉火的人。',
      line: '纸上的丹方谁不会背？炉底下的火候才骗不了人！',
      foreshadow: '贴身收着一页被水浸过的旧丹方，末尾落款「凝霜」；仅作故人遗物，不涉复生，亦不许旁人代笔。',
      artId: 'art-summit-su-jiulian'
    },
    'ye-zhiqiu': {
      id: 'ye-zhiqiu', faction: 'baicao', name: '叶知秋', role: '采药人',
      gender: 'female', age: 26,
      look: '土褐短打利落束腰，肩背竹篓，篓沿编着一圈晒干的野花。',
      temper: '说话直来直去，嘴上不饶人、心底却软，过目草木与旧事皆不忘。',
      line: '你腰里揣着的药，只管救你自己，还是连场上的对手也一并救？',
      foreshadow: '她一眼便认得出杏花村阿杏药篓上的编织纹样。',
      artId: 'art-summit-ye-zhiqiu'
    },
    'shi-wuxiang': {
      id: 'shi-wuxiang', faction: 'fahua', name: '释无相', role: '唱诵僧',
      gender: 'male', age: 38,
      look: '一袭赭黄僧衣，足踏薄底麻鞋，掌中常捻一串不发声的旧木珠。',
      temper: '气定神闲，从不与人争辩口舌；惯拿你方才说出口的话轻轻回敬。',
      line: '你耳畔听见的并非贫僧诵音，而是你自己乱了分寸的呼吸。',
      foreshadow: '他识得一段早已封禁的镇魂古调，与凝霜旧事及后山古阵隐隐相连，眼下暂未深言。',
      artId: 'art-summit-shi-wuxiang'
    },
    'wugu': {
      id: 'wugu', faction: 'moyu', name: '乌骨', role: '盟约执笔人',
      gender: 'female', age: 33,
      look: '身披黑褐皮甲，左腕密缠刻字骨片，开口前习惯用拇指摩挲骨片锋棱。',
      temper: '守信近乎冷酷；从不论正邪善恶，只认落在骨片与契纸上的白纸黑字。',
      line: '写进契里的，一字不赖；没写上去的，死了也休怪旁人。',
      foreshadow: '她一直在追查「归元」二字的古卷来历——与合欢宗秘传同名，恰是一桩宿命巧合。',
      artId: 'art-summit-wugu'
    }
  };

  // 三场次出场表：主对手 + 替补（同一届里每人只出场一次）。
  const rounds = [
    { round: 1, title: '初场 · 让步', main: 'pei-zhao', backup: 'ye-zhiqiu' },
    { round: 2, title: '次场 · 对招', main: 'xie-guanlan', backup: 'su-jiulian' },
    { round: 3, title: '末场 · 压阵', main: 'shi-wuxiang', backup: 'wugu' }
  ];

  const grounds = {
    id: 'zhaoxinting',
    name: '照心坪',
    hostFaction: 'shushan',
    hostPerson: 'cui-minghe',
    note: '蜀山外山石坪，历来借予七宗会武轮值主家开擂；四周无墙无席，唯有一圈被历代剑客踏平的青石，石碑上依次刻着各届主家名号，最末一行尚空，留待本届补刻。',
    art: 'assets/sect-art/art-summit-grounds.webp',
    artId: 'art-summit-grounds'
  };

  const notes = {
    noBuff: '赛事人物不提供任何数值加成，也不是可攻略对象。'
  };

  const artIds = [
    'art-summit-grounds', 'art-summit-emblem-zhao', 'art-summit-cui-minghe', 'art-summit-pei-zhao',
    'art-summit-xie-guanlan', 'art-summit-su-jiulian', 'art-summit-ye-zhiqiu', 'art-summit-shi-wuxiang',
    'art-summit-wugu', 'art-prop-summit-stele', 'art-prop-cui-sleeve', 'art-prop-pei-letters',
    'art-prop-su-old-recipe', 'art-prop-ye-basket', 'art-prop-wugu-boneslates'
  ];

  for (const person of Object.values(people)) person.art = 'assets/sect-art/' + person.artId + '.webp';
  return { schema: 1, factions, people, rounds, grounds, notes, artIds, artPending: [], source: 'src/sect-factions-data.js' };
});
