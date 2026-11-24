(function(root){
  'use strict';
  // 七宗会武（主线赛事）：资格接在天下大比之后，三轮真实交手，名次回药站报记；不改名冒充金顶试剑。
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-grand.js'):root.XiuxianEngine;
  const E=node?require('./sect-summit-data.js'):root.XiuxianSectSummitData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:E.schema,meets:0,rounds:0,round:0,wins:0,losses:0,best:0,reported:0,lastOutcome:null,battle:false,enemies:[]});
  const keys=Object.keys(fresh());
  const shape=(v,ks)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===ks.length&&ks.every(k=>Object.hasOwn(v,k));
  const foeFor=n=>E.rounds[n-1]||null;
  const ints=['meets','rounds','round','wins','losses','best','reported'];

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectSummit;
    if(v===undefined){s.sectSummit=fresh();return s;}
    const fail=()=>{throw Error('七宗会武记录异常。');};
    if(!shape(v,keys)||v.schema!==E.schema)fail();
    for(const k of ints)if(!Number.isInteger(v[k])||v[k]<0||v[k]>E.maxMeets)fail();
    if(v.round<0||v.round>E.roundCount)fail();
    if(v.wins+v.losses>v.meets)fail();
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
    if(v.battle&&(s.sectTrial?.battle||s.sectMeet?.battle||s.sectTrip?.battle||s.sectEvent?.battle||s.sectGrand?.battle))fail();
    s.sectSummit=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options&&options.save?validateSave(options.save):null;
      super(options);
      this.state.sectSummit=save?copy(save.sectSummit):fresh();
      this.sectSummitFoes=null;
    }
    sectSummitBattleActive(){const s=this.state.sectSummit;return !!(s&&s.battle&&Array.isArray(s.enemies)&&s.enemies.length);}
    // 资格链：天下大比真的报过名次，才谈七宗会武。
    sectSummitQualified(){return ((this.state.sectGrand?.reported)||0)>=1;}
    sectSummitReason(action){
      const s=this.state.sectSummit;
      if(!this.state.sect||!this.state.sect.id)return '入门之后才有七宗会武。';
      if(this.isChild())return '童年不涉七宗会武。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才谈七宗会武。';
      if(action==='report'){
        if(s.reported>=s.wins)return '这一届没有待报的名次。';
        if(this.state.map!==E.reportMap)return '名次要回'+E.reportPlace+'向云照报记。';
        if(!this.sectWorldNear('yunStation'))return '走近云照再报名次。';
        if(this.state.hp<=0)return '气血已尽，先回药庐。';
        if(this.state.run)return '行程中不宜报名次。';
        if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
        if(s.battle)return '会武未收势。';
        return null;
      }
      if(!this.sectSummitQualified())return E.notes.needGrand;
      if(s.battle)return '会武未收势。';
      if(s.reported<s.wins)return '上一届名次还没报记，先回药站向云照说清。';
      if(this.state.sectMeet?.battle||this.state.sectTrip?.battle||this.state.sectTrial?.battle||this.state.sectEvent?.battle||this.state.sectGrand?.battle)return '门内较技、赴会、赛事或大比未收势，先收住手。';
      if(this.state.map!==E.map)return '会武在'+E.place+'借场开擂。';
      if(this.state.hp<=0)return '气血已尽，先回药庐。';
      if(this.state.run)return '行囊在身，先走完这一趟。';
      if(this.state.chapter?.training)return '修行未收势，先回蒲团。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(s.meets>=E.maxMeets)return '会武已无可记届数。';
      return null;
    }
    summitSpawn(round){
      const def=foeFor(round);
      if(!def)return null;
      return {id:def.id,name:def.name,kind:def.kind,x:def.x,y:def.y,maxHp:def.maxHp,damage:def.damage,speed:def.speed,hp:def.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:def.x,targetY:def.y};
    }
    startSectSummit(){
      if(this.sectSummitReason('start')!==null)return false;
      const s=this.state.sectSummit;
      s.battle=true;s.meets++;s.round=1;s.rounds=0;s.lastOutcome=null;
      const foe=this.summitSpawn(1);
      s.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectSummitFoes=null;
      this.resetTransient();
      this.message(E.notes.start+foe.name+'。三轮都收住才记名次。');
      this.events.push({type:'sectSummit'});
      return true;
    }
    checkSectSummitRound(){
      const s=this.state.sectSummit;
      if(!s.battle)return;
      if(this.activeEnemies().some(f=>f.hp>0))return;
      s.rounds=Math.max(s.rounds,s.round);
      if(s.round>=E.roundCount){
        s.wins++;s.battle=false;s.enemies=[];s.round=0;s.lastOutcome='win';
        s.best=Math.max(s.best,s.wins);
        this.sectSummitFoes=null;this.resetTransient();
        this.message(E.notes.win);
        this.events=this.events.filter(e=>e.type!=='sectSummit');
        this.checkpoint();
        return;
      }
      s.round++;
      const foe=this.summitSpawn(s.round);
      s.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectSummitFoes=null;
      this.resetTransient();
      this.message(E.notes.next+foe.name+'。');
      this.checkpoint();
    }
    endSectSummit(failed){
      const s=this.state.sectSummit;
      s.rounds=Math.max(s.rounds,s.round);
      if(failed)s.losses++;
      s.battle=false;s.enemies=[];s.round=0;
      if(failed)s.lastOutcome='loss';
      this.sectSummitFoes=null;
      this.events=this.events.filter(e=>!['defeat','sectSummit'].includes(e.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?E.notes.loss:'会武已收势。');
    }
    reportSectSummit(){
      if(this.sectSummitReason('report')!==null)return false;
      const s=this.state.sectSummit;
      s.reported=s.wins;
      s.lastOutcome='reported';
      this.message(E.notes.reported);
      this.checkpoint();
      return true;
    }
    objects(){
      if(this.state.map==='garden' && this.sectSummitBattleActive())return [];
      return super.objects();
    }
    activeEnemies(){
      if(!this.sectSummitBattleActive())return super.activeEnemies();
      return this.sectSummitFoes||(this.sectSummitFoes=(()=>{
        const rec=this.state.sectSummit.enemies[0];
        const def=this.summitSpawn(this.state.sectSummit.round);
        return def?[Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y})]:[];
      })());
    }
    canFight(){if(this.sectSummitBattleActive())return this.state.hp>0;return super.canFight();}
    hitEnemy(e,amount){
      if(!this.sectSummitBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      this.events=this.events.filter(ev=>!(ev.type==='message'&&/散去，获得灵砂/.test(ev.text||'')));
      if(before>0&&e.hp===0)this.checkSectSummitRound();
    }
    takeDamage(amount){
      if(!this.sectSummitBattleActive())return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectSummit(true);
    }
    enemyStep(e,dt){
      if(!this.sectSummitBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectSummitFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectSummit'))return;
      super.step(dt,input);
      this.checkSectSummitRound();
    }
    objective(){
      if(!this.sectSummitBattleActive())return super.objective();
      return ['七宗会武 · 第 '+this.state.sectSummit.round+' 场','自动普攻，V 暂停选敌；三轮都收住才记名次。'];
    }
    sectSummitStatus(){
      const s=copy(this.state.sectSummit);
      const active=this.sectSummitBattleActive();
      const foes=active?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):[];
      return {id:E.id,title:E.title,subtitle:E.subtitle,place:E.place,reportPlace:E.reportPlace,roundCount:E.roundCount,
        intro:E.intro,reportNote:E.reportNote,rewardNote:E.rewardNote,notYet:E.notYet,
        meets:s.meets,rounds:s.rounds,round:s.round,wins:s.wins,losses:s.losses,best:s.best,reported:s.reported,
        lastOutcome:s.lastOutcome,battle:s.battle,foes,qualified:this.sectSummitQualified(),
        startReason:this.sectSummitReason('start'),reportReason:this.sectSummitReason('report'),
        record:copy(s),source:E.source};
    }
    exportSave(){
      const s=super.exportSave();
      if(s.sectSummit&&s.sectSummit.battle&&Array.isArray(s.sectSummit.enemies)){
        s.sectSummit.enemies=this.activeEnemies().map(({id,hp,x,y})=>({id,hp,x,y}));
      }
      const m=s.sectSummit;
      if(m&&m.meets===0&&m.reported===0&&m.best===0)delete s.sectSummit;
      return s;
    }
    sectStatus(){const status=super.sectStatus();status.summit=this.sectSummitStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectSummit:E};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
