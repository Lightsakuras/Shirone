(function(root){
  'use strict';
  const node=typeof module==='object'&&module.exports,Base=node?require('./provisions.js'):root.XiuxianEngine;
  const D=node?require('./backgrounds-data.js'):root.XiuxianBackgroundsData,Items=node?require('./data.js'):root.XiuxianData;
  const copy=x=>JSON.parse(JSON.stringify(x)),owns=(obj,key)=>typeof key==='string'&&Object.hasOwn(obj,key);
  const keys=['id','legacy','openingChoice','missionChoice','tokenSpent'];
  const choice=(profile,stage,id)=>profile[stage].choices.find(c=>c.id===id);
  const legacy=()=>({id:D.defaultId,legacy:true,openingChoice:null,missionChoice:null,tokenSpent:false});
  function requirementReason(s,requires={}){
    for(const id of requires.evidence||[])if(!s.story.evidence.includes(id))return '还缺青阳走访的对应物证或口供。';
    for(const id of requires.deductions||[])if(!s.story.deductions.includes(id))return '请先在案卷里推得所需结论。';
    for(const id of requires.tombClues||[])if(!s.chapter.tomb.clues.includes(id))return '请先去汉墓林或墓道查清对应线索。';
    if(requires.rescued&&!s.chapter.tomb.rescued)return '先把四个孩子平安护送回青阳。';
    return '';
  }
  function checkBackground(value,s){
    const fail=()=>{throw Error('身世与阵营记录异常。');};
    if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==keys.length||keys.some(k=>!Object.hasOwn(value,k)))fail();
    if(!owns(D.backgrounds,value.id)||typeof value.legacy!=='boolean'||typeof value.tokenSpent!=='boolean')fail();
    const p=D.backgrounds[value.id],opening=choice(p,'opening',value.openingChoice),mission=choice(p,'mission',value.missionChoice);
    if(value.legacy){if(value.id!==D.defaultId||value.openingChoice!==null||value.missionChoice!==null||value.tokenSpent)fail();return legacy();}
    if(value.openingChoice!==null&&!opening||value.missionChoice!==null&&!mission)fail();
    if(value.id===D.defaultId&&value.openingChoice!=='inherit')fail();
    if(opening&&s.chapter.prologue==='pending'&&!['fire','bread','lock'].every(k=>s.chapter.survival[k])&&value.id!==D.defaultId)fail();
    if(mission){
      if(!opening||s.chapter.prologue==='pending'||!['entry','seller'].every(id=>s.story.deductions.includes(id)))fail();
      if(requirementReason(s,p.mission.requires)||requirementReason(s,mission.requires))fail();
      if(mission.consumeToken&&!opening.token)fail();
    }
    if(value.tokenSpent!==!!mission?.consumeToken)fail();
    return copy(value);
  }
  function validateSave(value){
    const s=Base.validateSave(value);
    s.background=value.background===undefined?legacy():checkBackground(value.background,s);
    return s;
  }
  class Game extends Base.Game{
    constructor(options={}){
      if(!options.save&&options.backgroundId!==undefined&&!owns(D.backgrounds,options.backgroundId))throw Error('没有这个身世开局。');
      const saved=options.save?validateSave(options.save):null;
      super(saved?{...options,save:saved}:options);
      // Inner constructors restore their own validated state. Preserve those layers.
      this.state.background=saved?copy(saved.background):options.backgroundId===undefined?legacy():{
        id:options.backgroundId,legacy:false,openingChoice:options.backgroundId===D.defaultId?'inherit':null,missionChoice:null,tokenSpent:false
      };
    }
    backgroundNarrative(key){
      const b=this.state.background;
      return b&&!b.legacy?D.backgrounds[b.id].narrative?.[key]||'':'';
    }
    backgroundActionReason(stage,id){
      const s=this.state,b=s.background,p=D.backgrounds[b.id];
      if(!['opening','mission'].includes(stage))return '没有这项身世行动。';
      const action=choice(p,stage,id);if(!action)return '没有这项身世行动。';
      if(b.legacy)return '旧档保留原有经历，不另补发新开局的凭物与物资。';
      if(b[stage+'Choice']!==null)return '这一步已经落定，不能重复支取或改换去向。';
      if(s.hp<=0||s.run||s.chapter.training)return '先收束眼前的历练或试剑，再办身世委托。';
      if(stage==='opening'){
        if(this.isChild()){
          if(s.map!=='temple'||!this.nearby('leaveTemple'))return '走到破庙出口旁，再定往后的去向。';
          if(!['fire','bread','lock'].every(k=>s.chapter.survival[k]))return '先生火取暖、收妥长命锁，再接过玄衡手里的半块饼。';
        }
      }else{
        if(!b.openingChoice)return '先定下开局去向，再来办这项委托。';
        if(this.isChild())return '需等成年下山赴青阳查案时，才能办这项委托。';
        if(s.map!=='qingyang'||!this.nearby('innkeeper'))return '去青阳迎客来客栈找联络人办理。';
        if(!['entry','seller'].every(key=>s.story.deductions.includes(key)))return '先在案卷中推清“孩童如何出门”与“卖符人”两条线索。';
        const reason=requirementReason(s,p.mission.requires)||requirementReason(s,action.requires);if(reason)return reason;
        if(action.consumeToken&&(!choice(p,'opening',b.openingChoice)?.token||b.tokenSpent))return '需持有尚未交出的专属凭物才能办理。';
      }
      for(const [item,n]of Object.entries(action.cost||{}))if(s.inventory[item]<n)return Items.items[item].name+'数量不足，请先备齐交付所需的物资。';
      for(const item of new Set([...Object.keys(action.cost||{}),...Object.keys(action.gain||{})])){
        if(s.inventory[item]-(action.cost?.[item]||0)+(action.gain?.[item]||0)>999)return Items.items[item].name+'快装满了，先在行囊腾出空位再来领取。';
      }
      return '';
    }
    backgroundStatus(){
      const b=this.state.background,p=D.backgrounds[b.id],opening=choice(p,'opening',b.openingChoice),mission=choice(p,'mission',b.missionChoice);
      const stage=b.legacy?'legacy':mission?'complete':opening?'mission':'opening';
      const section=stage==='opening'?p.opening:p.mission;
      return {
        id:b.id,name:p.name,birth:p.birth,faction:p.faction,summary:p.summary,legacy:b.legacy,
        openingChoice:b.openingChoice,missionChoice:b.missionChoice,stage,title:section.title,text:section.text,
        token:opening?.token?{...copy(opening.token),spent:b.tokenSpent}:null,
        choices:['opening','mission'].includes(stage)?section.choices.map(action=>{const reason=this.backgroundActionReason(stage,action.id);return {...copy(action),available:!reason,reason};}):[],
        openingResult:opening?.result||'',result:mission?.result||'',echo:mission?.echo||''
      };
    }
    backgroundPanel(){return this.backgroundStatus();}
    chooseBackgroundAction(stage,id){
      const reason=this.backgroundActionReason(stage,id);if(reason){this.message(reason);return false;}
      const b=this.state.background,action=choice(D.backgrounds[b.id],stage,id),inventory=this.state.inventory;
      const changes=Object.fromEntries([...new Set([...Object.keys(action.cost||{}),...Object.keys(action.gain||{})])].map(item=>[item,inventory[item]-(action.cost?.[item]||0)+(action.gain?.[item]||0)]));
      Object.assign(inventory,changes);b[stage+'Choice']=id;
      if(stage==='mission')b.tokenSpent=!!action.consumeToken;
      this.message(action.result);this.checkpoint();return true;
    }
    finishPrologue(){
      const s=this.state,b=s.background;
      if(b&&!b.legacy&&!b.openingChoice&&this.isChild()&&this.nearby('leaveTemple')&&['fire','bread','lock'].every(k=>s.chapter.survival[k])){
        this.message('先定下这一夜往后投奔何处，再出破庙。');this.events.push({type:'background'});return false;
      }
      return super.finishPrologue();
    }
    beginStory(){
      const b=this.state.background;
      if(b&&!b.legacy&&!b.openingChoice){this.message('先在「身世与立场」定下起步去向，再动身赴青阳。');this.events.push({type:'background'});return false;}
      return super.beginStory();
    }
    interact(){
      const b=this.state.background,o=this.nearest();
      if(b&&!b.legacy&&o&&this.state.hp>0&&!this.state.run&&!this.state.chapter.training){
        const opening=!b.openingChoice&&!this.isChild()&&this.state.map==='garden'&&o.id==='qingwei';
        const mission=b.openingChoice&&!b.missionChoice&&this.state.map==='qingyang'&&o.id==='innkeeper'&&D.backgrounds[b.id].mission.choices.some(action=>!this.backgroundActionReason('mission',action.id));
        if(opening||mission){this.events.push({type:'background'});return;}
      }
      return super.interact();
    }
  }
  const api={...Base,Game,validateSave,backgrounds:D};if(node)module.exports=api;else root.XiuxianEngine=api;
})(globalThis);
