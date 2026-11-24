(function(root){
  'use strict';
  const H=root.XiuxianHomestead,D=root.XiuxianArmoryData,I=root.XiuxianItemIcons;
  function create({store,game,openModal,save,sound,practice}){
    function show(note=''){
      const home=store.state.homestead,aura=H.bonus(home),collection=store.state.exhibits;
      const racks=home.rack.map((id,n)=>{
        const slot=H.slot(n),candidates=collection.filter(k=>D.bases[k].slot===slot);
        return '<label class="display-stand">'+I.draw(id||(slot==='weapon'?'stand':'hanger'),id?4:0)+'<span>'+D.slots[slot]+'架 · '+(slot==='weapon'?n+1:n-2)+'</span><select data-rack="'+n+'" aria-label="陈列位 '+(n+1)+'"><option value="">空架</option>'+candidates.map(k=>'<option value="'+k+'" '+(k===id?'selected':'')+'>'+D.bases[k].name+'</option>').join('')+'</select></label>';
      }).join('');
      const plots=H.beds.map((bed,n)=>{const level=home.plots[n];
        return '<article class="garden-bed">'+I.draw(bed.icon,level===3?4:1)+'<div><h4>'+bed.name+'</h4><p>'+bed.reward+'</p><small>'+(level===null?'待播种':['初种','抽芽','含苞','成熟'][level]+' · '+level+'/3')+'</small></div><button data-plant="'+n+'" '+(level!==null?'disabled':'')+'>'+(level===null?'播种':'已种')+'</button></article>';
      }).join('');
      openModal('homestead','<section class="loot-shell home-shell"><header><div><small>蜀山药庐</small><h2 id="modal-title">药庐洞府</h2></div><button id="practice-dummy">试剑木人桩 · 测伤</button></header><h3>神兵华服陈列架</h3><p>器韵加持　全伤 +'+(100*aura.damage).toFixed(1)+'%　移速 +'+(100*aura.move).toFixed(1)+'%　掉宝 +'+(100*aura.loot).toFixed(1)+'%</p><div class="display-row">'+racks+'</div><h3>三畦灵田</h3><p>每胜 1 战、过 1 层天渊或闯 3 波九霄，灵草长 1 阶；满 3 阶可采。</p><div class="beds">'+plots+'</div><div class="harvest-actions"><button id="home-harvest" '+(home.plots.includes(3)?'':'disabled')+'>收获成熟灵草</button><span role="status">'+note+'</span></div></section>');
      const panel=document.querySelector('.home-shell');
      panel.onchange=e=>{if(e.target.matches('[data-rack]')){H.display(store,+e.target.dataset.rack,e.target.value||null,D.bases);show('陈设已保存');sound.preview('equipWear',.65);}};
      panel.onclick=e=>{
        if(e.target.id==='practice-dummy'){practice();return;}
        const seed=e.target.closest('[data-plant]');if(seed&&H.plant(store,+seed.dataset.plant)){show('已播种');sound.preview('pickup',.65);}
        if(e.target.id==='home-harvest'){
          const picked=H.harvest(store,game(),save);
          show(picked?'已收获 '+picked.map(n=>H.beds[n].reward).join('、'):'请先腾出行囊空间或检查存档。');
          if(picked)sound.preview('lootGold',.65);
        }
      };
    }
    return {show:()=>show()};
  }
  root.XiuxianHomesteadUI={create};
})(globalThis);
