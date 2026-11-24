(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-meet.js'):root.XiuxianEngine;
  const O=node?require('./sect-office-data.js'):root.XiuxianSectOfficeData;
  const C=node?require('./sect-career-data.js'):root.XiuxianSectCareerData;
  const T=node?require('./sect-trial-data.js'):root.XiuxianSectTrialData;
  const M=node?require('./sect-meet-data.js'):root.XiuxianSectMeetData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>({schema:O.schema,steps:[],lastOutcome:null});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const isStep=id=>typeof id==='string'&&Object.hasOwn(O.actions,id);
  const realms=['lianqi','zhuji','jindan','yuanying','huashen','heti','dacheng'];
  const place=O.place;

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectOffice;
    if(v===undefined){s.sectOffice=fresh();return s;}
    const fail=()=>{throw Error('门内权责记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==O.schema)fail();
    if(!Array.isArray(v.steps)||v.steps.length>O.maxSteps)fail();
    if(!(v.lastOutcome===null||v.lastOutcome==='done'))fail();
    const seen=new Set();
    for(const id of v.steps){
      if(!isStep(id)||seen.has(id))fail();
      // 次序必须真实：前置动作必须已经在本层记录里，不能只靠面板显示。
      const need=O.actions[id].requires;
      if(need&&!seen.has(need))fail();
      seen.add(id);
    }
    const office=s.sectCareer?s.sectCareer.office:null;
    const perms=(office&&C.offices[office])?C.offices[office].permissions:{recommend:false,lead:false,recruit:false,teach:false,govern:false};
    for(const id of v.steps){
      const permission=O.actions[id].permission;
      if(perms[permission]!==true)fail();
    }
    s.sectOffice=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;
      super(options);
      // 下层构造器按各自白名单重建存档，会丢掉本层域；这里只恢复本层已严格校验的记录。
      this.state.sectOffice=save?copy(save.sectOffice):fresh();
    }
    // 旧档如果不碰这些新功能，导出时不要把新增域写回玩家存档：只有真的用过才落盘。
    exportSave(){
      const s=super.exportSave();
      const defaults={
        sectCareer:{office:null,merit:0,prestige:0,duties:[]},
        sectTrial:{schema:T.schema,attempts:0,wins:0,cleared:false,lastOutcome:null,battle:false,enemies:[]},
        sectMeet:{schema:M.schema,attempts:0,rounds:0,round:0,qualified:false,bestRound:0,lastOutcome:null,battle:false,enemies:[]},
        sectOffice:fresh()
      };
      for(const key of Object.keys(defaults)){
        if(s[key]!==undefined&&JSON.stringify(s[key])===JSON.stringify(defaults[key]))delete s[key];
      }
      return s;
    }    sectOfficeRecord(){return this.state.sectOffice;}
    sectOfficeDone(id){return this.state.sectOffice.steps.includes(id);}
    sectOfficePermissions(){return this.careerPermissions();}
    sectOfficeReason(id){
      if(!isStep(id))return '没有这项门内权责。';
      const def=O.actions[id];
      if(this.state.sect?.id!=='hehuan')return '尚未入宗，门内权责只对门中人开放。';
      if(this.isChild())return '年幼不担门内权责。';
      if(this.careerRealm().index<realms.indexOf('zhuji'))return '筑基之后门内才把差事交给你。';
      if(!this.careerPermissions()[def.permission])return '当前职阶（'+(this.sectCareerStatus().officeName)+'）没有「'+def.name+'」之权。';
      if(this.sectOfficeDone(id))return '这件事已经记在门内档案里，不重复记。';
      if(def.requires&&!this.sectOfficeDone(def.requires))return '须先办成「'+O.actions[def.requires].name+'」。';
      if(this.state.map!=='garden')return '门内事务在'+place+'办理，先回药庐庭院。';
      if(this.state.hp<=0)return '气血未复，先调息。';
      if(this.state.run)return '行程中不办门内事务。';
      if(this.state.chapter?.training)return '修行未收束，先完成当前一课。';
      if(this.state.chapter?.tomb?.stage==='battle')return '旧阵未了，不能分心。';
      if(this.state.sectTrial?.battle||this.state.sectMeet?.battle)return '门内较技未收势，先比完这一场。';
      if(this.state.sectWorld?.escort?.phase==='battle')return '护路未了，先安顿药车。';
      return null;
    }
    sectOfficeStatus(){
      const rec=copy(this.state.sectOffice),perms=this.careerPermissions();
      return {
        joined:this.state.sect?.id==='hehuan',place,record:rec,
        actions:O.order.map(id=>{const def=O.actions[id];return {...copy(def),permissionHeld:perms[def.permission]===true,done:this.sectOfficeDone(id),reason:this.sectOfficeReason(id)};}),
        doneCount:rec.steps.length,total:O.order.length,source:O.source
      };
    }
    runSectOffice(id){
      const reason=this.sectOfficeReason(id);if(reason){this.message(reason);return false;}
      const def=O.actions[id];
      this.state.sectOffice.steps.push(id);
      this.state.sectOffice.lastOutcome='done';
      this.message('办成'+def.name+'：'+def.note+'此事只记门内档案，不支取物资，也不改贡献、功绩与威望。');
      this.checkpoint();return true;
    }
    sectStatus(){const status=super.sectStatus();status.office=this.sectOfficeStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectOffice:O};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
