(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./backgrounds.js'):root.XiuxianEngine;
  const D=node?require('./sects-data.js'):root.XiuxianSectsData,Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),known=(o,id)=>typeof id==='string'&&Object.hasOwn(o,id);
  // 未退宗时新档不写 left/forfeited：保持与 v1.9.1 旧档、历史世界快照逐字节同形。
  const fresh=()=>({id:null,contribution:0,donations:0,levels:{dual:0,siphon:0},agreements:0,casts:{harmony:0,covenant:0,ravage:0},effective:{covenant:0,ravage:0}});
  const shape=(v,keys)=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===keys.length&&keys.every(k=>Object.hasOwn(v,k));
  const integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  function validateSave(value){
    const s=Base.validateSave(value),v=value.sect;if(v===undefined){s.sect=fresh();return s;}
    const fail=()=>{throw Error('宗门修习记录异常。');};
    // 旧档与历史世界快照只有八项：left/forfeited 是新增门内账，缺省视为未退宗、未清零，校验时按缺省补算但不写回副本。
    const base=Object.keys(fresh()),allowed=[...base,'left','forfeited','secret','manage'];
    const okKeys=!!v&&typeof v==='object'&&!Array.isArray(v)&&base.every(key=>Object.hasOwn(v,key))&&Object.keys(v).every(key=>allowed.includes(key));
    const left=v&&Number.isInteger(v.left)?v.left:0,forfeited=v&&Number.isInteger(v.forfeited)?v.forfeited:0;
    if(!okKeys||![null,D.id].includes(v.id)||!integer(v.donations,D.maxDonations)||!integer(v.contribution,D.maxDonations*D.donation.gain)||!integer(v.agreements,6)||!shape(v.levels,Object.keys(D.paths))||!shape(v.casts,Object.keys(D.skills))||!shape(v.effective,['covenant','ravage'])||!integer(left,9)||!integer(forfeited,D.maxDonations*D.donation.gain))fail();
    for(const id of Object.keys(D.paths))if(!integer(v.levels[id],D.paths[id].maxLevel))fail();
    for(const id of Object.keys(D.skills))if(!integer(v.casts[id],D.maxActions)||v.casts[id]>0&&!v.levels[D.skills[id].path])fail();
    for(const id of Object.keys(v.effective))if(!integer(v.effective[id],D.maxActions)||v.effective[id]>v.casts[id])fail();
    const spent=Object.entries(v.levels).reduce((n,[id,l])=>n+D.paths[id].contribution*l*(l+1)/2,0);
    // 退宗后保留功法与历史：left/forfeited 记在 sect 自身，才能穿过下层白名单存档重建而不被丢掉。
    if(v.contribution!==v.donations*D.donation.gain-spent-forfeited||v.agreements!==v.levels.dual+v.levels.siphon)fail();
    if(v.id===null&&left===0&&(v.donations||v.agreements||Object.values(v.casts).some(Boolean)||Object.values(v.effective).some(Boolean)))fail();
    if(v.id!==null&&(s.chapter.prologue==='pending'||s.chapter.rank!==4))fail();
    s.sect=copy(v);return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const save=options.save?validateSave(options.save):null;super(save?{...options,save}:options);
      // Restore only this optional layer; inner constructors own armor, loadouts and provisions.
      this.state.sect=save?copy(save.sect):fresh();
    }
    exportSave(){
      const s=super.exportSave();
      // 未退宗、未清零时保持旧档原本的八项，不额外写入新增门内账。
      if(s.sect&&s.sect.left===0&&s.sect.forfeited===0){delete s.sect.left;delete s.sect.forfeited;}
      // 独门修习只记已修成的篇目；一篇未成时不写该域，旧档保持原形。
      if(s.sect&&s.sect.secret&&Array.isArray(s.sect.secret.tiers)&&s.sect.secret.tiers.length===0)delete s.sect.secret;
      if(s.sect&&s.sect.manage&&Array.isArray(s.sect.manage.steps)&&s.sect.manage.steps.length===0)delete s.sect.manage;
      return s;
    }
    sectAge(){return this.isChild()?10:20+[0,1,2,3,3][this.state.chapter.rank];}
    sectPlaceReason(){
      if(this.isChild()||this.sectAge()<20)return '二十岁成年后才可议定宗门与合修。';
      if(this.state.chapter.rank<4)return '先完成三年修行，筑基后再议入宗。';
      return this.loadoutReason().replace(/整理配装方案|保存、套用或删除方案|整理配装/g,'处理宗门事务');
    }
    joinSectReason(id=D.id){
      if(id!==D.id)return '没有这个可加入的宗门。';
      if(this.state.sect.id)return '已经记入合欢宗名册，不能重复入宗。';
      return this.sectPlaceReason();
    }
    joinSect(id=D.id,agreed=false){
      const reason=this.joinSectReason(id)||(agreed!==true?'先明确同意成年自愿、不伤无辜的门规。':'');
      if(reason){this.message(reason);return false;}
      this.state.sect.id=D.id;this.message('云照将你的入宗契约录入名册。过往来处、师承与既有委托仍由你自己担承；而在合欢宗的名声，也将由你往后的行事亲手写就。');this.checkpoint();return true;
    }
    sectMemberReason(){return !this.state.sect.id?'先自愿加入合欢宗，再修习宗门两脉。':this.sectPlaceReason();}
    sectMaterialReason(cost){for(const [id,n]of Object.entries(cost))if(this.state.inventory[id]<n)return Items.items[id].name+'不足，备齐全部用料后再办理。';return '';}
    donateSectReason(){
      const reason=this.sectMemberReason();if(reason)return reason;
      if(this.state.sect.donations>=D.maxDonations)return '行旅药站本期收备已足，暂不再接收捐助。';
      return this.sectMaterialReason(D.donation.cost);
    }
    donateSect(){
      const reason=this.donateSectReason();if(reason){this.message(reason);return false;}
      for(const [id,n]of Object.entries(D.donation.cost))this.state.inventory[id]-=n;
      this.state.sect.donations++;this.state.sect.contribution+=D.donation.gain;
      this.message('交付青灵草与灵砂供行旅药站使用，记贡献三点、清誉一笔。');this.checkpoint();return true;
    }
    sectTrainingCost(id){
      if(!known(D.paths,id))return null;const path=D.paths[id],level=this.state.sect.levels[id]+1;
      return {cost:Object.fromEntries(Object.entries(path.cost).map(([item,n])=>[item,n*level])),contribution:path.contribution*level};
    }
    trainSectReason(id){
      if(!known(D.paths,id))return '没有这条宗门修习路径。';
      if(!this.canUseSpiritualPower())return '归凡或封功后不再修炼宗门功法；旧有修习与捐助记录保留。';
      const reason=this.sectMemberReason();if(reason)return reason;
      if(this.state.sect.levels[id]>=D.paths[id].maxLevel)return '这一路首章三层已修成。';
      const next=this.sectTrainingCost(id);
      if(this.state.sect.contribution<next.contribution)return '宗门贡献不足，可交付药站物资积累贡献。';
      return this.sectMaterialReason(next.cost);
    }
    trainSectPath(id,agreed=false){
      const reason=this.trainSectReason(id)||(agreed!==true?'双方须先明确同意本次修习约定；未同意不会扣材料。':'');
      if(reason){this.message(reason);return false;}
      const next=this.sectTrainingCost(id),s=this.state.sect;
      for(const [item,n]of Object.entries(next.cost))this.state.inventory[item]-=n;
      s.contribution-=next.contribution;s.levels[id]++;s.agreements++;
      this.message(D.paths[id].result+' '+D.paths[id].name+'达第'+s.levels[id]+'层。');this.checkpoint();return true;
    }
    sectReputation(){
      const s=this.state.sect,care=s.donations+s.levels.dual*2+s.levels.siphon;
      const honor=Math.max(-99,Math.min(99,care+s.effective.covenant-s.effective.ravage*2)),fame=Math.min(99,s.effective.ravage);
      const label=!s.id?'未入宗':honor<0?'锋芒多争议':fame>0?'恩威并见':honor>=6?'守约济行':'尚待观察';
      return {honor,fame,label,detail:'捐助 +1 清誉；同息修习 +2、立约摄元修习 +1；敛息摄元有效命中 +1；掠灵有效命中 −2 清誉、+1 威名。评价按实际记录汇总，清誉限 −99～99，威名限 99。'};
    }
    sectSkillInfo(id){
      if(!known(D.skills,id))return null;
      const def=D.skills[id],level=this.state.sect.levels[def.path],p=this.combatProfile();
      const info={...copy(def),level,learned:!!this.state.sect.id&&level>0};
      if(!def.target){info.heal=def.baseHeal+def.healPerLevel*level;info.ward=def.baseWard+def.wardPerLevel*level;info.detail='恢复气血 '+info.heal+'，护身 '+info.ward+' 秒（沿用护身减伤 65%）；不返灵、不叠加时长。';}
      else{info.damage=(def.baseDamage+def.damagePerLevel*level)*(1+p.spell);info.returnCap=def.baseReturn+def.returnPerLevel*level;info.detail='单敌基础伤害 '+Math.round(info.damage)+'（已计境界）；实际气血伤害的 '+Math.round(def.returnRate*100)+'% '+(id==='covenant'?'返灵力':'回血')+'，单次最多 '+info.returnCap+'。'+(id==='ravage'?'先受 '+def.backlash+' 气血反噬，不能减免；有效命中减清誉、增威名。':'只削护甲不返灵。');}
      return info;
    }
    sectEnemy(id){return this.activeEnemies().find(e=>e.hp>0&&e.id===id&&e.kind!=='lesson')||null;}
    sectSkillReason(id,target){
      if(!this.canUseSpiritualPower())return '归凡后不再催动宗门功法。';
      const info=this.sectSkillInfo(id);if(!info)return '没有这门宗门功法。';
      if(this.isChild()||!info.learned)return '成年入宗并修成对应一脉后，才能施展此诀。';
      if(!this.canFight()||this.state.chapter.training)return '此时不能施展宗门功法。';
      if(this.state.chapter.skillCd>0)return '功法仍在共同调息，换招也须稍候。';
      if(this.state.mp<info.cost)return '灵力不足。';
      if(info.backlash&&this.state.hp<=info.backlash)return '气血不足以承担掠灵反噬，先恢复。';
      if(info.target){
        const e=this.sectEnemy(target);if(!e)return '先选择仍在场的敌人；此诀不能对无辜者、同伴或试剑木傀施展。';
        if(Base.distance(this.state,e)>info.range)return '目标超出此诀距离，先接近再下令。';
        if(!this.clearLine(this.state,e,2))return '目标被障碍遮挡。';
      }else if(this.state.hp>=100&&this.ward>=info.ward)return '当前气血已满且护持充足，留待需要时施展。';
      return '';
    }
    castSectSkill(id,target){
      const reason=this.sectSkillReason(id,target);if(reason){this.message(reason);return false;}
      const s=this.state,info=this.sectSkillInfo(id),record=s.sect,e=info.target?this.sectEnemy(target):null;
      this.restoreSpirit(s.mp-(info.cost));s.chapter.skillCd=info.cooldown;
      record.casts[id]=Math.min(D.maxActions,record.casts[id]+1);
      if(!e){s.hp=Math.min(100,s.hp+info.heal);this.ward=Math.max(this.ward,info.ward);this.effect('heal',s.x,s.y);}
      else{
        if(info.backlash)s.hp-=info.backlash;
        const hp=e.hp,armor=this.encounterInfo(e)?.armor||0,previous=this.castingSkill,source=this.hitSource;
        this.castingSkill=id;this.hitSource='sect';
        try{this.hitEnemy(e,info.baseDamage+info.damagePerLevel*info.level);}finally{this.castingSkill=previous;this.hitSource=source;}
        // Armor and overkill are never converted to resources. This remains true at the final inherited damage layer.
        const damage=Math.max(0,hp-e.hp),returned=Math.min(info.returnCap,damage*info.returnRate);
        if(id==='covenant')this.restoreSpirit(Math.min(100,s.mp+returned));else s.hp=Math.min(100,s.hp+returned);
        if(damage>0||(this.encounterInfo(e)?.armor||0)<armor)record.effective[id]=Math.min(D.maxActions,record.effective[id]+1);
        this.effect(id==='covenant'?'needle':'resonance',e.x,e.y,{life:.5});
        this.message(info.name+'：实际伤敌 '+Math.round(damage)+'，'+(id==='covenant'?'返灵 ':'回血 ')+returned.toFixed(1)+(info.backlash?'，反噬 −'+info.backlash:'')+'。');
      }
      this.message(info.name+'已施展，与原有功法共同调息。');this.checkpoint();return true;
    }
    orderCheck(order){return order?.type==='sectSkill'?this.sectSkillReason(order.id,order.target):super.orderCheck(order);}
    executeOrder(order){return order?.type==='sectSkill'?this.castSectSkill(order.id,order.target):super.executeOrder(order);}
    sectStatus(){
      const s=this.state.sect;
      return {id:s.id,name:D.name,joined:!!s.id,adult:!this.isChild(),age:this.sectAge(),rank:this.state.chapter.rank,reason:this.sectMemberReason(),joinReason:this.joinSectReason(),contribution:s.contribution,donateReason:this.donateSectReason(),donation:copy(D.donation),doctrine:D.doctrine,partner:copy(D.partner),
        paths:Object.entries(D.paths).map(([id,p])=>{const next=this.sectTrainingCost(id),reason=this.trainSectReason(id);return {...copy(p),level:s.levels[id],nextCost:next.cost,nextContribution:next.contribution,reason,available:!reason};}),
        skills:Object.keys(D.skills).map(id=>{const info=this.sectSkillInfo(id),reason=this.sectSkillReason(id,this.commandTarget);return {...info,reason,available:!reason};}),reputation:this.sectReputation(),record:copy(s),source:D.source};
    }
    sectPanel(){return this.sectStatus();}
  }
  const api={...Base,Game,validateSave,sects:D};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
