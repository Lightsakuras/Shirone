(function () {
  'use strict';
  const D = window.XiuxianData, A = window.XiuxianArt, { validateSave } = window.XiuxianEngine, Game=window.XiuxianVisualGame;
  const $ = id => document.getElementById(id), BASE_SAVE_KEY = 'xiuxian-offline-prototype-v1';
  let SAVE_KEY=BASE_SAVE_KEY,RECOVERY_KEY=SAVE_KEY+'-ending-recovery',storageResolved=false;
  function memoryStorage(){
    const values=new Map();return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
  }
  let disk,temporary=false;
  try{disk=window.localStorage;disk.getItem('xiuxian-storage-probe');}
  catch{disk=memoryStorage();temporary=true;}
  const vault=window.XiuxianJourneyArmory.create(disk),storage=vault.io;
  const journeyRecords=window.XiuxianJourneyRecords.create({baseKey:BASE_SAVE_KEY,validateSave,validateRecovery,storage});
  function resolveStorage(){if(!storageResolved){vault.recover();SAVE_KEY=journeyRecords.resolve();RECOVERY_KEY=journeyRecords.recoveryKey(SAVE_KEY);storageResolved=true;}}
  const keepCollection='<label><input id="keep-account-collection" type="checkbox" checked> 保留已解锁外观幻化与九霄图鉴／灵台（属性装备与材料从零起算）</label>';
  const view = new window.XiuxianView($('world'));
  let game = null, gender = 'female', origin = 'sword', backgroundId = 'rain', selected = null, pointer = null;
  let walk=null;
  let mode = null, returnFocus = null, held = false, guarding = false, last = 0, saveClock = 0, uiClock = 0;
  let log = [], storageWarned = false, slotsSignature = '', toastTarget = null;
  const controls=window.XiuxianControls.create(), profile=window.XiuxianPlayerProfile.create();
  const quick = ['fire', 'needle', 'incense', 'potion', 'ward'];
  const esc = text => String(text).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const portrait = value => 'assets/portraits/' + (value === 'female' ? 'lin_mo_f' : 'lin_mo') + '.webp';
  function paintBuildVersion(){
    const el=$('build-version');
    if(el&&window.XiuxianCatalog?.version)el.textContent='v'+window.XiuxianCatalog.version;
  }
  function updatePortrait(){
    if(!game)return;
    const node=$('player-image'),custom=profile.current(),p=A.playerPortrait(game),key=custom?custom.dataUrl:p.key;
    if(node.dataset.portrait!==key){node.innerHTML=custom?'<img class="custom-player-avatar" alt="本机自选主角头像">':A.portraitHTML(p);if(custom)node.querySelector('img').src=custom.dataUrl;node.dataset.portrait=key;}
    node.parentElement.classList.toggle('has-custom-player-avatar',!!custom);
  }
  function updateTitlePortrait(){const custom=profile.current(),img=$('hero-image');img.src=custom?custom.dataUrl:portrait(gender);img.classList.toggle('custom-player-avatar',!!custom);img.alt=custom?'本机自选主角画像':gender==='female'?'白衣持剑的女修林墨':'白衣持剑的男修林墨';}
  const journey = window.XiuxianJourneyUI({ game: () => game, esc, openModal, closeModal, save, drain, showBag, showLoadouts:()=>loadouts.show(),showProvisions:()=>provisions.show() });
  const story = window.XiuxianStoryUI({ game: () => game, esc, openModal, closeModal, save, drain });
  const chapter = window.XiuxianChapterUI({ game:()=>game, controls, openModal, closeModal, save, drain, exportFile });
  const tactics = window.XiuxianTacticsUI({game:()=>game,openModal,closeModal,save,drain,esc});
  $('tactics-open').onclick=()=>tactics.show();
  const loadouts=window.XiuxianLoadoutsUI({game:()=>game,openModal,closeModal,save,drain,esc});
  const research=window.XiuxianResearchUI({game:()=>game,openModal,closeModal,save,drain,esc});
  const workshop=window.XiuxianWorkshopUI({game:()=>game,openModal,closeModal,save,drain,esc,updateSlots});
  const provisions=window.XiuxianProvisionsUI({game:()=>game,openModal,closeModal,save,drain,esc});
  const backgrounds=window.XiuxianBackgroundUI({game:()=>game,openModal,closeModal,save,drain,esc,selection:()=>({gender,origin,backgroundId}),select:id=>{backgroundId=id;}});
  const sects=window.XiuxianSectsUI({game:()=>game,trackObjective,openModal,closeModal,save,drain,esc,showWorld:()=>sectWorld.show('hub')});
  const sectWorld=window.XiuxianSectWorldUI({game:()=>game,openModal,closeModal,save,drain,esc});
  const campaign=window.XiuxianCampaignUI({game:()=>game,openModal,closeModal,save,drain,esc,beforeCommitRecovery,beforeEndingAction,recoveryStatus,showRecovery,showMap:id=>worldAtlas.show(id),exportRecord:exportFile,returnToTitle:toTitle,startSeparateJourney});
  const inkUI=window.XiuxianInkUI.create({document});
  const catalog=window.XiuxianCatalogUI({game:()=>game,openModal,closeModal,esc});
  const almanac=window.XiuxianAlmanacUI.create({game:()=>game,openModal,closeModal,esc,showCatalog:()=>catalog.show()});
  $('almanac-intro').onclick=()=>{if(!mode)almanac.show('start-first-steps');};
  const preferences=window.XiuxianPreferences({game:()=>game,view,openModal,closeModal,controls,profile,getDefaultPortrait:()=>portrait(game?.state.gender||gender),onProfileChange:()=>{updatePortrait();updateTitlePortrait();chapter.updateHUD();},onBindingsChange:()=>{slotsSignature='';updateSlots();updateHUD();enhance(document);}});
  let unsavedGear=false,armoryReady=false,incarnation=null;
  function sameCharacter(){
    return storage.getItem(SAVE_KEY+'-incarnation')===incarnation&&journeyRecords.resolve()===SAVE_KEY;
  }
  const armory=window.XiuxianArmory.create(null,Math.random,{
    read:()=>{
      if(!armoryReady||unsavedGear)return null;
      try{if(!sameCharacter()){unsavedGear=true;return null;}return vault.load(SAVE_KEY,false);}catch{unsavedGear=true;return null;}
    },
    write:next=>{
      if(!armoryReady)throw Error('请先核对本机装备档案');
      try{if(!sameCharacter())throw Error('角色已在另一页切换');vault.atomic(()=>vault.save(SAVE_KEY,next));unsavedGear=false;}
      catch{unsavedGear=true;$('save-status').textContent='装备暂存，请导出';}
    }
  });
  function loadGear(migrate=true){
    resolveStorage();const raw=storage.getItem(SAVE_KEY);
    let existing=false;if(raw)try{validateSave(JSON.parse(raw));existing=true;}catch{}
    incarnation=storage.getItem(SAVE_KEY+'-incarnation');armory.adopt(vault.load(SAVE_KEY,existing&&migrate));armoryReady=true;unsavedGear=false;
  }
  try{loadGear(false);}catch{/* The title still offers raw backup, replacement and import. */}
  const gearUI=window.XiuxianArmoryUI.create({store:armory,game:()=>game,openModal,sound:preferences.sound,options:preferences.options,dirty:()=>{fieldDirty=true;}});
  const abyssUI=window.XiuxianAbyssUI.create({store:armory,game:()=>game,openModal,closeModal,returnToBounty:()=>bountyUI.board(),view,sound:preferences.sound,save,controls});
  const bountyUI=window.XiuxianBountyUI.create({store:armory,game:()=>game,arena:abyssUI,openModal,sound:preferences.sound});
  const homeUI=window.XiuxianHomesteadUI.create({store:armory,game:()=>game,save,openModal,sound:preferences.sound,practice:abyssUI.practice});
  const rogueUI=window.XiuxianRogueUI.create({store:armory,game:()=>game,save,story:()=>{if(game)return game.state;const stored=readStoredSave();return stored.valid?validateSave(JSON.parse(stored.raw)):null;},openModal,closeModal,options:preferences.options,sound:preferences.sound});
  $('rogue-intro').onclick=e=>{e.preventDefault();if(!game){try{loadGear();}catch{notify('本机档案暂不可读');return;}}rogueUI.lobby();};
  document.addEventListener('keyup',e=>{if(mode==='rogue-battle')rogueUI.key(e,false);});
  for(const link of document.querySelectorAll('[data-icon]'))link.insertAdjacentHTML('afterbegin',window.XiuxianItemIcons.draw(link.dataset.icon,4));
  document.addEventListener('keyup',e=>{if(abyssUI.key(e,false))e.preventDefault();});
  let badgeRevision=-1;
  const banners=[];let bannerTimer=0;
  const bannerStage=document.createElement('div');
  bannerStage.id='xiuxian-banner-stage';bannerStage.className='xiuxian-banner-stage';
  bannerStage.setAttribute('aria-live','polite');bannerStage.setAttribute('aria-atomic','true');
  document.body.append(bannerStage);
  function showCraftBanner(event){
    const D=window.XiuxianArmoryData,Ach=window.XiuxianAchievementData;
    const el=document.createElement('div');
    if(event.type==='achievement'){
      const row=Object.values(Ach||{}).find(r=>r.title===event.title);
      el.className='xiuxian-banner is-achievement';
      el.dataset.bannerType='achievement';
      el.innerHTML=`<span class="banner-seal" aria-hidden="true">成</span><div class="banner-body"><small>微成就达成 · 获赠称号</small><strong>${esc(event.title)}</strong>${row?`<p>${esc(row.condition)}</p>`:''}</div><span class="banner-stamp" aria-hidden="true">朱砂金印</span>`;
      if(!document.hidden&&!preferences.options.reducedMotion)preferences.sound.preview('levelUp',.65).catch(()=>{});
    }else{
      const item=event.item,g=D.grades[item.grade],b=D.bases[item.base];
      const eff=D.legendary.effects[item.legendary],curse=D.legendary.curses[item.base];
      const tag=event.source==='furnace'?'炼器出炉':curse?'魔器现世':eff?'传奇鉴宝':'高阶鉴宝';
      const detail=eff?`★ ${eff[0]}：${eff[1]}`:curse?`◆ 双刃魔器：${curse[2]}`:`${D.slots[b.slot]} · 战力 ${window.XiuxianArmory.power(item)}`;
      el.className=`xiuxian-banner is-appraisal grade-${item.grade}${eff?' has-legend':''}${curse?' is-curse':''}`;
      el.dataset.bannerType='appraisal';
      el.style.setProperty('--grade',g.color);
      el.innerHTML=`<span class="banner-ico">${window.XiuxianItemIcons.draw(item.base,item.grade)}</span><div class="banner-body"><small>${esc(tag)} · ${esc(g.name)}</small><strong>${esc(b.name)}${item.masterwork?' · 炉火大成':''}</strong><p>${esc(detail)}</p></div>`;
    }
    bannerStage.replaceChildren(el);
    return el;
  }
  function nextBanner(){
    const event=banners.shift();if(!event){bannerTimer=0;bannerStage.replaceChildren();return;}
    const el=showCraftBanner(event);
    const hold=banners.length?1600:2800;
    bannerTimer=setTimeout(()=>{
      el.classList.add('is-leaving');
      setTimeout(nextBanner,preferences.options.reducedMotion?10:240);
    },hold);
  }
  armory.subscribe(event=>{
    window.dispatchEvent(new CustomEvent('xiuxian-'+event.type,{detail:event}));
    if(banners.length>=4)banners.shift();
    banners.push(event);if(!bannerTimer)nextBanner();
  });
  function armoryBadge(){
    if(badgeRevision===armory.revision)return;badgeRevision=armory.revision;
    const {worn}=armory.summary(),D=window.XiuxianArmoryData,A=window.XiuxianArmory;
    $('armory-open').classList.toggle('available',armory.state.bag.some(i=>A.power(i)>A.power(worn[D.bases[i.base].slot]))||Object.values(worn).some(i=>i&&i.level<D.grades[i.grade].cap&&armory.state.currency.stone>=D.costs.enhance(i.level)));
  }
  const termHelp=window.XiuxianTermHelp.create({controls,onOpen:()=>{clearInput();preferences.sound.quiet();},showBook:term=>{almanac.show();const input=$('almanac-search');if(input){input.value=term;input.dispatchEvent(new Event('input',{bubbles:true}));}}});
  window.XiuxianGuide.setControls(controls);
  const guideOverlay=window.XiuxianGuide.createOverlay({canvas:$('world'),game:()=>game,options:preferences.options,controls});
  const worldAtlas=window.XiuxianWorldAtlasUI({game:()=>game,onArrive:()=>{drain();updateHUD();},onObjective:()=>trackObjective({main:true}),openModal,closeModal,esc,onLocate:route=>{const ok=window.XiuxianGuide.trackLocation(game,route.mapId,route.objectId,route);if(ok){preferences.update();notify('已标出当前可通行的出口，循箭头走近后按 E 即可前往。');}return ok;},onTask:id=>campaign.show(id||'journal')});
  function trackObjective(target){
    if(target.task){
      if(!window.XiuxianGuide.trackTask(game,target.task))window.XiuxianGuide.trackObjective(game,{main:true});
    }
    else window.XiuxianGuide.trackObjective(game,target);
    preferences.update();updateHUD();
    notify(view.goal?.text||'已追踪当前目标');
  }
  const storyline=window.XiuxianStorylineUI({game:()=>game,openModal,closeModal,esc,track:trackObjective,ending:()=>campaign.show('ending')});
  for(const id of ['storyline-stage','storyline-journal','storyline-guide'])$(id).onclick=()=>{if(game&&!mode)storyline.show();};
  $('modal-content').addEventListener('click',e=>{
    const b=e.target.closest('[data-track-goal]');if(!b||!game)return;
    const goals={pad:{map:'garden',object:'cultivate',label:'回蜀山药庐，走近中央蒲团'},practice:{map:'garden',object:'practiceBoard',label:'到药庐历练榜完成同门历练，取得心得'}};
    const key=b.dataset.trackGoal;closeModal();trackObjective(b.dataset.trackTask?{task:b.dataset.trackTask}:goals[key]||{main:true});
  });
  let tutorialNext=null;
  function finishTutorial(){clearInput();const next=tutorialNext;tutorialNext=null;if(next)next();else if(game&&!mode)$('world').focus({preventScroll:true});}
  const onboarding=window.XiuxianOnboarding.create({controls,onStart:()=>{clearInput();preferences.sound.quiet();},onComplete:finishTutorial,onSkip:finishTutorial});
  const coach=window.XiuxianCoach({
    controls,game:()=>game,mode:()=>mode,close:closeModal,pause:showPause,menu:setMenu,clearInput,notify,
    blocked:()=>onboarding.active || termHelp.isOpen || !!mode && (
      $('modal').classList.contains('ink-reader') || !!document.querySelector('#campaign-confirm,#sect-world-confirm,#confirm-import,#confirm-new,#journey-confirm,#loadout-confirm')),
    restore(panel){
      if(panel==='encounter'){showPause();return;}
      if(panel===mode)return;
      if(panel==='cultivation')$('cultivation-open').click();
      else if(panel==='armory')gearUI.show();
      else if(panel==='sects')sects.show();
      else if(panel==='storyline')storyline.show();
      else if(panel==='expedition')journey.showExpedition();
      else if(panel==='bag')showBag();
      else if(panel==='gear')journey.showGear();
      else if(panel==='tactics')tactics.show(true);
      else if(panel==='pause')showPause();
      else if(mode)closeModal();
    }
  });
  const coachLabels=window.XiuxianCoachData.labels;
  for(const [id,label,open] of [['coach-top',coachLabels.entry,()=>{preferences.show();queueMicrotask(()=>document.querySelector('.coach-settings input')?.focus());}],['coach-save',coachLabels.save,()=>save()]]){
    const b=document.createElement('button');b.id=id;b.className='quiet';b.textContent=label;b.onclick=open;
    if(id==='coach-top')$('tutorial-top').after(b);else $('settings-top').before(b);
  }
  function showTutorial(){if(mode)closeModal();tutorialNext=null;onboarding.start({review:true,gender:game?.state.gender||gender});}
  function fullscreen(){const task=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();task?.catch(()=>notify('暂时无法切换全屏，可用窗口最大化继续游玩。'));}
  $('tutorial-top').onclick=showTutorial;
  $('fullscreen-toggle').onclick=fullscreen;
  $('portrait-edit').onclick=()=>preferences.playerSettings.showAvatar();
  $('title-avatar-edit').onclick=()=>preferences.playerSettings.showAvatar();
  function enhance(container){window.XiuxianUIHints?.decorate(container,controls);controls.decorateBindings(container);termHelp.decorate(container);window.XiuxianCultivationView?.mount(container,game,preferences.options);window.XiuxianProseHighlight?.decorate(container);}

  $('intro').querySelector('.begin-row').insertAdjacentHTML('afterend','<div class="save-recovery"><button id="title-import" class="quiet">导入备份存档</button><button id="title-raw-backup" class="quiet" hidden>下载本机原始存档</button></div><p id="save-recovery-note" class="save-recovery-note" role="status"></p>');
  $('title-import').onclick=()=>$('import-file').click();
  $('title-raw-backup').onclick=exportRawSave;
  $('title-import').insertAdjacentHTML('afterend','<button id="title-journeys" class="quiet">本机旅程档案</button>');
  $('title-journeys').onclick=showJourneyArchive;
  $('skill-use').onclick=()=>{if(game){game.castSkill();drain();save(true);}};
  $('quick-cleanse').onclick=()=>use('qingxin');
  $('world').parentElement.insertAdjacentHTML('beforeend','<div id="noise-meter" class="noise-meter" hidden><span id="noise-text"></span><div><i id="noise-fill"></i></div></div>');
  const systemMenu = $('scroll-menu'), entries = $('scroll-entries');
  function setMenu(open) {
    if(open&&!entries.querySelector('.music-control'))entries.insertAdjacentHTML('beforeend',preferences.musicControl);
    preferences.refreshMusic(true);entries.hidden = !open;
    systemMenu.setAttribute('aria-expanded', String(open));
    if (open) entries.querySelector('button').focus();
  }
  systemMenu.onclick = () => setMenu(entries.hidden);
  document.addEventListener('click', e => {
    if (!entries.hidden && !e.target.closest('.scroll-system,#modal-layer,#coach')) setMenu(false);
  });
  function clearInput() { walk=null; controls.clear(); held = false; guarding = false; game?.cancelInputs?.(); }
  function notify(text) {
    const target=game&&window.XiuxianGuide.goalFor(game),next=target?game.state.map+':'+(target.id||target.ui||''):null;
    if(toastTarget!==next)$('toast').replaceChildren();toastTarget=next;
    const queue=$('toast'), row=document.createElement('div');
    row.textContent=text;
    queue.append(row);
    while(queue.children.length>2) queue.firstElementChild.remove();
    queue.classList.add('visible');
    setTimeout(()=>row.classList.add('fading'),2700);
    setTimeout(()=>{row.remove();if(!queue.childElementCount) queue.classList.remove('visible');},3000);
    log.unshift(text); log = log.slice(0, 4);
    $('event-log').innerHTML = log.map(t => '<p>' + esc(t) + '</p>').join('');
    const status = $('inline-message'); if (status) status.textContent = text;
    for(const id of ['toast','event-log','inline-message']){const node=$(id);if(node)window.XiuxianUIHints?.decorate(node,controls);}
  }
  function markStoredSave(raw, valid) {
    $('continue').hidden=!valid;$('continue').className=valid?'primary':'secondary';$('start-prologue').className='primary';$('title-raw-backup').hidden=raw===null;$('title-raw-backup').disabled=false;
    $('save-recovery-note').textContent=raw===null?'可导入 JSON 备份存档。':valid?'本机已有存档，开新程前可先下载备份。':'本机存档暂不可读，可先下载原始存档或导入备份。';
  }
  function readStoredSave() {
    try {
      resolveStorage();
      const raw=storage.getItem(SAVE_KEY);let valid=false;
      if(raw!==null){try{validateSave(JSON.parse(raw));valid=true;}catch{}}
      markStoredSave(raw,valid);return {readable:true,raw,valid};
    } catch {
      $('continue').hidden=true;$('title-raw-backup').disabled=true;
      $('save-recovery-note').textContent='浏览器暂未放行本地存档读取，原进度未受影响。请检查浏览器本地存储权限后重试。';
      return {readable:false,raw:null,valid:false};
    }
  }
  function storeSave(state, silent = false) {
    try {
      resolveStorage();
      const raw=JSON.stringify(state);vault.atomic(()=>{if(!sameCharacter())throw Error('角色已在另一页切换');if(unsavedGear)vault.save(SAVE_KEY,armory.state);storage.setItem(SAVE_KEY,raw);});unsavedGear=false;markStoredSave(raw,true);$('save-status').textContent=temporary?'仅本次有效，请导出':'已保存于本机';
      if (!silent) notify('当前进度已存入本机。另行导出存档文件可多留一份独立备份。');
      return true;
    } catch {
      $('save-status').textContent = '请导出存档';
      if (!storageWarned || !silent) notify('浏览器未允许本地保存。请在暂停菜单导出存档，保存为文件。');
      storageWarned = true; return false;
    }
  }
  let storyRank=0;
  function observeFoundation(){
    const rank=window.XiuxianArmory.Legacy.profile(game.state,armory.state).rank;
    if(storyRank===0&&rank>=1)armory.award('foundation');
    storyRank=rank;
  }
  function save(silent = false) { if(game){observeFoundation();window.XiuxianWorldAtlas.recordVisit(game);worldAtlas.observe();}return game?storeSave(game.exportSave(),silent):false; }
  function readRecovery() {
    resolveStorage();
    const raw=storage.getItem(RECOVERY_KEY);if(raw===null)return {version:1,points:{}};
    return validateRecovery(JSON.parse(raw));
  }
  function validateRecovery(record) {
    const allowed=window.XiuxianCampaignState.recoveryKeys();
    if(!record||record.version!==1||!record.points||typeof record.points!=='object'||Array.isArray(record.points)||Object.keys(record.points).length>allowed.length)throw Error('恢复记录格式不完整');
    for(const [key,stages]of Object.entries(record.points)){
      if(!allowed.includes(key)||!stages||typeof stages!=='object'||Array.isArray(stages))throw Error('恢复记录来源不完整');
      for(const [stage,point]of Object.entries(stages)){
        if(!['choice','claim'].includes(stage)||!point||typeof point.title!=='string'||!Number.isFinite(Date.parse(point.createdAt))||point.kind!==undefined&&!['ending','mortal','vow'].includes(point.kind))throw Error('恢复点说明不完整');
        validateSave(point.save);
      }
    }
    return record;
  }
  function listPoints(record,owner){return Object.entries(record.points).flatMap(([key,stages])=>Object.entries(stages).map(([stage,point])=>({...point,stage,sidecar:vault.point(owner,key,stage)})));}
  function recoveryPoints(){return listPoints(readRecovery(),SAVE_KEY).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
  function recoveryLabel(point){return point.stage==='choice'?'方向选择前 · 可以重新选择':point.kind==='vow'?'承诺交付前 · 当时回应已定':point.kind==='mortal'?'能力改变前 · 当时方向已定':'最终结算前 · 当时方向已定';}
  function beforeEndingAction(action) {
    if(!action.endingStage)return true;
    return beforeCommitRecovery({...action,recoveryKind:'ending',recoveryStage:action.endingStage});
  }
  function beforeCommitRecovery(action) {
    const stage=action.recoveryStage||action.endingStage,kind=action.recoveryKind||(action.endingStage?'ending':null);
    if(!kind&&!stage)return true;
    if(!game||!['ending','mortal','vow'].includes(kind)||!['choice','claim'].includes(stage)||!window.XiuxianCampaignState.recoveryKeys().includes(action.recoveryKey))return false;
    try{
      const record=readRecovery(),snapshot=game.exportSave();validateSave(snapshot);
      const key=action.recoveryKey;
      if(!Object.hasOwn(record.points,key))record.points[key]={};record.points[key][stage]={title:action.recoveryTitle||'山行抉择',kind,createdAt:new Date().toISOString(),save:snapshot};
      vault.atomic(()=>{if(!sameCharacter())throw Error('角色已在另一页切换');vault.snapshot(vault.point(SAVE_KEY,key,stage),armory.state);storage.setItem(RECOVERY_KEY,JSON.stringify(record));});
      return true;
    }catch{notify('未能存下此次行动前的恢复点，操作暂未执行。请先导出当前进度备份，再检查恢复记录或浏览器存储空间。');return false;}
  }
  function recoveryStatus(){
    try{const points=recoveryPoints();return {available:points.length>0,detail:points.length?'本机留有 '+points.length+' 处恢复点。抉择前读回可改道，结算前读回保留原意。':'暂无恢复点。每逢终局、散功或结契抉择前均会自动留档。'};}
    catch{return {available:true,detail:'本机恢复记录暂不可读取。可打开恢复记录，先保存原始内容；当前角色与自动存档未被更改。'};}
  }
  function showRecovery(){
    let points;try{points=recoveryPoints();}catch{
      openModal('recovery', '<h2 id="modal-title">恢复记录暂不可读取</h2><p>当前角色与自动存档仍保留。你可以下载原始恢复记录；重新建立时，也会先在本机保留原始副本，成功后才清空不可读记录。</p><div class="buttons"><button id="recovery-raw" class="secondary">下载原始恢复记录</button><button id="recovery-rebuild" class="secondary">保留副本，重新建立</button><button id="recovery-close" class="secondary">返回行程</button></div><p id="inline-message" role="status"></p>');
      $('recovery-raw').onclick=()=>{try{downloadSave(storage.getItem(RECOVERY_KEY)||'','修仙命运录-原始恢复记录.json');}catch{notify('暂时无法读取原始恢复记录，内容未变。');}};
      $('recovery-rebuild').onclick=()=>{try{const raw=storage.getItem(RECOVERY_KEY);if(raw!==null){storage.setItem(RECOVERY_KEY+'-unreadable',raw);if(storage.getItem(RECOVERY_KEY+'-unreadable')!==raw)throw Error('copy');}storage.setItem(RECOVERY_KEY,JSON.stringify({version:1,points:{}}));showRecovery();}catch{notify('未能保留副本，原恢复记录未被清空。');}};
      $('recovery-close').onclick=()=>campaign.show('journal');return;
    }
    openModal('recovery',`<p class="eyebrow">岔路前留存</p><h2 id="modal-title">选择要读回的山行</h2><p>择一旧刻回溯。读档前会先预览，不会误盖现档。</p><div class="campaign-journal">${points.map((point,i)=>{const g=new Game({save:point.save}),s=g.state;return `<article class="campaign-task"><h3>${esc(point.title)}</h3><p>${esc(recoveryLabel(point))}</p><p>${esc((s.gender==='female'?'林墨 · 女修':'林墨')+' · '+backgrounds.summary(g)+' · '+D.origins[s.origin].name+' · '+g.profile().join(' / '))}<br>${esc(D.maps[s.map].name)}<br>${esc(new Date(point.createdAt).toLocaleString())}</p><button class="secondary" data-recovery-preview="${i}">预览并确认读回</button><button class="quiet" data-recovery-export="${i}">导出此恢复点</button></article>`;}).join('')||'<p>尚无恢复点。下一次确认终局方向前会记录。</p>'}</div><div class="buttons"><button id="recovery-export-current" class="secondary">导出当前行程</button><button id="recovery-close" class="secondary">返回行程</button></div>`);
    $('modal-content').querySelectorAll('[data-recovery-preview]').forEach(b=>b.onclick=()=>{const point=points[Number(b.dataset.recoveryPreview)];previewImport(packed(point.save,vault.at(point.sidecar)),point.title+' · '+recoveryLabel(point));});
    $('modal-content').querySelectorAll('[data-recovery-export]').forEach(b=>b.onclick=()=>{const point=points[Number(b.dataset.recoveryExport)];downloadSave(JSON.stringify(packed(point.save,vault.at(point.sidecar)),null,2),'修仙命运录-终局恢复点.json');});
    $('recovery-export-current').onclick=exportFile;$('recovery-close').onclick=()=>campaign.show('journal');
  }
  function boot(saveData, prologue = false, replace = false, gear, archived) {
    if (A.status !== 'ready') { showNotice('画卷还未备齐', '请稍候画卷载入；若久候未入，请确认本地 assets 目录中的图片文件齐备无缺。'); return false; }
    const next=new Game({...(saveData ? { save: saveData } : { gender, origin, prologue, backgroundId }),playMode:preferences.options.playMode});
    window.XiuxianWorldAtlas.recordVisit(next);
    if(replace||!saveData){
      const previous=readStoredSave();
      if(!previous.readable){notify('暂时无法读取本机存档，未替换原进度。');return false;}
      const key=archived?.sourceKey||SAVE_KEY;
      try{
        const nextGear=vault.atomic(()=>{
          if(game&&!sameCharacter())throw Error('角色已在另一页切换');
          if(archived){
            storage.setItem(journeyRecords.activeKey,JSON.stringify({version:1,key}));
            storage.setItem(journeyRecords.recoveryKey(key),JSON.stringify(archived.recovery));
            if(!archived.live)vault.restorePoints(archived.id,key,archived.recovery);
          }else if(!saveData){vault.clearPoints(key);storage.removeItem(RECOVERY_KEY);}
          const result=vault.reset(key,gear,$('keep-account-collection')?.checked??true);
          storage.setItem(key,JSON.stringify(next.exportSave()));return result;
        });
        SAVE_KEY=key;RECOVERY_KEY=journeyRecords.recoveryKey(key);incarnation=storage.getItem(key+'-incarnation');armory.adopt(nextGear);armoryReady=true;unsavedGear=false;
      }catch{
        if(replace||previous.raw!==null){notify('新存档未能保存，原进度尚未替换。');return false;}
        armory.adopt(window.XiuxianArmory.fresh());armoryReady=true;unsavedGear=true;
      }
    }else loadGear();
    clearTimeout(bannerTimer);bannerTimer=0;banners.length=0;game = next;game.attachArmory(armory);storyRank=window.XiuxianArmory.Legacy.profile(game.state,armory.state).rank;armoryBadge();
    if (saveData) coach.boot(true);
    else coach.resetForNewGame();
    entries.append($('system-tools'));
    try { $('play').classList.toggle('show-controls',storage.getItem('xiuxian-control-line')==='true'); const count=Number(storage.getItem('xiuxian-control-visits')||0); $('play').classList.toggle('early-visit', count<3); storage.setItem('xiuxian-control-visits',String(count+1)); } catch {}
    worldAtlas.observe();
    selected = null; pointer = null; clearInput(); log = []; saveClock = 0;
    $('intro').hidden = true; $('play').hidden = false; window.scrollTo(0,0);
    updatePortrait();
    paintBuildVersion();
    $('player-name').textContent = game.state.gender === 'female' ? '林墨 · 女修' : '林墨';
    $('origin-label').textContent = game.backgroundStatus().name;
    closeModal(); view.resize(); updateHUD(); updateSlots(); const stored=replace||save(true);
    notify((saveData ? '续上这段山行。' : view.goal?.text || game.objective()[0])+(stored?'':' 当前进度仅在本次打开期间保留，请在暂停菜单导出存档。'));
    if (game.state.campaign?.ending) campaign.show('ending');
    else if (game.state.hp <= 0) showDefeat();
    else if (game.state.chapter.tomb.stage==='farewell'&&!game.state.chapter.tomb.bossReward) chapter.show('bossReward');
    else if (game.state.run && game.state.run.phase !== 'active') journey.showExpedition();
    if(!saveData&&backgroundId!=='rain'&&!mode)backgrounds.show();
    if(!mode)$('world').focus({ preventScroll: true });
    return true;
  }
  function startSeparateJourney(){
    const ending=game?.campaignEnding();if(!ending?.canStartSeparateJourney)return;
    const options=(values,chosen)=>Object.entries(values).map(([id,value])=>`<option value="${esc(id)}" ${id===chosen?'selected':''}>${esc(value.name)}</option>`).join('');
    openModal('separate-journey',`<p class="eyebrow">旧行程留存 · 新角色另起</p><h2 id="modal-title">另开一段独立旅程？</h2><p>完整封存「${esc(ending.title)}」与恢复点。新角色自雨庙重起，修为与器藏独立记档。</p><div class="help-grid"><label>新角色 <select id="journey-gender"><option value="female">女修 · 林墨</option><option value="male">男修 · 林墨</option></select></label><label>身世 <select id="journey-background">${options(window.XiuxianBackgroundsData.backgrounds,'rain')}</select></label><label>入山修习 <select id="journey-origin">${options(D.origins,'sword')}</select></label></div><p>${keepCollection}</p><p>建议定期导出存档文件留存。</p><div class="buttons"><button id="journey-backup" class="secondary">先导出本次记录</button><button id="journey-confirm" class="primary">确认保留旧行程，另开新旅程</button><button id="journey-cancel" class="secondary">取消</button></div><p id="inline-message" role="status"></p>`);
    $('journey-backup').onclick=exportFile;$('journey-cancel').onclick=()=>campaign.show('ending');
    $('journey-confirm').onclick=()=>{
      if(!game?.campaignEnding()?.canStartSeparateJourney||A.status!=='ready')return;
      let result,next;
      try{
        const gender=$('journey-gender').value,backgroundId=$('journey-background').value,origin=$('journey-origin').value;
        if(!['female','male'].includes(gender)||!Object.hasOwn(D.origins,origin)||!Object.hasOwn(window.XiuxianBackgroundsData.backgrounds,backgroundId))throw Error('请核对新角色选择');
        next=new Game({gender,backgroundId,origin,prologue:true}).exportSave();
        const id=typeof crypto.randomUUID==='function'?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);
        result=vault.atomic(()=>{if(!sameCharacter())throw Error('角色已在另一页切换');const forked=journeyRecords.fork({currentKey:SAVE_KEY,save:game.exportSave(),recovery:readRecovery(),newSave:next,title:game.campaignEnding().title,id,createdAt:new Date().toISOString()});
          let record=forked.archive.records.find(r=>r.id===id);
          if(!record){
            // The original schema deduplicates on story and recovery alone.
            const prior=forked.archive.records.find(r=>r.sourceKey===SAVE_KEY&&JSON.stringify(r.save)===JSON.stringify(game.exportSave())&&JSON.stringify(r.recovery)===JSON.stringify(readRecovery()));
            if(prior&&!vault.matchesArchive(prior.id,SAVE_KEY,prior.recovery,armory.state)){
              if(forked.archive.records.length>=64)throw Error('旅程档案已满');
              record={...prior,id,createdAt:new Date().toISOString()};forked.archive.records.push(record);
              storage.setItem(journeyRecords.archiveKey,JSON.stringify(forked.archive));journeyRecords.read();
            }
          }
          if(record)vault.archive(id,SAVE_KEY,record.recovery,armory.state);
          vault.rememberSlot(SAVE_KEY,game.campaignEnding().title);vault.rememberSlot(forked.key,'另开的旅程');
          vault.save(SAVE_KEY,armory.state);vault.reset(forked.key,null,$('keep-account-collection').checked);return forked;
        });
      }catch(error){notify('未能另开旅程：'+error.message+' 当前行程仍在；已成功保存的安全副本可从本机旅程档案查看。');return;}
      SAVE_KEY=result.key;RECOVERY_KEY=journeyRecords.recoveryKey(SAVE_KEY);storageResolved=true;
      boot(next);notify('旧行程与恢复点已留在本机旅程档案。新旅程已单独保存。');
    };
  }
  function showJourneyArchive(){
    let records;try{records=journeyRecords.read().records;}catch(error){
      openModal('journey-archive',`<h2 id="modal-title">旅程档案暂不可读取</h2><p>${esc(error.message)}。原始内容未被改动，当前行程仍保留。</p><div class="buttons"><button id="journey-archive-raw" class="secondary">下载原始旅程档案</button><button id="journey-archive-close" class="secondary">返回</button></div><p id="inline-message" role="status"></p>`);
      $('journey-archive-raw').onclick=()=>{try{downloadSave(storage.getItem(journeyRecords.archiveKey)||'','修仙命运录-原始旅程档案.json');}catch{notify('暂时无法读取原始档案，内容未被改动。');}};$('journey-archive-close').onclick=closeModal;return;
    }
    openModal('journey-archive',`<p class="eyebrow">本机留存</p><h2 id="modal-title">旅程档案</h2><p>此处封存历次独立旧档，可随时导出或预览读回。</p><div class="campaign-journal">${records.map((record,i)=>{const g=new Game({save:record.save});return `<article class="campaign-task"><h3>${esc(record.title)}</h3><p>${esc((g.state.gender==='female'?'林墨 · 女修':'林墨')+' · '+backgrounds.summary(g)+' · '+g.profile().join(' / '))}<br>${esc(new Date(record.createdAt).toLocaleString())}</p><button class="secondary" data-journey-preview="${i}">预览并读回行程</button><button class="quiet" data-journey-export="${i}">导出此行程存档</button><button class="quiet" data-journey-recovery="${i}">查看此行程恢复点</button></article>`;}).join('')||'<p>尚未另开独立旅程。已有自动存档仍可从首页继续。</p>'}</div><div class="buttons"><button id="journey-archive-close" class="secondary">返回</button></div>`);
    const list=$('modal-content').querySelector('.campaign-journal');
    for(const [key,title] of vault.slots()){
      if(key===SAVE_KEY)continue;
      try{
        journeyRecords.recoveryKey(key);
        const saved=JSON.parse(storage.getItem(key)),g=new Game({save:saved});
        const button=document.createElement('button');button.className='secondary';button.dataset.journeySlot=key;
        button.textContent='继续此档 · '+title+' · '+backgrounds.summary(g)+' · '+D.maps[g.state.map].name;
        button.onclick=()=>{
          try{
            const current=JSON.parse(storage.getItem(key)),gear=vault.load(key,false);
            const recovery=validateRecovery(JSON.parse(storage.getItem(journeyRecords.recoveryKey(key)))||{version:1,points:{}});
            previewImport(packed(current,gear),title+' · 最近进度',{live:true,sourceKey:key,recovery});
          }catch(error){notify('此旅程暂无法读取：'+error.message);}
        };
        list.append(button);
      }catch{/* Damaged live slots do not hide validated archival copies. */}
    }
    for(const button of $('modal-content').querySelectorAll('[data-journey-preview]'))button.onclick=()=>{const record=records[Number(button.dataset.journeyPreview)];previewImport(packed(record.save,vault.at('journey/'+record.id)),record.title+' · 旅程档案',record);};
    for(const button of $('modal-content').querySelectorAll('[data-journey-export]'))button.onclick=()=>{const record=records[Number(button.dataset.journeyExport)];downloadSave(JSON.stringify(packed(record.save,vault.at('journey/'+record.id)),null,2),'修仙命运录-旅程存档.json');};
    for(const button of $('modal-content').querySelectorAll('[data-journey-recovery]'))button.onclick=()=>showArchivedRecovery(records[Number(button.dataset.journeyRecovery)]);
    $('journey-archive-close').onclick=closeModal;
  }
  function showArchivedRecovery(record){
    const points=listPoints(record.recovery,record.id);
    openModal('journey-archive',`<h2 id="modal-title">${esc(record.title)} · 恢复点</h2><p>旧程留下的岔路节点，预览确认后即可读回。</p><div class="campaign-journal">${points.map((point,i)=>`<article class="campaign-task"><h3>${esc(point.title)}</h3><p>${esc(recoveryLabel(point))}<br>${esc(new Date(point.createdAt).toLocaleString())}</p><button class="secondary" data-archived-point="${i}">预览并确认读回</button><button class="quiet" data-archived-export="${i}">导出此恢复点</button></article>`).join('')||'<p>此旧行程没有已有恢复点，系统不会补造。</p>'}</div><button id="archive-points-back" class="secondary">返回旅程档案</button>`);
    for(const button of $('modal-content').querySelectorAll('[data-archived-point]'))button.onclick=()=>{const point=points[Number(button.dataset.archivedPoint)];previewImport(packed(point.save,vault.at(point.sidecar)),record.title+' · '+point.title+' · '+recoveryLabel(point),record);};
    for(const button of $('modal-content').querySelectorAll('[data-archived-export]'))button.onclick=()=>{const point=points[Number(button.dataset.archivedExport)];downloadSave(JSON.stringify(packed(point.save,vault.at(point.sidecar)),null,2),'修仙命运录-旧旅程恢复点.json');};
    $('archive-points-back').onclick=showJourneyArchive;
  }
  function chooseOrigins() {
    $('origins').innerHTML = Object.entries(D.origins).map(([id, value]) => `<button class="origin ${origin === id ? 'active' : ''}" data-origin="${id}" aria-pressed="${origin === id}"><strong>${value.name}</strong><small>${value.line}</small><p>${value.desc}</p></button>`).join('');
    $('origins').querySelectorAll('button').forEach(button => button.onclick = () => { origin = button.dataset.origin; chooseOrigins(); backgrounds.updateSelection(); });
  }
  document.querySelectorAll('[data-gender]').forEach(button => button.onclick = () => {
    gender = button.dataset.gender;
    document.querySelectorAll('[data-gender]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
    backgrounds.updateSelection();
    updateTitlePortrait();
  });
  function startNew(prologue) {
    const stored=readStoredSave();
    if(!stored.readable){showNotice('先确认本机进度','浏览器暂不允许读取存档，无法确认已有进度。原内容未被替换，请检查本地存储权限后重试。');return;}
    const {unlockedAppearances,achievements,rogue}=armory.state;
    const hasCollection=unlockedAppearances.length||achievements.length||rogue.bestWave||rogue.clears||
      rogue.unlockedEvolutions.length||Object.keys(rogue.talents).length;
    if (stored.raw!==null||hasCollection) {
      const prior=stored.raw!==null;
      const note=prior?(stored.valid?'当前自动存档会被新角色替换。':'本机已有一份暂不可读取的存档，新历练也会替换它。')+'可以先下载原始存档留存。':'此前在九霄或器藏解锁的收藏，可随新角色保留。';
      const backup=prior?'<button class="secondary" id="new-backup">先下载原始存档</button>':'';
      openModal('new','<p class="eyebrow">新的一段山行</p><h2 id="modal-title">开始新的历练？</h2><p class="modal-subtitle">'+note+'</p>'+keepCollection+'<div class="buttons">'+backup+'<button class="primary" id="confirm-new">'+(prior?'确认替换，开始新历练':'开始新历练')+'</button><button class="secondary" id="cancel-new">返回</button></div><p id="inline-message" class="inline-message" role="status"></p>');
      if(prior)$('new-backup').onclick=exportRawSave;
      $('confirm-new').onclick=()=>boot(null,prologue,true);$('cancel-new').onclick=closeModal;
    } else boot(null,prologue);
  }
  function beginJourney(prologue) {
    tutorialNext = () => startNew(prologue);
    onboarding.start({gender});
  }
  const keysBadge = $('control-badge'), keysLine = keysBadge.parentElement;
  let keysPinned = false, keysHovered = false;
  function updateKeys() {
    keysBadge.setAttribute('aria-expanded', String(keysPinned || keysHovered || $('play').classList.contains('show-controls')));
  }
  keysBadge.onclick = () => { keysPinned = !keysPinned; keysHovered = false; updateKeys(); };
  keysLine.onpointerenter = () => { keysHovered = true; updateKeys(); };
  keysLine.onpointerleave = () => { keysHovered = false; updateKeys(); };
  new MutationObserver(updateKeys).observe($('play'), {attributes:true, attributeFilter:['class']});
  $('start').onclick=()=>beginJourney(false);
  $('start-prologue').onclick=()=>beginJourney(true);
  $('continue').onclick = () => {
    try { resolveStorage();const data = JSON.parse(storage.getItem(SAVE_KEY)); validateSave(data); boot(data); }
    catch (error) { showNotice('暂时无法读档', error.message + ' 原存档未被删除，可尝试导入之前导出的备份。'); }
  };
  function updateSlots() {
    const spiritual=game?.canUseSpiritualPower()!==false,blocked=id=>!spiritual&&['fire','needle','ward','incense'].includes(id);
    if(blocked(selected))selected=null;
    const signature = JSON.stringify([selected, spiritual, quick.map(id => game?.state.inventory[id] || 0)]);
    if (signature === slotsSignature) return;
    slotsSignature = signature;
    $('hotbar').innerHTML = quick.map(id => {
      const item = D.items[id], count = game?.state.inventory[id] || 0,shortcut=controls.label('quick'+(quick.indexOf(id)+1),{primary:true});
      return `<button data-item="${id}" class="${selected === id ? 'active ' : ''}${count ? '' : 'empty'}" aria-label="${item.name}，剩余 ${count}，快捷键 ${esc(shortcut)}" aria-pressed="${selected === id}" ${blocked(id)?'disabled':''} title="${blocked(id)?'当前不能运灵；此物仍在行囊中。':item.desc}"><kbd>${esc(shortcut)}</kbd>${A.icon(id)}<small>${item.name}</small><b>${count}</b></button>`;
    }).join('');
    $('hotbar').querySelectorAll('button').forEach(button => button.onclick = () => arm(button.dataset.item));
    $('sword-slot').classList.toggle('active', selected === null);
    $('sword-slot').innerHTML = A.icon('sword') + '<small>自主 / 出剑</small>';
  }
  function arm(id) {
    if (!game || mode || game.state.hp <= 0) return;
    if(!game.canUseSpiritualPower()&&['fire','needle','ward','incense'].includes(id)){notify('当前不能运灵；此物仍在行囊中。');return;}
    if (D.items[id].self) { game.useItem(id); drain(); updateSlots(); updateHUD(); return; }
    if (!game.state.inventory[id]) { notify(D.items[id].name + '已用完。'); return; }
    selected = selected === id ? null : id;
    notify(selected ? '已准备' + D.items[id].name + '，指向地图并点击左键施放。' : '切回普通剑击。'); updateSlots(); $('world').focus({ preventScroll: true });
  }
  function use(id) { if (game?.useItem(id, pointer)) { selected = null; save(true); } drain(); updateSlots(); updateHUD(); }
  $('sword-slot').onclick = () => { selected = null; updateSlots(); };
  let fieldDirty=true,fieldWasPaused=false;
  function updateHUD() {
    fieldDirty=true;
    if (!game) return;
    updatePortrait();
    const s = game.state, [title, desc] = game.objective();
    $('world').parentElement.classList.toggle('has-warning',game.activeEnemies().some(e=>e.hp>0&&e.wind>0));
    $('world').parentElement.classList.toggle('has-boss',game.activeEnemies().some(e=>e.hp>0&&['wang','keeper'].includes(e.kind)));
    $('world').parentElement.classList.toggle('has-run',!!s.run);
    $('hp-bar').style.width = s.hp + '%'; $('mp-bar').style.width = s.mp + '%';
    $('hp-text').textContent = Math.ceil(s.hp); $('mp-text').textContent = Math.floor(s.mp);
    const atSummit = s.map === 'garden' && game.sectSummitBattleActive();
    $('map-name').textContent = atSummit ? '照心坪' : D.maps[s.map].name;
    $('map-sub').textContent = atSummit ? '七宗会武' : D.maps[s.map].sub;
    $('quest-title').textContent = title; $('quest-desc').textContent = desc;
    let steps = [['接取药庐委托', s.flags.accepted], ['穿过后山藤障', s.vineHp <= 0], ['取得药庐木匣', s.inventory.box > 0 || s.flags.complete], ['回山交付', s.flags.complete]];
    if(game.relaxed&&game.taskRecipe){steps.splice(1,0,['采青灵草、开炉炼回气丹',false]);$('quest-title').textContent='师姐的第一炉丹';}
    if(atSummit)steps=game.sectSummitRoster().map(r=>[r.title+' · '+r.name,r.round<s.sectSummit.round]);
    else if(game.inSectWorld())steps=[['筹备行旅药站',s.sectWorld.station.claimed],['追回并交割药车',s.sectWorld.escort.phase==='claimed'],['查账，议定商约',s.sectWorld.contract.claimed]];
    else if(game.inCampaign()||s.campaign.started&&s.map==='garden'){steps=game.campaignStatus().journal.filter(q=>['active','ready','available'].includes(q.status)).map(q=>[q.title,false]);if(!steps.length)steps=[['本段已办妥 · T查全部行程',true]];}
    $('quest-steps').innerHTML = steps.map(([text, done], i) => `<li class="${done ? 'done' : ''}"><span>${done ? '✓' : i + 1}</span>${text}</li>`).join('');
    const near = game.nearest(); $('interact').hidden = !near || !!mode || s.hp <= 0 || !!s.campaign?.battle;
    if (near) $('interact').querySelector('span').textContent = near.name;
    $('buffs').innerHTML = (game.ward > 0 ? `<span>护身 · ${Math.ceil(game.ward)} 秒</span>` : '') + (game.guard ? '<span>格挡中</span>' : '');
    story.updateHUD(); chapter.updateHUD(); journey.updateHUD(); backgrounds.updateHUD(); sects.updateHUD(); tactics.updateHUD(); preferences.update();
    inkUI.update(game,view.goal,mode,preferences.options);
    $('hud-stone').textContent=armory.state.currency.stone;
    if(toastTarget&&toastTarget!==s.map+':'+(view.goal?.id||view.goal?.ui||'')){$('toast').classList.remove('visible');$('toast').replaceChildren();toastTarget=null;}
    $('storyline-stage').textContent=window.XiuxianStoryline.stage(game)+' ▸';
    const campaignTask=view.goal?.taskId&&window.XiuxianCampaignData.tasks[view.goal.taskId];
    if(campaignTask&&s.chapter.complete){$('quest-title').textContent=campaignTask.title;$('quest-desc').textContent=campaignTask.summary;}
    $('quest-next').removeAttribute('data-prose-highlighted');
    $('quest-next').textContent=view.goal?.text||desc;
    $('quest-desc').removeAttribute('data-prose-highlighted');
    window.XiuxianProseHighlight?.decorate($('quest-next'));
    window.XiuxianProseHighlight?.decorate($('quest-desc'));
    $('quest-steps').hidden=!!campaignTask&&s.chapter.complete;
    const mainAvailable=!s.campaign.ending&&(!s.chapter.complete||Object.values(window.XiuxianCampaignData.tasks).some(task=>{
      if(!['筑基卷','金丹卷','元婴卷','化神卷','合体卷','大乘卷'].includes(task.volumeLabel))return false;
      const info=game.campaignTaskStatus(task);return info.known&&['ready','active','available'].includes(info.status);
    }));
    $('storyline-open').classList.toggle('has-badge',mainAvailable);
    const ready=s.chapter.rank<4?!game.isChild()&&game.nearby('cultivate')&&game.insight()>=(s.chapter.rank===3?2:1):game.cultivationStages?.().some(n=>n.status==='available')||((game.cultivationProfile?.().ready)&&game.bodyProfile?.().canCultivate!==false);
    $('cultivation-open').classList.toggle('has-badge',ready&&!s.campaign.ending);
    hubShell.positionQuest(view.goal);
    hubShell.badges();
    controls.decorateBindings(document);window.XiuxianUIHints.decorate($('quest-desc'),controls);
    if(game.inSectWorld()||game.inCampaign()||s.campaign.started&&s.map==='garden')$('quest-steps').innerHTML=steps.map(([text,done],i)=>`<li class="${done?'done':''}"><span>${done?'✓':i+1}</span>${text}</li>`).join('');
  }
  function drain() {
    if (!game) return;
    while (game.events.length) {
      const e = game.events.shift();
      if (e.type === 'sound') {
        if(mode&&!document.hidden&&['craft','loot','complete','breakthrough','fox'].includes(e.name))preferences.sound.preview(e.name,e.volume).catch(()=>{});
        else preferences.sound.play(e.name,e.volume);
      }
      else if (e.type === 'message') notify(e.text);
      else if (e.type === 'dialogue') showDialogue(e);
      else if(e.type==='homestead')homeUI.show();
      else if(e.type==='bounty')bountyUI.board();
      else if(e.type==='abyss')abyssUI.lobby();
      else if (e.type === 'craft') showCraft();
      else if (e.type === 'background') backgrounds.show();
      else if (e.type === 'sectWorld') sectWorld.show(e.panel);
      else if (e.type === 'campaign') campaign.show(e.panel);
      else if (e.type === 'campaignEnding') {armory.award('ending');campaign.show('ending');}
      else if (e.type === 'chapter') { if(e.panel==='arrival'&&game.backgroundStatus().id!=='rain')backgrounds.arrival();else chapter.show(e.panel); }
      else if (e.type === 'story') story.show(e.panel);
      else if (e.type === 'expedition') journey.showExpedition();
      else if (e.type === 'expeditionEnd') journey.showEnd();
      else if (e.type === 'retreat') journey.retreat();
      else if (e.type === 'reunion') journey.showReunion();
      else if (e.type === 'complete') { armory.award('firstCommission');save(true); showComplete(); }
      else if (e.type === 'defeat') { save(true); showDefeat(); }
      else if (['changed', 'map', 'checkpoint'].includes(e.type)) save(true);
    }
    updateHUD();
  }
  function interact() { walk=null; if (!game || mode) return; const near=game.nearest(); view.motion.interact(game,near); game.interact(); drain(); updateSlots(); if(near)coach.interaction(); }
  $('interact').onclick = interact;
  function disposeBattle(next){
    if(mode===next)return;
    if(mode==='abyss-battle'||mode==='bounty-battle')abyssUI.dispose();
    if(mode==='rogue-battle')rogueUI.dispose();
  }
  function recolorAlmanac() {
    if(mode==='almanac')queueMicrotask(()=>window.XiuxianProseHighlight?.decorate($('almanac-article')));
  }
  for(const event of ['click','input','change'])$('modal-content').addEventListener(event,recolorAlmanac);
  function restoreHUD() {
    view.fieldHudHidden=false;
    $('play').classList.remove('hud-hidden');
    $('hud-restore').hidden=true;
  }
  function openModal(kind, html) {
    restoreHUD();
    disposeBattle(kind);
    if(!mode&&game?.arsenal)game.arsenal.rhythm.clear();
    queueMicrotask(window.XiuxianPuzzleAssist.prune);
    if (mode === 'worldAtlas') worldAtlas.dispose();
    if (!mode) returnFocus = document.activeElement;
    if (!entries.hidden) setMenu(false);
    $('cultivation-tabs').hidden = true;
    $('modal-content').classList.remove('reader-layout');
    mode = kind; $('modal').dataset.mode=kind; preferences.sound.quiet(); clearInput(); $('modal-content').innerHTML = html; $('modal-layer').hidden = false;
    if(['bag','gear'].includes(kind)){
      const shortcut=document.createElement('button');shortcut.className='secondary gear-shortcut';shortcut.textContent='装备换装';shortcut.onclick=gearUI.show;
      const heading=$('modal-content').querySelector('h2');if(heading)heading.after(shortcut);
    }
    if(['rogue-battle','abyss-battle','bounty-battle'].includes(kind))$('modal-content').querySelector('header')?.insertAdjacentHTML('beforeend',preferences.musicControl);
    preferences.tick(true,performance.now(),audioContext());preferences.refreshMusic(true);
    inkUI.mountReader(kind);hubShell.mount(kind);enhance($('modal-content')); controls.decorateBindings(document);
    if(kind==='almanac'){
      recolorAlmanac();
    }
    $('modal-close').hidden = kind === 'defeat';
    const mounted=$('modal-content').firstElementChild;
    $('modal').scrollTop=0;
    queueMicrotask(()=>{
      if(mode!==kind || mounted!==$('modal-content').firstElementChild && !mounted?.isConnected) return;
      if(kind==='settings'){inkUI.settings({save,exportFile,importFile:()=>$('import-file').click()});coach.settings(document.querySelector('.settings-grid'));}
      const primaryButtons=[...$('modal-content').querySelectorAll('button.primary')].filter(b=>b.checkVisibility());
      const primary=primaryButtons.find(b=>!b.disabled)||primaryButtons[0];
      for(const button of primaryButtons)button.classList.toggle('opus-secondary',button!==primary);
      if($('modal-content').contains(document.activeElement))return;
      const first=$('modal').classList.contains('ink-reader')?$('modal-content').querySelector('[tabindex="0"]'):null;
      (first||[...$('modal-content').querySelectorAll('button:enabled,input:enabled,select:enabled,summary,[tabindex="0"]')].find(el=>el.checkVisibility())||$('modal-close')).focus({preventScroll:true});
    });
    updateHUD();
  }
  function closeModal() {
    if (mode === 'defeat' && game?.state.hp <= 0) return;
    queueMicrotask(window.XiuxianPuzzleAssist.prune);
    if (mode === 'worldAtlas') worldAtlas.dispose();
    if(mode && !document.hidden && !view.motion.media.matches && !preferences.options.reducedMotion){
      // A departing paper edge can finish after synchronous focus and control return.
      const rect=$('modal').getBoundingClientRect(),edge=document.createElement('div');
      edge.className='vfx-closing';edge.setAttribute('aria-hidden','true');
      Object.assign(edge.style,{left:rect.x+'px',top:rect.y+'px',width:rect.width+'px'});
      document.body.append(edge);setTimeout(()=>edge.remove(),160);
    }
    disposeBattle(null);mode = null; preferences.sound.quiet(); clearInput(); $('modal-layer').hidden = true;
    $('modal-content').replaceChildren(); delete $('modal').dataset.mode; delete $('modal').dataset.shell; delete $('modal').dataset.hub;
    $('modal').classList.remove('mmo-hub'); $('hub-header').hidden=true;
    if (returnFocus && entries.contains(returnFocus)) { setMenu(true); returnFocus.focus({preventScroll:true}); }
    else if (returnFocus?.isConnected && !returnFocus.closest('[hidden]')) returnFocus.focus({ preventScroll: true });
    else if (game) $('world').focus({ preventScroll: true });
    returnFocus = null; updateHUD();
  }
  function cancelModal(){if(mode==='rogue-battle'){rogueUI.back();return;}if(['abyss-battle','bounty-battle'].includes(mode)){abyssUI.leave();return;}if(mode==='import-confirm'&&game)showPause();else closeModal();}
  $('modal-close').onclick = cancelModal;
  function showNotice(title, text) { openModal('notice', `<p class="eyebrow">山行记</p><h2 id="modal-title">${esc(title)}</h2><p class="modal-subtitle">${esc(text)}</p><div class="buttons"><button id="notice-ok" class="primary">知道了</button></div>`); $('notice-ok').onclick = closeModal; }
  function showDialogue(e) {
    openModal('dialogue', `<div class="${e.portrait ? 'dialogue-layout' : 'dialogue-simple'}">${e.portrait ? `<img src="assets/portraits/${e.portrait}.webp" alt="${esc(e.title)}">` : ''}<div><p class="eyebrow">蜀山历练</p><h2 id="modal-title">${esc(e.title)}</h2><p class="dialogue-text">${esc(e.text)}</p><div class="buttons"><button id="dialogue-ok" class="primary">记下了，继续历练 →</button></div></div></div>`);
    $('dialogue-ok').onclick = closeModal;
  }
  function showBag(focusId,category='') {
    if (!game) return;
    if (game.isChild()) { chapter.keepsakes(); return; }
    const owned = Object.keys(D.items).filter(id => game.state.inventory[id] > 0);
    const categories=[...new Set(owned.map(key=>D.items[key].type))];
    const matching=category?owned.filter(key=>D.items[key].type===category):owned;
    const id=matching.includes(focusId)?focusId:matching[0];
    const item = D.items[id];
    const entry=window.XiuxianCatalog.entries.find(e=>e.kind==='item'&&e.key===id);
    const source=entry?.conditions.find(v=>/可得|采集|炼制|可取得|掉落/.test(v));
    const total = owned.reduce((sum, key) => sum + game.state.inventory[key], 0);
    const slots = matching.map(key => `<button class="item-card ${key===id?'selected':''}" data-inspect="${key}" aria-pressed="${key===id}" aria-label="查看${D.items[key].name}">${A.icon(key,'item-mark')}<span class="item-name">${D.items[key].name}</span><span class="item-count">×${game.state.inventory[key]}</span></button>`).join('');
    const emptySlots = '<span class="bag-empty" aria-hidden="true"></span>'.repeat(Math.max(0,15-matching.length));
    openModal('bag', `<p class="eyebrow">随身行囊 · 已暂停</p><h2 id="modal-title">物有所用</h2><p class="modal-subtitle">点选器物可查用法；任务信物独立收存。</p><div class="bag-layout"><div class="inventory-grid">${slots || '<p>行囊暂空。</p>'}${emptySlots}</div><div class="item-detail clarity-paper-card">${item ? `<header class="item-heading">${A.icon(id, 'large-mark')}<div><small>${item.type} · 持有 ${game.state.inventory[id]}</small><h3>${item.name}</h3></div>${item.key || item.self ? `<button id="bag-use" data-use="${id}" class="primary">${item.self ? '立即使用' : '准备施放'}</button>` : ''}</header><h4>何时用</h4><p>${esc(entry?.usage||item.desc)}</p><h4>用了会怎样</h4><p>${item.desc}</p><h4>来源</h4><p>${esc(source||entry?.sourceText||entry?.conditions?.[0]||'在山行中收集。')}</p>` : '去山中寻些材料吧。'}</div></div><div class="bag-totals"><strong>囊中清点</strong><span>器物 ${owned.length} 种</span><span>共 ${total} 件</span><span>灵蕴 ${game.state.collection.spirit}</span></div><p id="inline-message" class="inline-message"></p>`);
    $('modal-content').insertAdjacentHTML('afterbegin', '<div class="collection-tabs"><button id="bag-gear">法宝与升阶</button><button id="bag-notes">图谱与札记</button><button id="bag-catalog">查阅器物用途</button></div>');
    const shortcuts = $('modal-content').querySelector('.collection-tabs');
    const equipment = $('modal-content').querySelector('.gear-shortcut');
    if (equipment) shortcuts.prepend(equipment);
    const filter=document.createElement('select');
    filter.id='bag-filter'; filter.setAttribute('aria-label','行囊分类');
    filter.add(new Option('全部器物',''));
    for(const type of categories)filter.add(new Option(type,type));
    filter.value=category; filter.onchange=()=>showBag(null,filter.value);
    $('bag-catalog').before(filter);
    $('bag-catalog').onclick=()=>catalog.show(id);
    $('bag-gear').onclick = () => journey.showGear(); $('bag-notes').onclick = journey.showNotes;
    $('modal-content').querySelectorAll('[data-inspect]').forEach(b => b.onclick = () => showBag(b.dataset.inspect,category));
    if ($('bag-use')) $('bag-use').onclick = () => {
      if (item.self) { game.useItem(id); updateSlots(); save(true); showBag(id,category); drain(); }
      else { closeModal(); arm(id); }
    };
  }
  function showCraft() { workshop.show(); }
  function showHelp() {
    openModal('help', '<p class="eyebrow">山行指南</p><h2 id="modal-title">修为在身，御敌有方</h2><div class="help-grid"><p><kbd>V</kbd>暂停下令：察看敌情、锁定目标、切换功法、备妥符药</p><p><kbd>迎敌</kbd>自主靠近就近敌手并持续普攻；不会擅自消耗符药</p><p><kbd>守势</kbd>原地架剑格挡并伺机反击，格挡期间持续消耗灵力</p><p><kbd>收势</kbd>停下自主追击与格挡，便于投引灵香后悄然绕行</p><p><kbd>WASD / 方向键</kbd>移动，优先于自主接敌</p><p><kbd>鼠标左键</kbd>选择敌人，也可手动出剑或施放已选道具</p><p><kbd>右键 / 空格</kbd>可选的手动格挡 / 闪避</p><p><kbd>E</kbd>与近处人物、物件交互</p><p><kbd>1–5 / Q / 6</kbd>快捷用符药 / 功法 / 清心散</p><p><kbd>B / R</kbd>行囊 / 法宝装备与升阶</p><p><kbd>M / J / C</kbd>秘境 / 图谱札记 / 青阳案卷</p><p><kbd>Shift / Esc</kbd>夜探轻步 / 暂停与存档</p></div><p class="pause-note">境界决定剑力、术法、护体与回灵速率。定脉诀破气后可接燃火符或寒针追伤；回风诀对减速敌手有额外斩伤；回春诀可受含露瓶与生息器忆加成。暂停下令时不扣资源，落令执行方才结算。<br>剑庐试剑可先切「守势」稳接木傀两招，再改「迎敌」反击三剑。若目标与你隔着石壁障碍，需先走位绕开。投出引灵香可诱开守卫；切「收势」即不会自动上前追砍。</p><div class="buttons"><button class="primary" id="help-ok">继续历练</button></div>');
    $('modal-content').querySelector('.help-grid').insertAdjacentHTML('beforeend','<p><kbd>G</kbd>器物图鉴：查用途、数值、配方与搭配条件</p><p><kbd>L</kbd>三套配装：回到药庐安全处保存与套用</p><p><kbd>O</kbd>器物试录：记录器用实践，回药庐领取已完成的馈赠</p><p><kbd>M</kbd>药庐合备：成年取匣并分享札记后，从旧阵面板与沈灵薇一起备物</p>');
    $('modal-content').querySelector('.help-grid').insertAdjacentHTML('beforeend','<p><kbd>H</kbd>宗门：查看合欢宗门槛、贡献、两路修习与行事评价；已修功法在 V 中选用</p>');
    $('modal-content').querySelector('.help-grid').insertAdjacentHTML('beforeend','<p><kbd>T</kbd>远行案簿：首章后在清微处接值夜委托，查续章目标、证据和人物关系；办理任务须到现场</p>');
    $('help-ok').onclick = closeModal;
    $('help-ok').insertAdjacentHTML('beforebegin','<button class="secondary" id="help-almanac">翻阅山行闻见录 · 完整教程</button>');
    $('help-almanac').onclick=()=>almanac.show('start-first-steps');
    $('help-ok').insertAdjacentHTML('beforebegin','<button class="secondary" id="help-bindings">查看 / 修改全部快捷键</button><button class="secondary" id="help-tutorial">进入前置教学剧情</button>');
    $('help-bindings').onclick=()=>preferences.playerSettings.showBindings();$('help-tutorial').onclick=showTutorial;enhance($('modal-content'));
  }
  $('help-top').onclick = showHelp;
  function showPause() {
    if (!game) return;
    openModal('pause', '<p class="eyebrow">山行暂歇</p><h2 id="modal-title">进度留在此刻</h2><p class="modal-subtitle">暂停期间，敌人、道具效果和游戏内计时都会停止。</p><div class="buttons"><button class="primary" id="resume">继续历练</button><button class="secondary" id="manual-save">保存进度</button><button class="secondary" id="export">导出存档</button><button class="secondary" id="import">导入存档</button></div><p class="pause-note">进度保存在当前浏览器。清除浏览器数据或换浏览器前，请导出一份存档文件。</p><div class="buttons"><button class="quiet" id="pause-help">操作指南</button><button class="quiet" id="pause-settings">玩家设置</button><button class="quiet" id="back-title">保存并返回选角</button></div><p id="inline-message" class="inline-message"></p>');
    $('resume').onclick = closeModal; $('manual-save').onclick = () => save(); $('export').onclick = exportFile; $('import').onclick = () => $('import-file').click();
    $('pause-settings').onclick = preferences.show; $('pause-help').onclick = showHelp; $('back-title').onclick = toTitle;
    $('back-title').insertAdjacentHTML('beforebegin','<button class="quiet" id="pause-journeys">本机旅程档案</button>');$('pause-journeys').onclick=showJourneyArchive;
    $('pause-help').insertAdjacentHTML('afterend','<button class="quiet" id="pause-almanac">山行闻见录</button>');$('pause-almanac').onclick=()=>almanac.show();
  }
  $('pause').onclick = showPause;
  function toTitle() {
    if(!save(true)){showPause();notify('本次进度尚未保存，已留在这里。请先导出存档，或检查浏览器存储后再保存。');return false;}
    closeModal();setMenu(false);document.querySelector('.masthead').append($('system-tools'));game=null;preferences.tick(true,performance.now());$('play').hidden=true;$('intro').hidden=false;clearInput();readStoredSave();$('start').focus();return true;
  }
  function showComplete() {
    const s = game.state;
    openModal('complete', `<span class="result-seal">药匣归山</span><h2 id="modal-title">此行，物尽其用</h2><p class="dialogue-text">“药一味也没少。${s.stats.kills === 0 ? '一剑未出便能绕开石傀把药匣带回来，倒比我想的更沉得住气。' : '往后下山走行也是这般，动手前先看清场中虚实。'}”<br>沈灵薇接过封妥的木匣，顺手往你行囊里塞了两块新做的杏花糕。</p><div class="result-grid"><div><strong>${s.stats.used}</strong><small>使用道具</small></div><div><strong>${s.stats.crafted}</strong><small>炼制次数</small></div><div><strong>+${s.bond}</strong><small>沈灵薇 · 信任</small></div></div><p class="modal-subtitle">药庐取匣委托已办妥，获赠杏花糕 ×2。「旧阵寻宝」自此开启：五段短局秘境、法宝入藏与升阶，所获器物绝不随失利遗失。青阳急信亦已送抵山门——只需修完一门历练，再到中央蒲团运气筑基即可下山，无须先通关旧阵。</p><div class="buttons"><button class="primary" id="keep-playing">继续逛逛</button><button class="secondary" id="result-export">导出这段历练</button><button class="secondary" id="result-title">返回选角</button></div>`);
    $('modal-content').querySelector('.buttons').insertAdjacentHTML('beforeend','<button id="result-story" class="primary">读青阳来信</button>'); $('result-story').onclick=story.brief;
    $('keep-playing').textContent = '前往旧阵寻宝'; $('keep-playing').onclick = journey.showExpedition; $('result-export').onclick = exportFile; $('result-title').onclick = toTitle;
  }
  function showDefeat() {
    openModal('defeat', '<p class="eyebrow">历练受挫</p><h2 id="modal-title">先回山调息</h2><p class="dialogue-text">沈灵薇将你扶回药庐榻上调息。此前拾取的材料、法宝与查案记录一概保留。<br>下一趟不妨先投寒针迟滞敌步、贴护身符硬扛重击，或干脆点一炷引灵香绕开守卫。</p><div class="buttons"><button class="primary" id="retry">恢复气血，重整行囊</button></div>');
    $('retry').onclick = () => { game.retry(); closeModal(); save(true); drain(); updateHUD(); };
  }
  function downloadSave(text,filename) {
    const blob=new Blob([text],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function packed(save,gear){
    const fresh=window.XiuxianArmory.fresh();
    const ordered={...fresh,...gear,rogue:{...fresh.rogue,...gear.rogue}};
    return JSON.stringify(ordered)===JSON.stringify(fresh)?save:{...save,armory:gear};
  }
  function exportFile() {
    if(!game)return;
    downloadSave(JSON.stringify(packed(game.exportSave(),armory.state),null,2),'修仙命运录-山行存档.json');
    notify('已发起存档下载，请确认文件已保存。以后可从首页或暂停菜单导入。');
  }
  function exportRawSave() {
    const stored=readStoredSave();
    if(!stored.readable){showNotice('暂时无法下载原始存档','浏览器暂不允许读取本机存档，原内容未被改动。请检查本地存储权限后重试。');return;}
    if(stored.raw===null){showNotice('尚无本机存档','可先开始历练，或从首页导入已有的备份。');return;}
    let backup=stored.raw;
    if(stored.valid){try{const story=JSON.parse(stored.raw),complete=packed(story,vault.load(SAVE_KEY,true));if(complete!==story)backup=JSON.stringify(complete);}catch{/* Preserve exact bytes for a damaged sidecar. */}}
    downloadSave(backup,'修仙命运录-本机原始存档.json');notify('已发起原始存档下载，内容未作修改。请确认文件已保存后再替换进度。');
  }
  function previewImport(value, filename, archived) {
    const importedGear=value.armory===undefined?window.XiuxianArmory.fresh():window.XiuxianArmory.validate(value.armory);
    const preview=new Game({save:value}),s=preview.state,stored=readStoredSave();
    const summary=(s.gender==='female'?'林墨 · 女修':'林墨')+' · '+backgrounds.summary(preview)+' · '+D.origins[s.origin].name+' · '+preview.profile().join(' / ');
    openModal('import-confirm',`<p class="eyebrow">读回一段山行</p><h2 id="modal-title">确认导入这份存档？</h2><p class="modal-subtitle">${esc(filename)}<br>${esc(summary)}<br>${esc(D.maps[s.map].name)} · 已藏法宝 ${s.collection.gear.length} 件 · 灵蕴 ${s.collection.spirit}</p><p class="pause-note">${game?'确认后将替换当前进度，可先备份现档。':stored.raw!==null?'确认后将替换本机存档，可先下载备份。':'确认后即载入此档继续山行。'}</p><div class="buttons">${game||stored.raw!==null?'<button id="import-backup-current" class="secondary">先备份原进度</button>':''}<button id="confirm-import" class="primary">确认导入</button><button id="cancel-import" class="secondary">取消</button></div><p id="inline-message" class="inline-message" role="status"></p>`);
    if($('import-backup-current'))$('import-backup-current').onclick=game?exportFile:exportRawSave;
    $('cancel-import').onclick=cancelModal;
    $('confirm-import').onclick=()=>{if(boot(preview.exportSave(),false,true,importedGear,archived))notify('存档已导入并保存。');};
  }
  $('import-file').onchange = async event => {
    const file = event.target.files[0]; if (!file) return;
    try { if (file.size > 32*1024*1024) throw Error('文件过大，请选择本游戏导出的 JSON 存档。'); const raw=await file.text();if(file.size>200000&&!raw.includes('"armory"'))throw Error('文件过大，请选择本游戏导出的 JSON 存档。');const value = JSON.parse(raw); validateSave(value); previewImport(value,file.name); }
    catch (error) { const text='导入失败：'+error.message+' 当前进度未变。';if(game)notify(text);else showNotice('导入失败',text); }
    finally { event.target.value = ''; }
  };
  function safeToWalk(){return game&&!mode&&!onboarding.active&&!termHelp.isOpen&&!coach.paused&&game.state.hp>0&&!game.state.campaign?.ending&&!game.activeEnemies().some(e=>e.hp>0);}
  function startWalk(point,object,attackRubble=false){
    if(!safeToWalk())return false;
    walk=null;
    if(object&&arriveAt(object,attackRubble))return true;
    const route=window.XiuxianGuide.walkingRoute(game,point,object);
    if(!route?.length){notify('此处没有可走到的落脚点。');return false;}
    walk={map:game.state.map,id:object?.id,route,attackRubble,retries:0};selected=null;held=false;return true;
  }
  function arriveAt(object,attackRubble){
    if(game.nearest()?.id!==object.id)return false;
    if(object.id==='swordMark'||object.kind==='vine'||(attackRubble&&object.id==='rubble')){
      if(Math.hypot(game.state.x-object.x,game.state.y-object.y)>=85)return false;
      walk=null;game.requestAttack(object);drain();
    }else interact();
    return true;
  }
  function travelInput(){
    const keys=movement();
    if(!walk)return keys;
    if(keys.x||keys.y||keys.sneak||guarding||!safeToWalk()||walk.map!==game.state.map){walk=null;return keys;}
    const object=walk.id&&game.objects().find(o=>o.id===walk.id);
    if(walk.id){
      if(!object){walk=null;return keys;}
      if(arriveAt(object,walk.attackRubble))return keys;
    }
    const s=game.state;
    while(walk.route.length&&Math.hypot(walk.route[0].x-s.x,walk.route[0].y-s.y)<5)walk.route.shift();
    if(!walk.route.length){
      if(object&&walk.retries++<2)walk.route=window.XiuxianGuide.walkingRoute(game,object,object)||[];
      if(!walk.route.length){walk=null;return keys;}
    }
    return {...keys,x:walk.route[0].x-s.x,y:walk.route[0].y-s.y};
  }
  $('guide-action').onclick=()=>{
    const goal=window.XiuxianGuide.goalFor(game);if(goal?.ui){$(goal.ui)?.click();return;}
    const o=game.objects().find(o=>o.id===goal?.id);
    if(o&&safeToWalk())startWalk(o,o);else if(o)notify('先应对场中敌人，再循路前往。');else storyline.show();
  };
  const canvas = $('world');
  canvas.addEventListener('pointermove', e => { pointer = view.point(e); });
  canvas.addEventListener('pointerdown', e => {
    if (!game || mode) return; e.preventDefault(); canvas.focus({ preventScroll: true }); pointer = view.point(e);
    if (e.button === 2) guarding = true;
    if (e.button === 0) { if (selected) use(selected); else if(safeToWalk()){const object=window.XiuxianGuide.hitObject(game,pointer,view.guideFrame);startWalk(object||pointer,object,object?.id==='rubble');} else { game.selectAt(pointer); game.requestAttack(pointer); held = true; drain(); } }
  });
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('pointerup', e => { if(e.button===0)held=false; if(e.button===2)guarding=false; });
  document.addEventListener('keydown', e => {
    if(mode==='rogue-battle'&&rogueUI.key(e,true)){e.preventDefault();return;}
    if(e.defaultPrevented||e.isComposing||onboarding.active||termHelp.isOpen)return;
    if (!mode && !entries.hidden && e.key==='Escape') { e.preventDefault(); setMenu(false); systemMenu.focus(); return; }
    const editable=window.XiuxianControls.isEditableTarget(e.target),action=editable?null:controls.resolve(e);
    if(['abyss-battle','bounty-battle'].includes(mode)&&abyssUI.key(e,true)){e.preventDefault();return;}
    if(game&&!editable&&!action&&e.code==='KeyU'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey&&(!mode||$('modal').dataset.hub==='hub-cultivation')){
      e.preventDefault();if(!e.repeat){if(mode)closeModal();else hubShell.openHubTab('hub-cultivation');}return;
    }
    if(game&&!editable&&!action&&e.code==='KeyK'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.shiftKey&&(!mode||mode==='armory')){e.preventDefault();if(!e.repeat){if(mode)closeModal();else gearUI.show();}return;}
    if(game && !editable && !action && e.code==='KeyP' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey && (!mode || mode==='storyline')){
      e.preventDefault();if(!e.repeat){if(mode)closeModal();else storyline.show();}return;
    }
    if(mode){
      const reader=$('modal').classList.contains('ink-reader');
      const cinema=$('modal').dataset.shell==='dialogue';
      if(e.key==='Escape' && !cinema && ( document.querySelector('#campaign-confirm,#sect-world-confirm,#confirm-import,#confirm-new,#journey-confirm,#loadout-confirm'))){
        e.preventDefault();document.querySelector('.reader-full[aria-expanded="true"]')?.click();return;
      }
      if(reader && !editable && !e.altKey && !e.ctrlKey && !e.metaKey && /^[1-9]$/.test(e.key)){
        e.preventDefault();const button=document.querySelector('[data-read-choice="'+e.key+'"]:enabled');
        if(cinema){if(!e.repeat)button?.click();}else button?.focus();return;
      }
      if(mode==='tactics' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if(controls.resolve(e)==='tactics'){e.preventDefault();if(!e.repeat)closeModal();return;}
        if (/^[1-3]$/.test(e.key)) {
          e.preventDefault();
          if(!e.repeat) document.querySelectorAll('[data-stance]')[Number(e.key)-1]?.click();
          return;
        }
        if(e.key==='Enter'){e.preventDefault();if(!e.repeat)$('tactics-execute').click();return;}
      }
      if(action==='pause'||e.key==='Escape'){e.preventDefault();if(!e.repeat)cancelModal();return;}
      const modes={almanac:'almanac',catalog:'catalog',loadouts:'loadouts',research:'research',sects:'sects',campaign:'campaign',tactics:'tactics',worldMap:'worldAtlas',settings:'settings'};
      if(action&&modes[action]===mode){e.preventDefault();if(!e.repeat)closeModal();return;}
      if(action==='fullscreen'){e.preventDefault();if(!e.repeat)fullscreen();return;}
      if(e.key==='Tab'){
        const elements=[...$('modal').querySelectorAll('button:not([disabled]):not([hidden]),[href],input:not([disabled]),select:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length);
        const first=elements[0],end=elements.at(-1);
        if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('modal'))){e.preventDefault();end?.focus();}
        else if(!e.shiftKey&&document.activeElement===end){e.preventDefault();first?.focus();}
      }
      return;
    }
    if(editable||!action)return;
    e.preventDefault();controls.press(e);if(e.repeat)return;
    if(action==='almanac'){almanac.show();return;}
    if(action==='catalog'){catalog.show();return;}
    if(action==='help'){showHelp();return;}
    if(action==='settings'){preferences.show();return;}
    if(action==='tutorial'){showTutorial();return;}
    if(action==='fullscreen'){fullscreen();return;}
    if(!game)return;
    const panels={sects:()=>sects.show(),campaign:()=>campaign.show('journal'),tactics:()=>tactics.show(),loadouts:()=>loadouts.show(),research:()=>research.show(),bag:showBag,gear:()=>journey.showGear(),expedition:()=>journey.showExpedition(),notes:()=>journey.showNotes(),worldMap:()=>worldAtlas.show(),pause:showPause};
    if(panels[action]){panels[action]();return;}
    if(action==='interact')interact();
    if(action==='case'&&!game.isChild())story.board();
    if(action==='skill'){game.castSkill();drain();}
    if(action==='dodge'){const v=movement();game.requestDodge(v.x||v.y?v:game.face);drain();}
    if(/^quick[1-6]$/.test(action)){const n=Number(action.slice(-1));use(n===6?'qingxin':quick[n-1]);}
  });
  document.addEventListener('keyup',e=>controls.release(e));
  document.addEventListener('keydown',e=>{
    if(e.code!=='KeyZ'||!e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.defaultPrevented||!game||
      mode||onboarding.active||termHelp.isOpen||coach.paused||window.XiuxianControls.isEditableTarget(e.target)||controls.resolve(e))return;
    e.preventDefault();
    if(!e.repeat && !game.activeEnemies().some(enemy=>enemy.hp>0)){
      setMenu(false);
      view.fieldHudHidden=$('play').classList.toggle('hud-hidden');
      $('hud-restore').hidden=!view.fieldHudHidden;
    }
  });
  function movement(){return controls.movement();}
  let windowBlurred=false;
  window.addEventListener('blur', () => { windowBlurred=true; preferences.sound.pauseMedia(); preferences.sound.quiet(); clearInput(); if (game && !mode) { save(true); showPause(); } });
  window.addEventListener('focus', () => { windowBlurred=false; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { if(abyssUI.run)abyssUI.suspend();game?.arsenal?.rhythm.clear();preferences.sound.pauseMedia(); preferences.sound.quiet(); } if (document.hidden && game) { clearInput(); save(true); if (!mode) showPause(); } });
  window.addEventListener('beforeunload', () => { if (game) save(true); });
  window.addEventListener('resize', () => { if (game) {view.resize();fieldDirty=true;} });
  function audioContext() {
    const side=({'rogue-battle':rogueUI,'abyss-battle':abyssUI,'bounty-battle':abyssUI})[mode];
    if(side)return {...side.music(),allowMusic:side.music().allowMusic&&!windowBlurred&&!document.hidden};
    if(!game&&!mode)return {mode:'title',allowMusic:!windowBlurred&&!document.hidden};
    const title=mode?$('modal-title')?.textContent||'':'';
    const cultivation=['chapter','campaign'].includes(mode)&&!!document.querySelector('.cultivation-view');
    const cue=mode?document.querySelector('#modal [data-score-cue]')?.dataset.scoreCue||'':'';
    const farewell=mode==='chapter'&&game?.state.map==='tomb'&&game.state.chapter.tomb.stage==='farewell'||mode==='campaign'&&!!game?.state.campaign?.ending;
    const narrative=!!cue||mode==='dialogue'||mode==='reunion'||farewell||['chapter','campaign'].includes(mode)&&(cultivation||/运气|境界|调息|实修|修为|重逢|结契|相伴|赠簪|故人|终章|归凡/.test(title));
    return {mode:mode||'',title,cultivation,cue,allowMusic:narrative&&!windowBlurred&&!onboarding.active&&!termHelp.isOpen};
  }
  function frame(now) {
    const dt = Math.min((now - last) / 1000 || 0, .04); last = now;
    if(document.hidden){requestAnimationFrame(frame);return;}
    coach.tick(now);
    const paused=!!mode||onboarding.active||termHelp.isOpen||coach.paused;
    preferences.tick(paused||windowBlurred,now,audioContext());
    if (game) {
      if($('play').classList.contains('hud-hidden') && (paused||game.activeEnemies().some(enemy=>enemy.hp>0)))restoreHUD();
      armoryBadge();if(mode==='armory'&&armory.revision!==view.armoryRevision){view.armoryRevision=armory.revision;fieldDirty=true;}
      if (!paused) {
        game.hitPauseEnabled=preferences.options.hitPause;
        const direction=travelInput();
        if(!mode)game.step(dt, { ...direction, aim: pointer, guard: guarding, manual:held||!!selected });
        if (held) game.attack(pointer);
        saveClock += dt; uiClock += dt;
        // DOM, guide layout and inventory refreshes cost more than the ink strokes.
        if(game.events.length || uiClock>.12)drain();
        if (saveClock >= 12) { save(true); saveClock = 0; }
        if (uiClock > .12) { updateSlots(); uiClock = 0; }
      }
      const worldWrap=$('world').parentElement;
      worldWrap.classList.toggle('has-boss',game.activeEnemies().some(e=>e.hp>0&&['wang','keeper'].includes(e.kind)));
      worldWrap.classList.toggle('has-danger',game.activeEnemies().some(e=>e.hp>0&&e.wind>0));
      const reduced=preferences.options.reducedMotion || view.motion.media.matches;
      if(!paused || !fieldWasPaused || fieldDirty || reduced!==view.motion.reduced){
        if(reduced||game.arsenal.clock>=game.arsenal.rhythm.freezeUntil)view.draw(game, pointer, selected, game.state.playTime);
        fieldDirty=false;
      }
      fieldWasPaused=paused;
      if(mode==='sects'&&!coach.paused)view.motion.banner(document.querySelector('.sect-atmosphere'),$('modal').dataset.house,now);
      guideOverlay.tick({paused,mode:mode||'field',goal:hubShell.guideTarget(view.goal),now});
      coach.afterFrame();
    }
    requestAnimationFrame(frame);
  }
  let enhanceQueued=false;
  const modalObserver=new MutationObserver(()=>{if(enhanceQueued)return;enhanceQueued=true;queueMicrotask(()=>{enhanceQueued=false;enhance($('modal-content'));});});
  modalObserver.observe($('modal-content'),{subtree:true,childList:true});
  paintBuildVersion(); chooseOrigins(); backgrounds.renderChoices(); updateTitlePortrait(); enhance(document);
  A.ready.then(status => {
    if (status === 'ready') {
      $('start').disabled = false; $('start-prologue').disabled=false; $('continue').disabled = false;
      $('start').textContent = '跳过序章 · 入山历练'; $('start-prologue').textContent='从雨夜开始 →';
    } else {
      $('start').textContent = '图片未完整载入';
      $('intro').querySelector('.intro-note').textContent = '请确认 assets 目录中的图片完整，再重新打开游戏。';
    }
  });
  window.addEventListener('storage',event=>{
    if(!game&&(event.key===journeyRecords.activeKey||event.key===SAVE_KEY+'-incarnation')){
      storageResolved=false;try{loadGear(false);}catch{armoryReady=false;}readStoredSave();
    }
  });
  const hubShell=window.XiuxianHubShell.create({
    game:()=>game,mode:()=>mode,stone:()=>armory.state.currency.stone,
    open:{
      armory:gearUI.show,gear:()=>journey.showGear(),loadouts:loadouts.show,
      cultivate:()=>{if(game.state.chapter.rank<4&&!game.isChild())chapter.show('cultivate');else campaign.show('cultivation');},
      chapter:chapter.overview,background:backgrounds.show,homestead:homeUI.show,
      bag:()=>showBag(),craft:workshop.show,provisions:provisions.show,research:research.show,
      storyline:storyline.show,story:()=>game.state.story.stage==='unstarted'?story.brief():story.board(),
      campaign:()=>campaign.show('journal'),sects:sects.show,worldAtlas:()=>worldAtlas.show(),
      abyss:abyssUI.lobby,rogue:rogueUI.lobby,bounty:bountyUI.board,expedition:journey.showExpedition,
      almanac:()=>almanac.show(),catalog:()=>catalog.show(),notes:journey.showNotes,settings:preferences.show
    }
  });
  $('rail-armory').onclick=()=>hubShell.openHubTab('hub-armory');
  $('bag').onclick=()=>hubShell.openHubTab('hub-bag');
  $('practice-tab').onclick=()=>hubShell.openHubTab('hub-cultivation');
  readStoredSave();
  requestAnimationFrame(frame);
  // Exposes the actual game instance for local diagnostics; no remote services or telemetry.
  window.xiuxian = { armory,abyss:abyssUI,rogue:rogueUI,get game() { return game; }, get paused() { return !!mode||onboarding.active||termHelp.isOpen||coach.paused; }, save, get storageKey(){return SAVE_KEY;}, audio:preferences.sound, options:preferences.options, view, controls, profile, onboarding, worldAtlas, termHelp, get mode(){return mode;} };
})();
