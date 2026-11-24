(function(root){
  'use strict';
  // Pure presentation-layer keyword highlighter. Never mutates source data or changes any Chinese character.
  const DICT={
    person:[
      '镇渊星君','太虚心魔','沈灵薇','柳如烟','凌云子','凌玉杏','凌玉玦','王屠户','王掌柜','张阿婆','苏怀药','崔明鹤','叶知秋',
      '林墨','清微','玄衡','凝霜','云照','青黛','裴照','阿辰','宝儿'
    ],
    place:[
      '行旅药站','万象天渊','九霄幻境','听雨竹海','蜀山剑庐','汉墓林','青阳镇','锁妖塔','合欢宗','天机阁','丹鼎门','百草谷','照心坪','天痕矿','迎客来',
      '蜀山','药庐','青阳','汉墓','王宅','后山','旧阵','剑庐','破庙','洞府'
    ],
    realm:[
      '炼气初期','炼气中期','炼气后期','炼气圆满','筑基初期','筑基中期','筑基后期','筑基圆满','金丹初期','元婴初期','化神初期','合体初期','大乘初期',
      '炼气','筑基','金丹','元婴','化神','合体','大乘'
    ],
    relic:[
      '青霜本命剑','流云十三式','历练心得卷','悟道心得卷','太古劫晶','淬灵精魄','幻境仙玉','血色符纸','蜀山剑印','长命锁','桃木簪','断邪印',
      '镇妖符','清心散','回气丹','燃火符','引灵香','护身符','杏花糕','温养茶','清心草','青灵草','月露草','定脉诀','回风诀','回春诀',
      '护道符','灵锻石','灵纹珠','狐簪','寒针','药匣','木匣','竹楔'
    ]
  };
  const kindMap=new Map();
  const terms=[];
  for(const [kind,list] of Object.entries(DICT)){
    for(const word of list){
      if(!kindMap.has(word)){kindMap.set(word,kind);terms.push(word);}
    }
  }
  terms.sort((a,b)=>b.length-a.length);
  const escRe=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const pattern=new RegExp(terms.map(escRe).join('|'),'g');
  const SELECTORS=[
    '.dialogue-text','.reader-line','.background-event > p','.background-outcome','.background-record > p',
    '.campaign-copy','.campaign-confirm > p:not(.campaign-kicker)','.campaign-ending p:not(.campaign-kicker)',
    '.campaign-evidence-card p:not(.campaign-source)','.almanac-sections p','.almanac-sections li','.almanac-summary',
    '.trial-archive article p','.hunt-card p:not(.hunt-prize)','.quest-desc','#quest-next',
    '.thread-node p:not(.thread-where)','.chapter-bonds p','.keepsake-grid p','.note-list p'
  ].join(',');
  const SKIP='button,a,kbd,input,select,option,textarea,script,style,code,pre,svg,[data-term-help],.term-label,.prose-kw';

  function highlightElement(el){
    if(!el||el.dataset.proseHighlighted==='1')return;
    const walker=el.ownerDocument.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let cur;
    while((cur=walker.nextNode())){
      const p=cur.parentElement;
      if(!p||p.closest(SKIP))continue;
      if(!cur.nodeValue||!cur.nodeValue.trim())continue;
      nodes.push(cur);
    }
    for(const node of nodes){
      const text=node.nodeValue;
      pattern.lastIndex=0;
      let match=pattern.exec(text);
      if(!match)continue;
      const frag=el.ownerDocument.createDocumentFragment();
      let last=0;
      while(match){
        const start=match.index,word=match[0];
        if(start>last)frag.append(text.slice(last,start));
        const span=el.ownerDocument.createElement('span');
        span.className='prose-kw kw-'+kindMap.get(word);
        span.textContent=word;
        frag.append(span);
        last=start+word.length;
        match=pattern.exec(text);
      }
      if(last<text.length)frag.append(text.slice(last));
      node.replaceWith(frag);
    }
    el.dataset.proseHighlighted='1';
  }

  function decorate(container){
    if(!container||!container.querySelectorAll)return;
    if(container.matches&&container.matches(SELECTORS))highlightElement(container);
    for(const el of container.querySelectorAll(SELECTORS))highlightElement(el);
  }

  const api={decorate,highlightElement,DICT};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.XiuxianProseHighlight=api;
})(globalThis);
