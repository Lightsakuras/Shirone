(function(root){
  'use strict';
  const A=root.XiuxianArt,D=root.XiuxianArmoryData,tau=2*Math.PI,samples={},cache=new Map();
  const palettes={
    lotus:['#143d35','#53b594','#e7d48e'],thunder:['#231e49','#8873c4','#d4c0ff'],flame:['#581d2b','#d54b44','#ffd782'],
    frost:['#142f4c','#5c9bb4','#c8f2ff'],star:['#22203b','#7361ac','#ead596'],emperor:['#111625','#41395e','#edc367'],
    sunset:['#580d27','#e44955','#ffca71'],jade:['#84ada0','#fff9de','#469f8b'],glacier:['#10263a','#416285','#b6f3ff']
  };
  const rgb=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
  const offline=location.protocol==='file:';
  const ready=offline?Promise.all(Object.entries(root.XiuxianAvatarSamples).flatMap(([key,frames])=>frames.map((data,i)=>{
    const img=new Image();samples[key+i]=img;img.src='data:image/webp;base64,'+data;return img.decode();
  }))):Promise.resolve();
  function robeFrame(atlas,cell,style){
    const key=atlas+':'+cell+':'+style,found=cache.get(key);
    if(found){cache.delete(key);cache.set(key,found);return found;}
    const image=A.images[atlas],rect=A[atlas]?.[cell],p=palettes[style];if(!image?.naturalWidth||!rect||!p)return null;
    const [sx,sy,w,h]=rect,ref=samples[atlas+cell];if(offline&&!ref?.naturalWidth)return null;
    const layer=document.createElement('canvas');layer.height=offline?ref.height:h;layer.width=offline?ref.width:w;
    const ctx=layer.getContext('2d',{willReadFrequently:true});
    if(offline)ctx.drawImage(ref,0,0);else ctx.drawImage(image,sx,sy,w,h,0,0,w,h);
    const pixels=ctx.getImageData(0,0,layer.width,layer.height),data=pixels.data,colors=p.map(rgb);
    for(let i=0;i<data.length;i+=4){
      const x=(i/4%layer.width)/layer.width,y=Math.floor(i/4/layer.width)/layer.height;
      const max=Math.max(data[i],data[i+1],data[i+2])/255,min=Math.min(data[i],data[i+1],data[i+2])/255;
      const light=(max+min)/2,sat=(max-min)/(1-Math.abs(2*light-1)||1);
      if(!data[i+3]||y<=.28||light<=.62||sat>=.22){data[i+3]=0;continue;}
      const trim=(y>.89&&y<.915)||(Math.abs(x-.5)>.29&&Math.cos(21*y+4*x)>.974);
      const tone=Math.min(1,Math.max(0,(light-.62)/.38+.06*Math.sin(46*x+12*y)));
      for(let ch=0;ch<3;ch++)data[i+ch]=trim?colors[2][ch]:colors[0][ch]*(1-tone)+colors[1][ch]*tone;
    }
    ctx.putImageData(pixels,0,0);cache.set(key,layer);if(cache.size>80)cache.delete(cache.keys().next().value);return layer;
  }
  function line(c,pts,color,width){
    c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.strokeStyle=color;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.stroke();
  }
  function poly(c,pts,fill,stroke){c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.8;c.stroke();}}
  function oval(c,x,y,rx,ry,col,w=1,fill=false){
    c.beginPath();c.ellipse(x,y,rx,ry,0,0,tau);if(fill){c.fillStyle=col;c.fill();}else{c.strokeStyle=col;c.lineWidth=w;c.stroke();}
  }
  function blade(c,x,y,angle,len,color,width=3){
    c.save();c.translate(x,y);c.rotate(angle);const edge=c.createLinearGradient(-width,0,width,0);edge.addColorStop(0,'#29464f');edge.addColorStop(.48,color);edge.addColorStop(.55,'#fff6cf');edge.addColorStop(1,color);
    poly(c,[[-width,-2],[-width*.72,-len*.82],[0,-len],[width,-len*.72],[width*.72,0],[0,3]],edge,'#685536');
    line(c,[[-width*1.9,-1],[0,1],[width*1.9,-1]],'#e5bd6d',2);line(c,[[0,1],[0,7]],'#604131',2.5);c.restore();
  }
  function footprint(c,x,y,style,t,base){
    c.save();c.translate(x,y);c.globalAlpha*=.75;
    const color=(palettes[style]||palettes.frost)[2];
    if(style==='thunder'){
      for(let i=0;i<3;i++){const x=-11+i*6,y=Math.sin(t*7+i)*2;line(c,[[x,3],[x+4,-3+y],[x+5,1],[x+12,-6+y]],i===1?'#e5deff':'#969bff',i===1?1.7:1);}
    }
    else if(style==='flame')for(let i=0;i<5;i++)poly(c,[[i*3-8,1],[i*3-7,-3-i%3*3],[i*3-5,0]],i%2?'#ffcc7a':'#ff8759');
    else if(style==='lotus'){for(let i=0;i<5;i++){c.save();c.scale(1,.55);c.rotate(i*tau/5);poly(c,[[0,1],[-3,-5],[0,-13],[4,-5]],'#81c6ab',color);c.restore();}}
    else for(let i=0;i<3;i++){c.save();c.rotate(i*Math.PI/3);line(c,[[-8,0],[8,0]],color,1.3);c.restore();}
    if(base==='lotus_steps'){for(let i=0;i<6;i++){c.save();c.scale(1,.52);c.rotate(i*tau/6+.35);poly(c,[[0,-2],[-2.5,-7],[0,-15],[2.5,-7]],'#5cbeaa88','#efd39e');c.restore();}oval(c,0,2,16+t*7,5+t*3,'#e5c97caa');}
    if(base==='storm_steps'){line(c,[[-14,4],[-7,-3],[-4,0],[-8,3],[4,-3],[9,-1],[15,-8]],'#e0ceff',1.4);}
    if(base==='ember_steps'){for(let i=0;i<7;i++){const a=i*2.4;oval(c,Math.cos(a)*(8+t*9),Math.sin(a)*4-t*8,1.1,1.4,i%2?'#ffab72':'#ffe3a1',1,true);}}
    oval(c,0,2,12+t*4,4+t*2,color);c.restore();
  }
  function back(c,b,t,moving){
    if(!b)return;const swing=Math.sin(t*2)*3+(moving?6:0);
    if(b.style==='wings'){c.save();c.globalAlpha*=.88;for(let i=0;i<9;i++){let a=(i-4)*.32;blade(c,Math.sin(a)*13,-43-Math.cos(a)*5,a+Math.sin(t+i)*.035,51-Math.abs(i-4)*2,'#88e4cd',3.4);}c.restore();return;}
    if(b.id==='dao_halo'){
      c.save();c.translate(0,-53);
      // Ethereal cosmic-violet & celestial gold radial radiance
      const aura=c.createRadialGradient(0,0,12,0,0,58);
      aura.addColorStop(0,'rgba(255,238,186,0.28)');
      aura.addColorStop(.52,'rgba(182,132,248,0.22)');
      aura.addColorStop(1,'rgba(120,76,204,0)');
      c.fillStyle=aura;c.beginPath();c.arc(0,0,58,0,tau);c.fill();
      // Triple concentric celestial rings
      oval(c,0,0,49,49,'#ffe8ad',2.6);
      oval(c,0,0,43,43,'#d7b4ff',1.8);
      oval(c,0,0,35,35,'#f4cf7e88',1.1);
      // Outer counter-rotating celestial stardust arcs & 8 Bagua trigrams
      c.save();c.rotate(-t*.18);
      c.strokeStyle='#f3d8ffaa';c.lineWidth=1.4;c.setLineDash([7,9]);
      c.beginPath();c.arc(0,0,46,0,tau);c.stroke();c.setLineDash([]);
      for(let i=0;i<8;i++){
        c.save();c.rotate(i*tau/8);
        for(let row=0;row<3;row++){
          const ry=-39+row*2.2;
          if(i&(1<<row))line(c,[[-4.5,ry],[4.5,ry]],'#ffedb8',1.2);
          else{line(c,[[-4.5,ry],[-1,ry]],'#ffedb8',1.2);line(c,[[1,ry],[4.5,ry]],'#ffedb8',1.2);}
        }
        c.restore();
      }
      c.restore();
      // 12 ornate floating lotus-sword talisman blades + orbiting stardust motes
      c.save();c.rotate(t*.28);
      for(let i=0;i<12;i++){
        c.rotate(tau/12);
        const major=i%3===0;
        poly(c,major?[[0,-57],[4,-48],[0,-42],[-4,-48]]:[[0,-53],[2.8,-47],[0,-42],[-2.8,-47]],major?'#fff1bd':'#ddb9ff',major?'#d69e42':'#7a56a8');
        if(major)oval(c,0,-59,1.8,1.8,'#fff8dc',1,true);
      }
      c.restore();
      c.restore();return;
    }
    if(b.style==='wheel'){
      c.save();c.translate(0,-59);c.rotate(t*.3);oval(c,0,0,34,34,'#fee299',2);oval(c,0,0,29,29,'#b68b63');
      for(let i=0;i<8;i++){c.rotate(tau/8);for(let row=0;row<3;row++){const y=-29+row*2.5;if(i&(1<<row)){line(c,[[-5,y],[5,y]],'#ffe4a4',1.3);}else{line(c,[[-5,y],[-1,y]],'#ffe4a4',1.3);line(c,[[1,y],[5,y]],'#ffe4a4',1.3);}}oval(c,0,-35,2,2,'#edf0ff',1,true);}c.restore();return;
    }
    for(const side of [-1,1]){
      c.save();c.scale(side,1);const col=(palettes[b.style]||palettes.thunder);
      if(b.style==='phoenix'){for(let i=0;i<5;i++){const p=(t*.55+i*.21)%1,x=26+i*4+Math.sin(t+i)*3,y=-47-p*44;poly(c,[[x-2,y],[x+1,y-8],[x+3,y-2],[x+1,y+2]],i%2?'#d6a3ef':'#ffc17e');}for(let i=0;i<8;i++){
          const tx=51-i*2.7,ty=-86+i*8+swing,feather=c.createLinearGradient(9,-51,tx,ty);
          feather.addColorStop(0,'#251732');feather.addColorStop(.65,i%2?'#6b3c7e':'#8e4665');feather.addColorStop(1,'#ecac76');
          c.beginPath();c.moveTo(7,-49);c.bezierCurveTo(16,-66,tx-7,ty+5,tx,ty);
          c.bezierCurveTo(tx-2,ty+12,21,-43+i*.8,7,-49);c.fillStyle=feather;c.fill();
          c.beginPath();c.moveTo(11,-51);c.quadraticCurveTo(26,-57+i*.5,tx-2,ty+2);c.strokeStyle='#d793688c';c.lineWidth=.7;c.stroke();
        }}
      else{const cloth=c.createLinearGradient(5,-62,28,-12);cloth.addColorStop(0,col[0]);cloth.addColorStop(.5,col[1]);cloth.addColorStop(1,col[0]);
        c.beginPath();c.moveTo(3,-73);c.bezierCurveTo(27,-70,16+swing,-35,30+swing,-13);c.quadraticCurveTo(18,-21,10+swing,-5);c.lineTo(3,-51);c.fillStyle=cloth;c.fill();c.strokeStyle=col[2];c.lineWidth=1;c.stroke();}
      c.restore();
    }
  }
  const echoCache=new Map();
  function dashEcho(c,atlas,cell,x,y,height,face,style,progress=1,figure=null){
    const img=figure||A.images[atlas],rect=figure?[0,0,img.naturalWidth,img.naturalHeight]:A[atlas]?.[cell];if(!rect||!img?.naturalWidth)return;
    const tint=palettes[style]||['#284b4c','#a4d6c8','#deeee0'];
    const key=atlas+cell+tint[1];
    let mask=echoCache.get(key);
    if(!mask){
      mask=document.createElement('canvas');mask.height=96;mask.width=Math.round(96*rect[2]/rect[3]);
      const m=mask.getContext('2d');m.drawImage(img,...rect,0,0,mask.width,96);
      m.globalCompositeOperation='source-in';
      const grad=m.createLinearGradient(0,0,mask.width,96);
      grad.addColorStop(0,tint[2]);grad.addColorStop(.48,tint[1]);grad.addColorStop(1,tint[0]);
      m.fillStyle=grad;m.fillRect(0,0,mask.width,96);
      if(echoCache.size>=64)echoCache.delete(echoCache.keys().next().value);echoCache.set(key,mask);
    }
    const w=height*mask.width/96;
    for(let i=3;i>=1;i--){
      const d=i*height*.21*Math.min(1,progress);
      c.save();c.translate(x-face.x*d,y-face.y*d);if(face.x<0)c.scale(-1,1);
      c.globalAlpha*=(4-i)*.15;c.drawImage(mask,-w/2,-height,w,height);c.restore();
    }
  }
  function ribbon(c,angle,length,color,power){
    c.save();c.rotate(angle);
    const spread=Math.min(1,Math.abs(power))*1.55+.2,r=length;
    const g=c.createLinearGradient(-r,-r*.3,0,-r);
    g.addColorStop(0,color+'00');g.addColorStop(.72,color+'78');g.addColorStop(1,color+'e8');
    c.fillStyle=g;c.beginPath();c.moveTo(0,-r);
    c.arc(0,0,r,-Math.PI/2,-Math.PI/2-spread,true);
    c.quadraticCurveTo(-r*.53,-r*.74,0,-r*.83);c.closePath();c.fill();
    c.strokeStyle=color;c.lineWidth=1.3;c.beginPath();c.arc(0,0,r,-Math.PI/2-spread*.58,-Math.PI/2);c.stroke();c.restore();
  }
  function weapon(c,b,t,level,swing,flight=0,edge=null){
    if(!b)return;const school=b.school,col=D.weapons[school][4],ancient=b.style==='ancient',length=ancient?53:42;
    c.save();c.translate(14,-39);const glow=level>=15?3:level>=10?2:level>=6?1:0;
    if(ancient){
      if(school==='ice'||school==='swarm')c.scale(1.34,1.34);
      if(school==='storm')for(const side of [-1,1])poly(c,[[side,-length+4],[side*8,-length-2],[side*11,-length-16],[side*6,-length-7]],'#a58ada','#ffe8a1');
      if(school==='fire')for(let i=0;i<3;i++)line(c,[[i*4,-length+9],[12+i*4,-length+24],[9+i*5+Math.sin(t*3+i)*3,-length+35+i]],i%2?'#ffda8a':'#ea8060',1.9);
      if(school==='sword'){c.save();c.rotate(.55+Math.sin(t*2)*.07+swing*1.8);for(let i=0;i<3;i++)oval(c,0,-12-i*11,4-i*.7,2,'#ffcc75',1.1);c.restore();}
    }
    if(glow){c.shadowColor=col;c.shadowBlur=glow*3;}
    const angle=.55+Math.sin(t*2)*.07+swing*1.8;
    if(edge&&Math.abs(swing)>.02)ribbon(c,angle,length,edge,swing);
    if(school==='sword')blade(c,0,0,angle,length,col,ancient?4:2.8);
    if(school==='storm'||school==='fire'){
      c.rotate(angle*.4);line(c,[[-1,17],[0,-length]],'#462b29',4);line(c,[[0,13],[1,-length]],'#e7c184',1.5);
      if(school==='storm'){poly(c,[[-7,-length-3],[0,-length-14],[7,-length-3],[0,-length+5]],'#ac89ec','#fff3ff');line(c,[[-8,-length],[1,-length-6],[-1,-length+1],[8,-length-3]],'#f5dfff',1.5);}
      else{poly(c,[[0,-length],[18,-length+2],[24+Math.sin(t*5)*4,-length+27],[9,-length+17],[0,-length+18]],'#b93b31','#ffce76');line(c,[[4,-length+5],[12,-length+12],[8,-length+11],[16,-length+20]],'#ffda80',1.6);}
    }
    if(school==='ice'){c.translate(14,-10+Math.sin(t*2)*3);c.rotate(t*1.8);oval(c,0,0,11,11,col,2);for(let i=0;i<6;i++){c.rotate(tau/6);poly(c,[[0,-8],[2,-18],[6,-20],[5,-10]],'#a1e5f2','#fff');}}
    if(school==='swarm'){
      c.save();c.rotate(-.4);poly(c,[[-17,-25],[-9,-26],[-8,6],[-16,9]],'#644434','#e1b36d');c.restore();
      const n=3+Math.min(4,Math.floor(level/3));for(let i=0;i<n;i++){const a=t*1.5+i*tau/n,reach=(i===0?flight:0)*25;blade(c,-14+Math.cos(a)*(29+reach),-4+Math.sin(a)*16,.4+Math.cos(a)*.55,19,col,1.7);}
    }
    if(glow>=2){for(let i=0;i<glow*3;i++){const a=i*2.4+t,p=(t*.8+i*.17)%1;oval(c,Math.sin(a)*(7+6*p)+p*15,-p*length,1,1,glow===3?'hsl('+((i*43+t*80)%360)+' 95% 78%)':col,1,true);}}
    if(glow===3){
      const trail=['#ff8968','#ffc566','#fff29c','#9ce3b4','#89e0ed','#a2b4ff','#e9adf2'];
      c.shadowBlur=0;
      if(school==='sword')c.rotate(angle);
      for(let i=0;i<trail.length;i++){
        const q=i/6;c.beginPath();
        if(school==='ice'){
          c.arc(0,0,16+q*3,t+i*.62,t+i*.62+1.35);
        }else if(school==='swarm'){
          c.ellipse(-14,-6,30+q*3,14+q*3,0,t*1.5+i*.84-.75,t*1.5+i*.84);
        }else if(school==='sword'){
          c.moveTo(0,-length);c.quadraticCurveTo(3+q*8,-length+8,4+q*13,-length+21+q*4);
        }else if(school==='storm'){
          const a=t*2+i*.88;c.ellipse(0,-length-5,8+q*3,6+q*3,-.4,a,a+1.4);
        }else{
          const x=13+q*5;c.moveTo(x,-length+6+q*4);c.quadraticCurveTo(23+q*5,-length+19,20+q*6+Math.sin(t*3+q)*3,-length+31);
        }
        c.strokeStyle=trail[i]+'cf';c.lineWidth=1.2;c.stroke();
      }
    }
    c.restore();
  }
  // Grip and tip are measured in the cropped atlas frame. Only the exposed blade
  // below the fingers is removed. Action frames with crossed sleeves use the plain stance for casting.
  const grips=[[.32,.61,.00,.94],[.31,.59,.00,.92],[.30,.60,.00,.94],[.76,.60,.99,.92],
    [.29,.61,.00,.94],[.28,.57,.00,.92],[.29,.60,.00,.93],[.76,.61,.99,.90]];
  function bareBody(c,img,rect,box,atlas,cell){
    const grip=atlas==='characters'?grips[cell]:null;c.save();
    if(grip){
      const [gx,gy,tx,ty]=grip,[x,y,w,h]=box,dx=(tx-gx)*w,dy=(ty-gy)*h,l=Math.hypot(dx,dy),px=-dy/l*1.25,py=dx/l*1.25;
      const ax=x+gx*w,ay=y+gy*h,bx=x+tx*w+dx*.15,by=y+ty*h+dy*.15;
      c.beginPath();c.rect(x,y,w,h);c.moveTo(ax+px,ay+py);c.lineTo(bx+px,by+py);c.lineTo(bx-px,by-py);c.lineTo(ax-px,ay-py);c.closePath();c.clip('evenodd');
    }
    c.drawImage(img,...rect,...box);c.restore();return grip;
  }
  function draw(c,{x,y,height=94,atlas='characters',cell=0,flip=false,time=0,moving=false,swing=0,summary,bodyRect,preview=false,reduced=false}){
    const {look,worn,sets}=summary;
    if(['maleActions','femaleActions','backActions'].includes(atlas)&&look.weapon?.school!=='sword'){const rear=atlas==='backActions';cell=(atlas==='maleActions'||rear&&cell>=4?4:0)+(rear?3:0);atlas='characters';bodyRect=null;}
    const rect=A[atlas]?.[cell],img=A.images[atlas];if(!img?.naturalWidth||!rect)return;
    c.save();c.translate(x,y);c.scale((flip?-1:1)*height/94,height/94);const t=time;
    if(preview&&look.boots&&look.boots.style!=='plain')footprint(c,-12,3,look.boots.style,t%1,look.boots.id);
    const level=worn.weapon?.level||0,highest=Math.max(0,...Object.values(worn).map(v=>v?.level||0));
    if(highest>=10||Object.values(sets).some(n=>n>=2)){
      oval(c,0,1,29,8,'#eacb847a');for(let i=0;i<6;i++){let a=t*.65+i*tau/6;oval(c,Math.cos(a)*28,1+Math.sin(a)*8,1.4,1,'#ffe3a2',1,true);}
    }
    if(highest>=15){for(let i=0;i<12;i++){const a=t*.65+i*tau/12;oval(c,Math.cos(a)*31,Math.sin(a)*8+1,1.4,1,'hsl('+((i*30+t*25)%360)+' 85% 78%)',1,true);}}
    const breath=Math.sin(t*2.7)*.6;c.translate(0,breath);back(c,look.cloak,t,moving);
    const box=bodyRect||[-47*rect[2]/rect[3],-94,94*rect[2]/rect[3],94];
    const grip=bareBody(c,img,rect,box,atlas,cell);const layer=robeFrame(atlas,cell,look.robe?.style);if(layer)c.drawImage(layer,...box);
    if(['emperor','glacier','sunset','jade'].includes(look.robe?.style)){
      const style=look.robe.style,color=palettes[style][2];
      for(let i=0;i<8;i++){
        const a=t*.72+i*2.4,p=(t*.23+i*.14)%1,x=Math.cos(a)*25,y=-p*70;
        if(style==='sunset'&&i<2){const side=i?1:-1;c.beginPath();c.moveTo(side*9,-62);c.bezierCurveTo(side*35,-55,side*(11+Math.sin(a)*6),-25,side*(24+Math.sin(a)*5),-14);c.strokeStyle=i?'#f3bd86':'#d96678';c.lineWidth=2.4;c.stroke();}
        if(style==='glacier'){c.save();c.translate(x,y);c.rotate(a);for(let j=0;j<3;j++){c.rotate(Math.PI/3);line(c,[[-2,0],[2,0]],color,1);}c.restore();}
        if(style==='jade'){c.beginPath();c.ellipse(x*.8,-9-p*23,8,2.4,a*.08,0,Math.PI);c.strokeStyle='#cef4dc99';c.lineWidth=1.2;c.stroke();}
        if(style==='emperor'){poly(c,[[x,y-2],[x+.7,y-.5],[x+2,y],[x+.5,y+.6],[x,y+2],[x-.7,y+.4],[x-2,y],[x-.5,y-.5]],color);}
      }
      if(style==='jade')for(let i=-1;i<=1;i++)poly(c,[[0,-24],[i*4-2,-28],[i*6,-34+Math.abs(i)*2],[i*4+2,-28]],'#469f8ba8');
      if(style==='emperor')for(const side of [-1,1])line(c,[[side*6,-58],[side*11,-52],[side*8,-49],[side*13,-45]],'#eacd80',1.25);
    }
    if(look.robe?.id==='calamity_dye'){
      for(const side of [-1,1])poly(c,[[side*5,-52],[side*13,-42],[side*9,-32],[side*17,-17],[side*8,-25]],'#7a2946','#e6a66f');
    }
    if(look.robe?.id==='archive_robe'){for(const side of [-1,1])line(c,[[side*8,-61],[side*5,-53],[side*10,-46],[side*12,-24],[side*17,-12]],'#b5c9ec',2.6);}
    if(summary.soulStage===4&&look.weapon?.id==='soul_sword'){for(let i=0;i<4;i++){const a=t*1.8+i*Math.PI/2;oval(c,Math.cos(a)*20,-38+Math.sin(a)*32,2.5,1.2,'#d9b6ff',1,true);}}
    const clothLevel=Math.max(worn.robe?.level||0,worn.cloak?.level||0,worn.head?.level||0,worn.boots?.level||0);
    if(clothLevel>=6){const color=clothLevel>=15?'#ffe39a':clothLevel>=10?'#c6dcff':'#cce8dd';
      line(c,[[-10,-20],[-8,-11],[2,-8],[10,-13]],color+'b0',1);
      if(clothLevel>=10)for(let i=0;i<(clothLevel===15?10:5);i++){const a=t+i*2.4,p=(t*.35+i*.17)%1;oval(c,Math.cos(a)*(19+p*6),-9-p*74,1.1,1.1,color,1,true);}}
    if(look.head){c.save();if(atlas==='characters')c.translate(cell%4===3?0:4,2);
      const crown=look.head.style==='crown',color=(palettes[look.head.style]||palettes.star)[2];
      if(look.head.style==='flame'){line(c,[[-10,-88],[-1,-86],[9,-89],[15,-81],[19+Math.sin(t)*3,-74]],'#ed8069',2.8);}
      else if(look.head.style==='thunder'){line(c,[[-12,-88],[8,-91],[14,-94]],'#e9c577',1.7);for(let i=0;i<3;i++){line(c,[[8+i*2,-91],[9+i*2,-83+i]],'#ddcfaa',.8);oval(c,9+i*2,-83+i,1.2,1.7,'#bfc6ef',1,true);}}
      else poly(c,[[-8,-85],[-10,-95],[-4,-91],[0,-99],[4,-91],[10,-95],[8,-85]],crown?'#edc56c':'#887954',color);
      oval(c,0,-89,2.5,3,'#b0e2d4',1,true);if(crown){oval(c,0,-98,13,3,'#ffe3a0');for(let i=0;i<4;i++){const a=t*.7+i*tau/4;oval(c,Math.cos(a)*13,-98+Math.sin(a)*3,1.2,1.2,'#fff0ad',1,true);const x=7+i*1.6;line(c,[[x,-90],[x+Math.sin(t+i),-77-i]],color,.8);oval(c,x+Math.sin(t+i),-77-i,1,1.5,'#aad7bb',1,true);}}
      c.restore();
    }
    c.save();if(grip){const handX=box[0]+grip[0]*box[2];c.translate(handX,box[1]+grip[1]*box[3]);if(handX<0)c.scale(-1,1);c.translate(-14,39);}weapon(c,look.weapon,t,level,swing,moving?.4:0,preview||reduced?null:D.grades[worn.weapon?.grade||0].color);c.restore();
    c.restore();
  }
  root.XiuxianAvatar={draw,dashEcho,ready,footprint,weapon,blade,oval,line,poly,robeFrame};
})(globalThis);
