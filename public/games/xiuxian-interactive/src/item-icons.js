(function(root){
  'use strict';
  // The illustrations share a chased brass frame, an enamel body and a pale cutting edge.
  const looks={
    sword:['M15 51l5-13 26-26 7-2-2 8-26 26z','M12 39l3-3 14 8-2 4z M13 54l-3-3 7-10 4 3z','M23 39l24-24'],
    storm:['M16 54l-4-3 25-33 5 2z M32 29l-3-12 7 5 9-15-1 14 10-6-8 14z','M26 32l9-3 4 6-8 2z','M44 8l-9 19 8-2-14 16'],
    flag:['M15 54l-3-1 13-44 3 1z M27 13c12-6 16 8 28 2l-8 12 3 9c-12 6-16-7-29-1z','M30 27q-2-6 6-12-1 6 4 7l2-3q3 10-7 11z','M26 13q11-4 19 3'],
    wheel:['M32 7l6 6 9-1 2 9 7 6-4 8 2 9-9 3-5 8-8-4-9 3-4-8-9-3 3-9-5-7 7-6 2-9 9 1z M32 20a12 12 0 1 0 .1 0z','M32 13l3 6-4-1z M47 39l-6-1 3 5z M17 38l3 5 3-6z','M16 29q3-13 16-14'],
    swarm:['M20 26l18-7 8 27-18 8z M23 24l-5-14 5 3 6 12 M30 22l1-17 4 4 1 12 M37 20l9-12-1 8-4 7z','M19 28l20-8 2 5-20 8z M26 48l19-7 2 5-19 8z','M27 37l7-7 4 9-7 6z'],
    head:['M11 24l11 8 3-16 7 10 8-14 3 18 11-9-7 23-30 2z','M15 41q17-7 34-2l-1 7q-15-4-31 1z','M21 36q12-9 23-3 M30 32l4-5 4 4-4 6z'],
    robe:['M25 12l7 4 8-4 16 14-7 12-7-6 5 22-31-2 6-21-8 7-7-10z','M24 14l8 7 8-8 3 4-18 20-3-4 7-9-8-6z M22 35l18-2 1 5-21 1z','M27 41l-4 9 M36 40l5 10 M10 28l6 5 M48 29l6-4'],
    boots:['M29 14q8 5 19-1l-3 20 5 10q-3 8-17 7l-20-1q-7-4-3-12 4 5 10 2l10-7z','M28 13q12 4 21-2l-1 6q-10 6-20 2z M11 45q18 5 37 0v5q-21 5-38 0z','M25 39q5-9 11-5 4 3-2 5 M31 23l9 5-10 5'],
    wings:['M31 48Q12 47 7 13l9 7-3-11 12 13 1-8 6 18 6-18 1 8L52 8l-3 15 9-10Q53 45 33 49z','M11 22l18 19-4-12z M53 23L36 42l5-14z M28 46l4-10 5 9-5 7z','M13 33l13 10 M50 34l-12 10'],
    ring:['M32 16a16 16 0 1 1-1 0z M32 23a10 10 0 1 0 .1 0z','M22 18l4-7 11-1 6 7-7 9-8-1z','M26 16l6-3 5 3-5 6z'],
    amulet:['M33 9q8 2 2 10 14 3 13 17-2 13-17 14-15-3-15-15 0-11 14-16-6-7 3-10z','M29 47l7 1-2 10-3-5-4 3z','M28 31q7-8 11-1 3 6-6 10-7-1-7-6'],
    pouch:['M24 13l7 4 9-6 4 3-7 11q17 11 15 23-4 9-21 8-18-1-19-10-1-10 13-21z','M24 22l15-1 2 5-18 2z M38 25q10 2 9 9l-4-3z','M26 38l6-5 6 5-6 7z'],
    grass:['M20 51q7-14 1-34 10 7 11 22-1-22 10-31 0 21-6 31 8-13 18-17-7 20-20 28z','M16 47q12 0 18 5l-4 4-9-5-7 1z','M27 48l-4-21 M32 46l8-28 M35 46l13-16'],
    blossom:['M28 33q-20 3-18-10 3-7 15-3-5-16 4-18 8 0 8 15 13-12 19-4 3 8-10 15 16 1 13 10-4 8-18 2 3 12-5 14-10-1-8-21z','M28 22q6-6 11 0 5 6-1 11-8 3-11-3z M26 44q-11-9-15-3 5 9 15 8z','M18 23l8 3 M31 11l1 9 M48 17l-8 7 M48 34l-7-3 M32 37l-2 15'],
    stand:['M10 47h44v5H10z M13 48l4-24h5l-1 23z M44 47l-2-24h5l4 24z','M13 23l-1-7 5 2 2 5 4-5 3-1-1 8-6 4z M39 22l-1-7 4 2 3 5 3-5 4-1-1 8-6 4z','M14 49h36 M17 40l1-11 M47 41l-2-12'],
    hanger:['M14 50h35v4H14z M29 16h5v36h-5z M14 26l17-11 20 11-3 3-17-8-15 8z','M25 14q-1-8 6-8 9 0 7 7-1 4-6 5l-4-2 4-3q4-2 1-4-4-2-4 4z','M19 25l13-7 13 7 M30 45l1-21 M18 51h27'],
    bell:['M11 44q9-4 9-17 1-12 11-13 2-10 6 0 11 4 10 15 0 10 7 15-21 10-43 0z','M11 43q22 6 42-1l1 5q-20 10-44 0z M28 50q4 9 9-1z','M25 29q8-10 16 0 M23 36q8-7 19-2'],
    orb:['M32 12a18 18 0 1 1-.1 0z','M13 40l9 2q12 8 25-3l6-2-8 12-13 5-13-6z','M36 16L24 32l10-3-5 12 15-18-11 3z'],
    scroll:['M16 14l32 5-5 30-31-5z','M15 10l34 6-1 7-34-6z M12 40l34 6-2 7-34-6z','M23 22l16 3 M21 27l14 3 M20 32l18 3'],
    lotus:['M9 31q12 1 19 8-10-12-7-23 7 5 11 13-3-11 1-20 11 11 9 24l11-12q3 25-19 29Q16 48 9 31z','M13 46q10-2 20 3 11-9 19-7-6 12-20 12z','M31 25q5 10 3 18 M44 35l-7 9'],
    bottle:['M24 13l16 1-1 6-3 1v7c12 6 17 16 8 23q-12 8-23 0-12-9 7-23v-7l-4-1z','M24 12l1-5 14 1 1 5z M22 37q10 4 22 0l3 7q-12 6-27 0z','M23 33l-4 7 M31 39l3 3-3 3'],
    fan:['M10 22Q29-4 55 20L32 49z','M29 47l5-2 5 9-5 2z','M17 18l15 28-6-33 M34 12l-2 34 14-31'],
    star:['M12 16l35-5 8 33-37 9z','M14 44l38-9 2 6-37 10z','M21 22l23-4 M22 29l24-5 M27 18l6 23 M35 16l5 23'],
    basin:['M9 31q21 7 46-2-3 18-20 20l-13-2Q12 43 9 31z','M9 28q21 6 45-1l2 5q-23 8-46 1z M22 49l22-2 2 4-26 4z','M23 23l4-8 6 7-5 5 M37 21l6-9 4 8-6 4'],
    crystal:['M13 38l7-19 10 7 7-18 12 12 3 21-21 13z','M14 39l13-7 4 19z M32 32l9-15 7 7z','M22 24l4 14 M38 12l-4 17 M35 46l13-8'],
    crane:['M8 22q15 1 24 12 2-12 9-16 7-3 11 2l6 4-10 1q-8 0-8 9-2 13-16 13L9 53l9-12-10-7 12 2z','M28 44l7 1 2 11-3-1z','M15 28l12 9 M37 39q-3 5-9 4'],
    yin:['M32 9a23 23 0 1 1-.01 0z','M32 9a11.5 11.5 0 0 1 0 23 11.5 11.5 0 0 0 0 23 23 23 0 0 1 0-46z','M31 19a2 2 0 1 0 1 0 M32 43a2 2 0 1 0 1 0']
  };
  const palettes={lotus:'#79e4bc',thunder:'#ba9afc',flame:'#ff9863',frost:'#98def3',star:'#dbbf84',ghost:'#e28cc7',plain:'#b3d9cb'};
  const recipes={
    weapon:['sword','storm','wheel','wheel','bell','flag','star','fan'],
    relic:['amulet','orb','crystal','crystal','scroll','scroll','star','fan'],
    evolve:['swarm','storm','wings','wheel','yin','flag','star','fan']
  };
  const paths=['sword','storm','fire','ice','bell','ghost','star','wind'];
  const goods={heal:'bottle',force:'pouch',swordSeal:'scroll',thunderSeal:'scroll',health:'lotus',speed:'wings',magnet:'basin',crit:'sword',refresh:'yin',revive:'crane',stone:'crystal',essence:'orb',herb:'grass',flower:'blossom',dew:'lotus',forge:'bell',double:'storm',silk:'robe',vault:'basin',boss:'head'};
  const modifications={split:'swarm',thunderStep:'boots',bloodSoul:'amulet',corpseSeal:'scroll',stillFocus:'yin',judgment:'storm',breakArmy:'sword',swift:'wings',goldEye:'basin',frostHeart:'crystal',fireSeed:'lotus',starChain:'star',windBlade:'fan',echoBell:'bell',soulVessel:'bottle',wardRing:'ring'};
  const tints={heal:'#59d797',force:'#e9bf62',herb:'#83d886',flower:'#d898cc',dew:'#83ded7',stand:'#9e876c',hanger:'#ae926e',swordSeal:'#8ddbc1',thunderSeal:'#b9a0f3'};
  const materials={plain:'#c0d9cf',wings:'#a5e7c5',wheel:'#e2c789',phoenix:'#d997ca',sunset:'#e99894',emperor:'#a69bbf',glacier:'#85c8ef',jade:'#dcf1dc'};
  const emblems={
    lotus:'M-6 4q1-8 5-4l1-6 3 6q5-4 4 2-4 5-13 2z',
    thunder:'M1-7l-6 9h5l-1 6 8-12H1z',
    flame:'M-5 4q-2-4 2-8l1 4 4-7q7 12-1 13z',
    frost:'M0-6v12M-5-3l10 6M-5 3l10-6M-2-4l2 2 2-2M-2 4l2-2 2 2',
    star:'M-6 4l4-9 4 7 4-4 M-6 3v2 M-2-6v2 M2 1v2 M6-3v2',
    ghost:'M-5 4q4-4 1-8 7 1 5 6l4-3q0 9-10 5z'
  };
  // Each talisman carries a second engraving. The seal stays legible at inventory scale.
  const seals={split:'lotus',thunderStep:'thunder',bloodSoul:'flame',corpseSeal:'ghost',stillFocus:'star',judgment:'thunder',breakArmy:'flame',swift:'frost',goldEye:'star',frostHeart:'frost',fireSeed:'flame',starChain:'star',windBlade:'lotus',echoBell:'star',soulVessel:'ghost',wardRing:'frost',swordSeal:'lotus',thunderSeal:'thunder',herb:'lotus',flower:'flame',dew:'frost',heal:'lotus',force:'star'};
  const paintings={
    nine_wings:'wings',star_wheel:'wheel',phoenix_wings:'phoenix',emperor_robe:'emperor',
    star_crown:'crown',lotus_steps:'lotusboots',soul_sword:'soulblade',cauldron:'cauldron',
    crystal:'crystal',jade:'jade',scroll:'scroll',orb:'orb',study:'scroll'
  };
  const familyArt={sword:'sword',storm:'storm',fire:'fire',ice:'ice',bell:'bell',ghost:'ghost',star:'chess',wind:'fan'};
  const relicArt={sword:'amulet',storm:'orb',fire:'essence',ice:'crystal',bell:'ward',ghost:'scroll',star:'chess',wind:'fan'};
  const symbols={weapon:'sword',health:'essence',speed:'boots',magnet:'amulet',crit:'sword',refresh:'chess',revive:'ward',
    heal:'essence',force:'pouch',thunderSeal:'storm',swordSeal:'scroll',bottle:'essence',lotus:'amulet',yin:'wheel',
    basin:'pouch',crane:'phoenix',flag:'ghost',star:'chess',ward:'ward',stone:'stone',essence:'essence'};
  function paintingFor(id){
    const [group,key]=String(id).split(':'),data=root.XiuxianArmoryData;
    if(data?.legendary?.curses[id])return 'cursed';
    if(paintings[id])return paintings[id];
    const base=data?.bases[id];
    if(base)return base.school||base.slot;
    if(group==='weapon')return familyArt[key]||'sword';
    if(group==='relic')return relicArt[key];
    if(group==='evolve')return ({sword:'swarm',fire:'phoenix',bell:'wheel'})[key]||familyArt[key];
    const form=group==='mod'?modifications[key]:key||id;
    return paintings[form]||symbols[form]||((data?.slots[form]||['crystal','swarm','wings','storm','sword','fan','bell','ghost','chess'].includes(form))?form:undefined);
  }
  // An opaque grade-framed tile covers the old SVG only after its local image has decoded.
  function paintedLayer(name,edge,size=64){
    if(!name)return '';
    const id='icon-'+name;
    return `<g data-reborn-icon="${id}" style="display:var(--reborn-${id},none)" transform="scale(${size/64})"><rect x="1" y="1" width="62" height="62" rx="9" fill="#192629" stroke="${edge}" stroke-width="2"/><rect x="3" y="3" width="58" height="58" rx="7" fill="#243336" stroke="#111d20"/><image href="assets/art-reborn/${id}.webp" x="4" y="4" width="56" height="56"/></g>`;
  }
  let serial=0;
  function draw(id,grade=2){
    const base=root.XiuxianArmoryData?.bases[id], [group,key]=String(id).split(':'), index=paths.indexOf(key);
    const form=base?(base.slot==='weapon'?({fire:'flag',ice:'wheel'})[base.school]||base.school:base.style==='wheel'?'yin':base.slot==='cloak'?'wings':base.slot):
      recipes[group]?.[index]||goods[key||id]||modifications[key||id]||({weapon:'sword',cloak:'wings'})[id]||id;
    const seed=Array.from(String(id)).reduce((n,c)=>(Math.imul(n,31)+c.codePointAt(0))>>>0,19);
    const col=tints[key||id]||materials[base?.style]||palettes[base?.set]||palettes[['lotus','thunder','flame','frost','star','ghost','thunder','lotus'][index]]||Object.values(palettes)[seed%7];
    const edge=root.XiuxianArmoryData?.grades[grade]?.color||'#dac28b';
    const [body,inlay,etch]=looks[form]||looks.crystal, k='gem'+(++serial),star=group==='evolve'||grade===5;
    const motif=base?.set||seals[key||id]||['lotus','thunder','flame','frost','star','ghost','star','lotus'][index];
    const seal=motif?`<g transform="translate(48 48) scale(.8)"><circle r="8.4" fill="#253a40" stroke="#e6c88b"/><path d="${emblems[motif]}" fill="none" stroke="${col}" stroke-width="1.9" stroke-linejoin="round"/></g>`:'';
    const engraving=star?'<path d="M8 24q2-12 14-14m20 0q12 2 14 14M8 42q2 12 14 14" fill="none" stroke="#e2c080" stroke-width=".9"/>':'';
    return `<svg class="item-illustration" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><radialGradient id="${k}h" cy=".36" r=".78"><stop stop-color="${col}"/><stop offset=".64" stop-color="#263b43"/><stop offset="1" stop-color="#142329"/></radialGradient><linearGradient id="${k}m" x2=".8" y2="1"><stop stop-color="#fff8d7"/><stop offset=".34" stop-color="${col}"/><stop offset="1" stop-color="#366266"/></linearGradient></defs><rect x="1" y="1" width="62" height="62" rx="10" fill="url(#${k}h)" stroke="${edge}"/><rect x="4" y="4" width="56" height="56" rx="8" fill="none" stroke="#efd198" stroke-opacity=".63"/><circle cx="32" cy="32" r="21" fill="none" stroke="${edge}" stroke-opacity=".44" stroke-dasharray="${star?'3 2':'1 4'}"/><path d="${body}" fill="url(#${k}m)" fill-rule="evenodd" stroke="#213c46" stroke-width="1.65" stroke-linejoin="round"/><path d="${inlay}" fill="#e8ba6c" stroke="#644730" stroke-width="1.1"/><path d="${etch}" fill="none" stroke="#fff7cb" stroke-width="1.55" stroke-linecap="round"/><path d="M8 13l1-4 4-1-4-1-1-3-1 4-3 1 3 1z" fill="#fff4c7"/>${star?'<path d="M53 46l2 5 5 1-5 2-2 5-1-5-5-2 5-1z" fill="#fff3bd"/>':''}${engraving}${seal}${paintedLayer(paintingFor(id),edge)}</svg>`;
  }
  function supply(art,id,extraClass){
    const special={qingxin:['chapterPeople',15],tea:['caseObjects',16],sword:['characters',11]};
    const [atlas,cell]=special[id]||['props',art.itemCells[id]];
    if(cell===undefined)return '';
    const [x,y,w,h]=art[atlas][cell],[aw,ah]=art.dimensions[atlas];
    return `<span class="art-icon ${extraClass}" aria-hidden="true"><svg viewBox="0 0 64 64" width="64" height="64" focusable="false"><rect x="1" y="1" width="62" height="62" rx="7" fill="#263839" stroke="#ad9468"/><svg x="4" y="4" width="56" height="56" viewBox="${x} ${y} ${w} ${h}" overflow="hidden" preserveAspectRatio="xMidYMid meet"><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${x} ${y} ${w} ${h}" overflow="hidden"><image href="${art.sources[atlas]}" width="${aw}" height="${ah}"/></svg></svg></svg></span>`;
  }
  function preview(id){
    const canvas=document.createElement('canvas');canvas.width=152;canvas.height=184;canvas.setAttribute('aria-label',root.XiuxianArmoryData.bases[id].name+'实穿');
    const b=root.XiuxianArmoryData.bases[id],summary={look:{[b.slot]:b},worn:{[b.slot]:{base:id,grade:5,level:15}},school:b.school,sets:{}};
    root.XiuxianAvatar.ready.then(()=>{const c=canvas.getContext('2d');root.XiuxianAvatar.draw(c,{x:76,y:164,height:135,atlas:'characters',cell:0,summary,time:.6,preview:true});});
    return canvas;
  }
  root.XiuxianItemIcons={draw,preview,supply,modifications,paintedLayer,paintingFor};
})(globalThis);
