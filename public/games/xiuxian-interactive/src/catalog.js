(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports;
  const E=node?require('./campaign.js'):root.XiuxianEngine,D=node?require('./data.js'):root.XiuxianData;
  const R=node?require('./expedition-data.js'):root.XiuxianExpeditionData,C=node?require('./chapter-data.js'):root.XiuxianChapterData,S=node?require('./story-data.js'):root.XiuxianStoryData;
  const Campaign=node?require('./campaign-data.js'):root.XiuxianCampaignData;
  const campRealmName=id=>(id==='zhuji'?C.ranks[4]:Campaign.realms[id].name).replace(/初期$/,'');
  const campaignHealingBases=E.campaignHealingBases;if(!campaignHealingBases)throw Error('回春境界规则尚未加载');
  const categories=Object.entries({item:'行囊道具',relic:'法宝',memory:'器忆',affix:'词缀',boon:'本局灵契',resonance:'搭配共鸣',realm:'境界',skill:'功法',enemy:'敌人与机关',recipe:'配方',system:'养成与规则',background:'身世与阵营',sect:'宗门与两脉',token:'信物与案卷'}).map(([id,name])=>({id,name}));
  const entries=[],stat=(label,value)=>({label,value}),pairs=o=>Object.entries(o).map(([label,value])=>stat(label,value));
  const Encounter=node?require('./encounter-data.js'):root.XiuxianEncounterData;
  function add(category,key,name,usage,stats={},conditions=[],source=[],extra={}){entries.push({id:category+':'+key,key,category,name,usage,stats:Array.isArray(stats)?stats:pairs(stats),conditions,source,...extra});}
  const itemDetails={
    fire:{usage:'投符焚烧范围内敌手或枯藤；可破竹甲，适合配定脉气隙、余烬与回灵器物。',stats:{'基础直伤':36,'施放距离上限':250,'命中半径':92,'燃烧持续（秒）':3,'燃烧伤害／秒':8},conditions:['直伤先乘境界术法倍率，再加余烬器忆每件 7、借火还灵 12。','定脉气隙另加 18×术法倍率并消耗气隙；持续灼烧不乘境界倍率。','持续燃烧按模拟帧结算，致死补刀与固定联动另计；不能把总伤害写死为 60。','每次消耗 1 张。空放也消耗；暂停下令会先检查目标、距离与遮挡。']},
    needle:{usage:'投针造成小范围伤害并令敌减速；可截断王屠户聚阴、速破石纹甲，并衔接回风诀与照雪鉴。',stats:{'基础直伤':15,'施放距离上限':250,'命中半径':60,'基础减速（秒）':5,'霜后见刃延长至（秒）':8,'普通敌人减速后速度倍率':0.32},conditions:['直伤乘境界术法倍率；定脉气隙加成同火符。','减速期间可触发照雪鉴、凝霜器忆与回风诀额外伤害。','每次消耗 1 枚；王屠户减速后速度倍率为 0.35。']},
    incense:{usage:'点香把普通守卫引离原位，方便收势绕行；也可在香雾范围内触发听雨铃与镇香回澜。',stats:{'基础持续（秒）':8,'施放距离上限':250,'感应范围':470},conditions:['持续时间 = 8 + 留香鼎阶位值 + 循香不争 4。','守阵古磬不追香；听雨铃等剑击增伤仍按目标是否处于香的 470 范围判定。','每次消耗 1 支；障碍内无法放置。引香不保证敌人停止已经起手的攻击。']},
    potion:{usage:'救急回血并兼补少量灵力；与温养茶、杏花糕共吃药食加成，配含露瓶还可附带护身。',stats:{'基础回气血':45,'基础回灵力':30},conditions:['与温养茶、杏花糕共用药食加成：每件生息器忆 +4、每件温玉 +2、草木回春 +15、百草药囊 +5 气血。','含露瓶可追加护身；气血、灵力都满时不消耗。']},
    tea:{usage:'偏重回灵的随身茶饮；同样受药食加成与含露瓶护身，适合连放功法后补气。',stats:{'基础回气血':20,'基础回灵力':45},conditions:['享受药食加成与含露瓶护身；气血、灵力都满时不消耗。','月露寻药通关获得永久图谱；图谱解锁后在药庐煎制。']},
    cake:{usage:'随身点心，小幅回血并触发药食加成与含露瓶护身；气血已满时不会误吃。',stats:{'基础回气血':18,'基础回灵力':0},conditions:['享受药食加成和含露瓶护身。气血已满时不消耗，即使灵力未满。']},
    ward:{usage:'在敌群围攻或强敌重斩落下前开启护身，大幅减免来袭伤害。',stats:{'持续（秒）':12,'伤害减免':'65%','剩余伤害倍率':0.35},conditions:['与普通格挡和器忆／词缀减伤相乘，不相加。','护身已经生效时拒绝再次使用；由功法或法宝产生的护身也占同一个状态。']},
    qingxin:{usage:'立解余毒并在墓道毒烟中撑起短时防毒护持，小幅回血；未中毒且防毒充裕时不会误耗。',stats:{'基础回气血':8,'防毒（秒）':20,'百草药囊额外回血':5,'定脉符笔额外回灵':8},conditions:['不享受生息器忆、温玉、草木回春和含露瓶的药食效果。','防毒剩余大于 15 秒且未中毒时不消耗；并非通用回血药。']},
    herb:{usage:'炼丹、制护身符、合香、煎茶与研清心散的材料。',stats:{'普通采集每处':2,'药庐身份每处':3},conditions:['月露草采集获得的也是青灵草库存；秘境辨药专长可多采 1 份并回 8 气血。','普通材料，无常驻魔法光效。']},
    water:{usage:'炼回气丹、温养茶、清心散的材料。',stats:{'药庐石井每次取水':2},conditions:['石井同时将气血、灵力补满；与查案工具“一壶温水”分开记录。','天机阁修推演用山泉水与灵砂，第一至第三层每样依次需 2、4、6 份。']},
    paper:{usage:'制燃火符、护身符或寒针。',stats:{'库存上限':999},conditions:['与案卷里的镇妖符样、血色符纸分开；证物不能代替材料。','天机阁修布局用符纸与灵砂，第一至第三层每样依次需 2、4、6 份。每核对一班观测需符纸 1 张。']},
    dust:{usage:'制燃火符、寒针和引灵香。',stats:{'常规击散敌人获得':2},conditions:['取自敌人击败结算、旧阵残箱等；训练木傀不按普通敌人掉落。','观星台请传先手篇需符纸 2、灵砂 3，留子篇需符纸 3、灵砂 2。']},
    box:{usage:'带回药庐交付沈灵薇，推进委托。',stats:{'交付消耗':'木匣库存清零','交付奖励':'杏花糕 ×2'},conditions:['任务物件，不参与炼制；交付后可继续旧阵刷宝。']}
  };
  for(const [key,d]of Object.entries(D.items)){const x=itemDetails[key];if(!x)throw Error('缺少道具用途记录：'+key);add('item',key,d.name,x.usage,x.stats,x.conditions,['src/data.js#items','src/game.js#useItem','src/expedition.js#useItem','src/chapter.js#useItem','src/tactics.js#hitEnemy'],{kind:'item',spoiler:key==='box'});}
  const relicRules={
    jade:['成功格挡（含手动精准格挡）且仍存活时触发；与守而后发灵契共用 2 秒回复间隔。'],
    bell:['剑击目标距当前引灵香小于 470 即生效；不要求敌人实际追香。'],
    flask:['回气丹、温养茶、杏花糕实际都会触发；清心散不触发。','回春诀的护身也取 max(2, 含露瓶阶位值)；已有更长护身不会被缩短。'],
    mirror:['剑击任意处于减速状态的目标，包括寒针与定脉诀。'],
    scroll:['火符每命中一名存活敌人触发；灵力上限 100。'],
    bamboo:['闪避后 3 秒内下一次有效剑击消费窗口；不是持续增伤。'],
    censer:['每次点香追加持续时间，可与循香不争相加。'],
    bracers:['成功格挡后储存一次强化；下一次有效剑击消耗，重复格挡刷新而非累加。'],
    inkstone:['仅秘境本间首次成功使用火符补针；不要求命中；每间重置。'],
    lantern:['火符直接击败或目标仍燃烧时击败可回血；不要求最后一击一定是火符。'],
    map:['完成秘境房间时生效，在基础 +12 灵力之外追加；未过关撤退不触发。'],
    chime:['每第三次有效剑击触发，震击命中点周围 145 范围内仍存活敌人（可包含主目标）。','震击固定伤害不吃境界术法倍率；不递归触发自身。']
  };
  for(const [key,d]of Object.entries(R.relics))add('relic',key,d.name,key==='flask'?'药食或回春诀产生护身。':key==='mirror'?'剑击减速目标追加伤害。':d.desc,{'本命路数':R.paths[d.path].name,...Object.fromEntries(R.tiers.map((n,i)=>[n,d.values[i]])),'初识→通灵（灵蕴）':25,'通灵→宝器（灵蕴）':60},['必须装备生效；最多 3 件，同一基础法宝不能同时装备多个词缀版本。','升阶只能在药庐、秘境之外进行。',...relicRules[key]],['src/expedition-data.js#relics','src/expedition.js#power','src/expedition.js#upgrade','src/tactics.js#castSkill'],{kind:'relic'});
  const memoryStats={blade:{'每件剑击加伤':3},frost:{'每件对减速敌人剑击加伤':6},ember:{'每件火符直伤加成':7},scent:{'每件香范围内剑击加伤':7},ward:{'每件加算减伤':'8%'},herb:{'每件药食与回春诀额外回血':4}};
  const practice={blade:'每次有效剑击（同次挥剑多个目标只计一次）',frost:'寒针命中敌人',ember:'火符命中敌人',scent:'点香时有活敌位于 470 范围',ward:'成功格挡',herb:'使用回气丹／茶／糕，或采秘境月露草'};
  for(const [key,d]of Object.entries(R.paths))add('memory',key,d.name,d.desc,memoryStats[key],['装备中尚未定型的法宝，某路实践累计 6 次后永久留下该器忆；首次达到者定型，不能再改。','多个已装备法宝的同类器忆按件数相加。','实践动作：'+practice[key]],['src/expedition-data.js#paths','src/expedition.js#practice','src/expedition.js#hitEnemy','src/tactics.js#castSkill']);
  for(const [key,d]of Object.entries(R.affixes))add('affix',key,d.name,d.desc,{},['按装备件数叠加；同一法宝的不同词缀属于不同收藏条目。',key==='calm'?'格挡时仍每件 +0.4 灵力／秒；境界额外回灵只在非格挡时生效。':key==='firm'?'与守心器忆加算，合计减伤封顶 50%，再与其他减伤相乘。':'固定加成，不乘境界术法倍率。'],['src/expedition-data.js#affixes','src/expedition.js#affix']);
  for(const [key,d]of Object.entries(R.boons))add('boon',key,d.name,d.desc,{},['本局临时选择，不能重复选同一项；失败、撤退或通关结束本局后失效。',key==='herb'?'额外药食回血用于回气丹、温养茶、杏花糕，不用于清心散或回春诀。':key==='blade'?'闪避后强化窗口为 3 秒，下一次有效剑击后消耗。':'与对应法宝、器忆效果按各自条件联动。'],['src/expedition-data.js#boons','src/expedition.js']);
  for(const [key,d]of Object.entries(R.resonances))add('resonance',key,d.name,d.desc,{'所需路数':d.paths.map(x=>R.paths[x].name).join(' ＋ ')},['路数集合来自已装备法宝本命路数、已定型器忆，以及本局灵契；凑齐即生效，不要求两件特定法宝。',key==='frostblade'?'第三段剑击命中任意减速目标可触发；额外 12 每次挥剑至多触发一次。':key==='emberherb'?'仅秘境每间最多回补 2 次；火符直接击败或燃烧状态下由任意来源击败都可触发。':'成功格挡且香距角色小于 180；冷却 3 秒。'],['src/expedition-data.js#resonances','src/delve.js']);
  E.combatRanks.forEach((d,i)=>add('realm',String(i),C.ranks[i],'境界提供多维增益；首章上限筑基初期。',{'剑击总加成':d.blade,'术法倍率':1+d.spell,'敌袭减伤':Math.round(d.defence*100)+'%','非格挡回灵／秒（无养息）':4+d.regen,'升入此境心得':i===0?'初始':i===4?2:1},['剑击总加成已包含旧的每阶 +2，不可再次相加。','术法倍率作用于火符／寒针基础直伤、攻击功法及指定气隙加伤；固定器物加伤和灼烧另计。','境界减伤仅敌人攻击，不抵扣墓道机关或毒烟。','完成续章三段凝丹劫并复验领取后，可继续升入金丹；该境界另列。'],['src/tactics.js#combatRanks','src/chapter.js#breathe']));
  const skillDetails={sword:{usage:'周身剑气；先寒针或定脉减速，再回风可提高伤害。',stats:{'基础伤害':38,'减速目标额外基础伤害':14,'作用半径':145,'护身（秒）':1.5},conditions:['上述两项伤害都乘境界术法倍率；不会套用普通剑击器物加伤。']},scholar:{usage:'控制近敌并留下气隙，让下一次火符或寒针更强。',stats:{'基础伤害':22,'作用半径':190,'减速（秒）':5,'气隙（秒）':6,'下次火符／寒针额外基础伤害':18},conditions:['伤害和气隙加伤均乘境界术法倍率；一次气隙被火符或寒针消费一次。','造成气血伤害或实际削甲、且仍存活的目标留下气隙；切图、失败或读档清理气隙。']},medicine:{usage:'治疗、清毒与护身，适合留出续航窗口。',stats:{'炼气初期基础回血':22,'每炼气序号额外回血':2,...Object.fromEntries(Object.entries(campaignHealingBases).map(([id,n])=>[campRealmName(id)+'初期基础回血',n])),'每件生息器忆额外回血':4,'防毒（秒）':8,'基础护身（秒）':2},conditions:['炼气回血 = 22 + 首章境界序号×2 + 有效生息器忆件数×4；筑基及以后按本境初期基值＋当前境最高实际实修小阶的回春加量＋有效生息器忆件数×4。','各境实修加量见本境三段实修条目，不叠加旧境或较低小阶；气血最多恢复到100。不吃温玉、药囊和草木回春加成。','归凡或封功不能施展回春，实际治疗与只读预览均为0；普通药食另按自己的恢复规则使用。','护身时长取已有剩余、2 秒、含露瓶值的最大值。']}};
  for(const [key,d]of Object.entries(C.skills)){const x=skillDetails[key];add('skill',key,d.name,x.usage,{'耗灵':d.cost,'调息（秒）':d.cooldown,...x.stats},['完成对应身份历练解锁；允许跨修。','功法共享剩余调息时间，换功法不能重置冷却；自动御敌不会自行施放。',...x.conditions],['src/chapter-data.js#skills','src/chapter.js#castSkill','src/tactics.js#castSkill','src/tactics.js#hitEnemy','src/encounters.js#hitEnemy',...(key==='medicine'?['src/campaign.js#healingAmount','src/campaign-m6-data.js']:[])],key==='medicine'?{healingBases:{...campaignHealingBases}}:{});}
  for(const [key,d]of Object.entries(R.enemies))add('enemy',key,d.name,'秘境阵灵；根据路线和险阵调整强度。',{'第一段基础气血':d.maxHp,'基础移速':d.speed,'基础伤害':d.damage,'起手距离':d.reach,'命中半径':d.radius,'起手预警（秒）':key==='keeper'?1.05:0.85,'普通招后冷却（秒）':1.25},[key==='keeper'?'气血固定 380；半血以下招后冷却 0.7 秒；不会追香。':'第 n 段气血 = 基础气血 + (n−1)×8。','疾行阵移速 ×1.35，重锋阵伤害 ×1.35。','起手之间至少错开 0.36 秒；普通敌人收招停步 0.32 秒，守关停步 0.46 秒。'],['src/expedition-data.js#enemies','src/expedition.js#chooseRoute','src/expedition.js#enemyStep','src/feel.js#enemyStep']);
  for(const d of D.enemies)add('enemy',d.id,d.kind==='stone'?'旧阵石傀':'旧阵灵影','最初取药匣路线的守卫，可引香绕行。',{'气血':d.maxHp,'移速':d.speed,'基础伤害':d.damage,'起手预警（秒）':0.75,'招后冷却（秒）':1.1},['不受秘境段数与险阵加成；不同于可重复刷宝中的阵灵。'],['src/data.js#enemies','src/game.js#enemyStep']);
  add('enemy','wang','王屠户','聚阴时用近剑或寒针截断气路，再利用破绽。',{'气血':C.bossMaxHp,'重斩／刀气伤害':22,'聚阴伤害':27,'重斩预警（秒）':0.95,'刀气预警（秒）':1.1,'聚阴预警（秒）':1.6,'破绽（秒）':4,'破绽伤害倍率':1.3},['破绽倍率作用于进入墓战层前的伤害；之后的剑页、器忆、法宝等固定加伤另计。','读过壁画，破绽中剑朝东南（面向 x、y 均大于 0.25）再 +24。','半血首次触发援助：角色 +12 气血、敌人破绽 4 秒；不是每次半血都触发。'],['src/chapter-data.js#bossMaxHp','src/tomb.js#hitEnemy','src/tomb.js#enemyStep'],{spoiler:true});
  add('enemy','crypt','墓道机关','观察弩机、翻板和毒烟，工具与清心散提供通过办法。',{'弩箭伤害':15,'弩箭预警（秒）':0.8,'弩箭冷却（秒）':1.5,'未跃过翻板伤害':8,'毒烟每秒伤害':5},['境界敌袭减伤不作用于机关。停止弩机、铺桥、通风是护送时的安全路线。'],['src/tomb.js#step'],{spoiler:true});
  const recipeSources={potion:'初始可制',fire:'初始可制',ward:'初始可制',qingxin:'初始可制',needle:'听雨试锋通关习得',incense:'残碑问脉通关习得',tea:'月露寻药通关习得'};
  for(const [key,d]of Object.entries(D.recipes))add('recipe',key,d.label,'在药庐丹炉／制符台把材料制成 '+D.items[key].name+'。',{'材料':Object.entries(d.cost).map(([id,n])=>D.items[id].name+' ×'+n).join('，'),'产量':d.amount,'单次炉数上限':E.workshopLimit,'解锁':recipeSources[key]},['材料与产量均为每炉数值；一批可选择 1–'+E.workshopLimit+' 炉。','成年且在药庐丹炉 93 距离以内、无秘境或教学战斗、无待处理剧情时才可炼制。','整批材料、产物余量与炼制记录容量全部满足才结算；任一不足都不扣材料、不产出、不推进试录。','旧阵图谱未解锁时不能炼制；批炼不自动解锁配方。'],['src/data.js#recipes','src/expedition-data.js#recipeIds','src/chapter-data.js','src/workshop.js#craftPlan','src/workshop.js#craftBatch']);
  for(const [key,d]of Object.entries(C.tokens))add('token',key,d.name,d.desc,{},['独立信物记录，不占普通材料库存；不作为普通法宝装备。'],['src/chapter-data.js#tokens'],{spoiler:true,tokenId:key});
  const toolUses={linen:['与温水合用安抚张阿婆，取得补述。','竹楔开闩噪声从 14 降为 7；有药庐专长加布巾时降为 3，剑庐专长不需布巾也为 3。'],water:['与干净布巾合用安抚张阿婆；不是炼丹材料“山泉水”。'],wedge:['王宅开闩需卡入 70–85 区间；可配布巾降噪。','也可清墓林落石、卡停弩机，不耗灵力；以运气清落石则耗 12 灵力。']};
  for(const [key,d]of Object.entries(S.tools))add('token','tool-'+key,d.name,d.desc,{},['查案工具独立记录，普通工具不发魔法光效。',...toolUses[key]],['src/story-data.js#tools','src/story.js#openGate','src/tomb.js#clearRubble','src/tomb.js#disableArrows'],{spoiler:true});
  for(const [key,d]of Object.entries(S.evidence))add('token','evidence-'+key,d.name,d.text,{'证据性质':d.type},['案卷独立保管，不能消耗炼制；证据作用以调查与交叉核对为准。'],['src/story-data.js#evidence'],{spoiler:true});
  add('system','health','气血、灵力与伤害结算','看实际加成条件，避免把所有百分比直接相加。',{'气血上限':100,'灵力上限':100,'基础回灵／秒':4,'格挡持续耗灵／秒':4,'每次普通格挡额外耗灵':8,'普通格挡剩余伤害倍率':0.2,'受伤保护（秒）':0.6},['普通敌袭伤害 = 原伤害×(1−境界减伤)×max(0.5,1−0.08×守心件数−0.03×坚心件数)×格挡倍率×护身倍率。','非格挡回灵 = 4 + 境界额外回灵 + 0.4×养息件数；格挡时 = −4 + 0.4×养息件数。','顺心轻松下实受伤害 ×0.45、对敌伤害 ×1.65、敌方蓄势时间 ×1.35。脱战 2.5 秒后每秒恢复气血与灵力各 18 点，败退补足应急符药。采药和每炉丹符额外产出一份。经典原版沿用表列基础值。','万象天渊携带八槽装备、已学功法和已佩法宝。药庐炼气阶段顺心难度维持原倍率；汉墓、金丹、元婴、化神及以上的敌方有效耐久与攻击分别乘 1.15、1.45、1.85、2.4。砺剑挑战再乘 1.55，掉落品阶仍受进度限制，锻造材料 ×1.5。','各治疗与回灵均受 100 上限限制。普通格挡要求灵力至少 8；守势不会自动精准格挡。'],['src/game.js#takeDamage','src/expedition.js#takeDamage','src/tactics.js#takeDamage','src/tactics.js#combatProfile']);
  add('system','blade','普通剑击与联动','自主普攻也使用实际剑击规则。',{'基础剑击':23,'第一／二／三段冷却（秒）':'0.30 / 0.34 / 0.48','连续剑势保留（秒）':0.9,'普通攻击距离':88,'第三段基础追加':8},['穿戴神兵时按流派攻击：剑 120、雷 300、火 280、冰 290、剑匣 340。天渊每五层镇守首领掉落随层数升阶。八槽锻造独立保存，升品保级，锁词最多两条。强化每级主属性增加原值的 8%，各阶上限依次为 +5、+8、+10、+12、+15、+15。','训练旗标成立时，剑庐身份基础 +9，其他身份 +3；剑页再 +3；境界总加成、鸣锋与器忆之后另加。','减速、香范围、闪避后、格挡后等条件分别追加对应器物／灵契；强化窗口被有效命中消费。','第三段节奏追加 8 与断云磬的第三次有效命中计数是不同机制。','王屠户破绽只放大继承链中到墓战层之前的伤害；不要把最终全部剑击加成都乘 1.3。'],['src/game.js#attack','src/feel.js#attack','src/feel.js#hitEnemy','src/chapter.js#hitEnemy','src/expedition.js#hitEnemy','src/tactics.js#hitEnemy']);
  add('system','orders','自主御敌与暂停下令','角色处理普通攻击；玩家决定目标、功法、符药和进退。',{'自主索敌距离':260,'指定目标追踪上限':320,'接近停止距离':68,'自主出剑距离':88},['迎敌接近直线可达目标；守势原地格挡与出剑；收势停止自主攻防。','手动移动优先；没有复杂绕障寻路。自动行为不花符药、不放功法。','V 暂停时不推进模拟；选指令不扣资源，执行成功才消耗并继续。'],['src/tactics.js#step','src/tactics.js#executeOrder']);
  add('system','upgrade','收藏、升阶与器忆','装备三件法宝，用永久收藏支撑不同搭配。',{'装备槽':3,'法宝与词缀组合收藏数':Object.keys(R.relics).length*Object.keys(R.affixes).length,'每件器忆定型实践次数':6,'初识升通灵灵蕴':25,'通灵升宝器灵蕴':60,'重复同源法宝补偿灵蕴':10},['同源 = 基础法宝与词缀均相同；重复取最高阶，保留已有器忆与实践。','每件法宝只有一个永久器忆；本命路数不等于器忆。升阶不改变词缀与器忆。'],['src/expedition.js#claimLoot','src/expedition.js#upgrade','src/expedition.js#practice']);
  entries.find(e=>e.id==='system:upgrade').conditions.push('升阶属于灵力炼器；当前散功归凡或明确封功后不能继续升阶。已有收藏、器忆、配装和历史品阶仍保留，普通持有与换装不等于法宝被动恢复。');
  add('system','loot','五段寻宝与灵蕴','路线、寻器方向与险阵影响掉落选择。',{'每局段数':5,'普通房通关灵蕴':15,'守关通关灵蕴':30,'险阵额外灵蕴':10,'重复同源补偿':10,'基础随机通灵概率':'14%（每候选）','初始重观次数':1,'重观持有上限':3},['三选一，只有领取的候选才算已获得。寻器首候选优先该路数中未收集的基础法宝。','守关三个候选均通灵；险阵或问器祝福保证首候选通灵；其他候选才抽基础 14%。','候选词缀优先该基础法宝尚未收藏者；不能把 14% 解释为每局获得率。'],['src/expedition.js#rollLoot','src/expedition.js#claimLoot','src/expedition.js#clearRoom']);
  add('system','room','通关与歇脚补给','第 2、4 段领取奖励后各有一次歇脚。',{'每间基础回血':12,'每间基础回灵':12,'温炉回血':35,'温炉回灵':35,'辨药温炉额外回血':10},['草木回春每间再 +10 气血，寻脉图额外回灵。','温炉、补给与问器三选一；问器 +1 重观（上限 3），并保下一段首候选通灵，重观不失效。'],['src/expedition.js#clearRoom','src/expedition.js#chooseCamp']);
  for(const [key,d]of Object.entries(R.supplies))add('system','supply-'+key,R.paths[key].name+'补给','理符备药时选择一份对应路数补给。',Object.fromEntries(Object.entries(d).map(([id,n])=>[D.items[id].name,n])),['一次歇脚只能选一份；供本局后续使用，已领取物品不会因失败被回收。'],['src/expedition-data.js#supplies','src/expedition.js#chooseCamp']);
  add('system','failure','失败、撤退与存档','保留已经取得的长期成果；本局临时效果结束。',{'回山气血':100,'回山灵力':100,'物品库存上限':999,'灵蕴上限':1000000},['保留已领取法宝、图谱、器忆、升阶、灵蕴、剧情、关系、器物试录见闻与领取记录、剩余物品；已消费物品不退还。','本局路线、灵契、未领取候选结束。首章剧情失败与秘境结算走各自流程。','已选御敌方式存档；目标、未执行指令、气隙、瞬时反击等不写入长期记录。'],['src/game.js#retry','src/expedition.js#finishRun','src/tactics.js#resetOrders']);
  add('system','cultivation','修习心得与身份专长','以历练推进境界，也可通过秘境旁修补足专长。',{'药庐委托心得':2,'每门身份历练心得':3,'炼气各次晋升心得':1,'圆满至筑基心得':2,'旁修习得所需对应路线通关':2},['秘境运剑专长：闪避后下次有效剑击 +6；辨药：月露采集 +1 并回 8 气血；辨脉：解阵预先解木碑。','初始身份直接拥有对应秘境专长；功法仍需完成对应身份历练解锁。','心得不是击杀经验；心得晋升到筑基后，金丹需通过续章三段实战与复验。'],['src/chapter.js#insight','src/chapter.js#breathe','src/expedition.js#learned']);
  add('system','runStart','入阵补给','开始新一局时补到最低数量，已有更多的物品保留。',{'燃火符最低':3,'寒针最低':3,'引灵香最低':3,'回气丹最低':3,'护身符最低':1,'入阵气血':100,'入阵灵力':100},['这是补足下限，不是每次额外加 3；配方、法宝和长期收藏继续保留。'],['src/expedition.js#startRun']);
  add('system','care','照护与心意','照护和关系选择继续保留在成长线中。',{'选择饮茶／休息回气血':18,'选择饮茶／休息回灵力':15,'照护增加情谊':1,'亲近赠簪增加情谊':4,'朋友赠簪增加情谊':3,'沈灵薇情谊上限':99},['照护是可跳过的一次选择，跳过没有资源惩罚；此处饮茶是情节选项，不等于消耗背包温养茶。','木簪按顺纹、磨光、收尾三步完成；赠簪只结算一次。','没有按周期强制扣数值的生理负担；金丹自循环已接入续章成长说明，伤势仍需照护。'],['src/chapter.js#restCare','src/chapter.js#givePin'],{spoiler:true});
  add('system','movement','移动与防守补充','手动走位可调整站位，自动御敌不要求精准反应。',{'常规移速':195,'格挡移速':90,'闪避速度':640,'闪避时长（秒）':0.19,'闪避冷却（秒）':0.85,'基础闪避耗灵':12,'踏风留痕闪避耗灵':8,'手动精准格挡窗口（秒）':0.16},['手动精准格挡返还 4 灵力并留下 2 秒反击窗口，下次剑击 +12；自主守势不触发精准格挡。','不同场景轻步与照护可影响移动；这里列常规战斗值。'],['src/game.js#step','src/game.js#dodge','src/feel.js#takeDamage','src/tactics.js#takeDamage']);
  for(const [kind,t]of Object.entries(Encounter.traits))add('enemy','armor-'+kind,R.enemies[kind].name+' · '+t.name,t.desc,{'初始护甲':t.maxArmor,'针对手段':t.counter},['本条列出旧阵的初始护甲；后续剧情实战也可使用同类有限护甲，具体容量以场中敌情和对应实战条目为准。普通直击先消耗有限护甲，再扣气血，没有硬免疫。','设最终直击为 D、护甲 A、针对倍率 M：削甲 min(A,D×M)，气血伤害 max(0,D−A/M)。无针对手段 M=1；效率仅增加削甲，不放大气血伤害。','纯吸甲也算有效剑击与定脉命中。灼烧持续伤害绕甲；断云磬余震可削甲，但不借用第三段针对倍率。','破甲状态跟随本局存档；旧档无护甲记录时，活敌补满初始甲，已倒敌为0。'],['src/encounter-data.js#traits','src/encounters.js#resolveEnemyDamage']);
  add('system','loadouts','三套配装方案','在成年药庐记录与套用法宝、功法和御敌方式。',{'方案数':3,'每套法宝上限':3},['只引用已藏器物与已学功法，不复制装备；成长继续随原器物更新。','仅药庐、无秘境和教学战斗、无待处理剧情时可修改。','套用前全部校验；保留气血、灵力、库存和共享调息，清除旧器物的反击与闪避强化、累计剑击。','未选功法的方案会取消当前主动功法；覆盖和清空在面板内确认，清空不会删除物品。'],['src/loadouts.js','src/loadouts-ui.js']);
  add('system','preparation','行前准备与路线敌情','入阵前查补足数量与现有搭配，择路时查看目标与可能守卫。',{'路线类型':4},['预览只读，不消耗种子或资源，也不提前领取物品。','听雨试锋从四类守卫中随机取三类，面板列可能出现者；另三路列固定种类。','采齐月露草或解完脉碑即可过房，无须击败全部守卫；收势与引香可支持绕行。','入阵补给与实际startRun共用同一最低数量表；高于下限的库存原样保留。'],['src/preparation.js','src/expedition-data.js#startingSupplies','src/expedition.js#startRun']);
  for(const [key,record]of Object.entries(E.research.records))add('system','research-'+key,'器物试录 · '+record.title,record.desc,{'灵蕴馈赠':record.reward.spirit,'领取次数上限':1,...Object.fromEntries(Object.entries(record.reward.items).map(([id,n])=>['馈赠·'+D.items[id].name,n]))},['可选研习，不作为主线、境界或入阵门槛。',...record.requires.map(id=>'完成条件：'+E.research.observations[id]+'。'),'本卷全部条件达成后，在成年、安全且无待处理剧情的药庐领取；无须站在特定人物身边。','灵蕴上限 '+E.research.spiritLimit+'、各物品库存上限 '+E.research.itemLimit+'；所有馈赠都有余量才完整发放，否则保留未领状态。','见闻跨局保留，失败或撤离不清除；每卷馈赠只领一次，不改变情谊或自动确定道侣。','旧档只从已有器忆与当前真实共鸣确认这两项，不推测过去的破甲、和平通关或炼制。'],['src/research-data.js#records','src/research-data.js#observations','src/research.js#claimResearch','src/research.js#validateSave']);
  add('system','workshop','药庐批量炼制','按计划备齐符药，先看整批用料与产量，再一次炼成。',{'单次炉数上限':E.workshopLimit,'产物库存上限':E.research.itemLimit,'炼制记录上限':1000000,'每炉增加炼制记录':1},['可制炉数取材料可用量、产物剩余容量、炼制记录剩余量和单次上限的最小值。','仅成年安全药庐、靠近丹炉且图谱已学时可炼制。三种基础配方与清心散初始可制，其他图谱沿旧阵路线习得。','每一批先完整核对再统一扣料和入囊；满库存或用料不足时没有部分结算。','燃火符每炉产两张，但炼制记录仍只加一炉。批量炼成某基础配方只记一项相应试录见闻，不重复发奖。','配方、批数与材料预览只读；不消耗材料、修改随机种子或记下炼制见闻。'],['src/workshop.js#maxCraft','src/workshop.js#craftPlan','src/workshop.js#craftBatch','src/research.js#recordCraft']);
  for(const e of entries)if(e.category==='item'&&['fire','needle'].includes(e.key)||e.category==='skill'&&['sword','scholar'].includes(e.key))e.conditions.push('命中旧阵或同境剧情试炼的带甲敌人时，直击先按护甲规则结算；针对效率只提升削甲，不能把甲伤直接当作气血伤害。');
  for(const [id,kit]of Object.entries(E.provisions.kits))add('system','provision-'+id,'药庐合备 · '+kit.name,kit.desc,{'每次所需材料':Object.entries(kit.cost).map(([item,n])=>D.items[item].name+' ×'+n).join(' ＋ '),'每局触发上限':1,...(id==='sword'?{'额外护身（秒）':kit.effect.wardSeconds,'合备护身总时长（秒）':E.provisions.baseWardSeconds+kit.effect.wardSeconds}:id==='medicine'?{'额外气血':kit.effect.hp,'额外灵力':kit.effect.mp,'气血／灵力上限':E.provisions.resourceLimit}:{'入阵额外重观':kit.effect.redraws,'重观上限':E.provisions.redrawLimit})},['成年后完成取匣，并与沈灵薇分享任意一篇旧阵札记，在安全药庐合备。','对应专长可由成长经历、已完成身份历练或旧阵旁修取得；友谊与亲近、男女主角有相同效果和成本。','确认合备时一次扣齐材料；只能留一份。入阵前可完整拆还，任何材料超过999容量则不返还、不移除备物。','成功开始下一局才从待带行装转入本局，失败入阵不会丢失；入阵之后即不可拆还，胜利、失败与撤离结束剩余效果。',id==='sword'?'仅首次实际消耗护身符生效，已有护身时的失败尝试不耗次数。':id==='medicine'?'仅首次实际服用回气丹、温养茶或杏花糕；清心散与回春诀不触发，满状态空用不耗次数。':'额外重观在入阵时已给予，读档不重复发放；不保证法宝品阶或新词缀。','不增加信任、不自动结契、不影响凝霜或主线推进；摆放、回看对白和计划预览不扣材料。'],['src/provisions-data.js#kits','src/provisions.js#prepareProvision','src/provisions.js#useItem','src/provisions.js#startRun']);
  for(const e of entries)if(e.category==='item'&&['ward','potion','tea','cake'].includes(e.key))e.conditions.push(e.key==='ward'?'携护锋符匣入阵时，首次成功使用可额外延长3秒；仅本局一次。':'携温养药包入阵时，首次成功药食额外回复8气血/8灵力；仅本局一次。');
  const Background=E.backgrounds,backgroundClues={footprints:'人的脚印',burntPaper:'半张残符',mural:'流云壁画',coffin:'主棺遗物'};
  const itemAmounts=items=>Object.entries(items||{}).map(([id,n])=>D.items[id].name+' ×'+n).join(' ＋ ')||'无';
  function backgroundRequires(profile,action){
    const all=[profile.mission.requires||{},action.requires||{}];
    return {evidence:[...new Set(all.flatMap(r=>r.evidence||[]))],deductions:[...new Set(all.flatMap(r=>r.deductions||[]))],tombClues:[...new Set(all.flatMap(r=>r.tombClues||[]))],rescued:all.some(r=>r.rescued)};
  }
  function backgroundRequirementsText(r){
    return [...r.evidence.map(id=>'查验'+S.evidence[id].name),...r.deductions.map(id=>'推断“'+S.deductions[id].name+'”'),...r.tombClues.map(id=>'汉墓线索“'+backgroundClues[id]+'”'),...(r.rescued?['四个孩子已安全送回青阳']:[])].join('；')||'无额外条件';
  }
  for(const [id,p]of Object.entries(Background.backgrounds)){
    const actions=['opening','mission'].flatMap(stage=>p[stage].choices.map(action=>({
      stage,id:action.id,label:action.label,cost:{...action.cost},gain:{...action.gain},
      tokenId:stage==='opening'?action.token?.id||null:null,consumeToken:!!action.consumeToken,
      requires:stage==='mission'?backgroundRequires(p,action):{evidence:[],deductions:[],tombClues:[],rescued:false}
    })));
    const stats=[stat('出身',p.birth),stat('阵营',p.faction),stat('起步物资领取次数上限',id===Background.defaultId?0:1),stat('独立委托结算次数上限',1)];
    for(const action of actions){
      const prefix=(action.stage==='opening'?'起步 · ':'委托 · ')+action.label;
      stats.push(stat(prefix+' · 消耗',itemAmounts(action.cost)),stat(prefix+' · 获得',itemAmounts(action.gain)));
      if(action.stage==='opening')stats.push(stat(prefix+' · 专属凭物',p.opening.choices.find(c=>c.id===action.id).token?.name||'无'));
      else stats.push(stat(prefix+' · 凭物交付',action.consumeToken?'交回本开局专属凭物 ×1':'不消耗凭物'));
    }
    add('background',id,p.name,p.summary,stats,[
      '性别、身世开局与剑庐／药庐／经阁修行专长分别选择；所有组合可修行、查案与救援，阵营不限制三门专长。',
      id===Background.defaultId?'原雨夜自动沿用原流程，不增加起步选择门槛、物资或凭物；独立行路记仍为可选。':'童年先完成生火、接饼、收锁，靠近破庙离开处选择去向；直接成年开始可在「身世与立场」面板直接点选（或到药庐找清微）。两种起步选择只能取一份，确认后物资立即入囊。',
      '独立委托须成年、无旧阵或教学战斗，并到青阳迎客来客栈联络；先完成“先查孩子如何出门”和“夜查卖符人的柴棚”两项推断。',
      ...actions.filter(a=>a.stage==='mission').map(a=>'选择“'+a.label+'”还需：'+backgroundRequirementsText(a.requires)+'。'),
      '所有物资都来自真实行囊，整份检查成本与领取后的999库存上限；不够或放不下时不扣物资、不交凭物、不记选择。',
      '选择一项委托后其余去向关闭；交出的凭物不能重复使用。查验物证只核对、不删除，镇妖符样、血符与长命锁不能充当普通材料。',
      '开局选择、委托去向与凭物是否交出随存档保留；离庙、续档、失败回山均不重复发放。旧档保留原雨夜经历，不补发新开局物资和凭物。',
      id==='demon'?'魔域来使保持魔域医部阵营；借学、同查青阳与回山呈证都不自动加入蜀山。合作、忠实回报与索偿由玩家选择。':'本开局阵营随身世记录保留；委托去向由玩家选择，不增加永久战斗倍率。',
      '这是玩法查询，查阅不选择立场、不消耗物资、不推进剧情，也不推进旧阵随机序列。'
    ],['src/backgrounds-data.js#backgrounds','src/backgrounds.js#backgroundActionReason','src/backgrounds.js#chooseBackgroundAction','src/backgrounds.js#validateSave'],{backgroundId:id,actions});
    const tokens=[...new Map(p.opening.choices.filter(c=>c.token).map(c=>[c.token.id,c.token])).values()];
    for(const token of tokens)add('token','background-'+token.id,token.name,token.desc,{
      '所属开局':p.name,'一次开局最多持有':1,'委托交回次数上限':1,'对应独立委托':p.mission.title
    },[
      '随所选起步方案取得，与性别及三门修行专长无关；存放在身世记录中，不占普通行囊，不是法宝或通用货币。',
      '在青阳迎客来经本线联络人办理独立委托；先完成孩子出门、卖符人两项推断，再备齐所选去向的证据与真实物资。',
      ...actions.filter(a=>a.stage==='mission').map(a=>'“'+a.label+'”：'+backgroundRequirementsText(a.requires)+'；消耗'+itemAmounts(a.cost)+'，获得'+itemAmounts(a.gain)+'；'+(a.consumeToken?'凭物交回一次。':'不交回凭物。')),
      '仅本身世、本开局尚未交出的凭物有效；履约时与全部物资一起结算，任何一项不足或满仓都保留凭物。',
      '履约后的交付记录保留，凭物不退回、不重领；不是原案物证、长命锁或可用于炼制的符纸。旧档不补发。',
      '普通纸、绳、封签或木牌，没有伤害加成、永久战斗倍率或常驻魔法光效。'
    ],['src/backgrounds-data.js#backgrounds','src/backgrounds.js#backgroundStatus','src/backgrounds.js#chooseBackgroundAction'],{spoiler:true,backgroundId:id,backgroundTokenId:token.id});
  }


  for(const item of entries.filter(e=>e.category==='item')){
    const openings=[],costs=[],gains=[];
    for(const profile of entries.filter(e=>e.category==='background'))for(const a of profile.actions){
      const label=profile.name+'“'+a.label+'”';
      if(a.stage==='opening'&&a.gain[item.key])openings.push(label+' ×'+a.gain[item.key]);
      if(a.stage==='mission'&&a.cost[item.key])costs.push(label+' ×'+a.cost[item.key]);
      if(a.stage==='mission'&&a.gain[item.key])gains.push(label+' ×'+a.gain[item.key]);
    }
    if(openings.length)item.conditions.push('身世起步方案可得：'+openings.join('；')+'。每个角色只能确定一份起步方案。');
    if(costs.length)item.conditions.push('独立身世委托可交付：'+costs.join('；')+'。只扣行囊实物，原案物证不能代替；任务前置与专属凭物仍须齐备。');
    if(gains.length)item.conditions.push('独立身世委托可得：'+gains.join('；')+'。所选去向仅结算一次，领取前整份检查库存余量。');
    if(openings.length||costs.length||gains.length)item.source.push('src/backgrounds-data.js#backgrounds','src/backgrounds.js#chooseBackgroundAction');
  }

  const Sect=E.sects,sectSources=['src/sects-data.js','src/sects.js'];
  const orderData=node?require('./sect-order-data.js'):root.XiuxianSectOrderData;
  for(const order of Object.values(orderData.orders)){
    const conditions=order.chapters.map(c=>{
      const p=order.paths.find(path=>path.id===c.path);
      return p.name+'修到三层，可向'+order.mentor.name+'请教'+c.name+'，学成后可接手'+c.job+'。';
    });
    const elder=order.offices[order.offices.length-1];
    add('sect','work-'+order.id,order.name+' · 秘传与当值','在'+order.place+'学艺，取得带队资格后可独自当值。',{
      '每件首次独办公绩':orderData.firstWork.merit,'每件首次独办威望':orderData.firstWork.prestige,
      [elder.name+'所需功绩']:elder.merit,[elder.name+'所需威望']:elder.prestige
    },[...conditions,'两篇依次修习。值簿一次只开一件事务，重复练习只记次数。'],['src/sect-order-data.js','src/sect-order.js']);
  }
  add('sect','hehuan','合欢宗 · 入宗与评价',Sect.doctrine,{
    '成年最低年龄':20,'实际入宗境界':'筑基初期（首章此时二十三岁）','入宗赠送物资':0,
    '每次药站捐助':itemAmounts(Sect.donation.cost),'每次捐助贡献':Sect.donation.gain,'捐助次数上限':Sect.maxDonations,
    '贡献余额上限':Sect.maxDonations*Sect.donation.gain,'清誉下限':-99,'清誉上限':99,'威名上限':99
  },[
    '只在成年筑基、安全药庐或安全药站云照身边、无旧阵／教学战斗／待处理剧情时办理；明确同意门规才入宗，重复入宗无收益。',
    '男女、五种身世与三种专长同权；宗门独立保存，不改来处阵营、玄衡与清微师承、调查任务或既有关系。',
    '云照初识时为二十六岁成年女修，之后年龄随实际纪年推进；她研究两脉经脉损耗并经营行旅药站。与男女主角均可逐次自愿立约，不自动恋爱或锁定道侣。',
    '每次捐助必须完整扣齐真实行囊材料；满捐助记录或缺料时整单拒绝。贡献不通过打开面板、重读存档或重复入宗发放。',
    '贡献余额 = 捐助次数×3 − 同息等级×(等级+1) − 摄元等级×(等级+1)。修成两路三层总需24贡献。',
    '清誉 = 捐助次数 + 同息等级×2 + 摄元等级 + 敛息摄元有效命中次数 − 掠灵有效命中次数×2 + 药站验收1 + 守约交割2或威压交割−2，最后统一夹在−99～99；威名 = 掠灵有效命中次数 + 威压交割2，最多99。尚未完成对应药站事务时该项为0。',
    '有效命中指实际扣去敌方气血或护甲；空招、无效目标与查阅均不增加有效命中。护甲命中可影响评价但不提供回收。',
    '清誉低于0为“锋芒多争议”；否则有威名为“恩威并见”；无威名且清誉至少6为“守约济行”；其余“尚待观察”。评价描述行事，不把魔域或宗门身份判作天生善恶。',
    '施展与有效命中记录各上限1000000；永久宗门、贡献、修习与行为记录失败保留。旧档缺宗门字段默认未入宗，不补奖励。'
  ],[...sectSources,'src/sect-world.js#sectReputation'],{sectId:Sect.id});
  for(const [id,p]of Object.entries(Sect.paths)){
    const levels=Array.from({length:p.maxLevel},(_,i)=>{const level=i+1;return {level,cost:Object.fromEntries(Object.entries(p.cost).map(([item,n])=>[item,n*level])),contribution:p.contribution*level};});
    const stats={'可修层数':p.maxLevel,'解锁功法':p.skills.map(key=>Sect.skills[key].name).join('、'),'合修对象初识年龄':Sect.partner.age};
    for(const x of levels){stats['修至第'+x.level+'层材料']=itemAmounts(x.cost);stats['修至第'+x.level+'层贡献']=x.contribution;}
    stats['三层累计贡献']=levels.reduce((sum,x)=>sum+x.contribution,0);
    add('sect','path-'+id,p.name,p.desc,stats,[
      '先加入合欢宗；成年筑基且当前仍能运灵，在安全药庐或药站云照身边，无旧阵、教学战斗或待处理剧情。每次独立明确同意当次约定；散功或封功后不能继续修习。',
      p.agreement,
      '一级为习得，二、三级为进修；逐级支付贡献与全部实物，每升一级只记录一次，不是一次入宗礼包。',
      '缺任何材料、贡献不足、未同意或已达三层均不扣费、不改变评价；一次修习只升一级，不能跳级。',
      '修习不直接返还灵力、气血或战斗资源；实际功法能力随级别成长，在V暂停下令中施展。',
      id==='dual'?'每次成功同息修习增加2清誉，不改变原有同门信任与道侣选择。':'每次成功立约摄元修习增加1清誉；学会掠灵本身不减清誉，实际有效施展掠灵才记行事。'
    ],sectSources,{sectPath:id,levels});
  }
  for(const [id,d]of Object.entries(Sect.skills)){
    const levels=Array.from({length:3},(_,i)=>{const level=i+1;return d.target?{level,baseDamage:d.baseDamage+d.damagePerLevel*level,foundationDamage:(d.baseDamage+d.damagePerLevel*level)*1.5,returnCap:d.baseReturn+d.returnPerLevel*level}:{level,heal:d.baseHeal+d.healPerLevel*level,ward:d.baseWard+d.wardPerLevel*level};});
    const stats={'所属一脉':Sect.paths[d.path].name,'耗灵':d.cost,'共同调息（秒）':d.cooldown,'施放距离上限':d.range,'气血／灵力上限':100};
    for(const x of levels)if(d.target){stats['第'+x.level+'层基础伤害']=x.baseDamage;stats['第'+x.level+'层筑基直伤']=x.foundationDamage;stats['第'+x.level+'层回收上限']=x.returnCap;}else{stats['第'+x.level+'层恢复气血']=x.heal;stats['第'+x.level+'层护身（秒）']=x.ward;}
    if(d.target){stats['按实际气血伤害回收比例']=d.returnRate;stats['每次气血反噬']=d.backlash||0;}else stats['护身剩余伤害倍率']=.35;
    add('sect','skill-'+id,d.name,d.desc,stats,[
      '对应一脉至少修成一层后施展；自动普攻不自动用此诀。V下令独立选择，不占原来功法栏，不改配装方案。',
      '与回风、回春、定脉和其他宗门功法共用chapter.skillCd，换招、读档或重新打开界面均不刷新调息。暂停时不推进。',
      '先检查成年、已修成、可战斗状态、共同调息及灵力；未通过时不扣费、不计行为。试剑教学中禁用。',
      ...(d.target?[
        '只选择当前activeEnemies中的存活敌人并排除试剑木傀；无目标、尸体、同伴、云照、孩子、过远或遮挡目标均拒绝。单次只命中指定一敌。',
        '基础伤害乘最终境界术法倍率，筑基初期为×1.5；王屠户破绽另按墓战规则×1.3。普通剑击、符火、寒针的专属加成不套用本诀。',
        '先走现有有限护甲结算，无额外破甲效率；回收只按本次最终实际气血减少量×比例，再取单次回收上限及自身100上限。',
        '护甲消耗、过量伤害、敌人此前损失的气血不参与回收；目标只余1气血时，摄元最多返0.2灵力、掠灵最多回0.16气血。',
        id==='covenant'?'回收为灵力，三层上限依次5／7／9，均低于耗灵18；有效命中增加1清誉。':'先扣8自身气血，要求施展前气血大于8；反噬不被护身、格挡或境界减伤抵消。随后按实际伤害回血，上限8／10／12；有效命中减2清誉、增1威名。',
        '王屠户半血援助、燃烧击杀时法宝回血、过房奖励等仍各按自身条件结算，不计作宗门吸取。'
      ]:[
        '只恢复自身，不以同伴或无辜者为目标；治疗固定16／20／24，不叠加回春、药食、器忆或含露瓶专属治疗加成。',
        '护身4／5／6秒，沿用65%减伤；与已有护身取剩余时长最大值，不累加。已有更长护身且气血满时拒绝无效施展。',
        '护身按现有buffs.ward保存，续档保留剩余时长；切图和失败仍沿用原规则清理。'
      ])
    ],sectSources,{sectSkill:id,levels});
  }
  for(const item of entries.filter(e=>e.category==='item')){
    const uses=[];
    if(Sect.donation.cost[item.key])uses.push('药站每次捐助消耗'+Sect.donation.cost[item.key]+'份，换贡献'+Sect.donation.gain+'；全部材料须齐备');
    for(const p of Object.values(Sect.paths))if(p.cost[item.key])uses.push(p.name+'修至第1／2／3层分别消耗'+[1,2,3].map(n=>p.cost[item.key]*n).join('／')+'份，另付该级贡献');
    if(uses.length){item.conditions.push('合欢宗用途：'+uses.join('；')+'。仅成年筑基入宗后在安全药庐或安全药站云照身边办理，失败尝试无部分扣除。');item.source.push(...sectSources,'src/sect-world.js#sectPlaceReason');}
  }


  const World=node?require('./sect-world-data.js'):root.XiuxianSectWorldData;
  const worldSources=['src/sect-world-data.js','src/sect-world.js'];
  const worldActions=q=>q.actionIds.map(id=>{const a=World.actions[id];return {id,kind:a.kind,objectId:a.objectId,cost:{...a.cost},reward:{...a.reward},reputation:{...a.reputation}};});
  add('sect','world','合欢宗 · 行旅药站规则','成年筑基可亲自到访药站，依次筹药、护送与交割；客修无需入宗。',{
    '到访最低年龄':World.minAge,'到访最低境界':C.ranks[World.minRank],'行事功绩上限':Object.keys(World.quests).length,
    '普通库存上限':999,'护路尝试记录上限':999,'药站验收清誉':World.quests.station.reputation.honor,
    '守约交割清誉':World.quests.contract.branches.honor.reputation.honor,'威压交割清誉':World.quests.contract.branches.pressure.reputation.honor,'威压交割威名':World.quests.contract.branches.pressure.reputation.fame
  },[
    '从安全药庐山道出发；无旧阵、教学、墓战或其他进行中战斗，也无待处理对话。到访不自动入宗，不改变五身世、三专长、主线资格或道侣。',
    '每项行动须亲自走到对应物件93距离以内；图鉴只读，不代办任务。药站全部任务为可选，成年筑基后可先后办理，不要求首章结尾。',
    '药站功绩 = 已领筹药奖励 + 已领护路奖励 + 已结算商约，各计1，合计0至3；只表示已办事务，不能花费，不增加修习贡献或伪造捐助。',
    '清誉按宗门原始行事记录加药站验收1、守约2或威压−2，再统一夹在−99至99；威名为有效掠灵次数加威压2后封顶99。护路战的实际有效摄元已经计入宗门记录，领取任务不重复计评价。',
    '任务资源来自真实普通库存；结算前检查全部成本以及扣费后奖励是否超过999，任何一项不符整单拒绝，任务不提前推进。',
    '一次领取、采集、配伍与分支记录随存档保留。护路失利或明确撤退回药庐，已耗符药不退、实际功法评价保留；待领战利品尚未取得。普通退出重进不能重领。',
    '宗门修习仍用原捐助贡献体系；可在安全药庐或药站云照身边办理。清誉和威名是行事结果，不把魔域来处当作善恶判定。',
    '药站是成年筑基后的可选行旅支线；四卷主线、后续境界、阵营战争与关系终局另有行程，完成药站三事不等于完成全卷。'
  ],worldSources,{sectWorld:true});
  for(const [id,q]of Object.entries(World.quests)){
    const stats={'前置事务':q.requires.map(key=>World.quests[key].name).join('、')||'成年筑基到访即可','完成领取次数上限':1},conditions=[];
    const extra={sectWorld:true,sectWorldQuest:id,actions:worldActions(q)};
    if(id==='station'){
      for(const p of Object.values(World.pickups))stats[D.items[p.id].name+'每批可采']=p.reward[p.id];
      Object.assign(stats,{'各物件本批领取次数':1,'配伍步数':q.recipe.order.length,'配伍顺序':q.recipe.order.map(key=>D.items[key].name).join(' → '),'第三步整份消耗':itemAmounts(q.recipe.cost),'验药奖励':itemAmounts(q.reward),'验药清誉':q.reputation.honor});
      extra.recipe={order:[...q.recipe.order],cost:{...q.recipe.cost}};extra.pickups=Object.values(World.pickups).map(p=>({id:p.id,actionId:p.actionId,reward:{...p.reward}}));
      conditions.push('先与云照接下筹备，再亲手查看并领取三处备料；青灵草、山泉水和符纸各物件仅本批一次，不随离场或续档刷新。',
        '配伍必须先草、再水、最后纸。前两步不扣料，顺序错误只重置步骤，不扣物；正确第三步才整份检查并扣除材料，材料不足则保留此前步骤。',
        '采得材料进入普通行囊，可在其他玩法中使用；若后来不足，可回药庐备齐，再继续配药，但不能跳过三处亲手采集记录。',
        '配好后到云照身边领取成药；回气丹将满仓时不领、不增加功绩/清誉，材料已用于配药，不重复扣料。腾出空间后可再领一次。',
        '完成后才能接护路；亲近、入宗或合修都不是筹药前置。');
    }else if(id==='escort'){
      Object.assign(stats,{'敌人数':World.encounter.enemies.length,'常规击败即时掉落':0,'清敌后基础奖励':itemAmounts(World.encounter.reward),'护路尝试上限':999});
      for(const e of World.encounter.enemies){stats[e.name+'气血']=e.maxHp;stats[e.name+'移速']=e.speed;stats[e.name+'基础伤害']=e.damage;}
      extra.outcomes=World.encounter.resultPriority.map(key=>{const r=World.encounter.results[key],bonus={...World.encounter.bonus[key]},reward={...World.encounter.reward};for(const [item,n]of Object.entries(bonus))reward[item]=(reward[item]||0)+n;stats[r.name+'额外奖励']=itemAmounts(bonus);stats[r.name+'最终奖励']=itemAmounts(reward);return {id:key,condition:r.condition,bonus,reward};});
      conditions.push('领取筹药奖励后向秦鹭接任务，亲手到铜铃开战；两名役傀实际进入自动普攻与V暂停下令战斗，NPC不是目标。',
        '清敌后亲手到药车领取；两只敌人均不按普通击败即时掉灵砂。未领药车时奖励未取得，撤退刷击败不能套取常规掉落。',
        '常规护送：本场未有效使用摄元两诀；克制截流：至少一次实际有效敛息摄元且无有效掠灵；冒险掠灵：至少一次实际有效掠灵，两诀都用过也归此支。',
        '只看本场有效命中记录，不凭已学功法、打开下令面板、空放或此前别处施法决定分支；未入宗客修也能完成常规护送。',
        '分支额外奖励与基础奖励合并检查库存容量，满仓不作部分发放；清敌与结果记录保留，腾出空间再领。仅结算一次，不重复增加实际施法已产生的评价。',
        '失败或明确撤退后回药庐可重试；已耗物和实际宗门行事记录保留，本场命中计数重开，未交割不算完成。');
    }else{
      extra.branches=Object.values(q.branches).map(b=>({id:b.id,cost:{...b.cost},reward:{...b.reward},reputation:{...b.reputation}}));extra.supply={cost:{...q.supply.cost},reward:{...q.supply.reward},once:q.supply.once,requiresBranch:q.supply.requiresBranch};
      for(const b of Object.values(q.branches)){stats[b.name+'消耗']=itemAmounts(b.cost);stats[b.name+'所得']=itemAmounts(b.reward);stats[b.name+'清誉']=b.reputation.honor;stats[b.name+'威名']=b.reputation.fame;}
      Object.assign(stats,{'回程补给消耗':itemAmounts(q.supply.cost),'回程补给所得':itemAmounts(q.supply.reward),'回程补给领取次数':1});
      conditions.push('筹药与护路奖励均已领后，先亲自查看运药账册，再到陆青禾处交割。关闭面板是暂缓，不扣料、不选分支。',
        '守约付清灵砂与符纸后获得护身符和草药，陆青禾继续供货；另可用青灵草与山泉水换一次回气丹，仍须实际付料并有库存空间。',
        '威压免付旧欠，当次得到灵砂与符纸，但陆青禾交割后离开，药站仅留回执，永久关闭本次回程补给；这是真实供货取舍，不只换一句评价。',
        '两种交割只可选一种，整份成本/奖励容量检查通过才记录选择、清誉威名和功绩；已定分支不能通过重复交互、出入地图或续档重新领取或改选。',
        '回程补给仅守约分支开放一次，不增加新的任务功绩、宗门贡献或清誉；不足或满仓不扣材料，未领取可稍后再办。',
        '商约不改变修习资格、主线、牵挂或道侣。');
    }
    add('sect','quest-'+id,q.name,q.summary,stats,conditions,[...worldSources,'src/sect-world.js#sectWorldActionReason','src/sect-world.js#sectWorldAction'],extra);
  }
  for(const item of entries.filter(e=>e.category==='item')){
    const costs=[],gains=[];
    for(const [id,a]of Object.entries(World.actions)){if(a.cost?.[item.key])costs.push(a.label+' ×'+a.cost[item.key]);if(a.reward?.[item.key])gains.push(a.label+' ×'+a.reward[item.key]);}
    for(const [id,bonus]of Object.entries(World.encounter.bonus))if(bonus[item.key])gains.push(World.encounter.results[id].name+'额外 ×'+bonus[item.key]);
    if(costs.length)item.conditions.push('行旅药站实际用途：'+costs.join('；')+'。配伍前两步不扣料，第三步整份扣料；商约与补给在实际结算时扣齐。');
    if(gains.length)item.conditions.push('行旅药站可得：'+gains.join('；')+'。均有一次领取或互斥分支条件，护路须清敌后到药车交割，无普通击败掉落。');
    if(costs.length||gains.length)item.source.push(...worldSources);
  }


  const campaignSources=['src/campaign-data.js','src/campaign-branches-data.js','src/campaign-state.js','src/campaign.js','src/campaign-schema-v1.js','src/campaign-schema-v2.js','src/campaign-schema-v3.js','src/campaign-schema-v4.js','src/campaign-schema-v5.js','src/campaign-schema-v6.js','src/campaign-m6-data.js','src/campaign-m6-combat-data.js','src/campaign-m6-story-data.js'];
  const campCopy=value=>JSON.parse(JSON.stringify(value));
  const campAmounts=(value={})=>[
    ...Object.entries(value.items||{}).map(([id,n])=>D.items[id].name+' ×'+n),
    ...Object.entries(value.supplies||{}).map(([id,n])=>Campaign.supplies[id].title+' ×'+n),
    ...(value.tokens||[]).map(id=>Campaign.tokens[id].title+' ×1'),
    ...(value.evidence||[]).map(id=>Campaign.evidence[id].title+' ×1')
  ].join('、')||'无';
  const campCondition=rule=>{
    if(rule.type==='task')return Campaign.tasks[rule.id].title+(rule.status==='claimed'?'已领取':'目标已齐');
    if(rule.type==='done')return '已完成：'+(Object.values(Campaign.actions).find(a=>a.task===rule.task&&a.marks.includes(rule.id))?.label||Campaign.tasks[rule.task].title);
    if(rule.type==='choice')return '已选：'+(Object.values(Campaign.actions).find(a=>a.task===rule.task&&a.kind==='choice'&&a.choice===rule.id)?.label||Campaign.tasks[rule.task].title);
    if(rule.type==='token')return '持有'+Campaign.tokens[rule.id].title;
    if(rule.type==='evidence')return '已留'+Campaign.evidence[rule.id].title;
    if(rule.type==='backgroundMission'){const b=E.backgrounds.backgrounds[rule.id],choice=rule.choice===undefined?null:b.mission.choices.find(c=>c.id===rule.choice);return '本人'+b.name+'首章独立委托已完成（非旧档默认身份）'+(choice?'，当时实际选择“'+choice.label+'”':'');}
    if(rule.type==='originTraining')return '本人'+({sword:'剑庐',medicine:'药庐',scholar:'经阁'}[rule.id])+'专长且对应试炼已完成';
    if(rule.type==='realm')return '已突破'+Campaign.realms[rule.id].name;
    if(rule.type==='currentRealm')return '当前实际境界为'+campRealmName(rule.id)+'；保留的旧境历史不能代替当前境界';
    if(rule.type==='legacyToken')return '持有首章实际取得的'+C.tokens[rule.id].name;
    if(rule.type==='body')return {cultivator:'当前身体仍可运转灵力',mortal:'本人已经散功，当前是凡人身体',sealed:'修为已经真实封存'}[rule.id];
    if(rule.type==='gender')return rule.id==='female'?'女主本人选择':'男主本人选择';
    if(rule.type==='partner')return rule.id==='none'?'本人尚未与任何人明确结契':'已与'+Campaign.people[Campaign.partners[rule.id].personId].name+'完成唯一、具名结契';
    if(rule.type==='ageBand')return rule.id==='earlyAdult'?'选择这段生涯时实际18至40岁':'选择这段生涯时实际超过40岁';
    if(rule.type==='personAge')return Campaign.people[rule.id].name+'当时可亲自回应，年龄'+(rule.min!==undefined&&rule.max!==undefined?rule.min+'–'+rule.max+'岁':rule.min!==undefined?'至少'+rule.min+'岁':'至多'+rule.max+'岁');
    if(rule.type==='choiceUnset')return '尚未选择'+Campaign.tasks[rule.task].title+'中的路线';
    if(rule.type==='personUnavailable')return Campaign.people[rule.id].name+'已有具名离世或离场来源，当前不能由本人承办';
    if(rule.type==='pendingVow')return '与'+Campaign.people[Campaign.partners[rule.id].personId].name+'有尚未交付、尚未撤回的结契承诺';
    if(rule.type==='sectContract')return {honor:'旧商约已按守约方式交割',pressure:'旧商约已由威压交割，离场与欠责记录保留',unsettled:'旧商约尚未完成交割'}[rule.id];
    if(rule.type==='legacy'&&rule.id==='chapterComplete')return '首章呈证已完成';
    if(rule.type==='legacy'&&rule.id==='adultZhuji')return '成年筑基';
    throw Error('未说明的跨章条件：'+JSON.stringify(rule));
  };
  const campRequirements=value=>{const all=(value?.all||[]).map(campCondition),any=(value?.any||[]).map(campCondition);return [...all,...(any.length?['任选其一：'+any.join(' / ')]:[])].join('；')||'接下对应事务';};
  const campSource=source=>{const q=Campaign.tasks[source.task],action=Object.values(Campaign.actions).find(a=>a.task===source.task&&(source.on==='claimed'?a.kind==='claim':source.on==='accept'?a.kind==='accept':a.marks.includes(source.on)));const selected=source.choice?Object.values(Campaign.actions).find(a=>a.task===source.task&&a.choice===source.choice):null;return (action?.label||q.title)+(selected?'，且已选“'+selected.label+'”':'');};
  add('system','campaign','跨章行程与任务物','行程包括筑基后续、金丹至大乘及五条长线；入口、身体、相识与终局只按真正发生的事情变化。',{
    '可行走地图数':Object.keys(Campaign.maps).length,'事务数':Object.keys(Campaign.tasks).length,'有限行动数':Object.keys(Campaign.actions).length,
    '任务耗材种类':Object.keys(Campaign.supplies).length,'实际交互距离上限（不含）':93,'普通库存上限':999,'当前可达最高境界':Campaign.realms[(Campaign.realmOrder||Object.keys(Campaign.realms)).at(-1)].name,'原作终局种类':Object.values(Campaign.endings||{}).filter(e=>e.sourceId).length,'明确新增终局种类':Object.values(Campaign.endings||{}).filter(e=>!e.sourceId).length
  },['成年筑基且完成首章后向药庐清微接行程；查图鉴、行程和关系不会接取任务、扣料或发奖。',
    '每项行动要到真实地图、走近对应物件；地图门禁与存档位置也验证前置，不能读档跳层。',
    '任务专用耗材有单独来源、数量与用途，不可卖、炼丹或当普通药物使用；没有普通材料也有正常任务物资路径。',
    '复封、配伍等次序操作仅最后正确一步整份扣料；三段实修是独立行动，每段成功当场消耗本境料1份。每处采料一次，普通奖励满仓整单拒绝，腾出空间可再领。',
    '失利或撤退保留已经取得的证据、任务进度和关系，普通符药按实际使用消耗；敌人没有常规即时掉落，任务交付只领取一次。',
    '各境界须完成相应实战和复验领取；准备记录本身不会晋级。同一境界经不同道路突破也只记一次基础增益。',
    '普通失败可以重试；主动危险、结契、散功和终局需要明确确认。先前恢复点保管成功后才作不可逆决定。'],campaignSources,{campaign:true});
  for(const [id,realm]of Object.entries(Campaign.realms||{})){
    const p=realm.profile,sources=[realm.source,...(realm.alternativeSources||[])];
    add('realm',id,realm.name,'完成'+sources.map(s=>Campaign.tasks[s.task].title).join('、')+'中的一条完整突破路线并领取后，运灵时的普攻、术法、减伤和回灵一起成长。',{'剑击总加成':p.blade,'术法倍率':1+p.spell,'敌袭减伤':Math.round(p.defence*100)+'%','非格挡回灵／秒（无养息）':4+p.regen,'气血上限':100,'灵力上限':100,'独立天劫段数':Object.values(Campaign.actions).filter(a=>a.task===realm.source.task&&a.kind==='battle').length,...Object.fromEntries(sources.slice(1).map(s=>[Campaign.tasks[s.task].title+'实战段数',Object.values(Campaign.actions).filter(a=>a.task===s.task&&a.kind==='battle').length]))},[...realm.bodyRules,'只有本次突破要求的真实胜利、稳定与复验领取都完成才晋级；失败保留已完成段。','上表替换筑基的基础境界增益，不将两境界重复相加；已领取的整备侧重、装备和功法按各自规则另算。','高境界保留曾经到达的境界与旧图回访资格；新基础值替换旧基础，不累计每个境界的数值。','散功归凡或真实封功后，上述战斗增益全部停用；历史上已达此境不表示当前仍能运灵。'],campaignSources,{campaignRealm:id,realmProfile:campCopy(p),recordSource:campCopy(realm.source),alternativeSources:campCopy(realm.alternativeSources||[])});
  }

  for(const [realm,definition]of Object.entries(Campaign.cultivationStages||{})){
    const actions=Object.values(Campaign.actions).filter(a=>a.task===definition.task),accept=actions.find(a=>a.kind==='accept'),material=Object.keys(accept.grant.supplies)[0],stats={'本批专用料':Campaign.supplies[material].title,'接取整批数量':accept.grant.supplies[material],'每段消耗':1,'结案额外属性奖励':0};
    for(const stage of definition.stages){const p=stage.profile;stats[stage.name+' · 剑击额外加成']=p.blade;stats[stage.name+' · 术法额外系数']=p.spell;stats[stage.name+' · 额外减伤百分点']=Math.round(p.defence*100);stats[stage.name+' · 每秒额外回灵']=p.regen;stats[stage.name+' · 回春额外回血']=stage.healingBonus;}
    add('realm','practice-'+realm,campRealmName(realm)+'三段实修','以本境已有历练解锁中期、后期与圆满，分点耗用本次专用供料，不自动补发旧进度。',stats,[
      '本人当前仍能运灵且实际位于本境；每段独立检查当前境界、前一段、真实历练和材料，不能以旧境界历史替代。',
      '接取一次领本境三份专用料，三段各实耗一份；结案只归档，不再重复发一次属性。未结案的已做阶段同样生效。',
      '只取当前境最高实际小阶的累计增益，不把中期、后期和圆满相加，不把旧境实修叠到新境。归凡或封功停用有效增益。',
      '可以提前突破大境；旧境已做阶段和余料保留，未做旧段关闭，旧料不能转投新境，不强制刷旧阵补资格。',
      ...definition.stages.map(stage=>{const action=actions.find(a=>a.kind==='progress'&&a.marks.includes(stage.source.on));return stage.name+'历练资格：'+action.requires.any.map(campCondition).join(' / ')+'；另须完成前一段（中期除外）。';})
    ],campaignSources,{campaignCultivationStage:realm,taskId:definition.task,stages:campCopy(definition.stages),supplyId:material});
  }
  for(const [id,site]of Object.entries(Campaign.restSites||{}))add('system','campaign-rest-'+id,site.title,site.detail,{'气血恢复至':100,'当前可运灵时灵力恢复至':100,'凡体或封功灵力':0,'普通物品/任务料/奖励补发':0,'技能剩余调息改动':0},[
    '需'+campRequirements(site.requires)+'，走近该处真实物件，在安全现场操作；查阅本条不会调息。',
    '战斗、旧阵、教学、回忆、倒地、终局或待处理对话时不可用；气血与当前可用灵力都无需恢复时拒绝，不能反复领奖。',
    '只恢复气血和当前身体能使用的灵力；归凡或封功的MP保持0，不补符药、不发任务用料、不清功法剩余调息。'
  ],campaignSources,{campaignRest:id,spoiler:true,restSite:campCopy(site)});

  for(const [id,budget]of Object.entries(Campaign.combatBudgets||{})){
    const roster=budget.encounters.map(key=>{const encounter=Campaign.encounters[key];return {id:key,title:encounter.title,enemyCount:encounter.enemies.length,enemies:encounter.enemies.map(enemy=>({id:enemy.id,name:enemy.name,maxHp:enemy.maxHp,damage:enemy.damage,armor:campCopy(enemy.armor)}))};});
    const stats={'剧情所处境界':campRealmName(budget.realm),'每场气血预算':budget.hp,'每场有限护甲预算':budget.armor.maxArmor,'伤害分摊参数':budget.damage,'实战段数':roster.length};
    for(const encounter of roster){stats[encounter.title+' · 敌人数']=encounter.enemyCount;for(const enemy of encounter.enemies){const prefix=encounter.title+' · '+enemy.name+' · ',trait=Encounter.traits[enemy.armor.kind];stats[prefix+'气血']=enemy.maxHp;stats[prefix+'基础伤害']=enemy.damage;stats[prefix+'有限护甲']=enemy.armor.maxArmor;stats[prefix+'护甲种类']=trait.name;stats[prefix+'公开针对']=trait.counter;}}
    add('enemy','campaign-trial-'+id,Campaign.tasks[budget.task].title+' · 同境试炼预算','按剧情所处境界给本任务每场新试炼固定气血、有限护甲与伤害参数。',stats,[
      '只覆盖本条列出的固定实战段，不读取当前角色面板抬高敌人；低阶旧敌情保留，可被高境界合理压制。',
      '气血和有限护甲是每场总预算，按声明敌人数均分，余数按敌人声明顺序各加1；不会把整场预算复制给每只敌人。',
      '每敌基础伤害 = round(伤害分摊参数 ÷ sqrt(本场声明敌人数))；此参数不是时间内的总伤害或最终受伤上限，实际命中仍走减伤与护持。',
      '直击先削有限甲，再扣气血，无硬免疫。石纹用寒针/定脉效率×3；磬衣用回风/定脉/第三段剑击效率×2，效率不放大破甲后的气血伤害。火符直击仍按甲结算，灼烧持续伤害绕甲。',
      '本条适用于新开的本段试炼；正在继续的旧战按其严格冻结来源保留原气血与无甲定义，不在载入时补新血甲。原战胜负收束后再开战才用新模板。',
      '各段只有实际胜利才记目标，普通失败保留已胜段；已耗符药不退，仍须实际交付才突破。'
    ],[...campaignSources,'src/encounter-data.js','src/encounters.js'],{campaignCombatBudget:id,combatBudget:campCopy(budget),encounterBudgets:roster,spoiler:true});
  }

  for(const [id,q]of Object.entries(Campaign.tasks)){
    const actions=Object.values(Campaign.actions).filter(a=>a.task===id);
    const stats={'接取前置':campRequirements(q.requires),'必须目标数':(q.requiredObjectives||q.objectives).length,'合法目标种类':q.objectives.length,'领取次数上限':1};
    if(q.window){const w=Campaign.windows[q.window];stats['可接取时段']=w.title;stats['时段前置']=campRequirements(w.requires);stats['已发生后关闭']=w.closedBy.map(campSource).join('；');}
    if(q.recommendedPractice)stats['冲关推荐小阶']=campRealmName(q.recommendedPractice.realm)+'圆满；推荐准备，不是新增硬门槛';
    if(q.phase==='admission')stats['真实入门阶段']='成年、本人入门试炼完成，尚未开始运气筑基；正常蒲团仍独立可用';
    if(q.sequence.length)stats['多步操作次序']=q.sequence.map(key=>Campaign.actions[key].label).join(' → ');
    if(q.choices.length)stats['互斥选择']=actions.filter(a=>a.kind==='choice').map(a=>a.label).join(' / ');
    for(const a of actions){
      if(campAmounts(a.cost)!=='无')stats[a.label+'消耗']=campAmounts(a.cost);
      if(campAmounts(a.grant)!=='无')stats[a.label+'所得']=campAmounts(a.grant);
      if(a.encounter){const encounter=Campaign.encounters[a.encounter],prefix=actions.filter(a=>a.encounter).length>1?a.label+' · ':'';stats[prefix+'此路线敌人数']=encounter.enemies.length;stats['常规即时掉落']=0;for(const enemy of encounter.enemies){stats[prefix+enemy.name+'气血']=enemy.maxHp;stats[prefix+enemy.name+'移速']=enemy.speed;stats[prefix+enemy.name+'基础伤害']=enemy.damage;if(enemy.armor){const trait=Encounter.traits[enemy.armor.kind];stats[prefix+enemy.name+'有限护甲']=enemy.armor.maxArmor;stats[prefix+enemy.name+'护甲种类']=trait.name;stats[prefix+enemy.name+'公开针对']=trait.counter;}}}
    }
    const conditions=['仅实际完成本路线要求后领取一次；互斥选项不要求全部完成，满仓不写已领。',...actions.map(a=>a.label+'：'+a.detail+' 前置：'+campRequirements(a.requires)+'。')];
    if(q.recommendedPractice)conditions.push('推荐修到'+campRealmName(q.recommendedPractice.realm)+'圆满；满足真实现场前置时仍可提前冲关，不按准备差距动态抬高敌人。');
    if(Campaign.combatBudgets?.[id])conditions.push('本任务新试炼采用固定剧情预算与有限护甲；各段敌人数量、血甲和公开针对见同名“同境试炼预算”。旧进行中战按严格冻结来源继续，不在读档时补新血甲。');
    if(q.requiresLivingPerson)conditions.push('办理时需要'+Campaign.people[q.requiresLivingPerson].name+'已经真实相识或显现，且仍能亲自回应；已故或自主离场后，不能继续向本人承办新关系事务。先前真实经历与已结契历史保留。');
    if(q.entryAgeWindow){const w=q.entryAgeWindow;conditions.push('新接取时要求'+Campaign.people[w.personId].name+'当时'+w.min+'–'+w.max+'岁且可亲自回应；已接事务与已选路线的后续逐段检查实际在场，不因越过入口年龄自动截断。');}
    if(q.choiceLivingPeople)for(const[choice,personId]of Object.entries(q.choiceLivingPeople))conditions.push('选择'+(actions.find(a=>a.choice===choice)?.label||choice)+'时，需'+Campaign.people[personId].name+'本人仍能回应，不能由旧关系或后继者代选。');
    if(q.combatModifiers){const labels={blade:['普攻基础增量',1],spell:['法术增益系数增量',1],defence:['减伤百分点增量',100],regen:['每秒回灵增量',1]};for(const [choice,values]of Object.entries(q.combatModifiers)){const action=actions.find(a=>a.choice===choice);for(const [key,n]of Object.entries(values))stats[action.label+' · '+labels[key][0]]=n*labels[key][1];}conditions.push('整备侧重只有领取后才持续生效；每档只选一种，重复领取不会叠加。已达金丹后仍沿用该侧重。');}
    if(q.trial)conditions.push('本任务的实战各自记录真实胜利。失利只重试当前段，可退回安全处整备；已用符药不返还。必要目标与复验领取完成才获得该境界属性。');

    if(id==='tower-seal')conditions.push('复封守阵与依证静行互斥：绕行不取朱泥、不开战、不伪造复封或击败记录。普通静行所有身世专长可达；五身世已完成独立委托或三专长已完成本人试炼，可用真实经验替代东锚与中锚两段。旧凭物已交出不会补发，未完成经历不能只凭开局标签使用捷径。');
    if(id==='apricot-aid')conditions.push('阿杏在北荒纪元起点为22岁，之后年龄随实际纪年更新；朋友与愿再相见同谢礼，选择可取消而不记入。后者只表达亲近意愿，这次救助不自动决定道侣；后来仍须本人明确同意并另行结契。');
    add('system','campaign-'+id,q.title,q.summary,stats,conditions,campaignSources,{campaignTask:id,spoiler:true,requiredObjectives:[...(q.requiredObjectives||q.objectives)],actions:actions.map(campCopy)});
  }
  for(const [id,supply]of Object.entries(Campaign.supplies)){
    const sources=Object.values(Campaign.actions).filter(a=>a.grant.supplies[id]);
    const uses=Object.values(Campaign.actions).filter(a=>a.cost.supplies[id]);
    add('token','campaign-supply-'+id,supply.title,supply.usage,{'随身上限':supply.max,'普通行囊占用':0,
      '实际来源':sources.map(a=>a.label+' ×'+a.grant.supplies[id]).join('；'),'实际消耗':uses.map(a=>a.label+' ×'+a.cost.supplies[id]).join('；')},
      ['专属任务物，不能出售、普通炼制或战斗使用；来源行动各一次，不能靠离场、错序或续档重复领取。','只在所列动作真正成功时消耗；配伍和复封仅最后正确步骤扣整份材料，错误次序不耗。'],campaignSources,
      {campaignSupply:id,spoiler:true,maximum:supply.max,sources: sources.map(a=>({actionId:a.id,amount:a.grant.supplies[id]})),uses:uses.map(a=>({actionId:a.id,amount:a.cost.supplies[id]}))});
  }
  for(const type of ['tokens','evidence'])for(const [id,record]of Object.entries(Campaign[type])){
    const sources=Object.values(Campaign.actions).filter(a=>(a.grant[type]||[]).includes(id));
    const ruleType=type==='tokens'?'token':'evidence',uses=Object.values(Campaign.actions).filter(a=>[...(a.requires?.all||[]),...(a.requires?.any||[])].some(r=>r.type===ruleType&&r.id===id));
    const endingUses=Object.values(Campaign.endings||{}).filter(e=>[...(e.requires?.all||[]),...(e.requires?.any||[])].some(r=>r.type===ruleType&&r.id===id));
    add('token','campaign-'+(type==='tokens'?'token-':'evidence-')+id,record.title,record.description||record.usage||record.detail||record.title,
      {'取得事务':Campaign.tasks[record.source.task].title,'取得时点':sources.map(a=>a.label).join('；'),'实际查验用途':uses.map(a=>a.label).concat(endingUses.map(e=>e.title+'的条件')).join('；')||'保留此次实际调查或交接记录','重复领取':0},
      [type==='tokens'?'这是独立凭物或准备记录，不是普通货币、材料或可消耗装备。':'这是已取得的证据；目击、具名口述和待核疑点有区别，不能把推断当既成事实。','只由对应实际行动写入；旧档迁移不补发，界面查询不改变持有记录。'],
      campaignSources,{[type==='tokens'?'campaignToken':'campaignEvidence']:id,spoiler:true,recordSource:campCopy(record.source),sourceActions:sources.map(a=>a.id),useActions:uses.map(a=>a.id)});
  }

  add('system','campaign-era','修行纪年与人物阶段','岁月由真实事务推进；治宗、行旅、魔域治理与凡人生涯分别留下来源。',{
    '北荒纪元时年龄':Campaign.baseAge,'正道末段累计年数':Campaign.eras.at(-1).elapsedYears,
    ...Object.fromEntries(Campaign.eras.map(e=>[e.label,e.elapsedYears+'年；'+Campaign.tasks[e.source.task].title])),
    ...Object.fromEntries((Campaign.eraSteps||[]).map(e=>[e.label+' · '+(e.id.includes('-early-')?'青壮年入场':e.id.includes('-late-')?'晚年入场':'实际增年'),e.years+'年；'+campSource(e.source)]))
  },['先前三年整备结束后，以北荒为纪元起点；不能挂机推进年数或令人物死亡。',
    '年龄按实际到达的正道纪年基点与已办成的支线增年合计；一项交接只计算一次。新的五十年安排要求阿杏当时18–24岁，新的十年安排要求25–63岁；已选后续不重检入口窗，旧合法历史不按最终年龄改写。',
    '清微受伤与坐化、圆通坐化、新方丈接任、师兄废功、阿辰7岁→14岁→24岁→44岁的阶段记载均有真实事件来源。人物当前年龄会随后来年月推进。',
    '死亡后旧图不再出现活人交谈；遗物与碑使用独立交接点。师兄废去修为仍存活，不等于绝交。',
    '未恋爱者不自动婚配；自愿同行不等于结契。'],campaignSources,{campaign:true,spoiler:true,eras:campCopy(Campaign.eras),eraSteps:campCopy(Campaign.eraSteps||[])});
  add('system','campaign-commitments','结契与朋友的实际约定','先完成同伴自己的事务，再听本人意愿；明确表达后仍须最后确认交付。',{'明确道侣上限':1,'可核验的成年候选数':Object.keys(Campaign.partners||{}).length},['朋友、婉拒与结契领取同一份实用谢礼；帮忙和亲近记录不会自动变成恋爱。','只能保留一份待确认的结契意愿；最终交付前不写明确道侣。取消不改变关系。','旧人物若已经离世或自主离场，不会为关系任务回到原地。'],campaignSources,{campaign:true,spoiler:true});
  for(const[id,p]of Object.entries(Campaign.partners||{})){
    const person=Campaign.people[p.personId],q=Campaign.tasks[p.source.task],reward=Object.values(Campaign.actions).find(a=>a.task===q.id&&a.kind==='claim');
    add('system','campaign-partner-'+id,'与'+person.name+'的明确约定',person.description||person.role,{'本人意愿来源':campSource(p.adultSource),'正式结契来源':campSource(p.source),'本人性别条件':p.genders.map(g=>g==='female'?'女主':'男主').join(' / '),'朋友／拒绝／结契共同谢礼':campAmounts(reward.grant),'明确道侣上限':1},['双方成年、有实际相识与共同事务，且本人尚无另一份待确认或已领取的结契。','先听意愿，再选择，最后交付才登记；查阅此条不会结契。','保留对方独立目标，不自动婚育，不因过去某世或共同守门替代本人今生同意。'],campaignSources,{campaignPartner:id,spoiler:true,recordSource:campCopy(p.source),adultSource:campCopy(p.adultSource),sharedReward:campCopy(reward.grant)});
    if(p.newPromiseAgeWindow){const w=p.newPromiseAgeWindow,entry=entries.at(-1);entry.conditions.push('新的共同承诺仅在'+Campaign.people[w.personId].name+'当时'+w.min+'–'+w.max+'岁且可亲自回应时办理；已结契历史保留。');entry.conditions.push('尚未交付的承诺可由本人在读过苏医者讣报后的济善堂案前，或满足共同医事及具名已故/离场条件的杏村交托处主动撤回，归档后不能再凭原承诺领婚契；不会自动改成朋友。归档来源：'+p.unfulfilledArchiveSources.map(campSource).join('；')+'。');entry.newPromiseAgeWindow=campCopy(w);entry.unfulfilledArchiveSources=campCopy(p.unfulfilledArchiveSources);}
  }
  for(const [id,definition]of [['mortal',Campaign.mortalBody],['sealed',Campaign.sealedPractice]])if(definition){
    add('system','campaign-body-'+id,definition.title,definition.detail,{'实际发生来源':campSource(definition.source),'有效剑击境界增益':0,'有效术法增益':0,'有效境界减伤':0,'有效回灵／秒':0,'当前灵力':0,...(id==='mortal'?{'晚年外观起岁':definition.agedFromAge}:{})},[...(definition.rules||[]),'历史突破与收藏保留，已拥有境界条目只表示过去到达，不表示当前战力。','灵力招式、法宝与灵甲被动、修为回灵和宗门运灵能力停用；普通饭食、工具、治疗与已学知识仍按实际用途使用。',id==='mortal'?'凡人日常包含普通饭食、休息和自愿照护；照护选择不按性别强制惩罚。只有实际归凡且年满'+definition.agedFromAge+'岁才使用凡体晚年外观，封功与高境修士不因此换像。':'这是本人明确封存修为，不等同于散功归凡。'],campaignSources,{campaignBody:id,spoiler:true,recordSource:campCopy(definition.source),effectiveProfile:{blade:0,spell:0,defence:0,regen:0,regenTotal:0},...(id==='mortal'?{agedFromAge:definition.agedFromAge}:{})});
  }
  const lifecycleRecords=Object.values(Campaign.people).filter(person=>person.lifecycle?.length||person.successorOf).map(person=>({id:person.id,name:person.name,successorOf:person.successorOf||null,metSources:campCopy(person.metSources||[person.metSource]),lifecycle:campCopy(person.lifecycle||[])}));
  add('system','campaign-lifetimes','当代人物、旧卷与继任','当前在场、生死与今日接办人分开显示；祖辈旧卷不变成后辈亲历。',{'具名人物阶段数':lifecycleRecords.reduce((n,p)=>n+p.lifecycle.length,0),'明确后继人物数':lifecycleRecords.filter(p=>p.successorOf).length,'新五十年入口':'阿杏18–24岁','新十年入口':'阿杏25–63岁','凡体晚年外观起岁':Campaign.mortalBody.agedFromAge},[
    '年龄随真正完成的纪年行动更新；离世和离场分别依具名讣报、告别或交接来源，不能只因超过新入口窗口就推定死亡。',
    '新相识和新的共同承诺须在本人当时可回应的年龄窗口；已选路线的后续年段不重检入口年龄。18–24岁开始的五十年自然走至68–74岁，不能因途中超过24或63岁被截断。',
    '严格验证的revision4、5、6旧档保留已经发生的选择、结契与相识；例外只限原来源已做行动，不开放未来新选择，也不补造早年许可。',
    '晚入或当事人已无法亲办时，仍须完成生活、医课、疫病、洪水和复建的共同医事，再到今日案物办理继任。继任不补写未共同生活的年月。',
    '未交付的阿杏结契承诺，可在亲自读过苏医者本次讣报后到济善堂交接案主动撤回；归凡者完成共同医事后，可到杏村交托处，在阿杏或苏医者已有具名已故/离场记录时主动撤回。无需等阿杏去世；两处只归档一次，保留原话，原婚契此后永久关闭。死亡本身不会自动撤回。',
    '沈红叶的后续异议通过来信收束；苏医者讣报依本路线医事来源；阿石晚年仍是本人，后辈另有姓名和今日职责。',
    '人物当前像、当前在场与旧卷相识分别记录；晚访读到遗案不等于生前相识，继任者不继承祖辈的朋友或道侣关系。'
  ],campaignSources,{campaign:true,spoiler:true,lifecycleRecords,historyActionIds:[...Campaign.historyCompatibility.actionIds]});
  for(const[background,method]of Object.entries(Campaign.meta.m6BackgroundMethods)){
    const ordinary=Campaign.actions[method.ordinary],alternatives=method.alternatives.map(id=>Campaign.actions[id]),profile=E.backgrounds.backgrounds[background],stats={'共通办法':ordinary.label,'共通办法用料':campAmounts(ordinary.cost),'替代办法数':alternatives.length};
    for(const a of alternatives){const map=Campaign.maps[a.map]||World.maps[a.map]||D.maps[a.map],object=map.objects.find(o=>o.id===a.objectId)||Campaign.entryObjects.find(o=>o.map===a.map&&o.id===a.objectId),mission=a.requires.all.find(r=>r.type==='backgroundMission'),choice=profile.mission.choices.find(c=>c.id===mission.choice),label=a.label+'（'+choice.label+'）';stats[label+'用料']=campAmounts(a.cost);stats[label+'前置']=campRequirements(a.requires);stats[label+'现场']=(map.name||map.title)+' · '+object.name;}
    add('system','campaign-method-'+background,profile.name+' · 后续办事方法','读取首章真实委托的具体选择，以旧经验替代一个步骤或一笔有限用料。',stats,[
      '共通办法保留，任何身世都可按原任务条件办理；替代必须是本人真实完成的独立委托选择，只有开局身世标签或旧档默认身份无效。',
      background==='rain'?'两种旧救援记录各可在陈玄带回的具名抄页核值夜，仍耗查验签一张，省去守塔值房往返。':background==='poor'?'前线份额可交青灵草、山泉水各一份，替代一份有限分诊药包；其他两处仍按原用量交付，余包保留。':'按旧回执核原册、直接留校记，替代一次重复誊抄，省下一张有限核验或传抄纸。',
      '普通与替代完成同一目标，只能办理其中一种；完成后反向办理也拒绝，不重复完成、不重复发料。',
      ...(background==='caravan'?['两种早期货药选择分别核本人实际回执；守约、威压、未结三类旧商约按真实交割记录区分。威压留下药商离场与欠责，不改写为守约，不补造后续供药。']:[]),
      ...(background==='demon'?['公开副本、封回医部与强索货物三种历史分别写明；公开署名不称隐蔽接应，强索异议与原货物去向留在旧账。']:[]),
      ...alternatives.map(a=>a.label+'：'+a.detail)
    ],campaignSources,{spoiler:true,campaignBackgroundMethods:background,ordinaryAction:campCopy(ordinary),alternativeActions:alternatives.map(campCopy),commonMark:method.commonMark});
  }
  add('system','campaign-windows','行旅入口与选择前恢复','有些入口只在特定经历之间开放，已经发生的承诺或公审会关闭冲突道路。',{'具名入口时段':Object.keys(Campaign.windows||{}).length,'额外上游恢复分歧':(Campaign.recoveryChoices||[]).length},['关闭理由来自真正发生的历史；不会因查阅页面接下任务，也不能用旧态度替代新的明确转线。','魔域、证道与蜀山同一政治旧案互斥；化神死守与正常合体出征互斥。','恢复到已保管的真实岔路记录才可改选；普通失败保留进度。另开旅程保存为独立记录，不清空旧旅程。'],campaignSources,{campaign:true});
  add('system','campaign-memories','三段代表世与现实边界','按真实记忆入口重历将军撤民、医者救助与魔域护民；回到殿中后才领取见证。',{'可操作代表世':(Campaign.memoryVisits||[]).length,'其余记忆册世数':96,'带出旧世普通物资':0},['回忆只在本人接取、开门并身处指定地点时显示；现实人物暂不出现在回忆画面。','旧世物资只用于对应记忆，旧世婚姻、军权与人物死亡不会覆盖今生。','三段有不同实际目标；其余九十六世为册中复核。'],campaignSources,{campaign:true,spoiler:true,memoryVisits:campCopy(Campaign.memoryVisits||[])});
  for(const [id,ending]of Object.entries(Campaign.endings||{})){
    const choice=Object.values(Campaign.actions).find(a=>a.task===ending.source.task&&a.kind==='choice'&&a.choice===ending.source.choice);
    add('system','ending-'+id,ending.title,ending.summary,{'完成事务':Campaign.tasks[ending.source.task].title,'明确选择':choice?.label||Object.values(Campaign.actions).find(a=>a.task===ending.source.task&&a.kind==='claim')?.label||'完成现场托付并确认交付','必要条件':campRequirements(ending.requires),'终局数量':1},
      ['只有实际完成事务并确认最终交付，才登记这个终局；查阅本条目不会结束行程。',
       '选择与最终交付分别确认，取消不结算。终局后可以查阅、导出或恢复此前存档，世界行动停止。',
       '本条目说明这项终局的实际条件；未取得的剧情条目默认隐藏，查阅不代表已经完成。'],campaignSources,{campaignEnding:id,spoiler:true,recordSource:campCopy(ending.source),endingRequirements:campCopy(ending.requires)});
  }
  const lockEntry=entries.find(e=>e.category==='token'&&e.key==='locket');if(lockEntry)lockEntry.conditions.push('归墟终战会耗尽母亲留下的锁芯余息，自己的空半壳仍保留；不会重复救命，也不删除先前真实验锁的历史。');

  for(const item of entries.filter(e=>e.category==='item')){
    const grants=Object.values(Campaign.actions).filter(a=>a.grant.items[item.key]);
    if(grants.length){item.conditions.push('续章另有 '+grants.length+' 处一次事务交付可取得本物；须实际完成目标并有库存空间，清敌无常规即时掉落。具体事务与分支见开启剧情后的跨章条目。');item.source.push(...campaignSources);}
  }


  const search=(query='',category='all')=>{const q=String(query).trim().toLocaleLowerCase();return entries.filter(e=>(category==='all'||e.category===category)&&(!q||[e.name,e.usage,...e.conditions,...e.stats.map(s=>s.label+' '+s.value)].join(' ').toLocaleLowerCase().includes(q)));};
  const rogueConditions=[
    '九霄前五波的常规出怪间隔依次为1.12、1.04、0.95、0.90、0.85秒。第4、5波首次精英增援在第8秒。第15、25波首领真气上限分别为气血的45%、42%。',
    '同阶兵器各有所长。剑修第三击扇形剑气破防；雷法主雷按1.87倍、弹射按2.85倍叠加弹射衰减；火凤落地持续灼烧，对首领的地火更强；玄冰三印碎冰冻结；御剑来回追敌，整轮剑阵共用攻击加成。',
    '每波35至50秒，灵气门槛为 round(24 + 14×(等级−1) + 3.5×(等级−1)^1.38)。敌血倍率 1 + 0.34×(波次−1) + 0.12×max(0,波次−4)^1.45。冲刺无敌0.35秒，通常冷却2.1秒。',
    '第1、4、6、8波分别开放法器二、三、四、五级；最多同时携带 min(8,2+floor(波次/3)) 系。五级法器与同系圣物在悟道时进化，占一个超武位。第8、11、14波依次开放前三位，之后每三波增一位。',
    '两系法器都达到二级即触发对应共鸣。锁定的未购商品跨刷新与波次保留，商店换货6劫火，悟道换牌4劫火。每三波抉择一次，可选取舍或稳妥调息。',
    '每五波镇守，必须击败首领并撑过本波时限。五位首领的基础气血为 340＋385×序号²（序号0至4），再乘当波血量倍率。首招蓄势0.65至0.85秒。金蟾仅停留12秒，击杀得24额外劫火和仙匣三选一；宝箱另赠8劫火、12气血，所选法器额外升一级，受当波品级限制。',
    '结算仙玉为通关波数×1.6向下取整，双精英奇遇追加收益至多为通关波数，总计封顶28。灵锻石为波数×6＋向上取整的击杀数/3。',
    '首度收录三系超武解锁太古星辰冠幻化。珍宝阁九剑翼180、星帝袍320、星辰冠220仙玉，仅解锁衣橱。五系神兵残谱每份260仙玉，另需5枚太古劫晶锻造。珍宝阁18仙玉换悟道心得卷，32仙玉换渡劫护道符。主世界每卷择一换1心得或80灵蕴，致命伤消耗一道护符回半血。妖榜首胜另得卷、符各一。',
    '天渊普通层给1至2仙玉，行商普通层固定2仙玉，首领层6仙玉。无尽劫第3/9/15波、首种/第三种超武、天渊第5/10/15层各藏一篇外传。'
  ];
  const explorationConditions=[
    '地品、天品、仙品掉落有12%、22%、35%机会附一条传奇器魂，可销毁原器制珠，铭刻覆盖目标器魂。魔器利弊随实装生效，幻化只改变外观。',
    '契约由五项独立挑战组成，每项增加一热。每热度高品概率相对加12%、材料加25%、仙玉加30%、劫晶概率相对加35%。热度二以上精英或首领可掉劫晶，热度三以上清层解锁劫火绛绡染。',
    '清层有15%概率出现一道奇遇门。剑冢拔剑后存活20秒或斩尽剑灵，必得一件传奇胚子或魔器；黑市售三种不重复孤品，每份限购一次。奇遇沿用所在层品阶上限。',
    '第10层起双倍劫魔门、或热度三以上的精英与首领，有12%概率另掉魔器。通关第20层且曾以三热以上清过首领层，可在大厅问道真魔。首斩得太虚天道光环、斩魔问心与五系神兵自选锻造匣。',
    '药庐洞府试剑桩按实际命中统计近1秒伤害、全程最高的10秒窗口平均秒伤、总伤害、实测暴击率和破防次数。护甲可在0与490间切换，模拟首领护体真气300。',
    '九霄精英和五位首领共用六形碰撞与护体真气，破防打断尚未落下的范围招式与延迟飞弹。狼影冲锋、磐心震波、十字裂地、月刃扇形、棋盘落雷与持续焰域各有不同安全位置。',
    '每次清层拾取完灵匣后，从两至三道机缘之门择一。第五层及其倍数固定迎战镇守首领，仍获得所选门的保底奖励。',
    '神兵密室给本层进阶武器与16石，霓裳秘阁给进阶服饰，其中30%选稀有底材。宝库与器商同受当前层上限约束。',
    '淬炼石窟额外给36灵锻石、18淬灵精魄，45%遇铁匠免费强化当前兵器一次。双倍劫魔出现双精英，21层起开启5%仙品机会。',
    '妖榜首胜与再战按1–2、3–5、6–7、8–9、10号对应天渊五档首领掉落专属底材，首胜另给一卷历练心得。砺剑模式材料乘1.5，另得一片太古碎片。',
    '天渊1–5层凡/灵/玄为55/40/5%，6–12层灵/玄/地为45/45/10%，13–20层玄/地/天为40/48/12%。前三档首领保底灵/玄/地，上浮一阶概率20/35/35%。21–29层仅首领和双倍门可出仙品，30层起地/天/仙为30/58/12%。30层起每胜首领鸿运+20，满100给仙品，首领主掉落为仙品时清零。15层起天渊首领与6号起悬赏有40%掉一枚太古劫晶。',
    '主世界按炼气、筑基、金丹、元婴至合体、大乘对应五档掉落。常规套装为青莲、紫霄、赤焰、玄霜，星帝实物为终极限定散件。',
    '新角色四件凡品战力96，初始灵锻石120、淬灵精魄30。三套预设各记八槽，一键最强仅考虑已确认的魔器。外观与无尽劫图鉴、天赋和成就可随账号保留。洞府陈列仅限本角色取得的器物。',
    '冲刺后0.20秒内避开命中可获灵步反击，2.5秒内下一击必暴击，削气倍率至少2.2。天渊、悬赏与无尽劫命中间隔至多3.5秒延续连击，单次损失10点气血减半。10/25/50/100连每阶移速加3%、暴击率加4个百分点。二十项微成就首达解锁同名称号。',
    '天渊首领/小怪气血基数680/120，乘1+0.28×层数+0.08×max(0,层数−5)^1.32，精英再乘1.85。天渊普通/精英/首领防御为1220/552/552，精英和首领另有真气。十张妖榜各有固定防御，见榜表。雾影继承雾魅20%的防御，守阵灵球沿用傀儡本体防御。武器每级带来5.5%穿甲系数，+6后每级另加12%。防御除以（1+穿甲系数），功法再穿透40%。妖榜气血为520+360×序号+140×序号²（从0计）。精英、首领真气分别为气血38%、50%，护体减伤25%。普攻削气35%，末击、功法、反击按220%，蓄势时280%，化身绝学320%，克制350%。破防停手2.5秒，伤害×1.8，暴击加20个百分点。暴击上限75%，攻速加成上限65%，防御减伤为防御/(防御+120)。',
    '三合一消耗三件同阶闲置装备，65%升一品（天品止），独立15%额外满值词条。指定部位耗6精魄。剥离销毁原器得一珠，铭刻替换未锁词条且不得重名。入鉴每三种全伤+1%、掉宝+2%，至多10组；第三种解锁月白染。',
    '青霜本命剑可换五形，喂养一件得8×(品阶序号+1)²+3×强化等级剑魂。筑基/金丹/化神起分别以60/240/700累计剑魂进阶，末阶另耗1劫晶。三阶每4秒蓄成穿透剑气，四阶每五击发动本命必杀。',
    '洞府最多陈列三把兵器和两件道袍，满架全伤+5%、移速+5%、掉宝率相对增加8%。同一外观占一架。',
    '每场战斗、每层天渊或每三波无尽劫使全部已种灵草长一阶。三阶收灵锻石24、淬灵精魄12或回气丹2与青灵草3。'
  ];
  const api={explorationConditions,version:'1.9.8',categories,entries,search,rogueConditions};if(node)module.exports=api;else root.XiuxianCatalog=api;
})(globalThis);
