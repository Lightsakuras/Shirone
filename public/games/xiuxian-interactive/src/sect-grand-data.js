/* 天下宗门大比：复用既有地图与未具名他门同道，不新增会场，也不改名冒充主线金顶试剑。 */
(function(root){
  'use strict';
  const data={
    schema:1,
    id:'sectGrand',
    title:'天下宗门大比',
    reportMap:'hehuan',
    reportPlace:'行旅药站',
    map:'garden',
    place:'药庐庭院',
    maxMeets:999,
    roundCount:3,
    intro:'须先赴过一届外间赛事并回药站报记，方有资格代表本门出战天下大比。大比借药庐庭院连战三轮，对手皆为各门不具名同道；三轮尽胜方记名次，随后回药站交云照入档。',
    reportNote:'报记只记名次与战绩，不赠物资；名次不换贡献、功绩与威望，也不许重复报同一届。',
    rewardNote:'大比本身不发赏格：奖赏与后续赛事仍等会场与人物核定。',
    notYet:'并入七宗的主线赛事仍需会场与具名人物核定：本轮只用既有庭院借场，对手不具名，不改名冒充金顶试剑。',
    rounds:[
      {id:'grand_first',name:'他门同道 · 剑修',kind:'stone',x:930,y:470,maxHp:180,damage:15,speed:66},
      {id:'grand_second',name:'他门同道 · 术修',kind:'sprite',x:1010,y:440,maxHp:210,damage:17,speed:62},
      {id:'grand_final',name:'他门同道 · 主擂',kind:'stone',x:1070,y:500,maxHp:250,damage:20,speed:60}
    ],
    notes:{
      start:'天下大比开擂：第一轮对',
      next:'这一轮已收，接着下一位 · ',
      win:'三轮都收住了。名次记在门内档案，回药站向云照报记。',
      loss:'这一届没打完。已收的轮次不夺，可以整备再报。',
      reported:'云照把你的名次记进门内档案。'
    },
    source:'会场沿用 src/world-atlas.js 既有地图 garden 借场，报记在 hehuan 药站；对手未具名，资格由 src/sect-event.js 的赴会赛记派生。'
  };
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectGrandData=data;
})(globalThis);
