(function(root){
  'use strict';
  // 门内权责动作：举荐、带队、招录、亲传、治理。逐项与职阶权限绑定，按真实次序开放。
  // 权责是职务行为，不是交易：不支取物资，也不改贡献、功绩、威望三本账，避免以权限刷账。
  // 需要支取材料的差事仍由「门内事务」承担，两处不重复结算。
  const actions={
    recommend:{id:'recommend',name:'举荐同门',permission:'recommend',requires:null,
      desc:'把一名同门的名字与实绩递到门内考核前。举荐只递名，不等于招录。',
      note:'举荐之后仍须门内考核；被举荐者不算入册弟子。'},
    lead:{id:'lead',name:'带队出门',permission:'lead',requires:null,
      desc:'点齐一队同门走一趟差事，路上如何走由你定。',
      note:'带队只记这一趟差事；出行遇战仍在行程里打完，不在此结算。'},
    admit:{id:'admit',name:'招录弟子',permission:'recruit',requires:'recommend',
      desc:'在已举荐的同门里择一人入册，从此由你亲自带。',
      note:'须先有举荐在册；招录不改功绩，只记门内弟子名册。'},
    teach:{id:'teach',name:'亲传传习',permission:'teach',requires:'admit',
      desc:'给入册弟子讲一课，讲什么由你定。',
      note:'须先招录弟子；一课只记一次传习。'},
    govern:{id:'govern',name:'核验门内账目',permission:'govern',requires:'lead',
      desc:'把一段时日的门内收支与差事当众核验，任人复核。',
      note:'须先带队办过差事，才能以长老身份核账；宗主之位不因此产生。'}
  };
  const order=['recommend','lead','admit','teach','govern'];
  const data={schema:1,actions,order,maxSteps:order.length,place:'药庐庭院',
    source:'门内权责动作为本版新增；动作只记档案，不支取物资、不改贡献/功绩/威望三本账。'};
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectOfficeData=data;
})(globalThis);
