(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./sect-secret.js'):root.XiuxianEngine;
  const X=node?require('./sect-manage-data.js'):root.XiuxianSectManageData;
  const C=node?require('./sect-career-data.js'):root.XiuxianSectCareerData;
  const Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),known=(o,id)=>typeof id==='string'&&Object.hasOwn(o,id);
  const BaseGame=Base.Game;
  const fresh=()=>({schema:X.schema,steps:[]});
  const count=steps=>id=>steps.filter(s=>s===id).length;
  function validateSave(value){
    const s=Base.validateSave(value),v=value.sect;if(v===undefined)return s;
    if(v.manage!==undefined){
      const m=v.manage,fail=()=>{throw Error('招录与经营记录异常。');};
      if(!m||typeof m!=='object'||Array.isArray(m)||Object.keys(m).length!==2||m.schema!==X.schema||!Array.isArray(m.steps))fail();
      if(m.steps.some(id=>!known(X.actions,id)))fail();
      const seen=new Set();
      for(const id of X.order){
        const n=count(m.steps)(id);
        if(n>0&&X.actions[id].requires&&count(m.steps)(X.actions[id].requires)===0)fail();
        if(n>1&&id==='enroll'&&count(m.steps)('relieve')<n-1)fail();
        if(n>0||m.steps.includes(id))seen.add(id);
      }
      const roster=count(m.steps)('enroll')-count(m.steps)('relieve');
      if(roster<0)fail();
      if(count(m.steps)('assign')>count(m.steps)('enroll'))fail();
      const office=value.sectCareer&&value.sectCareer.office;
      if(office){
        const perms=careerPerms(office);
        for(const id of seen)if(perms&&perms[X.actions[id].permission]!==true)fail();
      }
    }
    return s;
  }
  function careerPerms(office){const o=C.offices[office];return o?copy(o.permissions):null;}
  class Game extends Base.Game{
    constructor(options={}){super(options);this.state.sect.manage=options.save?.sect?.manage?copy(options.save.sect.manage):fresh();}
    exportSave(){
      const s=super.exportSave();
      if(s.sect&&Array.isArray(s.sect.manage?.steps)&&s.sect.manage.steps.length===0)delete s.sect.manage;
      return s;
    }
    sectManageSteps(){return this.state.sect.manage.steps;}
    sectManageCount(id){return count(this.sectManageSteps())(id);}
    sectManageRoster(){return this.sectManageCount('enroll')-this.sectManageCount('relieve');}
    sectManagePermission(id){
      const def=X.actions[id];if(!def)return null;
      const perms=this.careerPermissions?this.careerPermissions():null;
      return perms?perms[def.permission]===true:false;
    }
    sectManageReason(id){
      const def=X.actions[id];
      if(!def)return '没有这项门内经营。';
      if(!this.state.sect.id)return '招录与经营只归在册弟子，先自愿加入合欢宗。';
      if(this.isChild()||!this.canUseSpiritualPower())return '成年并仍在修行时才办门内经营。';
      if(!this.sectManagePermission(id)){
        const office=this.state.sectCareer&&this.state.sectCareer.office;
        const name=office&&C.offices[office]?C.offices[office].name:'当前职阶';
        return name+'没有「'+def.name+'」之权。';
      }
      const need=def.requires;
      if(need&&this.sectManageCount(need)===0)return '须先办成「'+X.actions[need].name+'」。';
      if(id==='assign'&&this.sectManageRoster()<1)return '名册上还没有弟子，先招录一名。';
      if(id==='relieve'&&this.sectManageRoster()<1)return '名册上没有在册弟子可交卸。';
      if(id==='enroll'&&def.cost)for(const [item,n]of Object.entries(def.cost))if((this.state.inventory[item]||0)<n)return Items.items[item].name+'不足，备齐后再招录。';
      if(this.state.hp<=0)return '气血不济，先歇一歇。';
      if(this.state.run)return '行程中不办门内经营。';
      if(this.state.chapter&&this.state.chapter.training)return '修行未收束，先完成当前一课。';
      if(this.state.chapter&&this.state.chapter.tomb&&this.state.chapter.tomb.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectTrial&&this.state.sectTrial.battle)return '较技未了，先把这一场打完。';
      if(this.state.sectMeet&&this.state.sectMeet.battle)return '会武未了，先把这一场打完。';
      if(this.state.sectEvent&&this.state.sectEvent.battle)return '赛事未了，先把这一场打完。';
      if(this.state.sectWorld&&this.state.sectWorld.escort&&this.state.sectWorld.escort.phase==='battle')return '护路未了，先安顿药车。';
      const place=this.sectPlaceReason?this.sectPlaceReason():'';
      if(place)return place;
      return '';
    }
    runSectManage(id){
      const reason=this.sectManageReason(id);
      if(reason){this.message(reason);return false;}
      const def=X.actions[id];
      if(def.cost)for(const [item,n]of Object.entries(def.cost))this.state.inventory[item]-=n;
      this.state.sect.manage.steps.push(id);
      this.message(def.result);this.checkpoint();return true;
    }
    sectManageStatus(){
      const roster=this.sectManageRoster();
      const actions=X.order.map(id=>{const def=X.actions[id];return {id,name:def.name,detail:def.detail,permission:def.permission,permissionHeld:this.sectManagePermission(id),done:this.sectManageCount(id)>0,count:this.sectManageCount(id),cost:copy(def.cost),reason:this.sectManageReason(id)};});
      const office=this.state.sectCareer&&this.state.sectCareer.office;
      return {
        joined:!!this.state.sect.id,
        place:X.place,
        office:office||null,
        officeName:office&&C.offices[office]?C.offices[office].name:null,
        roster:roster,
        enrolled:this.sectManageCount('enroll'),
        assigned:this.sectManageCount('assign'),
        audited:this.sectManageCount('audit'),
        relieved:this.sectManageCount('relieve'),
        actions:actions,
        doneCount:actions.filter(a=>a.done).length,
        total:actions.length,
        note:X.note,
        source:X.source
      };
    }
    sectStatus(){
      const status=BaseGame.prototype.sectStatus.call(this);
      status.manage=this.sectManageStatus();
      return status;
    }
  }
  const api={...Base,Game,validateSave,sectManage:X};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
