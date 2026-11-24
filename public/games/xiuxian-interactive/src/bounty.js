(function(root){
  'use strict';
  const rows=root.XiuxianBountyData,A=root.XiuxianArmory;
  const realms=['zhuji','jindan','yuanying','huashen','heti','dacheng'];
  function unlocked(row,g,store){
    const s=g.state,r=realms.indexOf(s.campaign?.cultivation?.realmId);
    return [!!(s.inventory.box||s.flags.complete),s.chapter.rank>=4||r>0,!!s.chapter.tomb.rescued,r>=1,r>=1,!!s.sect?.id||r>=2,r>=2,r>=2,r>=3,r>=5||store.summary().power>=1800][row.index];
  }
  function study(store){return store.change(s=>{if(!s.bounty.scrolls)return false;s.bounty.scrolls--;s.bounty.insight++;});}
  function shape(h){
    const {x,y,r,heading,length}=h;
    if(h.kind==='beam'||h.kind==='dash')return {kind:'line',x,y,heading,length,halfWidth:r};
    if(h.kind==='ring'||h.kind==='iceRing')return {kind:'donut',x,y,innerR:r-16,outerR:r+16};
    if(h.kind==='breath')return {kind:'cone',x,y,heading,spread:1.6,r};
    if(h.kind==='rift')return {kind:'cross',x,y,arms:[0,Math.PI/2],length,halfWidth:r};
    return {kind:'zone',x,y,r,duration:h.life,tick:.75,element:h.kind==='fire'?'fire':h.kind==='iceRing'?'frost':'poison'};
  }
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  class Hunt extends root.XiuxianAbyss.Run{
    constructor(main,store,row,rng=Math.random){
      if(!rows.includes(row)||!unlocked(row,main,store))throw Error('悬赏尚未揭榜');
      super(main,store,1,rng,row);
    }
    spawn(){
      super.spawn();const row=this.contract,chief=this.enemies[0],hp=520+row.index*360+row.index**2*140;
      Object.assign(chief,{id:row.id,name:row.name,affix:null,elite:false,boss:true,defense:row.defense,kind:'keeper',hp,maxHp:hp,damage:13+row.index*2.2,x:755,y:393});
      this.enemies=[A.Poise.init(chief)];this.hazards=[];this.nextCast=1;this.round=0;this.chief=chief;
    }
    summon(name,shield=false){
      const e=this.chief;if(this.enemies.filter(m=>m.hp>0).length>=4)return;
      const hp=Math.ceil(e.maxHp*(shield?.14:.085));
      const minion={...e,id:e.id+'-'+this.clock+'-'+this.enemies.length,name,boss:false,defense:shield?e.defense:Math.round(e.defense*.20),kind:'stone',elite:false,wind:0,affix:null,hp,maxHp:hp,damage:e.damage*.38,x:e.x+(this.rng()-.5)*128,y:e.y+55};
      this.enemies.push(A.Poise.init(minion));if(shield)e.guardOrb=minion;
    }
    cast(){
      const row=this.contract,e=this.chief,s=this.actor.state,angle=Math.atan2(s.y-e.y,s.x-e.x),round=this.round++;
      const mark=(kind,x,y,r,delay,life=0,heading=angle,length=430)=>this.hazards.push({kind,x,y,r,delay,life,heading,length,age:0,tick:0});
      const burst=(count,spread)=>{for(let n=0;n<count;n++)mark('bolt',e.x,e.y,15,.78+n*.05,1.7,angle+(n-(count-1)/2)*spread);};
      const id=row.id==='saint'?['wyrm','blade','bone'][Math.min(2,Math.floor((1-e.hp/e.maxHp)*3))]:row.id;
      switch(id){
        case 'mist':mark('mist',s.x,s.y,79,.95,2.4);this.summon('雾影');break;
        case 'bamboo':mark('dash',e.x,e.y,28,.9,0,angle,Math.min(510,distance(s,e)+80));break;
        case 'corpse':mark('poison',s.x,s.y,59,.9,4);mark('smash',e.x,e.y,125,1.5);break;
        case 'wyrm':mark('breath',e.x,e.y,285,.78);burst(7,.15);mark('iceRing',s.x,s.y,89,1.5,.22);break;
        case 'blade':for(let n=0;n<7;n++){const a=n*Math.PI*2/7+round*.46;mark('bolt',s.x+Math.cos(a)*150,s.y+Math.sin(a)*150,13,.85+n*.08,1.55,a+Math.PI);}break;
        case 'ember':for(let n=0;n<3;n++)mark('ring',s.x,s.y,48+n*44,.7+n*.4,.32);
          mark('fire',s.x,s.y,57,1.9,3);break;
        case 'spider':mark('web',s.x,s.y,75,.7,4.2);burst(5,.22);break;
        case 'puppet':if(!e.guardOrb||e.guardOrb.hp<=0)this.summon('护盾灵球',true);
          for(let n=-1;n<=1;n++)mark('beam',s.x+n*88,120,21,.96+n*.12,.34,Math.PI/2,610);break;
        case 'bone':mark('rift',s.x,s.y,23,.91,.35,0,480);break;
      }
      this.castTime=Math.min(...this.hazards.filter(h=>h.age===0).map(h=>h.delay));
      A.Poise.pose(e,'windup',this.castTime,s,row.move);e.cooldown=Math.max(e.cooldown,this.castTime+.2);e.wind=0;
      this.sound?.(id==='puppet'?'thunderCast':id==='blade'?'swordWave':id==='wyrm'?'iceCast':id==='ember'||id==='bone'?'fireCast':id==='mist'?'ghostWail':'warning');
    }
    step(dt,input){
      if(this.paused||this.phase!=='combat')return;
      super.step(dt,input);if(this.phase!=='combat')return;
      if(this.chief.anim.state==='broken')return;
      this.castTime=Math.max(0,(this.castTime||0)-dt);
      if(this.clock>=this.nextCast&&!this.chief.wind&&['idle','move'].includes(this.chief.anim.state)){this.cast();this.nextCast=this.clock+(this.chief.hp<this.chief.maxHp*.5?2.55:3.65);}
      const s=this.actor.state;
      this.hazards=this.hazards.filter(h=>{
        h.age+=dt;if(h.age<h.delay)return true;
        
        if(h.kind==='bolt'){h.x+=Math.cos(h.heading)*250*dt;h.y+=Math.sin(h.heading)*250*dt;}
        const area=shape(h),hit=A.Geo.hits(area,s);if(h.age>=h.tick)this.actor.arsenal.rhythm.avoided(this.actor.arsenal.clock,p=>A.Geo.hits(area,p),s);
        if(h.age-dt<h.delay&&this.chief.anim.state==='windup')A.Poise.strike(this.chief,s,hit,h.kind,(dx,dy)=>{this.chief.x+=dx;this.chief.y+=dy;});
        if(h.kind==='dash'){this.chief.x=Math.max(55,Math.min(1225,h.x+Math.cos(h.heading)*h.length));this.chief.y=Math.max(165,Math.min(708,h.y+Math.sin(h.heading)*h.length));}
        if(hit&&h.age>=h.tick){if(h.kind==='iceRing')this.frozenUntil=this.clock+.7;
          if(h.kind==='web'||h.kind==='mist')this.slowUntil=this.clock+.8;
          this.actor.incomingEnemy=this.chief;try{this.actor.takeDamage(this.chief.damage*(h.kind==='smash'?1.45:.8));}finally{this.actor.incomingEnemy=null;}h.tick=h.age+.75;}
        return h.age<h.delay+h.life&&!(hit&&h.kind==='bolt');
      });
    }
    defeated(e){
      if(e!==this.chief||e.paid)return;
      const row=this.contract,hard=this.main.playMode==='challenge';
      this.payout=this.store.change(s=>{
        if(row.id==='mist'&&!this.actor.damageTaken)A.Ach.award(s,'untouched');
        const first=!s.bounty.wins[row.id],grade=root.XiuxianAbyss.dropGrade([1,1,6,6,6,13,13,21,21,30][row.index],true,false,this.main.playMode,this.rng,false,this.store.summary().effects.has('fortune_eye')?1.18:1);
        const item=root.XiuxianArmoryData.legendary.imbue(A.createItem(row.base,grade,this.rng),this.rng);this.store.acquire(s,item);
        const stone=(first?48:14)+row.index*4,essence=(first?22:6)+row.index*2;
        s.currency.stone+=Math.round(stone*(hard?1.5:1));s.currency.essence+=Math.round(essence*(hard?1.5:1));
        if(root.XiuxianAbyss.crystalEligible({bountyIndex:row.index})&&this.rng()<.4*(this.store.summary().effects.has('fortune_eye')?1.18:1))s.currency.crystal+=this.store.summary().effects.has('greed_pouch')?2:1;
        if(hard)s.fragments=(s.fragments||0)+1;if(first){s.bounty.scrolls++;s.trial.study++;s.trial.ward++;}
        s.bounty.wins[row.id]=(s.bounty.wins[row.id]||0)+1;root.XiuxianHomestead.grow(s);
        return {first,grade,name:row.reward,stone:Math.round(stone*(hard?1.5:1)),essence:Math.round(essence*(hard?1.5:1)),hard};
      });
      e.paid=true;this.phase='won';this.hazards=[];this.echoes=[];this.enemies.forEach(m=>m.hp=0);this.sound?.('bountyClear');
    }
  }
  root.XiuxianBounty={Hunt,unlocked,study,shape};
})(globalThis);
