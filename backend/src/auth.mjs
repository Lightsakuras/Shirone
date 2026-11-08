const cache = new Map();
export class ApiError extends Error {
  constructor(status, code, message = code) { super(message); this.status = status; this.code = code; }
}
const unauthorized = () => new ApiError(401, 'unauthorized');
function decode(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw unauthorized();
  return Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
}
export async function authenticate(request, env) {
  const authorization = request.headers.get('Authorization');
  if (!authorization) return null;
  if (!authorization.startsWith('Bearer ') || authorization.length > 16384) throw unauthorized();
  try {
    const token = authorization.slice(7).split('.');
    if (token.length !== 3) throw unauthorized();
    const header = JSON.parse(new TextDecoder().decode(decode(token[0])));
    const claims = JSON.parse(new TextDecoder().decode(decode(token[1])));
    if (header.alg !== 'RS256' || typeof header.kid !== 'string' || header.crit || header.jku || header.jwk) throw unauthorized();
    const now = Math.floor(Date.now() / 1000);
    if (claims.iss !== env.OIDC_ISSUER || !(Array.isArray(claims.aud) ? claims.aud : [claims.aud]).includes(env.OIDC_AUDIENCE) || typeof claims.sub !== 'string' || !claims.sub || claims.sub.length > 255 || !Number.isFinite(claims.exp) || claims.exp <= now || (claims.nbf !== undefined && (!Number.isFinite(claims.nbf) || claims.nbf > now + 30))) throw unauthorized();
    let entry = cache.get(env.OIDC_JWKS_URL);
    if (!entry || entry.expires < Date.now()) {
      let document;
      try {
        const response = await fetch(env.OIDC_JWKS_URL, { signal: AbortSignal.timeout(5000), redirect: 'error' });
        if (!response.ok || !response.body) throw new Error('JWKS unavailable');
        const reader = response.body.getReader(); const chunks = []; let length = 0;
        while (true) {
          const { value, done } = await reader.read(); if (done) break;
          length += value.byteLength;
          if (length > 65536) { await reader.cancel(); throw new Error('JWKS too large'); }
          chunks.push(value);
        }
        const bytes = new Uint8Array(length); let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        document = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(document.keys) || document.keys.length > 50) throw new Error('Invalid JWKS');
      } catch { throw new ApiError(503, 'identity_unavailable'); }
      entry = { keys: document.keys, expires: Date.now() + 300000 };
      cache.set(env.OIDC_JWKS_URL, entry);
    }
    const jwk = entry.keys.find(key => key.kid === header.kid && key.kty === 'RSA' && (!key.use || key.use === 'sig') && (!key.alg || key.alg === 'RS256'));
    if (!jwk) throw unauthorized();
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    if (!await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, decode(token[2]), new TextEncoder().encode(`${token[0]}.${token[1]}`))) throw unauthorized();
    // Never trust client metadata, email domains, or token role claims for ownership.
    return { id: claims.sub, isOwner: env.OWNER_SUBJECTS.split(',').map(s => s.trim()).filter(Boolean).includes(claims.sub) };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw unauthorized();
  }
}
