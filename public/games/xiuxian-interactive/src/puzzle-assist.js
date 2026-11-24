(function(root){
  'use strict';
  // Sessions survive a synchronous redraw of the same puzzle, and expire on leaving it.
  const sessions=new Map();
  function prune(){for(const [key,s] of sessions)if(!s.bar.isConnected)sessions.delete(key);}
  function mount(key,{anchor,hint,targets,onGuide,scope=document.getElementById('modal-content')}){
    if(!anchor||!scope)return;
    const state=sessions.get(key)||{errors:0,asking:false,guided:false};
    const bar=document.createElement('div');
    bar.className='puzzle-help';bar.dataset.puzzle=key;
    const tip=document.createElement('span');tip.textContent=root.xiuxian?.game?.relaxed?hint:'';
    const help=document.createElement('button');help.type='button';help.className='assist-request';help.textContent='卡住了？点此指路';
    const ask=document.createElement('div');ask.className='assist-question';ask.setAttribute('role','group');
    ask.innerHTML='<strong>机关未合，要直接标出解法吗？</strong><button type="button" class="assist-accept">标出解法</button><button type="button" class="assist-decline">我自己试</button>';
    bar.append(tip,help,ask);anchor.before(bar);state.bar=bar;state.marked=[];
    function refresh(){
      for(const [el,badge] of state.marked){el.classList.remove('assist-target');delete el.dataset.assist;badge?.remove();}
      state.marked=[];ask.hidden=!state.asking;help.hidden=state.asking||state.guided;
      if(state.guided){
        const choices=targets();
        tip.textContent=choices.length?'循朱箭依次点选':'此环已解，或需先取现场材料。';
        for(const [selector,label] of choices){
          const el=scope.querySelector(selector);if(!el||el.disabled)continue;
          el.classList.add('assist-target');el.dataset.assist=label;
          const badge=document.createElement('span');badge.className='assist-badge';badge.textContent=label;
          if(el.matches('option')){state.marked.push([el,null]);continue;}
          if(el.matches('select,input'))el.before(badge);else el.append(badge);
          state.marked.push([el,badge]);
        }
      }
    }
    state.refresh=refresh;sessions.set(key,state);
    function accept(){onGuide?.();state.guided=true;state.asking=false;refresh();}
    help.onclick=accept;ask.querySelector('.assist-accept').onclick=accept;
    ask.querySelector('.assist-decline').onclick=()=>{state.asking=false;state.errors=0;refresh();};
    refresh();
    if(state.asking){ask.scrollIntoView({block:'nearest'});ask.querySelector('.assist-accept').focus({preventScroll:true});}
  }
  function record(key,correct){
    const s=sessions.get(key);if(!s)return;
    s.errors=correct?0:s.errors+1;
    if(!s.guided&&s.errors>=2)s.asking=true;
    s.refresh();
    if(s.asking){s.bar.scrollIntoView({block:'nearest'});s.bar.querySelector('.assist-accept').focus({preventScroll:true});}
  }
  root.XiuxianPuzzleAssist={mount,record,refresh:key=>sessions.get(key)?.refresh(),prune};
})(globalThis);
