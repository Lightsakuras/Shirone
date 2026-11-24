(function(root){
  'use strict';
  const D=root.XiuxianData,A=root.XiuxianArt,E=root.XiuxianEngine;
  root.XiuxianWorkshopUI=function({game,openModal,closeModal,save,drain,esc,updateSlots}){
    let selected={};
    function show(keep=false){
      const g=game();if(!g)return;if(!keep)selected={};
      const task=g.relaxed&&g.taskRecipe;
      const cards=Object.entries(D.recipes).sort(([a],[b])=>Number(b===task)-Number(a===task)).filter(([id,r])=>!r.unlock||g.state.collection.recipes.includes(id)).map(([id,r])=>{
        const choice=selected[id]||'1',count=choice==='max'?Math.max(1,g.maxCraft(id)):Number(choice),p=g.craftPlan(id,count);
        return `<article class="workshop-card ${id===task?'task-recipe':''}" data-workshop-card="${id}"><div class="workshop-title">${A.icon(id)}<div><h3>${esc(D.items[id].name)}</h3>${id===task?'<b class="task-seal">任务所需</b>':''}<small>每炉 ${r.amount+g.recipeBonus} 份 · 行囊 ${g.state.inventory[id]}/999</small></div></div><p class="workshop-use">${esc(D.items[id].desc||'')}</p><label class="workshop-quantity">炼制炉数<select data-craft-count="${id}" aria-label="${esc(D.items[id].name)}炼制炉数">${[['1','1 炉'],['3','3 炉'],['5','5 炉'],['max','尽数炼制（'+p.max+' 炉）']].map(([value,label])=>`<option value="${value}" ${choice===value?'selected':''}>${label}</option>`).join('')}</select></label><div class="workshop-cost">${p.cost.map(x=>`<span class="${x.have<x.need?'missing':''}">${esc(D.items[x.id].name)} <b>${x.need}</b><small>持有 ${x.have}</small></span>`).join('')}</div><p class="workshop-result" data-craft-preview="${id}">本次 ${count} 炉 → ${esc(D.items[id].name)} ×${p.amount}</p><p class="workshop-reason" role="status">${esc(p.reason||'材料已齐，炼成后收入行囊。')}</p><button data-craft="${id}" class="${p.reason?'secondary':'primary'}" ${p.reason?'disabled':''}>${id===task?'一键炼制':esc(r.label)}${count>1?' · '+count+' 炉':''}</button></article>`;
      }).join('');
      openModal('craft',`<p class="eyebrow">药庐 · 已暂停</p><h2 id="modal-title">丹火与符墨</h2><p class="modal-subtitle">备足原料，开炉即成。青灵草可在药庐药圃采摘，山泉水自院中石井汲取，灵砂由击散石傀或开启残箱所得。</p><div class="workshop-grid">${cards}</div><p class="workshop-note">单次至多开炼 ${E.workshopLimit} 炉，「尽数炼制」按现有原料与空位自动折算。</p><p id="inline-message" class="inline-message" role="status"></p><div class="buttons"><button id="craft-done" class="secondary">收起丹炉，继续历练</button></div>`);
      document.querySelectorAll('[data-craft-count]').forEach(el=>el.onchange=()=>{selected[el.dataset.craftCount]=el.value;const scroll=document.getElementById('modal').scrollTop;show(true);document.querySelector(`[data-craft-count="${el.dataset.craftCount}"]`).focus({preventScroll:true});document.getElementById('modal').scrollTop=scroll;});
      document.querySelectorAll('[data-craft]').forEach(el=>el.onclick=()=>{const id=el.dataset.craft,count=selected[id]==='max'?g.maxCraft(id):Number(selected[id]||1);if(g.craftBatch(id,count))save(true);const scroll=document.getElementById('modal').scrollTop;show(true);document.getElementById('modal').scrollTop=scroll;drain();updateSlots();});
      document.getElementById('craft-done').onclick=closeModal;
    }
    return {show};
  };
})(globalThis);
