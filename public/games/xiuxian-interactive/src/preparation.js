(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,R=node?require('./expedition-data.js'):root.XiuxianExpeditionData,T=node?require('./encounter-data.js'):root.XiuxianEncounterData;
  const rosters={hunt:['reed','moth','sentinel','wisp'],herb:['deer','moth'],seal:['wisp','sentinel'],boss:['keeper']};
  const goals={hunt:'击散三道阵灵后取宝。',herb:'采齐三株月露草即可离开，无须清敌。',seal:'解开三面脉碑即可离开，无须清敌。',boss:'击散守阵古磬，完成这一局。'};
  function routeIntel(g,id){
    if(!Object.hasOwn(rosters,id))return null;
    const inv=g.state.inventory,known=g.state.chapter.quests;
    const answers={reed:inv.fire>0?'燃火符 ×'+inv.fire:'可用普通剑击逐步削甲',sentinel:known.includes('scholar')?'已学定脉诀':inv.needle>0?'寒针 ×'+inv.needle:'可用普通剑击逐步削甲',keeper:known.includes('sword')?'已学回风诀':known.includes('scholar')?'已学定脉诀':'自主连剑第三段可破甲'};
    const enemies=rosters[id].map(kind=>({kind,name:R.enemies[kind].name,trait:T.preview(kind),answer:answers[kind]||'可用减速、护身与引香调整战局'}));
    return {id,name:R.rooms[id].name,goal:goals[id],rosterLabel:id==='hunt'?'以下四类中遇到三类':'此路守卫',enemies,canBypass:id==='herb'||id==='seal',bypass:id==='herb'||id==='seal'?'收势可避免主动追击；引灵香能引开普通守卫。':'普通攻击也能耗尽护甲，符药与功法可更快破甲。'};
  }
  function supplies(g){return Object.entries(R.startingSupplies).map(([id,minimum])=>({id,minimum,owned:g.state.inventory[id]||0,after:Math.max(g.state.inventory[id]||0,minimum)}));}
  function buildHints(g){
    const gear=g.equipped(),known=g.state.chapter.quests,has=id=>gear.some(e=>e.base===id),hints=[];
    if(has('mirror'))hints.push('已佩「照雪鉴」：先掷寒针或施定脉诀迟滞敌步，再靠自主出剑打出高额追伤。');
    if(has('bell'))hints.push('已佩「听雨铃」：将敌手引入灵香范围后出剑可附加追伤；守阵古磬虽不追香，但在它脚下点香同样能触发铃音加伤。');
    if(has('scroll')||has('lantern')||has('inkstone'))hints.push('已佩火符系法宝：投燃火符既能速破竹甲，又可联动返灵、补针或燃尽回血。');
    if(has('flask'))hints.push('已佩「含露瓶」：服药食或施回春诀时皆可触发护身；清心散专司驱毒，不入此列。');
    if(known.includes('scholar'))hints.push('定脉诀可高效破石纹和磬衣，再接火符或寒针利用气隙。');
    if(known.includes('sword'))hints.push('回风诀可高效破磬衣，先让目标减速还能追加伤害。');
    if(!hints.length)hints.push('先用基础符药应对敌情；没有特定法宝也能破甲。已有法宝可在藏阁装备。');
    return hints;
  }
  const api={routeIntel,supplies,buildHints};if(node)module.exports=api;else root.XiuxianPreparation=api;
})(globalThis);
