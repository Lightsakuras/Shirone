(function(root){
  'use strict';
  const Score=typeof module==='object'&&module.exports?require('./audio-score.js'):root.XiuxianAudioScore;
  const defaults={enabled:true,rotation:true,musicMuted:false,master:.65,music:.35,ambience:.32,effects:.75,shake:true,guide:true,foreground:true,hitPause:true,reducedMotion:false};
  function normalize(value){const out={...defaults};if(!value||typeof value!=='object')return out;for(const k of Object.keys(out)){const v=value[k];if(typeof out[k]==='boolean'){if(typeof v==='boolean')out[k]=v;}else if(typeof v==='number'&&Number.isFinite(v))out[k]=Math.max(0,Math.min(1,v));}return out;}
  function sceneFor(game,context={}){
    if(!game)return {music:null,ambience:null};
    const cue=Score.select(game,context),track=Score.track(cue);
    return {music:track.file.replace(/\.(wav|ogg)$/,''),ambience:!cue.startsWith('battle')&&['temple','floodplain'].includes(game.state.map)?'rain':'wind'};
  }
  // SFX are physical noise/transient models and modal resonances, not sampled third-party audio.
  function cue(ctx,destination,name,volume=1,noiseBuffer,pitch=1){
    const now=ctx.currentTime,nodes=[],sources=[];let end=now+.1;
    const envelope=(duration,gain,attack=.004)=>{const g=ctx.createGain();g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(gain*volume,now+attack);g.gain.exponentialRampToValueAtTime(.0001,now+duration);g.connect(destination);nodes.push(g);end=Math.max(end,now+duration+.02);return g;};
    const tone=(freq,duration,gain,fall=1,type='sine',delay=0)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,now+delay);o.frequency.exponentialRampToValueAtTime(Math.max(30,freq*fall),now+delay+duration);g.gain.setValueAtTime(0,now);g.gain.setValueAtTime(0,now+delay);g.gain.linearRampToValueAtTime(gain*volume,now+delay+.004);g.gain.exponentialRampToValueAtTime(.0001,now+delay+duration);o.connect(g);g.connect(destination);o.start(now+delay);o.stop(now+delay+duration+.02);nodes.push(o,g);sources.push(o);end=Math.max(end,now+delay+duration+.03);};
    const noise=(frequency,duration,gain,type='bandpass',q=.6)=>{const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter();src.buffer=noiseBuffer;filter.type=type;filter.frequency.setValueAtTime(frequency,now);filter.Q.value=q;src.connect(filter);filter.connect(envelope(duration,gain));src.start(now);src.stop(now+duration+.02);nodes.push(src,filter);sources.push(src);};
    const chime=(notes,length=.48,gain=.09,spacing=.07)=>notes.forEach((hz,i)=>{
      tone(hz*pitch,length,gain,1,'sine',i*spacing);
      tone(hz*pitch*2.71,length*.45,gain*.22,.998,'sine',i*spacing);
    });
    switch(name){
      case 'swordSlash':noise(2400,.12,.15);chime([1470,2208],.23,.055,.012);break;
      case 'swordWave':for(let i=0;i<3;i++)tone(690+i*200,.22,.10,.38,'triangle',i*.064);noise(1900,.29,.11);break;
      case 'thunderCast':noise(410,.62,.3,'lowpass');tone(120,.43,.24,.32);chime([2170,3030,1630],.055,.065,.035);break;
      case 'fireCast':noise(970,.56,.27,'lowpass');tone(108,.38,.17,.37,'triangle');break;
      case 'iceCast':chime([1480,1975,2637],.49,.074,.032);noise(5200,.105,.12,'highpass');break;
      case 'bellRing':chime([147,353,586,881],1.58,.09,.004);break;
      case 'ghostWail':for(const hz of [231,235,345])tone(hz,.75,.057,.53,'sine');noise(670,.55,.08);break;
      case 'starDrop':chime([1320,1978,990],.64,.085,.085);break;
      case 'hitSolid':tone(138,.105,.19,.42);noise(760,.084,.16);break;
      case 'hitCrit':noise(3100,.09,.13);chime([960,2230],.39,.11,.014);break;
      case 'shieldBreak':noise(4700,.19,.16);chime([2600,1740,1150],.16,.071,.038);break;
      case 'dashWhoosh':noise(1300,.22,.15,'bandpass',.9);tone(358,.17,.045,.4);break;
      case 'playerHurt':tone(115,.23,.19,.48);noise(410,.15,.15,'lowpass');break;
      case 'ultimateCast':tone(117,.55,.15,3,'triangle');chime([294,440,587,880],.92,.083,.1);break;
      case 'xpPickup':chime([659.25],.22,.115);break;
      case 'levelUp':chime([392,494,587,784],.69,.1,.085);break;
      case 'evolveUltra':chime([131,327,523,659,1046],1.65,.10,.095);break;
      case 'lootPurple':chime([988,1318],.66,.105,.075);break;
      case 'lootGold':chime([880,1320,1760],.82,.09,.095);break;
      case 'lootAncient':chime([196,392,588,988,1568],1.6,.092,.08);break;
      case 'forgeHammer':noise(2600,.065,.2);chime([720,1935,1440],.48,.09,.078);break;
      case 'shopBuy':chime([1830,1520,2280],.28,.075,.066);break;
      case 'equipWear':noise(3100,.2,.085);tone(1220,.18,.072,.72);break;
      case 'bountyClear':tone(98,.29,.23,.48);chime([294,392,494,784],.79,.105,.13);break;
      case 'sword':noise(2100,.17,.13);break;
      case 'hit':noise(1300,.11,.2);tone(940,.16,.09,.96);tone(1470,.1,.035);break;
      case 'block':tone(1310,.3,.13,.985);tone(2270,.18,.05);noise(3400,.065,.13);break;
      case 'hurt':tone(92,.15,.19,.55);noise(430,.13,.15,'lowpass');break;
      case 'dash':noise(900,.22,.11,'bandpass',.8);break;
      case 'fire':noise(780,.48,.26,'lowpass');tone(88,.24,.14,.45);break;
      case 'needle':for(let i=0;i<3;i++)tone(1600+i*410,.17,.035,1,'sine',i*.025);break;
      case 'heal':for(let i=0;i<3;i++)tone(620+i*150,.11,.065,.64,'sine',i*.06);noise(1250,.2,.03);break;
      case 'ward':tone(330,.5,.08);tone(495,.6,.055);break;
      case 'pickup':noise(2100,.11,.08);tone(320,.07,.025,.7);break;
      case 'craft':noise(800,.22,.1);tone(740,.15,.055);break;
      case 'stepStone':noise(750,.045,.1);tone(160,.05,.055,.65);break;
      case 'stepGrass':noise(1800,.07,.08,'highpass');break;
      case 'stepRain':noise(2300,.09,.07);tone(480,.07,.028,.5);break;
      case 'breakthrough':case 'loot':case 'complete':for(let i=0;i<3;i++){tone([523.25,659.25,783.99][i],.65,.07,1,'sine',i*.12);tone([1046.5,1318.5,1567.98][i],.35,.016,1,'sine',i*.12);}break;
      case 'heavenDrop':for(const [i,hz] of [880,1320,1760].entries())tone(hz,.75,.08,1,'sine',i*.11);break;
      case 'ancientDrop':for(const [i,hz] of [196,392,588,990,1568].entries())tone(hz,1.9-i*.18,.1/(1+i*.3),1,'sine',i*.055);break;
      case 'warning':tone(320,.15,.08,.72);tone(640,.11,.025,.8);break;
      case 'impact':tone(70,.35,.23,.52);noise(680,.25,.15,'lowpass');break;
      case 'fox':tone(587.33,.7,.065);tone(880,.85,.035);break;
      default:return null;
    }
    return {end,stop(){for(const s of sources)try{s.stop();}catch{}for(const n of nodes)try{n.disconnect();}catch{}}};
  }
  class Manager{
    constructor(settings={}){this.settings=normalize(settings);this.ctx=null;this.unlocked=false;this.active=false;this.layers={};this.voices=[];this.lastCue={};this.played=0;this.mediaBlocked=false;this.lastTick=0;this.fading=[];this.nowPlaying=null;}
    unlock(){
      this.unlocked=true;if(!this.settings.enabled)return;
      if(!this.ctx){const AC=root.AudioContext||root.webkitAudioContext;if(AC)try{this.ctx=new AC({latencyHint:'interactive'});this.bus=this.ctx.createGain();const limiter=this.ctx.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=10;limiter.ratio.value=6;this.bus.connect(limiter);limiter.connect(this.ctx.destination);const n=this.ctx.sampleRate;this.noise=this.ctx.createBuffer(1,n,this.ctx.sampleRate);const a=this.noise.getChannelData(0);let seed=61112;for(let i=0;i<n;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;a[i]=(seed/4294967296)*2-1;}}catch{this.ctx=null;}}
      if(this.ctx&&this.active)this.ctx.resume().catch(()=>{});this.mediaBlocked=false;for(const layer of Object.values(this.layers))layer.requested=false;this.applySettings();
    }
    applySettings(value){if(value)this.settings=normalize(value);if(this.bus)this.bus.gain.setTargetAtTime(this.settings.enabled?this.settings.master*this.settings.effects:0,this.ctx.currentTime,.025);}
    stopVoices(){for(const v of this.voices)v.stop();this.voices=[];}
    quiet(){root.clearTimeout?.(this.previewTimer);this.stopVoices();this.ctx?.suspend().catch(()=>{});}
    pauseMedia(){for(const layer of Object.values(this.layers)){layer.el.pause();layer.requested=false;}for(const previous of this.fading){previous.el.pause();previous.el.removeAttribute('src');previous.el.load();}this.fading=[];}
    layer(key){if(!this.layers[key]){if(!root.Audio)return null;const el=new root.Audio();el.loop=true;el.preload='metadata';el.volume=0;this.layers[key]={el,name:null,requested:false};}return this.layers[key];}
    nextTrack(){if(this.playlist?.length)this.trackIndex=(this.trackIndex+1)%this.playlist.length;}
    sync(game,paused,now=0,context={}){
      const sideBattle=['abyss','rogue','bounty'].includes(context.mode);
      const cueId=sideBattle?context.cue:game?Score.select(game,context):context.allowMusic||context.mode==='settings'?'mountain-home':null;
      const backgroundActive=(!!game&&!paused||context.allowMusic===true)&&this.unlocked&&this.settings.enabled&&this.settings.master>0;
      const active=(!!game&&!paused||sideBattle&&context.allowMusic===true)&&backgroundActive;
      if(cueId!==this.cueId){
        this.cueId=cueId;this.trackIndex=0;
        this.playlist=cueId?Score.playlistFor(cueId,root.XiuxianExtraTracks||[]):[];
      }
      const current=this.layers.music?.el;
      if(backgroundActive&&this.settings.rotation&&current&&!current.loop&&this.playlist.length&&
        this.layers.music.name===this.playlist[this.trackIndex].id&&(current.ended||Number.isFinite(current.duration)&&current.currentTime>0&&current.duration-current.currentTime<=1.6))this.nextTrack();
      const track=this.playlist?.[this.trackIndex]||null;this.nowPlaying=track;
      const target={music:track?.id||null,ambience:sideBattle?null:sceneFor(game,context).ambience};
      if(active!==this.active){this.active=active;if(!active){this.stopVoices();this.ctx?.suspend().catch(()=>{});}else this.ctx?.resume().catch(()=>{});}
      const dt=Math.min(.1,Math.max(0,(now-this.lastTick)/1000)||.016);this.lastTick=now;
      for(const key of ['music','ambience']){
        if(!this.unlocked&&!this.layers[key])continue;let layer=this.layer(key);if(!layer)continue;
        if(layer.name!==target[key]){
          if(key==='music'&&layer.name&&!layer.el.paused&&layer.el.volume>0){
            this.fading.push({el:layer.el,initial:layer.el.volume,left:1.6});
            while(this.fading.length>2){const stale=this.fading.shift();stale.el.pause();stale.el.removeAttribute('src');stale.el.load();}
            delete this.layers.music;layer=this.layer('music');
          }else layer.el.pause();
          layer.name=target[key];layer.requested=false;layer.el.volume=0;
          if(layer.name)layer.el.src='assets/audio/'+(key==='music'?track.file:layer.name+'.wav');else{layer.el.removeAttribute('src');layer.el.load();}
        }
        if(key==='music')layer.el.loop=!this.settings.rotation;
        const want=(key==='music'?backgroundActive&&!this.settings.musicMuted:active)&&!!layer.name&&this.settings[key]>0;
        if(!want){layer.el.pause();layer.requested=false;continue;}
        const volume=this.settings.master*this.settings[key]*(key==='ambience'&&layer.name==='wind'?.55:1);
        layer.el.volume=Math.max(0,Math.min(volume,layer.el.volume+(volume-layer.el.volume)*Math.min(1,dt*3)));
        if(!layer.requested){layer.requested=true;const p=layer.el.play();p?.catch(()=>{this.mediaBlocked=true;});}
      }
      const fading=[];
      for(const previous of this.fading){
        previous.left-=dt;
        if(!backgroundActive||this.settings.musicMuted||this.settings.music<=0||previous.left<=0){previous.el.pause();previous.el.removeAttribute('src');previous.el.load();}
        else{previous.el.volume=Math.max(0,Math.min(1,this.settings.master*this.settings.music,previous.initial*previous.left/1.6));fading.push(previous);}
      }
      this.fading=fading;
      if(this.ctx){const alive=[];for(const v of this.voices){if(v.end>this.ctx.currentTime)alive.push(v);else v.stop();}this.voices=alive;}
    }
    play(name,volume=1,preview=false){
      if(!this.unlocked||!this.settings.enabled||this.settings.master<=0||this.settings.effects<=0||!this.ctx||!this.active&&!preview)return false;
      const now=this.ctx.currentTime;if(now-(this.lastCue[name]??-100)<(name.startsWith('step')?.14:.045))return false;const gap=now-(this.lastCue[name]??-100);this.lastCue[name]=now;
      let pitch=1;if(name==='xpPickup'){this.scaleStep=gap<.9?((this.scaleStep??-1)+1)%15:0;pitch=2**(([0,2,4,7,9][this.scaleStep%5]+12*Math.floor(this.scaleStep/5))/12);}
      if(this.voices.length>=20)this.voices.shift().stop();const voice=cue(this.ctx,this.bus,name,volume,this.noise,pitch);if(!voice)return false;this.voices.push(voice);this.played++;return true;
    }
    async preview(name='block',volume=1){this.unlock();if(!this.ctx)return false;await this.ctx.resume();const ok=this.play(name,volume,true);root.clearTimeout?.(this.previewTimer);this.previewTimer=root.setTimeout(()=>{if(!this.active)this.quiet();},1100);return ok;}
    dispose(){this.stopVoices();for(const l of this.fading){l.el.pause();l.el.removeAttribute('src');l.el.load();}this.fading=[];for(const l of Object.values(this.layers)){l.el.pause();l.el.removeAttribute('src');l.el.load();}this.ctx?.close().catch(()=>{});}
  }
  const api={defaults,normalize,sceneFor,cue,Manager};if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianAudio=api;
})(globalThis);
