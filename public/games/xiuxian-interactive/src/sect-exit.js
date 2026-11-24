(function(root){
  'use strict';
  // 退宗层：在册状态下到药站向云照交代，主动退出合欢宗；保留功法与门内历史，清职阶、功绩、威望与可花贡献。
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-event.js'):root.XiuxianEngine;
  const X=node?require('./sect-exit-data.js'):root.XiuxianSectExitData;
  const D=node?require('./sects-data.js'):root.XiuxianSectsData;
  const copy=x=>JSON.parse(JSON.stringify(x));
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  const fresh=()=>({schema:X.schema,forfeited:0,history:[]});
  const entryShape=entry=>shape(entry,['office','merit','prestige','contribution','levels'])&&
    (entry.office===null||Object.hasOwn(Base.sectCareer.offices,entry.office))&&
    integer(entry.merit,Base.sectCareer.maxValue)&&integer(entry.prestige,Base.sectCareer.maxValue)&&
    integer(entry.contribution,D.maxDonations*D.donation.gain)&&
    shape(entry.levels,Object.keys(D.paths))&&Object.keys(D.paths).every(id=>integer(entry.levels[id],D.paths[id].maxLevel));

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectExit;
    if(v===undefined){s.sectExit=fresh();return s;}
    const fail=()=>{throw Error('退宗记录异常。');};
    if(!shape(v,Object.keys(fresh()))||v.schema!==X.schema)fail();
    if(!integer(v.forfeited,D.maxDonations*D.donation.gain))fail();
    if(!Array.isArray(v.history)||v.history.length>X.maxLeaves)fail();
    for(const entry of v.history)if(!entryShape(entry))fail();
    const last=v.history[v.history.length-1];
    // sect.left/forfeited 是门内账本，退宗历史必须与它逐项一致，不能凭空多出层数、功绩或威望。
    if(v.history.length!==(s.sect.left||0))fail();
    if(v.forfeited!==(s.sect.forfeited||0))fail();
    if(s.sect.id===null&&v.history.length===0)fail();
    if(s.sect.id===null&&last){
      if(!shape(last.levels,Object.keys(D.paths))||Object.keys(D.paths).some(id=>last.levels[id]!==s.sect.levels[id]))fail();
      if(s.sect.contribution!==0)fail();
      if(s.sectCareer&&(s.sectCareer.office!==null||s.sectCareer.merit!==0||s.sectCareer.prestige!==0))fail();
    }
    s.sectExit=copy(v);return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;super(options);
      this.state.sectExit=save?copy(save.sectExit):fresh();
    }
    sectExitHistory(){return this.state.sectExit.history.slice();}
    leaveSectReason(){
      if(!this.state.sect.id)return '当前不在宗门名册上，无须退宗。';
      if(this.isChild())return '童年尚未入门，谈不上退宗。';
      const busy=this.sectTrialBattleActive&&this.sectTrialBattleActive()?'门内仍有交手未收势。':
        this.state.sectTrial&&this.state.sectTrial.battle?'门内比试未收势。':
        this.state.sectMeet&&this.state.sectMeet.battle?'门内会武未收势。':
        this.state.sectTrip&&this.state.sectTrip.battle?'赴会途中仍在交手。':
        this.state.sectEvent&&this.state.sectEvent.battle?'赛事仍在交手。':
        this.state.sectWorld&&this.state.sectWorld.escort&&this.state.sectWorld.escort.phase==='battle'?'护路委托仍在交手。':
        this.state.chapter&&this.state.chapter.tomb&&this.state.chapter.tomb.stage==='battle'?'旧阵战斗未收势。':'';
      if(busy)return busy;
      if(this.state.run)return '旧阵探索中不能退宗，先退出探索。';
      if(this.state.chapter&&this.state.chapter.training)return '正在修行课业，收势后再谈退宗。';
      if(this.state.hp<=0)return '气血未复，先养伤再谈退宗。';
      if(this.state.sectExit.history.length>=X.maxLeaves)return '门内档案已记满退宗次数，暂不再受理。';
      if(this.state.map!=='hehuan')return '退宗须到行旅药站向云照交代。';
      if(!this.sectWorldNear('yunStation'))return '先走近云照，再谈退宗。';
      return '';
    }
    leaveSect(confirmed=false){
      const reason=this.leaveSectReason()||(confirmed!==true?'退宗须本人明确确认；未确认不会改动任何记录。':'');
      if(reason){this.message(reason);return false;}
      const s=this.state.sect,career=this.state.sectCareer||{office:null,merit:0,prestige:0,duties:[]},exit=this.state.sectExit;
      exit.history.push({office:career.office,merit:career.merit,prestige:career.prestige,contribution:s.contribution,levels:copy(s.levels)});
      exit.forfeited+=s.contribution;
      s.forfeited=(s.forfeited||0)+s.contribution;
      s.contribution=0;
      s.left=(s.left||0)+1;
      s.id=null;
      if(this.state.sectCareer){this.state.sectCareer.office=null;this.state.sectCareer.merit=0;this.state.sectCareer.prestige=0;this.state.sectCareer.duties=[];}
      this.message('云照提笔将你的名字自门内名册划去：已修功法与往日实绩封存留档，职阶与可花贡献悉数收回；自此你以散修之身行走山河。');
      this.checkpoint();return true;
    }
    rejoinSectReason(id=D.id){
      if(id!==D.id)return '没有这个可回去的宗门。';
      if(this.state.sect.id)return '已经在册。';
      if(this.state.sectExit.history.length===0)return '';
      return this.sectPlaceReason();
    }
    rejoinSect(id=D.id,agreed=false){
      const reason=this.rejoinSectReason(id)||(agreed!==true?'重新入宗须再次明确同意成年自愿、不伤无辜的门规。':'');
      if(reason){this.message(reason);return false;}
      this.state.sect.id=D.id;
      if(this.state.sectCareer)this.state.sectCareer.office='disciple';
      this.message('云照在名册新页重新录下你的名字：阶位仍自记名弟子起算，旧日修成的功法无需重练，功绩与威望则自今日从头计起。');
      this.checkpoint();return true;
    }
    sectExitStatus(){
      const exit=this.state.sectExit,last=exit.history[exit.history.length-1]||null;
      return {id:X.id,title:X.title,place:X.place,joined:!!this.state.sect.id,
        leaves:exit.history.length,maxLeaves:X.maxLeaves,forfeited:exit.forfeited,
        last:last?{office:last.office,officeName:last.office?Base.sectCareer.offices[last.office].name:null,layers:Object.values(last.levels||{}).reduce((a,b)=>a+b,0),merit:last.merit,prestige:last.prestige,contribution:last.contribution}:null,
        levels:copy(this.state.sect.levels),
        keepNote:X.keepNote,clearNote:X.clearNote,remainNote:X.remainNote,confirmNote:X.confirmNote,
        leaveReason:this.leaveSectReason(),
        rejoinReason:this.state.sect.id?'':this.rejoinSectReason(),
        record:copy(exit),source:X.source};
    }
    exportSave(){
      const s=super.exportSave(),e=s.sectExit;
      if(e&&e.forfeited===0&&e.history.length===0)delete s.sectExit;
      return s;
    }
    sectStatus(){const status=super.sectStatus();status.exit=this.sectExitStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectExit:X};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
