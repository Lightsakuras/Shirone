(function(root){
  'use strict';
  // 入门前置层的数据：相识 → 公开事务 → 明确确认，三步具备才可入门。
  const data={
    schema:1,
    id:'hehuan-intro',
    sect:'hehuan',
    place:'行旅药站',
    steps:[
      {id:'greet',name:'相识',label:'走近云照，听她讲门规',objectId:'yunStation',person:'yun',
        detail:'云照先将药站记事与合修的规矩摊开讲明：男女同权、成年双方自愿、逐次立约、绝不伤及无辜。'},
      {id:'service',name:'公开事务',label:'在药站办成一件公开事务',objectId:'stationBoard',
        detail:'筹药、护路或商约交割，亲手办妥其一即算；门内只认实绩，不认口头空话。'},
      {id:'confirm',name:'确认',label:'明确同意门规后入门',objectId:null,
        detail:'入宗仅添一层门庭归属，原本身世、师承、专长与既有委托悉数保留；日后亦可自愿退宗。'}
    ],
    rules:[
      '男女同权；成年双方自愿，逐次立约；不伤无辜。',
      '入宗只新增归属，不改原本身世、修习专长、师承与原有任务。',
      '功法与门内档案由自己挣；入门本身不扣材料、不赠贡献。'
    ],
    notes:{
      beforeGreet:'药站里先与云照相识，她讲明门规之后才谈入门。',
      beforeService:'门内还要看到你在药站真正办成一件公开事务。',
      servicePending:'公开事务在药站按实物办理，办成一件即算做过；同一件不会重复记。',
      noService:'公开事务须在行旅药站亲自办理：取料、护路或交割，办成一件即可。'
    },
    source:'合欢宗「结识→门规→公开事务→本人确认」流程来自 SECT-DEVELOPMENT-PLAN 的既定顺序；具体措辞与三步校验为本版实现。'
  };
  if(typeof module==='object'&&module.exports)module.exports=data;
  else root.XiuxianSectIntroData=data;
})(typeof self!=='undefined'?self:this);
