import { ApiError, authenticate } from './auth.mjs';
import { feedResponse } from './feeds.mjs';
import staticFeed from './static-feed.mjs';
const fail = (status, code) => { throw new ApiError(status, code); };
const list = value => (value || '').split(',').map(s => s.trim()).filter(Boolean);
export function configured(env) {
  try {
    return env.ENABLED === 'true' && !!env.DB && list(env.ALLOWED_ORIGINS).length > 0 && list(env.ALLOWED_ORIGINS).every(origin => new URL(origin).origin === origin && (origin.startsWith('https://') || /^http:\/\/localhost(:\d+)?$/.test(origin))) && new URL(env.OIDC_ISSUER).protocol === 'https:' && new URL(env.OIDC_JWKS_URL).protocol === 'https:' && !!env.OIDC_AUDIENCE && !!env.OWNER_SUBJECTS && env.RATE_LIMIT_SALT?.length >= 32;
  } catch { return false; }
}
const first = (db, sql, ...args) => db.prepare(sql).bind(...args).first();
async function run(db, sql, ...args) {
  try { return await db.prepare(sql).bind(...args).run(); }
  catch (error) {
    if (/reserved_slug|UNIQUE constraint failed: posts\.slug/.test(String(error.message))) fail(409, 'slug_exists');
    throw error;
  }
}
const rows = async (db, sql, ...args) => (await db.prepare(sql).bind(...args).all()).results;
const visible = column => `NOT EXISTS(SELECT 1 FROM post_targets pt WHERE pt.target=${column} AND pt.status='draft')`;
async function visibleTarget(db, value) {
  const destination = target(value);
  if (await first(db, "SELECT 1 FROM post_targets WHERE target=? AND status='draft'", destination)) fail(404, 'not_found');
  return destination;
}
const pageInfo = (limit, offset, total) => ({ limit, offset, total, hasMore: offset + limit < total });
const pageOffset = value => Math.floor(Math.max(0, Math.min(100000, Number(value) || 0)));
function decodePath(value) { try { return decodeURIComponent(value); } catch { fail(400, 'invalid_path'); } }
const postColumns = 'id,slug,title,excerpt,body,status,published_at AS publishedAt,updated_at AS updatedAt';
const summaryColumns = 'id,slug,title,excerpt,status,published_at AS publishedAt,updated_at AS updatedAt';
const login = user => user || fail(401, 'unauthorized');
const owner = user => { login(user); if (!user.isOwner) fail(403, 'forbidden'); };
function string(value, max, min = 0) {
  if (typeof value !== 'string' || value.trim().length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) fail(400, 'invalid_input');
  return value.trim();
}
function target(value) {
  const result = string(value, 180, 1).normalize('NFC');
  if (result !== 'guestbook' && !/^post:[\p{L}\p{N}][\p{L}\p{N}/_-]{0,170}$/u.test(result)) fail(400, 'invalid_target');
  return result;
}
function boolean(value) { if (typeof value !== 'boolean') fail(400, 'invalid_input'); return value; }
function fields(data, allowed) { if (Object.keys(data).some(key => !allowed.includes(key))) fail(400, 'unknown_field'); }
async function json(request) {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) fail(415, 'json_required');
  if (Number(request.headers.get('Content-Length')) > 131072) fail(413, 'body_too_large');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'invalid_json');
  let size = 0; const chunks = [];
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.byteLength; if (size > 131072) { await reader.cancel(); fail(413, 'body_too_large'); } chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { const data = JSON.parse(new TextDecoder().decode(bytes)); if (!data || typeof data !== 'object' || Array.isArray(data)) fail(400, 'invalid_json'); return data; }
  catch { fail(400, 'invalid_json'); }
}
async function hash(value) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)))].map(n => n.toString(16).padStart(2, '0')).join(''); }
async function rateLimit(request, env) {
  const minute = Math.floor(Date.now() / 60000);
  const key = await hash(`${env.RATE_LIMIT_SALT}|${request.headers.get('CF-Connecting-IP') || 'local'}|${minute}`);
  const result = await first(env.DB, 'INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count', key, (minute + 2) * 60);
  if (result.count > 60) fail(429, 'rate_limited');
}
function createId(request) {
  const key = request.headers.get('Idempotency-Key');
  if (key && !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) fail(400, 'invalid_idempotency_key');
  return key || crypto.randomUUID();
}
async function route(request, env, snapshot) {
  const url = new URL(request.url), path = url.pathname, method = request.method, db = env.DB;
  if (path === '/health' && method === 'GET') return { configured: !!configured(env) };
  if (!configured(env)) fail(503, 'not_configured');
  await rateLimit(request, env);
  const user = await authenticate(request, env);
  const now = new Date().toISOString();
  if (path.startsWith('/v1/admin/')) owner(user);
  if (user) await run(db, "INSERT INTO profiles(id,created_at) VALUES(?,?) ON CONFLICT(id) DO NOTHING", user.id, now);
  const limit = Math.floor(Math.min(25, Math.max(1, Number(url.searchParams.get('limit')) || 20)));
  const offset = Math.floor(Math.max(0, Math.min(100000, Number(url.searchParams.get('offset')) || 0)));
  if ((path === '/v1/feeds/rss.xml' || path === '/v1/feeds/atom.xml') && method === 'GET') return feedResponse(env,db,path.endsWith('/rss.xml')?'rss':'atom',snapshot,request.url);
  if ((path === '/v1/posts' || path === '/v1/search') && method === 'GET') {
    const query = path === '/v1/search' ? string(url.searchParams.get('q'),120,1) : '';
    // Literal substring search, parameterized, with wildcard characters escaped.
    const pattern = `%${query.replace(/[\\%_]/g, '\\$&')}%`;
    const where = query ? "status='published' AND (title LIKE ? ESCAPE '\\' OR excerpt LIKE ? ESCAPE '\\' OR body LIKE ? ESCAPE '\\')" : "status='published'";
    const args = query ? [pattern,pattern,pattern] : [];
    const total = (await first(db,`SELECT count(*) AS n FROM posts WHERE ${where}`,...args)).n;
    return { posts:await rows(db,`SELECT ${summaryColumns} FROM posts WHERE ${where} ORDER BY published_at DESC,id LIMIT ? OFFSET ?`,...args,limit,offset), pagination:pageInfo(limit,offset,total) };
  }
  if (path.startsWith('/v1/posts/') && method === 'GET') {
    const post = await first(db, `SELECT ${postColumns} FROM posts WHERE slug=? AND status='published'`, decodePath(path.slice(10)));
    if (!post) fail(404, 'not_found'); return { post };
  }
  if (path.startsWith('/v1/admin/posts/') && method === 'GET') {
    const post = await first(db, `SELECT ${postColumns} FROM posts WHERE id=?`, path.slice(16));
    if (!post) fail(404, 'not_found'); return { post };
  }
  if (path === '/v1/admin/posts' && method === 'GET') return { posts: await rows(db, `SELECT ${postColumns} FROM posts ORDER BY updated_at DESC,id LIMIT ? OFFSET ?`, Math.min(limit, 2), offset) };
  if ((path === '/v1/admin/posts' && method === 'POST') || (path.startsWith('/v1/admin/posts/') && method === 'PATCH')) {
    const data = await json(request); fields(data, ['title','slug','excerpt','body','status','updatedAt']);
    const id = method === 'POST' ? createId(request) : path.slice(16);
    const existing = await first(db, `SELECT ${postColumns} FROM posts WHERE id=?`, id);
    if (method === 'PATCH' && !existing) fail(404, 'not_found');
    const merged = { excerpt: '', status: 'draft', ...existing, ...data };
    const title = string(merged.title, 180, 1), slug = string(merged.slug, 160, 1), excerpt = string(merged.excerpt, 500), body = string(merged.body, 100000, 1);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug) || !['draft','published'].includes(merged.status)) fail(400, 'invalid_input');
    if (method === 'POST' && existing) {
      if (existing.title !== title || existing.slug !== slug || existing.excerpt !== excerpt || existing.body !== body || existing.status !== merged.status) fail(409, 'idempotency_conflict');
      return { post: existing };
    }
    if (await first(db, 'SELECT post_id FROM post_targets WHERE target=? AND post_id<>?', `post:${slug}`, id)) fail(409, 'slug_exists');
    const publishedAt = merged.status === 'published' ? existing?.publishedAt || now : null;
    if (method === 'POST') {
      try { await run(db, 'INSERT INTO posts(id,slug,title,excerpt,body,status,published_at,updated_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT DO NOTHING', id,slug,title,excerpt,body,merged.status,publishedAt,now); }
      catch (error) { if (String(error.message).includes('UNIQUE constraint failed')) fail(409, 'slug_exists'); throw error; }
      const stored = await first(db, `SELECT ${postColumns} FROM posts WHERE id=?`, id);
      if (!stored) fail(409, 'slug_exists');
      if (stored.title !== title || stored.slug !== slug || stored.excerpt !== excerpt || stored.body !== body || stored.status !== merged.status) fail(409, 'idempotency_conflict');
      return { post: stored };
    }
    else {
      // A version precondition prevents overwriting a newer tab's changes.
      if (typeof data.updatedAt !== 'string') fail(428, 'version_required');
      const result = await run(db, 'UPDATE posts SET slug=?,title=?,excerpt=?,body=?,status=?,published_at=?,updated_at=? WHERE id=? AND updated_at=?', slug,title,excerpt,body,merged.status,publishedAt,new Date(Math.max(Date.now(),Date.parse(existing.updatedAt)+1)).toISOString(),id,data.updatedAt);
      if (!result.meta.changes) fail(409, 'version_conflict');
    }
    return { post: await first(db, `SELECT ${postColumns} FROM posts WHERE id=?`, id) };
  }
  if (path === '/v1/me') {
    login(user);
    if (method === 'PATCH') {
      const data = await json(request); fields(data, ['displayName','bio']);
      const current = await first(db, 'SELECT display_name AS displayName,bio FROM profiles WHERE id=?', user.id);
      await run(db, 'UPDATE profiles SET display_name=?,bio=? WHERE id=?', string(data.displayName ?? current.displayName, 60, 1), string(data.bio ?? current.bio, 500), user.id);
    } else if (method !== 'GET') fail(405, 'method_not_allowed');
    const commentOffset = pageOffset(url.searchParams.get('commentOffset')), bookmarkOffset = pageOffset(url.searchParams.get('bookmarkOffset'));
    const commentTotal = (await first(db, 'SELECT count(*) AS n FROM comments WHERE user_id=?', user.id)).n;
    const bookmarkTotal = (await first(db, 'SELECT count(*) AS n FROM bookmarks WHERE user_id=?', user.id)).n;
    return { user: { ...await first(db, 'SELECT id,display_name AS displayName,bio FROM profiles WHERE id=?', user.id), isOwner: user.isOwner },
      bookmarks: await rows(db, 'SELECT target,created_at AS createdAt FROM bookmarks WHERE user_id=? ORDER BY created_at DESC,target LIMIT ? OFFSET ?', user.id,limit,bookmarkOffset),
      comments: await rows(db, 'SELECT id,target,body,status,created_at AS createdAt FROM comments WHERE user_id=? ORDER BY created_at DESC,id LIMIT ? OFFSET ?', user.id,limit,commentOffset),
      commentPagination: pageInfo(limit,commentOffset,commentTotal), bookmarkPagination: pageInfo(limit,bookmarkOffset,bookmarkTotal),
    };
  }
  if (path === '/v1/comments' && method === 'GET') {
    const destination = await visibleTarget(db,url.searchParams.get('target'));
    const total = (await first(db, `SELECT count(*) AS n FROM comments c WHERE c.target=? AND c.status='approved' AND ${visible('c.target')}`, destination)).n;
    return { comments: await rows(db, `SELECT c.id,c.target,c.body,c.created_at AS createdAt,p.display_name AS displayName FROM comments c JOIN profiles p ON p.id=c.user_id WHERE c.target=? AND c.status='approved' AND ${visible("c.target")} ORDER BY c.created_at DESC,c.id LIMIT ? OFFSET ?`, destination,limit,offset), pagination: pageInfo(limit,offset,total) };
  }

  if (path === '/v1/comments' && method === 'POST') {
    login(user); const data = await json(request); fields(data, ['target','body']);
    const id = createId(request), destination = await visibleTarget(db,data.target), body = string(data.body, 4000, 1);
    const existing = await first(db, 'SELECT * FROM comments WHERE id=?', id);
    if (existing && (existing.user_id !== user.id || existing.target !== destination || existing.body !== body)) fail(409, 'idempotency_conflict');
    await run(db, "INSERT INTO comments(id,user_id,target,body,created_at) VALUES(?,?,?,?,?) ON CONFLICT(id) DO NOTHING", id,user.id,destination,body,now);
    const stored = await first(db, 'SELECT id,target,body,status,created_at AS createdAt FROM comments WHERE id=? AND user_id=?', id,user.id);
    if (!stored || stored.target !== destination || stored.body !== body) fail(409, 'idempotency_conflict');
    return { comment: stored };
  }
  if (path.startsWith('/v1/comments/') && method === 'DELETE') {
    login(user); const id = path.slice(13);
    // Scoped deletion avoids revealing whether another user's private comment exists.
    await run(db, `DELETE FROM comments WHERE id=? ${user.isOwner ? '' : 'AND user_id=?'}`, ...user.isOwner ? [id] : [id,user.id]); return { ok: true };
  }
  if (path === '/v1/admin/comments' && method === 'GET') {
    const status = url.searchParams.get('status');
    if (status !== null && !['pending','approved','rejected'].includes(status)) fail(400, 'invalid_status');
    const where = status === null ? '' : 'WHERE c.status=?', args = status === null ? [] : [status];
    const total = (await first(db, `SELECT count(*) AS n FROM comments c ${where}`, ...args)).n;
    return { comments: await rows(db, `SELECT c.id,c.target,c.body,c.status,c.created_at AS createdAt,p.display_name AS displayName FROM comments c JOIN profiles p ON p.id=c.user_id ${where} ORDER BY c.created_at DESC,c.id LIMIT ? OFFSET ?`, ...args,limit,offset), pagination: pageInfo(limit,offset,total) };
  }
  if (path.startsWith('/v1/admin/comments/') && method === 'PATCH') {
    const data = await json(request); fields(data, ['status']); if (!['approved','rejected'].includes(data.status)) fail(400, 'invalid_input');
    const result = await run(db, 'UPDATE comments SET status=? WHERE id=?', data.status, path.slice(19)); if (!result.meta.changes) fail(404, 'not_found'); return { ok: true };
  }
  if (path === '/v1/reactions' && method === 'GET') {
    const destination = await visibleTarget(db,url.searchParams.get('target'));
    return { likes: (await first(db, `SELECT count(*) AS count FROM likes WHERE target=? AND ${visible('likes.target')}`, destination)).count, liked: !!(user && await first(db, 'SELECT 1 FROM likes WHERE target=? AND user_id=?', destination,user.id)), bookmarked: !!(user && await first(db, 'SELECT 1 FROM bookmarks WHERE target=? AND user_id=?', destination,user.id)) };
  }
  if ((path === '/v1/reactions' || path === '/v1/bookmarks') && method === 'PUT') {
    login(user); const data = await json(request); const bookmark = path === '/v1/bookmarks'; fields(data, ['target', bookmark ? 'saved' : 'liked']);
    const selected = boolean(bookmark ? data.saved : data.liked), table = bookmark ? 'bookmarks' : 'likes';
    // Visibility gates additions only. Users retain control over their existing private records.
    const destination = selected ? await visibleTarget(db,data.target) : target(data.target);
    if (selected) await run(db, `INSERT INTO ${table}(user_id,target${bookmark ? ',created_at' : ''}) VALUES(?,?${bookmark ? ',?' : ''}) ON CONFLICT(user_id,target) DO NOTHING`, ...bookmark ? [user.id,destination,now] : [user.id,destination]);
    else await run(db, `DELETE FROM ${table} WHERE user_id=? AND target=?`, user.id,destination);
    return { ok: true };
  }
  if (path === '/v1/views' && method === 'POST') {
    const data = await json(request); fields(data, ['target']); const destination = await visibleTarget(db,data.target);
    if (request.headers.get('DNT') === '1' || request.headers.get('Sec-GPC') === '1') return { ok: true, counted: false };
    const day = now.slice(0,10), visitor = await hash(`${env.RATE_LIMIT_SALT}|${day}|${request.headers.get('CF-Connecting-IP') || 'local'}`);
    const result = await run(db, 'INSERT INTO view_events(visitor_hash,target,day) VALUES(?,?,?) ON CONFLICT DO NOTHING', visitor,destination,day);
    return { ok: true, counted: !!result.meta.changes };
  }
  if (path === '/v1/stats' && method === 'GET') return { views: (await first(db, `SELECT coalesce(sum(count),0) AS n FROM view_totals WHERE ${visible('view_totals.target')}`)).n, likes: (await first(db, `SELECT count(*) AS n FROM likes WHERE ${visible('likes.target')}`)).n, comments: (await first(db, `SELECT count(*) AS n FROM comments WHERE status='approved' AND ${visible("comments.target")}`)).n, posts: (await first(db, "SELECT count(*) AS n FROM posts WHERE status='published'")).n };
  fail(404, 'not_found');
}
export function createWorker(snapshot = staticFeed) { return {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff', 'Vary':'Origin' };
    if (origin && list(env.ALLOWED_ORIGINS).includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
      headers['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Authorization,Content-Type,Idempotency-Key';
      headers['Access-Control-Max-Age'] = '600';
    }
    try {
      if (origin && !list(env.ALLOWED_ORIGINS).includes(origin)) fail(403, 'origin_forbidden');
      if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
      const result = await route(request,env,snapshot);
      if (result instanceof Response) return new Response(result.body,{status:result.status,headers:{...headers,...Object.fromEntries(result.headers)}});
      return new Response(JSON.stringify(result), { headers });
    } catch (error) {
      const status = error instanceof ApiError ? error.status : 500;
      if (status === 429) headers['Retry-After'] = '60';
      return new Response(JSON.stringify({ error: { code: error instanceof ApiError ? error.code : 'internal_error', message: error instanceof ApiError ? error.message : 'Request failed' } }), { status, headers });
    }
  },
  async scheduled(_event, env) {
    if (!configured(env)) return;
    await env.DB.batch([
      env.DB.prepare('DELETE FROM rate_limits WHERE expires_at<?').bind(Math.floor(Date.now()/1000)),
      env.DB.prepare('DELETE FROM view_events WHERE day<?').bind(new Date(Date.now()-2*86400000).toISOString().slice(0,10)),
    ]);
  },
}; }
export default createWorker();
