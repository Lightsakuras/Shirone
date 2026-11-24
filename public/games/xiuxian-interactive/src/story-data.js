(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports, D=node?require('./data.js'):root.XiuxianData;
  const object=(id,name,x,y,cell,height=55)=>({id,name,x,y,cell,height,kind:'caseObject'});
  D.maps.qingyang={name:'青阳镇 · 雨歇',sub:'五日之约 · 第二日走访',walls:[{x:40,y:70,w:410,h:210},{x:860,y:70,w:380,h:165},{x:40,y:510,w:300,h:200}],objects:[
    object('townReturn','返回蜀山',145,420,null),object('innkeeper','迎客来 · 王掌柜',345,345,0,92),
    object('liHome','李家 · 查验屋内',1020,290,5,40),object('zhangHome','张家 · 窗下留痕',395,570,6,29),
    object('granny','张阿婆',555,600,1,80),object('clinic','药铺 · 青黛',915,490,2,94),
    object('toolbox','借取木工工具',610,325,11,47),object('townWell','井边 · 温水壶',1090,605,null),
    object('nightLane','王宅后巷',1125,430,null)
  ]};
  D.maps.wangyard={name:'王宅 · 二更',sub:'柴棚静院 · 按住 Shift 轻步',walls:[{x:678,y:70,w:38,h:210},{x:683,y:441,w:38,h:269},{x:842,y:70,w:350,h:85}],objects:[
    object('yardExit','退回后巷',145,585,null),object('yardGate','柴棚外门',697,360,15,136),
    object('soil','新翻的土',1055,292,14,58),object('swordMark','柴棚边梁 · 留记',1100,204,5,32)
  ]};
  const evidence={
    rumor:{name:'掌柜的传闻',cell:0,type:'转述',text:'镇上流传孩童皆被三尾狐掳走。但王掌柜并未亲眼目睹，街谈巷议不能充作目击证词。'},
    bed:{name:'齐整的床铺',cell:4,type:'现场',text:'三家情形相仿。李家孩童床铺被褥齐整，床沿与踏脚处毫无撕扯挣扎之迹。'},
    latch:{name:'从里拨开的门闩',cell:5,type:'实测',text:'亲手拨动木闩并查验内外磨痕：屋门系自屋内拨开，门框木料完好无损。'},
    paper:{name:'镇妖符样',cell:7,type:'实物 · 独立保管',text:'征得李家应允后留存的一张符纸。黄纸朱线歪斜散乱，与正统道门符式相去甚远，来路可疑。'},
    fur:{name:'窗下白毛',cell:6,type:'现场',text:'张家窗下拾得的银白兽毛。只能证明曾有狐类贴近窗根，尚不足以断言是谁带走了孩子。'},
    shoe:{name:'童鞋摹记',cell:8,type:'笔记',text:'张阿婆紧紧攥着孙儿失踪那夜落下的童鞋。你只在纸上摹下鞋样、记清口供，将鞋子留还老人掌中。'},
    sales:{name:'三家的购符口供',cell:12,type:'交叉核对',text:'李家、张家与张阿婆三处口供互证：孩童失踪前数日，三家皆曾向王屠户买过所谓“镇妖符”。'},
    comfort:{name:'安定后的补述',cell:9,type:'补充口供',text:'递上温水与净巾后，张阿婆总算缓过气来。她仔细回想，买符确在失踪之前，且镇上并无人亲见狐妖伤人。'},
    falseSeal:{name:'符式对照',cell:19,type:'研习',text:'与经阁所学符式逐笔比照：此符朱线断续、气路闭塞，根本不能镇妖；背后用意须从卖符人身上查起。'},
    soil:{name:'柴棚新土',cell:14,type:'夜探',text:'柴棚墙根的泥土新翻不久，指尖触去有一股阴寒邪气。为免惊动正主，眼下暂不掘开。'},
    mark:{name:'边梁剑记',cell:5,type:'定位',text:'在柴棚边梁斜刻一道浅浅剑痕，留作日后携镇民复查的记认。'},
    trail:{name:'北去的白影',cell:3,type:'目击',text:'退出后巷时忽闻婴儿啼哭，一道白狐身影衔着微动的襁褓朝北面汉墓林疾奔而去。襁褓中实情尚待追查。'}
  };
  const deductions={
    entry:{name:'先查孩子如何出门',pair:['bed','latch'],text:'屋内既无破门亦无打斗痕迹，当先查清孩童为何会在夜里自己拨闩出门。'},
    seller:{name:'夜查卖符人的柴棚',pair:['paper','sales'],text:'三家失踪前皆买过同一人的符纸，卖符人的柴棚最值夜探；但疑点尚非铁证。'},
    caution:{name:'白毛不足以定罪',pair:['fur','rumor'],text:'窗下白毛只证其来过，街巷传闻更不能替人定罪，须见真凭实据再出剑。'}
  };
  const tools={linen:{name:'干净布巾',cell:9,desc:'既可安抚受惊百姓，夜探时也可裹住竹楔消去磕碰声。'},water:{name:'一壶温水',cell:16,desc:'走访受惊老人前先递上一盏温水，叫人缓过气再慢慢说话。'},wedge:{name:'竹楔工具',cell:11,desc:'木工借出的竹楔。夜探时可顺着门缝慢慢挑开木闩，无需动用灵力。'}};
  const twigs=[{x:290,y:425,r:52},{x:485,y:335,r:55},{x:570,y:500,r:48}];
  const data={evidence,deductions,tools,twigs,maps:['qingyang','wangyard']};
  if(node)module.exports=data;else root.XiuxianStoryData=data;
})(globalThis);
