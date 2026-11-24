(function(root){
  'use strict';
  const RECORD_KEY='xiuxian-onboarding-v1',copy=value=>JSON.parse(JSON.stringify(value));
  const objects={guide:{id:'guide',x:300,y:350,name:'引路弟子 · 演练'},practice:{id:'practice',x:601,y:535,name:'试剑桩'},spoils:{id:'spoils',x:750,y:535,name:'问路札记 · 演练'},herb:{id:'herb',x:489,y:315,name:'药亭札记'},exit:{id:'exit',x:1160,y:384,name:'后山山径'}};
  const lessons={
    welcome:['入山第一课 · 山门问路','晨雾漫过山门，值守弟子递来演练图：“先认路，再整备；遇敌随时可停步细想。”山门演武，不计入正式命途，随时可跳。'],
    walk:['先走近，再交互','循地面箭头走到引路弟子身旁。头顶浮标指路，脚下圆框标出可交互之处。'],
    meet:['问一声路','已至引路弟子身旁。按交互键，或点地图下方的交互按钮。'],
    kit:['把准备做在交战前','“修为与行前搭配，方是立身之本。”先挑一件演练兵甲，再配一门主动功法。'],
    approach:['走到试剑桩','行装已备妥。走近试剑桩交互，开启一场自动普攻演武。'],
    command:['先暂停下令','阵灵现身，接敌范围内会自动普攻。现在打开「暂停下令」，点选阵灵并服下一枚回气丹——暂停期间敌我与计时皆定格。'],
    resume:['看好目标与消耗，再继续','目标已定、回气丹已服。点继续迎敌，也可在暂停时施放功法。'],
    fight:['让搭配完成这一战','指令已落。近敌自会出剑，战中可随时按 V 暂停审视，无须苛求手速。'],
    retry:['先调息，再试一次','此阵未过。随身兵甲仍在，已耗丹药不退，调息后即可再试。'],
    spoils:['取得才算随身','阵灵散去。走近问路札记交互，将其收入囊中。'],
    loss:['再试一次撤回','札记已入囊。再开一轮演武，从暂停下令中选择撤回，看看何物留存。'],
    retreat:['结束本场，保留已获物','打开「暂停下令」点撤回安全处。纵使失利或撤离，已入囊的永久器物与剧情亦悉数保留，唯已耗符药不退。'],
    ledger:['核对随身记录','已回安全处：兵甲与札记俱在，已服回气丹不退。选出契合眼前记录的一项。'],
    track:['把任务追到地图上','打开任务记录，追踪“到药亭读札记”，脚下便会亮起指路箭头。'],
    'track-walk':['跟着追踪找到药亭','循箭头走近药亭札记并交互，办结此项演武。'],
    book:['遇到疑问，查山行闻见录','打开山行闻见录，翻至“失利与保留”，核对已耗符药的去向。'],
    map:['先辨道路，再定去向','打开世界地图，标出通往“后山旧阵”的当前出口。'],
    'map-walk':['走向真实出口','循路走到东侧后山山径，交互即可离场。'],
    complete:['问路已毕，可以正式启程','山门演武已毕。返回选角后，即可按你择定的身世与专长正式踏入山河。']
  };
  class Session{
    constructor({gender='female'}={}){
      this.state={stage:'welcome',panel:null,gender:gender==='male'?'male':'female',x:235,y:555,hp:65,inventory:{potion:1},gear:null,skill:null,permanent:[],target:false,paused:false,battle:null,tracked:false,bookEntry:null,notice:'',time:0,moved:0,evidence:{},events:[]};
      this.attackClock=0;this.enemyClock=0;this.lastFacing={x:1,y:0};
    }
    event(kind,detail){this.state.events.push({kind,detail:detail||'',at:Math.round(this.state.time*100)/100});}
    setNotice(text){this.state.notice=text;return false;}
    begin(){if(this.state.stage!=='welcome')return false;this.state.stage='walk';this.event('begin');return true;}
    goal(){
      const stage=this.state.stage,id=['walk','meet'].includes(stage)?'guide':stage==='approach'?'practice':stage==='spoils'?'spoils':stage==='track-walk'?'herb':stage==='map-walk'?'exit':null;
      return id?objects[id]:null;
    }
    near(object){return object&&Math.hypot(this.state.x-object.x,this.state.y-object.y)<90;}
    step(dt,input={}){
      const s=this.state;if(s.stage==='welcome'||s.stage==='complete'||s.panel||s.paused)return;
      dt=Math.max(0,Math.min(dt,.05));s.time+=dt;let x=Number(input.x)||0,y=Number(input.y)||0,len=Math.hypot(x,y);
      if(len){x/=len;y/=len;const speed=input.sneak?100:240,nx=Math.max(70,Math.min(1210,s.x+x*speed*dt)),ny=Math.max(305,Math.min(685,s.y+y*speed*dt));s.moved+=Math.hypot(nx-s.x,ny-s.y);s.x=nx;s.y=ny;this.lastFacing={x,y};}
      if(s.stage==='walk'&&s.moved>=80&&this.near(objects.guide)){s.stage='meet';s.evidence.movement=true;this.event('movement');}
      if(s.battle){
        this.attackClock+=dt;this.enemyClock+=dt;
        if(this.attackClock>=.85&&Math.hypot(s.x-s.battle.x,s.y-s.battle.y)<260){this.attackClock=0;s.battle.hp=Math.max(0,s.battle.hp-(s.gear==='balanced'?18:13));}
        if(this.enemyClock>=2.3&&Math.hypot(s.x-s.battle.x,s.y-s.battle.y)<300){this.enemyClock=0;s.hp=Math.max(0,s.hp-(s.gear==='defensive'?6:11));}
        if(s.hp<=0)this.endBattle(true);
        else if(s.battle.hp<=0){s.battle=null;if(s.permanent.length){s.stage='loss';s.notice='这一轮阵灵已退。再开一轮，练习在暂停中撤回。';}else if(s.evidence.pause&&s.evidence.consumable&&s.evidence.target){s.stage='spoils';s.evidence.autoAttack=true;this.event('battle-won');}else{s.stage='retry';s.notice='阵灵已退，但暂停、选敌或用药尚未练完。调息后再试。';}}
      }
    }
    interact(){
      const s=this.state,goal=this.goal();if(!goal||!this.near(goal))return this.setNotice('先走近标记中的人物或物件。');
      s.notice='';
      if(s.stage==='meet'){s.stage='kit';s.panel='kit';s.evidence.interaction=true;this.event('interact','guide');return true;}
      if(s.stage==='approach'){this.startBattle('command');return true;}
      if(s.stage==='spoils'){s.permanent.push('问路札记（演练）');s.stage='loss';this.event('claim','问路札记');return true;}
      if(s.stage==='track-walk'){s.stage='book';s.evidence.tracking=true;s.tracked=false;this.event('quest-complete');return true;}
      if(s.stage==='map-walk'){s.stage='complete';s.evidence.worldMap=true;s.evidence.realExit=true;this.event('complete');return true;}
      return this.setNotice('沿方向箭头走近引路弟子，先完成移动练习。');
    }
    configure(type,value){
      const s=this.state;if(s.stage!=='kit')return false;
      if(type==='gear'&&['balanced','defensive'].includes(value))s.gear=value;
      else if(type==='skill'&&['sword','medicine'].includes(value))s.skill=value;else return false;
      this.event('configure',type+':'+value);s.notice='';
      if(s.gear&&s.skill){s.evidence.configuration=true;s.stage='approach';s.panel=null;s.paused=false;}return true;
    }
    startBattle(stage='command'){
      const s=this.state;s.stage=stage;s.panel=null;s.paused=false;s.target=false;s.battle={x:750,y:535,hp:110,maxHp:110};this.attackClock=0;this.enemyClock=0;this.event('battle-start');return true;
    }
    open(panel){
      const s=this.state;if(panel==='tactics'&&!s.battle)return this.setNotice('先走近试剑桩开始试阵。');
      s.panel=panel;s.paused=true;s.notice='';
      if(panel==='tactics'&&s.battle){s.evidence.pause=true;this.event('pause');}return true;
    }
    closePanel(){
      const s=this.state;
      if(s.panel==='tactics'&&s.stage==='command'&&!(s.evidence.consumable&&s.target))return this.setNotice('先选中阵灵，并使用回气丹，再继续迎敌。');
      if(s.panel==='kit'&&s.stage==='kit')return this.setNotice('先各选一项装备与功法。');
      if(s.panel==='tactics'&&s.stage==='resume')s.stage='fight';
      s.panel=null;s.paused=false;s.notice='';return true;
    }
    selectTarget(){const s=this.state;if(!s.battle||s.panel!=='tactics')return false;s.target=true;s.evidence.target=true;this.event('target');this.readyToResume();return true;}
    usePotion(){const s=this.state;if(!s.battle||s.panel!=='tactics'||s.inventory.potion<=0)return false;s.inventory.potion--;s.hp=Math.min(100,s.hp+32);s.evidence.consumable=true;this.event('consume','回气丹');this.readyToResume();return true;}
    useSkill(){const s=this.state;if(!s.battle||s.panel!=='tactics'||!s.target)return this.setNotice('先选中场中阵灵。');if(s.battle.skillUsed)return this.setNotice('本轮功法示范已用过；正式功法依各自灵力与调息条件使用。');if(s.skill==='medicine')s.hp=Math.min(100,s.hp+22);else s.battle.hp=Math.max(1,s.battle.hp-24);s.battle.skillUsed=true;s.evidence.skill=true;this.event('skill',s.skill);s.notice='已在本页执行'+(s.skill==='medicine'?'回春诀':'回风诀')+'。';return true;}
    readyToResume(){const s=this.state;if(s.stage==='command'&&s.target&&s.evidence.consumable)s.stage='resume';}
    retry(){const s=this.state;if(s.stage!=='retry')return false;s.hp=100;s.notice='已调息；本页已完成的练习仍保留。';return this.startBattle(s.evidence.consumable&&s.evidence.target?'fight':'command');}
    secondBattle(){if(this.state.stage!=='loss')return false;this.state.hp=100;return this.startBattle('retreat');}
    endBattle(failed=false){
      const s=this.state;if(!s.battle)return false;s.battle=null;s.panel=null;s.paused=false;s.hp=100;s.x=300;s.y=470;
      s.stage=s.permanent.length?'ledger':'retry';s.evidence.retreat=!failed;s.evidence.failure=failed;this.event(failed?'defeat':'retreat');return true;
    }
    confirmRetention(value){
      const s=this.state;if(s.stage!=='ledger')return false;
      if(value!=='keep-spent')return this.setNotice('看看记录：札记和装备仍在，回气丹没有回来。');
      s.evidence.retention=true;s.stage='track';s.notice='';return true;
    }
    trackQuest(){const s=this.state;if(s.stage!=='track')return false;s.tracked=true;s.stage='track-walk';s.panel=null;s.paused=false;this.event('track','herb');return true;}
    readEntry(id){const s=this.state;if(s.panel!=='almanac')return false;s.bookEntry=id;this.event('read',id);return true;}
    answerBook(value){
      const s=this.state;if(s.stage!=='book'||s.bookEntry!=='retention')return false;
      if(value!=='spent')return this.setNotice('已消耗的符药不退；已经取得的永久物品与进度保留。');
      s.evidence.almanac=true;s.stage='map';s.panel=null;s.paused=false;s.notice='';return true;
    }
    chooseRoute(id){
      const s=this.state;if(s.stage!=='map'||s.panel!=='worldMap')return false;
      if(id!=='ruins')return this.setNotice('远方目的地尚未开放；请选择当前可走的后山山径。');
      s.stage='map-walk';s.panel=null;s.paused=false;s.notice='';this.event('route','后山山径');return true;
    }
    snapshot(){return copy(this.state);}
  }
  function readRecord(storage){try{const record=JSON.parse(storage?.getItem(RECORD_KEY)||'null');return record?.version===1?record:null;}catch{return null;}}
  function defaultStorage(){try{return root.localStorage;}catch{return null;}}
  function hasSeen(storage=defaultStorage()){return readRecord(storage)?.seen===true;}
  function create({host,controls,onStart=()=>{},onComplete=()=>{},onSkip=()=>{},storage=defaultStorage()}={}){
    const doc=root.document;if(!doc)throw Error('演练界面需要浏览器。');
    const bindings=controls?.fork?.()||controls;let session=null,active=false,frameId=0,last=0,lastSignature='',returnFocus=null,inertBefore=[],review=false,lastFrame=null;
    const node=doc.createElement('section');node.className='onboarding-layer';node.hidden=true;node.setAttribute('role','dialog');node.setAttribute('aria-modal','true');node.setAttribute('aria-labelledby','onboarding-title');node.tabIndex=-1;
    node.innerHTML='<div class="onboarding-frame"><header class="onboarding-header"><div><p class="onboarding-eyebrow">山门演武 · 随时可跳</p><h2 id="onboarding-title">入山第一课 · 山门问路</h2></div><button class="primary" data-tutorial-action="skip">跳过教程</button></header><div class="onboarding-layout"><div class="onboarding-world"><canvas width="1280" height="760" tabindex="0" aria-label="入山问路演练地图"></canvas><div class="onboarding-world-status" data-tutorial-readable></div><button class="primary onboarding-interact" data-tutorial-action="interact" hidden></button></div><aside class="onboarding-lesson"><p class="onboarding-progress" data-tutorial-readable></p><h3 data-tutorial-readable></h3><p class="onboarding-story" data-tutorial-readable></p><div class="onboarding-hints"></div><div class="onboarding-commands"></div><p class="onboarding-notice" role="status" aria-live="polite" data-tutorial-readable></p></aside></div><div class="onboarding-panel" hidden></div></div>';
    (host||doc.body).append(node);const canvas=node.querySelector('canvas'),ctx=canvas.getContext('2d'),panel=node.querySelector('.onboarding-panel');
    const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const label=action=>bindings?.label?.(action)||'未绑定';
    const keyHint=(action,name)=>'<span><kbd>'+esc(label(action))+'</kbd> '+name+'</span>';
    function writeRecord(completed){try{storage?.setItem(RECORD_KEY,JSON.stringify({version:1,seen:true,completed:completed||readRecord(storage)?.completed===true}));}catch{}}
    function close(reason='skip'){
      if(!active)return;const snapshot=session.snapshot();active=false;bindings?.clear?.();root.cancelAnimationFrame(frameId);node.hidden=true;
      for(const [element,value]of inertBefore)element.inert=value;inertBefore=[];writeRecord(reason==='complete');
      if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});returnFocus=null;
      (reason==='complete'?onComplete:onSkip)({review,reason,state:snapshot});
    }
    function start(options={}){
      if(active)return;review=options.review===true;returnFocus=doc.activeElement;session=new Session(options);active=true;last=0;lastSignature='';node.hidden=false;bindings?.clear?.();
      inertBefore=[...doc.body.children].filter(element=>element!==node&&!element.contains(node)&&element.tagName!=='SCRIPT').map(element=>[element,element.inert]);for(const [element]of inertBefore)element.inert=true;
      onStart({review});render();node.querySelector('[data-tutorial-action=skip]').focus({preventScroll:true});frameId=root.requestAnimationFrame(frame);
    }
    function button(action,text,extra=''){return '<button class="secondary" data-tutorial-action="'+action+'" '+extra+'>'+text+'</button>';}
    function panelHTML(s){
      if(s.panel==='kit')return '<h3>先选装备，再选功法</h3><p>随身一器一招，入阵试手。</p><div class="onboarding-choices"><section><h4>随身装备</h4>'+button('gear-balanced','演练木剑 · 普攻较快','aria-pressed="'+(s.gear==='balanced')+'"')+button('gear-defensive','演练护具 · 承伤较低','aria-pressed="'+(s.gear==='defensive')+'"')+'</section><section><h4>快捷功法</h4>'+button('skill-sword','回风诀 · 近敌剑气','aria-pressed="'+(s.skill==='sword')+'"')+button('skill-medicine','回春诀 · 恢复气血','aria-pressed="'+(s.skill==='medicine')+'"')+'</section></div>';
      if(s.panel==='tactics')return '<h3>暂停下令 · 双方与计时停止</h3><div class="onboarding-choices"><section><h4>敌情与目标</h4>'+button('target','阵灵 · 气血 '+Math.ceil(s.battle?.hp||0)+' / 110'+(s.target?' · 已选中':''),'aria-pressed="'+s.target+'"')+'<p>在暂停时看清敌情，再决定使用功法或符药。</p></section><section><h4>功法与符药</h4>'+button('potion','回气丹 ×'+s.inventory.potion+' · 恢复本页气血',s.inventory.potion?'':'disabled')+button('cast',s.skill==='medicine'?'施展回春诀':'施展回风诀')+'</section></div><div class="onboarding-buttons">'+button('resume','继续迎敌')+button('retreat','结束本场，撤回安全处',s.stage==='retreat'?'':'disabled')+'</div>';
      if(s.panel==='journal')return '<h3>任务记录</h3><article class="onboarding-task"><p>当前任务 · 尚未办理</p><h4>到药亭读札记</h4><p>地点：药亭札记。追踪后会在实际地点显示方向箭头，仍要走近交互。</p>'+button('track','追踪药亭札记')+'</article>';
      if(s.panel==='almanac')return '<h3>山行闻见录 · 演练摘页</h3><nav class="onboarding-book-index" aria-label="闻见录目录">'+button('read-controls','移动与交互')+button('read-retention','失利与保留')+'</nav><article class="onboarding-book-entry">'+(s.bookEntry==='retention'?'<h4>失利与保留</h4><p>已经取得的装备、图谱、器忆、境界成长、剧情与关系保留。本局临时效果结束；已经消耗的符药不退，未领取的候选不算取得。</p><p>刚才消耗的回气丹，失利后会退回吗？</p>'+button('answer-spent','不会，已经消耗的符药不退')+button('answer-refund','会，所有用过的物品都退回'):s.bookEntry==='controls'?'<h4>移动与交互</h4><p>先沿方向走近人物或物件，再使用交互。追踪标记只是定位，不能代替实际行走和办理。</p>':'<p>请从目录找出“失利与保留”。正式闻见录可随时查询规则与已知世界资料。</p>')+'</article>';
      if(s.panel==='worldMap')return '<h3>世界地图 · 本页认路</h3><p>实线为当前可通山道，虚线为后续远途。</p><div class="onboarding-map"><article aria-current="location"><h4>药庐 · 当前所在</h4><p>你在这张图的安全处。</p></article><span aria-hidden="true">→</span><article><h4>后山旧阵</h4><p>道路已开放：从当前地图东侧后山山径前往。</p>'+button('route-ruins','定位当前可走出口')+'</article><span aria-hidden="true">⋯</span><article class="onboarding-map-locked"><h4>青阳镇 · 尚未开放</h4><p>这是远方去向，正式行程满足条件后开放。</p>'+button('route-locked','查看此去向')+'</article></div>';
      if(s.panel==='leave')return '<h3>演练暂歇</h3><p>演武随时可歇，亦能重开。</p><div class="onboarding-buttons">'+button('resume','继续本页')+button('skip','跳过教程')+'</div>';
      return '';
    }
    function render(){
      if(!active)return;const s=session.state,[title,text]=lessons[s.stage];node.dataset.stage=s.stage;
      node.querySelector('.onboarding-progress').textContent='山门问路 · '+({welcome:'准备',walk:'认路',meet:'问路',kit:'整备',approach:'试阵',command:'下令',resume:'下令',fight:'交战',retry:'调息',spoils:'拾取',loss:'核对',retreat:'撤回',ledger:'保留',track:'追踪','track-walk':'追踪',book:'查阅',map:'认图','map-walk':'寻路',complete:'完成'}[s.stage]);
      node.querySelector('.onboarding-lesson h3').textContent=title;node.querySelector('.onboarding-story').textContent=text;
      node.querySelector('.onboarding-hints').innerHTML=keyHint('moveUp','上')+keyHint('moveLeft','左')+keyHint('moveDown','下')+keyHint('moveRight','右')+keyHint('interact','交互')+keyHint('tactics','暂停下令');
      let commands='';
      if(s.stage==='welcome')commands=button('begin','进入练习图');
      else if(s.stage==='kit')commands=button('open-kit','查看装备与功法');
      else if(['command','resume','fight','retreat'].includes(s.stage))commands=button('open-tactics','暂停下令 · '+esc(label('tactics')));
      else if(s.stage==='retry')commands=button('retry','调息并重试');
      else if(s.stage==='loss')commands=button('second-battle','再开一轮，练习撤回');
      else if(s.stage==='ledger')commands='<div class="onboarding-ledger"><p>随身装备：'+(s.gear==='balanced'?'演练木剑':'演练护具')+'</p><p>已获物：'+esc(s.permanent.join('、'))+'</p><p>回气丹：'+s.inventory.potion+' 枚（已使用 1 枚）</p></div>'+button('retention-correct','已获物保留，已消耗的药不退')+button('retention-wrong','所有用过的药都应退回');
      else if(s.stage==='track')commands=button('open-journal','打开任务记录');
      else if(s.stage==='book')commands=button('open-book','山行闻见录 · '+esc(label('almanac')));
      else if(s.stage==='map')commands=button('open-map','世界地图 · '+esc(label('worldMap')));
      else if(s.stage==='complete')commands='<p>山门演武功成，随时踏上正途。</p>'+button('complete','返回正式开局')+button('restart','再练一次');
      node.querySelector('.onboarding-commands').innerHTML=commands;node.querySelector('.onboarding-notice').textContent=s.notice;node.querySelector('.onboarding-notice').hidden=!!s.panel;
      node.querySelector('.onboarding-world-status').textContent='演练气血 '+Math.ceil(s.hp)+' / 100 · 回气丹 '+s.inventory.potion+' · '+(s.gear?(s.gear==='balanced'?'木剑':'护具'):'尚未整备')+(s.panel?' · 已暂停':'');
      const goal=session.goal(),interact=node.querySelector('.onboarding-interact');interact.hidden=!goal||!session.near(goal)||s.stage==='walk'||!!s.panel;interact.textContent=goal?'交互：'+goal.name+' · '+label('interact'):'';
      panel.hidden=!s.panel;panel.innerHTML=panelHTML(s)+(s.notice?'<p class="onboarding-inline-notice" role="status">'+esc(s.notice)+'</p>':'')+(s.panel&&!['kit','tactics','leave'].includes(s.panel)?'<div class="onboarding-buttons">'+button('resume','收起，继续本页')+'</div>':'');panel.setAttribute('aria-label',s.panel||'演练操作');
      lastSignature=signature();
    }
    function signature(){const s=session.state;return [s.stage,s.panel,s.gear,s.skill,s.target,s.inventory.potion,s.bookEntry,s.notice,Math.ceil(s.hp),s.battle?Math.ceil(s.battle.hp):'',!!session.near(session.goal())].join('|');}
    function action(name){
      if(!active)return;const s=session.state;s.notice='';
      if(name==='skip'){close('skip');return;}if(name==='complete'&&s.stage==='complete'){close('complete');return;}
      if(name==='restart'){session=new Session({gender:s.gender});session.begin();}
      else if(name==='begin')session.begin();else if(name==='interact')session.interact();
      else if(name==='open-kit')session.open('kit');else if(name==='gear-balanced')session.configure('gear','balanced');else if(name==='gear-defensive')session.configure('gear','defensive');
      else if(name==='skill-sword')session.configure('skill','sword');else if(name==='skill-medicine')session.configure('skill','medicine');
      else if(name==='open-tactics')session.open('tactics');else if(name==='target')session.selectTarget();else if(name==='potion')session.usePotion();else if(name==='cast')session.useSkill();else if(name==='resume')session.closePanel();
      else if(name==='retry')session.retry();else if(name==='second-battle')session.secondBattle();else if(name==='retreat')session.endBattle(false);
      else if(name==='retention-correct')session.confirmRetention('keep-spent');else if(name==='retention-wrong')session.confirmRetention('refund');
      else if(name==='open-journal')session.open('journal');else if(name==='track')session.trackQuest();
      else if(name==='open-book')session.open('almanac');else if(name==='read-retention')session.readEntry('retention');else if(name==='read-controls')session.readEntry('controls');else if(name==='answer-spent')session.answerBook('spent');else if(name==='answer-refund')session.answerBook('refund');
      else if(name==='open-map')session.open('worldMap');else if(name==='route-ruins')session.chooseRoute('ruins');else if(name==='route-locked')session.chooseRoute('locked');
      bindings?.clear?.();render();if(!session.state.panel)canvas.focus({preventScroll:true});
    }
    node.addEventListener('click',event=>{const button=event.target.closest('[data-tutorial-action]');if(button&&!button.disabled)action(button.dataset.tutorialAction);});
    function keydown(event){
      if(!active)return;event.stopImmediatePropagation();
      if(event.code==='Tab'){const buttons=[...node.querySelectorAll('button:not([disabled]),canvas')].filter(element=>element.getClientRects().length);if(!buttons.length)return;const index=buttons.indexOf(doc.activeElement);if(event.shiftKey&&index<=0){event.preventDefault();buttons.at(-1).focus();}else if(!event.shiftKey&&index===buttons.length-1){event.preventDefault();buttons[0].focus();}return;}
      if(/INPUT|SELECT|TEXTAREA/.test(event.target.tagName))return;
      const id=bindings?.press?.(event)||bindings?.resolve?.(event);if(!id)return;
      event.preventDefault();if(event.repeat)return;
      if(id==='interact')action('interact');
      else if(id==='tactics'){if(session.state.panel==='tactics')action('resume');else action('open-tactics');}
      else if(id==='pause'){if(session.state.panel)action('resume');else{session.open('leave');render();}}
      else if(id==='almanac')action('open-book');else if(id==='worldMap')action('open-map');else if(['case','campaign','notes'].includes(id))action('open-journal');else if(['bag','gear','loadouts'].includes(id)&&session.state.stage==='kit')action('open-kit');
    }
    function keyup(event){if(active){bindings?.release?.(event);event.stopImmediatePropagation();}}
    doc.addEventListener('keydown',keydown,true);doc.addEventListener('keyup',keyup,true);
    const blur=()=>bindings?.clear?.();root.addEventListener('blur',blur);
    function sprite(atlas,cell,x,y,height,flip=false){
      const A=root.XiuxianArt,image=A?.images?.[atlas],r=A?.[atlas]?.[cell];if(!image?.complete||!r)return;
      const [sx,sy,sw,sh]=r,w=height*sw/sh;ctx.save();ctx.translate(x,y);if(flip)ctx.scale(-1,1);ctx.drawImage(image,sx,sy,sw,sh,-w/2,-height,w,height);ctx.restore();
    }
    function draw(now){
      const s=session.state,A=root.XiuxianArt,rect=canvas.getBoundingClientRect(),unit=Math.max(1,1280/(rect.width||1280)),elements=[];
      ctx.clearRect(0,0,1280,760);if(A?.images?.garden?.complete)ctx.drawImage(A.images.garden,0,0,1280,760);else{ctx.fillStyle='#243e34';ctx.fillRect(0,0,1280,760);}
      ctx.fillStyle='#14251b22';ctx.fillRect(0,0,1280,760);
      function text(id,value,x,y,size=14){ctx.font=size*unit+'px "Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const w=ctx.measureText(value).width+18*unit;ctx.fillStyle='#1b3028ed';ctx.beginPath();ctx.roundRect(x-w/2,y-14*unit,w,28*unit,4*unit);ctx.fill();ctx.fillStyle='#fff1cf';ctx.fillText(value,x,y);elements.push({id,kind:'text',rect:[x-w/2,y-14*unit,w,28*unit],glyphH:size*unit,fg:[255,241,207],bg:[27,48,40],z:10});}
      sprite('characters',8,objects.guide.x,objects.guide.y,104);text('training-guide','引路弟子 · 演练',objects.guide.x,objects.guide.y+30*unit);
      sprite('props',2,objects.practice.x,objects.practice.y,83);text('training-practice','试剑桩',objects.practice.x,objects.practice.y+30*unit);
      if(s.stage==='spoils'){sprite('props',14,objects.spoils.x,objects.spoils.y,42);text('training-spoils','问路札记',objects.spoils.x,objects.spoils.y+30*unit);}
      if(['track-walk','book','map','map-walk'].includes(s.stage)){sprite('props',14,objects.herb.x,objects.herb.y,42);text('training-herb','药亭札记',objects.herb.x,objects.herb.y+25*unit);}
      if(s.stage==='map-walk')text('training-exit','后山山径',objects.exit.x-40*unit,objects.exit.y+30*unit);
      const moving=bindings?.movement?.(),face=session.lastFacing,base=s.gender==='male'?4:0,cell=base+(face.y<-.4?3:moving&&(moving.x||moving.y)?1+Math.floor(now/140)%2:0);sprite('characters',cell,s.x,s.y,104,face.x<0);
      if(s.battle){sprite('characters',9,s.battle.x,s.battle.y,100);text('training-enemy','阵灵 '+Math.ceil(s.battle.hp)+' / '+s.battle.maxHp,s.battle.x,s.battle.y-125*unit);if(s.target){ctx.strokeStyle='#f3dca6';ctx.lineWidth=3*unit;ctx.beginPath();ctx.ellipse(s.battle.x,s.battle.y+4,35*unit,12*unit,0,0,Math.PI*2);ctx.stroke();}}
      const goal=session.goal();let arrow=null;if(goal){
        const reduced=root.document?.documentElement.classList.contains('reduced-motion')||root.matchMedia?.('(prefers-reduced-motion: reduce)').matches,bob=reduced?0:Math.sin(now/320)*3*unit,gx=Math.max(25*unit,Math.min(1280-25*unit,goal.x)),gy=Math.max(28*unit,goal.y-130*unit+bob);
        ctx.fillStyle='#20372f';ctx.strokeStyle='#f2dca6';ctx.lineWidth=2*unit;ctx.beginPath();ctx.arc(gx,gy,14*unit,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff2c8';ctx.textAlign='center';ctx.font='bold '+18*unit+'px sans-serif';ctx.fillText(session.near(goal)?'✓':'!',gx,gy+unit);
        elements.push({id:'training-goal',kind:'indicator',rect:[gx-16*unit,gy-16*unit,32*unit,32*unit],glyphH:18*unit,fg:[255,242,200],bg:[32,55,47],z:11});
        ctx.strokeStyle='#f2dca6';ctx.strokeRect(goal.x-32,goal.y-108,64,112);
        if(!session.near(goal)){const angle=Math.atan2(goal.y-s.y,goal.x-s.x),range=Math.min(55*unit,Math.hypot(goal.x-s.x,goal.y-s.y)*.25),ax=s.x+Math.cos(angle)*range,ay=s.y-35+Math.sin(angle)*range;ctx.save();ctx.translate(ax,ay);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(13*unit,0);ctx.lineTo(-8*unit,-8*unit);ctx.lineTo(-3*unit,0);ctx.lineTo(-8*unit,8*unit);ctx.closePath();ctx.fillStyle='#fff2c8';ctx.strokeStyle='#20372f';ctx.lineWidth=3*unit;ctx.fill();ctx.stroke();ctx.restore();arrow={x:ax,y:ay,angle};}
      }
      if(s.panel){ctx.fillStyle='#15251b88';ctx.fillRect(0,0,1280,760);}
      lastFrame={viewport:{w:1280,h:760},minScale:rect.width/1280,elements,arrow,stage:s.stage};
    }
    function frame(now){if(!active)return;const dt=last?Math.min((now-last)/1000,.04):0;last=now;session.step(dt,bindings?.movement?.()||{});if(signature()!==lastSignature)render();draw(now);frameId=root.requestAnimationFrame(frame);}
    return {start,close:()=>close('skip'),get active(){return active;},get session(){return session;},snapshot:()=>session?.snapshot()||null,frameManifest:()=>lastFrame?copy(lastFrame):null,destroy(){if(active)close('skip');doc.removeEventListener('keydown',keydown,true);doc.removeEventListener('keyup',keyup,true);root.removeEventListener('blur',blur);node.remove();}};
  }
  const api={Session,create,hasSeen,readRecord,RECORD_KEY,lessons,objects};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianOnboarding=api;
})(globalThis);
