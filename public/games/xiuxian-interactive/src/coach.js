(function (root) {
  'use strict';
  const {segments, labels, copy} = root.XiuxianCoachData;
  const key = 'xiuxian-coach-v1';
  const $ = selector => document.querySelector(selector);
  const actionable = 'button:enabled,input:enabled,select:enabled,summary,[href],[tabindex="0"]';
  const clamp = (value,min,max) => Math.max(min,Math.min(value,max));

  // Use the actually visible rectangle, including scroll containers inside docked panels.
  function bounds(node) {
    if (!node?.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}) || node.disabled) return null;
    const r = node.getBoundingClientRect();
    let l=Math.max(0,r.left), t=Math.max(0,r.top), b=Math.min(innerHeight,r.bottom), h=Math.min(innerWidth,r.right);
    for (let p=node.parentElement;p && p!==document.body;p=p.parentElement) {
      const css=getComputedStyle(p), box=p.getBoundingClientRect();
      if (/auto|scroll|hidden|clip/.test(css.overflowX)) { l=Math.max(l,box.left); h=Math.min(h,box.right); }
      if (/auto|scroll|hidden|clip/.test(css.overflowY)) { t=Math.max(t,box.top); b=Math.min(b,box.bottom); }
    }
    return h-l>=4 && b-t>=4 ? {left:l,top:t,right:h,bottom:b,x:(l+h)/2,y:(t+b)/2} : null;
  }

  function position(layer, card, ring, arrow, r, placement) {
    const margin=10, gap=42, w=card.offsetWidth, h=card.offsetHeight;
    const x=clamp(r.x-w/2,margin,innerWidth-w-margin), y=clamp(r.y-h/2,margin,innerHeight-h-margin);
    const options={
      right:[r.right+gap,y,innerWidth-r.right-w],left:[r.left-gap-w,y,r.left-w],
      bottom:[x,r.bottom+gap,innerHeight-r.bottom-h],top:[x,r.top-gap-h,r.top-h]
    };
    const side = options[placement]?.[2]>=gap+margin ? placement :
      Object.keys(options).sort((a,b)=>options[b][2]-options[a][2])[0];
    const [px,py]=options[side], cx=clamp(px,margin,innerWidth-w-margin), cy=clamp(py,margin,innerHeight-h-margin);
    card.style.left=cx+'px'; card.style.top=cy+'px';
    Object.assign(ring.style,{left:r.left-3+'px',top:r.top-3+'px',width:r.right-r.left+6+'px',height:r.bottom-r.top+6+'px'});
    const vertical=side==='top'||side==='bottom';
    const ax=vertical?clamp(r.x,cx+12,cx+w-12):side==='left'?cx+w:cx;
    const ay=vertical?(side==='top'?cy+h:cy):clamp(r.y,cy+12,cy+h-12);
    const bx=vertical?clamp(ax,r.left,r.right):side==='left'?r.left:r.right;
    const by=vertical?(side==='top'?r.top:r.bottom):clamp(ay,r.top,r.bottom);
    const dx=bx-ax, dy=by-ay, len=Math.max(1,Math.hypot(dx,dy)), ux=dx/len, uy=dy/len;
    arrow.setAttribute('d',`M ${ax} ${ay} L ${bx} ${by} l ${-ux*13+uy*5} ${-uy*13-ux*5} L ${bx-ux*6} ${by-uy*6} L ${bx-ux*13-uy*5} ${by-uy*13+ux*5} Z`);
    layer.dataset.side=side;
  }

  root.XiuxianCoach = function create(ctx) {
    let pref={version:1,enabled:true,done:{}}, known=false;
    try {
      const p=JSON.parse(localStorage.getItem(key));
      if (p?.version===1 && typeof p.enabled==='boolean' && p.done && typeof p.done==='object') {
        pref={version:1,enabled:p.enabled,done:Object.fromEntries(Object.keys(segments).filter(id=>p.done[id]===true).map(id=>[id,true]))}; known=true;
      }
    } catch {}
    function persist() { known=true; try {localStorage.setItem(key,JSON.stringify(pref));} catch {} }
    const layer=document.createElement('div');
    layer.id='coach'; layer.hidden=true;
    layer.innerHTML='<div class="coach-ring"></div><svg class="coach-arrow" aria-hidden="true"><path/></svg><section class="coach-card" role="dialog" aria-labelledby="coach-title" aria-describedby="coach-body coach-keys" tabindex="-1"><header></header><h2 id="coach-title"></h2><p id="coach-body"></p><kbd id="coach-keys" hidden></kbd><div class="coach-actions"></div></section>';
    document.body.append(layer);
    const card=layer.querySelector('section'), ring=layer.firstElementChild, arrow=layer.querySelector('path'), actions=layer.querySelector('.coach-actions');
    let id=null, index=0, current=null, anchor=null, temporaryTab=null, missing=0, nextCheck=0;
    let invite=false, confirming=false, fieldPause=false, focusBefore=null, lastPoint=null, walked=0, layoutNode=null;
    let pending=[], requested=new Set(), savedMenu=false, interrupted=null, panelSeen=false;
    const visible=()=>!layer.hidden;
    function hide() {
      layer.hidden=true; document.documentElement.classList.remove('coaching','coach-encounter');
      if(temporaryTab) temporaryTab.removeAttribute('tabindex');
      anchor?.removeAttribute('data-coach-anchor');
      temporaryTab=null; anchor=null; layoutNode=null; fieldPause=false;
    }
    function button(name,callback) {
      const b=document.createElement('button'); b.type='button'; b.dataset.coach=name; b.textContent=labels[name]; b.onclick=callback; actions.append(b); return b;
    }
    function queue(value,manual=false) {
      if ((!manual && (!pref.enabled || pref.done[value])) || id===value || pending.includes(value)) return;
      pending.push(value);
      if(manual)requested.add(value);
    }
    function stop(completed) {
      const was=id; hide(); confirming=false; id=null; current=null;
      if(was==='C' && interrupted && pref.enabled){pending.unshift(interrupted.id);requested.add(interrupted.id);}
      if (completed && was) {pref.done[was]=true;persist();}
      if(was==='C' && ctx.mode()==='pause' && encounterPause) ctx.close();
      encounterPause=false;
      if(!ctx.mode() && !savedMenu && !$('#scroll-entries').hidden)ctx.menu(false);
      const restore=ctx.mode() ? ($('#modal').contains(document.activeElement)?document.activeElement:$('#modal-close')) : focusBefore?.isConnected && bounds(focusBefore) && focusBefore!==document.body ? focusBefore : $('#world');
      restore?.focus({preventScroll:true}); focusBefore=null; nextCheck=0;
    }
    function disable() {interrupted=null;pref.enabled=false;persist();pending=[];requested.clear();invite=false;stop(false);}
    function accept(yes) {invite=false;hide();pref.enabled=yes;persist();if(!yes)pending=[];$('#world').focus({preventScroll:true});nextCheck=0;}
    function dialog(prompt) {
      hide(); layer.dataset.dialog='true'; layer.dataset.step=prompt; layer.dataset.segment=id||'';
      layer.hidden=false;document.documentElement.classList.add('coaching');fieldPause=true;
      card.querySelector('header').textContent=id?segments[id].name:labels.entry;
      $('#coach-title').textContent=labels[prompt];$('#coach-body').textContent='';$('#coach-keys').hidden=true;actions.replaceChildren();
      if(prompt==='invite'){button('accept',()=>accept(true));button('decline',()=>accept(false));}
      else {button('stay',()=>{confirming=false;enter(index);});button('yes',()=>stop(true));}
      actions.firstChild.focus({preventScroll:true});
    }
    function enter(n,back=false) {
      hide(); index=n;
      if(index>=segments[id].steps.length){stop(true);return;}
      current=segments[id].steps[n];
      if(segments[id].panel)current={...current,panel:ctx.mode()}; missing=0; panelSeen=false; nextCheck=0; walked=0; lastPoint=null;
      if(back) ctx.restore(current.panel||'field');
      if(current.menu)ctx.menu(true);
      if(current.panel==='encounter' && ctx.mode()!=='pause'){ctx.pause();encounterPause=true;}
      layoutNode=null;
      refresh(performance.now());
    }
    function advance(){if(id && !confirming)enter(index+1);}
    function paint() {
      layer.dataset.dialog='false'; layer.dataset.segment=id;layer.dataset.step=current.id;layer.dataset.light=!!current.light;
      card.querySelector('header').textContent=segments[id].name+'　'+(index+1)+'/'+segments[id].steps.length;
      $('#coach-title').textContent=current.title;
      const content=copy(current,ctx.controls,root.XiuxianUIHints);
      $('#coach-body').textContent=content.body;
      $('#coach-keys').hidden=!content.keys;$('#coach-keys').textContent=content.keys;
      actions.replaceChildren();
      if(current.advance==='next')button('next',advance);
      button('back',()=>enter(index-1,true)).disabled=index===0;
      button('skip',()=>stop(true));button('disable',disable);
    }
    function resolveAnchor() {
      const choices=Array.isArray(current.anchor)?current.anchor:[current.anchor];
      for(const selector of choices){
        const nodes=[...document.querySelectorAll(selector)];
        for(const el of nodes){if(bounds(el))return el;}
        const scrollable=nodes.find(el=>!el.disabled && el.closest('#modal,#task-tracker') && el.getClientRects().length);
        if(scrollable){scrollable.scrollIntoView({block:'nearest',inline:'nearest'});if(bounds(scrollable))return scrollable;}
      }
      return null;
    }
    function refresh(now) {
      if(!current || confirming)return;
      if(ctx.blocked() || (ctx.mode() && ctx.mode()!==(current.panel==='encounter'?'pause':current.panel))) {
        hide();missing=0;return;
      }
      document.documentElement.classList.toggle('coach-encounter',current.panel==='encounter' && ctx.mode()==='pause');
      if((current.id==='order' && !$('[data-coach-order]')) || (current.id==='execute' && !$('#tactics-execute:enabled'))) {
        if(ctx.mode()==='tactics')current={...current,id:'no-order',anchor:'#tactics-resume',match:null,title:labels.noOrderTitle,body:labels.noOrderBody,result:'field',finish:true};
      }
      const el=resolveAnchor();
      const scroller=el?.closest('.order-scroll');
      if(scroller && layoutNode!==current)scroller.scrollTop+=el.getBoundingClientRect().top-scroller.getBoundingClientRect().top;
      const r=bounds(el);
      if(!r){
        hide();if(!missing)missing=now;
        if(now-missing>=2000){console.warn('[界面引路] 跳过不可见目标',id,current.id,current.anchor);advance();}
        return;
      }
      missing=0;
      if(el!==anchor){
        if(temporaryTab)temporaryTab.removeAttribute('tabindex');temporaryTab=null;anchor?.removeAttribute('data-coach-anchor');anchor=el;el.setAttribute('data-coach-anchor','');
        if(!el.matches(actionable)){el.tabIndex=0;temporaryTab=el;}
      }
      if(layer.hidden || layoutNode!==current){
        paint();layer.hidden=false;document.documentElement.classList.add('coaching');
        fieldPause=!current.light;if(fieldPause)ctx.clearInput();layoutNode=current;card.focus({preventScroll:true});
      }
      if(!allows(document.activeElement))card.focus({preventScroll:true});
      if(ctx.mode()===current.panel)panelSeen=true;
      position(layer,card,ring,arrow,r,current.placement);
    }
    function progressed(s) {
      return s.playTime>1 || Object.values(s.flags).some(Boolean) || s.stats.used>0 || s.chapter.quests.length>0 || s.collection.gear.length>0 || s.campaign.started;
    }
    let encounterPause=false;
    function boot(loaded) {
      interrupted=null;stop(false);pending=[];requested.clear();invite=loaded && !known && progressed(ctx.game().state);
      if(!invite && !known)persist();
    }
    function resetForNewGame() {
      pref = {version:1, enabled:true, done:{}};
      persist();
      boot(false);
    }
    function available(value,g) {
      const s=g.state;
      switch(value) {
        case 'A':return s.map==='garden';
        case 'B':return !g.isChild() && Object.entries(s.inventory).some(([k,n])=>n>0 && (root.XiuxianData.items[k]?.key || root.XiuxianData.items[k]?.self));
        case 'C':return !g.isChild() && !g.inCase() && g.visibleEnemies().some(e=>Math.hypot(e.x-s.x,e.y-s.y)<235 && g.clearLine(s,e,2));
        case 'D':return !g.isChild() && (s.collection.gear.length || s.chapter.quests.length);
        case 'map':return !g.isChild() && (s.flags.complete || s.exploration?.visited?.length>1);
        case 'cases':return s.flags.complete || s.story.stage!=='unstarted';
        case 'sect':return !g.isChild() && s.chapter.rank>=4;
        case 'book':case 'scroll':return !$('#scroll-entries').hidden;
        case 'pause':return ctx.mode()==='pause';
      }
    }
    function tick(now) {
      if(now<nextCheck)return;
      nextCheck=now+70;
      const g=ctx.game();if(!g || !pref.enabled)return;
      if(ctx.blocked()){if(visible())hide();missing=0;return;}
      if(invite){if(!ctx.mode() && !visible())dialog('invite');return;}
      if(!confirming && id!=='C' && !pref.done.C && !ctx.mode() && (!id || current.light) && available('C',g)){
        if(id){interrupted={id,index};stop(false);}
        pending=['C',...pending.filter(value=>value!=='C')];
      }
      const panelLesson=document.querySelector('#modal .cultivation-view')&&ctx.mode()?'cultivationHelp':
        ({sects:document.querySelector('.house-guide')?'houseHelp':null,expedition:document.querySelector('.expedition-control')?'expeditionHelp':null,storyline:'storylineHelp'})[ctx.mode()];
      if(id&&segments[id].panel&&id!==panelLesson)stop(false);
      if(id&&current?.result===ctx.mode()&&current?.advance!=='event'){advance();return;}
      if(panelLesson&&!pref.done[panelLesson]&&id!==panelLesson&&(!id||current?.panel!==ctx.mode())){
        if(id)stop(id==='D'&&current.id==='practice'&&panelLesson==='cultivationHelp');
        id=panelLesson;focusBefore=document.activeElement;enter(0);return;
      }
      if(id){
        if(panelSeen && current.advance==='event' && current.result==='field' && !ctx.mode()){advance();return;}
        if(confirming){if(!visible())dialog('confirm');return;}
        refresh(now);
        if(current?.id==='walk' && visible()){
          const {x,y}=g.state;if(lastPoint)walked+=Math.hypot(x-lastPoint.x,y-lastPoint.y);
          lastPoint={x,y};if(walked>=34)advance();
        }
        return;
      }
      // A modal the player opened belongs to them. Only the pause lesson lives in that modal.
      if(!ctx.mode()){
        for(const value of ['C','A','B','D','cases','sect','map','scroll','book'])
          if(!pref.done[value] && available(value,g))queue(value);
      }else if(ctx.mode()==='pause')queue('pause');
      const i=pending.findIndex(value=>{
        if(value==='pause')return ctx.mode()==='pause' || requested.has(value) && !ctx.mode();
        if(ctx.mode())return false;
        if(value==='C')return available(value,g);
        return requested.has(value) || available(value,g);
      });
      if(i<0)return;
      id=pending.splice(i,1)[0];requested.delete(id);focusBefore=document.activeElement;savedMenu=!$('#scroll-entries').hidden;
      if(id==='pause' && !ctx.mode())ctx.pause();
      const resume=interrupted?.id===id?interrupted.index:0;
      if(interrupted?.id===id)interrupted=null;
      enter(resume);
    }
    function interaction(){if(id==='A' && current.id==='interact')advance();}
    function allows(el){return card.contains(el) || !layer.matches('[data-dialog="true"]') && anchor?.contains(el);}
    function stopEvent(e){e.preventDefault();e.stopImmediatePropagation();}
    function onClick(e) {
      if(!visible() || card.contains(e.target))return;
      if(!allows(e.target)){if(layer.dataset.light!=='true' || layer.dataset.dialog==='true')stopEvent(e);return;}
      const step=current;
      if(!step || step.advance==='next' || step.match && !e.target.closest(step.match)){stopEvent(e);return;}
      if(step.advance==='click'||step.advance==='key'||step.result){
        // The game's native handler gets the click first, including any synchronous panel rebuild.
        setTimeout(()=>{
          if(current!==step || step.result && (ctx.mode()||'field')!==step.result)return;
          if(step.finish)stop(true);else advance();
        });
      }
    }
    document.addEventListener('click',onClick,true);
    for(const type of ['pointerdown','pointerup','wheel','contextmenu'])document.addEventListener(type,e=>{
      if(visible() && (layer.dataset.light!=='true'||layer.dataset.dialog==='true') && !allows(e.target))stopEvent(e);
    },{capture:true,passive:false});
    document.addEventListener('focusin',e=>{if(visible() && !allows(e.target))card.focus({preventScroll:true});},true);
    document.addEventListener('keydown',e=>{
      if(!visible() || e.isComposing)return;
      if(e.key==='Tab'){
        const children=[...(anchor?.querySelectorAll(actionable)||[])].filter(el=>!current?.match || el.matches(current.match));
        const targets=[anchor,...children,...actions.querySelectorAll('button:enabled')].filter(el=>el?.getClientRects().length && el.checkVisibility());
        if(!targets.length)return;
        const i=targets.indexOf(document.activeElement);
        const next=targets[(i+(e.shiftKey?-1:1)+targets.length)%targets.length];
        stopEvent(e);
        if(anchor?.contains(next) && !bounds(next))next.scrollIntoView({block:'nearest'});
        next.focus({preventScroll:true});return;
      }
      if(e.key==='Escape'){
        stopEvent(e);if(e.repeat || invite)return;
        confirming=!confirming;if(confirming)dialog('confirm');else enter(index);return;
      }
      if(e.key==='Enter' || e.key===' '){
        if(e.target.closest('.coach-actions button')){stopEvent(e);if(!e.repeat)e.target.closest('button').click();return;}
        if(!confirming && !invite && e.key==='Enter' && current.advance==='next'){stopEvent(e);if(!e.repeat)advance();return;}
        if(anchor?.contains(e.target) && e.target.matches('button,summary')){stopEvent(e);if(!e.repeat)e.target.click();return;}
      }
      const action=ctx.controls.resolve(e);
      if(current?.advance==='key' && action===current.action && !confirming){
        stopEvent(e);if(!e.repeat)anchor.click();return;
      }
      if(current?.light && !confirming && ['walk','interact'].includes(current.id) && (action?.startsWith('move')||action==='sneak'||action==='interact'))return;
      stopEvent(e);
    },true);
    const reposition=()=>{if(current && visible() && !confirming)refresh(performance.now());};
    window.addEventListener('resize',reposition);document.addEventListener('scroll',reposition,true);
    ctx.controls.subscribe(()=>{if(current && visible() && !confirming){paint();reposition();}});
    function settings(container) {
      if(!container || container.querySelector('.coach-settings'))return;
      const section=document.createElement('section');section.className='coach-settings';
      section.innerHTML='<h3></h3><label class="setting-toggle"><span></span><input type="checkbox"></label><div></div>';
      section.querySelector('h3').textContent=labels.group;section.querySelector('span').textContent=labels.toggle;
      const toggle=section.querySelector('input');toggle.checked=pref.enabled;
      toggle.onchange=()=>{pref.enabled=toggle.checked;if(!toggle.checked)disable();else persist();};
      for(const [value,seg] of Object.entries(segments)){
        const b=document.createElement('button');b.dataset.replay=value;b.textContent=labels.replay+' · '+seg.name;
        b.disabled=!ctx.game();b.onclick=()=>{
          pref.enabled=true;delete pref.done[value];persist();
          ctx.close();ctx.menu(false);
          if(seg.panel){ctx.restore(seg.panel);nextCheck=0;return;}
          pending=pending.filter(p=>p!==value);pending.unshift(value);requested.add(value);
          if(value==='C' && !available(value,ctx.game()))ctx.notify(labels.pending+' · '+seg.name);
          nextCheck=0;
        };section.lastElementChild.append(b);
      }
      container.append(section);
    }
    function afterFrame(){
      // Near-object prompts can appear or disappear in the very movement frame we just drew.
      if(current?.light && !ctx.mode() && !confirming)refresh(performance.now());
    }
    return {tick,afterFrame,boot,resetForNewGame,interaction,settings,get paused(){return fieldPause;},get active(){return visible();}};
  };
})(globalThis);
