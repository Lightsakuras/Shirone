(function(root){
  'use strict';
  // 退宗与散修后续：主动退出须到药站向云照交代；保留已修功法与门内历史，撤职阶、冻结并可清零可花贡献。
  // 依据 36 号「允许一直散修，也保留退出/拒绝的可玩后续」；保留细则由用户 2026-11-16 选定「保留功法与历史，清职务与贡献」。
  const Data={
    schema:1,
    id:'sectExit',
    title:'退宗与散修',
    place:'行旅药站',
    maxLeaves:9,
    keepNote:'退宗后，两脉已修层数及门内旧档（比试、会武、赴会、赛事、往来）悉数保留作历史记录，此后不再增长。',
    clearNote:'退宗即卸去门内职阶，累计功绩与组织威望封入旧档并归零，未用完的可花贡献一并清零；日后若重入本宗，须从记名弟子起重新办差。',
    remainNote:'退宗后仍可以散修之身继续原有历练与公开委托；云照照旧记你的医案与行程，交情不因退宗增减，亦不会因此结为道侣。',
    confirmNote:'退宗无法抹去当作「从未发生」：离宗记录会留在门内卷册中，重入山门须再次当面认下门规。',
    source:'保留细则按用户 2026-11-16 的选择：保留功法与历史，清职务与贡献；多重归属与长期并列仍待核定。'
  };
  if(typeof module==='object'&&module.exports)module.exports=Data;else root.XiuxianSectExitData=Data;
})(globalThis);
