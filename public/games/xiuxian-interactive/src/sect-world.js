(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const W=node?require('./sect-world-data.js'):root.XiuxianSectWorldData;
  const Base=node?require('./sects.js'):root.XiuxianEngine,Items=node?require('./data.js'):root.XiuxianData;
  const copy=v=>JSON.parse(JSON.stringify(v)),own=(o,k)=>Object.hasOwn(o,k);
  const recipe=['herb','water','paper'],pickupIds=['gather-herb','gather-water','gather-paper'];
  const blocking=['dialogue','chapter','story','expedition','expeditionEnd','complete','defeat','sectWorld'];
  const fresh=()=>({schema:1,visited:false,station:{accepted:false,gathered:[],recipe:0,prepared:false,claimed:false},escort:{accepted:false,phase:'idle',enemies:[],casts:{covenant:0,ravage:0},outcome:null,attempts:0},contract:{inspected:false,choice:null,claimed:false,supplyTaken:false}});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>own(v,k));
  const num=(v,min,max,integer=false)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max&&(!integer||Number.isInteger(v));
  const inWorld=map=>W.mapIds.includes(map);
  const enemyDefs=()=>W.encounter.enemies;
  const outcome=q=>q.casts.ravage?'ravage':q.casts.covenant?'covenant':'guard';
  const walkable=(map,x,y,r=15)=>num(x,40+r,1240-r)&&num(y,70+r,710-r)&&!Items.maps[map].walls.some(w=>Math.hypot(x-Math.max(w.x,Math.min(x,w.x+w.w)),y-Math.max(w.y,Math.min(y,w.y+w.h)))<r);
  function validateSave(value){
    const originalMap=value?.map,projected=inWorld(originalMap),fail=()=>{throw Error('宗门药站行旅记录异常。');};
    if(projected&&value.version!==4)fail();
    // Legacy expedition validation only permits its two non-run maps. This is a
    // validation-only projection; the real map is checked by this domain below.
    const s=Base.validateSave(projected?{...value,map:'garden'}:value),v=value.sectWorld;s.map=originalMap;
    if(v===undefined){if(inWorld(s.map))fail();s.sectWorld=fresh();return s;}
    const empty=fresh();
    if(!shape(v,Object.keys(empty))||v.schema!==1||typeof v.visited!=='boolean')fail();
    for(const key of ['station','escort','contract'])if(!shape(v[key],Object.keys(empty[key])))fail();
    const a=v.station,e=v.escort,c=v.contract;
    for(const flag of [a.accepted,a.prepared,a.claimed,e.accepted,c.inspected,c.claimed,c.supplyTaken])if(typeof flag!=='boolean')fail();
    if(!Array.isArray(a.gathered)||a.gathered.length>3||new Set(a.gathered).size!==a.gathered.length||a.gathered.some(id=>!pickupIds.includes(id))||!num(a.recipe,0,3,true))fail();
    if(!a.accepted&&(a.gathered.length||a.recipe||a.prepared||a.claimed)||a.recipe>0&&a.gathered.length!==3||a.prepared!==(a.recipe===3)||a.claimed&&!a.prepared)fail();
    if(!['idle','battle','cleared','claimed'].includes(e.phase)||!num(e.attempts,0,999,true)||!shape(e.casts,['covenant','ravage'])||!['covenant','ravage',null,'guard'].includes(e.outcome))fail();
    for(const id of ['covenant','ravage'])if(!num(e.casts[id],0,1000000,true)||e.casts[id]>s.sect.effective[id])fail();
    if(!Array.isArray(e.enemies)||!e.accepted&&(e.phase!=='idle'||e.attempts)||e.accepted&&!a.claimed)fail();
    if(e.phase==='idle'&&(e.enemies.length||e.outcome!==null||e.casts.covenant||e.casts.ravage))fail();
    if(e.phase!=='idle'&&(!e.accepted||!e.attempts))fail();
    if(['battle','cleared'].includes(e.phase)){
      if(e.enemies.length!==enemyDefs().length)fail();
      for(let i=0;i<enemyDefs().length;i++){
        const d=enemyDefs()[i],f=e.enemies[i];
        if(!shape(f,['id','hp','x','y'])||f.id!==d.id||!num(f.hp,0,d.maxHp)||!walkable(W.hubId,f.x,f.y))fail();
      }
      if(e.phase==='battle'&&(!e.enemies.some(f=>f.hp>0)||!inWorld(s.map)||e.outcome!==null)||e.phase==='cleared'&&(e.enemies.some(f=>f.hp>0)||e.outcome!==outcome(e)))fail();
    }
    if(e.phase==='claimed'&&(e.enemies.length||e.outcome!==outcome(e)))fail();
    if(![null,'honor','pressure'].includes(c.choice)||c.claimed!==(c.choice!==null)||c.claimed&&!c.inspected||c.inspected&&e.phase!=='claimed'||c.supplyTaken&&c.choice!=='honor')fail();
    if(!v.visited&&(a.accepted||e.accepted||c.inspected)||v.visited&&(s.chapter.prologue==='pending'||s.chapter.rank!==4))fail();
    if(inWorld(s.map)&&(!v.visited||s.hp<=0||s.run||s.chapter.training||s.chapter.tomb.stage==='battle'||!walkable(s.map,s.x,s.y)))fail();
    s.sectWorld=copy(v);return s;
  }
  function foe(def,snapshot=def){return {...copy(def),hp:snapshot.hp??def.maxHp,x:snapshot.x,y:snapshot.y,slow:0,burn:0,wind:0,cooldown:1,targetX:snapshot.x,targetY:snapshot.y};}
  class Game extends Base.Game{
    constructor(options={}){
      const saved=options.save?validateSave(options.save):null;super(saved?{...options,save:{...saved,map:inWorld(saved.map)?'garden':saved.map}}:options);
      if(saved)Object.assign(this.state,{map:saved.map,x:saved.x,y:saved.y});
      this.state.sectWorld=saved?copy(saved.sectWorld):fresh();
      const e=this.state.sectWorld.escort;
      if(e.enemies.length)e.enemies=e.enemies.map((s,i)=>foe(enemyDefs()[i],s));
      this.sectDropSuppression=0;
    }
    inSectWorld(){return inWorld(this.state.map);}
    sectWorldBusy(){return this.events.some(e=>blocking.includes(e.type));}
    sectWorldSafeReason(){
      if(this.isChild()||this.state.chapter.rank<4)return '成年并完成筑基修行后，才可前往药站。';
      if(this.state.hp<=0||this.state.run||this.state.chapter.training||this.state.chapter.tomb.stage==='battle'||this.activeEnemies().some(e=>e.hp>0))return '先结束当前试炼或战斗。';
      if(this.sectWorldBusy())return '先处理当前对话或结算。';return '';
    }
    sectWorldEntryReason(){
      const reason=this.sectWorldSafeReason();if(reason)return reason;
      if(this.state.map!=='garden')return '从药庐的合欢宗山道出发。';
      if(Base.distance(this.state,W.entryObject)>=93)return '走近药庐的合欢宗山道，再启程。';return '';
    }
    enterSectWorld(){
      const reason=this.sectWorldEntryReason();if(reason){this.message(reason);return false;}
      this.state.sectWorld.visited=true;this.travel(W.entry.map,W.entry.x,W.entry.y);this.events.push({type:'map'});this.message('来到'+Items.maps[W.entry.map].name+'。药站事务可自由参与，不必入宗。');return true;
    }
    leaveSectWorld(){
      if(!this.inSectWorld()||this.state.hp<=0)return false;
      if(this.state.sectWorld.escort.phase==='battle'){this.message('护路交战尚未结束；可在公示簿明确选择撤回药庐。');return false;}
      if(!this.sectWorldNear('hehuanReturn')){this.message('走近回药庐的出口。');return false;}
      this.travel(W.return.map,W.return.x,W.return.y);this.events.push({type:'map'});return true;
    }
    travel(map,x,y){
      if(this.inSectWorld()&&this.state.sectWorld?.escort.phase==='battle'&&map!==this.state.map){this.message('护路尚未结束，请明确撤退后再离开。');return false;}
      if(inWorld(map)&&!this.state.sectWorld?.visited)return false;
      return super.travel(map,x,y);
    }
    sectWorldNear(id){const o=id===W.entryObject.id?W.entryObject:Items.maps[W.hubId].objects.find(o=>o.id===id);return !!o&&Base.distance(this.state,o)<93;}
    objects(){
      if(this.inSectWorld())return Items.maps[this.state.map].objects.map(o=>o.id==='stationMerchant'&&this.state.sectWorld?.contract.choice==='pressure'?{...o,name:'陆青禾的交割回执',role:'ledger',person:null,artKey:null,atlas:'chapterProps',cell:12,height:45}:o);
      const list=super.objects();return this.state.map==='garden'?[...list,W.entryObject]:list;
    }
    interact(){
      const o=this.nearest();if(o?.id===W.entryObject.id){this.events.push({type:'sectWorld',panel:'entrance'});return;}
      if(!this.inSectWorld())return super.interact();
      if(!o||this.state.hp<=0)return false;
      this.events.push({type:'sectWorld',panel:o.id==='stationBoard'?'board':o.id});return true;
    }
    sectWorldActionReward(id){
      const reward={...W.actions[id]?.reward};
      if(id==='gather-herb')reward.herb+=this.recipeBonus;
      if(id==='claim-escort')for(const [item,n]of Object.entries(W.encounter.bonus[this.state.sectWorld.escort.outcome]||{}))reward[item]=(reward[item]||0)+n;
      return reward;
    }
    sectWorldInventoryReason(cost={},reward={}){
      for(const [id,n]of Object.entries(cost))if(this.state.inventory[id]<n)return Items.items[id].name+'不足，备齐整份材料后再办理。';
      for(const [id,n]of Object.entries(reward))if(this.state.inventory[id]-(cost[id]||0)+n>999)return Items.items[id].name+'将超过行囊上限，先腾出位置。';return '';
    }
    sectWorldActionReason(id){
      if(id==='enter-world')return this.sectWorldEntryReason();
      if(id==='leave-world')return !this.inSectWorld()?'先来到药站。':this.state.sectWorld.escort.phase==='battle'?'交战中须明确撤退。':!this.sectWorldNear('hehuanReturn')?'走近回程出口。':'';
      if(id==='retreat-escort')return this.inSectWorld()&&this.state.sectWorld.escort.phase==='battle'?'':'当前没有需要撤退的护路战斗。';
      if(typeof id!=='string'||!own(W.actions,id))return '没有这个药站行动。';const action=W.actions[id];
      if(!this.inSectWorld()||this.state.hp<=0)return '请到合欢宗药站办理。';
      if(!this.sectWorldNear(action.objectId))return '请走近'+(Items.maps[W.hubId].objects.find(o=>o.id===action.objectId)?.name||'对应物件')+'。';
      if(this.sectWorldBusy())return '先处理当前对话或结算。';
      const w=this.state.sectWorld,a=w.station,e=w.escort,c=w.contract;
      if(e.phase==='battle')return '先结束护路战斗，或明确撤回药庐。';
      if(id==='accept-station'&&a.accepted)return '已经接下药案筹备。';
      if(pickupIds.includes(id)&&(!a.accepted||a.gathered.includes(id)))return !a.accepted?'先与云照议定药案筹备。':'这一份物资已经取过。';
      if(id.startsWith('mix-')){
        if(!a.accepted||a.gathered.length!==3)return '先接下筹备，并亲手查看三处物资。';
        if(a.prepared)return '这份药已经配好，交给云照验收。';
        if(id==='mix-paper'&&a.recipe===2)return this.sectWorldInventoryReason(action.cost);
        return '';
      }
      if(id==='claim-station'&&(!a.prepared||a.claimed))return a.claimed?'药案奖励已经领取。':'先在药案完成配伍。';
      if(id==='accept-escort'&&(!a.claimed||e.accepted))return e.accepted?'已接下护路委托。':'先开办药站，再议追回药车。';
      if(id==='start-escort'&&(!e.accepted||e.phase!=='idle'||e.attempts>=999))return !e.accepted?'先与秦鹭接下护路委托。':e.attempts>=999?'护路重试记录已到上限。':'本次护路已有结果，先处理药车。';
      if(id==='claim-escort'&&e.phase!=='cleared')return e.phase==='claimed'?'药车已交割，奖励只领一次。':'先击退拦路役傀。';
      if(id==='read-contract'&&(e.phase!=='claimed'||c.inspected))return c.inspected?'账册已经查验，可与陆青禾商议。':'先交割追回的药车。';
      if(['settle-honor','settle-pressure'].includes(id)&&(!c.inspected||c.claimed))return c.claimed?'双方的交割已记入账册，不能换一次结果。':'先亲手查验运药账册。';
      if(id==='take-supply'&&(c.choice!=='honor'||c.supplyTaken))return c.supplyTaken?'约定的一份药已取过。':'守约结算后，才有这份后续供药。';
      return this.sectWorldInventoryReason(action.cost,this.sectWorldActionReward(id));
    }
    nextStationIngredient(){return recipe[this.state.sectWorld.station.recipe];}
    sectWorldAction(id){
      const reason=this.sectWorldActionReason(id);if(reason){this.message(reason);return false;}
      if(id==='enter-world')return this.enterSectWorld();
      if(id==='leave-world')return this.leaveSectWorld();
      if(id==='retreat-escort'){this.endSectWorldBattle(false);return true;}
      const a=this.state.sectWorld.station,e=this.state.sectWorld.escort,c=this.state.sectWorld.contract,def=W.actions[id];
      if(id.startsWith('mix-')){
        const item=id.slice(4);if(item!==this.nextStationIngredient()){a.recipe=0;this.message('配伍顺序不对：先辨草、再润药、最后包药。材料未扣。');this.checkpoint();return true;}
        a.recipe++;if(a.recipe===3){for(const [item,n]of Object.entries(def.cost||{}))this.state.inventory[item]-=n;a.prepared=true;}
      }else{
        for(const [item,n]of Object.entries(def.cost||{}))this.state.inventory[item]-=n;
        for(const [item,n]of Object.entries(this.sectWorldActionReward(id)))this.gain(item,n);
        if(id==='accept-station')a.accepted=true;
        else if(pickupIds.includes(id))a.gathered.push(id);
        else if(id==='claim-station')a.claimed=true;
        else if(id==='accept-escort')e.accepted=true;
        else if(id==='start-escort'){e.phase='battle';e.enemies=enemyDefs().map(d=>foe(d));e.casts={covenant:0,ravage:0};e.outcome=null;e.attempts++;this.resetTransient();}
        else if(id==='claim-escort'){e.phase='claimed';e.enemies=[];this.resetTransient();}
        else if(id==='read-contract')c.inspected=true;
        else if(id==='settle-honor'||id==='settle-pressure'){c.choice=id==='settle-honor'?'honor':'pressure';c.claimed=true;}
        else if(id==='take-supply')c.supplyTaken=true;
      }
      this.message(def.result||def.label+'已记入药站公示簿。');this.checkpoint();return true;
    }
    performSectWorldAction(id){return this.sectWorldAction(id);}
    sectWorldReputation(){
      const w=this.state.sectWorld,opening=w?.station.claimed?W.quests.station.reputation:{},trade=w?.contract.choice?W.quests.contract.branches[w.contract.choice].reputation:{};
      return {honor:(opening.honor||0)+(trade.honor||0),fame:(opening.fame||0)+(trade.fame||0)};
    }
    sectWorldStatus(){
      const w=this.state.sectWorld,{honor:taskHonor,fame:taskFame}=this.sectWorldReputation();
      return {name:Items.maps[W.hubId].name,inWorld:this.inSectWorld(),visited:w.visited,entryReason:this.sectWorldEntryReason(),station:w.station.claimed?'claimed':w.station.prepared?'prepared':w.station.accepted?'active':'available',escort:w.escort.phase,contract:w.contract.choice,taskHonor,taskFame,merit:Number(w.station.claimed)+Number(w.escort.phase==='claimed')+Number(w.contract.claimed),record:copy(w)};
    }
    sectWorldPanel(panel='board'){
      const object=this.objects().find(o=>o.id===panel),group=object?.panel,ids=panel==='entrance'?['enter-world']:panel==='hehuanReturn'?['leave-world']:Object.keys(W.actions).filter(id=>panel==='board'||W.actions[id].objectId===panel);
      if(this.inSectWorld()&&this.state.sectWorld.escort.phase==='battle')ids.push('retreat-escort');
      const extras={'enter-world':{label:'沿山道前往药站',detail:'成年筑基即可拜访，不自动入宗。'},'leave-world':{label:'回药庐',detail:'已得物资和任务进展保留。'},'retreat-escort':{label:'结束本次护路，撤回药庐',detail:'已花符药不退；保留永久成长、药站与宗门实践记录，本场重新挑战。'}};
      const w=this.state.sectWorld,status=this.sectWorldStatus();
      let text=W.dialogues.welcome;
      if(group==='rules')text=W.dialogues.rules;
      else if(group==='station')text=[W.dialogues.station[w.station.claimed?'review':w.station.prepared?'prepared':'offer'],W.dialogues.station.recipe,W.quests.station.warning].join('\n\n');
      else if(group==='escort')text=[W.dialogues.escort[w.escort.outcome||'offer'],W.dialogues.escort.prepare,W.quests.escort.warning,W.encounter.failure].join('\n\n');
      else if(group==='contract')text=[w.contract.choice?W.dialogues.contract[w.contract.choice==='pressure'?'departed':'honor']:W.dialogues.contract.offer,W.quests.contract.ledger,W.quests.contract.warning].join('\n\n');
      else if(panel==='board')text+=[...Object.values(W.quests).map(q=>q.name+'：'+q.summary)].join('\n\n');
      const items=o=>Object.entries(o||{}).map(([id,n])=>Items.items[id].name+' ×'+n).join('、');
      return {title:panel==='entrance'?'合欢宗山道':object?.name||'药站公示簿',subtitle:'药案、护路与守约 · 已办 '+status.merit+'/3 事',text,status,recipeStep:w.station.recipe,actions:ids.map(id=>{const d=W.actions[id]||extras[id],reason=this.sectWorldActionReason(id),reward=W.actions[id]?this.sectWorldActionReward(id):{};const rep=Object.entries(d.reputation||{}).filter(([,n])=>n).map(([key,n])=>(key==='honor'?'清誉':'威名')+' '+(n>0?'+':'')+n).join('、');const detail=[d.detail,d.cost&&Object.keys(d.cost).length?'消耗：'+items(d.cost):'',Object.keys(reward).length?'所得：'+items(reward):'',rep,d.after||''].filter(Boolean).join('；');return {id,label:d.label,detail,reason,available:!reason};})};
    }
    sectPlaceReason(){
      if(!this.inSectWorld())return super.sectPlaceReason();
      const reason=this.sectWorldSafeReason();return reason||(!this.sectWorldNear('yunStation')?'到云照身边办理宗门事务。':'');
    }
    sectReputation(){
      if(!this.state.sectWorld)return super.sectReputation();
      const s=this.state.sect,task=this.sectWorldReputation(),care=s.donations+s.levels.dual*2+s.levels.siphon;
      const honor=Math.max(-99,Math.min(99,care+s.effective.covenant-s.effective.ravage*2+task.honor)),fame=Math.min(99,s.effective.ravage+task.fame);
      const label=!s.id?'未入宗':honor<0?'锋芒多争议':fame>0?'恩威并见':honor>=6?'守约济行':'尚待观察';
      return {honor,fame,label,detail:super.sectReputation().detail+' 药站验收 +1 清誉；守约交割 +2 清誉；威压交割 −2 清誉、+2 威名。任务不增加修习贡献。'};
    }
    activeEnemies(){return this.inSectWorld()?this.state.sectWorld?.escort.phase==='battle'?this.state.sectWorld.escort.enemies:[]:super.activeEnemies();}
    canFight(){return this.inSectWorld()?this.state.hp>0&&this.state.sectWorld?.escort.phase==='battle':super.canFight();}
    combatReady(){return !this.events.some(e=>e.type==='sectWorld')&&super.combatReady();}
    attack(target){if(this.inSectWorld()&&!this.canFight())return false;return super.attack(target);}
    castSkill(){if(this.inSectWorld()&&!this.canFight())return false;const ok=super.castSkill();this.checkSectWorldClear();return ok;}
    useItem(id,target){if(this.inSectWorld()&&!this.canFight()&&['fire','needle','incense'].includes(id))return false;return super.useItem(id,target);}
    castSectSkill(id,target){
      const e=this.state.sectWorld?.escort,tracking=this.inSectWorld()&&e.phase==='battle',before=this.state.sect.effective[id]||0;
      const ok=super.castSectSkill(id,target);
      if(ok&&tracking&&own(e.casts,id))e.casts[id]+=Math.max(0,this.state.sect.effective[id]-before);
      this.checkSectWorldClear();return ok;
    }
    gain(id,amount){if(this.sectDropSuppression>0&&id==='dust'&&amount===2)return;return super.gain(id,amount);}
    hitEnemy(e,amount){
      const scoped=this.inSectWorld()&&this.state.sectWorld?.escort.enemies.includes(e);
      if(!scoped)return super.hitEnemy(e,amount);
      if(!this.activeEnemies().includes(e))return;
      this.sectDropSuppression++;try{super.hitEnemy(e,amount);}finally{this.sectDropSuppression--;}
      if(e.hp<=0)this.events=this.events.filter(event=>!(event.type==='message'&&event.text===(e.name||'石傀')+'散去，获得灵砂 ×2。'));
      // castSectSkill must record its effective hit before deriving the battle outcome.
      if(!this.castingSkill)this.checkSectWorldClear();
    }
    checkSectWorldClear(){
      const e=this.state.sectWorld?.escort;if(!this.inSectWorld()||e?.phase!=='battle'||e.enemies.some(f=>f.hp>0))return;
      e.phase='cleared';e.outcome=outcome(e);this.resetTransient();this.message('拦路役傀已退，亲手回收药车后结算；离开药站也保留待领结果。');this.checkpoint();
    }
    enemyStep(e,dt){
      if(enemyDefs().some(d=>d.id===e.id)&&(!this.inSectWorld()||this.state.sectWorld?.escort.phase!=='battle'||!this.state.sectWorld.escort.enemies.includes(e)))return;
      return super.enemyStep(e,dt);
    }
    takeDamage(amount){
      const battle=this.inSectWorld()&&this.state.sectWorld?.escort.phase==='battle';
      if(this.inSectWorld()&&!battle)return;
      super.takeDamage(amount);if(battle&&this.state.hp<=0)this.endSectWorldBattle(true);
    }
    endSectWorldBattle(failed){
      const e=this.state.sectWorld.escort;e.phase='idle';e.enemies=[];e.casts={covenant:0,ravage:0};e.outcome=null;
      this.events=this.events.filter(event=>!['defeat','sectWorld'].includes(event.type));this.state.hp=100;this.restoreSpirit(100);
      this.travel(W.return.map,W.return.x,W.return.y);this.events.push({type:'map'});this.message((failed?'护路失利，已回药庐调息。':'已撤回药庐。')+'已得物资、药站进展与宗门实践记录保留；本场未交割，可重新点铃。');
    }
    resetTransient(){
      super.resetTransient();for(const e of this.state.sectWorld?.escort.enemies||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){if(this.events.some(e=>e.type==='sectWorld'))return;super.step(dt,input);this.checkSectWorldClear();}
    objective(){
      if(!this.inSectWorld())return super.objective();const w=this.state.sectWorld;
      return w.escort.phase==='battle'?['追回药车','自动迎敌，V 暂停选敌与符药；护路失败保留永久所得。']:w.escort.phase==='cleared'?['药车待交割','走近药车，亲手回收后领取一次奖励。']:!w.station.claimed?['药案筹备','与云照交谈，取三处物资，在药案按辨草、润药、包药配伍。']:w.escort.phase!=='claimed'?['护路委托','与秦鹭议定护路，再到铜铃处主动开始。']:!w.contract.claimed?['运药交割','先查账册，再与陆青禾议定守约或威压。']:['药站行旅','三事已留记录；可查医案、办理宗门事务或回药庐。'];
    }
    exportSave(){const s=super.exportSave();if(s.sectWorld)s.sectWorld.escort.enemies=s.sectWorld.escort.enemies.map(({id,hp,x,y})=>({id,hp,x,y}));return s;}
  }
  const api={...Base,Game,validateSave,sectWorld:W};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
