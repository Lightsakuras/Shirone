(function(root,factory){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const api=factory(node?require('./almanac-play.js'):root.XiuxianAlmanacPlay,node?require('./almanac-world.js'):root.XiuxianAlmanacWorld,node?require('./catalog.js'):root.XiuxianCatalog,node?require('./campaign-data.js'):root.XiuxianCampaignData,node?require('./data.js'):root.XiuxianData,node?require('./sect-world-data.js'):root.XiuxianSectWorldData,node?require('./almanac-experience.js'):root.XiuxianAlmanacExperience);
  if(node)module.exports=api;else root.XiuxianAlmanac=api;
})(globalThis,function(play,world,catalog,campaign,base,sectWorld,experience){
  'use strict';
  if(!play||!world||!catalog||!campaign)throw Error('山行闻见录资料尚未加载完整');
  const order=['start','world','people','journey','combat','growth','craft','sects','saves','reference'];
  const categories=[...play.categories,...world.categories,{id:'reference',title:'器物与数值',description:'逐项查阅用途、基础数值与实际生效条件。'}].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id));
  const references=catalog.entries.map(entry=>({
    id:'reference-'+entry.id.replace(':','-'),category:'reference',title:entry.name,
    summary:entry.usage,keywords:[catalog.categories.find(c=>c.id===entry.category)?.name||'',entry.name],
    spoiler:entry.spoiler===true,catalogId:entry.id,
    sections:[
      {heading:'怎样使用',paragraphs:[entry.usage]},
      ...(entry.stats.length?[{heading:'基础数值与参数',table:{headers:['项目','当前值'],rows:entry.stats.map(s=>[s.label,String(s.value)])}}]:[]),
      {heading:'生效条件与注意事项',bullets:entry.conditions.map(text=>text.replace('严格验证的revision4、5、6旧档','经过验证的较早版本旧存档'))}
    ],related:[],sources:[...entry.source]
  }));
  const maps=[...Object.entries(base?.maps||{}),...Object.entries(sectWorld?.maps||{}),...Object.entries(campaign.maps)];
  const indices=[
    {id:'journey-map-index',category:'journey',title:'山河地图索引',summary:'查阅药庐、后山、药站与后续各地的场景主题。',keywords:['地图','地点','山河','行路'],spoiler:true,
      sections:[{heading:'如何使用这张索引',paragraphs:['场景需要沿剧情亲自抵达。这里介绍地点，不会开启传送，也不会跳过路上的事务；当前应去哪里，先看“此刻可做”和远行案簿。','首章还会经过破庙、青阳镇、王宅、墓林与墓道。以下分列药庐、后山、行旅药站及后续三十一处场景；旧阵每次历练中的分段房间不作为新的城镇计算。']},
        ...maps.map(([id,map])=>({heading:map.name,paragraphs:[map.sub,map.layout].filter(x=>typeof x==='string'&&x.length)}))],related:['start-first-steps'],sources:['src/data.js#maps','src/sect-world-data.js#maps','src/campaign-data.js#maps','src/story-data.js#maps','src/chapter-data.js#maps']},
    {id:'people-character-index',category:'people',title:'续章人物名录',summary:'查阅山门、村镇、各方势力与接班人的身份和所求。',keywords:['人物','名录','角色','继任'],spoiler:true,
      sections:[{heading:'人物与当前行程',paragraphs:['本页收录后续行程的四十二位人物。这里的身份与所求是背景介绍；他们此刻是否在场、已经历过哪些事，以及由谁接办，应以你本次旅程的人物记录为准。查阅名字不会自动相识，已故者也不会因翻阅而返回。']},
        ...Object.values(campaign.people).map(p=>({heading:p.name,paragraphs:[p.role,p.goal].filter(x=>typeof x==='string'&&x.length)}))],related:[],sources:['src/campaign-data.js#people','src/campaign-m6-story-data.js']},
    {id:'journey-ending-index',category:'journey',title:'三十二终局全览',summary:'完整列出各条旅程可能抵达的终点，含结局内容。',keywords:['结局','终局','全览','通关'],spoiler:true,
      sections:[{heading:'先决定自己的归途',paragraphs:['每次旅程走向一个属于此身的终点，不要求一个角色同时完成全部路线。结局取决于已走过的事务、境界、身体与明确的抉择；看到结局介绍不会解锁它。终局之后主线与场中时间停止，可回看经历，也可另开独立旅程。','下列内容包含完整结局摘要。若想保留初见体验，请返回目录并关闭剧情揭示。']},
        ...Object.values(campaign.endings).map(e=>({heading:e.title,paragraphs:[e.summary]}))],related:['saves-safety'],sources:['src/campaign-data.js#endings','src/campaign-branches-data.js']}
  ];
  const articles=[...play.articles,...experience.articles,...world.articles,...indices,...references];
  const byId=new Map(articles.map(a=>[a.id,a]));
  if(byId.size!==articles.length)throw Error('山行闻见录条目编号重复');
  const normalize=value=>String(value??'').normalize('NFKC').toLocaleLowerCase().trim();
  const bodyText=article=>[article.title,article.summary,...(article.keywords||[]),...article.sections.flatMap(s=>[s.heading,...(s.paragraphs||[]),...(s.bullets||[]),...(s.table?.headers||[]),...(s.table?.rows||[]).flat()])].filter(Boolean).join(' ');
  const searchText=new Map(articles.map(a=>[a.id,normalize(bodyText(a))]));
  function search({query='',category='all',spoilers=false}={}){
    const phrase=normalize(query).slice(0,500),words=phrase.split(/\s+/).filter(Boolean);
    const result=articles.filter(a=>(spoilers===true||!a.spoiler)&&(category==='all'||!category||a.category===category)&&words.every(word=>searchText.get(a.id).includes(word)));
    if(!words.length)return result;
    const rank=a=>normalize(a.title)===phrase?0:words.every(word=>normalize(a.title).includes(word))?1:(a.keywords||[]).some(word=>normalize(word)===phrase)?2:3;
    return result.sort((a,b)=>rank(a)-rank(b));
  }
  const get=id=>byId.get(id)||null;
  const text=value=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const cell=value=>text(value).replace(/\|/g,'\\|').replace(/\r?\n/g,'<br>');
  function toMarkdown({spoilers=true}={}){
    const visible=articles.filter(a=>spoilers===true||!a.spoiler),visibleIds=new Set(visible.map(a=>a.id));
    const lines=['# 修仙命运录 · 山行闻见录','',`玩家百科与入门教程 · v${catalog.version}`,'',spoilers?'**完整本含剧情揭示与全部终局摘要。** 想保留初见体验时，可先读“初入仙途”和系统玩法，暂缓阅读标有“剧情揭示”的条目。':'这是隐藏剧情揭示的入门本；游戏内可自行开启剧情条目，或下载完整本。','',
      '离线单人二维修仙冒险。以境界、功法、法宝、符药与战术搭配推动战斗，从五种来处走向自己的归途。翻阅本册不会领取物品、建立关系或推进剧情。','',
      '## 怎样使用本册','',
      '- 第一次游玩，先读下方入门教程，再按自己遇到的问题查目录。游戏顶部、开局页、暂停菜单均可打开山行闻见录，F1也可开启。',
      '- 游戏内可按分类和关键词查阅；翻阅时游戏暂停。关闭书册回到原处，当前战术姿态保持不变。',
      '- 器物附录列的是基础数值和触发条件。气血上限100；能运灵时灵力上限100，归凡或封功后灵力为0，当前身体规则优先。',
      '- 世界中的人物去留、关系和路线以自己的行程为准；百科介绍不会代替亲自调查和明确选择。','',
      '## 目录','',...categories.filter(c=>visible.some(a=>a.category===c.id)).map(c=>`- [${text(c.title)}](#category-${c.id})`),''];
    for(const category of categories){
      const list=visible.filter(a=>a.category===category.id);if(!list.length)continue;
      lines.push(`<a id="category-${category.id}"></a>`,'','## '+text(category.title),'',text(category.description),'');
      if(category.id!=='reference')lines.push(...list.map(a=>`- [${text(a.title)}](#${a.id})${a.spoiler?'（剧情揭示）':''}`),'');
      else lines.push('可搜索器物、功法或条件词；逐条列明用途、数值与触发条件。','');
      for(const article of list){
        lines.push(`<a id="${article.id}"></a>`,'','### '+text(article.title)+(article.spoiler?'（剧情揭示）':''),'',text(article.summary),'');
        for(const section of article.sections){
          if(section.heading)lines.push('#### '+text(section.heading),'');
          for(const paragraph of section.paragraphs||[])lines.push(text(paragraph),'');
          if(section.bullets?.length)lines.push(...section.bullets.map(p=>'- '+text(p)),'');
          if(section.table)lines.push('| '+section.table.headers.map(cell).join(' | ')+' |','| '+section.table.headers.map(()=>'---').join(' | ')+' |',...section.table.rows.map(row=>'| '+row.map(cell).join(' | ')+' |'),'');
        }
        const links=(article.related||[]).filter(id=>visibleIds.has(id));
        if(links.length)lines.push('接着查阅：'+links.map(id=>`[${text(byId.get(id).title)}](#${id})`).join('、')+'。','');
      }
    }
    return lines.join('\n').trimEnd()+'\n';
  }
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);for(const x of Object.values(value))freeze(x);}return value;}
  freeze(categories);freeze(articles);
  return Object.freeze({version:catalog.version,title:'山行闻见录',categories,articles,search,get,toMarkdown,counts:Object.freeze({narrative:play.articles.length+world.articles.length+experience.articles.length,references:references.length,indices:indices.length,campaignMaps:Object.keys(campaign.maps).length,people:Object.keys(campaign.people).length,endings:Object.keys(campaign.endings).length})});
});
