(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./campaign.js'):root.XiuxianEngine;
  const C=node?require('./campaign-data.js'):root.XiuxianCampaignData;
  const S=node?require('./campaign-state.js'):root.XiuxianCampaignState;
  const Sect=node?require('./sects-data.js'):root.XiuxianSectsData;
  const Career=node?require('./sect-career-data.js'):root.XiuxianSectCareerData;
  const copy=x=>JSON.parse(JSON.stringify(x)),known=(o,id)=>typeof id==='string'&&Object.hasOwn(o,id);
  const realms=Object.keys(Career.realmTitles);
  const fresh=()=>({office:null,merit:0,prestige:0,duties:[]});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  const meritOf=duties=>duties.reduce((n,id)=>n+Career.duties[id].merit,0);
  const prestigeOf=duties=>duties.reduce((n,id)=>n+Career.duties[id].prestige,0);
  // 最高可行职阶：只由真实累计的功绩、威望与当前境界决定，界面与存档共用同一判定。
  function allowedOrder(merit,prestige,realmIndex){
    let order=0;
    for(const id of Career.order){
      const office=Career.offices[id],need=realms.indexOf(office.realm);
      if(merit>=office.merit&&prestige>=office.prestige&&realmIndex>=need)order=office.order;
    }
    return order;
  }
  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectCareer;
    if(v===undefined){s.sectCareer=fresh();return s;}
    const fail=()=>{throw Error('门内成长记录异常。');};
    if(!shape(v,Object.keys(fresh()))||!(v.office===null||known(Career.offices,v.office))||!integer(v.merit,Career.maxValue)||!integer(v.prestige,Career.maxValue)||!Array.isArray(v.duties))fail();
    const seen=new Set();
    for(const id of v.duties){if(!known(Career.duties,id)||seen.has(id))fail();seen.add(id);}
    if(v.merit!==meritOf(v.duties)||v.prestige!==prestigeOf(v.duties))fail();
    if(v.office===null){if(s.sect.id!==null||v.duties.length)fail();}
    else{
      if(s.sect.id!==Sect.id)fail();
      const realm=S.currentRealm(s.campaign||{},s),index=realm?realms.indexOf(realm):-1;
      if(Career.offices[v.office].order>allowedOrder(v.merit,v.prestige,index))fail();
    }
    s.sectCareer=copy(v);return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;super(options);
      // 旧档只恢复本层；未入宗者不给任何补造功绩或威望。
      const legacy=save?copy(save.sectCareer):fresh();
      this.state.sectCareer=legacy.office===null&&this.state.sect.id===Sect.id?{...legacy,office:'disciple'}:legacy;
    }
    joinSect(id=Sect.id,agreed=false){
      const ok=super.joinSect(id,agreed);
      if(ok&&this.state.sect.id===Sect.id&&this.state.sectCareer.office===null){this.state.sectCareer.office='disciple';}
      return ok;
    }
    careerRealm(){
      const id=S.currentRealm(this.state.campaign||{},this.state);
      return {id,index:id?realms.indexOf(id):-1,title:id?Career.realmTitles[id]:'尚未筑基'};
    }
    careerOrder(){const c=this.state.sectCareer;return c.office?Career.offices[c.office].order:0;}
    careerPermissions(){const c=this.state.sectCareer;return c.office?copy(Career.offices[c.office].permissions):{recommend:false,lead:false,recruit:false,teach:false,govern:false};}
    nextCareerOffice(){
      const c=this.state.sectCareer,next=Career.order[this.careerOrder()];
      return next?{...copy(Career.offices[next]),realmTitle:Career.realmTitles[Career.offices[next].realm]}:null;
    }
    sectDutyStatus(id){
      const def=known(Career.duties,id)?Career.duties[id]:null;if(!def)return null;
      const c=this.state.sectCareer,done=c.duties.includes(id),realm=this.careerRealm();
      const reason=this.sectDutyReason(id);
      return {...copy(def),done,reason,available:!reason,realmTitle:Career.realmTitles[def.realm],realmReached:realm.index>=realms.indexOf(def.realm)};
    }
    sectDutyReason(id){
      if(!known(Career.duties,id))return '没有这件门内事务。';
      const def=Career.duties[id];
      const place=this.sectMemberReason();if(place)return place;
      if(this.state.sectCareer.duties.includes(id))return '这件门内事务已经办过并记在册上，不重复计功。';
      const realm=this.careerRealm();if(realm.index<realms.indexOf(def.realm))return '须先修至'+Career.realmTitles[def.realm]+'，门内才把这件差事交给你。';
      return this.sectMaterialReason(def.cost);
    }
    runSectDuty(id){
      const reason=this.sectDutyReason(id);if(reason){this.message(reason);return false;}
      const def=Career.duties[id],c=this.state.sectCareer;
      for(const [item,n]of Object.entries(def.cost))this.state.inventory[item]-=n;
      c.duties.push(id);c.merit+=def.merit;c.prestige+=def.prestige;
      this.message('办完'+def.name+'：功绩 +'+def.merit+'，组织威望 +'+def.prestige+'。此事务已入册，不再重复计功。');
      this.checkpoint();return true;
    }
    promoteSectReason(){
      const place=this.sectMemberReason();if(place)return place;
      const c=this.state.sectCareer,next=this.nextCareerOffice();
      if(!next)return '门内职阶已到此层；宗主继任牵涉柳如烟的交接，不在本层自动产生。';
      const realm=this.careerRealm();
      if(realm.index<realms.indexOf(next.realm))return '晋升须先修至'+next.realmTitle+'。';
      if(c.merit<next.merit)return '累计功绩不足：还差 '+(next.merit-c.merit)+'。功绩只能由真实门内事务积累。';
      if(c.prestige<next.prestige)return '组织威望不足：还差 '+(next.prestige-c.prestige)+'。威望来自同门对你办事的信任，与清誉、威名分开记。';
      return '';
    }
    promoteSectOffice(){
      const reason=this.promoteSectReason();if(reason){this.message(reason);return false;}
      const next=this.nextCareerOffice(),c=this.state.sectCareer;
      c.office=next.id;
      this.message('门内记你为'+next.name+'。'+next.note+'功绩与威望原样保留，贡献另记一账。');
      this.checkpoint();return true;
    }
    sectCareerStatus(){
      const c=this.state.sectCareer,office=c.office?Career.offices[c.office]:null,next=this.nextCareerOffice();
      return {
        joined:this.state.sect.id===Sect.id,office:c.office,officeName:office?office.name:'尚未入门',order:this.careerOrder(),
        permissions:this.careerPermissions(),merit:c.merit,prestige:c.prestige,accounts:copy(Career.accounts),
        realm:this.careerRealm(),duties:Object.keys(Career.duties).map(id=>this.sectDutyStatus(id)),
        next,nextReason:this.promoteSectReason(),
        officeNote:office?office.note:'入宗先列记名弟子；举荐、带队、招录、亲传、治事随阶位逐项解锁，绝不一揽子相授。',
        record:copy(c),source:Career.source
      };
    }
    sectStatus(){const status=super.sectStatus();status.career=this.sectCareerStatus();return status;}
    sectPanel(){return this.sectStatus();}
  }
  const api={...Base,Game,validateSave,sectCareer:Career,sects:Sect};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
