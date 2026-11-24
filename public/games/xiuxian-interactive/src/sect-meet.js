(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-trial.js'):root.XiuxianEngine;
  const M=node?require('./sect-meet-data.js'):root.XiuxianSectMeetData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:M.schema,attempts:0,rounds:0,round:0,qualified:false,bestRound:0,lastOutcome:null,battle:false,enemies:[]});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  // 每一轮的对手都来自数据；运行期只记真实气血、位置与动作计时。
  const foeFor=round=>M.rounds.find(r=>r.index===round);

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectMeet;
    if(v===undefined){s.sectMeet=fresh();return s;}
    const fail=()=>{throw Error('门内会武记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==M.schema)fail();
    if(!integer(v.attempts,M.maxAttempts))fail();
    if(!integer(v.rounds,M.roundCount)||!integer(v.bestRound,M.roundCount))fail();
    if(!integer(v.round,M.roundCount))fail();
    if(typeof v.qualified!=='boolean'||typeof v.battle!=='boolean')fail();
    if(!(v.lastOutcome===null||v.lastOutcome==='qualified'||v.lastOutcome==='loss'))fail();
    if(v.bestRound>v.rounds&&!v.battle)fail();
    if(v.qualified&&(v.bestRound!==M.roundCount||v.attempts<1||v.lastOutcome!=='qualified'))fail();
    if(!Array.isArray(v.enemies)||v.enemies.length>1)fail();
    for(const e of v.enemies){
      const def=typeof e?.id==='string'?M.rounds.map(r=>r.foe).find(f=>f.id===e.id):null;
      if(!def)fail();
      if(!shape(e,['id','hp','x','y'])||typeof e.hp!=='number'||!(e.hp>=0&&e.hp<=def.maxHp))fail();
      if(typeof e.x!=='number'||typeof e.y!=='number')fail();
    }
    if(v.battle!==(v.enemies.length>0))fail();
    if(v.battle&&(v.round<1||v.attempts<1))fail();
    if(v.battle&&s.sectTrial?.battle)fail();
    s.sectMeet=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;
      super(options);
      // 下层构造器按各自白名单重建存档，会丢掉本层域；这里只恢复本层已严格校验的记录。
      this.state.sectMeet=save?copy(save.sectMeet):fresh();
      this.sectMeetFoes=null;
    }
    static sectMeetFresh(){return fresh();}
    sectMeetFresh(){return fresh();}
    sectMeetBattleActive(){return !!this.state.sectMeet?.battle;}
    sectMeetDef(round){return foeFor(round)||null;}
    // 门槛与真实地点/状态一致：入宗、成年、筑基、在药庐庭院、未在其它战斗或试炼中。
    sectMeetReason(){
      const m=this.state.sectMeet;
      if(this.state.sect?.id!=='hehuan')return '尚未入宗，门内会武只对门中人开放。';
      if(this.isChild())return '年幼不能赴会武，先在门内看顾事务。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才可报名会武。';
      if(m.battle)return '本轮会武尚未收势。';
      if(this.state.sectTrial?.battle)return '门内比试未收势，先比完这一场。';
      if(this.state.map!==M.map)return '会武在'+M.place+'举行，先回药庐庭院。';
      if(this.state.hp<=0)return '气血未复，先调息。';
      if(this.state.run)return '行程中不宜报名会武。';
      if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(m.attempts>=M.maxAttempts)return '会武已无可记场次。';
      return null;
    }
    sectMeetStatus(){
      const m=copy(this.state.sectMeet);
      const active=this.sectMeetBattleActive();
      const foes=active?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):[];
      return {id:M.id,title:M.title,place:M.place,intro:M.intro,rewardNote:M.rewardNote,
        attempts:m.attempts,rounds:m.rounds,round:m.round,roundCount:M.roundCount,
        qualified:m.qualified,bestRound:m.bestRound,lastOutcome:m.lastOutcome,battle:m.battle,
        roundLabel:active?(foeFor(m.round)?.label||''):'',
        foes,qualifiedLabel:M.qualifiedLabel,reason:this.sectMeetReason(),record:copy(m),source:M.source};
    }
    meetSpawn(round){
      const def=foeFor(round)?.foe;
      if(!def)return null;
      return {id:def.id,name:def.name,kind:def.kind,x:def.x,y:def.y,maxHp:def.maxHp,damage:def.damage,speed:def.speed,hp:def.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:def.x,targetY:def.y};
    }
    startSectMeet(){
      if(this.sectMeetReason()!==null)return false;
      const m=this.state.sectMeet;
      m.battle=true;m.attempts++;m.round=1;m.rounds=0;m.lastOutcome=null;
      const foe=this.meetSpawn(1);
      m.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectMeetFoes=null;
      this.resetTransient();
      this.message('门内会武开试：第一轮试招，同门收力。三轮皆过才记赴会资格，失利可整备再报。');
      this.events.push({type:'sectMeet'});
      return true;
    }
    activeEnemies(){
      if(!this.sectMeetBattleActive())return super.activeEnemies();
      return this.sectMeetFoes||(this.sectMeetFoes=(()=>{
        const rec=this.state.sectMeet.enemies[0];
        const def=this.meetSpawn(this.state.sectMeet.round);
        return def?[Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y})]:[];
      })());
    }
    canFight(){if(this.sectMeetBattleActive())return this.state.hp>0;return super.canFight();}
    hitEnemy(e,amount){
      if(!this.sectMeetBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      this.events=this.events.filter(event=>!(event.type==='message'&&/散去，获得灵砂/.test(event.text||'')));
      if(before>0&&e.hp===0)this.checkSectMeetRound();
    }
    checkSectMeetRound(){
      const m=this.state.sectMeet;
      if(!m.battle)return;
      if(this.activeEnemies().some(f=>f.hp>0))return;
      m.rounds=m.round;
      m.bestRound=Math.max(m.bestRound,m.rounds);
      if(m.round>=M.roundCount){
        m.battle=false;m.enemies=[];m.qualified=true;m.lastOutcome='qualified';
        this.sectMeetFoes=null;this.resetTransient();
        this.message('会武三轮皆过：门内记你'+M.qualifiedLabel+'。'+M.rewardNote);
        this.events=this.events.filter(event=>event.type!=='sectMeet');
        this.checkpoint();
        return;
      }
      m.round++;
      const foe=this.meetSpawn(m.round);
      m.enemies=[{id:foe.id,hp:foe.hp,x:foe.x,y:foe.y}];
      this.sectMeetFoes=null;
      this.resetTransient();
      this.message('第 '+m.rounds+' 轮已过，接着第 '+m.round+' 轮 · '+(foeFor(m.round)?.label||'')+'。');
      this.checkpoint();
    }
    endSectMeet(failed){
      const m=this.state.sectMeet;
      m.bestRound=Math.max(m.bestRound,m.rounds);
      m.battle=false;m.enemies=[];m.round=0;m.lastOutcome=failed?'loss':'qualified';
      this.sectMeetFoes=null;
      this.events=this.events.filter(event=>!['defeat','sectMeet'].includes(event.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?'会武失利：同门收势扶你回息。已过轮次与已得记录不夺，可整备再报。':'会武已收势。');
    }
    takeDamage(amount){
      if(!this.sectMeetBattleActive())return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectMeet(true);
    }
    enemyStep(e,dt){
      if(!this.sectMeetBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectMeetFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectMeet'))return;
      super.step(dt,input);
      this.checkSectMeetRound();
    }
    objective(){
      if(!this.sectMeetBattleActive())return super.objective();
      return ['门内会武 · 第 '+this.state.sectMeet.round+' 轮','同门收力相较：自动普攻，V 暂停选敌；失利可整备再报。'];
    }
    exportSave(){
      const s=super.exportSave();
      if(s.sectMeet&&s.sectMeet.battle&&Array.isArray(s.sectMeet.enemies)){
        const foes=this.activeEnemies();
        s.sectMeet.enemies=foes.map(({id,hp,x,y})=>({id,hp,x,y}));
      }
      const m=s.sectMeet;
      if(m&&m.attempts===0&&m.rounds===0&&m.round===0&&!m.qualified&&m.bestRound===0&&m.lastOutcome===null&&!m.battle&&(!m.enemies||m.enemies.length===0))delete s.sectMeet;
      return s;
    }
  }
  const api={...Base,Game,validateSave,sectMeet:M};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
