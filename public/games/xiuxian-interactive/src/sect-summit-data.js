(function(root){
  'use strict';
  // 七宗会武（主线赛事）数据：复用既有庭院场地与未具名同道，不是原案「金顶试剑」的替代命名。
  const data={
    schema:1,
    id:'sectSummit',
    title:'七宗会武',
    subtitle:'本门赴会的一届，不是金顶试剑',
    map:'garden',
    place:'药庐庭院',
    reportMap:'hehuan',
    reportPlace:'行旅药站',
    roundCount:3,
    maxMeets:99,
    rounds:[
      {id:'summit-peer-a',name:'七宗同道 · 甲',kind:'stone',x:760,y:400,maxHp:220,damage:18,speed:22},
      {id:'summit-peer-b',name:'七宗同道 · 乙',kind:'sprite',x:820,y:430,maxHp:260,damage:20,speed:26},
      {id:'summit-peer-c',name:'七宗同道 · 丙',kind:'stone',x:880,y:380,maxHp:300,damage:24,speed:24}
    ],
    intro:'会武是七宗之间的公开切磋：三家同门、两场客场，最后一场由主家压阵。对手只称同道，不具名，也不替你决定立场。三轮都收住才记这一届的名次，名次只记门内档案。',
    reportNote:'会武名次只记档案与届数，不赠物资；名次不换贡献、功绩与威望，也不许重复报同一届。',
    rewardNote:'会武本身不发资质：会场、主家与具名人物仍待核定，本层只记本门赴会的这一届。',
    notYet:'原案的金顶试剑与七宗会首需要会场与具名人物核定；本层不改名冒充，只做本门赴七宗会武的一届。',
    notes:{
      start:'会武开场：',
      next:'下一场：',
      win:'三轮都收住了，这一届会武记你一分。名次要回药站向云照报记。',
      loss:'这一届没走完，先回门内补修，再报下一届。',
      reported:'云照把会武名次记进门内档案：只记名次与届数，不换账、不赠物。',
      needGrand:'要先在天下大比里报过名次，才有资格赴七宗会武。'
    },
    source:['src/sect-summit-data.js','src/sect-grand.js#sectGrandQualified','src/sect-world.js#sectWorldNear']
  };
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectSummitData=data;
})(globalThis);
