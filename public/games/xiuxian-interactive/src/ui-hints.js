(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.XiuxianUIHints = api;
})(globalThis, function () {
  'use strict';
  const originals = new WeakMap();
  const single = { V:'tactics', E:'interact', Q:'skill', B:'bag', R:'gear', M:'expedition', J:'notes', C:'case', L:'loadouts', O:'research', G:'catalog', H:'sects', T:'campaign', N:'worldMap', F1:'almanac', F11:'fullscreen', Esc:'pause', Escape:'pause', '?':'help', '空格':'dodge', Space:'dodge', Shift:'sneak', '1':'quick1', '2':'quick2', '3':'quick3', '4':'quick4', '5':'quick5', '6':'quick6' };
  const moves = ['moveUp','moveLeft','moveDown','moveRight'];
  const slots = { fire:'quick1', needle:'quick2', incense:'quick3', potion:'quick4', ward:'quick5' };
  const token = 'F11|F1|Escape|Esc|Shift|Space|空格|V|E|Q|B|R|M|J|C|L|O|G|H|T|N|\\?|[1-6]';
  // One pass prevents an exchanged E -> Q binding from being interpreted again as
  // the old default Q. Only explicit prompts or a key before an action are changed.
  const prose = new RegExp('(W\\s*A\\s*S\\s*D)(?=\\s*(?:行走|移动))|按\\s*(' + token + ')(?![A-Za-z0-9])|\\b(' + token + ')(?=\\s*(?:暂停|交互|功法|行囊|法宝|秘境|图谱|案卷|案簿|配装|试录|器物|宗门|查|可|打开|收起|关闭|轻步|全屏))', 'g');
  const label = (controls, id) => controls.label(id, { primary:true });
  const movementLabel = controls => moves.map(id => label(controls,id)).join(' / ');
  const quickLabel = controls => [1,2,3,4,5].map(n => label(controls,'quick'+n)).join(' / ');
  function formatKeys(value, controls) {
    value = String(value).trim();
    if (single[value]) return label(controls,single[value]);
    if (/W\s*A\s*S\s*D/.test(value)) return moves.map(id => label(controls,id)).join(' ');
    if (value === '1–5') return quickLabel(controls);
    if (value === '右键 / 空格') return '右键 / ' + label(controls,'dodge');
    if (value.includes('/')) return value.split('/').map(part => {
      const word=part.trim();return word==='1–5'?quickLabel(controls):single[word]?label(controls,single[word]):word;
    }).join(' / ');
    return value;
  }
  function formatText(value, controls) {
    return String(value).replace(prose, (match, movement, pressed, bare) => {
      if (movement) return movementLabel(controls);
      const word=pressed||bare, action=single[word];
      return action ? (pressed?'按 ':'') + label(controls,action) : match;
    });
  }
  function childCaption(controls) {
    return '十岁 · ' + movementLabel(controls) + ' 行走，' + label(controls,'interact') + ' 查看与拾取。先取暖，再寻找前路。';
  }
  function decorate(container, controls) {
    if (!container?.querySelectorAll || !controls) return;
    // Hotbar text and these HUD nodes already consume live bindings in their own
    // renderers. Mark the hotbar semantically and leave generated prose intact.
    for (const button of container.querySelectorAll('#hotbar [data-item]')) {
      const action=slots[button.dataset.item],kbd=button.querySelector('kbd');if(action&&kbd){kbd.dataset.action=action;kbd.setAttribute('data-primary-key','');}
    }
    for (const node of container.querySelectorAll('kbd:not([data-action]):not([data-control-label])')) {
      let record=originals.get(node);if(!record||node.textContent!==record.result)record={original:node.textContent};
      const value=record.original.trim(),result=formatKeys(value,controls);
      if(single[value])node.dataset.action=single[value];
      if(result!==node.textContent)node.textContent=result;record.result=result;originals.set(node,record);
    }
    const excluded='script,style,input,select,textarea,kbd,.term-label,.almanac-shell,[contenteditable],#skill-use,#quick-cleanse,#guide';
    const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement&&!node.parentElement.closest(excluded)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      let record=originals.get(node);if(!record||node.nodeValue!==record.result)record={original:node.nodeValue};
      const result=formatText(record.original,controls);if(result!==node.nodeValue)node.nodeValue=result;record.result=result;originals.set(node,record);
    }
    controls.decorateBindings(container);
    const world=document.getElementById('world');
    const description='游戏地图：'+movementLabel(controls)+' 移动，'+label(controls,'interact')+' 交互，自动普攻，'+label(controls,'tactics')+' 暂停下令';
    if(world&&world.getAttribute('aria-label')!==description)world.setAttribute('aria-label',description);
    for(const bar of document.querySelectorAll('.actionbar')){
      const caption=childCaption(controls);if(bar.getAttribute('data-control-help')!==caption)bar.setAttribute('data-control-help',caption);
    }
  }
  return { decorate, formatText, formatKeys, childCaption };
});
