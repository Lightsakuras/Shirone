(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports, Base=node?require('./expedition.js'):root.XiuxianEngine;
  const D=node?require('./data.js'):root.XiuxianData, S=node?require('./story-data.js'):root.XiuxianStoryData;
  const copy=x=>JSON.parse(JSON.stringify(x)), dist=Base.distance;
  const blank=()=>({stage:'unstarted',evidence:[],deductions:[],visits:[],tools:[],opened:false,noise:0,alerts:0,shared:false});
  const fail=()=>{throw Error('青阳案卷记录异常。');};
  function validateSave(value){
    if(!value||![1,2,3].includes(value.version))throw Error('不是此版本支持的存档。');
    const current=value.version===3, inTown=S.maps.includes(value.map);
    if(!current&&inTown)fail();
    const out=Base.validateSave(current?{...value,version:2,map:inTown?'garden':value.map}:value);
    out.version=3;out.story=blank();
    if(!current)return out;
    const q=value.story;if(!q||!['unstarted','visiting','night','forest'].includes(q.stage))fail();
    out.story.stage=q.stage;
    for(const [key,allowed] of Object.entries({evidence:Object.keys(S.evidence),deductions:Object.keys(S.deductions),visits:['li','zhang','granny'],tools:Object.keys(S.tools)})){
      if(!Array.isArray(q[key])||q[key].length>allowed.length||new Set(q[key]).size!==q[key].length||q[key].some(id=>!allowed.includes(id)))fail();out.story[key]=[...q[key]];
    }
    for(const key of ['opened','shared']){if(typeof q[key]!=='boolean')fail();out.story[key]=q[key];}
    for(const [key,max] of [['noise',100],['alerts',999]]){if(!Number.isFinite(q[key])||q[key]<0||q[key]>max||key==='alerts'&&!Number.isInteger(q[key]))fail();out.story[key]=q[key];}
    if(q.stage!=='unstarted'&&!out.flags.complete||inTown&&(q.stage==='unstarted'||out.run)||value.map==='wangyard'&&q.stage!=='night')fail();
    const has=id=>q.evidence.includes(id);
    if(q.deductions.some(id=>S.deductions[id].pair.some(e=>!has(e))))fail();
    if(has('sales')&&q.visits.length!==3||has('mark')&&!has('soil')||has('soil')&&!q.opened||has('trail')&&!has('mark')||has('falseSeal')&&!has('paper'))fail();
    if(q.opened&&!['night','forest'].includes(q.stage)||has('comfort')&&(!q.visits.includes('granny')||!['linen','water'].every(id=>q.tools.includes(id))))fail();
    if(['night','forest'].includes(q.stage)&&!['entry','seller'].every(id=>q.deductions.includes(id)))fail();
    if(q.stage==='forest'&&!has('trail')||has('trail')&&q.stage!=='forest'||q.shared&&q.stage!=='forest')fail();
    if(q.stage==='unstarted'&&(q.evidence.length||q.deductions.length||q.visits.length||q.tools.length||q.opened||q.noise||q.alerts||q.shared))fail();
    if(inTown)out.map=value.map;
    return out;
  }
  class Game extends Base.Game{
    constructor(options={}){
      const restored=options.save?validateSave(options.save):null;
      super(restored?{...options,save:{...restored,version:2,map:S.maps.includes(restored.map)?'garden':restored.map}}:options);
      if(restored)this.state=restored;else Object.assign(this.state,{version:3,story:blank()});
      this.walkFactor=1;this.sneaking=false;
      if(this.collides(this.state.x,this.state.y)){this.state.x=180;this.state.y=420;}
    }
    inCase(){return S.maps.includes(this.state.map);}
    hasEvidence(id){return this.state.story.evidence.includes(id);}
    readyForNight(){return ['entry','seller'].every(id=>this.state.story.deductions.includes(id));}
    activeEnemies(){return this.inCase()?[]:super.activeEnemies();}
    walls(){const walls=super.walls();if(this.state.map==='wangyard'&&!this.state.story?.opened)walls.push({x:678,y:280,w:43,h:161});return walls;}
    objects(){
      if(this.inCase())return D.maps[this.state.map].objects.filter(o=>o.id!=='yardGate'||!this.state.story.opened);
      return [...super.objects(),...(this.state.map==='garden'?[{id:'qingyangRoad',kind:'caseObject',name:'下山 · 青阳来信',x:1080,y:265,cell:null}]:[])];
    }
    nearby(id){const o=this.objects().find(o=>o.id===id);return !!o&&dist(this.state,o)<93;}
    travel(map,x,y){this.state.map=map;this.state.x=x;this.state.y=y;this.resetTransient();this.checkpoint();}
    beginStory(){
      const s=this.state;if(s.map!=='garden'||!s.flags.complete||s.run||s.hp<=0)return false;
      if(s.story.stage==='unstarted'){s.story.stage='visiting';this.message('三载寒暑，筑基始成。二十三岁的林墨奉清微之命下山赴青阳，先在迎客来客栈歇宿一夜。');}
      this.travel('qingyang',180,420);return true;
    }
    evidence(id){if(!this.hasEvidence(id)){this.state.story.evidence.push(id);this.message('案卷收录：'+S.evidence[id].name);this.checkpoint();}}
    tool(id){const q=this.state.story;if(!q.tools.includes(id)){q.tools.push(id);this.message('带上'+S.tools[id].name+'。');this.checkpoint();}}
    visit(id){const q=this.state.story;if(!q.visits.includes(id))q.visits.push(id);if(q.visits.length===3)this.evidence('sales');this.checkpoint();}
    emitPanel(panel){this.events.push({type:'story',panel});}
    interact(){
      const o=this.nearest(),q=this.state.story;if(!o||this.state.hp<=0)return;
      if(o.id==='qingyangRoad'){this.emitPanel('brief');return;}
      if(!this.inCase()){
        if(o.id==='sister'&&q.stage==='forest'&&!q.shared){q.shared=true;this.state.bond=Math.min(99,this.state.bond+2);this.events.push({type:'dialogue',title:'灯下复盘 · 沈灵薇',portrait:'shen_ling_wei',text:this.state.collection.companionship==='close'?'沈灵薇听你读完案卷，把油灯往你手边拨近半分：“你连老人手里那只小鞋都没忍心拿走……查案先顾人，你做得对。”她指尖在你腕侧轻轻一停，陪你把北去汉墓林的线索逐条理清。':'“有疑点便追到底，但也绝不让街巷传言替人定罪。”沈灵薇替你备齐返程所需笔墨与清心散，与你约好汉墓归来后再同核卷宗。'});this.checkpoint();return;}
        return super.interact();
      }
      switch(o.id){
        case 'townReturn':this.travel('garden',1010,300);break;
        case 'innkeeper':this.evidence('rumor');this.emitPanel('innkeeper');break;
        case 'liHome':this.visit('li');this.emitPanel('liHome');break;
        case 'zhangHome':this.visit('zhang');this.evidence('fur');this.emitPanel('zhangHome');break;
        case 'granny':this.visit('granny');this.evidence('shoe');this.emitPanel('granny');break;
        case 'clinic':this.tool('linen');this.emitPanel('clinic');break;
        case 'townWell':this.tool('water');this.emitPanel('townWell');break;
        case 'toolbox':this.tool('wedge');this.emitPanel('toolbox');break;
        case 'nightLane':this.emitPanel('board');break;
        case 'yardGate':this.emitPanel('lock');break;
        case 'soil':if(q.opened){this.evidence('soil');this.emitPanel('soil');}break;
        case 'swordMark':this.message(this.hasEvidence('soil')?'朝这根边梁轻出一剑，留下复查的记号。':'先查验柴棚边的新土，再考虑留下记号。');break;
        case 'yardExit':
          if(this.hasEvidence('soil')&&this.hasEvidence('mark')){this.evidence('trail');q.stage='forest';this.travel('qingyang',1060,430);this.emitPanel('trail');}
          else{this.travel('qingyang',1060,430);this.message('先退回后巷，案卷与工具都已收好。');}break;
      }
    }
    inspect(id,value){
      if(!this.nearby('liHome'))return false;
      if(id==='bed'||id==='paper')this.evidence(id);
      else if(id==='latch'){
        if(!Number.isFinite(value)||value<85||value>100){this.message('木闩还没有退出卡槽，继续向右拨动。');return false;}this.evidence(id);
      }else if(id==='falseSeal'){
        if(!this.hasEvidence('paper')||!this.learned('scholar'))return false;this.evidence(id);
      }else return false;
      return true;
    }
    comfort(){
      if(!this.nearby('granny')||!['linen','water'].every(id=>this.state.story.tools.includes(id)))return false;
      this.evidence('comfort');return true;
    }
    deduce(pair,id){
      const def=S.deductions[id],q=this.state.story;
      if(!def||q.stage==='unstarted'||!Array.isArray(pair)||pair.length!==2||new Set(pair).size!==2||pair.some(e=>!this.hasEvidence(e)))return false;
      if(!def.pair.every(e=>pair.includes(e))){this.message('这两条线索尚不足以坐实此项判断。先分清哪些是亲眼实测、哪些只是街坊转述，再换一条试试。');return false;}
      if(!q.deductions.includes(id)){q.deductions.push(id);this.message(def.text);this.checkpoint();}return true;
    }
    beginNight(){
      if(this.state.map!=='qingyang'||!this.nearby('nightLane')||!this.readyForNight()||this.state.story.stage==='forest')return false;
      this.state.story.stage='night';this.state.story.noise=0;this.travel('wangyard',180,420);this.message('王屠户今夜不在宅中。避开地上枯枝，按住 Shift 放轻脚步；若惊动声响，可驻足片刻待院中平息。');return true;
    }
    openGate(method,value){
      const q=this.state.story,s=this.state;if(!this.nearby('yardGate')||q.opened)return false;
      let noise=0;
      if(method==='wedge'){
        if(!q.tools.includes('wedge')||!Number.isFinite(value)||value<70||value>85){this.message('竹楔要卡在 70–85 的松动区间，别把门闩顶得太紧。');return false;}
        noise=this.learned('sword')?3:q.tools.includes('linen')?(this.learned('medicine')?3:7):14;
      }else if(method==='spell'){
        const cost=this.learned('scholar')?6:12;if(!this.canUseSpiritualPower()||s.mp<cost){this.message('此法需运转灵力，可改用现场工具。');return false;}this.restoreSpirit(s.mp-(cost));noise=this.learned('scholar')?12:24;this.effect('attune',697,360,{life:.45});
      }else return false;
      q.opened=true;this.addNoise(noise);this.checkpoint();return true;
    }
    addNoise(amount){
      if(this.state.map!=='wangyard')return;
      const q=this.state.story;q.noise=Math.min(100,q.noise+amount);
      if(q.noise>=100){q.alerts=Math.min(999,q.alerts+1);q.noise=0;this.travel('qingyang',1060,430);this.events.push({type:'dialogue',title:'巷口亮灯',text:'声响惊动了邻院灯火。你收妥案卷暂退回后巷——已查明的线索、借来的器具与法宝俱在，稍候片刻即可再次入内。'});}
    }
    step(dt,input={}){
      const night=this.state.map==='wangyard',x=this.state.x,y=this.state.y;
      this.sneaking=night&&!!input.sneak;this.walkFactor=this.sneaking ? .48 : 1;
      super.step(dt,input);
      if(night&&this.state.map==='wangyard'){
        const distance=Math.hypot(this.state.x-x,this.state.y-y),onTwigs=S.twigs.some(p=>dist(this.state,p)<p.r);
        if(distance>.1&&onTwigs)this.addNoise(distance*(this.sneaking ? .035 : .65));
        else this.state.story.noise=Math.max(0,this.state.story.noise-Math.min(dt,.04)*(distance>.1?3:15));
      }
    }
    attack(target){
      if(!this.inCase())return super.attack(target);
      if(this.state.map==='qingyang')return false;
      if(this.state.hp<=0||this.attackCd>0)return false;
      const mark=D.maps.wangyard.objects.find(o=>o.id==='swordMark');
      if(this.hasEvidence('soil')&&!this.hasEvidence('mark')&&dist(this.state,mark)<88&&target&&dist(target,mark)<48){
        this.attackCd=.36;this.evidence('mark');this.addNoise(5);return true;
      }
      this.attackCd=.5;this.addNoise(18);this.message('夜探不宜挥剑作响。查验新土后，靠近边梁，瞄准它留一道浅记。');return false;
    }
    dodge(vector){if(this.state.map==='wangyard'){this.message('院里碎枝多，按住 Shift 轻步更稳妥。');return false;}return super.dodge(vector);}
    useItem(id,target){if(this.inCase()&&['fire','needle','incense'].includes(id)){this.message('此处正在走访查案，先收好符香，别扰动现场。');return false;}return super.useItem(id,target);}
    objective(){
      const q=this.state.story;
      if(this.state.map==='wangyard')return ['夜探柴棚',!q.opened?'绕开枯枝，走近木门用竹楔或灵力开闩。':!this.hasEvidence('soil')?'查验柴棚新土，暂不挖掘。':!this.hasEvidence('mark')?'靠近边梁，鼠标瞄准它轻出一剑留记。':'沿原路退出院子，留意巷外的动静。'];
      if(this.state.map==='qingyang')return q.stage==='forest'?['北去的白影','案卷已整理。可回山与沈灵薇复盘，为追踪汉墓林作准备。']:['青阳走访','走访李家、张家与张阿婆；查门闩、留符样，再按 C 联结证据。'];
      return super.objective();
    }
  }
  const api={...Base,Game,validateSave};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
