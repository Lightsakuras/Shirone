(function(root) {
  'use strict';
  const paths = {
    sword: ['青莲飞剑','剑心玉佩','太虚万剑归宗','剑','#9ae7c6','贯穿飞剑','暴击率 +6%','十二飞剑列阵，七彩剑雨横贯全场'],
    storm: ['引雷符阵','紫霄灵珠','九天雷劫大阵','雷','#c4aeff','连锁天雷','雷伤 +20%','天雷连落，沿敌阵弹射轰击'],
    fire: ['焚天火轮','离火丹心','朱雀焚世火海','火','#ffae77','火轮灼地','火域半径 +20%','朱雀巡空，沿途铺开焚世火海'],
    ice: ['寒霜冰镜','玄冰魄','永冬霜华绝域','冰','#a0edff','穿透霜棱','冻结时长 +40%','极寒封场，解冻时碎冰二次炸裂'],
    bell: ['镇魂金钟','金刚护符','混沌太极护界','镇','#ffdc8c','金钟震波','承伤 −18%','太极盾常驻回充，震退弹幕并吸血'],
    star: ['星辰棋盘','天机玉算','周天星斗杀阵','星','#e5bcff','落子连星','落子伤害 +20%','三子连星成阵，阵内伤害无视护甲'],
    wind: ['赤霄断空扇','御风羽扇坠','九霄罡风龙卷','风','#8ce5cc','旋风聚敌','风域半径 +25%','三道龙卷聚怪，绞碎沿途弹幕'],
    ghost: ['噬灵鬼幡','幽冥残卷','九幽百鬼夜行','魂','#e8a9e2','灵傀追魂','吸血 +3%','百鬼齐出索敌，噬魂必暴并吸血']
  };
  const families = Object.fromEntries(Object.entries(paths).map(([id,[weapon,relic,evolution,glyph,color,attack,passive,ultimate]]) =>
    [id,{id,weapon,relic,evolution,glyph,color,attack,passive,ultimate}]));
  const talents = {
    health:['培元','初始气血 +20',3,8], speed:['踏云','移速 +8%',3,10],
    magnet:['聚灵','吸灵范围 +24',3,8], crit:['剑意','暴击率 +5%',3,12],
    refresh:['问机','每局免费刷新 +1',1,18], revive:['还阳','每局抵挡 1 次致命伤，立回半血',1,45]
  };
  const prerequisites={refresh:"magnet",revive:"health"};
  const treasures = {
    nine_wings:180, emperor_robe:320, ancient_sword:260, ancient_storm:260, ancient_fire:260, ancient_ice:260, ancient_swarm:260, star_crown:220,
    stone:8, essence:12
  };
  const goods = {
    heal:['回春露','立回 35 气血',5], force:['镇魔砂','本局全伤 +10%',12],
    thunderSeal:['雷纹玉简','雷系羁绊 +1',12], swordSeal:['藏锋玉简','剑系羁绊 +1',12]
  };
  const bosses=['锁妖古磐','血煞王屠户·心魔影','噬月妖王','赤渊魔将','九霄劫主'];
  const stages=[
    ['听雨竹海','聚灵青石','bamboo','#83ecc4','驻足 3 秒：回 15 血并吸拢灵珠'],
    ['锁妖古塔','镇妖雷柱','tower-seal','#99baff','触碰或击打：引雷麻痹全场妖邪'],
    ['汉墓幽室','赤炎火坛','tomb','#ff946e','击碎火坛：烈焰焚尽周遭敌群'],
    ['照心坪云海','剑气风眼','golden-summit','#99ddf4','踏入风眼：6 秒内攻速、移速 +60%'],
    ['九霄星渊','天劫星阵','guixu-core','#d1a9ff','踏阵落星：重创全场气血最高之敌']
  ];
  const avatars={
    lin:['林墨','剑心','sword','剑心通明','暴击率 +10%','4 秒剑雨：攻速 +65%，暴击率直达 75%','默认解锁',0,'assets/portraits/lin_mo.webp','“剑出鞘，便没有半途收势的道理。”'],
    shen:['沈灵薇','药庐','fire','青木生生阵','溢疗化盾','立回 35% 气血，张开药阵净毒焚敌','药庐取匣',25,'assets/portraits/shen_ling_wei.webp','“草木有情，可活人，亦可焚邪。”'],
    ning:['凝霜','霜月','ice','霜月照山河','冲刺留冰爆幻影','冰封全场 2.5 秒，立斩 25% 血以下小怪','汉墓救援',40,'assets/portraits/ning_shuang.webp','“三百年寒夜都熬过来了，还怕这几重雷劫？”'],
    yun:['云照','同息','wind','同息灵爆','暴击回血并蓄能','金丝连结 6 敌 5 秒，传导 45% 伤害','结识云照',40,'','“借你半步风，把欠账一并算清。”'],
    xie:['谢观澜','执棋','star','天机落子','百宝铺九折，每波免费换货 1 次','星盘禁足全场，连落 9 道天雷','涉足天机阁或照心坪',55,'assets/sect-art/art-summit-xie-guanlan.webp','“星位已定，且看这一子落在谁头上。”'],
    demon:['魔渊林墨','破界','ghost','魔渊降临','每损 10% 气血全伤 +8%，命中吸血','化血影无敌疾行 2.5 秒，触敌噬血','通关第 15 波',90,'assets/portraits/lin_mo.webp','“天道不给路，我便自己劈开一条。”']
  };
  const origins={rain:'长命锁护体',poor:'共灶温饱',beggar:'市井身法',caravan:'行商算盘',demon:'边地医毒'};
  const sects={hehuan:'同息印 · 治疗 +20%',tianji:'演星印 · 绝学蓄能加快',danding:'丹火印 · 全伤 +10%',baicao:'百草印 · 每波回 8 血',shushan:'剑宗印 · 暴击率 +5%'};
  const resonance={
    melt:['冰火融爆','fire','ice','冰火交击，触发 240% 范围融爆'],
    thunder:['剑雷风暴','storm','sword','飞剑暴击 35% 几率引落连锁天雷'],
    plague:['业火焚魂','ghost','fire','灵傀附带灼烧，亡魂自燃引爆近敌'],
    frost:['霜甲反震','ice','bell','破盾与钟震迸发环形冰刺冻结'],
    domain:['星河剑域','sword','star','星子落处，四向齐射贯穿飞剑'],
    tempest:['狂雷飓风','storm','wind','罡风龙卷持续向外连锁放电']
  };
  const mods={
    split:['分裂灵诀','投射物数量 +1'],thunderStep:['雷步残影','冲刺在原地留下一座爆雷阵'],bloodSoul:['嗜血剑魄','每斩 1 敌回 2 点气血'],
    corpseSeal:['尸爆阴符','斩敌 25% 几率引爆尸身伤敌'],stillFocus:['凌空聚势','站定 1.5 秒后，法器攻速 +45%'],judgment:['天降神罚','每 6 秒雷劈全场气血最高之敌'],
    breakArmy:['破军心法','暴击伤害 +45%'],swift:['迅捷身法','全部法器冷却 −15%'],goldEye:['聚宝金瞳','灵气与劫火获取 +25%'],
    frostHeart:['冰心诀','冻结目标所受伤害 +30%'],fireSeed:['地火莲','火轮命中处加留一朵灼烧火莲'],starChain:['连星诀','星子爆炸半径 +50%'],
    windBlade:['旋刃诀','旋风每卷中一次追斩一道风刃'],echoBell:['回音钟','金钟震荡追加一道 50% 威力余波'],
    soulVessel:['收魂瓶','每斩 10 敌，绝学充能 +12%'],wardRing:['护心环','每 12 秒自动凝成一层护盾']
  };
  const events={spring:['饮魔髓泉','全伤害 +45%','气血上限 −20%','bottle'],sacrifice:['血祭奇珍','随机一件法器直升 2 级','献祭 15 劫火','pouch'],elite:['迎战双煞','下波额外结算仙玉，并赠仙品宝箱','下波增派 2 名强敌精英','head'],rest:['稳妥调息','回满气血，并得 12 劫火','放弃本层险招奇珍','lotus']};
  const enemies={wolf:['疾影狼妖',12,53],cultist:['符箓邪修',17,47],golem:['石甲巨傀',36,28],spider:['毒瘴蛛精',15,52],bomber:['爆炎火灵',10,86],summoner:['召魂祭司',28,38],bladeShadow:['剑阵残影',21,54],goldToad:['夺宝金蟾',40,105]};
  const needXp=lv=>Math.round(24+(lv-1)*14+Math.pow(lv-1,1.38)*3.5);
  const hpScale=wave=>1+(wave-1)*.34+Math.pow(Math.max(0,wave-4),1.45)*.12;
  const waveSeconds=wave=>Math.min(50,35+Math.floor((wave-1)*.7));
  const api={families,talents,prerequisites,treasures,goods,bosses,stages,avatars,origins,sects,resonance,mods,events,enemies,needXp,hpScale,waveSeconds};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianRogueData=api;
})(globalThis);
