(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,C=node?require('./chapter-data.js'):root.XiuxianChapterData;
  const boss=()=>({id:'wang',kind:'wang',name:'王屠户',x:910,y:420,maxHp:C.bossMaxHp,hp:C.bossMaxHp,speed:73,damage:22,radius:82,reach:115,slow:0,burn:0,wind:0,cooldown:1.2,targetX:910,targetY:420,moveIndex:0,mode:'cleave',weak:0});
  function fresh(prologue=false,advanced=false){return {
    prologue:prologue?'pending':'skipped',survival:{wood:false,flint:false,fire:false,bread:false,lock:!prologue},
    rank:advanced?4:0,breath:0,quests:[],tokens:prologue?[]:['locket'],skill:null,skillCd:0,
    training:false,swordHits:0,blocks:0,herb:false,mixture:0,discs:[0,0,0],carving:0,
    care:null,shenGift:null,ningChoice:null,ningBond:0,focus:null,homecoming:false,
    tomb:{stage:'locked',clues:[],rubble:90,arrows:false,bridge:false,vent:false,passed:[],wheel:0,
      children:[],heard:false,barrier:0,boss:boss(),bossReward:null,rescued:false,sealed:false,escort:0,deaths:0},
    complete:false
  };}
  function validate(value,world){
    const fail=()=>{throw Error('首章记录异常。');};if(!value||typeof value!=='object')fail();const out=fresh();
    const en=(v,a)=>{if(!a.includes(v))fail();return v;};
    const num=(v,max,integer=true)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>max||integer&&!Number.isInteger(v))fail();return v;};
    const bool=v=>{if(typeof v!=='boolean')fail();return v;};
    const list=(v,a)=>{if(!Array.isArray(v)||v.length>a.length||new Set(v).size!==v.length||v.some(x=>!a.includes(x)))fail();return [...v];};
    out.prologue=en(value.prologue,['pending','done','skipped']);for(const key of Object.keys(out.survival))out.survival[key]=bool(value.survival?.[key]);
    for(const [key,max] of [['rank',4],['breath',5],['swordHits',3],['blocks',2],['mixture',3],['carving',3],['ningBond',20]])out[key]=num(value[key],max);
    out.quests=list(value.quests,Object.keys(C.trial));out.tokens=list(value.tokens,Object.keys(C.tokens));out.skill=en(value.skill,[null,...out.quests]);out.skillCd=num(value.skillCd,12,false);
    out.training=bool(value.training);out.herb=bool(value.herb);out.complete=bool(value.complete);
    out.homecoming=value.homecoming===undefined?false:bool(value.homecoming);
    if(!Array.isArray(value.discs)||value.discs.length!==3)fail();out.discs=value.discs.map(v=>num(v,3));
    out.care=en(value.care,[null,'tea','rest','skip']);out.shenGift=en(value.shenGift,[null,'close','friend']);out.ningChoice=en(value.ningChoice,[null,'promise','respect']);out.focus=en(value.focus,[null,'shen','ning']);
    if(out.rank===4&&out.breath!==0||out.rank<4&&out.breath>=C.paths[out.rank].length||out.training&&(world.map!=='garden'||world.run||out.quests.includes('sword')))fail();
    if(out.prologue==='pending'&&(world.map!=='temple'||out.rank||out.quests.length||world.story.stage!=='unstarted')||out.prologue!=='pending'&&world.map==='temple')fail();
    if(out.survival.fire&&(!out.survival.wood||!out.survival.flint)||out.survival.lock!==out.tokens.includes('locket'))fail();
    if(out.shenGift&&!out.tokens.includes('peachPin')||out.quests.some(id=>!out.tokens.includes(C.trial[id].token)))fail();
    const t=value.tomb;if(!t)fail();out.tomb.stage=en(t.stage,['locked','forest','crypt','meeting','battle','farewell','escort','report','complete']);
    out.tomb.clues=list(t.clues,['footprints','burntPaper','mural','coffin']);out.tomb.passed=list(t.passed,['arrows','bridge','smoke']);out.tomb.children=list(t.children,[0,1,2,3]);
    for(const k of ['arrows','bridge','vent','heard','rescued','sealed'])out.tomb[k]=bool(t[k]);
    for(const [k,max] of [['rubble',90],['wheel',3],['barrier',3],['escort',3],['deaths',999]])out.tomb[k]=num(t[k],max);
    out.tomb.bossReward=en(t.bossReward,[null,'mirror','lantern','map']);
    if(!t.boss)fail();const e=out.tomb.boss;
    for(const [k,max] of [['hp',C.bossMaxHp],['x',1200],['y',690],['slow',8],['burn',3],['weak',8]])e[k]=num(t.boss[k],max,false);
    e.moveIndex=num(t.boss.moveIndex,1000000);e.mode=en(t.boss.mode,['cleave','wave','channel']);e.targetX=e.x;e.targetY=e.y;
    if(['forest','crypt','tomb'].includes(world.map)&&(t.stage==='locked'||world.run)||t.stage!=='locked'&&(world.story.stage!=='forest'||out.rank!==4))fail();
    if(t.stage==='battle'&&(world.map!=='tomb'||t.children.length!==4||!t.heard||e.hp<=0))fail();
    if(['farewell','escort','report','complete'].includes(t.stage)&&e.hp!==0||t.bossReward&&e.hp!==0)fail();
    if(out.ningChoice&&!out.tokens.includes('foxHairpin')||['escort','report','complete'].includes(t.stage)&&(!out.ningChoice||!t.bossReward))fail();
    if(t.rescued&&t.escort!==3||t.sealed&&(!t.rescued||!out.tokens.includes('ledgers'))||out.complete!==(t.stage==='complete')||out.complete&&!t.sealed)fail();
    if(out.homecoming&&(!t.rescued||!world.story.shared))fail();
    return out;
  }
  const data={fresh,validate,boss};if(node)module.exports=data;else root.XiuxianChapterState=data;
})(globalThis);
