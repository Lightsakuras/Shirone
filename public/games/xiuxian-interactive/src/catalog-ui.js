(function(root){
  'use strict';
  const C=root.XiuxianCatalog,A=root.XiuxianArt;
  root.XiuxianCatalogUI=function({game,openModal,closeModal,esc}){
    const $=id=>document.getElementById(id);
    let query='',category='all',owned=false,spoilers=false,chosen=null;
    function possession(e){
      const g=game();if(!g)return '';
      if(e.kind==='item'){const n=g.state.inventory[e.key]||0;return n?'行囊 ×'+n:'';}
      if(e.kind==='relic'){const gear=g.state.collection.gear.filter(x=>x.base===e.key);return gear.length?'已收藏 '+gear.length+' 件 · 最高 '+Math.max(...gear.map(x=>x.level))+' 阶':'';}
      if(e.campaignRealm)return g.state.campaign?.cultivation?.breakthroughs?.includes(e.campaignRealm)?'已达此境':'';
      if(e.campaignEnding)return g.state.campaign?.ending===e.campaignEnding?'已达终局':'';
      if(e.campaignPartner)return g.state.campaign?.partnerId===e.campaignPartner?'已明确结契':'';
      if(e.campaignBody)return root.XiuxianCampaignState?.bodyMode(g.state.campaign)===e.campaignBody?'当前身体状态':'';
      if(e.campaignTask){const q=g.state.campaign?.tasks?.[e.campaignTask];return q?.claimed?'已结算':q?'进行中':'';}
      if(e.campaignSupply){const n=g.state.campaign?.supplies?.[e.campaignSupply]||0;return n?'任务携物 ×'+n:'';}
      if(e.campaignToken)return g.state.campaign?.tokens?.includes(e.campaignToken)?'已取得':'';
      if(e.campaignEvidence)return g.state.campaign?.evidence?.includes(e.campaignEvidence)?'已留证':'';
      if(e.campaign)return g.state.campaign?.started?'已启程':'';
      if(e.sectWorldQuest){const q=g.state.sectWorld?.[e.sectWorldQuest];return q?.claimed||q?.phase==='claimed'?'已结算':q&&(q.accepted||q.inspected||q.prepared||q.gathered?.length||q.choice)?'进行中':'';}
      if(e.sectWorld)return g.state.sectWorld?.visited?'已到访':'';
      if(e.sectId)return g.state.sect?.id===e.sectId?'已加入':'';
      if(e.sectPath){const level=g.state.sect?.id&&g.state.sect.levels[e.sectPath];return level?'已修 '+level+' 重':'';}
      if(e.sectSkill){const skill=g.sectSkillInfo?.(e.sectSkill);return skill?.learned?'已习得 · '+skill.level+' 重':'';}
      if(e.category==='skill'&&g.state.chapter.quests.includes(e.key))return '已习得';
      return '';
    }
    function icon(e,large=false){
      if(e.kind==='item')return A.icon(e.key,large?'catalog-art-large':'catalog-art');
      if(e.kind==='relic')return A.relic(e.key,1,large?'catalog-art-large':'catalog-art');
      return '<span class="catalog-seal" aria-hidden="true">'+esc(C.categories.find(c=>c.id===e.category)?.name.slice(0,1)||'录')+'</span>';
    }
    function detail(e){
      if(!e){$('catalog-detail').innerHTML='<p class="catalog-empty">换个关键词试试，或放宽分类与随身筛选。</p>';return;}
      $('catalog-detail').innerHTML=`<div class="catalog-detail-head">${icon(e,true)}<div><p class="eyebrow">${esc(C.categories.find(c=>c.id===e.category)?.name||'山中札记')}</p><h3>${esc(e.name)}</h3><p class="catalog-possession">${esc(possession(e)||'图鉴录目')}</p></div></div><p class="catalog-usage">${esc(e.usage)}</p><table class="catalog-stats"><caption>数值与作用</caption><tbody>${e.stats.map(s=>`<tr><th scope="row">${esc(s.label)}</th><td>${esc(s.value)}</td></tr>`).join('')}</tbody></table>${e.conditions.length?`<div class="catalog-conditions"><h4>生效条件与取舍</h4><ul>${e.conditions.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></div>`:''}`;
      $('catalog-detail').scrollTop=0;
    }
    function refresh(){
      const list=C.search(query,category).filter(e=>(spoilers||!e.spoiler)&&(!owned||possession(e)));
      if(!list.some(e=>e.id===chosen))chosen=list[0]?.id;
      $('catalog-count').textContent=`${list.length} 条可查 · ${spoilers?'包含剧情资料':'剧情信物已隐藏'}`;
      $('catalog-list').innerHTML=list.map(e=>`<button data-catalog-entry="${esc(e.id)}" aria-pressed="${e.id===chosen}" class="${e.id===chosen?'selected':''}">${icon(e)}<span><b>${esc(e.name)}</b><small>${esc(possession(e)||C.categories.find(c=>c.id===e.category)?.name||'')}</small></span></button>`).join('')||'<p class="catalog-empty">没有符合条件的条目。</p>';
      $('catalog-list').querySelectorAll('[data-catalog-entry]').forEach(b=>b.onclick=()=>{
        chosen=b.dataset.catalogEntry;
        $('catalog-list').querySelectorAll('button').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});
        detail(list.find(e=>e.id===chosen));
      });
      detail(list.find(e=>e.id===chosen));
    }
    function show(item){
      if(item){query='';category='all';owned=false;const e=C.entries.find(e=>e.kind==='item'&&e.key===item);chosen=e?.id;if(e?.spoiler)spoilers=true;}
      const g=game(),p=g?.combatProfile();
      openModal('catalog',`<div class="catalog-heading"><p class="eyebrow">山中万物 · 器物谱</p><h2 id="modal-title">知其性，尽其用</h2><p class="modal-subtitle">查药性、辨器用、核功法。</p></div>${p&&!g.isChild()?`<p class="catalog-profile">当前状态 <b>${esc(p.name)}</b> · 境界剑力 +${p.blade} · 基础术法 +${Math.round(p.spell*100)}% · 敌袭减伤 ${Math.round(p.defence*100)}% · 非格挡回灵 ${p.regenTotal.toFixed(1)}/秒</p>`:''}<div class="catalog-controls"><label>查找名称或用途<input id="catalog-search" type="search" placeholder="如：减速、回血、寒针" value="${esc(query)}" autocomplete="off" maxlength="100"></label><label>分类<select id="catalog-category"><option value="all">全部分类</option>${C.categories.map(c=>`<option value="${esc(c.id)}" ${category===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select></label><label class="catalog-check"><input id="catalog-owned" type="checkbox" ${owned?'checked':''} ${g?'':'disabled'}>只看已得器物与记录</label><label class="catalog-check"><input id="catalog-spoilers" type="checkbox" ${spoilers?'checked':''}>显示剧情信物（含剧透）</label></div><p id="catalog-count" class="catalog-count" role="status" aria-live="polite"></p><div class="catalog-columns"><nav id="catalog-list" aria-label="图鉴条目"></nav><article id="catalog-detail" aria-label="条目详情" tabindex="0"></article></div><div class="catalog-footer"><span>基础数值与加成分别列明；条件未满足时不会触发。</span><button id="catalog-close" class="secondary">收起器物谱</button></div>`);
      $('catalog-search').oninput=e=>{query=e.target.value;refresh();};
      $('catalog-category').onchange=e=>{category=e.target.value;refresh();};
      $('catalog-owned').onchange=e=>{owned=e.target.checked;refresh();};
      $('catalog-spoilers').onchange=e=>{spoilers=e.target.checked;refresh();};
      $('catalog-close').onclick=closeModal;refresh();
    }
    return {show};
  };
})(typeof globalThis!=='undefined'?globalThis:this);
