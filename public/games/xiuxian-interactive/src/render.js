(function (root) {
  'use strict';
  const D = root.XiuxianData, A = root.XiuxianArt, R = root.XiuxianExpeditionData;
  class View {
    constructor(canvas) { this.motion = new root.XiuxianFieldMotion(); this.canvas = canvas; this.ctx = canvas.getContext('2d'); }
    resize() {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = D.width * scale; this.canvas.height = D.height * scale;
      this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
      this.ctx.imageSmoothingEnabled = true; this.ctx.imageSmoothingQuality = 'high';
    }
    point(event) {
      const r = this.canvas.getBoundingClientRect();
      return { x: (event.clientX - r.left) / r.width * D.width, y: (event.clientY - r.top) / r.height * D.height };
    }
    circle(c, x, y, r, fill, stroke) {
      c.beginPath(); c.arc(x, y, Math.max(0, r), 0, Math.PI * 2);
      if (fill) { c.fillStyle = fill; c.fill(); }
      if (stroke) { c.strokeStyle = stroke; c.stroke(); }
    }
    line(c, x1, y1, x2, y2, color, width = 1) {
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2);
      c.strokeStyle = color; c.lineWidth = width; c.lineCap = 'round'; c.stroke();
    }
    shadow(c, x, y, width, alpha = .22) {
      c.save(); c.translate(x, y + 3); c.scale(1, .32);
      const g = c.createRadialGradient(0, 0, 2, 0, 0, width);
      g.addColorStop(0, 'rgba(22,32,21,' + alpha + ')'); g.addColorStop(1, 'rgba(22,32,21,0)');
      this.circle(c, 0, 0, width, g); c.restore();
    }
    sprite(c, atlas, cell, x, feetY, height, flip = false, alpha = 1) {
      if(this.avatarActor&&['characters','chapterPeople','mortalAged'].includes(atlas)){
        const {g,time}=this.avatarActor;c.save();c.globalAlpha*=alpha;root.XiuxianAvatar.draw(c,{x,y:feetY,height,atlas,cell,flip,time,moving:g.moving,reduced:this.motion.reduced,swing:Math.max(g.feedback?.swing||0,g.feedback?.cast||0)*4,summary:g.arsenal.gear});c.restore();return;
      }
      const image = A.images[atlas], rect = A[atlas]?.[cell];
      if (!image?.complete || !image.naturalWidth || !rect) return;
      const [sx, sy, sw, sh] = rect, width = height * sw / sh;
      c.save(); c.translate(x, feetY); if (flip) c.scale(-1, 1); c.globalAlpha *= alpha;
      c.drawImage(image, sx, sy, sw, sh, -width / 2, -height, width, height);
      this.motion.flash(c,image,rect,-width/2,-height,width,height);
      c.restore();
    }
    livingSprite(c,atlas,cell,x,y,height,flip=false,player=false,moving=false) {
      c.save();this.motion.pose(c,x,y,moving,player);this.sprite(c,atlas,cell,x,y,height,flip);c.restore();
    }
    text(c, text, x, y, color = '#f0e7cb', size = 14) {
      c.save(); c.font = size + 'px "Microsoft YaHei", sans-serif'; c.textAlign = 'center';
      c.shadowColor = '#15291ce0'; c.shadowBlur = 5; c.shadowOffsetY = 1;
      c.fillStyle = color; c.fillText(text, x, y); c.restore();
    }
    label(c, title, x, y, selected = false) {
      // World geometry stays in map units; labels alone keep a 13 CSS-pixel floor.
      const cssScale=this.canvas.getBoundingClientRect().width/D.width||1,unit=1/Math.min(1,cssScale);
      c.save(); c.font = (13*unit)+'px "Microsoft YaHei", sans-serif';
      const width = c.measureText(title).width + 20*unit;
      x=Math.max(width/2+4*unit,Math.min(D.width-width/2-4*unit,x));
      y=Math.max(19*unit,Math.min(D.height-12*unit,y));
      c.fillStyle = selected ? '#22372bef' : '#25392abf';
      c.strokeStyle = selected ? '#dec78f' : '#d9d3ab55'; c.lineWidth = unit;
      c.beginPath(); c.roundRect(x - width / 2, y - 15*unit, width, 23*unit, 3*unit); c.fill(); c.stroke();
      c.textAlign = 'center'; c.fillStyle = selected ? '#fff0c8' : '#e0dfc7'; c.fillText(title, x, y + unit); c.restore();
    }
    person(c, game, time) {
      const s = game.state, moving = game.moving && s.hp > 0;
      const face = moving ? (game.moveFacing || game.face) : game.face;
      const base = s.gender === 'female' ? 0 : 4;
      const frame = face.y < -.4 ? 3 : (moving ? 1 + Math.floor(time * 8) % 2 : 0);
      this.shadow(c, s.x, s.y, 31, .3);
      c.save(); this.motion.pose(c,s.x,s.y+3,moving,true); if (!this.motion.reduced && game.hurtCd > 0) c.globalAlpha = .55 + Math.abs(Math.sin(time * 22)) * .4;
      if (game.dash > 0 && !this.motion.reduced) {
        for (let i = 3; i > 0; i--) this.sprite(c, 'characters', base + frame, s.x - game.dashVector.x * i * 15, s.y - game.dashVector.y * i * 15, 94, face.x < 0, .14);
      }
      this.sprite(c, 'characters', base + frame, s.x, s.y + 3, 94, face.x < 0); c.restore();
      if(!game.inCampaign?.()&&!game.activeEnemies().some(e=>e.hp>0))this.text(c, s.gender === 'female' ? '林墨 · 女修' : '林墨', s.x, s.y - 102, '#fff2c8', 13);
      if (game.ward > 0 || game.guard) {
        c.save(); c.translate(s.x, s.y - 38); c.scale(.78, 1.05); c.lineWidth = 1.5;
        this.circle(c, 0, 0, 44, '#c8dbe217', '#e3dab2b0'); c.restore();
        if (game.ward > 0) this.sprite(c, 'props', 12, s.x + 24, s.y - 35, 28);
      }
    }
    object(c, o, game, time, near) {
      const { x, y } = o, s = game.state;
      const isNear = near?.id === o.id;
      const visibleLabel = isNear || ['npc', 'portal', 'furnace', 'chest', 'stone', 'echoGate', 'runExit', 'altar', 'sealStone', 'moonHerb'].includes(o.kind);
      if (o.kind === 'caseObject') {
        if (o.cell != null) {
          const feet=o.id==='yardGate'?y+68:y+3;
          this.shadow(c,x,feet, o.height>75?28:20, .18);
          this.sprite(c,'caseObjects',o.cell,x,feet,o.height);
          if(o.id==='swordMark' && s.story.evidence.includes('mark')) this.line(c,x-7,y-16,x+6,y-22,'#ddd2b9',1);
        } else if(o.id==='townWell') this.sprite(c,'props',1,x,y+4,64);
        else this.text(c,['townReturn','yardExit'].includes(o.id)?'‹':'›',x,y-10,'#e5e0ce',32);
        this.label(c,o.name,x,y+(o.id==='yardGate'?88:25),isNear);
      } else if (o.kind === 'npc') {
        this.shadow(c, x, y, 32);
        this.livingSprite(c, 'characters', 8, x, y + 2, 94);
        if (!s.flags.complete) this.text(c, s.inventory.box ? '◆' : '◇', x, y - 108 + Math.sin(time * 2) * 3, '#ffe3a2', 23);
      } else if (['echoGate','runExit','altar','moonHerb','sealStone'].includes(o.kind)) {
        const config = { echoGate:[9,82], runExit:[9,60], altar:[9,90], moonHerb:[10,62], sealStone:[11,94] }[o.kind];
        this.shadow(c,x,y,34); this.sprite(c,'echoes',config[0],x,y+4,config[1]);
        if (o.kind === 'echoGate' || o.kind === 'altar') {
          c.save(); c.translate(x,y-30); c.scale(1,.4); c.lineWidth=1.3;
          this.circle(c,0,0,44+Math.sin(time*2)*3,null,'#ffe5a2bb'); c.restore();
          for(let i=0;i<5;i++){const a=time+i*1.26;this.circle(c,x+Math.cos(a)*32,y-55+Math.sin(a)*10,1.7,'#ffe598');}
        }
      } else if (o.kind === 'portal') {
        c.save(); c.translate(x, y + 5); c.scale(1, .4); c.lineWidth = 1.5;
        this.circle(c, 0, 0, 37 + Math.sin(time * 2) * 2, '#fff3c316', '#ece3b184'); c.restore();
        this.text(c, o.id === 'toRuins' ? '›' : '‹', x, y - 9, '#ffedba', 36);
      } else {
        const config = {
          furnace: [0, 82], well: [1, 66], training: [2, 83], stone: [3, 92],
          herb: [4, 46], chest: [5, 54], cache: [5, 45], supply: [5, 48], vine: [6, 155]
        }[o.kind];
        if (config) {
          const feet = o.kind === 'vine' ? y + 65 : y + 4;
          this.shadow(c, x, feet - 3, o.kind === 'herb' ? 19 : o.kind === 'vine' ? 38 : 35);
          this.sprite(c, 'props', config[0], x, feet, config[1]);
        }
        if (o.kind === 'furnace') for (let i = 0; i < 4; i++) {
          const phase = (time * .21 + i / 4) % 1;
          this.circle(c, x + Math.sin(time + i) * phase * 9, y - 75 - phase * 38, 3 + phase * 6, 'rgba(238,235,216,' + (1 - phase) * .1 + ')');
        }
        if (o.kind === 'chest') this.text(c, '◆', x, y - 70 + Math.sin(time * 2) * 2, '#ffdc92', 17);
        if (o.kind === 'vine' && (isNear || s.vineHp < 90)) {
          c.fillStyle = '#233527c9'; c.fillRect(x - 32, y - 105, 64, 4);
          c.fillStyle = '#dab77b'; c.fillRect(x - 32, y - 105, 64 * s.vineHp / 90, 4);
        }
      }
      if (isNear) {
        c.save(); c.translate(x, o.kind === 'vine' ? y + 55 : y + 4); c.scale(1, .4); c.lineWidth = 1.8;
        this.circle(c, 0, 0, 34, null, o.kind==='caseObject'?'#dbd8c4':'#fbe4a5'); c.restore();
      }
      if (visibleLabel) this.label(c, o.name, x, y + (o.kind === 'vine' ? 90 : 25), isNear);
    }
    enemy(c, e, time) {
      if (e.hp <= 0) return;
      const height = R.enemies[e.kind]?.height || (e.kind === 'stone' ? 122 : 72), bob = e.kind === 'stone' ? Math.sin(time * 3) : Math.sin(time * 3) * 5;
      this.shadow(c, e.x, e.y, e.kind === 'stone' ? 44 : 29, .3);
      if (R.enemies[e.kind]) this.sprite(c, 'foes', R.enemies[e.kind].cell, e.x, e.y + bob, height);
      else this.sprite(c, 'characters', e.kind === 'stone' ? 9 : 10, e.x, e.y + bob, height);
      if (e.burn > 0) for (let i = 0; i < 5; i++) {
        const phase = (time * .8 + i * .2) % 1;
        this.circle(c, e.x + Math.sin(i * 4) * 24, e.y - 18 - phase * height * .7, 3 * (1 - phase) + 1, 'rgba(246,164,73,' + (1 - phase) + ')');
      }
      if (e.slow > 0) {
        c.save(); c.translate(e.x, e.y - 3); c.scale(1, .4); this.circle(c, 0, 0, 32, '#9dd8df25', '#d2edf1'); c.restore();
      }
      c.fillStyle = '#192e25c9'; c.fillRect(e.x - 28, e.y - height - 14, 56, 4);
      c.fillStyle = '#d0ad74'; c.fillRect(e.x - 28, e.y - height - 14, 56 * e.hp / e.maxHp, 4);
      this.text(c, e.name || R.enemies[e.kind]?.name || (e.kind === 'stone' ? '守匣石傀' : '游荡石灵'), e.x, e.y - height - 23, '#f1dfb4', 13);
    }
    effect(c, e) {
      c.save(); const t = e.age / e.life; c.globalAlpha = 1 - t;
      if (e.kind === 'relicProc') {
        const def=R.relics[e.relic], strength=R.visualFor(e.relic,e.level).strength;
        const radius=18+strength*5+t*14; c.lineWidth=1;
        this.circle(c,e.x,e.y-35,radius,null,R.paths[def.path].color);
        this.sprite(c,'relicsBase',def.cell,e.x,e.y-28-t*13,22+strength*3,false,.85);
      } else if (e.kind === 'attune') {
        c.lineWidth=1;this.circle(c,e.x,e.y-28,12+t*24,null,'#d4dfc5');
      } else if (e.kind === 'ascend' || e.kind === 'resonance') {
        c.save(); c.translate(e.x,e.y-20); c.scale(1,.55); c.lineWidth=2;
        for(let i=0;i<3;i++) this.circle(c,0,0,25+t*100+i*14,null,i===1?'#fff2b8':'#dbac55');
        c.restore();
        for(let i=0;i<16;i++){const a=i*2.4,r=20+t*95;this.circle(c,e.x+Math.cos(a)*r,e.y-30+Math.sin(a)*r*.55-t*55,1.5+(1-t)*2,'#ffe7a4');}
      } else if (e.kind === 'slash') {
        c.lineCap = 'round';
        for (let i = 3; i >= 0; i--) {
          c.strokeStyle = i ? '#f1dfac40' : '#fff6ce'; c.lineWidth = (i ? i * 6 : 2) * (1 - t) + 1;
          c.beginPath(); c.arc(e.x, e.y - 30, 64, e.angle - .95 + t, e.angle + .95 + t); c.stroke();
        }
      } else if (e.kind === 'number') this.text(c, e.text, e.x, e.y - t * 32 - 50, e.color, 21);
      else if (e.kind === 'fire') {
        const gradient = c.createRadialGradient(e.x, e.y, 2, e.x, e.y, 90);
        gradient.addColorStop(0, '#ffe5a288'); gradient.addColorStop(.5, '#ed9f4d44'); gradient.addColorStop(1, '#ed9f4d00');
        this.circle(c, e.x, e.y, 28 + t * 70, gradient); this.sprite(c, 'props', 8, e.x, e.y - t * 20, 48 * (1 - t) + 20);
        for (let i = 0; i < 15; i++) {
          const a = i * 2.4, r = t * (40 + i * 3);
          this.circle(c, e.x + Math.cos(a) * r, e.y + Math.sin(a) * r * .6 - t * 15, 2.5 * (1 - t) + .4, '#ffd29a');
        }
      } else if (e.kind === 'needle') {
        for (let i = 0; i < 8; i++) {
          const a = i * Math.PI / 4, r = t * 42;
          this.line(c, e.x + Math.cos(a) * r, e.y + Math.sin(a) * r, e.x + Math.cos(a) * (r + 19), e.y + Math.sin(a) * (r + 19), '#d7f6f4', 2);
        }
      } else {
        c.save(); c.translate(e.x, e.y); c.scale(1, .55); c.lineWidth = 2;
        this.circle(c, 0, 0, 14 + t * 55, null, e.kind === 'heal' ? '#f5eac1' : '#e3c99b'); c.restore();
      }
      c.restore();
    }
    draw(game, pointer, selected, time) {
      const c = this.ctx, s = game.state;
      if (A.status !== 'ready') { c.fillStyle = '#1f3027'; c.fillRect(0, 0, D.width, D.height); this.text(c, '山卷尚未展开…', 640, 380); return; }
      c.clearRect(0, 0, D.width, D.height);
      const atSummit = s.map === 'garden' && game.sectSummitBattleActive?.();
      const backdrop=A.images[atSummit?'summitGrounds':s.map];
      const shake=this.options.shake&&!this.motion.reduced?Math.max(game.feedback?.shake||0,this.motion.impact||0):0;
      if(shake>0){
        const shift=shake*10;
        c.drawImage(backdrop,-shift+Math.sin(time*91)*shift,-shift+Math.cos(time*83)*shift,D.width+shift*2,D.height+shift*2);
      }else c.drawImage(backdrop,0,0,D.width,D.height);
      this.terrain?.(c,game,time);
      this.motion.atmosphere(c,atSummit?'summit':s.map,time);
      this.motion.ground(c);
      root.XiuxianWeapons?.ground(c,game.arsenal);
      this.drawGuideGround?.(c,game,this.goal,time);
      this.floorFigures?.(c,game,time);
      this.telegraphs?.(c,game,time);
      if (s.map==='wangyard') for(const twig of root.XiuxianStoryData.twigs) this.sprite(c,'caseObjects',13,twig.x,twig.y+25,65);
      const near = game.nearest();
      const entities = game.objects().map(o => ({ y: o.y, draw: () => this.object(c, o, game, time, near) }));
      for (const e of game.activeEnemies()) if (e.hp > 0) entities.push({ y: e.y, draw: () => this.enemy(c, e, time) });
      entities.push({ y: s.y, draw: () => { this.avatarActor=game.arsenal?{g:game,time}:null;try{this.person(c, game, time);}finally{this.avatarActor=null;} this.motion.defense(c,game); } });
      entities.sort((a, b) => a.y - b.y).forEach(e => e.draw());
      if (game.lure) {
        this.sprite(c, 'props', 10, game.lure.x, game.lure.y, 43);
        this.motion.incense(c,game.lure,time);
        c.save(); c.translate(game.lure.x, game.lure.y); c.scale(1, .45); c.lineWidth = 1;
        this.circle(c, 0, 0, 36 + Math.sin(time * 3) * 7, null, '#e7d6a580'); c.restore();
      }
      game.equipped().filter(g=>R.visualFor(g.base,g.level).orbit && !['qingyang','wangyard'].includes(s.map)).slice(0,1).forEach((g,i)=>{
        const a=time*.9+i*Math.PI*2/3, x=s.x+Math.cos(a)*37, y=s.y-46+Math.sin(a)*11;
        this.sprite(c,'relics',R.relics[g.base].cell,x,y,21+(g.level===3?5:0),false,.88);
        this.circle(c,x,y-12,2,g.level===3?'#ffe38c':'#dce9ce');
      });
      this.followers?.(c,game,time);
      if (!atSummit) this.foreground?.(c,game,time);
      for(const e of game.effects)if(e.kind!=='number')this.effect(c,e);
      if(!this.fieldNumbers)for(const e of game.effects)if(e.kind==='number')this.effect(c,e);
      if (pointer && selected && !D.items[selected]?.self && !game.inCase()) {
        // Keep the targeting preview at the same clamped range as useItem().
        const dx = pointer.x - s.x, dy = pointer.y - s.y, scale = Math.min(1, 250 / (Math.hypot(dx, dy) || 1));
        const x = Math.max(55, Math.min(1225, s.x + dx * scale)), y = Math.max(85, Math.min(695, s.y + dy * scale));
        c.save(); c.setLineDash([4, 5]); this.circle(c, x, y, selected === 'fire' ? 92 : selected === 'needle' ? 60 : 24, '#ffefd012', '#fff1b7c0'); c.restore();
        this.line(c, x - 6, y, x + 6, y, '#fff5d2'); this.line(c, x, y - 6, x, y + 6, '#fff5d2');
      }
      for (let i = 0; i < (s.map === 'valley' ? 4 : 0); i++) {
        const x = (i * 137 + time * (4 + i % 3)) % 1280, y = (i * 89 + Math.sin(time * .4 + i) * 16) % 760;
        this.circle(c, x, y, 1.2, '#fff4bd66');
      }
      this.motion.critical(c,s.hp,time);
      this.fieldDamageLinks?.(c,game);
      this.drawGuide?.(c,game,this.goal,time);
      root.XiuxianWeapons?.paint(c,game.arsenal,time);
      this.combatHUD?.(c,game,time);
      this.threatOverlay?.(c,game,time);
      root.XiuxianWeapons?.warnings(c,game.arsenal);
    }
  }
  root.XiuxianView = View;
})(globalThis);
