(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-trip.js'):root.XiuxianEngine;
  const B=node?require('./sect-bond-data.js'):root.XiuxianSectBondData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const fresh=()=>{
    const talks={};
    for(const id of B.order)talks[id]=[];
    return {schema:B.schema,talks};
  };
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const knownPerson=id=>typeof id==='string'&&Object.hasOwn(B.people,id);
  const knownTopic=(personId,topicId)=>knownPerson(personId)&&B.people[personId].topics.some(t=>t.id===topicId)||(knownPerson(personId)&&!!B.people[personId].deep&&B.people[personId].deep.id===topicId);
  const topicsOf=id=>{
    const p=B.people[id];
    return p.deep?p.topics.concat([{id:p.deep.id,label:p.deep.label,text:p.deep.template,deep:true}]):p.topics.slice();
  };
  const fill=(text,values)=>String(text).replace(/\{(\w+)\}/g,(all,key)=>Object.hasOwn(values,key)?String(values[key]):all);

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectBond;
    if(v===undefined){s.sectBond=fresh();return s;}
    const fail=()=>{throw Error('门内往来记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==B.schema)fail();
    if(!shape(v.talks,B.order.slice())&&!shape(v.talks,B.order))fail();
    for(const id of B.order){
      const list=v.talks[id];
      if(!Array.isArray(list)||!Array.isArray(list)&&list!==undefined)fail();
      if(!Array.isArray(list)||list.length>topicsOf(id).length)fail();
      const seen=new Set();
      for(const t of list){
        if(!knownTopic(id,t)||seen.has(t))fail();
        seen.add(t);
      }
    }
    s.sectBond=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      const save=options&&options.save?validateSave(options.save):null;
      super(options);
      // 下层构造器按各自白名单重建存档，会把本层域丢掉；这里只恢复本层已严格校验的记录。
      this.state.sectBond=save?copy(save.sectBond):fresh();
    }
    bonded(personId){return knownPerson(personId)?this.state.sectBond.talks[personId]:null;}
    bondCloseness(personId){const l=this.bonded(personId);return l?l.length:0;}
    bondLabel(personId){return B.labels[Math.min(this.bondCloseness(personId),B.labels.length-1)];}
    // 相处更深的条件：只读真实做过的事，不引入好感数值。
    bondSignals(){
      const c=this.state.sectCareer,o=this.state.sectOffice,t=this.state.sectTrip,e=this.state.sectEvent,sec=this.state.sectSecret,i=this.state.sectIntro;
      const tiers=sec&&Array.isArray(sec.tiers)?sec.tiers.length:0;
      return {
        intro:!!(i&&i.greeted),
        service:this.sectIntroService?this.sectIntroService():false,
        duties:!!(c&&Array.isArray(c.duties)&&c.duties.length>0),
        secret:tiers>0,
        trip:!!(t&&t.returned>0),
        event:!!(e&&e.reported===true),
        office:!!(o&&Array.isArray(o.steps)&&o.steps.length>0),
        prestige:!!(c&&c.prestige>0),
        tiers,
        dutiesCount:c&&Array.isArray(c.duties)?c.duties.length:0,
        returned:t&&Number.isFinite(t.returned)?t.returned:0,
        wins:e&&Number.isFinite(e.wins)?e.wins:0,
        officeCount:o&&Array.isArray(o.steps)?o.steps.length:0
      };
    }
    bondDeepRoad(personId){
      const p=knownPerson(personId)?B.people[personId]:null;
      if(!p||!p.deep)return null;
      const sig=this.bondSignals(),need=p.deep.requires;
      const missing=[];
      if(this.bondCloseness(personId)<need.talks)missing.push('还要再谈 '+need.talks+' 段往来');
      for(const key of need.all||[])if(!sig[key])missing.push(B.signalLabels[key]||key);
      if(Array.isArray(need.any)&&need.any.length&&!need.any.some(key=>sig[key]))missing.push(need.any.map(key=>B.signalLabels[key]||key).join(' 或 '));
      return {id:p.deep.id,talks:need.talks,closeness:this.bondCloseness(personId),missing,ready:missing.length===0,signals:sig};
    }
    bondPersonGone(personId){return personId==='luqinghe'&&this.state.sectWorld?.contract?.choice==='pressure';}
    bondBusy(){
      if(this.sectTrialBattleActive&&this.sectTrialBattleActive())return true;
      if(this.state.sectTrial?.battle||this.state.sectMeet?.battle||this.state.sectTrip?.battle)return true;
      if(this.state.sectWorld?.escort?.phase==='battle')return true;
      if(this.state.chapter?.tomb?.stage==='battle')return true;
      return false;
    }
    bondReason(personId,topicId){
      if(!knownPerson(personId))return '没有这位门内人物。';
      if(!knownTopic(personId,topicId))return '没有这段往来。';
      const p=B.people[personId];
      if(!this.state.sect||!this.state.sect.id)return '入门之后才有门内往来。';
      if(this.isChild())return '童年不涉门内往来。';
      if(this.state.hp<=0)return '气血已尽，先回药庐。';
      if(this.state.run)return '行囊在身，先把这一趟走完。';
      if(this.state.chapter?.training)return '修行未收势，先回蒲团。';
      if(this.bondBusy())return '此刻并非闲谈的时候。';
      if(this.state.map!==B.map)return '往来都在'+B.place+'。';
      if(this.bondPersonGone(personId))return p.goneNote;
      if(!this.sectWorldNear(p.objectId))return '走近'+p.name+'再说。';
      if((this.state.sectBond.talks[personId]||[]).includes(topicId))return '这段已经谈过了。';
      const deep=p.deep&&p.deep.id===topicId?this.bondDeepRoad(personId):null;
      if(deep&&!deep.ready)return '还不够熟：'+deep.missing.join('；')+'。';
      return '';
    }
    bondTalk(personId,topicId){
      const reason=this.bondReason(personId,topicId);
      if(reason){this.message(reason);return false;}
      const p=B.people[personId];
      const deep=p.deep&&p.deep.id===topicId?p.deep:null;
      const t=deep?{id:deep.id,label:deep.label,text:deep.template}:p.topics.find(x=>x.id===topicId);
      const sig=this.bondSignals();
      const text=fill(t.text,{duties:sig.dutiesCount,tiers:sig.tiers,returned:sig.returned,wins:sig.wins,office:sig.officeCount});
      this.state.sectBond.talks[personId].push(topicId);
      this.message(text.replace(/^她/,p.name));
      this.checkpoint();
      return true;
    }
    bondStatus(){
      const joined=!!(this.state.sect&&this.state.sect.id);
      const people=B.order.map(id=>{
        const p=B.people[id];
        const deep=this.bondDeepRoad(id),list=topicsOf(id);
        return {
          id,name:p.name,age:p.age,role:p.role,note:p.note,required:p.objectId,
          gone:this.bondPersonGone(id),
          closeness:this.bondCloseness(id),label:this.bondLabel(id),
          deep:{id:deep.id,label:p.deep.label,gate:deep.ready?'可谈':'还需要：'+deep.missing.join('；'),ready:deep.ready,missing:deep.missing},
          topics:list.map(t=>({id:t.id,label:t.label,text:t.text,deep:!!t.deep,done:(this.state.sectBond.talks[id]||[]).includes(t.id),reason:this.bondReason(id,t.id)}))
        };
      });
      return {
        joined,place:B.place,map:B.map,maxTopics:B.maxTopics,people,
        total:people.reduce((n,p)=>n+p.closeness,0),
        partnerNote:B.partnerNote,accountsNote:B.accountsNote,excludedNote:B.excludedNote,
        deepNote:B.deepNote,record:copy(this.state.sectBond),source:B.source
      };
    }
    // 旧档如果不碰门内往来，导出时不要把新增域写回玩家存档。
    exportSave(){
      const s=super.exportSave();
      const b=s.sectBond;
      if(b&&B.order.every(id=>((b.talks&&b.talks[id])||[]).length===0))delete s.sectBond;
      return s;
    }
    sectStatus(){const status=super.sectStatus();status.bond=this.bondStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectBond:B};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
