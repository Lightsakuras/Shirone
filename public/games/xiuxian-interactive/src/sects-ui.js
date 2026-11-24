(function(root){
  'use strict';
  const D=root.XiuxianData;
  root.XiuxianSectsUI=function({game,openModal,closeModal,save,drain,esc,showWorld,trackObjective}){
    const $=id=>document.getElementById(id);let feedback='', viewing=null;
    const words=t=>esc(t||'').replace(/\n/g,'<br>');
    const sectImage=(id,alt,style)=>`<img class="sect-illustration ${style}" src="assets/sect-art/${esc(id)}.webp" alt="${esc(alt)}" decoding="async">`;
    const propDetail=(id,label)=>`<details class="sect-prop-detail"><summary>${esc(label)}</summary>${sectImage(id,label,'sect-inset')}</details>`;
    const goods=cost=>Object.entries(cost||{}).map(([id,n])=>`${D.items[id]?.name||id} ×${n}`).join('、')||'无额外实物';
    function membership(s){
      if(s.joined)return {name:'合欢宗',office:s.career?.officeName||''};
      if(s.tianji?.member)return {name:s.tianji.name,office:s.tianji.officeName};
      return s.order?.orders.find(o=>o.joined);
    }
    const art=id=>`<img class="sect-path-art" src="assets/art-v120/hehuan-${id==='dual'?'harmony':'siphon'}.webp" alt="${id==='dual'?'同心双璧':'摄元秘卷'}">`;
    const cost=p=>`宗门贡献 ${p.nextContribution||0} · ${goods(p.nextCost)}`;
    function frame(title,body){
      const s=game().sectStatus();
      openModal('sects',`<p class="eyebrow">山门问道 · 已暂停</p><h2 id="modal-title">${esc(title)}</h2>${feedback?`<section class="sect-completed" role="status"><h3>本次修习已记</h3><p>${words(feedback)}</p></section>`:''}${body}<p id="inline-message" class="inline-message" role="status"></p><div class="buttons sect-return"><p>${s.joined?`宗门贡献 <b>${s.contribution}</b> <span>· 清誉 ${s.reputation.honor} · 威名 ${s.reputation.fame}</span>`:'山门问道 · 入宗由你决定'}</p><button id="sect-close" class="secondary">返回山行</button></div>`);
      $('sect-close').onclick=closeModal;
    }
    function commit(action,result=''){
      const ok=action();if(ok)save(true);feedback=ok?result:'';show(true);drain();
    }
    function show(keep=false){
      if(!keep){feedback='';viewing=null;}
      const g=game();if(!g)return;
      const s=g.sectStatus(),b=g.backgroundStatus(),rep=s.reputation,paths=s.paths||[];
      const member=membership(s);
      const identity=`<dl class="sect-identity"><div><dt>原来身世</dt><dd>${esc(b.name)}</dd></div><div><dt>修习专长</dt><dd>${esc(D.origins[g.state.origin].name)}</dd></div><div><dt>当前宗门</dt><dd>${esc(member?.name||'尚未入门')}</dd></div></dl>`;
      const head=`<figure class="sect-scene"><img src="assets/art-v120/hehuan.webp" alt="合欢宗水榭修行庭院"><figcaption>合欢宗 · 同行有约，行事自择</figcaption></figure><p class="sect-introduction">合欢宗兼有合修与摄元两路。功法本身并不替人分善恶——守约、济困还是强掠，自会在江湖与门内留下截然不同的名声。</p>${identity}<p class="sect-boundary">男女修士同等入册，成年女修亦可与成年女修依约合修；修习精进功法，情缘去留自择。</p>`;
      const intro=s.intro;
      const admission=!s.joined?`<section class="sect-section" id="sect-admission"><h3>问道入门 · 前置三步</h3><p>${words(s.doctrine)}</p>${intro?`<ol class="sect-intro-steps">${intro.steps.map(st=>`<li class="sect-intro-step" data-sect-intro-step="${esc(st.id)}" data-done="${st.done}"><h4>${esc(st.name)} <small>${st.done?'已具备':'待办'}</small></h4><p>${words(st.label)}</p><p class="sect-conditions">${words(st.detail)}</p>${!st.done&&st.reason?`<p class="sect-reason">${words(st.reason)}</p>`:''}${st.id==='greet'&&!st.done&&s.adult?`<button id="sect-intro-greet" class="secondary" ${st.reason?'disabled':''}>走到云照身边听门规</button>`:''}</li>`).join('')}</ol><p class="sect-conditions">${words(intro.note)}</p>`:''}<p class="sect-conditions">门槛：成年、筑基，在药庐安全处或药站云照身边办理。<br>${words(s.joinReason||'已满足境界与年龄；入门本身不扣材料。')}</p>${s.adult?`<label class="sect-agreement"><input id="sect-join-agree" type="checkbox">我理解并同意门规；入宗由自己决定。</label><button id="sect-join" class="primary" disabled>加入合欢宗</button>`:'<p id="sect-child-note" class="sect-conditions">童年只可了解山门。成年后才开放入宗、合修和摄元修习。</p>'}</section>`:`<section class="sect-section" id="sect-admission-done"><h3>问道入门 · 已完成</h3><div class="sect-numbers"><span>相识 <b>与云照听过门规</b></span><span>公开事务 <b>已在药站办成</b></span><span>确认 <b>本人同意门规</b></span></div><p>拜入山门，旧日来处与专长如故，去留自择。</p></section>`;
      const reputation=s.joined?`<section class="sect-section" id="sect-reputation"><h3>行事与评价 · ${esc(rep.label)}</h3><div class="sect-numbers"><span>清誉 <b>${rep.honor}</b></span><span>威名 <b>${rep.fame}</b></span><span>宗门贡献 <b>${s.contribution}</b></span></div><p>${words(rep.detail)}</p><p class="sect-conditions">${words(s.doctrine)}</p></section>`:'';
      const career=s.joined&&s.career?`<section class="sect-section" id="sect-career"><h3>门内成长 · ${esc(s.career.officeName)}</h3><div class="sect-numbers"><span>累计功绩 <b>${s.career.merit}</b></span><span>组织威望 <b>${s.career.prestige}</b></span><span>当前境界 <b>${esc(s.career.realm.title)}</b></span></div><p>${words(s.career.officeNote)}</p><p class="sect-conditions">${words(s.career.accounts.merit)}<br>${words(s.career.accounts.prestige)}</p><div class="sect-duties">${s.career.duties.map(d=>`<article class="sect-duty" data-sect-duty-card="${esc(d.id)}"><h4>${esc(d.name)} <small>${d.done?'已入册':esc(d.realmTitle)+'可办'}</small></h4><p>${words(d.desc)}</p><p class="sect-path-cost">${esc(goods(d.cost))} · 功绩 +${d.merit} · 威望 +${d.prestige}</p>${d.reason?`<p class="sect-reason">${words(d.reason)}</p>`:''}${s.adult?`<button data-sect-duty="${esc(d.id)}" class="secondary" ${d.available?'':'disabled'}>${d.done?'已办过':'去办这件事'}</button>`:''}</article>`).join('')}</div><div class="sect-promote"><p>${s.career.next?`下一阶：${esc(s.career.next.name)} · 需 ${esc(s.career.next.realmTitle)}、累计功绩 ${s.career.next.merit}、组织威望 ${s.career.next.prestige}`:'门内职阶已到此层；宗主继任牵涉柳如烟的交接，不在本层自动产生。'}</p>${s.career.nextReason?`<p class="sect-reason">${words(s.career.nextReason)}</p>`:''}${s.career.next&&s.adult?`<button id="sect-promote" class="primary" ${s.career.nextReason?'disabled':''}>报请晋升</button>`:''}</div></section>`:'';
      const trial=(()=>{
        if(!s.joined||!g.sectTrialStatus)return '';
        const t=g.sectTrialStatus();
        const foes=t.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        return `<section class="sect-section" id="sect-trial"><h3>门内比试 · ${t.cleared?'已入选':t.attempts?'待再试':'未报试'}</h3><div class="sect-numbers"><span>报试 <b>${t.attempts}</b></span><span>胜 <b>${t.wins}</b></span><span>上次 <b>${t.lastOutcome==='win'?'胜':t.lastOutcome==='loss'?'失利':'未比'}</b></span></div><p>${words(t.intro)}</p><ul class="sect-trial-foes">${foes}</ul><p class="sect-conditions">${words(t.rewardNote)}</p>${t.reason?`<p class="sect-reason">${words(t.reason)}</p>`:''}${s.adult&&!t.battle?`<button id="sect-trial-start" class="secondary" ${t.reason?'disabled':''}>在庭院报试</button>`:''}${t.battle?'<p class="sect-reason">比试进行中：关闭此页后仍以真实战斗继续，V 暂停下令可用。</p>':''}</section>`;
      })();
      const meet=(()=>{
        if(!s.joined||!g.sectMeetStatus)return '';
        const m=g.sectMeetStatus();
        const foes=m.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        const label=m.qualified?'已得赴会资格':m.battle?'第 '+m.round+' 轮':m.attempts?'待再报试':'未报试';
        const last=m.lastOutcome==='qualified'?'得资格':m.lastOutcome==='loss'?'止步':'未比';
        return `<section class="sect-section" id="sect-meet"><h3>门内会武 · ${label}</h3><div class="sect-numbers"><span>报试 <b>${m.attempts}</b></span><span>过轮 <b>${m.bestRound} / ${m.roundCount}</b></span><span>上次 <b>${last}</b></span></div><p>${words(m.intro)}</p><ul class="sect-trial-foes">${foes}</ul><p class="sect-conditions">${words(m.rewardNote)}</p>${m.reason?`<p class="sect-reason">${words(m.reason)}</p>`:''}${s.adult&&!m.battle&&!m.qualified?`<button id="sect-meet-start" class="secondary" ${m.reason?'disabled':''}>报试门内会武</button>`:''}${m.battle?'<p class="sect-reason">会武进行中：关闭此页后仍以真实战斗继续，V 暂停下令可用。</p>':''}${m.qualified?'<p class="sect-conditions">赴会与赛事尚未实现：会场、具名对手与返宗记录要等确认后再做，本轮只记门内资格。</p>':''}</section>`;
      })();
      const office=(()=>{
        if(!s.joined||!g.sectOfficeStatus)return '';
        const o=g.sectOfficeStatus();
        const cards=o.actions.map(a=>{
          const state=a.done?'已记档':/须先办成/.test(a.reason||'')?'待前序':/没有「/.test(a.reason||'')?'待晋阶':a.reason?'暂不可办':'可办';
          return `<article class="sect-duty" data-sect-office-card="${esc(a.id)}"><h4>${esc(a.name)} <small>${state}</small></h4><p>${words(a.desc)}</p><p class="sect-conditions">${words(a.note)}</p>${a.done?'':a.reason?`<p class="sect-reason">${words(a.reason)}</p>`:''}<button data-sect-office="${esc(a.id)}" class="secondary" ${a.reason?'disabled':''}>${a.done?'已办成':'去办这件事'}</button></article>`;
        }).join('');
        return `<section class="sect-section" id="sect-office"><h3>门内权责 · 已办 ${o.doneCount} / ${o.total}</h3><div class="sect-numbers"><span>职阶 <b>${esc(s.career.officeName)}</b></span><span>办事地点 <b>${esc(o.place)}</b></span></div><p>举荐、带队、招录、亲传、治理随职阶逐级开启。</p><div class="sect-duties">${cards}</div><p class="sect-conditions">宗主继任与柳如烟的交接仍待定，不在本段产生。</p></section>`;
      })();
      const trip=(()=>{
        if(!s.joined||!g.sectTripStatus)return '';
        const t=g.sectTripStatus();
        const foes=t.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        const kit=Object.keys(t.kit).map(id=>esc(D.items[id]?.name||id)+' ×'+t.kit[id]).join('、');
        const have=Object.keys(t.kit).map(id=>esc(D.items[id]?.name||id)+' ×'+t.inventory[id]).join('、');
        const label=t.battle?'途中':t.cleared?'待交差':t.prepared?'已备行装':t.returned?'已交差过':'未备行装';
        const last=t.lastOutcome==='returned'?'已交差':t.lastOutcome==='loss'?'途中失利':'未出门';
        return `<section class="sect-section" id="sect-trip"><h3>赴会行装与途中 · ${label}</h3><div class="sect-numbers"><span>出门 <b>${t.outbound}</b></span><span>交差 <b>${t.returned}</b></span><span>上次 <b>${last}</b></span></div><p>${words(t.intro)}</p><ul class="sect-trial-foes" data-sect-trip-foes>${foes}</ul><p class="sect-conditions">行装：${kit}；随身：${have}。${words(t.kitNote)}</p><p class="sect-conditions">${words(t.rewardNote)}</p>${t.battle?'<p class="sect-reason">途中交战中：关闭此页后仍以真实战斗继续，V 暂停下令可用。</p>':''}${!t.battle&&!t.cleared&&!t.prepared?`<p class="sect-reason">${words(t.prepareReason||'')}</p><button id="sect-trip-prepare" class="secondary" ${t.prepareReason?'disabled':''}>备赴会行装</button>`:''}${!t.battle&&!t.cleared&&t.prepared?`<p class="sect-reason">${words(t.departReason||'')}</p><button id="sect-trip-depart" class="secondary" ${t.departReason?'disabled':''}>出门赴会</button>`:''}${!t.battle&&t.cleared?`<p class="sect-reason">${words(t.settleReason||'')}</p><button id="sect-trip-settle" class="secondary" ${t.settleReason?'disabled':''}>返宗交差</button>`:''}<p class="sect-conditions">${words(t.notYet)}</p></section>`;
      })();
      const bond=(()=>{
        if(!s.joined||!g.bondStatus)return '';
        const b=g.bondStatus();
        const cards=b.people.map(p=>{
          const normal=p.topics.filter(t=>!t.deep);
          const deep=p.topics.filter(t=>t.deep);
          const topics=normal.map(t=>`<button class="secondary" data-sect-bond="${esc(p.id)}" data-sect-bond-topic="${esc(t.id)}" ${t.reason?'disabled':''}>${esc(t.label)}${t.done?' · 已谈':''}</button>`).join('');
          const deepButtons=deep.map(t=>`<button class="secondary" data-sect-bond="${esc(p.id)}" data-sect-bond-topic="${esc(t.id)}" ${t.reason?'disabled':''}>${esc(t.label)}${t.done?' · 已谈':''}</button>`).join('');
          const first=p.topics.find(t=>!t.done&&t.reason)?.reason||'';
          const deepBadge=p.deep.ready?'可谈':'还需要：'+esc(p.deep.missing.join('；'));
          const deepBlock=deep.length?`<div class="sect-bond-deep" data-sect-bond-deep="${esc(p.id)}"><p class="sect-conditions">相处更深 <b>${deepBadge}</b></p><div class="sect-bond-topics">${deepButtons}</div></div>`:'';
          return `<article class="sect-duty" data-sect-bond-card="${esc(p.id)}"><h4>${esc(p.name)} <small>${esc(p.role)} · ${p.age}岁</small></h4><p class="sect-conditions">交情 <b>${p.closeness} / ${b.maxTopics}</b> · ${esc(p.label)}</p><p>${words(p.note)}</p><div class="sect-bond-topics">${topics}</div>${deepBlock}${first?`<p class="sect-reason">${words(first)}</p>`:''}</article>`;
        }).join('');
        return `<section class="sect-section" id="sect-bond"><h3>门内往来 · 已谈 ${b.total}</h3><div class="sect-numbers"><span>往来地点 <b>${esc(b.place)}</b></span><span>往来人数 <b>${b.people.length}</b></span></div><p>${words(b.partnerNote)}</p><p class="sect-conditions">${words(b.accountsNote)}</p><div class="sect-duties">${cards}</div><p class="sect-conditions">${words(b.deepNote)}</p><p class="sect-conditions">${words(b.excludedNote)}</p></section>`;
      })();
      const event=(()=>{
        if(!s.joined||!g.sectEventStatus)return '';
        const v=g.sectEventStatus();
        const foes=v.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        const last=v.lastOutcome==='win'?'这一届胜':v.lastOutcome==='loss'?'这一届失利':v.lastOutcome==='settled'?'赛果已报记':'未赴赛';
        const label=v.battle?'赛事进行中':v.qualified?(v.needRehearse?'待补修':v.settled<v.wins?'待报赛果':v.startReason?'待报场':'可以报场'):'尚无赴赛资格';
        const action=v.battle?'<p class="sect-reason">赛事交战中：关闭此页后仍按真实战斗继续。</p>':v.needRehearse?`<p class="sect-reason">${words(v.rehearseReason||'')}</p><button id="sect-event-rehearse" class="secondary" ${v.rehearseReason?'disabled':''}>补修上一届</button>`:v.settled<v.wins?`<p class="sect-reason">${words(v.settleReason||'')}</p><button id="sect-event-settle" class="secondary" ${v.settleReason?'disabled':''}>返宗报记赛果</button>`:`<p class="sect-reason">${words(v.startReason||'')}</p><button id="sect-event-start" class="secondary" ${v.startReason?'disabled':''}>报场赴赛</button>`;
        return `<section class="sect-section" id="sect-event"><h3>赴会赛事 · ${label}</h3><div class="sect-numbers"><span>报场 <b>${v.attempts}</b></span><span>胜 <b>${v.wins}</b></span><span>负 <b>${v.losses}</b></span><span>上次 <b>${last}</b></span></div><p>赛事在${esc(v.place)}报场，两场都收住才算这一届打完；赛果要回${esc(v.settlePlace)}向云照报记。</p><ul class="sect-trial-foes" data-sect-event-foes>${foes}</ul><p class="sect-conditions">${words(v.notes.win)}</p><p class="sect-conditions">${words(v.notes.loss)}</p>${action}<p class="sect-conditions">${words(v.notYet)}</p></section>`;
      })();
      const grand=(()=>{
        if(!s.joined||!g.sectGrandStatus)return '';
        const v=g.sectGrandStatus();
        const foes=v.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        const last=v.lastOutcome==='win'?'这一届胜':v.lastOutcome==='loss'?'这一届失利':v.lastOutcome==='reported'?'名次已报记':'未与会';
        const label=v.battle?'大比进行中':v.qualified?(v.reported<v.wins?'待报名次':(v.startReason?(v.lastOutcome==='reported'?'已报名次':'待报场'):'可以入会')):'尚无与会资格';
        const action=v.battle?'<p class="sect-reason">大比交战中：关闭此页后仍按真实战斗继续。</p>':v.reported<v.wins?`<p class="sect-reason">${words(v.reportReason||'')}</p><button id="sect-grand-report" class="secondary" ${v.reportReason?'disabled':''}>回药站报名次</button>`:`<p class="sect-reason">${words(v.startReason||'')}</p><button id="sect-grand-start" class="secondary" ${v.startReason?'disabled':''}>入会开擂</button>`;
        return `<section class="sect-section" id="sect-grand"><h3>天下宗门大比 · ${label}</h3><div class="sect-numbers"><span>与会 <b>${v.matches}</b></span><span>胜 <b>${v.wins}</b></span><span>负 <b>${v.losses}</b></span><span>上次 <b>${last}</b></span></div><p>${words(v.intro)}</p><ul class="sect-trial-foes" data-sect-grand-foes>${foes}</ul><p class="sect-conditions">${words(v.reportNote)}</p><p class="sect-conditions">${words(v.rewardNote)}</p>${action}<p class="sect-conditions">${words(v.notYet)}</p></section>`;
      })();
      const summit=(()=>{
        if(!s.joined||!g.sectSummitStatus)return '';
        const v=g.sectSummitStatus();
        const accoutrements={
          'cui-minghe':['art-prop-cui-sleeve','拢起的左袖'],
          'ye-zhiqiu':['art-prop-ye-basket','系着干花的药篓'],
          wugu:['art-prop-wugu-boneslates','腕上的盟约骨片']
        };
        const profile=(p,role)=>{
          if(!p)return '';
          const prop=accoutrements[p.id];
          return `<div class="sect-profile"><img class="sect-illustration sect-headshot" src="${esc(p.art)}" alt="${esc(p.name)}画像">
            <div><small>${esc(role)}</small><strong>${esc(p.name)}</strong><p>${esc(p.look)}</p>${prop?propDetail(...prop):''}</div></div>`;
        };
        const foes=v.foes.map(f=>`<li><span>${esc(f.name)}</span><b>${Math.round(f.hp)} / ${f.maxHp}</b></li>`).join('');
        const last=v.lastOutcome==='win'?'这一届胜':v.lastOutcome==='loss'?'这一届失利':v.lastOutcome==='reported'?'名次已报记':'未赴会';
        const label=v.battle?'会武进行中':v.qualified?(v.reported<v.wins?'待报名次':(v.startReason?(v.lastOutcome==='reported'?'已报名次':'待赴会'):'可以赴会')):'尚无赴会资格';
        const action=v.battle?'<p class="sect-reason">会武交战中：关闭此页后仍按真实战斗继续。</p>':v.reported<v.wins?`<p class="sect-reason">${words(v.reportReason||'')}</p><button id="sect-summit-report" class="secondary" ${v.reportReason?'disabled':''}>回药站报名次</button>`:`<p class="sect-reason">${words(v.startReason||'')}</p><button id="sect-summit-start" class="secondary" ${v.startReason?'disabled':''}>赴会开赛</button>`;
        return `<section class="sect-section" id="sect-summit"><h3>${esc(v.title)} · ${label}</h3><div class="sect-numbers"><span>赴会 <b>${v.meets}</b></span><span>胜 <b>${v.wins}</b></span><span>负 <b>${v.losses}</b></span><span>上次 <b>${last}</b></span></div><p>${words(v.intro)}</p><ul class="sect-trial-foes" data-sect-summit-foes>${foes}</ul>
          <img class="sect-illustration sect-place-art" src="${esc(v.groundsArt)}" alt="照心坪的青石场与历届主家碑">
          <p class="sect-conditions" data-sect-summit-grounds>${sectImage('art-summit-emblem-zhao','照心坪碑额','sect-emblem')} 赛址 <b>${esc(v.grounds||'')}</b> · 主家 ${esc(v.host||'')}${v.currentOpponent?' · 本轮对手 <b>'+esc(v.currentOpponent)+'</b>（'+esc(v.currentOpponentFaction||'')+'）':''}</p>
          ${action}${profile(v.hostProfile,'主家')}
          <ol class="sect-intro-steps" data-sect-summit-roster>${(v.roster||[]).map(r=>`<li class="sect-intro-step"><b>${esc(r.title)}</b><div class="sect-roster-pair">${profile(r,r.factionName)}${profile(r.backup,'替补')}</div><p class="sect-conditions">${esc(r.line)}</p></li>`).join('')}</ol>
          <p class="sect-conditions" data-sect-summit-art>${esc((v.factionNotes||{}).noBuff||'')}</p><p class="sect-conditions">${words(v.reportNote)}</p><p class="sect-conditions">${words(v.rewardNote)}</p><p class="sect-conditions">${words(v.notYet)}</p></section>`;
      })();
      const tianji=(()=>{
        if(!g.tianjiStatus)return '';
        const v=g.tianjiStatus();
        const steps=v.intro.steps.map(x=>'<li class="sect-tianji-step" data-tianji-step="'+esc(x.id)+'" data-done="'+(x.done?'true':'false')+'"><h4>'+esc(x.label)+' <small>'+(x.done?'已具备':'待办')+'</small></h4><p class="sect-conditions">'+words(x.detail)+'</p></li>').join('');
        const greet=(!v.member&&!v.intro.greeted)?'<p class="sect-reason">'+words(v.intro.note||'')+'</p><button data-tianji-greet class="secondary">走到观星台听门规</button>':'';
        const dutyCard=d=>'<article class="sect-duty" data-tianji-duty-card="'+esc(d.id)+'"><h4>'+esc(d.name)+' <small>'+(d.done?'已记档':(!d.reason?'可办':'待办'))+'</small></h4><p>'+words(d.detail)+'</p><p class="sect-path-cost">'+Object.entries(d.cost).map(([k,n])=>(D.items[k]?.name||k)+' ×'+n).join(' · ')+(v.member?' · 功绩 +'+d.merit+' · 威望 +'+d.prestige:'')+'</p>'+(d.done||!d.reason?'':'<p class="sect-reason">'+words(d.reason)+'</p>')+'<button data-tianji-duty="'+esc(d.id)+'" class="secondary" '+(!d.done&&!d.reason?'':'disabled')+'>'+(d.done?'已办成':'去办这件事')+'</button></article>';
        const join=v.member?'':(v.intro.ready?'<label class="sect-agreement"><input id="tianji-agree" type="checkbox">我同意天机阁门规：只报实情，不以外泄推演结果换利。</label><div class="buttons"><button id="tianji-join" class="secondary" disabled>入天机阁</button></div>':'<p class="sect-reason">'+words(v.intro.notes.beforeService||'')+'</p>');
        const promote=v.member?'<p class="sect-reason">'+words(v.promote.reason||'')+'</p><button data-tianji-promote class="secondary" '+(v.promote.reason?'disabled':'')+'>报请晋升'+(v.promote.next?'（'+esc(v.promote.next)+'）':'')+'</button>':'';
        const pathCard=p2=>'<article class="sect-path" data-tianji-path-card="'+esc(p2.id)+'"><div><h4>'+esc(p2.name)+'</h4><span class="sect-level">'+(p2.level?'已修 '+p2.level+' / 3 重':'尚未修习')+'</span><p>'+words(p2.detail)+'</p><p class="sect-path-cost">'+Object.entries(p2.cost).map(([k,n])=>(D.items[k]?.name||k)+' ×'+n).join(' · ')+' · 持有威望 '+p2.contribution+'</p>'+(p2.reason?'<p class="sect-reason">'+words(p2.reason)+'</p>':'')+'<button data-tianji-train="'+esc(p2.id)+'" class="secondary" '+(p2.reason?'disabled':'')+'>约定并修习</button></div></article>';
        const state=v.member?('在册 · '+esc(v.officeName||'')):(v.intro.greeted?'已听门规，待办差事':'未入门');
          const deep=(()=>{
          const d=s.tianjiDeep||null;
          if(!d)return '';
          const reviewCard=x=>{
            const report=x.done?'<p>'+esc(x.close)+'</p>':x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':
              '<p>'+esc(x.scene)+'</p><p>'+esc(x.question)+'</p><div class="sect-actions">'+x.choices.map(c=>
                '<button type="button" class="secondary" data-tianji-review="'+x.id+':'+c.id+'">'+esc(c.label)+'</button>').join('')+'</div>';
            return '<article class="sect-duty" data-review-card="'+x.id+'"><h4>'+esc(x.name)+' <small>'+(x.done?'已落款':esc(x.office)+'案')+'</small></h4>'+
              '<p class="sect-conditions">《'+esc(x.tier)+'》 · 核过 '+x.pairs+' 班 · 结案记功绩 '+x.merit+'、威望 '+x.prestige+'</p>'+report+
              '<p class="sect-reason" role="status" data-review-reply></p></article>';
          };
          const card=(x,kind)=>'<div class="sect-duty" data-tianji-deep-card="'+kind+':'+x.id+'"><h4>'+esc(x.name)+' <small>'+(x.done?'已修成':(x.reason?'待办':(kind==='secret'?'可请传':'可办')))+'</small></h4>'
            +(kind==='secret'?'<p>'+esc(x.text)+'</p><p class="sect-boundary">'+esc(x.effect)+'</p>':'<p>'+esc(x.text)+'</p><p class="sect-boundary">已办 '+x.count+' 次</p>')
            +'<div class="sect-actions"><button type="button" class="sect-action" data-tianji-deep="'+kind+':'+x.id+'"'+(x.done||x.reason?' disabled':'')+'>'+esc(kind==='secret'?(x.done?'已修成':'请传这篇'):'去办这件事')+'</button></div>'
            +(x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':'')+'</div>';
          return '<h4 class="sect-subhead">独门两篇 · 只给公开信息</h4><div class="sect-duties">'+d.secrets.map(x=>card(x,'secret')).join('')+'</div>'
            +'<p class="sect-boundary">'+esc(d.notes.noBuff)+'</p>'
            +(d.info.summitLead?'<p class="sect-conditions">本届三场 · '+g.sectSummitRoster().map(p=>esc(p.name)+'（'+esc(g.factionOf(p.faction).path)+'）').join('、')+'</p>':'')
            +'<h4 class="sect-subhead">观星台经营 · 只记次数</h4><div class="sect-duties">'+d.manage.map(x=>card(x,'manage')).join('')+'</div>'
            +'<p class="sect-boundary">'+esc(d.notes.manageNote)+'</p>'
            +(d.info.manageLead?'<p class="sect-conditions">值簿对照 · '+(d.manage[0].count-d.manage[1].count)+' 班观测尚待校对。</p>':'')
            +(v.member?'<h4 class="sect-subhead">观星台案卷</h4><div class="sect-duties">'+d.reviews.map(reviewCard).join('')+'</div>':'');
        })();
      return '<section class="sect-section" id="sect-tianji"><h3>天机阁 · 观星台 · '+state+'</h3>'
          +sectImage('art-faction-tianji-gate','山南遗址的观星台','sect-place-art')
          +'<div class="sect-numbers"><span>门内阶位 <b>'+esc(v.officeName||'尚未入门')+'</b></span><span>功绩 <b>'+v.merit+'</b></span><span>威望 <b>'+v.prestige+'</b></span><span>办事地点 <b>'+esc(v.place)+'</b></span></div>'
          +'<div class="sect-profile">'+sectImage('art-summit-xie-guanlan',v.mentor.name+'画像','sect-headshot')+'<div><strong>'+esc(v.mentor.name)+'</strong><p>'+esc(v.motto)+'。本宗借山南遗址高台作观星台，与合欢宗药站分开；两宗不抢地，也不能同时入门。</p></div></div>'
          +'<ol class="sect-tianji-steps" data-tianji-steps>'+steps+'</ol>'+greet+join
          +'<div class="sect-duties">'+v.dutyList.map(dutyCard).join('')+'</div>'+promote
          +'<div class="sect-tianji-paths">'+v.paths.map(pathCard).join('')+'</div>'+propDetail('art-tianji-chessboard','观星台棋局')
          +'<p class="sect-boundary">'+v.notYet.map(words).join(' ')+'</p>'+deep+'</section>';
      })();
      const order=(()=>{
        const o=s.order?s.order:null;
        if(!o) return '';
        const tag=(x)=>esc(x.done?'已记档':(x.reason?'待办':'可办'));
        const price=(cost)=>Object.keys(cost||{}).map(k=>esc(({herb:'青灵草',water:'山泉水',paper:'符纸',dust:'灵砂',potion:'回气丹'}[k]||k)+'×'+cost[k])).join('、');
        const workButton=(action,label,reason)=>`<button type="button" class="sect-action" data-sect-order="${esc(action)}" ${reason?'disabled':''}>${esc(label)}</button>`;
        function chapterCard(c){
          const reason=c.learned?c.workReason:c.learnReason;
          let body=workButton('learn:'+c.id,'向师父请教',reason);
          if(c.learned){
            const actions=c.active
              ? Object.entries(c.choices).map(([key,label])=>workButton('finish:'+c.id+':'+key,label,reason)).join('')
              : workButton('start:'+c.id,'接手'+c.job,reason);
            body=`<p>${esc(c.teaching)}</p>${c.active?'<p>'+esc(c.sign)+'</p>':''}${actions}`;
          }
          return `<article class="sect-duty" data-order-chapter="${esc(c.id)}"><h4>${esc(c.name)} <small>${esc(c.job)}</small></h4>
            ${c.learned?'<p>已独办 '+c.count+' 次</p>':''}${body}${reason?'<p class="sect-reason">'+esc(reason)+'</p>':''}
            <p role="status" class="sect-reason" data-order-feedback></p></article>`;
        }
        const dutyCard=(x)=>'<div class="sect-duty" data-sect-order-duty="'+esc(x.id)+'"><h4>'+esc(x.label)+'<small>'+tag(x)+'</small></h4><p>'+esc(x.desc)+'</p><div class="sect-cost">'+price(x.cost)+' · 功绩 '+x.merit+' · 威望 '+x.prestige+'</div>'+(x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':'')+'<button type="button" class="sect-action" data-sect-order="duty:'+esc(x.id)+'"'+(x.reason?' disabled':'')+'>办这件差事</button></div>';
        const one=(D)=>{
          const steps=(D.steps||[]).map(x=>'<li class="sect-tianji-step" data-sect-order-step="'+esc(x.id)+'" data-done="'+(x.done?'true':'false')+'"><h4>'+esc(x.label)+'<small>'+esc(x.done?'已具备':'待办')+'</small></h4><p>'+esc(x.detail)+'</p>'+(x.done?'':'<p class="sect-reason">'+esc(x.reason||'')+'</p>')+'</li>').join('');
          const paths=(D.paths||[]).map(x=>'<div class="sect-duty" data-sect-order-path="'+esc(x.id)+'"><h4>'+esc(x.name)+'<small>'+esc(x.level+' / '+x.max)+'</small></h4><p>'+esc(x.desc)+'</p><div class="sect-cost">需持有威望 '+x.contribution+'（只作门槛，不扣）</div>'+(x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':'')+'<button type="button" class="sect-action" data-sect-order="train:'+esc(x.id)+'"'+(x.reason?' disabled':'')+'>修这一层</button></div>').join('');
          const head=D.joined?('在册 · '+esc(D.office)):(D.greeted?'已听门规，待办差事':'未入门');
          const perms=D.permissions?Object.keys(D.permissions).filter(k=>D.permissions[k]).map(k=>({recommend:'举荐',lead:'带队',recruit:'招录',teach:'传习',govern:'治理'}[k])).join('、'):'';
          return '<section class="sect-section" data-sect-order-block="'+esc(D.id)+'"><h3>'+esc(D.name)+' · '+esc(D.place)+' · '+head+'</h3>'+
            sectImage(D.sceneArt,D.place,'sect-place-art')+
            '<div class="sect-numbers"><span>功绩 <b>'+D.merit+'</b></span><span>威望 <b>'+D.prestige+'</b></span><span>办事地点 <b>'+esc(D.place)+'</b></span></div>'+
            '<p>'+esc(D.motto)+'　'+esc(o.noBuff)+'</p>'+
            '<ol class="sect-intro-steps sect-order-steps">'+steps+'</ol>'+
            (!D.greeted?'<button type="button" class="sect-action" data-sect-order="greet:'+esc(D.id)+'">走到'+esc(D.place)+'听门规</button>':'')+
            (D.greeted&&!D.joined?'<p class="sect-reason">'+esc(D.steps[2].reason||'')+'</p><label class="sect-agree"><input type="checkbox" data-sect-order-agree="'+esc(D.id)+'"> 我理解并同意门规；入门由自己决定。</label><button type="button" class="sect-action" data-sect-order="join:'+esc(D.id)+'" disabled>加入'+esc(D.name)+'</button>':'')+
            (D.joined?'<p class="sect-reason">'+(perms?'已获权：'+esc(perms):'暂无权')+'</p><button type="button" class="sect-action" data-sect-order="promote">报请晋升</button>':'')+
            '<div class="sect-duties">'+D.duties.map(dutyCard).join('')+'</div>'+
            '<h4 class="sect-subhead">门径修习</h4><div class="sect-duties">'+paths+'</div>'+
            '<h4 class="sect-subhead">门内秘传与当值</h4><p>每件事务首次独办得 '+o.firstWork.merit+' 功绩、'+o.firstWork.prestige+' 威望，以后只记次数。</p><div class="sect-duties">'+D.chapters.map(chapterCard).join('')+'</div>'+
            (D.officeArt?sectImage(D.officeArt,D.office+'当值','sect-inset'):'')+'</section>';
        };
        return '<div id="sect-order">'+o.orders.map(one).join('')+'</div>';
      })();

      const exit=(()=>{
        if(!g.sectExitStatus)return '';
        const v=g.sectExitStatus();
        const kept=v.levels.dual+v.levels.siphon;
        const last=v.last?`${esc(v.last.officeName||'门内')} · 保留层数 ${v.last.layers} · 功绩 ${v.last.merit} · 威望 ${v.last.prestige} · 当时贡献 ${v.last.contribution}`:'';
        const history=v.leaves?`<p class="sect-conditions">已退宗 <b>${v.leaves}</b> 次，最近一次：${last}。退宗时清零的可花贡献累计 ${v.forfeited}，记在门内旧账里，不再补发。</p>`:'';
        const leave=v.joined?`<p class="sect-reason">${words(v.leaveReason||'')}</p>${s.adult?`<label class="sect-agreement"><input id="sect-exit-agree" type="checkbox">我明白退宗会撤职阶、清零可花贡献，功法与门内档案保留。</label><div class="buttons"><button id="sect-exit-confirm" class="secondary" disabled>确认退宗</button><button id="sect-exit-cancel" class="secondary">仍在门中</button></div>`:''}`:history+'<p class="sect-conditions">重新入门请用上方「问道入门」：仍由自己决定，入门后从记名弟子起，已修功法不必重修，功绩与威望要重新挣。</p>';
        return `<section class="sect-section" id="sect-exit"><h3>退宗与散修 · ${v.joined?'在册':'已退宗'}</h3><div class="sect-numbers"><span>退宗 <b>${v.leaves} / ${v.maxLeaves}</b></span><span>保留层数 <b>${kept}</b></span><span>办事地点 <b>${esc(v.place)}</b></span></div><p>${words(v.keepNote)}</p><p class="sect-conditions">${words(v.clearNote)}</p><p class="sect-conditions">${words(v.remainNote)}</p>${leave}<p class="sect-conditions">${words(v.confirmNote)}</p></section>`;
      })();
      const donation=s.joined&&s.adult?`<section class="sect-section sect-donation"><div><h3>供奉药材，换取传习</h3><p>交付 ${esc(goods(s.donation.cost))}，获得宗门贡献 ${s.donation.gain}。</p><p>随身：${Object.keys(s.donation.cost).map(id=>esc(D.items[id]?.name||id)+' ×'+(g.state.inventory[id]||0)).join('、')}</p>${s.donateReason?`<p class="sect-reason">${words(s.donateReason)}</p>`:''}</div><button id="sect-donate" class="secondary" ${s.donateReason?'disabled':''}>交付并记贡献</button></section>`:'';
      const training=s.joined?`<section class="sect-section"><h3>两路修习 · 功法实用于御敌</h3><p>每重进境皆先立约，确认修习方扣资材。</p><div class="sect-paths">${paths.map(p=>`<article class="sect-path" data-sect-path-card="${esc(p.id)}">${art(p.id)}<div><h4>${esc(p.name)}</h4><span class="sect-level">${p.level?'已修 '+p.level+' / '+p.maxLevel+' 重':'尚未修习'}</span><p>修习前需约定：${words(p.agreement)}</p><p>${words(p.desc)}</p><p class="sect-path-cost">${p.level>=p.maxLevel?'此路已修至本章上限':'下一重：'+esc(cost(p))}</p>${p.reason?`<p class="sect-reason">${words(p.reason)}</p>`:''}${s.adult?`<button data-sect-train="${esc(p.id)}" class="secondary" ${p.available?'':'disabled'}>${p.level?'约定进修':'查看约定并修习'}</button>`:''}</div></article>`).join('')}</div></section>`:'';
      const secretCard=x=>{
        const costText=Object.entries(x.cost||{}).map(([k,n])=>(D.items[k]?.name||k)+' ×'+n).join(' · ');
        const badge=x.done?'已修成':(!x.reason?'可请传':(/两篇有先后|尚未修成/.test(x.reason)?'待前篇':(/境界/.test(x.reason)?'待晋阶':'待办')));
        const need='需 '+x.pathName+'第 '+x.needLevel+' 层 · '+x.realmTitle+' · 持有贡献 '+x.contribution+(x.done?'':' · '+costText);
        const reason=x.done||!x.reason?'':'<p class="sect-reason">'+words(x.reason)+'</p>';
        const button='<button data-sect-secret="'+x.id+'" class="secondary" '+(!x.done&&!x.reason?'':'disabled')+'>'+(x.done?'已修成':'请传这篇')+'</button>';
        return '<article class="sect-duty" data-sect-secret-card="'+x.id+'"><h4>'+esc(x.name)+' <small>'+badge+'</small></h4><p>'+words(x.desc)+'</p><p class="sect-path-cost">'+need+'</p>'+reason+button+'</article>';
      };
      const secret=s.joined&&s.secret?(()=>{
        const sec=s.secret;
        const head='<section class="sect-section" id="sect-secret"><h3>独门修习 · 秘传第 '+sec.doneCount+' / '+sec.total+' 篇</h3>';
        const numbers='<div class="sect-numbers"><span>宗内门径 <b>不传外人</b></span><span>办事地点 <b>'+esc(sec.place)+'</b></span><span>持有贡献 <b>'+sec.contribution+'</b></span></div>';
        const intro='<p>秘传只传在册弟子：两脉各修满三层、境界足够、并持有相应贡献才可请传。贡献只是门槛，办成时只扣实物，不另外记账。</p>';
        const cards='<div class="sect-duties">'+sec.tiers.map(secretCard).join('')+'</div>';
        const foot='<p class="sect-boundary">退宗后秘传仍留在身上，与功法一样；但不再传后续篇章。</p></section>';
        return head+numbers+intro+cards+foot;
      })():'';
      const manageCard=x=>{
        const badge=x.done?'已记档':(x.permissionHeld?(!x.reason?'可办':'待前序'):'待晋阶');
        const costText=Object.entries(x.cost||{}).map(([k,n])=>(D.items[k]?.name||k)+' ×'+n).join(' · ');
        const need=(x.cost?costText+' · ':'')+'权限 '+({recommend:'举荐',lead:'带队',recruit:'招录',teach:'传习',govern:'治理'}[x.permission]||x.permission);
        const reason=x.done||!x.reason?'':'<p class="sect-reason">'+words(x.reason)+'</p>';
        const button='<button data-sect-manage="'+x.id+'" class="secondary" '+(!x.done&&!x.reason?'':'disabled')+'>'+(x.done?'已办成':'去办这件事')+'</button>';
        return '<article class="sect-duty" data-sect-manage-card="'+x.id+'"><h4>'+esc(x.name)+' <small>'+badge+'</small></h4><p>'+words(x.detail)+'</p><p class="sect-path-cost">'+need+(x.count?' · 已记 '+x.count+' 次':'')+'</p>'+reason+button+'</article>';
      };
      const story=(()=>{
        const st=s.story;
        if(!st)return '';
        const y=st.partner;
        const yunState=y.answer===true?'已说定：以伴侣相待':(y.answer===false?'已说定：只做同事':(y.asked?'已开口，等你答复':'还没开口'));
        const boundary=(y.boundary||[]).map(x=>'<li>'+esc(x)+'</li>').join('');
        const actions=!s.joined?'':(y.answer!==null?'<p class="sect-reason">这段已经说定了，往后仍按实际做过的事记。</p>'
          :(y.asked
            ?'<div class="sect-actions"><button type="button" class="sect-action" data-sect-story="yes">同意，以伴侣相待</button><button type="button" class="sect-action" data-sect-story="no">只做同事</button></div>'
            :'<div class="sect-actions"><button type="button" class="sect-action" data-sect-story="ask"'+(y.reason?' disabled':'')+'>'+esc(y.askLabel)+'</button></div>'+(y.reason?'<p class="sect-reason">'+esc(y.reason)+'</p>':'')));
        const card=(x,kind)=>'<div class="sect-duty" data-sect-story-card="'+kind+'"><h4>'+esc(x.title)+' <small>'+(x.done_already?'已记档':'待办')+'</small></h4><p>'+esc(x.text)+'</p>'
          +(kind==='stone'&&!x.reason&&!x.done_already?sectImage('art-prop-summit-stele','碑上待刻的末行','sect-inset'):'')
          +(kind==='prescription'&&x.done_already?sectImage('art-prop-su-old-recipe','旧方末尾的凝霜落款','sect-inset'):'')
          +(x.done_already&&x.lines?'<ul class="sect-boundary">'+x.lines.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul>':'')
          +'<div class="sect-actions"><button type="button" class="sect-action" data-sect-story="'+(kind==='stone'?'stone':'prescription')+'"'+(x.reason?' disabled':'')+'>'+esc(x.done_already?'已读过':(kind==='stone'?'刻下本门名号':'读旧方'))+'</button></div>'
          +(x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':'')+'</div>';
        return '<section class="sect-section" id="sect-story"><h3>宗门小记</h3><div class="sect-numbers"><span>地点 <b>行旅药站</b></span><span>与 '+esc(y.name)+' <b>'+esc(yunState)+'</b></span></div>'
          +(s.joined?'<div class="sect-duty" data-sect-story-partner><h4>'+esc(y.name)+' <small>'+esc(y.role)+'</small></h4><p>'+esc(y.askText)+'</p><ul class="sect-boundary">'+boundary+'</ul>'+actions+'</div>':'<p class="sect-reason">先把宗门的事办明白，才谈这段。</p>')
          +'<div class="sect-duties">'+card(st.stone,'stone')+card(st.prescription,'prescription')+'</div>'
          +(()=>{
            const L=st.letter;
            if(!L)return '';
            const chosen=L.choice==='sent'?L.doneSent:(L.choice==='burned'?L.doneBurned:'');
            const btn=L.choice?(''):('<div class="sect-actions"><button type="button" class="sect-action" data-sect-story="send"'+(L.reason?' disabled':'')+'>'+esc(L.sendLabel)+'</button><button type="button" class="sect-action" data-sect-story="burn"'+(L.reason?' disabled':'')+'>'+esc(L.burnLabel)+'</button></div>'+(L.reason?'<p class="sect-reason">'+esc(L.reason)+'</p>':''));
            return '<div class="sect-duty" data-sect-story-letter><h4>'+esc(L.title)+' <small>'+(L.choice?(L.choice==='sent'?'已送出':'已烧了'):'待选')+'</small></h4><p>'+esc(L.text)+'</p>'+(!L.choice&&!L.reason?sectImage('art-prop-pei-letters','裴照取出的未寄信札','sect-inset'):'')+btn+(chosen?'<p class="sect-reason">'+esc(chosen)+'</p>':'')+'</div>';
          })()
          +(()=>{
            const F=st.fate;
            if(!F)return '';
            const rows=F.steps.map(x=>'<article class="sect-duty" data-sect-fate-card="'+x.id+'"><h4>'+esc(x.label)+' <small>'+(x.done?'已记档':'待办')+'</small></h4>'
              +'<div class="sect-actions"><button type="button" class="sect-action" data-sect-story="fate:'+x.id+'"'+(x.reason?' disabled':'')+'>'+(x.done?'已记下':'记下这一处')+'</button></div>'
              +(x.reason?'<p class="sect-reason">'+esc(x.reason)+'</p>':'')+'</article>').join('');
            return '<div class="sect-duty" data-sect-story-fate><h4>'+esc(F.title)+' <small>已记 '+F.done+' / '+F.total+'</small></h4><p>'+esc(F.text)+'</p>'
              +(F.concluded?'<p class="sect-reason">'+esc(F.conclusion)+'</p>':'')
              +'<div class="sect-duties">'+rows+'</div><p class="sect-boundary">'+esc(F.note)+'</p></div>';
          })()

          +'<p class="sect-boundary">'+esc(st.notes.boundaries)+'</p></section>';
      })();
      const manage=s.joined&&s.manage?(()=>{
        const mg=s.manage;
        const head='<section class="sect-section" id="sect-manage"><h3>招录与经营 · 已办 '+mg.doneCount+' / '+mg.total+'</h3>';
        const numbers='<div class="sect-numbers"><span>当前职阶 <b>'+esc(mg.officeName||'尚未任职')+'</b></span><span>在册名册 <b>'+mg.roster+' 人</b></span><span>办事地点 <b>'+esc(mg.place)+'</b></span></div>';
        const intro='<p>招录与经营随职阶开启：招录凭名册与纸料，派遣、核账、交卸各记一功。</p>';
        const cards='<div class="sect-duties">'+mg.actions.map(manageCard).join('')+'</div>';
        const foot='<p class="sect-boundary">'+esc(mg.note)+'</p></section>';
        return head+numbers+intro+cards+foot;
      })():'';
      const skills=s.joined?`<section class="sect-section"><h3>御敌招式 · 在 V 暂停下令中施展</h3><div class="sect-skill-list">${(s.skills||[]).map(k=>`<article><h4>${esc(k.name)} <small>${k.level?'第 '+k.level+' 重':'待修习'}</small></h4><p>${words(k.detail||k.desc)}</p><p>${k.cost} 灵力 · ${k.cooldown} 秒调息${k.range?' · 施展距离 '+k.range:''}</p>${k.reason?`<p class="sect-reason">${words(k.reason)}</p>`:''}</article>`).join('')}</div><p class="sect-boundary">执令出招方扣灵力；掠灵反噬与风评随实招记入。</p></section>`:'';
      frame('山门问道',head+admission+tianji+reputation+career+trial+meet+office+trip+bond+event+grand+summit+order+exit+donation+training+secret+manage+story+skills);
      if(showWorld){$('modal-title').insertAdjacentHTML('afterend','<div class="buttons"><button id="sect-world-open" class="secondary">行旅药站 · 走入庭院</button></div>');$('sect-world-open').onclick=showWorld;}
      const orders=s.order?.orders||[], towerInfo=g.tianjiStatus?.(), meetInfo=s.joined&&g.sectSummitStatus?.();
      const houses=[
        {id:'hehuan',name:'合欢宗',art:'assets/art-v120/hehuan.webp',people:s.partner?.name,rule:s.doctrine,section:'#sect-admission,#sect-career'},
        ...(towerInfo?[{id:'tianji',name:towerInfo.name,art:'assets/sect-art/art-faction-tianji-gate.webp',people:towerInfo.mentor?.name,rule:towerInfo.motto,section:'#sect-tianji'}]:[]),
        ...orders.map(o=>({id:o.id,name:o.name,art:'assets/sect-art/'+o.sceneArt+'.webp',people:o.mentor?.name,rule:o.motto,section:'[data-sect-order-block="'+o.id+'"]'})),
        ...(meetInfo?[{id:'summit',name:'照心坪',art:meetInfo.groundsArt,people:meetInfo.host,rule:meetInfo.intro,section:'#sect-summit'}]:[])
      ];
      const house=houses.find(h=>h.id===viewing)||houses.find(h=>h.name===member?.name)||houses[0];
      const content=$('modal-content'), banner=content.querySelector('.sect-scene'), identityBox=content.querySelector('.sect-identity');
      $('modal').dataset.house=house.id;
      banner.querySelector('img').src=house.art;banner.querySelector('img').alt=house.name;
      banner.querySelector('figcaption').textContent=house.name;
      const motes=document.createElement('canvas');motes.width=960;motes.height=160;
      motes.className='sect-atmosphere';motes.setAttribute('aria-hidden','true');banner.querySelector('img').after(motes);
      const roles={hehuan:'双修济困',tianji:'星算查案',danding:'炼丹符火',baicao:'岐黄灵草',summit:'七宗会武'};
      const housesInfo=Object.fromEntries(houses.filter(h=>h.id!=='summit').map(h=>[h.id,root.XiuxianStoryline.house(g,s,h.id)]));
      const info=housesInfo[house.id];
      $('sects-open').dataset.house=house.id;
      banner.insertAdjacentHTML('beforebegin','<nav class="house-tabs" aria-label="山门">'+houses.map(h=>'<button data-house="'+h.id+'" aria-pressed="'+(h===house)+'">'+esc(h.name)+'<small>'+roles[h.id]+'</small><em>'+(housesInfo[h.id]?.joined?'本门':housesInfo[h.id]?.ready?'可拜入':h.id==='summit'?'会场':'未入门')+'</em></button>').join('')+'</nav>');
      for(const tab of content.querySelectorAll('[data-house]'))tab.onclick=()=>{viewing=tab.dataset.house;show(true);content.querySelector('[data-house="'+viewing+'"]').focus({preventScroll:true});};
      const section=content.querySelector(house.section), today=[];
      const hub=$('sect-world-open');
      if(house.id==='hehuan' && hub)today.push(hub);
      if(section) for(const button of section.querySelectorAll('button:enabled')) {
        if(today.length===3)break;
        today.push(button);
      }
      const stage=docSection('sect-desk');
      stage.innerHTML='<div><h3>我的身份与职级</h3><p>'+esc(member?[member.name,member.office].filter(Boolean).join(' · '):'尚未入门')+'</p></div><div><h3>今日可做</h3><div class="sect-today"></div></div><div><h3>'+(house.id==='summit'?'会武主家':'门内人物')+'</h3><p>'+esc(house.people||'—')+'</p></div>';
      function docSection(name){const el=document.createElement('section');el.className=name;return el;}
      const actions=stage.querySelector('.sect-today');
      for(const button of today){
        // Jump to the original action and its requirements before the user commits.
        const link=document.createElement('button');link.textContent=button.textContent;
        if(button===hub){actions.append(button);continue;}
        else link.onclick=()=>{button.scrollIntoView({block:'center'});button.focus({preventScroll:true});};
        actions.append(link);
      }
      if(!today.length && section){const jump=document.createElement('button');jump.textContent='查看当前条件';jump.onclick=()=>section.scrollIntoView();actions.append(jump);}
      banner.after(stage);
      if(info){
        const card=docSection('house-guide focus-brief clarity-paper-card');
        const nextStep=info.steps.findIndex(x=>!x.done);
        const rows=info.joined?info.offices.map((x,i)=>({title:x.name,done:i<info.rank,current:i===info.rank})):
          info.steps.map((x,i)=>({title:['见引路人','办公务','拜入门下'][i],done:x.done,current:i===nextStep}));
        const work=info.duties.find(d=>!d.done&&!d.reason);
        const next=info.next;
        const chips=next&&info.joined?[[info.merit>=next.merit,'功绩 '+info.merit+' / '+next.merit],[info.prestige>=next.prestige,'威望 '+info.prestige+' / '+next.prestige],...(house.id==='hehuan'?[[s.career.realm.index>=Object.keys(root.XiuxianSectCareerData.realmTitles).indexOf(next.realm),'境界 '+(s.career.next?.realmTitle||'依职阶要求')]]:[])]:rows.map(r=>[r.done,r.title]);
        const summary=info.joined?(next?'下一职级 · '+next.name:'已至本门最高职级'):(info.steps[nextStep]?.detail||info.place);
        card.innerHTML='<p class="eyebrow focus-kicker">此刻重点 · '+esc(house.name)+' · '+roles[house.id]+'</p><h3>入宗 · 晋升 · 退宗一览</h3><ol class="house-path">'+rows.map((r,i)=>'<li class="'+(r.current?'now':r.done?'past':'')+'">'+(r.done?'✓ ':i+1+'　')+esc(r.title)+'</li>').join('')+'</ol><div class="focus-chips">'+chips.map(([ok,label])=>'<span class="focus-chip '+(ok?'is-met':'is-gap')+'">'+(ok?'✓ ':'✕ ')+esc(label)+'</span>').join('')+'</div><p class="focus-summary">'+esc(summary)+'</p><div class="house-action"></div>';
        banner.after(card);
        const slot=card.querySelector('.house-action'), at=info.steps[nextStep];
        const act=document.createElement('button');act.className='primary';
        if(info.joined&&work){
          act.textContent='今日事务 · '+(work.name||work.label);
          act.onclick=()=>{const selector=house.id==='hehuan'?'[data-sect-duty="'+work.id+'"]':house.id==='tianji'?'[data-tianji-duty="'+work.id+'"]':'[data-sect-order="duty:'+work.id+'"]';content.querySelector(house.section.split(',').at(-1))?.querySelector(selector)?.click();};
        }else if(!info.joined&&house.id==='hehuan'&&nextStep<2){act.textContent='前往行旅药站';act.onclick=()=>hub?.click();}
        else{
          act.textContent=info.joined?'查看晋升与门内事务':nextStep===2?'查看拜入条件':(nextStep===1?'去办公务 · ':'见引路人 · ')+info.place;
          act.onclick=()=>{
            const map=house.id==='danding'?'garden':'ruins';
            const nativeAction=nextStep===0?'[data-tianji-greet],[data-sect-order^="greet:"]':'[data-tianji-duty]:enabled,[data-sect-order^="duty:"]:enabled';
            const anchor=info.joined?section:nextStep===2?section?.querySelector('input[type=checkbox]'):g.state.map===map?section?.querySelector(nativeAction):null;
            if(anchor){anchor.scrollIntoView({block:'center'});anchor.focus({preventScroll:true});return;}
            closeModal();trackObjective({map,panel:'sects-open',label:at?.detail||info.place});
          };
        }
        slot.append(act);
        const rules=document.createElement('details');rules.className='house-rules';
        rules.innerHTML='<summary>如何加入、晋升与退出宗门</summary><ul><li>入宗须成年'+(house.id==='tianji'?'':'、筑基')+'，在'+esc(info.place)+'见引路人，办成公开事务后亲自同意门规。</li><li>办理本门事务积功绩与威望，达到下一职级门槛后报请晋升。'+(info.promoteReason&&info.joined?esc(info.promoteReason):'')+'</li><li>'+(house.id==='hehuan'?'在「退宗与散修」核对后果并勾选确认。撤职、清零可花贡献，已学功法保留。转投须再满足新门门槛。':'本门当前没有退宗办理入口。在册时不能兼入其他门派。')+'</li></ul>';
        card.append(rules);
      }
      const history=document.createElement('details');history.className='sect-rules';
      const summary=document.createElement('summary');summary.textContent='门规与历程';history.append(summary);
      if(house.rule){const line=document.createElement('p');line.textContent=house.rule;history.append(line);}
      history.append(identityBox);stage.after(history);
      for(const paragraph of content.querySelectorAll(':scope > .sect-introduction,:scope > .sect-boundary'))history.append(paragraph);
      const joinReady=!!(s.intro?s.intro.ready:!s.joinReason);
      if($('sect-intro-greet'))$('sect-intro-greet').onclick=()=>commit(()=>g.greetSectIntro());
      if($('sect-join-agree'))$('sect-join-agree').onchange=()=>{$('sect-join').disabled=!$('sect-join-agree').checked||!joinReady;};
      if($('sect-join'))$('sect-join').onclick=()=>commit(()=>g.joinSect('hehuan',$('sect-join-agree').checked));
      if($('sect-donate'))$('sect-donate').onclick=()=>commit(()=>g.donateSect());
      if($('tianji-agree'))$('tianji-agree').onchange=()=>{$('tianji-join').disabled=!$('tianji-agree').checked;};
      if($('tianji-join'))$('tianji-join').onclick=()=>commit(()=>g.joinTianji($('tianji-agree').checked));
      const greetBtn=document.querySelector('[data-tianji-greet]');
      if(greetBtn)greetBtn.onclick=()=>commit(()=>g.greetTianji());
      document.querySelectorAll('[data-tianji-duty]').forEach(b=>b.onclick=()=>commit(()=>g.runTianjiDuty(b.dataset.tianjiDuty)));
      const promoBtn=document.querySelector('[data-tianji-promote]');
      if(promoBtn)promoBtn.onclick=()=>commit(()=>g.promoteTianjiOffice());
      document.querySelectorAll('[data-tianji-train]').forEach(b=>b.onclick=()=>commit(()=>g.trainTianjiPath(b.dataset.tianjiTrain,true)));
      document.querySelectorAll('[data-tianji-deep]').forEach(b=>b.onclick=()=>{const k=b.dataset.tianjiDeep.split(':');return commit(()=>k[0]==='secret'?g.learnTianjiDeep(k[1],true):g.runTianjiManage(k[1]));});
      const assist=root.XiuxianPuzzleAssist;
      for(const scope of document.querySelectorAll('[data-review-card]')){
        const id=scope.dataset.reviewCard,anchor=scope.querySelector('.sect-actions');
        if(anchor&&!g.tianjiReviewReason(id))assist.mount('review-'+id,{scope,anchor,hint:'对照两台记录，找出有依据的判断。',targets:()=>[['[data-tianji-review="'+id+':'+root.XiuxianSectTianjiDeepData.reviews.find(r=>r.id===id).answer+'"]','选这个']]});
      }
      for(const scope of document.querySelectorAll('[data-order-chapter]')){
        const button=scope.querySelector('[data-sect-order^="finish:"]:enabled');if(!button)continue;
        const id=button.dataset.sectOrder.split(':')[1];
        assist.mount('duty-'+id,{scope,anchor:button,hint:'按师父的诀窍核对眼前这一次的情形。',targets:()=>[['[data-sect-order="finish:'+id+':'+g.orderWorkRound(g.orderChapter(id)).answer+'"]','选这个']]});
      }
      document.querySelectorAll('[data-tianji-review]').forEach(b=>b.onclick=()=>{
        const [id,choice]=b.dataset.tianjiReview.split(':');
        if(g.resolveTianjiReview(id,choice)) {
          save(true); show(true);
          document.querySelector('[data-review-card="'+id+'"]').scrollIntoView({block:'center'});
        } else {
          assist.record('review-'+id,false);
          const review=g.tianjiDeepStatus().reviews.find(r=>r.id===id);
          b.closest('[data-review-card]').querySelector('[data-review-reply]').textContent=review.reason||review.retry;
        }
        drain();
      });
      document.querySelectorAll('[data-sect-duty]').forEach(b=>b.onclick=()=>commit(()=>g.runSectDuty(b.dataset.sectDuty)));
      if($('sect-promote'))$('sect-promote').onclick=()=>commit(()=>g.promoteSectOffice());
      if($('sect-trial-start'))$('sect-trial-start').onclick=()=>commit(()=>g.startSectTrial());
      if($('sect-meet-start'))$('sect-meet-start').onclick=()=>commit(()=>g.startSectMeet());
      document.querySelectorAll('[data-sect-office]').forEach(b=>b.onclick=()=>commit(()=>g.runSectOffice(b.dataset.sectOffice)));
      if($('sect-trip-prepare'))$('sect-trip-prepare').onclick=()=>commit(()=>g.prepareSectTrip());
      if($('sect-trip-depart'))$('sect-trip-depart').onclick=()=>commit(()=>g.departSectTrip());
      if($('sect-trip-settle'))$('sect-trip-settle').onclick=()=>commit(()=>g.settleSectTrip());
      if($('sect-event-start'))$('sect-event-start').onclick=()=>commit(()=>g.startSectEvent());
      if($('sect-event-rehearse'))$('sect-event-rehearse').onclick=()=>commit(()=>g.rehearseEvent());
      if($('sect-event-settle'))$('sect-event-settle').onclick=()=>commit(()=>g.settleSectEvent());
      if($('sect-grand-start'))$('sect-grand-start').onclick=()=>commit(()=>g.startSectGrand());
      if($('sect-grand-report'))$('sect-grand-report').onclick=()=>commit(()=>g.reportSectGrand());
        if($('sect-summit-start'))$('sect-summit-start').onclick=()=>commit(()=>g.startSectSummit());
        if($('sect-summit-report'))$('sect-summit-report').onclick=()=>commit(()=>g.reportSectSummit());
      if($('sect-exit-agree'))$('sect-exit-agree').onchange=()=>{$('sect-exit-confirm').disabled=!$('sect-exit-agree').checked||!!g.sectExitStatus().leaveReason;};
      if($('sect-exit-confirm'))$('sect-exit-confirm').onclick=()=>commit(()=>g.leaveSect($('sect-exit-agree').checked));
      if($('sect-exit-cancel'))$('sect-exit-cancel').onclick=()=>show(true);
      document.querySelectorAll('[data-sect-bond]').forEach(b=>b.onclick=()=>commit(()=>g.bondTalk(b.dataset.sectBond,b.dataset.sectBondTopic)));
      document.querySelectorAll('[data-sect-secret]').forEach(b=>b.onclick=()=>commit(()=>g.learnSectSecret(b.dataset.sectSecret,true)));
      document.querySelectorAll('[data-sect-manage]').forEach(b=>b.onclick=()=>commit(()=>g.runSectManage(b.dataset.sectManage)));
      document.querySelectorAll('[data-sect-order-agree]').forEach(b=>{b.onchange=()=>{const block=b.closest('section');const btn=block&&block.querySelector('[data-sect-order^="join:"]');if(btn)btn.disabled=!b.checked;};});
      document.querySelectorAll('[data-sect-order]').forEach(b=>{
        b.onclick=()=>{
          const k=b.dataset.sectOrder.split(':');
          const run=()=>{
            if(k[0]==='greet') return g.orderGreet(k[1]);
            if(k[0]==='duty') return g.runOrderDuty(k[1]);
            if(k[0]==='join'){const box=document.querySelector('[data-sect-order-agree="'+k[1]+'"]');return g.joinOrder(k[1],!!(box&&box.checked));}
            if(k[0]==='promote') return g.promoteOrderOffice();
            if(k[0]==='train') return g.trainOrderPath(k[1],true);
            if(k[0]==='learn') return g.learnOrderChapter(k[1]);
            if(k[0]==='start') return g.startOrderWork(k[1]);
            if(k[0]==='finish') return g.finishOrderWork(k[1],k[2]);
            return '';
          };
          const error=run();if(k[0]==='finish')assist.record('duty-'+k[1],!error);
          if(error){
            const status=b.closest('[data-order-chapter]')?.querySelector('[data-order-feedback]')||$('inline-message');
            status.textContent=error;
            if(!b.closest('[data-order-chapter]'))status.scrollIntoView({block:'nearest'});
            return;
          }
          const scroll=$('modal').scrollTop;
          show(true);
          $('modal').scrollTop=scroll;
          drain();
        };
      });
      document.querySelectorAll('[data-sect-story]').forEach(b=>b.onclick=()=>commit(()=>{
        const k=b.dataset.sectStory;
        if(k==='ask')return g.askYun();
        if(k==='yes')return g.answerYun(true);
        if(k==='no')return g.answerYun(false);
        if(k==='stone')return g.carveStone();
        if(k==='prescription')return g.readPrescription();
        if(k==='send')return g.sendLetter();
        if(k==='burn')return g.burnLetter();
        if(k.startsWith('fate:'))return g.stepFate(k.slice(5));
        return false;
      }));
      document.querySelectorAll('[data-sect-train]').forEach(b=>b.onclick=()=>agreement(b.dataset.sectTrain));
    }
    function agreement(id){
      const g=game(),s=g.sectStatus(),p=s.paths.find(p=>p.id===id);if(!s.adult||!s.joined||!p)return;
      feedback='';
      const partner=s.partner;
      frame(p.name+' · 本次修习约定',`<div class="sect-agreement-layout">${art(id)}<div><p class="sect-partner">${esc(partner.name)} · ${partner.age} 岁 · ${partner.gender==='female'?'女修':'男修'}</p><p>${words(partner.goal)}</p><p>${words(partner.consent)}</p><p class="sect-consent-copy">拟定约定：${words(p.agreement)}</p><p>${words(p.desc)}</p><p class="sect-path-cost">本次消耗：${esc(cost(p))}</p><p class="sect-boundary">去留尽凭本心，合修不缚情缘。</p>${p.reason?`<p class="sect-reason">${words(p.reason)}</p>`:''}<label class="sect-agreement"><input id="sect-train-agree" type="checkbox">我已了解本次约定与代价，自愿共同修习。</label><div class="buttons"><button id="sect-train-confirm" class="primary" disabled>确认约定，开始修习</button><button id="sect-train-cancel" class="secondary">暂不修习</button></div></div></div>`);
      $('sect-train-agree').onchange=()=>{$('sect-train-confirm').disabled=!$('sect-train-agree').checked||!p.available;};
      $('sect-train-confirm').onclick=()=>commit(()=>g.trainSectPath(id,$('sect-train-agree').checked),p.result+' '+p.name+'已达第 '+(p.level+1)+' 重。');
      $('sect-train-cancel').onclick=show;
    }
    function updateHUD(){
      const g=game();if(!g)return;const s=g.sectStatus(),b=$('sects-open');
      const member=membership(s);
      b.innerHTML='<kbd>H</kbd> '+(member?esc(member.name)+' · '+esc(member.office):'宗门');
      const order=s.order?.orders?.find(o=>o.joined), shared={danding:'garden',baicao:'ruins'};
      const place=g.sectSummitBattleActive?.()?'照心坪':g.inSectWorld?.()?'合欢宗':order&&g.state.map===shared[order.id]?order.name:s.tianji?.member&&g.state.map==='ruins'?'天机阁':'';
      const stamp=$('sect-location');stamp.textContent=place;stamp.hidden=!place;
      const id=root.XiuxianStoryline.memberId(s);
      if($('modal').dataset.mode!=='sects'||$('modal-layer').hidden)b.dataset.house=id||'hehuan';
      const hasDuty=s.joined?s.career.duties.some(d=>d.available):s.tianji?.member?s.tianji.dutyList.some(d=>!d.done&&!d.reason):s.order?.orders.find(o=>o.joined)?.duties.some(d=>!d.done&&!d.reason);
      b.classList.toggle('has-badge',!!(hasDuty||s.intro?.ready||s.tianji?.intro.ready||s.order?.orders.some(o=>!o.joined&&o.service&&!g.orderJoinReason(o.id))));
      b.title=member?member.name+' · 查看职阶、修习与门内事务':'查看四门，选择自己的师承';
    }
    return {show,updateHUD};
  };
})(globalThis);
