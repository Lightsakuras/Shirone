(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,D=node?require('./rogue-data.js'):root.XiuxianRogueData;
  const P=node?require('./enemy-poise.js'):root.XiuxianPoise,Geo=node?require('./hazard-geo.js'):root.XiuxianHazardGeo;
  const tau=Math.PI*2,clamp=(n,min,max)=>Math.max(min,Math.min(max,n)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const bearing=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
  const direction=(e,a,step)=>{e.x=clamp(e.x+Math.cos(a)*step,12,1108);e.y=clamp(e.y+Math.sin(a)*step,24,588);};
  function spawn(run,boss=false,kind,at){
    const rng=run.rng, wave=run.wave;
    const pool=['wolf','wolf','cultist',...(wave>=2?['golem','spider']:[]),...(wave>=3?['bomber']:[]),...(wave>=4?['summoner']:[]),...(wave>=6?['bladeShadow']:[])];
    const type=boss?(Math.floor(wave/5)-1)%5:0;
    kind=boss?'boss':kind||pool[Math.floor(rng()*pool.length)];
    const a=rng()*tau,reach=wave===1&&run.clock<4?103+rng()*50:260+240*rng();
    let x=clamp(run.p.x+Math.cos(a)*reach,22,1098),y=clamp(run.p.y+Math.sin(a)*reach,42,578);
    if(!at&&dist(run.p,{x,y})<85)x=clamp(run.p.x+(run.p.x<560?1:-1)*reach,22,1098);
    const data=D.enemies[kind]||['灵傀',8,55], hp=Math.round((boss?340+type*type*385:data[1]*1.10)*D.hpScale(wave));
    const e={id:++run.sequence,kind,type,boss,x:at?.x??x,y:at?.y??y,hp,maxHp:hp,speed:(boss?29:data[2])*(1+Math.min(.75,(wave-1)*.035)),frozen:0,cast:boss?.65+rng()*.2:1+rng()*1.8,turn:0,life:12,phase:'守阵',shield:0};
    P.init(e);
    if(boss&&(wave===15||wave===25))e.poise.value=e.poise.max=hp*(wave===15?.45:.42);
    run.monsters.push(e);if(kind==='goldToad')run.sound?.('lootGold');return e;
  }
  function bolt(run,e,a,extra={}){
    run.bolts.push({owner:e,x:e.x,y:e.y,dx:Math.cos(a),dy:Math.sin(a),life:4,speed:148,damage:6+run.wave*.8,...extra});
  }
  function hazard(run,owner,shape,x,y,r,delay,extra={}){
    P.pose(owner,'windup',delay,run.p,shape);
    run.hazards.push({owner,shape,x,y,r,delay,time:0,life:.22,tick:0,damage:8+run.wave,detached:owner.boss&&!extra.channel||shape==='poison',...extra});
  }
  function beam(run,e,a,len,delay=.8,r=10,extra={}){
    hazard(run,e,'line',e.x,e.y,r,delay,{a,len,...extra});
  }
  function castShape(run,e,shape,delay=.8,extra={}){
    const cast={owner:e,geo:shape,shape:shape.kind,delay,time:0,damage:8+run.wave,life:shape.duration??(shape.kind==='meteor'?1.4:.18),...extra};
    run.hazards.push(cast);e.windup=delay;P.pose(e,'windup',delay,run.p,shape.kind);
  }
  function bossMove(run,e){
    const p=run.p,a=bearing(e,p),turn=e.turn++,odd=turn%2,swift=e.hp<e.maxHp/2;
    e.cast=swift?2.65:3.8;
    if(turn%4>=2){
      const kind=[['donut','meteor'],['line','cross'],['cone','meteor'],['cross','zone'],['meteor','donut']][e.type][turn%2];
      const geometry=Geo.pattern(kind,e,p);
      if(e.type===4&&kind==='meteor'){
        geometry.points=[];
        for(let row=0;row<5;row++)for(let col=0;col<8;col++)if((row+col+turn)%2===0)
          geometry.points.push({x:70+col*140,y:60+row*120,r:39,delay:(row%3)*.24});
      }
      e.phase=(swift?'狂暴 · ':'')+['磐心震波','穿阵刀诀','噬月天象','裂地魔焰','九天雷局'][e.type];
      castShape(run,e,geometry,swift?.8:1.1);return;
    }
    if(e.type===0){
      e.phase=odd?'磐心震地':'轮转落石';
      if(odd)hazard(run,e,'ring',e.x,e.y,132,1,{band:20});
      else for(let i=0;i<6;i++){const angle=turn+i*tau/6;hazard(run,e,'circle',p.x+Math.cos(angle)*58,p.y+Math.sin(angle)*58,43,.8+i*.11);}
    }else if(e.type===1){
      e.phase=odd?'聚阴 · 可打断':'三叠刀气';
      if(odd){e.channel=e.maxHp*.09;hazard(run,e,'circle',p.x,p.y,105,1.65,{channel:true});}
      else for(let n=0;n<3;n++)for(let i=-2;i<=2;i++)bolt(run,e,a+i*.19,{delay:n*.27,speed:210,blade:true});
    }else if(e.type===2){
      e.phase=odd?'月刃回旋':'双镜噬月';
      if(!odd)for(const sign of [-1,1]){const echo=spawn(run,false,'mirror',{x:clamp(e.x+sign*60,20,1100),y:e.y});echo.hp=echo.maxHp=e.maxHp*.10;}
      for(let n=0;n<5;n++)for(let i=0;i<4;i++)bolt(run,e,a+i*tau/4+n*.32,{delay:n*.17,blade:true});
    }else if(e.type===3){
      e.phase=odd?'追魂火柱':'十字裂地';
      if(odd)for(let i=0;i<4;i++)hazard(run,e,'circle',p.x+run.face.x*i*35,p.y+run.face.y*i*35,43,.8+i*.24);
      else {hazard(run,e,'line',0,p.y,17,1.15,{a:0,len:1120});hazard(run,e,'line',p.x,0,17,1.15,{a:Math.PI/2,len:600});}
    }else{
      e.phase=swift?'狂暴 · 九天雷局':'星枢 · 护阵灵球';
      if(!run.monsters.some(o=>o.kind==='orb'&&o.hp>0))for(let i=0;i<(swift?3:2);i++)spawn(run,false,'orb',{x:clamp(e.x+Math.cos(i*2)*85,20,1100),y:clamp(e.y+Math.sin(i*2)*85,24,580)});
      const spacing=swift?102:150;
      for(let x=(turn*37)%spacing;x<1120;x+=spacing)hazard(run,e,'line',x,0,8,swift?.88:1.3,{a:Math.PI/2,len:600});
      for(let y=(turn*19)%spacing;y<600;y+=spacing)hazard(run,e,'line',0,y,8,swift?.88:1.3,{a:0,len:1120});
    }
  }
  function act(run,e,dt){
    const p=run.p,d=dist(e,p),a=bearing(e,p);
    if(e.kind==='goldToad'){if((e.life-=dt)<=0){e.hp=0;return;}const flee=a+Math.PI+Math.sin(run.age*1.7)*.9;
      const wall=e.x<35||e.x>1085||e.y<50||e.y>560;direction(e,wall?bearing(e,{x:560+240*Math.sin(run.age),y:300+135*Math.cos(run.age)}):flee,e.speed*dt);return;}
    if(e.kind==='orb')return;
    e.cast-=dt;
    if(e.dash>0){direction(e,e.heading,510*dt);if(d<28)run.hurt(7+run.wave);e.dash-=dt;return;}
    if(e.windup>0){e.windup-=dt;return;}
    if(e.boss){
      if(e.cast<=0)bossMove(run,e);
    }else if(e.elite&&e.cast<=0){
      const kind=({wolf:'line',bladeShadow:'line',golem:'donut',cultist:'cone',summoner:'meteor',spider:'zone',bomber:'cross'})[e.kind]||'cross';
      castShape(run,e,Geo.pattern(kind,e,p),.9);e.cast=3.8;return;
    }else if(e.kind==='cultist'||e.kind==='summoner'){
      if(e.cast<=0){
        if(e.kind==='cultist')for(let i=-1;i<=1;i++)bolt(run,e,a+i*.31,{home:.30});
        else if(run.monsters.length<75){for(const offset of [-18,18])spawn(run,false,'puppet',{x:e.x+offset,y:e.y});for(const other of run.monsters)if(!other.boss&&dist(e,other)<145)other.shield=Math.max(other.shield,5+run.wave);}
        e.cast=e.kind==='cultist'?4.2:8;
      }
      if(d<215||d>266)direction(e,d<215?a+Math.PI:a,e.speed*dt);
      return;
    }else if(e.kind==='spider'&&e.cast<=0){hazard(run,e,'poison',e.x,e.y,31,.45,{life:4,damage:4+run.wave*.6});e.cast=2.8;}
    else if(e.kind==='mirror'&&e.cast<=0){bolt(run,e,a,{blade:true});e.cast=2.3;}
    else if(e.cast<=0){
      if((e.kind==='wolf'&&d<158)||(e.kind==='bladeShadow'&&d<360)){
        const blink=e.kind==='bladeShadow',delay=blink?.8:.55;
        beam(run,e,a,blink?360:130,delay,blink?11:9,{move:blink?'blink':'dash'});e.windup=delay;e.cast=4;return;
      }
      if((e.kind==='golem'&&d<100)||(e.kind==='bomber'&&d<53)){
        const bomb=e.kind==='bomber',delay=bomb?1.1:.9;
        hazard(run,e,'circle',e.x,e.y,bomb?72:98,delay,{explode:bomb});e.windup=delay+.08;e.cast=4;return;
      }
    }
    if(d>16)direction(e,a,e.speed*dt);
    if(d<19&&e.kind!=='bomber'){
      if(run.invul<=0&&e.anim.state!=='windup')P.strike(e,p,true,'contact');
      run.hurt((e.boss?15:5)+run.wave*.85);
    }
  }
  function geometry(h){
    if(h.geo)return h.geo;
    const base={x:h.x,y:h.y};
    if(h.shape==='line')return {...base,kind:'line',heading:h.a,length:h.len,halfWidth:h.r};
    if(h.shape==='ring')return {...base,kind:'donut',innerR:h.r-h.band,outerR:h.r+h.band};
    return {...base,kind:'zone',r:h.r,element:h.shape==='poison'?'poison':'fire'};
  }
  const contains=(h,p)=>Geo.hits(geometry(h),p);
  function tick(run,dt){
    for(const e of run.monsters.slice()){
      if(e.hp<=0)continue;
      e.flash=Math.max(0,(e.flash||0)-dt);
      if(e.burning>0){e.burning-=dt;e.ember=(e.ember||0)-dt;if(e.ember<=0){run.hit(e,2+run.wave*.4,'ember');e.ember=.6;}}
      if(P.tick(e,dt))continue;
      if(e.frozen>0){e.frozen-=dt;if(e.frozen<=0&&e.shatter){const power=e.shatter;e.shatter=0;run.effect('shard',e.x,e.y,.4);run.area(e,70,power,'shatter');}if(!e.poise)continue;}
      if(e.hp>0){
        const x=e.x,y=e.y,bolts=run.bolts.length;
        act(run,e,dt);
        if(run.bolts.length>bolts){const first=run.bolts[bolts];if(first.delay>0)P.pose(e,'windup',first.delay,run.p,'bolt');else if(e.anim.state!=='windup')P.strike(e,run.p,true,'bolt');}
        else if(e.anim.state!=='windup'&&e.anim.state!=='strike')P.pose(e,e.x!==x||e.y!==y?'move':'idle',0,run.p);
      }
    }
    run.hazards=run.hazards.filter(h=>{
      if(h.geo){
        if(h.owner.hp<=0||h.owner.anim.state==='broken')return false;
        const before=h.time-h.delay;h.time+=dt;const after=h.time-h.delay;
        if(before<0&&after>=0){P.strike(h.owner,run.p,Geo.hits(h.geo,run.p),h.geo.kind);if(h.channel)h.owner.channel=0;}
        for(const pulse of Geo.pulses(h.geo,before,after)){
          run.rhythm.avoided(run.age,p=>Geo.hits(pulse,p),run.p);if(!Geo.hits(pulse,run.p))continue;
          if(h.geo.element==='frost'||h.geo.element==='poison')run.slow=.7;
          run.hurt(h.damage);
        }
        return after<h.life;
      }
      if(!h.detached&&h.owner.hp<=0&&(!h.active||h.shape!=='poison')&&!h.exploded)return false;
      if(!h.active&&!h.detached&&h.owner.frozen>0&&!h.owner.poise)return true;
      h.time+=dt;if(h.time<h.delay)return true;
      if(!h.active){h.active=true;
        if(h.owner.hp>0&&h.owner.anim.state!=='broken')P.strike(h.owner,run.p,contains(h,run.p),h.shape,(dx,dy)=>{if(!h.move){h.owner.x+=dx;h.owner.y+=dy;}});
        if(h.explode){h.owner.hp=0;root.XiuxianEnemyVfx?.fallen(run,h.owner,run.age,'fire');h.exploded=true;}if(h.channel)h.owner.channel=0;
        if(h.move==='blink')direction(h.owner,h.a,h.len);
        if(h.move==='dash'){h.owner.dash=.255;h.owner.heading=h.a;}
      }
      h.tick-=dt;if(h.tick<=0)run.rhythm.avoided(run.age,p=>contains(h,p),run.p);if(h.tick<=0&&contains(h,run.p)){if(h.shape==='poison')run.slow=.7;run.hurt(h.damage);h.tick=.75;}
      return h.time<h.delay+h.life;
    });
    run.bolts=run.bolts.filter(b=>{
      if(b.delay>0){b.delay-=dt;if(b.delay<=0&&b.owner&&b.owner.anim.state==='windup')P.strike(b.owner,run.p,true,'bolt');return true;}
      if(b.home&&!b.repelled){const a=bearing(b,run.p),heading=Math.atan2(b.dy,b.dx),delta=Math.atan2(Math.sin(a-heading),Math.cos(a-heading)),next=heading+clamp(delta,-dt*b.home,dt*b.home);b.dx=Math.cos(next);b.dy=Math.sin(next);}
      b.x+=b.dx*(b.speed||125)*dt;b.y+=b.dy*(b.speed||125)*dt;b.life-=dt;
      if(b.repelled){const target=run.nearest(b);if(target&&dist(b,target)<20){run.hit(target,25,'bell');return false;}}
      else if(dist(b,run.p)<13){run.hurt(b.damage||9);return false;}
      return b.life>0;
    });
  }
  const api={spawn,tick,contains,geometry};if(node)module.exports=api;else root.XiuxianRogueFoes=api;
})(globalThis);
