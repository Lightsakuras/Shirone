(function(root){
  'use strict';
  const A=root.XiuxianArt;
  root.XiuxianCampaignUI=function({game,openModal,closeModal,save,drain,esc,beforeEndingAction,beforeCommitRecovery,recoveryStatus,showRecovery,showMap,exportRecord,returnToTitle,startSeparateJourney}){
    const $=id=>document.getElementById(id),words=value=>esc(value||'').replace(/\n/g,'<br>');
    const states={locked:'尚未开启',available:'可继续',active:'进行中',ready:'可交付',complete:'已完成',claimed:'已结算'};
    let current='hub',tab='journal',volume=null,journalFilter='current',trialId=null,pending=null,feedback='';
    const arrivals=new WeakMap();
    const stateText=value=>value.statusLabel||states[value.status]||'待查';
    function portrait(value,name){
      if(!value)return '';
      if(typeof value==='string')return `<img class="campaign-portrait" src="${esc(value)}" alt="${esc(name)}">`;
      if(value.atlas&&Number.isInteger(value.cell)&&A[value.atlas])return A.atlasIcon(value.atlas,value.cell,'campaign-portrait');
      return '';
    }
    function navigation(status){
      const tabs=[['journal','四卷行程'],['cultivation','修为与渡劫'],['evidence','随身证据'],['relationships','人物同行']];
      if(status.era||(status.journal||[]).some(task=>task.group))tabs.push(['chronicle','纪年与治事']);
      return `<nav class="campaign-tabs" aria-label="行程记录分类">${tabs.map(([id,label])=>`<button class="secondary ${tab===id?'selected':''}" data-campaign-tab="${id}" aria-pressed="${tab===id}">${label}</button>`).join('')}</nav>`;
    }
    function eraSummary(status){const era=status.era;if(!era)return '';return `<div class="campaign-era"><span>${esc(era.label||'此刻行程')}</span>${era.ageText?`<b>${esc(era.ageText)}</b>`:''}${era.sourceText?`<small>${words(era.sourceText)}</small>`:''}</div>`;}
    function decision(value){return `${value.choiceText?`<p class="campaign-choice">本次决定：${words(value.choiceText)}</p>`:''}${value.consequences?.length?`<ul class="campaign-consequences">${value.consequences.map(text=>`<li>${words(text)}</li>`).join('')}</ul>`:''}`;}
    function journey(status){
      const value=status.journey;if(!value)return '';const entries=value.entries||[];
      return `<div class="campaign-journey"><p class="campaign-kicker">当前去向</p><h3>${esc(value.title||'本次行程')}</h3>${value.detail?`<p>${words(value.detail)}</p>`:''}${entries.length?`<details class="campaign-journey-entries"><summary>查看已知去向与入口（${entries.length} 处）</summary><div>${entries.map(entry=>`<article class="campaign-route" data-campaign-journey="${esc(entry.id)}"><div class="campaign-task-head"><h3>${esc(entry.title)}</h3><span class="campaign-state">${esc(entry.statusLabel||(entry.available?'可办理':'当前不可办理'))}</span></div>${entry.locationText?`<p class="campaign-location">地点：${words(entry.locationText)}</p>`:''}${entry.reason?`<p class="campaign-reason">${words(entry.reason)}</p>`:''}${entry.panelId?`<button class="secondary" data-campaign-panel="${esc(entry.panelId)}">查看现场事务</button>`:''}</article>`).join('')}</div></details>`:''}</div>`;
    }
    function endingCoverage(status){
      const value=status.endingCoverage;if(!value)return '';const entries=value.seen||[],unknown=Number.isInteger(value.unrevealedCount)&&value.unrevealedCount>=0?value.unrevealedCount:null;
      return `<details class="campaign-ending-coverage"><summary>本次旅程的终局记录${entries.length?'（已见 '+entries.length+' 项）':''}</summary><p class="campaign-note">只录本档亲历收束${unknown===null?'。':'，另有 '+unknown+' 项尚待亲历。'}</p>${entries.map(entry=>`<article class="campaign-evidence-card" data-campaign-seen-ending><h3>${esc(entry.title)}</h3>${entry.summary?`<p>${words(entry.summary)}</p>`:''}${entry.sourceLabel?`<p class="campaign-source">${words(entry.sourceLabel)}</p>`:''}</article>`).join('')||'<p class="campaign-empty">本次旅程尚未抵达终局。</p>'}</details>`;
    }
    function chronicle(status){
      const era=status.era,entries=era?.entries||[],groups=[['governance','治理与兑现'],['war','战线先后与后果']];
      return `${eraSummary(status)}<p class="campaign-note">岁月只随办结之事流转，驻足翻卷不耗光阴。</p>${entries.length?`<details class="campaign-era-history"><summary>查看已历纪年（${entries.length} 条）</summary><ol class="campaign-timeline">${entries.map(entry=>`<li data-campaign-era="${esc(entry.id||'')}"><h3>${esc(entry.label||'行程记录')}</h3>${entry.ageText?`<p>${esc(entry.ageText)}</p>`:''}${entry.sourceText?`<p>${words(entry.sourceText)}</p>`:''}</li>`).join('')}</ol></details>`:''}<div class="campaign-governance">${groups.map(([group,title])=>{const tasks=(status.journal||[]).filter(task=>task.group===group&&task.status!=='locked');return tasks.length?`<div class="campaign-decision-group"><h3>${title}</h3>${tasks.map(task=>`<article class="campaign-task" data-campaign-decision="${esc(task.id)}"><div class="campaign-task-head"><h3>${esc(task.title)}</h3><span class="campaign-state">${esc(stateText(task))}</span></div><p>${words(task.detail)}</p>${decision(task)}${task.panelId?`<button class="secondary" data-campaign-panel="${esc(task.panelId)}">查看现场事务</button>`:''}</article>`).join('')}</div>`:'';}).join('')}</div>`;
    }
    function taskCard(q,status){
      const g=game(),notice=root.XiuxianGuide.taskNotice(g,q.id);
      if(!arrivals.has(g))arrivals.set(g,new Set());const seen=arrivals.get(g),fresh=!seen.has(q.id);seen.add(q.id);
      const trackable=['active','ready','available'].includes(q.status),tracked=notice?.tracked===true;
      const data=root.XiuxianCampaignData,action=g.campaignTaskStatus(data.tasks[q.id]).action;
      const map=action&&(data.maps[action.map]||root.XiuxianData.maps[action.map]);
      const object=action&&[...(map?.objects||[]),...data.entryObjects].find(o=>o.id===action.objectId);
      const route=trackable&&action?`<dl class="task-route"><dt>去哪</dt><dd>${esc(map?.name||'—')}</dd><dt>找谁</dt><dd>${esc(object?.name||action.objectId)}</dd><dt>怎么办</dt><dd>${esc(action.label)}</dd></dl><button data-task-map="${esc(action.map)}">在舆图上看</button>`:'';
      return `<article class="campaign-task ${tracked?'is-tracked':''} ${fresh?'is-new':''}" data-campaign-task="${esc(q.id)}"><div class="campaign-task-head"><p class="campaign-kicker">${esc(q.volumeLabel||status.chapterLabel||'行程')}</p><div class="campaign-task-signals">${notice?.unread?'<span class="task-unread" aria-label="任务记录有未读进展">未读</span>':''}<span class="campaign-state ${notice?.deliverable?'is-deliverable':''}" ${notice?.deliverable?'data-task-deliverable':''}>${esc(stateText(q))}</span></div></div><h3>${esc(q.title)}</h3>${route}<p>${words(q.detail)}</p>${decision(q)}<div class="buttons">${q.panelId?`<button class="secondary" data-campaign-panel="${esc(q.panelId)}" data-read-task="${esc(q.id)}">查看这件事</button>`:''}${trackable?`<button class="${tracked?'task-untrack secondary':'task-track'}" data-campaign-track="${esc(q.id)}" aria-pressed="${tracked}">${tracked?'取消追踪':'追踪这件事'}</button>`:''}</div></article>`;
    }
    function journal(status){
      const entries=(status.journal||[]).filter(task=>task.known!==false&&task.status!=='locked'),volumes=[...new Set(entries.map(q=>q.volumeLabel).filter(Boolean))];
      if(volume&&!volumes.includes(volume))volume=null;
      const urgent=q=>['active','ready','available'].includes(q.status),complete=q=>['claimed','complete'].includes(q.status),visible=entries.filter(q=>(!volume||q.volumeLabel===volume)&&(journalFilter==='all'||journalFilter==='finished'?journalFilter==='all'||complete(q):urgent(q))).sort((a,b)=>({active:0,ready:1,available:2}[a.status]??3)-({active:0,ready:1,available:2}[b.status]??3));
      const filters=[['current','当前可办',entries.filter(urgent).length],['all','全部已知事务',entries.length],['finished','已经办妥',entries.filter(complete).length]];
      return `${journey(status)}${eraSummary(status)}<p class="campaign-note">只记去向，办差仍须亲往现场。</p><div class="campaign-filters" aria-label="事务状态筛选">${filters.map(([id,label,count])=>`<button class="secondary ${journalFilter===id?'selected':''}" data-campaign-filter="${id}" aria-pressed="${journalFilter===id}">${label} <span>${count}</span></button>`).join('')}</div>${volumes.length>1?`<div class="campaign-volumes" aria-label="卷目筛选"><button class="secondary ${volume===null?'selected':''}" data-campaign-volume="">全部卷目</button>${volumes.map(v=>`<button class="secondary ${volume===v?'selected':''}" data-campaign-volume="${esc(v)}">${esc(v)}</button>`).join('')}</div>`:''}<div class="campaign-journal">${visible.map(q=>taskCard(q,status)).join('')||'<p class="campaign-empty">当前筛选下暂无事务。可切至“全部已知事务”查看后续条件与旧录。</p>'}</div>${endingCoverage(status)}`;
    }
    // Present rule projections without changing progression or battle eligibility.
    function practiceStages(value,body){
      const stages=value.stages||[];if(body?.canCultivate===false||!stages.length)return '';
      const labels={complete:'已修成',available:'当前可修',locked:'尚未具备',closed:'此路已关闭'};
      return `<section class="campaign-practice" data-campaign-practice><h3>本境实修</h3><p class="campaign-note">实修须备料亲往现场办理。</p><div class="campaign-trial-stages">${stages.map(stage=>`<article class="campaign-trial-stage" data-campaign-practice-stage="${esc(stage.id)}"><div class="campaign-task-head"><h3>${esc(stage.name)}</h3><span class="campaign-state">${esc(stage.statusLabel||labels[stage.status]||'待查')}</span></div>${stage.reason?`<p>${words(stage.reason)}</p>`:''}${stage.panelId?`<button class="secondary" data-campaign-panel="${esc(stage.panelId)}">查看实修事务</button>`:''}</article>`).join('')}</div></section>`;
    }
    function preparation(value){
      const p=value.preparation;if(!p)return '';
      const number=(n,gap)=>Number.isFinite(n)?String(Math.round(n*(gap.format==='percent'?100:1)*10)/10)+(gap.format==='percent'?'%':gap.unit?' '+gap.unit:''):'—';
      return `<section class="campaign-preparation" data-campaign-preparation><h3>冲关准备</h3><p>当前：<b data-preparation-current>${esc(p.currentName)}</b> · 推荐：<b data-preparation-recommended>${esc(p.recommendedName)}</b></p><p class="campaign-note">${words(p.detail||(p.ready?'已达到推荐实修准备。':'推荐圆满；满足现场条件时仍可提前冲关。'))}</p>${p.gaps?.length?`<ul>${p.gaps.map(gap=>`<li data-preparation-gap>${esc(gap.label)}：${esc(number(gap.current,gap))} → ${esc(number(gap.recommended,gap))}</li>`).join('')}</ul>`:''}<p class="campaign-note" data-preparation-reason>当前现场条件：${p.canAttempt?'已满足，可以入场。':words(p.reason||'尚未满足。')}</p>${p.panelId?`<button class="secondary" data-campaign-panel="${esc(p.panelId)}">查看实修事务</button>`:''}</section>`;
    }

    function trial(status){
      const trials=status.trials||[];if(trialId&&!trials.some(item=>item.taskId===trialId))trialId=null;
      const value=trialId?game().campaignTrialStatus?.(trialId):status.trial;if(!value?.stages?.length)return '';
      const picker=trials.length>1?`<label class="campaign-trial-picker">查看渡劫记录<select id="campaign-trial-select"><option value="">当前劫况</option>${trials.map(item=>`<option value="${esc(item.taskId)}" ${trialId===item.taskId?'selected':''}>${esc(item.title)} · ${esc(stateText(item))}</option>`).join('')}</select></label>`:'';
      return `${picker}<div class="campaign-trial"><div class="campaign-task-head"><h3>${esc(value.title||'渡劫进度')}</h3><span class="campaign-state">${value.safe?'可安全整备':'本场交战中'}</span></div>${value.detail?`<p>${words(value.detail)}</p>`:''}${preparation(value)}<div class="campaign-trial-stages">${value.stages.map((stage,i)=>`<article class="campaign-trial-stage" data-campaign-stage="${esc(stage.id)}"><p class="campaign-kicker">第 ${i+1} 段 · ${esc(stateText(stage))}</p><h3>${esc(stage.title)}</h3><p>${words(stage.detail)}</p>${stage.panelId?`<button class="secondary" data-campaign-panel="${esc(stage.panelId)}">查看本段情况</button>`:''}</article>`).join('')}</div><p class="campaign-note">战中按 V 暂停下令；各段整备与入阵须至现场办理。</p></div>`;
    }
    function cultivation(status){
      const value=status.cultivation||{},body=status.body,age=game()?.sectAge?.(),profile=value.profile||game()?.combatProfile?.()||{},number=(n,percent=false)=>Number.isFinite(n)?String(Math.round(n*(percent?100:1)*10)/10)+(percent?'%':''):'—';
      const metrics=[['blade','剑力加成',Number.isFinite(profile.blade)?'+'+number(profile.blade):'—'],['spell','术法增幅',Number.isFinite(profile.spell)?'+'+number(profile.spell,true):'—'],['defence','敌袭减伤',number(profile.defence,true)],['regenTotal','灵力回复',number(profile.regenTotal)+' / 秒']];
      const rules=Array.isArray(body?.rules)?body.rules:value.bodyRules||[],care=body?.care;
      return `${root.XiuxianCultivationView?.render(game(),status)||''}<article class="campaign-growth" data-campaign-cultivation="${esc(value.realmId||'foundation')}"><p class="campaign-kicker">${body?'当前有效身体与能力':'当前修为'}</p><h3 data-campaign-body>${esc(body?.name||value.name||profile.realmName||profile.name||'修行中')}</h3>${body?.mode&&Number.isFinite(age)?`<p class='campaign-body-age' data-body-mode='${esc(body.mode)}' data-body-appearance='${esc(body.appearance)}'>当前年龄：${age} 岁${body.appearance==='mortal-aged'?' · 归凡晚年':''}</p>`:''}${body?.detail?`<p>${words(body.detail)}</p>`:''}${body?.historyRealmName?`<p class="campaign-history-realm">曾达境界：<b>${esc(body.historyRealmName)}</b></p>`:''}<div class="campaign-metrics">${metrics.map(([id,label,result])=>`<div data-campaign-stat="${id}"><span>${label}</span><b>${esc(result)}</b></div>`).join('')}</div>${typeof value.source==='string'&&value.source?`<p class="campaign-source">${body?.canCultivate===false?'曾达依据':'突破依据'}：${words(value.source)}</p>`:''}${rules.length?`<div class="campaign-body-rules"><h3>身体与调息</h3><ul>${rules.map(rule=>`<li>${words(rule)}</li>`).join('')}</ul></div>`:''}${practiceStages(value,body)}${care?`<div class="campaign-body-care"><h3>${esc(care.title||'生活与照护')}</h3><p>${words(care.detail)}</p>${care.panelId?`<button class="secondary" data-campaign-panel="${esc(care.panelId)}">查看生活事务</button>`:''}</div>`:''}${value.next&&body?.canCultivate!==false?`<p class="campaign-next">下一步：${words(value.next)}${value.ready?' · 已具备当前所列条件，仍需现场完成。':''}</p>`:''}</article>${body?.canCultivate===false?'<p class="campaign-note">旧劫备查，当前能力以身体状态为准。</p>':''}${trial(status)}`;
    }
    function evidence(status){
      const entries=status.evidence||[];
      return `<p class="campaign-note">亲获证物独立收存，断案由你定夺。</p><div class="campaign-evidence">${entries.map(e=>`<article class="campaign-evidence-card" data-campaign-evidence="${esc(e.id)}"><h3>${esc(e.name)}</h3><p>${words(e.description)}</p>${e.source?`<p class="campaign-source">来源：${words(e.source)}</p>`:''}</article>`).join('')||'<p class="campaign-empty">尚未取得后续案卷的新证物。亲手查验后，来路与所见会记在此处。</p>'}</div>`;
    }
    function projectedPerson(p){
      const current=p.current,presence=p.presence,history=p.history,successor=p.successor;
      const panel=(id,label)=>id?`<button class='secondary' data-campaign-panel='${esc(id)}'>${label}</button>`:'';
      const age=current.ageText||(Number.isFinite(current.age)?current.age+' 岁':'');
      const identityName=current.id===history.id?history.name:'',currentLabel=current.name||identityName||'';
      const stageLabel=identityName?currentLabel.replace(identityName,'').replace(/^[\s·]+|[\s·]+$/g,''):'';
      const displayName=identityName&&currentLabel!==identityName&&(!currentLabel.includes(identityName)||currentLabel.startsWith('成年'))?identityName+(stageLabel?' · '+stageLabel:''):currentLabel;

      const past=`<details class='campaign-person-history' data-history-person='${esc(history.id)}'><summary>本人历史 · ${esc(history.stage||'未登记亲识')}</summary><div class='campaign-person-history-row'><figure class='campaign-history-portrait'>${portrait(history.portrait,history.name)}<figcaption>旧卷画像</figcaption></figure><div><h4>${esc(history.name)}</h4>${history.detail?`<p>${words(history.detail)}</p>`:''}${history.commitmentText?`<p class='campaign-commitment'>${words(history.commitmentText)}</p>`:''}${history.met&&p.adultText?`<p class='campaign-adult'>${words(p.adultText)}</p>`:''}${p.reason&&p.reason!==presence.reason?`<p class='campaign-reason'>${words(p.reason)}</p>`:''}</div></div></details>`;
      const next=successor?`<section class='campaign-successor' data-successor-person='${esc(successor.id)}'><p class='campaign-kicker'>今日接办者</p><div class='campaign-successor-row'>${portrait(successor.portrait,successor.name)}<div><h4>${esc(successor.name)}</h4>${successor.role?`<p>${words(successor.role)}</p>`:''}<p class='campaign-person-presence'>${esc(successor.presence.label)}${successor.met===false?' · 尚未登记亲识':''}</p>${successor.presence.reason?`<p class='campaign-reason'>${words(successor.presence.reason)}</p>`:''}${panel(successor.presence.panelId,'查看接办事务')}</div></div></section>`:'';
      return `<article class='campaign-person' data-person-projected data-campaign-person='${esc(p.id)}' data-current-person='${esc(current.id)}' data-person-life='${esc(current.life)}' data-person-presence='${esc(presence.state)}'>${portrait(current.portrait,displayName)}<div><p class='campaign-kicker'>当前情况</p><h3>${esc(displayName)}${age?`<small> · ${esc(age)}</small>`:''}</h3>${current.role?`<p>${words(current.role)}</p>`:''}<p class='campaign-person-presence'>${esc(presence.label)}</p>${presence.reason?`<p class='campaign-reason'>${words(presence.reason)}</p>`:''}${p.phaseDetail&&p.phaseDetail!==presence.reason?`<p class='campaign-source'>${words(p.phaseDetail)}</p>`:''}${panel(presence.panelId,'查看相关事务')}${past}${next}</div></article>`;
    }

    function relationships(status){
      const entries=status.relationships||[];
      return `<p class="campaign-note">同行厚薄分条记档；深交亦可只做挚友。</p><div class="campaign-relationships">${entries.map(p=>p.current&&p.history&&p.presence?projectedPerson(p):`<article class="campaign-person" data-campaign-person="${esc(p.id)}">${portrait(p.portrait,p.name)}<div><p class="campaign-kicker">${esc(p.stage||'同行记录')}</p><h3>${esc(p.name)}${p.ageText?`<small> · ${esc(p.ageText)}</small>`:Number.isFinite(p.age)?`<small> · ${p.age} 岁</small>`:''}</h3><p>${words(p.detail)}</p>${p.adultText?`<p class="campaign-adult">${words(p.adultText)}</p>`:''}${p.commitmentText?`<p class="campaign-commitment">${words(p.commitmentText)}</p>`:''}${p.phaseDetail?`<p class="campaign-source">${words(p.phaseDetail)}</p>`:''}${p.reason?`<p class="campaign-reason">${words(p.reason)}</p>`:''}${p.panelId?`<button class="secondary" data-campaign-panel="${esc(p.panelId)}">查看共同事务</button>`:''}</div></article>`).join('')||'<p class="campaign-empty">此页随亲身相识与同行经历添录；尚未照面之人不会提前显露。</p>'}</div>`;
    }
    function recoveryInfo(){return recoveryStatus?.()||{available:false,detail:'可从暂停菜单导入你保存过的行程记录。'};}
    function ending(status){
      const value=status.ending;if(!value)return '<p class="campaign-empty">本次行程尚未结束。</p>';
      const recovery=recoveryInfo();
      return `<article class="campaign-ending" data-campaign-ending><p class="campaign-kicker">本次行程已结束</p><h3>${esc(value.title)}</h3><p>${words(value.summary)}</p>${(value.recap||[]).map(item=>`<div class="campaign-ending-recap"><h3>${esc(item.title)}</h3><p>${words(item.text)}</p></div>`).join('')}<p class="campaign-note">本程已收束。可导出留念，或择恢复点重走岔路。</p><p class="campaign-recovery-detail">${words(recovery.detail)}</p>${value.canStartSeparateJourney?'<p class="campaign-separate-note">另开新程会完整封存本档，新角色独立记档。</p>':''}<div class="campaign-ending-buttons"><button id="campaign-ending-journal" class="secondary">回看行程</button>${exportRecord?'<button id="campaign-ending-export" class="secondary">导出本次记录</button>':''}<button id="campaign-ending-recovery" class="secondary" ${recovery.available&&showRecovery?'':'disabled'}>从恢复点续行</button>${value.canStartSeparateJourney&&startSeparateJourney?'<button id="campaign-ending-separate" class="secondary">另开独立旅程</button>':''}${returnToTitle?'<button id="campaign-ending-title" class="secondary">返回首页</button>':''}</div></article>${endingCoverage(status)}`;
    }
    function materials(status){
      const entries=status.materials||[];if(!entries.length)return '';
      return `<div class="campaign-materials"><h3>当前随身</h3><div class="campaign-stock">${entries.map(m=>`<span data-campaign-material="${esc(m.id)}"${m.purpose?` title="${esc(m.purpose)}"`:''}>${esc(m.name)} <b>${m.count}</b></span>`).join('')}</div></div>`;
    }
    function actions(items){
      if(!items.length)return '';
      return `<div class="campaign-actions">${items.map(a=>{
        const detail=a.detail===a.label?'':a.detail?.startsWith(a.label+'；')?a.detail.slice(a.label.length+1):a.detail;
        return `<article class="campaign-action" data-permanent="${!!(a.endingStage||a.recoveryKind)}"><div><h3>${esc(a.label)}</h3>${detail?`<p>${words(detail)}</p>`:''}${a.reason?`<p class="campaign-reason">${words(a.reason)}</p>`:''}</div><button class="${a.available?'primary':'secondary'}" data-campaign-action="${esc(a.id)}" ${a.available?'':'disabled'}>${esc(a.label)}</button></article>`;
      }).join('')}</div>`;
    }
    function confirmation(action){
      const note=action.confirm||{},extra=action.detail&&note.text?.startsWith(action.detail)?note.text.slice(action.detail.length).trim():note.text,title=note.title&&note.title!=='确认本次选择'?note.title:'确认：'+action.label;
      const kind=action.recoveryKind||(action.endingStage?'ending':null),stage=action.recoveryStage||action.endingStage;
      const boundaries={ending:{choice:'定下此念前会自动留档，回头随时可改道。',claim:'确认即收束本程，执行前自动留存恢复点。'},vow:{choice:'记下回应前自动留档；正式结契须双方随后共认。',claim:'双方心意已合，执行前自动留存恢复点。'},mortal:{choice:'记下归凡之念并自动留档，正式散功须在现场施行。',claim:'确认即散功归凡，旧境与收藏俱存，执行前自动留档。'}};
      const boundary=boundaries[kind]?.[stage]||'';
      return `<div class="campaign-confirm"><p class="campaign-kicker">尚未执行</p><h3>${esc(title)}</h3><p>${words(action.detail)}</p>${extra?`<p>${words(extra)}</p>`:''}${boundary?`<p class="campaign-ending-boundary">${words(boundary)}</p>`:''}${action.reason?`<p class="campaign-reason">${words(action.reason)}</p>`:''}<div class="buttons"><button id="campaign-confirm" class="primary" ${action.available?'':'disabled'}>${esc(note.label||'确认这次选择')}</button><button id="campaign-cancel" class="secondary">暂缓，返回查看</button></div></div>`;
    }
    function memoryBanner(status){return status.memory?`<aside class="campaign-memory" role="note"><strong>回忆：${esc(status.memory.title)}</strong><p>重现当年旧景；今时去向见本程记录。</p></aside>`:'';}
    function render(){
      const g=game();if(!g)return;
      const status=g.campaignStatus(),isEnding=current==='ending',panel=current==='hub'||isEnding?null:g.campaignPanel(current);
      const action=pending&&panel?.actions.find(a=>a.id===pending);
      if(pending&&!action)pending=null;
      let body;
      if(action)body=confirmation(action)+materials(status);
      else if(isEnding)body=ending(status);
      else if(current==='hub')body=navigation(status)+(tab==='cultivation'?cultivation(status):tab==='evidence'?evidence(status):tab==='relationships'?relationships(status):tab==='chronicle'?chronicle(status):journal(status));
      else body=`<div class="campaign-copy">${words(panel.text)}</div>${materials(status)}${actions(panel.actions||[])}`;
      openModal('campaign',`<div class="campaign-page"><p class="eyebrow">山河行程 · ${status.ending?'只读回看':'已暂停'}</p><h2 id="modal-title">${esc(isEnding?status.ending?.title||'行程终章':panel?.title||status.title||'山河行程')}</h2><p class="modal-subtitle">${esc(isEnding?'所行有迹，所择有归':panel?.subtitle||status.subtitle||'亲历之事，自有留痕')}</p>${memoryBanner(status)}${feedback?`<p class="campaign-feedback" role="status">${words(feedback)}</p>`:''}${body}<p id="inline-message" class="inline-message" role="status"></p>${isEnding?'':`<div class="campaign-footer"><p>${esc(status.chapterLabel||'行程待续')}<small>随身证据 ${(status.evidence||[]).length} 份 · 人物记录 ${(status.relationships||[]).length} 位</small></p><div class="buttons">${current!=='hub'?'<button id="campaign-hub" class="secondary">查看行程记录</button>':''}${showRecovery?'<button id="campaign-recovery" class="secondary">查看恢复点</button>':''}<button id="campaign-close" class="secondary">${status.ending?'回看终局':'返回山行'}</button></div></div>`}</div>`);
      document.querySelectorAll('[data-task-map]').forEach(b=>b.onclick=()=>showMap(b.dataset.taskMap));
      if($('campaign-close'))$('campaign-close').onclick=status.ending?()=>show('ending'):closeModal;
      if($('campaign-recovery'))$('campaign-recovery').onclick=()=>showRecovery();
      if($('campaign-hub'))$('campaign-hub').onclick=()=>show('hub');
      document.querySelectorAll('[data-campaign-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.campaignTab;if(tab==='cultivation')trialId=null;current='hub';pending=null;feedback='';render();});
      document.querySelectorAll('[data-campaign-volume]').forEach(b=>b.onclick=()=>{volume=b.dataset.campaignVolume||null;render();});
      document.querySelectorAll('[data-campaign-filter]').forEach(b=>b.onclick=()=>{journalFilter=b.dataset.campaignFilter;render();});
      document.querySelectorAll('[data-campaign-panel]').forEach(b=>b.onclick=()=>{if(b.dataset.readTask)root.XiuxianGuide.markTaskRead(g,b.dataset.readTask);show(b.dataset.campaignPanel);});
      document.querySelectorAll('[data-campaign-track]').forEach(b=>b.onclick=()=>{const id=b.dataset.campaignTrack,tracked=root.XiuxianGuide.trackedTask(g)===id;if(root.XiuxianGuide.trackTask(g,tracked?null:id)){feedback=tracked?'已取消这件事的追踪。':'已追踪此事；返回山行后可循沿途路标与现场记号前往。';render();drain();}});
      document.querySelectorAll('[data-cultivation-chapter]').forEach(b=>b.onclick=()=>{game().panel(b.dataset.cultivationChapter);drain();});
      document.querySelectorAll('[data-campaign-action]').forEach(b=>b.onclick=()=>{
        const a=g.campaignPanel(current).actions.find(a=>a.id===b.dataset.campaignAction);
        if(!a)return;
        if(a.confirm||a.endingStage||a.recoveryKind){pending=a.id;feedback='';render();}else commit(a.id);
      });
      if($('campaign-cancel'))$('campaign-cancel').onclick=()=>{pending=null;render();};
      if($('campaign-confirm'))$('campaign-confirm').onclick=()=>commit(pending);
      if($('campaign-trial-select'))$('campaign-trial-select').onchange=event=>{trialId=event.target.value||null;render();};
      if($('campaign-ending-journal'))$('campaign-ending-journal').onclick=()=>show('journal');
      if($('campaign-ending-export'))$('campaign-ending-export').onclick=()=>exportRecord();
      if($('campaign-ending-recovery'))$('campaign-ending-recovery').onclick=()=>{if(recoveryInfo().available)showRecovery?.();};
      if($('campaign-ending-title'))$('campaign-ending-title').onclick=()=>returnToTitle();
      if($('campaign-ending-separate'))$('campaign-ending-separate').onclick=()=>startSeparateJourney();
    }
    function commit(id){
      const g=game(),action=g?.campaignPanel(current).actions.find(a=>a.id===id);if(!g||!action)return;
      if(!action.available){pending=null;feedback=action.reason||'当前条件尚未满足。';render();return;}
      if(action.recoveryKind||action.endingStage){const kind=action.recoveryKind||'ending',guard=beforeCommitRecovery||(kind==='ending'?beforeEndingAction:null);let backedUp=false;try{backedUp=guard?.(action)===true;}catch{}if(!backedUp){pending=null;feedback='未能保存本次恢复点，选择或交付暂未执行。请先导出当前行程备份，再行重试。';render();return;}}
      const ok=action.travelId?g.campaignTravel(action.travelId):g.campaignAction(id);pending=null;
      if(ok)save(true);
      if(ok&&action.closeOnSuccess){feedback='';closeModal();drain();return;}
      feedback=g.events?.filter(event=>event.type==='message').at(-1)?.text||(ok?'本次行事已记。':'本次未执行，请查看行动条件。');render();drain();
    }
    function show(panel='hub'){
      if(['journal','cultivation','evidence','relationships','chronicle'].includes(panel)){current='hub';tab=panel;if(panel==='cultivation')trialId=null;}
      else{current=panel;if(panel!=='hub')tab='journal';}
      pending=null;feedback='';render();
    }
    return {show};
  };
})(globalThis);
