(function(root){
  'use strict';
  const D=root.XiuxianRogueData,R=root.XiuxianRogue,B=root.XiuxianArmoryData.bases,$=id=>document.getElementById(id);
  const button=(act,text,disabled=false,style='')=>'<button type="button" data-rogue="'+act+'" class="'+style+'" '+(disabled?'disabled':'')+'>'+text+'</button>';
  const L=root.XiuxianTrialLegacy;
  const tabs={gate:'入劫',talents:'九霄灵台',treasures:'仙玉珍宝阁',recipes:'超武图鉴',records:'器忆外传'};
  function create({store,game,save,story,openModal,closeModal,options,sound}){
    let run=null,tab='gate',notice='',shown='',aim=null,last=0,raf=0;
    let selected='lin',book='',marketPage=0;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const held=new Set();
    function clear(){held.clear();aim=null;}
    function suspend(){clear();if(!run)return;run.rhythm.clear();run.fx=[];sound.quiet();if(run.phase!=='pause'&&run.phase!=='result')run.pause();}
    function dispose(){cancelAnimationFrame(raf);clear();run=null;}

    window.addEventListener('blur',()=>{suspend();});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){suspend();}});
    const tone=name=>sound.preview(name,.55).catch(()=>{});
    function card(title,body,action,id,style=''){
      const icons=root.XiuxianItemIcons;
      const preview=B[id]?'<span class="mini-wear" data-wear="'+id+'"></span>':icons.draw(id,style==='evolution'?5:3);
      const badge=B[id]?icons.draw(id,5):'';
      return '<article class="rogue-paper '+style+'"><div class="rogue-mark" aria-hidden="true">'+preview+'</div><div><h3>'+title+badge+'</h3><p>'+body+'</p></div>'+action+'</article>';
    }
    function portrait(id){return id==='yun'?'<svg viewBox="95 15 322 340" role="img" aria-label="云照"><image href="assets/art-v130/sect-people.webp" width="1536" height="1024"/></svg>':'<img src="'+D.avatars[id][8]+'" alt="'+D.avatars[id][0]+'">';}
    function inventory(){
      const names=Object.entries(run.weapons).map(([k,n])=>D.families[k].weapon+' '+n);
      return '<p>'+names.join('、')+'</p><p>圣物　'+(Object.keys(run.relics).map(k=>D.families[k].relic).join('、')||'尚无')+'</p><p>共鸣　'+(Object.keys(D.resonance).filter(k=>run.active(k)).map(k=>D.resonance[k][0]).join('、')||'双系各二级')+'</p>';
    }
    function recipe(id){
      const [kind,k]=id.split(':'),f=D.families[k];if(!f)return '';
      const pair=Object.entries(D.resonance).filter(([,v])=>v.slice(1,3).includes(k)).map(([key,v])=>'<i class="'+(run.active(key)?'lit':'')+'">'+v[0]+'</i>').join(' ');
      return '<span class="trial-recipe">'+f.weapon+'Ⅴ ＋ '+f.relic+' → '+f.evolution+'</span><span class="trial-bonds">'+pair+'</span>';
    }
    function lobby(page='gate'){
      cancelAnimationFrame(raf);clear();run=null;tab=page;
      const s=store.state,meta=s.rogue;
      let body='';
      if(tab==='gate'){
        const profile=L.profile(story(),s);if(!D.avatars[selected])selected='lin';
        const a=D.avatars[selected],available=profile.unlocked.includes(selected);
        const tones={lin:'paper',shen:'paper',ning:'paper',demon:'crimson',yun:'ink',xie:'scroll'};
        const faces=Object.entries(D.avatars).map(([id,v])=>{
          const unlocked=profile.unlocked.includes(id);
          return '<button data-rogue="hero-'+id+'" aria-pressed="'+(selected===id)+'" class="trial-face '+id+(unlocked?' is-unlocked':' is-locked')+'"><span class="trial-portrait-frame" data-tone="'+(tones[id]||'paper')+'">'+portrait(id)+'</span><span class="trial-face-meta"><strong>'+v[0]+'</strong><small>'+(unlocked?v[1]:'待解锁')+'</small></span></button>';
        }).join('');
        body='<div class="trial-gate"><section class="trial-intro"><small>听雨竹海　／　第一境</small><h3>择化身入劫</h3><p>15 波破劫，25 波问鼎。最高已闯 '+meta.bestWave+' 波。</p></section><div class="trial-faces">'+faces+'</div>'+
          '<section class="trial-hero"><div><h3>'+a[0]+' · '+a[1]+'</h3>'+(a[9]?'<p class="trial-quote">'+a[9]+'</p>':'')+'<p>'+D.families[a[2]].weapon+'　／　'+a[4]+'</p><p><b>绝学 '+a[3]+'</b>　'+a[5]+'</p></div>'+
          (available?button('start','踏入第一波　→',false,'rogue-gold'):button('unlock-'+selected,a[6]+' 或 '+a[7]+' 仙玉解锁',s.currency.jade<a[7],'rogue-gold'))+'</section></div>';
      }else if(tab==='talents'){
        body='<p>仙玉点亮灵台，下局入劫即刻生效。</p><div class="rogue-grid">'+Object.entries(D.talents).map(([id,[name,desc,max,base]])=>{
          const lv=meta.talents[id]||0,cost=base*(lv+1);
          const parent=D.prerequisites[id],locked=parent&&!meta.talents[parent];
          return card(name,desc+' · '+lv+' / '+max+(parent?' · 承接'+D.talents[parent][0]:''),button('train-'+id,locked?'先点亮'+D.talents[parent][0]:lv===max?'已圆满':'点亮 · '+cost+' 仙玉',locked||lv>=max||s.currency.jade<cost),id);
        }).join('')+'</div>';
      }else if(tab==='treasures'){
        const entries=[...Object.entries(L.supplies).map(([k,v])=>[k,v[1]]),...Object.entries(D.treasures)];
        body='<div class="rogue-grid">'+entries.slice(marketPage*6,marketPage*6+6).map(([id,cost])=>{
          if(L.supplies[id]){const [name,,desc,icon]=L.supplies[id];return card(name,desc,button('supply-'+id,cost+' 仙玉兑换',s.currency.jade<cost),icon);}
          const b=B[id],owned=!!b&&((id.startsWith('ancient_')?s.exhibits.includes(id)||s.rogue.redeemed.includes(id):s.unlockedAppearances.includes(id))||s.recipes.includes(id));
          return card((b?.school?b.name+'残谱':b?.name)||(id==='stone'?'灵锻石 ×100':'淬灵精魄 ×45'),b?(b.school?'熔炉另需 5 枚太古劫晶 · '+root.XiuxianArmoryData.weapons[b.school][0]:'纯外观幻化 · '+root.XiuxianArmoryData.slots[b.slot]):'主世界锻造材料',button('redeem-'+id,owned?'已入藏':cost+' 仙玉兑换',owned||s.currency.jade<cost),id);
        }).join('')+'</div><nav class="trial-pager">'+button('market-prev','上一页',!marketPage)+button('market-next','下一页',(marketPage+1)*6>=entries.length)+'</nav>';
      }else if(tab==='records'){
        const meta=s.trial,g=game();
        const id=meta.books.includes(book)?book:meta.books[0],v=L.books[id];
        const storyHtml=v?v[2].split('\n').map(line=>'<p>'+line+'</p>').join(''):'<p>通关无尽劫第 3 波，收录矿灯旧事。</p>';
        body='<div class="trial-archive"><nav aria-label="外传目录">'+Object.entries(L.books).map(([k,b])=>button('read-'+k,b[0]+' · '+(meta.books.includes(k)?'已藏':b[1]),!meta.books.includes(k))).join('')+'</nav><article><small>山行器藏　／　器忆外传</small><h3>'+(v?v[0]:'尚未收卷')+'</h3>'+storyHtml+'</article></div>'+
          '<div class="trial-scrolls"><b>'+root.XiuxianItemIcons.draw('scroll',3)+' 悟道心得卷 ×'+meta.study+'　护道符 ×'+meta.ward+'</b>'+button('study-insight','研读 · 得1心得',!g||!meta.study)+button('study-spirit','提炼 · 得80灵蕴',!g||!meta.study||g.state.collection.spirit>999920)+'</div>';
      }else{
        body='<p>第 8、11、14 波各开一席超武位。法器升满 5 级并携同系圣物，下次悟道即可进化。</p><div class="rogue-grid">'+Object.values(D.families).map(f=>
          card(f.evolution,'<span class="trial-recipe">'+f.weapon+' Ⅴ ＋ '+f.relic+'</span>'+f.ultimate,'<small>'+ (meta.unlockedEvolutions.includes(f.id)?'已收录':'未收录')+'</small>','evolve:'+f.id,'evolution')).join('')+'</div>';
      }
      openModal('rogue', '<div class="loot-shell rogue-shell"><header><h2 id="modal-title">'+(tab==='gate'?'九霄幻境':tabs[tab])+'</h2><b class="rogue-currency">'+root.XiuxianItemIcons.draw('jade',4)+' 幻境仙玉　'+s.currency.jade+'</b></header><nav class="loot-tabs">'+Object.entries(tabs).map(([id,name])=>'<button data-rogue="tab-'+id+'" aria-pressed="'+(id===tab)+'">'+name+'</button>').join('')+'</nav>'+body+'<div role="status" class="rogue-note">'+notice+'</div></div>');
      for(const el of $('modal-content').querySelectorAll('[data-wear]'))el.append(root.XiuxianItemIcons.preview(el.dataset.wear));
      $('modal-content').querySelector('.rogue-shell').onclick=click;
    }
    function description(card){
      const [kind,id]=card.split(':'),f=D.families[id];
      if(kind==='mod')return {name:D.mods[id][0],desc:D.mods[id][1],type:'天品 · 改造奇招'};
      if(kind==='boost')return {name:D.goods[id][0],desc:D.goods[id][1],type:'奇珍'};
      if(kind==='evolve')return {name:f.evolution,desc:f.ultimate,type:'仙品 · 超武进化'};
      if(kind==='relic')return {name:f.relic,desc:f.passive,type:'地品 · 圣物'};
      const lv=run.weapons[id]||0;
      return {name:f.weapon,desc:f.attack+' · 威力 '+(lv?7+lv*4:0)+' → '+(11+lv*4),type:'法器　'+lv+' → '+(lv+1)+' 级'};
    }
    function offer(id,act,tag,disabled){
      const info=description(id),[kind]=id.split(':'),tier=kind==='evolve'?'evolution':kind==='mod'?'mod':kind==='relic'?'relic':kind==='boost'?'boost':'weapon';
      return '<button class="rogue-offer '+(tier==='evolution'?'evolution':'')+'" data-tier="'+tier+'" data-rogue="'+act+'" '+(disabled?'disabled':'')+'><small>'+info.type+'</small><b class="rogue-mark">'+root.XiuxianItemIcons.draw(id,run.chest||tier==='evolution'?5:3)+'</b><strong>'+info.name+'</strong><span>'+info.desc+'</span>'+recipe(id)+'<em>'+tag+'</em></button>';
    }
    function overlay(){
      const phase=run.phase,box=$('rogue-overlay');
      if(phase===shown)return;shown=phase;box.hidden=phase==='fight';clear();
      if(box.hidden){box.replaceChildren();return;}
      let title,content;
      if(phase==='choice'){
        title=run.chest?'仙品宝箱 · 双炼法器／奇珍，附赠八劫火':'灵气盈脉 · 择一悟道';content='<div class="rogue-offers">'+run.cards.map((v,i)=>offer(v,'pick-'+i,'领悟',false)).join('')+'</div>'+
          button('reroll',run.free?'免费刷新 ×'+run.free:'换一组 · 4 劫火',!run.free&&run.fire<4);
      }else if(phase==='shop'){
        title='幻境百宝铺';content='<p>第 '+run.wave+' 波已过　·　劫火 '+run.fire+'　·　<span id="rogue-timer"></span></p><div class="trial-market"><div class="rogue-offers shop">'+run.stock.map((v,i)=>offer(v.card,'buy-'+i,v.sold?'已购':(v.lock?'锁定 · ':'')+v.price+' 劫火',v.sold||run.fire<v.price)).join('')+'</div><aside><b>随身构筑</b>'+inventory()+'</aside></div>'+button('lock','锁定／解锁余货')+button('refresh',run.shopFree?'免费换货':'刷新 · 6 劫火',!run.shopFree&&run.fire<6)+button('next',run.wave%3===0?'前往劫境奇遇':'进入下一波',false,'rogue-gold');
      }else if(phase==='event'){
        title='劫境奇遇';content='<div class="rogue-offers">'+run.cards.map(id=>{const [name,gain,cost,icon]=D.events[id];return '<button class="rogue-offer" data-tier="event" data-rogue="event-'+id+'" '+(id==='sacrifice'&&!Object.values(run.weapons).some(n=>n<run.cap)?'disabled':'')+'><small>劫境机缘</small><b class="rogue-mark">'+root.XiuxianItemIcons.draw(icon,4)+'</b><strong>'+name+'</strong><span class="trial-gain">'+gain+'</span><span class="trial-cost">'+cost+'</span><em>择此机缘</em></button>';}).join('')+'</div>';
      }else if(phase==='victory'){
        title='十五重天已破';content='<p>青莲九剑翼已达成。可携宝归山，或自第十六波续战。</p>'+button('end','结算带走宝藏',false,'rogue-gold')+button('endless','踏入无尽狂潮');
      }else if(phase==='result'){
        const v=run.result;title=v.reason;content='<p>通关 '+run.cleared+' 波　·　斩敌 '+run.kills+'　·　悟道 '+run.level+' 级</p><div class="rogue-payout"><strong>仙玉 +'+v.jade+'</strong><strong>灵锻石 +'+v.stone+'</strong></div><p>'+v.rewards.map(id=>B[id].name+' 入藏').join('　')+'</p>'+button('gate','返回大厅',false,'rogue-gold');
      }else{
        const relics=Object.keys(run.relics).map(id=>D.families[id].relic).join('、')||'尚无';
        title='阵中暂歇';content='<p>圣物　'+relics+'</p><p>剑系 '+run.bond('sword')+'/3 · 满三系暴击追剑　／　雷系 '+run.bond('storm')+'/3 · 满三系雷伤 +40%</p>'+button('resume','继续试炼',false,'rogue-gold')+button('end','按当前战果结算');
      }
      box.innerHTML='<div class="rogue-dialog"><h3>'+title+'</h3>'+content+'</div>';
      box.querySelector('button:enabled')?.focus({preventScroll:true});
    }
    function hud(){
      const rank=$('rogue-combo');if(rank)rank.textContent=run.rhythm.count?run.rhythm.count+' 连 '+(run.rhythm.label||'起势'):'蓄势';
      const boss=run.monsters.find(e=>e.boss);
      const data=D.stages[run.stage],b=$('rogue-boss');
      b.hidden=!boss||run.phase!=='fight';if(!b.hidden){
        const brk=boss.anim.state==='broken';
        b.classList.toggle('is-broken',brk);
        b.firstElementChild.textContent=D.bosses[boss.type]+'　·　'+(brk?'★ 破防虚弱 '+(2.5-boss.anim.t).toFixed(1)+'秒 · 伤害 ×1.8':(boss.hp<=boss.maxHp*.5?'二阶段 · ':'')+boss.phase+' · 护体真气 '+Math.ceil(100*boss.poise.value/boss.poise.max)+'%');
        const hpBar=$('rogue-boss-hp'),poiseBar=$('rogue-boss-poise');
        if(hpBar){hpBar.max=boss.maxHp;hpBar.value=Math.max(0,boss.hp);}
        if(poiseBar&&boss.poise){poiseBar.max=boss.poise.max;poiseBar.value=brk?boss.poise.max*Math.max(0,1-boss.anim.t/2.5):Math.max(0,boss.poise.value);}
      }
      $('rogue-wave').textContent=data[0]+'　·　第 '+run.wave+' 波　剩余 '+Math.max(0,Math.ceil(D.waveSeconds(run.wave)-run.clock))+' 秒';
      $('rogue-stats').textContent='气血 '+Math.ceil(run.hp)+'/'+run.maxHp+'　灵气 '+Math.floor(run.xp)+'/'+run.needed+'　劫火 '+run.fire+'　悟道 '+run.level+' 级';
      $('rogue-hp').value=run.hp;$('rogue-hp').max=run.maxHp;$('rogue-xp').value=run.xp;$('rogue-xp').max=run.needed;
      const u=$('rogue-ult');u.disabled=run.phase!=='fight'||run.charge<100;u.textContent='R　'+D.avatars[run.avatar][3]+'　'+Math.floor(run.charge)+'%';u.classList.toggle('charged',!u.disabled);
      $('rogue-dash-label').textContent=run.dashCd>0?'冲刺 '+run.dashCd.toFixed(1)+'秒':'空格冲刺';
      $('rogue-dash').value=1-run.dashCd/(run.profile.origin==='beggar'?1.575:2.1);
      const links=$('rogue-links'),active=Object.keys(D.resonance).filter(id=>run.active(id)),signature=active.join(' ');
      if(links.dataset.active!==signature){links.dataset.active=signature;links.innerHTML=active.map(id=>'<span>'+D.resonance[id][0]+'</span>').join('');}
      const remaining=Math.max(0,Math.ceil(D.waveSeconds(run.wave)-run.clock));
      $('rogue-pressure').textContent='本波 '+remaining+' 秒 · 敌 '+run.monsters.filter(e=>e.hp>0).length;
      $('rogue-pressure-meter').value=remaining/D.waveSeconds(run.wave);
      $('rogue-device').textContent=data[1]+' · '+(run.device?data[4]:'约 '+Math.max(0,Math.ceil(run.deviceIn))+' 秒后显现');
      const used=Object.keys(run.evolved).length,loadout=$('rogue-loadout');
      const signatureGear=[run.wave,...Object.keys(D.families).map(k=>[run.weapons[k]||0,!!run.relics[k],!!run.evolved[k]].join('/'))].join(',');
      if(loadout.dataset.build!==signatureGear){
        loadout.dataset.build=signatureGear;
        loadout.innerHTML=Object.entries(D.families).map(([k,f])=>{
          const lv=run.weapons[k]||0;
          const nextSlot=Math.max(8,8+used*3);
          const hint=run.evolved[k]?'已进化':!lv?'未入阵':lv<5?'距五级 '+(5-lv)+' 级':!run.relics[k]?'待 '+f.relic:
            used<run.ultraSlots?'下次悟道可进化':'第 '+nextSlot+' 波增位';
          return '<li class="'+(lv?'is-held':'')+'">'+root.XiuxianItemIcons.draw('weapon:'+k,lv?3:0)+'<span><b>'+f.weapon+'</b><small>'+hint+'</small></span><em>'+lv+'</em></li>';
        }).join('');
      }
      $('rogue-timer')?.replaceChildren('停留 '+Math.max(0,Math.ceil(run.shopTime))+' 秒');
    }
    function battle(){
      notice='';run=new R.Run(store,undefined,selected,story());run.sound=name=>sound.play(name,.7);shown='';last=performance.now();
      openModal('rogue-battle','<div class="loot-shell rogue-shell"><header><h2 id="modal-title">九霄无尽劫</h2></header><div class="rogue-hud"><span id="rogue-stats"></span><b id="rogue-wave"></b><b class="trial-seals">'+[D.origins[run.profile.origin],D.sects[run.profile.sect]].filter(Boolean).join(" · ")+'</b>'+button('pause','暂停 V')+'</div><div class="rogue-meters"><progress id="rogue-hp" aria-label="气血"></progress><progress id="rogue-xp" aria-label="灵气"></progress></div><div class="rogue-field"><div class="rogue-arena"><canvas id="rogue-canvas" width="'+R.width+'" height="'+R.height+'" aria-label="九霄劫阵"></canvas><div id="rogue-boss" hidden><b></b><progress id="rogue-boss-hp" aria-label="首领气血"></progress><progress id="rogue-boss-poise" aria-label="首领护体真气"></progress></div><div id="rogue-overlay" hidden></div></div><aside class="rogue-sidebar" aria-label="九霄战况"><div class="rogue-rank"><small>连击评价</small><b id="rogue-combo"></b></div><h3>八方法器</h3><ul id="rogue-loadout"></ul><h3>元素共鸣</h3><div id="rogue-links"></div><h3>秘境机关</h3><p id="rogue-device"></p><label id="rogue-pressure"></label><progress id="rogue-pressure-meter" max="1" aria-label="本波剩余时间"></progress></aside></div><footer><label><span id="rogue-dash-label">空格冲刺</span> <progress id="rogue-dash" max="1"></progress></label><button id="rogue-ult" data-rogue="ult"></button></footer></div>');
      const canvas=$('rogue-canvas');$('modal-content').querySelector('.rogue-shell').onclick=click;
      const point=e=>{const r=canvas.getBoundingClientRect();aim={x:(e.clientX-r.left)*R.width/r.width,y:(e.clientY-r.top)*R.height/r.height};};
      canvas.onpointerdown=e=>{if(e.button===0){canvas.setPointerCapture(e.pointerId);point(e);if(run.strikeDevice(aim))aim=null;}};
      canvas.onpointermove=e=>{if(e.buttons&1)point(e);};canvas.onpointerup=canvas.onlostpointercapture=()=>{aim=null;};
      let hudTime=0;
      function frame(now){
        if(!canvas.isConnected||!run)return;
        let x=Number(held.has('KeyD')||held.has('ArrowRight'))-Number(held.has('KeyA')||held.has('ArrowLeft'));
        let y=Number(held.has('KeyS')||held.has('ArrowDown'))-Number(held.has('KeyW')||held.has('ArrowUp'));
        if(!x&&!y&&aim&&Math.hypot(aim.x-run.p.x,aim.y-run.p.y)>6){x=aim.x-run.p.x;y=aim.y-run.p.y;}
        const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
        if(!document.hidden){run.step(dt,{x,y});run.flushMedals();}
        const reduced=options.reducedMotion||motion.matches;
        if(reduced||run.age>=run.rhythm.freezeUntil)root.XiuxianRogueRender.paint(canvas,run,reduced);
        if(run.age<run.rhythm.freezeUntil+.45){
          const c=canvas.getContext('2d');c.save();c.font='bold 23px serif';c.textAlign='center';c.strokeStyle='#29231c';c.lineWidth=4;c.fillStyle='#fff4b5';
          c.strokeText('身法！',run.p.x,run.p.y-38);c.fillText('身法！',run.p.x,run.p.y-38);c.restore();
        }
        if(shown!==run.phase||now-hudTime>120){if(shown!==run.phase&&run.phase==='choice')tone('levelUp');overlay();hud();hudTime=now;}
        raf=requestAnimationFrame(frame);
      }
      frame(performance.now());
    }
    function click(e){
      const el=e.target.closest('button[data-rogue]');if(!el||el.disabled)return;
      const [act,id]=el.dataset.rogue.split('-');
      if(act==='tab'){notice='';lobby(id);return;}
      if(act==='hero'){selected=id;lobby();return;}
      if(act==='unlock'){if(L.unlock(store,id,story()))tone('shopBuy');lobby();return;}
      if(act==='market'){marketPage+=id==='next'?1:-1;lobby('treasures');return;}
      if(act==='supply'){if(L.buy(store,id)){notice=L.supplies[id][0]+'已收入山行器藏';tone('shopBuy');}lobby('treasures');return;}
      if(act==='read'){book=id;lobby('records');return;}
      if(act==='study'){if(L.study(store,game(),id==='spirit',save)){notice=id==='spirit'?'灵蕴 +80':'修行心得 +1';}lobby('records');return;}
      if(act==='start'){battle();return;}
      if(act==='train'||act==='redeem'){
        const ok=act==='train'?R.train(store,id):R.redeem(store,id);
        notice=ok?(act==='train'?'灵台已点亮。':'兑换成功，已存入主世界。'):'未达兑换条件。';lobby(tab);if(ok)tone(act==='train'?'levelUp':'shopBuy');return;
      }
      if(!run)return;
      if(act==='pick'){const choice=run.cards[Number(id)];if(run.choose(choice)&&choice.startsWith('evolve:')){tone('evolveUltra');if(!options.reducedMotion&&!motion.matches){const arena=document.querySelector('.rogue-arena');if(arena){arena.classList.remove('fx-evolve-flash');void arena.offsetWidth;arena.classList.add('fx-evolve-flash');setTimeout(()=>arena.classList.remove('fx-evolve-flash'),950);}}}}
      if(act==='reroll')run.reroll();
      if(act==='buy'&&run.buy(Number(id)))tone('shopBuy');
      if(act==='ult')run.ultimate();if(act==='event')run.decide(id);if(act==='lock')run.lockShop();if(act==='refresh')run.refreshShop();
      if(act==='next')run.leaveShop();
      if(act==='pause')suspend();if(act==='resume')run.pause();
      if(act==='end')run.finish(run.cleared>=15?'破劫归山':'收功归山');
      if(act==='endless'&&run.phase==='victory')run.startWave();
      if(act==='gate'){lobby();return;}
      shown='';overlay();hud();
    }
    function key(e,down){
      if(!run)return false;
      if(['Escape','KeyV'].includes(e.code)){
        if(down&&!e.repeat){if(run.phase==='result')lobby();else if(run.phase==='pause')run.pause();else suspend();}return true;
      }
      if(e.code==='KeyR'&&run.phase==='fight'){if(down&&!e.repeat)run.ultimate();return true;}
      if(e.code==='Space'&&run.phase==='fight'){if(down&&!e.repeat)run.dash();return true;}
      if(!['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(e.code))return false;
      if(down&&run.phase==='fight')held.add(e.code);else held.delete(e.code);return true;
    }
    function back(){if(!run){closeModal();return;}if(run.phase==='result'){lobby();return;}if(run.phase!=='pause')suspend();shown='';overlay();hud();}
    return {suspend,dispose,library:()=>{notice='';lobby('records');},music:()=>({mode:'rogue',cue:run?.wave%5===0?'battle-major':'battle',allowMusic:run?.phase==='fight'}),lobby:()=>{notice='';lobby();},key,back,get run(){return run;}};
  }
  root.XiuxianRogueUI={create};
})(globalThis);
