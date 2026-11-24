(function(root){
  'use strict';
  const Base=root.XiuxianView,A=root.XiuxianArt;
  class FeelView extends Base{
    trace(c,cell,x,y,width,angle=0,alpha=1){
      const [sx,sy,sw,sh]=A.combatFx[cell],h=width*sh/sw;c.save();c.translate(x,y);c.rotate(angle);c.globalAlpha*=alpha;c.drawImage(A.images.combatFx,sx,sy,sw,sh,-width/2,-h/2,width,h);c.restore();
    }
    sword(c,e,p) {
      const heavy=e.combo===3, r=heavy?84:67;
      c.save();c.translate(e.x,e.y-31);c.rotate(e.angle||0);c.scale(1,.82);
      c.globalAlpha=Math.min(1,(1-p)*2);c.rotate((p-.45)*.95);
      c.beginPath();c.arc(0,0,r,-1.28,1.05);c.quadraticCurveTo(r*.93,r*.28,r-(heavy?18:10),0);
      c.quadraticCurveTo(r*.91,-r*.44,r*Math.cos(-1.28),r*Math.sin(-1.28));c.closePath();
      c.fillStyle=heavy?'#85602acc':'#294940b8';c.fill();
      c.strokeStyle=heavy?'#ffd47a':'#e9ecce';c.lineWidth=heavy?4:2;c.beginPath();c.arc(0,0,r,-1.24,1.03);c.stroke();
      c.strokeStyle='#fff7d9';c.lineWidth=1.3;c.beginPath();c.arc(0,0,r+2,-.8,.74);c.stroke();
      if(!this.motion.reduced)for(let i=0;i<(heavy?12:5);i++){
        const a=-1.24+i*.29,d=r+3+p*(12+i%3*8),x=Math.cos(a)*d,y=Math.sin(a)*d;
        this.line(c,x,y,x+Math.sin(a)*5,y-Math.cos(a)*(heavy?7:4),heavy?'#ffe2a2':'#e1e7d2',1.6);
      }
      c.restore();
    }
    enemyCharge(c,e,time) {
      if(e.wind<=0 || this.motion.reduced)return;
      const spirit=['moth','wisp','sprite','deer'].includes(e.kind);
      const boss=e.kind==='wang'||e.kind==='keeper', progress=root.XiuxianCombat.threat(e)?.progress||0;
      c.save();c.translate(e.x,e.y-29);c.scale(1,.63);
      c.fillStyle=boss?'#b9a3d6':spirit?(e.kind==='wisp'?'#efad89':'#b4dec7'):'#cbb894';
      for(let i=0;i<7;i++){
        const a=i*.898+time*2.1,r=15+(1-progress)*27;
        const x=Math.cos(a)*r,y=Math.sin(a)*r;
        if(boss){c.strokeStyle=i%2?'#57415f':'#c8b4d9';c.lineWidth=2.5;c.beginPath();c.arc(0,0,r+i,a,a+.63);c.stroke();}
        else if(spirit){c.beginPath();c.moveTo(x,y-8);c.quadraticCurveTo(x+7,y+4,x,y+5);c.quadraticCurveTo(x-6,y+4,x,y-8);c.fill();}
        else{c.save();c.translate(x,y);c.rotate(a);c.fillRect(-3,-3,5,7);c.restore();}
      }
      c.restore();
    }
    wave(c,e,p) {
      if(e.mode==='wave'){
        c.save();c.globalAlpha=1-p*.8;c.strokeStyle='#dbb4ad';c.lineWidth=3;
        c.beginPath();c.moveTo(e.x-75,e.y-8);c.quadraticCurveTo(e.x+7,e.y-27-p*22,e.x+92,e.y+4);c.stroke();c.restore();return;
      }
      const shattered=e.kind==='shatter', skill=!!e.skill;
      c.save();c.translate(e.x,e.y);c.scale(1,shattered?.8:.39);c.globalAlpha=1-p*.85;
      c.rotate(p*(shattered?.35:.94));c.strokeStyle=shattered?'#e3c7ef':skill?'#c0e6d6':'#ecc1a3';
      const radius=skill?36+p*48:16+p*44;
      for(let i=0;i<(shattered?9:4);i++){
        const a=i*(shattered?.698:Math.PI/2);
        c.lineWidth=shattered?3:2.4;c.beginPath();c.arc(0,0,radius+i%2*4,a,a+(shattered?.40:1.19));c.stroke();
        c.beginPath();c.moveTo(Math.cos(a)*radius,Math.sin(a)*radius);
        c.lineTo(Math.cos(a+.09)*(radius+9),Math.sin(a+.09)*(radius+9));c.stroke();
      }
      if(skill){c.lineWidth=1;c.beginPath();c.arc(0,0,radius-6,0,Math.PI*2);c.stroke();}
      c.restore();
    }
    projectile(c,e,p) {
      const fire=e.kind==='fire', ox=e.fromX??e.x, oy=e.fromY??e.y-32, y=e.y-18;
      const reach=Math.min(1,p/.23), x=ox+(e.x-ox)*reach, tip=oy+(y-oy)*reach;
      if(!this.motion.reduced && reach<1) {
        c.save();c.translate(x,tip);c.rotate(Math.atan2(y-oy,e.x-ox));
        this.line(c,-39,0,-5,0,fire?'#e6ad6baa':'#abedf3cc',3);
        if(fire){c.rotate(.15);c.fillStyle='#e5c490';c.fillRect(-11,-6,22,12);
          this.line(c,-7,-3,6,2,'#9c4633',2);this.line(c,-2,3,2,-3,'#9c4633',1.8);}
        else{c.fillStyle='#e9f9fb';c.beginPath();c.moveTo(13,0);c.lineTo(-14,-2);c.lineTo(-7,1.8);c.fill();}
        c.restore();return;
      }
      const t=this.motion.reduced?.38:Math.max(0,(p-.23)/.77);
      c.save();c.translate(e.x,y);c.globalAlpha=Math.min(1,(1-t)*1.7);
      if(fire){c.fillStyle='#edab5730';c.beginPath();c.ellipse(0,1,15+t*28,8+t*13,0,0,Math.PI*2);c.fill();}
      for(let i=0;i<(fire?7:6);i++){
        const a=i*Math.PI*2/(fire?7:6);
        c.save();c.rotate(a);const r=12+Math.sin(t*Math.PI)*24+t*6;
        if(fire){
          c.beginPath();c.moveTo(2,0);c.quadraticCurveTo(r*.46,-13,r,0);
          c.quadraticCurveTo(r*.45,9,2,0);c.fillStyle=i%2?'#c3663b':'#a74232';c.fill();
          c.strokeStyle='#ffd791';c.lineWidth=1.8;c.beginPath();c.moveTo(3,0);c.quadraticCurveTo(r*.54,-6,r*.83,0);c.stroke();
          c.fillStyle='#ffd895';c.beginPath();c.ellipse(r*.25,0,r*.26,2.1,-.13,0,Math.PI*2);c.fill();
        }else{
          this.line(c,2,0,r,0,'#def6f7',2.5);this.line(c,r*.48,0,r*.72,-6,'#a0dce8',2);
          this.line(c,r*.62,0,r*.84,5,'#a0dce8',1.6);
        }
        if(!this.motion.reduced){const d=r+6+t*(18+i%3*10);
          c.fillStyle=fire?'#ecad64':'#c9f2f8';c.rotate(.08);c.fillRect(d,-1.2,fire?3.3:6,2.4);}
        c.restore();
      }
      c.restore();
    }
    recovery(c,e,p) {
      const food=e.item==='cake'||e.item==='tea',jade=e.item==='qingxin';
      if(!food){
        c.save();c.translate(e.x,e.y-2);c.globalAlpha=1-p*.7;
        for(let i=0;i<4;i++){
          const a=i*Math.PI/2+p*2,x=Math.cos(a)*21,y=Math.sin(a)*6-p*25;
          c.beginPath();c.moveTo(x,y);c.bezierCurveTo(x+17,y-15,x-18,y-20,x+5,y-38);
          c.strokeStyle=jade||i%2?'#b8e6ca':'#f3dc9c';c.lineWidth=i%2?1.4:2.3;c.stroke();
        }
        c.restore();
      }
    }
    relic(c,e,p){
      const R=root.XiuxianExpeditionData,def=R.relics[e.relic];
      if(!def)return;
      const level=e.level||1,color=R.paths[def.path].color,r=19+level*4+p*11;
      c.save();c.translate(e.x,e.y-32);c.globalAlpha=1-p*.76;c.strokeStyle=color;c.lineWidth=1.4;
      c.beginPath();c.ellipse(0,0,r,r*.55,-.2,0,Math.PI*2);c.stroke();
      if(level>=2){c.beginPath();c.ellipse(0,0,r+4,r*.59,-.2,p*3,p*3+4.4);c.stroke();}
      if(!this.motion.reduced)for(let i=0;i<level*3;i++){
        const a=p*3+i*2.4,x=Math.cos(a)*r,y=Math.sin(a)*r*.55;
        c.save();c.translate(x,y);c.rotate(a);c.strokeStyle=color;c.fillStyle=color;
        if(def.path==='blade'||def.path==='frost')this.line(c,-6,0,3,0,color,1.7);
        else if(def.path==='ward')c.strokeRect(-2,-2,4,4);
        else{c.beginPath();c.ellipse(0,0,def.path==='scent'?5:3,1.8,0,0,Math.PI*2);c.fill();}
        c.restore();
      }
      c.restore();this.sprite(c,'relicsBase',def.cell,e.x,e.y-25-p*10,22+level*3,false,.92-p*.5);
    }
    effect(c,e){
      const p=this.motion.reduced?.38:e.age/e.life;
      if(e.kind==='slash')return this.sword(c,e,p);
      if(e.kind==='impact'||e.kind==='shatter'||e.skill)return this.wave(c,e,p);
      if(e.kind==='fire'||e.kind==='needle')return this.projectile(c,e,p);
      if(e.kind==='heal')return this.recovery(c,e,p);
      if(e.kind==='relicProc')return this.relic(c,e,p);
      if(e.kind==='number'){
        const accent=e.accent,heavy=accent==='finisher'||accent==='weak';
        const lift=this.motion.reduced?0:p*23+Math.sin(p*Math.PI)*(heavy?17:8);
        this.text(c,e.text,e.x,e.y-48-lift,accent==='weak'?'#ffd1aa':heavy?'#ffe39b':e.color,heavy?27:accent==='block'?17:20);return;
      }
      if(this.motion.reduced){
        if(e.kind==='perfectGuard')this.text(c,'破招',e.x,e.y-64,'#f5dfa3',18);
        return;
      }
      const resonance={frostResonance:4,emberResonance:5,scentResonance:6};
      if(Object.hasOwn(resonance,e.kind)){this.trace(c,resonance[e.kind],e.x,e.y,(e.kind==='frostResonance'?170:110)*(1+p*.2),0,.72*(1-p));return;}
      if(e.kind==='perfectGuard'){this.trace(c,3,e.x,e.y,70+p*15,0,1-p);this.text(c,'破招',e.x,e.y-66-p*18,'#f5dfa3',18);return;}
      if(e.kind==='ascend'){this.trace(c,7,e.x,e.y-22,110+p*80,0,1-p);return super.effect(c,e);}
      if(!['riposte','finisher'].includes(e.kind))return super.effect(c,e);
      c.save();c.globalAlpha=1-p;
      if(e.kind==='riposte')this.text(c,'回锋',e.x,e.y-53-p*20,'#f1d49a',16);
      else this.trace(c,2,e.x,e.y,75+p*20,(e.angle||0)-.4,.5);c.restore();
    }
    combatHUD(c,g){
      super.combatHUD(c,g);
      if(g.arsenal&&g.arsenal.clock<g.arsenal.rhythm.freezeUntil+.52&&!this.motion.reduced){
        const age=Math.max(0,g.arsenal.clock-(g.arsenal.rhythm.freezeUntil-.05)),alpha=Math.max(0,1-age/.52);
        c.save();c.globalAlpha=alpha*.52;
        const vg=c.createRadialGradient(640,380,320,640,380,740);
        vg.addColorStop(0,'rgba(88,220,196,0)');vg.addColorStop(.72,'rgba(88,220,196,0.16)');vg.addColorStop(1,'rgba(246,216,130,0.34)');
        c.fillStyle=vg;c.fillRect(0,0,1280,760);
        c.globalAlpha=alpha*.88;c.translate(g.state.x,g.state.y-34);
        c.strokeStyle='#7ef0d6';c.lineWidth=3.2;c.beginPath();c.arc(0,0,34+age*38,-.9,.85);c.stroke();
        c.strokeStyle='#ffe49b';c.lineWidth=2;c.beginPath();c.arc(0,0,42+age*46,Math.PI-.75,Math.PI+.75);c.stroke();
        c.restore();
      }
      if(g.isChild()||g.inCase()||this.fieldHudHidden)return;
      c.save();c.translate(18,711);c.scale(.78,.78);c.fillStyle='#102820ef';c.fillRect(0,0,315,34);this.text(c,'剑势',35,24,'#e5d5ad',22);
      for(let i=0;i<3;i++)this.circle(c,76+i*20,17,5,i<g.combo?'#efd28c':'#536a5d');
      this.text(c,g.riposte>0?'回锋待发':g.combo===2?'下一击 +8':'第三击 +8',224,24,'#e5ddc6',22);c.restore();
      if(g.state.run){const r=g.state.run,R=root.XiuxianExpeditionData;c.save();c.fillStyle='#102820dc';c.translate(0,175);c.fillRect(18,17,260,42);this.text(c,R.trials[r.trial].name+' · 第 '+r.depth+' 段',148,34,r.trial==='none'?'#d8c79a':'#efb489',13);this.text(c,'寻器 '+(r.seek?R.paths[r.seek].name:'随缘')+' · 共鸣 '+g.resonances().length+'/3',148,50,'#cbd1b9',11);c.restore();}
    }
  }
  root.XiuxianView=FeelView;
})(globalThis);
