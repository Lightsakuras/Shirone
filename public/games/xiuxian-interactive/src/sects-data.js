(function(root){
  'use strict';
  const partner={id:'yun',name:'云照',age:26,gender:'female',goal:'整理两脉修行的经脉损耗，筹备行旅药站；每次修习均独立确认约定。',consent:'云照仅与年满二十、自愿守约的修士合修。动功前须当面核清灵流份额、时限与停功手势，任一方皆可随时叫停。合修纯系功法进境，不等于恋爱或道侣结契。'};
  const doctrine='合欢宗兼纳双修与采补两脉，唯以各人实迹定评。男女同权；成年双方自愿、逐次立约；绝不伤及无辜。入宗仅添一层归属，原本身世、专长、玄衡与清微师承及既有任务悉数保留。';
  const paths={
    dual:{id:'dual',name:'双修 · 同息一脉',maxLevel:3,skills:['harmony'],cost:{herb:1,water:2},contribution:2,
      desc:'与云照共同校准周天灵气往还，各守经脉、不伤根基，由此修成护持己身的「同息诀」。',
      agreement:'你与已成年的云照确认：本次同息修习双方自愿，灵力等量往还，只校准经脉；不承诺恋爱、不锁定道侣。',
      result:'你与云照依约同息，逐段校准灵流往还；她录下药站所需的经脉实测脉案，你则炼成了更为绵长稳固的护体真气。'},
    siphon:{id:'siphon',name:'采补 · 摄元一脉',maxLevel:3,skills:['covenant','ravage'],cost:{dust:2,paper:1},contribution:2,
      desc:'在约定份额内习练灵流收放；临敌时既可克制截流，亦可甘冒反噬施展「掠灵诀」。一举一动皆会改写清誉与威名。',
      agreement:'你与已成年的云照确认：本次只在双方自愿约定的灵力份额内练习摄元，结束归还余流，不伤经脉。对敌掠灵另计反噬与宗门评价，不可用于无辜者。',
      result:'你依约收束云照外放的灵流，一触限额当即停功并归还余气；她验明彼此经脉无碍，方将战时「敛息摄元」与「强行掠灵」的分寸传授于你。'}
  };
  const skills={
    harmony:{id:'harmony',path:'dual',name:'同息诀',desc:'双修所得的护持功法：恢复自身气血并短时护身。',cost:22,cooldown:12,range:0,target:false,baseHeal:12,healPerLevel:4,baseWard:3,wardPerLevel:1},
    covenant:{id:'covenant',path:'siphon',name:'敛息摄元诀',desc:'以立约摄元所学控制灵流；战时截取在场敌人已经外放的灵力，实际气血伤害才返灵。',cost:18,cooldown:10,range:220,target:true,baseDamage:18,damagePerLevel:6,returnRate:.2,baseReturn:3,returnPerLevel:2},
    ravage:{id:'ravage',path:'siphon',name:'掠灵诀',desc:'猛截敌方灵流：伤害更高，以自身气血承受反噬，再按实际气血伤害回血；成功命中会减清誉、增威名。',cost:24,cooldown:12,range:190,target:true,baseDamage:32,damagePerLevel:8,returnRate:.16,baseReturn:6,returnPerLevel:2,backlash:8}
  };
  const data={id:'hehuan',name:'合欢宗',doctrine,partner,paths,skills,donation:{cost:{herb:2,dust:2},gain:3},maxDonations:999,maxActions:1000000,
    source:'原作有合欢宗及宗主柳如烟的灰色立场；云照、成年逐次立约、两脉修习和战斗数值为本版新增。'};
  if(typeof module==='object'&&module.exports)module.exports=data;else root.XiuxianSectsData=data;
})(globalThis);
