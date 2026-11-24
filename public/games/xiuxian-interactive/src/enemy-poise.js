(function(root){
  'use strict';
  // Non-enumerable combat state also works on enemies owned by strict campaign saves.
  function init(e,guarded=e.boss||e.elite){
    Object.defineProperties(e,{
      anim:{configurable:true,writable:true,value:{state:'idle',t:0,duration:0,dirX:1,dirY:0,moveKind:null}},
      poise:{configurable:true,writable:true,value:guarded?{max:e.maxHp*(e.boss?.50:.38),value:e.maxHp*(e.boss?.50:.38)}:null}
    });
    return e;
  }
  function pose(e,state,duration=0,target,moveKind=null){
    if(!e.anim)init(e);
    const a=e.anim;
    if(a.state!==state||state==='windup'||state==='strike'){a.t=0;a.state=state;}
    a.duration=duration;a.moveKind=moveKind;
    if(target){const dx=target.x-e.x,dy=target.y-e.y,len=Math.hypot(dx,dy);if(len){a.dirX=dx/len;a.dirY=dy/len;}}
  }
  function tick(e,dt){
    const a=e.anim;a.t+=dt;
    if(['broken','recover','strike'].includes(a.state)){
      if(a.t+1e-9<a.duration)return true;
      if(a.state==='broken')e.poise.value=e.poise.max;
      if(a.state==='strike'&&a.moveKind==='miss'){pose(e,'recover',.9);return true;}
      pose(e,'idle');
    }
    return false;
  }
  function strike(e,target,hit,kind,move){
    pose(e,'strike',.13,target,hit?kind:'miss');
    if(move)move(e.anim.dirX*8,e.anim.dirY*8);
  }
  function damage(e,n,action={},onBreak){
    if(!e.poise||n<=0)return n;
    if(e.anim.state==='broken')return n*1.8;
    const counter=action.element==='ice'&&e.affix==='狂暴'||action.element==='storm'&&(e.shield>0||e.guardOrb?.hp>0)||action.element==='fire'&&(e.affix==='厚甲'||e.kind==='golem');
    const rate=counter?3.5:action.ultimate?3.2:e.anim.state==='windup'?2.8:action.skill||action.finisher||action.riposte?2.2:.35;
    e.poise.value=Math.max(0,e.poise.value-n*Math.max(rate,action.poiseRate||0));
    if(e.poise.value===0){
      pose(e,'broken',2.5);if(e.wind)e.wind=0;if(e.windup)e.windup=0;if(e.dash)e.dash=0;
      onBreak?.();
    }
    return n*.75;
  }
  function bar(c,e,x,y,w){
    if(!e.poise)return;
    c.fillStyle='#241e20';c.fillRect(x,y,w,6);
    c.fillStyle=e.anim.state==='broken'?'#d7adff':'#ffd36e';
    c.fillRect(x+1,y+1,(w-2)*(e.anim.state==='broken'?Math.max(0,1-e.anim.t/2.5):e.poise.value/e.poise.max),4);
  }
  const api={init,pose,tick,strike,damage,bar};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianPoise=api;
})(globalThis);
