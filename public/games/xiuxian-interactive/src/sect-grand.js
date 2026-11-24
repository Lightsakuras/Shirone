(function(root){
  'use strict';
  // 天下宗门大比：三轮真实交手 + 回药站报名次；复用既有地图与未具名他门同道。
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-manage.js'):root.XiuxianEngine;
  const E=node?require('./sect-grand-data.js'):root.XiuxianSectGrandData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:E.schema,matches:0,rounds:0,round:0,wins:0,losses:0,best:0,reported:0,lastOutcome:null,battle:false,enemies:[]});
  const keys=Object.keys(fresh());
  const shape=(v,ks)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===ks.length&&ks.every(k=>Object.hasOwn(v,k));
  const foeFor=n=>E.rounds[n-1]||null;
  const ints=['matches','rounds','round','wins','losses','best','reported'];

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectGrand;
    if(v===undefined){s.sectGrand=fresh();return s;}
    const fail=()=>{throw Error('天下大比记录异常。');};
    if(!shape(v,keys)||v.schema!==E.schema)fail();
    for(const k of ints)if(!Number.isInteger(v[k])||v[k]<0||v[k]>E.maxMeets)fail();
    if(v.round<0||v.round>E.roundCount)fail();
    if(v.wins+v.losses>v.matches)fail();
    if(v.rounds>v.wins*E.roundCount+E.roundCount)fail();
    if(v.best>v.wins)fail();
    if(v.reported>v.wins)fail();
    if(![null,'win','loss','reported'].includes(v.lastOutcome))fail();
    if(typeof v.battle!=='boolean')fail();
    if(v.battle){
      if(!Array.isArray(v.enemies)||v.enemies.length!==1)fail();
      const foe=v.enemies[0];
      const def=E.rounds.find(r=>r.id===foe.id);
      if(!def||!Number.isInteger(foe.hp)||foe.hp<0||foe.hp>def.maxHp)fail();
    }else if(Array.isArray(v.enemies)&&v.enemies.length)fail();
    if(v.battle&&(s.sectTrial?.battle||s.sectMeet?.battle||s.sectTrip?.battle||s.sectEvent?.battle))fail();
    s.sectGrand=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options&&options.save?validateSave(options.save):null;
      super(options);
      this.state.sectGrand=save?copy(save.sectGrand):fresh();
      this.sectGrandFoes=null;
    }
    sectGrandBattleActive(){const g=this.state.sectGrand;return !!(g&&g.battle&&Array.isArray(g.enemies)&&g.enemies.length);}
    // 资格链：真的赴过一届外间赛事，并把赛果报记回门内。
    sectGrandQualified(){return ((this.state.sectEvent?.settled)||0)>=1;}
    sectGrandRank(){const g=this.state.sectGrand;return g.best>0?g.best:0;}
    sectGrandReason(action){
      const g=this.state.sectGrand;
      if(!this.state.sect||!this.state.sect.id)return '入门之后才有天下大比。';
      if(this.isChild())return '童年不涉天下大比。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才谈天下大比。';
      if(action==='report'){
        if(g.reported>=g.wins)return '这一届没有待报的名次。';
        if(this.state.map!==E.reportMap)return '名次要回'+E.reportPlace+'向云照报记。';
        if(!this.sectWorldNear('yunStation'))return '走近云照再报名次。';
        if(this.state.hp<=0)return '气血已尽，先回药庐。';
        if(this.state.run)return '行程中不宜报名次。';
        if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
        if(g.battle)return '大比未收势。';
        return null;
      }
      if(!this.sectGrandQualified())return '要先在门内会武得资格、赴会交差，并把赛果报回门内，才谈天下大比。';
      if(g.battle)return '大比未收势。';
      if(g.reported<g.wins)return '上一届名次还没报记，先回药站向云照说清。';
      if(!g.battle&&(this.state.sectMeet?.battle||this.state.sectTrip?.battle||this.state.sectTrial?.battle||this.state.sectEvent?.battle))return '门内较技、赴会或赛事未收势，先收住手。';
      if(this.state.map!==E.map)return '大比在'+E.place+'借场开擂。';
      if(this.state.hp<=0)return '气血已尽，先回药庐。';
      if(this.state.run)return '行囊在身，先走完这一趟。';
      if(this.state.chapter?.training)return '修行未收势，先回蒲团。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(g.matches>=E.maxMeets)return '大比已无可记届数。';
      return null;
    }
    grandSpawn(round){
      const def=foeFor(round);
      if(!def)return null;
      return {id:def.id,name:def.name,kind:def.kind,x:def.x,y:def.y,maxHp:def.maxHp,damage:def.damage,speed:def.speed,hp:def.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:def.x,targetY:def.y};
    }
    startSectGrand(){
      if(this.sectGrandReason('start')!==null)return false;
      const g=this.state.sectGrand;
      g.battle=true;g.matches++;g.round=1;g.rounds=0;g.lastOutcome=null;
      const foe=this.grandSpawn(1);
      g.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectGrandFoes=null;
      this.resetTransient();
      this.message(E.notes.start+foe.name+'。三轮都收住才记名次。');
      this.events.push({type:'sectGrand'});
      return true;
    }
    checkSectGrandRound(){
      const g=this.state.sectGrand;
      if(!g.battle)return;
      if(this.activeEnemies().some(f=>f.hp>0))return;
      g.rounds=Math.max(g.rounds,g.round);
      if(g.round>=E.roundCount){
        g.wins++;g.battle=false;g.enemies=[];g.round=0;g.lastOutcome='win';
        g.best=Math.max(g.best,g.wins);
        this.sectGrandFoes=null;this.resetTransient();
        this.message(E.notes.win);
        this.events=this.events.filter(e=>e.type!=='sectGrand');
        this.checkpoint();
        return;
      }
      g.round++;
      const foe=this.grandSpawn(g.round);
      g.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectGrandFoes=null;
      this.resetTransient();
      this.message(E.notes.next+foe.name+'。');
      this.checkpoint();
    }
    endSectGrand(failed){
      const g=this.state.sectGrand;
      g.rounds=Math.max(g.rounds,g.round);
      if(failed){g.losses++;g.needRehearse=true;}
      g.battle=false;g.enemies=[];g.round=0;
      if(failed)g.lastOutcome='loss';
      this.sectGrandFoes=null;
      this.events=this.events.filter(e=>!['defeat','sectGrand'].includes(e.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?E.notes.loss:'大比已收势。');
    }
    reportSectGrand(){
      if(this.sectGrandReason('report')!==null)return false;
      const g=this.state.sectGrand;
      g.reported=g.wins;
      g.lastOutcome='reported';
      this.message(E.notes.reported);
      this.checkpoint();
      return true;
    }
    activeEnemies(){
      if(!this.sectGrandBattleActive())return super.activeEnemies();
      return this.sectGrandFoes||(this.sectGrandFoes=(()=>{
        const rec=this.state.sectGrand.enemies[0];
        const def=this.grandSpawn(this.state.sectGrand.round);
        return def?[Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y})]:[];
      })());
    }
    canFight(){if(this.sectGrandBattleActive())return this.state.hp>0;return super.canFight();}
    hitEnemy(e,amount){
      if(!this.sectGrandBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      this.events=this.events.filter(ev=>!(ev.type==='message'&&/散去，获得灵砂/.test(ev.text||'')));
      if(before>0&&e.hp===0)this.checkSectGrandRound();
    }
    takeDamage(amount){
      if(!this.sectGrandBattleActive())return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectGrand(true);
    }
    enemyStep(e,dt){
      if(!this.sectGrandBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectGrandFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectGrand'))return;
      super.step(dt,input);
      this.checkSectGrandRound();
    }
    objective(){
      if(!this.sectGrandBattleActive())return super.objective();
      return ['天下大比 · 第 '+this.state.sectGrand.round+' 轮','自动普攻，V 暂停选敌；三轮都收住才记名次。'];
    }
    sectGrandStatus(){
      const g=copy(this.state.sectGrand);
      const active=this.sectGrandBattleActive();
      const foes=active?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):[];
      return {id:E.id,title:E.title,place:E.place,reportPlace:E.reportPlace,roundCount:E.roundCount,
        intro:E.intro,reportNote:E.reportNote,rewardNote:E.rewardNote,notYet:E.notYet,
        matches:g.matches,rounds:g.rounds,round:g.round,wins:g.wins,losses:g.losses,best:g.best,reported:g.reported,
        lastOutcome:g.lastOutcome,battle:g.battle,foes,qualified:this.sectGrandQualified(),
        startReason:this.sectGrandReason('start'),reportReason:this.sectGrandReason('report'),
        record:copy(g),source:E.source};
    }
    exportSave(){
      const s=super.exportSave();
      if(s.sectGrand&&s.sectGrand.battle&&Array.isArray(s.sectGrand.enemies)){
        s.sectGrand.enemies=this.activeEnemies().map(({id,hp,x,y})=>({id,hp,x,y}));
      }
      const g=s.sectGrand;
      if(g&&g.matches===0&&g.reported===0&&g.best===0)delete s.sectGrand;
      return s;
    }
    sectStatus(){const status=super.sectStatus();status.grand=this.sectGrandStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectGrand:E};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
