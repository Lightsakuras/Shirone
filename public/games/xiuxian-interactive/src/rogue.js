(function(root) {
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const D=node?require('./rogue-data.js'):root.XiuxianRogueData;
  const A=node?require('./armory.js'):root.XiuxianArmory;
  const F=node?require('./rogue-foes.js'):root.XiuxianRogueFoes;
  const L=node?require('./trial-legacy.js'):root.XiuxianTrialLegacy;
  const ids=Object.keys(D.families), tau=Math.PI*2, width=1120, height=600;
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function generator(seed){
    let value=seed>>>0;
    return ()=>{value=(Math.imul(1664525,value)+1013904223)>>>0;return value/4294967296;};
  }
  function sample(list,count,rng){
    const pool=list.slice(),items=[];
    while(pool.length&&items.length<count)items.push(pool.splice(Math.floor(rng()*pool.length),1)[0]);
    return items;
  }
  function grant(store,s,id){
    if(!s.unlockedAppearances.includes(id))s.unlockedAppearances.push(id);
  }
  function remember(store,id){
    store.change(s=>{
      const book=s.rogue.unlockedEvolutions;
      const local=s.trial.bookEvolutions;if(local.includes(id))return false;local.push(id);
      if(!book.includes(id))book.push(id);L.record(s,'reed');if(local.length>=3)L.record(s,'ledger');
      if(id==='ice')grant(store,s,'glacier_robe');
      if(id==='storm')grant(store,s,'storm_steps');
      if(book.length>=3)grant(store,s,'star_crown');
    });
  }
  function train(store,id){
    if(!Object.hasOwn(D.talents,id))return false;
    return store.change(s=>{
      const t=D.talents[id],level=s.rogue.talents[id]||0,cost=t[3]*(level+1);
      const parent=D.prerequisites[id];
      if(level>=t[2]||s.currency.jade<cost||(parent&&!s.rogue.talents[parent]))return false;
      s.currency.jade-=cost;s.rogue.talents[id]=level+1;
    });
  }
  function redeem(store,id){
    if(!Object.hasOwn(D.treasures,id))return false;
    return store.change(s=>{
      const cost=D.treasures[id],material=id==='stone'||id==='essence';
      if(s.currency.jade<cost||(!material&&((id.startsWith('ancient_')?s.exhibits.includes(id)||s.rogue.redeemed.includes(id):s.unlockedAppearances.includes(id))||s.recipes.includes(id))))return false;
      s.currency.jade-=cost;
      if(material)s.currency[id]+=id==='stone'?100:45;
      else {if(id.startsWith('ancient_'))s.recipes.push(id);else grant(store,s,id);
        if(!s.rogue.redeemed.includes(id))s.rogue.redeemed.push(id);}
    });
  }
  class Run {
    constructor(store,seed=Math.floor(Math.random()*4294967296),avatar="lin",story=null){
      this.store=store;this.medals=new Set();this.rhythm=new A.Rhythm((kind,count)=>{
        if(kind==='dodge'){store.recordDodge();this.sound?.('starDrop');}
        else if(count===25||count===100)this.medals.add('combo'+count);
      });this.seed=seed;this.rng=generator(seed);
      const t=store.state.rogue.talents;
      this.maxHp=100+20*(t.health||0);this.hp=this.maxHp;this.speed=175*(1+.08*(t.speed||0));
      this.magnet=105+24*(t.magnet||0);this.baseCrit=.06+.05*(t.crit||0);this.free=t.refresh||0;this.revive=t.revive||0;
      this.p={x:width/2,y:height/2};this.face={x:1,y:0};this.moving=false;
      this.weapons={};this.relics={};this.evolved={};this.cooldowns={};this.seals={storm:0,sword:0};
      this.xp=0;this.level=1;this.fire=0;this.force=0;this.ward=0;this.shieldCd=0;
      this.age=0;this.kills=0;this.wave=0;this.cleared=0;this.sequence=0;this.dashCd=0;this.invul=0;this.dashTime=0;
      this.profile=L.profile(story,store.state);this.avatar=this.profile.unlocked.includes(avatar)?avatar:'lin';
      this.weapons[D.avatars[this.avatar][2]]=1;this.baseCrit+=(this.avatar==='lin'?.1:0)+(this.profile.sect==='shushan'?.05:0);
      this.speed*=this.profile.origin==='beggar'?1.1:1;this.pact=this.profile.sect==='danding'?.1:0;
      this.mods={};this.barrier=0;this.boxes=0;this.bonusJade=0;this.charge=100;this.leechReserve=8;this.linked=[];this.still=0;
      this.cards=[];this.startWave();
    }
    get needed(){return D.needXp(this.level);}
    get stage(){return Math.min(4,Math.floor((this.wave-1)/3));}
    get cap(){return this.wave>=8?5:this.wave>=6?4:this.wave>=4?3:2;}
    get ultraSlots(){return this.wave<8?0:this.wave<11?1:this.wave<14?2:Math.min(8,3+Math.floor((this.wave-14)/3));}
    get slots(){return Math.min(8,2+Math.floor(this.wave/3));}
    active(id){return D.resonance[id].slice(1,3).every(k=>this.weapons[k]>=2);}
    startWave(){
      this.wave++;this.waveKills=this.kills;this.clock=0;this.spawnIn=0;this.reinforceAt=this.wave<=5?8:6;this.phase='fight';
      this.monsters=[];this.orbs=[];this.shots=[];this.fx=[];this.pools=[];this.bolts=[];this.hazards=[];this.fields=[];
      this.device=null;this.deviceIn=18+this.rng()*6;this.shopFree=Number(this.avatar==='xie');
      this.toadAt=this.rng()<.19?8+this.rng()*17:Infinity;this.bossSpawned=this.wave%5===0;
      if(this.bossSpawned)this.spawn(true);
      if(this.eliteWave===this.wave)for(let i=0;i<2;i++){const e=this.spawn(false,i?'golem':'cultist');e.elite=true;e.hp=e.maxHp*=3;A.Poise.init(e);}
    }
    spawn(boss=false,kind,at){return F.spawn(this,boss,kind,at);}
    heal(n){
      n*=this.profile.sect==='hehuan'?1.2:1;
      if(this.avatar==='shen'&&this.hp+n>this.maxHp)this.barrier=Math.min(35,this.barrier+this.hp+n-this.maxHp);
      this.hp=Math.min(this.maxHp,this.hp+n);
    }
    leech(amount){
      const heal=Math.min(amount,this.leechReserve);
      this.leechReserve-=heal;this.heal(heal);
    }
    area(center,r,power,kind){for(const e of this.monsters)if(e.hp>0&&distance(center,e)<=r)this.hit(e,power,kind);}
    iceRing(center,r){this.effect('shard',center.x,center.y,.55);for(const e of this.monsters)if(distance(e,center)<r)e.frozen=Math.max(e.frozen,1.25);}
    chargeBy(n){const prev=this.charge;this.charge=Math.min(100,this.charge+n);if(prev<100&&this.charge===100)this.sound?.('lootGold');}
    ultimate(){
      if(this.phase!=='fight'||this.charge<100)return false;
      this.charge=0;this.sound?.('ultimateCast');const p=this.p;
      if(this.avatar==='lin'){this.fury=4;for(let i=0;i<16;i++)this.missile('sword',null,tau*i/16,32,true);}
      if(this.avatar==='shen'){this.heal(this.maxHp*.35);this.fields.push({kind:'herb',x:p.x,y:p.y,r:142,power:20,tick:0,life:5});}
      if(this.avatar==='ning'){this.effect('blizzard',p.x,p.y,.95);for(const e of this.monsters){e.frozen=2.5;this.hit(e,!e.boss&&e.hp<e.maxHp*.25?1e7:20,'frostCut');}}
      if(this.avatar==='yun'){this.linked=this.monsters.filter(e=>e.hp>0).sort((a,b)=>distance(a,p)-distance(b,p)).slice(0,6);this.linkTime=5;for(const e of this.linked)this.hit(e,18,'thread');}
      if(this.avatar==='xie'){for(const e of this.monsters)e.frozen=2;this.fields.push({kind:'board',x:p.x,y:p.y,r:600,power:42,tick:0,count:9,life:2.8});}
      if(this.avatar==='demon'){this.invul=2.5;this.rush=2.5;}
      this.effect('burst',p.x,p.y,1,{r:122,color:D.families[D.avatars[this.avatar][2]].color});return true;
    }
    dash(){
      if(this.phase!=='fight'||this.dashCd>0)return false;
      this.rhythm.dash(this.age,this.p);this.sound?.('dashWhoosh');this.dashCd=this.profile.origin==='beggar'?1.575:2.1;this.dashTime=.20;this.invul=Math.max(.35,this.invul);
      if(this.avatar==='ning'){this.iceRing(this.p,105);this.area(this.p,105,23,'frostCut');}
      if(this.mods.thunderStep){this.effect('burst',this.p.x,this.p.y,.52,{r:100,color:'#d8aeff'});this.area(this.p,100,28,'storm');}
      return true;
    }
    pause(){
      if(this.phase==='pause'){this.phase=this.resumePhase;return;}
      if(['fight','shop','choice','event','victory'].includes(this.phase)){this.resumePhase=this.phase;this.phase='pause';}
    }
    effect(type,x,y,life,extra={}){
      if(this.fx.length>=360)this.fx.shift();
      this.fx.push({type,x,y,life,max:life,...extra});
    }
    nearest(from,predicate=()=>true){
      let found=null,best=Infinity;
      for(const e of this.monsters){if(e.hp<=0||!predicate(e))continue;const d=distance(e,from);if(d<best){found=e;best=d;}}
      return found;
    }
    bond(id){return Number(!!this.weapons[id])+Number(!!this.relics[id])+(this.seals[id]||0);}
    hit(e,amount,id,extraCrit=0,ultimate=false,finisher=false){
      if(!e||!(e.hp>0))return;
      const perfect=this.rhythm.counter(this.age),crit=perfect||this.rng()<Math.min(.75,(this.fury>0?.75:this.baseCrit)+this.rhythm.rank*.04+(this.relics.sword?.06:0)+extraCrit+(e.anim?.state==='broken'?.20:0));
      const storm=id==='storm'?(this.relics.storm?1.2:1)*(this.bond('storm')>=3?1.4:1):1;
      let damage=amount*(crit?1.7+(this.mods.breakArmy?.45:0)+(this.profile.origin==='demon'?.15:0):1)*(1+this.force*.1+this.pact+(this.avatar==='demon'?Math.floor(10*(1-this.hp/this.maxHp))*.08:0))*storm;
      if(this.mods.frostHeart&&e.frozen>0)damage*=1.3;
      if(id!=='trueStar'){if(e.kind==='golem')damage*=.72;if(e.boss&&e.type===4&&this.monsters.some(m=>m.kind==='orb'&&m.hp>0))damage*=.3;
        if(e.shield){const absorbed=Math.min(e.shield,damage);e.shield-=absorbed;damage-=absorbed;}}
      damage=A.Poise.damage(e,damage,{element:id,finisher,poiseRate:perfect?2.2:0,ultimate:ultimate||['rush','herb','frostCut','thread','board'].includes(id),riposte:this.age<(this.counterUntil||0)},()=>{
        this.hazards=this.hazards.filter(h=>h.owner!==e);this.bolts=this.bolts.filter(b=>b.owner!==e||!(b.delay>0));
        e.channel=0;e.brokenUntil=this.age+2.5;e.phase='真气已破';this.sound?.('shieldBreak');
      });
      const actual=Math.min(damage,e.hp);e.hp-=damage;if(actual>0)this.rhythm.hit(this.age);e.flash=.13;this.sound?.(crit?'hitCrit':'hitSolid');

      if(this.relics.ghost||this.avatar==='demon')this.leech(actual*(this.avatar==='demon'?.025:.03));
      if(id==='ghost'&&this.evolved.ghost||id==='bell'&&this.evolved.bell)this.heal(actual*.09);
      if(crit&&this.avatar==='yun'){this.heal(.6);this.chargeBy(.7);}
      if(e.hp<=0){
        root.XiuxianEnemyVfx?.fallen(this,e,this.age,id);
        this.kills++;this.fire+=e.boss?15:1;
        if(this.mods.goldEye&&this.kills%4===0)this.fire++;
        if(this.mods.bloodSoul||this.profile.origin==='demon'&&this.rng()<.15)this.heal(2);
        if(this.mods.soulVessel&&this.kills%10===0)this.chargeBy(12);
        if(e.kind==='goldToad'){this.fire+=24;this.boxes++;this.effect('burst',e.x,e.y,.9,{r:155,color:'#ffd56b',treasure:true});this.sound?.('lootAncient');}
        const value=(e.boss?22:2+Math.floor(Math.min(16,this.wave)/4))*(this.mods.goldEye?1.25:1);
        const near=this.orbs.length>140&&this.orbs.reduce((a,b)=>distance(a,e)<distance(b,e)?a:b);
        if(near)near.value+=value;else this.orbs.push({x:e.x,y:e.y,value});
        if(this.mods.corpseSeal&&this.rng()<.25){this.effect('burst',e.x,e.y,.3,{r:70,color:'#c4a7ff'});this.area(e,70,14,'corpse');}
        if(e.infected)for(const other of this.monsters)if(other.hp>0&&distance(e,other)<100){other.infected=true;other.burning=3;}
      }
      if((id==='fire'&&e.frozen>0||id==='ice'&&e.burning>0)&&this.active('melt')){e.frozen=0;e.burning=0;this.effect('burst',e.x,e.y,.42,{r:90,color:'#ffd4a1'});this.area(e,90,amount*2.4,'melt');}
      if(id==='fire'||id==='ghost'&&this.active('plague')){e.burning=2;if(id==='ghost')e.infected=true;}
      if(id==='sword'&&crit&&(this.bond('sword')>=3||this.active('thunder')&&this.rng()<.35)){
        const other=this.nearest(e,t=>t!==e);if(other){const lightning=this.active('thunder');this.effect(lightning?'storm':'slash',e.x,e.y,.33,{to:{x:other.x,y:other.y}});this.hit(other,amount*(lightning?1:.6),'shadow');}}
      if(this.linkTime>0&&id!=='thread'&&this.linked.includes(e))for(const other of this.linked)if(e!==other)this.hit(other,actual*.45,'thread');
    }
    hurt(damage){
      if(this.invul>0&&this.phase==='fight')this.rhythm.evade(this.age);
      if(this.invul>0||this.phase!=='fight')return;
      this.sound?.(this.ward?'shieldBreak':'playerHurt');this.invul=.68;
      if(this.ward){this.counterUntil=this.age+2;if(this.active('frost'))this.iceRing(this.p,135);this.ward=0;this.shieldCd=5;return;}
      if(this.barrier>0){const used=Math.min(this.barrier,damage);this.barrier-=used;damage-=used;}
      this.rhythm.hurt(Math.min(this.hp,damage*(this.relics.bell?.82:1)));this.hp=Math.max(0,this.hp-damage*(this.relics.bell?.82:1));
      if(this.profile.origin==='rain'&&!this.savedByLock&&this.hp<this.maxHp*.25){this.savedByLock=true;this.invul=3;this.hp=Math.max(1,this.hp);for(const e of this.monsters){const d=distance(e,this.p)||1;e.x=clamp(e.x+(e.x-this.p.x)*90/d,12,width-12);e.y=clamp(e.y+(e.y-this.p.y)*90/d,24,height-12);}}
      if(this.hp===0){
        if(this.revive){this.revive=0;this.hp=this.maxHp/2;this.invul=2;}
        else this.finish('劫尽力竭');
      }
    }
    missile(id,target,angle,power,ultimate=false,origin=this.p){
      const speed=id==='ghost'?345:id==='fire'?280:520;
      for(const heading of (this.mods.split?[angle-.09,angle+.09]:[angle]))this.shots.push({id,x:origin.x,y:origin.y,dx:Math.cos(heading),dy:Math.sin(heading),speed,power,ultimate,target,finisher:id==='basic'&&this.basicStrikes%3===0,
        life:ultimate?2.8:1.35,hit:new Set(),pierce:ultimate||id==='ice'||id==='sword'?8:1});
    }
    pool(x,y,power,big){
      this.pools.push({x,y,r:(big?78:46)*(this.relics.fire?1.2:1),power,life:big?2.5:1.6,tick:0});
    }
    attack(id,level){
      const first=this.nearest(this.p);if(!first)return;
      this.swingAt=this.age;
      if(id==='basic')this.basicStrikes=(this.basicStrikes||0)+1;
      const p=this.p,ult=!!this.evolved[id],power=7+level*4,a=Math.atan2(first.y-p.y,first.x-p.x);
      this.sound?.(({basic:'swordSlash',sword:'swordWave',ghost:'ghostWail',storm:'thunderCast',fire:'fireCast',ice:'iceCast',bell:'bellRing',star:'starDrop'})[id]||'swordSlash');
      if(id==='star'){
        const points=[first];if(ult)points.push(...sample(this.monsters.filter(e=>e!==first&&e.hp>0),2,this.rng));
        for(let i=0;i<points.length;i++){const point=points[i],next=points[(i+1)%points.length];
          this.effect('star',point.x,point.y,.7,{to:{x:next.x,y:next.y},ult});this.area(point,(ult?110:48)*(this.mods.starChain?1.5:1),power*(this.relics.star?1.2:1)*(ult?2.2:1),ult?'trueStar':'star');
          if(ult&&next!==point)for(const e of this.monsters){const dx=next.x-point.x,dy=next.y-point.y,u=clamp(((e.x-point.x)*dx+(e.y-point.y)*dy)/(dx*dx+dy*dy||1),0,1);if(Math.hypot(e.x-point.x-u*dx,e.y-point.y-u*dy)<22)this.hit(e,power,'trueStar');}
          if(this.active('domain'))for(let j=0;j<4;j++)this.missile('sword',null,tau*j/4,power*.7,false,point);
        }
      }else if(id==='wind'){
        for(let i=0;i<(ult?3:1);i++)this.fields.push({kind:'wind',x:p.x,y:p.y,a:a+(i-(ult?1:0))*.42,r:(ult?70:43)*(this.relics.wind?1.25:1),power:power*(this.mods.windBlade?1.5:1),tick:0,life:ult?4:2.3,ult});
      }else if(id==='storm'){
        const targets=ult?sample(this.monsters.filter(e=>e.hp>0),1,this.rng):[first];
        const struck=new Set();let target=targets[0],from={x:target.x-27,y:-24};
        while(target){
          struck.add(target);this.effect('storm',from.x,from.y,.46,{to:{x:target.x,y:target.y},ult});
          this.hit(target,power*(ult?1.8:1),id);from=target;
          if(!ult&&struck.size>=1+Math.ceil(level/2))break;
          target=this.nearest(from,e=>!struck.has(e)&&(ult||distance(e,from)<200));
        }
      }else if(id==='ice'&&ult){
        this.effect('blizzard',p.x,p.y,.95);
        for(const e of this.monsters){this.hit(e,power,id);e.frozen=(e.boss?.45:1.4)*(this.relics.ice?1.4:1);e.shatter=power*.7;}
      }else if(id==='bell'){
        const r=ult?600:95+level*16;this.effect('bell',p.x,p.y,.75,{r,ult});
        for(const e of this.monsters)if(distance(e,p)<=r){
          this.hit(e,power,id);if(e.poise)continue;const d=distance(e,p)||1;e.x=clamp(e.x+25*(e.x-p.x)/d,8,width-8);e.y=clamp(e.y+25*(e.y-p.y)/d,20,height-8);
        }
        if(this.active('frost'))this.iceRing(p,r);if(this.mods.echoBell)this.area(p,r,power*.5,'echo');
        if(ult)for(const b of this.bolts)if(distance(b,p)<=r){
          const d=distance(b,p)||1;b.dx=(b.x-p.x)/d;b.dy=(b.y-p.y)/d;b.repelled=true;
        }
      }else if(id==='fire'&&ult){
        this.effect('phoenix',p.x,p.y,1.7,{angle:this.age,power,next:0});
        this.pool(first.x,first.y,power*.4,true);
      }else if(id==='sword'&&ult){
        const living=this.monsters.filter(e=>e.hp>0);
        for(let i=0;i<12;i++){
          const t=i*tau/12+this.age*.5,origin={x:p.x+Math.cos(t)*82,y:p.y+Math.sin(t)*62};
          const enemy=living[i%living.length];
          this.missile(id,enemy,Math.atan2(enemy.y-origin.y,enemy.x-origin.x),power,true,origin);
        }
      }else{
        const count=ult&&id==='ghost'?12:id==='basic'?1:Math.min(4,Math.ceil(level/2));
        for(let i=0;i<count;i++){
          const target=id==='ghost'?this.monsters[(i+this.sequence)%this.monsters.length]:first;
          this.missile(id,target,a+(i-(count-1)/2)*(ult?.44:.13),power,ult);
        }
      }
    }
    choices(){
      const owned=ids.filter(id=>this.weapons[id]),allowed=ids.filter(id=>(this.weapons[id]||0)<this.cap&&(this.weapons[id]||owned.length<this.slots));
      const weapons=allowed.map(id=>'weapon:'+id),relics=ids.filter(id=>!this.relics[id]).map(id=>'relic:'+id);
      const focus=weapons.filter(card=>this.weapons[card.slice(7)]).sort((a,b)=>this.weapons[b.slice(7)]-this.weapons[a.slice(7)]);
      for(const id of owned)if(!this.relics[id])focus.push('relic:'+id);
      return {weapons,relics,focus,mods:Object.keys(D.mods).filter(id=>!this.mods[id]).map(id=>'mod:'+id)};
    }
    blessings(){
      const c=this.choices(),cards=ids.filter(id=>this.weapons[id]>=5&&this.relics[id]&&!this.evolved[id]).map(id=>'evolve:'+id).slice(0,3);
      if(Object.keys(this.evolved).length>=this.ultraSlots)cards.length=0;
      if(cards.length<3&&c.focus.length)cards.push(c.focus[0]);
      const pool=[...c.weapons,...c.relics,...sample(c.mods,4,this.rng),'boost:force','boost:heal'];
      return cards.concat(sample(pool.filter(k=>!cards.includes(k)),3-cards.length,this.rng));
    }
    apply(card){
      const [kind,id]=card.split(':');
      if(kind==='weapon')this.weapons[id]=Math.min(this.cap,(this.weapons[id]||0)+1);
      if(kind==='relic')this.relics[id]=1;
      if(kind==='mod')this.mods[id]=true;
      if(kind==='evolve'){remember(this.store,id);this.evolved[id]=true;if(Object.keys(this.evolved).length===2)this.store.award('duet');if(id==='bell')this.ward=1;}
      if(kind==='boost'){
        if(id==='heal')this.heal(35);
        if(id==='force')this.force++;
        if(id==='swordSeal')this.seals.sword++;
        if(id==='thunderSeal')this.seals.storm++;
      }
    }
    strikeDevice(point){
      const d=this.device;if(this.phase!=='fight'||!d||![1,2].includes(d.stage)||distance(d,point)>40||distance(d,this.p)>240||this.age<(this.strikeAt||0))return false;
      this.strikeAt=this.age+.4;this.effect('slash',this.p.x,this.p.y,.25,{to:d});d.hp-=12;
      if(d.hp<=0)this.triggerDevice();return true;
    }
    chestCards(){
      const c=this.choices(),pool=[...c.mods,...c.weapons,...c.relics];
      return sample(pool,3,this.rng).concat(['boost:force','boost:heal','boost:swordSeal']).slice(0,3);
    }
    checkLevel(){
      this.chest=false;
      if(this.boxes){this.boxes--;this.chest=true;}
      else{if(this.xp<this.needed)return false;this.xp-=this.needed;this.level++;}
      this.cards=this.chest?this.chestCards():this.blessings();this.phase='choice';return true;
    }
    choose(card){
      if(this.phase!=='choice'||!this.cards.includes(card))return false;
      this.apply(card);if(this.chest){this.fire+=8;this.heal(12);if(card.startsWith('weapon:'))this.apply(card);}
      this.cards=[];this.phase='fight';this.checkLevel();return true;
    }
    reroll(){
      if(this.phase!=='choice'||!this.free&&this.fire<4)return false;
      if(this.free)this.free--;else this.fire-=4;
      this.cards=this.chest?this.chestCards():this.blessings();return true;
    }
    makeStock(){
      const c=this.choices(),offers=[];
      const newWeapon=c.weapons.filter(k=>!this.weapons[k.slice(7)]);
      const first=sample(newWeapon.length?newWeapon:c.weapons,1,this.rng)[0];
      const focus=c.focus.find(k=>k!==first);
      for(const card of [first,focus,sample(c.mods,1,this.rng)[0],'boost:heal',sample(['force','swordSeal','thunderSeal'],1,this.rng).map(k=>'boost:'+k)[0]].filter(Boolean)){
        const [kind,id]=card.split(':'),base=kind==='boost'?D.goods[id][2]:kind==='mod'?16:kind==='relic'?12:12+3*(this.weapons[id]||0);
        offers.push({card,price:Math.max(1,Math.ceil(base*(this.profile.origin==='caravan'?.85:1)*(this.avatar==='xie'?.9:1)))});
      }
      return offers;
    }
    openShop(){
      this.phase='shop';this.shopTime=30;
      const kept=this.lockedStock||[];this.lockedStock=null;
      this.stock=[...kept,...this.makeStock().filter(k=>!kept.some(v=>v.card===k.card))].slice(0,5);
    }
    refreshShop(){
      if(this.phase!=='shop'||this.shopFree===0&&this.fire<6)return false;
      if(this.shopFree)this.shopFree--;else this.fire-=6;
      const kept=this.stock.filter(v=>v.lock&&!v.sold);this.stock=[...kept,...this.makeStock().filter(k=>!kept.some(v=>v.card===k.card))].slice(0,5);return true;
    }
    lockShop(){
      if(this.phase!=='shop')return false;
      const lock=this.stock.some(v=>!v.sold&&!v.lock);for(const v of this.stock)v.lock=lock&&!v.sold;return true;
    }
    buy(index){
      const offer=this.stock[index];if(this.phase!=='shop'||!offer||offer.sold||this.fire<offer.price)return false;
      const [kind,id]=offer.card.split(':');
      if(kind==='weapon'&&((this.weapons[id]||0)>=this.cap||!this.weapons[id]&&Object.keys(this.weapons).length>=this.slots)||kind==='relic'&&this.relics[id]||kind==='mod'&&this.mods[id])return false;
      this.apply(offer.card);this.fire-=offer.price;offer.sold=true;return true;
    }
    leaveShop(){
      if(this.phase!=='shop')return;
      this.lockedStock=this.stock.filter(v=>v.lock&&!v.sold);
      if(this.wave%3===0){this.phase='event';this.cards=[...sample(this.fire>=15&&Object.values(this.weapons).some(level=>level+2<=this.cap)?['spring','sacrifice','elite']:['spring','elite'],2,this.rng),'rest'];}
      else this.startWave();
    }
    decide(id){
      if(this.phase!=='event'||!this.cards.includes(id))return false;
      if(id==='sacrifice'){if(this.fire<15)return false;const options=Object.keys(this.weapons).filter(k=>this.weapons[k]+2<=this.cap);
        if(!options.length)return false;const k=sample(options,1,this.rng)[0];this.fire-=15;this.weapons[k]=Math.min(this.cap,this.weapons[k]+2);}
      if(id==='spring'){this.maxHp=Math.max(1,Math.floor(this.maxHp*.8));this.hp=Math.min(this.hp,this.maxHp);this.pact+=.45;}
      if(id==='elite')this.eliteWave=this.wave+1;
      if(id==='rest'){this.heal(this.maxHp);this.fire+=12;}
      this.cards=[];if(this.wave===15)this.phase='victory';else this.startWave();return true;
    }
    flushMedals(){for(const id of this.medals)this.store.award(id);this.medals.clear();}
    finish(reason='收功归山'){
      if(this.result)return this.result;this.flushMedals();
      const jade=Math.min(28,Math.floor(this.cleared*1.6)+Math.min(this.cleared,this.bonusJade)),stone=this.cleared*6+Math.ceil(this.kills/3);
      const rewards=[];
      this.store.change(s=>{
        s.currency.jade+=jade;s.currency.stone+=stone;
        const meta=s.rogue;meta.bestWave=Math.max(meta.bestWave,this.cleared);
        meta.totalKills=(meta.totalKills||0)+this.kills;if(this.cleared>=15)meta.clears++;
        for(const [condition,id] of [[this.cleared>=15,'nine_wings'],[this.cleared>=20,'emperor_robe'],[meta.totalKills>=1500,'lotus_steps']]){
          if(condition&&!s.unlockedAppearances.includes(id)){grant(this.store,s,id);rewards.push(id);}
        }
      });
      this.phase='result';return this.result={reason,jade,stone,rewards};
    }
    step(dt,input={}){
      if(dt<=0||!Number.isFinite(dt))return;dt=Math.min(.05,dt);
      if(this.phase==='shop'){this.shopTime-=dt;if(this.shopTime<=0)this.leaveShop();return;}
      if(this.phase!=='fight')return;
      this.clock+=dt;this.age+=dt;this.rhythm.tick(this.age);const p=this.p;
      for(const k of ['dashCd','dashTime','invul','shieldCd','slow','fury','rush','windTime','attract','linkTime'])this[k]=Math.max(0,(this[k]||0)-dt);
      if(this.evolved.bell&&!this.shieldCd)this.ward=1;
      this.leechReserve=Math.min(8,this.leechReserve+dt*3);this.chargeBy(dt*(this.profile.sect==='tianji'?5:3.6));this.tickField(dt);
      if(this.mods.wardRing&&this.age>=(this.wardAt||0)){this.ward=1;this.wardAt=this.age+12;}
      if(this.mods.judgment&&this.age>=(this.judgeAt||0)){const e=this.strongest();if(e){this.effect('storm',e.x-30,0,.5,{to:e});this.hit(e,45+this.wave*2,'storm');this.judgeAt=this.age+6;}}
      if(this.rush>0){const e=this.nearest(p);if(e){const d=distance(p,e)||1,step=Math.min(d,730*dt);p.x+=(e.x-p.x)*step/d;p.y+=(e.y-p.y)*step/d;if(d<42){this.hit(e,200*dt,'rush');this.heal(10*dt);}this.effect('after',p.x,p.y,.2);}}
      const d=Math.hypot(input.x||0,input.y||0);this.moving=d>0||this.dashTime>0;
      this.still=this.moving?0:this.still+dt;
      if(d&&!this.dashTime)this.face={x:input.x/d,y:input.y/d};
      if(this.moving){
        const step=this.speed*(1+.03*this.rhythm.rank)*dt*(this.dashTime?4.2:1)*(this.windTime?1.6:1)*(this.slow?.64:1);
        p.x=clamp(p.x+this.face.x*step,19,width-19);p.y=clamp(p.y+this.face.y*step,58,height-16);
      }
      this.spawnIn-=dt;
      if(this.clock<D.waveSeconds(this.wave)&&this.spawnIn<=0&&this.monsters.length<105){
        for(let i=0;i<1+Math.min(4,Math.floor(this.wave/5));i++)this.spawn();
        this.spawnIn=this.wave<=5?[1.12,1.04,.95,.90,.85][this.wave-1]:Math.max(.27,.95-this.wave*.033);
        if(this.wave>=9&&this.rng()<.18){const elite=this.spawn(false,'bladeShadow');elite.elite=true;elite.hp=elite.maxHp*=3;A.Poise.init(elite);elite.cast=.9;}
      }
      if(this.wave>=4&&this.clock>=this.reinforceAt&&this.clock<D.waveSeconds(this.wave)){
        this.reinforceAt+=Math.max(5,10-this.wave*.24);
        const caster=this.spawn(false,'cultist');caster.elite=true;caster.hp=caster.maxHp*=2.5;A.Poise.init(caster);caster.cast=0;
        if(this.wave>=10){const angle=this.rng()*tau;this.hazards.push({owner:caster,detached:true,shape:'line',x:p.x-270*Math.cos(angle),y:p.y-270*Math.sin(angle),a:angle,len:540,r:14,delay:1.2,time:0,life:.35,tick:0,damage:16+this.wave});}
      }
      this.tickEnemies(dt);if(this.phase!=='fight')return;
      for(const [id,lv] of Object.entries({basic:1,...this.weapons})){
        this.cooldowns[id]=(this.cooldowns[id]||0)-dt;
        if(this.cooldowns[id]<=0){
          this.attack(id,lv);
          const speed=(1+.07*(lv-1))*(this.fury?1.65:1)*(this.windTime?1.6:1)*(this.mods.stillFocus&&this.still>1.5?1.45:1)/(this.mods.swift?.85:1);
          this.cooldowns[id]=({basic:.54,star:1.24,wind:1.75,bell:1.6,storm:1,ice:1,fire:.92,ghost:.74,sword:.69}[id])*(this.evolved[id]?1.62:1)/Math.min(1.65,speed);
        }
      }
      this.tickShots(dt);
      for(const bird of this.fx)if(bird.type==='phoenix'&&(bird.next-=dt)<=0){
        const a=bird.angle+(1-bird.life/bird.max)*tau;
        this.pool(width/2+Math.cos(a)*width*.39,height/2+Math.sin(a)*height*.36,bird.power*.4,true);bird.next=.15;
      }
      for(const area of this.pools){
        area.life-=dt;area.tick-=dt;
        if(area.tick<=0){area.tick=.42;for(const e of this.monsters)if(distance(e,area)<area.r)this.hit(e,area.power,'fire');}
      }
      this.pools=this.pools.filter(e=>e.life>0);this.fx=this.fx.filter(e=>(e.life-=dt)>0);
      this.monsters=this.monsters.filter(e=>e.hp>0);
      const waveDone=this.clock>=D.waveSeconds(this.wave)&&!this.monsters.some(e=>e.boss||this.eliteWave===this.wave&&e.elite);
      this.orbs=this.orbs.filter(o=>{
        const d=distance(o,p);
        if(d<20||waveDone){this.sound?.('xpPickup');this.xp+=o.value;return false;}
        if(d<this.magnet*(this.attract?2:1)||o.pulled){o.pulled=true;const speed=Math.min(d,dt*420);o.x+=(p.x-o.x)/d*speed;o.y+=(p.y-o.y)/d*speed;}
        return true;
      });
      if(waveDone&&this.cleared<this.wave){
        this.cleared=this.wave;
        if(this.profile.origin==='poor')this.heal(this.maxHp*.18);if(this.profile.origin==='caravan')this.fire+=6;if(this.profile.sect==='baicao')this.heal(8);
        if(this.eliteWave===this.wave){this.bonusJade+=2*(4+Math.floor((this.kills-this.waveKills)/4));this.boxes++;this.eliteWave=0;}
        if(this.wave%3===0){this.store.change(s=>{A.Home.grow(s);const id={3:'lamp',9:'ruler',15:'bell'}[this.wave];if(id)L.record(s,id);if(this.wave===15)s.rogue.bestWave=Math.max(15,s.rogue.bestWave);});}
      }
      if(this.checkLevel())return;
      if(waveDone)this.openShop();
    }
    tickField(dt){
      for(const f of this.fields){
        f.life-=dt;f.tick-=dt;
        if(f.kind==='wind'){
          f.x+=Math.cos(f.a)*155*dt;f.y+=Math.sin(f.a)*155*dt;
          if(f.ult)this.bolts=this.bolts.filter(b=>distance(b,f)>f.r);
          for(const e of this.monsters){const d=distance(e,f);if(d>1&&d<f.r&&!e.boss){const step=Math.min(d,dt*120);e.x+=(f.x-e.x)*step/d;e.y+=(f.y-e.y)*step/d;}}
        }
        if(f.tick>0)continue;f.tick=f.kind==='board'?.28:.45;
        if(f.kind==='board'){if(f.count-->0){const e=this.nearest(this.p)||this.p;this.effect('storm',e.x-55,0,.4,{to:{x:e.x,y:e.y}});this.area(e,72,f.power,'board');}}
        else{this.area(f,f.r,f.power,f.kind);if(f.kind==='herb'&&distance(f,this.p)<f.r){this.slow=0;this.hazards=this.hazards.filter(h=>h.shape!=='poison'||distance(h,f)>f.r);}
          if(f.kind==='wind'&&this.active('tempest')){const e=this.nearest(f);if(e&&distance(e,f)<190){this.effect('storm',f.x,f.y,.3,{to:{x:e.x,y:e.y}});this.hit(e,f.power,'storm');}}}
      }
      this.fields=this.fields.filter(f=>f.life>0);
      if((this.deviceIn-=dt)<=0){this.deviceIn=18+this.rng()*6;const a=this.rng()*tau,reach=100+this.rng()*95;
        this.device={x:clamp(this.p.x+Math.cos(a)*reach,48,width-48),y:clamp(this.p.y+Math.sin(a)*reach,72,height-40),hold:0,hp:18,stage:this.stage};
        if(distance(this.device,this.p)<75)this.device.x=this.p.x+(this.p.x<width/2?100:-100);}
      const d=this.device;
      if(d){const inside=distance(this.p,d)<48;d.hold=inside?d.hold+dt:0;
        if((d.stage===0&&d.hold>=3)||(inside&&[1,3,4].includes(d.stage))||d.hp<=0&&[1,2].includes(d.stage))this.triggerDevice();}
      if(this.clock>=this.toadAt){this.spawn(false,'goldToad');this.toadAt=Infinity;}
    }
    triggerDevice(){
      const d=this.device;if(!d)return;this.device=null;
      this.effect('burst',d.x,d.y,.75,{r:145,color:D.stages[d.stage][3]});
      if(d.stage===0){this.heal(15);this.attract=9;}
      if(d.stage===1)for(const e of this.monsters){this.effect('storm',d.x,d.y,.35,{to:{x:e.x,y:e.y}});e.frozen=2;this.hit(e,18,'storm');}
      if(d.stage===2){this.pool(d.x,d.y,45,true);for(const e of this.monsters)if(distance(e,d)<200)this.hit(e,e.boss?85:1e7,'fire');}
      if(d.stage===3)this.windTime=6;
      if(d.stage===4){const target=this.strongest();if(target){this.effect('star',target.x,target.y,.8,{to:d,ult:true});this.hit(target,100+this.wave*14,'trueStar');}}
    }
    strongest(){return this.monsters.reduce((best,e)=>e.hp>(best?.hp||0)?e:best,null);}
    tickEnemies(dt){F.tick(this,dt);}
    tickShots(dt){
      this.shots=this.shots.filter(s=>{
        s.life-=dt;
        if(s.id==='ghost'||s.id==='fire'){
          if(!s.target||s.target.hp<=0)s.target=this.nearest(s,e=>!s.hit.has(e.id));
          if(s.target){const d=distance(s,s.target)||1;s.dx=(s.target.x-s.x)/d;s.dy=(s.target.y-s.y)/d;}
        }
        s.x+=s.dx*s.speed*dt;s.y+=s.dy*s.speed*dt;
        if(this.device&&[1,2].includes(this.stage)&&distance(s,this.device)<30&&!s.hit.has('device')){s.hit.add('device');this.device.hp-=s.power;}
        for(const e of this.monsters){
          if(e.hp<=0||s.hit.has(e.id)||distance(e,s)>(e.boss?32:17))continue;
          s.hit.add(e.id);this.hit(e,s.power,s.id,s.id==='ghost'&&s.ultimate?.35:0,s.ultimate,s.finisher);
          if(s.id==='fire'){this.pool(e.x,e.y,s.power*.36,false);if(this.mods.fireSeed)this.pool(e.x+18,e.y,s.power*.3,false);}
          if(s.id==='ice')e.frozen=.36*(this.relics.ice?1.4:1);
          if(--s.pierce<=0)return false;
          if(s.id==='ghost')s.target=null;
        }
        return s.life>0&&s.x>-24&&s.x<width+24&&s.y>-24&&s.y<height+24;
      });
    }
  }
  const api={Run,train,redeem,width,height};
  if(node)module.exports=api;else root.XiuxianRogue=api;
})(globalThis);
