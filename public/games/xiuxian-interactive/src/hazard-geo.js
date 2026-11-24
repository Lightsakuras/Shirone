(function(root){
  'use strict';
  const tau=Math.PI*2,epsilon=1e-8;
  function inStrip(dx,dy,angle,length,width,both){
    const c=Math.cos(angle),s=Math.sin(angle),along=dx*c+dy*s;
    return along>=(both?-length:0)-epsilon&&along<=length+epsilon&&Math.abs(dy*c-dx*s)<=width+epsilon;
  }
  function hits(h,p,time){
    if(h.kind==='meteor')return h.points.some(q=>(time===undefined||time>=q.delay&&time<q.delay+.18)&&Math.hypot(p.x-q.x,p.y-q.y)<=q.r+epsilon);
    const dx=p.x-h.x,dy=p.y-h.y,d=Math.hypot(dx,dy);
    switch(h.kind){
      case 'cone':{
        const delta=Math.atan2(dy,dx)-h.heading;
        return d<=h.r+epsilon&&(d<epsilon||Math.abs(Math.atan2(Math.sin(delta),Math.cos(delta)))<=h.spread/2+epsilon);
      }
      case 'line':return inStrip(dx,dy,h.heading,h.length,h.halfWidth,false);
      case 'cross':return h.arms.some(a=>inStrip(dx,dy,a,h.length,h.halfWidth,true));
      case 'donut':return d>=h.innerR-epsilon&&d<=h.outerR+epsilon;
      case 'zone':return d<=h.r+epsilon&&(time===undefined||time>=0&&time<h.duration);
      default:return false;
    }
  }
  function draw(c,h,time=-1,progress=-1,clock=0){
    const p=progress>=0?Math.min(1,Math.max(0,progress)):(h._progress>=0?Math.min(1,Math.max(0,h._progress)):.58);
    const t=clock||(h._clock||0);
    c.save();
    const circle=(x,y,r,reverse=false)=>{c.moveTo(x+r,y);c.arc(x,y,r,0,reverse?-tau:tau,reverse);};
    const strip=(a,both)=>{
      const left=both?-h.length:0,w=h.halfWidth;
      c.save();c.translate(h.x,h.y);c.rotate(a);c.rect(left,-w,h.length-left,2*w);c.restore();
    };
    const buildPath=(forStroke=false)=>{
      c.beginPath();
      switch(h.kind){
        case 'cone':c.moveTo(h.x,h.y);c.arc(h.x,h.y,h.r,h.heading-h.spread/2,h.heading+h.spread/2);c.closePath();break;
        case 'line':strip(h.heading,false);break;
        case 'cross':
          if(forStroke&&h.arms.length===2&&Math.abs(Math.abs(h.arms[1]-h.arms[0])-Math.PI/2)<.02){
            const w=h.halfWidth,L=h.length,a=h.arms[0];
            c.save();c.translate(h.x,h.y);c.rotate(a);
            c.moveTo(-L,-w);c.lineTo(-w,-w);c.lineTo(-w,-L);c.lineTo(w,-L);c.lineTo(w,-w);c.lineTo(L,-w);
            c.lineTo(L,w);c.lineTo(w,w);c.lineTo(w,L);c.lineTo(-w,L);c.lineTo(-w,w);c.lineTo(-L,w);c.closePath();
            c.restore();
          }else for(const a of h.arms)strip(a,true);
          break;
        case 'donut':circle(h.x,h.y,h.outerR);circle(h.x,h.y,h.innerR,true);break;
        case 'meteor':for(const q of h.points)if(time<q.delay+.18)circle(q.x,q.y,q.r);break;
        case 'zone':circle(h.x,h.y,h.r);break;
      }
    };
    // 1. Rich clipped Oriental Xianxia interior
    c.save();
    buildPath(false);
    c.clip(h.kind==='donut'?'evenodd':'nonzero');
    if(h.kind==='cone'){
      const a0=h.heading-h.spread/2,a1=h.heading+h.spread/2;
      const g=c.createRadialGradient(h.x,h.y,4,h.x,h.y,h.r);
      g.addColorStop(0,'rgba(255,214,132,0.44)');
      g.addColorStop(.55,'rgba(222,84,48,0.38)');
      g.addColorStop(1,'rgba(176,38,32,0.52)');
      c.fillStyle=g;c.fillRect(h.x-h.r,h.y-h.r,h.r*2,h.r*2);
      // Advancing sword-qi sweep arc from apex outward
      const adv=Math.max(10,h.r*p);
      const wg=c.createRadialGradient(h.x,h.y,Math.max(2,adv*.35),h.x,h.y,adv);
      wg.addColorStop(0,'rgba(255,204,116,0.08)');
      wg.addColorStop(.78,'rgba(255,152,78,0.34)');
      wg.addColorStop(1,'rgba(255,238,178,0.68)');
      c.beginPath();c.moveTo(h.x,h.y);c.arc(h.x,h.y,adv,a0,a1);c.closePath();
      c.fillStyle=wg;c.fill();
      c.beginPath();c.arc(h.x,h.y,adv,a0,a1);
      c.strokeStyle='#ffeab0';c.lineWidth=3.2;c.stroke();
      // Sword-qi calibration arcs & radial rib lines
      c.strokeStyle='rgba(255,222,162,0.34)';c.lineWidth=1.2;
      c.setLineDash([6,6]);
      for(const frac of [.34,.68]){c.beginPath();c.arc(h.x,h.y,h.r*frac,a0,a1);c.stroke();}
      c.setLineDash([]);
      for(let i=1;i<=5;i++){
        const ang=a0+(a1-a0)*(i/6);
        c.beginPath();c.moveTo(h.x+Math.cos(ang)*16,h.y+Math.sin(ang)*16);c.lineTo(h.x+Math.cos(ang)*(h.r-4),h.y+Math.sin(ang)*(h.r-4));
        c.strokeStyle=i===3?'rgba(255,236,178,0.52)':'rgba(255,196,138,0.28)';c.lineWidth=i===3?1.8:1;c.stroke();
      }
      // Rim calibration ticks
      for(let i=1;i<12;i++){
        const ang=a0+(a1-a0)*(i/12);
        c.beginPath();c.moveTo(h.x+Math.cos(ang)*(h.r-9),h.y+Math.sin(ang)*(h.r-9));c.lineTo(h.x+Math.cos(ang)*(h.r-1),h.y+Math.sin(ang)*(h.r-1));
        c.strokeStyle='#ffd9a6';c.lineWidth=1.4;c.stroke();
      }
    }else if(h.kind==='line'){
      c.save();c.translate(h.x,h.y);c.rotate(h.heading);
      const w=h.halfWidth,len=h.length,flash=p>.78?Math.min(1,(p-.78)/.22):0;
      const g=c.createLinearGradient(0,-w,0,w);
      g.addColorStop(0,'rgba(218,54,42,0.56)');
      g.addColorStop(.5,'rgba(255,134,74,0.36)');
      g.addColorStop(1,'rgba(218,54,42,0.56)');
      c.fillStyle=g;c.fillRect(0,-w,len,w*2);
      // Progress fill wash
      c.fillStyle='rgba(255,212,138,0.24)';c.fillRect(0,-w,len*p,w*2);
      // Center blade-rail spine
      c.strokeStyle='rgba(255,236,188,0.55)';c.lineWidth=1.6;
      c.beginPath();c.moveTo(0,0);c.lineTo(len,0);c.stroke();
      // High-speed streaming arrow chevrons
      const step=36,shift=(t*190)%step;
      c.lineCap='round';c.lineJoin='round';
      for(let x=-step+shift;x<len+step;x+=step){
        const tip=x+w*.68;
        c.beginPath();c.moveTo(x,-w*.68);c.lineTo(tip,0);c.lineTo(x,w*.68);
        c.strokeStyle=x<len*p?'rgba(255,244,202,0.82)':'rgba(255,190,148,0.48)';
        c.lineWidth=2.3;c.stroke();
      }
      if(flash>0){
        c.fillStyle='rgba(255,250,232,'+(0.18+flash*0.30).toFixed(3)+')';
        c.fillRect(0,-w,len,w*2);
      }
      c.restore();
    }else if(h.kind==='cross'){
      const heat=.45+p*.55;
      for(const a of h.arms){
        c.save();c.translate(h.x,h.y);c.rotate(a);
        const w=h.halfWidth,len=h.length;
        const g=c.createLinearGradient(0,-w,0,w);
        g.addColorStop(0,'rgba(72,20,18,0.62)');
        g.addColorStop(.5,'rgba(246,104,40,'+(0.42+heat*0.24).toFixed(3)+')');
        g.addColorStop(1,'rgba(72,20,18,0.62)');
        c.fillStyle=g;c.fillRect(-len,-w,len*2,w*2);
        // Jagged scorched lava fissures along the arm
        for(const side of [-1,1]){
          c.beginPath();c.moveTo(0,0);
          for(let i=1;i<=7;i++){
            const x=side*(len*(i/7)),y=Math.sin(i*3.7+a*5+side)*w*.52;
            c.lineTo(x,y);
          }
          c.strokeStyle='#240d0f';c.lineWidth=5;c.stroke();
          c.strokeStyle=p>.65?'#ffe292':'#ff9c47';c.lineWidth=2.1;c.stroke();
          // Branching scorch micro-cracks
          for(let i=2;i<=6;i+=2){
            const bx=side*(len*(i/7)),by=Math.sin(i*3.7+a*5+side)*w*.48;
            c.beginPath();c.moveTo(bx,by);c.lineTo(bx+side*10,by+(i%4?w*.48:-w*.48));
            c.strokeStyle='#ffb963';c.lineWidth=1.2;c.stroke();
          }
        }
        c.restore();
      }
      // Molten intersection core diamond
      const cg=c.createRadialGradient(h.x,h.y,2,h.x,h.y,h.halfWidth*1.4);
      cg.addColorStop(0,'rgba(255,244,186,0.85)');
      cg.addColorStop(.5,'rgba(255,134,54,0.52)');
      cg.addColorStop(1,'rgba(255,100,40,0)');
      c.fillStyle=cg;c.beginPath();c.arc(h.x,h.y,h.halfWidth*1.4,0,tau);c.fill();
    }else if(h.kind==='donut'){
      const g=c.createRadialGradient(h.x,h.y,h.innerR,h.x,h.y,h.outerR);
      g.addColorStop(0,'rgba(255,156,92,0.52)');
      g.addColorStop(.5,'rgba(218,68,44,0.38)');
      g.addColorStop(1,'rgba(178,38,34,0.56)');
      c.fillStyle=g;c.fillRect(h.x-h.outerR,h.y-h.outerR,h.outerR*2,h.outerR*2);
      // Expanding concentric shockwave ring
      const midR=h.innerR+(h.outerR-h.innerR)*p;
      c.beginPath();c.arc(h.x,h.y,midR,0,tau);
      c.strokeStyle='rgba(255,234,174,0.82)';c.lineWidth=3.2;c.stroke();
      // Rotating cardinal energy ticks inside the danger annulus
      c.save();c.translate(h.x,h.y);c.rotate(t*.55);
      for(let i=0;i<16;i++){
        const a=i*tau/16;
        c.beginPath();c.moveTo(Math.cos(a)*(h.innerR+6),Math.sin(a)*(h.innerR+6));
        c.lineTo(Math.cos(a)*(h.outerR-6),Math.sin(a)*(h.outerR-6));
        c.strokeStyle=i%4===0?'rgba(255,222,164,0.42)':'rgba(255,176,136,0.18)';
        c.lineWidth=i%4===0?1.6:1;c.stroke();
      }
      c.restore();
    }else if(h.kind==='meteor'){
      for(const q of h.points){
        if(time>=q.delay+.18)continue;
        const localP=time>=0?Math.min(1,Math.max(0,(time+q.delay===0?p:time/Math.max(.18,q.delay+.18)))):p;
        const detonate=time>=q.delay;
        const g=c.createRadialGradient(q.x,q.y,2,q.x,q.y,q.r);
        g.addColorStop(0,detonate?'rgba(255,248,214,0.92)':'rgba(222,138,248,0.48)');
        g.addColorStop(.55,'rgba(182,78,162,0.38)');
        g.addColorStop(1,'rgba(224,78,64,0.52)');
        c.fillStyle=g;c.beginPath();c.arc(q.x,q.y,q.r,0,tau);c.fill();
        // Bagua octagon + 8 trigram dashes
        c.save();c.translate(q.x,q.y);c.rotate(t*.6+q.delay*2);
        c.beginPath();
        for(let i=0;i<=8;i++){const a=i*tau/8;c[i?'lineTo':'moveTo'](Math.cos(a)*(q.r-6),Math.sin(a)*(q.r-6));}
        c.strokeStyle='rgba(246,214,255,0.68)';c.lineWidth=1.3;c.stroke();
        for(let i=0;i<8;i++){
          c.save();c.rotate(i*tau/8);
          for(let row=0;row<2;row++){
            const ry=-q.r+9+row*3.5;
            c.strokeStyle='#ffe2a8';c.lineWidth=1.2;
            c.beginPath();
            if((i+row)%2){c.moveTo(-4,ry);c.lineTo(4,ry);}
            else{c.moveTo(-4,ry);c.lineTo(-1,ry);c.moveTo(1,ry);c.lineTo(4,ry);}
            c.stroke();
          }
          c.restore();
        }
        c.restore();
        // Shrinking impact reticle + center star crosshair
        const retR=Math.max(5,q.r*(1-localP*.78));
        c.beginPath();c.arc(q.x,q.y,retR,0,tau);
        c.strokeStyle='#fff0c2';c.lineWidth=2;c.stroke();
        c.beginPath();c.moveTo(q.x-7,q.y);c.lineTo(q.x+7,q.y);c.moveTo(q.x,q.y-7);c.lineTo(q.x,q.y+7);
        c.strokeStyle='#fff4d6';c.lineWidth=1.5;c.stroke();
      }
    }else if(h.kind==='zone'){
      const el=h.element||'fire';
      const g=c.createRadialGradient(h.x,h.y,4,h.x,h.y,h.r);
      if(el==='frost'){
        g.addColorStop(0,'rgba(196,246,255,0.52)');g.addColorStop(.6,'rgba(86,184,228,0.42)');g.addColorStop(1,'rgba(44,118,166,0.54)');
      }else if(el==='poison'){
        g.addColorStop(0,'rgba(164,224,96,0.50)');g.addColorStop(.6,'rgba(78,154,68,0.44)');g.addColorStop(1,'rgba(32,76,42,0.58)');
      }else{
        g.addColorStop(0,'rgba(255,214,116,0.52)');g.addColorStop(.55,'rgba(232,96,42,0.46)');g.addColorStop(1,'rgba(148,34,24,0.56)');
      }
      c.fillStyle=g;c.beginPath();c.arc(h.x,h.y,h.r,0,tau);c.fill();
      if(el==='frost'){
        // Six-fold crystalline frost filigree
        c.save();c.translate(h.x,h.y);c.rotate(t*.25);
        for(let i=0;i<6;i++){
          c.rotate(tau/6);
          c.strokeStyle='rgba(226,252,255,0.72)';c.lineWidth=1.6;
          c.beginPath();c.moveTo(6,0);c.lineTo(h.r-8,0);c.stroke();
          for(const d of [.42,.70]){
            const rx=h.r*d;
            c.beginPath();c.moveTo(rx-6,-7);c.lineTo(rx,0);c.lineTo(rx-6,7);c.stroke();
          }
        }
        c.beginPath();c.arc(0,0,h.r*.36,0,tau);c.strokeStyle='rgba(204,246,255,0.55)';c.lineWidth=1.3;c.stroke();
        c.restore();
      }else if(el==='poison'){
        // Bubbling emerald toxic miasma rings
        for(let i=0;i<7;i++){
          const a=i*2.39996+t*.4,dist=h.r*(.22+(i%3)*.22);
          const bx=h.x+Math.cos(a)*dist,by=h.y+Math.sin(a)*dist*.82;
          const phase=(t*.85+i*.19)%1,br=4+phase*10;
          c.beginPath();c.arc(bx,by,br,0,tau);
          c.strokeStyle='rgba(196,246,126,'+(0.75-phase*0.55).toFixed(3)+')';c.lineWidth=1.8;c.stroke();
          c.beginPath();c.arc(bx-br*.3,by-br*.3,1.8,0,tau);
          c.fillStyle='rgba(232,255,186,0.75)';c.fill();
        }
      }else{
        // Dancing molten embers & flame tongues
        for(let i=0;i<10;i++){
          const a=i*2.39996+t*.5,dist=h.r*(.18+(i%4)*.19);
          const fx=h.x+Math.cos(a)*dist,fy=h.y+Math.sin(a)*dist*.85;
          const flick=8+Math.sin(t*7+i*1.9)*4;
          c.beginPath();c.moveTo(fx-5,fy+3);c.quadraticCurveTo(fx,fy-flick-5,fx+5,fy+3);c.closePath();
          c.fillStyle=i%2?'rgba(255,212,110,0.78)':'rgba(255,128,58,0.72)';c.fill();
        }
      }
    }
    c.restore();
    // 2. Crisp authoritative outer boundary (<= 6px total width so zero bleed to outside probes)
    buildPath(true);
    c.lineJoin='round';c.lineCap='round';
    c.lineWidth=6;c.strokeStyle='#2a1a1e';c.stroke();
    const rim=h.kind==='zone'?(h.element==='frost'?'#b8f4ff':h.element==='poison'?'#a8ec84':'#ffb87c'):h.kind==='meteor'?'#f6b6e4':'#ffb49b';
    c.lineWidth=2.6;c.strokeStyle=rim;c.stroke();
    // 3. Donut inner safe-zone jade dashed cue strictly on innerR - 3 (far from innerR/2 probe)
    if(h.kind==='donut'&&h.innerR>14){
      c.save();
      c.beginPath();c.arc(h.x,h.y,h.innerR-3.5,0,tau);
      c.setLineDash([7,5]);c.lineWidth=2.2;c.strokeStyle='#7ef2cb';c.stroke();
      c.setLineDash([]);
      c.restore();
    }
    // 4. Meteor sky-thunderbolt pillar on active strike window
    if(h.kind==='meteor'&&time>=0){
      for(const q of h.points){
        if(time<q.delay||time>=q.delay+.18)continue;
        const k=1-(time-q.delay)/.18;
        c.save();c.globalAlpha=Math.min(1,k*1.5);
        c.beginPath();c.moveTo(q.x-10,q.y-210);c.lineTo(q.x+8,q.y-135);c.lineTo(q.x-7,q.y-70);c.lineTo(q.x,q.y);
        c.strokeStyle='#b984ff';c.lineWidth=11*k+2;c.stroke();
        c.strokeStyle='#fff8e6';c.lineWidth=4*k+1;c.stroke();
        c.restore();
      }
    }
    c.restore();
  }
  const kinds=['cone','line','cross','donut','meteor','zone'];
  function pattern(kind,enemy,target){
    const {x,y}=enemy,heading=Math.atan2(target.y-y,target.x-x);
    switch(kind){
      case 'cone':return {kind,x,y,heading,r:240,spread:Math.PI/2};
      case 'line':return {kind,x,y,heading,length:370,halfWidth:25};
      case 'cross':return {kind,x:target.x,y:target.y,arms:[0,Math.PI/2],length:185,halfWidth:22};
      case 'donut':return {kind,x,y,innerR:58,outerR:220};
      case 'meteor':return {kind,points:[0,1,2,3,4].map((n)=>({x:target.x+(n?Math.cos(n*Math.PI/2)*85:0),y:target.y+(n?Math.sin(n*Math.PI/2)*85:0),r:41,delay:n*.28}))};
      case 'zone':return {kind,x:target.x,y:target.y,r:75,element:enemy.affix==='冰脉'?'frost':enemy.affix==='厚甲'?'poison':'fire',duration:3,tick:.65};
    }
  }
  // Sweep each due pulse once, even when a render frame crosses several deadlines.
  function pulses(h,before,after){
    if(h.kind==='meteor')return h.points.filter(q=>before<q.delay&&after>=q.delay).map(q=>({kind:'zone',...q,duration:.18}));
    if(h.kind==='zone'){
      const due=[];for(let t=0;t<h.duration;t+=h.tick)if(before<t&&after>=t)due.push(h);
      return due;
    }
    return before<0&&after>=0?[h]:[];
  }
  const api={hits,draw,kinds,pattern,pulses};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianHazardGeo=api;
})(globalThis);
