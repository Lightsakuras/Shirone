(function (root) {
  'use strict';
  // These rectangles index the original generated PNGs; no images are fetched remotely.
  const art = {
    status: 'loading', failed: [], images: {},
    sources: { garden: 'assets/art-v2/garden.webp', ruins: 'assets/art-v2/ruins.webp', characters: 'assets/art-v2/characters.webp', props: 'assets/art-v2/props.webp' },
    dimensions: { characters: [1448, 1086], props: [1261, 1247] },
    characters: [[78,12,167,331],[437,12,182,336],[799,12,175,337],[1181,16,202,332],[76,366,177,346],[427,366,212,349],[807,367,177,350],[1177,372,215,342],[91,732,174,341],[400,730,284,349],[792,766,216,259],[1134,776,286,272]],
    props: [[66,27,240,271],[352,44,260,255],[702,23,176,287],[983,10,204,302],[41,320,263,287],[347,369,253,218],[689,320,206,287],[946,376,290,183],[34,632,256,295],[344,662,245,240],[670,624,188,290],[982,639,245,278],[54,949,236,283],[368,939,182,278],[630,964,268,250],[946,957,274,262]],
    itemCells: { fire: 8, needle: 9, incense: 10, potion: 11, ward: 12, herb: 4, water: 13, paper: 14, dust: 15, box: 5, cake: 7 },
    icon(id, extraClass = '') {
      if(root.XiuxianItemIcons)return root.XiuxianItemIcons.supply(this,id,extraClass);
      if(id==='qingxin')return this.atlasIcon('chapterPeople',15,extraClass);
      if(id==='tea')return this.caseIcon(16,extraClass);
      const atlas=id==='sword'?'characters':'props',cell=id==='sword'?11:this.itemCells[id];
      return this[atlas][cell]?this.atlasIcon(atlas,cell,extraClass):'';
    }
  };

  Object.assign(art.sources, {
    bamboo: 'assets/art-v3/bamboo.webp', valley: 'assets/art-v3/valley.webp', sanctum: 'assets/art-v3/sanctum.webp',
    relicsBase: 'assets/art-v3/relics-base.webp', relics: 'assets/art-v3/relics.webp', foes: 'assets/art-v3/foes.webp', echoes: 'assets/art-v3/echoes.webp'
  });
  Object.assign(art.dimensions, { relicsBase: [1448,1086], relics: [1448,1086], foes: [1536,1024], echoes: [1448,1086] });
  art.sources.trialAtlas='assets/art/trial-atlas.webp';art.dimensions.trialAtlas=[1254,1254];
  art.trialAtlas=Array.from({length:16},(_,i)=>{const x=i%4,y=Math.floor(i/4),edge=n=>Math.round(n*313.5);return [edge(x),edge(y),edge(x+1)-edge(x),edge(y+1)-edge(y)];});
  art.relicsBase = [[84,44,221,292],[416,44,269,303],[767,43,260,307],[1115,49,287,285],[69,383,254,315],[399,430,286,235],[790,375,226,317],[1114,407,295,286],[38,747,322,298],[431,726,235,310],[732,749,323,296],[1095,766,316,241]];
  art.relics = [[64,50,275,294],[390,55,271,294],[742,51,295,303],[1090,56,315,280],[55,375,277,320],[378,398,307,280],[749,365,287,327],[1092,377,310,315],[35,715,320,325],[395,710,282,330],[724,715,326,330],[1088,727,325,300]];
  art.foes = [[82,12,332,472],[520,16,482,454],[1086,0,374,478],[30,494,454,506],[529,486,430,516],[1012,481,492,523]];
  art.echoes = [[25,30,328,309],[390,8,308,328],[755,5,302,341],[1090,12,335,327],[28,345,301,353],[377,364,331,328],[714,348,365,350],[1089,347,352,345],[15,743,334,310],[367,735,350,298],[752,708,310,365],[1120,703,305,366]];
  art.atlasIcon = function (atlas, cell, extraClass = '') {
    const rect = this[atlas][cell], [w,h] = this.dimensions[atlas];
    // A square viewport adds letterboxing around a non-square viewBox. Clip the
    // atlas rectangle itself so adjacent sprites cannot leak into that space.
    const crop = 'art-crop-' + (this.cropId = (this.cropId || 0) + 1);
    return '<span class="art-icon ' + extraClass + '" aria-hidden="true"><svg viewBox="' + rect.join(' ') + '" focusable="false" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="' + crop + '"><rect x="' + rect[0] + '" y="' + rect[1] + '" width="' + rect[2] + '" height="' + rect[3] + '"/></clipPath></defs><image clip-path="url(#' + crop + ')" href="' + this.sources[atlas] + '" width="' + w + '" height="' + h + '"/></svg></span>';
  };
  art.relic = function (id, level = 1) { return this.atlasIcon(root.XiuxianExpeditionData.visualFor(id, level).awakened ? 'relics' : 'relicsBase', root.XiuxianExpeditionData.relics[id].cell); };
  art.boon = function (id) { return this.atlasIcon('echoes', root.XiuxianExpeditionData.paths[id].cell); };
  art.recipe = function (id) { return this.caseIcon({ needle: 17, incense: 18, tea: 16 }[id]); };
  Object.assign(art.sources, { qingyang: 'assets/art-v4/qingyang.webp', wangyard: 'assets/art-v4/wangyard.webp', caseObjects: 'assets/art-v4/objects.webp' });
  art.dimensions.caseObjects = [1261,1247];
  art.caseObjects = [[98,5,170,309],[383,5,201,310],[683,8,192,306],[941,24,303,286],[31,320,277,248],[353,361,249,169],[691,363,204,159],[977,322,253,246],[53,579,219,202],[351,576,251,199],[684,566,209,218],[952,571,285,207],[27,790,279,214],[345,808,267,194],[646,819,277,168],[956,785,284,214],[69,1039,186,180],[345,1030,257,196],[643,1019,266,219],[946,1014,294,227]];
  art.caseIcon = function(cell, extraClass = '') { return this.atlasIcon('caseObjects', cell, extraClass); };
  Object.assign(art.sources, { temple:'assets/art-v5/temple.webp', forest:'assets/art-v5/forest.webp', crypt:'assets/art-v5/crypt.webp', tomb:'assets/art-v5/tomb.webp', chapterPeople:'assets/art-v5/people.webp', chapterProps:'assets/art-v5/props.webp' });
  Object.assign(art.dimensions,{chapterPeople:[1263,1246],chapterProps:[1261,1247]});
  art.chapterPeople=[[110,29,135,315],[412,22,130,323],[658,14,252,333],[952,3,282,360],[32,361,266,380],[380,368,194,355],[670,347,231,392],[970,410,262,325],[25,760,300,200],[350,757,267,198],[658,786,260,155],[984,747,251,209],[54,977,251,252],[363,980,225,250],[665,978,236,252],[968,1005,248,209]];
  art.chapterProps=[[27,7,267,252],[326,19,285,233],[630,12,297,239],[954,27,291,228],[22,277,264,218],[339,256,263,245],[630,265,308,222],[982,258,241,247],[74,499,197,249],[343,502,257,241],[631,500,309,242],[978,502,248,239],[16,750,283,225],[358,745,237,232],[653,755,269,218],[1025,740,156,237],[32,981,256,259],[328,1021,280,182],[632,996,287,236],[976,978,252,264]];
  Object.assign(art.sources,{femaleActions:'assets/art-v6/female-actions.webp',maleActions:'assets/art-v6/male-actions.webp',backActions:'assets/art-v6/back-actions.webp'});
  Object.assign(art.dimensions,{femaleActions:[1536,1024],maleActions:[1774,887],backActions:[1774,887]});
  art.femaleActions=[[38,26,318,462],[402,28,364,462],[781,25,365,469],[1173,23,358,467],[4,520,363,484],[420,531,282,475],[756,522,367,483],[1142,570,380,437]];
  art.maleActions=[[3,9,395,415],[486,10,400,411],[940,23,385,396],[1407,9,286,423],[53,444,355,437],[497,481,321,392],[941,444,267,437],[1356,496,359,382]];
  art.backActions=[[98,9,303,432],[475,15,430,425],[910,19,425,422],[1370,5,338,438],[92,451,324,432],[461,450,462,433],[910,451,440,432],[1369,433,361,450]];
  art.actionAnchors={
    femaleActions:[[190,482,455],[570,482,455],[960,487,455],[1328,482,455],[190,997,466],[572,997,466],[960,997,466],[1350,997,466]],
    maleActions:[[250,415,405],[650,411,405],[1085,410,405],[1535,424,405],[230,873,418],[650,863,418],[1090,873,418],[1540,872,418]],
    backActions:[[245,432,416],[650,432,416],[1080,432,416],[1520,432,416],[245,877,416],[650,877,416],[1080,877,416],[1520,877,416]]
  };
  Object.assign(art.sources,{wangActions:'assets/art-v7/wang-actions.webp',constructActions:'assets/art-v7/construct-actions.webp',spiritActions:'assets/art-v7/spirit-actions.webp',canopies:'assets/art-v7/canopies.webp'});
  Object.assign(art.dimensions,{wangActions:[1536,1024],constructActions:[1254,1254],spiritActions:[1254,1254],canopies:[1536,1024]});
  art.wangActions=[[38,48,279,476],[412,1,323,524],[762,96,348,429],[1138,57,387,468],[1,543,438,470],[447,537,270,476],[772,572,324,445],[1120,717,409,257]];
  art.constructActions=[[55,7,246,294],[335,22,280,282],[645,7,275,294],[950,122,293,181],[15,311,292,310],[349,325,274,293],[684,353,221,274],[974,396,223,231],[26,628,284,300],[330,651,282,279],[636,630,296,302],[945,709,297,220],[33,936,256,312],[341,939,253,310],[645,940,249,305],[943,1008,301,226]];
  art.spiritActions=[[50,4,211,264],[335,18,278,259],[650,3,239,272],[969,36,251,228],[27,283,244,323],[308,310,319,282],[668,302,237,314],[974,362,241,245],[14,625,291,275],[311,598,315,294],[632,594,292,312],[945,680,303,208],[4,897,280,350],[311,906,309,329],[629,900,292,343],[950,945,294,293]];
  art.canopies=[[10,65,710,420],[782,94,744,389],[17,581,724,341],[783,594,742,291]];
  art.enemyActions={
    wang:{atlas:'wangActions',height:128,body:460,feet:[[178,509],[570,510],[924,510],[1310,510],[180,999],[568,999],[941,1003],[1324,955]]},
    stone:{atlas:'constructActions',row:0,height:122,body:275,feet:[[169,287],[461,287],[795,287],[1098,287]]},
    reed:{atlas:'constructActions',row:1,height:105,body:290,feet:[[174,606],[463,599],[794,605],[1097,610]]},
    sentinel:{atlas:'constructActions',row:2,height:126,body:280,feet:[[166,914],[462,913],[794,914],[1097,914]]},
    keeper:{atlas:'constructActions',row:3,height:155,body:294,feet:[[162,1235],[469,1235],[784,1230],[1097,1215]]},
    sprite:{atlas:'spiritActions',row:0,height:72,body:240,feet:[[156,253],[474,258],[782,253],[1097,253]]},
    moth:{atlas:'spiritActions',row:1,height:70,body:295,feet:[[155,590],[474,590],[784,602],[1097,590]]},
    deer:{atlas:'spiritActions',row:2,height:106,body:285,feet:[[180,884],[488,878],[813,887],[1097,875]]},
    wisp:{atlas:'spiritActions',row:3,height:92,body:318,feet:[[150,1229],[470,1225],[785,1229],[1097,1224]]}
  };
  // v0.10: painted material upgrades and action-bound VFX; old atlases remain local for rollback.
  art.sources.relics='assets/art-v10/relics-awakened.webp';art.sources.bamboo='assets/art-v10/bamboo-court.webp';
  art.relics=[[81,40,229,301],[399,41,286,304],[765,45,264,303],[1098,48,306,286],[66,383,250,314],[401,428,282,239],[786,373,230,315],[1114,403,291,286],[36,747,322,299],[428,726,238,309],[724,737,337,314],[1096,763,315,274]];
  art.sources.combatFx='assets/art-v10/combat-fx.webp';art.dimensions.combatFx=[1774,887];
  art.combatFx=[[102,161,234,157],[547,88,250,290],[970,121,244,239],[1453,118,226,235],[109,562,250,224],[540,538,265,252],[963,541,274,256],[1407,607,293,164]];
  art.resonance=function(id){return this.atlasIcon('combatFx',{frostblade:4,emberherb:5,scentward:6}[id]);};
  Object.assign(art.sources,{campScenes:'assets/art-v13/camp-scenes.webp',sanctum:'assets/art-v13/sanctum-moon.webp'});
  Object.assign(art.dimensions,{campScenes:[2172,724],sanctum:[1628,966]});
  art.campScenes=[[0,110,724,610],[724,110,724,610],[1448,110,724,610]];
  art.camp=function(id){return this.atlasIcon('campScenes',{rest:0,supply:1,insight:2}[id]);};
  Object.assign(art.sources,{hehuan:'assets/art-v130/hehuan-court.webp',sectPeople:'assets/art-v130/sect-people.webp',sectProps:'assets/art-v130/sect-props.webp'});
  Object.assign(art.dimensions,{hehuan:[1627,967],sectPeople:[1536,1024],sectProps:[1774,887]});
  art.sectPeople=[[96,20,322,990],[590,14,330,996],[1080,37,404,976]];
  art.sectProps=[[197,226,468,510],[930,169,770,600]];
  Object.assign(art.sources,{'tower-duty':'assets/art-v140/tower-duty.webp','tower-seal':'assets/art-v140/tower-seal.webp','tower-upper':'assets/art-v140/tower-upper.webp','apricot-village':'assets/art-v140/apricot-village.webp',campaignPeople:'assets/art-v140/campaign-people.webp',campaignProps:'assets/art-v140/campaign-props.webp'});
  Object.assign(art.dimensions,{'tower-duty':[1628,966],'tower-seal':[1628,966],'tower-upper':[1627,967],'apricot-village':[1626,967],campaignPeople:[1536,1024],campaignProps:[1774,887]});
  art.campaignPeople=[[162,4,214,506],[636,0,240,512],[1173,0,212,512],[106,512,267,512],[600,512,290,512],[1140,530,265,492]];
  art.campaignProps=[[72,58,303,368],[461,98,407,328],[929,49,363,379],[1417,76,270,349],[5,522,436,321],[452,565,430,249],[917,512,373,326],[1367,552,370,272]];
  // v1.5 local four-map, people, props and distinct enemy art.
  Object.assign(art.sources,{"jindan-retreat":"assets/art-v150/jindan-retreat.webp","jindanEnemies":"assets/art-v150/campaign-enemies.webp","wanyao-inner":"assets/art-v150/wanyao-inner.webp","wanyao-outer":"assets/art-v150/wanyao-outer.webp","tianji-pavilion":"assets/art-v150/tianji-pavilion.webp","jindanPeopleA":"assets/art-v150/campaign-people-a.webp","jindanPeopleB":"assets/art-v150/campaign-people-b.webp","jindanPropsA":"assets/art-v150/campaign-props-a.webp","jindanPropsB":"assets/art-v150/campaign-props-b.webp"});
  Object.assign(art.dimensions,{"jindan-retreat":[1625,968],"jindanEnemies":[1536,1024],"wanyao-inner":[1628,966],"wanyao-outer":[1626,967],"tianji-pavilion":[1628,966],"jindanPeopleA":[1024,1536],"jindanPeopleB":[1024,1536],"jindanPropsA":[1536,1024],"jindanPropsB":[1536,1024]});
  art.jindanEnemies=[[51,21,442,425],[576,19,377,445],[1036,21,449,455],[59,447,365,558],[600,484,339,528],[1117,504,324,508]];
  art.jindanPeopleA=[[100,6,322,762],[630,16,248,752],[67,770,347,765],[571,825,383,698]];
  art.jindanPeopleB=[[110,7,319,759],[568,4,323,760],[126,768,314,768],[539,874,432,656]];
  art.jindanPropsA=[[50,67,277,401],[391,134,368,294],[789,87,343,365],[1169,137,353,256],[15,560,369,420],[384,562,380,423],[822,589,264,372],[1163,600,353,324]];
  art.jindanPropsB=[[10,79,530,364],[579,14,367,430],[1002,106,524,336],[16,525,521,432],[665,454,237,552],[1053,529,448,416]];
  art.sources.campaignQingxia=art.sources.jindanPeopleA;art.dimensions.campaignQingxia=art.dimensions.jindanPeopleA;art.campaignQingxia=[art.jindanPeopleA[1]];
  art.sources.m4XuanjiPlain=art.sources.jindanPeopleA;art.dimensions.m4XuanjiPlain=art.dimensions.jindanPeopleA;art.m4XuanjiPlain=[art.jindanPeopleA[0]];

  art.sources.campaignThunder=art.sources.jindanEnemies;art.dimensions.campaignThunder=art.dimensions.jindanEnemies;art.campaignThunder=[art.jindanEnemies[0]];
  art.sources.campaignSpark=art.sources.jindanEnemies;art.dimensions.campaignSpark=art.dimensions.jindanEnemies;art.campaignSpark=[art.jindanEnemies[1]];
  art.sources.campaignNightmare=art.sources.jindanEnemies;art.dimensions.campaignNightmare=art.dimensions.jindanEnemies;art.campaignNightmare=[art.jindanEnemies[2]];
  art.sources.campaignCaptain=art.sources.jindanEnemies;art.dimensions.campaignCaptain=art.dimensions.jindanEnemies;art.campaignCaptain=[art.jindanEnemies[3]];
  art.sources.campaignRiftSpirit=art.sources.jindanEnemies;art.dimensions.campaignRiftSpirit=art.dimensions.jindanEnemies;art.campaignRiftSpirit=[art.jindanEnemies[4]];
  art.sources.campaignBannerShade=art.sources.jindanEnemies;art.dimensions.campaignBannerShade=art.dimensions.jindanEnemies;art.campaignBannerShade=[art.jindanEnemies[5]];
  art.sources.linQingfengRest='assets/art-v150/lin-qingfeng-rest.webp';art.dimensions.linQingfengRest=[1774,887];art.linQingfengRest=[[70,145,1660,665]];
  // M4 local scenes
  Object.assign(art.sources,{"beihuang-retreat":"assets/art-v160/beihuang-retreat.webp","golden-summit":"assets/art-v160/golden-summit.webp","heart-cliff":"assets/art-v160/heart-cliff.webp","shushan-commons":"assets/art-v160/shushan-commons.webp","alliance-camp":"assets/art-v160/alliance-camp.webp","guixu-west":"assets/art-v160/guixu-west.webp","guixu-east":"assets/art-v160/guixu-east.webp","guixu-core":"assets/art-v160/guixu-core.webp","heaven-threshold":"assets/art-v160/heaven-threshold.webp"});
  Object.assign(art.dimensions,{"beihuang-retreat":[1628,966],"golden-summit":[1627,967],"heart-cliff":[1628,966],"shushan-commons":[1627,967],"alliance-camp":[1628,966],"guixu-west":[1627,967],"guixu-east":[1628,966],"guixu-core":[1627,967],"heaven-threshold":[1628,966]});
  // M4 local people
  art.sources.m4PeopleA="assets/art-v160/people-a.webp";art.dimensions.m4PeopleA=[1024,1536];art.m4PeopleA=[[40,50,465,710],[640,22,250,745],[140,875,240,630],[640,790,250,735]];
  art.sources.m4PeopleB="assets/art-v160/people-b.webp";art.dimensions.m4PeopleB=[1024,1536];art.m4PeopleB=[[105,5,305,758],[612,35,288,730],[125,770,305,760],[628,780,264,747]];
  art.sources.m4PeopleC="assets/art-v160/people-c.webp";art.dimensions.m4PeopleC=[1774,887];art.m4PeopleC=[[270,6,440,880],[1135,6,370,880]];
  // M4 local enemies
  art.sources.m4EnemiesA="assets/art-v160/enemies-a.webp";art.dimensions.m4EnemiesA=[1536,1024];art.m4EnemiesA=[[115,2,550,490],[890,4,455,501],[165,515,350,509],[944,510,332,514]];
  art.sources.m4Thunder=art.sources.m4EnemiesA;art.dimensions.m4Thunder=art.dimensions.m4EnemiesA;art.m4Thunder=[art.m4EnemiesA[0]];
  art.sources.m4Mind=art.sources.m4EnemiesA;art.dimensions.m4Mind=art.dimensions.m4EnemiesA;art.m4Mind=[art.m4EnemiesA[1]];
  art.sources.m4SwordDisciple=art.sources.m4EnemiesA;art.dimensions.m4SwordDisciple=art.dimensions.m4EnemiesA;art.m4SwordDisciple=[art.m4EnemiesA[2]];
  art.sources.m4Rebel=art.sources.m4EnemiesA;art.dimensions.m4Rebel=art.dimensions.m4EnemiesA;art.m4Rebel=[art.m4EnemiesA[3]];
  art.sources.m4EnemiesB="assets/art-v160/enemies-b.webp";art.dimensions.m4EnemiesB=[1536,1024];art.m4EnemiesB=[[55,0,720,494],[925,0,410,502],[100,492,520,532],[820,502,580,522]];
  art.sources.m4WarGolem=art.sources.m4EnemiesB;art.dimensions.m4WarGolem=art.dimensions.m4EnemiesB;art.m4WarGolem=[art.m4EnemiesB[0]];
  art.sources.m4Grandmother=art.sources.m4EnemiesB;art.dimensions.m4Grandmother=art.dimensions.m4EnemiesB;art.m4Grandmother=[art.m4EnemiesB[1]];
  art.sources.m4Xuanji=art.sources.m4EnemiesB;art.dimensions.m4Xuanji=art.dimensions.m4EnemiesB;art.m4Xuanji=[art.m4EnemiesB[2]];
  art.sources.m4LivingTrial=art.sources.m4EnemiesB;art.dimensions.m4LivingTrial=art.dimensions.m4EnemiesB;art.m4LivingTrial=[art.m4EnemiesB[3]];
  // M4 local props
  art.sources.m4PropsA="assets/art-v160/props-a.webp";art.dimensions.m4PropsA=[1774,887];art.m4PropsA=[[16,63,405,342],[448,28,414,390],[900,38,430,350],[1350,35,410,390],[8,446,434,414],[450,445,410,414],[880,508,432,313],[1330,504,440,320]];
  art.sources.m4PropsB="assets/art-v160/props-b.webp";art.dimensions.m4PropsB=[1774,887];art.m4PropsB=[[8,62,435,350],[494,4,328,440],[872,42,440,397],[1348,4,426,432],[52,444,388,438],[447,477,393,385],[866,479,460,375],[1330,444,444,443]];
  art.sources.m4PropsC="assets/art-v160/props-c.webp";art.dimensions.m4PropsC=[1774,887];art.m4PropsC=[[82,79,290,309],[513,82,292,314],[940,69,323,339],[1406,99,294,281],[97,508,252,306],[560,511,221,294],[979,512,289,280],[1419,546,267,228]];
  art.sources.m4PropsD="assets/art-v160/props-d.webp";art.dimensions.m4PropsD=[1774,887];art.m4PropsD=[[10,39,419,386],[473,59,375,339],[910,0,389,440],[1348,40,425,395],[59,446,312,427],[467,472,386,381],[881,484,449,391],[1348,482,426,361]];
  // M5 local scenes
  Object.assign(art.sources,{"qingyang-charity":"assets/art-v170/qingyang-charity.webp","blackwind-stockade":"assets/art-v170/blackwind-stockade.webp","northern-border":"assets/art-v170/northern-border.webp","icefield-cavern":"assets/art-v170/icefield-cavern.webp","demon-blood-cavern":"assets/art-v170/demon-blood-cavern.webp","demon-tribes":"assets/art-v170/demon-tribes.webp","demon-palace":"assets/art-v170/demon-palace.webp","two-realms-crossing":"assets/art-v170/two-realms-crossing.webp","archive-hearing":"assets/art-v170/archive-hearing.webp","sword-vault":"assets/art-v170/sword-vault.webp","apricot-homestead":"assets/art-v170/apricot-homestead.webp","floodplain":"assets/art-v170/floodplain.webp","reincarnation-hall":"assets/art-v170/reincarnation-hall.webp","world-mill":"assets/art-v170/world-mill.webp"});
  Object.assign(art.dimensions,{"qingyang-charity":[1626,967],"blackwind-stockade":[1606,979],"northern-border":[1627,967],"icefield-cavern":[1627,967],"demon-blood-cavern":[1627,967],"demon-tribes":[1627,967],"demon-palace":[1627,967],"two-realms-crossing":[1627,967],"archive-hearing":[1627,967],"sword-vault":[1627,967],"apricot-homestead":[1627,967],"floodplain":[1627,967],"reincarnation-hall":[1627,967],"world-mill":[1627,967]});
  art.sources.m5PeopleA="assets/art-v170/people-a.webp";art.dimensions.m5PeopleA=[1024,1536];art.m5PeopleA=[[142,28,278,727],[628,23,253,731],[50,791,400,723],[547,787,410,730]];
  art.sources.m5PeopleB="assets/art-v170/people-b.webp";art.dimensions.m5PeopleB=[1024,1536];art.m5PeopleB=[[111,22,286,731],[625,30,267,722],[133,794,245,732],[613,785,285,741]];
  art.sources.m5PeopleC="assets/art-v170/people-c.webp";art.dimensions.m5PeopleC=[1024,1536];art.m5PeopleC=[[121,21,287,729],[617,38,284,710],[138,792,276,732],[603,779,295,745]];
  art.sources.m5PeopleD="assets/art-v170/people-d.webp";art.dimensions.m5PeopleD=[1024,1536];art.m5PeopleD=[[157,23,226,725],[686,140,155,570],[78,781,357,738],[621,845,285,634]];
  art.sources.m5PeopleE="assets/art-v170/people-e.webp";art.dimensions.m5PeopleE=[1024,1536];art.m5PeopleE=[[126,24,264,714],[636,24,250,715],[33,784,470,731],[611,775,305,748]];
  art.sources.m5PeopleF="assets/art-v170/people-f.webp";art.dimensions.m5PeopleF=[1536,1024];art.m5PeopleF=[[180,24,369,989],[790,177,703,759]];
  art.sources.m5PropsA="assets/art-v170/props-a.webp";art.dimensions.m5PropsA=[1774,887];art.m5PropsA=[[68,108,362,283],[511,70,309,337],[946,61,311,358],[1386,81,328,326],[107,484,274,343],[503,499,318,316],[939,519,361,286],[1378,494,333,336]];
  art.sources.m5PropsB="assets/art-v170/props-b.webp";art.dimensions.m5PropsB=[1774,887];art.m5PropsB=[[54,82,355,320],[507,103,317,278],[940,100,334,277],[1389,105,332,283],[79,516,312,294],[513,493,297,332],[921,489,350,339],[1401,481,301,350]];
  art.sources.m5PropsC="assets/art-v170/props-c.webp";art.dimensions.m5PropsC=[1774,887];art.m5PropsC=[[103,73,260,341],[504,84,309,317],[959,101,287,298],[1330,66,403,356],[75,499,337,341],[540,471,290,364],[901,518,390,308],[1371,495,333,324]];
  art.sources.m5PropsD="assets/art-v170/props-d.webp";art.dimensions.m5PropsD=[1774,887];art.m5PropsD=[[107,86,303,319],[551,61,257,348],[932,118,351,275],[1350,80,359,312],[77,497,356,331],[498,487,340,350],[975,518,252,304],[1391,488,291,341]];
  art.sources.m5PropsE="assets/art-v170/props-e.webp";art.dimensions.m5PropsE=[1774,887];art.m5PropsE=[[87,72,309,333],[480,59,368,345],[980,44,251,363],[1381,84,353,310],[56,488,334,356],[482,520,359,284],[934,501,343,327],[1370,506,347,311]];
  art.sources.m5EnemiesA="assets/art-v170/enemies-a.webp";art.dimensions.m5EnemiesA=[1536,1024];art.m5EnemiesA=[[161,5,399,506],[1035,3,306,506],[190,513,362,511],[911,512,428,506]];
  art.sources.m5Bandit=art.sources.m5EnemiesA;art.dimensions.m5Bandit=art.dimensions.m5EnemiesA;art.m5Bandit=[art.m5EnemiesA[0]];
  art.sources.m5Scout=art.sources.m5EnemiesA;art.dimensions.m5Scout=art.dimensions.m5EnemiesA;art.m5Scout=[art.m5EnemiesA[1]];
  art.sources.m5Captain=art.sources.m5EnemiesA;art.dimensions.m5Captain=art.dimensions.m5EnemiesA;art.m5Captain=[art.m5EnemiesA[2]];
  art.sources.m5ColdSpirit=art.sources.m5EnemiesA;art.dimensions.m5ColdSpirit=art.dimensions.m5EnemiesA;art.m5ColdSpirit=[art.m5EnemiesA[3]];
  art.sources.m5EnemiesB="assets/art-v170/enemies-b.webp";art.dimensions.m5EnemiesB=[1536,1024];art.m5EnemiesB=[[185,4,367,504],[947,4,500,508],[173,513,434,504],[918,524,426,493]];
  art.sources.m5TribalRebel=art.sources.m5EnemiesB;art.dimensions.m5TribalRebel=art.dimensions.m5EnemiesB;art.m5TribalRebel=[art.m5EnemiesB[0]];
  art.sources.m5DemonGuard=art.sources.m5EnemiesB;art.dimensions.m5DemonGuard=art.dimensions.m5EnemiesB;art.m5DemonGuard=[art.m5EnemiesB[1]];
  art.sources.m5MillGuard=art.sources.m5EnemiesB;art.dimensions.m5MillGuard=art.dimensions.m5EnemiesB;art.m5MillGuard=[art.m5EnemiesB[2]];
  art.sources.m5BloodShade=art.sources.m5EnemiesB;art.dimensions.m5BloodShade=art.dimensions.m5EnemiesB;art.m5BloodShade=[art.m5EnemiesB[3]];
  // M6 originals remain unchanged; portraits use separate head-and-shoulder windows.
  Object.assign(art.sources,{m6People:'assets/art-v180/people-six.webp',mortalAged:'assets/art-v180/mortal-aged.webp'});
  Object.assign(art.dimensions,{m6People:[1536,1024],mortalAged:[1536,1024]});
  art.m6People=[[176,3,187,505],[666,15,204,492],[1185,6,173,501],[173,515,201,506],[670,524,174,497],[1162,518,204,503]];
  art.sources.m6AshiAged='assets/art-v180/ashi-aged.webp';art.dimensions.m6AshiAged=[1024,1536];art.m6AshiAged=[[208,9,624,1518]];
  art.mortalAged=[[117,8,177,498],[476,10,201,496],[847,11,220,495],[1257,8,182,498],[111,513,193,509],[469,514,232,506],[845,513,233,507],[1252,512,201,508]];
  art.mortalPortraits={female:[142,8,144,180],male:[137,513,144,180]};
  art.playerPortrait=function(g){
    const gender=g.state.gender==='female'?'female':'male',body=g.bodyProfile?.();
    const aged=body?.mode==='mortal'&&body.appearance==='mortal-aged';
    return {key:gender+':'+(aged?'mortal-aged':'current'),src:aged?this.sources.mortalAged:'assets/portraits/'+(gender==='female'?'lin_mo_f':'lin_mo')+'.webp',rect:aged?this.mortalPortraits[gender]:null,alt:aged?'林墨 · 归凡晚年':'林墨'};
  };
  art.portraitHTML=function(p){
    if(!p.rect)return '<img src="'+p.src+'" alt="'+p.alt+'">';
    const crop='art-portrait-'+(this.cropId=(this.cropId||0)+1),[x,y,w,h]=p.rect;
    return '<svg viewBox="'+p.rect.join(' ')+'" role="img" aria-label="'+p.alt+'" focusable="false" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="'+crop+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/></clipPath></defs><image clip-path="url(#'+crop+')" href="'+p.src+'" width="1536" height="1024"/></svg>';
  };
  art.sources.summitGrounds = 'assets/sect-art/art-summit-grounds.webp';
  art.dimensions.summitGrounds = [1280,720];
  for (const id of ['pei-zhao','xie-guanlan','shi-wuxiang']) {
    const key = 'summit-' + id;
    art.sources[key] = 'assets/sect-art/art-' + key + '-figure.webp';
    art.dimensions[key] = [256,384];
    art[key] = [[0,0,256,384]];
  }
  const streamArt = root.document?.documentElement?.hasAttribute?.('data-stream-art');
  const openingArt = new Set(['garden', 'temple', 'characters', 'chapterPeople', 'props']);
  const initialLoads = [];
  function loadAtlas(name, url) {
    const image = new Image();
    Object.defineProperty(art.images, name, {value:image, enumerable:true, configurable:true, writable:true});
    return new Promise(resolve => {
      image.onload = () => {
        const expected = art.dimensions[name];
        const valid = !expected || (image.naturalWidth === expected[0] && image.naturalHeight === expected[1]);
        if (!valid) art.failed.push(name);
        resolve(valid);
      };
      image.onerror = () => {
        art.failed.push(name);
        if (streamArt && !openingArt.has(name)) {
          image.onload = image.onerror = null;
          image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }
        resolve(false);
      };
      image.src = url;
    });
  }
  for (const [name, url] of Object.entries(art.sources)) {
    if (!streamArt || openingArt.has(name)) {
      initialLoads.push(loadAtlas(name, url));
    } else {
      Object.defineProperty(art.images, name, {enumerable:true, configurable:true, get() {
        loadAtlas(name, url);
        return art.images[name];
      }});
    }
  }
  art.ready = Promise.all(initialLoads).then(results => {
    art.status = results.every(Boolean) ? 'ready' : 'error';
    return art.status;
  });
  // Each decoded painting becomes usable independently of the startup atlas promise.
  art.arenas = ['bamboo','tower','tomb','cloud','star'].map(id => 'arena-' + id);
  art.reborn = Object.create(null);
  const rebornIds = [
    ...art.arenas,
    ...['wolf','cultist','golem','spider','bomber','summoner','blade','toad'].map(id => 'foe-' + id),
    ...['moon','demon','sovereign','heart'].map(id => 'boss-' + id),
    ...['sword','storm','fire','ice','swarm','wings','wheel','phoenix','emperor','crown',
      'soulblade','lotusboots','cursed','cauldron','orb','crystal','jade','scroll',
      'robe','boots','head','cloak','ring','amulet','pouch','stone','essence','ward','bell','ghost','chess','fan'].map(id => 'icon-' + id)
  ];
  art.rebornReady = new Promise(resolve => {
    if (root.requestIdleCallback) root.requestIdleCallback(resolve, {timeout: 900});
    else root.setTimeout(resolve, 0);
  }).then(() => Promise.all(rebornIds.map(id => new Promise(resolve => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = async () => {
      try {
        if (image.decode) await image.decode();
        if (image.naturalWidth) {
          art.reborn[id] = image;
          if (id.startsWith('icon-')) root.document?.documentElement.style.setProperty('--reborn-' + id, 'inline');
        }
      } catch { /* The original illustration stays visible if decoding fails. */ }
      resolve();
    };
    image.onerror = resolve;
    image.src = 'assets/art-reborn/' + id + '.webp';
  }))));
  // Publish a CSS image only after it decodes. Each surface retains its fallback until then.
  const uiIds = ['hub-bg','parchment-tex','armory-pedestal','avatar-frame','panel-corner',
    ...['armory','cultivation','bag','jianghu','trial','codex'].map(hall => 'dock-' + hall)];
  art.ui = Object.create(null);
  art.uiReady = new Promise(resolve => {
    if (root.requestIdleCallback) root.requestIdleCallback(resolve, {timeout: 900});
    else root.setTimeout(resolve, 0);
  }).then(() => Promise.all(uiIds.map(async id => {
    const image = new Image();
    image.decoding = 'async';
    image.src = 'assets/ui-art/' + id + '.webp';
    try {
      await image.decode();
      art.ui[id] = image;
      const style = root.document.documentElement.style;
      style.setProperty('--ui-' + id, 'url("' + image.getAttribute('src') + '")');
      if (id.startsWith('dock-')) style.setProperty('--ui-' + id + '-fallback', 'none');
    } catch { /* Keep the base material or original icon. */ }
  })));
  art.drawRebornFoe = function(c, key, x, y, height, faceRight, flash) {
    const image = art.reborn[key];
    if (!image) return false;
    // The painted cutouts have their feet at 94% and occupy 88% of the square.
    const side = height / .88;
    c.save();
    c.translate(x, y);
    if (faceRight) c.scale(-1, 1);
    if (flash > 0) c.filter = 'brightness(1.9) saturate(.55)';
    c.drawImage(image, -side / 2, -side * .94, side, side);
    c.restore();
    return true;
  };
  root.XiuxianArt = art;
})(globalThis);
