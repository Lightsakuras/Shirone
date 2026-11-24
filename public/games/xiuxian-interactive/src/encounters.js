(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./tactics.js'):root.XiuxianEngine,D=node?require('./encounter-data.js'):root.XiuxianEncounterData;
  function armorValue(e){const def=D.preview(e.kind);if(!def)return null;return e.armorLeft===undefined?(e.hp>0?def.maxArmor:0):e.armorLeft;}
  function validateSave(value){
    const s=Base.validateSave(value);
    if(s.run)for(const e of s.run.enemies){
      const raw=value.run.enemies.find(x=>x.id===e.id),def=D.preview(e.kind);
      if(raw.armorLeft!==undefined&&(!def||typeof raw.armorLeft!=='number'||!Number.isFinite(raw.armorLeft)||raw.armorLeft<0||raw.armorLeft>def.maxArmor))throw Error('阵灵护甲记录异常。');
      if(def)e.armorLeft=raw.armorLeft===undefined?(e.hp>0?def.maxArmor:0):raw.armorLeft;
    }
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const saved=options.save?validateSave(options.save):null;super(saved?{...options,save:saved}:options);
      // Every ancestor validates/rebuilds enemy records; restore the validated optional field last.
      if(saved?.run&&this.state.run)for(const e of this.state.run.enemies){const old=saved.run.enemies.find(x=>x.id===e.id);if(old?.armorLeft!==undefined)e.armorLeft=old.armorLeft;}
      this.initializeArmor();this.armorImpact=null;this.burnFinisher=null;
    }
    initializeArmor(){for(const e of this.state.run?.enemies||[])if(D.preview(e.kind)&&e.armorLeft===undefined)e.armorLeft=armorValue(e);}
    chooseRoute(id,trial='none'){const ok=super.chooseRoute(id,trial);if(ok)this.initializeArmor();return ok;}
    encounterInfo(e){if(!this.state.run?.enemies.includes(e))return null;const info=D.preview(e.kind);return info?{...info,armor:armorValue(e),broken:armorValue(e)<=0}:null;}
    hitEnemy(e,amount){
      const info=this.encounterInfo(e),armor=info?.armor||0,hp=e.hp,previous=this.armorImpact;
      const blade=this.swingActive&&this.hitSource==='blade',frost=blade&&this.swingIndex===3&&e.slow>0&&!this.frostSpent&&this.resonances().includes('frostblade');
      const impact={target:e,resolved:false,source:this.hitSource,skill:this.castingSkill,third:blade&&this.swingIndex===3};this.armorImpact=impact;
      try{super.hitEnemy(e,amount);}finally{this.armorImpact=previous;}
      if(armor>0&&(this.encounterInfo(e)?.armor??0)<armor&&e.hp===hp){
        // Existing layers regard HP loss as the hit signal; fully absorbed hits still landed.
        if(this.castingSkill==='scholar'&&e.hp>0)this.seals.set(e,6);
        if(blade){this.swingHit=true;this.hitStop=Math.max(this.hitStop,this.swingIndex===3?.055:.032);if(this.swingIndex===3)this.effect('finisher',e.x,e.y-25,{life:.3,angle:Math.atan2(this.face.y,this.face.x)});}
        if(frost){for(const other of this.activeEnemies())if(other.hp>0&&Math.hypot(other.x-e.x,other.y-e.y)<140)other.slow=Math.max(other.slow,2);this.effect('frostResonance',e.x,e.y-25,{life:.55});}
        this.motionFor(e).hurt=.18;this.reactions.set(e,.13);this.effect('contact',e.x,e.y-28,{life:.15,source:this.hitSource});this.sound('hit',this.hitSource==='blade'?1:.55);
      }
    }
    resolveEnemyDamage(e,amount){
      const info=this.encounterInfo(e);if(!info||info.armor<=0||e.hp<=0||this.burnFinisher===e)return super.resolveEnemyDamage(e,amount);
      if(!Number.isFinite(amount)||amount<=0)return 0;
      const impact=this.armorImpact,direct=impact?.target===e&&!impact.resolved;
      if(direct)impact.resolved=true;
      const def=D.traits[info.kind],source=direct?(impact.skill|| (impact.third?'third':impact.source)):null;
      const multiplier=def.sources.includes(source)?def.multiplier:1;
      const absorbed=Math.min(info.armor,amount*multiplier);e.armorLeft=Math.max(0,info.armor-absorbed);
      this.effect('number',e.x,e.y-46,{text:'削甲 '+Math.round(absorbed),color:'#c8d5b6',life:.8,recipientId:e.id,recipientName:e.name||'石傀',numberChannel:'armor'});
      if(e.armorLeft<=0){this.message((e.name||'阵灵')+'的'+info.name+'已破。');this.effect('attune',e.x,e.y-20,{life:.35});}
      // Efficiency multiplies only armor removal; unused power resumes its original HP scale.
      return super.resolveEnemyDamage(e,Math.max(0,amount-absorbed/multiplier));
    }
    enemyStep(e,dt){
      const previous=this.burnFinisher;this.burnFinisher=e.burn>0&&e.hp>0&&e.hp<=dt*8?e:null;
      try{return super.enemyStep(e,dt);}finally{this.burnFinisher=previous;}
    }
  }
  const api={...Base,Game,validateSave,encounterPreview:D.preview,encounterTraits:D.traits};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
