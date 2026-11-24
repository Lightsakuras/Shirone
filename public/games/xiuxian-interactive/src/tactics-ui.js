(function(root){
  'use strict';
  const A=root.XiuxianArt,C=root.XiuxianChapterData,D=root.XiuxianData,R=root.XiuxianExpeditionData,E=root.XiuxianEngine;
  root.XiuxianTacticsUI=function(ctx){
    const {game,openModal,closeModal,save,drain,esc}=ctx,$=id=>document.getElementById(id);let pending=null;
    const percent=n=>Math.round(n*100)+'%';
    const enemyNote=(g,e)=>{const t=g.encounterInfo?.(e);return t?'<small class="enemy-armor-note">'+esc(t.name)+' · '+(t.broken?'护甲已破':Math.ceil(t.armor)+' / '+t.maxArmor)+'<br>'+esc(t.counter)+'</small>':'';};
    function show(keep=false){
      const previous=document.activeElement, scroll=keep?document.querySelector('.order-scroll')?.scrollTop||0:0;
      const focusKey=keep && previous?.closest('#modal') && Object.keys(previous.dataset).find(k=>['stance','target','order','sectOrder'].includes(k));
      const g=game();if(!g||g.isChild()||g.inCase()||g.state.hp<=0)return;if(!keep)pending=null;
      const p=g.combatProfile(),c=g.state.chapter,target=g.selectedEnemy(),enemies=g.visibleEnemies(),gear=g.equipped(),spiritual=g.canUseSpiritualPower();
      const items=['fire','needle','incense','ward','potion','tea','qingxin'].filter(id=>g.state.inventory[id]>0);
      const sectSkills=(g.sectStatus?.().skills||[]).filter(s=>s.learned);
      const skill=g.skillInfo(),chosen=pending?.type==='skill'?skill?.name:pending?.type==='sectSkill'?sectSkills.find(s=>s.id===pending.id)?.name:pending?D.items[pending.id].name:null;
      const order=pending?{...pending,target:target?.id}:null,reason=order?g.orderCheck(order):'';
      openModal('tactics',`<p class="eyebrow">静观 · 御敌 <span class="tactics-paused">山中已暂停</span></p><h2 id="modal-title">先观其势，再定一招</h2><p class="modal-subtitle">趁暂停观敌定策，点选主攻目标与下一招。</p>
        <div class="tactics-profile"><span class="current-portrait" data-portrait="${A.playerPortrait(g).key}">${A.portraitHTML(A.playerPortrait(g))}</span><div><h3>${p.name}</h3><p>气血 ${Math.ceil(g.state.hp)} / 100 · 灵力 ${Math.floor(g.state.mp)} / ${spiritual?100:0}</p><div class="tactics-numbers"><span>境界剑力 <b>+${p.blade}</b></span><span>基础术法 <b>+${percent(p.spell)}</b></span><span>敌袭减伤 <b>${percent(p.defence)}</b></span><span>非格挡回灵 <b>${p.regenTotal.toFixed(1)}/秒</b></span></div></div></div>
        <div class="tactics-stances" aria-label="御敌方式">${Object.entries(E.stances).map(([id,s])=>`<button data-stance="${id}" class="${g.stance()===id?'selected':''}" aria-pressed="${g.stance()===id}"><b>${s.name}</b></button>`).join('')}</div><p class="stance-description">${esc(E.stances[g.stance()].desc)}</p>
        <nav class="order-nav" aria-label="下令区"><button data-order-jump="order-enemies">场中敌情</button><button data-order-jump="order-items">功法与符药 ↓</button></nav><div class="order-scroll"><div class="tactics-columns"><section id="order-enemies"><h3>场中敌情</h3><p class="tactics-note">优先追击你点选的目标；「迎敌」姿态下仅自动接近 260 步内无障碍直达之敌，你的手动走位永远优先。</p><div class="tactics-targets">${enemies.map(e=>`<button data-target="${esc(e.id)}" class="${target===e?'selected':''}" aria-pressed="${target===e}"><span><b>${esc(e.name||'阵灵')}</b><small>气血 ${Math.ceil(e.hp)} / ${e.maxHp} · 相距 ${Math.round(E.distance(g.state,e))} 步 · ${e.x<g.state.x?'西':'东'}${e.y<g.state.y?'北':'南'}</small><meter min="0" max="${e.maxHp}" value="${e.hp}" aria-label="气血"></meter></span><em>${e.wind>0?(e.mode==='channel'?'正在聚阴 · 可打断':e.mode==='wave'?'刀气将至':'正在蓄力'):g.recoveryFor(e)>0?'正在收招':'尚在游走'}${g.sealFor(e)>0?' · 定脉待接符':''}${e.slow>0?' · 受寒减速':''}</em>${enemyNote(g,e)}</button>`).join('')||'<p class="tactics-empty">此处暂无敌情。可先查看修为与随身搭配。</p>'}</div></section>
        <section id="order-items"><h3>专长功法与符药</h3><label class="tactics-skill">Q 快捷功法<select id="tactics-skill" ${c.quests.length?'':'disabled'}>${c.quests.length?c.quests.map(id=>`<option value="${id}" ${c.skill===id?'selected':''}>${C.skills[id].name}</option>`).join(''):'<option>尚未习得</option>'}</select></label><p class="tactics-note">${skill?skill.detail+' '+skill.cost+' 灵力；'+(c.skillCd>0?'还需 '+c.skillCd.toFixed(1)+' 秒调息。':skill.cooldown+' 秒调息。'):'尚未修习入门功法。可在药庐西侧三门历练中习得，筑基后亦可跨修其余两门；若已修成宗门功法，可在下方独立选招。'}</p>
        <p id="order-preview" aria-live="polite"></p><div class="tactics-actions">${skill?`<button data-order="skill" class="${pending?.type==='skill'?'selected':''}">${A.atlasIcon('chapterProps',C.tokens[C.trial[c.skill].token].cell)}<span>${skill.name}<small>选为下一招</small></span></button>`:''}${items.map(id=>`<button data-order="${id}" title="${esc(D.items[id].desc)}" class="${pending?.id===id?'selected':''}">${A.icon(id)}<span>${D.items[id].name}<small>行囊 ${g.state.inventory[id]} · ${['fire','needle','incense'].includes(id)?'对选定目标':'作用于自身'}</small></span></button>`).join('')}</div></section></div>
        <div class="tactics-loadout"><h3>随身法宝 · ${spiritual?'实战生效':'当前停用'}</h3>${spiritual?'':'<p>当前不能运灵；法宝加成、器忆与共鸣已停用，下方保留收藏的原有效果。</p>'}${gear.map(x=>`<article>${A.relic(x.base,x.level)}<div><b>${R.relics[x.base].name} · ${R.tiers[x.level-1]}</b><p>${R.relics[x.base].desc} ${R.relics[x.base].values[x.level-1]}${x.memory?'；器忆 '+R.paths[x.memory].name:''}</p></div></article>`).join('')||'<p>当前未佩法宝。可前往后山旧阵寻宝收集；首章主线无需反复刷宝亦可顺畅通关。</p>'}<p>已成共鸣${spiritual?'':'（当前停用）'}：${g.resonances().map(id=>R.resonances[id].name).join('、')||'尚未成形'}</p></div>
        </div><div class="tactics-commit"><div><b>${chosen?'下一招：'+chosen:'尚未选择下一招'}</b><p id="tactics-reason">${reason||'点选「执行并继续」即刻出招。'}</p></div><button id="tactics-execute" class="primary" ${!pending||reason?'disabled':''}>执行并继续</button><button id="tactics-resume" class="secondary">只继续御敌</button></div><p id="inline-message" class="inline-message" role="status"></p>`);
      document.querySelectorAll('[data-stance]').forEach(b=>b.onclick=()=>{g.setStance(b.dataset.stance);save(true);show(true);});
      document.querySelectorAll('[data-target]').forEach(b=>b.onclick=()=>{g.selectEnemy(b.dataset.target);show(true);});
      if(sectSkills.length){
        const section=$('tactics-skill').closest('section');
        section.insertAdjacentHTML('beforeend',`<h3 class="tactics-sect-title">合欢宗 · 已修功法</h3><p class="tactics-sect-note">与专长功法共调息，执令即刻施展。</p><div class="tactics-sect-actions">${sectSkills.map(s=>{const reason=g.orderCheck({type:'sectSkill',id:s.id,target:target?.id});return `<button data-sect-order="${esc(s.id)}" class="${pending?.type==='sectSkill'&&pending.id===s.id?'selected':''}" aria-pressed="${pending?.type==='sectSkill'&&pending.id===s.id}"><b>${esc(s.name)} · ${s.level} 重</b><small>${esc(s.detail||s.desc)}</small><small>${s.cost} 灵力 · ${s.cooldown} 秒调息${s.range?' · 施展距离 '+s.range:''}</small>${reason?`<small class="sect-reason">${esc(reason)}</small>`:''}</button>`;}).join('')}</div>`);
        document.querySelectorAll('[data-sect-order]').forEach(b=>b.onclick=()=>{const top=$('modal').scrollTop,id=b.dataset.sectOrder;pending={type:'sectSkill',id};show(true);$('modal').scrollTop=top;document.querySelector(`[data-sect-order="${id}"]`)?.focus({preventScroll:true});});
      }
      document.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{pending=b.dataset.order==='skill'?{type:'skill'}:{type:'item',id:b.dataset.order};show(true);});
      document.querySelector('.order-scroll').scrollTop=scroll;
      if(focusKey) [...document.querySelectorAll('.tactics-stances button,.order-scroll button')].find(b=>b.dataset[focusKey]===previous.dataset[focusKey])?.focus({preventScroll:true});
      for(const button of document.querySelectorAll('[data-order]')){
        const describe=()=>{ $('order-preview').textContent=button.title||skill?.detail||''; };
        button.addEventListener('focus',describe);button.addEventListener('mouseenter',describe);
      }
      for(const jump of document.querySelectorAll('[data-order-jump]'))jump.onclick=()=>{
        const section=$(jump.dataset.orderJump);
        section.scrollIntoView({block:'start'});
        section.querySelector('button:enabled,select:enabled')?.focus({preventScroll:true});
      };
      for(const button of document.querySelectorAll('[data-order],[data-sect-order]')){
        const value=button.dataset.order;
        const command=button.dataset.sectOrder?{type:'sectSkill',id:button.dataset.sectOrder}:value==='skill'?{type:'skill'}:{type:'item',id:value};
        if(!g.orderCheck({...command,target:target?.id}))button.dataset.coachOrder='';
      }
      $('tactics-skill').onchange=e=>{g.setSkill(e.target.value);save(true);show(true);};
      $('tactics-resume').onclick=()=>{pending=null;closeModal();};
      $('tactics-execute').onclick=()=>{const command=pending&&{...pending,target:g.selectedEnemy()?.id};if(g.executeOrder(command)){pending=null;closeModal();save(true);drain();}else{drain();show(true);}};
    }
    function updateHUD(){const g=game();if(!g)return;$('tactics-open').disabled=g.isChild()||g.inCase()||g.state.hp<=0;$('tactics-state').textContent=g.isChild()?'童年 · 尚未修行':E.stances[g.stance()].name+' · '+(g.selectedEnemy()?.name||'未指定目标')+(g.stance()==='quiet'?' · 自主攻防已收起':'');}
    return {show,updateHUD};
  };
})(globalThis);
