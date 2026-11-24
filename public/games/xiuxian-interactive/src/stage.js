(function(root){
  'use strict';
  const C=typeof module==='object'&&module.exports?require('./combat.js'):root.XiuxianCombat;
  // Overhead leaves, eaves and arch crowns: visual overhangs, never new floor obstacles.
  const maps={
    garden:[[0,-100,345,340,200],[0,1100,100,300,177,1]],
    ruins:[[1,-160,405,400,208],[1,1110,185,390,203,1]],
    bamboo:[[0,-90,100,340,200],[0,1090,440,350,207,1]],
    valley:[[1,-155,50,430,224],[0,1120,385,280,165,1]],
    sanctum:[[3,440,-35,400,156]],
    qingyang:[[2,-230,400,420,190],[0,1140,100,280,165,1]],
    wangyard:[[2,430,-40,420,190],[1,1140,435,310,162,1]],
    temple:[[2,-220,145,430,195],[2,1100,440,450,204,1]],
    forest:[[1,-150,110,390,203],[0,1120,470,330,195,1]],
    crypt:[[3,455,-35,380,148],[3,-225,515,350,137]],
    tomb:[[3,-175,80,360,140],[3,1150,450,340,133,1]]
  };
  const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
  function layers(map){return (maps[map]||[]).map(([cell,x,y,w,h,flip])=>({cell,x,y,w,h,flip:!!flip}));}
  function alpha(layer,g){
    const s=g.state,body={x:s.x-35,y:s.y-(g.isChild()?70:106),w:70,h:119};
    if(overlap(layer,body))return .16;
    const near=g.nearest();if(near&&overlap(layer,{x:near.x-40,y:near.y-100,w:80,h:135}))return .2;
    for(const e of g.activeEnemies())if(e.hp>0){const t=C.threat(e);if(overlap(layer,{x:e.x-55,y:e.y-165,w:110,h:185})||t&&overlap(layer,C.bounds(t.area)))return .18;}
    return .88;
  }
  const api={layers,alpha,overlap};if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianStage=api;
})(globalThis);
