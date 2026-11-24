(function (root) {
  'use strict';
  root.XiuxianJourneyUI = function (ctx) {
    const R = root.XiuxianExpeditionData, D = root.XiuxianData, A = root.XiuxianArt;
    const $ = id => document.getElementById(id), esc = ctx.esc, game = ctx.game;
    const bind = (id, fn) => { const el = $(id); if (el) el.onclick = fn; };
    const actions = () => { ctx.save(true); ctx.drain(); };
    const prep=root.XiuxianPreparationUI({esc});
    let gearFilter='all';
    const nav = '<div class="collection-tabs"><button id="tab-gear">法宝</button><button id="tab-items">符药行囊</button><button id="tab-notes">图谱与札记</button><button id="tab-loadouts">配装方案</button></div>';
    function bindNav() { bind('tab-gear', () => showGear()); bind('tab-items', ctx.showBag); bind('tab-notes', showNotes); bind('tab-loadouts',ctx.showLoadouts); }
    const gearName = g => R.relics[g.base].name + ' · ' + R.affixes[g.affix].name;
    const gearArt = g => A.relic(g.base, g.level);
    const fxClass = g => 'fx-' + R.visualFor(g.base, g.level).strength;
    function buildPanel(g){
      const active=g.resonances(),paths=g.buildPaths();
      return '<div class="resonance-grid" aria-label="器忆共鸣">'+Object.entries(R.resonances).map(([id,r])=>'<article class="resonance-card '+(active.includes(id)?'is-active':'')+'">'+(A.resonance?A.resonance(id):A.boon(r.paths[0]))+'<div><small>'+(active.includes(id)?'共鸣已成':'还缺 '+r.paths.filter(p=>!paths.has(p)).map(p=>R.paths[p].name).join('、'))+'</small><h3>'+r.name+'</h3><p>'+r.desc+'</p></div></article>').join('')+'</div><p class="pause-note">法宝本性、已醒器忆与本局灵契可同路成鸣；不同名目的器物亦可凑成同一道共鸣。</p>';
    }
    function seekPicker(){return '<label class="seek-picker">此行寻器方向 <select id="seek-path"><option value="">随缘 · 保留房间偏向</option>'+Object.entries(R.paths).map(([id,p])=>'<option value="'+id+'">'+p.name+' · 每间至少一件同向法宝</option>').join('')+'</select></label>';}
    function trialPicker(){return '<fieldset class="trial-picker"><legend>本段强度 · 每段重新选择</legend>'+Object.entries(R.trials).map(([id,t])=>'<label><input type="radio" name="trial" value="'+id+'" '+(id==='none'?'checked':'')+'><span><strong>'+t.name+'</strong><small>'+t.desc+'</small></span></label>').join('')+'</fieldset>';}
    function kitText(id){return Object.entries(R.supplies[id]).map(([item,n])=>D.items[item].name+' ×'+n).join('、');}
    function campCards(g,r){
      const kit=r.seek||{sword:'blade',medicine:'herb',scholar:'ward'}[g.state.origin];
      return Object.entries(R.camps).map(([id,c])=>'<article class="choice-card camp-card"><span class="camp-art camp-'+id+'">'+A.camp(id)+'</span><span class="choice-kind">阵中片刻 · 只取一项</span><h3>'+c.name+'</h3><p>'+c.desc+'</p>'+
        (id==='supply'?'<label class="camp-kit">补给方向<select id="camp-kit">'+Object.keys(R.supplies).map(p=>'<option value="'+p+'" '+(p===kit?'selected':'')+'>'+R.paths[p].name+' · '+kitText(p)+'</option>').join('')+'</select></label>':id==='rest'?'<small>当前气血 '+Math.ceil(g.state.hp)+'/100 · 灵力 '+Math.ceil(g.state.mp)+'/100</small>':'<small>'+(r.depth===4?'下一段守阵古磬本就必掉通灵法宝；此项将为你额外添一次重观机会。':'此项不回气血、不补符药，专将机缘留给下一段择取法宝。')+'</small>')+
        '<button class="primary" data-camp="'+id+'">选择'+c.name+'</button></article>').join('');
    }
    function synergyHint(g,x){
      const worn=g.equipped(),same=worn.find(a=>a.base===x.base),removed=same||(worn.length===3?worn[2]:null),owned=g.state.collection.gear.find(a=>a.id===x.base+'_'+x.affix);
      const after=[...worn.filter(a=>a!==removed),{...x,memory:owned?.memory}],paths=new Set([...after.flatMap(a=>[R.relics[a.base].path,a.memory].filter(Boolean)),...(g.state.run?.boons||[])]);
      const now=g.resonances(),next=Object.keys(R.resonances).filter(id=>R.resonances[id].paths.every(p=>paths.has(p))),added=next.filter(id=>!now.includes(id)),lost=now.filter(id=>!next.includes(id));
      const parts=[added.length?'可成 '+added.map(id=>R.resonances[id].name).join('、'):'无新增共鸣',lost.length?'会失去 '+lost.map(id=>R.resonances[id].name).join('、'):''].filter(Boolean);
      return '<span class="synergy-preview">'+(removed?'若替换'+R.relics[removed.base].name:'装备后')+'：'+parts.join('；')+'。</span>';
    }
    function lootHint(g,x){
      const same=g.state.collection.gear.filter(a=>a.base===x.base).sort((a,b)=>b.level-a.level)[0],def=R.relics[x.base],path=R.paths[def.path].name;
      return '<span class="loot-comparison">'+path+' · '+(same?'已藏 '+R.tiers[same.level-1]+'：效果 '+def.values[same.level-1]+' → 本件 '+def.values[x.level-1] :'首件此类法宝')+'</span>'+synergyHint(g,x);
    }
    function showGear(focus, ascended = false) {
      const g = game(); if (!g) return;
      const c = g.state.collection;
      const filtered=c.gear.filter(x=>gearFilter==='all'||gearFilter==='available'&&!c.equipped.includes(x.id)&&(c.equipped.length<3||g.equipped().some(w=>w.base===x.base))||gearFilter==='equipped'&&c.equipped.includes(x.id)||gearFilter==='upgrade'&&x.level<3&&c.spirit>=(x.level===1?25:60)||R.paths[gearFilter]&&(R.relics[x.base].path===gearFilter||x.memory===gearFilter)).sort((a,b)=>b.level-a.level||a.id.localeCompare(b.id));
      const item=filtered.find(x=>x.id===focus)||filtered[0];
      const filterBar='<div class="gear-toolbar"><label>筛选<select id="gear-filter">'+[['all','全部法宝'],['available','可装备'],['equipped','已装备'],['upgrade','灵蕴够升阶'],...Object.entries(R.paths).map(([id,p])=>[id,p.name+' / 器忆'])].map(([id,label])=>'<option value="'+id+'" '+(gearFilter===id?'selected':'')+'>'+label+'</option>').join('')+'</select></label><small>按品阶排列 · '+filtered.length+' / '+c.gear.length+' 件</small></div>';
      const def = item && R.relics[item.base], cost = item?.level === 1 ? 25 : 60;
      const equipped = item && c.equipped.includes(item.id);
      const canUpgrade = item && item.level < 3 && c.spirit >= cost && !g.state.run && g.state.map === 'garden';
      const worn=item&&g.equipped().find(w=>w.base===item.base);
      const delta=worn?def.values[item.level-1]-def.values[worn.level-1]:0;
      const compare=delta?'<span class="delta-'+(delta>0?'up':'down')+'">'+(delta>0?'▲':'▼')+Math.abs(delta)+'</span>':'';
      const slots=Array.from({length:3},(_,i)=>{const x=g.equipped()[i];return '<button data-gear-slot="'+i+'">'+(x?gearArt(x)+gearName(x):'空槽 · 可装备')+'</button>';}).join('');
      const detail = item ? `<div class="relic-display tier-${item.level} ${fxClass(item)} ${ascended ? 'ascended' : ''}" style="--aura:${R.paths[def.path].color}">${gearArt(item)}</div><h3>${def.name} <span class="relic-rank">${R.tiers[item.level - 1]} · ${item.level} 阶</span></h3><h4>何时用</h4><p>${esc(root.XiuxianCatalog.entries.find(e=>e.kind==='relic'&&e.key===item.base)?.usage||def.desc)}</p><h4>用了会怎样</h4><p class="relic-trait">${def.desc} <b>${def.values[item.level - 1]}</b> ${compare}。</p><p>${R.affixes[item.affix].name}：${R.affixes[item.affix].desc}。</p><div class="memory-line">${item.memory ? '器忆 · ' + R.paths[item.memory].name + '：' + R.paths[item.memory].desc : '器忆待醒：佩此宝后，凡有效出剑、投符、点香、格挡或采药，同类行动累计满 6 次即凝成永久器忆。'}</div>${!item.memory ? '<small class="practice-count">' + Object.entries(item.practice).map(([p,n]) => R.paths[p].name + ' ' + n + '/6').join(' · ') + '</small>' : ''}<div class="buttons"><button class="primary" id="equip-relic">${equipped ? '卸下法宝' : '装备法宝'}</button><button class="upgrade-button" id="upgrade-relic" ${canUpgrade ? '' : 'disabled'}>${item.level === 3 ? '已至宝器' : '升阶 · ' + cost + ' 灵蕴'}</button>${item.level<3&&c.spirit<cost?'<strong class="gap">还差 '+(cost-c.spirit)+' 灵蕴</strong>':''}</div><h4>来源</h4><p>每闯过一间秘境，皆可自三件法宝中择一入藏。</p><p class="upgrade-hint">${item.level === 3 ? '本轮原型最高阶。' : '下一阶：' + def.desc + ' ' + def.values[item.level] + '。'}${g.state.run ? '回到药庐后可升阶。' : ''}</p>` : c.gear.length?'<div class="empty-collection"><p>暂无法宝符合这一筛选。</p><button id="clear-gear-filter" class="secondary">查看全部法宝</button></div>':'<div class="empty-collection"><span>藏器于身，问道于行</span><p>办妥「药庐取匣」后即可开启旧阵寻宝。每闯过一间秘境，皆可自三件法宝中择一入藏。</p><button class="primary" id="first-run">查看旧阵</button></div>';
      ctx.openModal('gear', nav + `<div class="collection-heading"><div><p class="eyebrow">万物有灵 · 器忆长存</p><h2 id="modal-title">法宝藏阁</h2></div><div class="spirit-purse"><b>${c.spirit}</b><small>灵蕴 · 升阶所用</small></div></div><p class="modal-subtitle">当前佩带 ${c.equipped.length}/3 件 · 同名法宝至多佩一件。凡已获法宝、品阶提升与觉醒器忆皆永久保留。</p><div class="gear-slots" aria-label="当前装备">${slots}</div>${filterBar}<div class="relic-layout"><div class="relic-grid">${filtered.map(x => `<button class="relic-card tier-${x.level} ${fxClass(x)} ${x.id === item?.id ? 'selected' : ''}" data-relic="${x.id}" style="--aura:${R.paths[R.relics[x.base].path].color}">${gearArt(x)}<strong>${R.relics[x.base].name}</strong><small>${R.tiers[x.level - 1]} · ${R.affixes[x.affix].name}</small>${c.equipped.includes(x.id) ? '<span class="equipped-badge">已装备</span>' : ''}</button>`).join('')}</div><div class="relic-detail clarity-paper-card">${detail}</div></div><details><summary>器忆共鸣</summary>${buildPanel(g)}</details><p class="inline-message" id="inline-message" role="status">${ascended ? '升阶成功！灵光与法宝效用已增强。' : ''}</p>`);
      const option=document.createElement('option');option.value='available';option.textContent='可装备';$('gear-filter').append(option);$('gear-filter').value=gearFilter;
      for(const button of document.querySelectorAll('[data-gear-slot]'))button.onclick=()=>{
        const x=g.equipped()[Number(button.dataset.gearSlot)];gearFilter=x?'all':'available';showGear(x?.id);
      };
      bindNav(); $('modal-content').querySelectorAll('[data-relic]').forEach(b => b.onclick = () => showGear(b.dataset.relic));
      bind('equip-relic', () => { g.equip(item.id); ctx.save(true); showGear(item.id); ctx.drain(); });
      bind('upgrade-relic', () => { const ok = g.upgrade(item.id); ctx.save(true); showGear(item.id, ok); ctx.drain(); });
      bind('first-run', showExpedition);bind('clear-gear-filter',()=>{gearFilter='all';showGear();});$('gear-filter').onchange=e=>{gearFilter=e.target.value;showGear();};
    }
    function showExpedition() {
      const g = game(); if (!g) return;
      const r = g.state.run;
      if (!r) {
        const unlocked = g.state.flags.complete, wornCount = g.state.collection.equipped.length;
        ctx.openModal('expedition', `<div class="journey-cover"><p class="eyebrow">蜀山旧阵 · 一次山行，五段机缘</p><h2 id="modal-title">循器入境</h2><p>择路、觅宝、结灵契御敌。你带出旧阵的每一件器物，都会记得你用它走过的路。</p></div><section class="expedition-control focus-brief clarity-paper-card" aria-label="此刻重点"><div class="focus-brief-main"><span class="focus-kicker">此刻重点 · 旧阵寻宝</span><h3>${unlocked?'整装入阵':'旧阵尚未开启'}</h3><div class="focus-chips"><span class="focus-chip ${unlocked?'is-met':'is-gap'}">${unlocked?'✓ 药庐取匣已办妥':'✕ 尚需完成药庐取匣'}</span><span class="focus-chip ${wornCount?'is-met':'is-info'}">${wornCount?'✓':'◆'} 已佩法宝 ${wornCount}/3</span><span class="focus-chip is-info">◆ 灵蕴 ${g.state.collection.spirit}</span></div><p class="focus-summary">${unlocked?'选定此行寻器方向，即刻从阵台出发；阵中失利不折损已得法宝。':'先完成「药庐取匣」，回药庐向沈灵薇交付木匣即可开启旧阵。'}</p></div><div class="focus-brief-cta">${unlocked?seekPicker():''}<div class="buttons"><button class="primary" id="begin-run" ${unlocked?'':'disabled hidden'}>整装入阵</button>${unlocked?'':'<button class="primary" data-track-goal="main">立即追踪：药庐取匣</button>'}</div></div></section><div class="journey-rules"><p><b>永久留下</b>法宝、升阶、器忆、图谱、札记和人物关系。</p><p><b>本局变化</b>房型路线、法宝词缀与灵契搭配每局皆异；失利或撤离仅散去本局临时灵契。</p><p><b>可选解法</b>试锋击敌、寻药绕行、残碑解阵；第五段挑战守阵古磬。</p></div><p class="modal-subtitle">${unlocked ? '入阵时阵台会自动补齐基础符药，每局收束后皆可重入。动身前别忘了先在藏阁佩好法宝。' : '先完成「药庐取匣」，与沈灵薇交付木匣后开启旧阵。'}</p>${unlocked?'':seekPicker()}${prep.beforeRun(g)}${buildPanel(g)}<div class="buttons"><button class="secondary" id="prepare-gear">整理法宝</button><button class="quiet" id="leave-journey">返回山行</button></div>`);
        if(unlocked)$('begin-run').after($('prepare-loadouts'));
        bind('begin-run', () => { if (g.startRun(undefined,$('seek-path').value||null)) { actions(); showExpedition(); } }); bind('prepare-gear', () => showGear()); bind('prepare-loadouts',ctx.showLoadouts); bind('provisions-open',ctx.showProvisions); bind('leave-journey', ctx.closeModal); return;
      }
      const heads = { camp:['炉火未熄，择一再行','每处歇脚点仅择一事：当下回血调息、补充符药，或为下一段寻宝蓄势。所选即刻存盘。'],loot: ['法宝三择一', '所选法宝即刻收入永久藏阁。若与已藏法宝同源，则自动保留较高品阶，并折化 10 点灵蕴。'], boon: ['借一缕灵契', '灵契会改变本局打法；选择后可决定下一段路线。'], route: ['这一次，走哪条路', '房间奖励与解法公开可见，可以围绕现有法宝做选择。'], active: ['行至 ' + r.depth + '/5 · ' + R.rooms[r.room]?.name, R.rooms[r.room]?.desc] };
      const [title, subtitle] = heads[r.phase];
      let cards = r.phase==='camp'?campCards(g,r):'';
      if (r.phase === 'loot') cards = r.loot.map((x, i) => {
        const owned = g.state.collection.gear.find(a => a.id === x.base + '_' + x.affix), def = R.relics[x.base];
        return `<button class="choice-card relic-card tier-${x.level} ${fxClass(x)}" data-loot="${i}" style="--aura:${R.paths[def.path].color}">${gearArt(x)}<span class="choice-kind">${R.tiers[x.level - 1]} · ${R.affixes[x.affix].name}</span><h3>${def.name}</h3><p>${def.desc} ${def.values[x.level - 1]}。</p><small>${R.affixes[x.affix].desc}。${owned ? '同源已藏：择高阶 +10 灵蕴' : '新法宝 · 永久收藏'}</small>${lootHint(g,x)}<span class="choose-label">收取此宝 →</span></button>`;
      }).join('');
      if (r.phase === 'boon') cards = r.choices.map(id => `<button class="choice-card boon-card" data-boon="${id}" style="--aura:${R.paths[id].color}">${A.boon(id)}<span class="choice-kind">本局灵契 · ${R.paths[id].name}</span><h3>${R.boons[id].name}</h3><p>${R.boons[id].desc}</p><span class="choose-label">结此灵契 →</span></button>`).join('');
      if (r.phase === 'route') cards = r.choices.map(id => `<button class="choice-card route-card" data-route="${id}"><img src="${A.sources[R.rooms[id].map]}" alt="${R.rooms[id].name}"><span class="choice-kind">第 ${r.depth + 1} 段 · ${R.rooms[id].label}</span><h3>${R.rooms[id].name}</h3><p>${R.rooms[id].desc}</p><small>${id === 'boss' ? '必有通灵法宝 · 30 灵蕴' : '法宝三择一 · 15 灵蕴 · ' + ({hunt:'寒针图谱',herb:'温养茶图谱',seal:'引灵香图谱'}[id])}</small>${prep.route(g,id)}<span class="choose-label">循此路入境 →</span></button>`).join('');
      const boonList = r.boons.map(id => `<span title="${R.boons[id].desc}">${R.boons[id].name}</span>`).join('') || '<span>尚未结契</span>';
      ctx.openModal('expedition', `<p class="eyebrow">旧阵寻宝 · ${r.depth}/5 段 · 已得 ${r.spiritGained} 灵蕴</p><h2 id="modal-title">${title}</h2><p class="modal-subtitle">${subtitle}</p><div class="delve-ribbon"><span>寻器：${r.seek?R.paths[r.seek].name:'随缘'}</span><span>险阵已成：${r.challenges} 段</span><span>重观余次：${r.redraws}</span>${r.pendingInsight||r.lootBlessed?'<span>问器机缘 · 通灵保底</span>':''}${g.activeProvision()?'<span>合备：'+esc(g.activeProvision().name)+' · '+(g.activeProvision().used?'已发挥效用':'尚待使用')+'</span>':''}</div>${r.phase==='route'?trialPicker():''}<div class="journey-choices">${cards}</div>${r.phase==='loot'?'<button id="redraw-loot" class="secondary" '+(r.redraws?'':'disabled')+'>重观三宝 · 消耗 1 次</button>':''}${r.phase==='camp'?'<p class="camp-bonds">已成共鸣：'+(g.resonances().map(id=>R.resonances[id].name).join('、')||'尚未成形，可按下一段打法补给')+'</p>':buildPanel(g)}<div class="boon-list">${boonList}</div><div class="buttons">${r.phase === 'active' ? '<button id="resume-run" class="primary">继续当前秘境</button>' : ''}<button class="secondary" id="run-gear">查看 / 更换法宝</button><button class="quiet" id="run-retreat">带着收获回山</button></div><p class="pause-note">阵中已暂停，已得法宝与图谱永留藏阁。</p>`);
      $('modal-content').querySelectorAll('[data-loot]').forEach(b => b.onclick = () => { if (g.claimLoot(Number(b.dataset.loot))) { actions(); if (g.state.run) showExpedition(); } });
      $('modal-content').querySelectorAll('[data-boon]').forEach(b => b.onclick = () => { if (g.chooseBoon(b.dataset.boon)) { actions(); showExpedition(); } });
      $('modal-content').querySelectorAll('[data-route]').forEach(b => b.onclick = () => { if (g.chooseRoute(b.dataset.route,document.querySelector('input[name="trial"]:checked')?.value||'none')) { ctx.closeModal(); actions(); } });
      $('modal-content').querySelectorAll('[data-camp]').forEach(b=>b.onclick=()=>{if(g.chooseCamp(b.dataset.camp,b.dataset.camp==='supply'?$('camp-kit').value:null)){actions();showExpedition();}});
      bind('redraw-loot',()=>{if(g.redrawLoot()){actions();showExpedition();}});
      bind('run-gear', () => showGear()); bind('resume-run', ctx.closeModal); bind('run-retreat', retreat);
    }
    function retreat() {
      ctx.openModal('retreat', '<p class="eyebrow">山行可歇，所得不失</p><h2 id="modal-title">带着收获回山？</h2><p class="modal-subtitle">已获法宝、图谱与灵蕴悉数带回，仅散去本局临时灵契。</p><div class="buttons"><button class="primary" id="confirm-retreat">收束旧阵，回山</button><button class="secondary" id="cancel-retreat">继续这一局</button></div>');
      bind('confirm-retreat', () => { game().finishRun('retreat'); actions(); }); bind('cancel-retreat', showExpedition);
    }
    function reportPanel(r){
      const p=r.report;if(!p)return '';
      const provision=r.provision&&root.XiuxianEngine.provisions.kits[r.provision.id];
      const used=Object.entries(p.used).filter(([,n])=>n>0).map(([id,n])=>D.items[id].name+' ×'+n).join('、')||'未消耗符药';
      return '<section class="run-report"><h3>此行留痕</h3><p>阵中用时 '+Math.round(p.elapsed)+' 秒 · 受击 '+p.hits+' 次 · 格挡 '+p.blocks+' 次 · 累计损失 '+Math.round(p.damage)+' 气血</p><p>'+used+'</p><p>路线：'+(r.history||[]).map(h=>R.rooms[h.room].name+'（'+R.trials[h.trial].name+'）').join(' → ')+'</p>'+
        (provision?'<p>此行合备：'+esc(provision.name)+' · '+(r.provision.used?'已发挥效用':'尚未触发，随本局收束')+'。</p>':'')+
        (r.result==='defeat'?'<p>最后受伤来自 '+(R.enemies[p.lastThreat]?.name||'阵中伤势')+'。下次可选调息或补给；守住灵力，先看起手。</p>':'')+
        '<small>仅保存在本机。旧档的战况从本版本续玩时开始记录。</small><button id="export-run" class="quiet">导出本局记录</button></section>';
    }
    function showEnd() {
      const g = game(), c = g.state.collection, r = g.state.lastRun; if (!r) return;
      ctx.openModal('expeditionEnd', `<p class="eyebrow">旧阵归来 · 收获已存</p><h2 id="modal-title">${{win:'磬声止，器物醒',defeat:'此行受挫，所得不失',retreat:'收好行囊，下次再来'}[r.result]}</h2><p class="modal-subtitle">法宝、升阶、器忆、图谱与札记已保留。本局临时灵契已散去。完成险阵 ${r.challenges||0} 段。</p><div class="result-grid"><div><strong>${r.rooms}</strong><small>完成房间</small></div><div><strong>${r.found.length}</strong><small>本局取得法宝</small></div><div><strong>+${r.spirit}</strong><small>灵蕴</small></div></div><div class="kept-relics">${r.found.map(id => { const x=c.gear.find(a=>a.id===id); return `<div class="tier-${x.level} ${fxClass(x)}">${gearArt(x)}<span>${esc(gearName(x))}</span></div>`; }).join('')}</div>${reportPanel(r)}<p class="modal-subtitle">本局新悟图谱：${r.recipes.map(id => D.items[id].name).join('、') || '本局未取得新图谱'}。回药庐后可升阶法宝、开炉炼制符药，亦可与沈灵薇灯下共读新得的札记。</p><div class="buttons"><button class="upgrade-button" id="result-gear">查看法宝与升阶</button><button class="secondary" id="again-run">再入旧阵</button><button class="quiet" id="end-close">回到药庐</button></div>`);
      bind('export-run',()=>{const blob=new Blob([JSON.stringify({schema:1,gameVersion:document.querySelector('meta[name="game-version"]')?.content,run:r},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='修仙命运录-本局记录.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
      bind('result-gear', () => showGear(r.found.at(-1))); bind('again-run', showExpedition); bind('end-close', ctx.closeModal);
    }
    function showNotes() {
      const s = game().state, c = s.collection;
      ctx.openModal('notes', nav + `<p class="eyebrow">法有图谱，人有来处</p><h2 id="modal-title">图谱与山行札记</h2><div class="recipe-codex">${R.recipeIds.map((id,i) => `<div>${A.recipe(id)}<strong>${D.items[id].name}</strong><small>${c.recipes.includes(id) ? '已习得 · 药庐可炼制' : '未习得 · ' + {needle:'听雨试锋',incense:'残碑问脉',tea:'月露寻药'}[id]}</small></div>`).join('')}</div><div class="study-strip">${Object.keys(c.study).map(id => `<span>${D.origins[id].name}：${gLearned(id) ? '已习得秘境专长' : c.study[id] + '/2 次旁修'}</span>`).join('')}</div><div class="note-list">${c.notes.map(id => `<article><small>${c.shared.includes(id) ? '已与沈灵薇谈起' : '回山可分享'}</small><h3>${R.notes[id].title}</h3><p>${R.notes[id].text}</p></article>`).join('') || '<p class="modal-subtitle">旧阵见闻皆录于此，回山可与同门共读。</p>'}</div>`);
      bindNav();
    }
    function gLearned(id) { return game().learned(id); }
    function showReunion() {
      const s = game().state, c = s.collection, fresh = c.notes.filter(id => !c.shared.includes(id));
      const women = fresh.includes('women');
      ctx.openModal('reunion', `<div class="dialogue-layout"><img src="assets/portraits/shen_ling_wei.webp" alt="沈灵薇"><div><p class="eyebrow">药庐灯下 · 并非每次相遇都为委托</p><h2 id="modal-title">沈灵薇</h2><p class="dialogue-text">${women ? '她翻到那页前辈留下的《女修的行药笺》，不动声色将一包温养茶推到你手边。\n“身子上的事，想说便与我说；不想提，也无需向任何人解释。下一趟出门前，我们一道把行囊备妥。”\n她替你让出窗畔竹椅，眼底灯影温软。' : '“原来旧阵深处还藏着这些旧事。”沈灵薇合上药簿，安静听你把一路见闻讲完。\n“比起击散了多少具石傀，我更爱听你是怎么解开那些残碑与药理的。来，坐下喝口热茶歇会儿吧。”'}</p><p class="modal-subtitle">共读 ${fresh.length} 篇新札记，信任 +${fresh.length}。</p><div class="buttons"><button class="primary" id="share-close">在她身边坐一会儿</button><button class="secondary" id="share-friend">与她细谈药理和阵法</button></div></div></div>`);
      for (const [id, choice] of [['share-close','close'],['share-friend','friend']]) bind(id, () => {
        if (!game().shareNotes(choice)) return;
        ctx.save(true);
        ctx.openModal('dialogue', `<p class="eyebrow" data-score-cue="reunion">灯下余话</p><h2 id="modal-title">${choice === 'close' ? '不急着起身' : '又添一页见闻'}</h2><p class="dialogue-text">${choice === 'close' ? (s.gender === 'female' ? '她俯身替你拢好被夜风吹乱的袖口，指尖与你手背轻轻一触。你未曾缩手，她也没有急着撤开。药庐内一时静极，只闻小炉茶水微沸。' : '她在你身旁竹榻坐下，听你慢慢聊起山中风物。盏中清茶渐温，谁也没有催着起身。') : '你们就着油灯将碑文拓片与旧药簿逐条核对。她认真记下你的发现，又指点了一处极易混淆的草叶脉络。下一程入山，你身边多了一位可共商行止的同门。'}</p><div class="buttons"><button id="reunion-done" class="primary">收好这段相处</button><button id="reunion-provisions" class="secondary">一道准备下次行装</button></div>`);
        bind('reunion-done', ctx.closeModal); bind('reunion-provisions',ctx.showProvisions); ctx.drain();
      });
    }
    function updateHUD() {
      const g = game(); if (!g) return;
      const s = g.state, r = s.run;
      $('journey-open').textContent = r ? '秘境 · ' + r.depth + '/5' : '旧阵寻宝';
      $('relic-open').textContent = '已装备法宝 · ' + s.collection.equipped.length + '/3';
      if (r) {
        $('quest-steps').innerHTML = Array.from({length:5}, (_,i)=>`<li class="${i+1<r.depth || i+1===r.depth && r.phase!=='active' ? 'done' : ''}"><span>${i+1}</span>${i===4?'古磬守关':i+1===r.depth?R.rooms[r.room]?.name || '结契准备':'择路寻宝'}</li>`).join('');
        $('buffs').innerHTML += r.boons.map(id => '<span title="' + R.boons[id].desc + '">' + R.boons[id].name + '</span>').join('');
      }
    }
    bind('journey-open', showExpedition); bind('relic-open', () => showGear()); bind('notes-open', showNotes);
    return { showGear, showExpedition, showEnd, showNotes, showReunion, retreat, updateHUD };
  };
})(window);
