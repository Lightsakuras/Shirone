(function (root) {
  'use strict';

  // 原作仅有共享雨夜；其余四路是保留林墨双亲与灭门旧案的平行成长改编。
  // 凭物是一次独立委托的普通纸、绳、木牌；不消耗原案物证与核心信物。
  const backgrounds = {
    rain: {
      id: 'rain', name: '雨夜遗孤', birth: '原作路线 · 林家幸存者', faction: '蜀山',
      summary: '十岁雨夜遇玄衡，随他游历十年，二十岁上蜀山。长命锁贴在心口，血案要查，报仇之后往哪走也得自己答。',
      opening: {
        title: '雨夜里，先活下去',
        text: '长命锁贴着心口。这一宿先寻柴、生火、听玄衡交代，熬过去再随他上山。',
        choices: [{id: 'inherit', label: '随玄衡上路', desc: '收妥长命锁，随玄衡走州过府。', cost: {}, gain: {}, token: null, result: '玄衡掰了半块干饼递过来，等你喘匀气，领你迈进山路。'}]
      },
      mission: {
        title: '玄衡的问话 · 报仇之后呢',
        text: '青阳镇又把外乡人叫作妖邪。查清真凭实据后，可在迎客来留一页行路记。',
        requires: {evidence: ['shoe', 'rumor'], deductions: []},
        choices: [
          {id: 'careful_witness', label: '把“看见”与“听说”分开记', desc: '需先推得“白毛不足以定罪”。', cost: {}, gain: {}, consumeToken: false, requires: {deductions: ['caution']}, result: '你在迎客来留下一纸见证：丢孩子是真，白狐传言也是真，没查实前不能硬拧成一桩。', echo: '回山前你又翻了那页纸：别让没做过恶的人，被几句传闻推上绝路。'},
          {id: 'children_first', label: '等四个孩子平安，再记他们的话', desc: '需先救回汉墓四个孩子。', cost: {}, gain: {}, consumeToken: false, requires: {rescued: true}, result: '你等四个孩子平安归家，才记下他们肯说的话，不逼惊魂未定的孩子重提黑墓。', echo: '回山记事头一行先写四个平安归来的名字，这一路不止剩下一桩血仇。'}
        ]
      },
      narrative: {
        arrival: '十岁雨夜随玄衡出庙，游历十年后上蜀山。清微收你入门，剑庐、药庐、经阁任挑一门，先去药庐见沈灵薇。',
        commission: '修习三年，你下山赴青阳查孩童失踪案。走访有据后，可去迎客来留一页行路见证。',
        return: '青阳物证呈交清微；留在客栈的行路记，是你替这一趟留下的自己话。'
      }
    },
    poor: {
      id: 'poor', name: '寒门寄养', birth: '平行成长 · 灾后共灶寄养', faction: '凡尘乡里',
      summary: '林家遭难后在山下灾民共灶长大，二十岁带乡里盘缠上蜀山借学，怀里揣着一笔粮药旧账。',
      opening: {
        title: '共灶前的一只粗瓷碗',
        text: '十岁雨夜由灾民共灶收留，满二十岁上蜀山借学。共灶底子薄，两份行装只能挑一份。',
        choices: [
          {id: 'medicine_for_all', label: '把口粮换成药材与山泉', desc: '偏炼丹与筹药，日后也可还共灶药账。', cost: {}, gain: {herb: 2, water: 1}, token: {id: 'poor_grain_receipt', name: '共灶粮契', desc: '记着乡亲托付的粗纸粮契。青阳查清买符口供、安抚张阿婆后，在迎客来交契办结。'}, result: '婶娘把草药扎紧，粮契折进外层：“草药能救急，记得是大伙省出来的。”'},
          {id: 'food_for_road', label: '先留口粮，把路走稳', desc: '自带回血口粮，稳妥起手。', cost: {}, gain: {cake: 2, water: 1}, token: {id: 'poor_grain_receipt', name: '共灶粮契', desc: '记着乡亲托付的粗纸粮契。青阳查清买符口供、安抚张阿婆后，在迎客来交契办结。'}, result: '你把两块杏花糕收进包袱，粮契贴身收妥，先把身子骨顾稳再上路。'}
        ]
      },
      mission: {
        title: '共灶旧账 · 谁先有一口热饭',
        text: '镇上有人挪用口粮钱买镇妖符。查实三家买符口供、安抚张阿婆后，持粮契回迎客来定夺。',
        requires: {evidence: ['sales', 'comfort'], deductions: []},
        choices: [
          {id: 'share_medicine', label: '先送药水，共灶把口粮分回来', desc: '以药换糕，与乡里互通有无。', cost: {herb: 2, water: 1}, gain: {cake: 2}, consumeToken: true, result: '你交出青灵草与山泉水照看病患，联络人收下粮契，按规矩分回两块杏花糕。', echo: '回山后共灶捎来字条：“药煎上了，分你的糕也记了账。”两不相欠，仍是互相搭把手的人。'},
          {id: 'settle_household', label: '先结寄养户的份额，写清欠领', desc: '只清自家份额，不替旁人垫缺口。', cost: {paper: 1}, gain: {herb: 2}, consumeToken: true, result: '你拿符纸立账，只把寄养户名下的两株青灵草结清收好，其余亏空照实留账。', echo: '婶娘捎话谢你顾家，也提了邻家亏空未补。你守住了自家份额，没替旁人兜底。'}
        ]
      },
      narrative: {
        arrival: '十岁雨夜后在山下共灶长成，二十岁带乡里盘缠上蜀山，清微准你借学三门。怀里还揣着共灶粮契，先去药庐帮沈灵薇。',
        commission: '借学三年后，怀里的共灶粮契引你赴青阳查案。查清三家买符口供、安抚张阿婆后去迎客来交契。',
        return: '青阳物证呈交清微；共灶的粮药旧账归入乡里账册，来处没忘。'
      }
    },
    beggar: {
      id: 'beggar', name: '街巷乞儿', birth: '平行成长 · 街巷互助求生', faction: '江湖街巷',
      summary: '林家遭难后在街巷讨饭跑腿，靠同伴帮衬活到成年。上蜀山借学谋一条生路，也寻青阳失联的同伴。',
      opening: {
        title: '巷口的结绳',
        text: '十岁雨夜托给街巷熟人，十年摸爬滚打后上蜀山借学。挑一份行装，带上三结麻绳作认人暗记。',
        choices: [
          {id: 'keep_rations', label: '带上同伴分的口粮，再走远路', desc: '留口粮回血，到青阳也能接济同伴。', cost: {}, gain: {cake: 2}, token: {id: 'beggar_route_knot', name: '街巷结绳', desc: '三结旧麻绳，街巷认人暗记。青阳查清童鞋细节与白毛传闻后，在迎客来交绳办结。'}, result: '你拿油纸包好两块杏花糕，同伴指指绳结：“到了地方，只问亲眼见过什么。”'},
          {id: 'carry_road_tools', label: '把托来的引灵香与净水带齐', desc: '带功能道具开路，方便破局与炼药。', cost: {}, gain: {incense: 1, water: 1}, token: {id: 'beggar_route_knot', name: '街巷结绳', desc: '三结旧麻绳，街巷认人暗记。青阳查清童鞋细节与白毛传闻后，在迎客来交绳办结。'}, result: '你把熟人托捎的引灵香和山泉水一一清点收好，十年跑腿攒下的门道没丢。'}
        ]
      },
      mission: {
        title: '递送人的名字 · 谁愿意作证',
        text: '跑腿送符的同伴不敢露面。核实张阿婆的童鞋口述、推得“白毛不足以定罪”后，持结绳回迎客来定夺。',
        requires: {evidence: ['shoe', 'fur'], deductions: ['caution']},
        choices: [
          {id: 'protect_witness', label: '先安置联络人，不公开街巷姓名', desc: '隐去同伴姓名，护住街巷退路。', cost: {cake: 1, water: 1}, gain: {incense: 1}, consumeToken: true, result: '你推过吃食让联络人安顿同伴，案卷只记经过不写人名。对方回赠一束引灵香。', echo: '回山收到短笺：“弟兄们的名字没上街墙。”你守住了街巷的规矩。'},
          {id: 'sign_statement', label: '请愿意出面的联络人署名作证', desc: '征得本人同意后落名作证。', cost: {paper: 1}, gain: {needle: 2}, consumeToken: true, result: '问准对方点头后，你铺纸请他画押，结绳与抄件捎回街巷，那边按规矩折了两枚寒针作脚力钱。', echo: '署名那人捎信说，头一回有人先问他愿不愿意再让画押，但也提醒你他只代表自己。'}
        ]
      },
      narrative: {
        arrival: '十岁雨夜后靠街巷同伴活到成年，二十岁揣着三结麻绳上蜀山，清微准你借学三门。先去药庐见沈灵薇。',
        commission: '借学三年，顺着失联递送人的口信赴青阳查案。查清童鞋与流言边界后，回迎客来定夺作证之事。',
        return: '青阳铁证呈交清微；街巷结绳与同伴回话另收一页，没忘当年分饼的来路。'
      }
    },
    caravan: {
      id: 'caravan', name: '商旅寄身', birth: '平行成长 · 商队庇护', faction: '江湖商旅',
      summary: '林家遭难后随行商队走货盘账十年，二十岁凭商队担保上蜀山借学，青阳断掉的药路还等你去结账。',
      opening: {
        title: '封签落笔，货与人都要记清',
        text: '十岁雨夜由行商队收留，十年跟车盘账后上蜀山借学。临行挑一份跟车行装，并领商队互保封签。',
        choices: [
          {id: 'ledger_supplies', label: '带符纸与灵砂，自己备齐耗材', desc: '多备画符材料，灵活实用。', cost: {}, gain: {paper: 2, dust: 1}, token: {id: 'caravan_seal_stub', name: '商队互保封签', desc: '查验药路的木印封签。夜探王宅查到新土并见过北去白影后，在迎客来交签结账。'}, result: '你挑了符纸与灵砂，大掌柜递来封签：“亲眼查清了，再往上面填字。”'},
          {id: 'reserve_medicine', label: '先留一枚救急丹，少带耗材', desc: '留急救丹药，自保或补药两用。', cost: {}, gain: {potion: 1}, token: {id: 'caravan_seal_stub', name: '商队互保封签', desc: '查验药路的木印封签。夜探王宅查到新土并见过北去白影后，在迎客来交签结账。'}, result: '你把回气丹贴身收妥，每一笔支取都要亲手写明白。'}
        ]
      },
      mission: {
        title: '断路药箱 · 封签上该写谁的损失',
        text: '商队联络人在迎客来等你交封签。夜探王宅查实新土、亲见北去白影后，回来结清这笔账。',
        requires: {evidence: ['soil', 'trail'], deductions: []},
        choices: [
          {id: 'replace_medicine', label: '补回救急丹，把互保账结清', desc: '垫丹平账，换取商队回付符纸。', cost: {potion: 1}, gain: {ward: 1, paper: 1}, consumeToken: true, result: '你补进一枚回气丹并填妥封签，商队回付护身符与符纸各一，账目两清。', echo: '回山收到商队回执：救急丹已入库，一笔归一笔，两不拖欠。'},
          {id: 'claim_cargo', label: '先拿货抵自己的损失', desc: '先领灵砂寒针抵损，不补商队缺药。', cost: {}, gain: {dust: 2, needle: 1}, consumeToken: true, result: '你按折损领走灵砂与寒针，联络人照规矩交割，也挑明药队缺的救急丹还没着落。', echo: '商队回执末行添了一句：“下回同行，先说清谁替谁担险。”'}
        ]
      },
      narrative: {
        arrival: '十岁雨夜后随行商队走货十年，二十岁凭担保上蜀山借学三门。先去药庐帮沈灵薇搭把手。',
        commission: '借学三年后赴青阳查失踪案，顺道核清断掉的药路。查实王宅新土与北去白影后回迎客来结账。',
        return: '青阳铁证呈交清微，互保封签归入商队账册，一路来去有账可查。'
      }
    },
    demon: {
      id: 'demon', name: '魔域来使', birth: '平行成长 · 魔域边地庇护', faction: '魔域医部',
      summary: '林家遭难后随边地救济队入魔域长大，二十岁奉医部之命出使蜀山借学，共查青阳药路。',
      opening: {
        title: '边药行牌 · 把委托带出黑雾',
        text: '十岁雨夜由魔域医部救济队收留，二十岁持「边药行牌」出使蜀山借学。临行前挑一份行装。',
        choices: [
          {id: 'carry_relief', label: '带救急丹与护身符出使', desc: '稳妥自保，兼顾沿途救人。', cost: {}, gain: {potion: 1, ward: 1}, token: {id: 'demon_border_pass', name: '边药行牌', desc: '魔域医部联络木牌。青阳查清假符与汉墓残符后，在迎客来交牌销账。'}, result: '联络人递来丹药、护身符与木牌：“药揣在包里不算数，送到谁手里才作数。”'},
          {id: 'carry_force', label: '带火符寒针，准备自己开路', desc: '偏进攻破障，遇阻自己开道。', cost: {}, gain: {fire: 2, needle: 2}, token: {id: 'demon_border_pass', name: '边药行牌', desc: '魔域医部联络木牌。青阳查清假符与汉墓残符后，在迎客来交牌销账。'}, result: '你挑了燃火符与寒针防身，联络人递过木牌，只叮嘱记清扎在谁身上。'}
        ]
      },
      mission: {
        title: '魔域药路 · 证据要送回谁手里',
        text: '查清符样、买符口供、推得“白毛不足以定罪”并核验墓林残符后，回迎客来交牌销账。',
        requires: {evidence: ['paper', 'sales'], deductions: ['caution']},
        choices: [
          {id: 'relief_and_open_copy', label: '救回孩子，补药，并公开同份副本', desc: '需核验残符并救回孩子，两头坦诚交底。', cost: {potion: 1, paper: 1}, gain: {ward: 1, qingxin: 1}, consumeToken: true, requires: {tombClues: ['burntPaper'], rescued: true}, result: '你补上回气丹，誊清同份抄件分别封回魔域与留给青阳见证人，获护身符与清心散。', echo: '医部复信确认补药与抄件妥收，青阳也留着同份底稿。两边都见了同一份实情。'},
          {id: 'sealed_report', label: '按委托如实封回副本，保留公开决定', desc: '需核验墓林残符，只封发医部不对外公开。', cost: {paper: 1}, gain: {qingxin: 1, herb: 1}, consumeToken: true, requires: {tombClues: ['burntPaper']}, result: '你据实誊清已查证的线索，交牌单独封回医部，领得清心散与青灵草补给。', echo: '医部封函已妥收，你办完了本分差事；青阳镇上却从未见过那页底稿。'},
          {id: 'coerce_compensation', label: '扣住同行货物，强索一份补偿', desc: '需核验墓林残符，亮牌施压强扣同行货担。', cost: {}, gain: {fire: 2, dust: 2}, consumeToken: true, requires: {tombClues: ['burntPaper']}, result: '你亮牌施压扣下同行货担，强收燃火符与灵砂；联络人交牌时把经过如实封回魔域。', echo: '医部复信驳议你擅扣同行货物。火符灵砂落进了口袋，怨气与旧账也一并留了下来。'}
        ]
      },
      narrative: {
        arrival: '十岁雨夜后由魔域医部抚养长大，二十岁持行牌出使蜀山。清微与你立约共核，准你以客修借学三门，先去药庐见沈灵薇。',
        commission: '客修三年，你赴青阳查失联药路并与蜀山共查失踪案。核验假符与汉墓残符后，回迎客来交牌销账。',
        return: '青阳主线铁证呈清微共核，医部抄件由联络人封回魔域。客修归山，仍是魔域来使。'
      }
    }
  };

  const data = {backgrounds, defaultId: 'rain'};
  if (typeof module === 'object' && module.exports) module.exports = data;
  else root.XiuxianBackgroundsData = data;
})(globalThis);
