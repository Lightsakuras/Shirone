(function(root){
'use strict';
const node=typeof module==='object'&&module.exports;
const D=node?require('./campaign-data.js'):root.XiuxianCampaignData;
const Legacy=node?[require('./campaign-schema-v1.js'),require('./campaign-schema-v2.js'),require('./campaign-schema-v3.js'),require('./campaign-schema-v4.js'),require('./campaign-schema-v5.js'),require('./campaign-schema-v6.js')]:[root.XiuxianCampaignSchemaV1,root.XiuxianCampaignSchemaV2,root.XiuxianCampaignSchemaV3,root.XiuxianCampaignSchemaV4,root.XiuxianCampaignSchemaV5,root.XiuxianCampaignSchemaV6];
const HistoryBase=node?require('./sect-world.js'):root.XiuxianEngine,validateHistoryWorld=HistoryBase.validateSave;
const battleSources=Object.freeze({
  1:{commit:'5441f11ba5933877e6b40443b53a67452f65eade',definitionSha256:'006087a3816d0aa6ab3c8899c742eb475d645c21e09497f288161d407eca2d14'},
  2:{commit:'efefc4a112ad2cdfec3866a75bca17d87290dc43',definitionSha256:'c333fc9638d4c84dfac0c5126e4dbfeefd626eee501a6df8dd3cf089a8c94074'},
  3:{commit:'94015e8ed24722a709607864a267b43e4e4ccb83',definitionSha256:'b5221d76dfce24adeae0ef0f9630d9876f814a6fb9c719bd3386225925cae531'},
  4:{commit:'67c5395e8e0dc36171d05348fb0225e549c84601',definitionSha256:'329139ce186ddbceadf645ae9c9a8c2d741cae1358d332f81b5e0f68b01d8085'},
  5:{commit:'dec8287dfa0f0d1423f59cee2e2e912d3ab36cad',definitionSha256:'e4299a1f1cc79bc0e401e500b02a8c84fcd3206d839c3d5399101d979558da67'},
  6:{commit:'9d2e33c6156ae59f19801a41d334a0b85b424511',definitionSha256:'32e8ae1720cd34dc2913637dd47f95255e9453697f1f5833d7885c563c42b177'}
});

function createState(D,previousDefinitions=[]){
const previous=previousDefinitions.filter(def=>def.revision<D.revision).sort((a,b)=>a.revision-b.revision),legacyDefinition=previous.at(-1);
const legacy=legacyDefinition?createState(legacyDefinition,previous.slice(0,-1)):null;
const copy=value=>JSON.parse(JSON.stringify(value));
const owns=(object,key)=>Object.hasOwn(object,key);
const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
const shape=(value,keys)=>object(value)&&Object.keys(value).length===keys.length&&keys.every(key=>owns(value,key));
const number=(value,min,max,integer=false)=>typeof value==='number'&&Number.isFinite(value)&&value>=min&&value<=max&&(!integer||Number.isInteger(value));
const fail=message=>{throw Error('续章记录异常：'+message);};
const objectiveIds=task=>task.objectives.map(entry=>typeof entry==='string'?entry:entry.id);
const requiredObjectiveIds=task=>task.requiredObjectives||objectiveIds(task);
const choices=task=>(task.choices||[]).map(entry=>typeof entry==='string'?entry:entry.id);
const sequence=task=>task.sequence||[];
const emptyTask=()=>({done:[],choice:null,sequence:0,claimed:false});
const fresh=()=>({schema:1,revision:D.revision,started:false,tasks:{},supplies:Object.fromEntries(Object.keys(D.supplies).map(id=>[id,0])),tokens:[],evidence:[],cultivation:{realmId:null,breakthroughs:[]},partnerId:null,battle:null,ending:null,...(D.revision>=7?{historySource:null}:{})});
const battleSourceDefinitions=new Map(previous.map(def=>[def.revision,def])),battleSourceStates=new Map();
function battleSourceDefinition(revision){
  if(!Number.isInteger(revision)||!owns(battleSources,revision)||!battleSourceDefinitions.has(revision))fail('未知旧战斗来源');
  return battleSourceDefinitions.get(revision);
}
function battleSourceInfo(revision){battleSourceDefinition(revision);return {revision,...battleSources[revision]};}

function sourceState(revision){
  if(!battleSourceStates.has(revision))battleSourceStates.set(revision,createState(battleSourceDefinition(revision),previous.filter(def=>def.revision<revision)));
  return battleSourceStates.get(revision);
}
function sameData(a,b){
  if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
  const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(key=>owns(b,key)&&sameData(a[key],b[key]));
}
function historyWorld(world){const out=copy(world);delete out.campaign;delete out.historySource;return out;}
function historyDescriptor(raw,world){
  const revision=raw.revision,definition=battleSourceDefinition(revision),state=sourceState(revision).validate(raw,world);
  return {revision,...battleSources[revision],campaign:copy(state),world:historyWorld(world)};
}
function historySourceContext(raw,world){
  if(D.revision<7||raw.historySource===null)return null;
  const source=raw.historySource;
  if(!shape(source,['revision','commit','definitionSha256','campaign','world'])||!Number.isInteger(source.revision)||source.revision<1||source.revision>6||!object(source.world)||owns(source.world,'campaign')||owns(source.world,'historySource'))fail('历史来源结构或递归字段');
  const info=battleSourceInfo(source.revision),definition=battleSourceDefinition(source.revision);
  if(source.commit!==info.commit||source.definitionSha256!==info.definitionSha256||source.campaign?.revision!==source.revision)fail('历史来源指纹或修订');
  const map=source.world.map,validatedWorld=validateHistoryWorld(owns(definition.maps,map)?{...source.world,map:'garden'}:source.world);validatedWorld.map=map;
  if(!sameData(validatedWorld,source.world))fail('历史世界快照含未知或非规范字段');
  const validator=sourceState(source.revision),campaign=validator.validate(source.campaign,validatedWorld);
  if(!sameData(campaign,source.campaign))fail('历史行程快照不是严格规范来源');
  if(validatedWorld.gender!==world.gender||validatedWorld.origin!==world.origin||validatedWorld.background.id!==world.background.id||validatedWorld.background.legacy!==world.background.legacy||validatedWorld.background.openingChoice!==world.background.openingChoice||validatedWorld.background.missionChoice!==null&&validatedWorld.background.missionChoice!==world.background.missionChoice)fail('历史人物或身世来源已被替换');
  const oldContract=validatedWorld.sectWorld.contract,currentContract=world.sectWorld.contract;
  if(oldContract.choice!==null&&currentContract.choice!==oldContract.choice||oldContract.claimed&&!currentContract.claimed)fail('历史药站商约选择或交割不能倒退');
  for(const [id,record]of Object.entries(campaign.tasks)){
    const current=raw.tasks[id];if(!current||record.done.some(mark=>!current.done.includes(mark))||record.choice!==null&&current.choice!==record.choice||record.claimed&&!current.claimed)fail('历史选择、目标或领取不能倒退');
    if(current.sequence<record.sequence){
      const order=sequence(definition.tasks[id]),actions=Object.values(definition.actions).filter(action=>action.task===id&&action.kind==='sequence'&&order.indexOf(action.id)<record.sequence),reset=current.sequence===0&&!record.claimed&&record.sequence<order.length&&actions.every(action=>!action.marks.length&&Object.values(action.cost||{}).every(bucket=>Object.keys(bucket).length===0)&&Object.values(action.grant||{}).every(bucket=>Object.keys(bucket).length===0));
      if(!reset)fail('历史顺序进度不能倒退');
    }
  }
  if(campaign.partnerId!==null&&campaign.partnerId!==raw.partnerId)fail('历史唯一结契不能删除或替换');
  if(campaign.ending!==null){
    if(raw.ending!==campaign.ending||raw.battle!==null||!sameSet(Object.keys(raw.tasks),Object.keys(campaign.tasks))||Object.keys(campaign.tasks).some(id=>!sameData(raw.tasks[id],campaign.tasks[id]))||!sameData(historyWorld(world),validatedWorld))fail('已结束历史来源不能重新活动');
  }
  const ids=new Set(Object.values(definition.actions).filter(action=>validator.completed(campaign,action)).map(action=>action.id));
  return {definition,campaign,world:validatedWorld,ids,allowed:new Set(D.historyCompatibility?.actionIds||[])};
}


function legacyBattleDescriptor(battle,revision){
  const definition=battleSourceDefinition(revision),action=definition.actions[battle.action],encounter=definition.encounters[battle.id];
  if(!action||action.kind!=='battle'||action.encounter!==battle.id||!encounter)fail('旧战斗来源行动');
  return {revision,...battleSources[revision],task:action.task,action:battle.action,encounter:battle.id,enemyIds:encounter.enemies.map(enemy=>enemy.id)};
}
function battleDefinition(battle){
  if(!battle||!owns(D.encounters,battle.id)||!owns(D.actions,battle.action))fail('战斗来源');
  if(!owns(battle,'legacySource'))return D.encounters[battle.id];
  if(D.revision<6||!shape(battle.legacySource,['revision','commit','definitionSha256','task','action','encounter','enemyIds']))fail('旧战斗来源结构');
  const source=battle.legacySource,definition=battleSourceDefinition(source.revision),expected=legacyBattleDescriptor(battle,source.revision),action=D.actions[battle.action];
  if(source.commit!==expected.commit||source.definitionSha256!==expected.definitionSha256||source.task!==expected.task||source.action!==expected.action||source.encounter!==expected.encounter||!Array.isArray(source.enemyIds)||source.enemyIds.length!==expected.enemyIds.length||source.enemyIds.some((id,i)=>id!==expected.enemyIds[i])||action.kind!=='battle'||action.task!==source.task||action.encounter!==source.encounter)fail('旧战斗来源绑定');
  return definition.encounters[battle.id];
}
function validateLegacyBattleHistory(raw,world){
  const revision=raw.battle.legacySource.revision,definition=battleSourceDefinition(revision),projected=copy(raw);projected.revision=revision;delete projected.battle.legacySource;
  delete projected.historySource;
  for(const [id,amount]of Object.entries(projected.supplies))if(!owns(definition.supplies,id)){if(amount!==0)fail('旧战斗不能夹带新任务物');delete projected.supplies[id];}
  sourceState(revision).validate(projected,world);
}

const practiceRealms=['zhuji','jindan','yuanying','huashen','heti','dacheng'],realmTitles={zhuji:'筑基',jindan:'金丹',yuanying:'元婴',huashen:'化神',heti:'合体',dacheng:'大乘'};
function currentRealm(state,world){return state.cultivation?.realmId||(world.chapter?.rank===4?'zhuji':null);}
function cultivationStage(state,world){
  const realmId=currentRealm(state,world);if(!realmId)return null;
  const def=D.cultivationStages?.[realmId],stages=def?.stages||[],got=stages.map(stage=>sourceReached(state,stage.source));
  for(let i=1;i<got.length;i++)if(got[i]&&!got[i-1])fail('实修阶段必须连续');
  const index=got.lastIndexOf(true)+1,stage=index?stages[index-1]:{id:'initial',name:'初期',profile:{blade:0,spell:0,defence:0,regen:0},healingBonus:0};
  return {...copy(stage),index,realmId,realmName:realmTitles[realmId]+stage.name};
}

const realmSources=realm=>[realm.source,...(realm.alternativeSources||[])];
function deriveCultivation(state){
  const breakthroughs=(D.realmOrder||Object.keys(D.realms||{})).filter(id=>realmSources(D.realms[id]).some(source=>sourceReached(state,source)));
  return {realmId:breakthroughs.at(-1)||null,breakthroughs};
}
function sourceReached(state,source){const record=state?.tasks[source.task];return !!record&&(source.on==='accept'||(source.on==='claimed'?record.claimed===true:record.done.includes(source.on)))&&(source.choice===undefined||record.choice===source.choice);}
function bodyMode(state){return D.mortalBody&&sourceReached(state,D.mortalBody.source)?'mortal':D.sealedPractice&&sourceReached(state,D.sealedPractice.source)?'sealed':'cultivator';}
function derivePartner(state){const ids=Object.keys(D.partners||{}).filter(id=>sourceReached(state,D.partners[id].source));if(ids.length>1)fail('同时存在多份道侣结契');return ids[0]||null;}
function pendingVow(state,id){const partner=D.partners?.[id],record=partner&&state.tasks[partner.source.task];return !!partner&&record?.choice===partner.source.choice&&!record.claimed&&!(partner.unfulfilledArchiveSources||[]).some(source=>sourceReached(state,source));}
function vowIntents(state){return Object.keys(D.partners||{}).filter(id=>{const partner=D.partners[id],record=state.tasks[partner.source.task];return record?.choice===partner.source.choice&&(record.claimed||(partner.unfulfilledArchiveSources?pendingVow(state,id):!personTaskReason(state,D.tasks[partner.source.task])));});}
function historyReason(state){
  for(const group of Object.values(D.exclusiveHistories||{}))if(group.branches.filter(branch=>branch.sources.some(source=>sourceReached(state,source))).length>1)return group.title+'；已有另一条实际承诺。';
  if(D.mortalBody&&D.sealedPractice&&sourceReached(state,D.mortalBody.source)&&sourceReached(state,D.sealedPractice.source))return '散功归凡与自囚封功的来源不能同时成立。';
  if((D.memoryVisits||[]).filter(visit=>state.tasks[visit.task]&&!state.tasks[visit.task].claimed).length>1)return '一段回忆尚未结束，不能同时进入另一世回忆。';
  if(vowIntents(state).length>1)return '已有另一份明确结契承诺，不能同时许诺第二位道侣。';return '';
}
function windowReason(state,id,world){const window=D.windows?.[id];if(!window)return '';if(!requirements(state,window.requires,world))return window.title+'：前面的行程尚未完成。';const closed=window.closedBy.find(source=>sourceReached(state,source));return closed?window.title+'：已进入「'+D.tasks[closed.task].title+'」，须恢复此前记录才能改走这条路。':'';}
function replayClosesAbilities(state,action,raw,pending){const sources=[D.mortalBody?.source,D.sealedPractice?.source].filter(Boolean),closes=sources.some(source=>source.task===action.task&&(source.on==='claimed'?action.kind==='claim':action.marks?.includes(source.on))&&(source.choice===undefined||raw.tasks[action.task]?.choice===source.choice));if(!closes)return false;const needsSpirit=requires=>(requires?.all||[]).some(rule=>rule.type==='body'&&rule.id==='cultivator');return pending.some(other=>other!==action&&(Object.values(D.realms||{}).some(realm=>realmSources(realm).some(source=>source.task===other.task&&other.kind==='claim'))||needsSpirit(other.requires)||needsSpirit(D.tasks[other.task].requires)));}
function personMet(state,id){
  const person=D.people[id];if(!person)return false;if((person.metSources||(person.metSource?[person.metSource]:[])).some(source=>sourceReached(state,source)))return true;
  const source=D.revision>=7&&state?.historySource,info=source&&battleSources[source.revision],definition=source&&battleSourceDefinitions.get(source.revision),old=definition?.people?.[id]?.metSource;
  return !!old&&source.commit===info?.commit&&source.definitionSha256===info?.definitionSha256&&source.campaign?.revision===source.revision&&sourceReached(source.campaign,old);
}
function personReason(state,id){const person=D.people[id],phase=personStage(state,id);if(phase?.state==='dead')return person.name+'已离世，不能再办理新的共同事务或承诺；生前记录保留。';if(phase?.presentation?.hidden===true)return person.name+'已离场或交接原职，不能再由本人办理新的事务；原记录保留。';if(!phase&&(person.metSource||person.metSources)&&!personMet(state,id))return '尚未在这段行程中与'+person.name+'实际相见。';return '';}
function personTaskReason(state,task){return task.requiresLivingPerson?personReason(state,task.requiresLivingPerson):'';}
function actionPerson(action){const target=D.maps[action.map]?.objects.find(object=>object.id===action.objectId)||D.entryObjects.find(object=>object.map===action.map&&object.id===action.objectId);return target?.personId||(D.personBindings||[]).find(binding=>binding.map===action.map&&binding.objectId===action.objectId)?.personId||null;}
function actionPersonReason(state,action){const id=actionPerson(action),phase=id&&personStage(state,id);return phase?.state==='dead'||phase?.presentation?.hidden===true?personReason(state,id):'';}
function actionAvailabilityReason(state,action,{historical=false}={}){
  if(historical)return '';const task=D.tasks[action.task],vow=Object.values(D.partners||{}).find(partner=>partner.source.task===action.task),vowing=vow&&(action.kind==='choice'?action.choice===vow.source.choice:action.kind==='claim'&&state.tasks[action.task]?.choice===vow.source.choice);
  if(vowing&&(vow.unfulfilledArchiveSources||[]).some(source=>sourceReached(state,source)))return '这份未走完的承诺已自愿撤回归档，不再作为结契依据；当日心意仍留在旧录里。';
  const handoff=action.kind==='claim'&&action.handoffAfter&&sourceReached(state,action.handoffAfter.source),gate=handoff?'':personTaskReason(state,task)||(D.revision>=7?actionPersonReason(state,action):'');if(gate)return gate;
  const choice=action.kind==='choice'?action.choice:action.kind==='claim'?state.tasks[action.task]?.choice:null,id=task.choiceLivingPeople?.[choice];return id?personReason(state,id):'';
}
function personAge(state,id,world){const person=D.people[id],phase=personStage(state,id);if(phase?.state==='dead'||phase?.presentation?.hidden===true)return null;return Number.isInteger(person?.ageAtEpoch)?person.ageAtEpoch+age(state,world)-D.baseAge:person?.age??null;}
function ageWindowReason(state,window,world){if(!window)return '';const years=personAge(state,window.personId,world);return years===null||years<window.min||window.max!==undefined&&years>window.max?window.closedReason||'已过这一段新相识或新承诺的年岁窗口；既有经历照旧保留。':'';}
function actionReachesSource(action,source,raw){return source.task===action.task&&(source.on==='accept'?action.kind==='accept':source.on==='claimed'?action.kind==='claim':action.marks?.includes(source.on))&&(source.choice===undefined||raw.tasks[action.task]?.choice===source.choice);}
function replayAdvancesRealm(state,action,pending,world){if(action.kind!=='claim'||!Object.values(D.realms||{}).some(realm=>realmSources(realm).some(source=>source.task===action.task)))return false;const practice=D.cultivationStages?.[currentRealm(state,world)]?.task;return !!practice&&pending.some(other=>other!==action&&other.task===practice);}
function replayRemovesPerson(action,raw,pending){return Object.entries(D.people||{}).some(([id,person])=>(person.lifecycle||[]).some(phase=>(phase.state==='dead'||phase.presentation?.hidden===true)&&actionReachesSource(action,phase.source,raw))&&pending.some(other=>other!==action&&(D.tasks[other.task].requiresLivingPerson===id||D.revision>=7&&(actionPerson(other)===id||D.tasks[other.task].choiceLivingPeople?.[other.choice||raw.tasks[other.task]?.choice]===id))));}
function admissionEligible(world){return world.chapter.prologue!=='pending'&&world.chapter.rank===0&&world.chapter.breath===0&&world.chapter.quests.includes(world.origin)&&!world.chapter.training&&world.story.stage==='unstarted'&&!world.run;}
function admissionRecordAllowed(state,world){const record=state.tasks['admission-overdraw'];return !record||record.claimed&&record.choice==='leave'||admissionEligible(world);}
function transitionReason(state,action,world,{replay=false,historical=false}={}){
  const task=D.tasks[action.task],personGate=actionAvailabilityReason(state,action,{historical});if(personGate)return personGate;
  if(!historical&&action.kind==='accept'){const reason=ageWindowReason(state,task.entryAgeWindow,world);if(reason)return reason;}
  if(task.phase==='admission'&&!admissionEligible(world)&&!(replay&&world.campaign?.tasks?.[action.task]?.claimed&&world.campaign.tasks[action.task].choice==='leave'))return '仅在完成入门试炼、尚未运气筑基前，才能作出这一险途抉择。';
  if(action.kind==='accept'&&task.window){const reason=windowReason(state,task.window,world);if(reason)return reason;}
  if(bodyMode(state)!=='cultivator'&&Object.values(D.realms||{}).some(realm=>realmSources(realm).some(source=>source.task===action.task)))return '归凡后过往修行记录保留，不再渡劫冲关。';
  const vow=Object.values(D.partners||{}).find(partner=>partner.source.task===action.task),vowing=vow&&(action.kind==='choice'?action.choice===vow.source.choice:action.kind==='claim'&&state.tasks[action.task]?.choice===vow.source.choice);
  if(vowing&&!historical){const reason=ageWindowReason(state,vow.newPromiseAgeWindow,world);if(reason)return reason;}
  if(vowing&&(world.chapter.prologue==='pending'||!vow.genders.includes(world.gender)||!sourceReached(state,vow.adultSource)))return '须双方成年、亲历相识，且当面听取对方明确心意。';
  const candidate={...state,tasks:{...state.tasks}},record=action.kind==='accept'?emptyTask():candidate.tasks[action.task]?copy(candidate.tasks[action.task]):null;
  if(!record)return '';candidate.tasks[action.task]=record;if(action.kind==='choice')record.choice=action.choice;if(action.kind==='claim')record.claimed=true;for(const mark of action.marks||[])if(!record.done.includes(mark))record.done.push(mark);
  return historyReason(candidate);
}
function replayClosesWindow(state,action,raw){for(const task of Object.values(D.tasks)){if(!task.window||!raw.tasks[task.id]||state.tasks[task.id])continue;for(const source of D.windows[task.window].closedBy)if(source.task===action.task&&(source.on==='accept'?action.kind==='accept':source.on==='claimed'?action.kind==='claim':action.marks?.includes(source.on))&&(source.choice===undefined||source.choice===(action.choice||state.tasks[action.task]?.choice)))return true;}return false;}
function age(state,world){const era=deriveEra(state),years=eraSteps(state).reduce((sum,step)=>sum+step.years,0);return world.chapter.prologue==='pending'?10:(era?D.baseAge+era.elapsedYears:[20,21,22,23,23][world.chapter.rank])+years;}
function memoryVisit(state,map){return (D.memoryVisits||[]).find(visit=>visit.map===map&&state.tasks[visit.task]&&!state.tasks[visit.task].claimed)||null;}
function eraSteps(state){return (D.eraSteps||[]).filter(step=>sourceReached(state,step.source));}
function recoveryDescriptor(state,action){
  const sealed=D.sealedPractice;if(sealed?.source.task===action.task&&(sealed.source.on==='claimed'?action.kind==='claim':action.marks?.includes(sealed.source.on))&&(sealed.source.choice===undefined||sealed.source.choice===(action.choice||state.tasks[action.task]?.choice)))return {recoveryKind:'mortal',recoveryStage:'claim',endingStage:null,recoveryKey:'sealed-'+sealed.source.task,recoveryTitle:sealed.title};
  const upstream=(D.recoveryChoices||[]).find(source=>source.task===action.task&&action.kind==='choice'&&action.marks?.includes(source.on));if(upstream)return {recoveryKind:'ending',recoveryStage:'choice',endingStage:'choice',recoveryKey:action.task,recoveryTitle:D.tasks[action.task].title};
  const endingTask=Object.values(D.endings||{}).some(ending=>ending.source.task===action.task),mortalTask=D.mortalBody?.source.task===action.task,partnerTask=Object.values(D.partners||{}).some(partner=>partner.source.task===action.task);
  const kind=endingTask?'ending':mortalTask?'mortal':partnerTask?'vow':null;
  const source=mortalTask?D.mortalBody.source:partnerTask?Object.values(D.partners).find(partner=>partner.source.task===action.task).source:null;
  const stage=kind&&action.kind==='choice'?'choice':kind&&action.kind==='claim'&&(endingTask?endingAction(state,action):source.choice===undefined||state.tasks[action.task]?.choice===source.choice)?'claim':null;
  return {recoveryKind:stage?kind:null,recoveryStage:stage,endingStage:kind==='ending'?stage:null,recoveryKey:stage?action.task:null,recoveryTitle:stage?D.tasks[action.task].title:''};
}
function recoveryKeys(){return [...new Set([...(D.recoveryChoices||[]).map(source=>source.task),...Object.values(D.endings||{}).map(ending=>ending.source.task),...Object.values(D.partners||{}).map(partner=>partner.source.task),...(D.mortalBody?[D.mortalBody.source.task]:[]),...(D.sealedPractice?['sealed-'+D.sealedPractice.source.task]:[])])];}
function deriveEnding(state){const reached=Object.values(D.endings||{}).filter(ending=>sourceReached(state,ending.source));if(reached.length>1)fail('多个互斥终局同时成立');return reached[0]?.id||null;}
function deriveEra(state){return (D.eras||[]).filter(era=>sourceReached(state,era.source)).at(-1)||null;}
function personStage(state,id){const reached=(D.people[id]?.lifecycle||[]).filter(phase=>state&&sourceReached(state,phase.source));return reached.findLast(phase=>phase.state==='dead')||reached.at(-1)||null;}
function endingAction(state,action){return action.kind==='claim'?Object.values(D.endings||{}).find(ending=>ending.source.task===action.task&&(ending.source.choice===undefined||state.tasks[action.task]?.choice===ending.source.choice)):null;}
function ready(state,id){const record=state.tasks[id],def=D.tasks[id];return !!record&&requiredObjectiveIds(def).every(key=>record.done.includes(key))&&(!choices(def).length||record.choice!==null);}
function condition(state,rule,world){
  if(!rule)return true;
  if(rule.type==='legacy')return rule.id==='chapterComplete'?world.chapter.complete:rule.id==='adultZhuji'?world.chapter.prologue!=='pending'&&world.chapter.rank===4:false;
  if(rule.type==='partner')return rule.id==='none'?derivePartner(state)===null:derivePartner(state)===rule.id;
  if(rule.type==='gender')return world.gender===rule.id;
  if(rule.type==='currentRealm')return currentRealm(state,world)===rule.id;
  if(rule.type==='ageBand'){const years=age(state,world);return rule.id==='earlyAdult'?years>=18&&years<=40:rule.id==='lateAdult'?years>40:false;}
  if(rule.type==='body')return bodyMode(state)===rule.id;
  if(rule.type==='task')return rule.status==='claimed'?state.tasks[rule.id]?.claimed===true:rule.status==='ready'?ready(state,rule.id):false;
  if(rule.type==='done')return state.tasks[rule.task]?.done.includes(rule.id)||false;
  if(rule.type==='choice')return state.tasks[rule.task]?.choice===rule.id;
  if(rule.type==='token')return state.tokens.includes(rule.id);
  if(rule.type==='evidence')return state.evidence.includes(rule.id);
  if(rule.type==='realm')return state.cultivation.breakthroughs.includes(rule.id);
  if(rule.type==='legacyToken')return ['locket','foxHairpin'].includes(rule.id)&&world.chapter.tokens.includes(rule.id);
  if(rule.type==='backgroundMission')return world.background?.id===rule.id&&world.background.legacy===false&&world.background.missionChoice!==null&&(rule.choice===undefined||world.background.missionChoice===rule.choice);
  if(rule.type==='sectContract'){const contract=world.sectWorld?.contract;if(!contract||typeof contract.claimed!=='boolean'||![null,'honor','pressure'].includes(contract.choice)||contract.claimed&&contract.choice===null)return false;return (contract.claimed?contract.choice:'unsettled')===rule.id;}
  if(rule.type==='personAge'){const years=personAge(state,rule.id,world);return years!==null&&(rule.min===undefined||years>=rule.min)&&(rule.max===undefined||years<=rule.max);}
  if(rule.type==='choiceUnset')return state.tasks[rule.task]?.choice==null;
  if(rule.type==='personUnavailable'){const phase=personStage(state,rule.id);return phase?.state==='dead'||phase?.presentation?.hidden===true;}
  if(rule.type==='pendingVow')return pendingVow(state,rule.id);
  if(rule.type==='originTraining')return world.origin===rule.id&&world.chapter.quests.includes(rule.id);
  return false;
}
function requirements(state,requires={},world,{historical=false}={}){const allowed=rule=>historical&&rule.type==='personAge'||condition(state,rule,world);return (requires.all||[]).every(allowed)&&(!(requires.any||[]).length||requires.any.some(allowed));}
function completed(state,action){
  const record=state.tasks[action.task];if(!record)return false;
  if(action.kind==='accept')return true;
  if(action.kind==='claim')return record.claimed;
  if(action.kind==='sequence')return record.sequence>sequence(D.tasks[action.task]).indexOf(action.id);
  if(action.kind==='choice'&&record.choice!==action.choice)return false;
  return !!action.marks?.length&&action.marks.every(id=>record.done.includes(id));
}
function persistentReason(state,action,world,{replay=false,historical=false}={}){
  const def=D.tasks[action.task],record=state.tasks[action.task];
  if(state.ending)return '此程已至终局；可回看旧卷，或从先前存档续行。';
  const availability=actionAvailabilityReason(state,action,{historical});if(availability)return availability;
  const ending=endingAction(state,action);if(ending&&!requirements(state,ending.requires,world,{historical}))return '终章所需的安置尚未办妥。';
  if(!requirements(state,action.requires,world,{historical}))return '还缺这一步的前置线索或准备。';
  if(action.kind==='accept'){
    if(record)return '这项事务已经接下。';
    if(!requirements(state,def.requires,world,{historical}))return '先完成前面的事务。';
    return transitionReason(state,action,world,{replay,historical});
  }
  if(!record)return '先接下这项事务。';
  if(record.claimed)return '这项事务已经结清。';
  if(action.kind==='claim'&&!ready(state,action.task))return '还有目标未完成。';
  if(action.kind==='sequence'){
    if(record.sequence===sequence(def).length)return '这次操作已经完成。';
    if(replay&&sequence(def)[record.sequence]!==action.id)return '顺序前置尚未满足。';
  }else if(action.kind==='choice'&&record.choice!==null)return '已经作出这次选择。';
  else if(action.marks?.some(id=>record.done.includes(id)))return '这一处已经处理过。';
  if(action.kind==='battle'&&state.battle)return '当前战斗尚未结束。';
  return transitionReason(state,action,world,{replay,historical});
}
function supplyReason(state,action){for(const [id,amount]of Object.entries(action.cost?.supplies||{}))if(state.supplies[id]<amount)return D.supplies[id].title+'不足。';for(const [id,amount]of Object.entries(action.grant?.supplies||{}))if(state.supplies[id]-(action.cost?.supplies?.[id]||0)+amount>D.supplies[id].max)return D.supplies[id].title+'超过本次携带限额。';return '';}
function applyRecord(state,action){
  if(action.kind==='accept')state.tasks[action.task]=emptyTask();
  const record=state.tasks[action.task];
  if(action.kind==='sequence'){
    if(sequence(D.tasks[action.task])[record.sequence]!==action.id){record.sequence=0;return {wrongSequence:true};}
    record.sequence++;
  }
  if(action.kind==='choice')record.choice=action.choice;
  for(const mark of action.marks||[])if(!record.done.includes(mark))record.done.push(mark);
  if(action.kind==='claim')record.claimed=true;
  for(const [id,amount]of Object.entries(action.cost?.supplies||{}))state.supplies[id]-=amount;
  for(const [id,amount]of Object.entries(action.grant?.supplies||{}))state.supplies[id]+=amount;
  for(const type of ['tokens','evidence'])for(const id of action.grant?.[type]||[])if(!state[type].includes(id))state[type].push(id);
  state.cultivation=deriveCultivation(state);state.partnerId=derivePartner(state);state.ending=deriveEnding(state);
  return {wrongSequence:false};
}
function walkable(map,x,y,radius=15){return number(x,40+radius,1240-radius)&&number(y,70+radius,710-radius)&&!map.walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.w)),y-Math.max(w.y,Math.min(y,w.y+w.h)))<radius);}
function sameSet(left,right){return left.length===right.length&&left.every(value=>right.includes(value));}
function validate(raw,world){
  if(Number.isInteger(raw?.revision)&&raw.revision<D.revision){
    if(!legacy||owns(D.maps,world.map)&&!owns(legacyDefinition.maps,world.map))fail('旧修订不能包含新区域');
    const previous=legacy.validate(raw,world),migrated={...previous,revision:D.revision,supplies:{...fresh().supplies,...previous.supplies}};
    if(D.revision>=6&&migrated.battle&&!owns(migrated.battle,'legacySource'))migrated.battle={...copy(migrated.battle),legacySource:legacyBattleDescriptor(migrated.battle,raw.revision)};
    if(D.revision>=7)migrated.historySource=historyDescriptor(raw,world);
    return validate(migrated,world);
  }
  const out=fresh();if(!shape(raw,Object.keys(out))||raw.schema!==1||raw.revision!==D.revision||typeof raw.started!=='boolean')fail('版本或结构');
  if(!shape(raw.supplies,Object.keys(D.supplies))||!object(raw.tasks))fail('事务或随身任务物');
  if(!shape(raw.cultivation,['realmId','breakthroughs'])||raw.cultivation.realmId!==null&&!owns(D.realms||{},raw.cultivation.realmId)||!Array.isArray(raw.cultivation.breakthroughs)||new Set(raw.cultivation.breakthroughs).size!==raw.cultivation.breakthroughs.length||raw.cultivation.breakthroughs.some(id=>!owns(D.realms||{},id))||raw.partnerId!==null&&!owns(D.partners||{},raw.partnerId)||raw.ending!==null&&!owns(D.endings||{},raw.ending))fail('尚未开放的突破、结契或结局');
  for(const [id,amount]of Object.entries(raw.supplies))if(!number(amount,0,D.supplies[id].max,true))fail('任务物数量');
  for(const type of ['tokens','evidence'])if(!Array.isArray(raw[type])||new Set(raw[type]).size!==raw[type].length||raw[type].some(id=>typeof id!=='string'||!owns(D[type],id)))fail(type+'枚举');
  for(const [id,record]of Object.entries(raw.tasks)){
    if(!owns(D.tasks,id)||!shape(record,['done','choice','sequence','claimed']))fail('未知事务或结构');
    const def=D.tasks[id],allowed=objectiveIds(def);
    if(!Array.isArray(record.done)||new Set(record.done).size!==record.done.length||record.done.some(mark=>!allowed.includes(mark))||!number(record.sequence,0,sequence(def).length,true)||typeof record.claimed!=='boolean'||record.choice!==null&&!choices(def).includes(record.choice))fail('事务目标、选择或顺序');
    if(record.claimed&&!ready(raw,id))fail('未达成而领取');
  }
  if(!raw.started&&(Object.keys(raw.tasks).length||raw.tokens.length||raw.evidence.length||raw.battle||Object.values(raw.supplies).some(Boolean)))fail('未启程却有进度');
  const admissionOnly=Object.keys(raw.tasks).length>0&&Object.keys(raw.tasks).every(id=>D.tasks[id].phase==='admission');
  if(raw.started&&!admissionOnly&&(!world.chapter.complete||world.chapter.prologue==='pending'||world.chapter.rank!==4))fail('缺少首章完成来源');
  if(!admissionRecordAllowed(raw,world))fail('早期危险记录不能出现在后期境界');
  if(historyReason(raw))fail(historyReason(raw));
  const history=historySourceContext(raw,world);if(D.revision>=7)out.historySource=copy(raw.historySource);
  const replayWorld={...world,campaign:raw};
  out.started=raw.started;
  // Reconstruct a valid finite action history rather than trusting individually
  // legal flags. This also proves every supply, token and evidence source.
  const pending=Object.values(D.actions).filter(action=>completed(raw,action));
  let changed=true;
  while(changed&&pending.length){
    changed=false;
    for(let i=0;i<pending.length;){
      const action=pending[i],historical=history?.ids.has(action.id),activeWorld=historical?{...history.world,campaign:history.campaign}:replayWorld,historicalPermission=historical&&history.allowed.has(action.id);
      if(history&&!historical&&pending.some(other=>history.ids.has(other.id))||endingAction(out,action)&&pending.length>1||replayClosesWindow(out,action,raw)||replayClosesAbilities(out,action,raw,pending)||replayAdvancesRealm(out,action,pending,activeWorld)||replayRemovesPerson(action,raw,pending)||persistentReason(out,action,activeWorld,{replay:true,historical:historicalPermission})||supplyReason(out,action)){i++;continue;}
      applyRecord(out,action);pending.splice(i,1);changed=true;
    }
  }
  if(pending.length||!sameSet(Object.keys(out.tasks),Object.keys(raw.tasks)))fail('事务前置不可达');
  for(const id of Object.keys(raw.tasks)){const actual=out.tasks[id],wanted=raw.tasks[id];if(!sameSet(actual.done,wanted.done)||actual.choice!==wanted.choice||actual.sequence!==wanted.sequence||actual.claimed!==wanted.claimed)fail('目标、顺序与选择组合不可达');}
  for(const id of Object.keys(D.supplies))if(out.supplies[id]!==raw.supplies[id])fail('任务物来源与消耗不守恒');
  for(const type of ['tokens','evidence'])if(!sameSet(out[type],raw[type]))fail('证据或凭物来源不成立');
  if(raw.cultivation.realmId!==out.cultivation.realmId||JSON.stringify(raw.cultivation.breakthroughs)!==JSON.stringify(out.cultivation.breakthroughs))fail('突破记录缺少实际完成来源');
  const order=D.realmOrder||Object.keys(D.realms||{});if(out.cultivation.breakthroughs.some((id,i)=>order[i]!==id))fail('突破顺序缺少前境界');
  if(raw.partnerId!==out.partnerId)fail('道侣缺少唯一具名结契来源');
  if(bodyMode(out)!=='cultivator'&&(world.mp!==0||world.buffs.ward!==0||world.run||world.chapter.training))fail('归凡后不能保留灵力、护身或仙门试炼');
  if(raw.ending!==out.ending)fail('终局缺少实际完成来源');
  if(out.ending&&!requirements(out,D.endings[out.ending].requires,world))fail('终局前置不成立');
  if(raw.battle!==null){
    const battle=raw.battle;if(!shape(battle,owns(battle||{},'legacySource')?['id','action','enemies','legacySource']:['id','action','enemies'])||!owns(D.encounters,battle.id)||!owns(D.actions,battle.action))fail('战斗结构');
    const action=D.actions[battle.action],def=battleDefinition(battle);
    if(action.kind!=='battle'||action.encounter!==battle.id||completed(out,action)||persistentReason(out,action,world)||world.map!==def.map||world.hp<=0||world.run||world.chapter.training||world.chapter.tomb.stage==='battle'||world.sectWorld?.escort.phase==='battle')fail('战斗来源或地图');
    if(!Array.isArray(battle.enemies)||battle.enemies.length!==def.enemies.length)fail('敌人数量');
    for(let i=0;i<def.enemies.length;i++){const enemy=battle.enemies[i],source=def.enemies[i],keys=source.armor?['id','hp','x','y','armorLeft']:['id','hp','x','y'];if(!shape(enemy,keys)||enemy.id!==source.id||!number(enemy.hp,0,source.maxHp)||source.armor&&!number(enemy.armorLeft,0,source.armor.maxArmor)||!walkable(D.maps[def.map],enemy.x,enemy.y))fail('敌人记录或护甲');}
    if(!battle.enemies.some(enemy=>enemy.hp>0))fail('清场尚未结算');
    if(owns(battle,'legacySource'))validateLegacyBattleHistory(raw,world);
    out.battle=copy(battle);
  }
  if(owns(D.maps,world.map)&&(!out.started||world.hp<=0||world.run||world.chapter.training||world.chapter.tomb.stage==='battle'||world.sectWorld?.escort.phase==='battle'||!requirements(out,D.maps[world.map].requires,world)||!walkable(D.maps[world.map],world.x,world.y)))fail('地图位置、资格或互斥场景');
  return out;
}
function checkDefinitions(items,externalObjects=[],maps=node?require('./data.js').maps:root.XiuxianData.maps){
  const objectsAt=map=>D.maps[map]?.objects||[...externalObjects,...D.entryObjects].filter(object=>object.map===map);
  const validLanding=point=>point&&owns(maps,point.map)&&walkable(maps[point.map],point.x,point.y);
  const checkRequirements=requires=>{for(const rule of [...(requires?.all||[]),...(requires?.any||[])]){
    if(rule.type==='legacy'&&['chapterComplete','adultZhuji'].includes(rule.id))continue;
    if(rule.type==='partner'&&(rule.id==='none'||owns(D.partners||{},rule.id)))continue;
    if(rule.type==='gender'&&['male','female'].includes(rule.id))continue;
    if(rule.type==='ageBand'&&['earlyAdult','lateAdult'].includes(rule.id))continue;
    if(rule.type==='body'&&['mortal','sealed','cultivator'].includes(rule.id))continue;
    if(rule.type==='currentRealm'&&practiceRealms.includes(rule.id))continue;
    if(rule.type==='realm'&&owns(D.realms||{},rule.id))continue;
    if(rule.type==='legacyToken'&&['locket','foxHairpin'].includes(rule.id))continue;
    if(rule.type==='backgroundMission'&&['rain','poor','beggar','caravan','demon'].includes(rule.id)&&shape(rule,rule.choice===undefined?['type','id']:['type','id','choice'])&&(rule.choice===undefined||HistoryBase.backgrounds.backgrounds[rule.id].mission.choices.some(choice=>choice.id===rule.choice)))continue;
    if(rule.type==='sectContract'&&shape(rule,['type','id'])&&['honor','pressure','unsettled'].includes(rule.id))continue;
    if(rule.type==='personAge'&&owns(D.people,rule.id)&&shape(rule,['type','id',...(owns(rule,'min')?['min']:[]),...(owns(rule,'max')?['max']:[])])&&(rule.min!==undefined||rule.max!==undefined)&&(rule.min===undefined||number(rule.min,0,10000,true))&&(rule.max===undefined||number(rule.max,rule.min??0,10000,true))&&(Number.isInteger(D.people[rule.id].ageAtEpoch)||Number.isInteger(D.people[rule.id].age)))continue;
    if(rule.type==='choiceUnset'&&shape(rule,['type','task'])&&owns(D.tasks,rule.task)&&choices(D.tasks[rule.task]).length)continue;
    if(rule.type==='personUnavailable'&&shape(rule,['type','id'])&&owns(D.people,rule.id))continue;
    if(rule.type==='pendingVow'&&shape(rule,['type','id'])&&owns(D.partners||{},rule.id))continue;
    if(rule.type==='originTraining'&&['sword','medicine','scholar'].includes(rule.id))continue;
    if(rule.type==='task'&&owns(D.tasks,rule.id)&&['ready','claimed'].includes(rule.status))continue;
    if(rule.type==='done'&&owns(D.tasks,rule.task)&&objectiveIds(D.tasks[rule.task]).includes(rule.id))continue;
    if(rule.type==='choice'&&owns(D.tasks,rule.task)&&choices(D.tasks[rule.task]).includes(rule.id))continue;
    if(['token','evidence'].includes(rule.type)&&owns(D[rule.type==='token'?'tokens':'evidence'],rule.id))continue;
    throw Error('M2 data: unknown condition '+JSON.stringify(rule));
  }};
  for(const item of [...Object.values(D.maps).flatMap(map=>map.objects||[]),...D.entryObjects])if(item.visibleRequires!==undefined){if(!shape(item.visibleRequires,['all','any'])||!Array.isArray(item.visibleRequires.all)||!Array.isArray(item.visibleRequires.any))throw Error('M5 data: finite object visibility requirements');checkRequirements(item.visibleRequires);}
  const realmIds=Object.keys(D.realms||{}),order=D.realmOrder||realmIds;
  if(D.revision>=3&&(!Array.isArray(D.realmOrder)||!sameSet(order,realmIds)||new Set(order).size!==order.length))throw Error('M4 data: explicit realm order must contain every realm exactly once');
  const checkSource=(source,allowMark=false,allowAccept=false)=>{if(!object(source)||!shape(source,source.choice===undefined?['task','on']:['task','on','choice'])||!owns(D.tasks,source.task)||source.on!=='claimed'&&!(allowAccept&&source.on==='accept')&&(!allowMark||!objectiveIds(D.tasks[source.task]).includes(source.on))||source.choice!==undefined&&!choices(D.tasks[source.task]).includes(source.choice)||!Object.values(D.actions).some(action=>action.task===source.task&&(source.on==='claimed'?action.kind==='claim':source.on==='accept'?action.kind==='accept':action.marks?.includes(source.on))))throw Error('M4 data: invalid derived source');};
  const checkAgeWindow=(window,reason)=>{if(!shape(window,['personId','min',...(owns(window||{},'max')?['max']:[]),...(reason?['closedReason']:[])])||!owns(D.people,window.personId)||!number(window.min,0,10000,true)||window.max!==undefined&&!number(window.max,window.min,10000,true)||reason&&typeof window.closedReason!=='string'||!Number.isInteger(D.people[window.personId].ageAtEpoch)&&!Number.isInteger(D.people[window.personId].age))throw Error('M6-D data: finite person age window');};
  if(D.revision>=7){const compat=D.historyCompatibility;if(!shape(compat,['actionIds'])||!Array.isArray(compat.actionIds)||new Set(compat.actionIds).size!==compat.actionIds.length||compat.actionIds.some(id=>typeof id!=='string'||!owns(D.actions,id)||!owns(battleSourceDefinition(6).actions,id)))throw Error('M6-D data: explicit old affected action allowlist');}

  if(D.revision>=5&&!object(D.cultivationStages))throw Error('M6 data: cultivation stages required');
  if(D.cultivationStages!==undefined){
    if(!shape(D.cultivationStages,practiceRealms))throw Error('M6 data: exactly six practice realms');
    const materials=new Set();
    for(const realm of practiceRealms){
      const def=D.cultivationStages[realm],ids=['middle','late','complete'],task=D.tasks[def?.task],actions=Object.values(D.actions).filter(action=>action.task===def?.task);
      if(!shape(def,['task','stages'])||def.task!=='practice-'+realm||!task||!Array.isArray(def.stages)||def.stages.length!==3||sequence(task).length||choices(task).length||!sameSet(objectiveIds(task),ids.map(id=>'stage-'+id)))throw Error('M6 data: finite three-step practice');
      const accept=actions.filter(action=>action.kind==='accept'),claim=actions.filter(action=>action.kind==='claim'),progress=actions.filter(action=>action.kind==='progress');
      if(actions.length!==5||accept.length!==1||claim.length!==1||progress.length!==3)throw Error('M6 data: practice actions');
      const hasRule=(requires,type,id)=>requires?.all?.some(rule=>rule.type===type&&rule.id===id);
      if(!hasRule(task.requires,'currentRealm',realm)||!hasRule(task.requires,'body','cultivator'))throw Error('M6 data: practice entry ability');
      const supply=Object.keys(accept[0].grant?.supplies||{});
      const empty=cost=>!Object.values(cost||{}).some(bucket=>Array.isArray(bucket)?bucket.length:Object.keys(bucket||{}).length);
      if(supply.length!==1||materials.has(supply[0])||!owns(D.supplies,supply[0])||D.supplies[supply[0]].max!==3||accept[0].grant.supplies[supply[0]]!==3||!empty(accept[0].cost)||Object.keys(accept[0].grant.items||{}).length||accept[0].grant.tokens.length||accept[0].grant.evidence.length||!empty(claim[0].cost)||!empty(claim[0].grant))throw Error('M6 data: finite practice supply');
      materials.add(supply[0]);
      for(let i=0;i<3;i++){
        const stage=def.stages[i],action=progress.find(action=>action.marks?.includes('stage-'+ids[i]));
        if(!shape(stage,['id','name','source','profile','healingBonus'])||stage.id!==ids[i]||stage.name!==['中期','后期','圆满'][i]||stage.source.task!==def.task||stage.source.on!=='stage-'+stage.id||!shape(stage.source,['task','on'])||!shape(stage.profile,['blade','spell','defence','regen'])||!number(stage.healingBonus,0,30,true)||i&&stage.healingBonus<def.stages[i-1].healingBonus)throw Error('M6 data: practice stage source');
        checkSource(stage.source,true);
        for(const [key,max]of Object.entries({blade:80,spell:.5,defence:.15,regen:2}))if(!number(stage.profile[key],0,max)||i&&stage.profile[key]<def.stages[i-1].profile[key])throw Error('M6 data: bounded practice profile');
        if(!action||action.marks.length!==1||!hasRule(action.requires,'currentRealm',realm)||!hasRule(action.requires,'body','cultivator')||i&&!action.requires.all.some(rule=>rule.type==='done'&&rule.task===def.task&&rule.id==='stage-'+ids[i-1])||!shape(action.cost.supplies,[supply[0]])||action.cost.supplies[supply[0]]!==1||Object.keys(action.cost.items).length||!empty(action.grant))throw Error('M6 data: ordered practice consumption');
      }
    }
  }
  for(const task of Object.values(D.tasks))if(task.recommendedPractice!==undefined){const rec=task.recommendedPractice;if(!shape(rec,['realm','stage'])||!owns(D.cultivationStages||{},rec.realm)||rec.stage!=='complete')throw Error('M6 data: practice recommendation');}
  for(const [id,site]of Object.entries(D.restSites||{})){
    if(!id||owns(D.actions,id)||owns(D.exits,id)||!shape(site,['map','objectId','title','detail','requires'])||typeof site.title!=='string'||typeof site.detail!=='string'||!objectsAt(site.map).some(object=>object.id===site.objectId)||!shape(site.requires,['all','any'])||!Array.isArray(site.requires.all)||!Array.isArray(site.requires.any))throw Error('M6 data: finite public rest site');
    checkRequirements(site.requires);
  }

  const recoverySources=new Set();for(const source of D.recoveryChoices||[]){checkSource(source,true);if(source.on==='claimed'||source.choice!==undefined||recoverySources.has(source.task)||!Object.values(D.actions).some(action=>action.task===source.task&&action.kind==='choice'&&action.marks?.includes(source.on)))throw Error('M5 data: recovery choices need a unique actual choice receipt');recoverySources.add(source.task);}
  for(const [id,window]of Object.entries(D.windows||{})){if(!id||!shape(window,['title','requires','closedBy'])||typeof window.title!=='string'||!Array.isArray(window.closedBy)||!window.closedBy.length)throw Error('M5 data: finite entry window');checkRequirements(window.requires);for(const source of window.closedBy)checkSource(source,true,true);}
  for(const group of Object.values(D.exclusiveHistories||{})){if(!shape(group,['title','branches'])||typeof group.title!=='string'||!Array.isArray(group.branches)||group.branches.length<2||new Set(group.branches.map(branch=>branch.id)).size!==group.branches.length)throw Error('M5 data: exclusive history group');for(const branch of group.branches){if(!shape(branch,['id','sources'])||typeof branch.id!=='string'||!Array.isArray(branch.sources)||!branch.sources.length)throw Error('M5 data: exclusive branch');for(const source of branch.sources)checkSource(source,true,true);}}
  const stepIds=new Set();for(const step of D.eraSteps||[]){if(!shape(step,['id','label','years','source'])||typeof step.id!=='string'||stepIds.has(step.id)||typeof step.label!=='string'||!number(step.years,1,100,true))throw Error('M5 data: sourced elapsed years');stepIds.add(step.id);checkSource(step.source,true);}
  for(const [id,partner]of Object.entries(D.partners||{})){const person=D.people[partner.personId],extra=['newPromiseAgeWindow','unfulfilledArchiveSources'].filter(key=>owns(partner,key));if(!['shen','ning','axing','lingyun'].includes(id)||!shape(partner,['personId','source','adultSource','genders',...extra])||extra.length&&id!=='axing'||!person||!(person.adult===true||number(person.age,18,10000,true))||!Array.isArray(partner.genders)||!partner.genders.length||new Set(partner.genders).size!==partner.genders.length||partner.genders.some(gender=>!['female','male'].includes(gender))||partner.source.on!=='claimed'||partner.source.choice!=='vow')throw Error('M5 data: finite adult partner');checkSource(partner.source);checkSource(partner.adultSource,true);if(partner.newPromiseAgeWindow){checkAgeWindow(partner.newPromiseAgeWindow,false);if(partner.newPromiseAgeWindow.personId!==partner.personId)throw Error('M6-D data: promise age person');}if(partner.unfulfilledArchiveSources){const sources=partner.unfulfilledArchiveSources;if(!Array.isArray(sources)||sources.length!==2||!sameSet(sources.map(source=>source.task+'/'+source.on),['clinic-succession/clinic-archive-axing-promise','mortal-clinic-inheritance/inheritance-archive-axing-promise']))throw Error('M6-D data: two named unfinished promise archives');for(const source of sources)checkSource(source,true);}}
  if(D.sealedPractice){const sealed=D.sealedPractice;if(!shape(sealed,['source','title','detail'])||typeof sealed.title!=='string'||typeof sealed.detail!=='string')throw Error('M5 data: finite sealed practice source');checkSource(sealed.source,true);}
  if(D.mortalBody){const body=D.mortalBody;if(!shape(body,['source','title','detail','rules',...(D.revision>=7?['agedFromAge']:[])])||D.revision>=7&&body.agedFromAge!==65||body.source.task!=='mortal-renunciation'||body.source.on!=='claimed'||body.source.choice!=='renounce'||typeof body.title!=='string'||typeof body.detail!=='string'||!Array.isArray(body.rules)||body.rules.some(rule=>typeof rule!=='string'))throw Error('M5 data: sourced mortal body');checkSource(body.source);}
  for(const task of Object.values(D.tasks)){
    if(task.window!==undefined&&!owns(D.windows||{},task.window)||task.exclusiveHistory!==undefined&&!owns(D.exclusiveHistories||{},task.exclusiveHistory))throw Error('M5 data: unknown finite window or history group');
    if(task.requiresLivingPerson!==undefined&&!owns(D.people,task.requiresLivingPerson))throw Error('M5 data: unknown living person requirement');
    if(task.entryAgeWindow!==undefined)checkAgeWindow(task.entryAgeWindow,true);
    if(task.choiceLivingPeople!==undefined){if(!object(task.choiceLivingPeople)||Object.entries(task.choiceLivingPeople).some(([choice,id])=>!choices(task).includes(choice)||!owns(D.people,id)))throw Error('M6-D data: finite choice living people');}
    if(task.phase===undefined)continue;
    if(task.phase!=='admission'||task.id!=='admission-overdraw'||!sameSet(choices(task),['force','leave']))throw Error('M5 data: only the named admission decision is early');
    const terminal=D.endings?.ending_death;if(!terminal||terminal.source.task!==task.id||terminal.source.on!=='claimed'||terminal.source.choice!=='force')throw Error('M5 data: admission ending source');
    for(const action of Object.values(D.actions).filter(action=>action.task===task.id))if(action.map!=='garden'||!['accept','progress','choice','claim'].includes(action.kind)||Object.values(action.cost||{}).some(entry=>Object.keys(entry).length)||Object.values(action.grant||{}).some(entry=>Object.keys(entry).length))throw Error('M5 data: admission decision cannot grant resources or enter other domains');
  }
  for(const action of Object.values(D.actions))if(action.handoffAfter!==undefined){const handoff=action.handoffAfter;if(action.id!=='claim-chen-night-record'||action.task!=='chen-night-record'||action.kind!=='claim'||action.objectId!=='m6ChenDossier'||!shape(handoff,['personId','source'])||handoff.personId!=='chenxuan'||D.tasks[action.task].requiresLivingPerson!==handoff.personId||handoff.source?.task!==action.task||handoff.source?.on!=='chen-seal-own-record')throw Error('M6-D data: only the signed Chen claim can use handoff');checkSource(handoff.source,true);}
  const predecessors=new Set();for(const person of Object.values(D.people))if(person.successorOf!==undefined){if(!owns(D.people,person.successorOf)||person.successorOf===person.id||predecessors.has(person.successorOf)||D.people[person.successorOf].successorOf!==undefined)throw Error('M6-D data: finite successor identity');predecessors.add(person.successorOf);}
  for(const person of Object.values(D.people)){if(person.previousRelationshipTask!==undefined){if(!owns(D.tasks,person.previousRelationshipTask)||!object(person.previousRelationshipChoices))throw Error('M5 data: invalid previous relationship');for(const [choice,view]of Object.entries(person.previousRelationshipChoices))if(!choices(D.tasks[person.previousRelationshipTask]).includes(choice)||typeof view.stage!=='string'||typeof view.detail!=='string')throw Error('M5 data: invalid previous relationship choice');}}
  const memoryTasks=new Set();for(const visit of D.memoryVisits||[]){if(!shape(visit,['task','map','title','until'])||!owns(D.tasks,visit.task)||!owns(D.maps,visit.map)||typeof visit.title!=='string'||visit.until!=='claimed'||memoryTasks.has(visit.task))throw Error('M5 data: finite memory visit');checkSource({task:visit.task,on:'accept'},false,true);checkSource({task:visit.task,on:'claimed'});memoryTasks.add(visit.task);if(!D.maps[visit.map].objects.some(object=>object.memoryTask===visit.task))throw Error('M5 data: memory objects missing');}
  for(const [mapId,map]of Object.entries(D.maps))for(const object of map.objects)if(object.memoryTask!==undefined&&(!(D.memoryVisits||[]).some(visit=>visit.task===object.memoryTask&&visit.map===mapId)||object.role!=='memory'||object.personId!==undefined))throw Error('M5 data: memory objects must be separate from real people');
  const presentationKeys=['name','atlas','cell','height','hidden'];
  for(const person of Object.values(D.people)){if(person.agePresentations===undefined)continue;if(!number(person.ageAtEpoch,0,10000,true)||!Array.isArray(person.agePresentations)||person.agePresentations.length>4)throw Error('M5 data: finite sourced age presentations');let prior=-1;for(const view of person.agePresentations){const p=view.presentation;if(!shape(view,['minimumAge','portrait','presentation'])||!number(view.minimumAge,0,10000,true)||view.minimumAge<=prior||!shape(view.portrait,['atlas','cell'])||typeof view.portrait.atlas!=='string'||!number(view.portrait.cell,0,999,true)||!object(p)||Object.keys(p).some(key=>!['atlas','cell','height'].includes(key))||typeof p.atlas!=='string'||!number(p.cell,0,999,true)||p.height!==undefined&&!number(p.height,1,500))throw Error('M5 data: invalid age-only visual');prior=view.minimumAge;}}
  for(const person of Object.values(D.people)){
    if(person.metSources!==undefined){if(person.id!=='ashi'||person.metSource!==undefined||!Array.isArray(person.metSources)||person.metSources.length!==2||!sameSet(person.metSources.map(source=>source.task+'/'+source.on),['wander-icefield-survey/accept','enlighten-three-witnesses/enlighten-three-witnesses-ashi']))throw Error('M6-D data: two actual Ashi meeting sources');for(const source of person.metSources)checkSource(source,true,true);}
    const source=person.metSource;if(!source)continue;if(source.on==='accept'){if(!shape(source,['task','on'])||!owns(D.tasks,source.task)||!Object.values(D.actions).some(action=>action.task===source.task&&action.kind==='accept'))throw Error('M4 data: invalid person meeting source');}else checkSource(source,true);
  }

  for(const person of Object.values(D.people||{})){if(person.ageAtEpoch!==undefined&&!number(person.ageAtEpoch,0,10000,true))throw Error('M4 data: invalid person age epoch');if(person.lifecycle!==undefined&&!Array.isArray(person.lifecycle))throw Error('M4 data: invalid lifecycle');let deceased=false;for(const phase of person.lifecycle||[]){checkSource(phase.source,true);if(!['alive','injured','dead'].includes(phase.state)||typeof phase.detail!=='string'||deceased&&phase.state!=='dead'||phase.ageText!==undefined&&typeof phase.ageText!=='string')throw Error('M4 data: invalid person phase');deceased=phase.state==='dead';const view=phase.presentation||{};if(!object(view)||Object.keys(view).some(key=>!presentationKeys.includes(key))||view.name!==undefined&&typeof view.name!=='string'||view.atlas!==undefined&&view.atlas!==null&&typeof view.atlas!=='string'||view.cell!==undefined&&!number(view.cell,0,999,true)||view.height!==undefined&&!number(view.height,0,500)||view.hidden!==undefined&&typeof view.hidden!=='boolean'||deceased&&view.hidden===false)throw Error('M4 data: invalid finite person presentation');}}
  const bindings=new Set();for(const binding of D.personBindings||[]){const key=binding.map+':'+binding.objectId,known=[...(D.maps[binding.map]?.objects||[]),...(maps[binding.map]?.objects||[]),...externalObjects,...D.entryObjects.filter(object=>object.map===binding.map)];if(!shape(binding,['map','objectId','personId'])||!owns(maps,binding.map)||!owns(D.people,binding.personId)||bindings.has(key)||!known.some(object=>object.id===binding.objectId))throw Error('M4 data: invalid person binding');bindings.add(key);}
  for(const task of Object.values(D.tasks)){if(task.group!==undefined&&!['governance','war'].includes(task.group))throw Error('M4 data: invalid journal group');for(const [choice,detail]of Object.entries(task.choiceDetails||{}))if(!choices(task).includes(choice)||!shape(detail,['label','consequences'])||typeof detail.label!=='string'||!Array.isArray(detail.consequences)||detail.consequences.some(text=>typeof text!=='string'))throw Error('M4 data: invalid choice presentation');}
  for(let i=0;i<order.length;i++){const realm=D.realms[order[i]],sources=realmSources(realm);if(realm.alternativeSources!==undefined&&!Array.isArray(realm.alternativeSources)||new Set(sources.map(source=>source.task)).size!==sources.length)throw Error('M5 data: duplicate realm sources');for(const source of sources){checkSource(source);if(source.choice!==undefined)throw Error('M4 data: realm source is a claimed task, not a choice');if(i>0&&!(D.tasks[source.task].requires?.all||[]).some(rule=>rule.type==='realm'&&rule.id===order[i-1]))throw Error('M4 data: realm task must require previous realm');}}
  if(D.eras!==undefined&&!Array.isArray(D.eras)||D.endings!==undefined&&!object(D.endings))throw Error('M4 data: derived declarations must be finite arrays and objects');
  if(D.baseAge!==undefined&&!number(D.baseAge,18,200,true))throw Error('M4 data: invalid age epoch');
  let years=-1;const eraIds=new Set();for(const era of D.eras||[]){checkSource(era.source,true);if(typeof era.id!=='string'||!era.id||eraIds.has(era.id)||typeof era.label!=='string'||!number(era.elapsedYears,0,10000,true)||era.elapsedYears<years)throw Error('M4 data: invalid finite era');eraIds.add(era.id);years=era.elapsedYears;}
  const terminalSources=[];for(const [id,ending]of Object.entries(D.endings||{})){checkSource(ending.source);checkRequirements(ending.requires);if(id!==ending.id||!id.startsWith('ending_')||typeof ending.title!=='string'||terminalSources.some(source=>source.task===ending.source.task&&(source.choice===undefined||ending.source.choice===undefined||source.choice===ending.source.choice)))throw Error('M4 data: invalid or overlapping ending source');terminalSources.push(ending.source);if(ending.recap!==undefined&&!Array.isArray(ending.recap))throw Error('M4 data: invalid ending recap');for(const entry of ending.recap||[]){if(typeof entry.title!=='string'||typeof entry.text!=='string')throw Error('M4 data: invalid ending recap');checkRequirements(entry.requires);}}
  for(const [id,realm]of Object.entries(D.realms||{})){
    if(id!==realm.id||!owns(D.tasks,realm.source?.task)||realm.source.on!=='claimed'||!shape(realm.profile,['blade','spell','defence','regen'])||!number(realm.profile.blade,0,250)||!number(realm.profile.spell,0,5)||!number(realm.profile.defence,0,.85)||!number(realm.profile.regen,0,15))throw Error('M3 data: invalid realm profile or source');
  }
  for(const [id,task]of Object.entries(D.tasks)){if(id!==task.id||new Set(objectiveIds(task)).size!==objectiveIds(task).length||!Array.isArray(requiredObjectiveIds(task))||!requiredObjectiveIds(task).length||new Set(requiredObjectiveIds(task)).size!==requiredObjectiveIds(task).length||requiredObjectiveIds(task).some(mark=>!objectiveIds(task).includes(mark)))throw Error('M2 data: task objectives');checkRequirements(task.requires);for(const actionId of sequence(task))if(!owns(D.actions,actionId)||D.actions[actionId].task!==id||D.actions[actionId].kind!=='sequence')throw Error('M2 data: sequence');
    for(const [choice,modifier]of Object.entries(task.combatModifiers||{}))if(!choices(task).includes(choice)||!object(modifier)||!Object.keys(modifier).length||Object.entries(modifier).some(([key,value])=>!owns({blade:20,spell:.3,defence:.1,regen:2},key)||!number(value,0,{blade:20,spell:.3,defence:.1,regen:2}[key])))throw Error('M3 data: invalid finite training modifier');
  }
  for(const [id,action]of Object.entries(D.actions)){
    if(id!==action.id||!owns(D.tasks,action.task)||!['accept','progress','sequence','choice','battle','claim'].includes(action.kind))throw Error('M2 data: action');
    if(!owns(maps,action.map)||!objectsAt(action.map).some(object=>object.id===action.objectId))throw Error('M2 data: missing action object '+id);
    if((action.marks||[]).some(mark=>!objectiveIds(D.tasks[action.task]).includes(mark)))throw Error('M2 data: unknown mark');
    if(['progress','choice','battle'].includes(action.kind)&&!action.marks?.length)throw Error('M2 data: progress needs a receipt');
    if(action.kind==='choice'&&!choices(D.tasks[action.task]).includes(action.choice))throw Error('M2 data: unknown choice');
    if(action.kind==='battle'&&(!owns(D.encounters,action.encounter)||D.encounters[action.encounter].map!==action.map||Object.keys(action.cost?.supplies||{}).length||Object.keys(action.cost?.items||{}).length||Object.keys(action.grant?.supplies||{}).length||Object.keys(action.grant?.items||{}).length))throw Error('M2 data: battle must match its map and pay no entry cost or immediate loot');
    if(action.kind==='sequence'&&!sequence(D.tasks[action.task]).includes(id))throw Error('M2 data: sequence action not declared');
    if(action.kind==='sequence'&&sequence(D.tasks[action.task]).at(-1)!==id&&(Object.keys(action.cost?.supplies||{}).length||Object.keys(action.cost?.items||{}).length||Object.keys(action.grant||{}).some(key=>Object.keys(action.grant[key]).length)||action.marks?.length))throw Error('M2 data: only last sequence action commits');
    for(const type of ['cost','grant'])for(const category of ['items','supplies'])for(const [key,amount]of Object.entries(action[type]?.[category]||{}))if(!owns(category==='items'?items:D.supplies,key)||!number(amount,1,999,true))throw Error('M2 data: unknown or invalid quantity');
    for(const type of ['tokens','evidence'])for(const key of action.grant?.[type]||[]){if(!owns(D[type],key))throw Error('M2 data: unknown receipt');const source=D[type][key].source;if(!source||source.task!==action.task||!(action.kind==='accept'&&source.on==='accept'||action.kind==='claim'&&source.on==='claimed'||action.marks?.includes(source.on)))throw Error('M2 data: receipt source differs from actual action '+key);}checkRequirements(action.requires);
  }
  const budgetedEncounters=new Set();
  if(D.revision>=6){
    if(!object(D.combatBudgets))throw Error('M6 data: combat budgets');
    const realmOrder=['zhuji',...(D.realmOrder||[])],sourceRealms=new Map();
    for(const [id,realm]of Object.entries(D.realms||{}))for(const source of realmSources(realm))sourceRealms.set(source.task,realmOrder[realmOrder.indexOf(id)-1]);
    for(const [id,budget]of Object.entries(D.combatBudgets)){
      if(!shape(budget,['sourceId','task','realm','hp','damage','armor','encounters'])||budget.sourceId!==id||!owns(D.tasks,budget.task)||sourceRealms.get(budget.task)!==budget.realm||!number(budget.hp,1,40000,true)||!number(budget.damage,1,200,true)||!shape(budget.armor,['maxArmor'])||!number(budget.armor.maxArmor,1,40000,true)||!Array.isArray(budget.encounters)||!budget.encounters.length||new Set(budget.encounters).size!==budget.encounters.length)throw Error('M6 data: combat budget source');
      for(const encounterId of budget.encounters){
        const encounter=D.encounters[encounterId],actions=Object.values(D.actions).filter(action=>action.kind==='battle'&&action.encounter===encounterId);
        if(!encounter||encounter.budgetSource!==id||budgetedEncounters.has(encounterId)||actions.length!==1||actions[0].task!==budget.task||actions[0].map!==encounter.map)throw Error('M6 data: combat budget encounter binding');
        budgetedEncounters.add(encounterId);const count=encounter.enemies.length;
        for(const [i,enemy]of encounter.enemies.entries()){
          const hp=Math.floor(budget.hp/count)+(i<budget.hp%count?1:0),armor=Math.floor(budget.armor.maxArmor/count)+(i<budget.armor.maxArmor%count?1:0);
          if(enemy.maxHp!==hp||enemy.damage!==Math.round(budget.damage/Math.sqrt(count))||!shape(enemy.armor,['kind','maxArmor'])||!['sentinel','keeper'].includes(enemy.armor.kind)||enemy.armor.maxArmor!==armor)throw Error('M6 data: fixed enemy budget or armor');
        }
      }
    }
    for(const task of sourceRealms.keys())for(const action of Object.values(D.actions).filter(action=>action.task===task&&action.kind==='battle'))if(!budgetedEncounters.has(action.encounter))throw Error('M6 data: missing breakthrough combat budget');
  }
  for(const [id,encounter]of Object.entries(D.encounters)){
    if(encounter.id!==id||!owns(D.maps,encounter.map)||!encounter.enemies.length||encounter.enemies.length>4||new Set(encounter.enemies.map(e=>e.id)).size!==encounter.enemies.length)throw Error('M2 data: encounter');
    if(owns(encounter,'budgetSource')&&!budgetedEncounters.has(id))throw Error('M6 data: undeclared combat budget');
    for(const enemy of encounter.enemies){
      if(!['stone','sprite'].includes(enemy.kind)||!number(enemy.maxHp,1,10000)||!number(enemy.damage,1,200)||!number(enemy.speed,1,200)||!walkable(D.maps[encounter.map],enemy.x,enemy.y))throw Error('M2 data: enemy template');
      if(owns(enemy,'armor')&&(!budgetedEncounters.has(id)||!shape(enemy.armor,['kind','maxArmor'])||!['sentinel','keeper'].includes(enemy.armor.kind)||!number(enemy.armor.maxArmor,1,10000,true)))throw Error('M6 data: finite enemy armor');
    }
  }
  for(const map of Object.values(D.maps))checkRequirements(map.requires);
  for(const [id,exit]of Object.entries(D.exits)){checkRequirements(exit.requires);if(exit.id!==id||!objectsAt(exit.map).some(object=>object.id===exit.objectId)||!validLanding(exit.to))throw Error('M2 data: invalid exit or landing');}
  for(const encounter of Object.values(D.encounters))if(!validLanding(encounter.returnTo))throw Error('M2 data: invalid retreat landing');
  return true;
}
const api={fresh,validate,battleDefinition,battleSourceInfo,realmSources,currentRealm,cultivationStage,bodyMode,derivePartner,historyReason,windowReason,admissionEligible,admissionRecordAllowed,age,memoryVisit,eraSteps,recoveryDescriptor,recoveryKeys,deriveCultivation,deriveEra,deriveEnding,personStage,personTaskReason,sourceReached,endingAction,ready,condition,requirements,persistentReason,supplyReason,applyRecord,completed,walkable,checkDefinitions,objectiveIds,requiredObjectiveIds,choices,sequence,copy};
return {...api,actionAvailabilityReason,personAge,personMet};
}
const api=createState(D,Legacy);api.createState=createState;
if(node)module.exports=api;else root.XiuxianCampaignState=api;
})(globalThis);
