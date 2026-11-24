(function (root) {
  'use strict';
  root.XiuxianWorldAtlasUI = function ({game, openModal, closeModal, esc, onArrive, onObjective,onLocate, onTask}) {
    const Atlas = root.XiuxianWorldAtlas;
    const observed=new WeakMap(), discoveries=new WeakMap();
    function observe(){
      const g=game();if(!g)return;
      const visited=Atlas.evidenceOfVisits(g),before=observed.get(g),pending=discoveries.get(g)||new Set();
      if(before&&!g.state.campaign?.ending)for(const id of visited)if(!before.has(id))pending.add(id);
      observed.set(g,new Set(visited));discoveries.set(g,pending);
    }
    let selected = null, feedback = '', centerId = null, cameraResize = null;
    // View-only camera. Logical Atlas points and the Game/save never receive offsets.
    const camera = {zoom:1,x:0,y:0};
    const words = value => esc(value || '');
    function mountCamera(view) {
      const viewport=document.querySelector('.world-atlas-scroll'),map=viewport.querySelector('.world-atlas-map');
      const controls=action=>document.querySelector('[data-atlas-camera="'+action+'"]');
      let drag=null,suppressClick=false;
      const metrics=()=>{const w=viewport.clientWidth,h=viewport.clientHeight,fit=Math.min(w/Atlas.width,h/Atlas.height);return {w,h,fit,bx:(w-Atlas.width*fit)/2,by:(h-Atlas.height*fit)/2};};
      // Labels keep an eight-pixel gutter in screen space. Routes and pin coordinates stay on the map.
      const pins=[...map.querySelectorAll('[data-atlas-point]')].sort((a,b)=>Number(b.classList.contains('is-current'))-Number(a.classList.contains('is-current')));
      const leaders=map.querySelector('[data-atlas-leaders]');
      function arrangeLabels(scale){
        const occupied=[document.querySelector('.atlas-tools').getBoundingClientRect()];
        const mapRect=map.getBoundingClientRect(), lines=[];
        for(const pin of pins){
          const point=view.points.find(p=>p.id===pin.dataset.atlasPoint);
          const cx=mapRect.left+point.x*scale, cy=mapRect.top+point.y*scale;
          const w=pin.offsetWidth,h=pin.offsetHeight;
          let dx=0,dy=0;
          search: for(let ring=0;ring<=12;ring++){
            for(let iy=-ring;iy<=ring;iy++)for(let ix=-ring;ix<=ring;ix++){
              if(Math.max(Math.abs(ix),Math.abs(iy))!==ring)continue;
              const x=ix*34,y=iy*26,rect={left:cx+x-w/2,right:cx+x+w/2,top:cy+y-h/2,bottom:cy+y+h/2};
              if(rect.left<mapRect.left||rect.right>mapRect.right||rect.top<mapRect.top||rect.bottom>mapRect.bottom)continue;
              if(occupied.every(b=>b.right+9<=rect.left||rect.right+9<=b.left||b.bottom+9<=rect.top||rect.bottom+9<=b.top)){
                dx=x;dy=y;occupied.push(rect);break search;
              }
            }
          }
          pin.style.marginLeft=dx/scale+'px';pin.style.marginTop=dy/scale+'px';
          if(dx||dy)lines.push('<line x1="'+point.x+'" y1="'+point.y+'" x2="'+(point.x+dx/scale)+'" y2="'+(point.y+dy/scale)+'"/><circle cx="'+point.x+'" cy="'+point.y+'" r="3"/>');
        }
        leaders.innerHTML=lines.join('');
      }
      function apply(){
        const m=metrics();if(!m.fit)return;
        const scale=m.fit*camera.zoom;
        camera.x=Math.max(m.w*.2-Atlas.width*scale-m.bx,Math.min(m.w*.8-m.bx,camera.x));
        camera.y=Math.max(m.h*.2-Atlas.height*scale-m.by,Math.min(m.h*.8-m.by,camera.y));
        map.style.transform=`translate(${m.bx+camera.x}px,${m.by+camera.y}px) scale(${scale})`;
        map.style.setProperty('--atlas-label-scale',String(1/scale));
        document.getElementById('world-atlas-zoom').textContent=Math.round(camera.zoom*100)+'%';
        arrangeLabels(scale);
        controls('in').disabled=camera.zoom>=2.6;controls('out').disabled=camera.zoom<=.8;
      }
      function zoom(value,at){
        const m=metrics(),next=Math.max(.8,Math.min(2.6,value)),ratio=next/camera.zoom,p=at||{x:m.w/2,y:m.h/2};
        camera.x=p.x-m.bx-(p.x-m.bx-camera.x)*ratio;camera.y=p.y-m.by-(p.y-m.by-camera.y)*ratio;camera.zoom=next;apply();
      }
      function center(id){const p=view.points.find(p=>p.id===id),m=metrics();if(!p||!m.fit)return;camera.x=m.w/2-m.bx-p.x*m.fit*camera.zoom;camera.y=m.h/2-m.by-p.y*m.fit*camera.zoom;apply();}
      function reset(){Object.assign(camera,{zoom:1,x:0,y:0});apply();}
      controls('in').onclick=()=>zoom(camera.zoom*1.25);controls('out').onclick=()=>zoom(camera.zoom/1.25);controls('reset').onclick=reset;
      controls('self').onclick=()=>{selected=view.currentId;centerId=selected;feedback='已居中当前所在。';render();controls('self').focus({preventScroll:true});};
      viewport.onpointerdown=event=>{if(event.button!==0)return;suppressClick=false;drag={id:event.pointerId,x:event.clientX,y:event.clientY,startX:camera.x,startY:camera.y,moved:false};viewport.focus({preventScroll:true});};
      viewport.onpointermove=event=>{
        if(!drag||event.pointerId!==drag.id)return;
        const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)<5)return;
        if(!drag.moved){drag.moved=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');}
        camera.x=drag.startX+dx;camera.y=drag.startY+dy;apply();event.preventDefault();
      };
      function stop(event){if(!drag||event.pointerId!==drag.id)return;suppressClick=drag.moved;drag=null;viewport.classList.remove('is-dragging');if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);}
      viewport.onpointerup=stop;viewport.onpointercancel=stop;
      viewport.addEventListener('click',event=>{if(suppressClick&&event.detail>0){suppressClick=false;event.preventDefault();event.stopImmediatePropagation();}},true);
      viewport.ondragstart=event=>event.preventDefault();
      viewport.addEventListener('wheel',event=>{event.preventDefault();const b=viewport.getBoundingClientRect();zoom(camera.zoom*(event.deltaY<0?1.15:1/1.15),{x:event.clientX-b.left-viewport.clientLeft,y:event.clientY-b.top-viewport.clientTop});},{passive:false});
      viewport.onkeydown=event=>{
        if(['+','=','-','_','0','Home'].includes(event.key)){event.preventDefault();event.stopPropagation();if(['0','Home'].includes(event.key))reset();else zoom(camera.zoom*(['+','='].includes(event.key)?1.25:1/1.25));}
        else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();event.stopPropagation();if(event.key==='ArrowLeft')camera.x+=40;if(event.key==='ArrowRight')camera.x-=40;if(event.key==='ArrowUp')camera.y+=40;if(event.key==='ArrowDown')camera.y-=40;apply();}
      };
      viewport.addEventListener('focusin',event=>{const point=event.target.closest('[data-atlas-point]');if(!point||!viewport.contains(point))return;const p=point.getBoundingClientRect(),v=viewport.getBoundingClientRect();if(p.left<v.left||p.right>v.right||p.top<v.top||p.bottom>v.bottom)center(point.dataset.atlasPoint);});
      cameraResize?.disconnect();if(root.ResizeObserver){cameraResize=new root.ResizeObserver(apply);cameraResize.observe(viewport);}apply();if(centerId){center(centerId);centerId=null;}
    }
    function detail(point, view) {
      if (!point) return '<div class="world-atlas-detail"><h3>循路观山河</h3><p>点击已知地标，查看到访记录与当前去向。</p></div>';
      const next = point.current && view.points.find(item => !item.visited && item.reachable && item.route);
      return `<div class="world-atlas-detail" data-atlas-detail="${words(point.id)}">
        <p class="world-atlas-kicker">${words(point.region)} · ${words(point.status)}</p><h3>${words(point.title)}</h3>
        <p>${point.visited ? '此处已留下本次旅程的足迹。' : '道路已经知晓，实际到访后才揭开细节。'}${view.ended ? '本次行程已经收束，可回看沿途。' : point.current ? '你现在就在这里。' : point.reachable ? '当前规则允许沿路前往。' : '当前无法沿已开通的道路到达。'}</p>
        ${point.current && view.objective?.length ? `<div class="world-atlas-current-goal"><b>眼前的事</b><p>${words(view.objective.join(' · '))}</p><button id="atlas-track" class="primary">追踪此目标</button></div>` : ''}
        <div class="world-atlas-detail-actions">
          ${Atlas.flightLanding(game(),point.id)?'<button class="primary" id="atlas-fly">御剑速行至此</button>':''}
          ${point.route && onLocate ? `<button data-atlas-locate="${words(point.id)}">标记当前出口</button><small>${point.route.expedition ? '入旧阵后按当局路线前往。' : '标出当前出口，循路前往。'}</small>` : ''}
          ${next ? `<button class="secondary" data-atlas-point="${words(next.id)}">查看去向 · ${words(next.label)}</button>` : ''}
          ${point.tasks.map(task => `<button class="secondary" data-atlas-task="${words(task.panelId || '')}">${words(task.title)} · ${words(task.status)}</button>`).join('')}
        </div>
        ${feedback ? `<p class="world-atlas-feedback" role="status">${words(feedback)}</p>` : ''}
      </div>`;
    }
    function render() {
      const g = game(), view = Atlas.snapshot(g); if (!view) return;
      const goal = root.XiuxianGuide?.goalFor(g);
      view.objective = goal?.text ? [goal.text] : [];
      observe();const newly=discoveries.get(g)||new Set();
      if (!view.points.some(point => point.id === selected)) selected = view.currentId;
      const point = view.points.find(item => item.id === selected), pointMap = new Map(view.points.map(item => [item.id, item]));
      const curve = path => {const a = pointMap.get(path.from), b = pointMap.get(path.to);return `M${a.x},${a.y} Q${(a.x+b.x)/2+14},${(a.y+b.y)/2-18} ${b.x},${b.y}`;};
      const holes = view.points.map(item => `<circle class="${newly.has(item.id)&&item.visited?'world-atlas-reveal':''}" cx="${item.x}" cy="${item.y}" r="${item.visited ? 105 : 64}" fill="url(#world-atlas-feather)"/>`).join('') + view.paths.map(path => `<path d="${curve(path)}" stroke="black" stroke-width="24" fill="none"/>`).join('');
      const paths = view.paths.map(path => `<path class="${path.open ? 'is-open' : 'is-remembered'}" d="${curve(path)}"/>`).join('');
      const beyond = view.points.some(item => ['reincarnation-hall','world-mill'].includes(item.id));
      openModal('worldAtlas', `<div class="world-atlas">
        <header class="world-atlas-heading"><div><p class="eyebrow">山行闻见录 · 山河有迹</p><h2 id="modal-title">${view.title}</h2></div><b class="world-atlas-counter">已到访 ${view.visitedCount} / ${view.totalCount} 处</b></header>
        <details class="atlas-info"><summary>ⓘ 阅图说明</summary><p>${view.subtitle}</p><p>${view.note}</p></details>
                <div class="world-atlas-layout">
          <div class="world-atlas-map-pane"><div class="atlas-tools"><div class="world-atlas-legend"><span><i class="atlas-legend-current"></i>身在此处</span><span><i class="atlas-legend-visited"></i>已经到访</span><span><i class="atlas-legend-known"></i>已知去向</span><span><i class="atlas-legend-fog"></i>远方迷雾</span><small>点击地标查看 · 标记出口后亲自行走</small></div>
        <div class="world-atlas-camera-tools" aria-label="舆图视角">
          <button type="button" data-atlas-camera="out" aria-label="缩小舆图">−</button><output id="world-atlas-zoom" aria-live="polite" aria-label="舆图缩放">100%</output><button type="button" data-atlas-camera="in" aria-label="放大舆图">＋</button>
          <button type="button" class="secondary" data-atlas-camera="reset" aria-label="复位舆图">复位舆图</button><button type="button" class="secondary" data-atlas-camera="self" aria-label="定位自身">定位自身</button>
          <span>拖动阅图 · 滚轮或＋/−缩放 · 方向键平移 · Home复位</span>
        </div>
</div><div class="world-atlas-scroll" tabindex="0" aria-label="山河示意，拖动平移，滚轮或加减键缩放，Home复位，Tab选择地标，Enter查看"><div class="world-atlas-map" aria-label="本次行旅地图">
            <img class="world-atlas-background" src="${Atlas.asset}" alt="国风山河手绘底图，方位按行程示意" draggable="false">
            <svg class="world-atlas-lines" viewBox="0 0 ${Atlas.width} ${Atlas.height}" preserveAspectRatio="none" aria-hidden="true">${paths}<defs><radialGradient id="world-atlas-feather"><stop offset="0" stop-color="black"/><stop offset=".55" stop-color="black"/><stop offset="1" stop-color="black" stop-opacity="0"/></radialGradient><mask id="world-atlas-fog"><rect width="1000" height="680" fill="white"/>${holes}</mask></defs><rect class="world-atlas-fog" width="1000" height="680" mask="url(#world-atlas-fog)"/><g data-atlas-leaders></g></svg>
            ${beyond ? '<div class="world-atlas-beyond" aria-hidden="true"><span>界外行程</span></div>' : ''}
            ${view.points.map(item => `<button class="world-atlas-point ${item.current ? 'is-current' : item.visited ? 'is-visited' : 'is-known'} ${selected === item.id ? 'is-selected' : ''}" style="left:${item.x/10}%;top:${item.y/6.8}%" data-atlas-point="${words(item.id)}" aria-pressed="${selected === item.id}" aria-label="${words(item.title)}，${words(item.status)}"><i></i><span>${words(item.label)}</span></button>`).join('')}
            <p class="world-atlas-fog-caption">未曾行至 · 云深不知处</p>
          </div></div></div>
          <aside class="world-atlas-aside clarity-paper-card" aria-label="地标、去向与势力">${detail(point, view)}
            <div class="world-atlas-factions"><h3>沿途势力与往来</h3><div>${view.factions.map(faction => `<span>${words(faction)}</span>`).join('') || '尚未留下行旅记录。'}</div><p>按已访行程列示各方渊源。</p><details><summary>尚无独立山门的势力</summary><p>丹鼎门、百草谷与法华宗散见于沿途丹房与野圃，不设独立山门。</p></details></div>
          </aside>
        </div>
        <div class="world-atlas-footer"><small>Tab 选择地标，Enter 查看。${g.relaxed?'已访安全地标可御剑速行。':'点击地标可查去向与出口。'}</small><button class="secondary" id="world-atlas-close">收起行旅图</button></div>
      </div>`);
      const flight=document.getElementById('atlas-fly');
      if(flight)flight.onclick=()=>{if(Atlas.fly(g,point.id)){closeModal();onArrive?.();}else render();};
      const track=document.getElementById("atlas-track");if(track)track.onclick=()=>{closeModal();onObjective?.();};
      document.querySelectorAll('[data-atlas-point]').forEach(button => button.onclick = () => {
        selected = button.dataset.atlasPoint; feedback = ''; render();
        document.querySelector('.world-atlas-map [data-atlas-point="' + selected + '"]')?.focus({preventScroll:true});
      });
      document.querySelectorAll('[data-atlas-locate]').forEach(button => button.onclick = () => {
        const target = view.points.find(item => item.id === button.dataset.atlasLocate);
        if (target?.route && onLocate) {
          if (onLocate({...target.route}) !== false) closeModal();
          else {feedback='当前出口暂不可标记，回到场景后可按任务指引寻路。';render();}
        }
      });
      document.querySelectorAll('[data-atlas-task]').forEach(button => button.onclick = () => {if (button.dataset.atlasTask && onTask) onTask(button.dataset.atlasTask);});
      document.getElementById('world-atlas-close').onclick = closeModal;
      for(const id of newly)document.querySelector('.world-atlas-map [data-atlas-point="'+id+'"]')?.classList.add('is-newly-discovered');
      discoveries.delete(g);
      mountCamera(view);
    }
    return {show(pointId=null) {selected = pointId; feedback = ''; centerId=pointId;Object.assign(camera,{zoom:1,x:0,y:0});render();}, render, observe, dispose(){cameraResize?.disconnect();cameraResize=null;}};
  };
})(globalThis);
