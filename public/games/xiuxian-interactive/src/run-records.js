(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,R=node?require('./expedition-data.js'):root.XiuxianExpeditionData;
  const items=['fire','needle','incense','potion','ward','tea','cake','qingxin'];
  const fresh=()=>({elapsed:0,hits:0,blocks:0,damage:0,lastThreat:null,used:Object.fromEntries(items.map(id=>[id,0]))});
  const num=(v,max,label)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>max)throw Error('山行记录异常：'+label);return v;};
  const integer=(v,max,label)=>{num(v,max,label);if(!Number.isInteger(v))throw Error('山行记录异常：'+label);return v;};
  function report(v){
    if(v===undefined)return fresh();if(!v||typeof v!=='object')throw Error('战况记录异常。');const out=fresh();
    out.elapsed=num(v.elapsed,1e8,'时长');out.damage=num(v.damage,1e8,'累计受伤');
    for(const k of ['hits','blocks'])out[k]=integer(v[k],1e6,k);
    if(v.lastThreat!==null&&!Object.hasOwn(R.enemies,v.lastThreat))throw Error('受击来源异常。');out.lastThreat=v.lastThreat;
    for(const id of items)out.used[id]=integer(v.used?.[id]??0,1e6,'道具消耗');return out;
  }
  function validate(r,maxDepth=5){
    const originSeed=r.originSeed==null?null:integer(r.originSeed,0xffffffff,'初始种子');if(originSeed===0)throw Error('初始种子无效。');
    const camps=r.camps??[],history=r.history??[];
    if(!Array.isArray(camps)||camps.length>2||!Array.isArray(history)||history.length>5)throw Error('山行路线记录异常。');
    const outCamps=camps.map(c=>{
      if(!c||![2,4].includes(c.depth)||c.depth>maxDepth||!Object.hasOwn(R.camps,c.choice))throw Error('歇脚记录异常。');
      if(c.choice==='supply'?!Object.hasOwn(R.supplies,c.kit):c.kit!==null)throw Error('补给记录异常。');
      return {depth:c.depth,choice:c.choice,kit:c.kit};
    });
    const outHistory=history.map(h=>{if(!h||!Number.isInteger(h.depth)||h.depth<1||h.depth>maxDepth||!Object.hasOwn(R.rooms,h.room)||!Object.hasOwn(R.trials,h.trial)||h.depth===5&&h.room!=='boss'||h.depth<5&&h.room==='boss')throw Error('路线记录异常。');return {depth:h.depth,room:h.room,trial:h.trial};});
    for(const list of [outCamps,outHistory])if(list.some((x,i)=>i>0&&x.depth<=list[i-1].depth))throw Error('山行记录重复或倒序。');
    return {originSeed,camps:outCamps,history:outHistory,report:report(r.report)};
  }
  const api={fresh,validate,items};if(node)module.exports=api;else root.XiuxianRunRecords=api;
})(globalThis);
