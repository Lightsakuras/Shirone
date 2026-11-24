(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.XiuxianSectManageData=factory();
})(typeof self!=='undefined'?self:this,function(){
  'use strict';
  // 招录与经营：地位解锁的职务动作。只记门内名册与经营档案，
  // 不改贡献/累计功绩/组织威望三本账，也不生成新货币。
  const actions={
    enroll:{
      id:'enroll',order:1,permission:'recruit',requires:null,cost:{paper:1},
      name:'招录弟子',
      detail:'把一名已举荐并按规考核过的同门记入门内名册，只记人数，不具名。',
      result:'名册上多了一名弟子。'
    },
    assign:{
      id:'assign',order:2,permission:'lead',requires:'enroll',cost:null,
      name:'派遣当值',
      detail:'把在册弟子派到药站轮值或随队护路，记一次排班。',
      result:'名册上记下一次排班。'
    },
    audit:{
      id:'audit',order:3,permission:'govern',requires:'assign',cost:null,
      name:'核验账目',
      detail:'核对贡献账目与物资出纳，把核对结果记入经营档案。',
      result:'经营档案上记下一次核对。'
    },
    relieve:{
      id:'relieve',order:4,permission:'govern',requires:'audit',cost:null,
      name:'交卸差事',
      detail:'免去一名在册弟子的差事，把差事交回名册，人数与排班各记一次。',
      result:'名册上记下一次交卸。'
    }
  };
  return {
    schema:1,
    id:'hehuan-manage',
    sect:'hehuan',
    place:'行旅药站',
    actions:actions,
    order:['enroll','assign','audit','relieve'],
    note:'招录只记名册人数，不生成具名弟子；经营只记核对与排班，不改三本账、不发新货币。',
    source:'src/sect-manage-data.js#actions'
  };
});
