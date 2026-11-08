import { ApiError } from './auth.mjs';
const xml = value => String(value ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&apos;');
function text(value, max, required = false) {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error('Invalid feed text');
  return value;
}
export function siteUrl(value) {
  const url = new URL(value);
  if ((url.protocol !== 'https:' && !(url.protocol === 'http:' && url.hostname === 'localhost')) || url.username || url.password || url.search || url.hash || !url.pathname.endsWith('/')) throw new Error('Invalid public site URL');
  return url;
}
const date = value => {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) throw new Error('Invalid feed timestamp');
  return new Date(value).toISOString();
};
/** Strict public-summary contract: never spread incoming records or include HTML/body fields. */
export function validateStaticFeed(value) {
  if (!value || value.version !== 1 || !Array.isArray(value.posts) || value.posts.length > 10000) throw new Error('Static feed snapshot missing or invalid');
  const site = siteUrl(value.siteUrl), seen = new Set();
  const posts = value.posts.map(post => {
    if (!post || post.draft === true || post.isEncrypted === true || post.status === 'draft' || 'body' in post || 'contentHtml' in post) throw new Error('Private or full-content feed record rejected');
    const link = new URL(post.link);
    if (link.origin !== site.origin || !link.pathname.startsWith(site.pathname) || link.username || link.password || link.search || link.hash || seen.has(link.href)) throw new Error('Invalid or duplicate static feed link');
    seen.add(link.href);
    return { id:text(post.id,255,true), title:text(post.title,300,true), link:link.href, publishedAt:date(post.publishedAt), updatedAt:date(post.updatedAt), excerpt:text(post.excerpt,1000) };
  });
  return { version:1,siteUrl:site.href,title:text(value.title,300,true),description:text(value.description,1000),language:text(value.language,40,true),author:text(value.author,200,true),posts };
}
export async function feedResponse(env, db, format, snapshot, requestUrl) {
  let manifest, site;
  try {
    manifest = validateStaticFeed(snapshot); site = siteUrl(env.PUBLIC_SITE_URL);
    if (site.href !== manifest.siteUrl || !(env.ALLOWED_ORIGINS || '').split(',').map(s=>s.trim()).includes(site.origin)) throw new Error('Public site mismatch');
  } catch { throw new ApiError(503,'feed_not_configured'); }
  const dynamic = (await db.prepare("SELECT id,slug,title,excerpt,published_at AS publishedAt,updated_at AS updatedAt FROM posts WHERE status='published' ORDER BY published_at DESC,id LIMIT 25").all()).results;
  const items = [
    ...manifest.posts.map(post => ({ ...post, feedId:post.link })),
    ...dynamic.map(post => {
      const link = new URL('community/read/',site); link.searchParams.set('slug',post.slug);
      return { ...post,link:link.href,feedId:`urn:uuid:${post.id}` };
    }),
  ].sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt) || a.feedId.localeCompare(b.feedId)).slice(0,25);
  const updated = new Date(Math.max(0,...items.map(post=>Date.parse(post.updatedAt)))).toISOString();
  // Use the actual feed endpoint for self links; article links remain pinned to PUBLIC_SITE_URL.
  const self = new URL(requestUrl); self.search = ''; self.hash = '';
  const canonical = self.href;
  let body;
  if (format === 'rss') {
    body = `<?xml version="1.0" encoding="utf-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${xml(manifest.title)}</title><link>${xml(site.href)}</link><description>${xml(manifest.description)}</description><language>${xml(manifest.language)}</language><lastBuildDate>${xml(new Date(updated).toUTCString())}</lastBuildDate><atom:link href="${xml(canonical)}" rel="self" type="application/rss+xml"/>${items.map(post=>`<item><title>${xml(post.title)}</title><link>${xml(post.link)}</link><guid isPermaLink="${post.feedId.startsWith('urn:')?'false':'true'}">${xml(post.feedId)}</guid><pubDate>${xml(new Date(post.publishedAt).toUTCString())}</pubDate><description>${xml(xml(post.excerpt))}</description></item>`).join('')}</channel></rss>`;
  } else {
    body = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${xml(manifest.language.replace('_','-'))}"><title>${xml(manifest.title)}</title><subtitle>${xml(manifest.description)}</subtitle><id>${xml(site.href)}</id><updated>${xml(updated)}</updated><link href="${xml(site.href)}" rel="alternate"/><link href="${xml(canonical)}" rel="self" type="application/atom+xml"/><author><name>${xml(manifest.author)}</name></author>${items.map(post=>`<entry><id>${xml(post.feedId)}</id><title>${xml(post.title)}</title><link href="${xml(post.link)}"/><published>${xml(post.publishedAt)}</published><updated>${xml(post.updatedAt)}</updated><summary type="text">${xml(post.excerpt)}</summary></entry>`).join('')}</feed>`;
  }
  return new Response(body,{headers:{'Content-Type':`application/${format === 'rss'?'rss':'atom'}+xml; charset=utf-8`}});
}
