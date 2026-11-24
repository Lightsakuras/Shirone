(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./sect-intro.js'):root.XiuxianEngine;
  const X=node?require('./sect-secret-data.js'):root.XiuxianSectSecretData;
  const C=node?require('./sect-career-data.js'):root.XiuxianSectCareerData;
  const Sect=node?require('./sects-data.js'):root.XiuxianSectsData;
  const Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),known=(o,id)=>typeof id==='string'&&Object.hasOwn(o,id);
  const realmOrder=Object.keys(C.realmTitles);
  const BaseGame=Base.Game;
  const fresh=()=>({schema:X.schema,tiers:[]});
  function validateSave(value){
    const s=Base.validateSave(value),v=value.sect;if(v===undefined)return s;
    if(v.secret!==undefined){
      const sec=v.secret,fail=()=>{throw Error('独门修习记录异常。');};
      if(!sec||typeof sec!=='object'||Array.isArray(sec)||Object.keys(sec).length!==2||sec.schema!==X.schema||!Array.isArray(sec.tiers))fail();
      if(sec.tiers.some(id=>!known(X.tiers,id)))fail();
      if(new Set(sec.tiers).size!==sec.tiers.length)fail();
      const seen=new Set();
      for(const id of X.order){
        if(!sec.tiers.includes(id))continue;
        const need=X.tiers[id].requires.tier;
        if(need&&!seen.has(need))fail();
        seen.add(id);
      }
    }
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){super(options);this.state.sect.secret=options.save?.sect?.secret?copy(options.save.sect.secret):fresh();}
    exportSave(){
      const s=super.exportSave();
      if(s.sect&&Array.isArray(s.sect.secret?.tiers)&&s.sect.secret.tiers.length===0)delete s.sect.secret;
      return s;
    }
    sectSecretTiers(){return this.state.sect.secret.tiers;}
    sectSecretDone(id){return this.sectSecretTiers().includes(id);}
    sectSecretReason(id){
      if(!known(X.tiers,id))return '没有这篇独门修习。';
      if(!this.state.sect.id)return '独门修习只传在册弟子，先自愿加入合欢宗。';
      if(this.isChild()||!this.canUseSpiritualPower())return '成年并仍在修行时才可修习独门功法。';
      if(this.sectSecretDone(id))return '这一篇已经修成，不重复记录。';
      const def=X.tiers[id],need=def.requires,prevIndex=X.order.indexOf(id)-1,prev=prevIndex>=0?X.tiers[X.order[prevIndex]]:null;
      if(prev&&!this.sectSecretDone(prev.id))return prev.name+'尚未修成，两篇有先后。';
      const level=this.state.sect.levels[need.path];
      if(level<need.level)return Sect.paths[need.path].name+'须先修满第'+need.level+'层，当前第'+level+'层。';
      const mine=this.careerRealm().index;
      if(mine<realmOrder.indexOf(need.realm))return '境界不足：须达到'+C.realmTitles[need.realm]+'。';
      if(this.state.sect.contribution<def.contribution)return '宗门贡献不足：这一篇要求持有 '+def.contribution+' 点贡献（只作门槛，不扣）。';
      for(const [item,n]of Object.entries(def.cost))if((this.state.inventory[item]||0)<n)return Items.items[item].name+'不足，备齐全部用料后再办理。';
      const place=this.sectPlaceReason();if(place)return place;
      return '';
    }
    learnSectSecret(id,agreed=false){
      const reason=this.sectSecretReason(id)||(agreed!==true?'先明确同意本次修习约定；未同意不会扣材料。':'');
      if(reason){this.message(reason);return false;}
      const def=X.tiers[id],sec=this.state.sect.secret;
      for(const [item,n]of Object.entries(def.cost))this.state.inventory[item]-=n;
      sec.tiers.push(id);
      sec.tiers.sort((a,b)=>X.order.indexOf(a)-X.order.indexOf(b));
      this.message(def.result);this.checkpoint();return true;
    }
    sectSecretInfo(id){
      if(!known(X.tiers,id))return null;
      const def=X.tiers[id],need=def.requires;
      return {id,name:def.name,order:def.order,cost:copy(def.cost),contribution:def.contribution,effect:copy(def.effect),done:this.sectSecretDone(id),level:this.state.sect.levels[need.path],needLevel:need.level,pathName:Sect.paths[need.path].name,realmId:need.realm,realmTitle:C.realmTitles[need.realm],realm:realmOrder.indexOf(need.realm)<=this.careerRealm().index,desc:def.desc};
    }
    sectSecretStatus(){
      const tiers=X.order.map(id=>{const info=this.sectSecretInfo(id);return {...info,reason:this.sectSecretReason(id)};});
      return {joined:!!this.state.sect.id,place:X.place,tiers,doneCount:tiers.filter(t=>t.done).length,total:tiers.length,note:X.note,contribution:this.state.sect.contribution,source:X.source};
    }
    // 秘传只改既有功法的数值：不新增招式，也不绕过宗门判定。
    sectSkillInfo(id){
      const info=BaseGame.prototype.sectSkillInfo.call(this,id);
      if(!info)return info;
      const boost={heal:0,ward:0,damage:0,returnCap:0};
      for(const tierId of X.order){
        if(!this.sectSecretDone(tierId))continue;
        const def=X.tiers[tierId];
        if(def.requires.path!==info.path)continue;
        for(const key of Object.keys(boost))if(typeof def.effect[key]==='number')boost[key]+=def.effect[key];
      }
      const spell=1+(this.combatProfile().spell||0);
      if(info.heal!==undefined&&boost.heal){info.heal+=boost.heal;info.ward+=boost.ward;info.detail=info.detail.replace(/恢复气血 \d+/,'恢复气血 '+info.heal).replace(/护身 \d+ 秒/,'护身 '+info.ward+' 秒');}
      if(info.damage!==undefined){
        if(boost.damage)info.damage+=boost.damage*spell;
        if(boost.returnCap)info.returnCap+=boost.returnCap;
        info.detail=info.detail.replace(/单敌基础伤害 \d+/,'单敌基础伤害 '+Math.round(info.damage)).replace(/单次最多 \d+/,'单次最多 '+info.returnCap);
      }
      return info;
    }
    sectStatus(){
      const status=BaseGame.prototype.sectStatus.call(this);
      status.secret=this.sectSecretStatus();
      return status;
    }
  }
  const api={...Base,Game,validateSave,sectSecret:X};
  if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
