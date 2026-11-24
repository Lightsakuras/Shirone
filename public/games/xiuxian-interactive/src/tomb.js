(function(root){
  'use strict';
  const Combat=typeof module==='object'&&module.exports?require('./combat.js'):root.XiuxianCombat;
  const node=typeof module==='object'&&module.exports,Base=node?require('./chapter.js'):root.XiuxianEngine;
  const C=node?require('./chapter-data.js'):root.XiuxianChapterData,CS=node?require('./chapter-state.js'):root.XiuxianChapterState;
  const D=node?require('./data.js'):root.XiuxianData,R=node?require('./expedition-data.js'):root.XiuxianExpeditionData;
  const dist=Base.distance,cap=n=>Math.max(0,Math.min(100,n));
  class Game extends Base.Game{
    constructor(options={}){super(options);this.arrowWind=0;this.arrowCooldown=1;this.poisonTick=0;this.escortFollowers=[];}
    activeEnemies(){const t=this.state.chapter?.tomb;if(this.state.map==='tomb'&&t?.stage==='battle')return [t.boss];return super.activeEnemies();}
    walls(){const w=super.walls(),c=this.state.chapter;if(this.state.map==='crypt'&&c){if(c.tomb.bridge)w.push({x:600,y:150,w:80,h:205},{x:600,y:485,w:80,h:215});else if(!(this.dash>0))w.push({x:600,y:150,w:80,h:550});}if(this.state.map==='forest'&&c?.tomb.rubble>0)w.push({x:1040,y:200,w:80,h:115});return w;}
    objects(){
      const s=this.state,t=s.chapter?.tomb;
      if(['forest','crypt','tomb'].includes(s.map))return D.maps[s.map].objects.filter(o=>{
        if(o.id==='rubble')return t.rubble>0;if(o.id==='clearingHerb')return s.inventory.qingxin<3;
        if(o.id==='ning')return !['escort','report','complete'].includes(t.stage);
        if(o.id.startsWith('child'))return !['battle','farewell','escort','report','complete'].includes(t.stage);
        if(o.id==='summonWang')return t.stage==='meeting';if(o.id==='tombExit')return t.stage==='escort';
        if(o.id==='tombReturn')return !['battle','farewell','escort'].includes(t.stage);return true;
      });
      let objects=super.objects();
      if(s.map==='qingyang'&&s.story.stage==='forest'){
        objects=objects.filter(o=>o.id!=='nightLane');objects.push(C.obj('toTomb','北去 · 汉墓林',1125,430,null));
        if(t?.rescued&&!t.sealed)objects.push(C.obj('sealRecords','见证封存王宅物证',730,605,12,'caseObjects',50));
      }
      return objects;
    }
    beginTomb(){
      const s=this.state,t=s.chapter.tomb;if(s.map!=='qingyang'||!this.nearby('toTomb')||s.story.stage!=='forest'||s.chapter.rank<4)return false;
      if(t.stage==='locked')t.stage='forest';this.travel('forest',180,420);return true;
    }
    tombClue(id){const t=this.state.chapter.tomb;if(!t.clues.includes(id)){t.clues.push(id);this.checkpoint();}}
    passTrap(id){const t=this.state.chapter.tomb;if(!t.passed.includes(id)){t.passed.push(id);this.message({arrows:'弩阵已通过。',bridge:'翻板险处已通过。',smoke:'已穿过毒烟区。'}[id]);this.checkpoint();}}
    interact(){
      const o=this.nearest(),s=this.state,c=s.chapter,t=c.tomb;if(!o||s.hp<=0)return super.interact();
      if(o.id==='toTomb'){this.beginTomb();return;}
      if(o.id==='sealRecords'){this.panel('sealRecords');return;}
      if(o.id==='qingwei'&&t.sealed){this.panel('report');return;}
      if(t.rescued&&s.map==='qingyang'&&['granny','liHome','zhangHome','innkeeper'].includes(o.id)){this.panel('familiesAfter');return;}
      if(o.id==='sister'&&t.rescued&&!c.homecoming&&(!this.hasToken('peachPin')||c.shenGift)){
        // The earlier Qingyang conversation and this homecoming share one reward, not one scene.
        if(!s.story.shared){s.story.shared=true;s.bond=Math.min(99,s.bond+2);}
        c.homecoming=true;this.panel('sisterAfter');this.checkpoint();return;
      }
      if(!['forest','crypt','tomb'].includes(s.map))return super.interact();
      switch(o.id){
        case 'forestReturn':
          if(t.stage==='escort'){t.escort=3;t.rescued=true;t.stage='report';this.travel('qingyang',1035,440);this.panel('childrenHome');}
          else this.travel('qingyang',1035,440);break;
        case 'footprints':this.tombClue('footprints');this.panel('footprints');break;
        case 'burntPaper':this.tombClue('burntPaper');this.panel('burntPaper');break;
        case 'clearingHerb':this.gain('qingxin',Math.min(3-s.inventory.qingxin,1+this.recipeBonus));this.message('辨取石隙清心草，研成一包清心散。最多在此备足三包。');this.checkpoint();break;
        case 'rubble':this.panel('rubble');break;
        case 'forestEnter':
          if(t.rubble>0||!['footprints','burntPaper'].every(id=>t.clues.includes(id))){this.message('先查脚印与残符，再清理墓门落石。');break;}
          if(t.stage==='forest')t.stage='crypt';this.travel('crypt',170,420);break;
        case 'cryptReturn':
          if(t.stage==='escort'){if(!t.bridge||!t.vent||!t.arrows){this.message('孩子们不能像修士一样冒险。先铺桥、停弩、通风，再一起离开。');break;}t.escort=2;}this.travel('forest',990,365);break;
        case 'arrowControl':this.panel('arrowControl');break;
        case 'bridgeControl':case 'bridgeFar':this.panel('bridgeControl');break;
        case 'ventControl':this.panel('ventControl');break;
        case 'mural':this.panel('mural');break;
        case 'coffin':this.tombClue('coffin');this.token('jadeTablet');this.panel('coffin');break;
        case 'sanctumDoor':
          if(t.passed.length<3||!t.clues.includes('coffin')){this.message('先穿过三道机关并查验主棺，循里面的童谣声找路。');break;}
          if(t.stage==='crypt')t.stage='meeting';this.travel('tomb',520,430);break;
        case 'tombReturn':this.travel('crypt',1080,580);break;
        case 'ning':this.panel(t.stage==='farewell'?(t.bossReward?'farewell':'bossReward'):'ning');break;
        case 'summonWang':this.panel('fightBrief');break;
        case 'tombExit':if(t.stage==='escort'){t.escort=1;this.travel('crypt',1080,580);this.message('孩子们跟在你身后。回到墓林，再沿原路送回青阳。');}break;
        default:if(o.id.startsWith('child'))this.panel(o.id);
      }
    }
    clearRubble(method){
      const t=this.state.chapter.tomb;if(!this.nearby('rubble')||t.rubble<=0)return false;
      if(method==='wedge'&&!this.state.story.tools.includes('wedge'))return false;
      if(method==='qi'){if(!this.canUseSpiritualPower()||this.state.mp<12)return false;this.restoreSpirit(this.state.mp-(12));}
      else if(method!=='wedge')return false;
      t.rubble=0;this.message('落石移开，墓门前留出通路。');this.checkpoint();return true;
    }
    tombPattern(id){
      if(id==='arrows')return this.learned('scholar')?['east']:['east','south'];
      if(id==='bridge')return ['anchor','board','knot'];
      if(id==='vent')return ['left','right','left'];
    }
    disableArrows(method,pattern){
      const t=this.state.chapter.tomb;if(!this.nearby('arrowControl')||t.arrows)return false;
      if(method==='wedge'){if(!this.state.story.tools.includes('wedge'))return false;}
      else if(method==='dial'){if(pattern!== this.tombPattern('arrows').join('-')){this.message('石盘刻痕指向先东后南；符修可直接找准东轴。');return false;}}
      else return false;
      t.arrows=true;this.arrowWind=0;this.passTrap('arrows');this.checkpoint();return true;
    }
    buildBridge(order){if(!(this.nearby('bridgeControl')||this.nearby('bridgeFar'))||order!==this.tombPattern('bridge').join('-')||this.state.chapter.tomb.bridge)return false;this.state.chapter.tomb.bridge=true;this.passTrap('bridge');this.message('先锚、铺板、收绳结，翻板上多了一条稳妥的路。');this.checkpoint();return true;}
    openVent(direction){
      const t=this.state.chapter.tomb;if(!this.nearby('ventControl')||t.vent)return false;
      if(direction!==this.tombPattern('vent')[t.wheel]){t.wheel=0;this.message('石轮要先左、再右、再左；错了可重新转。');this.checkpoint();return false;}
      t.wheel++;if(t.wheel===3){t.vent=true;this.poison=0;this.passTrap('smoke');this.message('风道打开，低处毒烟渐散。');}this.checkpoint();return true;
    }
    learnMural(direction){if(!this.nearby('mural')||direction!=='southeast')return false;this.tombClue('mural');this.message('记住半招：敌人收势露隙时，从西北向东南递剑，破邪功气路。');return true;}
    hearNing(choice){
      const c=this.state.chapter,t=c.tomb;if(!this.nearby('ning')||t.stage!=='meeting'||!['listen','care'].includes(choice))return false;
      if(!t.heard){t.heard=true;c.ningBond+=choice==='care'?3:2;this.checkpoint();}return true;
    }
    shelterChild(index,action){
      const c=this.state.chapter,t=c.tomb;if(![0,1,2,3].includes(index)||!this.nearby('child'+index)||t.stage!=='meeting'||!t.heard||action!==['cover','water','calm','breath'][index])return false;
      if(!t.children.includes(index)){t.children.push(index);c.ningBond=Math.min(20,c.ningBond+1);this.message('孩子安定下来，先留在石室背风处。'+t.children.length+'/4 已照看。');this.checkpoint();}return true;
    }
    startBoss(){
      const s=this.state,t=s.chapter.tomb;if(!this.nearby('summonWang')||t.stage!=='meeting'||t.children.length!==4||!t.heard)return false;
      t.stage='battle';t.boss=CS.boss();t.barrier=0;s.hp=Math.max(s.hp,75);this.restoreSpirit(Math.max(s.mp,65));this.resetTransient();this.message('王屠户闯入，嫁祸之事已明。红圈是重斩，横带是刀气；聚阴时可用寒针或近剑打断。');this.checkpoint();return true;
    }
    claimBossRelic(base){
      const c=this.state.chapter,t=c.tomb,col=this.state.collection;if(t.stage!=='farewell'||t.bossReward||!['mirror','lantern','map'].includes(base))return false;
      const id=base+'_calm',old=col.gear.find(g=>g.id===id);if(old){old.level=Math.max(2,old.level);col.spirit=Math.min(1000000,col.spirit+10);}
      else{col.gear.push({id,base,affix:'calm',level:2,memory:null,practice:Object.fromEntries(Object.keys(R.paths).map(p=>[p,0]))});if(col.equipped.length<3&&!this.equipped().some(g=>g.base===base))col.equipped.push(id);}
      col.spirit=Math.min(1000000,col.spirit+40);t.bossReward=base;this.checkpoint();return true;
    }
    farewell(choice){
      const c=this.state.chapter,t=c.tomb;if(!this.nearby('ning')||t.stage!=='farewell'||!t.bossReward||!['promise','respect'].includes(choice))return false;
      c.ningChoice=choice;c.ningBond=Math.min(20,c.ningBond+(choice==='promise'?3:2));this.token('bloodTalisman');this.token('foxHairpin');t.stage='escort';this.effect('farewell',435,300,{life:2.2});this.message('凝霜的身影散入月色。你收好狐簪与血符，带四个孩子回家。');this.checkpoint();return true;
    }
    sealEvidence(pattern){
      const t=this.state.chapter.tomb;if(!this.nearby('sealRecords')||!t.rescued||t.sealed||!this.hasToken('bloodTalisman')||pattern!=='duanxie')return false;
      this.token('ledgers');t.sealed=true;this.message('手札与腰牌碎片在镇民见证下封存，断邪印拓样记入案卷。可回山呈交清微。');this.checkpoint();return true;
    }
    reportChapter(focus){
      const c=this.state.chapter,t=c.tomb;if(!this.nearby('qingwei')||!t.sealed||c.complete||![null,'shen','ning'].includes(focus)||!this.hasToken('bloodTalisman')||!this.hasToken('ledgers'))return false;
      c.focus=focus;c.complete=true;t.stage='complete';this.message('清微收下物证，命你次日起去锁妖塔当值。首章已完成，山中的历练仍可继续。');this.checkpoint();return true;
    }
    attack(target){
      const ok=super.attack(target);if(!ok)return false;const t=this.state.chapter.tomb;
      if(this.state.map==='forest'&&t.rubble>0&&dist(this.state,{x:1080,y:280})<95&&target&&dist(target,{x:1080,y:280})<85){t.rubble=Math.max(0,t.rubble-(this.learned('sword')?45:23));this.message(t.rubble?'落石已有松动，再试几剑。':'墓门落石清开。');this.checkpoint();}return ok;
    }
    dodge(vector){if(this.isChild())return false;if(this.state.chapter.tomb.stage==='escort'&&this.state.map==='crypt'&&!this.state.chapter.tomb.bridge){this.message('带着孩子先铺桥，不要独自跃过翻板。');return false;}const ok=super.dodge(vector);if(ok&&this.state.map==='crypt'&&!this.state.chapter.tomb.bridge&&Math.abs(this.dashVector.x)>.65){this.pitStart=this.state.x;this.dash=.27;}return ok;}
    hitEnemy(e,amount){
      const t=this.state.chapter?.tomb;if(e.kind!=='wang')return super.hitEnemy(e,amount);if(this.state.map!=='tomb'||t.stage!=='battle'||e.hp<=0)return;
      if(e.mode==='channel'&&e.wind>0&&['blade','needle'].includes(this.hitSource)){e.wind=0;e.weak=4;e.cooldown=1.8;this.message('气路被截断，邪功露出破绽！');}
      if(e.weak>0){amount*=1.3;if(t.clues.includes('mural')&&this.hitSource==='blade'&&this.face.x>.25&&this.face.y>.25){amount+=24;this.effect('attune',e.x,e.y,{life:.5});}}
      super.hitEnemy(e,amount);
      if(e.hp<=0){t.stage='farewell';e.wind=0;this.events=this.events.filter(ev=>!(ev.type==='message'&&ev.text.includes('王屠户散去')));this.message('邪功气路已破，王屠户倒下。先看凝霜的伤势，收好留下的证据。');this.panel('bossReward');this.checkpoint();}
      else if(e.hp<=e.maxHp*.5&&t.barrier===0){t.barrier=1;e.weak=4;e.wind=0;e.cooldown=2;this.state.hp=cap(this.state.hp+12);this.effect('foxAssist',e.x,e.y,{life:1});this.message('一道白影替你格开当头重劈。凝霜急声喝道：“使最后那半招——往东南偏三寸递剑！”');}
    }
    takeDamage(amount){
      const wasTomb=['forest','crypt','tomb'].includes(this.state.map);super.takeDamage(amount);
      if(wasTomb&&this.state.hp<=0){const t=this.state.chapter.tomb;t.deaths=Math.min(999,t.deaths+1);if(t.stage==='battle'){t.stage='meeting';t.boss=CS.boss();t.barrier=0;}this.events=this.events.filter(e=>e.type!=='defeat');this.state.hp=100;this.restoreSpirit(100);this.travel('forest',180,420);this.poison=0;this.arrowWind=0;this.panel('tombRetry');this.checkpoint();}
    }
    enemyStep(e,dt){
      if(e.kind!=='wang')return super.enemyStep(e,dt);const t=this.state.chapter.tomb;if(this.state.map!=='tomb'||t.stage!=='battle'||e.hp<=0)return;
      e.slow=Math.max(0,e.slow-dt);e.weak=Math.max(0,e.weak-dt);
      if(e.burn>0){e.burn=Math.max(0,e.burn-dt);const before=e.hp;e.hp=Math.max(.001,e.hp-dt*(this.relaxed?13.2:8));if(before<=dt*(this.relaxed?13.2:8))this.hitEnemy(e,1);if(t.stage!=='battle')return;}
      e.cooldown=Math.max(0,e.cooldown-dt);
      if(e.wind>0){e.wind-=dt;if(e.wind<=0){const p={x:e.targetX,y:e.targetY};if(Combat.hits(e,this.state))this.takeDamage(e.mode==='channel'?27:22);if(t.stage!=='battle'||this.state.map!=='tomb')return;e.cooldown=e.hp<e.maxHp*.5?.95:1.35;this.effect('impact',p.x,p.y,{life:.4});}return;}
      const d=dist(e,this.state);if(e.cooldown<=0&&(d<120||e.moveIndex%3!==0)){
        e.mode=['cleave','wave','channel'][e.moveIndex%3];e.moveIndex++;e.wind=e.mode==='channel'?1.6:e.mode==='wave'?1.1:.95;e.targetX=this.state.x;e.targetY=this.state.y;return;
      }
      if(d>95)this.move(e,(this.state.x-e.x)/d*e.speed*(e.slow>0?.35:1)*dt,(this.state.y-e.y)/d*e.speed*(e.slow>0?.35:1)*dt,22);
    }
    step(dt,input={}){
      const before={x:this.state.x,y:this.state.y,map:this.state.map,dash:this.dash};super.step(dt,input);dt=Math.max(0,Math.min(.04,dt));if(this.state.hp<=0||this.state.map!==before.map)return;
      const s=this.state,t=s.chapter.tomb;
      if(s.map==='crypt'){
        if(!t.arrows){this.arrowCooldown=Math.max(0,this.arrowCooldown-dt);if(this.arrowWind>0){this.arrowWind-=dt;if(this.arrowWind<=0){if(s.x>300&&s.x<430&&s.y>300&&s.y<590)this.takeDamage(15);this.arrowCooldown=1.5;}}
          else if(s.x>275&&s.x<455&&s.y>290&&s.y<600&&this.arrowCooldown<=0)this.arrowWind=.8*(this.relaxed?1.35:1);}
        if(before.x<440&&s.x>=440)this.passTrap('arrows');
        if(!t.bridge&&before.dash>0&&this.dash<=0&&s.x>585&&s.x<695){s.x=this.pitStart>640?720:560;this.takeDamage(8);this.message('这一跃没过翻板，退回边缘再试；也可铺桥。');}
        if(s.x>695&&before.x<=695)this.passTrap('bridge');
        if(!t.vent&&s.x>845&&s.x<1085&&s.y>320&&s.y<520&&this.cleanAir<=0){this.poison=2;this.poisonTick+=dt;if(this.poisonTick>=1){this.poisonTick=0;this.takeDamage(5);}}
        if(before.x<1090&&s.x>=1090)this.passTrap('smoke');
      }
    }
    objective(){
      const t=this.state.chapter?.tomb;if(!t)return super.objective();
      if(this.state.map==='forest')return ['循踪入墓',t.stage==='escort'?'四个孩子跟在身后。沿西侧山径送他们回青阳。':'查脚印和残符，清开落石；清心草可备成清心散。'];
      if(this.state.map==='crypt')return ['三道机关',t.stage==='escort'?'为孩子铺好桥、停住弩机、打开风道，再从西侧回墓林。':'弩机可卡停或转轴；翻板可铺桥或闪避跃过；毒烟可服散或开风道。查壁画与主棺后入耳室。'];
      if(this.state.map==='tomb')return [t.stage==='battle'?'王屠户 · 破邪':'石室里的孩子',t.stage==='battle'?'避开重斩与横向刀气；聚阴时近剑或寒针打断，趁虚以东南剑势破邪。':t.stage==='farewell'?'收下法宝，再走近凝霜听她的托付。':t.stage==='escort'?'收好狐簪与血符，带孩子们从东侧出口沿原路回镇。':'先听白衣女子解释，再照看四个孩子，守住入口。'];
      if(t.stage==='report')return ['归山呈证',t.sealed?'回药庐找清微，呈交血符与封存手札。':'在青阳见证封存王宅物证，确认断邪印纹样。'];
      if(this.state.chapter.complete&&!this.state.run)return ['首章 · 山河留证','清微已安排锁妖塔当值。可整理信物、继续旧阵寻宝或回看人物牵挂。'];return super.objective();
    }
  }
  const api={...Base,Game};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
