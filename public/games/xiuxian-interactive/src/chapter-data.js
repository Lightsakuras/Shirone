(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,D=node?require('./data.js'):root.XiuxianData;
  const obj=(id,name,x,y,cell,atlas='chapterProps',height=60)=>({id,name,x,y,cell,atlas,height,kind:'chapterObject'});
  const border=[{x:0,y:0,w:1280,h:150},{x:0,y:700,w:1280,h:60},{x:0,y:0,w:65,h:760},{x:1215,y:0,w:65,h:760}];
  D.items.qingxin={name:'清心散',mark:'清',type:'药物',color:'#b7c3a1',desc:'服用后驱散毒意并恢复少量气血，20 秒内不受墓道毒烟侵蚀。',self:true};
  D.recipes.qingxin={label:'研清心散',cost:{herb:1,water:1},amount:1};
  D.maps.temple={name:'荒山 · 雨夜破庙',sub:'十岁 · 先把这一夜熬过去',walls:border,objects:[
    obj('drywood','檐下干柴',330,510,9,'chapterPeople',55),obj('flint','旧篮中的火石',850,530,10,'chapterPeople',40),
    obj('hearth','火塘',645,385,9,'chapterPeople',75),obj('locket','怀里的长命锁',400,285,11,'chapterPeople',37),
    obj('xuanheng','玄衡',970,295,2,'chapterPeople',106),obj('leaveTemple','随玄衡离开',1110,570,null)
  ]};
  D.maps.forest={name:'汉墓林 · 白影之踪',sub:'脚印、残符与旧墓',walls:border,objects:[
    obj('forestReturn','退回青阳',150,580,null),obj('footprints','人的脚印',400,330,1),obj('burntPaper','半张残符',740,510,0,undefined,45),
    obj('clearingHerb','石隙清心草',430,570,10,undefined,52),obj('rubble','墓门落石',1080,280,2,undefined,108),obj('forestEnter','进入墓道',1150,235,null)
  ]};
  D.maps.crypt={name:'汉墓 · 机关墓道',sub:'弩箭、翻板、毒烟；先察后行',walls:border,objects:[
    obj('cryptReturn','返回墓林',135,590,null),obj('arrowControl','弩机轴盘',335,265,3,undefined,80),
    obj('bridgeControl','西岸锚环与木板',530,520,4,undefined,70),obj('bridgeFar','东岸锚环与木板',750,520,4,undefined,70),obj('ventControl','通风石轮',970,245,5,undefined,70),
    obj('mural','流云壁画',1030,570,6,undefined,92),obj('coffin','主棺遗物',1100,335,13,'chapterPeople',49),obj('sanctumDoor','推开耳室暗门',1160,440,null)
  ]};
  D.maps.tomb={name:'汉墓 · 藏身石室',sub:'先看清，再出剑',walls:border,objects:[
    obj('tombReturn','退回墓道',135,640,null),obj('ning','白衣女子',435,300,4,'chapterPeople',111),
    obj('child0','宝儿 · 盖好衣裳',185,300,8,'chapterPeople',45),obj('child1','李家孩子 · 递水',280,430,8,'chapterPeople',45),
    obj('child2','张家孩子 · 安神',180,555,8,'chapterPeople',45),obj('child3','新救孩子 · 查看呼吸',390,565,8,'chapterPeople',45),
    obj('summonWang','守住石室入口',960,420,null),obj('tombExit','护送孩子回镇',1100,580,null)
  ]};
  const ranks=['炼气初期','炼气中期','炼气后期','炼气圆满','筑基初期'];
  const paths=[[0,1,3,0],[0,2,1,3,0],[0,3,2,1,0],[0,1,2,3,0]];
  const tokens={
    locket:{name:'长命锁',atlas:'chapterPeople',cell:11,desc:'父母留下的旧银锁。毫无灵光，却让你在冷雨里记得自己从何处来。'},
    swordPage:{name:'回风剑页',atlas:'chapterProps',cell:12,desc:'剑庐试炼所得。习得「回风诀」；每次剑击额外附加 3 点伤害。'},
    medicinePouch:{name:'百草药囊',atlas:'chapterProps',cell:11,desc:'药庐辨药配伍所得。习得「回春诀」；服药时额外恢复 5 点气血。'},
    formationBrush:{name:'定脉符笔',atlas:'chapterProps',cell:13,desc:'经阁校阵所得。习得「定脉诀」；服清心散时额外恢复 8 点灵力。'},
    peachBlank:{name:'雷击桃木簪坯',atlas:'chapterProps',cell:14,desc:'一段带雷纹的桃木坯。无需外放灵光，顺着木理慢慢削整即可成簪。'},
    peachPin:{name:'亲手削成的木簪',atlas:'chapterPeople',cell:14,desc:'顺纹削坯、细磨收尾而成的木簪。可在药庐树下亲手赠予沈灵薇。'},
    jadeTablet:{name:'凌玉玦的玉牌',atlas:'chapterPeople',cell:13,desc:'汉墓主棺中的蜀山弟子玉牌。与断剑、残谱一并埋着三百年前的旧案。'},
    bloodTalisman:{name:'血色符纸',atlas:'chapterProps',cell:7,desc:'凝霜亲手交给你的断邪印血拓。系旧案关键物证，独立收存，不可炼化或消耗。'},
    foxHairpin:{name:'凝霜的狐簪',atlas:'chapterPeople',cell:12,desc:'凝霜临散前留下的旧物，托你替她再看一眼蜀山的月亮。独立收存，不作寻常装备。'},
    swordSeal:{name:'蜀山剑印',atlas:'chapterProps',cell:8,desc:'筑基后清微亲授的办案信物。凭此下山查访青阳、安顿孩童并调阅涉案线索。'},
    ledgers:{name:'封存的邪功手札',atlas:'caseObjects',cell:12,desc:'青阳王宅善后时封存的邪功册子。需与血符拓样一并呈交清微核验。'}
  };
  const skills={sword:{name:'回风诀',desc:'催动周身回风剑气，震伤近身之敌并短暂护体。',cost:16,cooldown:8},medicine:{name:'回春诀',desc:'立回 22 点气血，涤清体内毒意并短暂护体。',cost:18,cooldown:12},scholar:{name:'定脉诀',desc:'震伤周遭敌手并令其步履迟滞，为施符与救人腾出空当。',cost:15,cooldown:9}};
  const trial={sword:{name:'剑庐 · 守而后发',token:'swordPage',desc:'在药庐空地与木傀拆招。先按右键稳接两次试招，再出三剑收势。'},medicine:{name:'药庐 · 辨药配伍',token:'medicinePouch',desc:'先认出白脉对生的清心草，再按「青灵草 → 泉水 → 青灵草」入药，控稳文火研成。'},scholar:{name:'经阁 · 三灯归一',token:'formationBrush',desc:'照纸上所录方位，将三面阵盘依次拨向东、西、南。'}};
  const data={maps:['temple','forest','crypt','tomb'],ranks,paths,tokens,skills,trial,obj,bossMaxHp:620};
  if(node)module.exports=data;else root.XiuxianChapterData=data;
})(globalThis);
