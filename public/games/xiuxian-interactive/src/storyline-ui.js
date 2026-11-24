(function(root){
  'use strict';
  root.XiuxianStorylineUI=function({game,openModal,closeModal,esc,track,ending}){
    const names={main:'主线命途',background:'身世线',sect:'宗门线'};
    function show(){
      const model=root.XiuxianStoryline.snapshot(game());
      let trackId='main', volume=model.volume;
      function card(n,index){
        if(n.state==='fog')return `<li class="thread-node fog"><i aria-hidden="true">锁</i><b>？？？ · 前路迷雾未散</b>${n.gate?'<small>破雾条件 · '+esc(n.gate)+'</small>':''}</li>`;
        if(n.state==='done')return `<li class="thread-node done clarity-paper-card"><details><summary><span class="thread-seal">已历</span><strong>${esc(n.title)}</strong><span class="thread-recap">${esc(n.recap)}</span></summary><p>${esc(n.detail)}</p></details></li>`;
        const here=n.state==='current';
        return `<li class="thread-node ${n.state} clarity-paper-card"><span class="thread-state">${here?'★ 此刻身处':'可开启'}</span><h3>${esc(n.title)}</h3><p>${esc(n.detail)}</p><p class="thread-where">${esc(n.where)}</p><button class="${here?'primary':'secondary'}" data-follow="${index}">${n.target.ending?'回看结局':here?'指引前往':'查看去向'}</button></li>`;
      }
      function render(){
        const nodes=trackId==='main'?model.books[volume]:model.tracks[trackId];
        const hiddenBook=nodes.every(n=>n.state==='fog')&&trackId==='main';
        const cur=trackId==='main'?model.current:(nodes.find(n=>n.state==='current')||model.current);
        const focusVolume=cur===model.current?model.volumes[model.volume]:names[trackId];
        const brief=`<section class="focus-brief clarity-paper-card storyline-brief" aria-label="此刻重点">
          <div class="focus-brief-main">
            <span class="focus-kicker">此刻重点 · ${esc(focusVolume)}</span>
            <h3>${esc(cur?.title||'诸卷行程已毕')}</h3>
            ${cur?`<h4>眼下要办</h4><p class="thread-objective">${esc(cur.detail)}</p><h4>去向</h4><p class="focus-summary">${esc(cur.where)}</p>`:''}
            <h4>主线行程</h4><progress value="${model.done}" max="${model.total}" aria-label="主线行程"></progress>
            <div class="focus-chips">
              <span class="focus-chip is-met">✓ 已历 <b>${model.done}/${model.total}</b> 程</span>
              <span class="focus-chip is-info">◆ 尚余 ${model.fog} 处迷雾</span>

            </div>

          </div>
          <div class="focus-brief-cta">
            ${cur?`<button type="button" id="storyline-go-now" class="primary">${cur.target.ending?'回看终局':'立即前往此刻目标'}</button>`:''}
          </div>
        </section>`;
        openModal('storyline',`<header class="scroll-heading"><div><p class="eyebrow">命运剧情线</p><h2 id="modal-title">命途长卷</h2></div><p>当前所处 · ${esc(model.volumes[model.volume])}<strong>${esc(model.current?.title||'翻阅已历行程')}</strong></p></header>
          <div class="thread-tools"><nav aria-label="剧情轨道">${Object.entries(names).map(([id,name])=>`<button data-track="${id}" aria-pressed="${id===trackId}">${name}</button>`).join('')}</nav>${root.xiuxian?.armory.state.trial.books.length?'<button id="thread-books">器忆外传</button>':''}<p>已历 <b>${model.done} / ${model.total}</b> 程　剩余 ${model.fog} 处迷雾</p></div>
          <div class="thread-layout"><nav class="thread-volumes" aria-label="选择卷目">${model.books.map((book,i)=>`<button data-volume="${i}" aria-pressed="${trackId==='main'&&volume===i}">${book.every(n=>n.state==='fog')?['首章','卷二','卷三','卷四','终局'][i]+' · 云深':esc(model.volumes[i])}</button>`).join('')}</nav>
          <div class="thread-scroll" tabindex="0" aria-label="剧情节点"><ol class="thread-list">${hiddenBook?'<li class="thread-node fog"><i aria-hidden="true">锁</i><b>迷雾深处 · 尚待历练</b></li>':nodes.map(card).join('')}</ol></div>${brief}</div>`);
        const panel=document.getElementById('modal-content');
        panel.querySelector('#storyline-go-now')?.addEventListener('click',()=>{if(cur.target.ending){ending();return;}closeModal();track(cur.target);});
        panel.querySelector('#thread-books')?.addEventListener('click',()=>root.xiuxian.rogue.library());
        for(const b of panel.querySelectorAll('[data-track]'))b.onclick=()=>{trackId=b.dataset.track;volume=model.volume;render();};
        for(const b of panel.querySelectorAll('[data-volume]'))b.onclick=()=>{trackId='main';volume=Number(b.dataset.volume);render();};
        for(const b of panel.querySelectorAll('[data-follow]'))b.onclick=()=>{
          const target=nodes[Number(b.dataset.follow)].target;
          if(target.ending){ending();return;}
          closeModal();track(target);
        };
        const scroller=panel.querySelector('.thread-scroll'), current=scroller.querySelector('.current');
        requestAnimationFrame(()=>{if(current?.isConnected){
          const reduce=document.documentElement.classList.contains('reduced-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;
          const list=scroller.querySelector('ol'),area=scroller.getBoundingClientRect(),node=current.getBoundingClientRect();
          const half=Math.max(0,(area.height-node.height)/2);
          // A first or final node needs breathing room to reach the same reading position.
          list.style.paddingTop=Math.max(8,half-(node.top-area.top+scroller.scrollTop)+8)+'px';
          list.style.paddingBottom=Math.max(12,half-(list.getBoundingClientRect().bottom-current.getBoundingClientRect().bottom)+12)+'px';
          scroller.scrollTo({top:scroller.scrollTop+current.getBoundingClientRect().top-scroller.getBoundingClientRect().top-(scroller.clientHeight-current.offsetHeight)/2,behavior:reduce?'instant':'smooth'});
        }});
      }
      render();
    }
    return {show};
  };
})(globalThis);
