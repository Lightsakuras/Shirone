(function(root){
  'use strict';
  const A=root.XiuxianArt,S=root.XiuxianStoryData;
  root.XiuxianStoryUI=function(ctx){
    const {game,openModal,closeModal,save,drain,esc}=ctx,$=id=>document.getElementById(id);
    const button=(id,label,primary=false)=>`<button id="${id}" class="${primary?'primary':'secondary'}">${label}</button>`;
    const act=fn=>{fn();save(true);drain();};
    function panel(title,text,cell,actions=''){
      openModal('story',`<p class="eyebrow">青阳五日 · 案卷</p><h2 id="modal-title">${title}</h2><div class="case-inspect">${cell==null?'':A.caseIcon(cell)}<p class="dialogue-text">${text}</p></div><div class="buttons">${actions}${button('case-close','收好案卷，继续')}</div><p id="inline-message" class="inline-message" role="status"></p>`);
      $('case-close').onclick=closeModal;
    }
    function brief(){
      const g=game();if(!g)return;
      const started=g.state.story.stage!=='unstarted';
      const backgroundText=g.backgroundStatus?.().id!=='rain'&&g.backgroundNarrative?.('commission');
      const introduction=backgroundText?`${esc(backgroundText)}<br>下山前须完成药庐委托、一门历练与筑基；后山旧阵可随心历练，并非下山硬门槛。`:started?'案卷与随身物都已整理，可以继续走访。':'药庐的历练只是起点。到三门历练研习功法，再到药庐蒲团运气突破。<br>二十三岁筑基功成，清微命你下山赴青阳查访孩童失踪一案。御剑三百里抵镇，先在迎客来歇宿一夜，次日晨起走访。<br>旧阵仍可随时回山历练，无须通关旧阵才能下山。';
      panel(started?'重返青阳':'青阳来信 · 待君筑基',introduction,12,g.state.flags.complete&&g.state.map==='garden'&&!g.state.run?button('case-begin',started?'前往青阳':'下山 · 开始走访',true):'<p>先完成药庐委托，再从药庐下山。</p>');
      if($('case-begin'))$('case-begin').onclick=()=>{if(g.beginStory())closeModal();act(()=>{});};
    }
    function liHome(){
      const g=game(),has=id=>g.hasEvidence(id);
      openModal('story',`<p class="eyebrow">李家 · 现场查验</p><h2 id="modal-title">没有被惊乱的屋子</h2><p class="modal-subtitle">点击物件留存观察。门闩须拨出卡槽，再核对木料上的磨痕。</p><div class="case-site">
        <button class="case-evidence" id="inspect-bed">${A.caseIcon(4)}<b>查床铺</b><small>${has('bed')?'已记录':'检查被褥和床沿'}</small></button>
        <div class="case-evidence">${A.caseIcon(5)}<b>门从哪边打开？</b><label for="latch-slider">向右拨动木闩 <output id="latch-value">0</output></label><input id="latch-slider" type="range" min="0" max="100" value="0"><button class="secondary" id="inspect-latch">核对磨痕${has('latch')?' · 已记录':''}</button></div>
        <button class="case-evidence" id="inspect-paper">${A.caseIcon(7)}<b>留存符样</b><small>${has('paper')?'已独立保管':'征得主人同意，收好一张'}</small></button></div>
        <p class="case-origin">${g.learned('sword')?'剑修经历：你熟悉木器受力，可以确定门闩不是被外力撬坏。':g.learned('scholar')?'符法经历：收下符样后，可与所学符式逐笔比对。':'药修经历：入内先问安，查完物件仍照原样放好。'}</p>
        <div class="buttons">${g.learned('scholar')&&has('paper')?button('compare-seal','逐笔比对符式'):''}${button('case-board','打开案卷')}${button('case-close','继续走访')}</div><p id="inline-message" class="inline-message" role="status"></p>`);
      $('latch-slider').oninput=e=>$('latch-value').value=e.target.value;
      for(const id of ['bed','paper','latch'])$('inspect-'+id).onclick=()=>{const ok=g.inspect(id,Number($('latch-slider').value));if(ok)liHome();act(()=>{});};
      if($('compare-seal'))$('compare-seal').onclick=()=>{g.inspect('falseSeal');liHome();act(()=>{});};
      $('case-board').onclick=board;$('case-close').onclick=closeModal;
    }
    function board(){
      const assist=root.XiuxianPuzzleAssist;
      const g=game();if(!g)return;if(g.state.story.stage==='unstarted'){brief();return;}
      const q=g.state.story;let selected=[];
      openModal('caseboard',`<p class="eyebrow">青阳案卷 · 亲见与传闻分开记</p><h2 id="modal-title">让线索彼此印证</h2><p class="modal-subtitle">选取两条证据，再选择它们足以支持的判断。试错不会消耗线索。</p><div class="case-board"><div class="case-evidence-grid">${q.evidence.map(id=>{const e=S.evidence[id];return `<button class="case-evidence" data-evidence="${id}" data-kind="${e.type}" aria-pressed="false">${A.caseIcon(e.cell)}<small>${e.type}</small><b>${e.name}</b><span>${e.text}</span></button>`;}).join('')||'<p>先去迎客来和三家走访，留下可信的材料。</p>'}</div><aside class="case-inference"><h3>已选材料</h3><p id="case-pair">尚未选择 · 最多两条</p><label for="case-inference">能得出什么判断？</label><select id="case-inference">${Object.entries(S.deductions).map(([id,d])=>`<option value="${id}">${d.name}</option>`).join('')}</select>${button('deduce','核对推论',true)}<p id="case-feedback" role="status"></p><h3>已经确认</h3>${q.deductions.map(id=>`<p class="case-confirmed">✓ ${S.deductions[id].text}</p>`).join('')||'<p>暂无。疑点还不等于真相。</p>'}<details class="case-tool-list"><summary>随身工具</summary><div class="case-tools">${q.tools.map(id=>`<span title="${S.tools[id].desc}">${A.caseIcon(S.tools[id].cell)}${S.tools[id].name}</span>`).join('')||'可去药铺、井边和木工处借取。'}</div></details></aside></div><div class="buttons">${g.readyForNight()&&q.stage!=='forest'?button('night-begin',g.nearby('nightLane')?'等到二更 · 进入后巷':'前往东侧「王宅后巷」再夜探',g.nearby('nightLane')):''}${button('case-close','收起案卷')}</div><p id="inline-message" class="inline-message"></p>`);
      function targets(){
        const next=Object.entries(S.deductions).find(([id,d])=>!q.deductions.includes(id)&&d.pair.every(e=>q.evidence.includes(e)));
        if(!next)return [];
        const [id,d]=next,marks=[];
        for(const [i,e] of d.pair.entries())if(!selected.includes(e))marks.push(['[data-evidence="'+e+'"]','选线索 '+(i+1)]);
        marks.push(['#case-inference','选此结论：'+d.name],['option[value="'+id+'"]',d.name]);
        if(d.pair.every(e=>selected.includes(e))&&$('case-inference').value===id)marks.push(['#deduce','核对推论']);
        return marks;
      }
      assist.mount('case',{anchor:document.querySelector('.case-board'),hint:'先找同一件事的两份见证，再判断它们能证明什么。',onGuide:()=>{selected=[];document.querySelectorAll('[data-evidence]').forEach(el=>el.setAttribute('aria-pressed','false'));$('case-pair').textContent='尚未选择 · 最多两条';$('case-feedback').textContent='';$('inline-message').textContent='';},targets});
      $('case-inference').onchange=()=>assist.refresh('case');
      document.querySelectorAll('[data-evidence]').forEach(b=>b.onclick=()=>{const id=b.dataset.evidence;$('case-feedback').textContent='';$('inline-message').textContent='';if(selected.includes(id))selected=selected.filter(x=>x!==id);else if(selected.length<2)selected.push(id);else{selected.shift();selected.push(id);}document.querySelectorAll('[data-evidence]').forEach(el=>el.setAttribute('aria-pressed',String(selected.includes(el.dataset.evidence))));$('case-pair').textContent=selected.map(id=>S.evidence[id].name).join(' ＋ ')||'尚未选择 · 最多两条';assist.refresh('case');});
      $('deduce').onclick=()=>{if(selected.length!==2){$('case-feedback').textContent='请先选中两条材料。';return;}const ok=g.deduce(selected,$('case-inference').value);assist.record('case',ok);if(ok)board();else $('case-feedback').textContent='这组材料尚不足以支持这个判断，试着换一条线索。';act(()=>{});};
      if($('night-begin')){$('night-begin').disabled=!g.nearby('nightLane');$('night-begin').onclick=()=>{if(g.beginNight()){closeModal();act(()=>{});}};}
      $('case-close').onclick=closeModal;
    }
    function lock(){
      const g=game(),q=g.state.story;
      panel('隔着一扇木门','院中寂静无人。柴棚外门的木闩有些松动，既可用竹楔慢慢挑开，也可凝起灵力隔门拨闩。<br>将竹楔停在 70–85 区间即可避开卡槽；剑修熟知木理受力，药修可用布巾裹楔消音，符修则可省力运灵拨闩。',15,`${q.tools.includes('wedge')?'<label class="lock-slider" for="gate-slider">竹楔推进 <output id="gate-value">0</output><input id="gate-slider" type="range" min="0" max="100" value="0"></label>'+button('gate-wedge','用竹楔挑闩',true):'<p>没有竹楔，可回镇借取。</p>'}${button('gate-spell','灵力拨闩 · '+(g.learned('scholar')?'6':'12')+' 灵力')}`);
      const finish=method=>{if(g.openGate(method,Number($('gate-slider')?.value||0)))closeModal();act(()=>{});};
      if($('gate-slider'))$('gate-slider').oninput=e=>$('gate-value').value=e.target.value;
      if($('gate-wedge'))$('gate-wedge').onclick=()=>finish('wedge');$('gate-spell').onclick=()=>finish('spell');
    }
    function show(which){
      const g=game();
      if(which==='brief'){brief();return;}if(which==='board'){board();return;}if(which==='liHome'){liHome();return;}if(which==='lock'){lock();return;}
      const content={
        innkeeper:['迎客来 · 王掌柜','短短三个月，镇上接连不见了三个孩子。街坊都传是北边汉墓林的狐妖作祟，可王掌柜自己连狐影也没撞见过。<br>“丢孩子的是李家、张家，还有巷尾张阿婆……仙长若真要查实情，总得去听苦主亲口说。”',0],
        zhangHome:['窗下的一撮白毛','张家已在收拾细软准备逃荒。你在窗台下寻获几根银白兽毛，也问出他们家出事前同样买过王屠户的镇妖符。<br>确有白毛之物来过窗下，但几根毛发说不清它是来害人还是救人。',6],
        granny:['张阿婆与一只童鞋','张阿婆死死攥着孙儿留下的一只小鞋，抖着嗓子断断续续说起买符与丢人的日子。你只把鞋样摹入册中，不忍取走原物。<br>若随身带了干净布巾与温水，不妨先替老人擦汗润嗓，待她心神稍定再细问。'+(g.learned('medicine')?'<br>药修经历：你放缓语速，顺着老人的气息慢慢引导，不逼她反复回想最惊惧的一刻。':''),8],
        clinic:['药铺 · 青黛','药铺伙计青黛递来一方干净布巾：“苦主家里刚遭了事，进门先递口温水，莫一上来就紧着追问。”<br>你将布巾折妥收好。夜里若要动用木工器具，用它裹住竹楔也能免去磕碰声响。'+(g.state.gender==='female'?'<br>她又顺口叮嘱了一句：出门久行，换洗布物要备足、勤洗晒。你道谢记下，将日常行具与符药分袋收好。':''),9],
        townWell:['井边备水','井边茶棚借了你一壶温水，分文不取，只说办完事把铜壶送还即可。',16],
        toolbox:['借一卷木工工具','木匠听闻你要查验门闩磨痕，爽快借出两枚竹楔与一卷器具。<br>凡人器具虽无灵光，只要手稳心细，往往比硬使灵力更不留痕迹。',11],
        soil:['新土里的寒意','柴棚墙根的浮土刚翻动不久，指腹刚一触及，便有一丝阴冷邪气顺着指尖往上窜。<br>你当即收手，未曾打草惊蛇。先在柴棚边梁刻下一道浅痕，留待日后带人复查。',14],
        trail:['巷外的一声啼哭','刚退至后巷口，夜风里忽传一声幼童啼哭。只见一道银白狐影口衔微动的襁褓，朝北面汉墓林疾掠而去。<br>夜色下尚未看清襁褓情形，你按住剑柄，没有单凭镇上传言贸然出剑。<br>夜探所得皆已入卷。先回山与沈灵薇灯下复盘、备齐丹药，再循北去足迹追入汉墓林。',3]
      }[which];
      if(!content)return;
      const canComfort=which==='granny'&&['linen','water'].every(id=>g.state.story.tools.includes(id));
      panel(...content,canComfort?button('offer-care',g.hasEvidence('comfort')?'再次安慰阿婆':'递温水与布巾',true):'');
      if($('offer-care'))$('offer-care').onclick=()=>{g.comfort();panel('把话慢慢说完',S.evidence.comfort.text,9);act(()=>{});};
    }
    function updateHUD(){
      const g=game();if(!g)return;const q=g.state.story,night=g.state.map==='wangyard';
      $('case-open').textContent=q.stage==='unstarted'?'主线 · 青阳来信':'案卷 · '+q.evidence.length+' 条';
      $('realm-label').textContent=q.stage==='unstarted'?'二十岁 · 炼气初期':'二十三岁 · 筑基初期';
      $('noise-meter').hidden=!night;
      if(night){$('noise-fill').style.width=q.noise+'%';$('noise-text').textContent=(g.sneaking?'轻步':'院中动静')+' '+Math.floor(q.noise)+'/100';}
      if(g.inCase()){
        const steps=[['走访三家',q.visits.length===3],['查验床铺、门闩与符样',['bed','latch','paper'].every(id=>g.hasEvidence(id))],['联结两组关键证据',g.readyForNight()],['夜探留记，循迹北去',q.stage==='forest']];
        $('quest-steps').innerHTML=steps.map(([label,done],i)=>`<li class="${done?'done':''}"><span>${done?'✓':i+1}</span>${label}</li>`).join('');
      }
    }
    return {show,board,brief,updateHUD};
  };
})(globalThis);
