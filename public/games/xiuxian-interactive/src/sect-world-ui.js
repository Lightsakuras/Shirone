(function(root){
  'use strict';
  const D=root.XiuxianData,W=root.XiuxianSectWorldData,A=root.XiuxianArt;
  root.XiuxianSectWorldUI=function({game,openModal,closeModal,save,drain,esc}){
    const $=id=>document.getElementById(id),words=value=>esc(value||'').replace(/\n/g,'<br>');
    const cells={yun:0,qinlu:1,luqinghe:2},moving=new Set(['enter-world','leave-world','start-escort','retreat-escort']);
    const guarded=new Set(['settle-honor','settle-pressure','retreat-escort']);
    let current='hub',feedback='',pending=null;
    function questState(id,status){
      if(id==='station')return {claimed:'已开张',prepared:'待云照验药',active:'筹备中',available:'尚未议定'}[status.station]||'待筹备';
      if(id==='escort')return {idle:status.record.escort.accepted?'待敲铜铃':'待接护送',battle:'护路交战中',cleared:'药车待领取',claimed:'已追回药车'}[status.escort]||'待护送';
      return status.contract==='honor'?'守约交割':status.contract==='pressure'?'威压交割':status.record.contract.inspected?'已阅账，待交割':'待查账';
    }
    function person(panel,status){
      const object=W.objects[panel],id=object?.person,p=game().sectWorldPerson?.(id)||W.people[id];
      if(!p||id==='luqinghe'&&status.contract==='pressure')return '';
      const portrait=A.sectPeople&&A.atlasIcon?A.atlasIcon('sectPeople',cells[id],'sect-world-person-art'):'';
      return `<div class="sect-world-person">${portrait}<div><p class="sect-world-person-name">${esc(p.name)} · ${p.age} 岁 · ${esc(p.role)}</p><p>${words(p.goal)}</p><p class="sect-world-small">${words(p.boundary)}</p></div></div>`;
    }
    function stock(){
      const inventory=game().state.inventory;
      return `<div class="sect-world-stock" aria-label="当前随身材料">${['herb','water','paper','dust','potion','ward'].map(id=>`<span data-sect-world-stock="${id}">${esc(D.items[id].name)} <b>${inventory[id]||0}</b></span>`).join('')}</div>`;
    }
    function footer(status){
      return `<div class="sect-world-footer"><p>药站功绩 <b>${status.merit}/3</b><small>任务清誉 ${status.taskHonor>=0?'+':''}${status.taskHonor} · 威名 +${status.taskFame}</small></p><div class="buttons">${current!=='hub'?'<button id="sect-world-hub" class="secondary">查看药站公示</button>':''}<button id="sect-world-close" class="secondary">返回山行</button></div></div>`;
    }
    function actionMarkup(actions){
      if(!actions.length)return '';
      return `<div class="sect-world-actions">${actions.map(a=>`<article class="sect-world-action"><div><h3>${esc(a.label)}</h3><p>${words(a.detail)}</p>${a.reason?`<p class="sect-world-reason">${words(a.reason)}</p>`:''}</div><button class="${a.available?'primary':'secondary'}" data-sect-world-action="${esc(a.id)}" ${a.available?'':'disabled'}>${esc(a.label)}</button></article>`).join('')}</div>`;
    }
    function overview(status){
      const entrance=game().sectWorldPanel('entrance'),board=game().sectWorldPanel('board');
      const actions=status.inWorld?board.actions.filter(a=>a.id==='retreat-escort'):entrance.actions;
      return `<figure class="sect-world-scene"><img src="assets/art-v130/hehuan-court.webp" alt="合欢宗行旅药站的开阔石庭、药房与回程石阶"><figcaption>进入后可用 WASD / 方向键行走，靠近人物或物件按 E。</figcaption></figure><p class="sect-world-intro">${words(W.dialogues.welcome)}</p>${!status.inWorld?'<p class="sect-world-route">自药庐右下山道入站；交料与领赏须亲至人物或物件旁。</p>':'<p class="sect-world-route">药房前寻云照，右阁前访秦鹭，查清账册再与陆青禾交割。</p>'}${actionMarkup(actions)}<div class="sect-world-quests">${Object.values(W.quests).map(q=>`<article class="sect-world-quest" data-sect-world-quest="${q.id}"><p class="sect-world-tag">${esc(questState(q.id,status))}</p><h3>${esc(q.name)}</h3><p>${words(q.summary)}</p><button class="secondary" data-sect-world-view="${q.objectId}">查看${esc(W.people[q.person].name)}的委托</button></article>`).join('')}</div><p class="sect-world-boundary">${words(W.dialogues.rules)}</p>`;
    }
    function progress(panel,status){
      const group=W.objects[panel]?.panel;
      if(group==='station')return `<p class="sect-world-progress">药案：${esc(questState('station',status))} · 已查看备料 ${status.record.station.gathered.length}/3 · 已按顺序放入 ${status.record.station.recipe}/3</p>`;
      if(group==='escort'){
        const result=status.record.escort.outcome&&W.encounter.results[status.record.escort.outcome];
        return `<p class="sect-world-progress">护路：${esc(questState('escort',status))}${result?' · '+esc(result.name):''}</p>${panel==='stationBell'?`<div class="sect-world-enemies"><h3>敲铃前看清敌情</h3><p>${words(W.encounter.intro)}</p><ul>${W.encounter.enemies.map(e=>`<li>${esc(e.name)} · 气血 ${e.maxHp} · 招式伤害 ${e.damage}</li>`).join('')}</ul><p>${words(W.encounter.safety)}</p></div>`:''}`;
      }
      if(group==='contract')return `<p class="sect-world-progress">商约：${esc(questState('contract',status))}${status.record.contract.supplyTaken?' · 回程补给已领':''}</p>`;
      return '';
    }
    function render(){
      const g=game();if(!g)return;
      const status=g.sectWorldStatus(),panel=current==='hub'?null:g.sectWorldPanel(current);
      const title=panel?.title||'合欢宗 · 行旅药站',subtitle=panel?.subtitle||'可以亲自走访的庭院 · 三事由你决定';
      let body;
      if(pending){
        const a=g.sectWorldPanel(current==='hub'?(status.inWorld?'board':'entrance'):current).actions.find(a=>a.id===pending);
        if(!a){pending=null;return render();}
        body=`<div class="sect-world-confirm"><p class="sect-world-tag">尚未结算</p><h3>${esc(a.label)}</h3><p>${words(a.detail)}</p><p>${pending==='retreat-escort'?'这会结束当前护路战斗并回到药庐，已花材料和实际施法记录保留。':'确认交割后，这份商约会按本次选择留档，不能重新领取另一份奖励。'}</p>${a.reason?`<p class="sect-world-reason">${words(a.reason)}</p>`:''}<div class="buttons"><button id="sect-world-confirm" class="primary" ${a.available?'':'disabled'}>确认${pending==='retreat-escort'?'撤回药庐':'交割'}</button><button id="sect-world-cancel" class="secondary">暂缓，返回查看</button></div></div>`;
      }else body=current==='hub'?overview(status):`${person(current,status)}${progress(current,status)}<div class="sect-world-copy">${words(panel.text)}</div>${actionMarkup(panel.actions)}`;
      openModal('sectWorld',`<div class="sect-world-page"><p class="eyebrow">行旅药站 · 已暂停</p><h2 id="modal-title">${esc(title)}</h2><p class="modal-subtitle">${esc(subtitle)}</p>${feedback?`<p class="sect-world-feedback" role="status">${words(feedback)}</p>`:''}${body}<div class="sect-world-materials"><h3>当前随身</h3>${stock()}</div><p id="inline-message" class="inline-message" role="status"></p>${footer(status)}</div>`);
      $('sect-world-close').onclick=closeModal;
      if($('sect-world-hub'))$('sect-world-hub').onclick=()=>show('hub');
      document.querySelectorAll('[data-sect-world-view]').forEach(b=>b.onclick=()=>show(b.dataset.sectWorldView));
      const mix=document.querySelector('[data-sect-world-action^="mix-"]:enabled');
      if(mix)root.XiuxianPuzzleAssist.mount('station',{anchor:mix.closest('.sect-world-actions'),hint:'先取草，再润药，最后用药纸包好。',targets:()=>[['[data-sect-world-action="mix-'+game().nextStationIngredient()+'"]','第 '+(game().state.sectWorld.station.recipe+1)+' 步']]});
      document.querySelectorAll('[data-sect-world-action]').forEach(b=>b.onclick=()=>{
        const id=b.dataset.sectWorldAction;
        if(guarded.has(id)){pending=id;feedback='';render();}else commit(id);
      });
      if($('sect-world-cancel'))$('sect-world-cancel').onclick=()=>{pending=null;render();};
      if($('sect-world-confirm'))$('sect-world-confirm').onclick=()=>commit(pending);
    }
    function commit(id){
      const g=game();if(!g||!id)return;
      if(id.startsWith('mix-'))root.XiuxianPuzzleAssist.record('station',id==='mix-'+g.nextStationIngredient());
      const ok=id==='enter-world'?g.enterSectWorld():id==='leave-world'?g.leaveSectWorld():g.sectWorldAction(id);
      pending=null;
      if(ok)save(true);
      if(ok&&moving.has(id)){feedback='';closeModal();drain();return;}
      feedback=ok?'本次行动已记入药站公示。':'';render();drain();
    }
    function show(panel='hub'){
      current=panel==='board'?'hub':panel;pending=null;feedback='';render();
    }
    return {show};
  };
})(globalThis);
