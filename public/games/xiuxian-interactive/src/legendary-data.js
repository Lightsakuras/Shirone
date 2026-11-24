(function(root){
  'use strict';
  const effects={
    shadow_step:['残影剑步','踏影留剑 · 冲刺 1.5 秒后原处爆 160% 范围剑伤，重削真气。'],
    sky_thunder:['天罚共鸣','四击引雷 · 每第 4 次普攻对目标降下连锁天雷。'],
    last_stand:['绝境狂意','喋血狂战 · 每损 10% 气血，攻速 +6%、全伤 +8%；35% 血以下吸血 5%。'],
    ice_mirror:['冰镜反击','寒镜折锋 · 闪避或格挡射出 6 枚穿透冰刺，3 倍削真气。'],
    execution:['破防处决','碎气惊雷 · 击破敌方真气时回 15 灵力，并爆 220% 范围剑伤。'],
    momentum:['无尽战意','连锋叠势 · 2.5 秒内连续命中每层全伤 +3%，上限 15 层（+45%）。'],
    wildfire:['离火传染','烬火燎原 · 灼烧之敌毙命时向 130 步内传火，引爆 120% 火伤。'],
    seeker:['万剑追魂','暴击飞剑 · 暴击时飞出穿透灵剑，自动索敌追斩强敌。'],
    starfall:['星陨落锋','斗宿坠火 · 施放主动功法时，在目标落点连坠 3 颗星陨。'],
    bell_echo:['金钟回响','钟鸣震威 · 受击反震，令攻击者 2 秒内伤害 −25%。'],
    gale:['疾风连斩','极速化暴 · 超出 65% 上限的攻速，按 1:1 转化为暴击伤害。'],
    spirit_seal:['嗜灵符印','符催兵锋 · 用快捷符药后 6 秒内，武器伤 +30% 且功法免灵力。'],
    ice_chain:['碎冰连锁','寒爆扩域 · 碎冰半径 +50%，波及小怪有 40% 几率直接冻结。'],
    cull:['斩杀锋芒','断首决杀 · 对 30% 血以下小怪增伤 +45%，对首领增伤 +25%。'],
    spirit_orb:['回气灵脉','步生灵珠 · 战中每 5 秒脚下凝珠，拾取回 5 气血、8 灵力。'],
    leverage:['借力打力','守中带杀 · 每满 20 点防御，额外转化为 +3 攻击。'],
    fortune_eye:['鸿运灵瞳','紫气识宝 · 精英与首领的高品掉率、劫晶爆率 +18%。'],
    reprieve:['悬崖勒马','死里逃生 · 抵挡致命伤锁 1 血并无敌 2 秒（冷却 60 秒）。']
  };
  const curses={
    blood_blade:['噬血魔刃','weapon','暴击伤害 +95%，斩敌回 8 血','每次普攻自损 1.5% 当前气血'],
    asura_robe:['修罗断魂袍','robe','全伤害 +45%','受到伤害 +30%'],
    wager_ring:['孤注一掷戒','ring','战中每 5 秒全伤 +6%（最高 +60%）','失去脱战与过层自动回血'],
    demon_boots:['天魔极速履','boots','移速 +35%，冲刺冷却 −40%','防御归零'],
    greed_pouch:['贪婪魔囊','pouch','掉宝率 +60%，劫晶掉落翻倍','天渊敌人气血 +25%'],
    heart_jade:['焚心魔玉','amulet','主动功法冷却减半，功法伤 +50%','施法后焚心 3 秒，每秒损 3 血']
  };
  const contracts={
    swift:['妖潮疾行','敌方移速 +25%，攻速 +20%'],
    armor:['煞气护体','精英与首领护体真气 +45%'],
    barren:['绝灵禁域','禁绝过层回血，一切治疗量 −35%'],
    twins:['劫魔双煞','每层增派 1 名双词缀狂暴精英'],
    fury:['杀招频发','首领杀招冷却 −30%，杀招伤害 +35%']
  };
  const choose=(table,rng)=>Object.keys(table)[Math.floor(rng()*Object.keys(table).length)];
  function imbue(item,rng,guaranteed=false){
    if(guaranteed||item.grade>=3&&rng()<[.12,.22,.35][item.grade-3])item.legendary=choose(effects,rng);
    return item;
  }
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  class Combat {
    constructor(arsenal){
      this.a=arsenal;this.g=arsenal.g;this.delayed=[];this.beads=[];this.weakened=new WeakMap();
      this.elapsed=0;this.combo=0;this.lastHit=-Infinity;this.orbAt=5;this.sealUntil=0;
      this.burnTicks=0;this.mirrorAt=0;this.saved=false;
    }
    has(key){return this.a.gear.effects?.has(key);}
    get rage(){return this.has('last_stand')?Math.floor(Math.max(0,100-this.g.state.hp)/10):0;}
    get haste(){return Math.min(65,(this.a.gear.rawHaste??this.a.gear.total.haste)+6*this.rage);}
    get criticalBonus(){
      const excess=this.has('gale')?Math.max(0,this.a.gear.rawHaste+6*this.rage-65)/100:0;
      return excess+(this.has('blood_blade')?.95:0);
    }
    get freeSpirit(){return this.has('spirit_seal')&&this.a.clock<this.sealUntil;}
    heal(value){const s=this.g.state;if(s.hp>0)s.hp=Math.min(100,s.hp+value*(this.g.healFactor??1));}
    modifier(e){
      let scale=1+.08*this.rage;
      if(this.has('asura_robe'))scale*=1.45;
      if(this.has('wager_ring'))scale*=1+.06*Math.min(10,Math.floor(this.elapsed/5));
      if(this.has('momentum')&&this.a.clock-this.lastHit<=2.5)scale*=1+.03*this.combo;
      if(this.has('cull')&&e.hp<.3*e.maxHp)scale*=e.boss||this.a.isBoss(e)?1.25:1.45;
      return scale;
    }
    afterHit(e,damage,critical){
      if(this.has('momentum')){this.combo=this.a.clock-this.lastHit<=2.5?Math.min(15,this.combo+1):1;this.lastHit=this.a.clock;}
      if(this.has('last_stand')&&this.g.state.hp<35)this.heal(damage*.05);
      if(critical&&this.has('seeker')&&!this.a.hitAction?.proc){
        const pool=this.a.targets().sort((a,b)=>Number(!!(b.boss||b.elite))-Number(!!(a.boss||a.elite))||distance(a,e)-distance(b,e));
        if(pool[0])this.a.launch('flyingSword',Math.atan2(pool[0].y-e.y,pool[0].x-e.x),340,490,18,pool[0],0,true);
      }
      if(e.hp<=0){
        if(this.has('blood_blade'))this.heal(8);
        if(this.has('wildfire')&&e.burn>0){
          this.a.mark('blast',e.x,e.y,.5);
          for(const other of this.a.targets())if(distance(e,other)<=130){other.burn=Math.max(3,other.burn||0);this.a.direct(other,23,'fire',true,false,1.2);}
        }
      }
    }
    schedule(center,delay,school,radius,mult,poise=0){
      this.delayed.push({x:center.x,y:center.y,at:this.a.clock+delay,school,radius,mult,poise});
    }
    burst(p){
      this.a.mark(p.school==='ice'?'shatter':'blast',p.x,p.y,.5);
      for(const e of this.a.targets())if(distance(p,e)<=p.radius)this.a.direct(e,23,p.school,true,false,p.mult,p.poise);
    }
    onBreak(e){
      if(!this.has('execution'))return;
      this.g.restoreSpirit(Math.min(100,this.g.state.mp+15));
      this.burst({...e,school:'sword',radius:110,mult:2.2});
    }
    onDodge(){if(this.has('shadow_step'))this.schedule(this.g.state,1.5,'sword',105,1.6,3);}
    counter(){
      if(this.has('ice_mirror')&&this.a.clock>=this.mirrorAt){
        this.mirrorAt=this.a.clock+.25;
        for(let i=0;i<6;i++)this.a.launch('icicle',i*Math.PI/3,285,490,17,null,0,true,3);
      }
    }
    onSkill(){
      if(this.has('heart_jade')){this.g.state.chapter.skillCd*=.5;this.burnTicks=3;this.burnAt=this.a.clock+1;}
      if(this.has('starfall')){
        const s=this.g.state,target=this.a.targets().sort((a,b)=>distance(a,s)-distance(b,s))[0]||s;
        for(let i=0;i<3;i++)this.schedule({x:target.x+(i-1)*24,y:target.y},.18+i*.23,'fire',78,1);
      }
    }
    survive(amount){
      if(!this.has('reprieve')||this.saved||this.g.reprieveCd>0||amount<this.g.state.hp)return amount;
      this.saved=true;this.g.reprieveCd=60;this.g.reprieveWard=2;
      this.g.effect('resonance',this.g.state.x,this.g.state.y);return Math.max(0,this.g.state.hp-1);
    }
    tick(dt){
      const a=this.a,g=this.g,s=g.state;
      g.reprieveCd=Math.max(0,(g.reprieveCd||0)-dt);g.reprieveWard=Math.max(0,(g.reprieveWard||0)-dt);
      const fighting=a.targets().some(e=>g.abyssActor||distance(s,e)<=360);
      if(fighting)this.elapsed+=dt;
      else{this.saved=false;this.elapsed=0;this.orbAt=5;this.combo=0;}
      if(this.burnTicks&&a.clock>=this.burnAt){
        this.burnAt++;this.burnTicks--;
        if(!(g.reprieveWard>0)){s.hp=Math.max(0,s.hp-this.survive(3));if(!s.hp)g.events?.push({type:'defeat'});}
      }
      if(this.has('spirit_orb')&&this.elapsed>=this.orbAt){
        this.orbAt+=5;this.beads.push({x:s.x,y:s.y,born:a.clock});
      }
      this.beads=this.beads.filter(p=>{
        if(a.clock-p.born<.35||distance(s,p)>32)return a.clock-p.born<15;
        this.heal(5);g.restoreSpirit(Math.min(100,s.mp+8));return false;
      });
      const ready=this.delayed.filter(p=>p.at<=a.clock);this.delayed=this.delayed.filter(p=>p.at>a.clock);
      for(const p of ready)this.burst(p);
    }
  }
  const api={Combat,effects,curses,contracts,choose,imbue};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianLegendary=api;
})(globalThis);
