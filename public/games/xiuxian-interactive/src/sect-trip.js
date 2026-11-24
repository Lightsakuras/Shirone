/* 门内赴会：备行装、途中真实遭遇、返宗交差。赛事本身仍未实现，只记门内行程。 */
(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  // office 在浏览器按 index.html 顺序接在 meet 之后、trip 之前；node 侧沿用同一线性链。
  const Base=node?require('./sect-office.js'):root.XiuxianEngine;
  const T=node?require('./sect-trip-data.js'):root.XiuxianSectTripData;
  const M=node?require('./sect-meet-data.js'):root.XiuxianSectMeetData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:T.schema,prepared:false,outbound:0,returned:0,cleared:false,lastOutcome:null,battle:false,enemies:[]});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  const foeDef=id=>T.foes.find(f=>f.id===id)||null;

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectTrip;
    if(v===undefined){s.sectTrip=fresh();return s;}
    const fail=()=>{throw Error('赴会行装记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==T.schema)fail();
    if(typeof v.prepared!=='boolean'||typeof v.cleared!=='boolean'||typeof v.battle!=='boolean')fail();
    if(!integer(v.outbound,T.maxTrips)||!integer(v.returned,T.maxTrips))fail();
    if(v.returned>v.outbound)fail();
    if(!(v.lastOutcome===null||v.lastOutcome==='returned'||v.lastOutcome==='loss'))fail();
    // 清过途中必然出过门；行装可在出门前先备好。
    if(v.cleared&&v.outbound<1)fail();
    if(!Array.isArray(v.enemies)||v.enemies.length>T.foes.length)fail();
    const seen=new Set();
    for(const e of v.enemies){
      const def=typeof e?.id==='string'?foeDef(e.id):null;
      if(!def||seen.has(e.id))fail();seen.add(e.id);
      if(!shape(e,['id','hp','x','y'])||typeof e.hp!=='number'||!(e.hp>=0&&e.hp<=def.maxHp))fail();
      if(typeof e.x!=='number'||typeof e.y!=='number')fail();
    }
    if(v.battle!==(v.enemies.length>0))fail();
    if(v.battle&&(!v.prepared||v.cleared||v.outbound<1))fail();
    if(v.battle&&s.sectTrial?.battle)fail();
    if(v.battle&&s.sectMeet?.battle)fail();
    s.sectTrip=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;
      super(options);
      // 下层构造器按各自白名单重建存档，会丢掉本层域；这里只恢复本层已严格校验的记录。
      this.state.sectTrip=save?copy(save.sectTrip):fresh();
      this.sectTripFoes=null;
    }
    static sectTripFresh(){return fresh();}
    sectTripFresh(){return fresh();}
    sectTripKit(){return copy(T.kit);}
    sectTripReason(action){
      const t=this.state.sectTrip;
      if(this.state.sect?.id!=='hehuan')return '尚未入宗，门内赴会只对门中人开放。';
      if(this.isChild())return '年幼不能赴会，先在门内看顾事务。';
      if((this.state.chapter?.rank??0)<4)return '筑基之后才可领赴会行装。';
      if(!this.state.sectMeet?.qualified)return '先过门内会武，取得赴会资格。';
      if(action==='prepare'&&t.prepared)return '行装已在身上，可以直接出门。';
      if(t.battle)return '途中尚未收势。';
      if(this.state.sectTrial?.battle)return '门内比试未收势，先比完这一场。';
      if(this.state.sectMeet?.battle)return '门内会武未收势，先比完这一轮。';
      if(action==='settle'){
        if(this.state.map!==T.settleMap)return '返宗交差要在'+T.settlePlace+'办理，先回药站。';
        if(!this.sectWorldNear('yunStation'))return T.settleNote;
      }
      else if(this.state.map!==T.map)return '赴会行装在'+T.place+'备办，先回庭院。';
      if(this.state.hp<=0)return '气血未复，先调息。';
      if(this.state.run)return '行程中不宜备装赴会。';
      if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      if(action==='depart'&&!t.prepared)return '先备行装再出门。';
      if(action==='depart'&&t.cleared)return '途中已打完，回药站向云照交差。';
      if(action==='settle'&&!t.cleared)return '途中尚未打完，不能交差。';
      if(t.outbound>=T.maxTrips)return '赴会已无可记场次。';
      return null;
    }
    sectTripStatus(){
      const t=copy(this.state.sectTrip);
      const active=t.battle;
      const foes=active?this.activeEnemies().map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp})):[];
      const inventory={};
      for(const id of Object.keys(T.kit))inventory[id]=Number(this.state.inventory?.[id]||0);
      return {id:T.id,title:T.title,place:T.place,intro:T.intro,kit:copy(T.kit),inventory,kitNote:T.kitNote,
        rewardNote:T.rewardNote,notYet:T.notYet,settleNote:T.settleNote,
        prepared:t.prepared,outbound:t.outbound,returned:t.returned,cleared:t.cleared,lastOutcome:t.lastOutcome,battle:t.battle,
        qualified:!!this.state.sectMeet?.qualified,
        prepareReason:this.sectTripReason('prepare'),departReason:this.sectTripReason('depart'),settleReason:this.sectTripReason('settle'),
        reason:this.sectTripReason('prepare'),foes,record:copy(t),source:T.source};
    }
    tripSpawn(){
      return T.foes.map(def=>({id:def.id,name:def.name,kind:def.kind,x:def.x,y:def.y,maxHp:def.maxHp,damage:def.damage,speed:def.speed,hp:def.maxHp,slow:0,burn:0,cooldown:1,wind:0,targetX:def.x,targetY:def.y}));
    }
    tripMaterialReason(){
      for(const [id,need] of Object.entries(T.kit))if(Number(this.state.inventory?.[id]||0)<need)return '行装不足：还缺'+(T.kitNames[id]||id)+' ×'+need+'。';
      return '';
    }
    prepareSectTrip(){
      const reason=this.sectTripReason('prepare');
      if(reason!==null)return false;
      const lack=this.tripMaterialReason();
      if(lack){this.message(lack);return false;}
      for(const [id,need] of Object.entries(T.kit))this.state.inventory[id]-=need;
      const t=this.state.sectTrip;
      t.prepared=true;t.lastOutcome=null;
      this.message('行装已备：回气丹 1、符纸 2 记在你身上。出庐山道上若有人拦路，须自己打完。');
      this.checkpoint();
      return true;
    }
    departSectTrip(){
      const reason=this.sectTripReason('depart');
      if(reason!==null)return false;
      const t=this.state.sectTrip;
      t.battle=true;t.outbound++;t.cleared=false;t.lastOutcome=null;
      t.enemies=this.tripSpawn().map(f=>({id:f.id,hp:f.hp,x:f.x,y:f.y}));
      this.sectTripFoes=null;
      this.resetTransient();
      this.message('出门赴会：药站山道有人拦路，自动迎敌，V 可暂停选敌。');
      this.events.push({type:'sectTrip'});
      return true;
    }
    sectTripBattleActive(){return !!this.state.sectTrip?.battle;}
    activeEnemies(){
      if(!this.sectTripBattleActive())return super.activeEnemies();
      return this.sectTripFoes||(this.sectTripFoes=(()=>{
        const live=this.tripSpawn();
        return this.state.sectTrip.enemies.map(rec=>{
          const def=live.find(f=>f.id===rec.id);
          return def?Object.assign(def,{hp:rec.hp,x:rec.x,y:rec.y}):null;
        }).filter(Boolean);
      })());
    }
    canFight(){if(this.sectTripBattleActive())return this.state.hp>0;return super.canFight();}
    attack(target){if(this.sectTripBattleActive()&&!this.canFight())return false;return super.attack(target);}
    castSkill(){if(this.sectTripBattleActive()&&!this.canFight())return false;const ok=super.castSkill();this.checkSectTripClear();return ok;}
    useItem(id,target){if(this.sectTripBattleActive()&&!this.canFight()&&['fire','needle','incense'].includes(id))return false;return super.useItem(id,target);}
    hitEnemy(e,amount){
      if(!this.sectTripBattleActive()||!this.activeEnemies().includes(e))return super.hitEnemy(e,amount);
      if(e.hp<=0)return;
      const before=e.hp;
      this.sectTrialSuppress++;
      try{super.hitEnemy(e,amount);}finally{this.sectTrialSuppress--;}
      this.events=this.events.filter(event=>!(event.type==='message'&&/散去，获得灵砂/.test(event.text||'')));
      if(before>0&&e.hp===0)this.checkSectTripClear();
    }
    checkSectTripClear(){
      const t=this.state.sectTrip;
      if(!t.battle)return;
      if(this.activeEnemies().some(f=>f.hp>0))return;
      t.battle=false;t.enemies=[];t.cleared=true;
      this.sectTripFoes=null;this.resetTransient();
      this.events=this.events.filter(event=>event.type!=='sectTrip');
      this.message('途中拦路已退，回到药站向云照交差，行程才记下。'+T.rewardNote);
      this.checkpoint();
    }
    settleSectTrip(){
      const reason=this.sectTripReason('settle');
      if(reason!==null)return false;
      const t=this.state.sectTrip;
      t.returned++;t.prepared=false;t.cleared=false;t.lastOutcome='returned';
      this.message('云照收下行程：这一程已记门内档案。'+T.notYet);
      this.events.push({type:'map'});
      this.checkpoint();
      return true;
    }
    endSectTrip(failed){
      const t=this.state.sectTrip;
      t.battle=false;t.enemies=[];t.cleared=false;t.lastOutcome=failed?'loss':t.lastOutcome;
      this.sectTripFoes=null;
      this.events=this.events.filter(event=>!['defeat','sectTrip'].includes(event.type));
      this.state.hp=100;this.restoreSpirit(100);this.resetTransient();
      this.message(failed?'途中失利：已退回药站调息。行装仍在身上，已得记录不夺，可再出门。':'已退回药站。');
    }
    takeDamage(amount){
      if(!this.sectTripBattleActive())return super.takeDamage(amount);
      super.takeDamage(amount);
      if(this.state.hp<=0)this.endSectTrip(true);
    }
    enemyStep(e,dt){
      if(!this.sectTripBattleActive()||!this.activeEnemies().includes(e))return super.enemyStep(e,dt);
      super.enemyStep(e,dt);
    }
    resetTransient(){
      super.resetTransient();
      for(const e of this.sectTripFoes||[])Object.assign(e,{slow:0,burn:0,wind:0,cooldown:1,targetX:e.x,targetY:e.y});
    }
    step(dt,input={}){
      if(this.events.some(e=>e.type==='sectTrip'))return;
      super.step(dt,input);
      this.checkSectTripClear();
    }
    objective(){
      const t=this.state.sectTrip;
      if(t.battle)return ['途中 · 拦路要打','自动普攻，V 暂停选敌与符药；失利退回药站，行装仍在。'];
      if(t.cleared)return ['返宗交差','回药站走近云照交差，行程才算记下。'];
      if(t.prepared)return ['出门赴会','行装已备，可出药站山道。'];
      return super.objective();
    }
    exportSave(){
      const s=super.exportSave(),t=s.sectTrip;
      if(t&&Array.isArray(t.enemies))t.enemies=t.enemies.map(({id,hp,x,y})=>({id,hp,x,y}));
      if(t&&!t.prepared&&t.outbound===0&&t.returned===0&&!t.cleared&&t.lastOutcome===null&&!t.battle&&(!t.enemies||t.enemies.length===0))delete s.sectTrip;
      return s;
    }
  }
  const api={...Base,Game,validateSave,sectTrip:T};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
