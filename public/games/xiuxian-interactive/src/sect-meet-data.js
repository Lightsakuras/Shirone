(function(root){
  'use strict';
  const data={
    id:'sectMeet',
    schema:1,
    title:'门内会武 · 大比选拔',
    map:'garden',
    place:'药庐庭院',
    maxAttempts:999,
    roundCount:3,
    intro:'门内先行三轮同门会武，点到即止，由此选定代表本门出战外间大比之人。三轮全过方记赴会资格；中途受挫可整备再战，已过轮次与既有记录不夺。',
    rewardNote:'会武只记门内档案，不赠物资，也不改宗门贡献与清誉威名。',
    // 对手全是门内收力的同门，未具名；会场与赛事人物仍待核定，本轮只做门内选拔。
    rounds:[
      {index:1,label:'第一轮 · 试招',foe:{id:'meet_first',name:'试招同门',kind:'stone',x:930,y:470,maxHp:96,speed:52,damage:6}},
      {index:2,label:'第二轮 · 较技',foe:{id:'meet_second',name:'较技同门',kind:'sprite',x:1000,y:430,maxHp:120,speed:58,damage:8}},
      {index:3,label:'第三轮 · 主试',foe:{id:'meet_third',name:'主试同门',kind:'stone',x:1060,y:500,maxHp:150,speed:64,damage:10}}
    ],
    qualifiedLabel:'赴会资格',
    source:'门内会武只做本门选拔：赴会、外间赛事与返宗仍需会场来源与赛事人物核定，未在本轮实现。'
  };
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectMeetData=data;
})(globalThis);
