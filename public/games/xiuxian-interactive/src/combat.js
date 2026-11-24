(function(root){
  'use strict';
  const warningDurations=new WeakMap();
  const echoes=new Set(['reed','moth','deer','wisp','sentinel','keeper']);
  function windTime(e){return e.kind==='wang'?(e.mode==='channel'?1.6:e.mode==='wave'?1.1:.95):e.kind==='lesson'?.9:e.kind==='keeper'?1.05:echoes.has(e.kind)?.85:.75;}
  function shape(e){
    if(e.kind==='wang'&&e.mode==='wave')return {kind:'band',left:390,top:e.targetY-43,bottom:e.targetY+43};
    return {kind:'circle',x:e.targetX,y:e.targetY,r:e.kind==='wang'?(e.mode==='channel'?108:82):e.kind==='lesson'?75:e.radius||71};
  }
  function contains(area,p){return area.kind==='band'?p.x>area.left&&p.y>area.top&&p.y<area.bottom:Math.hypot(p.x-area.x,p.y-area.y)<area.r;}
  function bounds(area){return area.kind==='band'?{x:area.left,y:area.top,w:1280-area.left,h:area.bottom-area.top}:{x:area.x-area.r,y:area.y-area.r,w:area.r*2,h:area.r*2};}
  function threat(e){return e.hp>0&&e.wind>0?{area:shape(e),progress:Math.max(0,Math.min(1,1-e.wind/(warningDurations.get(e)||windTime(e)))),interruptible:e.kind==='wang'&&e.mode==='channel'}:null;}
  const api={warningDurations,windTime,shape,contains,bounds,threat,hits:(e,p)=>contains(shape(e),p)};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianCombat=api;
})(globalThis);
