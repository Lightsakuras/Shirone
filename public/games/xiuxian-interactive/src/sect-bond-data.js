(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const people={
    yun:{
      id:'yun',name:'云照',age:26,gender:'female',role:'药站主持',objectId:'yunStation',
      note:'她只凭医案与当日实录说话；谈得投契不等于情意许诺，亦不改动两脉逐次立约的规矩。',
      topics:[
        {id:'yun-pulse',label:'问两脉的经脉损耗',text:'云照摊开脉案：“合修与摄元走的是同一条经络，损耗自然记在同一本账上，哪一脉也没便宜可占。”'},
        {id:'yun-record',label:'请教医案怎么记',text:'她提笔点了点案册：“当日抓药、复诊、经手何人，当场一笔写清。隔日不改旧字，也绝不替人补账。”'},
        {id:'yun-station',label:'问药站为何留在山道',text:'她望向山道：“赶路带伤的人撑不到山顶，药站便只能设在半道。我自身进境慢些无妨，账却半笔不能糊涂。”'}
      ],
      // 相处更深才谈的一段：只用真实做过的事做条件，不新增好感数值。
      deep:{
        id:'yun-ledger',label:'问损耗账为何也记我在门内做的事',
        requires:{talks:2,all:['intro'],any:['duties','secret']},
        template:'云照将损耗账翻过一页：“你入门听过的门规、在门内办妥的 {duties} 桩差事、修成的 {tiers} 篇秘传，走的都是你这一身经脉。这本账只记实事，不记谁与谁投缘。”'
      }
    },
    qinlu:{
      id:'qinlu',name:'秦鹭',age:31,gender:'female',role:'护送修士',objectId:'stationEscort',
      note:'她只认真实伤亡与如实登记；场上胜负在她眼里换不来半点人情通融。',
      topics:[
        {id:'qinlu-loss',label:'问护送队的伤亡怎么算',text:'秦鹭按着路册道：“折了几人、伤了几人，照活着回来的点算；没回来的逐一写清姓名，绝不用『若干』糊弄。”'},
        {id:'qinlu-backlash',label:'问她为何坚持登记反噬',text:'她声音发沉：“今日瞒下反噬，明日就有后辈当这招不疼，拿性命去填。”'},
        {id:'qinlu-road',label:'问山道上常见什么',text:'她冷声道：“拦路抢药的多是役傀与散修；真正扎手的，是那些摸清了药车走哪条山道的内外熟人。”'}
      ],
      deep:{
        id:'qinlu-names',label:'问她如何把没回来的人也记住',
        requires:{talks:2,all:['intro'],any:['trip','event']},
        template:'秦鹭翻开路册：“你已随队走过 {returned} 趟赴会、在赛场打过 {wins} 阵，归来之人的姓名我都按实录下。我只问一句——你出招时，心里可还记着同行人的名字？”'
      }
    },
    luqinghe:{
      id:'luqinghe',name:'陆青禾',age:29,gender:'female',role:'独立药商',objectId:'stationMerchant',
      note:'她是往来此处的独立行商；旧欠与交割一概照账说话，不凭交情抹零。',
      goneNote:'她既受封签威压交割，便已断了此处供货，不再与人叙话。',
      topics:[
        {id:'luqinghe-price',label:'问别处药价为何不同',text:'陆青禾拨了拨算盘：“远路贵在脚力，近处贵在压货。我只按脚程与折耗开价，不看人情厚薄。”'},
        {id:'luqinghe-debt',label:'问旧欠怎么清',text:'她摇头道：“旧欠须在原账上逐笔勾销，既不能拿新货顶旧账，也不收旁人代还。”'},
        {id:'luqinghe-team',label:'问她的商队如何维持',text:'她拍了拍货箱：“商队能走长远，全靠每趟都留足回程盘缠；连回程那份都贪图卖尽，下一趟便休想出山。”'}
      ],
      deep:{
        id:'luqinghe-records',label:'问她走之前会把旧账交给谁',
        requires:{talks:2,all:['intro'],any:['office','prestige']},
        template:'陆青禾收起账册：“我若真撤了这趟线，旧账也会交予接手之人逐笔结清。门内若有 {office} 桩权责落了实账，我只认账面，不认口头空话——丑话说在前头，交情归交情，账期无宽限。”'
      }
    }
  };
  const order=['yun','qinlu','luqinghe'];
  const D={
    schema:1,
    id:'sectBond',
    title:'门内往来',
    place:'行旅药站',
    map:'hehuan',
    maxTopics:3,
    people,
    order,
    labels:['初识','相识','相熟','相知'],
    deepNote:'深一层往来只看实办的差事与交谈次数：不设好感数值，亦不会由此结为道侣或触发恋爱支线。',
    signalLabels:{
      intro:'入门时与云照相识',
      service:'在药站办成过公开事务',
      duties:'在门内办成过事务',
      secret:'修成过宗门秘传',
      trip:'赴会并回药站交过差',
      event:'赴会赛事已报记',
      office:'门内权责已办在账上',
      prestige:'门内已有组织威望'
    },
    partnerNote:'交情只记相处与实绩：走得近不会自动结为道侣，亦不开启恋爱事件；即便从不寒暄，也毫不折损收益与晋升。',
    accountsNote:'平日往来不耗物资，亦不改动贡献、功绩与威望；办差与比试也不会凭空拔高交情。',
    excludedNote:'柳如烟、阿辰、凝霜等既有剧情人物不入此列；本段不增设伴侣，亦不改动柳如烟的宗主交接。',
    source:'src/sect-world-data.js#people（既有药站人物）'
  };
  if(node)module.exports=D;else root.XiuxianSectBondData=D;
})(typeof window!=='undefined'?window:globalThis);
