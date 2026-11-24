(function(root){
  'use strict';
  // 入门前置层：合欢宗不再「勾一下就算入宗」。必须先与云照相识、在药站办成一件公开事务，再明确确认。
  const node=typeof module==='object'&&module.exports;
  const Base=node?require('./sect-exit.js'):root.XiuxianEngine;
  const X=node?require('./sect-intro-data.js'):root.XiuxianSectIntroData;
  const D=node?require('./sects-data.js'):root.XiuxianSectsData;
  const YUN_OBJECT='yunStation';
  const copy=x=>JSON.parse(JSON.stringify(x));
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const fresh=()=>({schema:X.schema,greeted:false});

  function validateSave(value){
    const s=Base.validateSave(value),v=value.sectIntro;
    if(v===undefined){s.sectIntro=fresh();return s;}
    if(!shape(v,Object.keys(fresh()))||v.schema!==X.schema||typeof v.greeted!=='boolean')throw Error('入门前置记录异常。');
    // 已在册的旧档即使没有前置记录也照常放行；这里只校验记录自身形状，不替玩家补记相识。
    s.sectIntro=copy(v);return s;
  }

  class Game extends Base.Game{
    constructor(options={}){
      // 只在本层校验一次；下层按原始存档各自校验，避免把本层补出的空域再喂回带不变式的下层。
      const save=options.save?validateSave(options.save):null;
      super(save?{...options,save:options.save}:options);
      this.state.sectIntro=save?copy(save.sectIntro):fresh();
    }
    exportSave(){
      const s=super.exportSave();
      // 未用前置时保持旧档原样，不写入空域。
      if(s.sectIntro&&s.sectIntro.greeted===false)delete s.sectIntro;
      return s;
    }
    sectIntroGreeted(){return this.state.sectIntro.greeted===true;}
    sectIntroService(){
      const w=this.sectWorldStatus();
      return {done:w.merit>=1,merit:w.merit,inWorld:w.inWorld,entryReason:w.entryReason};
    }
    sectIntroAtYun(){return this.inSectWorld()&&this.sectWorldNear(YUN_OBJECT);}
    greetSectIntroReason(){
      if(this.state.sect.id)return '已在册中，无须再次相识。';
      if(this.sectIntroGreeted())return '云照已经与你讲过门规。';
      if(this.isChild()||this.sectAge()<20)return '成年后才可议宗门之事。';
      const place=this.sectPlaceReason();
      if(place)return place;
      if(!this.inSectWorld())return X.notes.noService;
      if(!this.sectIntroAtYun())return '先走到云照身边。';
      return this.sectWorldSafeReason()||'';
    }
    greetSectIntro(){
      const reason=this.greetSectIntroReason();
      if(reason){this.message(reason);return false;}
      this.state.sectIntro.greeted=true;
      this.message('云照把门规讲完：男女同权，成年自愿，逐次立约，不伤无辜；入宗只新增归属，来处与师承都保留。');
      this.checkpoint();return true;
    }
    sectIntroReason(id=D.id,agreed=false){
      const base=this.joinSectReason(id);
      if(base)return base;
      if(agreed!==true)return '先明确同意成年自愿、不伤无辜的门规。';
      if(!this.sectIntroGreeted())return X.notes.beforeGreet;
      if(!this.sectIntroService().done)return X.notes.beforeService;
      return '';
    }
    joinSect(id=D.id,agreed=false){
      const reason=this.sectIntroReason(id,agreed);
      if(reason){this.message(reason);return false;}
      return super.joinSect(id,agreed);
    }
    // 仅测试夹具与历史迁移使用：跳过三步前置，仍走真实入门结算。
    // 注意：形参默认值会把显式 undefined 也当成「未传」，所以同意值要从 arguments 取，才能拒绝 undefined/false/'yes'。
    admitSectDirect(id=D.id){return super.joinSect(id,arguments.length>1?arguments[1]:true);}
    sectIntroStatus(){
      const w=this.sectWorldStatus(),service=this.sectIntroService();
      const steps=X.steps.map(step=>{
        if(step.id==='greet')return {id:step.id,name:step.name,label:step.label,detail:step.detail,done:this.sectIntroGreeted(),reason:this.greetSectIntroReason()};
        if(step.id==='service')return {id:step.id,name:step.name,label:step.label,detail:step.detail,done:service.done,merit:service.merit,reason:service.done?'':X.notes.beforeService};
        return {id:step.id,name:step.name,label:step.label,detail:step.detail,done:this.state.sect.id===D.id,reason:''};
      });
      return {
        id:X.id,place:X.place,sect:X.sect,rules:X.rules.slice(),steps,
        greeted:this.sectIntroGreeted(),serviceDone:service.done,serviceMerit:service.merit,
        inWorld:w.inWorld,station:w.name,
        ready:!this.sectIntroReason(D.id,true),
        note:!this.sectIntroGreeted()?X.notes.beforeGreet:(service.done?'三步已具备：勾选门规后可入门。':X.notes.servicePending),
        source:X.source
      };
    }
    sectStatus(){const status=super.sectStatus();status.intro=this.sectIntroStatus();return status;}
  }
  const api={...Base,Game,validateSave,sectIntro:X};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
