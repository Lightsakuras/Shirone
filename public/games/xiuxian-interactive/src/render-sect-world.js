(function(root){
  'use strict';
  const Base=root.XiuxianView,A=root.XiuxianArt;
  const people={yun:0,qinlu:1,luqinghe:2};
  class SectWorldView extends Base{
    object(c,o,g,time,near){
      if(o.kind!=='sectWorldObject')return super.object(c,o,g,time,near);
      const chosen=near?.id===o.id,collected=o.role==='pickup'&&g.state.sectWorld?.station.gathered.includes('gather-'+o.item);
      if(o.role==='npc'){
        this.shadow(c,o.x,o.y,24,.21);this.livingSprite(c,'sectPeople',people[o.person],o.x,o.y+1,o.height);
      }else if(o.role==='portal')this.text(c,'↓',o.x,o.y-12,'#e5dfc5',32);
      else{
        const atlas=o.role==='pickup'?'props':o.atlas,cell=o.role==='pickup'?A.itemCells[o.item]:o.cell;
        if(cell!=null){this.shadow(c,o.x,o.y,Math.min(28,o.height*.32),.17);this.sprite(c,atlas,cell,o.x,o.y+2,o.height,false,collected?.38:1);}
      }
      if(chosen){c.save();c.translate(o.x,o.y+4);c.scale(1,.4);this.circle(c,0,0,28,null,'#d6d3b6');c.restore();}
      this.label(c,o.name+(collected?' · 已领取':''),o.x,o.y+25,chosen);
    }
  }
  root.XiuxianView=SectWorldView;
})(globalThis);
