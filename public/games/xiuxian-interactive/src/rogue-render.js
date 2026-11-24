(function(root){
  'use strict';
  const {width:w,height:h}=root.XiuxianRogue,D=root.XiuxianRogueData,A=root.XiuxianArt,V=root.XiuxianAvatar;
  const tau=2*Math.PI,plain={look:{weapon:root.XiuxianArmoryData.bases.starter_sword},worn:{},sets:{}};
  const blade=(c,x,y,a,len,color,size)=>V.blade(c,x,y,a+Math.PI/2,len,color,size);
  const grounds=[],paintedGrounds=[];
  function scenery(c,run,t){
    const stage=run.stage,[,name,atlas,col]=D.stages[stage];
    const painting=A.reborn[A.arenas[stage]];
    if(!painting&&!grounds[stage]&&A.images[atlas]?.naturalWidth){
      const img=document.createElement('canvas');img.width=w;img.height=h;const g=img.getContext('2d');
      g.drawImage(A.images[atlas],0,0,w,h);g.fillStyle=['#12363055','#0b1b494b','#3e101855','#152f4c3d','#1d0e3a68'][stage];g.fillRect(0,0,w,h);
      if(stage===1||stage===2){
        for(const x of [80,w-80])for(const y of [94,h-64]){
          const tint=stage===1?'#639dff':'#ff813e';aura(g,x,y,65,tint);
          if(stage===2){V.line(g,[[x,y-53],[x,y-17]],'#b69a76',2);V.oval(g,x,y-6,9,15,'#b94f34',1,true);}
          V.poly(g,[[x-6,y+3],[x-7,y-8],[x-1,y-19],[x+1,y-11],[x+6,y-17],[x+7,y]],stage===1?'#9cd8ff':'#ffd783');
        }
      }
      if(stage===3){
        for(let i=0;i<24;i++){const x=i*w/20-65,y=i%2?h-7:31;const mist=g.createRadialGradient(x,y,2,x,y,105);
          mist.addColorStop(0,'#bfdcea80');mist.addColorStop(1,'#aedaff00');g.fillStyle=mist;g.fillRect(x-105,y-105,210,210);}
      }
      if(stage===4){
        const nebula=g.createLinearGradient(0,h,w,0);
        for(const [p,col] of [[0,'#141532bb'],[.37,'#2c255e88'],[.51,'#755b9f85'],[.64,'#252149aa'],[1,'#15152ddd']])nebula.addColorStop(p,col);
        g.fillStyle=nebula;g.fillRect(0,0,w,h);
        for(let i=0;i<350;i++){const x=(i*73.7)%w,y=i%2?(h-x*.43+Math.sin(i*1.83)*65+h)%h:(i*41.2)%h;
          g.fillStyle=i%6?'#d6d6ef88':'#f2d0ff';g.fillRect(x,y,i%6?1.4:2.5,i%6?1.4:2.5);}
        for(const s of [-1,1]){const x=s<0?0:w,k=-s;V.line(g,[[x,205],[x+49*k,222],[x+83*k,206],[x+108*k,225],[x+156*k,219]],'#c99afb9e',2);}
      }
      g.save();g.translate(w/2,h*.56);g.scale(1,.64);g.strokeStyle=col+'70';g.lineWidth=2;
      for(const r of [139,145,206]){g.beginPath();g.arc(0,0,r,0,tau);g.stroke();}
      const sides=stage+3;g.beginPath();for(let i=0;i<=sides;i++){const a=i*tau/sides;g.lineTo(Math.sin(a)*206,Math.cos(a)*206);}g.stroke();g.restore();grounds[stage]=img;
    }
    if(painting){
      c.drawImage(painting,0,0,w,h);
      if(!paintedGrounds[stage]){
        const tile=document.createElement('canvas');tile.width=w;tile.height=h;
        const g=tile.getContext('2d'),shade=g.createRadialGradient(w/2,h/2,h*.38,w/2,h/2,w*.57);
        shade.addColorStop(0,'#10192600');shade.addColorStop(1,'#10192647');
        g.fillStyle=shade;g.fillRect(0,0,w,h);paintedGrounds[stage]=tile;
      }
      c.drawImage(paintedGrounds[stage],0,0);
    }else if(grounds[stage])c.drawImage(grounds[stage],0,0);else{c.fillStyle='#172c38';c.fillRect(0,0,w,h);}
    c.save();c.fillStyle=col+'aa';c.strokeStyle=col+'85';
    for(let i=0;i<30;i++){const x=(i*137+t*(stage===3?21:8))%w,y=(i*71+(stage===0?38:9)*t)%h;
      if(stage===0||stage===3){c.beginPath();c.moveTo(x,y);c.lineTo(x+(stage===0?-4:28),y+(stage===0?11:-2));c.stroke();}
      else{c.beginPath();c.ellipse(x,y,stage===2?2:1.5,stage===1||stage===2?4:1.5,0,0,tau);c.fill();}}
    c.restore();
    const d=run.device;if(!d)return;
    aura(c,d.x,d.y,56,col);V.oval(c,d.x,d.y,48,48,'#131e28',4);V.oval(c,d.x,d.y,48,48,col,2);
    sprite(c,'trialAtlas',8+stage,d.x,d.y+8,43);c.font='bold 15px "Microsoft YaHei",sans-serif';c.textAlign='center';c.lineWidth=4;c.strokeStyle='#111a21';c.fillStyle='#fff2c5';c.strokeText(name,d.x,d.y-37);c.fillText(name,d.x,d.y-37);if(Math.hypot(run.p.x-d.x,run.p.y-d.y)<150){const hint=['驻足三秒','靠近或点击','点按击破','踏入御风','踏阵落星'][stage];c.font='bold 13px sans-serif';c.strokeText(hint,d.x,d.y+25);c.fillText(hint,d.x,d.y+25);}c.textAlign='start';
  }
  const silhouettes=['wolf','cultist','golem','spider','bomber','summoner','bladeShadow','goldToad'];
  const foeKeys=['wolf','cultist','golem','spider','bomber','summoner','blade','toad'].map(id=>'foe-'+id);
  const bossKeys=[null,null,'boss-moon','boss-demon','boss-sovereign'];
  const heights=[63,71,90,69,58,82,75,65];
  const summons={puppet:[13,34],mirror:[14,58],orb:[15,35]};
  const bossArt=[['constructActions',12],['wangActions',0],['campaignNightmare',0],['campaignCaptain',0],['m4Xuanji',0]];
  function enemy(c,e,t,p,reduced,ghost=false){
    const x=e.x,y=e.y,evfx=root.XiuxianEnemyVfx;
    const index=e.boss?-1:silhouettes.indexOf(e.kind);
    const [cell,size]=e.boss?[0,135+5*e.type]:index>=0?[index,e.elite?Math.max(82+index*2,heights[index]):heights[index]]:summons[e.kind];
    if(!ghost)evfx.ground(c,e,size,t,reduced);
    if(!ghost&&evfx&&e.anim)evfx.beforeBody(c,e,size,t,reduced);
    if(e.elite||e.shield>0||e.kind==='goldToad')V.oval(c,x,y-18,27,29,e.shield?'#d6aeff':'#ffd783',2);
    c.save();
    if(!ghost)evfx.arrival(c,e,t,reduced);
    if(!ghost&&evfx&&e.anim)evfx.applyPose(c,e,size,t,reduced);
    if(e.boss){
      if(!A.drawRebornFoe(c,bossKeys[e.type],x,y+3,size,x<p.x,!reduced&&e.flash)){
        const [atlas,bcell]=bossArt[e.type];sprite(c,atlas,bcell,x,y+8,size,x>p.x);
      }
    }
    else{
      const stride=ghost||reduced||e.frozen>0||e.windup>0?0:Math.sin(t*(e.dash>0?18:7)+e.id)*.8;
      if(e.kind==='goldToad')aura(c,x,y-17,35,'#ffc34d');
      if(!A.drawRebornFoe(c,foeKeys[index],x,y+3+stride,size,x<p.x,!reduced&&e.flash))
        sprite(c,'trialAtlas',cell,x,y+7+stride,size,e.kind==='goldToad'?x<p.x:x>p.x);
    }
    c.restore();
    if(!ghost&&evfx&&e.anim)evfx.afterBody(c,e,size,t,reduced);
    if(e.frozen>0)V.poly(c,[[x,y-47],[x+22,y-8],[x+5,y+6],[x-18,y+2]],'#9ee6ff58','#b8edff');
  }
  function danger(c,z,t){
    const prog=z.delay>0?Math.min(1,Math.max(0,z.time/z.delay)):1;
    root.XiuxianHazardGeo.draw(c,root.XiuxianRogueFoes.geometry(z),z.time-z.delay,prog,t);
  }
  const xie=new Image();xie.src='assets/sect-art/art-summit-xie-guanlan-figure.webp';
  function sprite(c,atlas,cell,x,y,height,flip=false){
    const img=A.images[atlas],rect=A[atlas][cell];if(!img?.naturalWidth)return;
    const width=height*rect[2]/rect[3];c.save();c.translate(x,y);if(flip)c.scale(-1,1);
    c.drawImage(img,...rect,-width/2,-height,width,height);c.restore();
  }
  function aura(c,x,y,r,color){
    const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color+'aa');g.addColorStop(.55,color+'44');g.addColorStop(1,color+'00');
    c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);
  }
  function phoenix(c,x,y,t){
    c.save();c.translate(x,y);const flap=Math.sin(t*10)*11;
    for(const side of [-1,1]){
      c.save();c.scale(side,1);
      for(let i=0;i<6;i++)V.poly(c,[[0,0],[24,-14],[67-i*6,-35+flap+i*8],[27,7+i],[4,8]],i%2?'#ffbf56':'#ed6744','#ffdb8f');
      c.restore();
    }
    for(let i=0;i<3;i++)V.line(c,[[0,0],[10-i*9,22],[20-i*14,40+Math.sin(t+i)*8]],'#ffb55d',3);
    V.poly(c,[[-7,2],[0,-23],[5,-28],[13,-22],[6,-19],[5,5],[0,12]],'#ffd483','#fff2bc');c.restore();
  }
  function effect(c,e,t){
    const f=e.life/e.max,q=1-f;c.save();c.globalAlpha=Math.min(1,3*f);
    if(e.type==='star'||e.type==='burst'){const r=Math.max(3,(e.r||68)*q),color=e.color||'#f1ccff';aura(c,e.x,e.y,r,color);V.oval(c,e.x,e.y,r,r*.73,color,3);
      if(e.treasure){for(let i=0;i<28;i++){const a=i*2.39996,travel=q*(37+i%7*13);const x=e.x+Math.cos(a)*travel,y=e.y+Math.sin(a)*travel*.72-30*Math.sin(q*Math.PI);V.poly(c,[[x,y-4],[x+2.5,y],[x,y+4],[x-2.5,y]],i%2?'#ffe48a':'#ffa74e');}}
      if(e.to){V.line(c,[[e.x,e.y],[e.to.x,e.to.y]],color,3);V.oval(c,e.x,e.y,8,7,'#f9e8ba',2,true);}
    }else if(e.type==='storm'||e.type==='slash'){
      const points=[[e.x,e.y]],to=e.to,n=e.type==='storm'?10:1;
      for(let i=1;i<=n;i++){const s=i/n,wiggle=i===n?0:Math.sin(i*8.2+e.x+Math.floor(t*12))*12;
        points.push([e.x+(to.x-e.x)*s+wiggle,e.y+(to.y-e.y)*s-wiggle*.45]);}
      V.line(c,points,e.type==='slash'?'#82e5be':'#7956d9',e.ult?13:7);V.line(c,points,'#eee6ff',e.ult?4:2);
      V.oval(c,to.x,to.y,12+q*28,5+q*12,'#c7afff',2);
    }else if(e.type==='bell'||e.type==='blizzard'){
      const frozen=e.type==='blizzard',r=Math.max(2,(e.r||1150)*q);
      for(let i=0;i<3;i++)V.oval(c,e.x,e.y,Math.max(1,r-i*9),Math.max(1,r-i*9),frozen?'#baf5ff':'#ffdb8a',3-i*.7);
      if(frozen){c.fillStyle='#9ddaff19';c.fillRect(0,0,w,h);for(let i=0;i<36;i++){const x=(i*177+q*26)%w,y=(i*73+q*54)%h;V.poly(c,[[x,y-7],[x+3,y],[x,y+7],[x-3,y]],'#c7f3ff');}}
      else if(e.ult){c.save();c.translate(e.x,e.y);c.rotate(t*.6);for(let i=0;i<8;i++){c.rotate(tau/8);V.line(c,[[-7,-r],[7,-r]],'#fff0b5',4);}c.restore();}
    }else if(e.type==='phoenix'){
      const a=e.angle+q*tau;phoenix(c,w/2+Math.cos(a)*w*.39,h/2+Math.sin(a)*h*.36,t);
    }else if(e.type==='shard'){for(let i=0;i<6;i++){const a=i*tau/6;blade(c,e.x+Math.cos(a)*q*40,e.y+Math.sin(a)*q*40,a,12,'#b4ebff',2);}}
    else if(e.type==='after'){c.globalAlpha=f*.42;sprite(c,'characters',1,e.x,e.y+8,55);}
    c.restore();
  }
  function paint(canvas,run,reduced=false){
    const c=canvas.getContext('2d'),p=run.p,t=reduced?0:run.age;
    const fx=root.XiuxianEnemyVfx?root.XiuxianEnemyVfx.observe(run,run.monsters,run.age,reduced):{hitStop:false,shakeX:0,shakeY:0};
    if(fx.hitStop)return;
    c.save();
    if(fx.shakeX||fx.shakeY)c.translate(fx.shakeX,fx.shakeY);
    scenery(c,run,t);
    for(const f of run.fields){
      const color=f.kind==='herb'?'#a9efa5':f.kind==='board'?'#ffe9ba':run.active('tempest')?'#c39aff':'#93f5dc';
      if(f.kind==='board'){for(let i=0;i<9;i++){V.line(c,[[i*w/8,0],[i*w/8,h]],color+'80',2);V.line(c,[[0,i*h/8],[w,i*h/8]],color+'80',2);}}
      else {aura(c,f.x,f.y,f.r,color);for(let i=0;i<4;i++){let r=f.r*(.35+i*.17);V.oval(c,f.x+Math.sin(t*5+i)*7,f.y-i*5,r,r*.55,color+'b0',2);}}
    }
    if(run.linkTime>0){let prev=run.p;for(const e of run.linked)if(e.hp>0){V.line(c,[[prev.x,prev.y-12],[e.x,e.y-12]],'#ffe4a3',3);prev=e;}}

    for(const zone of run.pools){
      c.save();c.globalAlpha=Math.min(.8,zone.life);aura(c,zone.x,zone.y,zone.r,'#ff7933');
      V.oval(c,zone.x,zone.y,zone.r*.8,zone.r*.68,'#ffad5e84',2);
      for(let i=0;i<5;i++){const a=t*2+i*tau/5,x=zone.x+Math.cos(a)*zone.r*.56,y=zone.y+Math.sin(a)*zone.r*.5;V.poly(c,[[x-3,y],[x+1,y-9-i],[x+4,y]],'#ffd37b');}c.restore();
    }
    for(const o of run.orbs){
      const y=o.y+Math.sin(t*4+o.x)*2;V.oval(c,o.x,y,7,7,'#5cefca33',1,true);
      V.oval(c,o.x,y,4.2,4.2,'#52dfac',1,true);V.oval(c,o.x,y,4.2,4.2,'#caffd9',1.2);V.oval(c,o.x-1,y-1.5,1.1,1.1,'#ffffff',1,true);
    }
    root.XiuxianEnemyVfx.remnants(c,run,run.age,reduced,e=>enemy(c,e,t,p,reduced,true));
    for(const e of [...run.monsters].filter(e=>e.hp>0).sort((a,b)=>a.y-b.y))enemy(c,e,t,p,reduced);
    if(run.evolved.sword){for(let i=0;i<12;i++){const a=i*tau/12+t;blade(c,p.x+Math.cos(a)*74,p.y-22+Math.sin(a)*46,a+.9,33,'hsl('+i*30+' 85% 76%)',3);}}
    for(const s of run.shots){
      const x=s.x,y=s.y-9,a=Math.atan2(s.dy,s.dx),col=s.ultimate&&s.id==='sword'?'hsl('+Math.floor((a+Math.PI)*55)+' 85% 78%)':D.families[s.id]?.color||'#ebefcf';
      if(s.id==='ghost'){c.save();c.globalAlpha=.85;sprite(c,'spiritActions',12+s.hit.size%4,x,y+8,s.ultimate?46:28,s.dx<0);c.restore();V.line(c,[[x-s.dx*25,y-s.dy*25],[x,y]],'#dcb6e5aa',2);}
      else if(s.id==='fire'){aura(c,x,y,20,'#ff8047');V.oval(c,x,y,9,9,'#ffd489',3);}
      else{V.line(c,[[x-s.dx*(s.ultimate?95:24),y-s.dy*(s.ultimate?95:24)],[x,y]],col,s.ultimate?3:1.5);blade(c,x,y,a,s.ultimate?43:s.id==='basic'?12:24,col,s.ultimate?4:2);}
    }
    for(const e of run.fx)if(!reduced||e.type!=='after')effect(c,e,t);
    for(const e of run.monsters)if(e.hp>0&&e.poise){c.fillStyle='#302530';c.fillRect(e.x-23,e.y+8,46,5);c.fillStyle='#ffab87';c.fillRect(e.x-22,e.y+9,44*e.hp/e.maxHp,3);root.XiuxianPoise.bar(c,e,e.x-23,e.y+14,46);}
    for(const e of run.monsters)if(!e.poise&&e.flash>0&&e.hp>0){const x=e.x-16,y=e.y+7;c.fillStyle='#17232a';c.fillRect(x,y,32,6);c.fillStyle='#ffd89b';c.fillRect(x+1,y+1,30*e.hp/e.maxHp,4);}
    // Keep the silhouette legible through overlapping player attacks. Enemy tells are painted last.
    V.oval(c,p.x,p.y+4,18,6,'#182626',2,true);V.oval(c,p.x,p.y+4,19,6,'#f7e7a7',1.6);
    const gear=run.store.summary(),hero=run.avatar;
    if(!reduced&&run.dashTime>0){
      const [atlas,cell]=({shen:['characters',8],ning:['chapterPeople',2],yun:['sectPeople',0],xie:['xie',0]})[hero]||['characters',1];
      V.dashEcho(c,atlas,cell,p.x,p.y+8,60,run.face,gear.look.robe?.style,(.2-run.dashTime)*16,hero==='xie'?xie:null);
    }
    c.save();c.shadowColor='#222538';c.shadowBlur=3;
    if(run.avatar==='lin'||run.avatar==='demon'){
      if(run.avatar==='demon'){aura(c,p.x,p.y-23,36,'#a64365');c.filter='sepia(.6) hue-rotate(292deg)';}
      V.draw(c,{x:p.x,y:p.y+8,height:60,cell:run.moving?1+Math.floor(t*8)%2:0,flip:run.face.x<0,time:t,moving:run.moving,reduced,swing:Math.max(0,1-(run.age-(run.swingAt??-1))/.30),summary:gear.look.weapon?gear:{...gear,look:{...gear.look,weapon:plain.look.weapon}}});
    }else if(run.avatar==='xie'){
      const img=xie;if(img.complete&&img.naturalWidth)c.drawImage(img,p.x-20,p.y-60,40,68);
    }else{const [atlas,cell]=({shen:['characters',8],ning:['chapterPeople',2],yun:['sectPeople',0]})[run.avatar];sprite(c,atlas,cell,p.x,p.y+6,63,run.face.x<0);}
    c.restore();
    if(run.ward||run.barrier>0||run.invul>0)V.oval(c,p.x,p.y-17,25,32,run.ward?'#ffe29d':'#c1f1e0',2);
    for(const b of run.bolts){if(b.delay>0)continue;if(b.blade)blade(c,b.x,b.y,Math.atan2(b.dy,b.dx),19,'#ff996e',3);V.oval(c,b.x,b.y,7,7,'#502322',1,true);V.oval(c,b.x,b.y,5,5,'#ffad81',2);}
    root.XiuxianEnemyVfx.title(c,run,run.age,w,125,reduced);
    for(const z of run.hazards)danger(c,z,t);
    c.restore();
  }
  root.XiuxianRogueRender={paint};
})(globalThis);
