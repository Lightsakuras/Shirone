(function(root){
  'use strict';
  const data=typeof module==='object'&&module.exports?require('./achievements-data'):root.XiuxianAchievementData;
  function award(s,id){
    const {title}=data[id];if(s.achievements.includes(title))return false;
    s.achievements.push(title);return true;
  }
  function transitions(old,s){
    for(const [id,condition] of [
      ['mist',!old.bounty.wins.mist&&s.bounty.wins.mist],['bamboo',!old.bounty.wins.bamboo&&s.bounty.wins.bamboo],
      ['soul',old.soul.stage<2&&s.soul.stage>=2],['archive',old.archive.length<3&&s.archive.length>=3],
      ['five',old.abyss.highestFloor<5&&s.abyss.highestFloor>=5],['heat',old.abyss.heatBoss<5&&s.abyss.heatBoss>=5],
      ['wave15',old.rogue.bestWave<15&&s.rogue.bestWave>=15]
    ])if(condition)award(s,id);
  }
  const api={data,award,transitions};
  if(typeof module==='object'&&module.exports)module.exports=api;else root.XiuxianAchievements=api;
})(globalThis);
