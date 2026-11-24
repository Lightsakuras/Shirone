(function(root){
  'use strict';
  const Base=root.XiuxianView,A=root.XiuxianArt,people={axing:0,lingyun:1,xuandu:2,'old-fox':3,'tower-bear':4,traveler:5};
  // Fixed label positions preserve object feet and interaction distances.
  const labelOffsets={
    summitArchive:[-105,25],northQingweiLetter:[-110,25],northMineLock:[110,25],
    charityNing:[-110,25],charityMemoryReturn:[60,25],charityZhousan:[0,85],
    charityBorderGate:[0,10],charitySampleEast:[60,25],admissionWarning:[0,65],
    riverWestBank:[-110,25],riverRoad:[-130,25],homesteadWork:[0,-5],
    memoryHealerVillage:[0,85],palaceThrone:[0,85],memoryRulerTrade:[0,-5],
    tribesSmith:[30,25],tribesSchool:[0,-5],iceTablet:[0,-20],
    iceMemoryRecord:[45,25],iceFire:[0,-20],borderCaptain:[0,-20],
    borderIceGate:[0,-5],vaultMandate:[0,-5],
    memoryGeneralOrders:[0,70],memoryGeneralCamp:[0,-20]
  };
  class CampaignView extends Base{
    person(c,g,time){
      const body=g.bodyProfile?.();
      if(body?.mode!=='mortal'||body.appearance!=='mortal-aged'||!A.mortalAged){this.campaignPlayerAppearance=null;return super.person(c,g,time);}
      const s=g.state,moving=g.moving&&s.hp>0,face=moving?(g.moveFacing||g.face):g.face,base=s.gender==='male'?4:0;
      const cell=base+(face.y<-.4?3:moving?1+Math.floor(time*8)%2:0),feetY=s.y+3;
      this.shadow(c,s.x,s.y,31,.3);c.save();
      this.motion.pose(c,s.x,s.y+3,moving,true);
      if(!this.motion.reduced&&g.hurtCd>0)c.globalAlpha=.55+Math.abs(Math.sin(time*22))*.4;
      if(!this.motion.reduced&&g.dash>0)for(let i=3;i>0;i--)this.sprite(c,'mortalAged',cell,s.x-g.dashVector.x*i*15,s.y-g.dashVector.y*i*15,94,face.x<0,.14);
      this.sprite(c,'mortalAged',cell,s.x,feetY,94,face.x<0);c.restore();
      if(!g.inCampaign?.()&&!g.activeEnemies().some(e=>e.hp>0))this.text(c,'林墨',s.x,s.y-102,'#fff2c8',13);
      this.campaignPlayerAppearance={mode:body.mode,appearance:body.appearance,atlas:'mortalAged',cell,x:s.x,feetY,height:94,moving:!!moving,flip:face.x<0};
    }

    object(c,o,g,time,near){
      if(o.kind!=='campaignObject'&&!o.campaignPresentation)return super.object(c,o,g,time,near);
      if(o.role==='npc'&&g.state.campaign?.battle?.enemies.some(e=>e.id===o.personId))return;
      const fighting=!!g.state.campaign?.battle,chosen=!fighting&&near?.id===o.id;
      const resting=o.personId==='linqingfeng'&&g.state.campaign?.tasks['wanyao-trace']?.done.includes('lin-heard');
      if(o.role==='npc'){
        const atlas=o.atlas||'campaignPeople',cell=o.cell??people[o.personId];
        if(cell!=null){
          this.shadow(c,o.x,o.y,resting?43:24,.19);
          if(resting){this.sprite(c,'linQingfengRest',0,o.x,o.y+4,44);this.recordCampaignNPC?.(o,'linQingfengRest',0,o.x,o.y+4,44);}
          else{this.livingSprite(c,atlas,cell,o.x,o.y+1,o.height);this.recordCampaignNPC?.(o,atlas,cell,o.x,o.y+1,o.height);}
        }
      }else if(o.role==='portal')this.text(c,/Return|Down|Exit/.test(o.id)?'‹':'›',o.x,o.y-12,'#e5dfc5',32);
      else if(o.role==='echo'){
        c.save();const mist=c.createRadialGradient(o.x,o.y-30,2,o.x,o.y-30,35);mist.addColorStop(0,'#d1e0e54a');mist.addColorStop(1,'#a8bfca00');this.circle(c,o.x,o.y-30,35,mist);c.restore();
      }else if(o.cell!=null){this.shadow(c,o.x,o.y,Math.min(28,o.height*.32),.17);this.sprite(c,o.atlas,o.cell,o.x,o.y+2,o.height);}
      if(chosen){c.save();c.translate(o.x,o.y+4);c.scale(1,.4);this.circle(c,0,0,28,null,'#d6d3b6');c.restore();}
    }
    foreground(c,g,time){
      super.foreground?.(c,g,time);
      if(g.state.campaign?.battle)return;
      const near=g.nearest();
      for(const o of g.objects()){
        if(o.kind!=='campaignObject'&&!o.campaignPresentation)continue;
        const resting=o.personId==='linqingfeng'&&g.state.campaign?.tasks['wanyao-trace']?.done.includes('lin-heard');
        const [x,y]=labelOffsets[o.id]||[0,25];
        this.label(c,resting?'林清风 · 已安息':o.name,o.x+x,o.y+y,near?.id===o.id,o.id);
      }
    }
  }
  root.XiuxianView=CampaignView;
})(globalThis);
