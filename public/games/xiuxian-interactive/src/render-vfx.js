(function (root) {
  'use strict';
  const TAU = Math.PI * 2;
  const grass = new Set(['garden','forest','valley','bamboo','hehuan']);
  const stone = new Set(['tower','tomb','crypt','qingyang','wangyard','sanctum']);
  class FieldMotion {
    constructor() {
      this.media = root.matchMedia('(prefers-reduced-motion: reduce)');
      this.motes=Array.from({length:28},(_,i)=>({
        x:(i*197+97)%1280,y:(i*131+43)%760,speed:5+i%6,phase:i*2.39996
      }));
      this.steps = Array.from({length:24}, () => ({life:0}));
      this.cursor = 0;
      this.distance = 0;
      this.lean = 0;
      this.phase = 0;
    }
    begin(game, time, options) {
      const s = game.state;
      this.reduced = !!options?.reducedMotion || this.media.matches || document.documentElement.classList.contains('reduced-motion');
      const reset = this.state !== s || this.map !== s.map || time < this.time;
      const dt = reset ? 0 : Math.max(0, Math.min(.08,time-this.time));
      const dx = reset ? 0 : s.x-this.x, dy = reset ? 0 : s.y-this.y;
      this.impact=0;
      for(const e of game.effects)if(e.kind==='finisher')this.impact=Math.max(this.impact,.12-e.age);
      this.state=s; this.map=s.map; this.x=s.x; this.y=s.y; this.time=time;
      if (reset || this.reduced) {
        for (const p of this.steps) p.life=0;
        this.distance=0; this.phase=0; this.lean=0; this.actionEnd=0;
      }
      const face=(game.moving?game.moveFacing:null)||game.face;
      const facing=face.x<0?-1:1;
      this.turn=reset||this.reduced?0:(this.facing!==facing?1:Math.max(0,(this.turn||0)-dt*7));this.facing=facing;
      if (this.reduced || !dt) return;
      for (const p of this.steps) p.life=Math.max(0,p.life-dt);
      const moved=Math.hypot(dx,dy);
      const walking=game.moving && !game.dash && moved>0 && moved<30;
      this.lean += ((walking ? dx/moved : 0)-this.lean)*Math.min(1,dt*14);
      if (!walking) return;
      this.phase+=moved/30*Math.PI;
      this.distance+=moved;
      if (this.distance<30) return;
      this.distance%=30;
      const nearWater=s.map==='temple'||(game.objects?.()||[]).some(o=>(o.kind==='well'||o.id==='townWell'||/pond|brook|stream|river/i.test(o.id||''))&&Math.hypot(o.x-s.x,o.y-s.y)<120);
      const nearBush=grass.has(s.map)&&(game.objects?.()||[]).some(o=>['herb','moonHerb','vine'].includes(o.kind)&&Math.hypot(o.x-s.x,o.y-s.y)<95);
      const type=nearWater?'ripple':grass.has(s.map)?'leaf':stone.has(s.map)?'stone':'dust';
      const foot=Math.floor(this.phase/Math.PI)%2 ? -7 : 7;
      const count=type==='ripple'?3:nearBush?5:3;
      for (let i=0;i<count;i++) {
        const p=this.steps[this.cursor++%this.steps.length];
        p.x=s.x+foot*dy/moved-dx/moved*(5+i*2);
        p.y=s.y-foot*dx/moved-dy/moved*5;
        p.vx=(i-Math.floor(count/2))*22-dx/moved*20; p.vy=-16-i*6-(nearBush?8:0);
        p.type=type; p.life=type==='ripple'?.56:nearBush?.68:.52; p.maxLife=p.life;
        p.size=(type==='leaf'?2.1:1.7)+i*.55; p.splash=type==='ripple'&&i>0;
        p.tint=nearBush&&i%2?'#ffe9a8':'#8ec47e';
      }
    }
    interact(game, object) {
      if (!object || this.reduced) return;
      this.actionEnd=game.state.playTime+.51;
      this.gather=/herb|pickup|seal|altar|breath|training|cultivate|quietRest/i.test(object.kind+' '+object.role+' '+object.id);
    }
    get bend() {
      const remaining=(this.actionEnd||0)-this.time;
      return remaining>0 ? Math.sin(Math.PI*Math.min(1,remaining/.56)) : 0;
    }
    atmosphere(c,scene,time,width=1280,height=760) {
      if(this.reduced)return;
      const rain=scene==='temple',tomb=/tower|crypt|tomb|ruins|sanctum/.test(scene);
      const house=FieldMotion.houses[scene];
      if(!house&&!rain&&!tomb&&!grass.has(scene)&&!/(road|mountain|trail)/.test(scene))return;
      c.save();c.scale(width/1280,height/760);
      if(tomb||rain){
        // Build the soft wash once. No gradients or new particle objects in the frame loop.
        if(!this.wash){
          this.wash=document.createElement('canvas');this.wash.width=this.wash.height=128;
          const ink=this.wash.getContext('2d'),g=ink.createRadialGradient(64,64,2,64,64,64);
          g.addColorStop(0,'#d7dfca');g.addColorStop(1,'#d7dfca00');ink.fillStyle=g;ink.fillRect(0,0,128,128);
        }
        c.globalAlpha=rain?.10+Math.sin(time*3.1)*.022:.11;
        if(rain&&this.state.chapter.survival.fire)c.drawImage(this.wash,582,312,126,83);
        else if(tomb){c.drawImage(this.wash,-110+Math.sin(time*.17)*40,494,410,126);c.drawImage(this.wash,1023,121+Math.sin(time*.2)*20,310,96);}
      }else{
        c.fillStyle=house||'#f3deb0';c.globalAlpha=.047+Math.sin(time*.27)*.009;
        c.beginPath();c.moveTo(292,0);c.lineTo(389,0);c.lineTo(122,520);c.lineTo(85,534);c.fill();
        c.globalAlpha=.035;c.beginPath();c.moveTo(418,0);c.lineTo(457,0);c.lineTo(217,431);c.lineTo(202,430);c.fill();
      }
      for(let i=0;i<this.motes.length;i++){
        const m=this.motes[i], drift=Math.sin(time*.52+m.phase);
        if(rain){
          const x=(m.x+time*77)%1280,y=(m.y+time*194)%760;
          c.globalAlpha=.29;c.strokeStyle='#d3dde0';c.lineWidth=1.3;c.beginPath();c.moveTo(x,y);c.lineTo(x+4,y+13);c.stroke();
          if(i%4===0){
            const p=(time*.55+i*.27)%1;c.globalAlpha=(1-p)*.48;c.beginPath();
            c.ellipse(m.x,531+m.y*.27,2+p*18,1+p*4,0,0,TAU);c.stroke();
          }
        }else{
          const x=(m.x+time*m.speed+drift*12+1280)%1280;
          const y=tomb?760-(m.y+time*m.speed*.6)%760:(m.y+time*m.speed+drift*5+760)%760;
          c.globalAlpha=tomb ? .4+drift*.18 : (house ? .73 : .60);
          c.fillStyle=house||(tomb?'#aacdc1':i%3?'#a6ad79':'#f0dca5');
          c.save();c.translate(x,y);if(height<300)c.scale(1,3.5);
          c.beginPath();
          if(scene==='tianji'||scene==='summit'){
            c.moveTo(0,-4);c.lineTo(1,-1);c.lineTo(4,0);c.lineTo(1,1);
            c.lineTo(0,4);c.lineTo(-1,1);c.lineTo(-4,0);c.lineTo(-1,-1);
          }else c.ellipse(0,0,tomb||i%3===0?1.7:4.8,tomb?1.7:1.6,drift+m.phase,0,TAU);
          c.fill();c.restore();
        }
      }
      if(tomb){c.globalAlpha=.12+Math.sin(time*.8)*.04;c.strokeStyle='#b1cabd';c.lineWidth=1.8;
        c.beginPath();c.ellipse(242,545,48,14,0,0,TAU);c.stroke();c.beginPath();c.ellipse(242,545,54,16,0,.3,3.7);c.stroke();}
      c.restore();
    }
    banner(canvas,scene,now) {
      if(!canvas || this.media.matches || document.documentElement.classList.contains('reduced-motion'))return;
      if(canvas===this.bannerCanvas && now-this.bannerFrame<65)return;
      this.bannerCanvas=canvas;this.bannerFrame=now;
      const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);
      this.atmosphere(c,scene,now/1000,canvas.width,canvas.height);
    }
    critical(c,hp,time) {
      if(hp<=0||hp>35)return;
      c.save();c.globalAlpha=this.reduced?.42:.39+.18*Math.sin(time*2.5);
      c.strokeStyle='#a74635';c.lineWidth=4;c.strokeRect(2,2,1276,756);
      c.globalAlpha*=.48;c.strokeStyle='#d58268';c.lineWidth=1.5;c.strokeRect(5,5,1270,750);c.restore();
    }
    recoveryGlow(c,s,time){
      c.save();c.translate(s.x,s.y);c.scale(1,.4);const glow=c.createRadialGradient(0,0,3,0,0,44);
      glow.addColorStop(0,'#acf4c459');glow.addColorStop(1,'#acf4c400');c.fillStyle=glow;
      c.beginPath();c.arc(0,0,this.reduced?38:38+3*Math.sin(time*3),0,Math.PI*2);c.fill();c.restore();
    }
    ground(c) {
      if (this.reduced) return;
      c.save();
      for (const p of this.steps) {
        if (!p.life) continue;
        const maxL=p.maxLife||.5, age=maxL-p.life, frac=Math.max(0,p.life/maxL);
        const x=p.x+p.vx*age, y=p.y+p.vy*age+44*age*age;
        c.globalAlpha=Math.min(1,frac*1.35);
        if (p.type==='ripple') {
          if(p.splash){
            c.fillStyle='#e5f6f3';
            c.beginPath();c.arc(x,y-4,1.6*frac+.5,0,TAU);c.fill();
          }else{
            c.beginPath();c.ellipse(p.x,p.y,4+age*46,1.5+age*15,0,0,TAU);
            c.strokeStyle='#d7eee8';c.lineWidth=1.5;c.stroke();
            if(age>.08){
              c.globalAlpha*=0.62;
              c.beginPath();c.ellipse(p.x,p.y,2+(age-.08)*32,1+(age-.08)*10,0,0,TAU);
              c.strokeStyle='#f5fff9';c.lineWidth=1;c.stroke();
            }
          }
        } else if (p.type==='leaf') {
          const swayX=x+Math.sin(age*9+p.size)*7, swayY=y-Math.sin(age*5)*4;
          c.save();c.translate(swayX,swayY);c.rotate(age*4.6+p.size);
          c.fillStyle=p.tint||'#94be78';
          c.beginPath();c.moveTo(-p.size*2.1,0);c.quadraticCurveTo(0,-p.size*1.2,p.size*2.1,0);c.quadraticCurveTo(0,p.size*1.2,-p.size*2.1,0);c.fill();
          c.strokeStyle='#eef8d8';c.lineWidth=.65;c.beginPath();c.moveTo(-p.size*1.4,0);c.lineTo(p.size*1.4,0);c.stroke();
          c.restore();
        } else {
          c.fillStyle=p.type==='dust'?'#c9af8b':'#bac0b5';
          c.beginPath();c.ellipse(x,y,p.size,p.size*.6,age*4+p.size,0,TAU);c.fill();
        }
      }
      if (this.bend && this.gather) {
        c.globalAlpha=this.bend*.68;c.strokeStyle='#c8dec1';c.lineWidth=1.8;
        c.beginPath();c.ellipse(this.x,this.y,20+this.bend*16,6+this.bend*6,0,0,TAU);c.stroke();
      }
      c.restore();
    }
    pose(c,x,y,walking,player=false) {
      if (this.reduced) return;
      const phase=player?this.phase:this.time*7+x*.05;
      const breath=Math.sin(this.time*2.1+(player?0:x*.02))*.014;
      const bend=player?this.bend:0;
      c.translate(x,y-(walking?Math.abs(Math.sin(phase))*3.8:0));
      c.rotate((player?this.lean*.046:0)+(walking?Math.sin(phase)*.024:0)+bend*.078);
      c.scale(1-breath*.55+bend*.025-(player?Math.sin(this.turn*Math.PI)*.09:0),1+breath-bend*.075);
      c.translate(-x,-y);
    }
    // Tint only opaque artwork. Compositing works on file: canvases without pixel readback.
    flash(c,image,rect,x,y,w,h) {
      if (!this.flashAlpha || this.reduced) return;
      this.masks ||= new WeakMap();
      let mask=this.masks.get(rect);
      if (!mask) {
        mask=document.createElement('canvas');
        mask.width=Math.ceil(w);mask.height=Math.ceil(h);
        const ink=mask.getContext('2d');
        ink.drawImage(image,...rect,0,0,mask.width,mask.height);
        ink.globalCompositeOperation='source-in';ink.fillStyle='#fff9e4';
        ink.fillRect(0,0,mask.width,mask.height);this.masks.set(rect,mask);
      }
      c.save();c.globalAlpha*=this.flashAlpha;c.drawImage(mask,x,y,w,h);c.restore();
    }
    incense(c,lure,time) {
      c.save();c.translate(lure.x,lure.y-36);
      for(let i=0;i<(this.reduced?1:7);i++){
        const p=this.reduced?.45:(time*.38+i/7)%1,x=Math.sin(p*6+time)*8,y=-p*50;
        c.beginPath();c.moveTo(x-3,y+6);c.bezierCurveTo(x-11,y-1,x+12,y-5,x+4,y-13);
        c.strokeStyle='#c6dfcc';c.lineWidth=1.6+p*2;c.globalAlpha=(1-p)*.52;c.stroke();
      }
      c.restore();
    }
    defense(c,g) {
      const s=g.state;
      if (!g.guard && !g.ward && !g.dash) return;
      c.save();c.translate(s.x,s.y-40);
      if (g.dash && !this.reduced) {
        c.rotate(Math.atan2(g.dashVector.y,g.dashVector.x));
        for(let i=0;i<3;i++){
          c.strokeStyle=i===1?'#eff4dcbb':'#26443e99';c.lineWidth=i===1?2:3;
          c.beginPath();c.moveTo(-19,i*10-10);c.quadraticCurveTo(-43,i*13-14,-73+i*6,i*12-10);c.stroke();
        }
      } else if (g.guard || g.ward) {
        if(g.ward){
          c.save();c.scale(.80,1.08);c.rotate(this.reduced?0:this.time*.42);
          for(let i=0;i<8;i++){
            c.rotate(Math.PI/4);c.strokeStyle='#e9ce8dbb';c.lineWidth=1.7;
            c.beginPath();c.arc(0,0,43,-.13,.13);c.stroke();
            c.beginPath();c.arc(0,0,46,-.13,-.025);c.stroke();c.beginPath();c.arc(0,0,46,.025,.13);c.stroke();
          }
          c.restore();
          if(!this.reduced&&(g.feedback.hurt||g.feedback.block)){
            const t=1-Math.min(1,Math.max(g.feedback.hurt/.2,g.feedback.block/.18));
            c.beginPath();c.ellipse(0,0,32+t*18,44+t*15,0,0,TAU);
            c.strokeStyle='#f7e1a7';c.lineWidth=2*(1-t)+.5;c.stroke();
          }
        }
        const angle=Math.atan2(g.face.y,g.face.x);
        c.scale(1,.94);c.strokeStyle='#233e35';c.lineWidth=5;
        c.beginPath();c.arc(0,0,37,angle-1.13,angle+1.13);c.stroke();
        c.strokeStyle='#efd99d';c.lineWidth=2.5;c.stroke();
        c.strokeStyle='#b2deca';c.lineWidth=1.4;c.beginPath();c.arc(0,0,41,angle-.84,angle+.84);c.stroke();
      }
      c.restore();
    }
  }
  FieldMotion.houses={hehuan:'#eab6ac',tianji:'#b9cee5',danding:'#e8bb87',baicao:'#b4d79b',summit:'#ead9a1'};
  root.XiuxianFieldMotion=FieldMotion;

  // Shared procedural enemy animation, attack trails, poise-break climax & grand boss bar
  const EnemyVfx=(function(){
    const states=new WeakMap();
    const arenas=new WeakMap();
    const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));

    function record(e){
      let r=states.get(e);
      if(!r){r={prev:'idle',strikeAge:9,strike:null,trails:[],lastX:e.x,lastY:e.y,hpLag:e.hp};states.set(e,r);}
      return r;
    }

    function styleFor(e){
      const k=e.kind||'',mk=e.anim?.moveKind||'',af=e.affix||'';
      let arch='slam';
      if(e.trueBoss||['wang','blade','bladeShadow','bamboo'].includes(k)||/剑|刀|刃/.test(e.name||'')||mk==='cone'||mk==='wave')arch='blade';
      else if(['wolf','spider','wyrm'].includes(k)||/狼|妖|蛛|蛟|魅/.test(e.name||'')||mk==='contact'||mk==='dash')arch='claw';
      else if(['cultist','summoner','moth','wisp','sprite','mist','ember','puppet'].includes(k)||/邪|修|灵|术|雷|焰/.test(e.name||'')||['meteor','cross','zone','bolt','channel'].includes(mk))arch='spell';
      let colors=['#ffd270','#7c531e','#fff2c8'];
      if(af==='冰脉'||k==='wyrm'||mk==='frost')colors=['#7ce4ff','#24698e','#e4fbff'];
      else if(af==='雷环'||k==='puppet'||e.trueBoss||mk==='meteor')colors=['#cca2ff','#59368f','#f6eaff'];
      else if(af==='狂暴'||k==='wang'||k==='ember'||k==='bone'||mk==='cross')colors=['#ff774e','#88251d','#ffe2a6'];
      else if(k==='spider'||k==='corpse'||mk==='poison')colors=['#9ce474','#2d6334','#e6ffc8'];
      return {arch,colors};
    }

    // Pool slots hold one dissipating silhouette or one footfall. Each fragment is
    // drawn analytically from the slot age, so a burst never allocates particles.
    function stage(key,now){
      let ar=arenas.get(key);
      if(!ar){
        ar={hitStopUntil:0,shakeUntil:0,lastNow:now,cursor:0,bannerUntil:-1,
          pool:Array.from({length:128},()=>({end:-1}))};
        arenas.set(key,ar);
      }
      return ar;
    }
    function emit(ar,kind,e,now,life,element){
      const slot=ar.pool[ar.cursor++%ar.pool.length];
      Object.assign(slot,{kind,e,x:e.x,y:e.y,start:now,end:now+life,life,element});
    }
    function fallen(key,e,now,hit){
      const r=record(e);if(r.dead)return;
      r.dead=true;
      const element=e.frozen>0||hit==='ice'||e.affix==='冰脉'?'ice':
        e.kind==='golem'||e.kind==='stone'||e.kind==='keeper'?'stone':
        e.kind==='bomber'||e.burning>0||hit==='fire'?'fire':'mist';
      emit(stage(key,now),'fall',e,now,.45,element);
    }
    let contact;
    function contactStamp(){
      if(contact)return contact;
      contact=document.createElement('canvas');contact.width=128;contact.height=40;
      const g=contact.getContext('2d');g.translate(64,20);g.scale(64,20);
      const shade=g.createRadialGradient(0,0,0,0,0,1);
      shade.addColorStop(0,'#12181bcc');shade.addColorStop(.42,'#14202499');shade.addColorStop(1,'#18232000');
      g.fillStyle=shade;g.fillRect(-1,-1,2,2);g.scale(.53,.64);g.fillRect(-1,-1,2,2);return contact;
    }
    function ground(c,e,h,now,reduced){
      const r=record(e),pulse=reduced?1:1+.035*Math.sin(now*4)+(e.dash>0?.10:0);
      c.save();c.translate(e.x,e.y+2);c.scale(h*.34*pulse,h*.084/pulse);
      c.drawImage(contactStamp(),-1,-1,2,2);c.restore();
      if(r.second){c.save();c.strokeStyle='#d89dff';c.lineWidth=2;c.shadowColor='#ae52ec';c.shadowBlur=reduced?0:7;
        c.beginPath();c.ellipse(e.x,e.y+1,h*.39,h*.105,0,0,TAU);c.stroke();c.restore();}
      const age=now-r.born;
      if(!reduced&&age>=0&&age<.35){
        const q=age/.35;c.save();c.globalAlpha*=1-q;c.strokeStyle='#c3e6d9';c.lineWidth=2;
        c.beginPath();c.ellipse(e.x,e.y,h*(.21+.24*q),h*(.06+.065*q),0,0,TAU);c.stroke();c.restore();
      }
    }
    function arrival(c,e,now,reduced){
      if(reduced)return;
      const q=clamp((now-record(e).born)/.35,0,1);
      if(q<1){const scale=.7+.3*q;c.translate(e.x,e.y);c.scale(scale,scale);c.translate(-e.x,-e.y);c.globalAlpha*=q;}
    }
    function remnants(c,key,now,reduced,body){
      const ar=arenas.get(key);if(!ar||reduced)return;
      for(const f of ar.pool){
        if(now<f.start||now>=f.end)continue;
        const q=(now-f.start)/f.life;c.save();c.globalAlpha*=1-q;
        if(f.kind==='wave'){
          c.strokeStyle='#dfacff';c.lineWidth=5*(1-q)+1;c.beginPath();c.ellipse(f.x,f.y,32+135*q,9+45*q,0,0,TAU);c.stroke();
        }else if(f.kind==='dust'){
          c.fillStyle='#c3b99d';c.globalAlpha*=.48;
          for(let i=0;i<3;i++){c.beginPath();c.arc(f.x+(i-1)*(2+8*q),f.y-q*(4+i*3),1.2+q,0,TAU);c.fill();}
        }else{
          c.globalAlpha*=.65;c.save();c.translate(0,-11*q);body(f.e);c.restore();
          const col={ice:'#a2eafa',fire:'#ff9654',stone:'#a99f8e',mist:'#acc4b9'}[f.element];
          c.fillStyle=col;
          for(let i=0;i<9;i++){
            const a=i*2.4+f.x,x=f.x+Math.cos(a)*(5+q*32),y=f.y-8-i%4*7-q*(18+i*3);
            c.beginPath();
            if(f.element==='mist')c.ellipse(x,y,4+q*6,3+q*3,a,0,TAU);
            else{const w=f.element==='stone'?4:2,h=f.element==='ice'?7:4;c.moveTo(x,y-h);c.lineTo(x+w,y);c.lineTo(x-1,y+h);c.lineTo(x-w,y);c.closePath();}
            c.fill();
          }
        }
        c.restore();
      }
    }
    function title(c,key,now,width,y,reduced){
      const ar=arenas.get(key);if(!ar||now>=ar.bannerUntil)return;
      const q=1-(ar.bannerUntil-now)/.65;
      c.save();c.translate(width/2+(reduced?0:(1-q)**3*-90),y);
      c.globalAlpha*=reduced?1:Math.min(1,q*10+.15,(1-q)*7);
      const ink=c.createLinearGradient(-170,0,170,0);
      ink.addColorStop(0,'#10242500');ink.addColorStop(.18,'#102425ed');ink.addColorStop(.82,'#172224f2');ink.addColorStop(1,'#10242500');
      c.fillStyle=ink;c.fillRect(-170,-21,340,39);c.fillStyle='#f6d798';c.textAlign='center';c.font='bold 23px KaiTi,serif';
      c.fillText(ar.title,0,6);c.restore();
    }
    function observe(arenaKey,enemies,now,reduced){
      const ar=stage(arenaKey,now);
      const dt=clamp(now-ar.lastNow,0,.08);ar.lastNow=now;
      for(const e of enemies){
        if(!e||e.hp<=0)continue;
        const r=record(e),st=e.anim?.state||(e.wind>0?'windup':'idle');
        if(r.born===undefined){
          r.born=now;r.nextDust=now+.18;
          if((e.boss||e.trueBoss)&&arenaKey.activity!=='dummy'){
            ar.title=(e.name||root.XiuxianRogueData?.bosses[e.type]||'劫境首领')+' · 降临';
            ar.bannerUntil=now+.65;if(!reduced)ar.shakeUntil=now+.15;
          }
        }
        if((e.boss||e.trueBoss)&&e.hp<=e.maxHp*.5&&!r.second){
          r.second=true;if(!reduced)emit(ar,'wave',e,now,.48);
        }
        if(!reduced&&now>=r.nextDust&&Math.hypot(e.x-r.lastX,e.y-r.lastY)>.18){
          emit(ar,'dust',e,now,.27);r.nextDust=now+(e.dash>0?.09:.24);
        }
        r.strikeAge+=dt;
        r.hpLag=r.hpLag>e.hp?Math.max(e.hp,r.hpLag-(e.maxHp||100)*dt*.42):e.hp;
        if(st!==r.prev){
          if(st==='broken'&&!reduced){
            ar.hitStopUntil=now+.06;
            ar.shakeUntil=now+.22;
          }
          if(st==='strike'){
            r.strikeAge=0;
            r.strike={x:e.x,y:e.y,dirX:e.anim?.dirX||1,dirY:e.anim?.dirY||0,moveKind:e.anim?.moveKind||'slam',arch:styleFor(e).arch,colors:styleFor(e).colors};
          }
          r.prev=st;
        }
        const movingFast=st==='strike'||e.dash>0||(e.anim?.moveKind==='line'&&st==='strike');
        if(movingFast&&Math.hypot(e.x-r.lastX,e.y-r.lastY)>3){
          r.trails.unshift({x:r.lastX,y:r.lastY,age:0});
          if(r.trails.length>3)r.trails.length=3;
        }
        r.lastX=e.x;r.lastY=e.y;
        for(const tr of r.trails)tr.age+=dt;
        r.trails=r.trails.filter(tr=>tr.age<.24);
      }
      const hitStop=!reduced&&now<ar.hitStopUntil;
      let shakeX=0,shakeY=0;
      if(!reduced&&now<ar.shakeUntil){
        const k=(ar.shakeUntil-now)/.22;
        shakeX=Math.sin(now*118)*4.5*k;
        shakeY=Math.cos(now*97)*3.2*k;
      }
      return {hitStop,shakeX,shakeY};
    }

    function beforeBody(c,e,h,time,reduced){
      const a=e.anim,st=a?.state||(e.wind>0?'windup':'idle');
      const {colors}=styleFor(e),r=record(e);
      // 1. Speed afterimage trails for charging / striking enemies
      if((st==='strike'||e.dash>0)&&!reduced){
        const dx=a?.dirX||1,dy=a?.dirY||0;
        for(let i=3;i>=1;i--){
          c.save();
          c.globalAlpha=.14*(4-i)/3;
          c.translate(e.x-dx*i*14,e.y-h*.46-dy*i*6);
          c.fillStyle=colors[0];
          c.beginPath();c.ellipse(0,0,h*.22,h*.38,dx*.18,0,TAU);c.fill();
          c.restore();
        }
      }
      // 2. Windup Qi-gathering vortex
      if(st==='windup'||e.wind>0){
        const dur=Math.max(.2,a?.duration||1);
        const p=a?.state==='windup'?clamp(Math.max(.24,a.t/dur),0,1):.5;
        const cy=e.y-h*.42,rad=h*.46*(1.15-p*.35);
        c.save();c.translate(e.x,cy);
        const glow=c.createRadialGradient(0,0,3,0,0,rad*1.15);
        glow.addColorStop(0,colors[2]+'78');
        glow.addColorStop(.55,colors[0]+'38');
        glow.addColorStop(1,colors[0]+'00');
        c.fillStyle=glow;c.beginPath();c.arc(0,0,rad*1.15,0,TAU);c.fill();
        // Ground rune ellipse
        c.save();c.translate(0,h*.42);c.scale(1,.36);
        c.strokeStyle=colors[0]+'aa';c.lineWidth=2;
        c.beginPath();c.arc(0,0,rad*1.05,0,TAU);c.stroke();
        c.restore();
        // 6 contracting inward qi filaments
        for(let i=0;i<6;i++){
          const ang=i*TAU/6+(reduced?0:time*3.8)+p*1.6;
          const rOut=rad*(1.12-p*.22),rIn=rad*(.32-p*.12);
          c.beginPath();
          c.moveTo(Math.cos(ang)*rOut,Math.sin(ang)*rOut*.72);
          c.quadraticCurveTo(Math.cos(ang+.65)*(rOut+rIn)*.52,Math.sin(ang+.65)*(rOut+rIn)*.38,Math.cos(ang+1.1)*rIn,Math.sin(ang+1.1)*rIn*.72);
          c.strokeStyle=i%2?colors[2]:colors[0];c.lineWidth=2.2;c.lineCap='round';c.stroke();
        }
        c.restore();
      }
      // 3. Recover opening cue at feet
      if(st==='recover'){
        c.save();c.translate(e.x,e.y+2);c.scale(1,.36);
        c.setLineDash([7,5]);c.strokeStyle='#8ce4c6bb';c.lineWidth=2.4;
        c.beginPath();c.arc(0,0,h*.38,0,TAU);c.stroke();
        c.setLineDash([]);c.restore();
      }
      // 4. Broken vulnerable purple-gold halo behind body
      if(st==='broken'){
        const cy=e.y-h*.46,pulse=reduced?1:.88+.12*Math.sin(time*12);
        c.save();c.translate(e.x,cy);
        const vg=c.createRadialGradient(0,0,6,0,0,h*.62*pulse);
        vg.addColorStop(0,'rgba(255,222,126,0.46)');
        vg.addColorStop(.52,'rgba(196,132,255,0.42)');
        vg.addColorStop(1,'rgba(150,80,230,0)');
        c.fillStyle=vg;c.beginPath();c.arc(0,0,h*.62*pulse,0,TAU);c.fill();
        // Fractured purple-gold vulnerable outline ellipse
        c.strokeStyle='#d7adff';c.lineWidth=3.2;
        c.beginPath();c.ellipse(0,0,h*.34,h*.48,0,0,TAU);c.stroke();
        c.strokeStyle='#ffd97a';c.lineWidth=1.4;c.setLineDash([9,5]);
        c.beginPath();c.ellipse(0,0,h*.38,h*.52,0,0,TAU);c.stroke();
        c.setLineDash([]);
        c.restore();
      }
    }

    function applyPose(c,e,h,time,reduced){
      const a=e.anim,st=a?.state||(e.wind>0?'windup':'idle');
      const dx=a?.dirX||1,dy=a?.dirY||0;
      let tx=0,ty=0,sx=1,sy=1,rot=0;
      if(st==='windup'||e.wind>0){
        const dur=Math.max(.2,a?.duration||1);
        const p=a?.state==='windup'?clamp(Math.max(.26,a.t/dur),0,1):.55;
        const ease=1-(1-p)*(1-p);
        tx=-dx*13*ease;ty=-dy*4.5*ease;
        sx=1+.14*ease;sy=1-.15*ease;
        rot=-dx*.16*ease;
      }else if(st==='strike'){
        const dur=Math.max(.13,a?.duration||.13);
        const p=clamp((a?.t||0)/dur,0,1),k=1-p*.45;
        tx=dx*19*k;ty=dy*6.5*k;
        sx=1+.17*k;sy=1-.07*k;
        rot=dx*.17*k;
      }else if(st==='recover'){
        const pant=reduced?0:Math.sin(time*9.5)*.028;
        ty=3;sx=1.07-pant*.5;sy=.89+pant;rot=dx*.05;
      }else if(st==='broken'){
        const shiver=reduced?0:Math.sin(time*38)*2;
        tx=shiver;ty=4;sx=1.06;sy=.91;rot=-dx*.10;
      }else if(st==='move'&&!reduced){
        const freq=e.boss||e.kind==='golem'||e.kind==='keeper'?6.5:10.5;
        const phase=time*freq+(e.x+e.y)*.03;
        ty=-Math.abs(Math.sin(phase))*(e.boss?3.2:4.8);
        rot=dx*.045+Math.sin(phase)*.03;
        sx=1-Math.sin(phase*2)*.02;sy=1+Math.sin(phase*2)*.02;
      }else if(!reduced){
        const b=Math.sin(time*2.6+(e.x||0)*.04)*.018;
        sx=1-b*.6;sy=1+b;
      }
      c.translate(e.x+tx,e.y+ty);
      if(rot)c.rotate(rot);
      if(sx!==1||sy!==1)c.scale(sx,sy);
      c.translate(-e.x,-e.y);
    }

    function drawStrikeFx(c,s,h,p){
      const ang=Math.atan2(s.dirY,s.dirX),alpha=Math.min(1,(1-p)*2.2);
      c.save();c.globalAlpha=alpha;
      if(s.arch==='blade'){
        // Sweeping crimson/cyan-steel crescent slash
        const r=Math.max(46,h*.72);
        c.translate(s.x+s.dirX*14,s.y-h*.44+s.dirY*8);c.rotate(ang+(p-.35)*.8);c.scale(1,.82);
        c.beginPath();c.arc(0,0,r,-1.25,1.15);
        c.quadraticCurveTo(r*.82,r*.2,r*.74,0);
        c.quadraticCurveTo(r*.82,-r*.34,r*Math.cos(-1.25),r*Math.sin(-1.25));c.closePath();
        c.fillStyle=s.colors[1]+'cc';c.fill();
        c.beginPath();c.arc(0,0,r,-1.22,1.12);
        c.strokeStyle=s.colors[0];c.lineWidth=5*(1-p)+2;c.stroke();
        c.beginPath();c.arc(0,0,r+2,-.9,.85);
        c.strokeStyle='#fff4d8';c.lineWidth=2;c.stroke();
      }else if(s.arch==='claw'){
        // Three wicked parallel crimson claw-rend arcs
        c.translate(s.x+s.dirX*26,s.y-h*.42+s.dirY*12);c.rotate(ang);
        for(let i=-1;i<=1;i++){
          const oy=i*11,len=42+p*24-Math.abs(i)*6;
          c.beginPath();c.moveTo(-14,oy-4);c.quadraticCurveTo(len*.45,oy-10,len,oy+3);
          c.strokeStyle='#4e1018';c.lineWidth=6.5*(1-p)+2;c.lineCap='round';c.stroke();
          c.strokeStyle='#ff4c4c';c.lineWidth=3.4*(1-p)+1.2;c.stroke();
          c.strokeStyle='#ffdfd0';c.lineWidth=1.2;c.stroke();
        }
      }else if(s.arch==='spell'){
        // Flaring arcane seal + 3 flying talismans
        const cx=s.x+s.dirX*18,cy=s.y-h*.45+s.dirY*8;
        c.save();c.translate(cx,cy);c.rotate(p*2.6);
        c.strokeStyle=s.colors[0];c.lineWidth=2.4;
        c.beginPath();c.arc(0,0,22+p*28,0,TAU);c.stroke();
        c.restore();
        for(let i=-1;i<=1;i++){
          const a=ang+i*.32,d=18+p*58,tx=cx+Math.cos(a)*d,ty=cy+Math.sin(a)*d;
          c.save();c.translate(tx,ty);c.rotate(a+p*4);
          c.fillStyle='#f4dca2';c.strokeStyle='#8e2e24';c.lineWidth=1.4;
          c.fillRect(-7,-4,14,8);c.strokeRect(-7,-4,14,8);
          c.beginPath();c.moveTo(-4,0);c.lineTo(4,0);c.strokeStyle='#b43424';c.stroke();
          c.restore();
        }
      }else{
        // Heavy golem/boss ground slam: wide shockwave + jagged stone fracture cracks + flying rock splinters
        const sp=Math.max(.35,p);
        const gx=s.x+s.dirX*28,gy=s.y+4,rad=(48+sp*58)*Math.max(.85,h/125);
        c.save();c.translate(gx,gy);c.scale(1,.46);
        const sg=c.createRadialGradient(0,0,6,0,0,rad);
        sg.addColorStop(0,'rgba(255,230,152,0.48)');
        sg.addColorStop(.65,'rgba(255,156,74,0.22)');
        sg.addColorStop(1,'rgba(255,156,74,0)');
        c.fillStyle=sg;c.beginPath();c.arc(0,0,rad,0,TAU);c.fill();
        c.strokeStyle='#241512';c.lineWidth=7.5*(1-sp*.5)+2;
        c.beginPath();c.arc(0,0,rad,0,TAU);c.stroke();
        c.strokeStyle=s.colors[0];c.lineWidth=3.8*(1-sp*.5)+1.5;
        c.beginPath();c.arc(0,0,rad,0,TAU);c.stroke();
        for(let i=0;i<8;i++){
          const a=i*TAU/8+.18;
          c.beginPath();c.moveTo(Math.cos(a)*10,Math.sin(a)*10);
          c.lineTo(Math.cos(a+.15)*rad*.58,Math.sin(a+.15)*rad*.58);
          c.lineTo(Math.cos(a)*rad*1.12,Math.sin(a)*rad*1.12);
          c.strokeStyle='#1f1412';c.lineWidth=5;c.stroke();
          c.strokeStyle=s.colors[2];c.lineWidth=2.2;c.stroke();
        }
        c.restore();
        // Flying stone debris splinters
        for(let i=0;i<6;i++){
          const a=-Math.PI*.15-i*Math.PI*.14,d=26+sp*(42+i%3*14);
          const rx=gx+Math.cos(a)*d,ry=gy-16+Math.sin(a)*d*.75;
          c.save();c.translate(rx,ry);c.rotate(a+sp*2.2);
          c.fillStyle=i%2?'#d6c49e':'#8f8572';c.strokeStyle='#241c16';c.lineWidth=1.2;
          c.beginPath();c.moveTo(0,-5);c.lineTo(5,1);c.lineTo(-1,5);c.lineTo(-5,-1);c.closePath();
          c.fill();c.stroke();c.restore();
        }
      }
      c.restore();
    }

    function afterBody(c,e,h,time,reduced){
      const a=e.anim,st=a?.state,r=record(e);
      // 1. Active strike VFX (both live strike & decaying trail)
      if(st==='strike'){
        const p=clamp((a.t||0)/Math.max(.13,a.duration||.13),0,1);
        const snap=r.strike||{x:e.x,y:e.y,dirX:a.dirX||1,dirY:a.dirY||0,moveKind:a.moveKind||'slam',arch:styleFor(e).arch,colors:styleFor(e).colors};
        drawStrikeFx(c,snap,h,p*.55);
      }else if(r.strike&&r.strikeAge<.34){
        drawStrikeFx(c,r.strike,h,clamp(r.strikeAge/.34,0,1));
      }
      // 2. Recover exhaustion steam wisps + subtle counter-window calligraphy cue
      if(st==='recover'){
        c.save();
        for(let i=0;i<5;i++){
          const phase=reduced?.28+i*.14:((time*.95+i*.2)%1);
          const wx=e.x+(i-2)*16+Math.sin(phase*5+i)*6;
          const wy=e.y-h*.68-phase*30;
          c.globalAlpha=(1-phase*.75)*.82;
          c.strokeStyle='#22332f';c.lineWidth=4.6;c.lineCap='round';
          c.beginPath();c.moveTo(wx-4,wy+7);c.quadraticCurveTo(wx+6,wy,wx-3,wy-9);c.stroke();
          c.strokeStyle='#eef7f2';c.lineWidth=2.5;c.stroke();
        }
        c.globalAlpha=.92;
        c.font='700 14px "STKaiti","KaiTi",serif';c.textAlign='center';c.textBaseline='middle';
        c.strokeStyle='#142420';c.lineWidth=4;c.strokeText('收招破绽 · 可反击',e.x,e.y+22);
        c.fillStyle='#a8f4d4';c.fillText('收招破绽 · 可反击',e.x,e.y+22);
        c.restore();
      }
      // 3. Broken climax: shattered golden shield shards + stun star ring + golden calligraphic 「破防！」
      if(st==='broken'){
        const bt=a?.t||0;
        // Golden shield shard explosion (visible on frame 0 too via min progress .28!)
        if(bt<.62){
          const sp=clamp(Math.max(.28,bt/.62),0,1);
          c.save();c.translate(e.x,e.y-h*.52);c.globalAlpha=Math.min(1,(1-sp)*1.75);
          for(let i=0;i<10;i++){
            const ang=i*TAU/10+.22,dist=18+sp*(48+i%3*16);
            const sx=Math.cos(ang)*dist,sy=Math.sin(ang)*dist*.74-Math.sin(sp*Math.PI)*18;
            c.save();c.translate(sx,sy);c.rotate(ang+sp*3.4*(i%2?1:-1));
            c.beginPath();c.moveTo(0,-7);c.lineTo(5,-1);c.lineTo(2,7);c.lineTo(-5,3);c.closePath();
            c.fillStyle=i%2?'#ffe284':'#f0b342';c.fill();
            c.strokeStyle='#fff8dc';c.lineWidth=1.1;c.stroke();
            c.restore();
          }
          // Expanding golden shatter ring
          c.beginPath();c.ellipse(0,0,22+sp*58,14+sp*36,0,0,TAU);
          c.strokeStyle='#ffe79e';c.lineWidth=3*(1-sp)+.8;c.stroke();
          c.restore();
        }
        // Spinning stun star ring above head
        const haloY=e.y-h-16;
        c.save();c.translate(e.x,haloY);
        c.strokeStyle='rgba(215,173,255,0.75)';c.lineWidth=1.6;
        c.beginPath();c.ellipse(0,0,28,8,0,0,TAU);c.stroke();
        for(let i=0;i<5;i++){
          const ang=i*TAU/5+(reduced?0:time*2.7);
          const sx=Math.cos(ang)*28,sy=Math.sin(ang)*8,sz=4.8+(Math.sin(ang)+1)*1.2;
          c.save();c.translate(sx,sy);
          c.beginPath();
          for(let k=0;k<8;k++){const ra=k*Math.PI/4,rr=k%2?sz*.38:sz;c[k?'lineTo':'moveTo'](Math.cos(ra)*rr,Math.sin(ra)*rr);}
          c.closePath();
          c.fillStyle=i%2?'#ffe791':'#e3c0ff';c.fill();
          c.strokeStyle='#2b1b36';c.lineWidth=1;c.stroke();
          c.restore();
        }
        c.restore();
        // Bold golden calligraphic 「破防！」 cleanly separated from halo (-18) and nameplate (-108)
        const pop=reduced?1:bt<.16?1+.22*Math.sin(bt/.16*Math.PI):1;
        const textY=e.y-h-54;
        c.save();c.translate(e.x,textY);c.scale(pop,pop);
        c.font='900 28px "STKaiti","KaiTi","SimSun",serif';
        c.textAlign='center';c.textBaseline='middle';
        c.lineJoin='round';
        c.strokeStyle='#23140e';c.lineWidth=6;c.strokeText('破防！',0,0);
        const tg=c.createLinearGradient(0,-14,0,14);
        tg.addColorStop(0,'#fff8d6');tg.addColorStop(.52,'#ffd86e');tg.addColorStop(1,'#e6962c');
        c.fillStyle=tg;c.fillText('破防！',0,0);
        c.restore();
      }
    }

    function drawBossBar(c,e,x,y,w,opts={}){
      if(!e||e.hp<=0)return;
      const r=record(e),hpRatio=clamp(e.hp/e.maxHp,0,1),lagRatio=clamp((r.hpLag||e.hp)/e.maxHp,hpRatio,1);
      const broken=e.anim?.state==='broken',poise=e.poise;
      const poiseRatio=poise?(broken?clamp(1-(e.anim.t||0)/2.5,0,1):clamp(poise.value/poise.max,0,1)):0;
      const h=poise?76:52,t=opts.time||0,reduced=!!opts.reduced;
      c.save();
      // Ornate lacquer panel with antique gold double trim
      const bg=c.createLinearGradient(x,y,x,y+h);
      bg.addColorStop(0,e.trueBoss?'rgba(28,16,40,0.94)':'rgba(19,24,32,0.93)');
      bg.addColorStop(1,e.trueBoss?'rgba(16,11,26,0.95)':'rgba(12,17,24,0.95)');
      c.fillStyle=bg;
      c.beginPath();c.roundRect(x,y,w,h,5);c.fill();
      c.strokeStyle=broken?'#d8adff':e.trueBoss?'#e8c474':'#c7a667';c.lineWidth=1.8;c.stroke();
      c.strokeStyle='rgba(255,232,178,0.28)';c.lineWidth=1;
      c.beginPath();c.roundRect(x+3,y+3,w-6,h-6,3);c.stroke();
      // Corner gold brackets
      const br=9;c.strokeStyle=broken?'#ffe6a2':'#f2d28a';c.lineWidth=2;
      for(const [cx,cy,sx,sy] of [[x+4,y+4,1,1],[x+w-4,y+4,-1,1],[x+4,y+h-4,1,-1],[x+w-4,y+h-4,-1,-1]]){
        c.beginPath();c.moveTo(cx,cy+sy*br);c.lineTo(cx,cy);c.lineTo(cx+sx*br,cy);c.stroke();
      }
      // Header: Boss name + subtitle + HP numeric
      const title=opts.title||e.name,sub=opts.sub||(e.trueBoss?'第 '+e.phase+' 阶段':e.affix||'镇守首领');
      c.textAlign='left';c.textBaseline='middle';
      c.font='700 18px "STKaiti","KaiTi",serif';c.fillStyle=e.trueBoss?'#f6dcff':'#ffefc4';
      c.fillText(title,x+18,y+18);
      const tw=c.measureText(title).width;
      c.font='600 12px "Microsoft YaHei",sans-serif';c.fillStyle=broken?'#e4c2ff':'#d7c39a';
      c.fillText('·  '+sub,x+24+tw,y+18);
      c.textAlign='right';
      c.font='600 13px "Microsoft YaHei",sans-serif';c.fillStyle='#ffe8bd';
      c.fillText(Math.ceil(e.hp)+' / '+Math.ceil(e.maxHp)+'  ('+Math.ceil(hpRatio*100)+'%)',x+w-18,y+18);
      // Upper HP bar with phase notches & trailing lag
      const bx=x+16,bw=w-32,hpY=y+31,hpH=12;
      c.fillStyle='#0d1218';c.fillRect(bx,hpY,bw,hpH);
      if(lagRatio>hpRatio){c.fillStyle='#f6d48a88';c.fillRect(bx+1,hpY+1,(bw-2)*lagRatio,hpH-2);}
      const hg=c.createLinearGradient(bx,hpY,bx,hpY+hpH);
      if(e.trueBoss){hg.addColorStop(0,'#e06896');hg.addColorStop(.5,'#a92d5c');hg.addColorStop(1,'#6d183b');}
      else{hg.addColorStop(0,'#f27b5c');hg.addColorStop(.5,'#c94034');hg.addColorStop(1,'#7d1f21');}
      c.fillStyle=hg;c.fillRect(bx+1,hpY+1,(bw-2)*hpRatio,hpH-2);
      c.fillStyle='rgba(255,244,218,0.28)';c.fillRect(bx+1,hpY+1,(bw-2)*hpRatio,3);
      // Phase threshold ticks (50% or 33%/66% for 3-phase Demon)
      const ticks=e.trueBoss?[.333,.667]:[.5];
      for(const tk of ticks){
        const tx=bx+bw*tk;
        c.fillStyle='#191216';c.fillRect(tx-1.5,hpY-1,3,hpH+2);
        c.fillStyle='#ffe29c';c.fillRect(tx-.5,hpY,1,hpH);
      }
      c.strokeStyle='#8e744c';c.lineWidth=1;c.strokeRect(bx,hpY,bw,hpH);
      // Lower Poise bar + crisp dedicated status caption below
      if(poise){
        const py=y+47,ph=9;
        c.fillStyle='#121018';c.fillRect(bx,py,bw,ph);
        const flash=broken&&!reduced?.78+.22*Math.sin(t*14):1;
        c.save();c.globalAlpha=flash;
        const pg=c.createLinearGradient(bx,py,bx+bw,py);
        if(broken){pg.addColorStop(0,'#c690ff');pg.addColorStop(.5,'#f0d4ff');pg.addColorStop(1,'#ffd97d');}
        else{pg.addColorStop(0,'#d49b38');pg.addColorStop(.5,'#ffe17d');pg.addColorStop(1,'#f2b548');}
        c.fillStyle=pg;c.fillRect(bx+1,py+1,(bw-2)*poiseRatio,ph-2);
        c.restore();
        c.strokeStyle=broken?'#d8adff':'#9a7f4e';c.lineWidth=1;c.strokeRect(bx,py,bw,ph);
        c.textAlign='center';c.font='700 12.5px "Microsoft YaHei",sans-serif';
        const pLabel=broken?'★ 破防虚弱 · 伤害 ×1.8 · 剩余 '+Math.max(0,2.5-(e.anim.t||0)).toFixed(1)+' 秒':'护体真气  '+Math.ceil(poiseRatio*100)+'%  ·  蓄力时以功法或末击破防';
        c.fillStyle=broken?'#f3d5ff':'#f7df9e';
        c.fillText(pLabel,x+w/2,y+66);
      }
      c.restore();
    }

    return {observe,ground,arrival,fallen,remnants,title,beforeBody,applyPose,afterBody,drawBossBar,styleFor};
  })();
  root.XiuxianEnemyVfx=EnemyVfx;
})(globalThis);
