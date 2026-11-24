(function(root){
  'use strict';
  const Base=root.XiuxianView,A=root.XiuxianArt;
  class FeedbackView extends Base{
    constructor(canvas){super(canvas);this.options={shake:true,guide:true};this.goal=null;}
    text(c,text,x,y,color='#f0e7cb',size=14){
      c.save();c.font=size+'px "Microsoft YaHei",sans-serif';c.textAlign='center';
      const measure=c.measureText(text),ascent=measure.actualBoundingBoxAscent||size,descent=measure.actualBoundingBoxDescent||0;
      c.shadowColor='#15291ce0';c.shadowBlur=5;c.shadowOffsetY=1;c.fillStyle=color;c.fillText(text,x,y);c.restore();
      this.guideObstacles?.push({id:'map-text:'+text,rect:[x-measure.width/2,y-ascent,measure.width,ascent+descent]});
    }
    label(c,title,x,y,selected=false){
      const unit=Math.max(1,1280/(this.canvas.getBoundingClientRect().width||1280));
      c.save();c.font=13*unit+'px "Microsoft YaHei",sans-serif';const width=c.measureText(title).width+20*unit;
      x=Math.max(width/2+4*unit,Math.min(1280-width/2-4*unit,x));y=Math.max(19*unit,Math.min(760-12*unit,y));
      const rect=[x-width/2,y-15*unit,width,23*unit];
      c.fillStyle=selected?'#22372bef':'#25392abf';c.strokeStyle=selected?'#dec78f':'#d9d3ab55';c.lineWidth=unit;
      c.beginPath();c.roundRect(...rect,3*unit);c.fill();c.stroke();c.textAlign='center';c.fillStyle=selected?'#fff0c8':'#e0dfc7';c.fillText(title,x,y+unit);c.restore();
      this.guideObstacles?.push({id:'map-label:'+title,rect});
    }
    pose(c,atlas,cell,x,y,flip=false,alpha=1){
      const [sx,sy,sw,sh]=A[atlas][cell],[px,py,body]=A.actionAnchors[atlas][cell],scale=94/body;
      if(this.avatarActor){const {g,time}=this.avatarActor;c.save();c.globalAlpha*=alpha;root.XiuxianAvatar.draw(c,{x,y,atlas,cell,flip,time,summary:g.arsenal.gear,reduced:this.motion.reduced,swing:Math.max(g.feedback.swing,g.feedback.cast)*4,bodyRect:[(sx-px)*scale,(sy-py)*scale,sw*scale,sh*scale]});c.restore();return;}
      c.save();c.translate(x,y);if(flip)c.scale(-1,1);c.globalAlpha*=alpha;c.drawImage(A.images[atlas],sx,sy,sw,sh,(sx-px)*scale,(sy-py)*scale,sw*scale,sh*scale);
      this.motion.flash(c,A.images[atlas],A[atlas][cell],(sx-px)*scale,(sy-py)*scale,sw*scale,sh*scale);c.restore();
    }
    person(c,g,time){
      if(g.isChild())return super.person(c,g,time);const f=g.feedback,s=g.state;if(!f)return super.person(c,g,time);
      let frame=f.hurt>0?5:g.dash>0?7:f.swing>0?(f.swing>.205?0:f.swing>.085?1:2):f.cast>0?4:g.guard?3:g.attackCd>0?6:-1;
      if(frame<0)return super.person(c,g,time);
      const rear=g.face.y<-.4,flip=g.face.x<0,base=s.gender==='male'?4:0;
      let atlas=s.gender==='female'?'femaleActions':'maleActions',cell=frame;
      if(rear&&[0,1,2,3,4].includes(frame)){atlas='backActions';cell=base+(frame===4?3:frame);}
      this.shadow(c,s.x,s.y,31,.3);
      if(!this.motion.reduced&&g.dash>0)root.XiuxianAvatar.dashEcho(c,atlas,cell,s.x,s.y,94,g.dashVector,g.arsenal?.gear.look.robe?.style);
      const recoil=!this.motion.reduced&&f.hurt>0?-Math.sin(f.hurt/.2*Math.PI)*3:0;
      this.motion.flashAlpha=this.motion.reduced?0:Math.max(0,(f.hurt-.13)*7);
      this.pose(c,atlas,cell,s.x-recoil*(f.hitX??-1),s.y+3-recoil*(f.hitY||0),flip);
      this.motion.flashAlpha=0;
      if(!g.inCampaign?.()&&!g.activeEnemies().some(e=>e.hp>0))this.text(c,s.gender==='female'?'林墨 · 女修':'林墨',s.x,s.y-102,'#fff2c8',13);
      if(g.ward>0){c.save();c.translate(s.x,s.y-38);c.scale(.78,1.05);c.lineWidth=1.2;this.circle(c,0,0,44,'#c8dbe210','#e3dab288');c.restore();}
    }
    enemy(c,e,time){
      const hit=this.motion.reduced?0:this.currentGame?.reactions?.get(e)||0;c.save();if(hit>0){const f=this.currentGame.face,k=Math.sin(hit/.13*Math.PI)*3;c.translate(f.x*k,f.y*k);c.globalAlpha=.88;}super.enemy(c,e,time);c.restore();
    }
    effect(c,e){
      if(!['contact','parry'].includes(e.kind))return super.effect(c,e);
      const p=e.age/e.life;c.save();c.globalAlpha=1-p;
      for(let i=0;i<5;i++){const a=i*2.4,r=4+p*17;this.line(c,e.x+Math.cos(a)*r,e.y+Math.sin(a)*r*.7,e.x+Math.cos(a)*(r+6),e.y+Math.sin(a)*(r+6)*.7,e.kind==='parry'?'#f4e9c7':'#d7d8ce',1.4);}c.restore();
    }
    drawGuideGround(c,g,goal,time){
      this.groundGuide=null;
      if(g.recovering)this.motion.recoveryGlow(c,g.state,time);
      if(this.fieldHudHidden||!this.options.guide||!Number.isFinite(goal?.x))return;
      const s=g.state,dx=goal.x-s.x,dy=goal.y-s.y,d=Math.hypot(dx,dy),angle=Math.atan2(dy,dx);
      const targets=goal.gather||[goal],pulse=this.motion.reduced?0:Math.sin(time*3);
      c.save();for(const o of targets){
        const primary=o.id===goal.id;
        c.beginPath();c.ellipse(o.x,o.y,(primary?32:22)+pulse*2,(primary?12:9)+pulse,0,0,2*Math.PI);
        c.fillStyle=primary?'#f6d77434':'#84d8a72b';c.fill();
        c.lineWidth=2;c.strokeStyle=primary?'#f8d98f':'#a9e8af';c.stroke();
      }
      const motes=d>120?5:0;
      for(let i=0;i<motes;i++){
        const t=((i+.15+(this.motion.reduced?0:time*.48))%motes)/motes;
        const mx=s.x+dx*t,my=s.y+dy*t;
        c.globalAlpha=Math.min(1,(d-120)/70)*(.38+.58*Math.sin(t*Math.PI));
        c.beginPath();c.arc(mx,my,4.6,0,2*Math.PI);c.fillStyle='rgba(255,224,132,0.28)';c.fill();
        c.beginPath();c.arc(mx,my,2.5,0,2*Math.PI);c.fillStyle='#fff3c4';c.fill();
      }
      c.globalAlpha=1;const radius=49+pulse*2,x=s.x+radius*Math.cos(angle),y=s.y+radius*Math.sin(angle);
      c.restore();
      this.groundGuide={x,y,angle,motes,targets:targets.map(o=>o.id)};
    }
    drawGuide(c,g,goal,time){
      this.guideFrame=null;root.XiuxianGuide?.recordFrame?.(g,null);
      if(this.fieldHudHidden||!this.options.guide||!goal||!Number.isFinite(goal.x)||!Number.isFinite(goal.y))return;
      const canvasRect=this.canvas.getBoundingClientRect(),unit=Math.max(1,1280/(canvasRect.width||1280)),clamp=(n,min,max)=>Math.max(min,Math.min(Math.max(min,max),n));
      const reduced=this.options.reducedMotion===true||root.matchMedia?.('(prefers-reduced-motion: reduce)').matches,near=root.XiuxianGuide?.canInteract?.(g,goal)??(g.nearest?.()?.id===goal.id);
      const height=goal.height??0,portal=goal.portal===true||goal.objectKind==='portal'||goal.role==='portal',atlas=A[goal.atlas]?.[goal.cell];
      const bodyWidth=portal?68:atlas&&height>0?height*atlas[2]/atlas[3]:Math.max(32,Math.min(86,height*.7));
      const left=clamp(goal.x-bodyWidth/2-4,4,1275),right=clamp(goal.x+bodyWidth/2+4,5,1276),top=clamp(goal.y-(portal?28:Math.max(22,height))-4,4,751),bottom=clamp(goal.y+(portal?12:6),9,756);
      const targetRect=[left,top,right-left,bottom-top],anchor={x:goal.x,y:goal.y},obstacles=[...(this.guideObstacles||[])];
      for(const id of ['interact','toast','vitals-hud','field-tools','quest-scroll','system-hubs','command-hud']){
        const element=root.document?.getElementById(id);if(!element||element.hidden||!element.getClientRects().length||Number(root.getComputedStyle(element).opacity)<.05)continue;
        const rect=element.getBoundingClientRect();if(rect.width&&rect.height)obstacles.push({id:'world-ui:'+id,rect:[(rect.left-canvasRect.left)*1280/canvasRect.width,(rect.top-canvasRect.top)*760/canvasRect.height,rect.width*1280/canvasRect.width,rect.height*760/canvasRect.height]});
      }
      const player=[g.state.x-35,g.state.y-108,70,112],intersects=(a,b)=>a[0]<b[0]+b[2]+3*unit&&a[0]+a[2]+3*unit>b[0]&&a[1]<b[1]+b[3]+3*unit&&a[1]+a[3]+3*unit>b[1];
      function box(x,y,w,h){return [clamp(x,6*unit,1280-w-6*unit),clamp(y,6*unit,760-h-6*unit),w,h];}
      function choose(proposals,occupied,desired){
        const clear=rect=>occupied.every(other=>!intersects(rect,other)),first=proposals.find(clear);if(first)return {rect:first,clear:true};
        const [,,w,h]=proposals[0],grid=[];for(let y=6*unit;y<=760-h-6*unit;y+=24*unit)for(let x=6*unit;x<=1280-w-6*unit;x+=24*unit)grid.push([x,y,w,h]);
        const distance=rect=>(rect[0]+w/2-desired.x)**2+(rect[1]+h/2-desired.y)**2;grid.sort((a,b)=>distance(a)-distance(b));const available=grid.find(clear);
        if(available)return {rect:available,clear:true};
        const score=rect=>occupied.reduce((sum,other)=>sum+(intersects(rect,other)?1:0),0);proposals.sort((a,b)=>score(a)-score(b)||distance(a)-distance(b));return {rect:proposals[0],clear:false};
      }
      function closest(rect,point){return {x:clamp(point.x,rect[0],rect[0]+rect[2]),y:clamp(point.y,rect[1],rect[1]+rect[3])};}
      c.save();c.font=14*unit+'px "Microsoft YaHei",sans-serif';c.textAlign='center';c.textBaseline='alphabetic';
      const category=root.XiuxianGuide.category(goal),name=goal.displayName||goal.name||'当前目标',label=(near?'交互：':'')+category.verb+' · '+name,measure=c.measureText(label),ascent=measure.actualBoundingBoxAscent||14*unit,descent=measure.actualBoundingBoxDescent||0;
      const labelW=Math.min(1260-12*unit,measure.width+43*unit),labelH=Math.max(28*unit,ascent+descent+12*unit),centerY=(top+bottom)/2;
      const above=box(goal.x-labelW/2,top-labelH-9*unit,labelW,labelH),below=box(goal.x-labelW/2,bottom+12*unit,labelW,labelH),west=box(left-labelW-12*unit,centerY-labelH/2,labelW,labelH),east=box(right+12*unit,centerY-labelH/2,labelW,labelH);
      const proposals=portal?(goal.x>640?[west,east,above,below]:[east,west,above,below]):[above,west,east,below],placement=choose(proposals,[player,targetRect,...obstacles.map(value=>value.rect)],{x:goal.x,y:top-labelH/2});
      const tag=placement.rect,marker={x:tag[0]+tag[2]/2,y:tag[1]+tag[3]/2,rect:tag,label},targetCenter={x:(left+right)/2,y:centerY},from=closest(tag,targetCenter),to=closest(targetRect,marker),connection={from,to};
      // The named label connects to the actual object's bounds, including low portals.
      c.strokeStyle='#142a22';c.lineWidth=5*unit;c.beginPath();c.moveTo(from.x,from.y);c.lineTo(to.x,to.y);c.stroke();c.strokeStyle='#f2dca6';c.lineWidth=1.6*unit;c.stroke();
      const edge=Math.min(9*unit,(right-left)/3,(bottom-top)/3);c.lineWidth=2*unit;
      for(const [x,y,sx,sy]of [[left,top,1,1],[right,top,-1,1],[left,bottom,1,-1],[right,bottom,-1,-1]]){c.beginPath();c.moveTo(x+sx*edge,y);c.lineTo(x,y);c.lineTo(x,y+sy*edge);c.stroke();}
      c.fillStyle='#f2dca6';c.beginPath();c.arc(to.x,to.y,2.6*unit,0,Math.PI*2);c.fill();
      c.fillStyle='#162b26ee';c.strokeStyle=near?'#fff3c8':'#e5c67e';c.lineWidth=(near?2.2:1.6)*unit;
      c.save();c.shadowColor='rgba(12,24,20,0.68)';c.shadowBlur=10*unit;c.beginPath();c.roundRect(...tag,5*unit);c.fill();c.restore();
      c.beginPath();c.roundRect(...tag,5*unit);c.stroke();
      const bounce=reduced?0:Math.sin(time*4)*3*unit;
      function badge(x,y,small){
        const r=(small?9.5:11.5)*unit;
        c.save();
        // Deep jade backing halo so the icon pops over both bright stone and dark bamboo
        c.beginPath();c.arc(x,y,r+2.6*unit,0,2*Math.PI);c.fillStyle='rgba(12,26,24,0.88)';c.fill();
        c.strokeStyle='rgba(255,232,164,0.55)';c.lineWidth=1.1*unit;c.stroke();
        c.beginPath();c.arc(x,y,r,0,2*Math.PI);c.fillStyle=category.color;c.fill();
        c.strokeStyle='#ffe6a6';c.lineWidth=1.4*unit;c.stroke();
        c.fillStyle='#fff6d4';
        if(category.verb==='采集'){
          c.save();c.translate(x,y);c.scale(r/10,r/10);
          c.beginPath();c.moveTo(-5,5);c.quadraticCurveTo(-8,-4,6,-6);c.quadraticCurveTo(7,5,-5,5);c.fill();
          c.strokeStyle=category.color;c.lineWidth=1.25;c.beginPath();c.moveTo(-5,5);c.lineTo(3,-3);c.stroke();c.restore();
        }else{
          c.font='bold '+(small?12:15)*unit+'px serif';c.textAlign='center';c.fillText(category.icon,x,y+4.8*unit);
        }
        c.restore();
      }
      function down(x,y,small){
        c.save();c.translate(x,y+bounce);c.scale(unit*(small?.78:1.05),unit*(small?.78:1.05));
        c.shadowColor='rgba(255,222,138,0.45)';c.shadowBlur=6;
        c.beginPath();c.moveTo(-8.5,-7.5);c.lineTo(0,1);c.lineTo(8.5,-7.5);c.lineTo(8.5,-1);c.lineTo(0,8.5);c.lineTo(-8.5,-1);c.closePath();
        c.fillStyle='#c9422e';c.fill();c.strokeStyle='#ffeaac';c.lineWidth=1.8;c.stroke();c.restore();
      }
      const badges=[];
      badge(tag[0]+14*unit,marker.y,false);down(to.x,to.y-6*unit,false);
      for(const o of goal.gather||[])if(o.id!==goal.id){const y=o.y-o.height-17*unit;badge(o.x,y,true);down(o.x,y+11*unit,true);badges.push({id:o.id,x:o.x,y:y+5*unit,r:14*unit});}
      const baseline=marker.y+(ascent-descent)/2;c.font=14*unit+'px "Microsoft YaHei",sans-serif';c.fillStyle='#fff2c8';c.fillText(label,marker.x+12*unit,baseline);
      const elements=[
        {id:'guide-target-frame',kind:'indicator',rect:targetRect,group:'guide-target',z:98},
        {id:'guide-target',kind:'panel',rect:tag,group:'guide-target',opaque:true,z:100},
        {id:'guide-target-label',kind:'text',text:label,rect:[marker.x+12*unit-measure.width/2,baseline-ascent,measure.width,ascent+descent],group:'guide-target',parent:'guide-target',glyphH:ascent+descent,fg:[255,242,200],bg:[32,55,47],z:101}
      ];
      const compass=this.groundGuide;
      let arrow=null;
      if(compass){
        // Labels and HUD bounds are known after the world pass. Keep the first
        // clear position around the player's feet, preserving the target bearing.
        const radius=Math.hypot(compass.x-g.state.x,compass.y-g.state.y);
        const candidate=step=>{
          const a=compass.angle+step*Math.PI/8;
          return box(g.state.x+radius*Math.cos(a)-17,g.state.y+radius*Math.sin(a)-17,34,34);
        };
        const occupied=[tag,player,targetRect,...obstacles.map(o=>o.rect),...(this.hitPlates||[]).map(p=>p.rect)];
        const preferred=candidate(0);
        const spot=occupied.some(rect=>intersects(preferred,rect))
          ?choose([1,-1,2,-2,3,-3,4,-4,5,-5,6,-6,7,-7,8].map(candidate),occupied,compass)
          :{rect:preferred,clear:true};
        compass.x=spot.rect[0]+17;compass.y=spot.rect[1]+17;
        arrow={x:compass.x,y:compass.y,angle:compass.angle,text:'目标方向',widgetRect:spot.rect,clear:spot.clear};
        c.save();c.translate(arrow.x,arrow.y);c.rotate(arrow.angle);
        // Subtle dark jade halo ring + gilded compass chevron with vermilion tip
        c.beginPath();c.arc(-2,0,15,0,Math.PI*2);c.fillStyle='rgba(16,30,27,0.45)';c.fill();
        c.strokeStyle='rgba(255,224,142,0.55)';c.lineWidth=1.2;c.stroke();
        c.beginPath();c.moveTo(18,0);c.lineTo(-10,-10);c.lineTo(-4,0);c.lineTo(-10,10);c.closePath();
        const ag=c.createLinearGradient(-10,0,18,0);ag.addColorStop(0,'#c9973e');ag.addColorStop(.65,'#ffe69c');ag.addColorStop(1,'#fff7d4');
        c.fillStyle=ag;c.fill();c.strokeStyle='#24190d';c.lineWidth=2.2;c.stroke();
        c.beginPath();c.moveTo(16,0);c.lineTo(3,-4.5);c.lineTo(5,0);c.lineTo(3,4.5);c.closePath();c.fillStyle='#c83e2b';c.fill();
        c.beginPath();c.arc(-11,0,2.2,0,Math.PI*2);c.fillStyle='#ffefc0';c.fill();c.restore();
        elements.push({id:'guide-direction',kind:'indicator',rect:arrow.widgetRect,group:'guide-direction',z:102});
      }
      c.restore();this.guideFrame={ground:this.groundGuide,badges,category:category.verb,goalId:goal.id,name:goal.name,portal,height,near,nearestId:g.nearest?.()?.id||null,reducedMotion:!!reduced,marker,targetRect,anchor,connection,markerClear:placement.clear,arrow,unit,elements,obstacles};
      root.XiuxianGuide?.recordFrame?.(g,this.guideFrame);
    }
    draw(g,pointer,selected,time){
      this.motion.begin(g,time,this.options); if(this.motion.reduced)time=0;
      this.currentGame=g;this.guideObstacles=[];const c=this.ctx;
      super.draw(g,pointer,selected,time);
    }
  }
  root.XiuxianView=FeedbackView;
})(globalThis);
