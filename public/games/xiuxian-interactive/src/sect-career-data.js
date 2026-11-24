(function(root){
  'use strict';
  // 门内成长数据：职阶、逐项权限与门内事务。只引用既有物资；不新增具名人物。
  // 宗主/继任与柳如烟交接仍属待定方向，本层最高只到长老，不自动产生宗主。
  const duties={
    'station-care':{id:'station-care',name:'药站值守',desc:'在药庐与前山道间照拂伤患，如实登记当日领药与复诊。',cost:{herb:1},merit:4,prestige:2,realm:'zhuji'},
    'copy-records':{id:'copy-records',name:'抄录门内旧账',desc:'核校旧账与药站出入，将散落各处的契约誊录归档。',cost:{paper:1},merit:6,prestige:3,realm:'zhuji'},
    'guard-herbs':{id:'guard-herbs',name:'护持采药队',desc:'随采药队进山走一遭，护全药篓与同行人手。',cost:{water:2},merit:8,prestige:4,realm:'zhuji'},
    'procure':{id:'procure',name:'采买行旅药材',desc:'按药站急缺议价采办药材，收支当日入册。',cost:{dust:2},merit:10,prestige:5,realm:'zhuji'},
    'arbitrate':{id:'arbitrate',name:'裁断门内争端',desc:'听完两造陈词，依门规写明裁断与赔偿。',cost:{paper:2},merit:12,prestige:6,realm:'jindan'},
    'public-ledger':{id:'public-ledger',name:'公开药站账目',desc:'将一季收支与药材配额当众宣读，任由同门复核。',cost:{herb:3,dust:3},merit:14,prestige:8,realm:'jindan'}
  };
  const order=['disciple','envoy','steward','instructor','elder'];
  const offices={
    disciple:{id:'disciple',name:'记名弟子',order:1,realm:'zhuji',merit:0,prestige:0,
      permissions:{recommend:false,lead:false,recruit:false,teach:false,govern:false},
      note:'入门仅记名册归属，不因此直接取得招录或治事之权。'},
    envoy:{id:'envoy',name:'行走执事',order:2,realm:'zhuji',merit:10,prestige:8,
      permissions:{recommend:true,lead:false,recruit:false,teach:false,govern:false},
      note:'可具名举荐同门，但举荐仅作递名，入册仍须过门内考核。'},
    steward:{id:'steward',name:'掌事',order:3,realm:'zhuji',merit:26,prestige:16,
      permissions:{recommend:true,lead:true,recruit:false,teach:false,govern:false},
      note:'可领一队同门出山办差；招录与亲传仍未开放。'},
    instructor:{id:'instructor',name:'亲传教习',order:4,realm:'jindan',merit:40,prestige:20,
      permissions:{recommend:true,lead:true,recruit:true,teach:true,govern:false},
      note:'可招录弟子并亲授课业；门内治事与核账仍归长老执掌。'},
    elder:{id:'elder',name:'长老',order:5,realm:'jindan',merit:54,prestige:28,
      permissions:{recommend:true,lead:true,recruit:true,teach:true,govern:true},
      note:'可执掌门内公事并核验账目；宗主继任不在此层自动触发。'}
  };
  const realmTitles={zhuji:'筑基',jindan:'金丹',yuanying:'元婴',huashen:'化神',heti:'合体',dacheng:'大乘'};
  const data={offices,duties,order,realmTitles,
    accounts:{contribution:'可支用的宗门贡献，仅由实际捐助与修习结算所得。',merit:'累计功绩，系门内办差的实绩记录，只增不扣。',prestige:'组织威望，代表同门对你办事分寸的信重；与江湖清誉、威名互不折算。'},
    maxValue:999,
    source:'门内职阶、逐项权限与门内事务为本版新增；柳如烟交接与宗主继任仍待定，本层不实现。'};
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectCareerData=data;
})(globalThis);
