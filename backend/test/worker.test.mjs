import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import worker, { createWorker } from '../src/worker.mjs';
import { validateStaticFeed } from '../src/feeds.mjs';
import { spawnSync } from 'node:child_process';
const originalFetch = globalThis.fetch;
let privateKey, jwk;
const encode = value => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');
before(async () => {
  const pair = await crypto.subtle.generateKey({ name:'RSASSA-PKCS1-v1_5', modulusLength:2048, publicExponent:new Uint8Array([1,0,1]), hash:'SHA-256' }, true, ['sign','verify']);
  privateKey = pair.privateKey; jwk = { ...await crypto.subtle.exportKey('jwk',pair.publicKey), kid:'test', use:'sig', alg:'RS256' };
  globalThis.fetch = async () => Response.json({ keys:[jwk] });
});
after(() => { globalThis.fetch = originalFetch; });
async function token(sub = 'visitor', overrides = {}, header = {}) {
  const content = `${encode({alg:'RS256',kid:'test',...header})}.${encode({iss:'https://identity.example',aud:'blog-api',sub,exp:Math.floor(Date.now()/1000)+3600,...overrides})}`;
  return `${content}.${Buffer.from(await crypto.subtle.sign('RSASSA-PKCS1-v1_5',privateKey,new TextEncoder().encode(content))).toString('base64url')}`;
}
function setup(snapshot) {
  const app = createWorker(snapshot);
  const sqlite = new DatabaseSync(':memory:'); sqlite.exec(readFileSync(new URL('../migrations/0001_community.sql',import.meta.url),'utf8'));
  const wrap = (sql,args=[]) => ({ bind:(...values)=>wrap(sql,values), first:async()=>sqlite.prepare(sql).get(...args) ?? null, all:async()=>({results:sqlite.prepare(sql).all(...args)}), run:async()=>({meta:{changes:sqlite.prepare(sql).run(...args).changes}}) });
  const env = { DB:{prepare:sql=>wrap(sql), batch:async queries=>Promise.all(queries.map(q=>q.run()))}, ENABLED:'true',ALLOWED_ORIGINS:'https://blog.example',OIDC_ISSUER:'https://identity.example',OIDC_JWKS_URL:'https://identity.example/jwks',OIDC_AUDIENCE:'blog-api',OWNER_SUBJECTS:'owner',RATE_LIMIT_SALT:'test-only-not-a-production-secret-12345' };
  const request = async (path, {method='GET',body,bearer,headers={}}={}) => {
    const response = await app.fetch(new Request(`https://api.example${path}`,{method,headers:{Origin:'https://blog.example',...(body!==undefined?{'Content-Type':'application/json'}:{}),...(bearer?{Authorization:`Bearer ${bearer}`} : {}),...headers},body:body!==undefined?JSON.stringify(body):undefined}),env);
    return { status:response.status, data:response.status===204?null:response.headers.get('Content-Type')?.includes('xml')?await response.text():await response.json(),headers:response.headers };
  };
  return { env, request, sqlite };
}
const post = { title:'Hello',slug:'hello',excerpt:'Summary',body:'# Private draft',status:'draft' };
test('unconfigured fails closed; health works without any external dependency',async()=>{
  const response=await worker.fetch(new Request('https://api.example/v1/posts'),{}); assert.equal(response.status,503);
  assert.deepEqual(await (await worker.fetch(new Request('https://api.example/health'),{})).json(),{configured:false});
});
test('CORS exact allowlist, preflight and no-store',async()=>{
  const {request}=setup(); assert.equal((await request('/v1/posts',{headers:{Origin:'https://evil.example'}})).status,403);
  const result=await request('/v1/posts',{method:'OPTIONS'}); assert.equal(result.status,204); assert.equal(result.headers.get('Access-Control-Allow-Origin'),'https://blog.example');
  assert.equal((await request('/v1/posts')).headers.get('Cache-Control'),'no-store');
});
test('auth requires signature, issuer, audience, expiry, nbf, algorithm and owner subject',async()=>{
  const {request}=setup(); assert.equal((await request('/v1/me')).status,401);
  for (const override of [{iss:'https://evil.example'},{aud:'other'},{exp:0},{nbf:Math.floor(Date.now()/1000)+300},{sub:''}]) assert.equal((await request('/v1/me',{bearer:await token('visitor',override)})).status,401);
  assert.equal((await request('/v1/me',{bearer:await token('visitor',{}, {alg:'none'})})).status,401);
  const valid=await token(); assert.equal((await request('/v1/me',{bearer:valid.slice(0,-10)+'aaaaaaaaaa'})).status,401);
  assert.equal((await request('/v1/admin/posts',{bearer:await token('visitor',{roles:['admin']})})).status,403);
  assert.equal((await request('/v1/admin/posts',{bearer:await token('owner')})).status,200);
});
test('drafts never leak publicly; publish/unpublish and optimistic concurrency work',async()=>{
  const {request}=setup(), bearer=await token('owner');
  const created=await request('/v1/admin/posts',{method:'POST',bearer,body:post}); assert.equal(created.status,200);
  assert.deepEqual((await request('/v1/posts')).data.posts,[]); assert.equal((await request('/v1/posts/hello',{bearer})).status,404);
  assert.equal((await request('/v1/stats')).data.posts,0);
  const id=created.data.post.id;
  assert.equal((await request(`/v1/admin/posts/${id}`,{method:'PATCH',bearer,body:{status:'published'}})).status,428);
  assert.equal((await request(`/v1/admin/posts/${id}`,{method:'PATCH',bearer,body:{status:'published',updatedAt:'stale'}})).status,409);
  const published=await request(`/v1/admin/posts/${id}`,{method:'PATCH',bearer,body:{status:'published',updatedAt:created.data.post.updatedAt}}); assert.equal(published.status,200);
  assert.equal((await request('/v1/posts/hello')).data.post.body,post.body);
  assert.equal('body' in (await request('/v1/posts')).data.posts[0],false);
  assert.equal((await request(`/v1/admin/posts/${id}`,{method:'PATCH',bearer,body:{status:'draft',updatedAt:published.data.post.updatedAt}})).status,200);
  assert.equal((await request('/v1/posts/hello')).status,404);
});
test('strict validation and create idempotency',async()=>{
  const {request}=setup(),bearer=await token('owner'),headers={'Idempotency-Key':crypto.randomUUID()};
  const first=await request('/v1/admin/posts',{method:'POST',bearer,headers,body:post});
  const again=await request('/v1/admin/posts',{method:'POST',bearer,headers,body:post}); assert.equal(first.data.post.id,again.data.post.id);
  assert.equal((await request('/v1/admin/posts',{method:'POST',bearer,headers,body:{...post,title:'Changed'}})).status,409);
  for (const invalid of [{...post,slug:'../x'},{...post,status:'admin'},{...post,body:''},{...post,role:'admin'},{...post,title:'x'.repeat(181)}]) assert.equal((await request('/v1/admin/posts',{method:'POST',bearer,body:invalid})).status,400);
  assert.equal((await request('/v1/me',{method:'PATCH',bearer,body:{isOwner:true}})).status,400);
  assert.equal((await request('/v1/comments',{method:'POST',bearer,body:{target:'guestbook',body:'x'.repeat(140000)}})).status,413);
});
test('comments private until moderated, own deletion only, idempotent submissions',async()=>{
  const {request}=setup(),alice=await token('alice'),bob=await token('bob'),owner=await token('owner'),headers={'Idempotency-Key':crypto.randomUUID()},body={target:'guestbook',body:'Hello'};
  const created=await request('/v1/comments',{method:'POST',bearer:alice,headers,body}); assert.equal(created.data.comment.status,'pending');
  assert.equal((await request('/v1/comments',{method:'POST',bearer:alice,headers,body})).data.comment.id,created.data.comment.id);
  assert.equal((await request('/v1/comments',{method:'POST',bearer:bob,headers,body})).status,409);
  assert.deepEqual((await request('/v1/comments?target=guestbook')).data.comments,[]);
  const id=created.data.comment.id;
  await request(`/v1/comments/${id}`,{method:'DELETE',bearer:bob}); assert.equal((await request('/v1/me',{bearer:alice})).data.comments.length,1);
  assert.equal((await request(`/v1/admin/comments/${id}`,{method:'PATCH',bearer:bob,body:{status:'approved'}})).status,403);
  assert.equal((await request(`/v1/admin/comments/${id}`,{method:'PATCH',bearer:owner,body:{status:'approved'}})).status,200);
  const visible=(await request('/v1/comments?target=guestbook')).data.comments; assert.equal(visible.length,1); assert.equal('user_id' in visible[0],false);
  await request(`/v1/comments/${id}`,{method:'DELETE',bearer:alice}); assert.deepEqual((await request('/v1/comments?target=guestbook')).data.comments,[]);
});
test('likes and bookmarks idempotent and isolated; repeated views counted once',async()=>{
  const {request}=setup(),bearer=await token('alice');
  for(let n=0;n<2;n++) {
    assert.equal((await request('/v1/reactions',{method:'PUT',bearer,body:{target:'post:hello',liked:true}})).status,200);
    assert.equal((await request('/v1/bookmarks',{method:'PUT',bearer,body:{target:'post:hello',saved:true}})).status,200);
    await request('/v1/views',{method:'POST',body:{target:'post:hello'}});
  }
  assert.deepEqual((await request('/v1/reactions?target=post:hello',{bearer})).data,{likes:1,liked:true,bookmarked:true});
  assert.deepEqual((await request('/v1/reactions?target=post:hello')).data,{likes:1,liked:false,bookmarked:false});
  assert.equal((await request('/v1/me',{bearer:await token('bob')})).data.bookmarks.length,0);
  assert.equal((await request('/v1/stats')).data.views,1);
  await request('/v1/views',{method:'POST',headers:{DNT:'1'},body:{target:'post:other'}}); assert.equal((await request('/v1/stats')).data.views,1);
  await request('/v1/reactions',{method:'PUT',bearer,body:{target:'post:hello',liked:false}}); assert.equal((await request('/v1/stats')).data.likes,0);
});
test('rate limit is durable and returns Retry-After',async()=>{
  const {request}=setup(); for(let n=0;n<60;n++) assert.equal((await request('/v1/stats')).status,200);
  const blocked=await request('/v1/stats'); assert.equal(blocked.status,429); assert.equal(blocked.headers.get('Retry-After'),'60');
});
test('identity upstream failures are 503, not a false invalid-session diagnosis',async()=>{
  const {env,request}=setup(); env.OIDC_JWKS_URL='https://identity.example/unavailable';
  const previous=globalThis.fetch; globalThis.fetch=async()=>{throw new Error('network unavailable');};
  try { const result=await request('/v1/me',{bearer:await token()}); assert.equal(result.status,503); assert.equal(result.data.error.code,'identity_unavailable'); }
  finally { globalThis.fetch=previous; }
});
test('Unicode static post identifiers work; SQL metacharacters and oversized identifiers fail',async()=>{
  const {request}=setup(),bearer=await token();
  assert.equal((await request('/v1/reactions',{method:'PUT',bearer,body:{target:'post:旅行/日记',liked:true}})).status,200);
  for(const target of ["post:x';DROP TABLE posts;--",'post:../secret','post:hello?x=y','post:'+ 'a'.repeat(180)]) assert.equal((await request('/v1/reactions',{method:'PUT',bearer,body:{target,liked:true}})).status,400);
});
test('scheduled retention deletes short-lived identifiers, preserves aggregate count',async()=>{
  const {env,sqlite,request}=setup();
  sqlite.prepare('INSERT INTO view_events(visitor_hash,target,day) VALUES(?,?,?)').run('oldhash','post:hello','2000-01-01');
  sqlite.prepare('INSERT INTO rate_limits(key,count,expires_at) VALUES(?,?,?)').run('oldkey',1,0);
  await worker.scheduled({},env);
  assert.equal(sqlite.prepare('SELECT count(*) AS n FROM view_events').get().n,0);
  assert.equal(sqlite.prepare('SELECT count(*) AS n FROM rate_limits').get().n,0);
  assert.equal((await request('/v1/stats')).data.views,1);
});
test('concurrent reused comment key never returns another user’s private body',async()=>{
  const {request}=setup(),headers={'Idempotency-Key':crypto.randomUUID()};
  const [alice,bob]=await Promise.all([token('alice'),token('bob')]);
  const results=await Promise.all([
    request('/v1/comments',{method:'POST',bearer:alice,headers,body:{target:'guestbook',body:'Alice private pending message'}}),
    request('/v1/comments',{method:'POST',bearer:bob,headers,body:{target:'guestbook',body:'Bob private pending message'}}),
  ]);
  assert.deepEqual(results.map(result=>result.status).sort(),[200,409]);
  for(let i=0;i<results.length;i++) if(results[i].status===200) assert.equal(results[i].data.comment.body,i===0?'Alice private pending message':'Bob private pending message');
});
test('concurrent post creates resolve idempotency and slug collisions without 500',async()=>{
  const {request}=setup(),bearer=await token('owner'),headers={'Idempotency-Key':crypto.randomUUID()};
  const matching=await Promise.all([0,1].map(()=>request('/v1/admin/posts',{method:'POST',bearer,headers,body:post})));
  assert.deepEqual(matching.map(result=>result.status),[200,200]); assert.equal(matching[0].data.post.id,matching[1].data.post.id);
  const sameKey={'Idempotency-Key':crypto.randomUUID()};
  const conflicting=await Promise.all(['left','right'].map(slug=>request('/v1/admin/posts',{method:'POST',bearer,headers:sameKey,body:{...post,slug}})));
  assert.deepEqual(conflicting.map(result=>result.status).sort(),[200,409]);
  const sameSlug=await Promise.all([0,1].map(()=>request('/v1/admin/posts',{method:'POST',bearer,body:{...post,slug:'collision'}})));
  assert.deepEqual(sameSlug.map(result=>result.status).sort(),[200,409]);
});
test('drafts and historical renamed targets hide approved comments, reactions and stats',async()=>{
  const {request}=setup(),bearer=await token('owner'),visitor=await token();
  const created=await request('/v1/admin/posts',{method:'POST',bearer,body:{...post,status:'published'}});
  const comment=await request('/v1/comments',{method:'POST',bearer:visitor,body:{target:'post:hello',body:'Public comment'}});
  await request(`/v1/admin/comments/${comment.data.comment.id}`,{method:'PATCH',bearer,body:{status:'approved'}});
  await request('/v1/reactions',{method:'PUT',bearer:visitor,body:{target:'post:hello',liked:true}});
  assert.equal((await request('/v1/comments?target=post:hello')).data.comments.length,1);
  const draft=await request(`/v1/admin/posts/${created.data.post.id}`,{method:'PATCH',bearer,body:{status:'draft',updatedAt:created.data.post.updatedAt}});
  assert.equal(draft.status,200);
  for(const path of ['/v1/comments?target=post:hello','/v1/reactions?target=post:hello']) assert.equal((await request(path)).status,404);
  assert.equal((await request('/v1/comments',{method:'POST',bearer:visitor,body:{target:'post:hello',body:'Probe'}})).status,404);
  assert.equal((await request('/v1/stats')).data.comments,0); assert.equal((await request('/v1/stats')).data.likes,0);
  const renamed=await request(`/v1/admin/posts/${created.data.post.id}`,{method:'PATCH',bearer,body:{slug:'new-slug',status:'published',updatedAt:draft.data.post.updatedAt}}); assert.equal(renamed.status,200);
  assert.equal((await request('/v1/comments?target=post:hello')).status,404);
  assert.equal((await request('/v1/admin/posts',{method:'POST',bearer,body:post})).status,409);
  assert.equal((await request('/v1/me',{bearer:visitor})).data.comments.length,1);
});
test('malformed URL encoding returns400 and bad identity never falls back to anonymous',async()=>{
  const {request}=setup(); assert.equal((await request('/v1/posts/%E0%A4%A')).status,400);
  assert.equal((await request('/v1/posts',{bearer:await token('visitor',{exp:0})})).status,401);
  assert.equal((await request('/v1/posts',{headers:{Authorization:'Basic invalid'}})).status,401);
  assert.equal((await request('/v1/posts')).status,200);
});
test('SQLite snapshot restores content, moderation, privacy mapping and aggregate triggers',async()=>{
  const {request,sqlite}=setup(),bearer=await token('owner');
  const created=await request('/v1/admin/posts',{method:'POST',bearer,body:post}); assert.equal(created.status,200);
  const comment=await request('/v1/comments',{method:'POST',bearer,body:{target:'guestbook',body:'Preserve me'}}); assert.equal(comment.status,200);
  await request('/v1/views',{method:'POST',body:{target:'guestbook'}});
  const directory=mkdtempSync(join(tmpdir(),'shirone-backup-')),snapshot=join(directory,'snapshot.sqlite');
  try {
    sqlite.prepare('VACUUM INTO ?').run(snapshot);
    const restored=new DatabaseSync(snapshot);
    try {
      assert.equal(restored.prepare('PRAGMA integrity_check').get().integrity_check,'ok');
      assert.equal(restored.prepare('SELECT body FROM posts').get().body,post.body);
      assert.equal(restored.prepare('SELECT status FROM post_targets').get().status,'draft');
      assert.equal(restored.prepare('SELECT status FROM comments').get().status,'pending');
      assert.equal(restored.prepare('SELECT count FROM view_totals').get().count,1);
      restored.prepare('INSERT INTO view_events(visitor_hash,target,day) VALUES(?,?,?)').run('new-hash','guestbook','2099-01-01');
      assert.equal(restored.prepare('SELECT count FROM view_totals').get().count,2);
    } finally { restored.close(); }
  } finally { rmSync(directory,{recursive:true,force:true}); }
});
test('moderation status filter finds pending entries behind more than20 reviewed comments and paginates',async()=>{
  const {request,sqlite}=setup(),bearer=await token('owner');
  await request('/v1/me',{bearer});
  const insert=sqlite.prepare('INSERT INTO comments(id,user_id,target,body,status,created_at) VALUES(?,?,?,?,?,?)');
  for(let n=0;n<30;n++) insert.run(`pending-${String(n).padStart(2,'0')}`,'owner','guestbook',`Pending ${n}`,'pending','2026-01-01T00:00:00Z');
  for(let n=0;n<30;n++) insert.run(`approved-${n}`,'owner','guestbook',`Approved ${n}`,'approved','2026-02-01T00:00:00Z');
  const firstPage=await request('/v1/admin/comments?status=pending&limit=20',{bearer});
  assert.equal(firstPage.status,200); assert.equal(firstPage.data.comments.length,20); assert.ok(firstPage.data.comments.every(c=>c.status==='pending'));
  assert.deepEqual(firstPage.data.pagination,{limit:20,offset:0,total:30,hasMore:true});
  const secondPage=await request('/v1/admin/comments?status=pending&limit=20&offset=20',{bearer});
  assert.equal(secondPage.data.comments.length,10); assert.equal(secondPage.data.pagination.hasMore,false);
  assert.equal(new Set([...firstPage.data.comments,...secondPage.data.comments].map(c=>c.id)).size,30);
  assert.equal((await request('/v1/admin/comments?status=approved',{bearer})).data.pagination.total,30);
  assert.equal((await request('/v1/admin/comments?status=rejected',{bearer})).data.pagination.total,0);
  assert.equal((await request('/v1/admin/comments',{bearer})).data.pagination.total,60);
  for(const status of ['','draft','pending%27%20OR%201%3D1']) assert.equal((await request(`/v1/admin/comments?status=${status}`,{bearer})).status,400);
  assert.equal((await request('/v1/admin/comments?status=pending',{bearer:await token('visitor')})).status,403);
  const publicPage=await request('/v1/comments?target=guestbook&limit=20&offset=20');
  assert.equal(publicPage.data.comments.length,10); assert.deepEqual(publicPage.data.pagination,{limit:20,offset:20,total:30,hasMore:false});
});
test('own hidden/renamed bookmarks and likes can be removed but never added',async()=>{
  const {request,sqlite}=setup(),owner=await token('owner'),alice=await token('alice'),bob=await token('bob');
  for(const mode of ['unpublish','rename']) {
    const slug=`remove-${mode}`,target=`post:${slug}`;
    const created=await request('/v1/admin/posts',{method:'POST',bearer:owner,body:{...post,slug,status:'published'}});
    for(const bearer of [alice,bob]) for(const [path,key] of [['bookmarks','saved'],['reactions','liked']]) assert.equal((await request(`/v1/${path}`,{method:'PUT',bearer,body:{target,[key]:true}})).status,200);
    assert.equal((await request(`/v1/admin/posts/${created.data.post.id}`,{method:'PATCH',bearer:owner,body:{...(mode==='rename'?{slug:`renamed-${slug}`}:{status:'draft'}),updatedAt:created.data.post.updatedAt}})).status,200);
    for(const [path,key,table] of [['bookmarks','saved','bookmarks'],['reactions','liked','likes']]) {
      assert.equal((await request(`/v1/${path}`,{method:'PUT',bearer:alice,body:{target,[key]:true}})).status,404);
      for(let n=0;n<2;n++) assert.equal((await request(`/v1/${path}`,{method:'PUT',bearer:alice,body:{target,[key]:false}})).status,200);
      assert.equal(sqlite.prepare(`SELECT count(*) AS n FROM ${table} WHERE user_id=? AND target=?`).get('alice',target).n,0);
      assert.equal(sqlite.prepare(`SELECT count(*) AS n FROM ${table} WHERE user_id=? AND target=?`).get('bob',target).n,1);
    }
  }
  assert.equal((await request('/v1/bookmarks',{method:'PUT',bearer:alice,body:{target:'post:../secret',saved:false}})).status,400);
  assert.equal((await request('/v1/bookmarks',{method:'PUT',body:{target:'post:hello',saved:false}})).status,401);
});
test('personal comment and bookmark pagination are independent and user-scoped',async()=>{
  const {request,sqlite}=setup(),bearer=await token('alice'); await request('/v1/me',{bearer}); await request('/v1/me',{bearer:await token('bob')});
  for(const user of ['alice','bob']) for(let n=0;n<35;n++) {
    sqlite.prepare('INSERT INTO comments(id,user_id,target,body,created_at) VALUES(?,?,?,?,?)').run(`${user}-${String(n).padStart(2,'0')}`,user,'guestbook',user,'2026-01-01');
    sqlite.prepare('INSERT INTO bookmarks(user_id,target,created_at) VALUES(?,?,?)').run(user,`post:${String(n).padStart(2,'0')}`,'2026-01-01');
  }
  const firstPage=(await request('/v1/me?limit=20',{bearer})).data;
  const secondPage=(await request('/v1/me?limit=20&commentOffset=20&bookmarkOffset=0',{bearer})).data;
  assert.equal(firstPage.comments.length,20); assert.equal(secondPage.comments.length,15);
  assert.equal(new Set([...firstPage.comments,...secondPage.comments].map(c=>c.id)).size,35);
  assert.ok(secondPage.comments.every(c=>c.body==='alice'));
  assert.deepEqual(secondPage.bookmarks,firstPage.bookmarks);
  assert.deepEqual(secondPage.commentPagination,{limit:20,offset:20,total:35,hasMore:false});
  assert.deepEqual(secondPage.bookmarkPagination,{limit:20,offset:0,total:35,hasMore:true});
  const lastBookmarks=(await request('/v1/me?limit=20&bookmarkOffset=20',{bearer})).data;
  assert.equal(lastBookmarks.bookmarks.length,15); assert.equal(lastBookmarks.bookmarkPagination.hasMore,false);
});
const feedFixture = () => ({version:1,siteUrl:'https://blog.example/',title:'Blog & <friends>',description:'Public summary',language:'zh_CN',author:'Author',posts:[{id:'static-first',title:'Static article',link:'https://blog.example/posts/static-first/',publishedAt:'2026-01-01T00:00:00.000Z',updatedAt:'2026-01-02T00:00:00.000Z',excerpt:'Static public summary'}]});
test('public post pagination and full-text search exclude every draft field and escape SQL wildcards',async()=>{
  const {request,sqlite}=setup();
  const insert=sqlite.prepare('INSERT INTO posts(id,slug,title,excerpt,body,status,published_at,updated_at) VALUES(?,?,?,?,?,?,?,?)');
  for(let n=0;n<30;n++) insert.run(`pub-${n}`,`public-${n}`,`Article ${n}`,'Visible excerpt','Unique正文 needle', 'published','2026-01-01T00:00:00Z','2026-01-01T00:00:00Z');
  insert.run('private','private','Unique正文 PRIVATE','PRIVATE excerpt','needle SECRET','draft',null,'2026-01-01T00:00:00Z');
  const firstPage=(await request('/v1/posts?limit=20')).data,secondPage=(await request('/v1/posts?limit=20&offset=20')).data;
  assert.equal(firstPage.posts.length,20); assert.equal(secondPage.posts.length,10);
  assert.deepEqual(firstPage.pagination,{limit:20,offset:0,total:30,hasMore:true});
  const found=await request('/v1/search?q=Unique正文&limit=25'); assert.equal(found.status,200); assert.equal(found.data.pagination.total,30);
  assert.ok(found.data.posts.every(post=>!('body' in post) && post.status==='published')); assert.ok(!JSON.stringify(found.data).includes('SECRET'));
  assert.equal((await request('/v1/search?q=PRIVATE')).data.pagination.total,0);
  for(const q of ['%','_',"' OR 1=1 --"]) assert.equal((await request(`/v1/search?q=${encodeURIComponent(q)}`)).data.pagination.total,0);
  assert.equal((await request('/v1/search?q=')).status,400); assert.equal((await request(`/v1/search?q=${'a'.repeat(121)}`)).status,400);
});
test('combined RSS and Atom include static and published summaries, escape XML, omit drafts and clear after unpublish',async()=>{
  const {request,env}=setup(feedFixture()); env.PUBLIC_SITE_URL='https://blog.example/'; const bearer=await token('owner');
  const published=(await request('/v1/admin/posts',{method:'POST',bearer,body:{...post,status:'published',title:'Dynamic <title> & friends',excerpt:'<script>alert("x")</script>',body:'NOT_IN_FEED'}})).data.post;
  await request('/v1/admin/posts',{method:'POST',bearer,body:{...post,slug:'secret',title:'DRAFT_SECRET'}});
  for(const format of ['rss','atom']) {
    const result=await request(`/v1/feeds/${format}.xml`);
    assert.equal(result.status,200); assert.match(result.headers.get('Content-Type'),/xml/); assert.equal(result.headers.get('Cache-Control'),'no-store');
    assert.match(result.data,/Static article/); assert.match(result.data,/Dynamic &lt;title&gt; &amp; friends/); assert.match(result.data,format==='rss'?/&amp;lt;script&amp;gt;/:/&lt;script&gt;/);
    assert.ok(!result.data.includes('DRAFT_SECRET')); assert.ok(!result.data.includes('NOT_IN_FEED')); assert.ok(!result.data.includes('<script>'));
    assert.match(result.data,/https:\/\/blog.example\/community\/read\/\?slug=hello/);
    assert.ok(result.data.includes(`urn:uuid:${published.id}`)); assert.ok(result.data.includes(`https://api.example/v1/feeds/${format}.xml`));
  }
  await request(`/v1/admin/posts/${published.id}`,{method:'PATCH',bearer,body:{status:'draft',updatedAt:published.updatedAt}});
  assert.ok(!(await request('/v1/feeds/rss.xml')).data.includes('Dynamic &lt;title&gt;'));
});
test('feeds fail closed without matching trusted public origin and prepared static snapshot',async()=>{
  const missing=setup(null); missing.env.PUBLIC_SITE_URL='https://blog.example/'; assert.equal((await missing.request('/v1/feeds/rss.xml')).status,503);
  const {request,env}=setup(feedFixture());
  for(const value of ['', 'https://evil.example/','https://blog.example/base/','https://user:password@blog.example/','https://blog.example/?private=value']) {
    env.PUBLIC_SITE_URL=value; assert.equal((await request('/v1/feeds/atom.xml')).status,503);
  }
  env.PUBLIC_SITE_URL='https://blog.example/'; assert.equal((await request('/v1/feeds/atom.xml')).status,200);
});
test('static snapshot validator rejects private/body records, hostile links, duplicates and invalid dates',()=>{
  for(const patch of [{draft:true},{isEncrypted:true},{status:'draft'},{body:'secret'},{contentHtml:'secret'},{link:'https://evil.example/'},{publishedAt:'not a date'}]) {
    const value=feedFixture(); Object.assign(value.posts[0],patch); assert.throws(()=>validateStaticFeed(value));
  }
  const duplicate=feedFixture(); duplicate.posts.push({...duplicate.posts[0]}); assert.throws(()=>validateStaticFeed(duplicate));
  assert.equal(validateStaticFeed(feedFixture()).posts.length,1);
});
test('static feed generator is repeatable and invalidates old snapshot on a failed preparation',()=>{
  const directory=mkdtempSync(join(tmpdir(),'shirone-feed-')),input=join(directory,'input.json'),output=join(directory,'snapshot.mjs');
  const script=new URL('../scripts/prepare-static-feed.mjs',import.meta.url);
  try {
    writeFileSync(input,JSON.stringify(feedFixture()));
    const run=()=>spawnSync(process.execPath,[script.pathname,input,output],{encoding:'utf8'});
    assert.equal(run().status,0); const first=readFileSync(output,'utf8'); assert.equal(run().status,0); assert.equal(readFileSync(output,'utf8'),first);
    const invalid=feedFixture(); invalid.posts[0].draft=true; writeFileSync(input,JSON.stringify(invalid));
    assert.equal(run().status,1); assert.match(readFileSync(output,'utf8'),/export default null/); assert.ok(!readFileSync(output,'utf8').includes('Static article'));
  } finally {rmSync(directory,{recursive:true,force:true});}
});
test('RSS descriptions remain text after XML decoding, so HTML images cannot become tracking markup',async()=>{
  const fixture=feedFixture(); fixture.posts[0].excerpt='<img src="https://tracker.example/pixel"> & <b>plain</b>';
  const {request,env}=setup(fixture); env.PUBLIC_SITE_URL='https://blog.example/';
  const result=await request('/v1/feeds/rss.xml'); assert.equal(result.status,200);
  const description=result.data.match(/<item>[\s\S]*?<description>([\s\S]*?)<\/description>/)[1];
  const xmlDecoded=description.replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&apos;',"'").replaceAll('&amp;','&');
  assert.ok(!xmlDecoded.includes('<img')); assert.ok(!xmlDecoded.includes('<b>')); assert.match(xmlDecoded,/&lt;img/);
});
test('explicit build-start invalidation clears a prior snapshot without needing a successful build',()=>{
  const directory=mkdtempSync(join(tmpdir(),'shirone-invalidate-')),output=join(directory,'snapshot.mjs');
  try {
    writeFileSync(output,'export default {previous:true};');
    const result=spawnSync(process.execPath,[new URL('../scripts/prepare-static-feed.mjs',import.meta.url).pathname,'--invalidate',output],{encoding:'utf8'});
    assert.equal(result.status,0); assert.match(readFileSync(output,'utf8'),/export default null/); assert.ok(!readFileSync(output,'utf8').includes('previous:true'));
  } finally {rmSync(directory,{recursive:true,force:true});}
});
