(function(root){
  'use strict';
  // 赴会赛事与返宗评注：两场真实战斗 + 返宗向云照记评注；失利可补修再报。
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-bond.js'):root.XiuxianEngine;
  const E=node?require('./sect-event-data.js'):root.XiuxianSectEventData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:E.schema,attempts:0,rounds:0,round:0,wins:0,losses:0,rehearsed:0,settled:0,lastOutcome:null,battle:false,enemies:[]});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const foeFor=n=>E.rounds[n-1]||null;
  const knownFoe=id=>E.rounds.some(r=>r.id===id);
  const ints=['attempts','rounds','round','wins','losses','rehearsed','settled'];

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectEvent;
    if(v===undefined){s.sectEvent=fresh();return s;}
    const fail=()=>{throw Error('赴会赛事记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==E.schema)fail();
    for(const k of ints)if(!Number.isInteger(v[k])||v[k]<0||v[k]>E.maxEvents)fail();
    if(v.round<0||v.round>E.roundCount)fail();
    if(v.wins+v.losses>v.attempts)fail();
    if(v.settled>v.wins)fail();
    if(v.rehearsed>0&&v.attempts===0)fail();
    if(![null,'win','loss','settled'].includes(v.lastOutcome))fail();
    if(!Array.isArray(v.enemies)||v.enemies.length>1)fail();
    if(v.battle!==(v.enemies.length>0))fail();
    if(v.battle){
      if(v.attempts<1||v.round<1||v.round>E.roundCount)fail();
      const e=v.enemies[0],def=foeFor(v.round);
      if(!e||!knownFoe(e.id)||!def||e.id!==def.id)fail();
      if(!Number.isFinite(e.hp)||e.hp<0||e.hp>def.maxHp)fail();
      if(!Number.isFinite(e.x)||!Number.isFinite(e.y))fail();
      if(v.lastOutcome!==null)fail();
    }
    if(v.battle&&(s.sectTrial?.battle||s.sectMeet?.battle||s.sectTrip?.battle))fail();
    s.sectEvent=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options&&options.save?validateSave(options.save):null;
      super(options);
      this.state.sectEvent=save?copy(save.sectEvent):fresh();
      this.sectEventFoes=null;
    }
    sectEventBattleActive(){const e=this.state.sectEvent;return !!(e&&e.battle&&Array.isArray(e.enemies)&&e.enemies.length);}
    // 资格链：门内会武得赴会资格，且必须真的赴会交差回来。
    sectEventQualified(){return !!(this.state.sectMeet?.qualified&&(this.state.sectTrip?.returned||0)>=1);}
    sectEventReason(action){
      const e=this.state.sectEvent;
      if(!this.state.sect||!this.state.sect.id)return '入门之后才有赴会赛事。';
      if(this.isChild())return '童年不涉赴会赛事。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才谈赴会。';
      if(action==='settle'){
        if(e.settled>=e.wins)return '这次没有待记的赛果。';
        if(this.state.map!==E.settleMap)return '赛果要回'+E.settlePlace+'向云照报记。';
        if(!this.sectWorldNear('yunStation'))return '走近云照再报赛果。';
        if(this.state.hp<=0)return '气血已尽，先回药庐。';
        if(this.state.run)return '行程中不宜报赛果。';
        if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
        if(e.battle)return '赛事未收势。';
        return null;
      }
      if(!this.sectEventQualified())return '要先过门内会武并赴会交差一次，才有代表本门赴赛的资格。';
      if(action==='rehearse'){
        if(e.lastOutcome!=='loss')return '只有上届失利才需补修。';
        if(this.state.map!==E.map)return '补修在'+E.place+'。';
      }else{
        if(e.battle)return '赛事未收势。';
        if(e.needRehearse)return '上一届失利，先补修一次再报。';
        if(!e.battle&&(this.state.sectMeet?.battle||this.state.sectTrip?.battle||this.state.sectTrial?.battle))return '门内较技或赴会未收势，先收住手。';
        if(this.state.map!==E.map)return '赛事在'+E.place+'报场。';
        if(e.settled<e.wins)return '上一届赛果还没报记，先回药站向云照说清。';
      }
      if(this.state.hp<=0)return '气血已尽，先回药庐。';
      if(this.state.run)return '行囊在身，先走完这一趟。';
      if(this.state.chapter?.training)return '修行未收势，先回蒲团。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(e.attempts>=E.maxEvents)return '赛事已无可记场次。';
      return null;
    }
    eventSpawn(round){
      const def=foeFor(round);
      if(!def)return null;
      return {id:def.id,name:def.name,kind:def.kind,x:def.x,y:def.y,maxHp:def.maxHp,damage:def.damage,speed:def.speed,hp:def.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:def.x,targetY:def.y};
    }
    startSectEvent(){
      if(this.sectEventReason('start')!==null)return false;
      const e=this.state.sectEvent;
      e.battle=true;e.attempts++;e.round=1;e.rounds=0;e.lastOutcome=null;
      const foe=this.eventSpawn(1);
      e.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectEventFoes=null;
      this.resetTransient();
      this.message('赴会赛事开场：第一场对'+foe.name+'。两场都收住才算这一届打完。');
      this.events.push({type:'sectEvent'});
      return true;
    }
    rehearsalReason(){return this.sectEventReason('rehearse');}
    rehearseEvent(){
      if(this.rehearsalReason()!==null)return false;
      const e=this.state.sectEvent;
      e.rehearsed++;
      e.needRehearse=false;
      e.lastOutcome=null;
      this.message('补修已成：将上届失手的那几招从头拆解过一遍。补修不改过往战绩，只为下届蓄力。');
      this.checkpoint();
      return true;
    }
    activeEnemies(){
      if(!this.sectEventBattleActive())return super.activeEnemies();
      return this.sectEventFoes||(this.sectEventFoes=(()=>{
        const rec=this.state.sectEvent.enemies[0];
        const def=this.eventSpawn(this.state.sectEvent.round);
        return def?[Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y})]:[];
      })());
    }
    canFight(){if(this.sectEventBattleActive())return this.state.hp>0;return super.canFight();}
    hitEnemy(e,amount){
      if(!this.sectEventBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      this.events=this.events.filter(event=>!(event.type==='message'&&/散去，获得灵砂/.test(event.text||'')));
      if(before>0&&e.hp===0)this.checkSectEventRound();
    }
    checkSectEventRound(){
      const e=this.state.sectEvent;
      if(!e.battle)return;
      if(this.activeEnemies().some(f=>f.hp>0))return;
      e.rounds=Math.max(e.rounds,e.round);
      if(e.round>=E.roundCount){
        e.wins++;e.battle=false;e.enemies=[];e.round=0;e.lastOutcome='win';
        this.sectEventFoes=null;this.resetTransient();
        this.message('两场都收住了。'+E.notes.win);
        this.events=this.events.filter(event=>event.type!=='sectEvent');
        this.checkpoint();
        return;
      }
      e.round++;
      const foe=this.eventSpawn(e.round);
      e.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectEventFoes=null;
      this.resetTransient();
      this.message('第一场已收，接着第二场 · '+foe.name+'。');
      this.checkpoint();
    }
    endSectEvent(failed){
      const e=this.state.sectEvent;
      e.rounds=Math.max(e.rounds,e.round);
      if(failed){e.losses++;e.needRehearse=true;}
      e.battle=false;e.enemies=[];e.round=0;
      if(failed)e.lastOutcome='loss';
      this.sectEventFoes=null;
      this.events=this.events.filter(event=>!['defeat','sectEvent'].includes(event.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?('这一届没打完。'+E.notes.loss):'赛事已收势。');
    }
    settleSectEvent(){
      if(this.sectEventReason('settle')!==null)return false;
      const e=this.state.sectEvent;
      e.settled=e.wins;
      e.lastOutcome='settled';
      this.message(E.notes.settled);
      this.checkpoint();
      return true;
    }
    takeDamage(amount){
      if(!this.sectEventBattleActive())return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectEvent(true);
    }
    enemyStep(e,dt){
      if(!this.sectEventBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectEventFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectEvent'))return;
      super.step(dt,input);
      this.checkSectEventRound();
    }
    objective(){
      if(!this.sectEventBattleActive())return super.objective();
      return ['赴会赛事 · 第 '+this.state.sectEvent.round+' 场','自动普攻，V 暂停选敌；两场都收住才算这一届。'];
    }
    sectEventStatus(){
      const e=copy(this.state.sectEvent);
      const active=this.sectEventBattleActive();
      const foes=active?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):[];
      return {id:E.id,title:E.title,place:E.place,settlePlace:E.settlePlace,roundCount:E.roundCount,
        notes:E.notes,notYet:E.notYet,
        attempts:e.attempts,rounds:e.rounds,round:e.round,wins:e.wins,losses:e.losses,rehearsed:e.rehearsed,settled:e.settled,
        lastOutcome:e.lastOutcome,battle:e.battle,foes,qualified:this.sectEventQualified(),
        startReason:this.sectEventReason('start'),rehearseReason:this.sectEventReason('rehearse'),settleReason:this.sectEventReason('settle'),
        record:copy(e),source:E.source};
    }
    exportSave(){
      const s=super.exportSave();
      if(s.sectEvent&&s.sectEvent.battle&&Array.isArray(s.sectEvent.enemies)){
        s.sectEvent.enemies=this.activeEnemies().map(({id,hp,x,y})=>({id,hp,x,y}));
      }
      const e=s.sectEvent;
      if(e&&e.attempts===0&&e.rehearsed===0&&e.settled===0)delete s.sectEvent;
      return s;
    }
    sectStatus(){const status=super.sectStatus();status.event=this.sectEventStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectEvent:E};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
