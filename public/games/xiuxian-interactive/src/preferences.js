(function(){
  'use strict';
  window.XiuxianPreferences=function({game,view,openModal,closeModal,controls,profile,getDefaultPortrait,onProfileChange,onBindingsChange}){
    const $=id=>document.getElementById(id),key='xiuxian-options-v1',Audio=window.XiuxianAudio;
    let stored=null;try{stored=JSON.parse(localStorage.getItem(key));}catch{}
    const options=Audio.normalize(stored);
    options.playMode=['classic','challenge'].includes(stored?.playMode)?stored.playMode:'relaxed';
    const modeInfo={
      relaxed:['敌人伤害减半、己方输出增强，脱战自动回满气血灵力，舆图可御剑速行；解谜连错 2 次自动指路，后期 Boss 适度递增体验神装爽感。','减伤半数','脱战回满','御剑速行'],
      classic:['保持原版数值与战斗节奏，阅图不传送；解谜连错 2 次仍可自主选择是否求助，适合原汁原味体验。','原版数值','步行探索','自主求助'],
      challenge:['主线后期与天渊强敌大幅提难并增设首领词缀，考验神装搭配与 V 键暂停战术；回报：装备掉宝品质 +35%、灵锻石与精魄 +50%，讨伐首领额外掉稀有外观碎片。','首领词缀','掉宝 +35%','材料 +50%']
    };
    function modePicker(id){
      return '<label class="mode-picker" id="'+id+'"><span>玩法模式</span><select id="'+(id==='creation-mode'?'play-mode':'settings-play-mode')+'" aria-label="玩法模式"><option value="relaxed">顺心轻松 · 推荐</option><option value="classic">经典标准 · 原版体验</option><option value="challenge">砺剑挑战 · 刷宝进阶</option></select><span class="mode-tags"></span><small aria-live="polite"></small></label>';
    }
    function bindMode(id){
      function paint(picker){
        picker.querySelector('select').value=options.playMode;
        const [desc,...tags]=modeInfo[options.playMode];picker.querySelector('small').textContent=desc;
        picker.querySelector('.mode-tags').innerHTML=tags.map(t=>'<i>'+t+'</i>').join('');
      }
      const field=$(id).querySelector('select');paint($(id));
      field.onchange=()=>{
        options.playMode=field.value;
        if(game())game().playMode=field.value;
        document.querySelectorAll('.mode-picker').forEach(paint);
        persist();
      };
    }
    if(!stored&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){options.shake=false;options.reducedMotion=true;}
    const sound=new Audio.Manager(options);view.options=options;
    const playerSettings=controls&&profile&&window.XiuxianPlayerSettingsUI?window.XiuxianPlayerSettingsUI.create({controls,profile,openModal,closeModal,onBack:show,getDefaultPortrait}):null;
    if(controls)controls.subscribe(()=>{controls.decorateBindings(document);onBindingsChange?.();});
    if(profile&&onProfileChange)profile.subscribe(onProfileChange);
    const persist=()=>{sound.applySettings(options);try{localStorage.setItem(key,JSON.stringify(options));}catch{const n=$('settings-note');if(n)n.textContent='设置本次有效；浏览器未允许保存偏好。';}update();};
    const musicControl='<div class="music-control" role="group" aria-label="乐阁"><span data-track-name></span><button type="button" data-music="next">下一首</button><button type="button" data-music="mute"></button><button type="button" data-music="rotate"></button></div>';
    let lastTrack='';
    function refreshMusic(force=false){
      const title=sound.nowPlaying?.title||'待入曲',mark=[title,options.musicMuted,options.rotation].join('|');
      if(!force&&mark===lastTrack)return;lastTrack=mark;
      for(const group of document.querySelectorAll('.music-control')){
        group.dataset.muted=String(!!options.musicMuted||!options.enabled);
        group.dataset.rotating=String(!!options.rotation);
        group.querySelector('[data-track-name]').textContent='♪ '+title;
        for(const [key,label,on] of [['mute','静音',options.musicMuted],['rotate','轮播',options.rotation]]){
          const button=group.querySelector('[data-music='+key+']');button.textContent=label+(on?'开':'关');button.setAttribute('aria-pressed',String(on));
        }
      }
    }
    document.addEventListener('click',e=>{
      const action=e.target.closest('[data-music]')?.dataset.music;if(!action)return;
      if(action==='next')sound.nextTrack();
      else{const key=action==='mute'?'musicMuted':'rotation';options[key]=!options[key];persist();}
      refreshMusic(true);
    });
    const unlock=()=>{if(!sound.unlocked||sound.mediaBlocked||options.enabled&&!sound.ctx)sound.unlock();};
    document.addEventListener('click',unlock,{capture:true});document.addEventListener('pointerdown',unlock,{capture:true});document.addEventListener('keydown',unlock,{capture:true});
    function show(){
      const ranges={master:'总音量',music:'山行配乐',ambience:'雨声与山风',effects:'动作与器物'};
      const toggles={enabled:'开启声音',reducedMotion:'减弱装饰动画（气脉、地图与指引）',shake:'受击时轻微震屏',hitPause:'命中时短暂顿帧（约 0.03–0.06 秒）',guide:'显示行动提示与目的地标记',foreground:'显示前景枝叶与梁檐（遮住角色时淡化）'};
      openModal('settings','<p class="eyebrow">山行偏好 · 已暂停</p><h2 id="modal-title">听雨，听剑，听山风</h2><p class="modal-subtitle">山中声景随昼夜地貌流转。寻常器物保持克制留白，唯出剑破招与催动灵术时各有清越回响。</p><div class="settings-grid">'+Object.entries(toggles).map(([k,label])=>'<label class="setting-toggle"><span>'+label+'</span><input type="checkbox" id="option-'+k+'" '+(options[k]?'checked':'')+'></label>').join('')+Object.entries(ranges).map(([k,label])=>'<label class="setting-range" for="option-'+k+'"><span>'+label+'</span><output id="volume-'+k+'">'+Math.round(options[k]*100)+'%</output><input id="option-'+k+'" type="range" min="0" max="100" step="1" value="'+Math.round(options[k]*100)+'"></label>').join('')+'</div><p id="settings-note" class="pause-note" role="status">暂停菜单、设置或切出游戏时停止声音；剧情对话与修行页保留对应配乐，场中仍暂停。偏好保存在本机。</p><div class="buttons"><button id="sound-preview" class="secondary">试听一次格挡</button><button id="settings-done" class="primary">收起设置</button></div>');
      document.querySelector('.settings-grid').insertAdjacentHTML('afterbegin',modePicker('settings-mode'));bindMode('settings-mode');
      $('settings-note').insertAdjacentHTML('beforebegin',musicControl);refreshMusic(true);
      for(const k of Object.keys(toggles))$('option-'+k).onchange=e=>{options[k]=e.target.checked;persist();};
      for(const k of Object.keys(ranges))$('option-'+k).oninput=e=>{options[k]=Number(e.target.value)/100;$('volume-'+k).textContent=e.target.value+'%';persist();};
      if(playerSettings){$('settings-note').insertAdjacentHTML('beforebegin','<div class="buttons player-settings-entry"><button id="settings-avatar" class="secondary">自定义玩家头像</button><button id="settings-controls" class="secondary">查看与修改全部快捷键</button></div>');$('settings-avatar').onclick=playerSettings.showAvatar;$('settings-controls').onclick=playerSettings.showBindings;}
      $('sound-preview').onclick=async()=>{try{const ok=await sound.preview();$('settings-note').textContent=ok?'已播放一声格挡。':'请开启声音，并调高总音量与动作音量。';}catch{$('settings-note').textContent='浏览器暂未允许声音，点击试听可重试。';}};
      $('settings-done').onclick=closeModal;
    }
    function update(){
      document.documentElement.classList.toggle('reduced-motion',options.reducedMotion);
      controls?.decorateBindings(document);
      const g=game(),goal=g?window.XiuxianGuide.goalFor(g):null;view.goal=goal;$('guide').hidden=!options.guide||!goal;
      if(!goal)return;const set=(id,t)=>{if($(id).textContent!==t)$(id).textContent=t;};
      set('guide-text',goal.text);set('guide-key',goal.action||'');$('guide-key').hidden=!!goal.ui||!goal.action||!!goal.id&&!window.XiuxianGuide.canInteract(g,goal);
      const go=$('guide-action');go.hidden=false;
      const verb=goal.id?window.XiuxianGuide.category(goal).verb:'';
      set('guide-action',goal.id?(goal.id==='furnace'?'打开丹炉':verb+' · '+(goal.displayName||goal.name)):goal.ui?'打开'+($(goal.ui)?.textContent.split(' · ')[0]||'面板'):'查剧情线');
      go.title='一步直达';
    }
    document.querySelector('.creation-start').insertAdjacentHTML('afterbegin',modePicker('creation-mode'));bindMode('creation-mode');
    $('settings-top').onclick=show;
    update();
    return {sound,options,key,show,update,playerSettings,musicControl,refreshMusic,tick:(paused,now,context={})=>{sound.sync(game(),paused||document.hidden,now,{...context,allowMusic:context.allowMusic===true&&!document.hidden});refreshMusic();}};
  };
})();
