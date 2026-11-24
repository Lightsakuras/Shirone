(function(root){
  'use strict';
  const D=root.XiuxianArmoryData,dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const spells={sword:'blade',ice:'needle',fire:'fire',storm:'blade',swarm:'blade'};
  function difficulty(g){
    if(g.playMode==='classic')return 1;
    const realm=g.state.campaign?.cultivation?.realmId;
    const base=({jindan:1.45,yuanying:1.85,huashen:2.4,heti:2.4,dacheng:2.4})[realm]||
      (g.state.map==='tomb'||g.sectSummitBattleActive?.()||g.state.chapter?.complete?1.15:1);
    return g.playMode==='challenge'?base*1.55:base;
  }
  class Arsenal {
    constructor(g,store,rng=Math.random){this.g=g;this.store=store;this.rng=rng;this.reset();}
    reset(){this.rhythm=new root.XiuxianArmory.Rhythm((kind,count)=>{
      const g=this.g;
      if(kind==='dodge'){this.store.recordDodge?.();this.legend.counter();g.sound?.('starDrop');g.effect?.('number',g.state.x,g.state.y-62,{text:'身法！',life:.65,color:'#fff4b5'});}
      else if(count===25||count===100)this.store.award?.('combo'+count);
    });this.shots=[];this.fx=[];this.tracks=[];this.lastStep=null;this.marks=new WeakMap();this.strikes=0;this.shield=0;this.starCd=0;this.clock=0;this.legend=new D.legendary.Combat(this);this.soulReady=0;this.counterUntil=0;this.scene=null;this.hazards=[];this.bossCds=new WeakMap();}
    isBoss(e){return ['wang','keeper'].includes(e.kind)||this.g.state.campaign?.battle?.enemies.at(-1)===e||this.g.sectSummitBattleActive?.();}
    get gear(){return this.store.summary();}
    get range(){const {school,sets}=this.gear;return school?D.weapons[school][3]*(school==='sword'&&sets.lotus>=2?1.3:1):0;}
    targets(){return this.g.activeEnemies().filter(e=>e.hp>0);}
    mark(kind,x,y,life,extra={}){this.fx.push({kind,x,y,life,age:0,...extra});}
    direct(e,amount,school,secondary=false,finisher=false,mult=1,poiseRate=0){
      if(!e||e.hp<=0)return;
      const g=this.g,{sets,total,worn}=this.gear;
      const critical=this.rng()<Math.min(.75,(total.crit+4*this.rhythm.rank+(e.anim?.state==='broken'?20:0)+(g.trialProfile?.sect==='shushan'?5:0)+(school==='storm'&&sets.thunder>=2?18:0))/100);
      const ancient=worn.weapon?.grade===5,base=amount+total.attack+(g.state.flags?.trained?(g.state.origin==='sword'?9:3):0);
      const damage=base*mult*(this.legend.freeSpirit?1.3:1)*(critical?((g.trialProfile?.origin==='demon'?1.8:1.65)+this.legend.criticalBonus):1)*(sets.flame>=2&&e.burn>0?1.25:1)*(ancient?1.25:1);
      const old=this.hitAction;this.hitAction={element:school,finisher,critical,proc:secondary,poiseRate};
      const source=g.hitSource;g.hitSource=spells[school];try{g.hitEnemy(e,damage);}finally{g.hitSource=source;this.hitAction=old;}
      g.sound?.(critical?'hitCrit':'hitSolid');if(secondary)return;
      if(sets.flame>=2)e.burn=Math.max(e.burn||0,2.5);
      if(sets.flame>=4&&(critical||e.hp<=0)){this.mark('blast',e.x,e.y,.5);for(const n of this.targets())if(n!==e&&dist(n,e)<82)this.direct(n,12,'fire',true);}
      if(school==='ice'||sets.frost>=2){
        const m=this.marks.get(e)||{count:0,frozen:0};m.count++;e.slow=Math.max(e.slow||0,2);
        if(m.count>=3&&(school==='ice'||sets.frost>=4)){m.count=0;m.frozen=e.poise&&e.anim.state!=='broken'?0:1.2;this.mark('shatter',e.x,e.y,.65);
          const chain=this.legend.has('ice_chain');
          for(const n of this.targets())if(dist(n,e)<65*(chain?1.5:1)){
            this.direct(n,12,'ice',true,false,.58);
            if(chain&&n!==e&&!n.poise&&this.rng()<.4)this.marks.set(n,{count:0,frozen:1.2});
          }}
        this.marks.set(e,m);
      }
      if(sets.thunder>=4&&this.rng()<.3)this.lightning(e,15,true);
    }
    lightning(first,power,proc=false){
      let current=first;const points=[{x:current.x-18,y:current.y-175}],seen=new Set();
      for(let i=0;i<4&&current;i++){
        seen.add(current);points.push({x:current.x,y:current.y-32});this.direct(current,i?power*.72:power,'storm',proc,false,proc?1:i?2.85:1.87);
        const prev=current;current=this.targets().filter(e=>!seen.has(e)&&dist(prev,e)<145).sort((a,b)=>dist(a,prev)-dist(b,prev))[0];
      }
      this.mark('lightning',first.x,first.y,.46,{points});
    }
    launch(kind,a,reach,speed,power,target=null,offset=0,proc=false,poiseRate=0){
      const s=this.g.state;this.shots.push({kind,x:s.x-Math.sin(a)*offset,y:s.y+Math.cos(a)*offset,
        startX:s.x,startY:s.y,angle:a,reach,speed,power,target,proc,poiseRate,hit:new Set(),travel:0,returning:false});
    }
    attack(point,amount=23){
      const g=this.g,s=g.state,{school,sets,worn}=this.gear;if(!school)return false;
      const ancient=worn.weapon.grade===5,aim=point||{x:s.x+g.face.x*100,y:s.y+g.face.y*100},a=Math.atan2(aim.y-s.y,aim.x-s.x);
      const pool=this.targets().filter(e=>dist(s,e)<=this.range&&(!g.clearLine||g.clearLine(s,e,2)));
      const target=pool.sort((p,q)=>dist(p,aim)-dist(q,aim))[0];this.strikes++;
      if(this.legend.has('blood_blade'))s.hp*=.985;
      if(target&&this.legend.has('sky_thunder')&&this.strikes%4===0)this.lightning(target,amount*1.6,true);
      g.sound?.(({sword:this.strikes%3?'swordSlash':'swordWave',ice:'iceCast',fire:'fireCast',swarm:'swordWave',storm:'thunderCast'})[school]);
      if(school==='sword'){
        this.mark('arc',s.x,s.y,.31,{angle:a,size:this.range});
        for(const e of pool){const dot=((e.x-s.x)*Math.cos(a)+(e.y-s.y)*Math.sin(a))/(dist(s,e)||1);if(dot>.15||dist(s,e)<32)this.direct(e,amount,'sword',false,this.strikes%3===0);}
      }else if(school==='storm'){
        if(target)this.lightning(target,amount);else this.mark('lightning',aim.x,aim.y,.35,{points:[{x:aim.x-16,y:aim.y-170},{x:aim.x,y:aim.y-28}]});
      }else if(school==='fire')this.launch('phoenix',a,310,370,amount,target);
      else if(school==='ice')for(const offset of [-12,0,12])this.launch('icicle',a+offset*.003,320,570,amount*.50,null,offset);
      else for(let i=0;i<Math.min(7,3+Math.floor(worn.weapon.level/3));i++){const n=pool[i%pool.length]||target;this.launch('flyingSword',a+(i-1)*.12,350,450+i*25,amount*.46,n,(i-1)*7);}
      if(this.gear.soulStage>=3&&this.clock>=(this.soulReady||0)){
        this.soulReady=this.clock+4;this.launch('soulWave',a,400,490,amount*1.5);
      }
      if(this.strikes%3===0){
        const n=(school==='sword'?3:0)+(sets.lotus>=4?3:0);
        for(let i=0;i<n;i++)this.launch('swordWave',a+(i-(n-1)/2)*.19,260*(sets.lotus>=2?1.3:1),490,amount*.7);
      }
      if(this.gear.soulStage===4&&this.strikes%5===0){g.sound?.('ultimateCast');this.mark('nova',s.x,s.y,.6,{school});for(const e of pool)this.direct(e,amount*1.8,school,true,true);}
      if(ancient&&this.strikes%3===0){g.sound?.('ultimateCast');this.mark('nova',s.x,s.y,.6,{school});for(const n of this.targets())this.direct(n,amount*.5,school,true);}
      return true;
    }
    tick(dt){
      const g=this.g,s=g.state;if(dt<=0)return;
      this.clock+=dt;this.rhythm.tick(this.clock);this.legend.tick(dt);this.shield=Math.max(0,this.shield-dt);this.starCd-=dt;
      const {sets,look}=this.gear;
      if(g.playMode==='challenge'&&!g.abyssActor){
        const alive=this.targets();
        for(const e of alive){if(!this.isBoss(e))continue;let cd=(this.bossCds.get(e)??2)-dt;
          if(cd<=0){this.hazards.push({e,x:s.x,y:s.y,r:78,remaining:1});cd=e.hp<e.maxHp*.5?3:5;}this.bossCds.set(e,cd);}
        this.hazards=this.hazards.filter(h=>{if(!alive.includes(h.e))return false;h.remaining-=dt;if(h.remaining>0)return true;
          if(dist(s,h)<h.r){const original=g.incomingEnemy;g.incomingEnemy=h.e;try{g.takeDamage(h.e.damage||20);}finally{g.incomingEnemy=original;}}return false;});
      }else this.hazards=[];
      for(const e of this.targets()){const m=this.marks.get(e);if(m)m.frozen=Math.max(0,m.frozen-dt);}
      if(look.boots&&look.boots.style!=='plain'){
        if(this.lastStep&&dist(s,this.lastStep)>12&&dist(s,this.lastStep)<100){this.tracks.push({...this.lastStep,style:look.boots.style,base:look.boots.id,age:0});this.lastStep=null;}
        if(!this.lastStep||dist(s,this.lastStep)>100)this.lastStep={x:s.x,y:s.y};
      }else this.lastStep=null;
      this.tracks=this.tracks.filter(t=>(t.age+=dt)<1.1);
      for(const f of this.fx){f.age+=dt;if(f.kind==='firePool'&&f.age>=f.next&&f.age<=f.life){
        f.next+=.5;for(const e of this.targets())if(dist(e,f)<64)this.direct(e,5,'fire',true,false,e.boss?.37:.29);
      }}
      this.fx=this.fx.filter(f=>f.age<f.life);
      const flying=this.shots;this.shots=[];
      this.shots.push(...flying.filter(p=>{
        const home=p.returning?s:p.target?.hp>0?p.target:null;
        if(home)p.angle=Math.atan2(home.y-p.y,home.x-p.x);
        const step=p.speed*dt,last={x:p.x,y:p.y};p.x+=Math.cos(p.angle)*step;p.y+=Math.sin(p.angle)*step;p.travel+=step;
        if(!p.returning&&g.collides&&g.collides(p.x,p.y,2))return false;
        if(p.returning&&dist(p,s)<step+9)return false;
        for(const e of this.targets()){
          const vx=p.x-last.x,vy=p.y-last.y,k=Math.max(0,Math.min(1,((e.x-last.x)*vx+(e.y-last.y)*vy)/(step*step||1)));
          if(p.hit.has(e)||Math.hypot(e.x-last.x-k*vx,e.y-last.y-k*vy)>24||g.clearLine&&!g.clearLine(p,e,2))continue;
          p.hit.add(e);const school={phoenix:'fire',icicle:'ice',flyingSword:'swarm',swordWave:'sword',soulWave:'sword'}[p.kind];
          // A volley shares its attack stat across the outbound and returning blades.
          const blades=Math.min(7,3+Math.floor((this.gear.worn.weapon?.level||0)/3));
          const share=p.kind==='flyingSword'?1.60/blades:p.kind==='icicle'?.58:p.kind==='phoenix'?.52:1;
          this.direct(e,p.power,school,p.proc,p.kind==='swordWave'||p.kind==='soulWave',share,p.poiseRate);
          if(p.kind==='phoenix'){this.mark('blast',p.x,p.y,.46);this.mark('firePool',p.x,p.y,2.5,{next:0});return false;}
          if(p.kind==='flyingSword'&&p.target===e)p.target=null;
        }
        if(!p.returning&&p.kind==='flyingSword'&&p.travel>p.reach){p.returning=true;p.hit.clear();}
        return p.travel<p.reach*(p.returning?3:1);
      }));
    }
  }
  function paint(c,arsenal,t){
    if(!arsenal)return;const {line,poly,oval,blade}=root.XiuxianAvatar;
    for(const p of arsenal.legend.beads)oval(c,p.x,p.y-6,7,7,'#b9ffea',2,true);
    for(const p of arsenal.legend.delayed)oval(c,p.x,p.y,28,12,'#ffdf9c',2);
    for(const f of arsenal.fx){c.save();const p=f.age/f.life;c.globalAlpha*=Math.min(1,(1-p)*3);
      if(f.kind==='lightning'){
        for(let i=1;i<f.points.length;i++){const a=f.points[i-1],b=f.points[i],pts=[];
          for(let j=0;j<=8;j++){const k=j/8,zig=(j===0||j===8?0:Math.sin(j*19+i+t*8)*9);pts.push([a.x+(b.x-a.x)*k+zig,a.y+(b.y-a.y)*k-zig*.35]);}
          line(c,pts,'#603ab8bb',9);line(c,pts,'#c4a1ff',4);line(c,pts,'#fcf2ff',1.8);}
        oval(c,f.x,f.y,20,6,'#5b368e',3);
      }else if(f.kind==='arc'){c.beginPath();c.arc(f.x,f.y-24,f.size*.84,f.angle-.95+p*.5,f.angle+.78+p*.5);c.strokeStyle='#fff2b6';c.lineWidth=6*(1-p)+1;c.stroke();}
      else if(f.kind==='firePool'||f.kind==='blast'){const r=f.kind==='blast'?18+p*63:63;oval(c,f.x,f.y,r,r*.46,'#b7423477',1,true);oval(c,f.x,f.y,r,r*.46,'#ffb25c',2);
        for(let i=0;i<15;i++){const a=i*2.4,x=f.x+Math.cos(a)*r*(.4+i%3*.24),y=f.y+Math.sin(a)*r*.39;poly(c,[[x-5,y],[x+Math.sin(t*6+i)*4,y-10-12*Math.abs(Math.sin(i+t*5))],[x+5,y]],i%2?'#ffb458':'#f56c45');}}
      else if(f.kind==='shatter'){for(let i=0;i<12;i++){const a=i*Math.PI/6,r=8+p*52,x=f.x+Math.cos(a)*r,y=f.y-24+Math.sin(a)*r;poly(c,[[x-3,y],[x,y-9],[x+4,y],[x,y+6]],'#b3f5ff','#fcffff');}}
      else if(f.kind==='nova'){
        const col=D.weapons[f.school][4],radius=32+p*820;
        oval(c,f.x,f.y-30,radius,radius*.48,col,3);
        for(let i=0;i<12;i++){
          const a=i*Math.PI/6,x=f.x+Math.cos(a)*radius,y=f.y-30+Math.sin(a)*radius*.48;
          if(f.school==='sword'||f.school==='swarm')blade(c,x,y,a+(f.school==='swarm'?p*4:Math.PI/2),f.school==='swarm'?46:62,col,3);
          if(f.school==='storm')line(c,[[x-18,y-200],[x+6,y-92],[x-8,y-76],[x,y]],col,3);
          if(f.school==='fire')poly(c,[[x-22,y],[x-18,y-32],[x-3,y-13],[x+10,y-51],[x+17,y-9],[x,y+6]],'#ff9956aa','#ffdf8c');
          if(f.school==='ice')poly(c,[[x-5,y],[x,y-30],[x+7,y],[x,y+17]],'#88dcf1aa','#dcf7ff');
        }
      }
      c.restore();
    }
    for(const p of arsenal.shots){c.save();c.translate(p.x,p.y-30);c.rotate(p.angle);const col={icicle:'#99ecff',flyingSword:'#ffe69d',swordWave:'#a5f0c8',soulWave:'#cda9ff',phoenix:'#ff965e'}[p.kind];
      line(c,[[-46,0],[-12,0],[0,0]],col+'88',4);
      if(p.kind==='phoenix'){poly(c,[[-16,1],[-26,-17],[-7,-11],[5,-3],[15,-4],[10,1],[-4,6],[-24,14]],'#ffaf4b','#fff1a0');}
      else if(p.kind==='icicle')poly(c,[[-15,0],[0,-5],[18,0],[0,4]],'#71b5de','#dcffff');
      else blade(c,-8,0,Math.PI/2,26,col,2.3);c.restore();}
    for(const e of arsenal.targets())if(arsenal.marks.get(e)?.frozen>0)oval(c,e.x,e.y-30,22,34,'#a5f1ff',3);
  }
  function ground(c,arsenal){for(const f of arsenal?.tracks||[]){c.save();c.globalAlpha*=1-f.age/1.1;root.XiuxianAvatar.footprint(c,f.x,f.y,f.style,f.age,f.base);c.restore();}}
  function warnings(c,a){for(const h of a?.hazards||[]){const {oval}=root.XiuxianAvatar;
    oval(c,h.x,h.y,h.r,h.r,'#291f23',7);oval(c,h.x,h.y,h.r,h.r,'#ffb49b',3);
    c.save();c.fillStyle='#302529';c.fillRect(h.x-49,h.y-h.r-24,98,22);c.fillStyle='#ffe3bd';c.font='bold 15px sans-serif';c.textAlign='center';c.fillText('砺剑 · 雷环',h.x,h.y-h.r-7);c.restore();}}
  root.XiuxianWeapons={Arsenal,difficulty,paint,ground,warnings};
})(globalThis);
