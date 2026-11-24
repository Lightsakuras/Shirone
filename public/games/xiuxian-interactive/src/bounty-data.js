(function(root){
  'use strict';
  const rows=[
    ['mist','青阳雾魅','城南晒药竹帘夜夜湿透，帘后总多出一双浅印。鸡鸣时，白雾便顺着草鞋底溜回河里。','药庐取匣','雾中分身','雾魅流纱履','boots','frost','#8fcad2','wings'],
    ['bamboo','翠竹剑傀','竹匠从不卖院里末一柄木剑。无风之夜，那剑自会悬起，将满院落叶逐片劈作两半。','筑基初期','穿竹直刺','翠竹听风剑','weapon','lotus','#8bd4a6','sword'],
    ['corpse','汉墓古尸王','守墓人的铜铃早已锈死。唯墓底积水微晃时，石椁内便应着水声闷敲三下。','汉墓救援','尸毒潭与重砸','镇棺铜冠','head','star','#bdac83','head'],
    ['wyrm','寒潭霜蛟','渔人收网时瞥见一截苍鳞。网绳结冰处恰围成圆，圈里连水声都冻住了。','金丹卷','扇形冰息与冻结环','寒潭照雪轮','weapon','frost','#8fd5ee','wheel'],
    ['blade','锁妖断剑煞','塔壁莫名少去半截残锋。夜巡弟子一路听见刮石声，回头时，剑痕已将影子团团围住。','金丹卷','环阵飞剑','断剑煞斩风剑','weapon','lotus','#b1d5ac','swarm'],
    ['ember','丹炉赤焰魅','废炉冷了三年，灰底仍藏一粒红炭。夜行人拨它一下，隔山便亮起第二圈火。','入宗或元婴卷','连环火海','炉心赤霞袍','robe','flame','#ef9271','flag'],
    ['spider','幽谷千目蛛','谷口蛛网缀满露珠；灯火一近，千百颗水珠齐齐朝人转来。药农早把那条小径让给了它。','元婴卷','蛛网与毒弹','千目碧丝囊','pouch','lotus','#9ccc97','pouch'],
    ['puppet','天机失控古偶','旧机房早断了灵流，木偶胸前三枚铜珠却仍在轮转。头一枚照影，第二枚落雷。','元婴卷','雷柱与护盾球','天机护心佩','amulet','thunder','#a69ce6','orb'],
    ['bone','赤渊魔骨将','断戟插在古渡已久。每逢枯水露骨，便有空甲自泥中起身拔戟，河床立裂十字火纹。','化神卷','十字裂地焰波','赤渊魔皇戒','ring','flame','#ed956e','storm'],
    ['saint','九霄太古妖圣','九重雷云下悬着座空石台。登台者先见残月，再见剑雨，最后才撞上台上那双金瞳。','大乘卷或战力 1800','三相天劫','妖圣九霄羽','cloak','star','#e8c680','yin']
  ];
  const list=rows.map(([id,name,bio,gate,move,reward,slot,set,color,icon],index)=>({id,name,bio,gate,move,reward,slot,set,color,icon,index,defense:[1480,960,860,720,620,485,450,380,340,300][index],base:'bounty_'+id}));
  if(typeof module==='object'&&module.exports)module.exports=list;else root.XiuxianBountyData=list;
})(globalThis);
