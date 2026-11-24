(function (root) {
  'use strict';
  const node = typeof module === 'object' && module.exports;
  const Engine = node ? require('./campaign.js') : root.XiuxianEngine;
  const Data = node ? require('./data.js') : root.XiuxianData;
  const D = Engine.campaign, S = Engine.campaignState;
  const rooms = node ? require('./expedition-data.js').rooms : root.XiuxianExpeditionData?.rooms;
  const runMaps = new Set(['bamboo', 'valley', 'sanctum']);
  // Coordinates are editorial layout, not a claim about canonical distances or bearings.
  // All roads below come from actual exits or the existing chapter/expedition entry points.
  const places = [
    ['temple', 65, 575, '雨夜破庙', '乡野初行', '乡里'],
    ['garden', 245, 350, '蜀山药庐', '蜀山行程', '蜀山'],
    ['ruins', 155, 290, '后山旧阵', '蜀山行程', '蜀山'],
    ['bamboo', 70, 230, '听雨竹庭', '旧阵诸境', '旧阵'],
    ['valley', 95, 155, '月露幽谷', '旧阵诸境', '旧阵'],
    ['sanctum', 65, 85, '古磬灵台', '旧阵诸境', '旧阵'],
    ['qingyang', 125, 470, '青阳镇', '乡野初行', '乡里'],
    ['wangyard', 85, 525, '王宅', '乡野初行', '乡里'],
    ['forest', 205, 525, '汉墓林', '乡野初行', '乡里'],
    ['crypt', 255, 575, '汉墓墓道', '乡野初行', '古墓'],
    ['tomb', 310, 620, '汉墓石室', '乡野初行', '古墓'],
    ['hehuan', 385, 430, '行旅药站', '宗门往来', '合欢宗'],
    ['tower-duty', 260, 270, '锁妖塔', '蜀山行程', '蜀山'],
    ['tower-seal', 325, 240, '六层封廊', '蜀山行程', '蜀山'],
    ['tower-upper', 400, 200, '七层镜室', '蜀山行程', '蜀山'],
    ['apricot-village', 400, 535, '杏花村', '乡里后程', '乡里'],
    ['jindan-retreat', 390, 335, '洞府劫坪', '蜀山行程', '蜀山'],
    ['tianji-pavilion', 500, 400, '天机阁', '远行诸境', '天机阁'],
    ['wanyao-outer', 600, 505, '万妖外境', '远行诸境', '万妖秘境'],
    ['wanyao-inner', 660, 575, '万妖内境', '远行诸境', '万妖秘境'],
    ['beihuang-retreat', 460, 175, '北荒', '北地行程', '北荒'],
    ['golden-summit', 355, 125, '金顶', '蜀山行程', '蜀山'],
    ['heart-cliff', 280, 80, '问道崖', '蜀山行程', '蜀山'],
    ['shushan-commons', 220, 175, '蜀山山门', '蜀山行程', '蜀山'],
    ['alliance-camp', 645, 410, '联军战营', '归墟战线', '联军'],
    ['guixu-west', 770, 490, '归墟西线', '归墟战线', '联军'],
    ['guixu-east', 840, 560, '归墟东线', '归墟战线', '联军'],
    ['guixu-core', 895, 465, '归墟深处', '归墟战线', '归墟'],
    ['heaven-threshold', 525, 60, '高天前路', '界外行程', '高天'],
    ['qingyang-charity', 155, 405, '青阳前街', '乡里后程', '乡里'],
    ['blackwind-stockade', 115, 350, '黑风寨', '江湖远路', '黑风寨'],
    ['northern-border', 610, 150, '北境关隘', '北地行程', '北境'],
    ['icefield-cavern', 730, 85, '冰原古洞', '北地行程', '冰原'],
    ['demon-blood-cavern', 890, 315, '万魔窟', '魔域行程', '魔域'],
    ['demon-tribes', 820, 245, '十二部', '魔域行程', '魔域十二部'],
    ['demon-palace', 910, 185, '魔宫', '魔域行程', '魔域'],
    ['two-realms-crossing', 715, 290, '两界渡口', '两界往来', '两界'],
    ['archive-hearing', 285, 465, '藏经案阁', '案阁行程', '案阁'],
    ['sword-vault', 300, 180, '后山剑冢', '蜀山行程', '蜀山'],
    ['apricot-homestead', 435, 610, '杏林', '乡里后程', '乡里'],
    ['floodplain', 515, 570, '杏河', '乡里后程', '乡里'],
    ['reincarnation-hall', 880, 65, '轮回大殿', '界外行程', '界外'],
    ['world-mill', 945, 115, '时间碾磨', '界外行程', '界外']
  ].map(([id, x, y, label, region, faction]) => Object.freeze({id, x, y, label, region, faction}));
  const byId = new Map(places.map(place => [place.id, place]));
  const persistentMapIds = places.filter(place => !runMaps.has(place.id)).map(place => place.id);
  const persistent = new Set(persistentMapIds);
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  function normalizeExploration(value) {
    if (value === undefined) return {version: 1, visited: []};
    if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).length !== 2 ||
        !own(value, 'version') || !own(value, 'visited') || value.version !== 1 || !Array.isArray(value.visited) ||
        value.visited.length > persistent.size || new Set(value.visited).size !== value.visited.length ||
        value.visited.some(id => typeof id !== 'string' || !persistent.has(id))) throw Error('山河探索记录异常。');
    return {version: 1, visited: [...value.visited]};
  }
  function recordVisit(game) {
    const state = game?.state;
    if (!state || state.campaign?.ending || !persistent.has(state.map)) return false;
    const record = normalizeExploration(state.exploration);
    if (record.visited.includes(state.map)) return false;
    record.visited.push(state.map);
    state.exploration = record;
    return true;
  }
  function evidenceOfVisits(game) {
    const state = game.state, found = new Set(normalizeExploration(state.exploration).visited);
    const add = id => { if (byId.has(id)) found.add(id); };
    add(state.map);
    const c = state.chapter, q = state.story;
    if (c && c.prologue !== 'pending') add('garden');
    if (c && (c.prologue === 'done' || ['wood','flint','fire','bread'].some(id => c.survival?.[id]))) add('temple');
    if (state.flags?.complete || state.flags?.cache || state.flags?.inscription || state.flags?.wildStudy ||
        state.vineHp < 90 || state.inventory?.box > 0 || state.gathered?.includes('wildHerb')) add('ruins');
    if (q && q.stage !== 'unstarted') add('qingyang');
    if (q && (q.opened || ['night', 'forest'].includes(q.stage) || q.evidence?.some(id => ['soil', 'mark', 'trail'].includes(id)))) add('wangyard');
    const tombStages = ['forest', 'crypt', 'meeting', 'battle', 'farewell', 'escort', 'report', 'complete'];
    const tombIndex = tombStages.indexOf(c?.tomb?.stage);
    if (tombIndex >= 0) add('forest');
    if (tombIndex >= 1) add('crypt');
    if (tombIndex >= 2) add('tomb');
    if (state.sectWorld?.visited) add('hehuan');
    if (state.collection?.runs > 0) add('bamboo');
    if (state.collection?.notes?.includes('herb')) add('valley');
    if (state.collection?.notes?.includes('keeper')) add('sanctum');
    for (const record of state.run?.history || []) add(rooms?.[record.room]?.map);
    // A shared marker can be written by alternative methods at different places. Only a
    // unique map source proves a visit; merely satisfying a map requirement proves none.
    const tasks = state.campaign?.tasks || {};
    for (const [taskId, record] of Object.entries(tasks)) {
      const actions = Object.values(D.actions).filter(action => action.task === taskId);
      const uniquePlace = list => { const ids = new Set(list.map(action => action.map)); if (ids.size === 1) add([...ids][0]); };
      uniquePlace(actions.filter(action => action.kind === 'accept'));
      if (record.claimed) uniquePlace(actions.filter(action => action.kind === 'claim'));
      for (const mark of record.done || []) uniquePlace(actions.filter(action => action.marks?.includes(mark)));
      if (record.choice !== null && record.choice !== undefined) uniquePlace(actions.filter(action => action.kind === 'choice' && action.choice === record.choice));
      const sequence = S.sequence(D.tasks[taskId] || {sequence: []});
      for (const id of sequence.slice(0, record.sequence || 0)) if (D.actions[id]) add(D.actions[id].map);
    }
    const battle = state.campaign?.battle;
    if (battle) add(S.battleDefinition(battle)?.map);
    return found;
  }
  function legacyRoads(game) {
    const state = game.state, c = state.chapter || {}, q = state.story || {}, t = c.tomb || {};
    const adult = c.prologue !== 'pending', chapterDone = !!state.flags?.complete;
    const row = (id, from, to, objectId, open, kind = 'path') => ({id, from, to, objectId, open: !!open, kind});
    return [
      row('leave-temple', 'temple', 'garden', 'leaveTemple', ['fire', 'bread', 'lock'].every(id => c.survival?.[id])),
      row('old-array', 'garden', 'ruins', 'toRuins', adult && state.flags?.accepted),
      row('old-array-return', 'ruins', 'garden', 'toGarden', adult),
      row('qingyang-road', 'garden', 'qingyang', 'qingyangRoad', adult && chapterDone && c.rank >= 4),
      row('qingyang-return', 'qingyang', 'garden', 'townReturn', q.stage !== 'unstarted'),
      row('night-lane', 'qingyang', 'wangyard', 'nightLane', q.opened || ['night', 'forest'].includes(q.stage) || game.readyForNight?.()),
      row('yard-return', 'wangyard', 'qingyang', 'yardExit', q.stage !== 'unstarted'),
      row('forest-road', 'qingyang', 'forest', 'toTomb', q.stage === 'forest'),
      row('forest-return', 'forest', 'qingyang', 'forestReturn', t.stage !== 'locked'),
      row('crypt-road', 'forest', 'crypt', 'forestEnter', t.stage !== 'locked' && t.stage !== 'forest'),
      row('crypt-return', 'crypt', 'forest', 'cryptReturn', t.stage !== 'locked'),
      row('tomb-road', 'crypt', 'tomb', 'sanctumDoor', ['meeting', 'battle', 'farewell', 'escort', 'report', 'complete'].includes(t.stage)),
      row('tomb-return', 'tomb', 'crypt', 'tombReturn', !['battle', 'farewell', 'escort'].includes(t.stage)),
      row('hehuan-road', 'garden', 'hehuan', 'toHehuan', adult && c.rank === 4 && (game.sectAge?.() || 0) >= 20),
      row('hehuan-return', 'hehuan', 'garden', 'hehuanReturn', state.sectWorld?.visited),
      ...['bamboo', 'valley', 'sanctum'].map(id => row('array-' + id, 'garden', id, 'echoGate', adult && chapterDone, 'expedition'))
    ];
  }
  function roads(game) {
    const state = game.state;
    return [...legacyRoads(game), ...Object.values(D.exits).map(exit => ({
      id: exit.id, from: exit.map, to: exit.to.map, objectId: exit.objectId, kind: 'path',
      open: !!state.campaign?.started && S.requirements(state.campaign, exit.requires, state) &&
        (!D.maps[exit.to.map] || S.requirements(state.campaign, D.maps[exit.to.map].requires, state))
    }))];
  }
  function pathTo(game, targetId, links) {
    if (game.state.campaign?.ending || game.state.campaign?.battle || game.state.run || game.state.hp <= 0 ||
        game.state.sectWorld?.escort?.phase === 'battle' || game.state.chapter?.tomb?.stage === 'battle') return null;
    const queue = [[game.state.map, []]], seen = new Set([game.state.map]);
    for (let index = 0; index < queue.length; index++) {
      const [id, path] = queue[index];
      if (id === targetId) return path;
      for (const road of links) if (road.open && road.from === id && !seen.has(road.to)) {
        seen.add(road.to); queue.push([road.to, [...path, road]]);
      }
    }
    return null;
  }
  function tasksAt(journal, mapId) {
    return journal.filter(task => task.known !== false && task.status !== 'locked' &&
      !['claimed', 'complete'].includes(task.status) && Object.values(D.actions).some(action => action.task === task.id && action.map === mapId))
      .map(task => ({id: task.id, title: task.title, status: task.statusLabel, panelId: task.panelId}));
  }
  function snapshot(game) {
    if (!game?.state) return null;
    const visited = evidenceOfVisits(game), links = roads(game), known = new Set(visited), state = game.state;
    const journal = game.campaignStatus?.().journal || [];
    for (const road of links) if (road.open && visited.has(road.from)) known.add(road.to);
    const ended = !!state.campaign?.ending;
    const points = places.filter(place => known.has(place.id)).map(place => {
      const arrived = visited.has(place.id), current = place.id === state.map, path = pathTo(game, place.id, links);
      const first = path?.[0], actualObject = first && (Data.maps[first.from]?.objects || []).some(object => object.id === first.objectId);
      const entryObject = first && D.entryObjects.some(object => object.map === first.from && object.id === first.objectId);
      const extraEntry = first && ['qingyangRoad', 'toTomb', 'toHehuan', 'echoGate'].includes(first.objectId);
      // Map names contain story subtitles. Unvisited points only receive a plain place label.
      const safeLabel = !arrived && ['reincarnation-hall','world-mill'].includes(place.id) ? '界外远路' : place.label;
      const title = arrived ? Data.maps[place.id]?.name || place.label : safeLabel;
      return { ...place, label: safeLabel, title, visited: arrived, current, reachable: !ended && path !== null,
        status: current ? '身在此处' : arrived ? '已经到访' : '已知去向',
        tasks: arrived ? tasksAt(journal, place.id) : [],
        route: first && (actualObject || entryObject || extraEntry) ? {mapId: first.from, objectId: first.objectId, targetId: place.id, kind: 'exit', steps: path.length,
          label: byId.get(first.to)?.label || '沿路前行', expedition: first.kind === 'expedition'} : null };
    });
    const ids = new Set(points.map(place => place.id)), paired = new Set(), paths = [];
    for (const road of links) if (ids.has(road.from) && ids.has(road.to)) {
      const pair = [road.from, road.to].sort().join('|'); if (paired.has(pair)) continue; paired.add(pair);
      paths.push({from: road.from, to: road.to, open: links.some(other => other.open && [other.from, other.to].sort().join('|') === pair), kind: road.kind});
    }
    const factions = [...new Set(points.filter(place => place.visited).map(place => place.faction))];
    return {title: '山河行旅图', subtitle: '依各卷行程绘就的山河脉络。',
      currentId: state.map, ended, visitedCount: visited.size, totalCount: places.length, unknownCount: places.length - points.length,
      points, paths, factions, regions: [...new Set(points.map(place => place.region))], objective: game.objective?.() || [],
      note: '实线为已通之路，虚线为旧日足迹；雾锁之处待亲身行至方才显露。'};
  }
  function flightLanding(game,id){
    const s=game.state,t=s.chapter?.tomb;
    if(!game.relaxed||!game.canUseSpiritualPower()||game.isChild()||s.hp<=0||s.run||s.chapter.training||s.campaign?.battle||s.campaign?.ending||game.campaignMemory?.()||game.activeEnemies().some(e=>e.hp>0))return null;
    if(['battle','escort','farewell'].includes(t?.stage)||s.map==='wangyard'||s.sectWorld?.escort.phase==='battle')return null;
    if(id===s.map||!evidenceOfVisits(game).has(id)||!pathTo(game,id,roads(game)))return null;
    const entries={garden:{x:560,y:392},qingyang:{x:180,y:420},hehuan:{x:640,y:630},ruins:{x:190,y:384},forest:{x:180,y:420}};
    const landing=entries[id]||D.maps[id]?.entry;
    if(!landing||!S.walkable(Data.maps[id],landing.x,landing.y))return null;
    if(id==='ruins'&&s.enemies.some(e=>e.hp>0&&Math.hypot(e.x-landing.x,e.y-landing.y)<360))return null;
    return landing;
  }
  function fly(game,id){
    const p=flightLanding(game,id);if(!p)return false;
    game.travel(id,p.x,p.y);if(game.state.map!==id)return false;
    game.events.push({type:'map'});game.message('御剑抵达'+Data.maps[id].name+'。');return true;
  }
  const api = {fly,flightLanding,asset: 'assets/art/world-atlas.webp', width: 1000, height: 680, places, persistentMapIds,
    normalizeExploration, recordVisit, evidenceOfVisits, snapshot};
  if (node) module.exports = api; else root.XiuxianWorldAtlas = api;
})(globalThis);
