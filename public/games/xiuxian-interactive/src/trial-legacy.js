(function(root){
  'use strict';
  const D=typeof module==='object'&&module.exports?require('./rogue-data.js'):root.XiuxianRogueData;
  const books={
    lamp:['矿灯缺了一齿','通关第 3 波','凝霜把矿灯的灯芯剪短一截。风从岩缝哪头钻进来，火苗便往另一头斜。\n小矿工举锤想把缺齿的灯罩敲圆，她伸指按住锤柄：“留着这一齿。”\n次日旧井倒灌、矿道全黑，一队人就凭指腹摸着那道缺口，迎风摸出了活路。'],
    ruler:['十年一寸','通关第 9 波','玄衡的旧木尺背上，刻着两道歪斜的浅痕。同路人猜是量山口风向的，他只摇头。\n头一道，是十年前借宿农户时量那家娃娃的个头；后一道，是今年路过时补刻的。\n那孩子如今接过药囊，已要低头弯腰，才能同他比一比高矮。'],
    bell:['失声的铜铃','通关第 15 波','守塔人夜夜摇铃报平安。那一夜风急，铃绳空晃，铜舌却掉进了石阶深缝。\n他撕下值夜簿一角，裹住碎铜送去补铸。\n天亮交班时，缺角的值夜簿上添了七种笔迹——各脉弟子一人走了一段黑梯，替他把整座塔巡完了。'],
    reed:['逆水送剑','首度合成超武','少年问铸匠，新剑的剑穗为何非要打个丑结。铸匠折来一截湿芦苇，松手放进急溪。\n细绳绷直的刹那，那枚死结恰好死死卡进石棱。\n“旧年涨水断桥，佩剑的人就凭这么个丑结，把救命的药筐拽过了溪。”少年没再吭声，低头把剑穗照样系紧。'],
    ledger:['云照的空格','收录 3 种超武','云照的药账末一栏向来空着。新来的小徒弟提笔要记欠药人的姓名，她伸手把砚台推远。\n“那一栏，只记货船几时靠岸。”\n船到便有新药。至于病家拿什么还、肯不肯再登门，不归这几页账纸替人作主。'],
    board:['留一枚白子','通关天渊第 5 层','照心坪撤席时，谢观澜在棋盒底摸到一枚磨毛的白子，背面刻着个浅浅的“井”字。\n杂役笑着说，那是借给初上山的娃娃认岔路用的。他便随手将棋子搁回石门边。\n次日清早再看，白子底下压着张画歪的山路图，图角还拿朱笔添了个卖热汤的草棚。'],
    kiln:['分火','通关天渊第 10 层','丹炉断火那夜，隔壁小灶送来一铁瓢红炭。守炉弟子嫌凡炭灰粗，烧灶的老婆婆只叫他先烘一烘冻僵的指头。\n天亮时，冷炉里滚起头一锅热水，山门外候药的凡人一人分了一海碗。\n后来丹房重砌金砖，灶膛底下，仍特意留着那块搁铁瓢的凹石。'],
    thread:['七色补丁','通关天渊第 15 层','会武散场那晚，暴雨把记分的锦幡撕开一道长口。七宗弟子各从旧袖上裁下一条布边，谁家的针线走到头，下一家便接着缝。\n次年新弟子好奇，问幡上七道彩纹是哪门古阵。\n管场的老人笑而不答，只把锦幡翻了个面，露出一溜大大小小的线疙瘩。']
  };
  const supplies={study:['悟道心得卷',18,'研读得 1 点修行心得，或提炼为 80 灵蕴','scroll'],ward:['渡劫护道符',32,'随身护命：主线或天渊遇致命伤时耗 1 符立回半血','ward']};
  const fresh=()=>({avatars:[],books:[],bookEvolutions:[],study:0,ward:0});
  function profile(s,meta){
    s=s||{};
    const realm=s.campaign?.cultivation?.realmId;
    const rank=Math.max(s.chapter?.rank>=4?1:0,['lianqi','zhuji','jindan','yuanying','huashen','heti','dacheng'].indexOf(realm));
    const sect=s.sectOrder?.office?s.sectOrder.id:s.sectTianji?.office?'tianji':s.sect?.id||(s.chapter&&s.chapter.prologue!=='pending'?'shushan':null);
    const story={lin:true,shen:s.inventory?.box||s.flags?.complete,ning:s.chapter?.tomb?.rescued,yun:s.sectIntro?.greeted||s.sectBond?.talks?.yun?.length||sect==='hehuan',xie:s.sectTianji?.greeted||s.sectSummit?.meets||s.map==='tianji-pavilion'||s.exploration?.visited?.includes('tianji-pavilion')||s.campaign?.tasks?.['jindan-crossroads']?.claimed,demon:meta.rogue.bestWave>=15};
    return {origin:Object.hasOwn(D.origins,s.background?.id)?s.background.id:null,sect:Object.hasOwn(D.sects,sect)?sect:null,rank,unlocked:Object.keys(D.avatars).filter(id=>story[id]||meta.trial.avatars.includes(id))};
  }
  function unlock(store,id,s){
    if(!Object.hasOwn(D.avatars,id))return false;
    return store.change(meta=>{
      if(profile(s,meta).unlocked.includes(id)||meta.currency.jade<D.avatars[id][7])return false;
      meta.currency.jade-=D.avatars[id][7];meta.trial.avatars.push(id);
    });
  }
  function record(meta,id){if(!meta.trial.books.includes(id))meta.trial.books.push(id);}
  function buy(store,id){
    if(!Object.hasOwn(supplies,id))return false;
    return store.change(s=>{const cost=supplies[id][1];if(s.currency.jade<cost)return false;s.currency.jade-=cost;s.trial[id]++;});
  }
  function study(store,g,spirit,save){
    if(!g||spirit&&g.state.collection.spirit>999920)return false;
    const before=store.state;
    if(!store.change(s=>{if(!s.trial.study)return false;s.trial.study--;if(!spirit)s.bounty.insight++;}))return false;
    if(spirit){g.state.collection.spirit+=80;if(save&&!save(true)){g.state.collection.spirit-=80;store.restore(before);return false;}}
    return true;
  }
  function valid(v){
    const list=(items,table)=>Array.isArray(items)&&new Set(items).size===items.length&&items.every(id=>typeof id==='string'&&Object.hasOwn(table,id));
    return v&&list(v.avatars,D.avatars)&&list(v.books,books)&&list(v.bookEvolutions||[],D.families)&&['study','ward'].every(k=>Number.isSafeInteger(v[k])&&v[k]>=0);
  }
  const api={books,supplies,fresh,profile,valid,unlock,record,buy,study};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianTrialLegacy=api;
})(globalThis);
