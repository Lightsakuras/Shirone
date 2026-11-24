(function(root){
  'use strict';
  const C=root.XiuxianChapterData,A=root.XiuxianArt,D=root.XiuxianData,R=root.XiuxianExpeditionData;
  root.XiuxianChapterUI=function(ctx){
    const {game,openModal,closeModal,save,drain,exportFile}=ctx,$=id=>document.getElementById(id);
    const icon=(cell,atlas='chapterProps')=>A.atlasIcon(atlas,cell);
    const btn=(id,text,primary=false,disabled=false)=>`<button id="${id}" class="${primary?'primary':'secondary'}" ${disabled?'disabled':''}>${text}</button>`;
    const assist=root.XiuxianPuzzleAssist;
    function guided(key,selector,hint,answer){
      const anchor=document.querySelector(selector);if(!anchor||!anchor.querySelector('button:enabled')&&!anchor.matches('button:enabled'))return;
      assist.mount(key,{anchor:anchor.matches('button')?anchor.parentElement:anchor,hint,targets:()=>{const [target,step]=answer();return [[target,step?'第 '+step+' 步':'选这个']];}});
    }
    function frame(title,body,actions='',portrait){
      openModal('chapter',`<p class="eyebrow">山河有迹 · 首章</p><h2 id="modal-title">${title}</h2>${portrait?`<div class="chapter-dialogue"><img src="assets/portraits/${portrait}.webp" alt="${title}"><div>${body}</div></div>`:body}<div class="buttons">${actions}${btn('chapter-close','继续山行')}</div><p id="inline-message" class="inline-message" role="status"></p>`);$('chapter-close').onclick=closeModal;
    }
    const commit=()=>{save(true);drain();};
    const backgroundSummary=g=>{const b=g.backgroundStatus?.();return b?`<p class="background-note">身世：${b.name} · 阵营：${b.faction}${b.legacy?' · 保留原有经历':''}。详细去向与凭物可从上方「身世与立场」查看。</p>`:'';};
    const tokenDescription=(g,id,t)=>id==='swordSeal'&&g.state.background&&!g.state.background.legacy&&g.state.background.id!=='rain'?'清微交付的同案行事信物，用于安顿救援与共核物证。':t.desc;
    function action(id,fn,next){if(!$(id))return;$(id).onclick=()=>{const ok=fn();if(ok){if(next)next();else closeModal();}commit();};}
    function overview(){
      const g=game(),c=g.state.chapter,t=c.tomb;
      const steps=[['雨夜与玄衡',c.prologue!=='pending'],['药庐取匣',g.state.flags.complete],['成长经历任务',c.quests.length>0],['三年修行 · 筑基',c.rank===4],['青阳查案',g.state.story.stage==='forest'],['机关与救援',t.children.length===4],['破邪与狐簪',g.hasToken('foxHairpin')],['归镇封存物证',t.sealed],['回山呈证',c.complete]];
      frame(c.complete?'首章已收束':'这一程，走到哪里',backgroundSummary(g)+`<div class="chapter-progress">${steps.map(([name,done],i)=>`<div class="${done?'done':''}"><b>${done?'✓':i+1}</b><span>${name}</span></div>`).join('')}</div><p class="modal-subtitle">${g.objective().join(' · ')}</p><div class="chapter-summary"><span>境界：${g.profile().join(' · ')}</span><span>经历任务：${c.quests.length}/3</span><span>独立信物：${c.tokens.length}</span></div>`,btn('chapter-study','修行与功法')+btn('chapter-keepsakes','人物与信物')+(c.complete?btn('chapter-end','查看首章回顾',true):''));
      $('chapter-study').onclick=()=>show('cultivate');$('chapter-keepsakes').onclick=keepsakes;if($('chapter-end'))$('chapter-end').onclick=ending;
    }
    function keepsakes(){
      const g=game(),c=g.state.chapter;
      if(g.isChild()){frame('怀里的旧物',backgroundSummary(g)+`<p class="dialogue-text">${g.hasToken('locket')?'长命锁已贴身收妥。这是父母留下的念想，也是你在雨夜里撑下去的凭据。':'先检查怀里的长命锁，把父母留下的旧物收好。'}</p>${g.hasToken('locket')?icon(11,'chapterPeople'):''}`);return;}
      frame('信物有来处，牵挂有归处',backgroundSummary(g)+`<p class="modal-subtitle">旧物贴身珍藏，情谊随行自证。</p><div class="chapter-bonds"><article><h3>沈灵薇 · 信任 ${g.state.bond}</h3><p>${c.shenGift==='close'?'你已亲手赠出木簪，约好往后山路同行。':c.shenGift==='friend'?'亲手削成木簪，赠予可托后背的同门。':'可在药庐树下歇息、削磨木簪，成簪后亲手交予她。'}</p></article><article><h3>凝霜 · 记忆 ${c.ningBond}</h3><p>${c.ningChoice==='promise'?'你应下她的嘱托，替她再看一眼蜀山的月亮。':c.ningChoice==='respect'?'你接过她的遗托，替三百年前的旧案守住铁证。':'汉墓深处那道白影，还有半句没来得及说尽的话。'}</p></article></div><div class="keepsake-grid">${c.tokens.map(id=>{const t=C.tokens[id];return `<article>${icon(t.cell,t.atlas)}<h3>${t.name}</h3><p>${tokenDescription(g,id,t)}</p></article>`;}).join('')}</div>${c.tomb.rescued&&!c.homecoming?'<p class="modal-subtitle">汉墓归来，可在药庐灯下与沈灵薇叙话。</p>':''}`,c.homecoming?btn('homecoming-replay','重看归山灯下'):'');if($('homecoming-replay'))$('homecoming-replay').onclick=()=>show('sisterAfter');
    }
    function cultivation(inspect){
      const g=game(),c=g.state.chapter,names=['气海','膻中','百会','命门'];
      const skills=Object.fromEntries(Object.keys(C.skills).map(id=>[id,g.skillInfo?.(id)||C.skills[id]]));
      const shown=inspect||c.skill||g.state.origin, current=skills[c.skill];
      const difference=sk=>!current||sk.cost===current.cost?'':'<span class="delta-'+(sk.cost<current.cost?'up':'down')+'">'+(sk.cost<current.cost?'▲ 少耗':'▼ 多耗')+Math.abs(sk.cost-current.cost)+' 灵力</span>';
      frame('把每一次历练，化作自身修为',`${root.XiuxianCultivationView?.render(g,undefined,{hideAction:true})||''}${c.rank<4?`<p class="modal-subtitle">循此气路依次导引：${C.paths[c.rank].map((v,i)=>`<b class="${i<c.breath?'breath-done':''}">${names[v]}</b>`).join(' → ')}。接错可重起周天。</p><div class="breath-grid">${names.map((n,i)=>btn('breath-'+i,n,i===C.paths[c.rank][c.breath],!g.nearby('cultivate')||g.insight()<(c.rank===3?2:1))).join('')}</div>`:'<p class="modal-subtitle">清微已授下蜀山剑印。既可即刻下山赴青阳查案，也可留山把其余两门历练修完。</p>'}${g.combatProfile?`<p class="modal-subtitle">当前境界：剑力 +${g.combatProfile().blade} · 术法 +${Math.round(g.combatProfile().spell*100)}% · 护体 ${Math.round(g.combatProfile().defence*100)}% · 非格挡回灵 ${g.combatProfile().regenTotal.toFixed(1)}/秒。按 V 可暂停观敌下令。</p>`:""}<div class="skill-grid folio-layout"><nav class="folio-list">${Object.entries(skills).map(([id,sk])=>`<button data-skill-view="${id}" aria-pressed="${id===shown}">${sk.name}</button>`).join('')}</nav><div>${Object.entries(skills).map(([id,sk])=>`<article ${id===shown?'':'hidden'}>${icon(C.tokens[C.trial[id].token].cell)}<h3>${sk.name}</h3><h4>何时用</h4><p>${sk.cost} 灵力 · ${sk.cooldown} 秒调息 ${difference(sk)}</p><h4>用了会怎样</h4><p>${sk.detail||sk.desc}</p><h4>来源</h4><p>${C.trial[id].name}</p><button data-skill="${id}" ${c.quests.includes(id)?'':'disabled'}>${c.skill===id?'当前功法':c.quests.includes(id)?'选为快捷功法':'需完成对应经历'}</button></article>`).join('')}</div></div>`,btn('to-practice','查看三门历练'));
      for(const b of document.querySelectorAll('[data-skill-view]')) b.onclick=()=>{cultivation(b.dataset.skillView);document.querySelector('[data-skill-view="'+b.dataset.skillView+'"]').focus();};
      const breathGrid=document.querySelector('#modal-content .breath-grid'),artPanel=document.querySelector('#modal-content .cultivation-overview');
      if(breathGrid&&artPanel){const route=breathGrid.previousElementSibling,anchor=artPanel.querySelector('.cultivation-scope');if(route?.classList.contains('modal-subtitle')){route.classList.add('cultivation-breath-route');artPanel.insertBefore(route,anchor);}artPanel.insertBefore(breathGrid,anchor);}
      guided('breath','.breath-grid','跟着气路逐穴点过，点错可以重来。',()=>['#breath-'+C.paths[c.rank]?.[c.breath],c.breath+1]);
      for(let i=0;i<4;i++)if($('breath-'+i))$('breath-'+i).onclick=()=>{assist.record('breath',g.breathe(i));cultivation();commit();};
      document.querySelectorAll('[data-skill]').forEach(b=>b.onclick=()=>{g.setSkill(b.dataset.skill);cultivation();commit();});$('to-practice').onclick=()=>practice();
    }
    function practice(selected){
      const g=game(),c=g.state.chapter,id=selected||g.state.origin,def=C.trial[id];
      const content=c.quests.includes(id)?`<p class="dialogue-text">这一门已经习得。${C.tokens[def.token].desc}</p>`:id==='sword'?`<p class="dialogue-text">${def.desc}<br>木傀出手时按住右键格挡。试剑点到即止、不会致命，可随时暂停或收剑。</p>${btn('start-sword','开始试剑',true,!g.canPractice(id)||!g.nearby('practiceBoard'))}`:id==='medicine'?`<p class="modal-subtitle">方子：先认出白脉对生的清心草，再按「青灵草 → 泉水 → 青灵草」投料，以文火慢研。</p><div class="herb-choice">${[['narrow',4,'props','细叶草'],['whitevein',10,'chapterProps','白脉对生草'],['moon',10,'echoes','月露草']].map(([k,cell,atlas,name])=>`<button data-herb="${k}" ${g.canPractice(id)&&g.nearby('practiceBoard')?'':'disabled'}>${icon(cell,atlas)}<span>${name}</span></button>`).join('')}</div><p>${c.herb?'已辨出清心草':'尚未辨药'} · 配伍 ${c.mixture}/3</p><div class="medicine-pot">${icon(18)}</div><label for="medicine-heat">文火 35–60 <output id="heat-value">45</output></label><input id="medicine-heat" type="range" min="0" max="100" value="45"><div class="buttons">${btn('mix-herb','放入青灵草',false,!c.herb)}${btn('mix-water','添入泉水',false,!c.herb)}</div>`:`<p class="modal-subtitle">纸上旧记方位为：东、西、南。点击拨转三面阵盘，令指针刻度逐一合位。</p><div class="disc-grid">${c.discs.map((v,i)=>`<button data-disc="${i}" ${g.canPractice(id)&&g.nearby('practiceBoard')?'':'disabled'}><span style="transform:rotate(${v*90}deg)">${icon(9)}</span><b>${['北','东','南','西'][v]}</b></button>`).join('')}</div>`;
      frame(def.name,`<div class="collection-tabs">${Object.entries(C.trial).map(([key,v])=>`<button data-practice-tab="${key}">${D.origins[key].name}${c.quests.includes(key)?' ✓':''}</button>`).join('')}</div><p class="modal-subtitle">出身对应历练先行开放；待筑基或修得旁门专长后，可再习另外两门。请走近药庐西侧历练碑办理。</p>${content}`);
      document.querySelectorAll('[data-practice-tab]').forEach(b=>b.onclick=()=>practice(b.dataset.practiceTab));action('start-sword',()=>g.startPractice('sword'));
      guided('medicine','.herb-choice','先看叶脉。辨对后，用草夹着一份水，炉温保持文火。',()=>c.herb?['#mix-'+g.practiceAnswer('mix'),c.mixture+2]:['[data-herb="'+g.practiceAnswer('herb')+'"]',1]);
      guided('scholar','.disc-grid','每点一次顺转一格，已合位的阵盘留在原处。',()=>{const i=c.discs.findIndex((v,i)=>v!==g.practiceAnswer('discs')[i]);return ['[data-disc="'+i+'"]',i+1];});
      document.querySelectorAll('[data-herb]').forEach(b=>b.onclick=()=>{assist.record('medicine',g.chooseHerb(b.dataset.herb));practice('medicine');commit();});
      if($('medicine-heat')){$('medicine-heat').oninput=e=>$('heat-value').value=e.target.value;for(const k of ['herb','water'])$('mix-'+k).onclick=()=>{assist.record('medicine',g.mixMedicine(k,Number($('medicine-heat').value)));practice('medicine');commit();};}
      document.querySelectorAll('[data-disc]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.disc);assist.record('scholar',i===c.discs.findIndex((v,j)=>v!==g.practiceAnswer('discs')[j]));g.rotateDisc(i);practice('scholar');commit();});
    }
    function rest(){
      const g=game(),c=g.state.chapter;
      frame('树下留一盏温茶',`<p class="dialogue-text">${g.state.gender==='female'?'山行历练之余，也别亏待自身。炼气与筑基时尚未辟谷绝尘；若逢行经或身乏，可饮茶调养，也可按自己的步调前行。':'历练间隙不妨在树下歇脚饮茶，调匀气息、理清行囊再动身。'}</p><div class="buttons">${['tea','rest','skip'].map((id,i)=>btn('care-'+id,['温茶调养','静坐休整','这次略过'][i],false,!!c.care)).join('')}</div><div class="carving">${icon(c.carving===3?14:14,c.carving===3?'chapterPeople':'chapterProps')}<div><h3>亲手削一支桃木簪</h3><p>顺纹削整 → 磨光 → 收尾。${g.hasToken('peachBlank')?'进度 '+c.carving+'/3':'完成任一经历任务，可得雷击桃木簪坯。'}</p><div class="buttons">${['grain','polish','finish'].map((id,i)=>btn('carve-'+id,['顺纹削整','磨光','收尾'][i],false,!g.hasToken('peachBlank')||c.carving===3)).join('')}</div></div></div>`);
      for(const id of ['tea','rest','skip'])action('care-'+id,()=>g.restCare(id),rest);guided('carve','.carving','顺着木纹下刀，再把棱角磨圆，最后收光。',()=>['#carve-'+g.practiceAnswer('carve'),c.carving+1]);
      for(const id of ['grain','polish','finish'])$('carve-'+id).onclick=()=>{assist.record('carve',g.carve(id));rest();commit();};
    }
    function puzzleSequence(title,text,cell,choices,submit,key){
      const pattern=game().tombPattern(key);
      let selected=[];frame(title,`<div class="case-inspect">${icon(cell)}<p class="dialogue-text">${text}</p></div><p id="sequence-value" class="sequence-value">尚未操作</p><div class="buttons">${choices.map(([id,label])=>btn('seq-'+id,label)).join('')}</div>`,btn('sequence-reset','重新来'));
      guided(key,'#seq-'+choices[0][0],key==='arrows'?'沿石上刻痕拨轴。':'先稳住桥头，桥面和绳结才有着力处。',()=>['#seq-'+pattern[selected.length],selected.length+1]);
      for(const [id] of choices)$('seq-'+id).onclick=()=>{
        if(id!==pattern[selected.length]){selected=[];$('sequence-value').textContent='位置不合，回到第一步。';assist.record(key,false);return;}
        selected.push(id);assist.record(key,true);$('sequence-value').textContent=selected.map(k=>choices.find(v=>v[0]===k)[1]).join(' → ');if(selected.length===pattern.length){const ok=submit(selected.join('-'));if(ok)closeModal();else selected=[];commit();}};$('sequence-reset').onclick=()=>{selected=[];$('sequence-value').textContent='尚未操作';assist.refresh(key);};
    }
    function bossReward(){const g=game();frame('邪气散去，器物留下',`<p class="modal-subtitle">收妥一件通灵法宝与 40 灵蕴（永久保留）。收剑后先去查看凝霜的伤势。</p><div class="route-grid">${['mirror','lantern','map'].map(id=>`<button class="relic-card tier-2 fx-1" data-boss-loot="${id}">${A.relic(id,2)}<strong>${R.relics[id].name}</strong><small>通灵 · 静气</small></button>`).join('')}</div>`);document.querySelectorAll('[data-boss-loot]').forEach(b=>b.onclick=()=>{if(g.claimBossRelic(b.dataset.bossLoot))closeModal();commit();});}
    function ending(){const g=game(),c=g.state.chapter;frame('首章 · 山河留证',`<div class="chapter-ending">${icon(12,'chapterPeople')}<p class="dialogue-text">四个孩子都已平安归家。血色符纸与封存手札呈在清微案头，那支旧狐簪则留在了你行囊深处。<br>“明日起，你去锁妖塔当值。”<br>凝霜消散前没说完的那半句提醒，仍随山月压在心头。</p></div><div class="result-grid"><div><strong>4</strong><small>平安归家的孩子</small></div><div><strong>${c.quests.length}/3</strong><small>习得的经历功法</small></div><div><strong>${g.state.collection.gear.length}</strong><small>永久法宝收藏</small></div></div><p class="modal-subtitle">${c.focus==='shen'?'此夜最挂心的，是药庐灯下温茶等你的人。':c.focus==='ning'?(c.ningChoice==='promise'?'此夜最挂心的，是答应替她再看一眼的蜀山月色。':'此夜最挂心的，是凝霜临终所托与三百年前未白之冤。'):'你把诸般牵挂收在心底，暂不急着替将来作答。'}山月尚长，仍可留山习法、整理旧物。</p>`,btn('chapter-export','导出首章存档',true)+btn('ending-keepsakes','查看人物与信物'));$('chapter-export').onclick=exportFile;$('ending-keepsakes').onclick=keepsakes;}
    function show(which){
      const g=game(),c=g.state.chapter,t=c.tomb;
      if(which==='overview'){overview();return;}if(which==='cultivate'){cultivation();return;}if(which==='practiceBoard'){practice();return;}if(which==='quietRest'){rest();return;}if(which==='bossReward'){bossReward();return;}
      if(which==='hearth'){frame('把干柴架起来',`<div class="case-inspect">${icon(10,'chapterPeople')}<p>干柴 ${c.survival.wood?'✓':'未找到'} · 火石 ${c.survival.flint?'✓':'未找到'}<br>将枯柴架空少许，好叫火绒透风。无需灵火，这一簇凡火便够熬过今夜寒雨。</p></div>`,btn('light-hearth',c.survival.fire?'火已升起':'敲火石 · 点起干柴',true,c.survival.fire||!c.survival.wood||!c.survival.flint));action('light-hearth',()=>g.lightHearth());return;}
      if(which==='training'){frame('收剑歇一歇',`<p class="dialogue-text">已格挡 ${c.blocks}/2，剑击 ${c.swordHits}/3。暂歇会保留已完成的练习。</p>`,btn('cancel-training','中止本次试剑'));action('cancel-training',()=>{c.training=false;return true;});return;}
      if(which==='shenGift'){frame('这支木簪，是你亲手削的？',`<p class="dialogue-text">沈灵薇接过木簪，指腹顺着你细细磨平的雷纹木理停了片刻。<br>“怪不得这几日总见你在树下忙活。”她抬眼望你，眼底带着笑意，等你把后半句话说完。</p>`,btn('pin-close','往后的山路，想与你一起走',true)+btn('pin-friend','赠可靠的同门，愿你平安'),'shen_ling_wei');for(const id of ['close','friend'])action('pin-'+id,()=>g.givePin(id),()=>frame('她把木簪收好',`<p class="dialogue-text">${id==='close'?'“好，那便一步一步慢慢走。”她轻握了一下你的指尖，抬手将木簪绾入发间。':'她眉眼一展，抬手与你击掌：“好，同门相扶，前路不孤。”'}</p>`, '', 'shen_ling_wei'));return;}
      if(which==='arrowControl'){
        if(t.arrows){frame('弩机已停',`<p class="dialogue-text">轴盘已被死死卡住，这段墓道可安心通行。</p>`);return;}
        puzzleSequence('古弩的轴盘','石上刻痕提示：先拨向东，再转至南。若有经阁专长可直接认准东轴；也可直接用竹楔卡死机括。',3,[['east','东轴'],['south','南轴'],['west','西轴']],pattern=>g.disableArrows('dial',pattern),'arrows');
        if(g.state.story.tools.includes('wedge')){$('chapter-close').insertAdjacentHTML('beforebegin',btn('wedge-arrows','竹楔卡停',true));action('wedge-arrows',()=>g.disableArrows('wedge'));}return;
      }
      if(which==='bridgeControl'&&t.bridge){frame('绳桥已稳',`<p class="dialogue-text">锚环、绳结都已固定，可以从中段桥面通过。</p>`);return;}
      if(which==='bridgeControl'){puzzleSequence('给翻板架一条稳路','先扣紧锚环，再铺平木板，最后拉紧绳结。修士虽可纵身掠过，若要护着孩童出墓，脚下桥面必须铺稳。',4,[['anchor','固定锚环'],['board','铺木板'],['knot','收紧绳结']],order=>g.buildBridge(order),'bridge');return;}
      if(which==='ventControl'){frame('让墓道重新透气',`<div class="case-inspect">${icon(5)}<p>石轮旧刻痕：左 → 右 → 左。<br>当前 ${t.wheel}/3。${t.vent?'风道已打开。':'服下清心散虽可暂挡毒烟，但要带孩子们平安出墓，必须先转开石轮彻底换气。'}</p></div>`,btn('vent-left','向左转',true,t.vent)+btn('vent-right','向右转',false,t.vent));guided('vent','#vent-left','顺着刻痕转动石轮，转错就从左侧重新起步。',()=>['#vent-'+g.tombPattern('vent')[t.wheel],t.wheel+1]);for(const id of ['left','right'])$('vent-'+id).onclick=()=>{assist.record('vent',g.openVent(id));show('ventControl');commit();};return;}
      if(which==='mural'){frame('流云归海 · 多出的半招',`<div class="case-inspect">${icon(6)}<p class="dialogue-text">流云十三式末尾多出半招：石刻剑路自左上斜压右下，恰顺着对手收势时露出的气门切入。<br>把最后一剑的方向记下来。</p></div><div class="compass-grid">${[['northwest','西北'],['northeast','东北'],['southwest','西南'],['southeast','东南']].map(([id,label])=>btn('mural-'+id,label)).join('')}</div>`);guided('mural','.compass-grid','从左上往右下看收剑的方向。',()=>['#mural-southeast']);for(const id of ['northwest','northeast','southwest','southeast'])action('mural-'+id,()=>{const ok=g.learnMural(id);assist.record('mural',ok);if(!ok)g.message('再看收剑的方向：左上递向右下。');return ok;});return;}
      if(which==='rubble'){frame('墓门落石',`<div class="case-inspect">${icon(2)}<p class="dialogue-text">落石堵死了墓口。可下竹楔撬动、运灵力推开，或走近后对准落石挥剑劈开。</p></div>`,btn('rubble-wedge','竹楔借力',true,!g.state.story.tools.includes('wedge'))+btn('rubble-qi','灵力推石 · 12 灵力'));action('rubble-wedge',()=>g.clearRubble('wedge'));action('rubble-qi',()=>g.clearRubble('qi'));return;}
      if(which==='ning'){frame('先看清孩子，再问她的名字',`<p class="dialogue-text">白衣女子将最小的孩童护在身后，声音发紧却未退半步：“他们都活着。我把人藏进石室，是不让那恶徒找着。”<br>你看见四个孩子呼吸平稳。${g.state.story.deductions.includes('caution')?'青阳案卷在先：窗下白毛与街巷传言，都定不了她的罪。':'握剑的手不妨先垂下三分——眼前人还有话没说。'}<br>她没有急着替自己辩白，只侧过身，让你先看孩子们的鼻息。</p>`,btn('ning-listen','收剑，听她解释',true)+btn('ning-care','先问她与孩子是否需要照顾'),'ning_shuang');action('ning-listen',()=>g.hearNing('listen'));action('ning-care',()=>g.hearNing('care'));return;}
      if(/^child[0-3]$/.test(which)){const i=Number(which.at(-1)),names=['宝儿','李家的孩子','张家的孩子','新救来的孩子'],acts=['cover','water','calm','breath'];frame(names[i],`<div class="case-inspect">${icon(8,'chapterPeople')}<p class="dialogue-text">${['把滑落的衣裳轻轻盖好，让他躲开冷风。','等孩子醒一点，扶着递一口温水。','放低声音安慰她，告诉她家人正在等。','先看胸口起伏，再轻触腕边，确认呼吸平稳。'][i]}${t.heard?'':'<br>先与白衣女子说明来意。'}</p></div>`,btn('shelter-child',t.children.includes(i)?'已经照看':'照看并安置',true,!t.heard||t.children.includes(i)));action('shelter-child',()=>g.shelterChild(i,acts[i]));return;}
      if(which==='fightBrief'){frame('守住他们身前这一步',`<p class="dialogue-text">沉重脚步声在墓道里逼近，王屠户提刀闯入石室，开口便要夺回孩童——借狐妖嫁祸的把戏自此败露。<br>先把四个孩子安置在后方，再挡住石室入口。${t.clues.includes('mural')?'你已记熟壁画上的东南半招，待他邪功收势露隙时正可破招。':''}</p><p class="modal-subtitle">已安置孩童 ${t.children.length}/4。重劈看脚下红圈，横扫刀气向南北闪避，蓄力聚阴时用近身剑击或寒针打断。按 Q 施展功法，按 6 服清心散。</p>`,btn('start-boss','守住入口 · 迎战',true,t.children.length!==4||!t.heard));action('start-boss',()=>g.startBoss());return;}
      if(which==='farewell'){frame('凝霜 · 留半句话与一支簪',`<p class="dialogue-text">她终于道出“凝霜”二字。三百年前的天痕矿案、魔髓嫁祸、地脉封禁，与蜀山至今未散的暗影一并浮出水面。<br>她将拓着断邪印的血色符纸塞进你掌心：“拿着它……这是替当年翻案的第一桩铁证。”<br>她的轮廓在石室微光里一点点淡去。壁上那半招剑路，是她被困三百年才悟出的破法；而那支狐簪，是她母亲留下的唯一遗物。<br>“替我再看一眼蜀山的月亮……还有，小心你身边……”</p>`,btn('farewell-promise','握住她的手，答应替她看月亮',true)+btn('farewell-respect','郑重接过托付，记住她的名字'),'ning_shuang');action('farewell-promise',()=>g.farewell('promise'));action('farewell-respect',()=>g.farewell('respect'));return;}
      if(which==='sealRecords'){frame('让证据留下来',`<div class="case-inspect">${icon(7)}<p class="dialogue-text">护送孩童回镇后，街坊随你一同复查王宅。旧案器物交县衙封存，邪功手札与腰牌残片则由你带回山门核验。<br>将残片上的纹路与凝霜所交血拓比对——它正是哪一枚印记？</p></div>`,btn('seal-duanxie','断邪印',true)+btn('seal-shanmen','山门通行印')+btn('seal-fake','镇妖符'));guided('seal','#seal-duanxie','把残片与执法堂的血拓对照。',()=>['#seal-duanxie']);for(const id of ['duanxie','shanmen','fake'])action('seal-'+id,()=>{const ok=g.sealEvidence(id);assist.record('seal',ok);if(!ok)g.message('拓样来自执法堂腰牌，仔细核对再封存。');return ok;});return;}
      if(which==='report'){if(c.complete){ending();return;}frame('把物证放在清微案头',`<p class="dialogue-text">清微低头看着案上的血符与邪功手札，良久未言，手边茶盏渐渐凉透。<br>“小墨，你想查到什么程度？”<br>“水落石出。”<br>他缓缓颔首：“既要水落石出，明日起，你便去锁妖塔当值。她留下的那支狐簪，也妥善收着。”</p><p class="modal-subtitle">临赴锁妖塔前夜，你心中最记挂哪一处？</p>`,btn('report-shen','药庐灯下的沈灵薇',true)+btn('report-ning','月光里的凝霜')+btn('report-none','暂不作答'),'qing_wei');for(const id of ['shen','ning','none'])action('report-'+id,()=>g.reportChapter(id==='none'?null:id),ending);return;}
      const scenes={
        familiesAfter:['青阳 · 归来的人','张阿婆紧紧搂着宝儿，李家与张家檐下重新亮起灯火，迎客来灶上也给孩子们温好了热粥。<br>你将汉墓中的实情向镇民说清：那道藏起孩子的白影，终于不再被当成害人的妖物。',null],
        sisterAfter:['沈灵薇 · 归山灯下',g.state.collection.companionship==='close'?'沈灵薇听你讲完汉墓始末，并未追问那支狐簪。她只把温茶塞进你掌心，指尖在微凉的手背上轻轻一覆。<br>“既应了人家的托付，便牢牢记在心里。往后要走这些险路，也让我陪你走一程。”':'沈灵薇替你续上一盏热茶，提笔将“凝霜”二字记入药庐备忘。<br>“救下了孩子，也得替救人者留住清白。往后查案若遇难处，别忘了药庐还有同门。”','shen_ling_wei'],
        locket:['长命锁','银锁表面已被掌心摩挲得温润发亮。它毫无灵气，却是父母留下的遗物，也是你咬牙活下来的念想。',null],
        xuanheng:['玄衡 · 雨夜半块饼','灰袍老人掰下半块干饼递来，叫你先垫垫肚子。你攥着粗饼咽下，胸口那股寒气才算缓过来。<br>“大仇得报之后，你待如何？”他随口一问。十岁的你怔在火塘边，答不上来。<br>“答不出便不急。先活下去，往后慢慢想。”他拍了拍你的肩。','xuan_heng'],
        arrival:['十年行路，今日入山','十岁那夜，你随玄衡走出破庙。十年踏遍山河，见过荒年饿殍，也见过修士斗法波及无辜凡人。<br>二十岁登临蜀山，清微收你入门。山中岁月自此铺开——先去药庐见师姐沈灵薇，学着把一草一符落在实处。','qing_wei'],
        qingwei:['清微 · 学而有用','“修行莫只盯境界高低。剑能护弱，药能活人，阵能辟路——落到实处，才算学进你身上。”<br>先办妥药庐委托与一门历练，再到中央蒲团将心得走通周天；待筑基功成，便下山查访青阳一案。','qing_wei'],
        practiceDone:['这一门，已有所得','专属信物与功法已收好。按 Q 可施展当前功法，在「修行」中切换已学招式。<br>每次历练所得也可以拿去运气突破。',null],
        footprints:['石人前的脚印','墓道外留着新鲜鞋印，进出往返不止一人，亦非一回。来过汉墓林的，绝不止那道白影。',null],
        burntPaper:['残符仍有同样的笔路','半张烧残的黄纸上，歪斜朱线与王屠户所售镇妖符如出一辙。将其收入案卷留证。',null],
        coffin:['空棺与凌玉玦','棺盖撬痕尚新，不出三个月。空棺内只余断剑、残谱、朽衣，以及一枚刻着“凌玉玦”的蜀山弟子玉牌。<br>你拂去浮尘，将玉牌单独收妥。一墙之隔的耳室里，隐约传来孩童平稳的呼吸与低微童谣。',null],
        childrenHome:['天亮时，孩子回来了','破晓时分，张阿婆一把搂住宝儿，李家与张家也终于盼回门前的脚步声。四个孩子无一折损。<br>此时尚不可径直回山——还需在镇民见证下复查王宅，将涉案邪物当众封存。',null],
        tombRetry:['先退到墓外调息','这一阵未曾站稳，先退回墓林入口调息。已得法宝、线索与信物均在，已解开的机关亦不会重置。<br>若在与王屠户交手时受挫，对方气血会重整；备妥清心散后，回耳室再战即可。',null]
      }[which];if(scenes)frame(scenes[0],`<p class="dialogue-text">${scenes[1]}</p>`,'',scenes[2]);
    }
    function updateHUD(){
      const g=game();if(!g)return;const c=g.state.chapter,sk=c.skill?(g.skillInfo?.(c.skill)||C.skills[c.skill]):null;
      $('realm-label').textContent=g.profile().join(' · ');$('chapter-open').textContent=c.complete?'首章 · 已完成':'首章行程';
      const spiritual=g.canUseSpiritualPower(),skillLabel=(root.xiuxian?.controls?.label('skill',{primary:true})||'Q')+' 功法';$('skill-use').textContent=!spiritual?skillLabel+' · 当前不能运灵':sk?skillLabel+' · '+sk.name+(c.skillCd>0?' '+Math.ceil(c.skillCd)+'秒':''):skillLabel+' · 尚未习得';$('skill-use').disabled=!spiritual||!sk||g.isChild()||g.inCase()||c.skillCd>0;
      $('skill-use').title=!spiritual?'当前不能运灵；已学功法与收藏保留。':sk?.detail||sk?.desc||'尚未习得功法。';
      $('quick-cleanse').textContent=(root.xiuxian?.controls?.label('quick6')||'6')+' 清心散 ×'+g.state.inventory.qingxin;$('quick-cleanse').disabled=g.isChild()||!g.state.inventory.qingxin;
      const child=g.isChild();$('play').classList.toggle('child-chapter',child);$('origin-label').hidden=child;$('player-name').textContent=child?'林墨 · 十岁':(g.state.gender==='female'?'林墨 · 女修':'林墨');document.querySelector('.sister-note').hidden=child;document.querySelector('.chapter-tools').hidden=child;
      const portrait=document.querySelector('.portrait-window'),custom=portrait.classList.contains('has-custom-player-avatar');if(child&&!$('child-portrait'))portrait.insertAdjacentHTML('beforeend','<span id="child-portrait">'+icon(g.state.gender==='female'?0:1,'chapterPeople')+'</span>');if(!child&&$('child-portrait'))$('child-portrait').remove();if($('child-portrait'))$('child-portrait').hidden=custom;$('player-image').hidden=child&&!custom;
      document.querySelector('.actionbar').classList.toggle('child-mode',child);$('journey-open').hidden=child;$('relic-open').hidden=child;$('notes-open').hidden=child;$('case-open').hidden=child;
      if(g.cleanAir>0)$('buffs').insertAdjacentHTML('beforeend','<span>清心 · '+Math.ceil(g.cleanAir)+'秒</span>');
      if(c.training||C.maps.includes(g.state.map)||c.complete||g.state.map==='garden'&&g.state.flags.complete&&c.rank<4){
        const steps=child?[['收好干柴与火石',c.survival.wood&&c.survival.flint],['生火取暖',c.survival.fire],['长命锁与玄衡',c.survival.lock&&c.survival.bread]]:[['经历功法与筑基',c.rank===4],['青阳查案',g.state.story.stage==='forest'],['汉墓救援',c.tomb.rescued],['回山呈证',c.complete]];
        $('quest-steps').innerHTML=steps.map(([text,done],i)=>`<li class="${done?'done':''}"><span>${done?'✓':i+1}</span>${text}</li>`).join('');
      }
    }
    return {show,overview,keepsakes,updateHUD};
  };
})(globalThis);
