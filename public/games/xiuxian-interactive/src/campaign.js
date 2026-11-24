(function(root){
'use strict';
const node=typeof module==='object'&&module.exports;
const D=node?require('./campaign-data.js'):root.XiuxianCampaignData,S=node?require('./campaign-state.js'):root.XiuxianCampaignState;
const Items=node?require('./data.js'):root.XiuxianData;
for(const [id,map]of Object.entries(D.maps)){if(Items.maps[id]&&JSON.stringify(Items.maps[id])!==JSON.stringify(map))throw Error('续章地图编号冲突：'+id);Items.maps[id]=map;}
const Base=node?require('./sect-world.js'):root.XiuxianEngine;
S.checkDefinitions(Items.items);
const copy=S.copy,owns=(object,key)=>Object.hasOwn(object,key),isCampaignMap=map=>owns(D.maps,map);
const campaignHealingBases=Object.freeze({zhuji:30,jindan:34,yuanying:38,huashen:42,heti:46,dacheng:50});
const blocking=['dialogue','chapter','story','expedition','expeditionEnd','complete','defeat','sectWorld','campaign','campaignEnding'];
const enemyIds=new Set(Object.values(D.encounters).flatMap(def=>def.enemies.map(enemy=>enemy.id)));
const objectsAt=map=>isCampaignMap(map)?D.maps[map].objects:D.entryObjects.filter(object=>object.map===map);
const taskTitle=id=>D.tasks[id].title||D.tasks[id].name||id;
const itemTitle=(kind,id)=>kind==='items'?Items.items[id].name:D.supplies[id].title;
function validateSave(value){
  const map=value?.map,projected=isCampaignMap(map);
  if(projected&&value.version!==4)throw Error('旧版存档不能直接位于续章地图。');
  const state=Base.validateSave(projected?{...value,map:'garden'}:value);state.map=map;
  if(value.campaign===undefined){if(projected)throw Error('续章地图缺少行程记录。');state.campaign=S.fresh();}
  else state.campaign=S.validate(value.campaign,state);
  return state;
}
function enemyFrom(def,record=null){const position=record||def;return {...copy(def),...(def.armor?{armorLeft:record?record.armorLeft:def.armor.maxArmor}:{}),hp:record?record.hp:def.maxHp,x:position.x,y:position.y,slow:0,burn:0,wind:0,cooldown:1,targetX:position.x,targetY:position.y};}
class Game extends Base.Game{
  constructor(options={}){
    const saved=options.save?validateSave(options.save):null;
    super(saved?{...options,save:{...saved,map:isCampaignMap(saved.map)?'garden':saved.map}}:options);
    if(saved)Object.assign(this.state,{map:saved.map,x:saved.x,y:saved.y});
    this.state.campaign=saved?copy(saved.campaign):S.fresh();
    if(this.state.campaign.battle){const battle=this.state.campaign.battle;const def=S.battleDefinition(battle);battle.enemies=battle.enemies.map((enemy,i)=>enemyFrom(def.enemies[i],enemy));}
    this.campaignDropSuppression=0;
    if(!this.canUseSpiritualPower()){this.resetTransient();this.restoreSpirit(0);}
  }
  sectAge(){return this.state?.campaign?S.age(this.state.campaign,this.state):super.sectAge();}
  sectStatus(){const status=super.sectStatus();status.partner.age=Base.sects.partner.age+Math.max(0,this.sectAge()-23);return status;}
  sectWorldPerson(id){const person=Base.sectWorld.people[id];return person?{...copy(person),age:person.age+Math.max(0,this.sectAge()-23)}:null;}
  canUseSpiritualPower(){return !this.state?.campaign||S.bodyMode(this.state.campaign)==='cultivator';}
  checkpoint(){if(!this.canUseSpiritualPower()){this.restoreSpirit(0);this.ward=0;this.lure=null;}return super.checkpoint();}
  breathe(index){const early=this.state.campaign?.tasks['admission-overdraw'];if(early&&!early.claimed){this.message('先定下是否收回强引灵气之念，再继续日常吐纳。');return false;}return super.breathe(index);}
  startRun(seed,seek=null){const early=this.state.campaign?.tasks['admission-overdraw'];if(early&&!early.claimed)return false;return super.startRun(seed,seek);}
  campaignMemory(){const visit=S.memoryVisit(this.state.campaign,this.state.map);return visit?{title:visit.title,map:visit.map,taskId:visit.task}:null;}
  inCampaign(){return isCampaignMap(this.state.map);}
  campaignBusy(){return this.events.some(event=>blocking.includes(event.type));}
  campaignStartReason(taskId=null){
    if(this.state.campaign?.ending)return '本次行程已抵达终局；可查看或恢复此前存档。';
    const early=taskId&&D.tasks[taskId]?.phase==='admission';
    if(early){if(!S.admissionEligible(this.state))return '入门试炼已成、尚未运气筑基之时，方可审视这一险途抉择。';}
    else{if(!this.state.chapter.complete)return '先完成首章呈证，再接后续行程。';if(this.isChild()||this.state.chapter.rank!==4)return '成年筑基后，才可接下这一程。';}
    if(this.state.hp<=0||this.state.run||this.state.chapter.training||this.state.chapter.tomb.stage==='battle'||this.state.sectWorld.escort.phase==='battle')return '先结束当前试炼或战斗。';
    if(this.campaignBusy())return '先处理当前对话或结算。';return '';
  }
  campaignNear(map,id){const object=this.state.map===map?this.objects().find(object=>object.id===id):null;return !!object&&Base.distance(this.state,object)<93;}
  objects(){
    const base=this.inCampaign()?D.maps[this.state.map].objects:super.objects(),list=this.inCampaign()?base:[...base,...D.entryObjects.filter(object=>object.map===this.state.map&&!base.some(old=>old.id===object.id))];
    if(!this.state.campaign)return list;
    const memory=this.campaignMemory();
    return list.filter(object=>!object.visibleRequires||S.requirements(this.state.campaign,object.visibleRequires,this.state)).filter(object=>object.memoryTask?memory?.taskId===object.memoryTask:!(memory&&(object.role==='npc'||object.personId||(D.personBindings||[]).some(binding=>binding.map===this.state.map&&binding.objectId===object.id)))).map(object=>{const personId=object.personId||(D.personBindings||[]).find(binding=>binding.map===this.state.map&&binding.objectId===object.id)?.personId,phase=personId&&S.personStage(this.state.campaign,personId),ageView=personId&&this.campaignPersonAgePresentation(personId);return phase||ageView?{...object,...phase?.presentation,...ageView?.presentation,personId,...(phase?.presentation||ageView?.presentation?{campaignPresentation:true,role:'npc'}:{}),hidden:phase?phase.state==='dead'||phase.presentation?.hidden===true:object.hidden===true}:object;}).filter(object=>!object.hidden);
  }
  interact(){if(this.state.campaign?.ending)return false;const object=this.nearest(),map=this.state.map;const bound=object&&(D.entryObjects.some(o=>o.map===map&&o.id===object.id)||Object.values(D.actions).some(a=>a.map===map&&a.objectId===object.id)||Object.values(D.exits).some(e=>e.map===map&&e.objectId===object.id));if(object&&(this.inCampaign()||bound&&(this.state.chapter.complete||object.kind==='campaignObject'))){if(this.state.hp<=0)return false;this.events.push({type:'campaign',panel:object.id});return true;}return super.interact();}
  campaignRequirementText(rule){
    if(rule.type==='legacy')return rule.id==='chapterComplete'?'完成首章回山呈证':'成年并筑基';
    if(rule.type==='partner')return rule.id==='none'?'尚无具名道侣结契':'与'+D.people[D.partners[rule.id].personId].name+'明确结契';
    if(rule.type==='gender')return rule.id==='female'?'女性主角':'男性主角';
    if(rule.type==='body')return {mortal:'已明确散功归凡',sealed:'已明确封存修为',cultivator:'仍能运转灵力'}[rule.id];
    if(rule.type==='ageBand')return rule.id==='earlyAdult'?'当前为18至40岁的成年阶段':'当前已过40岁，按晚年经历安排后续';
    if(rule.type==='personAge')return D.people[rule.id].name+'本人当前'+(rule.min!==undefined&&rule.max!==undefined?rule.min+'至'+rule.max+'岁':rule.min!==undefined?rule.min+'岁以上':'不超过'+rule.max+'岁');
    if(rule.type==='choiceUnset')return '尚未在「'+taskTitle(rule.task)+'」选定年段';
    if(rule.type==='personUnavailable')return D.people[rule.id].name+'已有实际离世或离场记录，由今日接办者办理';
    if(rule.type==='pendingVow')return '仍有与'+D.people[D.partners[rule.id].personId].name+'未交付且未归档的结契意愿';
    if(rule.type==='sectContract')return {honor:'药站原约已守约交割',pressure:'药站原约已有威压交割记录',unsettled:'药站原约尚未结算'}[rule.id];
    if(rule.type==='currentRealm')return '当前仍处于'+(rule.id==='zhuji'?'筑基':D.realms[rule.id].name.replace(/初期$/,''))+'，越境后旧课只保留记录';
    if(rule.type==='realm')return '完成'+D.realms[rule.id].name+'突破';
    if(rule.type==='legacyToken')return '持有首章的'+({locket:'长命锁',foxHairpin:'凝霜狐簪'}[rule.id]||'实际信物');
    if(rule.type==='backgroundMission'){const background=Base.backgrounds.backgrounds[rule.id],choice=background?.mission.choices.find(choice=>choice.id===rule.choice);return '完成「'+(background?.name||rule.id)+'」身世委托'+(choice?'并选择「'+(choice.label||choice.title||choice.id)+'」':'');}
    if(rule.type==='originTraining')return '完成「'+Items.origins[rule.id].name+'」本门修习';
    if(rule.type==='task')return (rule.status==='claimed'?'完成并交付':'完成全部目标：')+'「'+taskTitle(rule.id)+'」';
    if(rule.type==='token'||rule.type==='evidence')return '取得「'+D[rule.type==='token'?'tokens':'evidence'][rule.id].title+'」';
    const actions=Object.values(D.actions).filter(a=>a.task===rule.task&&(rule.type==='done'?a.marks?.includes(rule.id):a.choice===rule.id));
    const action=actions.find(a=>!(a.requires?.all||[]).some(condition=>condition.type==='choice'&&!S.condition(this.state.campaign,condition,this.state)))||actions[0];return action?.label||taskTitle(rule.task);
  }
  campaignRequirementsReason(requires={}){
    const state=this.state.campaign,missing=(requires.all||[]).filter(rule=>!S.condition(state,rule,this.state)).map(rule=>this.campaignRequirementText(rule));
    if((requires.any||[]).length&&!requires.any.some(rule=>S.condition(state,rule,this.state)))missing.push('任选其一：'+requires.any.map(rule=>this.campaignRequirementText(rule)).join(' / '));
    return missing.length?'还需：'+missing.join('；')+'。':'';
  }
  campaignTravelReason(id){
    if(typeof id!=='string'||!owns(D.exits,id))return '没有这条续章道路。';const exit=D.exits[id];
    const reason=this.campaignStartReason();if(reason)return reason;
    if(this.state.campaign.battle)return '交战尚未结束；需要离开时请明确撤退。';
    if(!this.campaignNear(exit.map,exit.objectId))return '先走近这条道路的实际出口。';
    const gate=this.campaignRequirementsReason(exit.requires);if(gate)return gate;
    if(isCampaignMap(exit.to.map)){const gate=this.campaignRequirementsReason(D.maps[exit.to.map].requires);if(gate)return gate;}
    const map=Items.maps[exit.to.map];if(!map||!S.walkable(map,exit.to.x,exit.to.y))return '道路落点暂不可用。';return '';
  }
  campaignTravel(id){
    const reason=this.campaignTravelReason(id);if(reason){this.message(reason);return false;}
    const exit=D.exits[id];this.state.campaign.started=true;
    super.travel(exit.to.map,exit.to.x,exit.to.y);this.events.push({type:'map'});this.message('来到'+Items.maps[exit.to.map].name+'。');return true;
  }
  travel(map,x,y){
    if(this.state.campaign?.ending)return false;
    if(this.state.campaign?.battle&&map!==this.state.map){this.message('当前战斗尚未结束，请先明确撤退。');return false;}
    if(isCampaignMap(map)&&(!this.state.campaign?.started||!S.requirements(this.state.campaign,D.maps[map].requires,this.state)||!S.walkable(D.maps[map],x,y)))return false;
    return super.travel(map,x,y);
  }
  campaignInventoryReason(action){
    for(const [id,amount]of Object.entries(action.cost?.items||{}))if(this.state.inventory[id]<amount)return Items.items[id].name+'不足。';
    for(const [id,amount]of Object.entries(action.grant?.items||{}))if(this.state.inventory[id]-(action.cost?.items?.[id]||0)+amount>999)return Items.items[id].name+'将超过行囊上限，先腾出位置。';
    return S.supplyReason(this.state.campaign,action);
  }
  campaignRestReason(id){
    const site=D.restSites?.[id];if(!site)return '没有这处整备地点。';
    const reason=this.campaignStartReason();if(reason)return reason;
    if(this.state.campaign.battle||this.activeEnemies().some(enemy=>enemy.hp>0))return '先结束当前交战，再到安全处调息。';
    if(this.campaignMemory())return '先离开回忆现场，再安排现实休整。';
    const required=this.campaignRequirementsReason(site.requires);if(required)return required;
    if(!this.campaignNear(site.map,site.objectId))return '请走近'+site.title+'的实际整备处。';
    if(this.state.hp>=100&&(!this.canUseSpiritualPower()||this.state.mp>=100))return '当前气血与可用灵力已充足。';
    return '';
  }

  campaignActionReason(id){
    if(D.restSites&&owns(D.restSites,id))return this.campaignRestReason(id);
    if(id==='retreat-battle')return this.state.campaign.battle?'':'当前没有可撤退的续章战斗。';
    if(typeof id!=='string'||!owns(D.actions,id))return '没有这项行程行动。';
    const action=D.actions[id],reason=this.campaignStartReason(D.actions[id].task);if(reason)return reason;
    const memory=this.campaignMemory();if(memory&&action.task!==memory.taskId)return '正身处旧世回忆；请先离开回忆现场，再办现世事务。';
    if(!this.state.campaign.started&&action.kind!=='accept')return '先接下后续行程，再沿地图道路启程。';
    if(this.state.campaign.battle)return '先结束当前战斗或明确撤退。';
    const availability=S.actionAvailabilityReason(this.state.campaign,action);if(availability)return availability;
    const required=this.campaignRequirementsReason(action.requires)||(action.kind==='accept'?this.campaignRequirementsReason(D.tasks[action.task].requires):'');if(required)return required;
    if(action.kind==='claim'&&this.state.campaign.tasks[action.task]&&!S.ready(this.state.campaign,action.task)){const task=D.tasks[action.task],record=this.state.campaign.tasks[action.task],missing=S.requiredObjectiveIds(task).filter(id=>!record.done.includes(id)).map(id=>this.campaignRequirementText({type:'done',task:task.id,id}));return '尚待完成：'+missing.join('；')+'。';}
    const persistent=S.persistentReason(this.state.campaign,action,this.state);if(persistent)return persistent;
    if(!this.campaignNear(action.map,action.objectId))return '请走近'+(objectsAt(action.map).find(object=>object.id===action.objectId)?.name||'对应物件')+'。';
    if(action.kind==='sequence'&&S.sequence(D.tasks[action.task])[this.state.campaign.tasks[action.task].sequence]!==id)return '';
    return this.campaignInventoryReason(action);
  }
  campaignAction(id){
    const reason=this.campaignActionReason(id);if(reason){this.message(reason);return false;}
    if(id==='retreat-battle'){this.endCampaignBattle(false);return true;}
    if(D.restSites&&owns(D.restSites,id)){const before={hp:this.state.hp,mp:this.state.mp};this.state.hp=100;this.restoreSpirit(100);this.events.push({type:'campaignRest',id,before,after:{hp:this.state.hp,mp:this.state.mp}});this.message(D.restSites[id].title+'完成；符药、任务物与已获进度保持。');this.checkpoint();return true;}
    const action=D.actions[id];
    if(action.kind==='battle'){
      const encounter=D.encounters[action.encounter];this.state.campaign.battle={id:encounter.id,action:id,enemies:encounter.enemies.map(enemy=>enemyFrom(enemy))};
      this.resetTransient();this.message(encounter.detail||encounter.title||'迎敌时可按 V 暂停下令。');this.checkpoint();return true;
    }
    const next=copy(this.state.campaign);next.started=true;const result=S.applyRecord(next,action);
    if(result.wrongSequence){this.state.campaign=next;this.message(D.tasks[action.task].sequenceHint||'次序有差，已退回第一步重来；随身任务物并未消耗。');this.checkpoint();return true;}
    const inventory={...this.state.inventory};for(const [item,amount]of Object.entries(action.cost?.items||{}))inventory[item]-=amount;for(const [item,amount]of Object.entries(action.grant?.items||{}))inventory[item]+=amount;
    this.state.inventory=inventory;const wasSpiritual=this.canUseSpiritualPower();this.state.campaign=next;if(wasSpiritual&&!this.canUseSpiritualPower()){this.resetTransient();this.restoreSpirit(0);}if(next.ending){this.resetTransient();this.events.push({type:'campaignEnding',ending:next.ending});}this.message(action.result||action.label+'已记入行程。');this.checkpoint();return true;
  }
  campaignEvidence(id){if(!this.state.campaign.evidence.includes(id))return null;const def=D.evidence[id];return {id,name:def.title||def.name,description:def.description||def.text||'',source:def.sourceText||taskTitle(def.source.task)};}
  profile(){const profile=super.profile(),era=this.state.campaign?this.campaignEra():null;return [era?.ageText||profile[0],this.combatProfile().name||profile[1]];}
  combatProfile(){
    const base=super.combatProfile();if(!this.state.campaign)return base;
    const id=this.state.campaign.cultivation.realmId,realm=id&&D.realms?.[id],stage=S.cultivationStage(this.state.campaign,this.state);
    if(!this.canUseSpiritualPower())return {...base,blade:0,spell:0,defence:0,regen:0,regenTotal:0,healing:0,stageId:null,stageName:'',historyStageName:stage?.name||'',realmId:null,realmName:S.bodyMode(this.state.campaign)==='sealed'?'封功':'凡人',name:S.bodyMode(this.state.campaign)==='sealed'?'封功':'凡人'};
    const profile=realm?{...base,...realm.profile,rank:base.rank,realmId:id,realmName:realm.name,name:realm.name}:{...base};
    for(const task of Object.values(D.tasks)){const record=this.state.campaign.tasks[task.id];if(record?.claimed)for(const [key,amount]of Object.entries(task.combatModifiers?.[record.choice]||{}))profile[key]+=amount;}
    if(stage)for(const key of ['blade','spell','defence','regen'])profile[key]+=stage.profile[key];
    profile.defence=Math.min(.85,profile.defence);profile.regenTotal=base.regenTotal-base.regen+profile.regen;
    return {...profile,realmId:stage?.realmId||null,stageId:stage?.id||null,stageName:stage?.name||'',historyStageName:stage?.name||'',healing:stage?campaignHealingBases[stage.realmId]+stage.healingBonus:22+base.rank*2,...(stage?{name:stage.realmName,realmName:stage.realmName}:{})};
  }
  healingAmount(){if(!this.canUseSpiritualPower()||this.isChild())return 0;return (this.combatProfile().healing??(22+this.combatProfile().rank*2))+this.memory('herb')*4;}
  cultivationStages(){
    const state=this.state.campaign,def=D.cultivationStages?.[S.currentRealm(state,this.state)];if(!def)return [];
    const record=state.tasks[def.task],accept=Object.values(D.actions).find(action=>action.task===def.task&&action.kind==='accept');
    return def.stages.map(stage=>{const complete=S.sourceReached(state,stage.source),action=Object.values(D.actions).find(action=>action.task===def.task&&action.kind==='progress'&&action.marks.includes(stage.source.on)),pending=record?action:accept,reason=complete?'':record?this.campaignActionReason(action.id):'先登记'+D.tasks[def.task].title+'，领取本境专用料。';return {id:stage.id,name:stage.name,status:complete?'complete':reason?'locked':'available',reason,panelId:pending.objectId};});
  }
  cultivationProfile(){
    const profile=this.combatProfile(),state=this.state.campaign,realm=D.realms?.[state.cultivation.realmId],order=D.realmOrder||Object.keys(D.realms||{}),next=D.realms?.[order[order.indexOf(state.cultivation.realmId)+1]],sources=next?S.realmSources(next):[],active=this.canUseSpiritualPower(),stage=S.cultivationStage(state,this.state);
    return {realmId:active?S.currentRealm(state,this.state):null,name:profile.name,stageId:profile.stageId,stageName:profile.stageName,historyStageName:stage?.name||'',legacyRank:profile.rank,historyRealmName:stage?.realmName||super.profile()[1],breakthroughs:[...state.cultivation.breakthroughs],profile:copy(profile),stages:this.cultivationStages(),bodyRules:this.bodyProfile().rules,source:realm?(realm.sourceText||'通过实际试炼并亲手交付后突破。'):'',next:active?(next?next.name+'准备':realm?.next||'后续修行'):'当前不再运灵，修行历史保留',ready:active&&sources.some(source=>!state.tasks[source.task]?.claimed&&S.requirements(state,D.tasks[source.task].requires,this.state))};
  }
  bodyProfile(){
    const mode=S.bodyMode(this.state.campaign),spiritual=mode==='cultivator',realm=D.realms?.[this.state.campaign.cultivation.realmId],sealed=mode==='sealed',stage=S.cultivationStage(this.state.campaign,this.state),historyRealmName=stage?.realmName||super.profile()[1];
    return {mode,appearance:mode==='mortal'&&Number.isInteger(D.mortalBody?.agedFromAge)&&this.sectAge()>=D.mortalBody.agedFromAge?'mortal-aged':'current',name:spiritual?historyRealmName:sealed?D.sealedPractice.title:D.mortalBody?.title||'凡人之身',detail:spiritual?'身体规则随实际境界变化。':sealed?D.sealedPractice.detail:D.mortalBody?.detail||'已自愿散去修为，所学、器物与往日交情悉数保留；自此不再运转灵力。',historyRealmName,stageId:spiritual?stage?.id||null:null,stageName:spiritual?stage?.name||'':'',canCultivate:spiritual&&!this.isChild(),rules:copy(spiritual?realm?.bodyRules||[]:sealed?['气血上限仍为100；当前灵力归0，不再回灵、吐纳、施诀或催动灵器。','境界与法宝的战时加成、器忆及共鸣均已停用；器物收藏、所学功法与突破旧录保留。','寻常药食与歇息仍可回血；当前修为系自愿封存，并非散功归凡。']:D.mortalBody?.rules||[]),care:null};
  }

  campaignTaskStatus(task){
    const state=this.state.campaign,record=state.tasks[task.id],actions=Object.values(D.actions).filter(action=>action.task===task.id),action=actions.find(action=>action.kind==='accept'),eligible=task.phase==='admission'?S.admissionEligible(this.state):S.requirements(state,task.requires,this.state),known=!!record||eligible||task.id==='journey-departure'&&this.state.chapter.complete;
    let reason='',status=record?.claimed?'claimed':record?S.ready(state,task.id)?'ready':'active':'locked';
    if(record&&!record.claimed){
      const candidate=actions.find(candidate=>!S.completed(state,candidate)&&!S.persistentReason(state,candidate,this.state));
      if(!candidate){const next=S.ready(state,task.id)?actions.find(candidate=>candidate.kind==='claim'):null;reason=next?S.persistentReason(state,next,this.state):S.personTaskReason(state,task);if(reason)status='closed';}
    }
    if(!record){reason=S.personTaskReason(state,task)||this.campaignRequirementsReason(task.requires)||(task.phase==='admission'&&!eligible?'此时已不在入门危险抉择的阶段。':'')||(action?S.persistentReason(state,action,this.state):'');status=reason?(eligible?'closed':'locked'):'available';}
    return {known,status,reason,statusLabel:{claimed:'已完成',active:'进行中',ready:'可以交付',available:'可以前往',closed:'此路已关闭',locked:'尚未开放'}[status],action};
  }
  campaignJourney(){return {title:'行旅与选择',detail:'各处入口随已历行程依次开启；若旅程已收束，须先从旧记录恢复续行。',entries:Object.values(D.tasks).filter(task=>task.window||task.phase==='admission').map(task=>{const info=this.campaignTaskStatus(task);if(!info.known)return null;return {id:task.id,title:task.title,locationText:info.action?(D.maps[info.action.map]?.name||Items.maps[info.action.map]?.name||'药庐'):'',statusLabel:info.statusLabel,available:info.status==='available',reason:info.reason,panelId:info.action?.objectId};}).filter(Boolean)};}
  campaignEra(){const state=this.state.campaign,entries=(D.eras||[]).filter(era=>S.sourceReached(state,era.source)).map(era=>({id:era.id,label:era.label,elapsedYears:era.elapsedYears,sourceText:era.sourceText||'完成「'+taskTitle(era.source.task)+'」中的真实阶段后记年。'})),base=entries.at(-1),steps=S.eraSteps(state);if(!base&&!steps.length)return null;let extra=0;for(const step of steps){extra+=step.years;entries.push({id:step.id,label:step.label,elapsedYears:(base?.elapsedYears||0)+extra,sourceText:'实际完成「'+step.label+'」，这一程经过 '+step.years+' 年。'});}const era=entries.at(-1),baseAge=base?D.baseAge:[20,21,22,23,23][this.state.chapter.rank];return {...era,elapsedYears:(base?.elapsedYears||0)+extra,ageText:String(S.age(state,this.state))+'岁',entries};}
  campaignEnding(){const id=this.state.campaign.ending,ending=id&&D.endings?.[id];return ending?{id,title:ending.title,summary:ending.summary||'',sourceId:ending.sourceId||id,canStartSeparateJourney:ending.canStartSeparateJourney===true,recap:(ending.recap||[]).filter(entry=>S.requirements(this.state.campaign,entry.requires,this.state)).map(({title,text})=>({title,text}))}:null;}
  campaignEndingDescriptor(action){return S.recoveryDescriptor(this.state.campaign,action);}
  campaignTaskPresentation(task){const record=this.state.campaign.tasks[task.id],detail=record?.choice&&task.choiceDetails?.[record.choice],choice=record?.choice&&Object.values(D.actions).find(action=>action.task===task.id&&action.kind==='choice'&&action.choice===record.choice);return {group:task.group||null,choiceText:detail?.label||choice?.label||'',consequences:copy(detail?.consequences||[])};}
  campaignTrialList(){return Object.values(D.tasks).filter(task=>task.trial&&(this.state.campaign.tasks[task.id]||S.requirements(this.state.campaign,task.requires,this.state))).map(task=>{const record=this.state.campaign.tasks[task.id],realm=Object.values(D.realms||{}).find(realm=>S.realmSources(realm).some(source=>source.task===task.id));return {taskId:task.id,title:task.title,status:record?.claimed?'claimed':record?S.ready(this.state.campaign,task.id)?'ready':'active':'available',realmName:realm?.name||''};});}
  campaignTrialPreparation(task){
    const rec=task.recommendedPractice;if(!rec||this.state.campaign.tasks[task.id]?.claimed)return null;
    const state=this.state.campaign,stage=S.cultivationStage(state,this.state),active=this.canUseSpiritualPower(),order=['zhuji',...D.realmOrder],def=D.cultivationStages[rec.realm],required=def.stages.at(-1),same=stage?.realmId===rec.realm,current=this.combatProfile(),ready=active&&!!stage&&(order.indexOf(stage.realmId)>order.indexOf(rec.realm)||same&&stage.id==='complete'),gaps=[];
    if(active&&same)for(const [field,label,format]of [['blade','普攻增益','number'],['spell','法术增益','percent'],['defence','减伤','percent'],['regen','每秒回灵','number'],['healing','回春治疗','number']]){
      const difference=field==='healing'?required.healingBonus-stage.healingBonus:required.profile[field]-stage.profile[field],value=field==='healing'?this.healingAmount():current[field==='regen'?'regenTotal':field];
      if(difference>0)gaps.push({label,current:value,recommended:value+difference,format});
    }
    const record=state.tasks[task.id],candidates=Object.values(D.actions).filter(action=>action.task===task.id&&!S.completed(state,action)&&!(action.kind==='choice'&&record?.choice!==null&&record?.choice!==undefined)),action=candidates.find(action=>!S.persistentReason(state,action,this.state))||candidates[0],reason=action?this.campaignActionReason(action.id):'这项试炼已经完成。',accept=Object.values(D.actions).find(action=>action.task===D.cultivationStages?.[stage?.realmId]?.task&&action.kind==='accept');
    return {currentName:current.name,recommendedName:(rec.realm==='zhuji'?'筑基':D.realms[rec.realm].name.replace(/初期$/,''))+required.name,canAttempt:!reason,reason,ready,detail:ready?'已达到推荐实修准备。':'仍可提前冲关；圆满实修能补足下列准备差距。',gaps,panelId:accept?.objectId||null};
  }

  campaignTrialStatus(taskId){
    const state=this.state.campaign,trials=Object.values(D.tasks).filter(task=>task.trial),battleTask=state.battle&&D.tasks[D.actions[state.battle.action].task];
    const task=taskId?trials.find(task=>task.id===taskId):(battleTask?.trial?battleTask:null)||trials.findLast(task=>state.tasks[task.id]&&!state.tasks[task.id].claimed)||trials.findLast(task=>!state.tasks[task.id]&&S.requirements(state,task.requires,this.state))||trials.findLast(task=>state.tasks[task.id]?.claimed);
    if(!task)return null;
    return {taskId:task.id,title:task.title,detail:task.summary,preparation:this.campaignTrialPreparation(task),safe:!state.battle||D.actions[state.battle.action].task!==task.id,stages:Object.values(D.actions).filter(action=>action.task===task.id&&action.kind==='battle').map(action=>({id:action.id,title:(state.battle?.action===action.id?S.battleDefinition(state.battle):D.encounters[action.encounter]).title,status:state.battle?.action===action.id?'active':S.completed(state,action)?'complete':!S.persistentReason(state,action,this.state)?'available':'locked',detail:action.detail||(state.battle?.action===action.id?S.battleDefinition(state.battle):D.encounters[action.encounter]).detail,panelId:action.objectId}))};
  }
  campaignPersonAgePresentation(id){
    const person=D.people[id],phase=person&&S.personStage(this.state.campaign,id);if(!person||phase?.state==='dead'||phase?.presentation?.hidden===true)return null;
    const age=Number.isInteger(person.ageAtEpoch)?person.ageAtEpoch+S.age(this.state.campaign,this.state)-D.baseAge:person.age;
    return (person.agePresentations||[]).filter(view=>age>=view.minimumAge).at(-1)||null;
  }
  campaignPersonPresence(id){
    const person=D.people[id];if(!person)return null;const state=this.state.campaign,phase=S.personStage(state,id),met=S.personMet(state,id);
    const places=[...Object.entries(D.maps).flatMap(([mapId,map])=>map.objects.map(object=>({mapId,object}))),...D.entryObjects.map(object=>({mapId:object.map,object}))].filter(({mapId,object})=>(object.personId||(D.personBindings||[]).find(binding=>binding.map===mapId&&binding.objectId===object.id)?.personId)===id);
    const present=places.find(({mapId,object})=>!(phase?.presentation?.hidden??object.hidden)&&(!D.maps[mapId]||S.requirements(state,D.maps[mapId].requires,this.state))&&(!object.visibleRequires||S.requirements(state,object.visibleRequires,this.state)));
    const status=phase?.state==='dead'?'dead':phase?.presentation?.hidden===true?'away':present?'present':met?'away':'unmet',label={dead:'已故',away:'已离场',present:'在场',unmet:'未登记亲识'}[status];
    const reason=status==='dead'||status==='away'?phase?.detail||(person.name+'当前没有可由本人办理事务的在场入口。'):status==='unmet'?'尚未登记与本人实际相识。':'';
    return {state:status,label,reason,mapId:status==='present'?present.mapId:null,panelId:status==='present'?present.object.id:null,met:!!met};
  }
  campaignPersonHistory(id){
    const person=D.people[id];if(!person)return null;const state=this.state.campaign,primary=person.relationshipTask?state.tasks[person.relationshipTask]:null,prior=person.previousRelationshipTask?state.tasks[person.previousRelationshipTask]:null,record=primary||prior,met=S.personMet(state,id),partner=Object.entries(D.partners||{}).find(([,definition])=>definition.personId===id);
    const selected=record?(primary?person.relationshipChoices:person.previousRelationshipChoices)?.[record.choice]:null,unclaimed=!!partner&&primary?.choice===partner[1].source.choice&&!primary.claimed,archived=unclaimed&&(partner[1].unfulfilledArchiveSources||[]).some(source=>S.sourceReached(state,source)),closed=unclaimed&&!archived?S.personTaskReason(state,D.tasks[partner[1].source.task]):'',pending=unclaimed&&!archived&&!closed,committed=!!partner&&state.partnerId===partner[0];
    const stage=committed?'明确道侣':archived?'已撤回并归档的承诺':closed?'未完成的承诺':pending?'已表达结契意愿，待最终确认':selected?.stage||(record?'已登记事务':met?'已相识':'未登记亲识');
    const detail=archived?'这份未竟承诺已自愿撤回归档，不再作为结契依据；当日心意仍留在旧录里。':closed|| (pending?'双方正式婚契尚未交付；关闭预览不会成契。':selected?.detail||(met?'相识经历已记入行程。':''));
    const commitmentText=partner?(committed?'已完成唯一具名道侣结契':archived?'旧承诺已实际归档，不能再领取婚契':closed?'这份未完成承诺已无法办理':pending?'待现场再次确认':'尚无具名结契'):'';
    return {known:!!record||met,history:{id,name:person.name,portrait:copy(person.portrait||null),met:!!met,stage,detail,commitmentText,taskId:record?(primary?person.relationshipTask:person.previousRelationshipTask):null,choice:record?.choice??null,claimed:record?.claimed===true}};
  }
  campaignPersonStatus(id){
    const person=D.people[id];if(!person)return null;const phase=S.personStage(this.state.campaign,id),presence=this.campaignPersonPresence(id),data=this.campaignPersonHistory(id),unavailable=presence.state==='dead'||presence.state==='away',life=presence.state==='dead'?'dead':presence.state==='away'?'unknown':phase?.state||'alive',years=Number.isInteger(person.ageAtEpoch)?person.ageAtEpoch+S.age(this.state.campaign,this.state)-D.baseAge:person.age,age=unavailable?null:years??null,ageText=presence.state==='dead'?'已故':presence.state==='away'?'已离场':Number.isInteger(age)?String(age)+'岁':phase?.ageText?(phase.ageText+(S.eraSteps(this.state.campaign).length?'（该阶段记载）':'')):'';
    const current={id,name:phase?.presentation?.name||person.name,role:person.role||'',portrait:copy(this.campaignPersonAgePresentation(id)?.portrait||phase?.portrait||person.portrait||null),age,ageText,life};
    const next=Object.values(D.people).find(candidate=>candidate.successorOf===id);let successor=null;
    if(next){const nextPresence=this.campaignPersonPresence(next.id);if(nextPresence.state==='present'||nextPresence.met){const {met,...location}=nextPresence;successor={id:next.id,name:next.name,role:next.role||'',portrait:copy(next.portrait||null),met,presence:location};}}
    return {id,name:current.name,state:life,phaseDetail:phase?.detail||'',age,ageText,portrait:current.portrait,current,presence,history:data.history,successor};
  }
  relationshipProfile(id){
    const person=D.people[id],data=person&&this.campaignPersonHistory(id);if(!data?.known)return null;const view=this.campaignPersonStatus(id),partner=Object.entries(D.partners||{}).find(([,definition])=>definition.personId===id),state=this.state.campaign;
    return {...view,stage:view.history.stage,detail:view.history.detail,commitmentText:view.history.commitmentText,adultText:partner&&(person.adult===true||Number.isInteger(person.age)&&person.age>=18)?'此人为已成年的相识者':'',reason:partner&&state.partnerId&&state.partnerId!==partner[0]?'已有唯一道侣，仍可保持朋友并共同办事。':'',panelId:partner&&person.relationshipTask?Object.values(D.actions).find(action=>action.task===person.relationshipTask&&action.kind==='accept')?.objectId??null:null};
  }

  campaignStatus(){
    const state=this.state.campaign;
    return {title:D.title||'山河续行',subtitle:'循证而行，所得随身',chapterLabel:D.chapterLabel||'筑基卷 · 锁妖塔与杏花村',started:state.started,inCampaign:this.inCampaign(),map:this.state.map,
      journal:Object.values(D.tasks).map(task=>{const info=this.campaignTaskStatus(task);return {id:task.id,title:task.title||task.name,status:info.status,statusLabel:info.statusLabel,reason:info.reason,detail:[task.summary||'',info.reason].filter(Boolean).join('；'),panelId:task.panelId||info.action?.objectId,...this.campaignTaskPresentation(task),volumeLabel:task.volumeLabel||D.chapterLabel||'筑基卷',known:info.known};}).filter(entry=>entry.known),
      evidence:state.evidence.map(id=>this.campaignEvidence(id)),relationships:Object.keys(D.people).map(id=>this.relationshipProfile(id)).filter(Boolean),materials:Object.entries(state.supplies).filter(([,count])=>count>0).map(([id,count])=>({id,name:D.supplies[id].title,count,purpose:D.supplies[id].purpose||D.supplies[id].usage||D.supplies[id].description||''})),
      memory:this.campaignMemory(),body:this.bodyProfile(),journey:this.campaignJourney(),endingCoverage:{scope:'current-journey',seen:this.state.campaign.ending?[{title:this.campaignEnding().title,summary:this.campaignEnding().summary}]:[],unrevealedCount:Object.keys(D.endings||{}).length-(this.state.campaign.ending?1:0)},cultivation:this.cultivationProfile(),trial:this.campaignTrialStatus(),trials:this.campaignTrialList(),era:this.campaignEra(),ending:this.campaignEnding(),activeBattle:state.battle?{id:state.battle.id,title:S.battleDefinition(state.battle).title,remaining:state.battle.enemies.filter(enemy=>enemy.hp>0).length}:null};
  }
  campaignPanel(panel='hub'){
    const object=Object.values(D.maps).flatMap(map=>map.objects).concat(D.entryObjects).find(object=>object.id===panel),actions=[];
    const itemList=(bucket,type)=>Object.entries(bucket||{}).map(([id,amount])=>itemTitle(type,id)+' ×'+amount).join('、');
    for(const action of Object.values(D.actions).filter(action=>action.objectId===panel)){
      const reason=this.campaignActionReason(action.id),cost=[itemList(action.cost?.items,'items'),itemList(action.cost?.supplies,'supplies')].filter(Boolean).join('、'),grant=[itemList(action.grant?.items,'items'),itemList(action.grant?.supplies,'supplies')].filter(Boolean).join('、');
      const detail=[action.detail,cost?'消耗：'+cost:'',grant?'所得：'+grant:''].filter(Boolean).join('；');
      actions.push({id:action.id,label:action.label,detail,reason,available:!reason,...this.campaignEndingDescriptor(action),closeOnSuccess:action.kind==='battle'||!!S.endingAction(this.state.campaign,action),confirm:action.confirm||null});
    }
    for(const [id,site]of Object.entries(D.restSites||{}).filter(([,site])=>site.objectId===panel)){const reason=this.campaignRestReason(id);actions.push({id,label:site.title,detail:site.detail,reason,available:!reason,closeOnSuccess:false,confirm:null});}
    for(const exit of Object.values(D.exits).filter(exit=>exit.objectId===panel)){
      const reason=this.campaignTravelReason(exit.id);actions.push({id:'exit:'+exit.id,travelId:exit.id,label:exit.label||'沿道路前往'+Items.maps[exit.to.map].name,detail:exit.detail||'保留已获线索与物品。',reason,available:!reason,closeOnSuccess:true,confirm:null});
    }
    if(this.state.campaign.battle)actions.push({id:'retreat-battle',label:'结束本场，撤回安全处',detail:'已用符药不退；已得器物、证物、情谊与达成目标均保留，本场可重整旗鼓再战。',reason:'',available:true,closeOnSuccess:true,confirm:{title:'结束本次交战？',text:'本场敌手将重新布阵；此前取得的永久进展悉数保留。',label:'撤回安全处'}});
    const candidates=Object.values(D.tasks).filter(task=>task.panelId===panel||Object.values(D.actions).some(action=>action.task===task.id&&action.objectId===panel)),records=this.state.campaign.tasks;
    const task=candidates.find(task=>records[task.id]&&!records[task.id].claimed)||candidates.find(task=>!records[task.id]&&S.requirements(this.state.campaign,task.requires,this.state))||candidates.filter(task=>records[task.id]?.claimed).at(-1)||candidates[0];
    return {title:object?.name||D.title||'山河续行',subtitle:task?.title||D.chapterLabel||'筑基卷',text:object?.text||object?.description||task?.summary||D.description||'',actions};
  }
  activeEnemies(){return this.inCampaign()?this.state.campaign?.battle?.enemies||[]:super.activeEnemies();}
  canFight(){if(this.state.campaign?.ending)return false;return this.inCampaign()?this.state.hp>0&&!!this.state.campaign?.battle:super.canFight();}
  combatReady(){return !this.state.campaign?.ending&&!this.events.some(event=>event.type==='campaign')&&super.combatReady();}
  attack(target){if(this.state.campaign?.ending)return false;if(this.inCampaign()&&!this.canFight())return false;return super.attack(target);}
  useItem(id,target){if(this.state.campaign?.ending)return false;if(this.inCampaign()&&!this.canFight()&&['fire','needle','incense'].includes(id))return false;return super.useItem(id,target);}
  castSkill(){if(this.state.campaign?.ending)return false;if(this.inCampaign()&&!this.canFight())return false;const ok=super.castSkill();this.checkCampaignClear();return ok;}
  castSectSkill(id,target){if(this.state.campaign?.ending)return false;const ok=super.castSectSkill(id,target);this.checkCampaignClear();return ok;}
  gain(id,amount){if(this.campaignDropSuppression>0&&id==='dust'&&amount===2)return;return super.gain(id,amount);}
  campaignBattleDefinition(){const battle=this.state.campaign?.battle;return battle?S.battleDefinition(battle):null;}
  encounterInfo(enemy){if(!this.state.campaign?.battle?.enemies.includes(enemy)||!enemy.armor)return super.encounterInfo(enemy);const info=Base.encounterPreview(enemy.armor.kind);return info?{...info,maxArmor:enemy.armor.maxArmor,armor:enemy.armorLeft,broken:enemy.armorLeft<=0}:null;}

  hitEnemy(enemy,amount){
    if(!this.inCampaign()||!this.state.campaign?.battle?.enemies.includes(enemy))return super.hitEnemy(enemy,amount);
    this.campaignDropSuppression++;try{super.hitEnemy(enemy,amount);}finally{this.campaignDropSuppression--;}
    if(enemy.hp<=0)this.events=this.events.filter(event=>!(event.type==='message'&&event.text===(enemy.name||'石傀')+'散去，获得灵砂 ×2。'));
    if(!this.castingSkill)this.checkCampaignClear();
  }
  checkCampaignClear(){
    const battle=this.state.campaign?.battle;if(!this.inCampaign()||!battle||battle.enemies.some(enemy=>enemy.hp>0))return;
    const action=D.actions[battle.action];this.state.campaign.battle=null;S.applyRecord(this.state.campaign,action);this.resetTransient();this.message(action.result||'守阵役灵已退，现场线索可以继续查证。');this.checkpoint();
  }
  enemyStep(enemy,dt){if(enemyIds.has(enemy.id)&&(!this.inCampaign()||!this.state.campaign?.battle?.enemies.includes(enemy)))return;return super.enemyStep(enemy,dt);}
  takeDamage(amount){if(this.state.campaign?.ending)return;const battle=this.state.campaign?.battle;if(this.inCampaign()&&!battle)return;super.takeDamage(amount);if(battle&&this.state.campaign.battle===battle&&this.state.hp<=0)this.endCampaignBattle(true);}
  endCampaignBattle(failed){
    const battle=this.state.campaign.battle;if(!battle)return false;const place=S.battleDefinition(battle).returnTo;
    this.state.campaign.battle=null;this.events=this.events.filter(event=>!['defeat','campaign'].includes(event.type));this.state.hp=100;this.restoreSpirit(100);
    super.travel(place.map,place.x,place.y);this.events.push({type:'map'});this.message((failed?'本场失利，已回安全处调息。':'已结束本场，撤回安全处。')+'永久所得与已查线索悉数保留，备妥符药后可随时再战。');return true;
  }
  resetTransient(){super.resetTransient();for(const enemy of this.state.campaign?.battle?.enemies||[])Object.assign(enemy,{slow:0,burn:0,wind:0,cooldown:1,targetX:enemy.x,targetY:enemy.y});}
  step(dt,input={}){if(this.state.campaign?.ending)return;if(this.events.some(event=>event.type==='campaign'))return;super.step(dt,input);this.checkCampaignClear();}
  objective(){if(!this.inCampaign())return super.objective();if(this.state.campaign.battle)return [S.battleDefinition(this.state.campaign.battle).title,'靠近自动普攻；按 V 暂停下令。失利亦保留已得器物与线索。'];const task=Object.values(D.tasks).find(task=>this.state.campaign.tasks[task.id]&&!this.state.campaign.tasks[task.id].claimed);return task?[task.title||task.name,task.summary]:[D.chapterLabel||'山河续行','走近人物、证物或出口，按 E 查看。'];}
  exportSave(){const save=super.exportSave();if(save.campaign?.battle)save.campaign.battle.enemies=save.campaign.battle.enemies.map(({id,hp,x,y,armorLeft})=>({id,hp,x,y,...(armorLeft===undefined?{}:{armorLeft})}));return save;}
}
const api={...Base,Game,validateSave,campaign:D,campaignState:S,campaignHealingBases};
if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
