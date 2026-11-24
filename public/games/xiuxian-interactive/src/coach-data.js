(function (root) {
  'use strict';
  const step = (id, anchor, title, body, advance, extra = {}) =>
    ({id, anchor, title, body, placement: 'auto', advance, ...extra});
  const segments = {
    A: {name:'初入山门', steps:[
      step('vitals','.player-status > div','看气血灵力','气血见底即败，施展功法需耗灵力。动身前先扫一眼这两条。','next'),
      step('guide','#guide','读镇纸条','不知往哪走就看这里。镇纸条会随眼下事务指路。','next'),
      step('walk',['#control-badge','.control-line','#guide'],'走几步','按 {move} 走几步，朝镇纸条所指方向前行。','event',{light:true}),
      step('interact',['#interact','#guide'],'走近再交互','走近人物或器物，浮现名号后按 {interact} 交谈或查看。','event',{light:true,placement:'right'}),
      step('quest',['#task-tracker > summary','#task-tracker'],'看当前委托','展开右上的委托与札记，看看下一步该去哪里。','click'),
      step('destiny','#storyline-open','看命运剧情线','点「江湖」或按 P 展开命途长卷，可查所在节点与破雾条件。','next')
    ]},
    B: {name:'随身行囊', steps:[
      step('quick',['#hotbar','.actionbar'],'认快捷栏','每格显示符药余量，按 {quick} 即可取用。','next'),
      step('bag',['#bag-rail-open','[data-hub="hub-bag"]'],'打开行囊','按 {bag} 或点行囊，查看随身材料、符药与信物。','key',{action:'bag',result:'bag'}),
      step('inspect','.inventory-grid','查看一件物品','点选一件物品，右侧即见用法与效用。','click',{panel:'bag',match:'[data-inspect]'}),
      step('detail','.item-detail','读物品详情','何时用、用了有何效用皆列于此。','next',{panel:'bag'}),
      step('bag-close','#modal-close','收起行囊','点右上角合上行囊，重回山路。','event',{panel:'bag',result:'field'})
    ]},
    C: {name:'初次御敌', steps:[
      step('auto','#sword-slot','自主出剑','近敌会依姿态自动出剑，符药则由你亲手调配。','next',{light:true,panel:'encounter'}),
      step('command','#tactics-open','暂停下令','按 {tactics} 或点暂停下令，战场即刻定格。','key',{panel:'encounter',action:'tactics',result:'tactics',light:true}),
      step('stance','.tactics-stances','定姿态','三式姿态任选其一，定下接敌章法。','click',{panel:'tactics',match:'[data-stance]'}),
      step('target','.tactics-targets','选主攻目标','点选敌手设为主攻目标，普攻与符术皆优先落向它。','click',{panel:'tactics',match:'[data-target]'}),
      step('order',['.tactics-actions:has([data-coach-order])','.tactics-sect-actions:has([data-coach-order])'],'备一招','点选一招功法或符药备好，落令执行时方才消耗。','click',{panel:'tactics',match:'[data-coach-order]'}),
      step('execute','#tactics-execute:enabled','执行并继续','点「执行并继续」，指令即刻生效并恢复战局。','click',{panel:'tactics',result:'field'})
    ]},
    D: {name:'法宝与功法', steps:[
      step('armory',['#armory-open','[data-hub="hub-armory"]'],'打开器藏','点右下角的器藏，法宝与配装都收在这里。','click',{result:'armory'}),
      step('gear',['[data-hub-tab="gear"]','#relic-open'],'打开法宝藏阁','点法宝藏阁，查看已入藏的法宝与随身佩槽。','click',{panel:'armory',result:'gear'}),
      step('slots','.gear-slots','认装备栏','这三格为随身佩槽。点空槽可筛出可佩法宝。','next',{panel:'gear'}),
      step('compare',['.relic-trait','.empty-collection'],'看法宝差值','与身上同源法宝相比，数值增减会以箭头标明。','next',{panel:'gear'}),
      step('gear-close','#modal-close','合上藏阁','点右上角合上藏阁，再去修行页看看功法。','click',{panel:'gear',result:'field'}),
      step('practice','#cultivation-open','查看修行','点修行入口，查看六境阶梯与已习功法。','click')
    ]},
    cultivationHelp:{name:'境界突破',panel:'cultivation',steps:[
      step('ladder','.realm-ladder','看六境阶梯','金框为当前境界；本阶突破缺口列在气脉图旁。','next'),
      step('requirements','.cultivation-overview','补齐条件再运气','炼气先攒心得，再回药庐蒲团运气。点缺口旁按钮即可追踪。','next')
    ]},
    houseHelp:{name:'山门进退',panel:'sects',steps:[
      step('admission','.house-path','沿三步入门','入门须见引路人、办妥差事、亲认门规三步；入册后此处显职阶。','next'),
      step('rules','.house-rules','查晋升与退出规则','展开折页，可查本门晋升门槛与退宗规矩。','next')
    ]},
    expeditionHelp:{name:'旧阵准备',panel:'expedition',steps:[
      step('gate','.expedition-control','看入阵前置','办妥「药庐取匣」即可入阵；点追踪可标出眼下目标。','next'),
      step('kit','.preparation-supplies','核对入阵符药','箭头右侧为入阵保底符药数；动身前亦可切换三套配装。','next')
    ]},
    storylineHelp:{name:'命途长卷',panel:'storyline',steps:[
      step('here',['.thread-node.current','.thread-tools'],'找到此刻身处','金框为当前节点。点指引前往，合卷即可循标而行。','next'),
      step('fog',['.thread-node.fog','.thread-volumes'],'读破雾条件','近处迷雾会标出前置条件；点「已历」可回看旧程。','next')
    ]},
    map:{name:'山河舆图',steps:[
      step('map',['#world-map-open','#trial-open'],'展开舆图','按 {worldMap} 或点舆图，查当前所在与可通行的山路。','key',{action:'worldMap',result:'worldAtlas'})]},
    cases:{name:'青阳案卷',steps:[
      step('case-hall','#storyline-open','打开江湖','从江湖进入青阳案卷。','click',{result:'storyline'}),
      step('case',['[data-hub-tab="story"]','#case-open'],'翻开案卷','点案卷翻看青阳来信，查案时在此印证线索。','click',{panel:'storyline'})]},
    sect:{name:'宗门',steps:[
      step('sect-hall','#storyline-open','打开江湖','从江湖进入宗门与两脉。','click',{result:'storyline'}),
      step('sect',['[data-hub-tab="sects"]','#sects-open'],'查看宗门','按 {sects} 或点宗门，查四门规矩、门中人物与今日差事。','key',{action:'sects',result:'sects',panel:'storyline'})]},
    book:{name:'山行闻见录',steps:[
      step('book',['#codex-open','#almanac-top'],'翻闻见录','按 {almanac} 或点典籍，随时查阅生僻地名、器物与规矩。','key',{action:'almanac',result:'almanac',menu:true})]},
    scroll:{name:'存档与设置',steps:[
      step('save','#coach-save','手动保存','在卷菜单点保存进度，将此刻行程记入本机。','click',{menu:true}),
      step('settings','#settings-top','打开玩家设置','点玩家设置，可调声画、改键位或重看引路。','click',{menu:true,result:'settings'})]},
    pause:{name:'山行暂歇',steps:[
      step('pause','#resume','暂停与继续','按 {pause} 暂停山中光阴；点继续历练即刻回场。','click',{panel:'pause',result:'field'})]}
  };
  const labels = {entry:'界面引路',group:'新手引路',toggle:'开启界面引路',next:'下一步',back:'上一步',
    skip:'跳过本段',disable:'关闭全部引路',confirm:'跳过本段？',stay:'接着看',yes:'跳过本段',
    invite:'是否开启界面引路？',accept:'看一遍',decline:'不用了',save:'保存进度',replay:'重看',
    pending:'已排队',noOrderTitle:'暂缓出招',noOrderBody:'尚未备招。点「只继续御敌」即可留存符药、恢复战局。'};
  const tokens = {move:'W A S D',quick:'1–5'};
  function format(body, controls, hints) {
    return body.replace(/\{(\w+)\}/g, (_,action) => tokens[action] ? hints.formatKeys(tokens[action],controls) : controls.label(action,{primary:true}));
  }
  function copy(step,controls,hints) {
    const body=format(step.body,controls,hints);
    if(body.length<=45)return {body,keys:''};
    const token=step.body.match(/\{\w+\}/)?.[0];
    return token ? {body:step.body.replace(/\s*\{\w+\}\s*/,'下方按键'),keys:format(token,controls,hints)} : {body,keys:''};
  }
  const api = {segments,labels,format,copy};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.XiuxianCoachData = api;
})(globalThis);
