(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const C = node ? require('./chapter-data.js') : root.XiuxianChapterData;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function model(game, supplied) {
    if (!game?.state) return null;
    const status = supplied || game.campaignStatus?.() || {}, value = status.cultivation || {}, state = game.state;
    const body = status.body || game.bodyProfile?.() || {}, chapter = state.chapter || {}, child = game.isChild?.() || chapter.prologue === 'pending';
    const canCultivate = !child && body.canCultivate !== false, ended = !!state.campaign?.ending;
    const realm = body.name || value.name || game.profile?.()[1] || '修行中';
    const base = {realm: canCultivate ? realm.replace(/(初期|中期|后期|圆满)$/,'') : realm, stage: value.stageName || (canCultivate ? '初期' : ''), active: canCultivate, ended,
      history: body.historyRealmName || value.historyRealmName || '', mode: child ? 'child' : body.mode || 'cultivator',
      progress: 0, completed: 0, total: 0, nodes: [], conditions: [], next: '', action: null};
    if (child) return {...base, realm: '凡人', stage: '十岁 · 雨夜求生', next: '先生火暖身、收妥怀中旧物，再走近玄衡听他一言。', conditions: ['童年尚未开始正式修行。']};
    if (!canCultivate) return {...base, stage: body.mode === 'sealed' ? '封功休养' : '归凡生活', next: body.detail || '当前已不再运转灵力，昔日曾达境界与实修旧录悉数留存。', conditions: ['此状态下不再运气冲关，身体与起居规则以当前生活说明为准。']};
    if ((chapter.rank ?? 4) < 4) {
      const rank = chapter.rank || 0, path = C.paths[rank], cost = rank === 3 ? 2 : 1, insight = game.insight?.() || 0;
      const breath = chapter.breath || 0;
      return {...base, realm: '炼气', stage: ['初期','中期','后期','圆满'][rank], completed: breath, total: path.length,
        progress: breath / path.length, progressLabel: '本次运气',
        nodes: ['气海','膻中','百会','命门'].map((name, index) => ({name, complete: path.slice(0, breath).includes(index), current: path[breath] === index})),
        conditions: [`所需心得 ${cost} 点 · 当前 ${insight} 点${insight < cost ? ' · 尚缺 ' + (cost-insight) + ' 点' : ' · 已备足'}`,
          state.map === 'garden' && game.nearby?.('cultivate') ? '已经走近药庐蒲团，可按原有气路顺序运气。' : '需走近药庐中央蒲团，才能开始运气。'],
        next: '完成本次气路后进入' + C.ranks[rank + 1] + '。', action: ended ? null : {kind: 'chapter', panelId: 'cultivate', label: '查看蒲团运气'}};
    }
    const stages = value.stages || [], complete = stages.filter(stage => stage.status === 'complete').length;
    const pending = stages.find(stage => stage.status !== 'complete'), trials = status.trials || [];
    const trialInfo = trials.find(trial => !['claimed','complete','closed','locked'].includes(trial.status));
    const trial = trialInfo ? game.campaignTrialStatus?.(trialInfo.taskId) : status.trial;
    const preparation = trial?.preparation, nextStage = trial?.stages?.find(stage => !['claimed','complete','closed','locked'].includes(stage.status));
    const action = pending?.panelId ? {kind: 'campaign', panelId: pending.panelId, label: '查看本境实修'} :
      nextStage?.panelId ? {kind: 'campaign', panelId: nextStage.panelId, label: '查看冲关事务'} : null;
    const conditions = [], requirements=[];
    if (pending?.reason) conditions.push(pending.reason);
    else if (pending) conditions.push('本段现场条件已具备，仍需亲自确认实修与用料。');
    if (preparation?.reason && preparation.reason !== pending?.reason) conditions.push('冲关条件：' + preparation.reason);
    if (preparation?.gaps?.length) conditions.push('推荐准备尚差：' + preparation.gaps.map(gap => gap.label).join('、') + '；下方渡劫记录列出实际差值。');
    if (!conditions.length) conditions.push(value.ready ? '已具备当前所列的冲关条件，仍需到现场分段完成。' : '继续当前行程，按已知渡劫事务准备下一境。');
    const practice=root.XiuxianCampaignData?.cultivationStages?.[value.realmId]?.task;
    if(pending)requirements.push({ok:pending.status==='available',label:pending.name+' · '+(pending.reason||'已备齐现场条件'),task:practice,hint:'循标记前往本境实修登记处，核对用料与经历。'});
    if(preparation)requirements.push({ok:!!preparation.canAttempt,label:preparation.reason||'冲关现场条件已备齐',task:trial.taskId,hint:nextStage?.detail||'查看本境渡劫事务，依次完成分段历练。'});
    return {...base, requirements, stage: value.stageName || '初期', completed: complete, total: stages.length, progress: stages.length ? complete / stages.length : 0,
      progressLabel: '本境实修', nodes: [{name:'初期',complete:true,current:complete===0}, ...stages.map((stage,index) => ({name:stage.name,complete:stage.status==='complete',current:complete===index+1}))],
      conditions, next: value.next || '继续本境实修与当前行程。', action: ended ? null : action};
  }
  function render(game, status, {hideAction = false} = {}) {
    const value = model(game, status); if (!value) return '';
    if (value.ended) {
      value.conditions = ['本次行程已经收束，修为与实修记录保留。'];
      value.next = '可翻阅沿途旧录与终局收束；若想改走他路，请读回此前留存的恢复点，或另开一段新程。';
      value.action = null;
    }
    const percent = Math.max(0,Math.min(100,Math.round(value.progress*100))), radius = 104, circumference = 2*Math.PI*radius;
    const action = value.action && !hideAction ? `<button class="cultivation-next-action" ${value.action.kind === 'campaign' ? 'data-campaign-panel' : 'data-cultivation-chapter'}="${escape(value.action.panelId)}">${escape(value.action.label)}</button>` : '';
    const child = value.mode === 'child';
    const realms=['炼气','筑基','金丹','元婴','化神','大乘'];
    const intermediate=value.realm.includes('合体'),idx=intermediate?4:realms.findIndex(r=>value.realm.includes(r));
    const ladder='<ol class="realm-ladder" aria-label="六境修行总阶梯">'+realms.map((name,i)=>'<li class="'+(i<idx?'past':i===idx?'now':'mist')+'">'+(i<idx?'✓ ':i>idx?'◇ ':'')+(intermediate&&i===4?'化神 → 合体':name)+'</li>').join('')+'</ol>';
    const c=game.state.chapter,early=value.active&&!value.ended&&c.rank<4;
    const cost=c.rank===3?2:1,insight=game.insight(),near=game.state.map==='garden'&&game.nearby('cultivate');
    const row=(ok,label,hint,button)=>'<li class="'+(early?'focus-chip ':'')+(ok?'met is-met':'gap is-gap')+'"><strong>'+(ok?'✓ ':'✕ ')+escape(label)+'</strong>'+(ok?'':'<small>'+escape(hint)+'</small>'+button)+'</li>';
    const tracker=(key,label)=>'<button class="primary" data-track-goal="'+key+'">'+label+'</button>';
    const checks=early?row(insight>=cost,'所需心得 '+insight+' / '+cost+(insight<cost?'（尚缺 '+(cost-insight)+' 点）':''),'药庐取匣得 2 点，每门历练得 3 点。',game.state.flags.complete?tracker('practice','前往历练榜'):tracker('main','追踪药庐委托'))+
      row(near,'站位 · '+(near?'已在蒲团旁':'需走近药庐中央蒲团'),'蒲团在蜀山药庐正中。',tracker('pad','标出蒲团位置')):
      !value.ended&&value.requirements?.length?value.requirements.map(r=>row(r.ok,r.label,r.hint,r.task?'<button class="primary" data-track-goal="task" data-track-task="'+escape(r.task)+'">追踪现场事务</button>':tracker('main','追踪当前事务'))).join(''):
      value.conditions.map(t=>'<li>'+escape(t)+'</li>').join('');
    const instruction=early?(near&&insight>=cost?'按所示气路依次点穴，走完本轮即可晋阶。':'补齐上方 ✕ 条件后解锁运气。'):value.active&&!value.ended?'登记本境实修，按对应历练的现场条件冲关。':value.next;
    const person = child ? (root.XiuxianArt?.atlasIcon('chapterPeople',game.state.gender==='female'?0:1,'cultivation-child-person') || '<span class="cultivation-child-person">雨夜未尽，先护自身</span>') : '<img src="assets/art/cultivation-meditation.webp" alt="盘坐气脉的修行示意图" class="cultivation-person">';
    const flow = !child && value.active && !value.ended ? '<svg viewBox="0 0 260 300" class="cultivation-qi" aria-hidden="true"><path class="cultivation-qi-flow" pathLength="100" d="M130 181 L130 90 C130 107 110 101 109 120 C103 139 92 151 89 169 C95 180 114 179 130 181"/><path class="cultivation-qi-flow second" pathLength="100" d="M130 181 L130 90 C130 107 150 101 151 120 C157 139 168 151 171 169 C165 180 146 179 130 181"/><circle class="cultivation-dantian" cx="130" cy="181" r="6"/><circle class="cultivation-breakthrough" cx="130" cy="145" r="96"/></svg>' : '';
    const briefChips=early
      ?`<ul class="focus-chips cultivation-checks">${checks}</ul>`
      :value.requirements?.length
        ?value.requirements.map(r=>`<span class="focus-chip ${r.ok?'is-met':'is-gap'}">${r.ok?'✓':'✕'} ${escape(r.label.split(' · ')[0])}</span>`).join('')
        :`<span class="focus-chip is-info">◆ ${escape(value.realm)} · ${escape(value.stage)}</span>`;
    const briefCta=early
      ?''
      :(!value.ended&&value.requirements?.length?(()=>{const r=value.requirements.find(x=>!x.ok)||value.requirements[0];return r.task?'<button class="primary" data-track-goal="task" data-track-task="'+escape(r.task)+'">立即追踪本境事务</button>':tracker('main','追踪当前事务');})():'');
    const brief=`<section class="focus-brief clarity-paper-card" aria-label="此刻重点"><div class="focus-brief-main"><span class="focus-kicker">此刻重点 · 境界修行</span>${early?briefChips:`<div class="focus-chips">${briefChips}</div>`}<p class="focus-summary">${escape(instruction)}</p></div><div class="focus-brief-cta">${briefCta}</div></section>`;
    return `${ladder}${brief}<div class="cultivation-view ${value.active ? 'is-active' : 'is-resting'} ${child?'is-child':''} ${value.ended?'is-ended':''}" data-cultivation-view="${escape(value.mode)}"><div class="cultivation-figure"><svg viewBox="0 0 260 300" class="cultivation-orbit" aria-hidden="true"><circle class="cultivation-orbit-inner" cx="130" cy="145" r="89"/><circle class="cultivation-orbit-base" cx="130" cy="145" r="${radius}"/><circle class="cultivation-orbit-progress" cx="130" cy="145" r="${radius}" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference*(1-value.progress)}" transform="rotate(-90 130 145)"/>${[[130,41],[234,145],[130,249],[26,145]].map(([x,y],index)=>`<circle class="cultivation-orbit-node ${value.nodes[index]?.complete?'is-complete':''}" cx="${x}" cy="${y}" r="4"/>`).join('')}</svg>${person}${flow}<span class="cultivation-figure-caption">${value.active ? '凝神 · 内观' : '守身 · 养息'}</span></div><div class="cultivation-overview clarity-paper-card"><p class="cultivation-eyebrow">${value.active ? '如何突破到下一阶' : '当前身体与生活'}</p><h3>${escape(value.realm)} <span class="cultivation-stage">${escape(value.stage)}${!value.active && value.history && value.mode !== 'child' ? ' · 曾达 ' + escape(value.history) : ''}</span></h3>${value.total ? `<div class="cultivation-progress-label"><span>${escape(value.progressLabel)}节点</span><b>${value.completed} / ${value.total} 已完成</b></div><div class="cultivation-progress" role="progressbar" aria-label="${escape(value.progressLabel)}节点完成情况" aria-valuemin="0" aria-valuemax="${value.total}" aria-valuenow="${value.completed}" aria-valuetext="${value.completed} / ${value.total} 项已完成"><i style="width:${percent}%"></i></div><ol class="cultivation-stage-path">${value.nodes.map(item => `<li class="${item.complete ? 'is-complete' : ''} ${item.current ? 'is-current' : ''}"><i></i>${escape(item.name)}</li>`).join('')}</ol>` : ''}${early?'':`<div class="cultivation-conditions"><b>${value.active ? '当前条件与缺口' : '此刻状态'}</b><ul>${checks}</ul></div><p class="cultivation-next"><b>突破操作</b> ${escape(instruction)}</p>`}${action}<small class="cultivation-scope">${value.ended ? '终局已收束，修为与旧录俱存。' : '运气或办妥实修节点即可推进周天。'}</small></div></div>`;
  }
  const previous = new WeakMap();
  function transition(before, after) {
    if(!before || !after?.active || after.ended || !before.active) return '';
    const realms=['炼气','筑基','金丹','元婴','化神','合体','大乘'], stages=['初期','中期','后期','圆满'];
    if(before.realm !== after.realm) return realms.indexOf(after.realm)>realms.indexOf(before.realm)&&realms.includes(before.realm)?'breakthrough':'';
    return after.completed > before.completed || stages.indexOf(after.stage)>stages.indexOf(before.stage)&&stages.includes(before.stage) ? 'advance' : '';
  }
  function mount(container, game, options = {}) {
    if(!game) return;
    const nodes=[...container.querySelectorAll('.cultivation-view:not([data-motion-mounted])')];
    if(!nodes.length) return;
    const current=model(game);
    const kind=transition(previous.get(game),current), reduced=options.reducedMotion||root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    for(const element of nodes){
      element.dataset.motionMounted='true';if(kind&&!reduced)element.classList.add(kind==='breakthrough'?'is-breakthrough':'is-advancing');
      root.requestAnimationFrame?.(()=>{
        if(!element.isConnected)return;const panel=element.closest('#modal');if(!panel)return;
        // The campaign header and sticky footer share the small screen with the cultivation card.
        // Scroll only by the part of the figure or its action that falls behind the footer.
        const footer=panel.querySelector('.campaign-footer');
        if(!footer)return;
        const bottom=Math.min(panel.getBoundingClientRect().bottom,footer.getBoundingClientRect().top)-8;
        const targets=element.querySelectorAll('.cultivation-figure,.cultivation-next-action');
        const clipped=Math.max(0,...Array.from(targets,node=>node.getBoundingClientRect().bottom-bottom));
        if(clipped>0)panel.scrollTop+=clipped;
      });
    }
    previous.set(game,{realm:current.realm,stage:current.stage,completed:current.completed,active:current.active});
  }
  const api = {model, render, mount, transition};
  if (node) module.exports = api; else root.XiuxianCultivationView = api;
})(globalThis);
