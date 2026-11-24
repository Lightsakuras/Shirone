(function(root){
  'use strict';
  const kits={
    sword:{name:'护锋符匣',desc:'下一局秘境首次激发护身符时，护身时长额外延长3秒；若未动用便回山，本份合备亦随本局结束。',cost:{paper:1,herb:1},effect:{wardSeconds:3}},
    medicine:{name:'温养药包',desc:'下一局秘境首次服下回气丹、温养茶或杏花糕时，额外回复8点气血与8点灵力（均不逾100上限）。',cost:{herb:1,water:1},effect:{hp:8,mp:8}},
    scholar:{name:'观纹符笺',desc:'下次进入旧阵秘境时额外增加1次法宝重观机会（入阵共得2次，上限3次）；入阵即生效。',cost:{paper:1,dust:1},effect:{redraws:1}}
  };
  for(const kit of Object.values(kits)){Object.freeze(kit.cost);Object.freeze(kit.effect);Object.freeze(kit);}
  const api=Object.freeze({kits:Object.freeze(kits),itemLimit:999,resourceLimit:100,redrawLimit:3,baseWardSeconds:12});
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianProvisionsData=api;
})(globalThis);
