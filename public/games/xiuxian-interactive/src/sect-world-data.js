(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const D=node?require('./data.js'):root.XiuxianData;
  const object=(id,name,x,y,role,extra={})=>({id,name,x,y,kind:'sectWorldObject',role,height:60,...extra});
  const objects={
    hehuanReturn:object('hehuanReturn','回蜀山药庐',640,695,'portal',{height:0}),
    stationBoard:object('stationBoard','药站公示簿',430,575,'board',{atlas:'chapterProps',cell:12,height:54,panel:'hub'}),
    yunStation:object('yunStation','云照 · 药站主持',300,285,'npc',{person:'yun',artKey:'hehuanYun',height:112,panel:'station'}),
    stationBench:object('stationBench','配伍药案',450,285,'bench',{atlas:'chapterProps',cell:11,height:65,panel:'station'}),
    stationHerb:object('stationHerb','待采青灵草',195,390,'pickup',{item:'herb',atlas:'chapterProps',cell:10,height:48,panel:'station'}),
    stationWater:object('stationWater','清泉陶缸',215,525,'pickup',{item:'water',atlas:'chapterProps',cell:9,height:45,panel:'station'}),
    stationPaper:object('stationPaper','干燥药纸',1040,570,'pickup',{item:'paper',atlas:'chapterProps',cell:0,height:38,panel:'station'}),
    stationMerchant:object('stationMerchant','陆青禾 · 行旅药商',800,255,'npc',{person:'luqinghe',artKey:'hehuanLuqinghe',height:108,panel:'contract'}),
    stationContract:object('stationContract','运药账册',740,575,'ledger',{atlas:'chapterProps',cell:12,height:45,panel:'contract'}),
    stationEscort:object('stationEscort','秦鹭 · 护送修士',1020,270,'npc',{person:'qinlu',artKey:'hehuanQinlu',height:112,panel:'escort'}),
    stationBell:object('stationBell','护路铜铃',850,380,'bell',{atlas:'sectProps',cell:0,height:68,panel:'escort'}),
    stationCargo:object('stationCargo','追回的药车',900,565,'cargo',{atlas:'sectProps',cell:1,height:76,panel:'escort'}),
    stationSeal:object('stationSeal','药站规约',620,245,'notice',{atlas:'chapterProps',cell:13,height:48,panel:'rules'})
  };
  const map={
    name:'合欢宗 · 行旅药站',sub:'药案有方，行事有据',artKey:'hehuan',
    walls:[
      {x:0,y:0,w:1280,h:195},
      {x:0,y:195,w:145,h:360},{x:1140,y:195,w:140,h:360},
      {x:0,y:555,w:170,h:70},{x:1110,y:555,w:170,h:70},
      {x:0,y:625,w:410,h:135},{x:870,y:625,w:410,h:135},
      {x:0,y:735,w:1280,h:25},
      {x:145,y:195,w:325,h:42},{x:930,y:195,w:210,h:32}
    ],
    objects:Object.values(objects)
  };
  const people={
    yun:{id:'yun',name:'云照',age:26,gender:'female',role:'药站主持',goal:'整理两脉经脉损耗，主持可供行旅求药的药站。',boundary:'她决定医案是否可作日常依据；宗门修习逐次自愿，不随任务改变感情或道侣。'},
    qinlu:{id:'qinlu',name:'秦鹭',age:31,gender:'female',role:'护送修士',goal:'保住护送队与药车，减少下次行路的伤亡。',boundary:'接受迎敌，也要求如实登记反噬，不为胜者掩盖损耗。'},
    luqinghe:{id:'luqinghe',name:'陆青禾',age:29,gender:'female',role:'独立药商',goal:'依约收回耗材，维持自己的运药商队。',boundary:'认下扣货违约，但不接受被抹去旧欠；受威压交割后会结束这处供货。'}
  };
  const pickups={
    herb:{id:'herb',objectId:'stationHerb',actionId:'gather-herb',reward:{herb:2},empty:'药圃已经剪过，这一批不再采收。'},
    water:{id:'water',objectId:'stationWater',actionId:'gather-water',reward:{water:1},empty:'这只备药提桶已取走，缺水可回药庐补足。'},
    paper:{id:'paper',objectId:'stationPaper',actionId:'gather-paper',reward:{paper:1},empty:'药纸已取走，纸架只留着这一批的封条。'}
  };
  const encounter={
    id:'stationEscort',map:'hehuan',startObject:'stationBell',claimObject:'stationCargo',
    title:'守住药车',intro:'失控的夺药役傀已追至庭院东侧。秦鹭先行护住运药伙计，请你出手拦截；走近敲响护路铜铃即可开战，交战中按 V 可暂停选敌。',
    area:{x:830,y:325,w:290,h:210},
    enemies:[
      {id:'station_guard',name:'夺药石傀',kind:'stone',x:1050,y:365,maxHp:155,speed:48,damage:16},
      {id:'station_wisp',name:'引路役灵',kind:'sprite',x:1065,y:490,maxHp:90,speed:72,damage:10}
    ],
    reward:{dust:3,potion:1},bonus:{guard:{},covenant:{paper:2},ravage:{dust:2}},
    resultPriority:['ravage','covenant','guard'],
    results:{
      guard:{id:'guard',name:'常规护送',condition:'清敌，未有效使用两种摄元诀。',reward:{},text:'药车分毫未损地追回。秦鹭将这趟稳妥护送记入路册——即便不入合欢宗，客修照样能护住这一程平安。'},
      covenant:{id:'covenant',name:'克制截流',condition:'本场有效敛息摄元至少一次，且无有效掠灵。',reward:{paper:2},text:'云照收下可供复核的截流样本，另取两份药纸相赠。此战按实际伤敌返还灵力，既有施法评价不重复计奖。'},
      ravage:{id:'ravage',name:'冒险掠灵',condition:'本场有效掠灵至少一次；两诀都用过时按此结果。',reward:{dust:2},text:'药车虽已追回，并额外截下两份灵砂，但经脉反噬亦如实入册；云照明确拒绝将掠灵列为药站日常方子。'}
    },
    failure:'撤退或失利后回药庐，已耗符药与实际功法评价保留；这场可以重试，未领奖不算取得任务战利品。',
    safety:'只针对仍在场的敌方役傀；云照、秦鹭、陆青禾及运药人不是战斗目标。'
  };
  const quests={
    station:{
      id:'station',name:'先把药站开起来',person:'yun',objectId:'yunStation',requires:[],
      summary:'沿庭院取草、取水和药纸，在药案按先后配伍，再交云照验药。',
      steps:['从三处物件领取这一批备料','药案依次放青灵草、山泉水、符纸','整份扣料配好，再向云照领取成药'],
      recipe:{order:['herb','water','paper'],cost:{herb:2,water:1,paper:1},objectId:'stationBench'},
      reward:{potion:2},reputation:{honor:1,fame:0},
      claimObject:'yunStation',actionIds:['accept-station','gather-herb','gather-water','gather-paper','mix-herb','mix-water','mix-paper','claim-station'],
      result:'云照逐一验过成药，行旅药站自此正式开张。她留了两包回气丹供你路上应急，首份配伍医案则端正摆在药案一侧。',
      warning:'药草、水和纸属于普通库存，可用于别处；不足时可回药庐补足。前两步不扣料，正确完成第三步才扣整份。'
    },
    escort:{
      id:'escort',name:'截流，还是掠灵',person:'qinlu',objectId:'stationEscort',requires:['station'],
      summary:'听秦鹭说明敌情，在右侧护路铜铃主动开战，清敌后亲手回收药车。',
      steps:['听取敌情与反噬规则','敲铜铃开始两敌战斗','清敌后到药车回收一次战利品'],
      reward:encounter.reward,results:encounter.results,reputation:{honor:0,fame:0},
      claimObject:'stationCargo',actionIds:['accept-escort','start-escort','claim-escort'],
      warning:'结果按本场实际有效功法记录确定。没学采补也能完成常规护送；无即时掉落，不能靠撤退重复取材。'
    },
    contract:{
      id:'contract',name:'一纸商约，两种名声',person:'luqinghe',objectId:'stationMerchant',requires:['station','escort'],
      summary:'查阅双方欠项，再决定按旧约补齐，或持宗门封签强制交割。',
      steps:['在运药账册查明双方欠项','听药商说明并看清成本与后果','亲自选择交割；暂缓不锁定分支'],
      ledger:'陆青禾扣下了已收订金的药纸，确实误了交期；但药站前任经手人也仍欠她灵砂两份、符纸一份。两造违约皆白纸黑字记在原账上，不能只挑对自家有利的一半说事。',
      branches:{
        honor:{id:'honor',name:'按旧约补齐',cost:{dust:2,paper:1},reward:{ward:2,herb:2},reputation:{honor:2,fame:0},after:'陆青禾留下供货，并开放一次回程补给。'},
        pressure:{id:'pressure',name:'持封签强制交割',cost:{},reward:{dust:3,paper:2},reputation:{honor:-2,fame:2},after:'药商交割后离开，停止此药站供货；不开放回程补给。'}
      },
      supply:{name:'回程补给',cost:{herb:1,water:1},reward:{potion:1},once:true,requiresBranch:'honor'},
      claimObject:'stationMerchant',actionIds:['read-contract','settle-honor','settle-pressure','take-supply'],
      warning:'这是商约与行事选择，不会改变主线资格、修习资格、牵挂或道侣。关闭面板即暂缓，未结算不扣料、不记名声。'
    }
  };
  const action=(id,label,quest,objectId,kind,extra={})=>({id,label,detail:label,quest,objectId,kind,...extra});
  const actions={
    'accept-station':action('accept-station','接下药案筹备','station','yunStation','accept'),
    'gather-herb':action('gather-herb','采青灵草 ×2','station','stationHerb','gather',{pickup:'herb',reward:{herb:2}}),
    'gather-water':action('gather-water','取山泉水 ×1','station','stationWater','gather',{pickup:'water',reward:{water:1}}),
    'gather-paper':action('gather-paper','取符纸 ×1','station','stationPaper','gather',{pickup:'paper',reward:{paper:1}}),
    'mix-herb':action('mix-herb','放青灵草','station','stationBench','mix',{ingredient:'herb'}),
    'mix-water':action('mix-water','加山泉水','station','stationBench','mix',{ingredient:'water'}),
    'mix-paper':action('mix-paper','以符纸包药','station','stationBench','mix',{ingredient:'paper',cost:quests.station.recipe.cost}),
    'claim-station':action('claim-station','请云照验药并领取成药','station','yunStation','claim',{reward:quests.station.reward,reputation:quests.station.reputation}),
    'accept-escort':action('accept-escort','听秦鹭交代护送','escort','stationEscort','accept'),
    'start-escort':action('start-escort','敲铜铃，迎击役傀','escort','stationBell','battle'),
    'claim-escort':action('claim-escort','回收药车与战利品','escort','stationCargo','claim',{reward:encounter.reward}),
    'read-contract':action('read-contract','查阅双方欠项','contract','stationContract','read'),
    'settle-honor':action('settle-honor','按旧约补齐并交割','contract','stationMerchant','settle',{branch:'honor',...quests.contract.branches.honor,id:'settle-honor'}),
    'settle-pressure':action('settle-pressure','持封签强制交割','contract','stationMerchant','settle',{branch:'pressure',...quests.contract.branches.pressure,id:'settle-pressure'}),
    'take-supply':action('take-supply','换取一次回程补给','contract','stationMerchant','supply',{cost:quests.contract.supply.cost,reward:quests.contract.supply.reward})
  };
  const dialogues={
    welcome:'行旅药站向所有成年筑基的修士敞开。客修亦可在此协理筹药、护车与核账；至于入不入合欢宗，全凭你自决。',
    rules:'宗主柳如烟印鉴之下写明：药站虽可计利，绝不准拿伤患抵账；合修与摄元两脉并存，纯以实绩定评。凡合修须成年双方逐次自愿，绝不捆绑情爱或道侣婚契。',
    station:{
      offer:'云照：“我设这座药站，只为先顾住那些撑不到山顶的行人。药案若还没支起来，门规写得再体面也治不了伤。”',
      recipe:'云照：“先辨清草叶，再以泉水润透，最后用干纸封妥。收起多余的灵光——别遮了叶脉，药性得用肉眼看准。”',
      wrong:'药案上的纸条写着先草、再水、后纸。这次重新摆放即可，材料尚未扣除。',
      prepared:'药已配妥，整份材料已用；把成药交云照验过再带走。',
      complete:'云照：“这两包丹药留给你路上防身。今日这份医案我会并署你我姓名，连配伍取舍也一并写清，后来的药师才接得上手。”',
      review:'医案旁已添上云照的下一步打算：登记沿途伤患的经脉折耗，补齐药站最常用的三张成方。无论你留不留山，她手头的活计从未停下。'
    },
    escort:{
      offer:'秦鹭：“我既要把药车带回来，也要把活生生的同伴带回来。你想硬撼敌阵我不拦，但反噬折耗必须一笔笔写进账里，绝不能让下一队人揣着假医案上路。”',
      prepare:'右侧先迎慢而重的石傀，还是先制住役灵，由你决定。V 可暂停察看目标与符药；两种摄元诀按你实际出手记录。',
      guard:'秦鹭：“药车齐整，人也一个不少。路册上不必写什么惊险功劳，平平安安到站便是最好的一趟。”',
      covenant:'云照：“你截下的只是役傀已然外泄的灵流，收手恰在分寸之内。这份样本我收下了，足供后来的同门复核参详。”',
      ravage:'云照：“仗是打赢了，可你经脉受的反噬也半点不假。这份折耗记录我照收归档，但药站的常备方子绝不会改成强夺硬取。”',
      failure:'秦鹭先将药车推回安全处。养好伤再来，先前筹好的药与已经学会的本事都还在。'
    },
    contract:{
      offer:'陆青禾：“你们药站救人急，我手底下跑山路的伙计也要吃饭。扣下药纸是我违了交期，这笔我认；可你们若想借机抹掉前任欠我的旧账，下一趟便没人替我挑担进山了。”',
      yun:'云照：“我既接手主持药站，前任欠下的旧账我自然认担。你若执意拿宗门封签压人交货，那便把断绝往来的后果也一并记进账册。”',
      honor:'旧欠按原约补齐，误期按章程折算。双方落印交割后，陆青禾特意留下一份回程补给：“往后咱们按账走货，不必再拿伤患等着用的一口药讨价还价。”',
      pressure:'陆青禾冷着脸收下封签：“既有宗门大印压着，这批货我交。但过了今日，我的商队绝不再踏进这座药站半步——把交割回执留着吧，省得外头传我陆青禾无故毁约。”',
      departed:'摊前只剩陆青禾的交割回执。物资已按封签交清，她的商队此后不再向这处药站供货。',
      supply:'陆青禾收下草与泉水，把留好的回气丹交给你。这一份回程补给已经领过，往后照常备药。'
    }
  };
  const data={
    id:'hehuan-world',schema:1,hubId:'hehuan',mapIds:['hehuan'],maps:{hehuan:map},objects,
    entry:{map:'hehuan',x:640,y:630},return:{map:'garden',x:1050,y:520},
    gate:{id:'toHehuan',name:'往合欢宗药站',map:'garden',x:1150,y:670},
    entryObject:object('toHehuan','往合欢宗药站',1150,670,'portal',{map:'garden',height:0,panel:'hub'}),
    minRank:4,minAge:20,people,pickups,quests,actions,encounter,dialogues,
    reputationNote:'药站开张 +1 清誉；守约交割 +2 清誉；威压交割 −2 清誉、+2 威名。护送摄元沿用实际施法评价，不重复计奖。',
    source:'柳如烟与合欢宗的灰色立场来自原作；云照、秦鹭、陆青禾、庭院药站三任务和具体数值为互动版扩展。'
  };
  D.maps.hehuan=map;
  if(node)module.exports=data;else root.XiuxianSectWorldData=data;
})(globalThis);
