(function (root) {
  'use strict';
  const slots = {weapon:'武器',head:'头冠',robe:'道袍',boots:'云履',cloak:'披风',ring:'戒指',amulet:'玉佩',pouch:'行囊'};
  const visible = ['weapon','head','robe','boots','cloak'];
  const grades = [
    ['凡品','#d8dce2','#48525b',1,1,5],['灵品','#5ce09e','#14623e',1,2,8],
    ['玄品','#62b6ff','#194e84',2,2,10],['地品','#c38aff','#612c9e',3,3,12],
    ['天品','#ffd166','#744500',3,4,15],['仙品·太古','#ff9667','#8b3022',4,4,15]
  ].map(([name,color,ink,min,max,cap],i)=>({name,color,ink,min,max,cap,mult:[1,1.25,1.55,1.95,2.45,3][i]}));
  const weapons = {
    sword:['剑修','长剑','三连斩 · 扇形剑气',120,'#b9f5cc'],storm:['雷法','雷杖','天雷落顶 · 连锁弹射',300,'#bd9cff'],
    fire:['离火','火幡','火凤追身 · 地火焚莲',280,'#ff9162'],ice:['玄冰','冰轮','穿透冰棱 · 三印碎冰',290,'#80e5ff'],
    swarm:['御剑','剑匣','悬剑索敌 · 回锋入匣',340,'#ffe18c']
  };
  const sets = {
    lotus:['青莲剑心','剑气范围 +30%','每第 3 击追发 3 道青莲剑影'],
    thunder:['紫霄天雷','雷法与主动功法暴击率 +18%','命中 30% 几率降连锁天雷'],
    flame:['赤焰焚天','攻击附灼烧，对燃烧目标增伤 +25%','暴击或斩杀时炸开火环'],
    frost:['玄霜凌寒','命中叠寒印并减速','满 3 层寒印冻结 1.2 秒并碎冰']
  };
  const affixes={attack:'攻击',defense:'防御',crit:'暴击率',skill:'功法增伤',haste:'攻速',pickup:'拾取范围'};
  const bases={}, rare=[];
  function base(id,slot,name,style='plain',school=null,set=null,route=''){
    bases[id]={id,slot,name,style,school,set:set==='star'?null:set,route:style==='star'&&!route?'终极真首领限定':route};
    return id;
  }
  base('starter_sword','weapon','凡品青钢剑','plain','sword');
  base('starter_robe','robe','蜀山白衣道袍'); base('starter_boots','boots','青布云履'); base('starter_pouch','pouch','粗布行囊');
  const schools=Object.keys(weapons), setIds=[...Object.keys(sets),'star'];
  for (const [i,set] of setIds.entries()){
    const title=['青莲','紫霄','赤焰','玄霜','星纹'][i];
    for(const slot of Object.keys(slots)){
      const name=slot==='weapon'?['青莲长剑','紫霄雷杖','离火朱幡','回雪冰轮','万剑御剑匣'][i]:title+slots[slot];
      base(set+'_'+slot,slot,name,set,slot==='weapon'?schools[i]:null,set);
    }
  }
  base('archive_robe','robe','藏器月白染','jade',null,null,'入鉴 3 种底材解锁月白染');
  base('soul_sword','weapon','青霜本命剑','plain','sword');
  base('plain_swarm','weapon','松纹剑匣','plain','swarm');
  for(const [i,set] of setIds.entries())base(set+'_diadem','head',['碧莲镇渊冠','雷云镇渊冠','流火镇渊冠','霜河镇渊冠','太微镇渊冠'][i],set,null,set,set==='star'?'终极真首领限定':'万象天渊每 5 层首领掉落');
  function relic(id,slot,name,style,set,route,school=null){rare.push(base(id,slot,name,style,school,set,route));}
  relic('nine_wings','cloak','青莲九剑翼','wings','lotus','九霄第 15 波，或 180 仙玉兑幻化');
  relic('star_wheel','cloak','太极星辰光轮','wheel','star','天渊首通第 15 层解锁幻化');
  relic('phoenix_wings','cloak','九幽冥凤羽','phoenix','flame','天渊 20 层起精英／首领，或砺剑讨伐首领');
  relic('lotus_steps','boots','步步生莲履','lotus','lotus','主线入元婴卷，或九霄累计斩敌 1500');
  relic('storm_steps','boots','紫霄踏雷靴','thunder','thunder','九霄炼成超武「九天雷劫大阵」');
  relic('ember_steps','boots','踏焰焚天履','flame','flame','天渊首通第 10 层');
  relic('emperor_robe','robe','九霄星帝袍','emperor','star','九霄第 20 波，或 320 仙玉兑幻化');
  relic('sunset_robe','robe','赤霞霓裳羽衣','sunset','flame','照心坪会武夺魁，或天渊第 12 层宝库');
  relic('jade_robe','robe','太虚白玉仙袍','jade','lotus','主线达大乘，或天渊首通第 8 层');
  relic('glacier_robe','robe','玄霜剑尊衣','glacier','frost','九霄炼成超武「永冬霜华绝域」');
  relic('star_crown','head','太古星辰冠','crown','star','九霄收录 3 种超武，或 220 仙玉兑幻化');
  for(const [i,school] of schools.entries())relic('ancient_'+school,'weapon',['太虚斩仙剑','紫霄神雷戟','焚天朱雀幡','九幽玄冰轮','万剑归宗匣'][i],'ancient',setIds[i],'高层首领仙品掉落，或 260 仙玉残谱 ＋ 5 劫晶铸成',school);
  const bounties=typeof module==='object'&&module.exports?require('./bounty-data.js'):root.XiuxianBountyData;
  for(const b of bounties)base(b.base,b.slot,b.reward,b.set,b.slot==='weapon'?(b.id==='wyrm'?'ice':'sword'):null,b.set,'山河悬赏 · '+b.name+'首胜');
  const legendary=typeof module==='object'&&module.exports?require('./legendary-data.js'):root.XiuxianLegendary;
  for(const [id,[name,slot]] of Object.entries(legendary.curses))
    base(id,slot,name,'flame',slot==='weapon'?'sword':null,null,'天渊高危门、剑冢、黑市或高热度掉落');
  base('calamity_dye','robe','劫火绛绡染','sunset',null,null,'3 热度以上清层解锁');
  base('dao_halo','cloak','太虚天道光环','wheel',null,null,'首斩太虚心魔解锁');
  const costs={enhance:level=>Math.round(10+level*8+Math.pow(level,1.45)*3),promote:grade=>12*(grade+1),reroll:locks=>3+locks*3};
  const api={legendary,slots,visible,grades,weapons,sets,affixes,bases,rare,costs};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianArmoryData=api;
})(globalThis);
