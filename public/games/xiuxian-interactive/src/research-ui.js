(function(root){
  'use strict';
  const A=root.XiuxianArt,D=root.XiuxianData;
  const plates={armor:()=>A.icon('fire'),herbPeace:()=>A.icon('herb'),sealPeace:()=>A.icon('incense'),memory:()=>A.relic('mirror',2),resonance:()=>A.relic('jade',2),crafting:()=>A.icon('potion')};
  root.XiuxianResearchUI=function({game,openModal,closeModal,save,drain,esc}){
    const $=id=>document.getElementById(id);
    function rewardLine(reward){
      return `<span class="research-spirit"><i aria-hidden="true">蕴</i><b>${reward.spirit}</b> 灵蕴</span>${Object.entries(reward.items||{}).map(([id,count])=>`<span class="research-item">${A.icon(id)}<span>${esc(D.items[id].name)}<b> ×${count}</b></span></span>`).join('')}`;
    }
    function show(){
      const g=game();if(!g)return;
      const records=g.researchStatus(),reason=g.researchReason(),done=records.filter(r=>r.ready||r.claimed).length,claimed=records.filter(r=>r.claimed).length;
      const cards=records.map((r,i)=>{
        const progress=r.progress.filter(p=>p.done).length,state=r.claimed?'已收录':r.ready?'已悟得':'待实践',action=r.claimed?'谢礼已领取':!r.ready?'尚待实践':reason?'回药庐领取':r.reason?'暂不能领取':'领取谢礼';
        return `<article class="research-card ${r.claimed?'research-claimed':r.ready?'research-ready':''}" data-research-card="${esc(r.id)}"><div class="research-card-heading"><div class="research-plate" aria-hidden="true">${plates[r.id]?plates[r.id]():''}</div><div class="research-title"><span class="research-index">试录 · ${['一','二','三','四','五','六'][i]}</span><h3>${esc(r.title)}</h3></div><span class="research-stamp">${state}</span></div><p class="research-purpose">${esc(r.desc)}</p><ul class="research-progress" aria-label="${esc(r.title)}实践进度">${r.progress.map(p=>`<li class="${p.done?'is-done':''}"><span class="research-check" aria-hidden="true">${p.done?'✓':'·'}</span><span>${esc(p.label)}</span><small>${p.done?'已记':'未记'}</small></li>`).join('')}</ul>${r.hint?`<p class="research-hint">${esc(r.hint)}</p>`:''}<div class="research-reward" aria-label="${esc(r.title)}谢礼">${rewardLine(r.reward)}</div><div class="research-card-bottom"><span class="research-count">实践 ${progress} / ${r.progress.length}</span><button class="${r.ready&&!r.claimed&&!r.reason?'primary':'secondary'}" data-research-claim="${esc(r.id)}" ${r.reason||r.claimed||!r.ready?'disabled':''}>${action}</button></div><p class="research-reason" ${r.ready&&!r.claimed&&r.reason?'':'hidden'}>${esc(r.reason||'')}</p></article>`;
      }).join('');
      openModal('research',`<div class="research-banner"><p class="eyebrow">用器有方 · 行止有得</p><h2 id="modal-title">器物试录</h2><p class="research-intro">一张符、一缕香、一件旧器，皆有自己的用处。<br>将亲历的心得留在卷中，再带着它们走得更远。</p><div class="research-tally"><span><b>${done}</b> / ${records.length} 录已悟</span><span><b>${claimed}</b> 份谢礼已领</span></div></div><div class="research-guidance"><p>六卷试录随战自记，悟透即可回药庐领谢礼。</p><p>未得图谱可随首章与旧阵逐步收齐，先从手头器物试起。</p></div><p class="research-location" role="status">${esc(reason||'药庐安宁，可以领取已悟试录的谢礼。')}</p><div class="research-grid">${cards}</div><div class="research-footer"><p>成年后回药庐即可领赏；行囊将满时自动暂存卷中。</p><button id="research-close" class="secondary">合上试录</button></div><p id="inline-message" class="inline-message" role="status"></p>`);
      document.querySelectorAll('[data-research-claim]').forEach(b=>b.onclick=()=>{
        const id=b.dataset.researchClaim,ok=g.claimResearch(id);if(ok)save(true);show();drain();
        const card=document.querySelector(`[data-research-card="${id}"]`);card?.scrollIntoView({block:'nearest'});$('research-close')?.focus({preventScroll:true});
      });
      $('research-close').onclick=closeModal;
    }
    return {show};
  };
})(globalThis);
