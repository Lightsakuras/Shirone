(function(root){
  'use strict';
  const A=root.XiuxianArt,R=root.XiuxianExpeditionData,C=root.XiuxianChapterData,E=root.XiuxianEngine;
  root.XiuxianLoadoutsUI=function({game,openModal,closeModal,save,drain,esc}){
    const $=id=>document.getElementById(id);let pending=null,inspected=0;
    const label=id=>R.resonances[id].name;
    const gearList=gear=>gear.length?gear.map(g=>`<div class="loadout-gear">${A.relic(g.base,g.level)}<div><b>${esc(R.relics[g.base].name)}</b><small>${esc(R.tiers[g.level-1])} · ${esc(R.affixes[g.affix].name)}${g.memory?' · '+esc(R.paths[g.memory].name)+'器忆':''}</small></div></div>`).join(''):'<p class="loadout-empty">此方案不携带法宝。</p>';
    function show(keep=false){
      const g=game();if(!g)return;if(!keep)pending=null;
      const reason=g.loadoutReason(),current=g.currentLoadout(),cards=E.loadoutNames.map((name,i)=>{
        const p=g.loadoutPreview(i),occupied=!!g.state.loadouts[i],blocked=reason||p.invalid;
        return `<article class="loadout-card clarity-paper-card ${p.same?'loadout-current':''}" data-loadout-card="${i}" ${i===inspected?'':'hidden'}><div class="loadout-card-title"><h3>${name}</h3>${p.same?'<span>与当前相同</span>':''}</div>${occupied&&!p.invalid?`${gearList(p.gear)}<p class="loadout-plan">${p.skill?esc(C.skills[p.skill].name):'不携带主动功法'} · ${esc(E.stances[p.stance].name)}</p><div class="loadout-resonance"><b>套用后共鸣</b><p>${p.active.map(label).map(esc).join('、')||'尚未成形'}</p><small>${p.added.length?'<span class="delta-up">▲ 新增 '+p.added.map(label).map(esc).join('、')+'</span>':'无新增共鸣'}${p.lost.length?'<span class="delta-down"> ▼ 失去 '+p.lost.map(label).map(esc).join('、')+'</span>':''}</small></div>`:`<p class="loadout-empty">${p.invalid?esc(p.reason):'先在法宝藏阁配好器物、选定功法与御敌方式，再将当前搭配记在这里。'}</p>`}<div class="loadout-actions"><button data-loadout-save="${i}" class="secondary" ${reason?'disabled':''}>${occupied?'覆盖为当前搭配':'记下当前搭配'}</button><button data-loadout-apply="${i}" class="primary" ${!occupied||blocked||p.same?'disabled':''}>${p.same?'正在使用':'套用方案'}</button>${occupied?`<button data-loadout-delete="${i}" class="quiet" ${reason?'disabled':''}>清空记录</button>`:''}</div></article>`;
      }).join('');
      openModal('loadouts',`<p class="eyebrow">器随心用 · 三份行装</p><h2 id="modal-title">行前配装</h2><p class="modal-subtitle">存录三套随身法宝、主动功法与御敌姿态，药庐内一键换装。</p><div class="loadout-summary"><b>当前搭配</b><span>${g.equipped().map(x=>esc(R.relics[x.base].name)).join('、')||'未携法宝'} · ${current.skill?esc(C.skills[current.skill].name):'未选功法'} · ${esc(E.stances[current.stance].name)}</span></div><p class="loadout-location" role="status">${esc(reason||'药庐安宁，可随时存取或切换配装。')}</p><div class="folio-layout"><nav class="folio-list">${E.loadoutNames.map((n,i)=>`<button data-plan-view="${i}" aria-pressed="${i===inspected}">${esc(n)}</button>`).join('')}</nav><div class="loadout-grid">${cards}</div></div>${pending?`<div class="loadout-confirm" role="group" aria-label="确认配装变更"><p>${pending.type==='delete'?'清空':'覆盖'}${E.loadoutNames[pending.slot]}？${pending.type==='delete'?'只删除这份记录，不删除器物。':'原方案将被当前搭配替换。'}</p><button id="loadout-confirm" class="primary" ${reason?'disabled':''}>确认${pending.type==='delete'?'清空':'覆盖'}</button><button id="loadout-cancel" class="secondary">取消</button></div>`:''}<p class="loadout-note">在外可随时查阅方案，回药庐安全处即可保存或切换。</p><p id="inline-message" class="inline-message" role="status"></p><div class="buttons"><button id="loadouts-close" class="secondary">收好行装</button></div>`);
      for(const b of document.querySelectorAll('[data-plan-view]')) b.onclick=()=>{
        inspected=Number(b.dataset.planView);pending=null;show(true);document.querySelector('[data-plan-view="'+inspected+'"]').focus();
      };
      function act(type,slot){const method={save:'saveLoadout',apply:'applyLoadout',delete:'deleteLoadout'}[type];const ok=g[method](slot);if(ok)save(true);pending=null;show(true);drain();}
      document.querySelectorAll('[data-loadout-save]').forEach(b=>b.onclick=()=>{const slot=Number(b.dataset.loadoutSave);if(g.state.loadouts[slot]){pending={type:'save',slot};show(true);$('loadout-confirm')?.focus();}else act('save',slot);});
      document.querySelectorAll('[data-loadout-apply]').forEach(b=>b.onclick=()=>act('apply',Number(b.dataset.loadoutApply)));
      document.querySelectorAll('[data-loadout-delete]').forEach(b=>b.onclick=()=>{pending={type:'delete',slot:Number(b.dataset.loadoutDelete)};show(true);$('loadout-confirm')?.focus();});
      if(pending){$('loadout-confirm').onclick=()=>act(pending.type,pending.slot);$('loadout-cancel').onclick=()=>{pending=null;show(true);};}
      $('loadouts-close').onclick=closeModal;
    }
    return {show};
  };
})(globalThis);
