(function(root){
  'use strict';
  const traits={
    reed:{name:'竹甲',maxArmor:24,counter:'燃火符破甲效率 ×3',desc:'投燃火符可迅速烧穿竹甲；若无火符，用寻常剑击亦可逐剑削尽。',multiplier:3,sources:['fire']},
    sentinel:{name:'石纹',maxArmor:36,counter:'寒针或定脉诀破甲效率 ×3',desc:'掷寒针或施展定脉诀可循石纹震裂护甲；破甲后再接剑击事半功倍。',multiplier:3,sources:['needle','scholar']},
    keeper:{name:'磬衣',maxArmor:60,counter:'回风诀、定脉诀或第三段剑击破甲效率 ×2',desc:'施展回风诀、定脉诀，或打出三连剑击的末段重剑，皆可高效震碎磬衣。',multiplier:2,sources:['sword','scholar','third']}
  };
  for(const value of Object.values(traits)){Object.freeze(value.sources);Object.freeze(value);}Object.freeze(traits);
  function preview(kind){if(!Object.hasOwn(traits,kind))return null;const t=traits[kind];return {kind,name:t.name,armor:t.maxArmor,maxArmor:t.maxArmor,counter:t.counter,desc:t.desc,broken:false};}
  const api={traits,preview};if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianEncounterData=api;
})(globalThis);
