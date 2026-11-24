(function(root){
  'use strict';
  const observations={
    burnBamboo:'用燃火符直接击破竹甲阵卫的竹甲',
    coldStone:'用寒针或定脉诀直接击破金纹石卫的石纹',
    herbPeace:'采齐三株月露草并过房，房内守护灵全部存活',
    sealPeace:'依木、火、土接通三碑并过房，房内守护灵全部存活',
    memory:'令任意一件法宝留下已定型的器忆',
    resonance:'实际装备或选择灵契，组成任意一种共鸣',
    craftPotion:'在药庐实际炼成回气丹',
    craftFire:'在药庐实际制成燃火符',
    craftWard:'在药庐实际制成护身符'
  };
  const records={
    armor:{title:'辨甲用器',desc:'先看准阵灵护甲路数，再对症出符或运诀。破甲无需苛求连招手法，亦不必将目标击杀。',requires:['burnBamboo','coldStone'],reward:{spirit:25,items:{ward:1}}},
    herbPeace:{title:'药露轻行',desc:'善用走位、引灵香与符药腾出采药空当；房内守护灵纵使受创无妨，只需在过关离房时全部存活即可。',requires:['herbPeace'],reward:{spirit:10,items:{tea:2}}},
    sealPeace:{title:'止戈解阵',desc:'循五行相生之序绕行触碑即可破阵；房内守护灵纵使受创无妨，只需在过关离房时全部存活即可。',requires:['sealPeace'],reward:{spirit:10,items:{incense:2}}},
    memory:{title:'一器有忆',desc:'携常用法宝实战历练，为其凝定一条专属器忆。器忆一经成形便随器长留，回山领赏亦无需交出原宝。',requires:['memory'],reward:{spirit:25,items:{}}},
    resonance:{title:'器法相应',desc:'将法宝本性、已醒器忆与本局灵契搭成同路共鸣。一旦成鸣即记入试录，此后换装或回山均不抹去记录。',requires:['resonance'],reward:{spirit:15,items:{potion:1}}},
    crafting:{title:'丹符互济',desc:'在药庐丹炉与制符台亲手炼成回气丹、燃火符与护身符各一；直接拾取、领物资或教学试手均不计入此录。',requires:['craftPotion','craftFire','craftWard'],reward:{spirit:15,items:{herb:3,water:2}}}
  };
  const craftObservations={potion:'craftPotion',fire:'craftFire',ward:'craftWard'};
  for(const record of Object.values(records)){Object.freeze(record.requires);Object.freeze(record.reward.items);Object.freeze(record.reward);Object.freeze(record);}
  const api=Object.freeze({observations:Object.freeze(observations),records:Object.freeze(records),craftObservations:Object.freeze(craftObservations),spiritLimit:1000000,itemLimit:999});
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianResearchData=api;
})(globalThis);
