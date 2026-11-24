/* 门内赴会行装与途中遭遇：只使用既有地图与未具名对手，不新增会场，也不改名冒充七宗试剑。 */
(function(root){
  'use strict';
  const data={
    schema:1,
    id:'sectTrip',
    title:'赴会行装与途中遭遇',
    place:'药庐庭院',
    settlePlace:'行旅药站',
    map:'garden',
    settleMap:'hehuan',
    maxTrips:999,
    intro:'会武得了赴会资格，先在庭院按门内规矩备一份行装；出庐的山道上遇人拦路要自己打完；回药站向云照交差，行程才算记下。',
    kit:{potion:1,paper:2},
    kitNames:{potion:'回气丹',paper:'符纸'},
    kitNote:'行装按门内旧例：回气丹 1、符纸 2。备一次只扣一次，途中未用完也不退回。',
    rewardNote:'赴会与返宗只记行程与交接，不赠物资，也不改贡献、功绩与威望。',
    notYet:'真正的赛事尚未接入：这一程只到途中与返宗交差，会武资格与行程会留在门内档案里。',
    settleNote:'回到药站，走近云照身边交差。',
    foes:[
      {id:'trip_blocker',name:'拦路散修',kind:'stone',x:820,y:520,maxHp:150,damage:13,speed:58},
      {id:'trip_lurker',name:'尾随劫修',kind:'sprite',x:880,y:560,maxHp:110,damage:9,speed:66}
    ],
    source:'赴会与赛事本身仍待核定；本层只用 src/world-atlas.js 既有地图 garden 的出院山道与 hehuan 药站，对手未具名，会武合格由 src/sect-meet.js 记录。'
  };
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectTripData=data;
})(globalThis);
