(function(root){
  'use strict';
  const A=root.XiuxianArmory,D=root.XiuxianArmoryData,W=root.XiuxianWeapons,C=root.XiuxianCombat;
  const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const P=A.Poise,Geo=A.Geo;
  const common=Object.values(D.bases).filter(b=>(b.set||b.id==='plain_swarm')&&!b.route).map(b=>b.id);
  const doors={
    arm:{name:'神兵密室',icon:'sword',risk:3,reward:'随层数升阶的兵器 · 灵锻石 +16'},
    silk:{name:'霓裳秘阁',icon:'robe',risk:2,reward:'随层数升阶的服饰 · 三成机缘得稀有外观'},
    forge:{name:'淬炼石窟',icon:'forge',risk:2,reward:'灵锻石 +36 · 淬灵精魄 +18'},
    double:{name:'双倍劫魔',icon:'double',risk:5,reward:'双词缀精英 · 本层进阶灵匣'}
  };
  const secrets={
    tomb:{name:'远古剑冢',icon:'sword',risk:5,reward:'拔剑守阵二十秒，必得传奇胚子或魔器'},
    market:{name:'黑市孤品奇商',icon:'forge',risk:1,reward:'三件孤品，各限购一次'}
  };
  const demonUnlocked=s=>s.abyss.clearedBosses.includes(20)&&s.abyss.heatBoss>=3;
  function dropGrade(floor,boss,elite,mode,rng,highRisk=false,quality=1){
    const roll=rng()/quality;
    if(floor<=5)return boss?(roll<.20?2:1):roll<.05?2:roll<.45?1:0;
    if(floor<=12)return boss?(roll<.35?3:2):roll<.10?3:roll<.55?2:1;
    if(floor<=20)return boss?(roll<.35?4:3):roll<.12?4:roll<.60?3:2;
    if(floor<30)return roll<.05&&(boss||highRisk)?5:roll<.45?4:3;
    return roll<.12?5:roll<.70?4:3;
  }
  function realmFloor(state){
    return ({zhuji:6,jindan:13,yuanying:21,huashen:21,heti:21,dacheng:30})[state.campaign?.cultivation?.realmId]||(state.chapter?.rank>=4?6:1);
  }
  const imperial=Object.values(D.bases).filter(b=>b.route==='终极真首领限定').map(b=>b.id);
  function crystalEligible({floor=0,boss=false,bountyIndex=-1,heat=0,highRisk=false}){
    return floor>=15&&boss||bountyIndex>=5&&bountyIndex<=9||heat>=2&&highRisk;
  }
  function unique(s,base){if(!s.unlockedAppearances.includes(base))s.unlockedAppearances.push(base);}
  function storyRewards(g,store,claimEnding=false){
    const realm=g.state.campaign?.cultivation?.realmId,summit=g.state.sectSummit?.wins||0,ending=claimEnding&&!!g.state.campaign?.ending,mark=realm+'-'+summit+'-'+ending;
    if(g.armoryMilestone===mark)return;g.armoryMilestone=mark;
    const ids=[];if(['yuanying','huashen','heti','dacheng'].includes(realm))ids.push('lotus_steps');
    if(realm==='dacheng'||ending)ids.push('jade_robe');if(summit>0)ids.push('sunset_robe');
    if(ids.some(id=>!store.state.unlockedAppearances.includes(id)))store.change(s=>{for(const id of ids)unique(s,id,store);});
  }
  function worldDrop(g,e,boss){
    if(g.abyssActor)return;const store=g.arsenal.store;
    const {effects,aura}=store.summary(),strong=boss||e.elite;
    if(!boss&&Math.random()>.20*(1+aura.loot)*(effects.has('greed_pouch')?1.6:1))return;
    const quality=strong&&effects.has('fortune_eye')?1.18:1;
    const grade=dropGrade(realmFloor(g.state),boss,e.elite,g.playMode,Math.random,false,quality);
    const item=D.legendary.imbue(A.createItem(A.pick(common,Math.random),grade),Math.random);
    store.change(s=>{store.acquire(s,item);const m=g.playMode==='challenge'?1.5:1;s.currency.stone+=Math.round((boss?16:4)*m);s.currency.essence+=Math.round((boss?6:2)*m);
      if(boss&&effects.has('greed_pouch')&&Math.random()<.6)store.acquire(s,D.legendary.imbue(A.createItem(A.pick(common,Math.random),grade),Math.random));
      if(boss&&g.playMode==='challenge'){s.fragments=(s.fragments||0)+1;if(!s.achievements.includes('砺剑镇煞'))s.achievements.push('砺剑镇煞');if(s.fragments%3===0)unique(s,'phoenix_wings',store);}});
    if(grade>=3)g.sound?.(['lootPurple','lootGold','lootAncient'][grade-3]);
    g.message('获得'+D.grades[grade].name+' · '+D.bases[item.base].name);
  }
  class Run{
    constructor(main,store,floor=1,rng=Math.random,contract=null,activity=null){
      if(!Number.isSafeInteger(floor)||floor<1||floor!==1&&(floor%5||floor>store.state.abyss.highestFloor))throw Error('该节点尚未解锁');
      if(activity==='demon'&&!demonUnlocked(store.state))throw Error('问道真魔尚未解锁');
      this.activity=activity;
      this.pacts=new Set(contract||activity==='dummy'?[]:store.state.abyss.contracts);
      this.heat=this.pacts.size;
      this.contract=contract;this.route=null;this.doors=[];this.main=main;this.store=store;this.rng=rng;this.floor=floor;this.buff=1;this.clock=0;this.paused=false;this.drops=[];this.notices=[];this.enemies=[];this.chests=[];
      this.actor=new root.XiuxianVisualGame({save:main.exportSave(),playMode:main.playMode});const g=this.actor;
      g.abyssActor=true;g.comboEnabled=activity!=='dummy';g.healFactor=this.pacts.has('barren')?.65:1;g.trialProfile=A.Legacy.profile(main.state,store.state);g.attachArmory(store);
      if(g.trialProfile.sect==='danding')this.buff*=1.1;g.state.map='ruins';g.state.run=null;g.state.x=420;g.state.y=420;
      g.activeEnemies=()=>this.enemies;g.clearLine=()=>true;g.collides=()=>false;g.canFight=()=>g.state.hp>0;
      // Arena opponents have their own health pool. All outgoing gear, realm, spell and relic modifiers still use the ordinary hit pipeline.
      const baseHit=g.hitEnemy.bind(g);g.hitEnemy=(e,n)=>{const hp=e.hp;baseHit(e,n*this.buff*(e.affix==='厚甲'||e.secondAffix==='厚甲'?.84:1)*(e.guardOrb?.hp>0?.44:1));
        if(hp>0&&e.hp<=0){root.XiuxianEnemyVfx?.fallen(this,e,this.clock,g.arsenal.hitAction?.element);this.defeated(e);}};
      g.onPoiseBreak=e=>{
        this.echoes=this.echoes.filter(h=>h.e!==e);this.areas=this.areas.filter(h=>h.owner!==e);
        if(this.contract&&e===this.chief){this.hazards=[];this.castTime=0;}
        e.telegraph=null;this.sound?.('shieldBreak');
      };
      if(!contract&&!activity)store.change(s=>{s.abyss.totalRuns++;});this.spawn();
    }
    get lootQuality(){return 1+this.heat*.12;}
    get greed(){return this.store.summary().effects.has('greed_pouch');}
    get lucky(){return this.store.summary().effects.has('fortune_eye')?1.18:1;}
    specialItem(cursed){
      const base=cursed?D.legendary.choose(D.legendary.curses,this.rng):A.pick(common,this.rng);
      const grade=this.roomGrade();
      const item=A.createItem(base,grade,this.rng);
      return cursed?item:D.legendary.imbue(item,this.rng,true);
    }
    resetGuard(e){
      P.init(e);
      if(e.poise&&this.pacts.has('armor'))e.poise.value=e.poise.max*=1.45;
      return e;
    }
    spawn(){
      const f=this.floor,g=this.actor;this.phase='combat';this.areas=[];this.echoes=[];this.chests=[];this.event=null;this.lootNotice=null;this.enemies=[];
      const hall=f%5===0,count=hall?(this.route==='double'?3:1):this.route==='double'?2:Math.min(22,2+Math.floor(f/2)),mode=g.playMode;
      const twins=this.pacts.has('twins');
      for(let i=0;i<count+Number(twins);i++){
        const twin=twins&&i===count,boss=hall&&i===0,elite=!boss&&(twin||this.route==='double'||f>=3&&(i===0||this.rng()<.16)),affix=(elite||boss)?A.pick(['雷环','狂暴','厚甲','冰脉','分身'],this.rng):null;
        const maxHp=Math.round((boss?680:120)*(1+.28*f+Math.pow(Math.max(0,f-5),1.32)*.08)*(elite?1.85:1)*(mode==='challenge'?1.8:1)*(!this.contract&&this.greed?1.25:1));
        const e={id:'abyss-'+f+'-'+i,kind:boss?'keeper':'stone',name:boss?'镇渊星君':this.route==='arm'?'执戟凶灵':this.route==='silk'?'飞霞织影':this.route==='forge'?'赤炉石精':elite?'天渊守将':'残阵石灵',boss,elite,affix,x:565+this.rng()*380,y:270+this.rng()*230,
          hp:maxHp,maxHp,defense:boss||elite?552:1220,damage:(boss?21:this.route==='arm'?17:12)*(1+.12*f)*(mode==='challenge'?1.45:1),speed:(boss?52:45)+Math.min(f,38),wind:0,cooldown:.65+i*.18,slow:0,burn:0,radius:boss?94:48,phase:1,casts:0};
        if(twin){e.name='双煞守将';e.affix='狂暴';e.secondAffix=affix==='狂暴'?'厚甲':affix;}
        if(this.pacts.has('swift'))e.speed*=1.25;
        this.enemies.push(this.resetGuard(e));
      }
      g.arsenal.reset();g.attackCd=0;
      if(!this.pacts.has('barren')&&!g.arsenal.legend.has('wager_ring'))g.arsenal.legend.heal(g.trialProfile.sect==='hehuan'?24:20);
      if(this.activity==='demon'){
        const boss=this.enemies[0],hp=Math.round(16000*(this.greed?1.25:1)*(mode==='challenge'?1.8:1));
        Object.assign(boss,{name:'太虚心魔',trueBoss:true,boss:true,elite:false,hp,maxHp:hp,affix:'冰脉',defense:490,damage:42,phase:1});
        this.enemies=[this.resetGuard(boss),...this.enemies.filter(e=>e.secondAffix)];
      }
      if(this.activity==='dummy')this.setupDummy();
    }
    setupDummy(){
      const dummy={id:'sword-dummy',name:'试剑木人桩',kind:'stone',x:565,y:420,maxHp:1e7,hp:1e7,boss:true,damage:0,slow:0,burn:0};
      this.enemies=[dummy];this.actor.state.x=495;this.actor.state.y=420;
      this.meter=new DamageMeter();this.setArmor(true);
      this.actor.onDamageDealt=(e,amount,crit,broken)=>{
        if(e===dummy){this.meter.hit(this.clock,amount,crit,broken);e.hp=e.maxHp;}
      };
    }
    setArmor(heavy){
      const e=this.enemies[0];this.heavy=heavy;e.defense=heavy?490:0;P.init(e,heavy);
      if(e.poise)e.poise.value=e.poise.max=300;
    }
    resetMeter(){
      this.actor.arsenal.reset();this.actor.attackCd=0;this.actor.state.chapter.skillCd=0;
      this.actor.state.hp=100;this.actor.restoreSpirit(100);
      Object.assign(this.enemies[0],{burn:0,slow:0});this.setArmor(this.heavy);this.meter=new DamageMeter();
    }
    rollDoors(){
      const pool=Object.keys(doors);this.doors=[];const count=this.rng()<.5?2:3;
      while(this.doors.length<count)this.doors.push(pool.splice(Math.floor(this.rng()*pool.length),1)[0]);
      if(this.rng()<.15)this.doors[count-1]=A.pick(Object.keys(secrets),this.rng);
    }
    openSecret(id){
      this.secret=id;this.event='road';this.doors=[];this.enemies=[];this.echoes=[];this.areas=[];this.chests=[];
      this.actor.effects=[];this.actor.arsenal.reset();this.lootNotice=null;
      this.phase=id==='tomb'?'sheathed':'market';
      if(id==='market'){
        const pool=['legend','curse','orb','crystal'];this.stock=[];
        const prices={legend:['stone',96],curse:['jade',36],orb:['essence',45],crystal:['jade',24]};
        while(this.stock.length<3){
          const kind=pool.splice(Math.floor(this.rng()*pool.length),1)[0],item=['curse','legend'].includes(kind)?this.specialItem(kind==='curse'):null;
          const effect=kind==='orb'?D.legendary.choose(D.legendary.effects,this.rng):null;
          this.stock.push({kind,item,effect,price:prices[kind],sold:false});
        }
      }
    }
    buy(index){
      const offer=this.stock?.[index];if(this.phase!=='market'||!offer||offer.sold)return false;
      const [currency,cost]=offer.price;
      const paid=this.store.change(s=>{
        if(s.currency[currency]<cost)return false;
        s.currency[currency]-=cost;
        if(offer.item)this.store.acquire(s,offer.item);
        else if(offer.effect)s.orbs.push({id:'orb_'+s.nextId++,legendary:offer.effect});
        else s.currency.crystal++;
      });
      if(paid)offer.sold=true;return !!paid;
    }
    pullSword(){
      if(this.phase!=='sheathed')return false;
      this.phase='combat';this.deadline=this.clock+20;this.enemies=[];this.echoes=[];this.areas=[];
      for(let i=0;i<4+Number(this.pacts.has('twins'));i++){
        const hp=Math.round((240+80*this.floor)*(this.greed?1.25:1));
        const angle=i*Math.PI/2;const e={id:'blade-spirit-'+i,name:'守冢剑灵',kind:'stone',elite:true,affix:i%2?'冰脉':'狂暴',hp,maxHp:hp,
          x:600+220*Math.cos(angle),y:400+145*Math.sin(angle),speed:90*(this.pacts.has('swift')?1.25:1),damage:20+this.floor,
          defense:250,wind:0,cooldown:.4+i*.3,casts:1,phase:1,slow:0,burn:0};
        if(i===4)e.secondAffix='厚甲';
        this.enemies.push(this.resetGuard(e));
      }
      this.actor.arsenal.reset();return true;
    }
    finishTomb(){
      if(this.phase!=='combat'||this.secret!=='tomb'||this.actor.state.hp<=0)return false;
      this.drops=[];this.drop(this.specialItem(this.rng()<.35),this.actor.state.x,this.actor.state.y);
      this.collect(true);this.echoes=[];this.areas=[];this.enemies=[];this.phase='tombWon';return true;
    }
    leaveSecret(){
      if(!['market','tombWon'].includes(this.phase))return false;
      this.secret=null;this.route=null;this.floor++;this.spawn();return true;
    }
    drop(item,x,y){
      if(!item.legendary)D.legendary.imbue(item,this.rng);
      const a=this.rng()*Math.PI*2,len=35+this.rng()*56;this.drops.push({item,x:clamp(x+Math.cos(a)*len,45,1235),y:clamp(y+Math.sin(a)*len,155,720),fromX:x,fromY:y,age:0,landed:false});
    }
    defeated(e){
      if(e.paid)return;e.paid=true;
      if(this.secret==='tomb'){if(!this.enemies.some(n=>n.hp>0))this.finishTomb();return;}
      if(this.activity==='dummy')return;
      if(this.activity==='demon'&&!e.trueBoss)return;
      if(this.actor.trialProfile.origin==='demon'&&this.rng()<.15)this.actor.arsenal.legend.heal(2);const f=this.floor,rng=this.rng;
      if(e.boss||e.elite||rng()<.48*(1+this.store.summary().aura.loot)*(this.greed?1.6:1)){
        let grade=dropGrade(e.trueBoss?30:f,e.boss,e.elite,this.actor.playMode,rng,this.route==='double',this.lootQuality*(e.boss||e.elite?this.lucky:1));
        if(crystalEligible({floor:f,boss:e.boss,heat:this.heat,highRisk:e.boss||e.elite&&(this.route==='double'||this.heat>=2)}))this.store.change(s=>{
          if(rng()<.4*(1+this.heat*.35)*this.lucky)s.currency.crystal+=this.greed?2:1;
          if(f>=30&&e.boss){
            s.fortune+=20;
            if(s.fortune>=100)grade=5;
            if(grade===5)s.fortune=0;
          }
        });
        const base=e.trueBoss?A.pick(imperial,rng):grade===5&&e.boss?A.pick(Object.keys(D.weapons).map(k=>'ancient_'+k),rng):A.pick(common,rng);this.drop(A.createItem(base,grade,rng),e.x,e.y);
        if(this.greed&&(e.elite||e.boss)&&rng()<.6)this.drop(A.createItem(A.pick(common,rng),grade,rng),e.x,e.y);
        if(f>=20&&(e.boss||e.elite)&&rng()<.38)this.drop(A.createItem('phoenix_wings',grade,rng),e.x,e.y);
      }
      if((e.elite||e.boss)&&(f>=10&&this.route==='double'||this.heat>=3)&&rng()<.12)this.drop(this.specialItem(true),e.x,e.y);
      if(e.trueBoss){
        this.firstKill=this.store.change(s=>{
          if(s.abyss.demonSlain)return false;s.abyss.demonSlain=true;
          unique(s,'dao_halo');A.Ach.award(s,'demon');s.abyss.forgeBoxes++;
        });
        this.phase='demonWon';this.enemies.forEach(n=>n.hp=0);this.echoes=[];this.areas=[];this.collect(true);return;
      }
      if(e.boss){const trophy=['lotus','thunder','flame','frost'][(f/5-1)%4]+'_diadem';this.drop(A.createItem(trophy,dropGrade(f,true,true,this.actor.playMode,rng),rng),e.x+56,e.y+16);}
      if(e.boss&&!this.store.state.abyss.clearedBosses.includes(f)){const rare={10:'ember_steps',15:'star_wheel'}[f];if(rare==='star_wheel')this.store.change(s=>unique(s,rare));else if(rare)this.drop(A.createItem(rare,dropGrade(f,true,true,this.actor.playMode,rng),rng),e.x,e.y);}
      if(!this.enemies.some(n=>n.hp>0)){
        this.phase='clear';
        const profile=this.actor.trialProfile;if(!this.pacts.has('barren')&&!this.actor.arsenal.legend.has('wager_ring'))this.actor.arsenal.legend.heal((profile.origin==='poor'?18:0)+(profile.sect==='baicao'?8:0));
        const route=this.route,rank=this.roomGrade();
        if(['arm','double','silk'].includes(route)){
          const candidates=route==='silk'&&rng()<.30?['jade_robe','lotus_steps','sunset_robe','phoenix_wings']:common.filter(id=>route==='double'||(route==='arm'?D.bases[id].slot==='weapon':['head','robe','boots','cloak'].includes(D.bases[id].slot)));
          this.drop(A.createItem(A.pick(candidates,rng),rank,rng),e.x,e.y);
        }
        this.rollDoors();if(f===8&&this.store.state.abyss.highestFloor<8)this.drop(A.createItem('jade_robe',rank,rng),e.x,e.y);
        this.event=f===12?'vault':A.pick(['road','vault','forge','merchant'],rng);
        if(route==='forge'&&rng()<.45)this.event='smith';
        if(this.event==='vault')this.chests=[{x:455,y:400},{x:660,y:440},{x:825,y:392}];
        this.store.change(s=>{A.Home.grow(s);
          const legacy=A.Legacy;
          const jade=f%5===0?6:1+Number(profile.origin==='caravan'||rng()<.5);
          const rawJade=jade*(1+this.heat*.3);
          s.currency.jade+=Math.floor(rawJade)+Number(rawJade%1>0&&rng()<rawJade%1);
          if(this.heat>=3)unique(s,'calamity_dye');
          if(f%5===0)s.abyss.heatBoss=Math.max(s.abyss.heatBoss,this.heat);
          const material=1+this.heat*.25;
          const book={5:'board',10:'kiln',15:'thread'}[f];if(book)legacy.record(s,book);
          if(route==='arm')s.currency.stone+=Math.round(16*material);
          if(route==='forge'){s.currency.stone+=Math.round(36*material);s.currency.essence+=Math.round(18*material);}
          s.abyss.highestFloor=Math.max(f,s.abyss.highestFloor);
          if(f%5===0&&!s.abyss.clearedBosses.includes(f))s.abyss.clearedBosses.push(f);
          const factor=(this.actor.playMode==='challenge'?1.5:1)*material;s.currency.stone+=Math.round((6+f*2)*factor);s.currency.essence+=Math.round((2+f)*factor);});
      }
    }
    roomGrade(){
      const f=this.floor;
      const grade=dropGrade(f,false,false,this.actor.playMode,this.rng,this.route==='double',this.lootQuality);
      // The fifth tier first becomes eligible in high-risk rooms or a boss hall.
      const cap=f<=5?2:f<=12?3:f<=20?4:f<30&&this.route!=='double'&&f%5!==0?4:5;
      return Math.min(cap,grade<4?grade+1:grade);
    }
    encounter(index=0){
      const g=this.actor,r=this.rng;if(this.phase!=='clear')return false;
      if(this.event==='vault'){const chest=this.chests[index];if(!chest)return false;this.chests.splice(index,1);
        this.drop(A.createItem(this.floor===12&&index===0?'sunset_robe':A.pick(common,r),this.roomGrade(),r),chest.x,chest.y);
        if(this.chests.length)return true;
      }else if(this.event==='smith'){
        const id=this.store.state.equipped.weapon;
        if(!this.store.change(s=>{const item=s.bag.find(v=>v.id===id);if(!item||item.level>=D.grades[item.grade].cap)return false;item.level++;}))return false;
        this.sound?.('forgeHammer');
      }else if(this.event==='forge'){this.buff*=1.25;this.sound?.('forgeHammer');}
      else if(this.event==='merchant'){if(!this.store.change(s=>{if(s.currency.stone<20)return false;s.currency.stone-=20;}))return false;
        this.sound?.('shopBuy');this.drop(A.createItem(A.pick(common,r),this.roomGrade(),r),g.state.x+70,g.state.y);
      }else return false;this.event='road';return true;
    }
    collect(all=false){
      const radius=36+this.store.summary().total.pickup,got=this.drops.filter(d=>all||d.landed&&dist(d,this.actor.state)<radius);
      if(!got.length)return 0;
      this.store.change(s=>{for(const d of got)this.store.acquire(s,d.item);});const removed=new Set(got);this.drops=this.drops.filter(d=>!removed.has(d));return got.length;
    }
    next(route=this.doors[0]){if(this.phase!=='clear'||!this.doors.includes(route))return false;
      this.collect(true);if(Object.hasOwn(secrets,route)){this.openSecret(route);return true;}this.floor++;this.route=route;this.doors=[];this.spawn();return true;}
    order(action,target){
      const g=this.actor;if(this.phase!=='combat')return false;if(action==='stance'){const st=['advance','guard','quiet'];g.state.battlePlan.stance=st[(st.indexOf(g.stance())+1)%3];return true;}
      if(action==='skill')return g.castSkill();
      const before=g.state.inventory[action];const ok=g.useItem(action,target||this.enemies.find(e=>e.hp>0));if(ok&&this.activity!=='dummy')this.main.state.inventory[action]+=g.state.inventory[action]-before;return ok;
    }
    step(dt,input={}){
      if(this.paused||!['combat','clear'].includes(this.phase))return;this.clock+=dt;
      const g=this.actor,s=g.state;g.playMode=this.main.playMode;g.hurtCd=Math.max(0,g.hurtCd-dt);g.attackCd=Math.max(0,g.attackCd-dt);
      g.ward=Math.max(0,g.ward-dt);s.chapter.skillCd=Math.max(0,s.chapter.skillCd-dt*(g.trialProfile.sect==='tianji'?1.25:1));g.restoreSpirit(Math.min(100,s.mp+dt*g.combatProfile().regenTotal));
      g.dashCd=Math.max(0,g.dashCd-dt);
      if(g.dash>0){const span=Math.min(g.dash,dt);g.dash-=span;s.x=clamp(s.x+640*g.dashVector.x*span,40,1240);s.y=clamp(s.y+640*g.dashVector.y*span,165,710);}
      const frozen=this.clock<(this.frozenUntil||0),dx=frozen?0:input.x||0,dy=frozen?0:input.y||0,d=Math.hypot(dx,dy),speed=230*(1+.03*g.arsenal.rhythm.rank)*(g.trialProfile.origin==='beggar'?1.1:1)*(1+g.arsenal.gear.aura.move)*(this.clock<(this.slowUntil||0)?.44:1);g.moving=d>0;
      if(d){s.x=clamp(s.x+dx/d*speed*dt,40,1240);s.y=clamp(s.y+dy/d*speed*dt,165,710);g.face={x:dx/d,y:dy/d};}
      g.guard=g.stance()==='guard'||input.guard;
      if(g.lure){g.lure.life-=dt;if(g.lure.life<=0)g.lure=null;}
      const target=this.enemies.filter(e=>e.hp>0).sort((a,b)=>dist(a,s)-dist(b,s))[0];
      if(target&&this.phase==='combat'){
        const range=g.arsenal.range||88;if(!d&&!frozen&&g.stance()==='advance'&&dist(target,s)>range-12){const l=dist(target,s);s.x+=(target.x-s.x)/l*125*(1+.03*g.arsenal.rhythm.rank)*dt;s.y+=(target.y-s.y)/l*125*(1+.03*g.arsenal.rhythm.rank)*dt;g.moving=true;}
        if((g.stance()!=='quiet'||input.fire)&&dist(target,s)<=range&&g.attackCd<=0){
          const aim=input.aim||target;g.face={x:(aim.x-s.x)/(dist(aim,s)||1),y:(aim.y-s.y)/(dist(aim,s)||1)};
          if(!g.arsenal.attack(aim))g.hitEnemy(target,23);g.attackCd=.46/(1+Math.min(1,g.arsenal.legend.haste/100));
        }
        for(const e of this.enemies.slice()){
          if(e.hp<=0)continue;
          if(e.burn>0){e.burn-=dt;e.emberTick=(e.emberTick??.5)-dt;if(e.emberTick<=0){e.emberTick+=.5;g.hitEnemy(e,4);}if(e.hp<=0)continue;}
          if(P.tick(e,dt)||this.activity==='dummy'||e===this.chief&&this.castTime>0||!e.poise&&g.arsenal.marks.get(e)?.frozen>0)continue;
          e.slow=Math.max(0,e.slow-dt);e.cooldown-=dt;const aim=g.lure&&!e.boss&&dist(e,g.lure)<470?g.lure:s,l=dist(e,aim);
          if(e.wind>0){
            e.wind=Math.max(0,e.wind-dt);
            if(!e.wind){const area=e.telegraph,hit=area?Geo.hits(area,s):C.hits(e,s);
              if(!area)g.arsenal.rhythm.avoided(g.arsenal.clock,p=>C.hits(e,p),s);
              P.strike(e,s,hit,area?.kind||'slam',(dx,dy)=>{e.x+=dx;e.y+=dy;});
              if(area){this.areas.push({owner:e,shape:area,time:-1e-6});e.telegraph=null;}
              if(!area&&hit){g.incomingEnemy=e;g.takeDamage(e.damage*(e.boss&&this.pacts.has('fury')?1.35:1)*(e.affix==='狂暴'&&e.hp<e.maxHp*.5?1.65:1));g.incomingEnemy=null;if(e.affix==='冰脉'||e.secondAffix==='冰脉')g.attackCd+=.45;}
              e.cooldown=(e.phase>=2?.75:1.35)*(g.playMode==='challenge'?.7:1)/(this.pacts.has('swift')?1.2:1)*(e.boss&&this.pacts.has('fury')?.7:1)*(e.trueBoss&&e.phase===3?.7:1);}
          }else if(e.cooldown<=0&&aim===s&&l<(e.boss?350:e.affix==='雷环'||e.secondAffix==='雷环'?190:75)){
            e.phase=e.trueBoss?Math.min(3,1+Math.floor(3*(1-e.hp/e.maxHp))):e.hp<e.maxHp*.5?2:1;e.casts++;e.wind=e.boss?.98:.8;C.warningDurations.set(e,e.wind);e.targetX=s.x;e.targetY=s.y;
            e.radius=e.boss?94+e.phase*19:e.affix==='雷环'||e.secondAffix==='雷环'?90:48;
            e.telegraph=e.trueBoss?Geo.pattern(Geo.kinds[(e.phase-1)*2+(e.casts-1)%2],e,s):
              !this.contract&&(e.boss||e.elite)&&e.casts>1?Geo.pattern(Geo.kinds[(e.casts-2)%6],e,s):null;
            P.pose(e,'windup',e.wind,s,e.telegraph?.kind||'slam');
            if(!e.telegraph&&e.boss&&e.phase===2&&!this.contract&&e.casts%2){
              for(let n=0;n<7;n++){const a=Math.atan2(s.y-e.y,s.x-e.x)+(n-3)*.27;
                this.echoes.push({e,x:e.x,y:e.y,r:17,remaining:3.2,delay:.58,vx:Math.cos(a)*190,vy:Math.sin(a)*190});}
            }
            if(!e.telegraph&&e.boss&&e.phase===2&&!this.contract)for(const side of [-1,1])this.echoes.push({e,x:clamp(s.x+side*108,60,1220),y:s.y,r:65,remaining:1.35});
            if((e.affix==='分身'||e.secondAffix==='分身')&&!e.split&&e.phase===2){e.split=true;this.enemies.push(P.init({...e,id:e.id+'-echo',name:'镜影',elite:false,boss:false,affix:null,hp:e.maxHp*.2,maxHp:e.maxHp*.2,x:e.x+35,wind:0,telegraph:null}));}
          }else if(l>30){P.pose(e,'move',0,aim);const speed=e.speed*(e.slow>0?.4:1)*dt;e.x+=(aim.x-e.x)/l*speed;e.y+=(aim.y-e.y)/l*speed;}else P.pose(e,'idle');
        }
      }
      this.areas=this.areas.filter(h=>{
        if(h.owner.hp<=0)return false;
        const before=h.time;h.time+=dt;
        for(const pulse of Geo.pulses(h.shape,before,h.time)){
          g.arsenal.rhythm.avoided(g.arsenal.clock,p=>Geo.hits(pulse,p),s);if(!Geo.hits(pulse,s))continue;
          if(h.shape.element==='frost')this.slowUntil=this.clock+.85;
          g.incomingEnemy=h.owner;try{g.takeDamage(h.owner.damage*(h.shape.kind==='zone'?.45:1)*(h.owner.boss&&this.pacts.has('fury')?1.35:1));}finally{g.incomingEnemy=null;}
        }
        return h.time<(h.shape.duration??(h.shape.kind==='meteor'?1.32:.18));
      });
      this.echoes=this.echoes.filter(h=>{if(h.e.hp<=0)return false;h.remaining-=dt;
        if(h.vx!==undefined){
          h.delay-=dt;if(h.delay>0)return true;h.x+=h.vx*dt;h.y+=h.vy*dt;
          if(dist(s,h)>=h.r+8)return h.remaining>0;
        }else if(h.remaining>0)return true;
        if(dist(s,h)<h.r+(h.vx!==undefined?8:0)){g.incomingEnemy=h.e;try{g.takeDamage(h.e.damage*(h.e.boss&&this.pacts.has('fury')?1.35:1));}finally{g.incomingEnemy=null;}}return false;});
      g.arsenal.tick(dt);g.effects=g.effects.filter(e=>(e.age+=dt)<e.life);for(const event of g.events)if(event.type==='sound')this.sound?.(event.name);g.events.length=0;
      if(s.hp<=0){this.phase='defeat';this.collect(true);}
      else if(this.secret==='tomb'&&this.clock>=this.deadline)this.finishTomb();
      for(const d of this.drops){d.age+=dt;if(!d.landed&&d.age>=.38){d.landed=true;this.notices.push(d.item.grade);
        if(d.item.grade>=4)this.lootNotice={name:D.bases[d.item.base].name,until:this.clock+2.2};}}
      this.collect();
    }
  }
  class DamageMeter{
    constructor(){this.hits=[];this.total=0;this.count=0;this.crits=0;this.breaks=0;this.peak=0;}
    sample(now){
      this.hits=this.hits.filter(h=>now-h.time<10);
      const current=this.hits.reduce((n,h)=>n+(now-h.time<1?h.damage:0),0);
      return {current,peak:this.peak,total:this.total,crit:this.count?100*this.crits/this.count:0,breaks:this.breaks};
    }
    hit(time,damage,critical,broken){
      this.total+=damage;this.count++;this.crits+=Number(critical);this.breaks+=Number(broken);
      this.hits.push({time,damage});this.sample(time);
      this.peak=Math.max(this.peak,this.hits.reduce((n,h)=>n+h.damage,0)/10);
    }
  }
  root.XiuxianAbyss={doors,secrets,demonUnlocked,DamageMeter,Run,storyRewards,worldDrop,dropGrade,crystalEligible};
})(globalThis);
