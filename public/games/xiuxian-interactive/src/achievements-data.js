(function(root){
  'use strict';
  // Each earned medal also unlocks its name as a commemorative title.
  const rows=[
    ['firstCommission','初入山门','办妥「药庐取匣」委托'],['foundation','道基初成','首度筑基功成'],['ending','山行有终','亲历任一终局收束'],
    ['combo25','初露锋芒','单场实战打出 25 连击'],['combo100','剑动九霄','单场实战打出 100 连击'],
    ['dodge5','极限身法','累计触发 5 次极限闪避'],['mist','雾散青阳','首斩悬赏大妖「青阳雾魅」'],['untouched','雾不沾衣','无伤讨伐「青阳雾魅」'],
    ['bamboo','翠竹留痕','首斩悬赏大妖「翠竹剑傀」'],['relic','鉴得地宝','拾得地品或更高阶装备'],['legend','器魂初鸣','获一件附传奇器魂的装备'],
    ['furnace','炉火大成','熔炉触发炉火大成并跳升一阶'],['imprint','灵纹初成','成功铭刻 1 枚灵纹珠'],['soul','本命开锋','青霜本命剑晋至二阶'],
    ['archive','藏器三珍','藏器入鉴满 3 种底材'],['five','初镇天渊','通关万象天渊第 5 层'],['heat','五重契约镇渊','5 热度满契约下击败天渊首领'],
    ['demon','斩魔问心','击败终极首领「太虚心魔」'],['duet','双超武合鸣','九霄同局炼成 2 种超武'],['wave15','九霄破劫','通关九霄无尽劫第 15 波']
  ];
  const data=Object.fromEntries(rows.map(([id,title,condition])=>[id,{id,title,condition}]));
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianAchievementData=data;
})(globalThis);
