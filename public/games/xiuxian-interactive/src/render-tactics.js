(function(root){
  'use strict';
  class TacticsView extends root.XiuxianView{
    constructor(canvas){super(canvas);this.campaignEnemyHUDEnabled=true;this.enemyHudFrames=[];this.combatNumberFrames=[];}
    draw(...args){this.campaignNPCSprites=[];return super.draw(...args);}
    recordCampaignNPC(npc,atlas,cell,x,feetY,height){
      const A=root.XiuxianArt,rect=A[atlas]?.[cell],image=A.images[atlas];
      if(rect&&image?.complete&&image.naturalWidth){const w=height*rect[2]/rect[3];this.campaignNPCSprites.push({objectId:npc.id,name:npc.name,atlas,cell,rect:[x-w/2,feetY-height,w,height]});}
    }

    effect(c,e){
      // Keep campaign HP/armor receipts above the readable enemy labels.
      if(this.currentGame?.inCampaign?.()&&e.kind==='number'&&e.recipientId&&['hp','armor'].includes(e.numberChannel))return;
      return super.effect(c,e);
    }
    campaignHUDObstacles(g){
      const obstacles=[],toast=document.getElementById('toast'),canvas=this.canvas.getBoundingClientRect();
      if(toast?.classList.contains('visible')&&canvas.width){const r=toast.getBoundingClientRect();obstacles.push({x:(r.left-canvas.left)*1280/canvas.width,y:(r.top-canvas.top)*760/canvas.height,w:r.width*1280/canvas.width,h:r.height*760/canvas.height});}
      for(const enemy of g?.activeEnemies?.()||[]){const threat=root.XiuxianCombat.threat(enemy);if(threat){const b=root.XiuxianCombat.bounds(threat.area);obstacles.push({x:b.x,y:b.y,w:b.w,h:b.h});}}
      return obstacles;
    }
    placeCampaignLabel(desired,candidates,occupied){
      const overlap=(a,b)=>a.x<b.x+b.w+8&&a.x+a.w+8>b.x&&a.y<b.y+b.h+8&&a.y+a.h+8>b.y,clear=b=>occupied.every(o=>!overlap(b,o));
      const near=candidates.find(clear);if(near)return near;
      const grid=[];for(let y=12;y<=680-desired.h;y+=28)for(let x=12;x<=1268-desired.w;x+=28)grid.push({x,y,w:desired.w,h:desired.h});
      grid.sort((a,b)=>(a.x-desired.x)**2+(a.y-desired.y)**2-((b.x-desired.x)**2+(b.y-desired.y)**2));
      return grid.find(clear)||candidates[0];
    }
    campaignEnemyHUD(c,g){
      const drawn=new Set();this.enemyHudFrames=[];
      if(!g.inCampaign?.())return drawn;
      const enemies=g.activeEnemies().filter(e=>e.hp>0&&!['wang','keeper'].includes(e.kind)).sort((a,b)=>a.id.localeCompare(b.id)),occupied=this.campaignHUDObstacles(g);
      const bodies=enemies.map(e=>({x:e.x-44,y:e.y-(root.XiuxianArt.enemyActions[e.kind]?.height||122),w:88,h:root.XiuxianArt.enemyActions[e.kind]?.height||122}));
      const selected=g.selectedEnemy();
      const measure=text=>{c.save();c.font='22px "Microsoft YaHei", sans-serif';const m=c.measureText(text);c.restore();return m;};
      const overlap=(a,b)=>a.x<b.x+b.w+8&&a.x+a.w+8>b.x&&a.y<b.y+b.h+8&&a.y+a.h+8>b.y;
      for(const enemy of enemies){
        const armor=g.encounterInfo?.(enemy),height=root.XiuxianArt.enemyActions[enemy.kind]?.height||122;
        const stateLabel=enemy.wind>0?'蓄力':g.recoveryFor(enemy)>0?'收招':'';
        const name=(selected===enemy?'主攻 · ':'')+(enemy.name||'阵灵')+(stateLabel?' · '+stateLabel:''),hp='气血 '+Math.ceil(enemy.hp)+' / '+enemy.maxHp;
        const armorText=armor?(armor.broken?armor.name+'护甲已破':armor.name+'护甲 '+Math.ceil(armor.armor)+' / '+armor.maxArmor):null;
        const w=Math.max(232,Math.ceil(Math.max(...[name,hp,armorText].filter(Boolean).map(text=>measure(text).width)))+24),h=armor?116:76;
        const desired={x:enemy.x-w/2,y:enemy.y-height-h-12};
        const candidates=[[0,0],[-w-14,0],[w+14,0],[0,-h-14],[0,h+height+26],[-w-14,-h-14],[w+14,-h-14],[-w-14,h+14],[w+14,h+14]].map(([dx,dy])=>({x:Math.max(12,Math.min(1268-w,desired.x+dx)),y:Math.max(12,Math.min(680-h,desired.y+dy)),w,h}));
        const box=this.placeCampaignLabel({...desired,w,h},candidates,occupied.concat(bodies));occupied.push(box);
        const center=box.x+w/2,bg='#10261f',border=selected===enemy?'#e0bd70':'#718e7b',elements=[];
        c.save();const anchorY=Math.max(8,enemy.y-height*.5);c.beginPath();c.moveTo(Math.max(box.x+8,Math.min(box.x+w-8,enemy.x)),box.y+h);c.lineTo(enemy.x,anchorY);c.strokeStyle='#0b1712';c.lineWidth=6;c.stroke();c.strokeStyle=selected===enemy?'#ffe3a5':'#d8e3cf';c.lineWidth=2.5;c.stroke();c.fillStyle=c.strokeStyle;c.beginPath();c.arc(enemy.x,anchorY,3,0,Math.PI*2);c.fill();
        c.fillStyle=bg;c.fillRect(box.x,box.y,w,h);c.strokeRect(box.x,box.y,w,h);
        elements.push({id:enemy.id+':panel',kind:'panel',rect:[box.x,box.y,w,h],opaque:true,z:this.hudDrawOrder++});
        const line=(id,text,y,color)=>{const m=measure(text),ascent=m.actualBoundingBoxAscent||22,descent=m.actualBoundingBoxDescent||0;this.text(c,text,center,y,color,22);elements.push({id:enemy.id+':'+id,kind:'text',text,rect:[center-m.width/2,y-ascent,m.width,ascent+descent],glyphH:ascent+descent,fg:[1,3,5].map(at=>parseInt(color.slice(at,at+2),16)),bg:[16,38,31],z:this.hudDrawOrder++,parent:enemy.id+':panel'});};
        line('name',name,box.y+24,selected===enemy?'#ffe3a5':'#f0e5c8');line('hp',hp,box.y+52,'#f0d29a');
        c.fillStyle='#0b1712';c.fillRect(box.x+12,box.y+60,w-24,6);c.fillStyle='#d0ad74';c.fillRect(box.x+12,box.y+60,(w-24)*Math.max(0,Math.min(1,enemy.hp/enemy.maxHp)),6);
        if(armor){line('armor',armorText,box.y+92,'#c8e3d9');c.fillStyle='#0b1712';c.fillRect(box.x+12,box.y+100,w-24,6);c.fillStyle='#a7d4c9';c.fillRect(box.x+12,box.y+100,(w-24)*Math.max(0,Math.min(1,armor.armor/armor.maxArmor)),6);}
        c.restore();drawn.add(enemy);
        this.enemyHudFrames.push({enemyId:enemy.id,aiKind:enemy.kind,armorKind:armor?.kind||null,selected:selected===enemy,stateLabel,hp:Math.ceil(enemy.hp),maxHp:enemy.maxHp,armor:armor?Math.ceil(armor.armor):null,maxArmor:armor?.maxArmor??null,broken:armor?.broken??null,elements});
      }
      return drawn;
    }
    campaignCombatNumbers(c,g){
      this.combatNumberFrames=[];if(!g.inCampaign?.())return;
      const actors=g.activeEnemies(),occupied=this.enemyHudFrames.map(h=>{const [x,y,w,height]=h.elements[0].rect;return {x,y,w,h:height};}).concat(this.campaignHUDObstacles(g),(this.campaignNPCSprites||[]).map(n=>{const [x,y,w,h]=n.rect;return {x,y,w,h};}),actors.filter(e=>e.hp>0).map(e=>({x:e.x-40,y:e.y-(root.XiuxianArt.enemyActions[e.kind]?.height||122),w:80,h:root.XiuxianArt.enemyActions[e.kind]?.height||122})),[{x:g.state.x-40,y:g.state.y-94,w:80,h:94}]),groups=new Map();
      for(const [index,e]of g.effects.entries()){
        if(e.kind!=='number'||!e.recipientId||!['hp','armor'].includes(e.numberChannel)||e.age>=e.life)continue;
        const key=e.recipientId;if(!groups.has(key))groups.set(key,{recipientId:key,recipientName:key==='player'?'自身':e.recipientName||'接收者',items:[]});
        groups.get(key).items.push({effect:e,index,alpha:Math.min(1,Math.max(0,(1-e.age/e.life)/.25))});
      }
      for(const group of groups.values()){
        const actor=group.recipientId==='player'?g.state:actors.find(e=>e.id===group.recipientId),first=group.items[0].effect;
        const height=group.recipientId==='player'?94:root.XiuxianArt.enemyActions[actor?.kind]?.height||122,anchor=actor?{x:actor.x,y:Math.max(8,actor.y-height*.5)}:{x:first.x,y:first.y};
        const rows=group.items.map(item=>({...item,text:item.effect.numberChannel==='armor'?'削甲 '+item.effect.text.replace(/^削甲\s*/, ''):'气血 '+item.effect.text})),shortName=group.recipientName.split(/\s*·\s*/)[0];
        const title=shortName!==group.recipientName&&actors.filter(e=>(e.name||'').startsWith(shortName)).length===1?shortName:group.recipientName;
        c.save();c.font='22px "Microsoft YaHei", sans-serif';const measure=text=>c.measureText(text),w=Math.max(156,Math.ceil(Math.max(...[title,...rows.map(r=>r.text)].map(t=>measure(t).width)))+24),h=28*(rows.length+1)+12;
        const desired={x:anchor.x+(anchor.x<640?-w-35:35),y:anchor.y+30,w,h},candidates=[[0,0],[-w-20,0],[w+20,0],[0,-h-20],[0,h+20],[-w-20,-h-20],[w+20,-h-20]].map(([dx,dy])=>({x:Math.max(12,Math.min(1268-w,desired.x+dx)),y:Math.max(12,Math.min(680-h,desired.y+dy)),w,h}));
        const box=this.placeCampaignLabel(desired,candidates,occupied);occupied.push(box);const alpha=Math.max(...group.items.map(i=>i.alpha)),id='recipient:'+group.recipientId,elements=[];
        c.globalAlpha*=alpha;c.beginPath();c.moveTo(Math.max(box.x+6,Math.min(box.x+w-6,anchor.x)),box.y+h/2);c.lineTo(anchor.x,anchor.y);c.strokeStyle='#0b1712';c.lineWidth=6;c.stroke();c.strokeStyle='#eee4c7';c.lineWidth=2.5;c.stroke();c.fillStyle='#eee4c7';c.beginPath();c.arc(anchor.x,anchor.y,3,0,Math.PI*2);c.fill();c.fillStyle='#10261f';c.fillRect(box.x,box.y,w,h);c.globalAlpha/=alpha||1;
        elements.push({id:id+':panel',kind:'panel',rect:[box.x,box.y,w,h],opaque:alpha>=1,z:this.hudDrawOrder++});
        const line=(name,text,y,color,opacity,life)=>{const m=measure(text),ascent=m.actualBoundingBoxAscent||22,descent=m.actualBoundingBoxDescent||0;c.save();c.globalAlpha*=opacity;this.text(c,text,box.x+w/2,y,color,22);c.restore();elements.push({id:id+':'+name,kind:'text',text,rect:[box.x+w/2-m.width/2,y-ascent,m.width,ascent+descent],glyphH:ascent+descent,...(life?{visibleMs:life*1000,chars:text.length}:{}),...(opacity>=1?{fg:[1,3,5].map(at=>parseInt(color.slice(at,at+2),16)),bg:[16,38,31]}:{faintSkipReason:'Fading alpha requires inspecting actual background pixels.'}),z:this.hudDrawOrder++,parent:id+':panel'});};
        line('owner',title,box.y+24,'#f0e5c8',alpha,Math.max(...group.items.map(i=>i.effect.life)));
        rows.forEach((row,index)=>line('value:'+index,row.text,box.y+52+index*28,row.effect.color,row.alpha,row.effect.life));c.restore();
        this.combatNumberFrames.push({recipientId:group.recipientId,recipientName:group.recipientName,displayRecipientName:title,anchor,liveRecipient:!!actor,alpha,values:rows.map(r=>({sourceIndex:r.index,numberChannel:r.effect.numberChannel,text:r.effect.text,age:r.effect.age,life:r.effect.life,alpha:r.alpha})),elements});
      }
    }
    combatHUD(c,g){
      super.combatHUD(c,g);this.hudDrawOrder=0;this.enemyHudFrames=[];this.combatNumberFrames=[];if(g.isChild()||g.inCase())return;
      c.save();
      const campaignDrawn=this.campaignEnemyHUD(c,g),e=g.selectedEnemy();if(e&&!campaignDrawn.has(e)&&!this.foeLabels.includes(e)){this.text(c,'主攻',e.x,e.y-108,'#d9e6ca',12);c.strokeStyle='#d9e6ca';c.lineWidth=2;c.beginPath();c.moveTo(e.x-5,e.y-100);c.lineTo(e.x,e.y-94);c.lineTo(e.x+5,e.y-100);c.stroke();}
      for(const enemy of g.activeEnemies())if(enemy.hp>0&&g.sealFor(enemy)>0)this.text(c,'定脉 · 待接符',enemy.x,enemy.y+31,'#c3d8e3',11);
      for(const enemy of g.activeEnemies())if(enemy.hp>0&&!campaignDrawn.has(enemy)&&!this.foeLabels.includes(enemy)){const t=g.encounterInfo?.(enemy);if(!t||t.broken)continue;const y=enemy.y-83;c.fillStyle='#132d32ed';c.fillRect(enemy.x-35,y,70,5);c.fillStyle='#a7d4c9';c.fillRect(enemy.x-35,y,70*t.armor/t.maxArmor,5);this.text(c,t.name+' '+Math.ceil(t.armor),enemy.x,y-6,'#c8e3d9',11);}
      this.campaignCombatNumbers(c,g);
      c.restore();
    }
  }
  root.XiuxianView=TacticsView;
})(globalThis);
