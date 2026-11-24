(function (root) {
  'use strict';
  // One route per destination, including the first tab of each hall.
  const halls = {
    'hub-armory': ['器藏', [['armory','装备换装','armory-open'],['gear','法宝藏阁','relic-open'],['loadouts','配装方案','loadouts-open']]],
    'hub-cultivation': ['修行', [['cultivate','境界与功法','cultivation-open'],['chapter','首章行程','chapter-open'],['background','身世与立场','background-open'],['homestead','药庐洞府','home-open']]],
    'hub-bag': ['乾坤', [['bag','随身行囊','bag-rail-open'],['craft','丹符炼制'],['provisions','行前备物'],['research','器物试录','research-open']]],
    'hub-jianghu': ['江湖', [['storyline','命运剧情线','storyline-open'],['story','青阳案卷','case-open'],['campaign','远行案簿','campaign-open'],['sects','宗门与两脉','sects-open']]],
    'hub-trial': ['历练', [['worldAtlas','山河舆图','world-map-open'],['abyss','万象天渊','abyss-open'],['rogue','九霄无尽劫','rogue-open'],['bounty','悬赏妖榜','bounty-open'],['expedition','旧阵寻宝','journey-open']]],
    'hub-codex': ['典籍', [['almanac','山行闻见录','almanac-top'],['catalog','器物图鉴','catalog-top'],['notes','图谱与札记','notes-open'],['settings','玩家设置与改键','settings-top']]]
  };
  const owner = new Map();
  for (const [hub,[,tabs]] of Object.entries(halls)) for (const [tab] of tabs) owner.set(tab,hub);
  const stage = new Set(['abyss-battle','bounty-battle','rogue-battle']);
  const aliases = {caseboard:'story',sectWorld:'sects','player-settings':'settings'};
  const titleTabs = new Set(['almanac','catalog','settings','rogue']);
  function create({open, game, mode, stone}) {
    const $ = id => document.getElementById(id);
    const modal = $('modal'), header = $('hub-header'), bar = $('hub-tabs');
    const menu = [...document.querySelectorAll('.mmo-menu [data-hub]')];
    function allowed(tab) {
      if (!game()) return titleTabs.has(tab);
      const entry = halls[owner.get(tab)][1].find(([id])=>id===tab)[2];
      return !entry || !$(entry).hidden && !$(entry).disabled;
    }
    function openHubTab(hub, tab = halls[hub]?.[1][0][0]) {
      if (!hub || owner.get(tab)!==hub || stage.has(mode()) || mode()==='defeat' || !allowed(tab)) return;
      open[tab]();
    }
    for (const [hub,[,tabs]] of Object.entries(halls)) {
      for (const [tab,,id] of tabs) {
        if (id) $(id).onclick = e => { e.preventDefault(); openHubTab(hub,tab); };
      }
    }
    for (const button of menu) button.onclick = () => openHubTab(button.dataset.hub);
    bar.onclick = e => {
      const b=e.target.closest('[data-hub-tab]');
      if (b) openHubTab(modal.dataset.hub,b.dataset.hubTab);
    };
    function mount(kind) {
      const content=$('modal-content');
      const cinema=kind==='dialogue' || kind==='reunion' ||
        ['chapter','story','campaign'].includes(kind) && content.querySelector('.chapter-dialogue,.dialogue-layout');
      const cultivation=['chapter','campaign'].includes(kind) && content.querySelector('.cultivation-view');
      const tab=cultivation?'cultivate':aliases[kind]||kind, hub=owner.get(tab);
      const shell=cinema?'dialogue':stage.has(kind)?'stage':hub?'hub':'compact';
      modal.dataset.shell=shell;
      modal.classList.toggle('mmo-hub',shell==='hub');
      header.hidden=shell!=='hub';
      if (shell==='hub') {
        if (modal.dataset.hub!==hub) {
          $('hub-title').textContent=halls[hub][0];
          bar.replaceChildren(...halls[hub][1].map(([id,label])=>{
            const b=document.createElement('button');
            b.dataset.hubTab=id; b.textContent=label;
            return b;
          }));
        }
        modal.dataset.hub=hub;
        for (const b of bar.children) {
          b.setAttribute('aria-pressed',String(b.dataset.hubTab===tab));
          b.disabled=!allowed(b.dataset.hubTab);
        }
        const wallet = $('hub-wallet'), gearWallet = content.querySelector('.gear-wallet');
        wallet.textContent = game() ? '灵蕴 '+game().state.collection.spirit : '';
        if (gearWallet) wallet.append(gearWallet);
        else if (game()) wallet.append('　灵锻石 '+stone());
        if (tab==='background') {
          const intro=content.querySelector('.reader-intro');
          const figure=intro?.querySelector(':scope > details > .background-scene');
          if (figure) {
            const box=figure.parentElement;
            const head=intro.querySelector('.background-panel-head');
            if (head) head.before(figure); else intro.prepend(figure);
            if (!box.querySelector(':scope > :not(summary)')) box.remove();
          }
        }
      } else delete modal.dataset.hub;
      if (cinema) {
        const layout=content.querySelector('.chapter-dialogue,.dialogue-layout,.dialogue-simple');
        const scene=document.createElement('div');
        scene.className='cinema-dialogue';
        const copy=document.createElement('div');
        copy.className='cinema-copy';
        const figure=layout?.querySelector('.portrait-folio');
        if (figure) { scene.append(figure); scene.classList.add('has-portrait'); }
        const options=content.querySelector('.reading-options,.buttons');
        options?.remove();
        if (layout) layout.replaceWith(...layout.childNodes);
        const text=document.createElement('div');
        text.className='cinema-lines';
        text.append(...content.childNodes);
        const title=text.querySelector('#modal-title');
        if (title) {
          const seal=figure?.querySelector('.portrait-seal')?.textContent?.trim();
          if (seal) title.dataset.seal=seal;
          copy.append(title);
        }
        copy.append(text);
        if (options) copy.append(options);
        scene.append(copy);content.append(scene);
      }
      $('modal-close').textContent=shell==='hub'?'Esc 关闭':'×';
    }
    function badges() {
      for (const button of menu) {
        const tabs=halls[button.dataset.hub][1];
        let any=false;
        for (const [id,,entry] of tabs) {
          const el=entry && $(entry);
          const ready=!!el && (el.classList.contains('has-badge') || el.classList.contains('available') || el.dataset.ready==='true');
          if (modal.dataset.hub===button.dataset.hub) bar.querySelector('[data-hub-tab="'+id+'"]')?.classList.toggle('mmo-ready',ready);
          any ||= ready;
        }
        button.classList.toggle('mmo-ready',any);
      }
    }
    // Reserve the tracked character's head and nameplate when the scroll sits over them.
    function positionQuest(goal) {
      const card=$('quest-scroll'), tools=$('field-tools');
      let shift=0;
      if (Number.isFinite(goal?.x) && Number.isFinite(goal?.y)) {
        const world=$('world').getBoundingClientRect(), row=tools.getBoundingClientRect();
        const scale=world.height/760;
        const x=world.left+goal.x*scale, feet=world.top+goal.y*scale;
        const head=feet-(goal.height||48)*scale;
        if (x>=row.right-card.offsetWidth-25 && x<=row.right+25 &&
            head<row.bottom+card.offsetHeight+8 && feet+24>row.bottom) {
          // Park the tracker beside the figure, leaving the route below its feet exposed.
          shift=Math.max(0,Math.min(row.right-card.offsetWidth-12,row.right-x+65*scale));
        }
      }
      const value=shift?'translateX(-'+Math.ceil(shift)+'px)':'';
      if (card.style.transform!==value) card.style.transform=value;
    }
    function guideTarget(goal) {
      if (!goal?.ui) return goal;
      const target=$(goal.ui);
      if (target && target.getClientRects().length) return goal;
      for (const [hub,[,tabs]] of Object.entries(halls)) {
        const tab=tabs.find(([, ,entry])=>entry===goal.ui);
        if (!tab) continue;
        const visible=modal.dataset.hub===hub?bar.querySelector('[data-hub-tab="'+tab[0]+'"]'):menu.find(b=>b.dataset.hub===hub);
        return {...goal,selector:visible?.id?'#'+visible.id:'[data-hub-tab="'+tab[0]+'"]'};
      }
      return goal;
    }
    return {mount,badges,openHubTab,guideTarget,positionQuest};
  }
  root.XiuxianHubShell={create};
})(window);
