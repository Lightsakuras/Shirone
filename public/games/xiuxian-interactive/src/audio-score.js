(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,recordings=node?require('./audio-tracks.js'):root.XiuxianAudioTracks||{};
  const cues={
    'temple-rain':{title:'雨庙初逢',fallback:'mountain',mood:'雨夜与初逢'},
    'mountain-home':{title:'山门听松',fallback:'mountain',mood:'药庐与宗门日常'},
    'town-life':{title:'人间烟火',fallback:'mountain',mood:'镇巷与乡里'},
    cultivation:{title:'云间一息',fallback:'mountain',mood:'打坐与调息'},
    wilderness:{title:'山河远行',fallback:'mountain',mood:'远行与开阔山川'},
    mystery:{title:'暗巷遗迹',fallback:'tomb',mood:'夜探、墓道与封印遗迹'},
    battle:{title:'拔剑照影',fallback:'battle',mood:'普通战斗'},
    'battle-major':{title:'镇关破阵',fallback:'battle',mood:'强敌与守关'},
    reunion:{title:'故人灯下',fallback:'mountain',mood:'重逢与亲友'},
    farewell:{title:'浮生归途',fallback:'mountain',mood:'旧事收束与终章'}
  };
  const towns=new Set(['qingyang','qingyang-charity','apricot-village','xinghua','village','tianji-market']);
  const homes=new Set(['garden','hehuan','shushan','shushan-main','shushan-commons','sect-hall']);
  const ruins=new Set(['wangyard','forest','crypt','tomb','tower-duty','tower-seal','tower-upper','guixu-west','guixu-east','guixu-core','demon-blood-cavern','reincarnation-hall','world-mill']);
  function select(game,context={}){
    if(!game)return 'mountain-home';const s=game.state,mode=context.mode||'',title=context.title||'';
    if(s.campaign?.ending)return 'farewell';
    const enemies=game.activeEnemies?.()||[],fight=!!s.campaign?.battle||s.chapter?.tomb?.stage==='battle'&&s.map==='tomb'||s.run?.phase==='active'&&['hunt','boss'].includes(s.run.room)||s.sectWorld?.escort?.phase==='battle'||enemies.some(e=>e.hp>0&&(e.wind>0||s.map==='ruins'&&Math.hypot(e.x-s.x,e.y-s.y)<260));
    if(fight)return s.run?.room==='boss'||s.map==='tomb'||enemies.some(e=>e.hp>0&&['wang','keeper'].includes(e.kind))||/tribulation|ascent|final|world_mill|world-mill/.test(s.campaign?.battle?.id||'')?'battle-major':'battle';
    if(mode&&(context.cue==='farewell'||s.map==='tomb'&&s.chapter?.tomb?.stage==='farewell'&&mode==='chapter'||/终章|告别|寿终|归凡/.test(title)))return 'farewell';
    if(mode==='reunion'||mode&&context.cue==='reunion')return 'reunion';
    if(mode&&(context.cultivation===true||/境界|运气|调息|实修|内观|修行|修为/.test(title)))return 'cultivation';
    if(/重逢|结契|相伴|赠簪|亲友|故人|团聚/.test(title)&&mode)return 'reunion';
    if(['temple','floodplain'].includes(s.map))return 'temple-rain';
    if(ruins.has(s.map))return 'mystery';
    if(towns.has(s.map)||/village|town|market|apricot/.test(s.map))return 'town-life';
    if(homes.has(s.map))return 'mountain-home';
    return 'wilderness';
  }
  function track(id){const cue=cues[id]||cues['mountain-home'],record=Object.hasOwn(recordings,id)?recordings[id]:null;return {id,title:record?cue.title:'旧版临时配乐',plannedTitle:cue.title,mood:cue.mood,ready:!!record,file:record?.file||cue.fallback+'.wav'};}
  const pools={
    daily:['mountain-home','town-life','wilderness','cultivation','reunion'],
    mystery:['mystery','temple-rain','wilderness','farewell'],
    battle:['battle','battle-major','mystery','wilderness'],
    ending:['reunion','farewell','mountain-home','cultivation']
  };
  function playlistFor(cueId, extraTracks=[]){
    const key = ['battle','battle-major'].includes(cueId)?'battle':['reunion','farewell'].includes(cueId)?'ending':['mystery','temple-rain'].includes(cueId)?'mystery':'daily';
    const list=pools[key], start=Math.max(0,list.indexOf(cueId));
    return [...list.slice(start),...list.slice(0,start)].map(track).concat(extraTracks.filter(t=>t.pool===key||t.pool==='general'&&key!=='battle'));
  }
  const api={cues,select,track,recordings,playlistFor};if(node)module.exports=api;else root.XiuxianAudioScore=api;
})(globalThis);
