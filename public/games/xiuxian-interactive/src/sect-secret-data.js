(function(root){
  'use strict';
  // 独门修习：只有合欢宗在册弟子能学，两脉各修满三层后逐篇开启；只消耗实物与持有贡献门槛，不扣贡献余额。
  const tiers={
    returnOrigin:{
      id:'returnOrigin',name:'归元篇',order:1,requires:{path:'dual',level:3,realm:'jindan',tier:null},
      cost:{water:3,herb:2},contribution:8,
      effect:{heal:6,ward:1},
      desc:'将同息一脉的护持功底再凝炼一层：施展同息诀时回复更多气血，护体时长亦随之延展。',
      result:'云照逐寸核过你的经脉，方传下《归元篇》心法：同息之时不与外气相争，护持自然绵长稳固。'
    },
    pluckTruth:{
      id:'pluckTruth',name:'采真篇',order:2,requires:{path:'siphon',level:3,realm:'jindan',tier:'returnOrigin'},
      cost:{dust:3,paper:2},contribution:12,
      effect:{damage:8,returnCap:2},
      desc:'将摄元一脉的收放分寸练至毫厘不差：敛息摄元诀与掠灵诀威力俱增，单次返灵与回血上限一并拔高。',
      result:'你严格按约定份额练至停功即止，云照验明经脉无损，才将《采真篇》的收放口诀交予你。'
    }
  };
  const order=['returnOrigin','pluckTruth'];
  const data={schema:1,sect:'hehuan',maxContribution:999,place:'行旅药站',tiers,order,
    note:'秘传不另立账：贡献只是门槛，办成时只扣实物；退宗后秘传仍留在自己身上，与功法一样。',
    source:'两脉三层与三门功法来自原作之外的既有实现；「独门修习·秘传两篇」为本版新增，数值只作用于既有功法。'};
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectSecretData=data;
})(globalThis);
