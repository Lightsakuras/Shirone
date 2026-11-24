(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-career.js'):root.XiuxianEngine;
  const T=node?require('./sect-trial-data.js'):root.XiuxianSectTrialData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:T.schema,attempts:0,wins:0,cleared:false,lastOutcome:null,battle:false,enemies:[]});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  const foeDef=id=>T.foes.find(f=>f.id===id);
  // 对手全部是收力的同门：血量与出手都来自数据，运行期只记真实气血、位置与动作计时。
  const spawn=()=>T.foes.map(f=>({id:f.id,name:f.name,kind:f.kind,x:f.x,y:f.y,maxHp:f.maxHp,damage:f.damage,speed:f.speed,hp:f.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:f.x,targetY:f.y}));

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectTrial;
    if(v===undefined){s.sectTrial=fresh();return s;}
    const fail=()=>{throw Error('门内比试记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==T.schema)fail();
    if(!integer(v.attempts,T.maxAttempts)||!integer(v.wins,T.maxAttempts)||v.wins>v.attempts)fail();
    if(typeof v.cleared!=='boolean'||typeof v.battle!=='boolean')fail();
    if(!(v.lastOutcome===null||v.lastOutcome==='win'||v.lastOutcome==='loss'))fail();
    if(v.cleared&&v.wins<1)fail();
    if(!Array.isArray(v.enemies)||v.enemies.length>T.foes.length)fail();
    const seen=new Set();
    for(const e of v.enemies){
      const def=typeof e?.id==='string'?foeDef(e.id):null;
      if(!def||seen.has(e.id))fail();seen.add(e.id);
      if(!shape(e,['id','hp','x','y'])||typeof e.hp!=='number'||!(e.hp>=0&&e.hp<=def.maxHp))fail();
      if(typeof e.x!=='number'||typeof e.y!=='number')fail();
    }
    if(v.battle!==(v.enemies.length>0))fail();
    if(v.battle&&(!v.attempts||v.lastOutcome==='win'&&v.enemies.length))fail();
    s.sectTrial=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;
      super(options);
      // 下层构造器按各自白名单重建存档，会把本层域丢掉；这里只恢复本层已严格校验的记录。
      this.state.sectTrial=save?copy(save.sectTrial):fresh();
      this.sectTrialFoes=null;this.sectTrialSuppress=0;
    }
    static sectTrialFresh(){return fresh();}
    sectTrialFresh(){return fresh();}
    sectTrialBattleActive(){return !!this.state.sectTrial?.battle;}
    // 报名门槛与真实地点/状态一致：入宗、成年、筑基、在药庐庭院、未在其它战斗或试炼中。
    sectTrialReason(){
      const t=this.state.sectTrial;
      if(this.state.sect?.id!=='hehuan')return '尚未入宗，门内比试只对门中人开放。';
      if(this.isChild())return '年幼不能与人交手，先在门内看顾事务。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才可报试。';
      if(t.battle)return '本场比试尚未结束。';
      if(this.state.sectMeet?.battle)return '门内会武未收势，先比完那一轮。';
      if(this.state.map!==T.map)return '比试在'+T.place+'进行，先回药庐庭院。';
      if(this.state.hp<=0)return '气血未复，先调息。';
      if(this.state.run)return '行程中不宜报试。';
      if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(t.attempts>=T.maxAttempts)return '门内比试已无可记场次。';
      return null;
    }
    sectTrialStatus(){
      const t=copy(this.state.sectTrial),def=T;
      return {id:def.id,title:def.title,place:def.place,intro:def.intro,rewardNote:def.rewardNote,
        attempts:t.attempts,wins:t.wins,cleared:t.cleared,lastOutcome:t.lastOutcome,battle:t.battle,
        foes:this.sectTrialBattleActive()?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):copy(def.foes).map(f=>({id:f.id,name:f.name,hp:f.maxHp,maxHp:f.maxHp})),
        qualified:t.cleared,reason:this.sectTrialReason(),record:copy(t),source:def.source};
    }
    startSectTrial(){
      if(this.sectTrialReason()!==null)return false;
      const t=this.state.sectTrial;
      t.battle=true;t.attempts++;t.lastOutcome=null;t.enemies=spawn().map(e=>({id:e.id,hp:e.hp,x:e.x,y:e.y}));
      this.resetTransient();
      this.message('门内比试开场：同门收力，只比招法。V 可暂停选敌，输了回息再报试。');
      this.events.push({type:'sectTrial'});
      return true;
    }
    // 战斗钩子：仅在比试中接管敌人，其它场景仍走原有实现。
    activeEnemies(){
      if(!this.sectTrialBattleActive())return super.activeEnemies();
      return this.sectTrialFoes||(this.sectTrialFoes=spawn().map((def,i)=>{const rec=this.state.sectTrial.enemies[i];return Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y});}));
    }
    canFight(){if(this.sectTrialBattleActive())return this.state.hp>0;return super.canFight();}
    hitEnemy(e,amount){
      if(!this.sectTrialBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      // 收力比试不留敌方掉落与“散去”消息，只留真实扣血。
      this.events=this.events.filter(event=>!(event.type==='message'&&/散去，获得灵砂/.test(event.text||'')));
      if(before>0&&e.hp===0)this.checkSectTrialClear();
    }
    gain(id,amount){if(this.sectTrialSuppress>0&&id==='dust'&&amount===2)return;return super.gain(id,amount);}
    checkSectTrialClear(){
      const t=this.state.sectTrial;
      if(!t.battle)return;
      const foes=this.activeEnemies();
      if(foes.some(f=>f.hp>0))return;
      t.battle=false;t.enemies=[];t.wins++;t.lastOutcome='win';t.cleared=true;
      this.sectTrialFoes=null;this.resetTransient();
      this.message('比试收势：同门认下招法与分寸，门内记你入选。'+T.rewardNote);
      this.checkpoint();
    }
    endSectTrial(failed){
      const t=this.state.sectTrial;
      t.battle=false;t.enemies=[];t.lastOutcome=failed?'loss':'win';this.sectTrialFoes=null;
      this.events=this.events.filter(event=>!['defeat','sectTrial'].includes(event.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?'收力比试失利：同门扶你回息。已得记录与事务不夺，可再报试。':'比试已收势。');
    }
    takeDamage(amount){
      const battle=this.sectTrialBattleActive();
      if(!battle)return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectTrial(true);
    }
    enemyStep(e,dt){
      if(!this.sectTrialBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectTrialFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectTrial'))return;
      super.step(dt,input);
      this.checkSectTrialClear();
    }
    objective(){
      if(!this.sectTrialBattleActive())return super.objective();
      return ['门内比试','同门收力切磋：自动普攻，V 暂停选敌；失利回息再报试。'];
    }
    exportSave(){
      const s=super.exportSave();
      if(s.sectTrial&&s.sectTrial.battle&&Array.isArray(s.sectTrial.enemies)){
        const foes=this.activeEnemies();
        s.sectTrial.enemies=foes.map(({id,hp,x,y})=>({id,hp,x,y}));
      }
      const t=s.sectTrial;
      if(t&&t.attempts===0&&t.wins===0&&!t.cleared&&t.lastOutcome===null&&!t.battle&&(!t.enemies||t.enemies.length===0))delete s.sectTrial;
      return s;
    }
  }
  const api={...Base,Game,validateSave,sectTrial:T};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
