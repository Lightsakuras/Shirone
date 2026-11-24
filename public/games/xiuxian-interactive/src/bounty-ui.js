(function(root){
  'use strict';
  const portraits={
    mist:'M-29 2Q-18-10-22-29L-30-44l17 6q-6-16 7-21l9 14q13-1 19 11L13-7 30 4 3-1-10 6z',
    bamboo:'M-17 3l5-21-13-6 4-16 9 5 3-15 13-7 9 8-5 10 11 6 7-19 3 2-4 30-13-5-4 16 8 14-10-1-9-13-5 15z',
    corpse:'M-29 0l5-17-8-5 2-20 9-6 7 8 3-18 20 1 3 15 12 1 9 22-4 7-9-9-3 22-16-2-6-12-7 11z',
    wyrm:'M-35 1q35 4 19-20-15-21 8-33l-2-9 11 7 9-8 2 10 15 3-11 11-12-1q-8 4 2 16Q23 8-12 6z',
    blade:'M-32-2l15-32 2 12 10-34 2 17 15-23-4 23 14-8-12 24 17-3-31 28z',
    ember:'M-27 0q8-9 2-21l11 5q-6-13 5-28l3 15Q7-40 3-57q22 15 17 38l9-9q8 25-13 32z',
    spider:'M-14-14l-16-16-7 3 10-1 11 19-16-6-9 14 12-9 16 8q9 10 23-2l16-10 13 10-11-15-19 6 19-18 8 2-11-7-17 13q4-18-12-20-14 0-12 19z',
    puppet:'M-24 0l4-17-12-4 4-19 9-1 4 8 6-9-5-10 10-8 14 6-2 14 6 8 6-12 10 5-5 23-12 2 6 17-15-1-7-15-8 14z',
    bone:'M-27 1l5-20-11-7 3-17 11 5 4-7-6-11 12 5 8-7 9 6 13-8-4 15 7 8 9-3-5 19-13 7 4 16-14-2-5-14-11 15z',
    saint:'M-38-26l14 3-10-22 21 15-6-28 14 17 6-21 8 22 14-13-4 24 18-9-14 25 9 12-24-1-9 5-21-4 4-13z'
  };
  function creature(c,e,row){
    const shade=row.color;c.save();c.translate(e.x,e.y);c.scale(e.boss?2:1.1,e.boss?2:1.1);
    if(!e.boss&&row.id==='puppet'){
      const orb=c.createRadialGradient(-4,-21,1,0,-16,16);orb.addColorStop(0,'#fff6cd');orb.addColorStop(.44,'#99fff6');orb.addColorStop(1,'#4b347c');
      c.fillStyle=orb;c.beginPath();c.arc(0,-16,16,0,Math.PI*2);c.fill();c.strokeStyle='#f8db9c';c.lineWidth=2;c.beginPath();c.ellipse(0,-16,22,6,-.36,0,Math.PI*2);c.stroke();c.restore();return;
    }
    if(e.guardOrb?.hp>0){c.strokeStyle='#c9aaff';c.fillStyle='#a7a8ff30';c.lineWidth=2;c.beginPath();c.ellipse(0,-23,43,44,0,0,Math.PI*2);c.fill();c.stroke();}
    const shape=new Path2D(portraits[row.id]),grad=c.createLinearGradient(-18,-58,14,4);
    grad.addColorStop(0,'#fff1c3');grad.addColorStop(.38,shade);grad.addColorStop(1,'#233342');
    c.lineJoin='round';c.strokeStyle='#18232c';c.lineWidth=2.6;c.fillStyle=grad;c.fill(shape);c.stroke(shape);
    const carving={
      mist:'M-26-38Q-11-39-14-25Q-18-14-6-7Q-16-24-4-32 M-9-47Q-1-38-7-30 M12-38Q23-27 9-14Q7-7 18-3',
      bamboo:'M-12-37L6-31 10-38 M-9-24l11 4 6-5 M-4-17l7 3 M14-19l9-30',
      corpse:'M-16-35l29 7 M-15-29l28-10 M-10-18l22-10 M-8-12l17-6 M-5-42l7 4 8-3',
      wyrm:'M-20 1q30-2 12-23-7-12 4-20 M-4-38l10 3 5-5 M4-45l15-1',
      blade:'M-24-3l14-29 M-12-1L2-39 M-3-4l23-30 M-1-14l10 4',
      ember:'M-17-2q-9-12 5-21-1 8 5 9 M-7-3q14-14 13-32 11 14-1 30',
      spider:'M-12-21q12-11 23 0l-11 9z M-8-5l9-5 8 4 M-14-20l-11-12 M12-18l13-13',
      puppet:'M-12-35l12 5 12-5 M-11-16l11 5 11-7 M-8-49l8 3 8-3 M-19-31l-5 12 M19-30l5 8',
      bone:'M-12-37l13 6 12-6 M-12-31l13 6 12-7 M-10-19l10 4 11-5 M0-32v22',
      saint:'M-27-32l15 15-7-24 M27-31L12-16l7-25 M-8-40l8 6 9-7 M-14-9L0-3l14-7'
    };
    c.strokeStyle='#20444a';c.lineWidth=1.75;c.stroke(new Path2D(carving[row.id]));
    c.save();c.translate(0,-1.2);c.lineWidth=.65;c.strokeStyle='#ffdf99';c.stroke(new Path2D(carving[row.id]));c.restore();
    c.fillStyle='#30414a';c.beginPath();c.moveTo(-10,-30);c.quadraticCurveTo(0,-24,11,-30);c.quadraticCurveTo(6,-18,0,-16);c.quadraticCurveTo(-6,-18,-10,-30);c.fill();
    c.fillStyle='#ffe7a4';for(const x of [-3,4]){c.beginPath();c.arc(x,-25,1.1,0,Math.PI*2);c.fill();}
    c.restore();
  }
  function warnings(c,run){
    const t=run.clock||0;
    for(const h of run.hazards||[]){
      if(h.kind!=='mist'&&h.kind!=='bolt'){
        const prog=h.delay>0?Math.min(1,Math.max(0,h.age/h.delay)):1;
        root.XiuxianHazardGeo.draw(c,root.XiuxianBounty.shape(h),h.age-h.delay,prog,t);continue;
      }
      const active=h.age>=h.delay;c.save();c.translate(h.x,h.y);c.rotate(h.heading);
      c.beginPath();if(['beam','dash'].includes(h.kind))c.rect(0,-h.r,h.length,2*h.r);
      else if(h.kind==='ring'||h.kind==='iceRing'){c.arc(0,0,h.r+12,0,Math.PI*2);c.arc(0,0,h.r-12,0,Math.PI*2,true);}
      else c.arc(0,0,h.r,0,Math.PI*2);
      if(active&&h.kind==='mist'){
        const fog=c.createRadialGradient(0,0,4,0,0,h.r);fog.addColorStop(0,'#c6d9e0bb');fog.addColorStop(.62,'#a8c9d18c');fog.addColorStop(1,'#a6c4ce20');c.fillStyle=fog;
      }else c.fillStyle=active?({iceRing:'#96dfffab',web:'#8ccc9180',poison:'#87ad6770'}[h.kind]||'#ff73395c'):'#df593335';c.fill('evenodd');
      c.strokeStyle='#311d21';c.lineWidth=7;c.stroke();c.strokeStyle=active?'#ffb074':'#ff9a82';c.lineWidth=3;c.stroke();
      if(h.kind==='bolt'){c.beginPath();c.moveTo(0,0);c.lineTo(40,0);c.stroke();}c.restore();
    }
  }
  function create({game,store,arena,openModal,sound}){
    let page=0;
    function board(){
      const wins=store.state.bounty.wins,rows=root.XiuxianBountyData,g=game();
      const clearedCount=rows.filter(r=>wins[r.id]).length;
      const nextTarget=rows.find(r=>!wins[r.id]&&root.XiuxianBounty.unlocked(r,g,store))||rows.find(r=>root.XiuxianBounty.unlocked(r,g,store));
      const lockedNext=rows.find(r=>!root.XiuxianBounty.unlocked(r,g,store));
      const cards=rows.slice(page*4,page*4+4).map(row=>{
        const ok=root.XiuxianBounty.unlocked(row,g,store);
        return '<article class="hunt-card clarity-paper-card">'+root.XiuxianItemIcons.draw(row.base,[1,1,2,2,2,3,3,4,4,5][row.index])+'<div class="hunt-copy"><small>'+row.gate+' · '+row.move+'</small><h3>'+row.name+'</h3><p class="hunt-bio">'+row.bio+'</p><p class="hunt-prize">首赏　'+row.reward+'、双卷与护道符</p></div><button class="secondary hunt-go-btn" data-hunt="'+row.id+'" '+(ok?'':'disabled')+'>'+(ok?wins[row.id]?'再战 · '+wins[row.id]+'胜':'揭榜讨伐':'尚待解锁')+'</button></article>';
      }).join('');
      const n=store.state.bounty.scrolls;
      const brief='<section class="focus-brief clarity-paper-card" aria-label="此刻重点"><div class="focus-brief-main"><span class="focus-kicker">此刻重点 · 山河悬赏</span><div class="focus-chips"><span class="focus-chip '+(clearedCount?'is-met':'is-info')+'">'+(clearedCount?'✓':'◆')+' 已斩大妖 <b>'+clearedCount+'/10</b></span><span class="focus-chip '+(nextTarget?'is-met':'is-gap')+'">'+(nextTarget?'✓ 可揭榜：'+nextTarget.name:'✕ 需先推进主线解锁首榜：'+(lockedNext?.gate||'取回药匣'))+'</span><span class="focus-chip '+(n?'is-met':'is-info')+'">'+(n?'✓ 可研读心得卷 ×'+n:'◆ 心得卷 ×0')+'</span></div><p class="focus-summary">'+(nextTarget?'首胜必得专属装备、双心得卷与护道符，可即刻讨伐「'+nextTarget.name+'」。':'十卷大妖悬赏，首胜必赠专属装备与双卷。')+'</p></div><div class="focus-brief-cta">'+(nextTarget?'<button type="button" class="primary" data-hunt-quick="'+nextTarget.id+'">立即讨伐 · '+nextTarget.name+'</button>':'')+'<button id="hunt-study" class="'+(nextTarget?'secondary':'primary')+'" '+(n?'':'disabled')+'>研读心得卷 ×'+n+'</button></div></section>';
      openModal('bounty','<section class="loot-shell hunt-board"><header><div><small>山河伏妖 · 十卷大赏</small><h2 id="modal-title">山河悬赏妖榜</h2></div></header>'+brief+'<div class="hunt-grid">'+cards+'</div><nav class="board-pages" aria-label="翻阅悬赏榜"><button data-page="-1" '+(page===0?'disabled':'')+'>上一页</button><span>第 '+(page+1)+' / 3 页</span><button data-page="1" '+(page===2?'disabled':'')+'>下一页</button></nav></section>');
      document.querySelector('.hunt-board').onclick=e=>{
        const btn=e.target.closest('[data-hunt],[data-hunt-quick]'),id=btn?.dataset.hunt||btn?.dataset.huntQuick;
        if(e.target.dataset.page){page=Math.max(0,Math.min(2,page+Number(e.target.dataset.page)));board();return;}
        if(id)arena.hunt(root.XiuxianBountyData.find(row=>row.id===id));
        if(e.target.id==='hunt-study'&&root.XiuxianBounty.study(store)){board();sound.preview('levelUp',.7);}
      };
    }
    return {board};
  }
  root.XiuxianBountyUI={create,creature,warnings};
})(globalThis);
