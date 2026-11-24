(function(root){
  'use strict';
  const P=root.XiuxianPreparation,D=root.XiuxianData;
  root.XiuxianPreparationUI=function({esc}){
    function beforeRun(g){
      const provision=g.provisionStatus(),kit=provision.kits.find(x=>x.id===provision.prepared);
      const provisionPanel=`<div class="provision-preview"><h3>药庐合备</h3><p>${kit?esc(kit.name)+' · '+esc(kit.desc)+' 已扣用料，成功入阵时带上。':provision.unlocked?'与沈灵薇把材料合成一份行装，按自己的所学，为下一局添一分准备。':'分享过一篇旧阵札记后，可与沈灵薇合备；不影响正常入阵。'}</p><button id="provisions-open" class="secondary">${kit?'查看 / 拆开备物':'与沈灵薇合备'}</button></div>`;
      return `<div class="preparation-panel" aria-label="入阵准备"><h3>行装先备，入阵从容</h3><p>入阵时阵台仅将基础符药补至下列保底数，超出部分照常保留。动身前可先核对三套配装方案。</p><div class="preparation-supplies">${P.supplies(g).map(x=>`<span>${root.XiuxianArt.icon(x.id)}<b>${esc(D.items[x.id].name)}</b><small>现有 ${x.owned} → 入阵 <b class="${x.after>x.owned?'supply-gain':''}">${x.after}</b></small></span>`).join('')}</div><ul>${P.buildHints(g).map(h=>`<li>${esc(h)}</li>`).join('')}</ul><p class="preparation-footnote">临时灵契须入阵后逐段择取，不在日常配装方案之内。第五段守阵古磬身披 60 点磬衣，用主动功法或三连剑末击可快速破甲。</p><button id="prepare-loadouts" class="secondary">查看三套配装</button>${provisionPanel}</div>`;
    }
    function route(g,id){
      const intel=P.routeIntel(g,id);return `<span class="route-intel" data-intel="${id}"><b>通关目标 · ${esc(intel.goal)}</b><span>${esc(intel.rosterLabel)}：${intel.enemies.map(x=>esc(x.name)).join('、')}</span>${intel.enemies.filter(x=>x.trait).map(x=>`<span><strong>${esc(x.trait.name)} ${x.trait.maxArmor}</strong> · ${esc(x.trait.counter)}<small>随身应对：${esc(x.answer)}</small></span>`).join('')}<em>${esc(intel.bypass)}</em></span>`;
    }
    return {beforeRun,route};
  };
})(globalThis);
