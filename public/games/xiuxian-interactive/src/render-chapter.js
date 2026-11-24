(function(root){
  'use strict';
  const Base=root.XiuxianView;
  class ChapterView extends Base{
    person(c,g,time){
      if(!g.isChild())return super.person(c,g,time);
      this.shadow(c,g.state.x,g.state.y,22,.24);
      this.livingSprite(c,'chapterPeople',g.state.gender==='female'?0:1,g.state.x,g.state.y,68,g.face.x<0,true,g.moving);
      this.text(c,'林墨 · 十岁',g.state.x,g.state.y-77,'#e8ddc4',12);
    }
    object(c,o,g,time,near){
      if(o.kind!=='chapterObject')return super.object(c,o,g,time,near);
      const chosen=near?.id===o.id;
      if(o.cell!=null){this.shadow(c,o.x,o.y,Math.min(34,o.height*.34),.2);if(o.atlas==='chapterPeople'&&o.cell<=8)this.livingSprite(c,o.atlas,o.cell,o.x,o.y+3,o.height);else this.sprite(c,o.atlas,o.cell,o.x,o.y+3,o.height);}
      else this.text(c,/Return|Exit|leave/.test(o.id)?'‹':'›',o.x,o.y-9,'#ece2ce',30);
      if(o.id==='hearth'&&g.state.chapter.survival.fire){
        c.save();const glow=c.createRadialGradient(o.x,o.y-9,2,o.x,o.y-9,45);glow.addColorStop(0,'#f1a45b55');glow.addColorStop(1,'#f1a45b00');this.circle(c,o.x,o.y-9,45,glow);
        for(let i=0;i<7;i++){const p=(time*.7+i/7)%1;this.circle(c,o.x+Math.sin(i*3+time)*8*(1-p),o.y-7-p*38,(1-p)*7+1,i%2?'#eb9d49bb':'#ffdc94cc');}c.restore();
      }
      if(o.id==='rubble'&&g.state.chapter.tomb.rubble<90){c.fillStyle='#211e1ce0';c.fillRect(o.x-36,o.y-o.height-13,72,4);c.fillStyle='#d8c8a7';c.fillRect(o.x-36,o.y-o.height-13,g.state.chapter.tomb.rubble/90*72,4);}
      if(chosen){c.save();c.translate(o.x,o.y+4);c.scale(1,.4);c.lineWidth=1;this.circle(c,0,0,30,null,'#dad6be');c.restore();}
      this.label(c,o.name,o.x,o.y+26,chosen);
    }
    enemy(c,e,time){
      if(!['wang','lesson'].includes(e.kind))return super.enemy(c,e,time);
      const height=e.kind==='wang'?128:87;
      this.shadow(c,e.x,e.y,35,.3);
      this.sprite(c,e.kind==='wang'?'chapterPeople':'chapterProps',e.kind==='wang'?(e.wind>0?6:e.weak>0?7:5):19,e.x,e.y,height);
      c.fillStyle='#1d2023db';c.fillRect(e.x-43,e.y-height-17,86,5);c.fillStyle=e.weak>0?'#d9c187':'#bc7262';c.fillRect(e.x-43,e.y-height-17,86*e.hp/e.maxHp,5);
      this.text(c,e.name+(e.weak>0?' · 气路已破':''),e.x,e.y-height-27,'#f1e2c8',13);
    }
    terrain(c,g,time){
      const s=g.state,t=s.chapter.tomb;
      if(s.map==='crypt'){
        if(t.bridge)this.sprite(c,'chapterProps',4,640,485,130);
        this.text(c,t.bridge?'绳板通路':'翻板 · 铺桥或跃过',640,728,'#d6cbb4',12);
        if(!t.arrows){c.save();c.setLineDash([7,10]);c.strokeStyle='#c4b18d77';c.strokeRect(300,300,130,290);c.restore();
          if(g.arrowWind>0){c.fillStyle='#b75a3c55';c.fillRect(300,300,130,290);for(let i=0;i<7;i++)this.line(c,300,320+i*40,430,320+i*40,'#edcbaa99',1);this.text(c,'弩箭将至',365,283,'#ffe0b6',15);}}
        if(!t.vent){c.save();for(let i=0;i<8;i++){const x=890+(i%3)*65+Math.sin(time*.6+i)*16,y=350+Math.floor(i/3)*65;const mist=c.createRadialGradient(x,y,5,x,y,62);mist.addColorStop(0,'#91ae9340');mist.addColorStop(1,'#91ae9300');this.circle(c,x,y,62,mist);}c.restore();this.text(c,'毒烟 · 清心散 / 通风',965,308,'#d3dbc8',12);}
      }
    }
    followers(c,g,time){
      if(g.state.chapter.tomb.stage!=='escort')return;
      for(let i=0;i<4;i++){const x=g.state.x-42-(i%2)*25,y=g.state.y-10+Math.floor(i/2)*24;this.shadow(c,x,y,13,.18);this.sprite(c,'chapterPeople',i%2,x,y+(g.moving?Math.sin(time*11+i):0),39);}
    }
    effect(c,e){
      if(!['foxAssist','farewell'].includes(e.kind))return super.effect(c,e);
      const p=e.age/e.life;c.save();this.sprite(c,'chapterPeople',4,e.x,e.y-p*18,116,false,(1-p)*.8);if(e.kind==='foxAssist'){c.lineWidth=2;this.circle(c,e.x,e.y-32,30+p*65,null,'#cddfeb99');}c.restore();
    }
  }
  root.XiuxianView=ChapterView;
})(globalThis);
