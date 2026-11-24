(function(root){
  'use strict';
  const Combat=typeof module==='object'&&module.exports?require('./combat.js'):root.XiuxianCombat;
  const node=typeof module==='object'&&module.exports,Base=node?require('./story.js'):root.XiuxianEngine;
  const C=node?require('./chapter-data.js'):root.XiuxianChapterData,CS=node?require('./chapter-state.js'):root.XiuxianChapterState;
  const D=node?require('./data.js'):root.XiuxianData,dist=Base.distance,cap=n=>Math.max(0,Math.min(100,n));
  function validateSave(value){
    if(!value||![1,2,3,4].includes(value.version))throw Error('不是此版本支持的存档。');
    const current=value.version===4,inChapter=C.maps.includes(value.map);if(!current&&inChapter)throw Error('旧存档地图异常。');
    const s=Base.validateSave({...value,version:current?3:value.version,map:inChapter?'garden':value.map,inventory:{...value.inventory,qingxin:value.inventory?.qingxin??0}});
    s.map=value.map;s.version=4;s.chapter=current?CS.validate(value.chapter,s):CS.fresh(false,s.story.stage!=='unstarted');
    for(const [key,max] of [['cleanAir',20],['poison',2]]){const n=current?(value.buffs?.[key]??0):0;if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>max)throw Error('调养效果记录异常。');s.buffs[key]=n;}
    if(!current&&s.chapter.rank===4)s.chapter.tokens.push('swordSeal');return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const saved=options.save?validateSave(options.save):null;
      super(saved?{...options,save:{...saved,version:3,map:C.maps.includes(saved.map)?'garden':saved.map}}:options);
      if(saved)this.state=saved;else{this.state.version=4;this.state.chapter=CS.fresh(!!options.prologue);if(options.prologue){this.state.map='temple';this.state.x=400;this.state.y=430;}}
      this.poison=saved?.buffs.poison||0;this.cleanAir=saved?.buffs.cleanAir||0;this.hazardClock=0;this.lessonEnemy={id:'lesson',kind:'lesson',name:'试剑木傀',x:790,y:460,hp:3,maxHp:3,wind:0,cooldown:1,targetX:790,targetY:460,radius:75};
      if(this.collides(this.state.x,this.state.y)){this.state.x=180;this.state.y=C.maps.includes(this.state.map)?420:392;}
    }
    isChild(){return this.state.chapter?.prologue==='pending';}
    panel(panel){this.events.push({type:'chapter',panel});}
    token(id){const a=this.state.chapter.tokens;if(!a.includes(id)){a.push(id);this.message('收好信物：'+C.tokens[id].name);this.checkpoint();}}
    hasToken(id){return !!this.state.chapter?.tokens.includes(id);}
    learned(id){return !!this.state.chapter?.quests.includes(id)||super.learned(id);}
    insight(){const c=this.state.chapter;return Math.max(0,(this.state.flags.complete?2:0)+c.quests.length*3-(c.rank===4?5:c.rank));}
    profile(){const c=this.state.chapter;return this.isChild()?['十岁','凡人']:['二十'+(['','一','二','三','三'][c.rank])+'岁',C.ranks[c.rank]];}
    activeEnemies(){if(this.state.chapter?.training&&this.state.map==='garden')return [this.lessonEnemy].filter(Boolean);return super.activeEnemies();}
    objects(){
      if(this.state.map==='temple')return D.maps.temple.objects.filter(o=>!['drywood','flint'].includes(o.id)||!this.state.chapter.survival[o.id==='drywood'?'wood':'flint']);
      const list=super.objects();if(this.state.map==='garden')list.push(C.obj('practiceBoard','三门历练',130,520,9),C.obj('cultivate','蒲团 · 运气修行',540,395,17),C.obj('qingwei','清微',1080,160,3,'chapterPeople',104),C.obj('quietRest','树下 · 调养与削簪',690,620,14));return list;
    }
    travel(map,x,y){if(this.state.chapter&&map!==this.state.map)this.state.chapter.training=false;super.travel(map,x,y);}
    interact(){
      const o=this.nearest(),c=this.state.chapter;if(!o||this.state.hp<=0)return super.interact();
      if(c.training){this.panel('training');return;}
      if(this.isChild()){
        if(o.id==='drywood'||o.id==='flint'){c.survival[o.id==='drywood'?'wood':'flint']=true;this.message('收好'+(o.id==='drywood'?'檐下的干柴。':'火石与引火绒。'));this.checkpoint();}
        else if(o.id==='locket'){c.survival.lock=true;this.token('locket');this.panel('locket');}
        else if(o.id==='hearth')this.panel('hearth');
        else if(o.id==='xuanheng'){c.survival.bread=true;this.checkpoint();this.panel('xuanheng');}
        else if(o.id==='leaveTemple')this.finishPrologue();return;
      }
      if(['practiceBoard','cultivate','quietRest','qingwei'].includes(o.id)){this.panel(o.id);return;}
      if(o.id==='sister'&&this.state.flags.complete&&!c.shenGift&&this.hasToken('peachPin')){this.panel('shenGift');return;}
      return super.interact();
    }
    lightHearth(){const c=this.state.chapter;if(!this.isChild()||!this.nearby('hearth')||!c.survival.wood||!c.survival.flint)return false;c.survival.fire=true;this.message('火苗接住干柴，湿冷的手终于有了温度。');this.checkpoint();return true;}
    finishPrologue(){
      const c=this.state.chapter;if(!this.isChild()||!this.nearby('leaveTemple'))return false;
      if(!['fire','bread','lock'].every(k=>c.survival[k])){this.message('先生火取暖、收好长命锁，再听听玄衡的话。');return false;}
      c.prologue='done';this.travel('garden',560,392);this.panel('arrival');return true;
    }
    beginStory(){
      const s=this.state;if(s.map!=='garden'||!s.flags.complete||s.run||this.isChild()||s.hp<=0)return false;
      if(s.chapter.rank<4){this.panel('cultivate');return false;}
      if(s.story.stage==='unstarted'){s.story.stage='visiting';this.message('筑基初成，清微命你赴青阳查案。先在迎客来歇一夜，次日走访。');}
      return super.beginStory();
    }
    canPractice(id){return this.canUseSpiritualPower()&&!this.isChild()&&this.state.map==='garden'&&!this.state.run&&(this.state.origin===id||this.state.chapter.rank===4||this.learned(id));}
    startPractice(id){
      const c=this.state.chapter;if(!C.trial[id]||!this.canPractice(id)||c.quests.includes(id)||!this.nearby('practiceBoard'))return false;
      if(id==='sword'){c.training=true;this.lessonEnemy.hp=Math.max(1,3-c.swordHits);this.state.x=650;this.state.y=460;this.lessonEnemy.x=790;this.lessonEnemy.y=460;this.state.hp=100;this.restoreSpirit(100);this.message('木傀先出招：右键格挡两次，再以剑击三次收势。试炼不会致命。');}
      this.checkpoint();return true;
    }
    finishPractice(id){
      const c=this.state.chapter;if(c.quests.includes(id))return false;c.quests.push(id);c.skill??=id;c.training=false;this.token(C.trial[id].token);this.token('peachBlank');
      if(id==='medicine')this.gain('qingxin',3);this.message('完成'+C.trial[id].name+'，获得 3 点修习心得，可在蒲团运气。');this.panel('practiceDone');this.checkpoint();return true;
    }
    practiceAnswer(kind){
      const c=this.state.chapter;
      if(kind==='herb')return 'whitevein';
      if(kind==='mix')return ['herb','water','herb'][c.mixture];
      if(kind==='discs')return [1,3,2];
      if(kind==='carve')return ['grain','polish','finish'][c.carving];
    }
    chooseHerb(id){if(!this.canPractice('medicine')||!this.nearby('practiceBoard'))return false;if(id!==this.practiceAnswer('herb')){this.message('清心草有白色叶脉与对生叶，别只凭颜色辨药。');return false;}this.state.chapter.herb=true;this.checkpoint();return true;}
    mixMedicine(id,heat){
      const c=this.state.chapter;if(!this.canPractice('medicine')||!this.nearby('practiceBoard')||!c.herb||c.quests.includes('medicine'))return false;
      if(id!==this.practiceAnswer('mix')||!Number.isFinite(heat)||heat<35||heat>60){this.message('按草、泉、草配伍，文火保持在 35–60。配错可重新尝试，教学材料不扣库存。');return false;}
      c.mixture++;if(c.mixture===3)this.finishPractice('medicine');this.checkpoint();return true;
    }
    rotateDisc(index){const c=this.state.chapter;if(!this.canPractice('scholar')||!this.nearby('practiceBoard')||![0,1,2].includes(index)||c.quests.includes('scholar'))return false;c.discs[index]=(c.discs[index]+1)%4;if(c.discs.every((v,i)=>v===this.practiceAnswer('discs')[i]))this.finishPractice('scholar');this.checkpoint();return true;}
    breathe(index){
      if(!this.canUseSpiritualPower()){this.message('归凡后保留修行经历，不再运气突破。');return false;}
      const c=this.state.chapter;if(this.state.map!=='garden'||!this.nearby('cultivate')||c.rank>=4||this.state.run)return false;
      const cost=c.rank===3?2:1;if(this.insight()<cost){this.message('心得不足。完成药庐委托可得 2 点，完成每门历练可得 3 点。');return false;}
      if(C.paths[c.rank][c.breath]!==index){c.breath=0;this.message('气路未接，先回气海重新走一遍，不消耗心得。');this.checkpoint();return false;}
      c.breath++;if(c.breath===C.paths[c.rank].length){c.rank++;c.breath=0;this.state.hp=100;this.restoreSpirit(100);this.effect(c.rank===4?'ascend':'attune',this.state.x,this.state.y,{life:c.rank===4?1.3:.7});if(c.rank===4){this.token('swordSeal');this.gain('qingxin',2);}this.message('气息归一：'+C.ranks[c.rank]+'。'+(c.rank===4?'已可下山赴青阳之约。':'寒暑更替，继续巩固所学。'));}
      this.checkpoint();return true;
    }
    restCare(choice){const c=this.state.chapter;if(!this.nearby('quietRest')||!['tea','rest','skip'].includes(choice)||c.care)return false;c.care=choice;if(choice!=='skip'){this.state.hp=cap(this.state.hp+18);this.restoreSpirit(cap(this.state.mp+15));this.state.bond=Math.min(99,this.state.bond+1);}this.checkpoint();return true;}
    carve(action){const c=this.state.chapter;if(!this.nearby('quietRest')||!this.hasToken('peachBlank')||c.carving>=3)return false;if(action!==this.practiceAnswer('carve')){this.message('木簪要先顺纹削整，再磨光，最后收尾。');return false;}c.carving++;if(c.carving===3)this.token('peachPin');this.checkpoint();return true;}
    givePin(choice){const c=this.state.chapter;if(!this.nearby('sister')||!this.hasToken('peachPin')||c.shenGift||!['close','friend'].includes(choice))return false;c.shenGift=choice;this.state.collection.companionship=choice;this.state.bond=Math.min(99,this.state.bond+(choice==='close'?4:3));this.checkpoint();return true;}
    setSkill(id){if(!this.state.chapter.quests.includes(id))return false;this.state.chapter.skill=id;this.checkpoint();return true;}
    healingAmount(){return this.canUseSpiritualPower()&&!this.isChild()?22:0;}
    castSkill(){
      if(!this.canUseSpiritualPower()){this.message('当前不能运灵施诀。');return false;}
      const c=this.state.chapter,def=C.skills[c.skill];if(!def||this.isChild()||this.inCase()||this.state.hp<=0||c.skillCd>0||this.state.run&&this.state.run.phase!=='active')return false;
      if(this.state.mp<def.cost){this.message('灵力不足，稍息再运诀。');return false;}this.restoreSpirit(this.state.mp-(def.cost));c.skillCd=def.cooldown;
      if(c.skill==='medicine'){this.state.hp=cap(this.state.hp+this.healingAmount());this.poison=0;this.cleanAir=8;this.ward=Math.max(this.ward,2);this.effect('heal',this.state.x,this.state.y);}
      else{for(const e of this.activeEnemies())if(e.hp>0&&dist(this.state,e)<(c.skill==='sword'?145:190)){this.hitEnemy(e,c.skill==='sword'?38:22);if(c.skill==='scholar')e.slow=5;}if(c.skill==='sword')this.ward=Math.max(this.ward,1.5);this.effect(c.skill==='sword'?'resonance':'needle',this.state.x,this.state.y,{life:.6});}
      this.message(def.name+'已施展。');return true;
    }
    attack(target){if(this.isChild())return false;return super.attack(target);}
    useItem(id,target){
      if(this.isChild())return false;
      if(id==='qingxin'){
        if(this.state.hp<=0||this.state.inventory.qingxin<=0||this.state.run&&this.state.run.phase!=='active')return false;
        if(this.cleanAir>15&&!this.poison){this.message('清心散仍在护持，不必重复服用。');return false;}
        this.state.inventory.qingxin--;this.state.stats.used++;this.poison=0;this.cleanAir=20;this.state.hp=cap(this.state.hp+8+(this.hasToken('medicinePouch')?5:0));if(this.hasToken('formationBrush'))this.restoreSpirit(cap(this.state.mp+8));this.effect('heal',this.state.x,this.state.y);this.checkpoint();return true;
      }
      const ok=super.useItem(id,target);if(ok&&['potion','tea','cake'].includes(id)&&this.hasToken('medicinePouch'))this.state.hp=cap(this.state.hp+5);return ok;
    }
    startRun(seed,seek=null){if(this.isChild()||this.state.chapter.training)return false;return super.startRun(seed,seek);}
    hitEnemy(e,amount){
      if(e.kind==='lesson'){
        const c=this.state.chapter;if(!c.training||this.hitSource!=='blade')return;c.swordHits=Math.min(3,c.swordHits+1);e.hp=Math.max(1,3-c.swordHits);this.effect('number',e.x,e.y,{text:'收势 '+c.swordHits+'/3',color:'#ddd2b1'});if(c.swordHits===3&&c.blocks===2)this.finishPractice('sword');this.checkpoint();return;
      }
      const extra=this.hitSource==='blade'?this.spiritualRank()*2+(this.canUseSpiritualPower()&&this.hasToken('swordPage')?3:0):0;return super.hitEnemy(e,amount+extra);
    }
    takeDamage(amount){
      if(this.state.chapter?.training){
        const c=this.state.chapter;if(this.dash>0||this.hurtCd>0)return;
        if(this.guard&&this.state.mp>=8){c.blocks=Math.min(2,c.blocks+1);this.restoreSpirit(this.state.mp-(8));this.message('接住试招 '+c.blocks+'/2。');if(c.blocks===2&&c.swordHits===3)this.finishPractice('sword');}
        else this.state.hp=Math.max(1,this.state.hp-(this.relaxed?3.6:8));this.hurtCd=.65;this.checkpoint();return;
      }
      return super.takeDamage(amount);
    }
    enemyStep(e,dt){
      if(e.kind!=='lesson')return super.enemyStep(e,dt);if(!this.state.chapter.training||this.state.map!=='garden')return;
      e.cooldown=Math.max(0,e.cooldown-dt);if(e.wind>0){e.wind-=dt;if(e.wind<=0){if(Combat.hits(e,this.state))this.takeDamage(8);e.cooldown=1.3;}return;}
      const d=dist(e,this.state);if(d>105){this.move(e,(this.state.x-e.x)/d*65*dt,(this.state.y-e.y)/d*65*dt,20);}else if(e.cooldown<=0){e.wind=.9;e.targetX=this.state.x;e.targetY=this.state.y;}
    }
    step(dt,input={}){super.step(dt,input);if(this.state.hp<=0||this.state.run&&this.state.run.phase!=='active')return;dt=Math.min(.04,Math.max(0,dt));this.state.chapter.skillCd=Math.max(0,this.state.chapter.skillCd-dt);this.cleanAir=Math.max(0,this.cleanAir-dt);this.poison=Math.max(0,this.poison-dt);}
    exportSave(){const save=super.exportSave();save.buffs.cleanAir=this.cleanAir;save.buffs.poison=this.poison;return save;}
    objective(){
      const c=this.state.chapter;if(!c)return super.objective();if(this.isChild())return ['雨夜求生','收集干柴与火石，生火取暖；查看长命锁，与玄衡交谈后离开。'];
      if(c.training)return ['守而后发','右键接住木傀两次试招（'+c.blocks+'/2），左键剑击三次（'+c.swordHits+'/3）。'];
      if(this.state.map==='garden'&&this.state.flags.complete&&!this.state.run&&c.rank<4)return ['三年修行','到西侧三门历练取得心得，再走近中央蒲团运气，筑基后赴青阳。'];return super.objective();
    }
  }
  const api={...Base,Game,validateSave};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
