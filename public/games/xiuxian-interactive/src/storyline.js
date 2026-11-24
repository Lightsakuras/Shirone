(function (root) {
  'use strict';
  const volumes = ['首章 · 山河留证','卷二 · 筑基与金丹','卷三 · 元婴问道','卷四 · 化神与大乘','终局 · 尘埃落定'];
  const volumeFor = {'筑基卷':1,'金丹卷':1,'元婴卷':2,'化神卷':3,'合体卷':3,'大乘卷':3};
  const fog = () => ({state:'fog'});
  const done = (title,detail,recap=detail) => ({state:'done',title,detail,recap});
  const open = (title,detail,where,target) => ({state:'available',title,detail,where,target});
  function chapter(g) {
    const s=g.state, c=s.chapter, t=c.tomb;
    const rows=[
      ['雨夜与玄衡',c.prologue!=='pending',c.prologue==='skipped'?'从成年药庐起程。':'雨夜已过，随玄衡踏上山路。'],
      ['药庐取匣',s.flags.complete,'药匣已交还沈灵薇。'],
      ['成长经历任务',c.quests.length>0,'已在山门完成历练，所得心得可用于修行。'],
      ['三年修行 · 筑基',c.rank===4,'在蒲团运气筑基，得授蜀山剑印。'],
      ['青阳查案',s.story.stage==='forest'||t.rescued,'循青阳案卷中的线索追入墓林。'],
      ['机关与救援',t.children.length===4,'已找到四名孩子。'],
      ['破邪与狐簪',g.hasToken('foxHairpin'),'狐簪已入信物册。'],
      ['归镇封存物证',t.sealed,'已回青阳，在镇民见证下封存物证。'],
      ['回山呈证',c.complete,'已向清微呈交物证，首章收束。']
    ];
    const next=rows.findIndex(r=>!r[1]);
    const [title,detail]=g.objective(), goal=root.XiuxianGuide.mainGoal(g);
    return rows.map(([name,finished,recap],i)=>finished?done(name,recap):i===next?
      open(name,goal?.text||detail,goal?.name?'现场 · '+goal.name:title,{main:true}):fog());
  }
  function house(g,s,id) {
    const o=s.order?.orders.find(o=>o.id===id), t=s.tianji, h=id==='hehuan';
    const record=h?s.career:id==='tianji'?t:o;
    const offices=Object.values(h?root.XiuxianSectCareerData.offices:id==='tianji'?root.XiuxianSectTianjiData.offices:root.XiuxianSectOrderData.orders[id].offices);
    const joined=h?s.joined:!!record.joined;
    const office=h||id==='tianji'?record.officeName:record.office;
    const rank=joined?offices.findIndex(r=>r.name===office):-1;
    const intro=h?s.intro:id==='tianji'?t.intro:o;
    const duties=h?record.duties:id==='tianji'?t.dutyList:o.duties;
    return {id,name:h?'合欢宗':record.name,place:h?'行旅药站':record.place,steps:intro.steps,ready:h||id==='tianji'?intro.ready:!!(o.greeted&&o.service&&!g.orderJoinReason(id)),
      offices,rank,joined,office,next:offices[rank+1],merit:record.merit,prestige:record.prestige,duties,
      promoteReason:h?record.nextReason:id==='tianji'?t.promote.reason:g.orderPromoteReason()};
  }
  function memberId(s) {return s.joined?'hehuan':s.tianji?.joined?'tianji':s.order?.orders.find(o=>o.joined)?.id;}
  function branches(g) {
    const b=g.backgroundStatus(), s=g.sectStatus();
    const background=[done(b.name,b.birth)];
    if(!b.legacy){
      background.push(b.openingChoice?done(b.token?.name||'来处已定',[b.openingResult,b.token?.desc].filter(Boolean).join(' ')):
        b.choices.some(c=>c.available)?open(b.title,b.text,'查看身世与立场',{panel:'background-open'}):fog());
      background.push(b.missionChoice?done(b.title,b.result):b.stage==='mission'&&b.choices.some(c=>c.available)?open(b.title,b.text,'青阳迎客来客栈',{panel:'background-open'}):fog());
      background.push(b.echo&&g.state.chapter.complete?done('归山回响',b.echo):fog());
    }
    const h=house(g,s,memberId(s)||'hehuan');
    const sect=h.steps.map((st,i)=>st.done?done(st.name||st.label,st.detail):i===h.steps.findIndex(x=>!x.done)&&s.adult?
      open(st.name||st.label,st.detail,h.place,{panel:'sects-open'}):fog());
    if(h.joined)sect.push(done(h.name,'已入'+h.name+'门下。'));
    sect.push(...h.offices.map((r,i)=>i<=h.rank?done(r.name,'在'+h.name+'入册任职。'):h.joined&&i===h.rank+1&&!h.promoteReason?open(r.name,'已满足报请晋升条件。',h.place,{panel:'sects-open'}):fog()));
    const secrets=h.id==='hehuan'?s.secret?.tiers:h.id==='tianji'?g.tianjiDeepStatus?.().secrets:s.order.orders.find(o=>o.id===h.id)?.chapters;
    for(const x of Array.isArray(secrets)&&secrets.length?secrets:[null])sect.push(x&&(x.learned||x.done)?done(x.name||x.label,x.teaching||x.detail||'已登记本门秘传。'):fog());
    return {background,sect};
  }
  function snapshot(g) {
    const status=g.campaignStatus(), journal=new Map(status.journal.map(q=>[q.id,q]));
    const books=[chapter(g),[],[],[],[]], definitions=root.XiuxianCampaignData.tasks;
    for(const task of Object.values(definitions)){
      let v=volumeFor[task.volumeLabel];
      const q=journal.get(task.id);
      // A chosen alternate career also belongs in the scroll when the player has actually entered it.
      if(v===undefined){if(!g.state.campaign.tasks[task.id]||!q||task.volumeLabel==='境界实修')continue;v=3;}
      if(!q||!g.state.chapter.complete){books[v].push(fog());continue;}
      if(['claimed','complete'].includes(q.status)){const recap=q.choiceText?'当时的选择 · '+q.choiceText:'已办结「'+q.title+'」。';books[v].push(done(q.title,[q.detail,...q.consequences].filter(Boolean).join(' '),recap));continue;}
      if(!['available','ready','active'].includes(q.status)){books[v].push(fog());continue;}
      const info=g.campaignTaskStatus(task),a=info.action;
      const place=root.XiuxianCampaignData.maps[a?.map]?.name||root.XiuxianData.maps[a?.map]?.name;
      books[v].push({...open(q.title,q.detail,[place,a?.label].filter(Boolean).join(' · ')||q.statusLabel,{task:q.id}),priority:{ready:0,active:1,available:2}[q.status]});
    }
    const end=status.ending;
    books[4].push(end?{state:'current',title:end.title,detail:end.detail||'行程收束，卷中保留此生所择。',where:'终局回看',target:{ending:true}}:fog());
    const main=books.flat();
    const current=main.find(n=>n.state==='current')||main.filter(n=>n.state==='available').sort((a,b)=>(a.priority??0)-(b.priority??0))[0];
    if(current){
      current.state='current';
      if(current.target?.task){
        const goal=root.XiuxianGuide.campaignGoal(g,current.target.task);
        if(goal?.text)current.where=goal.text;
      }
    }
    const tracks=branches(g);
    for(const track of Object.values(tracks)){const first=track.find(n=>n.state==='available');if(first)first.state='current';}
    for(const list of [...books,...Object.values(tracks)]){
      const at=list.findIndex(n=>n.state==='current');
      if(at>=0&&list[at+1]?.state==='fog')list[at+1].gate='完成「'+list[at].title+'」后再来查看';
    }
    const volume=Math.max(0,books.findIndex(b=>b.includes(current)));
    return {volumes,books,tracks,current,volume,done:main.filter(n=>n.state==='done').length,total:main.length,fog:main.filter(n=>n.state==='fog').length};
  }
  function stage(g) {
    if(g.state.campaign.ending)return volumes[4];
    if(!g.state.chapter.complete)return volumes[0];
    const tasks=root.XiuxianCampaignData.tasks;
    let v=1;
    for(const [id,record] of Object.entries(g.state.campaign.tasks)){
      const book=volumeFor[tasks[id]?.volumeLabel];if(book)v=Math.max(v,book);
      if(record.claimed && ['jindan-crossroads','huashen-breakthrough'].includes(id))v=Math.max(v,id==='jindan-crossroads'?2:3);
    }
    return volumes[v];
  }
  root.XiuxianStoryline={snapshot,stage,house,memberId};
})(globalThis);
