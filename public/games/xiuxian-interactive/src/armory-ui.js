(function(root){
  'use strict';
  const D=root.XiuxianArmoryData,A=root.XiuxianArmory,$=id=>document.getElementById(id);
  const icon=(id,grade)=>root.XiuxianItemIcons.draw(id,grade);
  const positions=['head','cloak','robe','weapon','boots','ring','pouch','amulet'];
  const percent=k=>['crit','skill','haste'].includes(k)?'%':k==='pickup'?' px':'';
  const delta=n=>n===0?'<span class="gear-delta">持平</span>':`<span class="gear-delta ${n<0?'down':'up'}">${n<0?'▼':'▲'} ${Math.abs(n)}</span>`;
  const currencySvg={
    stone:`<svg class="wallet-ico" width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><polygon points="9,1 16,6 13,16 5,16 2,6" fill="#5da6b8" stroke="#c9f3ff" stroke-width="1.2"/><polygon points="9,1 13,16 9,12 5,16" fill="#2c6478" opacity=".55"/><path d="M6 6l3-3 3 3-3 4z" fill="#e4fbff" opacity=".8"/>${root.XiuxianItemIcons.paintedLayer('stone','#b09c77',18)}</svg>`,
    essence:`<svg class="wallet-ico" width="16" height="16" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7" fill="#3da683" stroke="#bdf5de" stroke-width="1.2"/><circle cx="7" cy="6.8" r="2.2" fill="#eafff6" opacity=".8"/><path d="M5 11.5c2 2 6 2 8 0" stroke="#184a3c" stroke-width="1.3" fill="none"/>${root.XiuxianItemIcons.paintedLayer('essence','#b09c77',18)}</svg>`,
    crystal:`<svg class="wallet-ico" width="32" height="32" viewBox="0 0 18 18" aria-hidden="true"><polygon points="9,1 15,9 9,17 3,9" fill="#9a6ce0" stroke="#ebd9ff" stroke-width="1.2"/><polygon points="9,3.5 12.5,9 9,14.5 5.5,9" fill="#e6ccff" opacity=".55"/><circle cx="9" cy="9" r="1.8" fill="#fff7d6"/>${root.XiuxianItemIcons.paintedLayer('crystal','#bb93e3',18)}</svg>`,
    jade:`<svg class="wallet-ico" width="32" height="32" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="7" fill="#e5b34c" stroke="#fff0b8" stroke-width="1.3"/><circle cx="9" cy="9" r="3.2" fill="#24313c" stroke="#ffe599" stroke-width="1.1"/>${root.XiuxianItemIcons.paintedLayer('jade','#ddb566',18)}</svg>`
  };
  function create({store,game,openModal,options,dirty,sound}){
    let tab='gear',filter='all',sort='power',id=null,threshold=2,slot='weapon',preview=null,note='',attackTime=-10,demo=null,last=0,fxTag='',lastForge=null;
    let craftPage='fuse',preset=0;
    let fuseIds=[],fuseSlot='',forgeRecipe='',extractSource='',extractIndex=0,imprintOrb='',imprintTarget='',imprintIndex=0,archiveSource='',soulIds=[],soulSchool='';
    const button=(act,label,disabled=false,extra='')=>`<button type="button" data-act="${act}" ${extra} ${disabled?'disabled':''}>${label}</button>`;
    const selected=()=>store.state.bag.find(i=>i.id===id);
    const cauldronSvg=`<svg class="cauldron-svg" width="84" height="84" viewBox="0 0 84 84" aria-hidden="true"><defs><radialGradient id="cfire" cy=".65" r=".55"><stop stop-color="#fff5c0"/><stop offset=".45" stop-color="#ff9938"/><stop offset="1" stop-color="#ff4820" stop-opacity="0"/></radialGradient><linearGradient id="cbronze" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b89862"/><stop offset=".45" stop-color="#5d4c37"/><stop offset="1" stop-color="#2c241c"/></linearGradient></defs><circle class="cauldron-aura" cx="42" cy="44" r="36" fill="url(#cfire)"/><g class="cauldron-flames"><path d="M27 36c-2-10 5-17 7-24 2 6 6 9 5 15 2-4 5-9 3-17 7 6 12 14 10 26z" fill="#ff9f43" opacity=".88"/><path d="M33 36c0-7 4-11 8-18 3 6 8 10 7 18z" fill="#fff0b3"/></g><path d="M20 40c-6 0-8-8-2-10 3-1 6 1 6 4M64 40c6 0 8-8 2-10-3-1-6 1-6 4" fill="none" stroke="#d9b778" stroke-width="2.6" stroke-linecap="round"/><path d="M25 61l-4 13h6l3-11M59 61l4 13h-6l-3-11M40 63v12h4V63" fill="#4f402e" stroke="#b9965b" stroke-width="1.2"/><path d="M21 36h42l-3 18c-2 9-10 13-18 13s-16-4-18-13z" fill="url(#cbronze)" stroke="#e4c382" stroke-width="1.8"/><ellipse cx="42" cy="36" rx="22" ry="5.5" fill="#2d201a" stroke="#f0d08f" stroke-width="1.6"/><ellipse class="cauldron-mouth" cx="42" cy="36" rx="16" ry="3.2" fill="#ffb84d"/><path d="M31 46h22M34 52h16M42 43v14" stroke="#f3d28e" stroke-width="1.3" stroke-linecap="round" opacity=".85"/><circle cx="42" cy="49" r="4" fill="#ffda82" stroke="#362418" stroke-width="1.2"/>${root.XiuxianItemIcons.paintedLayer('cauldron','#bb945b',84)}</svg>`;
    const orbSvg=(legend)=>legend
      ?`<svg class="orb-gem is-legend" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><defs><radialGradient id="ogL" cx=".38" cy=".32" r=".68"><stop stop-color="#fff9d6"/><stop offset=".42" stop-color="#ffbe4f"/><stop offset=".85" stop-color="#8f2d28"/><stop offset="1" stop-color="#3a1218"/></radialGradient></defs><circle cx="14" cy="14" r="11" fill="url(#ogL)" stroke="#ffe08f" stroke-width="1.4"/><circle cx="14" cy="14" r="13" fill="none" stroke="#ffbe6b" stroke-opacity=".55" stroke-dasharray="3 2"/><path d="M14 6l2.2 5.4L22 14l-5.8 2.6L14 22l-2.2-5.4L6 14l5.8-2.6z" fill="#fff6d0" opacity=".82"/>${root.XiuxianItemIcons.paintedLayer('orb','#ffcb74',28)}</svg>`
      :`<svg class="orb-gem" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><defs><radialGradient id="ogN" cx=".36" cy=".32" r=".68"><stop stop-color="#ebfff8"/><stop offset=".45" stop-color="#69d2b8"/><stop offset=".88" stop-color="#1f5c54"/><stop offset="1" stop-color="#11302e"/></radialGradient></defs><circle cx="14" cy="14" r="11" fill="url(#ogN)" stroke="#b4f2dc" stroke-width="1.3"/><ellipse cx="10.5" cy="10" rx="3.2" ry="2" transform="rotate(-28 10.5 10)" fill="#ffffff" opacity=".72"/>${root.XiuxianItemIcons.paintedLayer('orb','#95d7bd',28)}</svg>`;
    const soulStageSvg=(stageIdx)=>{
      const pal=[['#9db0b5','#536368','#d4e0e2'],['#79e4bc','#266d5c','#e6fff4'],['#c69eff','#54358d','#f7ecff'],['#ffe084','#8a46a8','#fff9d6']][stageIdx];
      return `<svg class="soul-blade-svg" width="38" height="38" viewBox="0 0 38 38" aria-hidden="true"><circle cx="19" cy="19" r="16" fill="#18232a" stroke="${pal[0]}" stroke-width="1.2" stroke-opacity=".75"/>${stageIdx===3?'<circle cx="19" cy="19" r="13" fill="none" stroke="#d4a6ff" stroke-dasharray="3 2" stroke-width="1"/>':''}<path d="M9 29l4-8 14-14 4-1-1 4-14 14z" fill="${pal[0]}" stroke="${pal[1]}" stroke-width="1.2"/><path d="M14 24l13-13" stroke="${pal[2]}" stroke-width="1.4" stroke-linecap="round"/><path d="M9 22l7 7M7 31l4-4" stroke="#e5c176" stroke-width="1.8" stroke-linecap="round"/>${stageIdx>=2?'<path d="M26 7l1.5 3.5L31 12l-3.5 1.5L26 17l-1.5-3.5L21 12l3.5-1.5z" fill="#fff3bd"/>':''}</svg>`;
    };
    function itemXp(i){return 8*(i.grade+1)**2+i.level*3;}
    function itemCardBtn(i,attr,picked,extraMeta='',dim=false){
      const b=D.bases[i.base],g=D.grades[i.grade],worn=Object.values(store.state.equipped).includes(i.id);
      const badge=D.legendary.curses[i.base]?'<i class="craft-tag is-curse">魔</i>':i.legendary?'<i class="craft-tag is-legend">魂</i>':'';
      return `<button type="button" class="craft-item-card ${picked?'is-picked':''} ${dim?'is-dim':''}" data-${attr}="${i.id}" data-grade="${i.grade}" aria-pressed="${!!picked}" style="--grade:${g.color}">
        <span class="craft-card-ico">${icon(i.base,i.grade)}${badge}</span>
        <span class="craft-card-body"><strong>${b.name}<em>+${i.level}</em></strong><small>${g.name} · 战力 ${A.power(i)}${worn?' · 已穿':''}${extraMeta?' · '+extraMeta:''}</small></span>
      </button>`;
    }
    function card(i){
      if(!i)return '<h3>此槽尚空</h3><p>入万象天渊拾取灵匣，即可穿戴。</p>';
      const b=D.bases[i.base],g=D.grades[i.grade],s=store.state,worn=store.summary().worn[b.slot],mine=worn?.id===i.id,values=A.stats(i),baseline=A.stats(worn);
      const eff=D.legendary.effects[i.legendary],curse=D.legendary.curses[i.base];
      return `${icon(i.base,i.grade)}<small>${D.slots[b.slot]}　·　${g.name}${i.masterwork?' · 炉火大成':''}</small><h3>${i.base===A.Craft.soulId?b.name+' · '+A.Craft.stages[s.soul.stage-1].name:b.name} <em>+${i.level}</em></h3>
        <div class="gear-score">战力 <strong>${A.power(i)}</strong> ${delta(A.power(i)-A.power(worn))}</div>
        ${b.school?`<p>${D.weapons[i.base===A.Craft.soulId?s.soul.school:b.school][0]}　·　${D.weapons[i.base===A.Craft.soulId?s.soul.school:b.school][2]}</p>`:''}
        <dl class="gear-stats">${Object.keys(values).filter(k=>values[k]||baseline[k]).map(k=>`<div><dt>${D.affixes[k]}</dt><dd>${values[k]}${percent(k)}　${delta(values[k]-baseline[k])}</dd></div>`).join('')}</dl>
        ${eff?`<section class="legend-soul"><header class="legend-soul-head"><span class="legend-tag">★ 传奇器魂</span><b>${eff[0]}</b></header><p>${eff[1]}</p></section>`:''}
        ${curse?`<section class="cursed-relic"><header class="cursed-head"><b>◆ 诅咒魔器</b><span class="cursed-badge">双刃剑</span></header><div class="cursed-pair"><div class="cursed-pro"><em>利</em><span>${curse[2]}</span></div><div class="cursed-con"><em>弊</em><span>${curse[3]}</span></div></div></section>`:''}
        <p>词条　${i.affixes.map(a=>D.affixes[a.key]+' +'+a.value+percent(a.key)).join('、')}</p>
        ${b.set?`<p><b>${D.sets[b.set][0]}（${store.summary().sets[b.set]||0} 件）</b><br>二件 · ${D.sets[b.set][1]}<br>四件 · ${D.sets[b.set][2]}</p>`:''}
        ${i.grade===5?'<p><b>太古觉醒</b> · 神兵第 3 击横扫全场，招式伤 +25%；仙品衣饰每件防 +5。</p>':''}
        <div class="loot-actions">${button(mine?'unequip':'equip',mine?'卸下装备':D.legendary.curses[i.base]&&!i.curseConfirmed?'确认穿戴魔器':'穿戴装备')}${button('forge','强化淬炼')}${button('lock',i.locked?'解除保护':'锁定保护',i.base===A.Craft.soulId)}${button('salvage','分解',mine||i.locked)}</div>`;
    }
    function forge(i){
      if(!i)return card(i);const g=D.grades[i.grade],s=store.state,c=D.costs,enhance=c.enhance(i.level),promote=c.promote(i.grade),reroll=c.reroll(i.locks.length);
      return `${icon(i.base,i.grade)}<small>${g.name}　·　锻造</small><h3>${D.bases[i.base].name} +${i.level}</h3><p>上限 +${g.cap}（+6 开锋 · +10 流光 · +15 觉醒）</p>
        <div class="loot-actions">${button('enhance','强化 · '+enhance+' 石',i.level>=g.cap||s.currency.stone<enhance)}${button('promote',i.grade===5?'已达仙品':'升品 · '+promote+' 精魄',i.base===A.Craft.soulId||i.grade===5||s.currency.essence<promote)}</div>
        <h4>词条淬炼</h4><p>至多锁 2 条，洗练时已锁词条保留。</p>
        <div class="gear-locks">${i.affixes.map(a=>button('affix-'+a.key,(i.locks.includes(a.key)?'已锁　':'锁定　')+D.affixes[a.key]+' +'+a.value+percent(a.key),!i.locks.includes(a.key)&&i.locks.length===2)).join('')}</div>
        ${button('reroll','洗练 · '+reroll+' 精魄',s.currency.essence<reroll||i.locks.length===i.affixes.length)}
        <h4>批量分解</h4><div class="craft-pill-row" role="group" aria-label="批量分解品阶上限">${D.grades.map((gr,n)=>`<button type="button" class="craft-pill" data-threshold="${n}" aria-pressed="${n===threshold}" style="--grade:${gr.color}">${gr.name}及以下</button>`).join('')}</div>
        ${button('bulk','分解未穿戴且未保护的装备',!s.bag.some(v=>v.grade<=threshold&&!v.locked&&!Object.values(s.equipped).includes(v.id)))}`;
    }
    function renderDetail(){const box=$('gear-detail');if(box)box.innerHTML=tab==='forge'?forge(selected()):card(selected());}
    function filtered(){const items=store.state.bag.filter(i=>{const k=D.bases[i.base].slot;
      return filter==='all'||filter===k||filter==='clothes'&&['head','robe','boots','cloak'].includes(k)||filter==='jewels'&&['ring','amulet','pouch'].includes(k);});
      if(sort==='new')return items.reverse();return items.sort((a,b)=>sort==='grade'?b.grade-a.grade||A.power(b)-A.power(a):A.power(b)-A.power(a));
    }
    function list(){
      const items=filtered();if(!items.some(i=>i.id===id))id=items[0]?.id;
      const filters={all:'全部',clothes:'服饰',jewels:'饰物',...D.slots};
      return `<h3>装备背包 <small>${items.length}</small></h3><div class="gear-filters"><select id="gear-filter" aria-label="筛选部位">${Object.entries(filters).map(([k,v])=>`<option value="${k}" ${k===filter?'selected':''}>${v}</option>`).join('')}</select>
        <select id="gear-sort" aria-label="排序">${[['power','战力'],['grade','品阶'],['new','新获']].map(([k,v])=>`<option value="${k}" ${k===sort?'selected':''}>${v}</option>`).join('')}</select></div><div class="gear-list">${items.map(i=>{
        const b=D.bases[i.base];return `<button class="gear-row" data-item="${i.id}" data-grade="${i.grade}" aria-pressed="${id===i.id}"><span class="gear-icon" style="--grade:${D.grades[i.grade].color}">${icon(i.base,i.grade)}</span><span>${D.legendary.curses[i.base]?'◆ ':i.legendary?'★ ':''}${b.name} +${i.level}<small>${D.grades[i.grade].name} · ${Object.values(store.state.equipped).includes(i.id)?'已穿戴':'战力 '+A.power(i)}</small></span></button>`;
      }).join('')||'<p>本部位尚未拾得装备。</p>'}</div>`;
    }
    function paper(){
      const sum=store.summary(),presets=store.state.presets||[null,null,null];
      return `<section class="gear-paper"><h3>林墨 <small>装备展示台</small></h3><div class="gear-doll"><canvas id="armory-avatar" width="400" height="460" aria-label="实时换装林墨"></canvas>${positions.map((k,n)=>{
        const i=sum.worn[k],name=i?D.bases[i.base].name:'空槽';
        return `<button data-slot="${k}" data-grade="${i?i.grade:0}" class="${i?'is-worn':'is-empty'}" style="grid-row:${1+(n>>1)};grid-column:${n%2?3:1};--grade:${D.grades[i?.grade||0].color}" title="${name}">${icon(i?.base||k,i?.grade||0)}${D.slots[k]}<small>${i?'+'+i.level:'空槽'}</small></button>`;
      }).join('')}</div>
        <div class="gear-paper-ops">${button('best','一键最强',false,'class="primary gear-best-btn"')}${button('swing','试挥招式')}</div>
        <div class="gear-presets" role="group" aria-label="三套装备预设">
          <div class="preset-pills">${['一','二','三'].map((v,n)=>`<button type="button" class="preset-pill ${presets[n]?'has-saved':''}" data-preset="${n}" aria-pressed="${n===preset}">方案${v}${presets[n]?'<i>●</i>':''}</button>`).join('')}</div>
          <div class="preset-ops">${button('preset-save','记下')}${button('preset-apply','穿上',!presets[preset])}</div>
        </div>
        <div class="gear-total" title="普攻暴击率最高 75%"><small>总战力</small><strong>${sum.power}</strong> 攻 ${sum.total.attack}　防 ${sum.total.defense}　暴 ${sum.total.crit}%</div>
        <p class="gear-sets-line">${Object.entries(sum.sets).map(([k,n])=>D.sets[k][0]+' '+n+' 件').join(' · ')||'尚未集齐套装'}</p></section>`;
    }
    function wardrobe(){
      const s=store.state,rare=tab==='codex',owned=new Set([...s.unlockedAppearances,...s.bag.map(i=>i.base)]),items=rare?D.rare:[...owned].filter(k=>D.bases[k].slot===slot);
      const b=D.bases[preview],jade=root.XiuxianRogueData.treasures[preview];
      const source={phoenix_wings:'天渊 20 层起精英／首领 38% 几率掉落；砺剑模式每斩 3 位首领首赠。',jade_robe:'主线达大乘、亲历终局，或天渊首通第 8 层。',star_crown:'九霄首度收录 3 种超武进化。',nine_wings:'九霄通关第 15 波，或仙玉珍宝阁兑换。',emperor_robe:'九霄通关第 20 波，或仙玉珍宝阁兑换。'}[preview]||b?.route;
      return `<section class="gear-bag"><h3>${rare?'稀有图鉴':'已藏外观'}</h3>${rare?'':`<select id="wardrobe-slot" aria-label="幻化部位">${D.visible.map(k=>`<option value="${k}" ${k===slot?'selected':''}>${D.slots[k]}</option>`).join('')}</select>`}
      <div class="gear-list">${items.map(k=>`<button data-preview="${k}" aria-pressed="${preview===k}">${rare?`<span class="mini-wear" data-wear="${k}"></span>`:icon(k,3)}<span>${D.bases[k].name}<small>${owned.has(k)?'已收录':'未收录'}</small></span>${rare?icon(k,5):''}</button>`).join('')||'<p>拾取该部位装备可收录外观。</p>'}</div></section>
      <aside class="gear-detail"><small>${rare?'图鉴试穿':'外观试穿'}</small><h3>${b?.name||'选择外观'}</h3><p>${source||'装备入包即永久收录外观。'}${jade?' 珍宝阁定价 '+jade+' 仙玉。':''}${b?.style==='ancient'?' 展示台预览 +15 觉醒外显。':''}</p>
      <div class="loot-actions">${button('apply','应用幻化',!b||!owned.has(b.id))}${button('real','恢复此部位实装')}${button('toggle',s.transmog.enabled?'切换为实装':'切换为幻化')}</div><p>当前外显：${s.transmog.enabled?'幻化':'实装'}。</p></aside>`;
    }
    function sanitizeCraftState(s,spares){
      const spareIds=new Set(spares.map(i=>i.id));
      const bagIds=new Set(s.bag.map(i=>i.id));
      fuseIds=fuseIds.filter(x=>spareIds.has(x)).slice(0,3);
      if(fuseIds.length){
        const g0=s.bag.find(i=>i.id===fuseIds[0])?.grade;
        fuseIds=fuseIds.filter(x=>s.bag.find(i=>i.id===x)?.grade===g0&&g0<=4);
      }
      if(!s.recipes.includes(forgeRecipe))forgeRecipe=s.recipes[0]||'';
      if(!spareIds.has(extractSource)){extractSource=spares[0]?.id||'';extractIndex=0;}
      const extItem=s.bag.find(i=>i.id===extractSource);
      const extMax=(extItem?.affixes.length||0)+(extItem?.legendary?1:0);
      if(extractIndex>=extMax)extractIndex=0;
      if(!s.orbs.some(o=>o.id===imprintOrb))imprintOrb=s.orbs[0]?.id||'';
      if(!bagIds.has(imprintTarget)){imprintTarget=s.bag[0]?.id||'';imprintIndex=0;}
      const impItem=s.bag.find(i=>i.id===imprintTarget),curOrb=s.orbs.find(o=>o.id===imprintOrb);
      if(curOrb?.legendary)imprintIndex=impItem?impItem.affixes.length:0;
      else if(!impItem||imprintIndex>=impItem.affixes.length)imprintIndex=0;
      const eligible=spares.filter(i=>!s.archive.includes(i.base)&&(D.bases[i.base].set||D.bases[i.base].route));
      if(!eligible.some(i=>i.id===archiveSource))archiveSource=eligible[0]?.id||'';
      soulIds=soulIds.filter(x=>spareIds.has(x));
      if(!Object.hasOwn(D.weapons,soulSchool))soulSchool=s.soul.school;
    }
    function findAutoFusePair(spares){
      const byGrade=new Map();
      for(const i of spares){
        if(i.grade>4)continue;
        if(!byGrade.has(i.grade))byGrade.set(i.grade,[]);
        byGrade.get(i.grade).push(i);
      }
      for(const g of [0,1,2,3,4]){
        const arr=byGrade.get(g);
        if(arr&&arr.length>=3)return arr.sort((a,b)=>A.power(a)-A.power(b)).slice(0,3).map(i=>i.id);
      }
      return null;
    }
    function crafting(){
      const s=store.state,spares=s.bag.filter(i=>A.Craft.spare(s,i)),pages={fuse:'器灵熔炉',orb:'灵纹传承',archive:'藏器入鉴',soul:'青霜本命剑'};
      sanitizeCraftState(s,spares);
      let body='';
      if(craftPage==='fuse'){
        const chosenItems=fuseIds.map(x=>s.bag.find(i=>i.id===x)).filter(Boolean);
        const targetGrade=chosenItems[0]?.grade??null;
        const autoCandidate=findAutoFusePair(spares);
        const forgeBanner=lastForge?`<div class="forge-outcome ${lastForge.critical?'is-masterwork':''}">${icon(lastForge.base,lastForge.grade)}<div><b>${lastForge.critical?'★ 炉火大成 · 跳阶暴击':'开炉成器'}</b><span>${D.grades[lastForge.grade].name} · ${D.bases[lastForge.base].name}</span></div></div>`:'';
        const slotHtml=[0,1,2].map(idx=>{
          const item=chosenItems[idx],cls=['slot-top','slot-left','slot-right'][idx];
          if(item){
            const col=D.grades[item.grade].color;
            return `<button type="button" class="cauldron-slot ${cls} is-filled" data-fuse-slot="${idx}" style="--grade:${col}" title="点击退回 ${D.bases[item.base].name}">${icon(item.base,item.grade)}<span>${D.bases[item.base].name}</span></button>`;
          }
          return `<button type="button" class="cauldron-slot ${cls}" data-fuse-slot="${idx}"><span>槽${['一','二','三'][idx]}</span><small>点卡入炉</small></button>`;
        }).join('');
        const cauldron=`<div class="forge-cauldron-stage" id="forge-cauldron" data-filled="${chosenItems.length}"><svg class="cauldron-links" viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true"><line x1="150" y1="30" x2="150" y2="74"/><line x1="88" y1="88" x2="132" y2="86"/><line x1="212" y1="88" x2="168" y2="86"/><circle cx="150" cy="84" r="38" fill="none" stroke-dasharray="4 4"/></svg>${slotHtml}<div class="cauldron-core">${cauldronSvg}<b class="cauldron-label">青铜器灵炉</b></div></div>`;
        const fusable=spares.filter(i=>i.grade<=4);
        const grid=fusable.length
          ?`<div class="craft-card-grid" id="craft-fuse-grid" aria-label="点选三件同阶闲置装备入炉">${fusable.map(i=>{
            const picked=fuseIds.includes(i.id),dim=targetGrade!==null&&i.grade!==targetGrade;
            return itemCardBtn(i,'fuse-pick',picked,dim?'非同阶':'',dim);
          }).join('')}</div>`
          :'<p class="craft-empty">暂无可融炼的凡至天品闲置装备。</p>';
        const slotPills=`<div class="craft-subhead"><span>出炉部位定向</span><small>${fuseSlot?'定向消耗 6 淬灵精魄':'随机出炉免耗精魄'}</small></div><div class="craft-pill-row" role="group" aria-label="出炉部位">${[['','随机'],...Object.entries(D.slots)].map(([k,v])=>`<button type="button" class="craft-pill" data-fuse-target-slot="${k}" aria-pressed="${fuseSlot===k}">${v}</button>`).join('')}</div>`;
        const canFuse=chosenItems.length===3&&(!fuseSlot||s.currency.essence>=6);
        const ancientBlock=`<div class="ancient-anvil"><h4>太古锻造台 <small>劫晶 <b>${s.currency.crystal}</b> 枚</small></h4><p class="craft-muted">珍宝阁 260 仙玉兑残谱，配 5 枚劫晶直铸太古神兵。</p>${s.recipes.length?`<div class="craft-pill-row">${s.recipes.map(k=>`<button type="button" class="craft-pill is-ancient" data-forge-recipe="${k}" aria-pressed="${forgeRecipe===k}">${icon(k,5)}<span>${D.bases[k].name}残谱</span></button>`).join('')}</div>`:'<p class="craft-empty">尚未持有太古残谱。</p>'}${button('craft-forge','消耗残谱与 5 枚劫晶铸兵',!forgeRecipe||s.currency.crystal<5,'class="craft-action-btn"')}</div>`;
        body=`${cauldron}
          <div class="craft-submit-row">${button('craft-fuse',fuseSlot?'定向融炼（耗 6 精魄）':'开炉融炼三件',!canFuse,'class="primary craft-main-btn"')}</div>
          ${forgeBanner}
          <div class="craft-quick-bar"><span id="craft-count" class="craft-count-chip">已入炉 <b>${chosenItems.length}</b> / 3</span>${button('craft-auto-fuse','一键填入 3 件同阶闲置',!autoCandidate,'class="primary craft-auto-btn"')}${chosenItems.length?button('craft-clear-fuse','清空炉槽'):''}</div>
          <p class="craft-rule">3 件同阶闲置入炉：65% 升品，15% 炉火大成（必带满值词条）。</p>
          ${grid}${slotPills}
          ${ancientBlock}`;
      }else if(craftPage==='orb'){
        const extItem=s.bag.find(i=>i.id===extractSource);
        const extAffixes=[...(extItem?.affixes||[]).map((a,n)=>({n,label:D.affixes[a.key]+' +'+a.value+percent(a.key),legend:false})),...(extItem?.legendary?[{n:extItem.affixes.length,label:D.legendary.effects[extItem.legendary]?.[0]||'传奇器魂',legend:true}]:[])];
        const curOrb=s.orbs.find(o=>o.id===imprintOrb);
        const impItem=s.bag.find(i=>i.id===imprintTarget);
        const impAffixes=impItem?[...impItem.affixes.map((a,n)=>({n,label:D.affixes[a.key]+' +'+a.value+percent(a.key),locked:impItem.locks.includes(a.key),legend:false})),...(curOrb?.legendary?[{n:impItem.affixes.length,label:impItem.legendary?'覆盖器魂 · '+(D.legendary.effects[impItem.legendary]?.[0]||''):'铭刻至传奇器魂位',locked:false,legend:true}]:[])]:[];
        const orbCards=s.orbs.length
          ?'<div class="orb-gallery" aria-label="已藏灵纹珠">'+s.orbs.map(o=>`<button type="button" class="orb-card ${o.legendary?'is-legend':''}" data-pick-orb="${o.id}" aria-pressed="${o.id===imprintOrb}">${orbSvg(!!o.legendary)}<span><strong>${o.legendary?(D.legendary.effects[o.legendary]?.[0]||o.legendary):D.affixes[o.affix.key]+' +'+o.affix.value+percent(o.affix.key)}</strong><small>${o.legendary?'★ 传奇器魂珠':'灵纹玉珠'}</small></span></button>`).join('')+'</div>'
          :'<p class="craft-empty">尚未剥离灵纹珠，请先在上方挑选闲置装备剥离。</p>';
        body=`<section class="craft-step-box"><div class="craft-subhead"><h4>一 · 剥离灵纹珠</h4><small>销毁原件，无损保留所选词条或传奇器魂</small></div>
          ${spares.length?`<div class="craft-card-grid is-compact" aria-label="选择剥离原件">${spares.map(i=>itemCardBtn(i,'extract-source',i.id===extractSource)).join('')}</div>`:'<p class="craft-empty">暂无可剥离的闲置装备。</p>'}
          ${extAffixes.length?`<div class="craft-subhead"><span>点选要剥离的词条</span></div><div class="craft-affix-pills" aria-label="剥离词条">${extAffixes.map(a=>`<button type="button" class="affix-pill ${a.legend?'is-legend':''}" data-extract-idx="${a.n}" aria-pressed="${extractIndex===a.n}">${a.legend?'★ ':''}${a.label}</button>`).join('')}</div>`:''}
          ${button('craft-extract','剥离为灵纹珠',!extItem,'class="primary craft-main-btn"')}</section>
          <section class="craft-step-box"><div class="craft-subhead"><h4>二 · 铭刻传承</h4><small>消耗一珠，覆盖目标装备的未锁词条或器魂位</small></div>
          ${orbCards}
          ${s.orbs.length?`<div class="craft-subhead"><span>点选铭刻目标装备</span></div><div class="craft-card-grid is-compact" aria-label="铭刻目标装备">${s.bag.map(i=>itemCardBtn(i,'imprint-target',i.id===imprintTarget)).join('')}</div>
          <div class="craft-subhead"><span>点选要覆盖的词条槽</span></div><div class="craft-affix-pills" aria-label="覆盖词条位">${impAffixes.map(a=>`<button type="button" class="affix-pill ${a.legend?'is-legend':''} ${a.locked?'is-locked':''}" data-imprint-idx="${a.n}" aria-pressed="${imprintIndex===a.n}" ${a.locked||(curOrb?.legendary&&!a.legend)?'disabled':''}>${a.locked?'🔒 ':a.legend?'★ ':''}${a.label}</button>`).join('')}</div>
          ${button('craft-imprint','覆盖所选词条',!curOrb||!impItem,'class="primary craft-main-btn"')}`:''}</section>`;
      }else if(craftPage==='archive'){
        const eligible=spares.filter(i=>!s.archive.includes(i.base)&&(D.bases[i.base].set||D.bases[i.base].route));
        const bonusDmg=Math.min(10,Math.floor(s.archive.length/3)),bonusLoot=bonusDmg*2;
        body=`<div class="craft-focus-strip"><span>已入鉴 <b>${s.archive.length}</b> 种</span><span>全伤 <b>+${bonusDmg}%</b></span><span>掉宝率 <b>+${bonusLoot}%</b></span><span>${s.archive.length>=3?'✓ 月白染已解锁':'满 3 种解锁月白染'}</span></div>
          <p class="craft-rule">每入鉴 3 种底材，永久全伤 +1%、掉宝 +2%（10 组封顶）。</p>
          ${eligible.length?`<div class="craft-card-grid" aria-label="可献祭入鉴底材">${eligible.map(i=>itemCardBtn(i,'archive-pick',i.id===archiveSource)).join('')}</div>`:'<p class="craft-empty">当前背包中没有尚未入鉴的套装或稀有闲置底材。</p>'}
          <div class="craft-submit-row">${button('craft-archive','献祭所选底材入鉴',!archiveSource,'class="primary craft-main-btn"')}</div>
          <div class="archive-shelf"><h4>已入鉴名录</h4><div class="archive-tags">${s.archive.length?s.archive.map(k=>`<span class="archive-tag">${D.bases[k].name}</span>`).join(''):'<span class="craft-empty">尚未入鉴任何底材</span>'}</div></div>`;
      }else{
        const stage=A.Craft.stages[s.soul.stage-1],nextStage=A.Craft.stages[s.soul.stage];
        const previewXp=soulIds.reduce((sum,x)=>{const it=s.bag.find(i=>i.id===x);return sum+(it?itemXp(it):0);},0);
        const pct=nextStage?Math.min(100,Math.round(100*s.soul.xp/nextStage.xp)):100;
        const previewPct=nextStage?Math.min(100,Math.round(100*(s.soul.xp+previewXp)/nextStage.xp)):100;
        const willAscend=nextStage&&s.soul.xp+previewXp>=nextStage.xp;
        const lowSpares=spares.filter(i=>i.grade<=1);
        const roadmap='<div class="soul-roadmap" aria-label="本命剑四阶形态">'+A.Craft.stages.map((st,idx)=>{
          const state=idx+1<s.soul.stage?'is-done':idx+1===s.soul.stage?'is-current':'is-locked';
          return `<div class="soul-step ${state}">${soulStageSvg(idx)}<b>${st.name}</b><small>${idx===0?'初成':idx===3?'700+劫晶':st.xp+' 剑魂'}</small></div>`;
        }).join('')+'</div>';
        const xpBar=`<div class="soul-xp-bar ${willAscend?'will-ascend':''}"><div class="soul-xp-preview" style="width:${previewPct}%"></div><div class="soul-xp-fill" style="width:${pct}%"></div><span>剑魂 ${s.soul.xp}${previewXp?' <b>+'+previewXp+'</b>':''}${nextStage?' / '+nextStage.xp+(willAscend?' · ★ 可进阶':''):' · 圆满'}</span></div>`;
        const schoolPills=`<div class="craft-subhead"><span>本命剑流派</span><small>当前：${D.weapons[s.soul.school][0]}</small></div><div class="craft-pill-row" role="group" aria-label="本命剑流派">${Object.entries(D.weapons).map(([k,v])=>`<button type="button" class="craft-pill" data-soul-school="${k}" aria-pressed="${soulSchool===k}">${v[0]}</button>`).join('')}</div>
          <div class="craft-quick-bar">${button('craft-form','转换剑形',soulSchool===s.soul.school)}${button('soul-equip','穿戴本命剑')}</div>`;
        const feedGrid=spares.length
          ?`<div class="craft-card-grid is-compact" aria-label="点选闲置装备投喂本命剑">${spares.map(i=>itemCardBtn(i,'soul-pick',soulIds.includes(i.id),'+'+itemXp(i)+'魂')).join('')}</div>`
          :'<p class="craft-empty">暂无可投喂的闲置装备。</p>';
        body=`<h4>${icon('soul_sword',4)} ${stage.name} · ${D.weapons[s.soul.school][0]}</h4>${roadmap}${xpBar}
          <p class="craft-rule">筑基 60 开锋 · 金丹 240 紫电 · 化神 700＋1 劫晶太虚；每第 5 击发本命必杀。</p>
          ${schoolPills}
          <div class="craft-quick-bar"><span id="craft-count" class="craft-count-chip">已选投喂 <b>${soulIds.length}</b> 件${previewXp?'（+'+previewXp+' 剑魂）':''}</span>${button('craft-feed-auto','一键投喂所有凡/灵品闲置',s.soul.stage===4||!lowSpares.length,'class="craft-auto-btn"')}</div>
          ${feedGrid}
          <div class="craft-submit-row">${button('craft-feed',willAscend?'吞噬并触发进阶！':'吞噬所选装备／进阶',s.soul.stage===4,'class="primary craft-main-btn"')}</div>`;
      }
      return '<section class="gear-bag"><h3>炼器工坊</h3><nav class="gear-list">'+Object.entries(pages).map(([key,label])=>`<button data-craft="${key}" aria-pressed="${key===craftPage}">${label}</button>`).join('')+'</nav></section><aside class="gear-detail craft-workshop-panel"><h3>'+pages[craftPage]+'</h3><div role="status">'+note+'</div>'+body+'</aside>';
    }
    function craftAction(act){
      lastForge=null;
      switch(act){
        case 'craft-auto-fuse':{
          const spares=store.state.bag.filter(i=>A.Craft.spare(store.state,i));
          const picks=findAutoFusePair(spares);
          if(!picks)return '背包中暂无 3 件同品阶（凡至天品）闲置装备。';
          fuseIds=picks;return '已自动填入 3 件同阶闲置入炉，点击开炉即可融炼。';
        }
        case 'craft-clear-fuse':{fuseIds=[];return '已清空炉槽。';}
        case 'craft-fuse':{
          const r=store.fuse(fuseIds,fuseSlot);
          if(r){
            fuseIds=[];
            const created=store.state.bag.find(i=>i.id===r.id);
            lastForge={base:created.base,grade:r.grade,critical:r.critical};
            fxTag=r.critical?'fx-furnace-masterwork':'fx-furnace-ignite';
            sound?.preview?.(r.critical?'lootGold':'forgeHammer',.8).catch(()=>{});
            return (r.critical?'炉火大成！':'出炉：')+D.grades[r.grade].name+' · '+D.bases[created.base].name;
          }
          return '请选择三件同阶凡至天品，并备足定向精魄。';
        }
        case 'craft-forge':{const ok=store.forgeAncient(forgeRecipe);if(ok){fxTag='fx-furnace-masterwork';sound?.preview?.('lootAncient',.8).catch(()=>{});}return ok?'太古神兵已收入背包。':'残谱或劫晶不足。';}
        case 'craft-extract':{const ok=store.extractAffix(extractSource,extractIndex);if(ok){extractSource='';extractIndex=0;fxTag='fx-forge-burst';sound?.preview?.('equipWear',.7).catch(()=>{});}return ok?'原器已剥离，灵纹珠入藏。':'原件无法剥离。';}
        case 'craft-imprint':{const ok=store.imprintAffix(imprintTarget,imprintOrb,imprintIndex);if(ok){imprintOrb='';fxTag='fx-imprint-sweep';sound?.preview?.('forgeHammer',.8).catch(()=>{});}return ok?'所选词条已铭刻。':'目标含有同名词条，或替换位已锁定。';}
        case 'craft-archive':{const ok=store.archive(archiveSource);if(ok)archiveSource='';return ok?'底材已献祭入鉴。':'该底材无法入鉴。';}
        case 'craft-form':return store.soulForm(soulSchool)?'剑形已转换。':'剑形无效。';
        case 'craft-feed-auto':{
          const low=store.state.bag.filter(i=>A.Craft.spare(store.state,i)&&i.grade<=1).map(i=>i.id);
          if(!low.length)return '暂无凡品或灵品闲置装备。';
          const r=store.feedSoulWeapon(low);
          if(r){soulIds=[];fxTag='fx-forge-milestone';return '一键投喂 '+low.length+' 件，获得 '+r.xp+' 剑魂 · '+A.Craft.stages[r.stage-1].name;}
          return '投喂失败，请检查本命剑是否已圆满。';
        }
        case 'craft-feed':{const r=store.feedSoulWeapon(soulIds);if(r){soulIds=[];fxTag='fx-forge-milestone';}return r?'获得 '+r.xp+' 剑魂 · '+A.Craft.stages[r.stage-1].name:'请选择材料，或达到下一阶觉醒条件。';}
      }
    }
    function medals(){
      const rows=Object.values(A.Ach.data),earned=store.state.achievements;
      return `<section class="gear-bag medals-bag"><h3>成就勋章 <small>已达成 ${earned.length} / ${rows.length}</small></h3><div class="gear-list medals-grid">${rows.map(r=>{
        const got=earned.includes(r.title);
        return `<p class="medal-card ${got?'is-earned':'is-locked'}"><span class="medal-seal" aria-hidden="true">${got?'印':'未'}</span><span><strong>${r.title}</strong><em>${got?'已获称号':'待解锁'}</em><small>${r.condition}</small></span></p>`;
      }).join('')}</div></section>`;
    }
    function show(){
      const s=store.state,ward=tab==='wardrobe'||tab==='codex',middle=tab==='medals'?medals():tab==='craft'?crafting():ward?wardrobe():`<section class="gear-bag">${list()}</section><aside id="gear-detail" class="gear-detail">${tab==='forge'?forge(selected()):card(selected())}</aside>`;
      const wallet=`<div class="gear-wallet" aria-label="四项核心资源">
        <span class="wallet-chip is-stone">${currencySvg.stone}<span>灵锻石</span><b>${s.currency.stone}</b></span>
        <span class="wallet-chip is-essence">${currencySvg.essence}<span>淬灵精魄</span><b>${s.currency.essence}</b></span>
        <span class="wallet-chip is-crystal">${currencySvg.crystal}<span>太古劫晶</span><b>${s.currency.crystal}</b></span>
        <span class="wallet-chip is-jade">${currencySvg.jade}<span>幻境仙玉</span><b>${s.currency.jade}</b></span>
      </div>`;
      openModal('armory',`<div class="loot-shell"><h2 id="modal-title" class="hub-page-heading">装备换装</h2>${wallet}<div class="armory-toolbar">
        <nav class="loot-tabs" aria-label="装备页签">${Object.entries({gear:'装备换装',forge:'强化淬炼',wardrobe:'幻化衣橱',codex:'稀有图鉴',craft:'炼器工坊',medals:'成就勋章'}).map(([k,v])=>`<button data-tab="${k}" aria-pressed="${tab===k}">${v}</button>`).join('')}</nav><div class="gear-head-links"><button data-act="records">器忆外传</button><button data-act="home">药庐洞府</button></div></div>
        <div class="gear-columns">${paper()}${middle}</div><div id="gear-note" role="status">${tab==='craft'?'':note}</div></div>`);
      const panel=$('modal-content').querySelector('.loot-shell');for(const el of panel.querySelectorAll('[data-wear]'))el.append(root.XiuxianItemIcons.preview(el.dataset.wear));panel.onclick=click;panel.onchange=change;
      if(fxTag&&!options.reducedMotion){
        const stage=panel.querySelector('.gear-paper'),detail=panel.querySelector('.gear-detail');
        const cls=fxTag;fxTag='';
        for(const t of [stage,detail].filter(Boolean)){t.classList.add(cls);setTimeout(()=>t.classList.remove(cls),950);}
      }else fxTag='';
      panel.onpointerover=panel.onfocusin=e=>{const row=e.target.closest('[data-item]');if(row&&row.dataset.item!==id){id=row.dataset.item;for(const b of panel.querySelectorAll('[data-item]'))b.setAttribute('aria-pressed',b===row);renderDetail();}};
      frame(performance.now(),$('armory-avatar'));
    }
    function change(e){
      const v=e.target.value;
      if(e.target.id==='gear-filter')filter=v;else if(e.target.id==='gear-sort')sort=v;
      else if(e.target.id==='wardrobe-slot'){slot=v;preview=null;}else return;show();
    }
    function click(e){
      const b=e.target.closest('button');if(!b||b.disabled)return;
      const d=b.dataset;note='';
      if(d.preset!==undefined){preset=Number(d.preset);show();return;}
      if(d.threshold!==undefined){threshold=Number(d.threshold);show();return;}
      if(d.fuseSlot!==undefined){
        const idx=Number(d.fuseSlot);
        if(fuseIds[idx])fuseIds.splice(idx,1);
        else{
          const spares=store.state.bag.filter(i=>A.Craft.spare(store.state,i)&&i.grade<=4&&!fuseIds.includes(i.id));
          const g0=fuseIds.length?store.state.bag.find(i=>i.id===fuseIds[0])?.grade:null;
          const next=spares.find(i=>g0===null||i.grade===g0);
          if(next)fuseIds.push(next.id);
        }
        show();return;
      }
      if(d.fusePick){
        const pickId=d.fusePick,item=store.state.bag.find(i=>i.id===pickId);
        if(fuseIds.includes(pickId))fuseIds=fuseIds.filter(x=>x!==pickId);
        else if(item&&item.grade<=4){
          const g0=fuseIds.length?store.state.bag.find(i=>i.id===fuseIds[0])?.grade:null;
          if(g0!==null&&item.grade!==g0){fuseIds=[pickId];note='已切换为 '+D.grades[item.grade].name+' 品阶入炉。';}
          else if(fuseIds.length<3)fuseIds.push(pickId);
          else note='炉槽已满三件，点槽位或卡片可退回。';
        }
        show();return;
      }
      if(d.fuseTargetSlot!==undefined){fuseSlot=d.fuseTargetSlot;show();return;}
      if(d.forgeRecipe){forgeRecipe=d.forgeRecipe;show();return;}
      if(d.extractSource){extractSource=d.extractSource;extractIndex=0;show();return;}
      if(d.extractIdx!==undefined){extractIndex=Number(d.extractIdx);show();return;}
      if(d.pickOrb){imprintOrb=d.pickOrb;const orb=store.state.orbs.find(o=>o.id===imprintOrb),t=store.state.bag.find(i=>i.id===imprintTarget);imprintIndex=orb?.legendary&&t?t.affixes.length:0;show();return;}
      if(d.imprintTarget){imprintTarget=d.imprintTarget;const orb=store.state.orbs.find(o=>o.id===imprintOrb),t=store.state.bag.find(i=>i.id===imprintTarget);imprintIndex=orb?.legendary&&t?t.affixes.length:0;show();return;}
      if(d.imprintIdx!==undefined){imprintIndex=Number(d.imprintIdx);show();return;}
      if(d.archivePick){archiveSource=d.archivePick;show();return;}
      if(d.soulSchool){soulSchool=d.soulSchool;show();return;}
      if(d.soulPick){
        const pickId=d.soulPick;
        if(soulIds.includes(pickId))soulIds=soulIds.filter(x=>x!==pickId);
        else soulIds.push(pickId);
        show();return;
      }
      if(d.craft){craftPage=d.craft;lastForge=null;show();return;}
      if(d.tab){tab=d.tab;preview=tab==='codex'?D.rare[0]:null;show();return;}
      if(d.item){id=d.item;renderDetail();return;}
      if(d.slot){tab='gear';filter=d.slot;id=store.state.equipped[filter];preview=null;show();return;}
      if(d.preview){preview=d.preview;demo=null;attackTime=-10;show();return;}
      if(!d.act)return;const act=d.act;
      if(act.startsWith('craft-')){try{note=craftAction(act);dirty();}catch{note='储存失败，材料仍保留。';}show();return;}
      if(act==='records'){root.xiuxian.rogue.library();return;}
      if(act==='home'){$('home-open').click();return;}
      if(act==='swing'){attackTime=performance.now()/1000;demo=null;return;}
      if(act==='forge'){tab='forge';show();return;}
      const i=selected();let result;
      try{
        if(act==='best')result=store.equipBest();
        else if(act==='preset-save')result=store.savePreset(preset);
        else if(act==='preset-apply')result=store.applyPreset(preset);
        else if(act==='soul-equip')result=store.equip(A.Craft.soulId);
        else if(act.startsWith('affix-'))result=store.lockAffix(id,act.slice(6));
        else if(act==='unequip')result=store.unequip(D.bases[i.base].slot);
        else if(act==='bulk')result=store.salvageBelow(threshold);
        else if(act==='apply'){result=store.appearance(D.bases[preview].slot,preview);if(!store.state.transmog.enabled)store.toggle();}
        else if(act==='real'){result=store.appearance(D.bases[preview]?.slot||slot,null);preview=null;}
        else if(act==='toggle'){result=store.toggle();preview=null;}
        else result=store[act](id);
        note=act==='best'&&result?'战力提升 '+result.delta+' 点。':result===false?'未达操作条件。':act==='bulk'?'已分解 '+result+' 件装备。':'已保存。';
        if(result&&!options.reducedMotion){
          const after=selected();
          if(act==='enhance')fxTag=[6,10,15].includes(after?.level)?'fx-forge-milestone':'fx-forge-burst';
          else if(act==='promote'||act==='reroll')fxTag='fx-forge-milestone';
          else if(act==='apply'||act==='equip')fxTag=(act==='apply'||after?.grade>=5||D.bases[preview]?.style==='ancient')?'fx-immortal-aura':'fx-equip-aura';
        }
      }catch{note='装备未能写入本机，请检查储存空间。';}
      dirty();show();
      const tone=({enhance:'forgeHammer',promote:'forgeHammer',reroll:'forgeHammer',equip:'equipWear',apply:'equipWear'})[act];
      if(result&&tone)sound.preview(tone,.8).catch(()=>{});
    }
    function frame(now,canvas){
      if(!canvas?.isConnected)return;const t=options.reducedMotion?0:now/1000,c=canvas.getContext('2d'),g=game();if(!g)return;
      const sum=store.summary(),look={...sum.look};if(preview&&['wardrobe','codex'].includes(tab))look[D.bases[preview].slot]=D.bases[preview];
      const tryWeapon=D.bases[preview]?.school&&['wardrobe','codex'].includes(tab);
      const shown=tryWeapon?{...sum,look,school:look.weapon.school,worn:{...sum.worn,weapon:{...sum.worn.weapon,base:preview,grade:look.weapon.style==='ancient'?5:2,level:look.weapon.style==='ancient'?15:0}}}:{...sum,look};
      c.clearRect(0,0,400,460);c.save();c.scale(2,2);
      const elapsed=now/1000-attackTime,active=elapsed>=0&&elapsed<1.8;
      const pedestal = root.XiuxianArt.ui['armory-pedestal'];
      if (pedestal) c.drawImage(pedestal,24,124,152,152);
      else {
        root.XiuxianAvatar.oval(c,100,198,71,12,'#d8bb7c77');
        root.XiuxianAvatar.oval(c,100,198,60,8,'#e4c888bb');
      }
      const child=g.isChild(),aged=g.bodyProfile?.().appearance==='mortal-aged';
      root.XiuxianAvatar.draw(c,{x:100,y:195,height:145,atlas:child?'chapterPeople':aged?'mortalAged':'characters',cell:g.state.gender==='male'?(child?1:4):0,summary:shown,time:t,swing:active?Math.sin(elapsed*7)*.6:0,preview:true});
      if(active){if(!demo){const target={x:210,y:130,hp:1e6},actor={state:{x:60,y:130},face:{x:1,y:0},activeEnemies:()=>[target],hitEnemy:()=>{}};
        demo=new root.XiuxianWeapons.Arsenal(actor,{summary:()=>shown});demo.strikes=2;demo.attack(target);}
        demo.tick(Math.min(.05,(now-last)/1000));c.scale(.73,.85);root.XiuxianWeapons.paint(c,demo,t);}
      c.restore();last=now;requestAnimationFrame(n=>frame(n,canvas));
    }
    return {show:()=>{if(game())root.XiuxianAbyss.storyRewards(game(),store,true);tab='gear';preview=null;filter='all';note='';show();},getPreview:()=>preview};
  }
  root.XiuxianArmoryUI={create};
})(globalThis);
