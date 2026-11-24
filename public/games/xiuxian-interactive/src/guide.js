(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  let C=node?require('./campaign-data.js'):root.XiuxianCampaignData;
  let S=node?require('./campaign-state.js'):root.XiuxianCampaignState;
  const D=node?require('./data.js'):root.XiuxianData;
  const objectives=new WeakMap(), tracks=new WeakMap(),locations=new WeakMap(),frames=new WeakMap(),readTasks=new WeakMap();let controls=null;
  function ensure(){C=C||root.XiuxianCampaignData;S=S||root.XiuxianCampaignState;}
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  function visualFor(object){
    const portal=object.kind==='portal'||object.role==='portal',sprites={furnace:[0,82],well:[1,66],training:[2,83],stone:[3,92],herb:[4,46],chest:[5,54],cache:[5,45],supply:[5,48],vine:[6,155]},sprite=sprites[object.kind];
    const height=portal?0:Number.isFinite(object.height)?Math.max(0,object.height):sprite?sprite[1]:object.kind==='npc'||object.role==='npc'?94:48;
    const raw=String(object.name||'地标'),short=raw.replace(/^(?:前往|返回|往)(?=.{2,})/u,''),letters=Array.from(short),displayName=letters.length>15?letters.slice(0,8).join('')+'…'+letters.slice(-6).join(''):short;
    return {objectKind:object.kind||null,role:object.role||null,portal,height,displayName,atlas:object.atlas||(sprite?'props':object.kind==='npc'?'characters':null),cell:object.cell??(sprite?sprite[0]:object.kind==='npc'?8:null)};
  }
  function canInteract(g,goal){return !!goal?.id&&g.nearest?.()?.id===goal.id;}
  function recordFrame(g,frame){if(!g)return;if(frame)frames.set(g,frame);else frames.delete(g);}
  function frameFor(g){return frames.get(g)||null;}
  const actionNames={interact:'交互',tactics:'暂停下令',case:'查看案卷',campaign:'查看行程'};
  function setControls(value){controls=value||null;}
  function prompt(action,text=actionNames[action]||'查看'){
    const label=controls?.label?.(action)||'';return label&&!/未绑定/.test(label)?label+' '+text:text;
  }
  function ui(id,text,actionId){return {kind:'ui',ui:id,selector:'#'+id,text,action:actionId?prompt(actionId):'点击对应按钮',control:actionId||null};}
  function objectFor(g,map,id){
    if(map===g.state.map)return g.objects().find(object=>object.id===id)||null;
    const object=(C.maps[map]?.objects||C.entryObjects.filter(object=>object.map===map)).find(object=>object.id===id);
    if(!object||object.visibleRequires&&!S.requirements(g.state.campaign,object.visibleRequires,g.state))return null;
    const personId=object.personId||(C.personBindings||[]).find(binding=>binding.map===map&&binding.objectId===id)?.personId,phase=personId&&S.personStage(g.state.campaign,personId);
    if(phase?phase.state==='dead'||phase.presentation?.hidden===true:object.hidden)return null;
    return phase?.presentation?{...object,...phase.presentation}:object;
  }
  function mapName(map){return C?.maps[map]?.name||D?.maps[map]?.name||map;}
  function exitAvailable(g,exit){
    const state=g.state.campaign,map=C.maps[exit.to.map]||D.maps[exit.to.map];
    return !!map&&!!objectFor(g,exit.map,exit.objectId)&&S.requirements(state,exit.requires,g.state)&&(!C.maps[exit.to.map]||S.requirements(state,C.maps[exit.to.map].requires,g.state))&&S.walkable(map,exit.to.x,exit.to.y);
  }
  // Read the real route requirements and landing geometry without changing player position.
  function campaignRoute(g,targetMap){
    ensure();
    const start=g.state.map;if(start===targetMap)return {available:true,from:start,to:targetMap,steps:[]};
    if(!g.state.campaign?.started||g.state.campaign.battle||g.state.campaign.ending)return {available:false,from:start,to:targetMap,steps:[]};
    const seen=new Set([start]),queue=[{map:start,steps:[]}];
    while(queue.length){const current=queue.shift();for(const exit of Object.values(C.exits).filter(exit=>exit.map===current.map)){
      if(seen.has(exit.to.map)||!exitAvailable(g,exit))continue;
      const steps=[...current.steps,{id:exit.id,map:exit.map,objectId:exit.objectId,to:exit.to.map,label:exit.label||'前往'+mapName(exit.to.map)}];
      if(exit.to.map===targetMap)return {available:true,from:start,to:targetMap,steps};
      seen.add(exit.to.map);queue.push({map:exit.to.map,steps});
    }}
    return {available:false,from:start,to:targetMap,steps:[]};
  }
  // Missing entry means initial automatic guidance; null is an explicit user cancellation.
  // These weak records never enter exportSave or award/consume anything.
  function trackTask(g,id){
    ensure();if(!g)return false;
    objectives.delete(g);
    if(id==null){tracks.set(g,null);locations.delete(g);return true;}
    const task=C.tasks[id],info=task&&g.campaignTaskStatus(task);
    if(!info?.known||!['available','active','ready'].includes(info.status))return false;
    locations.delete(g);tracks.set(g,id);return true;
  }
  function trackedTask(g){return tracks.get(g)||null;}
  function taskNotice(g,id){
    ensure();const task=C.tasks[id],info=g&&task&&g.campaignTaskStatus(task);if(!info?.known)return null;
    const record=g.state.campaign.tasks[id],signature=JSON.stringify([info.status,record?.done,record?.sequence,record?.choice]);
    return {id,title:task.title,status:info.status,signature,unread:readTasks.get(g)?.get(id)!==signature,deliverable:info.status==='ready',tracked:trackedTask(g)===id};
  }
  function markTaskRead(g,id){const notice=taskNotice(g,id);if(!notice)return false;if(!readTasks.has(g))readTasks.set(g,new Map());readTasks.get(g).set(id,notice.signature);return true;}
  function nextTracked(g,id){
    const follows=task=>[...(task.requires?.all||[]),...(task.requires?.any||[])].some(rule=>rule.type==='task'&&rule.id===id&&rule.status==='claimed');
    const next=Object.values(C.tasks).filter(follows).filter(task=>{const info=g.campaignTaskStatus(task);return info.known&&['available','active','ready'].includes(info.status);});
    // Multiple unlocked branches require a real player choice, not an arbitrary automatic decision.
    tracks.set(g,next.length===1?next[0].id:null);return trackedTask(g);
  }
  function trackLocation(g,mapId,objectId,detail={}){
    if(!g||mapId!==g.state.map||!g.objects().some(object=>object.id===objectId))return false;
    objectives.delete(g);tracks.delete(g);locations.set(g,{mapId,objectId,...detail});return true;
  }
  function locationGoal(g){
    const value=locations.get(g);if(!value)return null;if(value.mapId!==g.state.map){locations.delete(g);return null;}
    const object=g.objects().find(object=>object.id===value.objectId);if(!object){locations.delete(g);return null;}
    return {kind:'world',id:object.id,name:object.name,x:object.x,y:object.y,...visualFor(object),text:value.label||'沿标记走近'+object.name,action:prompt('interact'),control:'interact',destination:value.destination||null,manual:true};
  }
  function remoteActionReason(g,action){
    const state=g.state.campaign,task=C.tasks[action.task],record=state.tasks[action.task];
    const start=g.campaignStartReason?.(action.task);if(start)return start;
    const memory=g.campaignMemory?.();if(memory&&memory.taskId!==action.task)return '先离开回忆现场。';
    if(!state.started&&action.kind!=='accept')return '先接下后续行程。';
    let reason=S.actionAvailabilityReason(state,action)||g.campaignRequirementsReason?.(action.requires)||'';
    if(!reason&&action.kind==='accept')reason=g.campaignRequirementsReason?.(task.requires)||'';
    if(!reason&&action.kind==='claim'&&record&&!S.ready(state,action.task))reason='先完成这件事的当前目标。';
    if(!reason)reason=S.persistentReason(state,action,g.state)||'';
    if(!reason&&action.kind==='sequence'&&S.sequence(task)[record?.sequence||0]!==action.id)reason='按已知次序继续。';
    if(!reason)reason=g.campaignInventoryReason?.(action)||'';
    if(!reason&&!objectFor(g,action.map,action.objectId))reason='这处办理人或地标当前不在场。';
    return reason;
  }
  function campaignGoal(g, requestedTask){
    ensure();
    const state=g.state.campaign;
    if(state.ending)return ui('campaign-open','本次行程已经收束，可查看结局与已走过的事。','campaign');
    if(state.battle)return ui('tactics-open','按 V 审看敌情、点选目标、切换功法与符药；就算失利也会保留已得法宝与案卷线索。','tactics');
    let tracked=requestedTask||trackedTask(g);if(!requestedTask&&tracked&&['claimed','complete'].includes(g.campaignTaskStatus(C.tasks[tracked]).status))tracked=nextTracked(g,tracked);
    if(!requestedTask&&tracks.has(g)&&!tracked)return ui('campaign-open','当前未追踪事务；可在山河行程选择要继续的事情。','campaign');
    const tasks=Object.values(C.tasks).map(task=>({task,info:g.campaignTaskStatus(task)})).filter(({task,info})=>info.known&&['ready','active','available'].includes(info.status)&&(!tracked||task.id===tracked));
    const candidates=[];
    for(const {task,info}of tasks)for(const action of Object.values(C.actions).filter(action=>action.task===task.id)){
      if(remoteActionReason(g,action))continue;const route=campaignRoute(g,action.map);if(!route.available)continue;
      const hop=route.steps[0],object=objectFor(g,hop?g.state.map:action.map,hop?hop.objectId:action.objectId);if(!object)continue;
      const rank={ready:0,active:1,available:2}[info.status];candidates.push({task,info,action,route,hop,object,rank});
    }
    candidates.sort((a,b)=>a.rank-b.rank||a.route.steps.length-b.route.steps.length||distance(g.state,a.object)-distance(g.state,b.object));
    const chosen=candidates[0];
    if(!chosen){
      if(tracked){const task=C.tasks[tracked],info=g.campaignTaskStatus(task);return {...ui('campaign-open','追踪「'+task.title+'」：'+(info.reason||'暂无可直接办理的行动；查看当前条件或切换追踪。'),'campaign'),taskId:tracked,blocked:true};}
      return ui('campaign-open','此处暂无可直接办理的事务，查看已知行程中的条件与去向。','campaign');
    }
    const {task,info,action,route,hop,object}=chosen,destination={map:action.map,mapName:mapName(action.map),objectId:action.objectId,name:objectFor(g,action.map,action.objectId)?.name||action.label};
    const actionId=hop?'exit:'+hop.id:action.id;
    const text=hop?'去'+destination.mapName+' · 先走近'+object.name+'，沿已开放道路前往'+mapName(hop.to):action.kind==='choice'?'到'+object.name+'，查看并决定「'+task.title+'」':action.label+' · '+object.name;
    return {kind:'world',id:object.id,name:object.name,x:object.x,y:object.y,...visualFor(object),text,action:prompt('interact',hop?'查看道路':'交互'),control:'interact',taskId:task.id,actionId,selector:'[data-campaign-action="'+actionId+'"]',destination,nextHop:hop||null,route:route.steps,choice:action.kind==='choice',taskTitle:task.title,deliverable:info.status==='ready'&&action.kind==='claim'&&!hop&&canInteract(g,object)};
  }
  function trackObjective(g, target={main:true}){
    if(!g)return false;
    tracks.delete(g);locations.delete(g);objectives.set(g,target);return true;
  }
  function goalFor(g){
    const target=objectives.get(g);
    if(!target)return naturalGoal(g);
    let goal;
    if(target.panel)goal=ui(target.panel,target.label||'打开对应面板，继续当前事务。');
    if(target.map){
      const object=g.state.map===target.map&&g.objects().find(o=>o.id===target.object);
      if(object)goal={kind:'world',id:object.id,name:object.name,x:object.x,y:object.y,...visualFor(object),action:prompt('interact'),text:target.label};
      else if(g.state.map!==target.map){
        const route=root.XiuxianWorldAtlas?.snapshot(g)?.points.find(p=>p.mapId===target.map||p.id===target.map)?.route;
        const hop=g.objects().find(o=>o.id===route?.objectId);
        if(hop)goal={kind:'world',id:hop.id,x:hop.x,y:hop.y,name:hop.name,...visualFor(hop),text:target.label+' · 先走近'+hop.name,action:prompt('interact')};
        else goal=ui('world-map-open',target.label+' · 查看舆图路线');
      }
    }
    goal=goal||naturalGoal(g);
    return goal?{...goal,manual:true}:null;
  }
  function naturalGoal(g,ignoreLocation=false){
    if(!g)return null;const s=g.state,c=s.chapter,t=c.tomb,q=s.story,objects=g.objects();
    const point=(id,text,action=prompt('interact'))=>{const object=objects.find(object=>object.id===id);return object?{kind:'world',id,name:object.name,text,action,control:'interact',x:object.x,y:object.y,...visualFor(object)}:null;};
    if(s.campaign?.ending||s.campaign?.battle)return campaignGoal(g);
    if(s.map==='garden'&&g.sectSummitBattleActive?.())return ui('tactics-open','七宗会武 · 暂停可选定对手、功法和符药。','tactics');
    const located=!ignoreLocation&&locationGoal(g);if(located)return located;
    const gather=(list,text)=>{
      const group=list.slice().sort((a,b)=>distance(s,a)-distance(s,b));
      return group.length?{...point(group[0].id,text),gather:group.map(o=>({...o,...visualFor(o)}))}:null;
    };
    if(s.map==='hehuan'&&s.sectWorld.station.accepted&&!s.sectWorld.station.claimed){
      const station=s.sectWorld.station,ids={stationHerb:'gather-herb',stationWater:'gather-water',stationPaper:'gather-paper'};
      return gather(objects.filter(o=>ids[o.id]&&!station.gathered.includes(ids[o.id])),'收齐药案所需的三份物料')||point(station.prepared?'yunStation':'stationBench',station.prepared?'交回配好的药':'按方配药');
    }
    if(s.run){const r=s.run;if(r.phase!=='active')return ui('journey-open','选择下一段路线、法宝或灵契');if(r.room==='herb')return gather(objects.filter(object=>object.kind==='moonHerb'),'采集月露草，也可以绕过阵灵')||{text:g.objective()[0]};if(r.room==='seal')return point('seal'+r.sealStep,'按木、火、土的顺序接通灵脉')||{text:g.objective().join(' · ')};return ui('tactics-open','迎敌时自主出剑；暂停选择目标、功法与符药。','tactics');}
    if(g.inCampaign?.()||s.map==='garden'&&(s.campaign?.started||c.complete))return campaignGoal(g);
    const b=s.background,newRoute=b&&!b.legacy&&b.id!=='rain';
    if(g.isChild()){const a=c.survival;return !a.wood?point('drywood','收好檐下干柴'):!a.flint?point('flint','取火石与引火绒'):!a.fire?point('hearth','把干柴点起来，先取暖'):!a.lock?point('locket','检查长命锁'):!a.bread?point('xuanheng','听听灰袍老人的话'):point('leaveTemple',newRoute?(b.openingChoice?'与玄衡告别，前往选定的去处':'走近离庙处，选择此后的去向'):'随玄衡走出破庙');}
    if(c.training)return ui('tactics-open','守势接招 '+c.blocks+'/2 · 迎敌收势 '+c.swordHits+'/3；接完两招再换迎敌。','tactics');
    if(newRoute&&!b.openingChoice&&s.map==='garden')return point('qingwei','到清微处交代来历，选定随身凭物');
    if(!s.flags.complete){if(!s.flags.accepted)return point('sister','先与沈灵薇交谈');if(s.inventory.box)return point(s.map==='garden'?'sister':'toGarden','把药匣带回药庐');if(g.relaxed&&g.taskRecipe){
      const cost=D.recipes[g.taskRecipe].cost;
      if(s.inventory.herb<cost.herb){const herbs=gather(objects.filter(o=>o.kind==='herb'),'采青灵草，为师姐开一炉回气丹');if(herbs)return herbs;}
      if(s.inventory.herb>=cost.herb)return s.inventory.water<cost.water?point('well','到石井汲一份山泉水'):point('furnace','打开丹炉，炼一炉回气丹');
    }if(s.map==='garden')return point('toRuins','准备妥当后，从东侧前往后山');return s.vineHp>0?point(g.learned('scholar')?'inscription':'vine','观察藤障，试试剑、火符或旧阵碑文','瞄准出剑 / 使用道具'):point('chest','引开或击散守卫，再取药匣');}
    if(s.map==='garden'&&c.rank<4)return !c.quests.length?point('practiceBoard','完成本经历的历练，取得修行心得'):point('cultivate','到蒲团运气，巩固境界');
    if(s.map==='garden'){if(t.sealed&&!c.complete)return point('qingwei','向清微呈交血符与手札');if(c.complete)return {text:'首章已收束。可继续寻宝、研习其他功法或整理信物'};return ui('case-open',q.stage==='unstarted'?'筑基已成，阅读青阳来信':'返回青阳，继续未结的案子','case');}
    if(s.map==='wangyard')return !q.opened?point('yardGate','轻步绕开枯枝，观察门闩'):!q.evidence.includes('soil')?point('soil','查验柴棚边的新土'):!q.evidence.includes('mark')?point('swordMark','在边梁留下复查的剑记','朝边梁轻出一剑'):point('yardExit','退出王宅，循北去的白影');
    if(s.map==='qingyang'){
      if(t.rescued)return !t.sealed?point('sealRecords','在镇民见证下封存物证'):point('townReturn','回山向清微呈证');
      if(q.stage==='forest')return point('toTomb','北去汉墓林，追查白影');
      if(!['bed','latch','paper'].every(x=>q.evidence.includes(x)))return point('liHome','查验李家床铺、门闩与符样');
      if(!q.visits.includes('zhang'))return point('zhangHome','听听张家的说法');if(!q.visits.includes('granny'))return point('granny','听张阿婆说说宝儿');
      if(!g.readyForNight())return ui('case-open','将案卷中的现场线索与口供交叉验证','case');return point('nightLane','从后巷进入王宅夜探');
    }
    if(s.map==='forest'){if(t.stage==='escort')return point('forestReturn','沿西侧山径送孩子们回青阳');if(!t.clues.includes('footprints'))return point('footprints','辨认石人前的脚印');if(!t.clues.includes('burntPaper'))return point('burntPaper','查验半张残符');return t.rubble>0?point('rubble','清开墓门落石',prompt('interact','查看解法，或瞄准落石出剑')):point('forestEnter','走进墓道');}
    if(s.map==='crypt'){
      if(t.stage==='escort'){if(!t.bridge)return point(s.x<640?'bridgeControl':'bridgeFar','先为孩子们铺好绳桥');if(!t.vent)return point('ventControl','打开风道，让孩子安全经过');if(!t.arrows)return point('arrowControl','停住弩机');return point('cryptReturn','带孩子们返回墓林');}
      if(!t.passed.includes('arrows'))return point('arrowControl','弩机可卡停或转轴，也可看准时机通过');
      if(!t.passed.includes('bridge'))return point(s.x<640?'bridgeControl':'bridgeFar','可铺桥，或靠近边缘横向闪避跃过');
      if(!t.passed.includes('smoke'))return point('ventControl','打开风道，或服清心散穿烟');if(!t.clues.includes('mural'))return point('mural','留意壁画末尾的半招');if(!t.clues.includes('coffin'))return point('coffin','查看主棺遗物');return point('sanctumDoor','循童谣声推开耳室暗门');
    }
    if(s.map==='tomb'){
      if(t.stage==='battle')return ui('tactics-open','观敌后下令：护身符抵御重击，聚阴可寒针打断；守势可持续格挡。','tactics');
      if(t.stage==='farewell')return point('ning',t.bossReward?'听凝霜的托付':'收好战利品，再看凝霜');if(t.stage==='escort')return point('tombExit','护送四个孩子离开石室');if(!t.heard)return point('ning','先听白衣女子解释');
      const child=[0,1,2,3].find(x=>!t.children.includes(x));return child!==undefined?point('child'+child,'照看孩子 '+t.children.length+'/4'):point('summonWang','守住孩子们身前这一步');
    }
    return {text:g.objective()[0]};
  }
  function createOverlay({canvas,game,options={},controls:bindings,document:doc=root.document}={}){
    if(bindings)setControls(bindings);if(!doc||!canvas)return {tick(){},destroy(){},snapshot(){return null;}};
    const layer=doc.createElement('div');layer.className='guidance-overlay';layer.hidden=true;layer.setAttribute('aria-hidden','true');layer.innerHTML='<div class="guidance-focus"></div><div class="guidance-pointer"><span class="guidance-pointer-arrow">➤</span><span class="guidance-pointer-label"></span></div>';doc.body.append(layer);
    const focus=layer.querySelector('.guidance-focus'),pointer=layer.querySelector('.guidance-pointer'),arrow=layer.querySelector('.guidance-pointer-arrow'),label=layer.querySelector('.guidance-pointer-label');let last=null;
    const clamp=(n,min,max)=>Math.max(min,Math.min(Math.max(min,max),n));
    function rectOf(r){return {x:r.left,y:r.top,w:r.width,h:r.height};}
    function hide(){layer.hidden=true;last=null;}
    function tick({paused=false,mode=null,goal,now=0}={}){
      const g=typeof game==='function'?game():game;if(options.guide===false||!g||doc.hidden){hide();return;}
      if(doc.querySelector('dialog[open]')||doc.querySelector('.onboarding-layer:not([hidden])')){hide();return;}
      if(goal===undefined)goal=goalFor(g);if(!goal){hide();return;}
      const modal=doc.getElementById('modal-layer'),modalOpen=modal&&!modal.hidden;
      let target=null;if(goal.selector)try{target=doc.querySelector(goal.selector);}catch{}
      if((!target||target.disabled)&&goal.ui)target=doc.getElementById(goal.ui);
      if(target&&(target.disabled||target.closest('[hidden]')||!target.getClientRects().length))target=null;
      if(modalOpen&&(!target||!modal.contains(target))||paused&&!modalOpen){hide();return;}
      const vw=root.innerWidth||doc.documentElement.clientWidth,vh=root.innerHeight||doc.documentElement.clientHeight;
      if(target){
        const r=target.getBoundingClientRect(),x=clamp(r.left-4,6,vw-12),y=clamp(r.top-4,6,vh-12),w=Math.max(0,Math.min(r.right+4,vw-6)-x),h=Math.max(0,Math.min(r.bottom+4,vh-6)-y);
        if(w<4||h<4){hide();return;}layer.hidden=false;focus.hidden=false;pointer.hidden=true;
        Object.assign(focus.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});last={kind:'dom',id:target.id||goal.actionId,rect:rectOf(r)};return;
      }
      if(modalOpen||!Number.isFinite(goal.x)){hide();return;}
      const r=canvas.getBoundingClientRect();if(r.width<1||r.height<1){hide();return;}
      const rendered=frameFor(g),marker=rendered?.goalId===goal.id?rendered.marker:{x:goal.x,y:goal.y-(goal.height??0)-12};
      const anchor={x:r.left+marker.x*r.width/1280,y:r.top+marker.y*r.height/760};
      const visible={left:Math.max(14,r.left+14),right:Math.min(vw-14,r.right-14),top:Math.max(14,r.top+18),bottom:Math.min(vh-14,r.bottom-18)};
      if(visible.right<=visible.left||visible.bottom<=visible.top){hide();return;}
      const inside=anchor.x>=visible.left&&anchor.x<=visible.right&&anchor.y>=visible.top&&anchor.y<=visible.bottom;
      const top=inside?doc.elementFromPoint(anchor.x,anchor.y):null,occluded=inside&&top!==canvas&&!layer.contains(top);
      if(inside&&!occluded){hide();return;}
      let x=clamp(anchor.x,visible.left+14,visible.right-14),y=clamp(anchor.y,visible.top+14,visible.bottom-14);
      if(occluded)y=visible.top+22;
      layer.hidden=false;focus.hidden=true;pointer.hidden=false;label.textContent=(goal.nextHop?'出口：':'目标：')+(goal.name||'下一步');
      Object.assign(pointer.style,{left:x+'px',top:y+'px',maxWidth:Math.min(250,vw-28)+'px'});
      const bubble=pointer.getBoundingClientRect(),fitX=visible.right-visible.left>=bubble.width,fitY=visible.bottom-visible.top>=bubble.height;x=clamp(x,fitX?visible.left+bubble.width/2:bubble.width/2+8,fitX?visible.right-bubble.width/2:vw-bubble.width/2-8);y=clamp(y,fitY?visible.top+bubble.height/2:bubble.height/2+8,fitY?visible.bottom-bubble.height/2:vh-bubble.height/2-8);pointer.style.left=x+'px';pointer.style.top=y+'px';
      arrow.style.transform='rotate('+Math.atan2(anchor.y-y,anchor.x-x)+'rad)';
      pointer.classList.toggle('guidance-reduced',options.reducedMotion===true||root.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
      last={kind:'edge',name:goal.name,anchor,x,y,occluded,now};
    }
    return {tick,destroy(){layer.remove();last=null;},snapshot(){return last?JSON.parse(JSON.stringify(last)):null;}};
  }
  function category(o){
    if(o.portal||o.role==='portal')return {verb:'前往',icon:'➜',color:'#316b81'};
    if(o.gather||['herb','moonHerb'].includes(o.objectKind)||o.role==='pickup'||o.id==='drywood')return {verb:'采集',icon:'❧',color:'#32775a'};
    if(o.id==='cultivate')return {verb:'打坐运气',icon:'❀',color:'#805c28'};
    if(o.objectKind==='furnace'||o.id==='stationBench')return {verb:o.id==='stationBench'?'配药':'炼丹',icon:'火',color:'#924e23'};
    if(o.objectKind==='npc'||o.role==='npc'||['sister','qingwei','ning','xuanheng','granny','zhangHome','liHome'].includes(o.id))return {verb:o.deliverable?'交付':'交谈',icon:'卷',color:'#776034'};
    return {verb:o.objectKind==='chest'?'拾取':'查验',icon:'✦',color:'#555f68'};
  }
  function hitObject(game,p,frame){
    const objects=game.objects(),rect=frame?.marker?.rect;
    if(rect&&p.x>=rect[0]&&p.x<=rect[0]+rect[2]&&p.y>=rect[1]&&p.y<=rect[1]+rect[3])return objects.find(o=>o.id===frame.goalId);
    for(const badge of frame?.badges||[])if(distance(p,badge)<=badge.r)return objects.find(o=>o.id===badge.id);
    const nameplate=frame?.obstacles.find(({id,rect:[x,y,w,h]})=>id.startsWith('map-label:')&&p.x>=x&&p.y>=y&&p.x<=x+w&&p.y<=y+h);
    if(nameplate){const matching=objects.filter(o=>o.name===nameplate.id.slice(10)).sort((a,b)=>distance(p,a)-distance(p,b));if(matching.length)return matching[0];}
    const targets=objects.map(o=>({o,v:visualFor(o)}));
    return targets.filter(({o,v})=>Math.abs(p.x-o.x)<(v.portal?38:Math.max(24,Math.min(48,v.height*.45)))&&p.y>=o.y-Math.max(28,v.height)&&p.y<=o.y+14)
      .sort((a,b)=>distance(p,{x:a.o.x,y:a.o.y-a.v.height*.45})-distance(p,{x:b.o.x,y:b.o.y-b.v.height*.45}))[0]?.o;
  }
  // Resolve an approach point where E will select this specific object, even in a crowded courtyard.
  function walkingRoute(g,target,object){
    const start=g.state,objects=object?g.objects():[],step=24;
    const clear=(a,b)=>{
      const n=Math.ceil(distance(a,b)/8);
      for(let i=1;i<=n;i++)if(g.collides(a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false;
      return true;
    };
    const arrived=p=>object?distance(p,target)<82&&objects.every(o=>o.id===object.id||distance(p,o)>distance(p,target)+12):distance(p,target)<step;
    if(!g.collides(target.x,target.y)&&clear(start,target))return [{x:target.x,y:target.y}];
    const frontier=[{x:start.x,y:start.y,cost:0,score:0}],costs=new Map([[start.x+','+start.y,0]]),visited=new Set();
    const directions=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
    while(frontier.length){
      frontier.sort((a,b)=>b.score-a.score);const p=frontier.pop(),key=p.x+','+p.y;
      if(visited.has(key))continue;visited.add(key);
      if(arrived(p)){
        const route=[];for(let node=p;node.parent;node=node.parent)route.unshift({x:node.x,y:node.y});
        if(!object&&clear(p,target))route.push(target);
        return route;
      }
      for(const [dx,dy] of directions){
        const x=p.x+dx*step,y=p.y+dy*step,key=x+','+y,cost=p.cost+Math.hypot(dx,dy)*step;
        if(cost>=(costs.get(key)??Infinity)||!clear(p,{x,y}))continue;
        costs.set(key,cost);frontier.push({x,y,cost,score:cost+distance({x,y},target),parent:p});
      }
    }
    return null;
  }
  const api={category,hitObject,walkingRoute,goalFor,mainGoal:g=>naturalGoal(g,true),campaignGoal,campaignRoute,trackTask,trackedTask,taskNotice,markTaskRead,trackLocation,trackObjective,setControls,prompt,createOverlay,visualFor,canInteract,recordFrame,frameFor};
  if(node)module.exports=api;else root.XiuxianGuide=api;
})(globalThis);
