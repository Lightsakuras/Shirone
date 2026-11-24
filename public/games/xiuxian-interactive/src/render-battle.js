(function(root){
  'use strict';
  const Base=root.XiuxianView,A=root.XiuxianArt,C=root.XiuxianCombat,S=root.XiuxianStage,R=root.XiuxianExpeditionData;
  const closeFoes=(a,b)=>a.id!==b.id && Math.abs(a.x-b.x)<114 && Math.abs(a.y-b.y)<100;
  class BattleView extends Base{
    constructor(canvas){super(canvas);this.canopyOpacity=new Map();this.stageMap=null;this.stageTime=0;this.visibleBoss=null;}
    heartDemon(c,e,actor,store,time,reduced){
      const hurt=!reduced&&actor.effects.some(f=>f.kind==='number'&&f.recipientId===e.id&&f.age<.10);
      if(A.drawRebornFoe(c,'boss-heart',e.x,e.y,151,e.x<actor.state.x,hurt))return;
      const D=root.XiuxianArmoryData,school=Object.keys(D.weapons)[Math.floor(e.casts/2)%5],gear=store.summary();
      root.XiuxianAvatar.draw(c,{x:e.x,y:e.y,height:151,atlas:'characters',cell:4,flip:e.x>actor.state.x,time,swing:e.wind>0?.5:0,
        summary:{...gear,look:{...gear.look,weapon:D.bases['ancient_'+school],robe:D.bases.emperor_robe,cloak:D.bases.dao_halo}}});
    }
    draw(...args) {
      this.foeLabels=[];
      const g=args[0],time=args[3]||0;
      if(g?.activeEnemies&&root.XiuxianEnemyVfx)root.XiuxianEnemyVfx.observe(this,g.activeEnemies(),time,this.motion.reduced);
      return super.draw(...args);
    }
    foePose(c,e,pose,flip=false,alpha=1){
      const d=A.enemyActions[e.kind];if(!d)return;
      if(e.spriteKey&&A[e.spriteKey]){c.save();c.globalAlpha*=alpha;this.sprite(c,e.spriteKey,e.spriteCell||0,e.x,e.y,d.height,flip);c.restore();return;}
      const cell=e.kind==='wang'?pose:d.row*4+pose,[sx,sy,sw,sh]=A[d.atlas][cell],[fx,fy]=d.feet[pose],scale=d.height/d.body;
      c.save();c.translate(e.x,e.y);if(flip)c.scale(-1,1);c.globalAlpha*=alpha;
      c.drawImage(A.images[d.atlas],sx,sy,sw,sh,(sx-fx)*scale,(sy-fy)*scale,sw*scale,sh*scale);
      this.motion.flash(c,A.images[d.atlas],A[d.atlas][cell],(sx-fx)*scale,(sy-fy)*scale,sw*scale,sh*scale);c.restore();
    }
    enemy(c,e,time){
      const d=A.enemyActions[e.kind];if(!d)return super.enemy(c,e,time);if(e.hp<=0)return;
      const g=this.currentGame,m=g.enemyMotion?.get(e),flip=m?.flip??e.x>g.state.x;
      let pose=null;
      if(e.kind==='wang')pose=e.wind>0?({wave:3,channel:5,cleave:1}[e.mode]??1):e.weak>0||m?.hurt>0?6:m?.strike>0?(m.mode==='wave'?4:m.mode==='channel'?5:2):0;
      else pose=e.wind>0?0:m?.strike>0?1:m?.hurt>0?2:null;
      this.enemyCharge?.(c,e,time);
      root.XiuxianEnemyVfx.ground(c,e,d.height,time,this.motion.reduced);
      const evfx=root.XiuxianEnemyVfx;
      if(evfx&&e.anim)evfx.beforeBody(c,e,d.height,time,this.motion.reduced);
      c.save();
      root.XiuxianEnemyVfx.arrival(c,e,time,this.motion.reduced);
      if(!this.motion.reduced && m?.hurt>0){
        const elapsed=.18-m.hurt;
        // Hold only the painted recoil for 32 ms, then settle past centre.
        const k=elapsed<.032?4.2:4.2*Math.cos((elapsed-.032)*36)*Math.pow(m.hurt/.148,2);
        c.translate((m.hitX||0)*k,(m.hitY||0)*k);
        this.motion.flashAlpha=Math.max(0,1-elapsed/.085)*.54;
      }
      if(evfx&&e.anim)evfx.applyPose(c,e,d.height,time,this.motion.reduced);
      else this.motion.pose(c,e.x,e.y,m?.walk>.01);
      if(e.spriteKey&&A[e.spriteKey])this.sprite(c,e.spriteKey,e.spriteCell||0,e.x,e.y,d.height,flip);
      else if(pose!==null)this.foePose(c,e,pose,flip);
      else if(R.enemies[e.kind])this.sprite(c,'foes',R.enemies[e.kind].cell,e.x,e.y,d.height,flip);
      else this.sprite(c,'characters',e.kind==='stone'?9:10,e.x,e.y,d.height,flip);
      this.motion.flashAlpha=0;c.restore();
      if(evfx&&e.anim)evfx.afterBody(c,e,d.height,time,this.motion.reduced);
      if(e.poise)root.XiuxianPoise.bar(c,e,e.x-32,e.y+7,64);
      if(e.burn>0)for(let i=0;i<4;i++){const p=(time*.8+i*.25)%1;this.circle(c,e.x+Math.sin(i*4)*20,e.y-14-p*d.height*.65,2.7*(1-p)+.4,'rgba(242,153,62,'+(1-p)*.8+')');}
      if(e.slow>0){c.save();c.translate(e.x,e.y+2);c.scale(1,.35);this.circle(c,0,0,27,'#b4dfe81a','#d0e5e6aa');c.restore();}
      if(['wang','keeper'].includes(e.kind)){if(e.weak>0)this.label(c,'气路已破',e.x,e.y-d.height-14,true);return;}
      // Campaign vitals are drawn once, above effects, by the tactics view.
      if(g.inCampaign?.()&&this.campaignEnemyHUDEnabled)return;
      this.foeLabels.push(e);
    }
    fieldDamageLinks(c,g){
      this.hitPlates=null;
      this.attachedNumbers ||= new WeakMap();
      if(g.inCampaign?.())return;
      const hits=g.effects.filter(f=>f.kind==='number' && f.age<f.life && f.recipientId && f.recipientId!=='player' && (f.numberChannel==='hp'||f.numberChannel==='armor'));
      if(!hits.length)return;
      const active=g.activeEnemies(),actors=new Map(active.map(e=>[e.id,e]));
      // A lethal hit can remove its owner before the first paint.
      for(const f of g.fallen||[])if(!actors.has(f.enemy.id))actors.set(f.enemy.id,f.enemy);
      const owners=new Map(), alive=active.filter(e=>e.hp>0);
      for(const f of hits){
        const attached=this.attachedNumbers.get(f),e=actors.get(f.recipientId)||attached?.actor;
        if(!e)continue;
        // Once attached, keep following this exact recipient through separation and death.
        if(!attached){
          const close=other=>closeFoes(e,other);
          if(!alive.some(close) && !hits.some(other=>actors.has(other.recipientId)&&close(actors.get(other.recipientId))))continue;
          this.attachedNumbers.set(f,{actor:e,flank:null});
        }
        if(!owners.has(e.id))owners.set(e.id,{actor:e,hits:[]});
        owners.get(e.id).hits.push(f);
      }
      if(!owners.size)return;
      const unit=Math.max(1,1280/(this.canvas.clientWidth||1280)),heightOf=e=>A.enemyActions[e.kind]?.height||96;
      const plates=[],blocked=alive.map(e=>[e.x-32,e.y-heightOf(e),64,heightOf(e)]);
      blocked.push([g.state.x-32,g.state.y-94,64,96],[400,96,480,49]);
      if(alive.some(e=>e.kind==='wang'||e.kind==='keeper'))blocked.push([402,12,476,80]);
      for(const e of alive){
        const threat=C.threat(e);
        if(threat){const b=C.bounds(threat.area);blocked.push([b.x-9,b.y-9,b.w+18,b.h+18]);}
      }
      const enemies=this.foeLabels.slice();
      for(const {actor} of owners.values())if(!enemies.includes(actor))enemies.push(actor);
      c.save();
      for(const e of enemies){
        const name=e.name||R.enemies[e.kind]?.name||(e.kind==='wang'?'王屠户':e.kind==='stone'?'守匣石傀':'游荡石灵');
        const title=(e.wind>0?'！':'')+(g.selectedEnemy?.()===e?'◆ ':'')+name;
        const nameSize=Math.max(17,Math.ceil(15*unit)),nameFont='600 '+nameSize+'px "Microsoft YaHei",sans-serif';
        c.font=nameFont;
        const nameWidth=Math.max(92,Math.ceil(c.measureText(title).width)+18),rows=[];
        const effects=owners.get(e.id)?.hits||[];
        for(const f of effects){
          const repeat=rows.find(r=>r.text===f.text&&r.channel===f.numberChannel&&r.accent===f.accent);
          if(repeat){repeat.count++;repeat.age=Math.min(repeat.age,f.age);continue;}
          rows.push({text:f.text,channel:f.numberChannel,accent:f.accent,color:f.color,age:f.age,count:1});
        }
        rows.sort((a,b)=>Number(a.channel==='armor')-Number(b.channel==='armor'));
        let valueWidth=0,lineHeight=0;
        for(const row of rows){
          const heavy=row.accent==='finisher'||row.accent==='weak',size=Math.max(heavy?27:20,Math.ceil((row.channel==='armor'?14:17)*unit));
          row.font='600 '+size+'px "Microsoft YaHei",sans-serif';
          row.value=row.text+(row.count>1?' ×'+row.count:'');
          if(heavy)row.color='#ffe09c';
          c.font=row.font;valueWidth=Math.max(valueWidth,Math.ceil(c.measureText(row.value).width)+18);
          lineHeight=Math.max(lineHeight,size+5);
        }
        const w=nameWidth+valueWidth,h=Math.max(nameSize+20,rows.length*lineHeight+8);
        const neighbours=enemies.filter(other=>closeFoes(e,other));
        const hasHigher=neighbours.some(other=>other.y<e.y);
        const centreX=neighbours.reduce((x,other)=>x+other.x,0)/Math.max(1,neighbours.length);
        const last=effects.find(f=>this.attachedNumbers.get(f).flank!==null);
        const flank=last?this.attachedNumbers.get(last).flank:hasHigher?Math.sign(e.x-centreX):0;
        for(const f of effects)this.attachedNumbers.get(f).flank=flank;
        const rect=this.placeFieldPlate(e.x+flank*(w/2+40),e.y-heightOf(e)-10,w,h,blocked);
        if(!rect)continue;
        blocked.push(rect);
        plates.push({enemy:e,title,nameFont,nameWidth,rows,lineHeight,rect,anchor:[e.x,e.y-heightOf(e)*.65]});
      }
      this.hitPlates=plates;
      // Paint short stems below the authoritative warning rim and below every name and bar.
      for(const p of plates){
        if(!p.rows.length)continue;
        const [x,y,w,h]=p.rect,[ax,ay]=p.anchor;
        const sx=Math.max(x+3,Math.min(x+w-3,ax)),sy=Math.max(y,Math.min(y+h,ay));
        c.beginPath();c.moveTo(sx,sy);c.lineTo(ax,ay);
        c.strokeStyle='#17261fee';c.lineWidth=3.4*unit;c.stroke();
        c.strokeStyle='#e2cc9d';c.lineWidth=1.2*unit;c.stroke();
        this.circle(c,ax,ay,2.2*unit,'#ead7ad');
      }
      c.restore();
    }
    placeFieldPlate(anchorX,bottom,w,h,blocked){
      const locate=(cx,cy)=>[Math.max(6,Math.min(1274-w,cx-w/2)),Math.max(8,Math.min(678-h,cy-h)),w,h];
      const clear=([x,y])=>blocked.every(([bx,by,bw,bh])=>x+w+5<=bx||x>=bx+bw+5||y+h+5<=by||y>=by+bh+5);
      const preferred=locate(anchorX,bottom);
      if(clear(preferred))return preferred;
      // Expand around the chosen shoulder in small steps to keep its stem short.
      for(let d=12;d<=240;d+=12){
        for(const [dx,dy] of [[0,-d],[-d,0],[d,0],[0,d],[-d,-d],[d,-d],[-d,d],[d,d]]){
          const box=locate(anchorX+dx,bottom+dy);
          if(clear(box))return box;
        }
      }
      for(let y=8;y+h<=678;y+=16)for(let x=6;x+w<=1274;x+=16){
        const box=[x,y,w,h];if(clear(box))return box;
      }
      return null;
    }
    drawAttachedPlates(c,g){
      c.save();c.textAlign='left';c.textBaseline='middle';this.foeLabelBoxes=[];
      for(const p of this.hitPlates){
        const {enemy:e,rect:[x,y,w,h],nameWidth,title,rows}=p,mid=y+h/2;
        this.foeLabelBoxes.push({x:x+w/2,y:mid,w,rect:p.rect});
        this.guideObstacles?.push({id:'enemy:'+e.id,rect:p.rect});
        c.fillStyle='#102820';c.fillRect(x,y,w,h);
        if(rows.length){
          c.fillStyle='#28362b';c.fillRect(x+nameWidth,y,w-nameWidth,h);
          c.fillStyle='#9d8658';c.fillRect(x+nameWidth,y+4,1,h-8);
        }
        c.font=p.nameFont;c.fillStyle=e.wind>0?'#ffc6a4':'#fff1d2';c.fillText(title,x+8,mid-(e.hp>0?5:0));
        if(e.hp>0){
          const barX=x+8,barWidth=nameWidth-16,armor=g.encounterInfo?.(e);
          c.fillStyle='#53675a';c.fillRect(barX,mid+7,barWidth,4);
          c.fillStyle=e.wind>0?'#e79975':'#b3cfb6';c.fillRect(barX,mid+7,barWidth*e.hp/e.maxHp,4);
          if(armor&&!armor.broken){c.fillStyle='#9bcbd4';c.fillRect(barX,mid+13,barWidth*armor.armor/armor.maxArmor,2);}
        }
        rows.forEach((r,i)=>{
          const lift=this.motion.reduced?0:Math.sin(Math.PI*Math.min(1,r.age/.16))*1.8;
          c.font=r.font;c.fillStyle=r.color;c.fillText(r.value,x+nameWidth+9,mid+(i-(rows.length-1)/2)*p.lineHeight-lift);
        });
      }
      c.restore();
    }
    drawFoeLabels(c,g){
      if(this.hitPlates){this.drawAttachedPlates(c,g);return;}
      const placed=[];this.foeLabelBoxes=placed;
      for(const e of this.foeLabels){
        const armor=g.encounterInfo?.(e),selected=g.selectedEnemy?.()===e;
        const name=e.name||R.enemies[e.kind]?.name||(e.kind==='stone'?'守匣石傀':'游荡石灵');
        const title=(e.wind>0?'！':'')+(selected?'◆ ':'')+name, width=Math.max(112,title.length*16+12);
        const anchor=e.y-A.enemyActions[e.kind].height-20;
        const center=Math.min(1276-width/2,Math.max(width/2+4,e.x));
        const top=Math.min(740,Math.max(36,anchor));
        let x=center,y=top;
        findSpace: for(const dx of [0,-width-8,width+8]){
          for(let row=0;row<20;row++){
            for(const offset of row?[-row,row]:[0]){
              const px=center+dx,py=top+offset*38;
              if(px<width/2||px>1280-width/2||py<24||py>740)continue;
              if(placed.every(box=>Math.abs(box.x-px)>=(box.w+width)/2+5||Math.abs(box.y-py)>=38)){
                x=px;y=py;break findSpace;
              }
            }
          }
        }
        placed.push({x,y,w:width});
        c.fillStyle='#102820f5';c.fillRect(x-width/2,y-17,width,32);
        c.fillStyle='#53675a';c.fillRect(x-width/2+6,y+4,width-12,4);
        c.fillStyle=e.wind>0?'#e79975':'#b3cfb6';c.fillRect(x-width/2+6,y+4,(width-12)*e.hp/e.maxHp,4);
        if(armor&&!armor.broken){c.fillStyle='#9bcbd4';c.fillRect(x-width/2+6,y+10,(width-12)*armor.armor/armor.maxArmor,2);}
        this.text(c,title,x,y,e.wind>0?'#ffc6a4':'#fff1d2',15);
      }
    }
    floorFigures(c,g,time){
      const fx=root.XiuxianEnemyVfx;
      for(const f of g.fallen||[])if(A.enemyActions[f.enemy.kind])fx.fallen(this,f.enemy,time-f.age);
      fx.remnants(c,this,time,this.motion.reduced,e=>this.foePose(c,e,3,e.x>g.state.x));

      const t=g.state.chapter.tomb;if(g.state.map==='tomb'&&t.boss?.hp<=0&&['farewell','escort','report','complete'].includes(t.stage))this.foePose(c,t.boss,7,false,.92);
    }
    telegraphs(c,g){
      for(const e of g.activeEnemies()){
        const t=C.threat(e);if(!t)continue;const a=t.area,p=t.progress,color=t.interruptible?'#e2c574':'#efac86';
        c.save();c.lineWidth=2;c.fillStyle=t.interruptible?'#8d6c393c':'#a347353c';c.strokeStyle=color;
        if(a.kind==='band'){
          const b=C.bounds(a);c.fillRect(b.x,b.y,b.w,b.h);c.strokeRect(b.x,b.y,b.w,b.h);c.fillStyle='#edbe8d88';c.fillRect(b.x,b.y+b.h-5,b.w*p,5);
        }else{
          if(t.interruptible)c.setLineDash([7,5]);this.circle(c,a.x,a.y,a.r,c.fillStyle,color);c.setLineDash([]);
          c.beginPath();c.moveTo(a.x,a.y);c.arc(a.x,a.y,a.r*.94,-Math.PI/2,-Math.PI/2+p*Math.PI*2);c.closePath();c.fillStyle=t.interruptible?'#d4b36438':'#cf7d5330';c.fill();
        }
        c.restore();
      }
    }
    threatOverlay(c,g){
      const threats=g.activeEnemies().map(e=>({e,t:C.threat(e)})).filter(x=>x.t);
      for(const {e,t}of threats){
        const a=t.area,b=C.bounds(a),color=t.interruptible?'#ffe39c':'#ffb49b';
        this.guideObstacles?.push({id:'threat:'+e.id,rect:[b.x-9,b.y-9,b.w+18,b.h+18]});
        const outline=()=>{c.beginPath();if(a.kind==='band')c.rect(b.x,b.y,b.w,b.h);else c.arc(a.x,a.y,a.r,0,Math.PI*2);};
        // Redraw only the boundary above every sprite, canopy and spell effect.
        c.save();c.lineJoin='round';if(t.interruptible)c.setLineDash([9,6]);
        outline();c.lineWidth=7;c.strokeStyle='#271d1bed';c.stroke();
        outline();c.lineWidth=3;c.strokeStyle=color;c.stroke();c.setLineDash([]);
        if(a.kind==='circle'){c.beginPath();c.arc(a.x,a.y,a.r+7,-Math.PI/2,-Math.PI/2+t.progress*Math.PI*2);c.strokeStyle='#fff2df';c.lineWidth=2;c.stroke();}
        else{c.fillStyle='#fff2df';c.fillRect(b.x,b.y+b.h-3,b.w*t.progress,3);}
        c.restore();
      }
      const danger=threats.filter(({t})=>C.contains(t.area,g.state)).sort((a,b)=>a.e.wind-b.e.wind)[0];
      let label='',color='#f9d7c5';
      if(danger)label=danger.t.interruptible?'聚阴可打断 · 出剑 / 寒针':danger.t.area.kind==='band'?'刀气将至 · 向上 / 下闪避':'重击将至 · 离开朱砂圈 / 右键格挡';
      else if(g.state.hp>0 && g.state.hp<=35)label='气血告急';
      else if(g.activeEnemies().some(e=>e.hp>0&&g.recoveryFor?.(e)>0&&Math.hypot(e.x-g.state.x,e.y-g.state.y)<190)){label='收招空隙 · 可以反击';color='#cde1ce';}
      this.canvas.parentElement?.classList.toggle('has-readout',Boolean(label));
      if(!label)return;
      c.save();c.fillStyle='#172522f2';c.strokeStyle= danger?'#d9987b':'#7d9e85';c.lineWidth=1;c.beginPath();c.roundRect(406,100,468,40,4);c.fill();c.stroke();this.text(c,label,640,126,color,18);c.restore();
    }
    foreground(c,g,time){
      if(this.stageMap!==g.state.map){this.stageMap=g.state.map;this.canopyOpacity.clear();this.stageTime=time;}
      const dt=Math.max(0,Math.min(.04,time-this.stageTime));this.stageTime=time;
      const layers=S.layers(g.state.map);if(this.options.foreground===false)return;
      layers.forEach((l,i)=>{
        const target=S.alpha(l,g),old=this.canopyOpacity.get(i)??target;
        // Obstruction clears immediately; opacity returns gradually only while game time advances.
        const alpha=target<old?target:Math.min(target,old+dt*2);this.canopyOpacity.set(i,alpha);
        const [sx,sy,sw,sh]=A.canopies[l.cell];c.save();c.globalAlpha=alpha;c.translate(l.x+(l.flip?l.w:0),l.y);if(l.flip)c.scale(-1,1);c.drawImage(A.images.canopies,sx,sy,sw,sh,0,0,l.w,l.h);c.restore();
      });
    }
    fieldNumbers(c,g){
      if(!g.effects.some(e=>e.kind==='number'||e.recovered))return;
      const occupied=[],enemies=g.activeEnemies(),campaign=g.inCampaign?.(),unit=Math.max(1,1280/this.canvas.clientWidth);
      for(const box of this.foeLabelBoxes||[])occupied.push(box.rect||[box.x-box.w/2,box.y-17,box.w,32]);
      for(const actor of enemies){
        if(actor.hp<=0)continue;
        occupied.push([actor.x-33,actor.y-(A.enemyActions[actor.kind]?.height||96),66,A.enemyActions[actor.kind]?.height||96]);
        const threat=C.threat(actor);if(threat){const b=C.bounds(threat.area);occupied.push([b.x-5,b.y-5,b.w+10,b.h+10]);}
      }
      occupied.push([g.state.x-32,g.state.y-96,64,98]);
      c.save();c.textAlign='center';c.textBaseline='middle';c.lineJoin='round';
      for(const e of g.effects){
        if(this.attachedNumbers?.has(e) && this.hitPlates?.some(p=>p.enemy.id===e.recipientId))continue;
        const heal=e.kind==='heal'&&e.recovered;
        if(!heal && (e.kind!=='number'||campaign&&e.recipientId&&['hp','armor'].includes(e.numberChannel)))continue;
        const heavy=e.accent==='finisher'||e.accent==='weak',size=Math.max(heavy?28:21,16*unit);
        const value=heal?'+'+e.recovered:e.text,color=heal?'#bcefc9':heavy?'#ffe09c':e.color;
        c.font='600 '+size+'px "Microsoft YaHei",sans-serif';
        const w=c.measureText(value).width+8,h=size+6,p=this.motion.reduced?.4:e.age/e.life;
        const x=e.x,y=e.y-(heal?76:52)-p*15-Math.sin(Math.PI*p)*(heavy?13:6);
        // Prefer a small shoulder offset, then fan out on each side of crowded nameplates.
        let px=x,py=y;
        search:for(let ring=0;ring<9;ring++){
          for(const side of (heal?[-1,1]:[1,-1])){
            const cx=Math.max(w/2+5,Math.min(1275-w/2,x+side*(41+w/2+Math.floor(ring/3)*(w+12))));
            const cy=Math.max(h/2+7,Math.min(681,y+(ring%3-1)*(h+5)));
            if(occupied.every(b=>cx+w/2<b[0]-3||cx-w/2>b[0]+b[2]+3||cy+h/2<b[1]-3||cy-h/2>b[1]+b[3]+3)){
              px=cx;py=cy;break search;
            }
          }
        }
        occupied.push([px-w/2,py-h/2,w,h]);
        c.strokeStyle='#23332e';c.lineWidth=3.5;c.strokeText(value,px,py);c.fillStyle=color;c.fillText(value,px,py);
      }
      c.restore();
    }
    combatHUD(c,g){
      this.drawFoeLabels(c,g);
      this.fieldNumbers(c,g);
      const boss=g.activeEnemies().find(e=>e.hp>0&&['wang','keeper'].includes(e.kind));this.visibleBoss=boss?.kind||null;if(!boss)return;
      const x=407,y=18,w=466,ratio=boss.hp/boss.maxHp;
      c.save();c.fillStyle='#18241ee8';c.strokeStyle='#b6a16b8c';c.lineWidth=1;c.beginPath();c.roundRect(x,y,w,68,3);c.fill();c.stroke();
      this.text(c,boss.kind==='wang'?'王屠户 · 邪功未散':'守阵古磬 · 旧阵回响',640,y+20,'#efdfb5',16);
      c.fillStyle='#0d1815';c.fillRect(x+25,y+31,w-50,7);c.fillStyle= boss.weak>0?'#c7b873':'#bb7862';c.fillRect(x+25,y+31,(w-50)*ratio,7);
      if(boss.poise){
        const brk=boss.anim?.state==='broken',pr=brk?Math.max(0,1-(boss.anim.t||0)/2.5):boss.poise.value/boss.poise.max;
        c.fillStyle='#14111a';c.fillRect(x+25,y+40,w-50,5);
        c.fillStyle=brk?'#d7adff':'#ffd36e';c.fillRect(x+25,y+40,(w-50)*Math.max(0,Math.min(1,pr)),5);
      }
      const label=boss.anim?.state==='broken'?'护体真气已破 · 伤害 ×1.8':boss.weak>0?'气路已破 · 趁隙出剑':boss.wind>0?(boss.kind==='keeper'?'磬声将落 · 离开圈内':{cleave:'重斩将至 · 离开圈内',wave:'刀气将至 · 纵向闪避',channel:'正在聚阴 · 剑击或寒针打断'}[boss.mode]):g.recoveryFor?.(boss)>0?'正在收招 · 趁隙反击':'留意起手，保留灵力应对下一招';
      this.text(c,label,640,y+56,'#d6c9ab',11);c.restore();
    }
  }
  root.XiuxianView=BattleView;
})(globalThis);
