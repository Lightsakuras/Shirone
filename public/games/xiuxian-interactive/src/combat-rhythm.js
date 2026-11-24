(function(root){
  'use strict';
  const tiers=[[10,'初露锋芒'],[25,'剑势如虹'],[50,'破阵无双'],[100,'剑动九霄']];
  class Rhythm{
    constructor(emit=()=>{}){this.emit=emit;this.clear();}
    clear(){this.count=0;this.last=-Infinity;this.origin=null;this.until=-Infinity;this.counterUntil=-Infinity;this.freezeUntil=-Infinity;}
    get rank(){return tiers.filter(([n])=>this.count>=n).length;}
    get label(){return tiers[this.rank-1]?.[1]||'';}
    tick(now){if(now-this.last>3.5)this.count=0;if(now>this.until)this.origin=null;}
    hit(now){this.tick(now);this.last=now;this.count++;if(tiers.some(([n])=>this.count===n))this.emit('combo',this.count);}
    hurt(amount){if(amount>=10)this.count=Math.floor(this.count/2);}
    dash(now,p){this.origin={x:p.x,y:p.y};this.until=now+.20;}
    evade(now){if(!this.origin||now>this.until)return false;
      this.origin=null;this.counterUntil=now+2.5;this.freezeUntil=now+.05;this.emit('dodge');return true;}
    avoided(now,hit,p){if(this.origin&&now<=this.until&&hit(this.origin)&&!hit(p))return this.evade(now);return false;}
    counter(now){if(now>this.counterUntil)return false;this.counterUntil=-Infinity;return true;}
  }
  if(typeof module==='object'&&module.exports)module.exports=Rhythm;else root.XiuxianCombatRhythm=Rhythm;
})(globalThis);
