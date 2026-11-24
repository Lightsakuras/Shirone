(function(root){
  'use strict';
  // The browser annotates transient paint receipts after calling the original rule exactly once.
  // Save validation, simulation tests and non-visual consumers keep the original Game class.
  class VisualGame extends root.XiuxianEngine.Game {
    sound(name,volume){return super.sound(({hurt:'playerHurt',dash:'dashWhoosh',fire:'fireCast',needle:'iceCast',hit:'hitSolid',sword:'swordSlash'})[name]||name,volume);}
    castSkill(){
      const hp=this.state.hp,ok=this.withSpiritCost(this.skillInfo()?.cost||0,()=>super.castSkill());
      if(ok){this.scaleHealing(hp);this.arsenal?.legend.onSkill();this.sound('ultimateCast');}
      return ok;
    }
    // Meet the inherited affordability check even at zero MP. The first debit
    // consumes the temporary credit before any hit, checkpoint or reward.
    withSpiritCost(cost,action){
      if(!cost||!this.arsenal?.legend.freeSpirit)return action();
      const mp=this.state.mp;this.spiritCredit=mp;this.state.mp=Math.max(mp,cost);
      try{return action();}finally{if(this.spiritCredit!==undefined)this.state.mp=mp;delete this.spiritCredit;}
    }
    restoreSpirit(value){
      if(this.spiritCredit!==undefined&&value<this.state.mp){value=this.spiritCredit;delete this.spiritCredit;}
      else if(this.arsenal?.legend.freeSpirit&&value<this.state.mp)value=this.state.mp;
      return super.restoreSpirit(value);
    }
    scaleHealing(before){if(this.healFactor!==undefined&&this.state.hp>before)this.state.hp=before+(this.state.hp-before)*this.healFactor;}
    dodge(vector){
      const ok=this.withSpiritCost(12,()=>super.dodge(vector));
      if(ok&&this.arsenal){this.arsenal.rhythm.dash(this.arsenal.clock,this.state);this.arsenal.legend.onDodge();if(this.arsenal.legend.has('demon_boots'))this.dashCd*=.6;}
      return ok;
    }
    attachArmory(store){this.arsenal=new root.XiuxianWeapons.Arsenal(this,store);
      if(!this.abyssActor)store.bindRealm(()=>root.XiuxianArmory.Legacy.profile(this.state,store.state).rank);
    }
    activeEnemies(){
      const enemies=super.activeEnemies();
      if(this.arsenal)for(const e of enemies)if(!e.anim)root.XiuxianArmory.Poise.init(e,this.arsenal.isBoss(e)||e.elite);
      return enemies;
    }
    resolveEnemyDamage(e,n){
      let amount=super.resolveEnemyDamage(e,n);
      if(this.abyssActor&&e.defense){
        const level=this.arsenal.gear.worn.weapon?.level||0;
        const armor=e.defense/(1+level*.055+Math.max(0,level-6)*.12)*(this.castingSkill?.6:1);
        amount*=120/(120+armor);
      }
      if(!this.arsenal||!e.poise)return amount;
      const a=this.arsenal;
      return root.XiuxianArmory.Poise.damage(e,amount,{
        poiseRate:Math.max(a.hitAction?.poiseRate||0,a.perfectHit?2.2:0),finisher:a.hitAction?.finisher,element:a.hitAction?.element||({fire:'fire',needle:'ice'})[this.hitSource],
        skill:!!this.castingSkill,riposte:a.clock<(a.counterUntil||0)
      },()=>{a.hazards=a.hazards.filter(h=>h.e!==e);this.onPoiseBreak?.(e);});
    }
    insight(){
      const extra=this.arsenal?.store.state.bounty.insight;
      if(!extra)return super.insight();
      const c=this.state.chapter,earned=(this.state.flags.complete?2:0)+c.quests.length*3;
      return Math.max(0,earned+extra-(c.rank===4?5:c.rank));
    }
    move(actor,dx,dy,radius){const scale=actor===this.state?1+(this.arsenal?.gear.aura?.move||0):1;return super.move(actor,dx*scale,dy*scale,radius);}
    objects(){
      const list=super.objects();
      if(!this.arsenal||this.state.run||this.sectSummitBattleActive?.()||this.isChild()||this.state.campaign?.battle)return list;
      if(this.state.map==='garden')return [...list,{id:'abyssGate',kind:'echoGate',name:'万象天渊',x:865,y:595},
        {id:'bountyBoard',kind:'stone',name:'山河悬赏榜',x:465,y:605},{id:'homeGate',kind:'furnace',name:'药庐洞府',x:180,y:365}];
      if(this.state.map==='qingyang')return [...list,{id:'bountyBoard',kind:'stone',name:'山河悬赏榜',x:745,y:485}];
      return list;
    }
    interact(){const type=({abyssGate:'abyss',bountyBoard:'bounty',homeGate:'homestead'})[this.nearest()?.id];if(type){this.events.push({type});return true;}return super.interact();}
    step(dt,input){
      const s=this.state,map=s.map,run=s.run,before=s.playTime,hp=s.hp;
      const result=super.step(dt,input);
      if(this.arsenal){
        if(this.recovering&&this.arsenal.legend.has('wager_ring')&&s.hp>hp)s.hp=hp;
        if(map!==s.map||run!==s.run)this.arsenal.reset();else this.arsenal.tick(s.playTime-before);
        root.XiuxianAbyss?.storyRewards(this,this.arsenal.store);
      }
      return result;
    }
    enemyStep(e,dt){
      const a=this.arsenal,P=root.XiuxianArmory?.Poise;
      if(!a||!P)return super.enemyStep(e,dt);
      if(!e.anim)P.init(e,a.isBoss(e)||e.elite);
      if(P.tick(e,dt)||(!e.poise&&a.marks.get(e)?.frozen>0))return;
      const wind=e.wind,x=e.x,y=e.y;
      if(a&&this.playMode==='challenge'&&a.isBoss(e)&&e.cooldown>0)e.cooldown=Math.max(0,e.cooldown-dt*.55);
      const result=super.enemyStep(e,dt);
      if(wind>0&&!(e.wind>0))a.rhythm.avoided(a.clock,p=>root.XiuxianCombat.hits(e,p),this.state);
      if(!(wind>0)&&e.wind>0)P.pose(e,'windup',e.wind,this.state,e.mode||e.kind);
      else if(wind>0&&!(e.wind>0))P.strike(e,this.state,root.XiuxianCombat.hits(e,this.state),e.mode||e.kind);
      else if(!(e.wind>0))P.pose(e,x!==e.x||y!==e.y?'move':'idle',0,this.state);
      return result;
    }
    attack(point){
      const ok=super.attack(point);
      if(ok&&this.arsenal?.gear.school&&!this.state.chapter.training)this.attackCd/=1+Math.min(1,this.arsenal.legend.haste/100);
      return ok;
    }
    effect(kind,x,y,extra={}) {
      if(kind==='slash'&&this.arsenal?.gear.school&&this.arsenal.gear.school!=='sword'&&this.hitSource==='blade'){
        this.feedback.cast=.32;this.sound(this.arsenal.gear.school==='fire'?'fire':this.arsenal.gear.school==='ice'?'needle':'sword');return;
      }
      if(kind==='impact'&&this.incomingEnemy)extra={...extra,mode:this.incomingEnemy.mode};
      if(kind==='number' && this.swingActive && this.hitSource==='blade' && this.swingIndex===3)extra={...extra,accent:'finisher'};
      if(this.presentItem && ['fire','needle','heal'].includes(kind))extra={...extra,item:this.presentItem,fromX:this.state.x,fromY:this.state.y-32};
      if(this.castingSkill && ['heal','resonance','needle'].includes(kind))extra={...extra,skill:this.castingSkill};
      return super.effect(kind,x,y,extra);
    }
    hitEnemy(e,amount) {
      const boss=this.arsenal?.isBoss(e);
      const hp=e.hp,armor=e.armorLeft,weak=e.weak>0,channel=e.wind>0 && e.mode==='channel',source=this.hitSource,start=this.effects.length;
      let critical=this.arsenal?.hitAction?.critical||false;
      const guarded=e.poise&&e.anim.state!=='broken';
      if(this.arsenal&&e.kind!=='lesson'){
        const gear=this.arsenal.gear;
        if(this.castingSkill){amount*=(1+gear.total.skill/100)*(this.arsenal.legend.has('heart_jade')?1.5:1);critical=this.arsenal.rng()<Math.min(.75,(gear.total.crit+4*this.arsenal.rhythm.rank+(e.anim?.state==='broken'?20:0)+(gear.sets.thunder>=2?18:0))/100);if(critical)amount*=1.65+this.arsenal.legend.criticalBonus;}
        if(!this.castingSkill&&!this.arsenal.hitAction&&e.anim?.state==='broken'&&this.arsenal.rng()<Math.min(.75,(20+gear.total.crit)/100)){critical=true;amount*=1.65+this.arsenal.legend.criticalBonus;}
        amount*=(1+gear.aura.damage)*this.arsenal.legend.modifier(e);amount/=root.XiuxianWeapons.difficulty(this);
      }
      const encounter=this.arsenal&&!this.abyssActor&&hp>0&&e.kind!=='lesson'?this.activeEnemies().filter(enemy=>enemy.hp>0):null;
      const a=this.arsenal,perfect=a&&hp>0&&e.kind!=='lesson'&&a.rhythm.counter(a.clock);
      if(perfect&&!critical){critical=true;amount*=1.65+a.legend.criticalBonus;}
      if(a)a.perfectHit=perfect;
      let result;try{result=super.hitEnemy(e,amount);}finally{if(a)a.perfectHit=false;}
      if(this.arsenal&&e.kind!=='lesson'&&hp>e.hp){
        const dealt=hp-e.hp,broken=!!guarded&&e.anim.state==='broken';
        if(this.comboEnabled)a.rhythm.hit(a.clock);
        this.onDamageDealt?.(e,dealt,critical,broken);
        this.arsenal.legend.afterHit(e,dealt,critical);
        if(broken)this.arsenal.legend.onBreak(e);
      }
      if(armor>0&&e.armorLeft===0)this.sound('shieldBreak');
      if(encounter?.includes(e)&&!encounter.some(enemy=>enemy.hp>0))root.XiuxianArmory.Home.battle(this.arsenal.store);
      if(this.arsenal&&hp>0&&e.hp<=0&&e.kind!=='lesson')root.XiuxianAbyss?.worldDrop(this,e,boss);
      if(e.hp<hp){
        const dx=e.x-this.state.x,dy=e.y-this.state.y,length=Math.hypot(dx,dy)||1;
        const motion=this.motionFor(e);motion.hitX=dx/length;motion.hitY=dy/length;
        if(weak)for(let i=start;i<this.effects.length;i++){
          const n=this.effects[i];if(n.kind==='number'&&n.recipientId===e.id&&!n.accent)n.accent='weak';
        }
        if(channel && e.wind<=0 && e.weak>0 && ['blade','needle'].includes(source))this.effect('shatter',e.x,e.y-42,{life:.38});
      }
      return result;
    }
    receiveDamage(amount){
      const legend=this.arsenal?.legend;
      if(!legend?.has('reprieve')||legend.saved||this.reprieveCd>0)return super.takeDamage(amount);
      // Observe the final HP debit after every inherited shield and stance.
      // Defeat handlers must see the surviving point inside that same call.
      const s=this.state;let hp=s.hp;
      Object.defineProperty(s,'hp',{configurable:true,enumerable:true,get:()=>hp,set:value=>{
        hp=value<=0&&hp>0?hp-legend.survive(hp):value;
      }});
      try{return super.takeDamage(amount);}
      finally{Object.defineProperty(s,'hp',{value:hp,writable:true,configurable:true,enumerable:true});}
    }
    takeDamage(amount) {
      if(this.reprieveWard>0)return;
      const a=this.arsenal,legend=a?.legend;
      if(a&&amount>0&&this.state.hp>0&&this.hurtCd<=0&&this.incomingEnemy&&a.rhythm.evade(a.clock))return;
      if(legend?.has('asura_robe'))amount*=1.3;
      if(legend?.weakened.get(this.incomingEnemy)>this.arsenal?.clock)amount*=.75;
      const blocked=this.guard&&(this.state.mp>=8||legend?.freeSpirit)&&!(this.hurtCd>0);
      if(this.arsenal&&this.incomingEnemy?.kind!=='lesson')amount*=root.XiuxianWeapons.difficulty(this)/(1+this.arsenal.gear.total.defense/120);
      const hp=this.state.hp,start=this.effects.length,result=this.withSpiritCost(this.guard?8:0,()=>this.receiveDamage(amount)),source=this.incomingEnemy;
      if(legend&&source&&(this.dash>0||blocked&&this.state.hp<hp||this.effects.slice(start).some(f=>f.kind==='parry'))){
        this.arsenal.counterUntil=this.arsenal.clock+2;legend.counter();
      }
      if(legend?.has('bell_echo')&&source?.hp>0&&this.state.hp<hp){
        this.effect('resonance',this.state.x,this.state.y);
        legend.weakened.set(source,this.arsenal.clock+2);this.arsenal.direct(source,15,'sword',true);
      }
      if(this.state.hp<hp){this.damageTaken=(this.damageTaken||0)+hp-this.state.hp;a?.rhythm.hurt(hp-this.state.hp);}
      if(this.state.hp<hp&&source){
        const dx=this.state.x-source.x,dy=this.state.y-source.y,len=Math.hypot(dx,dy)||1;
        this.feedback.hitX=dx/len;this.feedback.hitY=dy/len;
      }
      if(this.feedback.block>0 && this.effects.slice(start).some(e=>e.kind==='parry')){
        for(let i=start;i<this.effects.length;i++){
          const n=this.effects[i];if(n.kind==='number'&&n.recipientId==='player'){n.accent='block';n.color='#daead5';}
        }
      }
      return result;
    }
    useItem(id,target){
      const old=this.presentItem,hp=this.state.hp,start=this.effects.length;
      this.presentItem=id;
      try{
        const ok=super.useItem(id,target);
        if(ok){this.scaleHealing(hp);if(this.arsenal?.legend.has('spirit_seal')&&['fire','needle','incense','potion','ward','qingxin'].includes(id))this.arsenal.legend.sealUntil=this.arsenal.clock+6;}
        if(ok&&this.state.hp>hp){
          const heal=this.effects.slice(start).find(e=>e.kind==='heal');
          if(heal)heal.recovered=Math.ceil(this.state.hp-hp);
        }
        return ok;
      }finally{this.presentItem=old;}
    }
  }
  root.XiuxianVisualGame=VisualGame;
})(globalThis);
