(function(root){
  'use strict';
  const D=root.XiuxianBackgroundsData,I=root.XiuxianData;
  const artNotes={rain:'雨夜破庙 · 檐下一宿，十年走州府',poor:'溪村共灶 · 一锅稀粥，半亩药畦',beggar:'街巷粥棚 · 替人跑腿，同伴分食',caravan:'山道商旅 · 验签跟车，账有来回',demon:'边地药铺 · 异域长成，去留自定'};
  root.XiuxianBackgroundUI=function(ctx){
    const {game,openModal,closeModal,save,drain,esc,selection,select}=ctx,$=id=>document.getElementById(id);
    const words=text=>esc(text||'').replace(/\n/g,'<br>');
    const goods=value=>Object.entries(value||{}).map(([id,n])=>`${I.items[id]?.name||id} ×${n}`).join('、');
    const exchange=action=>{
      const cost=goods(action.cost),gain=goods(action.gain);
      if(cost&&gain)return `交付：${cost} → 获得：${gain}`;
      if(gain)return `获得：${gain}`;
      if(cost)return `交付：${cost}`;
      return '无物资变动';
    };
    const faction=value=>typeof value==='string'?value:String(value?.name||'');
    const scene=(id,extra='')=>`<figure class="background-scene ${extra}" data-scene="${id}"><img src="assets/art-v120/${id}.webp" alt="${esc(artNotes[id])}"><figcaption>${esc(artNotes[id])}</figcaption></figure>`;
    function previewAction(action){
      return `<article class="background-start-choice"><h4>${esc(action.label)}</h4><p>${words(action.desc)}</p><dl class="background-facts"><div><dt>专属凭物与用途</dt><dd>${action.token?`<b>${esc(action.token.name)}</b> · ${words(action.token.desc)}`:'只带父母留下的长命锁，不另领凭物。'}</dd></div><div><dt>起步取舍</dt><dd>${esc(exchange(action))}</dd></div></dl></article>`;
    }
    function updateSelection(){
      const s=selection(),p=D.backgrounds[s.backgroundId];
      $('character-choice-summary').textContent=`本次角色：${s.gender==='female'?'女修':'男修'} · ${p.name} · ${faction(p.faction)} · ${I.origins[s.origin].name}`;
    }
    function renderChoices(){
      const s=selection(),p=D.backgrounds[s.backgroundId];
      const preview=s.backgroundId==='rain'?`<article class="background-start-choice"><h4>${esc(p.opening.choices[0].label)}</h4><p>${words(p.opening.choices[0].desc)}</p><dl class="background-facts"><div><dt>随身旧物 · 长命锁</dt><dd>${words(root.XiuxianChapterData.tokens.locket.desc)}</dd></div></dl></article>`:p.opening.choices.map(previewAction).join('');
      $('backgrounds').innerHTML=Object.entries(D.backgrounds).map(([id,b])=>`<button class="background-option ${s.backgroundId===id?'active':''}" data-background="${esc(id)}" aria-pressed="${s.backgroundId===id}" aria-controls="background-detail"><img src="assets/art-v120/${id}.webp" alt="" class="background-card-art"><span class="background-card-copy"><strong>${esc(b.name)}</strong><small>${esc(artNotes[id].split(" · ")[0])} · ${esc(faction(b.faction))}</small></span></button>`).join('');
      $('backgrounds').querySelectorAll('[data-background]').forEach(button=>button.onclick=()=>{const id=button.dataset.background;select(id);renderChoices();$('backgrounds').querySelector(`[data-background="${id}"]`).focus({preventScroll:true});});
      $('background-detail').innerHTML=`<div class="background-introduction"><span class="background-faction">所属阵营 · ${esc(faction(p.faction))}</span><h3>${esc(p.name)}</h3><p><b>出身：</b>${words(p.birth)}</p><div class="creation-story"><p class="background-motive">${words(p.summary)}</p><button type="button" class="quiet" aria-expanded="false">展开来历</button></div><p class="background-preview-note">${s.backgroundId==='rain'?'先熬过这一夜，再跟玄衡上山。':'童年序章在破庙门口挑；跳过序章进游戏点「身世」直接选。'}</p></div><details class="creation-choices"><summary>起步取舍与专属凭物</summary><div class="background-start-options" aria-label="开局取舍与凭物">${preview}</div></details>`;
      $('background-detail').insertAdjacentHTML('afterbegin',scene(s.backgroundId,'background-selection-scene'));
      const story=$('background-detail').querySelector('.creation-story'), toggle=story.querySelector('button');
      const paragraph=story.querySelector('p');
      requestAnimationFrame(()=>{ toggle.hidden=paragraph.scrollHeight<=paragraph.clientHeight+1; });
      toggle.onclick=()=>{const full=story.classList.toggle('expanded');toggle.setAttribute('aria-expanded',String(full));toggle.textContent=full?'收起':'展开来历';};
      updateSelection();
    }
    function summary(g=game()){
      if(!g)return '';
      const b=g.backgroundStatus();return `${b.name} · ${faction(b.faction)}${b.legacy?' · 原有存档':''}`;
    }
    function frame(title,body,actions=''){
      openModal('background',`<p class="eyebrow">身世与立场 · 已暂停</p><h2 id="modal-title">${esc(title)}</h2>${scene(game().backgroundStatus().id)}${body}<div class="buttons">${actions}<button id="background-close" class="secondary">返回山行</button></div><p id="inline-message" class="inline-message" role="status"></p>`);
      $('background-close').onclick=closeModal;
    }
    function show(){
      const g=game();if(!g)return;
      const b=g.backgroundPanel(),p=D.backgrounds[b.id];
      const stage={opening:'去向待定',mission:'来处已记 · 委托待办',complete:'委托已记',legacy:'保留原有进度'}[b.stage];
      const token=b.token?`<details class="background-record" id="background-token" ${g.isChild()?'open':''}><summary>${esc(b.token.name)} <small>· ${b.token.spent?'已交付':'随身保管'} · 查看用途</small></summary><p>${words(b.token.desc)}</p><p class="background-note">${b.token.spent?'已随委托交出，重看或读档都不会再领。':'单独收着的凭物，办身世委托时用，不占战斗快捷栏。'}</p></details>`:'';
      const opening=b.openingResult?`<details class="background-record" ${g.isChild()?'open':''}><summary>走过的来路</summary><p>${words(b.openingResult)}</p></details>`:'';
      const actions=b.choices.map(action=>{
        const meta=[exchange(action),action.token?`凭物：${action.token.name}`:'',action.consumeToken?`交出：${b.token?.name||'专属凭物'}`:''].filter(Boolean).join(' · ');
        return `<button class="background-action" data-background-action="${esc(action.id)}" data-background-stage="${esc(b.stage)}" ${action.available?'':'disabled'}><strong>${esc(action.label)}</strong><small class="background-action-desc">${words(action.desc)}</small><small class="background-action-meta">${esc(meta)}</small>${!action.available?`<small class="background-action-reason">暂不可选：${words(action.reason)}</small>`:''}</button>`;
      }).join('');
      const event=b.legacy?`<div class="background-record" id="background-legacy"><h3>原来的山行照常继续</h3><p>旧档保留原有进度，不补发新开局凭物与物资。</p></div>`:g.isChild()&&b.stage==='mission'?`<section class="background-event" id="background-child-future"><h3>去向已定，先走出这场雨</h3><p>收好旧物出庙，成年赴青阳后再办委托。</p></section>`:`<section class="background-event"><span class="background-event-status">${esc(stage)}</span><h3>${esc(b.title)}</h3><p>${words(b.text)}</p>${b.stage==='complete'?`<p class="background-outcome">${words(b.result)}</p><p class="background-note" id="background-echo">${g.state.chapter.complete?words(b.echo):'回山呈证后再查看这次委托的回信。'}</p>`:`<div class="background-actions">${actions}</div>`}</section>`;
      const returned=g.state.chapter.complete&&g.backgroundNarrative('return')?`<div class="background-record"><h3>归山之后</h3><p>${words(g.backgroundNarrative('return'))}</p></div>`:'';
      frame('身世与立场',`<div class="background-panel-head"><div><h3>${esc(b.name)}</h3><p>${words(b.birth)}</p></div><span class="background-badge">${esc(faction(b.faction))}</span></div>${b.legacy?`<p class="background-note">${words(p.summary)}</p>`:''}${token}${event}${opening}${returned}`);
      const choices = $('modal-content').querySelector('.reading-options.background-actions');
      if (choices && !g.isChild() && ['opening','mission'].includes(b.stage)) {
        const token = b.token || p.opening.choices.find(choice=>choice.token)?.token;
        const hints = {
          rain:['收好父母留下的长命锁。','赴青阳查失踪案，回迎客来留下见证。'],
          poor:['凭粮契结清共灶药账。','问清三家买符的口供，安抚张阿婆后回迎客来。'],
          beggar:['三结旧绳是街巷同伴的暗记。','查清童鞋与白毛传闻，再去迎客来交绳。'],
          caravan:['互保封签用来查验商队药路。','夜探王宅，查过新土与北去白影再回迎客来。'],
          demon:['凭行牌与边地药铺核销药账。','核验假符与汉墓残符，再回迎客来交牌。']
        };
        const [use, route] = hints[b.id];
        choices.insertAdjacentHTML('beforeend',`<aside class="background-route"><h3>凭物与前路</h3><p><b>${esc(token?.name||'长命锁')}</b>${esc(use)}</p><p><b>青阳</b>${esc(route)}</p></aside>`);
      }
      $('modal-content').querySelectorAll('[data-background-action]').forEach(button=>button.onclick=()=>{
        const ok=g.chooseBackgroundAction(button.dataset.backgroundStage,button.dataset.backgroundAction);
        if(ok){save(true);show();}
        drain();
      });
    }
    function arrival(){
      const g=game();if(!g)return;
      const b=g.backgroundStatus();
      frame('十年行路，各有来处',`<div class="background-panel-head"><p>${esc(b.name)} · ${esc(faction(b.faction))}</p><span class="background-badge">二十岁 · 抵达蜀山</span></div><div class="chapter-dialogue"><img src="assets/portraits/qing_wei.webp" alt="清微"><div><p class="dialogue-text">${words(g.backgroundNarrative('arrival'))}</p><p class="background-note">主修：${esc(I.origins[g.state.origin].name)}。先去药庐见沈灵薇；随身凭物与委托随时可看。</p></div></div>`,`<button id="background-view-record" class="primary">查看身世与凭物</button>`);
      $('background-view-record').onclick=show;
    }
    function updateHUD(){
      const g=game();if(!g)return;
      const b=g.backgroundStatus(),button=$('background-open');
      button.textContent=b.stage==='opening'?'身世 · 待选去向':'身世与立场';
      button.title=summary(g);button.hidden=false;
      button.dataset.ready=String(b.choices.some(c=>c.available));
    }
    return {renderChoices,updateSelection,show,arrival,summary,updateHUD};
  };
})(globalThis);
