(function (root) {
  'use strict';

  const categories = [
    {id: 'world', title: '世间与仙途', description: '认识来处、境界、势力与岁月，读懂这个江湖的规矩。'},
    {id: 'people', title: '人物与牵挂', description: '相识各有来处，相伴各有心愿；亲缘、同门与道侣分别说清。'},
    {id: 'journey', title: '四卷与归途', description: '从雨夜到天门，梳理四卷故事、五条长线与不同终局。详细篇目含剧情揭示。'}
  ];

  const articles = [
    {
      id: 'world-introduction', category: 'world', title: '初翻山行闻见录：你将走进怎样的世间',
      summary: '从一个十岁孩子的雨夜出发，认识求仙、查案与行旅共同构成的世界。',
      keywords: ['世界观', '林墨', '仙途', '入门', '离线'], spoiler: false,
      sections: [
        {heading: '仙途从活下去开始', paragraphs: [
          '你扮演林墨。林家旧案留下失去双亲的创痛，也留下贴身的长命锁。十岁那夜，玄衡出现在雨中的破庙；眼前要紧的是取火、保暖与收好旧物。二十岁后的求学、修行和查案，从这段共同的经历接续。',
          '往后的路既有剑阵与雷劫，也有粮药、病案、证词和不愿离开故土的人。境界让你有能力走得更远，如何使用这些能力，则由一次次实际行动写下来。'
        ], bullets: []},
        {heading: '三件贯穿始终的事', paragraphs: [], bullets: [
          '求道：学习功法、养护身体、准备渡劫，让修为与手中器物真正派上用场。',
          '查证：分清亲见、转述和猜测，让证据相互印证，也让当事人自己说话。',
          '承担：救人之后要交接，立约之后要履行，离开之前要说清尚未完成的事。'
        ]},
        {heading: '先看入门，再看故事', paragraphs: [
          '这是一段可在本地独自游玩的旅程。山行闻见录中的基础篇可随时翻阅；标有剧情揭示的篇目会讲到后期人物身份、路线代价和终局。读到哪里，由你决定。',
          '书中说明的是已有玩法与故事。翻到某件物品或某条道路，并不等于角色已经取得它；亲手探索、相识和完成委托，才会留下属于这次行程的记录。'
        ], bullets: []}
      ],
      related: ['start-first-steps', 'world-backgrounds', 'world-identities', 'journey-volume-one'],
      sources: ['src/chapter.js#finishPrologue', 'src/chapter-data.js#temple', 'src/backgrounds-data.js#backgrounds']
    },
    {
      id: 'world-backgrounds', category: 'world', title: '五种成长来处，同一个林家孩子',
      summary: '五身世改变十年成长、行装与独立委托，也保留共同的父母与灭门旧案。',
      keywords: ['五身世', '雨夜遗孤', '寒门寄养', '街巷乞儿', '商旅寄身', '魔域来使'], spoiler: false,
      sections: [
        {heading: '身世选择在选择什么', paragraphs: [
          '五条开局都从十岁雨夜接起。你选择的是此后十年由谁庇护、在何处成长、成年时带着怎样的托付。寄养与互助不会改掉亲生父母，长命锁和林家的名字仍属于你。',
          '只有雨夜遗孤随玄衡行路十年。其余四条有各自的成长经历，二十岁后到蜀山借学或按约共学；不能把这些经历都理解成同一种师门身份。'
        ], bullets: [], table: {headers: ['来处', '十年经历', '成年后的独立牵挂'], rows: [
          ['雨夜遗孤', '随玄衡过州穿府，二十岁入蜀山。', '把亲见与传闻分开，回答报仇之后如何生活。'],
          ['寒门寄养', '在灾民共灶、薄田与药畦间长大。', '带着共灶粮契，核清粮药旧账与乡里的缺口。'],
          ['街巷乞儿', '经历救济院迁散，与街巷同伴跑腿互助。', '凭街巷结绳联络递送人，尊重对方是否署名作证。'],
          ['商旅寄身', '受商队庇护，学习验封签、走货路与记账。', '交代断路药箱的取用与损失，履行一次互保委托。'],
          ['魔域来使', '在魔域边地成长，成年受医部委托出使。', '核查药路，把副本送到约定的人手中，并决定如何公开。']
        ]}},
        {heading: '行装也是选择', paragraphs: [
          '部分身世可在不同的初始行装中选一份：口粮、药材、符料或救急丹各有实际用途。凭物则是委托的联络依据。交回粮契、结绳或封签，代表这笔事情已经办过，不能凭同一张旧凭物反复领奖。',
          '独立委托会记下你实际采用的方法。补药、保护姓名、如实交卷与强索补偿，各自承担不同的后果。完成过委托，不代表其中每一种做法都已经发生。'
        ], bullets: []},
        {heading: '来处不会替你决定以后', paragraphs: [
          '五身世都能接续共同的修行与青阳调查。魔域来使不会自动成为恶人，也不会自动走上魔尊长线；寒门与乞儿也不需要把贫困当作必须证明的品格。你可以照顾自己，同时决定愿为谁付出。'
        ], bullets: []}
      ],
      related: ['world-identities', 'world-factions', 'journey-volume-two'],
      sources: ['src/backgrounds-data.js#rain', 'src/backgrounds-data.js#poor', 'src/backgrounds-data.js#beggar', 'src/backgrounds-data.js#caravan', 'src/backgrounds-data.js#demon']
    },
    {
      id: 'world-identities', category: 'world', title: '来处、所学与归属：角色身份怎样分别理解',
      summary: '性别、身世、专长、宗门、行事和道侣各有记录；一项选择不会替代其余选择。',
      keywords: ['身份', '性别', '专长', '宗门', '善恶', '道侣', '跨修'], spoiler: false,
      sections: [
        {heading: '同一个人，可以有多种身份', paragraphs: [
          '一位在商队长大的女修，可以在经阁学阵，也可以后来研习药术、加入合欢宗。她曾受谁照应、如今擅长什么、向谁立过承诺，仍是几件不同的事。读人物页与任务条件时，先看清要求的是哪一种经历。'
        ], bullets: [], table: {headers: ['记录', '回答的问题'], rows: [
          ['性别', '这位主角如何自称，以及哪些人物路线适用于本次行程。'],
          ['身世', '十岁雨夜后在何处成长，带着哪份独立委托。'],
          ['修习专长', '在剑庐、药庐、经阁中的起步所学与已完成训练。'],
          ['宗门', '后来是否加入合欢宗，以及宗门修习、贡献与评价。'],
          ['实际行事', '怎样查证、救助、履约、交接，或怎样使用力量。'],
          ['道侣', '是否在明确成年、自愿的结契剧情中选择了唯一伴侣。']
        ]}},
        {heading: '所学可以继续生长', paragraphs: [
          '剑庐、药庐、经阁各有训练与所得，开局专长给你一条熟悉的入门道路。往后仍可学习其他功法，实际解法要看是否真的完成过相应训练、取得过所需物品。',
          '加入合欢宗保留来处、原有师承与任务；进入魔域长线也需要你在分歧处明确作出选择。亲缘援手、阵营合作与正式归属，都应分别理解。'
        ], bullets: []},
        {heading: '同意也要逐件确认', paragraphs: [
          '共同救人、赠送木簪、灯下备药、接受照护或一起修习，都有各自的意义。它们不会悄悄替你作出婚恋承诺。涉及共同修习、长期同行与道侣结契时，留意当事人这一次明确说了什么。'
        ], bullets: []}
      ],
      related: ['world-backgrounds', 'people-relationships', 'world-factions'],
      sources: ['src/backgrounds-data.js#backgrounds', 'src/chapter-data.js#trial', 'src/sects-data.js#doctrine', 'src/campaign-branches-data.js#relation-shen-vow']
    },
    {
      id: 'world-realms', category: 'world', title: '从凡人到大乘：修为与身体的变化',
      summary: '境界改变力量与身体需求，伤病、情感和各自的心愿仍要认真对待。',
      keywords: ['境界', '凡人', '金丹', '大乘', '身体', '照护', '渡劫', '散功'], spoiler: false,
      sections: [
        {heading: '境界的次序', paragraphs: [
          '本作的修行顺序是凡人、炼气、筑基、金丹、元婴、化神、合体、大乘。炼气至大乘各有初期、中期、后期与圆满。突破过程中的雷劫与守心考验，属于跨越境界所经历的事件；特殊终局所说的渡劫层次另有含义。',
          '修为不是一段称号。它会改变剑力、术法、护体与回灵，也会要求你完成准备、实际试炼和最后的稳定交付。各地的修行机会与法宝、功法、符药共同构成你的实力。'
        ], bullets: []},
        {heading: '仙凡身体各有所需', paragraphs: [], bullets: [
          '凡人、炼气与筑基阶段仍有饮食、休息和低阶身体需求。调养与照护可以自愿选择，女性角色不会因谢绝照护而被强加惩罚。',
          '金丹气机能够自循环，不再依靠吃喝维生，经期停止，也可入定代替常规睡眠。灵膳、药物和赴宴仍可用于疗伤、增益与相处。',
          '境界提高不会抹掉感官、情感或亲密愿望。气血伤势与灵力消耗仍需处理，不能因为已经结丹就把治疗与护持忘掉。'
        ]},
        {heading: '历史修为与眼前能力', paragraphs: [
          '散功归凡会实际关闭灵力、施法、法宝与灵甲的修为能力，身体重新按凡人的方式生活。旧收藏、知识和突破历史仍能查阅；普通饭食、工具、休息与照护也仍然可用。',
          '封功有自己的身体状态和能力限制。读角色当前的身体说明，比只看曾经达到的最高境界更可靠。已经留在历史中的修为，不代表此刻仍能调用。'
        ], bullets: []}
      ],
      related: ['combat-tactics', 'world-time', 'journey-mortal', 'journey-volume-four'],
      sources: ['src/chapter-data.js#ranks', 'src/campaign-data.js#realms', 'src/campaign-branches-data.js#mortalBody', 'src/campaign-branches-data.js#sealedPractice', 'src/campaign.js#bodyProfile']
    },
    {
      id: 'world-factions', category: 'world', title: '蜀山、江湖与魔域：势力不替人定善恶',
      summary: '认识山门、乡里与两界中的主要群体，也认识合欢宗的成年自愿修习约定。',
      keywords: ['蜀山', '魔域', '合欢宗', '天机阁', '丹鼎门', '法华宗', '势力', '两界'], spoiler: false,
      sections: [
        {heading: '山门之内与山门之外', paragraphs: [
          '蜀山是成年求学、同门相识与多次归来的地方。剑庐、药庐、经阁提供不同的修习入口；山门的恩情与规矩，也会在后来的经历中经受追问。',
          '山外的共灶、街巷、商队、济善堂与杏村医庐维持着普通人的生活。缺粮、药路中断、证人失联和伤者安置，都能改变一地的处境。这些人的委托值得按他们自己的需要理解。'
        ], bullets: [], table: {headers: ['势力或地方', '相遇时可留意的事情'], rows: [
          ['蜀山', '师承、同门、修习、值役，以及如何把案卷交代清楚。'],
          ['天机阁', '邀约与金令背后的条件，接受或回绝都要听清。'],
          ['丹鼎门、百草谷', '药样、配伍、医注和伤案各有具名的提供者。'],
          ['法华宗', '同行护持、照护与传承也需要明确接办者。'],
          ['魔域十二部', '农、医、铁、牧与义塾各有现实需要，部众并非同一种立场。'],
          ['两界渡口', '商约、修桥、伤者与赔偿，要落实到双方实际履约。']
        ]}},
        {heading: '合欢宗的两脉', paragraphs: [
          '合欢宗兼收双修与采补两脉，以实际行为形成清誉与威名。双修的同息一脉校准灵气往还；采补的摄元一脉学习按约控制份额，战时功法另有截流与反噬的差别。',
          '与云照的修习建立在双方成年、自愿、逐次立约之上。灵流份额、时限与停功手势须先说清，开始前可以取消。合修不会自动改成恋爱或道侣关系，也不准借修习之名伤害无辜。'
        ], bullets: []},
        {heading: '看行动，也听异议', paragraphs: [
          '魔域来处不自动等于邪恶，正道名号也不能代替证据。后来的平叛、问责与两界治理，都需要看清具体的人做了什么。旧友可以提出异议，部众可以说明自己的损失；你听不听，是另一项选择。'
        ], bullets: []}
      ],
      related: ['world-identities', 'journey-demon', 'journey-enlighten'],
      sources: ['src/sects-data.js#doctrine', 'src/sects-data.js#partner', 'src/campaign-data.js#tianji-negotiation', 'src/campaign-branches-data.js#demon-tribal-work', 'src/campaign-branches-data.js#demon-treaty']
    },
    {
      id: 'world-time', category: 'world', title: '岁月怎样留下来：年龄、告别与继任',
      summary: '纪年随实际经历推进；原人的历史和后来人的职责，各自保存各自的名字。',
      keywords: ['年龄', '寿数', '纪年', '时间', '继任', '告别', '人物历史'], spoiler: false,
      sections: [
        {heading: '纪年跟着行程走', paragraphs: [
          '从十岁雨夜到成年入山，再到多年巡行、治宗与交接，岁月由实际完成的阶段推进。长线中写下经过几年，意味着这一段事务已经完成；在原地看书、暂停思考，并不会替你办完多年后的事情。',
          '人物会有自己的年龄、伤势、去留与生死记录。年龄增长本身不会统一触发一条自动死亡线，也没有所有人共用的寿数表。医者、证人、修士与孩子，各按自己的实际经历变化。'
        ], bullets: []},
        {heading: '新的承诺有当下条件', paragraphs: [
          '有些新相识、新结契与共同长住的安排有年龄窗口。较晚来到一地时，可承担的事情会转为当下的照护、短期传承或与今日医者交接。早年已经发生的关系与任务，仍然保存在历史里。',
          '窗口限制的是现在还能开始什么，不会把以前真正在场、亲口说过的话删掉。遇到不能新办的事务，可读当前人物状态与任务说明，寻找适合此时的去路。'
        ], bullets: []},
        {heading: '继承职责，不代签人生', paragraphs: [
          '前人可以留下医书、证词、课程与未完史卷，后来人接手的是今日诊疗、判案、守陵与执笔的职责。原卷保留原人的署名，继任者也应以自己的名字说明所知与所愿。',
          '查阅旧档、在原地图看见接办者，都不会让已经离世的人复生。也不要把交卸工作一律理解成死亡：有人只是远行、退居或把日常职责交给后辈。个人历史与眼前在场情况，需要一起看。'
        ], bullets: []}
      ],
      related: ['saves-safety', 'people-healers', 'people-witnesses', 'journey-mortal'],
      sources: ['src/campaign-state.js#age', 'src/campaign-state.js#personAge', 'src/campaign-state.js#personStage', 'src/campaign.js#campaignPersonPresence', 'src/campaign-m6-story-data.js#clinic-succession', 'src/campaign-m6-story-data.js#enlighten-successor-handoff']
    },
    {
      id: 'world-ordinary-and-spirit', category: 'world', title: '器物有各自的分量：工具、信物、证据与法宝',
      summary: '会发出灵光的器物并不包办一切；纸、绳、药案与旧物也能打开真正的路。',
      keywords: ['普通工具', '法宝', '信物', '证据', '凭物', '物品用途', '器物留痕'], spoiler: false,
      sections: [
        {heading: '先问它用来做什么', paragraphs: [
          '木工工具用来查验与修整，绳具用来承重登崖，封签用来交代货路。普通布料、草药、纸张与证据不会因为重要就变成法宝；留意它们的来历和用途，往往能找到更稳妥的解法。',
          '灵器与法宝则按自身性质、品阶和触发生效。有些承担战斗护持，有些用于特定现场。不要只凭光亮判断价值，也不要把普通凭物当作能够无限通行的令牌。'
        ], bullets: []},
        {heading: '几种东西，几种保管方法', paragraphs: [], bullets: [
          '耗材：符药、材料和任务物按实际使用扣除。用掉的物资，不会因为后来重试就自动退回。',
          '证据：现场留痕、具名口述与原案实物各有来源，要按要求查验和呈交。',
          '信物：长命锁、木簪与狐簪各有独立来历，不拿来当作普通炼制耗材。',
          '凭物：粮契、结绳、封签联络特定委托，交回一次就留下这次履约的记录。'
        ]},
        {heading: '取得与知道，是两回事', paragraphs: [
          '在书中知道一件物品存在，不会把它放进行囊。任务提到的绳具、药样、护持物，也仍须在相应地点领取、制作或由当事人交付。',
          '同一类外形也可能对应不同物品：普通寒针与剧情中的冰魄银针分开记录，镇妖符样与后来取得的血色符纸也各有用途。查看名字和来源，能少走许多弯路。'
        ], bullets: []}
      ],
      related: ['people-keepsakes', 'world-backgrounds', 'journey-volume-two'],
      sources: ['src/chapter-data.js#tokens', 'src/story-data.js#evidence', 'src/backgrounds-data.js#backgrounds', 'src/campaign-data.js#heartcliff-inquiry']
    },
    {
      id: 'people-shushan', category: 'people', title: '山门初识：引路人、师长与同门',
      summary: '先认识眼前的人和他们自己的事情，再决定怎样与他们同行。',
      keywords: ['玄衡', '清微', '沈灵薇', '凌云子', '陈玄', '青栀', '同门'], spoiler: false,
      sections: [
        {heading: '从破庙到山门', paragraphs: [
          '玄衡在雨夜伸出援手，也问你报仇之后还想怎样生活。他的引路与安置，会依身世变成十年同行或不同的庇护托付。成年后，清微是你在蜀山求学与呈证时的重要师长。',
          '恩情会成为牵挂，也可能成为以后必须说清的责任。初识一位师长时，可以记住他的帮助；需要问案时，仍要把事实一项项核清。'
        ], bullets: [], table: {headers: ['人物', '相处时可记住的事'], rows: [
          ['沈灵薇', '同门相识从药庐的实际帮忙开始。她关心问案，也要让女弟子能够平等申诉。'],
          ['凌云子', '大师兄愿意承担保护与带人归山的责任，也有希望交给后来学生的旧物与学问。'],
          ['陈玄', '二师兄的经历需要本人手记、日期与口述相互核对，不凭传闻替他定性。'],
          ['青栀', '炼丹弟子重视药性、留样与配伍理由，希望救急药交到真正会用的人手中。'],
          ['玄都', '值役执事关心封印检查的规矩，也要求你听清塔中被囚者能证明什么。']
        ]}},
        {heading: '同门也有自己的去处', paragraphs: [
          '帮忙、照护、共事与谈心，可以建立长久情义。有人愿意留下教书，有人想继续求道或行旅；这些目标值得在关系亲疏之外单独听见。',
          '你可以成为可靠的朋友、同门与合作者。实用的救助与共同事业，不以接受恋爱为交换条件。'
        ], bullets: []}
      ],
      related: ['people-character-index', 'people-relationships', 'people-witnesses', 'journey-volume-one'],
      sources: ['src/backgrounds-data.js#rain', 'src/campaign-data.js#people', 'src/campaign-branches-data.js#relation-shen-case', 'src/campaign-branches-data.js#relation-lingyun-oath', 'src/campaign-m6-story-data.js#qingzhi-herb-introduction', 'src/campaign-m6-story-data.js#chen-night-record']
    },
    {
      id: 'people-healers', category: 'people', title: '山下的医者：阿杏、苏叶与济善堂',
      summary: '医馆中的人各有姓名、手艺与生活，救助和传承靠共同完成的事情建立。',
      keywords: ['阿杏', '杏花村', '苏叶', '苏华佗', '苏老头', '医馆', '沈红叶', '王婆婆'], spoiler: false,
      sections: [
        {heading: '阿杏有自己的医案', paragraphs: [
          '杏花村的阿杏是成年采药人，初次共同救助时二十二岁。她希望学会独立辨药与照护，让行旅和村中女子能够安心求医。一起采样、净煎、送药之后，你们可以作为朋友往来，也可以明确表示愿意慢慢相识。',
          '她想留下自己的病案署名、课程与出诊安排。亲近关系可以与事业相伴，却不会把她的学问与愿望都并入主角名下。村中王婆婆关心医塾和阿杏的生活，也不替成年人指定婚配。'
        ], bullets: []},
        {heading: '不同医者，各有所长', paragraphs: [], bullets: [
          '苏叶是百草谷女医，看重伤案能不能留给后人复查。她愿意带出能独当一面的接诊学生，也想继续自己的出诊与远行。',
          '济善堂的苏老头名叫苏华佗。旧医书与病案靠师徒传承；若后来由接诊医者当值，应向眼前的人请教，也保留原医者的署名。',
          '沈红叶是独立行走江湖的查案者。伤好后，她继续自己的线索；接受救治不等于今后必须一直跟随你。',
          '发热的行旅是需要这一程帮助的人。康复后，他会按自己的路程回家；留下来供复查的是病案。'
        ]},
        {heading: '照护是一件共同商量的事', paragraphs: [
          '先听本人愿望，再决定怎样帮忙。药材、净水、清洁、配伍与交接各有作用。无论朋友、道侣或普通同行，都能获得合适的救助；身体调养与照护可以自愿选择。'
        ], bullets: []}
      ],
      related: ['world-time', 'people-relationships', 'journey-mortal'],
      sources: ['src/campaign-data.js#apricot-aid', 'src/campaign-data.js#axing', 'src/campaign-data.js#suye', 'src/campaign-branches-data.js#old-su', 'src/campaign-branches-data.js#shenhongye', 'src/campaign-m6-story-data.js#suye-clinic-handoff']
    },
    {
      id: 'people-relationships', category: 'people', title: '朋友、亲近与道侣：怎样把承诺说清',
      summary: '共同经历不会自动结契；成年、自愿与明确选择构成唯一道侣的承诺。',
      keywords: ['关系', '道侣', '结契', '女女', '朋友', '成年', '自愿', '赠簪', '合修'], spoiler: false,
      sections: [
        {heading: '从相识开始，不替对方作答', paragraphs: [
          '赠簪、照护、共同备药、信任与最深牵挂，都会留下关系经历。它们表达当时的心意，之后仍可慢慢相识。最终的道侣身份要在明确的结契剧情中由你与对方亲口确认。',
          '可明确结契的候选包括沈灵薇、凝霜、阿杏，以及女主适用的凌云子路线。沈灵薇、凝霜与阿杏均支持男女主角的成年自愿关系；阿杏的成年女女相守也有独立的医馆收束。具体能否开始，仍取决于当前行程、本人状态与适用条件。'
        ], bullets: []},
        {heading: '先认识她或他想做什么', paragraphs: [], bullets: [
          '沈灵薇：愿意让问案者开口，让女弟子的申诉也能被认真听见。',
          '凝霜：重视受困者的姓名，也有自己对相伴与去留的选择。',
          '阿杏：希望医案与医课留下自己的姓名，平等安排出诊、教学和相处。',
          '凌云子：珍视授业与护山，也希望旧书匣能真正交到后来学生手里。'
        ]},
        {heading: '每一次回答都有意义', paragraphs: [
          '结契、作为朋友与明确谢绝，都是可以说清的回答。朋友与谢绝仍保留实际合作和实用收益，不会因为没有选择恋爱就撤走救助。',
          '唯一道侣的承诺不会由系统暗中分配。已有伴侣时，新的选择必须尊重这份承诺；人物已经离世或自主离场后，也不能再让本人签下新的约定。以前的相处记录仍可回看。',
          '合欢宗的合修约定单独确认，不自动改为恋爱或道侣。幼年的阿辰、凌霜属于受照护与受教育的人物，不能混入成年关系；亲属身份也不因亲近而改变。'
        ], bullets: []}
      ],
      related: ['world-identities', 'people-healers', 'world-time'],
      sources: ['src/campaign-branches-data.js#partners', 'src/campaign-branches-data.js#relation-shen-vow', 'src/campaign-branches-data.js#relation-ning-vow', 'src/campaign-branches-data.js#relation-axing-vow', 'src/campaign-branches-data.js#relation-lingyun-vow', 'src/sects-data.js#partner', 'src/campaign-state.js#personReason']
    },
    {
      id: 'people-family', category: 'people', title: '林家与凌家：亲族、同名与两件银簪',
      summary: '含亲缘与归墟剧情：厘清父亲清远、母亲凌玉杏、舅舅凌玉琅和外婆的身份。',
      keywords: ['亲族', '清远', '凌玉杏', '凌玉琅', '外婆', '阿杏', '素银簪', '身世真相'], spoiler: true,
      sections: [
        {heading: '最容易混淆的三个人', paragraphs: [
          '母亲凌玉杏、杏花村医者阿杏、归墟中被囚残魂的外婆，是三个截然不同的人：村中阿杏不会因为名字里带个杏字就变成主角生母，归墟外婆也不是母亲的另一重化名。',
          '凌玉琅是母亲凌玉杏的幼弟，也是你的舅舅。万妖秘境的验锁与口述建立亲缘线索，亲缘身份不会自动证明整件矿案，也不会改变你原有的宗门与道侣。'
        ], bullets: [], table: {headers: ['人物', '与林墨的关系', '应分开保存的来历'], rows: [
          ['清远', '父亲', '问道崖留有飞升偈、血书，以及需要分别核实的案物。'],
          ['凌玉杏', '母亲', '救出被掳孩子的往事，素银簪、旧糕模与杏花旗各有来历。'],
          ['凌玉琅', '舅舅', '与母亲的手足往事、两半铜锁及后来承担的责任。'],
          ['外婆', '母亲与舅舅的母亲', '被控残魂的身份与独立保存的遗簪。'],
          ['杏花村阿杏', '成年后相识的独立医者', '她自己的病案、关系经历和生活选择。']
        ]}},
        {heading: '父母留下的回答', paragraphs: [
          '父亲的字里有“守道，先守心”，也有未能护全家人的遗憾。他盼你不要只为寻仇而活。母亲的往事则由舅舅具体说起：她会害怕、会生气，也愿意放走被掳的孩子，盼过远离争斗的生活。',
          '母亲的素银簪与杏花旗承载她的心愿；外婆留下的银簪属于另一段告别。遗物值得逐件记来历，不能混成恋爱信物，也不能仅凭持有遗物要求他人服从。'
        ], bullets: []},
        {heading: '归墟中的母子相认', paragraphs: [
          '归墟受控残魂属于外婆。要破坏的是外在控魂阵，不能把被囚者当作应当攻击的敌人。阵断之后，凌玉琅与自己的母亲完成最后告别；她的残魂消散，遗簪另页收存。',
          '舅舅后来的牺牲也有真实的收殓与诀别。自己的长命锁空半壳仍留身边，他的半锁随葬；这段告别不会让任何一位亲人重新变成活着的同行者。'
        ], bullets: []}
      ],
      related: ['people-keepsakes', 'journey-volume-three', 'journey-volume-four', 'journey-demon'],
      sources: ['src/campaign-data.js#wanyao-trace', 'src/campaign-data.js#copy-cliff-sutra', 'src/campaign-data.js#read-father-bloodletter', 'src/campaign-data.js#guixu-family', 'src/campaign-data.js#war-aftermath', 'src/campaign-branches-data.js#demon-mother-legacy']
    },
    {
      id: 'people-witnesses', category: 'people', title: '证人各有一席：从塔中口述到三证对勘',
      summary: '含查案剧情：人物能证明的事情各有边界，后继者也不能替祖辈重演亲历。',
      keywords: ['证人', '老狐', '熊妖', '周三', '阿石', '陈墨', '陈玄', '三证', '证词'], spoiler: true,
      sections: [
        {heading: '塔中听见的，仍须复核', paragraphs: [
          '老狐与熊妖各自说出能亲证的往事。老狐关心同囚者，也提醒你别用自己的魂魄换取未经证实的话；熊妖见过青衫年轻人，他的所见应与外界“入魔逃亡”的说法分开。',
          '镜面、血字、封印裂纹与密道口述都能留证。第一次进七层，并不会把所有自称和身份直接变成定案；回山后仍要分别呈交、保留疑点。陈玄愿意交出的二十年手记，也应按日期和具体发作记录核验。'
        ], bullets: []},
        {heading: '三位证人，不是一份账册的三个名字', paragraphs: [], bullets: [
          '周三：青阳旧案的亲历者，只能说明真正看见的部分。证词应由本人知情、核认并署名。',
          '阿石：保存父亲矿图，愿让后人知道家中遇难的真相。她的证言与矿图、现场留痕一起核对。',
          '陈墨：曾在藏经阁当值，保存密信与删改账册；原账、销账与藏匿经过各有具体内容。',
          '护持狐火：使用前也要得到凝霜同意。它用于卷宗核验，不能免除证词、原账与删账的相互对勘。'
        ]},
        {heading: '后来人写今天的名字', paragraphs: [
          '归元堂后继判官承接周三一系的公义职责，冰原守陵后人接续陵地与名册，陈墨的关门弟子继续执笔史书。前人原卷保持原署名，后辈说明自己今日所知。',
          '周三的生前证词在他辞世后仍有效；阿石与陈墨的职责交接则不应被一概写成死亡。即使你没有亲见过原人，也能读到真实交托的旧卷，但那不等于自己曾与原人相识。'
        ], bullets: []}
      ],
      related: ['world-time', 'journey-volume-two', 'journey-enlighten'],
      sources: ['src/campaign-data.js#tower-duty', 'src/campaign-data.js#tower-trace', 'src/campaign-branches-data.js#enlighten-three-witnesses', 'src/campaign-branches-data.js#enlighten-compiled-case', 'src/campaign-m6-story-data.js#chen-night-record', 'src/campaign-m6-story-data.js#enlighten-successor-handoff']
    },
    {
      id: 'people-keepsakes', category: 'people', title: '旧物留痕：长命锁、木簪与狐簪',
      summary: '含汉墓与终章剧情：信物承载关系与来源，也有无法用修为抹平的消耗和告别。',
      keywords: ['长命锁', '锁芯', '空半壳', '桃木簪', '狐簪', '凝霜', '血色符纸', '信物'], spoiler: true,
      sections: [
        {heading: '长命锁：从来处到诀别', paragraphs: [
          '十岁时的长命锁是父母留下的旧物。它首先提醒你从哪里来，并不在童年破庙里凭空发光施法。后来的两半铜锁需要现场比验，也需要把亲缘口述与矿案证据分开。',
          '归墟终战中，母亲留下的锁芯余息被耗尽，用来护住元婴。消耗之后，自己的空半壳仍然保留；它不会刷新出第二枚锁芯。与舅舅合锁诀别后，他的一半随葬，你的一半仍随身。'
        ], bullets: []},
        {heading: '木簪：亲手做成的心意', paragraphs: [
          '雷击桃木先是一段需要顺纹削整的木料。削、磨与收尾使它成为可赠给沈灵薇的木簪，雷痕留在木里，不必靠外放灵光显示分量。',
          '赠簪记下一次真实的心意。后来仍要听灵薇自己的目标与选择，明确结契也仍需另一次相互确认。'
        ], bullets: []},
        {heading: '狐簪：记忆仍在，肉身没有回来', paragraphs: [
          '汉墓一役后，凝霜魂力散尽，只留下一支狐簪与“替我再看一眼蜀山月亮”的嘱托。狐簪作为独立信物留存；往后无论是残响还是护魂灯显相，都只是让你听见这位成年狐修生前留下的心愿，绝非肉身复活。',
          '轮回线会让你遇见前世的相似声音，也要求你逐世核对姓名。前世经历不能把凝霜与沈灵薇的人格、愿望或道侣承诺自动合成同一个人。'
        ], bullets: []},
        {heading: '物证也要保留自己的位置', paragraphs: [
          '血色符纸是凝霜交付的断邪印拓样，封存的邪功手札是另一份案物；二者需对照呈证。主棺中的凌玉玦玉牌、断剑与残谱，则留下三百年前的疑问。不能因它们与人物有关，就把它们全部当作情感信物。'
        ], bullets: []}
      ],
      related: ['world-ordinary-and-spirit', 'people-family', 'journey-loop'],
      sources: ['src/chapter-data.js#tokens', 'src/campaign-data.js#wanyao-trace', 'src/campaign-data.js#guixu-final', 'src/campaign-data.js#bury-lingyulang', 'src/campaign-branches-data.js#ning', 'src/campaign-branches-data.js#loop-awakening']
    },
    {
      id: 'journey-volume-one', category: 'journey', title: '卷一指路：雨夜、十年与成年入山',
      summary: '从破庙求生到成年求学，先完成眼前的小事，再走向更大的疑问。',
      keywords: ['卷一', '雨夜', '破庙', '玄衡', '成年入山', '剑庐', '药庐', '经阁'], spoiler: false,
      sections: [
        {heading: '破庙里的第一步', paragraphs: [
          '檐下的干柴与篮中的火石让火塘暖起来，怀里的长命锁保住你的来处。等身体安稳，再与玄衡交谈、决定以后十年的去路。童年负责求生与成长，感情线从成年相识展开。',
          '五身世在这里分开。随玄衡行路、在共灶寄养、靠街巷互助、寄身商队或在魔域边地成长，各自带来不同的行装与牵挂，成年后的共同旅程仍从蜀山求学接起。'
        ], bullets: []},
        {heading: '把所学变成能用的本事', paragraphs: [
          '二十岁到蜀山后，先到药庐与沈灵薇相见，再开始剑庐、药庐或经阁的起步训练。守而后发、辨药配伍、三灯归一都需要亲手完成。所得不仅是一段经历，也会带来可使用的功法与物品。',
          '之后可以继续研习其他功法、准备符药和整理器物。可选的旧阵适合练习搭配与收集，但青阳与汉墓的主线不会要求你先反复刷出某件装备。'
        ], bullets: []},
        {heading: '带着问题下山', paragraphs: [
          '三年修习后，青阳的失踪案让你第一次在传闻、物证与救援之间作出判断。身世委托也会在这里接续。先把手中看到的事情查清，不必急着为整个世界定出答案。'
        ], bullets: []}
      ],
      related: ['journey-map-index', 'world-backgrounds', 'people-shushan', 'journey-volume-two'],
      sources: ['src/chapter-data.js#temple', 'src/chapter-data.js#trial', 'src/backgrounds-data.js#narrative', 'src/story-data.js#qingyang']
    },
    {
      id: 'journey-volume-two', category: 'journey', title: '卷二解读：青阳失踪案、汉墓与锁妖塔',
      summary: '含卷二剧情：救回四个孩子、面对凝霜的托付，再把塔中疑点带回山门。',
      keywords: ['卷二', '青阳', '汉墓', '四个孩子', '王屠户', '凝霜', '锁妖塔', '查案'], spoiler: true,
      sections: [
        {heading: '青阳：从传闻走到现场', paragraphs: [
          '客栈传言把失踪案指向白狐。掌柜并未目击掳人，窗下白毛也只能证明有兽类靠近；三家口供、床铺、门闩、符样、童鞋与售符来路，需要分开记录。',
          '借用工具、安抚张阿婆与夜查王宅，都会补全不同的事实。王宅新土与北去白影把你引向墓林，但发现这些线索时，还不能把白狐定为凶手。'
        ], bullets: []},
        {heading: '汉墓：先察后行，先救后战', paragraphs: [
          '墓道有弩机、翻板与毒烟。检查轴盘、锚环、木板与通风石轮，选择符合手中物品与所学的办法通过。清心散与普通工具都有各自的用途。',
          '石室中的四个孩子需要逐一照护。凝霜并非传言中简单的害人白狐，王屠户的出现把矛盾带到眼前。守住入口、护送孩子回镇之后，还要完成善后、封存和回山呈证。',
          '凝霜魂力消散，狐簪与血色符纸留下不同的托付：一个承载牵挂，一个属于原案证据。救援结束不会把她改成常驻复活队友。'
        ], bullets: []},
        {heading: '锁妖塔：听见不等于定案', paragraphs: [
          '筑基后的当值从领镜、添符水、听老狐与熊妖说话开始。封印廊需要查裂纹与阵势，七层镜室还要验镜、拓字、分清残声与真实见闻。',
          '不要以魂换言。凌云子的密道口述与陈玄的疑点，也须带回给清微分别复核。塔中首访留下的是继续查证的方向；杏花村的春雨救助，则让你在大案之外结识阿杏和另一种生活。'
        ], bullets: []}
      ],
      related: ['people-witnesses', 'people-keepsakes', 'people-healers', 'journey-volume-three'],
      sources: ['src/story-data.js#evidence', 'src/chapter-data.js#crypt', 'src/chapter-data.js#tomb', 'src/campaign-data.js#tower-duty', 'src/campaign-data.js#tower-trace', 'src/campaign-data.js#tower-review', 'src/campaign-data.js#apricot-aid']
    },
    {
      id: 'journey-volume-three', category: 'journey', title: '卷三解读：金丹、万妖秘境与两半铜锁',
      summary: '含卷三剧情：三段凝丹劫、有限救援、矿案查证与回山、入魔、独立查证的分歧。',
      keywords: ['卷三', '金丹', '万妖秘境', '天机阁', '青霞', '林清风', '凌玉琅', '三途'], spoiler: true,
      sections: [
        {heading: '凝丹之后，邀请随之而来', paragraphs: [
          '闭关准备完成后，前雷、心魔与凝丹三段分别考验实际战斗和稳定气息。段间可回去整备，失败只重试当前段，最后交付才确认为金丹。',
          '天机阁的金令带着条件。无论怎样答复，前往万妖秘境前仍要核同行名册与所带物资。实力提高之后，更大的势力与旧案也会进入你的行程。'
        ], bullets: []},
        {heading: '一趟担架，三种优先', paragraphs: [
          '万妖外境先要击退追击、稳住伤者，再把有限的一趟接应投向人、证卷或符药。选择会影响这趟实际带回什么，不能把尚未搬走的东西都算作已经获得。',
          '进入内境后，查祭坛、断控制线、听林清风的医注、拓黑玉碑，再比验两半铜锁。林清风留下的具名药样可用于后续配制，但他的口述、舅舅的亲缘说明与矿案物证，仍是需要分别核对的材料。'
        ], bullets: []},
        {heading: '青霞截路与此后的三途', paragraphs: [
          '面对青霞，可据真实医注核配中和药样，或选择正面护证突围。选择方法之后仍须完成相应准备与实战，脱险后也要把留在现场的人接走。',
          '最后明确选择回山、入魔或独立查证。这会决定下一段道路，不会替你更改身世、宗门或伴侣。选择前可先看已有证卷、伤者与尚未交代的责任，再决定去哪里。',
          '秘境残魂另有危险的许诺。它的自称不能当作已核真相，吞噬力量与主动进入魔域长线也有不同的故事与后果。'
        ], bullets: []}
      ],
      related: ['people-family', 'journey-volume-four', 'journey-wander', 'journey-demon', 'journey-enlighten'],
      sources: ['src/campaign-data.js#jindan-tribulation', 'src/campaign-data.js#tianji-negotiation', 'src/campaign-data.js#wanyao-rescue', 'src/campaign-data.js#wanyao-trace', 'src/campaign-data.js#wanyao-breakout', 'src/campaign-data.js#jindan-crossroads', 'src/campaign-branches-data.js#forbidden-remnant']
    },
    {
      id: 'journey-volume-four', category: 'journey', title: '卷四解读：公审、治宗、归墟与天门',
      summary: '含卷四重大剧情：高境突破、双线救援、亲族告别与最后的去留。',
      keywords: ['卷四', '元婴', '化神', '合体', '大乘', '公审', '归墟', '天门', '女剑修'], spoiler: true,
      sections: [
        {heading: '把旧案带到众人面前', paragraphs: [
          '北荒整备与元婴试炼之后，要固定伤处、接人归山，再在金顶核矿账、签押与具名口述。若先前没有保全原卷，可从登记原簿补证；一趟救援的优先选择不会让旧案永远无从追查。',
          '七宗试剑、公开呈证与三宗反水相继发生。问道崖上的父书需要另行留存，攀崖可以破阵，也可以按步骤架绳。回金顶救护清微、完成化神之后，还要回矿地用仙魔两钥查实体痕迹，再进行公审。',
          '公审区分首恶、胁从与知情责任，听最后证词、平反林清风。师门恩情不能替代问责，问责也不应把所有人混成同一种罪责。'
        ], bullets: []},
        {heading: '门规落到日常，战事先备人', paragraphs: [
          '旧刑复核、经阁开放、义塾安置与两界首批交割，都要实际办理。治宗十年之后，你可选择在化神立道传法，也可以继续承担战事，筹盟、备物并经历北伐四年的合体试炼。',
          '归墟东西两线都要处理。西先保住阵材并减轻后续压力，东先保住伤营；另一线会留下真实的补修或清敌工作，没有靠阅读快慢决定的隐藏倒计时。凌云子以修为保全同门后仍然在世，十四岁的阿辰也仍需作为未成年弟子保护。'
        ], bullets: []},
        {heading: '归墟之后，还要走完告别', paragraphs: [
          '破外婆残魂的控魂阵、让舅舅完成告别，之后才面对玄玑中枢。锁芯余息耗尽，凌玉琅碎丹锁敌；终战后仍有收殓、合锁送葬、伤者康复与照护安排。',
          '战后三十年继续重铸、校准与交接，大乘突破经过仙、魔与众生三组劫。天门前的独登、携众或留世都需明确选择；愿同行的人须亲自表明意愿，不能因为亲近就被自动带走。',
          '女剑修终章另关心开放剑坪与不同人的自主去留。灵薇的西行、独自护山或与已明确结契的凌云子共守，都有各自最后要完成的事情。'
        ], bullets: []}
      ],
      related: ['people-family', 'world-time', 'journey-endings'],
      sources: ['src/campaign-data.js#summit-evidence', 'src/campaign-data.js#heartcliff-inquiry', 'src/campaign-data.js#huashen-trial', 'src/campaign-data.js#governance-review', 'src/campaign-data.js#war-order', 'src/campaign-data.js#guixu-final', 'src/campaign-data.js#heaven-gate', 'src/campaign-branches-data.js#female-sword-mandate']
    },
    {
      id: 'journey-wander', category: 'journey', title: '散修长线：江湖十年，有处可归',
      summary: '含散修剧情：济善堂、黑风寨、北境与冰原把旧案和不同的归途连起来。',
      keywords: ['散修', '济善堂', '黑风寨', '北境', '冰原', '黑令', '医仙', '江湖十年'], spoiler: true,
      sections: [
        {heading: '离开山门，也带着旧事', paragraphs: [
          '散修从整理已有案卷、明确下一程开始。济善堂先核今日伤案、辨药敷用，黑风寨则需查警哨与账页，再决定潜行护人还是正面止乱。路线中的工具、物资与证词都要有具体来源。',
          '在北境，有限传令与补给要求你选择伤员或军粮优先，另一项由守军接手。老帅的救援需要查清提审手续，令符、证词与联名也要来自真正愿意交付的人。冰原还要核三道同源异纹、照护矿道伤者。'
        ], bullets: []},
        {heading: '十年是三程实际行路', paragraphs: [
          '这一段巡行以济善堂、边关与冰原的实际交药、送卷和护温接续。十年后，旧人有自己的变化，医书也可能交给后来人。狐簪在护持下的显相，让你再次听见凝霜；她仍是残魂，并没有恢复肉身。'
        ], bullets: []},
        {heading: '路尽头不止一种回答', paragraphs: [], bullets: [
          '独行九州：结清委托，留下可供后来行旅使用的路册。',
          '江湖夜雨：完成证卷交接，再与凝霜说清各自的行程。',
          '故剑归蜀：补齐五证，回金顶承担保护凡人的巡察职责。',
          '黑令魔尊：八部响应之后，仍要处理军纪、粮食、俘虏与旧友异议。',
          '医仙之路：三地实诊、交药与雪山救助之后，把旧剑改成药具，留下能继续使用的医案。',
          '忠骨北荒：明确接受最后守阵的代价之前，先把证词和撤离路线送出去。'
        ]},
        {heading: '继续走向别的长线', paragraphs: [
          '十年后的分歧也保留赴魔域、继续证道、归凡与追索轮回的去路。散修是当前一段行程，不要求为了看见另一条道路就抹掉此前全部经历。'
        ], bullets: []}
      ],
      related: ['people-healers', 'world-time', 'journey-demon', 'journey-enlighten', 'journey-mortal', 'journey-loop'],
      sources: ['src/campaign-branches-data.js#journey-departure', 'src/campaign-branches-data.js#wander-charity', 'src/campaign-branches-data.js#wander-black-order', 'src/campaign-branches-data.js#wander-border-service', 'src/campaign-branches-data.js#wander-road-years', 'src/campaign-branches-data.js#wander-road-choice']
    },
    {
      id: 'journey-demon', category: 'journey', title: '魔尊长线：血脉、十二部与尊位的责任',
      summary: '含魔尊剧情：民生、平叛、政变与百年交接，让每一种统治和退位都有实际后果。',
      keywords: ['魔尊长线', '十二部', '万魔窟', '仁魔', '凌玉杏', '杏旗', '封功', '两界'], spoiler: true,
      sections: [
        {heading: '进入魔域由本人决定', paragraphs: [
          '进入这条长线前，先交代旧案、退路与双方所知。五身世中的魔域来使不会自动代你作这个决定；其他身世也可以沿真实分歧来到魔域。',
          '万魔窟先稳血脉、查失控征兆，再做结婴试炼。老魔头和青年同修阿九各有经验，不把失控当成修行的必需代价。往后的化神、合体和大乘，同样需要实际准备与劫战。'
        ], bullets: []},
        {heading: '十二部要粮药，也要能说话', paragraphs: [
          '修渠、核粮种、医药、农具与义塾是五件需要分别办妥的事。巫姑、老铁头、乌云琪琪格与部众各有需求与异议；凌霜此时还是需要安置与求学的孩子。',
          '反抗也有粮路争议，可以交账协商，也可以战场止乱。后来围山前先撤平民，政变之敌是玄玑势力，不能因旧同门在另一阵营就强迫杀害。舅舅的牺牲、母亲遗物的交付与两界修桥，都需要按实际时序走完。'
        ], bullets: []},
        {heading: '百年仍要面对具体的人', paragraphs: [
          '第十年照护、第二十年告别、第五十年遇刺与百年交接，分别留下新的责任。有人自然辞世，有人离任或独立接班；后来人不替原人签承诺，也不抹掉旧关系。'
        ], bullets: []},
        {heading: '尊位之后的去留', paragraphs: [], bullets: [
          '万魔之主：查无罪俘虏、颁不犯凡人的军令，并继续受两界旧约约束。',
          '魔隐之路：破约会带来边民离散与阻止破约者的牺牲，统治承担这些代价。',
          '回头是岸：交军权、核赔偿、自愿封功，之后以真实受限的身体进入塔底。',
          '北荒归客：把军权交给能履约的继任者，修好木屋，再听凝霜自己的回应。',
          '魔尊传火：以母亲遗物与杏旗为承诺，实际放还祭品、交接义塾并重订边约。',
          '继续追索轮回：保留另一条深查去路，先看清它自己的条件与代价。'
        ]}
      ],
      related: ['world-factions', 'people-family', 'world-time', 'journey-loop'],
      sources: ['src/campaign-branches-data.js#demon-entry', 'src/campaign-branches-data.js#demon-tribal-work', 'src/campaign-branches-data.js#demon-rebellion', 'src/campaign-branches-data.js#demon-coup', 'src/campaign-branches-data.js#demon-century', 'src/campaign-branches-data.js#demon-future-choice']
    },
    {
      id: 'journey-enlighten', category: 'journey', title: '证道长线：三证、公议与归元之约',
      summary: '含证道剧情：保护证人、追究师罪，并把两界共同生活的约定落实到多年事务中。',
      keywords: ['证道', '三证人', '公审', '清微', '归元之约', '三十一人', '剑冢', '大道同天'], spoiler: true,
      sections: [
        {heading: '真相要有人能够亲口说', paragraphs: [
          '周三、阿石、陈墨各有能证明的部分，也各自需要安全、知情与独立署名。元婴守心之后的查访与卷宗夜，要把证词、原账、删账和得到同意的狐火核验相互对照。',
          '卷宗齐备后，可以继续公开问责，也可以明确停止追查、自封剑冢。剑冢之路要交代未结卷宗与职责，其终局是停止回应的封闭去路，不能当成成功守山的同义选择。'
        ], bullets: []},
        {heading: '公审也要审到师门', paragraphs: [
          '在金顶让三位证人分别发言，再面对被揭面的玄玑。化神试炼之后，清微的帮助与隐瞒都要真实呈现，不能靠一句道歉覆盖旧案。他承担问责，证人也有自己的告慰与告别。'
        ], bullets: []},
        {heading: '归元之约不是一句签名', paragraphs: [
          '通商第五年、止叛第十年、义学第二十年与正式签约第三十年，都有具体事务。再往后的照护、自然告别和后继交接，也需要看清各人的愿望与实际生活。',
          '原证人留下原卷，后继判官、守陵人和新执笔者承接今日职责。已亡者不会被自动带入同登名册，仍在世而交卸工作的人也不会被擅自写成已故。'
        ], bullets: []},
        {heading: '同天或独守，各有最后的事', paragraphs: [
          '三十位自愿同行者与主角合计三十一人。合体、大乘的试炼与同登意愿分别核实，最后共同开界还要由守锚、护伤与开路三组完成实际护持。',
          '另一条道路是留守蜀山，以御敌、避灾和传承回应千年岁月中的需要。独守并不等于没有他人的人生；你留下能交给后来人的护山记事，也尊重别人选择自己的路。'
        ], bullets: []}
      ],
      related: ['people-witnesses', 'world-time', 'journey-endings'],
      sources: ['src/campaign-branches-data.js#enlighten-three-witnesses', 'src/campaign-branches-data.js#enlighten-case-direction', 'src/campaign-branches-data.js#enlighten-master-trial', 'src/campaign-branches-data.js#enlighten-treaty', 'src/campaign-branches-data.js#enlighten-thirty-one', 'src/campaign-branches-data.js#enlighten-final-vow']
    },
    {
      id: 'journey-mortal', category: 'journey', title: '归凡长线：一间屋、一座医塾与一生烟火',
      summary: '含归凡剧情：散功后的日常、疫病洪水、医塾传承与阿杏的不同相处结局。',
      keywords: ['归凡', '散功', '杏花村', '阿杏', '医塾', '瘟疫', '洪水', '杏林同心'], spoiler: true,
      sections: [
        {heading: '散功之前，先把旧责说清', paragraphs: [
          '归凡需要本人明确确认，并先保管可用的恢复点。散功之后，灵力、施法与灵物被动实际停用；收藏与历史修为仍保留。以普通身体生活，要靠短工、修屋、种药和真实工具，也要吃饭、休息与照顾身体。',
          '低阶女性调养与日常照护是可选安排。阿杏与你都能提出自己的需要，共同生活也不替任何人强定婚育。'
        ], bullets: []},
        {heading: '医馆与课室一起开门', paragraphs: [
          '接诊、出诊、采购与识字辨药课程各有独立安排，医者和教习分别署名。疫病要查三处病例、补料、配伍、分送；救人不以对方愿意结契为交换。',
          '杏河涨水时，救人或保粮的先后会留下另一件要补的事情。灾后还要修屋、复种、整理受潮医案与学生名册。你做过的留种与准备，会在这里派上用场。'
        ], bullets: []},
        {heading: '来得早晚，传承安排不同', paragraphs: [
          '适合共同长住时，医塾可走过五十年传承；较晚开始时，改为十年的接续。更晚的来访则与今日接诊者核旧案、交课程、药柜和减免条款，不能让已离世的人再次坐回诊案。',
          '年龄窗口限制新开始的安排，不撤销曾经合法完成的相处与承诺。医馆、私塾、相守与重逢，会据已经发生的关系和传承给出不同收束。'
        ], bullets: []},
        {heading: '杏树下的不同回答', paragraphs: [], bullets: [
          '烟火人间：已有明确相守承诺的人走完照护、告别与医塾交接。',
          '桃李天下：最后一课之后，由能独立试讲的学生接过课程与钥匙。',
          '人间医仙：将疫案、药柜、公开医课与减免条款交给今日医者。',
          '白首重逢：照护、告别、守庐与修笛之后，以临终重逢的暖意回望成年初识。',
          '杏林同心：两位明确相守的成年女医者各有志愿与署名，共同传课，不抹去任何一人的独立生活。'
        ]}
      ],
      related: ['world-realms', 'people-healers', 'people-relationships', 'world-time'],
      sources: ['src/campaign-branches-data.js#mortal-renunciation', 'src/campaign-branches-data.js#mortal-plague', 'src/campaign-branches-data.js#mortal-flood', 'src/campaign-branches-data.js#mortal-life-years', 'src/campaign-branches-data.js#mortal-final-choice', 'src/campaign-branches-data.js#mortal-women-clinic', 'src/campaign-m6-story-data.js#mortal-clinic-inheritance']
    },
    {
      id: 'journey-loop', category: 'journey', title: '轮回长线：九十九世、天门与四种代价',
      summary: '含最深层真相：代表前世、护魂查证与碎轮、守门、化入、铺路的不同选择。',
      keywords: ['轮回', '九十九世', '凝霜', '天门', '碾磨', '守门', '铺路五千年', '前世'], spoiler: true,
      sections: [
        {heading: '先验碎片，再进入记忆', paragraphs: [
          '冰原南裂隙、东矿纹与北冰台的三道留痕，要与旧狐簪、护魂记录实际比验。进入白光之后，先分清回忆与当下：旧世经历不能带回物资，不能替现实人物复活，也不能用前世婚姻覆盖今生承诺。',
          '旧世可能响起与故人相似的声音，仍要先核那一世的姓名。凝霜与沈灵薇各有独立经历，前世的相似不取消她们眼前的愿望与选择。'
        ], bullets: []},
        {heading: '三段重历，九十六册其余记忆', paragraphs: [], bullets: [
          '第五世的将军：查召令与粮道，撤离平民、交接兵权，面对忠义与退路。',
          '第十世的医者：沿病案配药救人、免诊问意，看见凡常相伴与一生的终点。',
          '第三十七世的魔域守土者：核血仇与边民处境，留下不伤凡人、允许通商的政令。',
          '其余九十六世按记忆册章目核对归档。你无需把九十九世全部重复生活一遍，才能理解它们共同留下的问题。'
        ]},
        {heading: '天门之后，先救姓名', paragraphs: [
          '飞升名册、碾磨流向与无名魂影揭出另一条关于天门的道路。这是深入轮回之后取得的真相，不应在尚未查到这里时替所有人的见闻提前作答。',
          '在讨论怎样改变碾磨之前，要先护魂、导流并护送仍能渡行的魂影。凝霜留下的避难与护名见证，也需要与实际所见核对。'
        ], bullets: []},
        {heading: '知道代价，再择路', paragraphs: [], bullets: [
          '碎轮：先给众生留下退路、听凝霜自己的决定，之后面对碾磨崩散的灾变与重组，故事回到雨夜。',
          '共守：双方分别确认放下人间身份，交妥职责，点亮第一盏护名灯，承担守门的长久责任。',
          '化入：交还姓名与记忆，以失去个人归途的代价接入轴心，护住后来经过的人。',
          '返世铺路：把识字辨药、过冬救护与两界来路写成三册，交给五千年道路上的后来人。'
        ]}
      ],
      related: ['people-keepsakes', 'people-relationships', 'journey-endings'],
      sources: ['src/campaign-branches-data.js#loop-investigation', 'src/campaign-branches-data.js#loop-awakening', 'src/campaign-branches-data.js#loop-memory-review', 'src/campaign-branches-data.js#loop-mill-investigation', 'src/campaign-branches-data.js#loop-path-choice', 'src/campaign-branches-data.js#loop-five-thousand-road']
    },
    {
      id: 'journey-endings', category: 'journey', title: '读懂终局：三十二种收束与尚可返回的行程',
      summary: '含终局结构与路线差别：主动的生死分歧、留世与登天、相守与传承各有独立意义。',
      keywords: ['结局', '终局', '三十二种', '路线', '恢复点', '只读', '失败保留', '杏林同心'], spoiler: true,
      sections: [
        {heading: '三十二种收束，从哪里来', paragraphs: [
          '本作收录三十一种原有终局，加上成年女女阿杏路线的“杏林同心”，共三十二种。它们有共同的前序，也有各自必须完成的选择、事务与代价；标题相近时，仍应读具体回顾。',
          '有的终局在较早阶段就能作出，例如化神留山传法；有的需要走完大乘、长期治理或轮回查证。把修为修到最高，不会自动替你取得每一种不同的人生。'
        ], bullets: []},
        {heading: '这些道路怎样分别理解', paragraphs: [], bullets: [
          '独自入仙门、携愿同行者登天、留在人间，是天门前不同的去留；证道的三十一人共同开界另有多年归元与分组护持。',
          '守山有授业护民、女剑修开放剑坪与明确伴侣共守等不同收束；自封剑冢则包含停止追查与封闭出口的后果。',
          '主动进入魔域、黑令统领、破约称霸与吞噬秘境残魂，各有不同来路，不能只看一个“魔”字便当作同一结局。',
          '归凡的相守、教学、医馆传承与重逢，依靠已发生的关系和最后交托；朋友道路同样有完整的事业与生活。',
          '轮回的碎轮、守门、化入与铺路，改变的是你怎样面对碾磨及后来众生，代价不尽相同。'
        ]},
        {heading: '战斗失利与主动终局', paragraphs: [
          '普通战斗失利保留已经取得的永久所得，并按当前规则重试；已使用的符药不会退回。它与主动接受的危险终局不同：强引未稳灵气、吞噬残魂、北荒最后守阵或未待合体就死守山门，都有需要本人读清并确认的前因。',
          '结局中的身陨、牺牲与告别属于这段人生的真实收束，不应写成清空全部收藏，也不应把人物死亡解释成普通战败后立刻复生。'
        ], bullets: []},
        {heading: '结束之后怎样看回去', paragraphs: [
          '终局后，主线与场中时间停止推进，你仍可回顾已有经历。若此前保存了可返回的恢复点，可从相应的真实前序另择道路；外部载入的档案只承认实际带来的历史，不会替你补造一个从未保存过的更早起点。',
          '看见终局名目不会立即解锁终局，读完本册也不会改变存档。挑选下一条想走的路时，先想清想与谁同行、愿承担什么，再核对当前任务与条件。'
        ], bullets: []}
      ],
      related: ['journey-ending-index', 'saves-safety', 'journey-volume-four', 'journey-wander', 'journey-demon', 'journey-enlighten', 'journey-mortal', 'journey-loop'],
      sources: ['src/campaign-branches-data.js#endings', 'src/campaign-branches-data.js#admission-overdraw', 'src/campaign-branches-data.js#forbidden-remnant', 'src/campaign-branches-data.js#huashen-desperate-defense', 'src/campaign-branches-data.js#recoveryChoices', 'src/campaign-state.js#deriveEnding', 'src/campaign.js#campaignEnding']
    }
  ];

  const data = {categories, articles};
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.XiuxianAlmanacWorld = data;
})(globalThis);
