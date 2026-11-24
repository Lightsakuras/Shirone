(function(root){
  'use strict';
  // UI-only projections: never write Game state, saves, task rewards or exploration.
  function create({document:doc}){
    const $=id=>doc.getElementById(id),guide=$('guide'),title=guide.querySelector('.guide-title');
    const seals={'storyline-open':'命','background-open':'身','sects-open':'门','chapter-open':'程','cultivation-open':'修','bag-rail-open':'囊','world-map-open':'图','case-open':'案','journey-open':'阵','relic-open':'器','notes-open':'录','campaign-open':'卷'};
    for(const [id,seal] of Object.entries(seals)){if($(id))$(id).dataset.seal=seal;}
    const labels={'storyline-open':'剧情线','cultivation-open':'修行','sects-open':'宗门','bag-rail-open':'行囊','relic-open':'法宝','world-map-open':'舆图','case-open':'案卷','journey-open':'秘境','notes-open':'札记','background-open':'身世'};
    // Secondary entries retain their original IDs and availability data.
    const modes={storyline:'storyline-open',armory:'rail-armory',bounty:'bounty-open',homestead:'home-open',background:'background-open',sects:'sects-open',sectWorld:'sects-open',chapter:'chapter-open',campaign:'campaign-open',worldAtlas:'world-map-open',story:'case-open',caseboard:'case-open',bag:'bag-rail-open',gear:'relic-open',notes:'notes-open',expedition:'journey-open'};
    let previousGame=null,previous=null,availableEntries=0;
    const entries=Object.keys(labels);
    const pulse=(id)=>{
      const el=$(id);if(!el)return;
      el.classList.remove('vfx-receipt');void el.offsetWidth;el.classList.add('vfx-receipt');
      el.addEventListener('animationend',()=>el.classList.remove('vfx-receipt'),{once:true});
    };
    const text=(id,value)=>{const node=$(id),next=String(value);if(node&&node.textContent!==next)node.textContent=next;};
    const hidden=()=>doc.documentElement.classList.toggle('page-hidden',doc.hidden);
    doc.addEventListener('visibilitychange',hidden);hidden();
    function update(game,goal,mode,options={}){
      if(!game)return;
      const s=game.state,values={spirit:s.collection.spirit,insight:game.insight(),hp:s.hp,mp:s.mp};
      for(const id of ['spirit','insight']){const value=values[id];
        const node=$('hud-'+id);text('hud-'+id,value);
        if(previousGame===game&&previous&&value>previous[id]&&!options.reducedMotion&&!doc.hidden){node.classList.add('ink-gained');node.onanimationend=()=>node.classList.remove('ink-gained');}
        else if(options.reducedMotion||doc.hidden)node.classList.remove('ink-gained');
      }
      for(const id of ['hp','mp']){
        const meter=$(id+'-bar').parentElement,trail=$(id+'-trail');
        if(trail){
          const drop=previousGame===game&&previous&&values[id]<previous[id]&&!options.reducedMotion&&!doc.hidden;
          trail.classList.toggle('trail-instant',!drop);
          trail.style.width=Math.max(0,Math.min(100,values[id]))+'%';
        }
        // A real restoration gets one brief edge; normal sub-point MP regeneration does not strobe.
        if(previousGame===game&&previous&&values[id]-previous[id]>=1&&!options.reducedMotion&&!doc.hidden){meter.classList.add('ink-restored');meter.onanimationend=()=>meter.classList.remove('ink-restored');}
        else if(previousGame!==game||options.reducedMotion||doc.hidden||previous&&values[id]<previous[id])meter.classList.remove('ink-restored');
      }
      values.claims=Object.values(s.campaign?.tasks||{}).reduce((sum,t)=>sum+Number(t.claimed===true),Number(s.flags.complete));
      values.deductions=s.story.deductions.length;
      values.journey=s.flags.complete;values.adult=!game.isChild();
      if(previousGame===game && previous && !options.reducedMotion && !doc.hidden && !root.matchMedia('(prefers-reduced-motion: reduce)').matches){
        if(values.claims>previous.claims)pulse('guide');
        if(values.deductions>previous.deductions)pulse('case-open');
        if(values.journey&&!previous.journey)pulse('journey-open');
        if(values.adult&&!previous.adult)pulse('cultivation-open');
      }
      let available=0;
      for(let i=0;i<entries.length;i++){
        const entry=$(entries[i]),bit=1<<i;
        if(!entry.disabled&&!entry.hidden){
          available|=bit;
          if(previousGame===game && !(availableEntries&bit) && !options.reducedMotion && !doc.hidden)pulse(entry.id);
        }
      }
      availableEntries=available;previousGame=game;previous=values;
      const active=mode&&doc.querySelector('.cultivation-view')?'cultivation-open':modes[mode];
      for(const id of [...Object.keys(seals),'rail-armory','bounty-open','home-open']){const node=$(id);if(node)node.classList.toggle('is-current',id===active);}
      const tracked=root.XiuxianGuide.trackedTask(game),danger=s.hp>0&&s.hp<=35;
      guide.dataset.state=danger?'danger':goal?.deliverable?'ready':tracked?'tracked':'normal';
      const nextTitle=danger?'气血告急':goal?.deliverable?'可以交付':tracked?'追踪 · '+(goal?.taskTitle||root.XiuxianGuide.taskNotice(game,tracked)?.title||'当前事务'):goal?.manual?'追踪 · 当前目标':'此刻目标';
      if(title.textContent!==nextTitle)title.textContent=nextTitle;
      $('guide-cancel').hidden=!tracked&&!goal?.manual;
      $('guide-cancel').onclick=()=>{root.XiuxianGuide.trackTask(game,null);};
      $('play').classList.toggle('ink-danger',danger);
    }
    function mountReader(kind) {
      const modal=$('modal'), content=$('modal-content');
      const choices=content.querySelector('.background-actions:has(button),.campaign-actions:has(button)');
      const passage=content.querySelector('.dialogue-text,.campaign-confirm,.case-inspect');
      const reading=!!choices || !!passage && ['chapter','story','dialogue','reunion','background','campaign'].includes(kind);
      modal.classList.toggle('ink-reader',reading);
      if(!reading)return;
      const body=content.querySelector('.background-event>p,.dialogue-text,.campaign-confirm>p:not(.campaign-kicker),.campaign-copy') || $('modal-title');
      body.tabIndex=0;
      const portrait=content.querySelector('.chapter-dialogue>img,.dialogue-layout>img');
      if(portrait){
        const roles={qing_wei:['清微','蜀山掌门','掌'],shen_ling_wei:['沈灵薇','药庐师姐','药'],xuan_heng:['玄衡','灰袍道人','道'],ning_shuang:['凝霜','白衣女子','霜']};
        const [name,role,seal]=roles[portrait.src.split('/').pop().split('.')[0]]||[portrait.alt,'山中故人','人'];
        const layout=portrait.parentNode,copy=portrait.nextElementSibling;
        const figure=doc.createElement('figure'),caption=doc.createElement('figcaption');
        figure.className='portrait-folio';
        const titleHasName=$('modal-title')?.textContent.includes(name);
        caption.innerHTML=`<span class="portrait-seal" aria-hidden="true">${seal}</span><span class="portrait-meta">${titleHasName?`<em>${role}</em>`:`<strong>${name}</strong><em>${role}</em>`}</span>`;
        portrait.before(figure);figure.append(portrait,caption);portrait.alt=name;
        if(layout.classList.contains('chapter-dialogue')){
          const heading=$('modal-title'),kicker=heading.previousElementSibling;
          copy.prepend(kicker,heading);if(layout.nextElementSibling)copy.append(layout.nextElementSibling);
        }
      }
      const options=choices || content.querySelector('.buttons');
      if(options) {
        options.classList.add('reading-options');
        const buttons=[...options.querySelectorAll('button:not([data-term-help])')];
        buttons.forEach((b,i)=>{b.dataset.readChoice=i+1;});
        if(buttons.length>1 && (choices || !['dialogue','reunion'].includes(kind) && !portrait)){
          if(choices){
            const anyEnabled=buttons.some(b=>!b.disabled);
            const hint=doc.createElement('p');hint.className='choice-index';hint.textContent=anyEnabled?'共 '+buttons.length+' 项 · 点击选项直接选定（支持数字键）':'共 '+buttons.length+' 项 · 暂未满足条件';options.before(hint);
          }
          const commit=doc.createElement('button');
          commit.id='reader-confirm';commit.className='secondary';commit.textContent='确认所选';commit.disabled=true;
          options.after(commit);
          commit.onclick=()=>options.querySelector('[aria-current="true"]')?.click();
          const mark=button=>{
            for(const other of buttons)other.removeAttribute('aria-current');
            button.setAttribute('aria-current','true');commit.disabled=button.disabled;
          };
          for(const button of buttons){
            button.addEventListener('focus',()=>mark(button));
            button.addEventListener('mouseenter',()=>{if(!button.disabled)mark(button);});
          }
        }
      }
      for(const paragraph of content.querySelectorAll('.dialogue-text,.background-event>p,.campaign-copy')){
        // Keep links, terms and punctuation intact while breaking the original hard lines.
        const fragment=doc.createDocumentFragment();let line=doc.createElement('span'),lineIdx=0;
        const finish=()=>{if(line.hasChildNodes()){line.className='reader-line';line.style.setProperty('--line-idx',String(Math.min(lineIdx++,4)));fragment.append(line);}line=doc.createElement('span');};
        for(const node of [...paragraph.childNodes]){
          if(node.nodeName==='BR'){finish();continue;}
          if(node.nodeType===3){node.textContent.split('\n').forEach((part,i)=>{if(i)finish();if(part)line.append(part);});}
          else line.append(node);
        }
        finish();paragraph.replaceChildren(fragment);
        if(paragraph.children.length>6){
          paragraph.classList.add('reader-history');
          const toggle=doc.createElement('button');toggle.className='reader-full';toggle.textContent='全文';toggle.setAttribute('aria-expanded','false');
          toggle.onclick=()=>{const full=paragraph.classList.toggle('expanded');toggle.textContent=full?'收起全文':'全文';toggle.setAttribute('aria-expanded',String(full));};
          paragraph.before(toggle);
        }
      }
      modal.classList.remove('prose-revealed');
      const revealNow=()=>modal.classList.add('prose-revealed');
      content.onpointerdown=revealNow;
      content.onkeydown=e=>{if(e.code==='Space'||e.key==='Enter')revealNow();};
      root.XiuxianProseHighlight?.decorate(content);
      if(kind==='background' && choices){
        const context=doc.createElement('details'),label=doc.createElement('summary');label.textContent='来处与凭物';context.append(label);
        const event=choices.closest('.background-event');
        event.before(context);
        for(const node of [...content.children])if(node.matches('.background-scene,.background-note,.background-record:not(#background-token)'))context.append(node);
      }
      if(choices){
        // Keep the actual action nodes and their native handlers; only their scrolling parents change.
        const intro=doc.createElement('div'),footer=doc.createElement('div');
        intro.className='reader-intro';footer.className='reader-footer';
        const confirm=$('reader-confirm'),hint=content.querySelector('.choice-index');
        const back=content.querySelector('.campaign-footer')||content.querySelector(':scope > .buttons');
        if(confirm)footer.append(confirm);
        if(back)footer.append(back);
        const message=content.querySelector('#inline-message');if(message)footer.append(message);
        choices.remove();hint?.remove();
        intro.append(...content.childNodes);
        if(kind==='background'){
          const head=intro.querySelector('.background-panel-head'),token=intro.querySelector('#background-token');
          const title=intro.querySelector('#modal-title');
          if(head)title?.after(head);if(token)head?.after(token);
        }
        content.classList.add('reader-layout');
        content.append(intro);
        if(hint){
          if(choices.querySelectorAll('button:not([data-term-help])').length>2)hint.textContent+=' · 向下滚动查看更多';
          content.append(hint);
        }
        content.append(choices,footer);
      }
    }
    function settings({save,exportFile,importFile}) {
      const grid=doc.querySelector('.settings-grid');
      if(!grid || grid.classList.contains('settings-groups')) return;
      const group=(title,nodes)=>{
        const section=doc.createElement('section'),heading=doc.createElement('h3');heading.textContent=title;section.append(heading);
        for(const node of nodes) if(node)section.append(node);
        grid.append(section);return section;
      };
      const label=id=>$(id)?.closest('label');
      grid.classList.add('settings-groups');
      const display=group('画面 / 玩法',[$('settings-mode'),...['guide','foreground','reducedMotion','shake','hitPause'].map(id=>label('option-'+id))]);
      const control=doc.createElement('label');control.className='setting-toggle';control.innerHTML='<span>常显底部操作提示</span><input type="checkbox" id="option-control-line">';
      display.append(control);
      const check=$('option-control-line');check.checked=$('play').classList.contains('show-controls');
      check.onchange=()=>{ $('play').classList.toggle('show-controls',check.checked);try{localStorage.setItem('xiuxian-control-line',String(check.checked));}catch{} };
      group('声音',[label('option-enabled'),...['master','music','ambience','effects'].map(k=>label('option-'+k)),$('sound-preview'),doc.querySelector('#modal .music-control')]);
      group('操作与改键',[$('settings-controls'),$('settings-avatar')]);
      const files=group('存档',[]);
      const add=(name,run)=>{const b=doc.createElement('button');b.textContent=name;b.onclick=run;files.append(b);};
      if(root.xiuxian.game){add('保存进度',()=>save());add('导出存档',exportFile);}
      add('导入存档',importFile);
    }
    return {update,mountReader,settings};
  }
  root.XiuxianInkUI={create};
})(globalThis);
