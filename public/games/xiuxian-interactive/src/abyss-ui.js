(function(root){
  'use strict';
  const D=root.XiuxianArmoryData,A=root.XiuxianArt,V=root.XiuxianAvatar,W=root.XiuxianWeapons,C=root.XiuxianCombat,$=id=>document.getElementById(id);
  function loot(c,d,t){
    const p=Math.min(1,d.age/.38),x=d.fromX+(d.x-d.fromX)*p,y=d.fromY+(d.y-d.fromY)*p-Math.sin(p*Math.PI)*54;
    const grade=d.item.grade,col=D.grades[grade].color;
    if(d.landed&&grade){
      const h=[0,38,72,160,228,292][grade],w=grade+5,grad=c.createLinearGradient(0,y-h,0,y);
      grad.addColorStop(0,col+'00');grad.addColorStop(.5,col+'60');grad.addColorStop(1,col+'cc');
      V.poly(c,[[x-w*1.5,y-h],[x+w*1.5,y-h],[x+w*.6,y],[x-w*.6,y]],grad);
      if(grade===5){for(let i=0;i<7;i++){const tone='hsla('+((t*65+i*42)%360)+' 100% 78% / .72)';V.line(c,[[x+Math.sin(t+i)*9,y],[x+Math.sin(t+i+.6)*10,y-h*.7]],tone,1.7);}}
      V.oval(c,x,y,14+(t%1)*12,5+(t%1)*4,col,2);
    }
    V.poly(c,[[x,y-17],[x+10,y-10],[x+7,y-1],[x-5,y+1],[x-10,y-8]],col,'#fff5c8');
  }
  function drawLootLabels(c,drops,occupied){
    c.font='bold 20px "Microsoft YaHei",sans-serif';c.textAlign='center';
    for(const drop of drops){
      if(!drop.landed||drop.item.grade<3)continue;
      const grade=D.grades[drop.item.grade],text=grade.name+' · '+D.bases[drop.item.base].name;
      const width=c.measureText(text).width+14,origin=Math.min(730,drop.y+6);
      let position;
      for(const offset of [0,-width,width,-2*width,2*width]){
        const left=Math.max(4,Math.min(1276-width,drop.x+offset-width/2));
        for(let row=0;row<51;row++){
          const top=origin+(row%2?1:-1)*Math.ceil(row/2)*30;
          if(top<56||top>730)continue;
          const right=left+width,bottom=top+26;
          if(occupied.some(b=>left<b.right+3&&right>b.left-3&&top<b.bottom+2&&bottom>b.top-2))continue;
          position={left,right,top,bottom};break;
        }
        if(position)break;
      }
      if(!position)continue;
      const {left,top}=position,cx=left+width/2;
      if(Math.abs(top-origin)>2||Math.abs(cx-drop.x)>10)V.line(c,[[drop.x,drop.y],[cx,top<origin?top+26:top]],grade.color,1);
      occupied.push(position);c.fillStyle='#17212b';c.fillRect(left,top,width,26);c.fillStyle=grade.color;c.fillText(text,cx,top+20);
    }
  }
  function paint(c,run,view,reduced){
    const g=run.actor,s=g.state,t=reduced?0:run.clock,evfx=root.XiuxianEnemyVfx;
    const fx=evfx?evfx.observe(run,run.enemies,run.clock,reduced):{hitStop:false,shakeX:0,shakeY:0};
    if(fx.hitStop&&!run.paused)return;
    c.save();c.clearRect(0,0,1280,760);
    const lootShake=!reduced&&view.options.shake&&run.lootNotice&&run.clock<run.lootNotice.until-1.99?Math.sin(t*88)*3:0;
    const sx=lootShake+(view.options.shake?fx.shakeX:0),sy=view.options.shake?fx.shakeY:0;
    const stage=run.activity==='demon'?4:run.secret==='tomb'?2:Math.floor((run.floor-1)/5)%5;
    const arena=!run.contract&&run.activity!=='dummy'&&A.reborn[A.arenas[stage]];
    c.drawImage(arena||A.images.ruins,-6+sx,-6+sy,1292,772);c.fillStyle=arena?'#16152e18':'#16152e57';c.fillRect(0,0,1280,760);W.ground(c,g.arsenal);
    if(run.secret==='market'){
      view.sprite(c,'chapterPeople',2,725,383,117);
      view.text(c,'黑市孤品奇商',725,254,'#fff1bf',23);
      run.stock.forEach((o,i)=>{
        const x=538+i*175;
        view.sprite(c,'props',6,x,470,65);
        view.text(c,o.sold?'已售':o.item?D.bases[o.item.base].name:o.effect?D.legendary.effects[o.effect][0]+'珠':'太古劫晶',x,502,'#ffe1ac',19);
      });
    }
    if(run.secret==='tomb'){
      view.sprite(c,'props',2,685,405,70);
      V.blade(c,686,361,Math.PI,56,'#e2ddff',3);view.text(c,'石中残剑',685,437,'#ffedc7',18);
    }
    for(const lootbox of run.chests){view.sprite(c,'props',6,lootbox.x,lootbox.y,55);view.text(c,'宝库灵匣',lootbox.x,lootbox.y+18,'#fff2c8',17);}
    evfx?.remnants(c,run,run.clock,reduced,e=>{
      if(e.trueBoss)view.heartDemon(c,e,g,run.store,t,true);
      else if(run.contract)root.XiuxianBountyUI.creature(c,e,run.contract);
      else view.sprite(c,'characters',e.boss||e.elite?9:10,e.x,e.y,e.boss?151:e.elite?103:74,e.x<s.x);
    });
    const activeBoss=run.activity!=='dummy'&&run.enemies.find(e=>e.hp>0&&(e.boss||e.trueBoss));
    const occupied=[];
    if(activeBoss)occupied.push({left:286,right:994,top:10,bottom:94});
    const actors=run.enemies.filter(e=>e.hp>0).map(e=>({y:e.y,draw:()=>{
      const h=e.boss?151:e.elite?103:74;evfx.ground(c,e,h,t,reduced);
      if(evfx&&e.anim&&run.activity!=='dummy')evfx.beforeBody(c,e,h,t,reduced);
      c.save();
      if(evfx&&e.anim&&run.activity!=='dummy')evfx.applyPose(c,e,h,t,reduced);
      else if(run.activity==='dummy'&&e.anim?.state==='broken')evfx?.beforeBody(c,e,h,t,reduced);
      if(run.activity!=='dummy')evfx.arrival(c,e,t,reduced);
      if(e.trueBoss){
        view.heartDemon(c,e,g,run.store,t,reduced);
      }else if(run.activity==='dummy')view.sprite(c,'props',2,e.x,e.y,100);
      else if(run.contract)root.XiuxianBountyUI.creature(c,e,run.contract);
      else view.sprite(c,'characters',e.boss||e.elite?9:10,e.x,e.y,h,e.x<s.x);
      c.restore();
      if(evfx&&e.anim)evfx.afterBody(c,e,h,t,reduced);
      if((e.elite||e.boss)&&e.anim?.state!=='broken')V.oval(c,e.x,e.y-h-8,h*.23,6,'#e8c575',2.5);
      const broken=e.anim?.state==='broken',name=e.name+(broken?' · 破防 '+Math.max(0,2.5-e.anim.t).toFixed(1)+'秒':e.affix?' · '+[e.affix,e.secondAffix].filter(Boolean).join(' / '):'');
      c.font='bold 19px "Microsoft YaHei",sans-serif';c.textAlign='center';const w=c.measureText(name).width+16;
      // Keep broken nameplate cleanly above 「破防！」 (-54) and below Boss bar (96)
      const plateY=broken?Math.max(activeBoss?98:12,e.y-h-110):Math.max(activeBoss?98:12,e.y-h-39);
      const plateBox={left:e.x-w/2,right:e.x+w/2,top:plateY,bottom:plateY+27};
      occupied.push(plateBox);
      if(broken){
        const breakBox={left:e.x-58,right:e.x+58,top:e.y-h-72,bottom:e.y-h-36};
        occupied.push(breakBox);
        run._lastBreakLayout={plate:plateBox,callout:breakBox};
      }
      c.fillStyle=broken?'#291834ee':'#211d29';c.fillRect(e.x-w/2,plateY,w,27);
      if(broken){c.strokeStyle='#d7adff';c.lineWidth=1.4;c.strokeRect(e.x-w/2,plateY,w,27);}
      c.fillStyle=broken?'#ffe69e':e.elite||e.boss?'#ffe3a0':'#fff2dc';c.fillText(name,e.x,plateY+20);
      c.fillStyle='#241d28';c.fillRect(e.x-34,e.y-h-8,68,5);c.fillStyle='#ffab87';c.fillRect(e.x-33,e.y-h-7,66*e.hp/e.maxHp,3);
      root.XiuxianPoise.bar(c,e,e.x-34,e.y-h-2,68);
    }}));
    actors.push({y:s.y,draw:()=>{view.shadow(c,s.x,s.y,29);const child=run.main.isChild(),aged=run.main.bodyProfile().appearance==='mortal-aged',cell=(s.gender==='male'?(child?1:4):0)+(!child&&g.moving?1+Math.floor(t*8)%2:0);
      if(!reduced&&g.dash>0)V.dashEcho(c,child?'chapterPeople':aged?'mortalAged':'characters',cell,s.x,s.y,94,g.dashVector,run.store.summary().look.robe?.style);
      V.draw(c,{reduced,x:s.x,y:s.y,atlas:child?'chapterPeople':aged?'mortalAged':'characters',cell,flip:g.face.x<0,time:t,moving:g.moving,swing:g.attackCd*.9,summary:run.store.summary()});}});
    for(const a of actors.sort((a,b)=>a.y-b.y))a.draw();
    W.paint(c,g.arsenal,t);for(const d of run.drops)loot(c,d,t);
    const hits=new Map();for(const f of g.effects)if(f.kind==='number'&&f.age<.48){const id=f.recipientId;let row=hits.get(id);
      const foe=run.enemies.find(e=>e.id===id);
      if(!row){row={x:f.x,y:f.y,amount:0,count:0,age:f.age,broken:foe?.anim?.state==='broken',heavy:f.accent==='weak'||f.accent==='finisher'};hits.set(id,row);}
      row.amount+=Math.abs(parseInt(f.text,10)||0);row.count++;row.age=Math.min(row.age,f.age);if(f.accent==='weak'||f.accent==='finisher')row.heavy=true;}
    const overlaps=(a,b)=>a.left<b.right+4&&a.right>b.left-4&&a.top<b.bottom+4&&a.bottom>b.top-4;
    for(const row of hits.values()){
      if(!row.amount)continue;
      const boosted=row.broken||row.heavy,pop=boosted&&!reduced?Math.sin(Math.min(1,row.age/.22)*Math.PI)*8:0;
      const sz=boosted?24:19,text=(boosted?'★ ':'')+'−'+row.amount+(row.count>1?' ×'+row.count:'');
      c.font='bold '+sz+'px "Microsoft YaHei",sans-serif';const width=c.measureText(text).width+14,boxH=sz+6;
      let x=Math.min(1210,Math.max(70,row.x+(row.broken?96:62))),y=Math.max(activeBoss?128:88,row.y-72);
      for(let tries=0;tries<8;tries++){
        const box={left:x-width/2,right:x+width/2,top:y-sz-2-pop,bottom:y+4-pop};
        if(!occupied.some(b=>overlaps(box,b)))break;
        y+=boxH+4;if(y>700){y=Math.max(128,row.y-72);x=Math.min(1210,x+width+12);}
      }
      const finalBox={left:x-width/2,right:x+width/2,top:y-sz-2-pop,bottom:y+4-pop};
      occupied.push(finalBox);
      c.fillStyle=boosted?'#2f1c1ce8':'#24251fde';c.fillRect(finalBox.left,finalBox.top,width,boxH);
      if(boosted){c.strokeStyle='#ffd67a';c.lineWidth=1.3;c.strokeRect(finalBox.left,finalBox.top,width,boxH);}
      view.text(c,text,x,y-pop,boosted?'#ffe48f':'#fff1c2',sz);
    }
    // Perfect dodge cyan-gold afterimage arc + calligraphic 「身法！」
    if(g.arsenal.clock<g.arsenal.rhythm.freezeUntil+.55){
      const age=Math.max(0,g.arsenal.clock-(g.arsenal.rhythm.freezeUntil-.05)),alpha=Math.max(0,1-age/.55);
      if(!reduced){
        c.save();c.globalAlpha=alpha*.48;
        const vg=c.createRadialGradient(640,380,340,640,380,740);
        vg.addColorStop(0,'rgba(84,220,196,0)');vg.addColorStop(.72,'rgba(84,220,196,0.16)');vg.addColorStop(1,'rgba(244,214,126,0.34)');
        c.fillStyle=vg;c.fillRect(0,0,1280,760);
        c.globalAlpha=alpha*.88;c.translate(g.state.x,g.state.y-36);
        c.strokeStyle='#7ef0d6';c.lineWidth=3.4;c.beginPath();c.arc(0,0,36+age*42,-.95,.9);c.stroke();
        c.strokeStyle='#ffe49b';c.lineWidth=2.2;c.beginPath();c.arc(0,0,46+age*52,Math.PI-.8,Math.PI+.8);c.stroke();
        c.restore();
      }
      c.save();c.translate(g.state.x,g.state.y-84-(reduced?0:age*18));
      c.font='900 27px "STKaiti","KaiTi",serif';c.textAlign='center';c.lineJoin='round';
      c.strokeStyle='#102424';c.lineWidth=5.5;c.strokeText('身法！',0,0);
      const dg=c.createLinearGradient(0,-14,0,10);dg.addColorStop(0,'#eafffa');dg.addColorStop(.5,'#8cf2d8');dg.addColorStop(1,'#ffe496');
      c.fillStyle=dg;c.fillText('身法！',0,0);c.restore();
    }
    evfx?.title(c,run,run.clock,1280,118,reduced);
    drawLootLabels(c,run.drops,occupied);
    if(activeBoss&&evfx){
      evfx.drawBossBar(c,activeBoss,290,14,700,{
        time:t,reduced,
        title:activeBoss.name,
        sub:activeBoss.trueBoss?'太虚问心 · 第 '+activeBoss.phase+' 阶段':run.contract?run.contract.move:'第 '+run.floor+' 层 · '+(activeBoss.affix||'镇守首领')
      });
    }
    if(run.lootNotice&&run.clock<run.lootNotice.until){if(!reduced&&run.clock<run.lootNotice.until-2.05){c.fillStyle='#ffe6a51c';c.fillRect(0,0,1280,760);}
      const ny=activeBoss?88:16;
      c.fillStyle='#36291a';c.fillRect(435,ny,410,37);view.text(c,'灵匣现世　'+run.lootNotice.name,640,ny+26,'#ffe3a0',22);}
    // Threat outlines must remain visible above every world effect and treasure.
    // Shared threat geometry, painted last even when a beam and a boss occupy the same pixels.
    for(const e of run.enemies){
      if(e.hp>0&&e.telegraph){
        const dur=Math.max(.2,e.anim?.duration||(e.boss?.98:.8));
        const prog=e.anim?.state==='windup'?Math.min(1,Math.max(.2,e.anim.t/dur)):(e.wind>0?Math.min(1,Math.max(.2,1-e.wind/dur)):1);
        root.XiuxianHazardGeo.draw(c,e.telegraph,-1,prog,t);continue;
      }
      const threat=C.threat(e);if(!threat)continue;const a=threat.area;
      V.oval(c,a.x,a.y,a.r,a.r,'#b6483324',1,true);V.oval(c,a.x,a.y,a.r,a.r,'#261d20',8);V.oval(c,a.x,a.y,a.r,a.r,'#ffb49b',3.5);
      c.beginPath();c.arc(a.x,a.y,a.r+7,-Math.PI/2,-Math.PI/2+threat.progress*Math.PI*2);c.strokeStyle='#fff4df';c.lineWidth=2;c.stroke();}
    for(const h of run.areas)root.XiuxianHazardGeo.draw(c,h.shape,h.time,1,t);
    for(const h of run.echoes){V.oval(c,h.x,h.y,h.r,h.r,'#261d20',8);V.oval(c,h.x,h.y,h.r,h.r,'#ffb49b',3.5);}
    if(run.contract)root.XiuxianBountyUI.warnings(c,run);
    c.restore();
  }
  function create({game,store,openModal,closeModal,returnToBounty,view,sound,save,controls}){
    let run=null,keys=new Set(),last=0,signature='',sidebarSig='',lastCombo=0,held=false,aim=null,shownDps=0,bestPeak=0,recordUntil=0;
    const options=view.options;
    const flameSvg=(lit)=>`<svg class="pact-flame ${lit?'is-lit':''}" width="18" height="22" viewBox="0 0 20 24" aria-hidden="true"><path d="M10 1c1 5 6 7 6 13a6 6 0 1 1-12 0c0-3 2-6 3-8 0 2 1 3 2 3-1-3 0-6 1-8z" fill="${lit?'#ff863b':'#3d3338'}" stroke="${lit?'#ffe59b':'#66585c'}" stroke-width="1.2"/><path d="M10 9c1 2 3 4 3 6a3 3 0 1 1-6 0c0-2 2-4 3-6z" fill="${lit?'#fff0b5':'#2b2328'}"/></svg>`;
    function lobby(){
      run=null;const high=store.state.abyss.highestFloor,nInit=store.state.abyss.contracts.length,sum=store.summary(),demonOk=root.XiuxianAbyss.demonUnlocked(store.state);
      const brief=`<section class="focus-brief clarity-paper-card" aria-label="此刻重点">
        <div class="focus-brief-main">
          <span class="focus-kicker">此刻重点 · 万象天渊</span>
          <div class="focus-chips">
            <span class="focus-chip is-met">✓ 当前战力 <b>${sum.power}</b></span>
            <span class="focus-chip ${high>=5?'is-met':'is-info'}">${high>=5?'✓':'◆'} 最高已通 <b>${high}</b> 层</span>
            <span class="focus-chip ${demonOk?'is-met':'is-gap'}">${demonOk?'✓ 问道真魔已解锁':'✕ 真魔需通 20 层且 3 热度胜首领'}</span>
          </div>
          <p class="focus-summary">携装入渊刷宝，每 5 层逢首领；趁敌蓄力以功法或末击破防，追伤 2.5 秒（×1.8）。</p>
        </div>
        <div class="focus-brief-cta">
          <label class="focus-inline-field">起始层 <select id="abyss-node"><option value="1">第一层</option>${Array.from({length:Math.min(100,Math.floor(high/5))},(_,i)=>{const f=high>=500?(Math.floor(high/5)-i)*5:(i+1)*5;return `<option value="${f}">第 ${f} 层</option>`;}).join('')}</select></label>
          ${high>500?'<input id="abyss-floor-input" aria-label="其余已解锁层数" type="number" min="5" step="5" placeholder="输入其他节点">':''}
          <button id="abyss-enter" class="primary">进入天渊</button>
          <button id="demon-enter" class="secondary demon-seal-btn" ${demonOk?'':'disabled'}>问道真魔</button>
        </div>
      </section>`;
      openModal('abyss',`<div class="loot-shell abyss-lobby"><header><div><small>药庐阵台 · 无尽秘境</small><h2 id="modal-title">万象天渊</h2></div><span class="abyss-meta-pill">鸿运 <b>${store.state.fortune}/100</b> · 入渊 ${store.state.abyss.totalRuns} 次</span></header>${brief}<div class="abyss-entry"><div>
      <fieldset class="pact-wall" data-heat="${nInit}"><legend><span class="pact-title">劫难契约</span><span id="pact-flames" class="pact-flames" aria-hidden="true"></span></legend><div class="pact-list">${Object.entries(D.legendary.contracts).map(([id,[name,rule]])=>{const on=store.state.abyss.contracts.includes(id);return `<label class="pact-slip ${on?'is-active':''}"><input type="checkbox" data-pact="${id}" ${on?'checked':''}><i class="pact-seal" aria-hidden="true">劫</i><span><b>${name}</b>　${rule}</span></label>`;}).join('')}</div><output id="pact-heat"></output></fieldset>
      <p class="abyss-subtle-note">通第 20 层且以 3 热度以上斩过首领，即可开启「问道真魔」。${store.state.achievements.includes('斩魔问心')?'　<strong class="demon-title-badge">★ 称号 · 斩魔问心</strong>':''}</p>
      ${store.state.abyss.forgeBoxes?`<div class="forge-box-bar"><label>太古神兵自选锻造匣 <select id="forge-box-school">${Object.keys(D.weapons).map(k=>'<option value="'+k+'">'+D.bases['ancient_'+k].name+'</option>').join('')}</select></label><button id="forge-box-open">开匣铸成</button></div>`:''}</div></div></div>`);
      const pacts=document.querySelector('.pact-wall');
      function heat(pulse=false){
        const n=store.state.abyss.contracts.length;
        pacts.dataset.heat=String(n);
        const fl=$('pact-flames');
        if(fl)fl.innerHTML='<span class="pact-heat-tag">劫难烈度</span>'+Array.from({length:5},(_,i)=>flameSvg(i<n)).join('');
        for(const slip of pacts.querySelectorAll('.pact-slip'))slip.classList.toggle('is-active',slip.querySelector('input').checked);
        const out=$('pact-heat');
        out.textContent='热度 '+n+'/5　高品 +'+(12*n)+'%　锻材 +'+(25*n)+'%　仙玉 +'+(30*n)+'%　劫晶爆率 +'+(35*n)+'%';
        if(pulse&&!options.reducedMotion){out.classList.remove('is-pulsing');void out.offsetWidth;out.classList.add('is-pulsing');}
      }
      pacts.onchange=()=>{store.change(s=>{s.abyss.contracts=[...pacts.querySelectorAll(':checked')].map(el=>el.dataset.pact);});heat(true);};heat(false);
      $('demon-enter').onclick=()=>{run=new root.XiuxianAbyss.Run(game(),store,20,Math.random,null,'demon');run.sound=name=>sound.play(name,.8);battle();};
      if($('forge-box-open'))$('forge-box-open').onclick=()=>{if(store.openForgeBox($('forge-box-school').value))lobby();};
      $('abyss-enter').onclick=()=>{const floor=Number($('abyss-floor-input')?.value||$('abyss-node').value);if(floor!==1&&(floor%5||floor>high||floor<5))return;
        run=new root.XiuxianAbyss.Run(game(),store,floor);run.sound=name=>sound.play(name,.8);battle();};
    }
    function practice(){run=new root.XiuxianAbyss.Run(game(),store,1,Math.random,null,'dummy');run.sound=name=>sound.play(name,.8);battle();}
    function hunt(row){run=new root.XiuxianBounty.Hunt(game(),store,row);run.sound=name=>sound.play(name,.8);battle();}
    function renderSidebar(){
      const el=$('abyss-tactical-sidebar');
      if(!el||!run||run.activity==='dummy')return;
      const g=run.actor,ar=g.arsenal,r=ar.rhythm,lg=ar.legend,sum=store.summary();
      const remain=r.count?Math.max(0,3.5-(ar.clock-r.last)):0;
      const comboPct=Math.min(100,Math.round(remain/3.5*100));
      const counterLeft=Math.max(0,r.counterUntil-ar.clock);
      const soulStage=sum.soulStage||0,strikes=ar.strikes%5,soulWaveCd=Math.max(0,(ar.soulReady||0)-ar.clock);
      const legendItems=Object.values(sum.worn).filter(Boolean).flatMap(it=>{
        const rows=[];
        if(it.legendary&&D.legendary.effects[it.legendary]){
          const k=it.legendary,name=D.legendary.effects[k][0];
          let stat='常驻';
          if(k==='momentum')stat=lg.combo?lg.combo+'/15 层':'待叠';
          else if(k==='last_stand')stat=lg.rage?'+'+(lg.rage*8)+'%伤':'满血';
          else if(k==='spirit_seal')stat=lg.freeSpirit?Math.max(0,lg.sealUntil-ar.clock).toFixed(1)+'s':'待符';
          else if(k==='reprieve')stat=g.reprieveCd>0?'冷 '+Math.ceil(g.reprieveCd)+'s':'就绪';
          else if(k==='ice_mirror')stat=ar.clock<lg.mirrorAt?'蓄镜':'就绪';
          rows.push({kind:'legend',name,stat});
        }
        if(D.legendary.curses[it.base]){
          const k=it.base,name=D.legendary.curses[k][0];
          let stat='双刃';
          if(k==='wager_ring')stat='+'+(Math.min(10,Math.floor(lg.elapsed/5))*6)+'%';
          else if(k==='asura_robe')stat='+45%伤';
          else if(k==='blood_blade')stat='+95%暴';
          else if(k==='heart_jade')stat='冷却减半';
          rows.push({kind:'curse',name,stat});
        }
        return rows;
      });
      const sets=Object.entries(sum.sets).filter(([,n])=>n>=2);
      const sig=[r.count,r.rank,Math.round(remain*5),counterLeft>0?Math.ceil(counterLeft*5):0,soulStage,strikes,Math.ceil(soulWaveCd),legendItems.map(x=>x.name+x.stat).join(','),sets.map(([k,n])=>k+n).join(','),run.heat,run.floor].join('|');
      if(sig===sidebarSig)return;
      const bumped=r.count>lastCombo&&r.count>0;
      lastCombo=r.count;sidebarSig=sig;
      el.innerHTML=`
        <section class="tac-card combo-stage rank-${r.rank} ${bumped?'is-bump':''}">
          <div class="tac-head"><span>连击剑势</span><small>${r.rank?'移速+'+(r.rank*3)+'% · 暴+'+(r.rank*4)+'%':'连击不绝'}</small></div>
          <div class="combo-num-row"><strong class="combo-count">${r.count}</strong><span>连</span><em class="combo-rank-label">${r.label||'起势中'}</em></div>
          <div class="combo-bar"><i style="width:${comboPct}%"></i></div>
          ${counterLeft>0?`<div class="dodge-counter-pill">⚡ 灵步反击 · ${counterLeft.toFixed(1)}s 必暴</div>`:''}
        </section>
        <section class="tac-card">
          <div class="tac-head"><span>器魂与魔器</span><small>${legendItems.length} 项生效</small></div>
          ${legendItems.length?`<ul class="tac-list">${legendItems.slice(0,5).map(x=>`<li class="is-${x.kind}"><span>${x.kind==='curse'?'◆':'★'} ${x.name}</span><b>${x.stat}</b></li>`).join('')}</ul>`:'<p class="tac-empty">穿戴传奇或魔器后实时显影冷却</p>'}
        </section>
        <section class="tac-card">
          <div class="tac-head"><span>套装共鸣</span><small>${sets.length?sets.length+' 套激活':'未成套'}</small></div>
          ${sets.length?`<div class="tac-chips">${sets.map(([k,n])=>`<span class="tac-chip ${n>=4?'is-full':''}">${D.sets[k][0]} <b>${n}件</b></span>`).join('')}</div>`:'<p class="tac-empty">同源 2 / 4 件激活套装</p>'}
        </section>
        ${soulStage?`<section class="tac-card">
          <div class="tac-head"><span>青霜本命剑</span><small>${A.Craft.stages[soulStage-1].name}</small></div>
          <div class="soul-pips">${Array.from({length:5},(_,i)=>`<i class="${i<strikes?'is-lit':''}"></i>`).join('')}<span>${strikes}/5 必杀</span></div>
          ${soulStage>=3?`<small class="tac-sub">${soulWaveCd>0?'紫电剑气冷却 '+soulWaveCd.toFixed(1)+'s':'★ 紫电剑气已蓄满'}</small>`:''}
        </section>`:''}
        <section class="tac-card tac-heat">
          <div class="tac-head"><span>${run.contract?'悬赏试炼':'本层热度'}</span><small>${run.contract?'首领讨伐':'热度 '+run.heat+'/5'}</small></div>
          <div class="tac-heat-grid">
            <span>高品 <b>+${run.heat*12}%</b></span>
            <span>锻材 <b>+${run.heat*25}%</b></span>
            <span>仙玉 <b>+${run.heat*30}%</b></span>
            <span>劫晶 <b>+${run.heat*35}%</b></span>
          </div>
        </section>`;
    }
    function battle(){
      sidebarSig='';lastCombo=0;
      const sideHtml=run.activity==='dummy'
        ?'<aside class="abyss-sidebar is-dummy"><div class="sword-meter"><div class="meter-head"><b>试剑录 · 实时秒伤仪</b><span class="meter-record-tag" id="meter-record-tag" hidden>★ 新纪录</span></div><div id="meter-reading"></div><div class="meter-actions"><button id="meter-zero">清零重测</button><button id="meter-armor"></button></div></div></aside>'
        :'<aside id="abyss-tactical-sidebar" class="abyss-sidebar" aria-label="实时实战侧栏"></aside>';
      openModal(run.contract?'bounty-battle':'abyss-battle','<div class="loot-shell abyss-shell"><header><div><small>'+(run.contract?'山河悬赏':'无尽秘境')+'</small><h2 id="modal-title">'+(run.contract?run.contract.name:run.activity==='dummy'?'药庐 · 试剑木人桩':run.activity==='demon'?'问道真魔':'万象天渊')+'</h2></div><b id="abyss-floor"></b></header><div class="abyss-toolbar"><span id="abyss-status"></span><button id="abyss-collect">一键全收</button><button id="abyss-command">暂停下令 V</button><button id="abyss-leave">收宝出渊</button></div><div class="abyss-field has-sidebar"><div class="abyss-stage-wrap"><canvas id="abyss-canvas" width="1280" height="760" tabindex="0" aria-label="天渊战场"></canvas></div>'+sideHtml+'</div><div id="abyss-choices"></div></div>');
      const canvas=$('abyss-canvas');
      if(run.activity==='dummy'){
        shownDps=0;bestPeak=0;recordUntil=0;
        $('abyss-collect').hidden=true;$('abyss-leave').textContent='结束试剑';
        $('meter-zero').onclick=()=>{shownDps=0;bestPeak=0;recordUntil=0;run.resetMeter();update();};
        $('meter-armor').onclick=()=>{run.setArmor(!run.heavy);update();};
      }
      if(run.contract){$('abyss-collect').hidden=true;$('abyss-leave').textContent='返回妖榜';}keys.clear();held=false;signature='';last=performance.now();
      $('abyss-collect').onclick=()=>{run.collect(true);update();};$('abyss-leave').onclick=leave;
      $('abyss-command').onclick=()=>{if(run.paused)run.paused=false;else suspend();keys.clear();update();};
      const point=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.x)*1280/r.width,y:(e.clientY-r.y)*760/r.height};};
      canvas.onpointerdown=e=>{aim=point(e);held=true;canvas.setPointerCapture(e.pointerId);const i=run.chests.findIndex(ch=>Math.hypot(ch.x-aim.x,ch.y-aim.y)<60);if(i>=0)run.encounter(i);};
      canvas.onpointerup=canvas.onpointercancel=()=>{held=false;};canvas.onpointermove=e=>{aim=point(e);};update();frame(last,canvas);
    }
    function suspend(){
      keys.clear();held=false;aim=null;if(!run)return;run.paused=true;run.actor.arsenal.rhythm.clear();
      run.actor.effects=[];run.actor.arsenal.fx=run.actor.arsenal.fx.filter(f=>f.kind==='firePool');run.actor.arsenal.tracks=[];
      sound.quiet();update();
    }
    function dispose(){keys.clear();held=false;aim=null;run=null;}
    function leave(){const contract=run?.contract;if(run){run.collect(true);save(true);run=null;}keys.clear();if(contract)returnToBounty();else closeModal();}
    function update(){
      if(!run||!$('abyss-floor'))return;const g=run.actor,s=g.state,alive=run.enemies.filter(e=>e.hp>0).length;
      $('abyss-floor').textContent=run.contract?run.contract.move+' · 气血 '+Math.max(0,Math.ceil(run.chief.hp))+'/'+run.chief.maxHp:'第 '+run.floor+' 层'+(run.floor%5===0?' · 镇守首领':'');
      $('abyss-status').textContent='气血 '+Math.ceil(s.hp)+'　灵力 '+Math.floor(s.mp)+'　余敌 '+alive+(run.contract?'':'　灵匣 '+run.drops.length)+(run.contract?'':'　'+[root.XiuxianRogueData.origins[g.trialProfile.origin],root.XiuxianRogueData.sects[g.trialProfile.sect]?.split(' · ')[0]].filter(Boolean).join(' · '));
      if(g.arsenal.rhythm.count)$('abyss-status').textContent+='　'+g.arsenal.rhythm.count+' 连 '+g.arsenal.rhythm.label;
      const guarded=run.enemies.find(e=>e.hp>0&&e.poise);
      if(guarded)$('abyss-status').textContent+=guarded.anim.state==='broken'?'　破防 · 伤害 ×1.8':'　护体真气 '+Math.ceil(100*guarded.poise.value/guarded.poise.max)+'%';
      renderSidebar();
      if(run.activity==='dummy'){
        const m=run.meter.sample(run.clock);
        shownDps=m.total===0||options.reducedMotion?m.current:shownDps+(m.current-shownDps)*.28;
        if(m.peak>bestPeak+.5){bestPeak=m.peak;recordUntil=performance.now()+1800;}
        const meterEl=document.querySelector('.sword-meter'),rec=performance.now()<recordUntil&&bestPeak>0;
        if(meterEl)meterEl.classList.toggle('is-record',rec);
        const recTag=$('meter-record-tag');if(recTag)recTag.hidden=!rec;
        $('meter-reading').innerHTML=`<div class="meter-hero"><span>当前 DPS</span><strong>${shownDps.toFixed(1)}</strong></div><div class="meter-grid"><div><span>十秒峰值</span><b>${m.peak.toFixed(1)}</b></div><div><span>总伤害</span><b>${Math.round(m.total)}</b></div><div><span>暴击率</span><b>${m.crit.toFixed(1)}%</b></div><div><span>破防</span><b>${m.breaks} 次</b></div></div>`;
        $('meter-armor').textContent='模拟首领护甲 · '+(run.heavy?'开':'关');
        $('abyss-floor').textContent=run.heavy?'首领护甲 · 490':'无甲';
      }else if(run.activity==='demon'){
        const boss=run.enemies[0];$('abyss-floor').textContent='太虚心魔 · 第 '+boss.phase+' 阶段　'+Math.ceil(100*boss.hp/boss.maxHp)+'%';
      }else if(run.phase==='market')$('abyss-floor').textContent='黑市 · 三件孤品';
      else if(run.secret==='tomb'&&run.phase==='combat')$('abyss-floor').textContent='剑冢守阵　'+Math.max(0,run.deadline-run.clock).toFixed(1)+' 秒';
      $('abyss-command').textContent=run.paused?'继续战斗 V':'暂停下令 V';
      const sig=[run.phase,run.paused,run.event,run.chests.length,run.stock?.filter(o=>o.sold).length,!!run.drops.length,g.stance()].join(':');if(sig===signature)return;signature=sig;
      const el=$('abyss-choices');el.replaceChildren();const add=(label,fn)=>{const b=document.createElement('button');b.textContent=label;b.onclick=()=>{fn();update();};el.append(b);};
      if(run.phase==='defeat'){el.textContent='气血耗尽，已拾装备留存。';add(run.contract?'返回妖榜':'返回阵台',run.contract?leave:lobby);}
      else if(run.phase==='demonWon'){el.textContent=run.firstKill?'首斩心魔 · 获得太虚天道光环、称号「斩魔问心」与太古神兵自选锻造匣。':'再斩心魔，灵匣已收入器藏。';add('返回阵台',lobby);}
      else if(run.phase==='sheathed'){el.textContent='远古剑冢 · 石中残剑尚有余温。';add('拔剑试炼 · 守阵二十秒',()=>run.pullSword());}
      else if(run.phase==='tombWon'){el.textContent='守阵已成，剑冢孤品已收入器藏。';add('前往下一层',()=>run.leaveSecret());}
      else if(run.phase==='market'){
        el.textContent='黑市孤品奇商　';
        run.stock.forEach((o,i)=>{
          const [currency,cost]=o.price,title=o.item?D.bases[o.item.base].name+(o.item.legendary?' · '+D.legendary.effects[o.item.legendary][0]:''):o.effect?D.legendary.effects[o.effect][0]+'灵纹珠':'太古劫晶';
          add(title+' · '+(o.sold?'已售':cost+({stone:'灵锻石',essence:'精魄',jade:'仙玉'})[currency]),()=>run.buy(i));
          el.lastChild.disabled=o.sold||run.store.state.currency[currency]<cost;
        });add('离市入下一层',()=>run.leaveSecret());
      }
      else if(run.phase==='won'){
        const r=run.payout;el.textContent=(r.first?'首赏 · ':'再战 · ')+r.name+'　灵锻石 +'+r.stone+'　精魄 +'+r.essence+(r.first?'　历练心得卷 +1':'')+(r.hard?'　太古碎片 +1':'');add('返回妖榜',leave);
      }
      else if(run.phase==='clear'){el.textContent='本层已清。';if(run.event!=='road')add({smith:'铁匠免费强化 · 当前兵器 +1',forge:'启用淬炼炉 · 本局伤害 +25%',merchant:'游方器商 · 20 石购灵匣',vault:'开启宝库灵匣'}[run.event],()=>run.encounter());
        if(run.drops.length)el.append('　拾取剩余灵匣后择门。');
        else for(const id of run.doors){
          const door=root.XiuxianAbyss.doors[id]||root.XiuxianAbyss.secrets[id],b=document.createElement('button');b.className='fate-door'+(root.XiuxianAbyss.secrets[id]?' secret-door':'');b.dataset.door=id;
          b.innerHTML=root.XiuxianItemIcons.draw(door.icon,id==='double'?5:3)+'<span><strong>'+door.name+'</strong><small>险度 '+ '★'.repeat(door.risk)+' · '+door.reward+'</small></span>';
          if((run.floor+1)%5===0)b.querySelector('small').append(' · 镇守首领殿');
          b.onclick=()=>{run.paused=false;run.next(id);update();};el.append(b);
        }}
      else if(run.paused){add('战术 · '+root.XiuxianEngine.stances[g.stance()].name,()=>run.order('stance'));add('施放功法 Q',()=>run.order('skill'));
        for(const [i,id] of ['fire','needle','incense','potion','ward','qingxin'].entries())add((i+1)+' '+root.XiuxianData.items[id].name,()=>{run.order(id);save(true);});}
      else el.textContent='WASD 走位　·　左键出招　·　空格闪避　·　Q 功法　·　V 暂停下令';
    }
    function frame(now,canvas){if(!run||!canvas.isConnected)return;const dt=Math.min(.045,(now-last)/1000);last=now;
      if(!document.hidden){const move=(id)=>Number(keys.has(id));run.step(dt,{x:move('right')-move('left'),y:move('down')-move('up'),fire:held,aim});
        for(const n of run.notices.splice(0))if(n>=3)sound.play(n===5?'lootAncient':n===4?'lootGold':'lootPurple',.8);
        const reduced=options.reducedMotion||view.motion.media.matches;
        if(reduced||run.actor.arsenal.clock>=run.actor.arsenal.rhythm.freezeUntil)paint(canvas.getContext('2d'),run,view,reduced);update();}
      requestAnimationFrame(t=>frame(t,canvas));
    }
    function key(e,down){
      if(!run||!$('abyss-canvas')||e.ctrlKey||e.altKey||e.metaKey)return false;
      const action=controls.resolve(e),dir=({KeyW:'up',ArrowUp:'up',KeyS:'down',ArrowDown:'down',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right'})[e.code];
      if(dir){if(down)keys.add(dir);else keys.delete(dir);return true;}if(!down||e.repeat)return false;
      if(action==='tactics'||e.code==='KeyV'){$('abyss-command').click();return true;}
      if(e.key==='Escape'){if(run.paused)leave();else $('abyss-command').click();return true;}
      if(action==='dodge'&&!run.paused&&run.phase==='combat'){const x=Number(keys.has('right'))-Number(keys.has('left')),y=Number(keys.has('down'))-Number(keys.has('up'));run.actor.dodge(x||y?{x,y}:run.actor.face);return true;}
      if(e.code==='KeyQ'){run.order('skill');return true;}if(/^[1-6]$/.test(e.key)){run.order(['fire','needle','incense','potion','ward','qingxin'][+e.key-1]);save(true);return true;}return false;
    }
    window.addEventListener('blur',()=>{if(run)suspend();});
    return {dispose,suspend,music:()=>({mode:run?.contract?'bounty':'abyss',cue:run?.contract||run?.floor%5===0?'battle-major':'battle',allowMusic:!!run&&!run.paused&&run.phase!=='defeat'}),practice,hunt,lobby,leave,key,get run(){return run;},paint};
  }
  root.XiuxianAbyssUI={create,paint};
})(globalThis);
