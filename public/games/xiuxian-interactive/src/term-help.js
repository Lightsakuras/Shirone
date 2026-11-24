(function(root,factory){
  'use strict';
  const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianTermHelp=api;
})(globalThis,function(){
  'use strict';
  const entries=[
    ['seek','此行寻器方向','入阵前指定本局更想寻觅哪一路法宝。它会让每段首枚候选优先照顾该路数尚未收齐的器物，但不是直接保底发某一件。','没有明确配装目标时选“随缘”；想补某一流派时再选对应方向。','这不是剧情路线，也不会改变身世、宗门或善恶。',['寻器方向']],
    ['room-bias','房间偏向','不同旧阵房间本来就有各自偏向的奖励。“随缘”沿用这些房间差别。','根据房间介绍选择路线，再从实际出现的奖励里挑选。','保留房间偏向不等于随机到所有法宝的机会完全相同。',[]],
    ['boon','临时灵契','一局旧阵历练中选择的临时增益，用来补足这一次的战术。','入阵后阅读灵契的生效条件，再选择与功法、符药或法宝配合的效果。','本局结束后消失，不属于永久收藏，也不随配装方案保存。',['灵契']],
    ['armor','磬衣','守阵古磬与部分强敌身上的有限护甲。磬衣未破时直击会先削甲；用回风诀、定脉诀或第三段连剑能成倍拆甲。','观察剩余磬衣，按战术面板提示用擅长破甲的功法或连续剑击处理。','磬衣是护甲，不是另一条生命，也不是可拾取装备。',[]],
    ['provisions','药庐合备','与沈灵薇把材料整理成本次入阵的准备物。不同备物提供不同帮助。','在旧阵准备页查看材料、效果和入阵条件，合适再制作。','分享一篇旧阵札记后才开放；它是额外准备，不是进入旧阵的必需手续。',['合备']],
    ['spirit','灵蕴','永久收藏用于养成法宝的资源，与战斗中的灵力是两回事。','在法宝页面查看升阶费用，先决定常用配装再分配灵蕴。','常规历练失利保留已经取得的灵蕴；具体花费以按钮旁显示为准。',[]],
    ['mp','灵力','施展功法、灵性道具和持续守势所用的战斗资源。','临战前检查余量，回气丹、调息等恢复方式受当前身体状态与场合限制。','封功期间不能运灵，灵力上限为零；有物品也不代表能够施放。',[]],
    ['hp','气血','角色当前承受伤害的余量。耗尽通常意味着此次历练受挫。','危险时先暂停，查看敌情，再决定恢复、护身或调整站位。','普通失败保留永久所得；已经使用的符药不会退还。',[]],
    ['insight','修行心得','通过完成事务与历练取得的修行积累，用于满足修炼条件。','打开境界页查看缺口，再循任务和修习取得所缺的积累。','普通击杀不等于自动获得修行心得；以实际奖励与条件为准。',['心得']],
    ['realm','小境界','同一大境界内的修炼进展，帮助看清这一阶段还差多少。','查看当前小阶、修为进度与下一步条件；满足后在对应地点完成修炼。','进度图表现既有规则，不是离线放置计时器，单纯等待不保证突破。',[]],
    ['breathing','现场调息','在允许调息的真实地点进行恢复或整理当前状态。','先走到地点，再看调息页面的实际恢复量、条件与代价。','它不能随时随地代替补给，战斗与封功等状态会限制效果。',[]],
    ['memory','器忆','法宝与使用方式相关的养成方向，决定其特定条件下的额外作用。','查看法宝详情中的器忆要求、已有修习和触发条件，再安排搭配。','器忆不是所有情况都生效的总攻击力加成。',[]],
    ['practice','器物修习','使用法宝、功法和道具的相关实践记录，为器忆等养成提供条件。','先阅读目标法宝的条件，按它要求的实际使用方式积累。','装备在身上或反复打开页面，不一定会增加修习。',[]],
    ['research','器物试录','记录特定战术或物品实际发挥用途的挑战与观察册。','打开试录查看条件，在真实场景完成，再领取对应馈赠。','仅拥有物品或做出相似动画，不一定满足试录的完整条件。',[]],
    ['loadouts','配装','一组准备同时使用的法宝和相关选择，方便面对不同敌情切换。','先看敌人的护甲、攻击与状态，再选需要的恢复、控制或输出搭配。','配装方案不包含本局临时灵契；切换也不能创造未拥有的法宝。',['配装方案']],
    ['attack','迎敌','角色会自主接近合适目标并进行普通攻击的战术姿态。','适合一般交战；需要绕行时可手动移动或切换收势。','迎敌不会自动替你消耗符药；被墙挡住时仍需自己绕路。',[]],
    ['guard','守势','角色侧重原地格挡并进行普通攻击的战术姿态。','面对可格挡攻势时使用，同时留意灵力消耗。','守势不是无敌，也不会免费持续维持；灵力不足时要调整。',[]],
    ['hold','收势','停止自主接敌和攻防，把行动主动权交回玩家。','引灵香调开守卫、绕路或观察现场时可用；准备交战再切换迎敌或守势。','点“继续”只结束暂停，不会自动替你改回迎敌。',[]],
    ['interrupt','打断','让敌人正在准备的特定招式提前中止。','看清敌人蓄势和招式说明，再选择能打断该攻势的功法或道具。','并非所有攻击都能打断，也不是任何敌人招式都允许打断。',[]],
    ['armorbreak','破甲','优先削弱敌人护甲，使后续攻击更有效的战术。','查看敌方护甲以及自己的功法、道具条件，先破甲再输出。','破甲和直接伤害是不同效果，不能只按面板伤害高低挑选。',[]],
    ['lifespan','寿数','人物还能经历的岁月范围。普通人物与修士的寿命和经历并不相同。','在人物与行旅记录中查看时间变化、当前身份及是否出现继任者。','现实等待不会凭空替人物推进岁月；以游戏内事件和时间规则为准。',[]],
    ['successor','继任','原人物离开职责或走完寿数后，由后继者承接相应位置与事务。','查看人物条目，辨认当前办事者及留下的旧事记录。','继任者不是原人物复活，也不会直接继承原人物的亲密关系。',[]],
    ['partner','结契','明确确认一位成年、自愿的伴侣，与普通亲近或同行不同。','阅读关系选项的具体文字，自主决定是否确认这段关系。','赠簪、照护、合备和好感不会自动把对方设为伴侣。',[]],
    ['sealed','封功','身体暂时无法运用灵力的状态。灵力上限归零，运灵能力受限。','先查看身体页面，按剧情和当前实际可用的凡身行动继续。','不能沿用正常修士的灵力上限或法宝功法生效说明。',[]],
    ['recovery','恢复点','在特定重要选择前留下的实际旧进度副本。','先导出当前存档，再核对恢复点的角色、时间和说明，确认后读回。','读回会替换当前进度；系统不会凭空生成已经错过的更早记录。',[]],
    ['permanent','永久所得','已经实际取得并保存的收藏、图谱、升阶、器忆、剧情证据等进展。','历练失败后检查保留下来的收获，再调整配装和补给继续尝试。','失败保留不代表已经耗掉的符药、临时灵契也会退还。',[]],
    ['risk','险阵','提高旧阵敌情强度、同时改变额外收益的可选挑战条件。','在准备页面对照具体增强与奖励，按现有配置决定是否参加。','不是推进主线的必选项；先熟悉普通旧阵也能继续故事。',[]],
    ['meridians','气路','当前修炼步骤要求的运气路径或操作顺序。','按修炼面板显示的提示进行，先看条件和结果，再继续下一步。','图中气息是进度表现，不需要高频点击或精确动作连招。',[]]
  ].map(([id,term,meaning,how,caution,aliases])=>Object.freeze({id,term,meaning,how,caution,aliases:Object.freeze(aliases)}));
  const byId=new Map(entries.map(e=>[e.id,e]));
  const terms=entries.flatMap(e=>[e.term,...e.aliases].map(word=>({word,id:e.id}))).sort((a,b)=>b.word.length-a.word.length);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function create({controls,onOpen=()=>{},onClose=()=>{},showBook}={}){
    let dialog=null,opener=null;
    function close(){if(!dialog?.open)return;dialog.close();onClose();if(opener?.isConnected)opener.focus({preventScroll:true});}
    function show(id,button){
      const entry=byId.get(id);if(!entry)return false;
      if(!dialog){dialog=document.createElement('dialog');dialog.id='term-help-dialog';dialog.className='term-help-dialog';dialog.setAttribute('aria-labelledby','term-help-title');document.body.append(dialog);
        dialog.addEventListener('cancel',e=>{e.preventDefault();if(!controls||controls.label('pause',{primary:true})==='Esc')close();});
        dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
        dialog.addEventListener('keydown',e=>{if(controls?.resolve(e)==='pause'){e.preventDefault();close();}e.stopPropagation();});
      }
      opener=button||document.activeElement;
      dialog.innerHTML=`<p class="eyebrow">随手解惑 · 行程暂停</p><h2 id="term-help-title">${escape(entry.term)}</h2><p class="term-meaning">${escape(entry.meaning)}</p><h3>现在怎么用</h3><p>${escape(entry.how)}</p><p class="term-caution">${escape(entry.caution)}</p><div class="buttons"><button id="term-help-close" class="primary">明白了，回到刚才</button>${showBook?'<button id="term-help-book" class="secondary">在山行闻见录中查阅</button>':''}</div>`;
      onOpen();if(!dialog.open)dialog.showModal();dialog.querySelector('#term-help-close').onclick=close;
      if(showBook)dialog.querySelector('#term-help-book').onclick=()=>{close();showBook(entry.term);};
      dialog.querySelector('#term-help-close').focus();return true;
    }
    function decorate(container){
      if(!container||container.closest?.('.almanac-shell'))return 0;
      const seen=new Set([...container.querySelectorAll('[data-term-help]')].map(el=>el.dataset.termHelp));
      const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT,{acceptNode(node){
        if(!node.nodeValue.trim()||!node.parentElement||node.parentElement.closest('button,a,kbd,script,style,textarea,select,[contenteditable],.player-status,.ink-resources,.term-label,.almanac-shell,.rogue-shell,#term-help-dialog'))return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }});
      const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);let count=0;
      for(const node of nodes){let value=node.nodeValue,at=0,fragment=null;
        while(at<value.length){let match=null;for(const item of terms){if(seen.has(item.id))continue;const index=value.indexOf(item.word,at);if(index>=0&&(!match||index<match.index))match={...item,index};}if(!match)break;
          if(!fragment)fragment=document.createDocumentFragment();fragment.append(document.createTextNode(value.slice(at,match.index)));
          const span=document.createElement('span');span.className='term-label';span.append(document.createTextNode(match.word));
          const button=document.createElement('button');button.type='button';button.className='term-help-button';button.dataset.termHelp=match.id;button.textContent='?';button.setAttribute('aria-label','解释：'+byId.get(match.id).term);button.setAttribute('title','点此了解'+byId.get(match.id).term);button.onclick=e=>{e.preventDefault();e.stopPropagation();show(match.id,button);};span.append(button);fragment.append(span);
          seen.add(match.id);count++;at=match.index+match.word.length;
        }
        if(fragment){fragment.append(document.createTextNode(value.slice(at)));node.replaceWith(fragment);}
      }
      return count;
    }
    return {decorate,show,close,get isOpen(){return !!dialog?.open;}};
  }
  return Object.freeze({entries,get:id=>byId.get(id)||null,create});
});
