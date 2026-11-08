# Optional community API

A separate Cloudflare Worker and D1 database for Shirone's static Cloudflare Pages site. Nothing in this directory changes the Pages build, provisions resources, deploys, or enables a third-party service. The checked-in configuration is **disabled**. A disabled frontend must not import its community island or make API/identity requests. Backend runtime has no npm dependencies.

## What is implemented

- Verified RS256 OIDC access tokens, exact issuer/audience, cached pinned JWKS, expiry and not-before checks. Bearer authentication only; no cookies or browser-stored admin secret.
- Owner-only draft creation/editing/publication, optimistic editing locks, public published-only readers, paginated public summaries, and server-side full-text substring search.
- Visitor display name/bio, private bookmarks and comment history, idempotent likes/bookmarks.
- Pending-by-default comments and guestbook messages; owner moderation; self/owner deletion.
- Aggregate views, likes, approved comments and published posts. One approximate view per IP/day/target, no raw IP storage, daily salted hashes, DNT/GPC opt-out, scheduled short-retention cleanup.
- Exact CORS allowlist, bounded streamed request bodies, strict field validation, parameterized SQL, durable 60-request/minute/IP throttle, no-store responses and generic unexpected errors.

**Not deployed or production-tested.** Tests run the actual SQL against SQLite and actual WebCrypto signatures using a local D1 adapter. They do not exercise Cloudflare's edge, D1 limits, a real identity tenant, or the browser identity redirect. Those require a staging deployment and explicit authorization. Existing static Markdown remains independent and unchanged.

## Setup, only after approval

1. Use a Cloudflare account and an OIDC identity provider that issues **RS256 JWT access tokens for a custom API audience** and supports public SPA Authorization Code + PKCE. Configure a public client, exact callback/logout URLs and allowed web origins. Do not use client secrets in the frontend. ID tokens are not accepted as API tokens unless someone incorrectly configures their audience: use a distinct API audience.
2. Create a **staging** D1 database. Uncomment the `d1_databases` binding in `wrangler.toml`, fill its real database ID, and keep `migrations_dir = "migrations"`. Use a reviewed, locked Wrangler v4 installation. No production database ID or credentials belong in the repository.
3. Set Worker variables:
   - `ENABLED="true"` only when ready.
   - `ALLOWED_ORIGINS`: comma-separated exact site origins, e.g. `https://blog.example`. No paths, trailing slashes or wildcard. Local testing permits `http://localhost:4321`.
   - `OIDC_ISSUER`: exact `iss` from the provider (including its trailing slash if any).
   - `OIDC_AUDIENCE`: dedicated API resource audience.
   - `OIDC_JWKS_URL`: the provider's trusted HTTPS JWKS endpoint. This is operator configuration, never derived from incoming token headers.
   - `PUBLIC_SITE_URL`: canonical frontend root, including its base path and trailing slash; must exactly match the built public static-feed snapshot and have its origin in `ALLOWED_ORIGINS`. Missing or mismatching values disable combined feeds with503, without changing other API routes.
   - `OWNER_SUBJECTS`: comma-separated immutable OIDC `sub` values authorized to manage the blog. Only server configuration grants ownership; profile names, emails and token roles cannot grant it. Keep access to Worker configuration restricted.
   - Secret `RATE_LIMIT_SALT`: random value at least 32 characters, configured through `wrangler secret put RATE_LIMIT_SALT` or the provider's secure settings. Never commit it.
4. Apply `wrangler d1 migrations apply <database-name> --local` for local testing; use `--remote` only after approval for the intended staging/production database. `wrangler dev` uses local bindings. A real trusted identity provider still needs configuration; there is deliberately no dev auth bypass.
5. Configure an API custom domain/Worker route and deploy only after approval. `workers_dev=false` avoids unintentionally exposing a public preview. Verify `/health` returns `{"configured":true}`. This means variables are structurally valid, **not** that the database migration or identity provider has been health-checked.
6. Configure the frontend with the public API URL, issuer, SPA client ID, scope and custom API audience. Use a maintained OIDC client, Authorization Code + PKCE, state/nonce validation, and memory/session token storage. API calls use `Authorization: Bearer <access_token>`, not cookies. Never embed provider management keys, refresh-token secrets, or Worker salt.
7. Test sign-in/logout, owner and visitor separation, moderation, drafts, repeated actions, navigation cancellation, keyboard use, and offline states on staging. Review privacy notice and retention before enabling optional view counting. Then obtain approval before publishing.

The environment must fail closed if any mandatory setting is missing: all API routes return `503 not_configured`; `/health` remains readable. Only operators can create owner access. Revoking a user's session at the identity provider does not revoke already issued tokens instantly: use short-lived access tokens and remove owner subjects from Worker configuration for urgent owner revocation. JWKS is cached for up to five minutes; rotate keys with overlap. Invalid/unknown keys fail closed. There is no email-password database or password reset handler here.

## HTTP contract

JSON responses; errors are `{ "error": { "code": "...", "message": "..." } }`. Translate `code` in the UI rather than displaying server messages as HTML. Expected codes/status include `not_configured` (503), `unauthorized` (401), `forbidden` (403), `invalid_input` (400), `not_found` (404), `version_required` (428), `version_conflict`/`slug_exists`/`idempotency_conflict` (409), `rate_limited` (429). 429 has `Retry-After: 60`.

All mutation payloads require `Content-Type: application/json`, maximum 128 KiB including JSON overhead. Unknown fields are rejected. No DELETE posts endpoint: unpublish to a draft instead. Body is Markdown **source**, never pre-trusted HTML. Render as text or sanitize Markdown output with raw HTML disabled. Display names, biographies, excerpts and comments are plain text.

List routes support `limit` (1–25, default20) and `offset` (0–100000). Owner post list returns at most **2** full posts per page to bound response size; the frontend must paginate. Public post list returns summaries without body. `/me` independently pages comments and bookmarks with `commentOffset` and `bookmarkOffset` (default0), and the shared `limit` (default20, max25). It returns `commentPagination` and `bookmarkPagination`. Public comments and admin comments return `pagination`. Each metadata object is `{limit,offset,total,hasMore}`. Counts reflect live data rather than a frozen snapshot; refetch after moderation/deletion and step back if the current page becomes empty. No unbounded personal export is provided.

- `GET /health` → `{configured}`.
- `GET /v1/posts` → `{posts:[{id,slug,title,excerpt,status,publishedAt,updatedAt}],pagination:{limit,offset,total,hasMore}}`; published only, newest first.
- `GET /v1/search?q=...&limit=20&offset=0` → the same summary/pagination shape. Searches published titles, excerpts and Markdown source bodies; never returns the body. `q` is required, 1–120 characters; SQL wildcard characters are literal. This is bounded substring search, not ranked/stemmed FTS.
- `GET /v1/feeds/rss.xml` / `GET /v1/feeds/atom.xml` → XML containing the newest25 combined public static and online entries. Static drafts/encrypted posts and online drafts are excluded. Feeds use plain-text escaped summaries, not full article bodies. No arbitrary remote URL is fetched. Missing/invalid prepared static snapshot or site URL returns503 `feed_not_configured`.
- `GET /v1/posts/:slug` → `{post}` with additional `body`; drafts return404 even to owners.
- `GET /v1/admin/posts` → `{posts}` including drafts and bodies; owner only.
- `GET /v1/admin/posts/:id` → `{post}`; owner only.
- `POST /v1/admin/posts` → `{post}`. Fields `title` (1–180), `slug` (lowercase ASCII letters/digits/hyphens, max160), `excerpt` (max500, default empty), `body` (1–100000 chars), `status` (`draft` default or `published`). Owner only.
- `PATCH /v1/admin/posts/:id` → `{post}`. Same editable fields, plus **required `updatedAt`** from the last fetch. Only provided fields change. On409 refetch and let the owner reconcile; never auto-overwrite. Unpublish sets `publishedAt=null`.
- `GET /v1/me?commentOffset=0&bookmarkOffset=0&limit=20` / `PATCH /v1/me` → `{user:{id,displayName,bio,isOwner},bookmarks:[{target,createdAt}],comments:[{id,target,body,status,createdAt}]}`. Login required; PATCH accepts `displayName` (1–60), `bio` (max500). The `id` is the current user's subject, not exposed publicly.
- `GET /v1/comments?target=...` → `{comments:[{id,target,body,displayName,createdAt}]}`; approved only, newest first.
- `POST /v1/comments` with `{target,body}` (1–4000) → `{comment:{id,target,body,status,createdAt}}`; login required, status always pending initially.
- `DELETE /v1/comments/:id` → `{ok:true}`; self or owner only. Foreign/missing IDs produce the same success without deletion to avoid existence leaks.
- `GET /v1/admin/comments?status=pending&limit=20&offset=0` → `{comments,pagination}` including each comment's `status`; owner only, newest first. `status` is optional: omit for all, or use exactly `pending`, `approved`, or `rejected`. Invalid/empty status returns400 `invalid_status`. The moderation UI should explicitly request `pending` so a reviewed page cannot hide older submissions.
- `PATCH /v1/admin/comments/:id` with `{status:"approved"|"rejected"}` → `{ok:true}`; owner only.
- `GET /v1/reactions?target=...` → `{likes,liked,bookmarked}`. Anonymous booleans are false.
- `PUT /v1/reactions` with `{target,liked:boolean}` → `{ok:true}`; login required. `liked:false` removes only the caller's record even after unpublication/rename.
- `PUT /v1/bookmarks` with `{target,saved:boolean}` → `{ok:true}`; login required. `saved:false` removes only the caller's record even after unpublication/rename.
- `POST /v1/views` with `{target}` → `{ok:true,counted:boolean}`; no login needed. Call only when view counting is enabled/appropriate for the site's privacy policy; do not auto-retry or poll. `counted` is false for duplicate daily views or DNT/GPC opt-out.
- `GET /v1/stats` → `{views,likes,comments,posts}`. Posts counts only API-published posts, **not** static Markdown posts; views are approximate and not unique people.

Targets are `guestbook` or `post:<slug>` (Unicode letters/digits, slash, underscore and hyphen; normalized NFC, max180 total). Targets intentionally support existing static posts without requiring an import; the API cannot verify the existence of static routes. Don't treat reaction/view counts as fraud-resistant or financial metrics. Targets owned by an API draft return404 from public comments/reactions and reject new interactions. Removal of an existing own like/bookmark still works, validates target syntax, and is idempotent. Unpublishing hides associated comments and excludes its interactions from public aggregate counts. Renaming retains the old target as a private tombstone, so comments cannot reappear at an abandoned slug. Historical slugs remain reserved to that original post; the owner may reuse them on that post but not create a different post with the same slug. Static routes unknown to D1 remain supported. A draft slug must therefore not collide with a live static article slug. Owners can still moderate hidden comments, and visitors can see their own comment history.

Use an optional `Idempotency-Key` UUIDv4 header on POST comments/posts. Generate a new key for a new submission and reuse it for an uncertain retry of **the same** submission. Conflicting payloads/users return409. PUT likes/bookmarks are naturally idempotent. Do not automatically retry non-idempotent POST without a key. Posts are edited with optimistic `updatedAt` preconditions.

## Operations and privacy

Daily cron removes expired rate windows and visitor hashes older than two days; aggregate totals persist. No raw IP, user-agent or email is stored. Profiles/comments/bookmarks persist until an authorized maintenance operation removes them; document the intended retention and deletion request procedure before launch. Do not enable request/body logging that captures access tokens or comment content. Cloudflare/provider infrastructure may independently process network data under its own terms.

Use separate staging/production databases, origins, identity clients and secrets. Export/backup D1 before migrations and verify restoration separately. Cloudflare limits, billing, alerting, Turnstile/WAF and stronger per-account abuse controls should be reviewed before exposing a high-traffic public service. The lightweight API throttles by Cloudflare-provided client IP (shared fallback only for local testing), not a user-controlled application header. Never put an untrusted reverse proxy in front that forges that header.

Online posts live in D1. The frontend integration uses the public summary API for its runtime homepage and the public search API alongside the existing static Pagefind results. Combined RSS/Atom merge a built public-static summary manifest with currently published D1 posts. This does **not** generate static HTML pages, add online content to the Pagefind binary index or static sitemap, or save online posts into Git Markdown backups. Runtime search supplies the dynamic half instead. No build webhook or provider-management secret is needed.

### Static + dynamic feed release pipeline

1. A successful static build emits `dist/community-static-feed.json`. The endpoint explicitly excludes drafts even in development and excludes encrypted articles. Only public summaries and canonical links are emitted, never Markdown/HTML bodies.
2. Run `node backend/scripts/prepare-static-feed.mjs` (included at the end of the root build). It reads that file, validates its schema, same-origin/base links, dates and size, then generates `backend/src/static-feed.mjs`. Optional first argument selects the input; optional second argument is an output path for isolated tests. Preparation first invalidates the output; failure exits1 with a null snapshot, so failed preparation cannot leave an old snapshot deployable.
3. The root build also prepares Pages feed redirects via `scripts/community/feed-redirects.mjs`. When the API is configured, exact existing `/rss.xml` and `/atom.xml` subscription paths (including a configured base path) redirect to the combined API feeds. Existing unrelated rules must be preserved and conflicts rejected. With no API configured, retain the normal static feeds. Verify the resulting `_redirects` before deployment.
4. Deploy Worker and Pages only after approval, from the **same successful release build**. This keeps static summaries, article routes and privacy changes synchronized. The Worker cannot discover static source changes by itself: rebuild and redeploy it whenever a static article changes visibility, title, summary or URL. Do not deploy a stale Worker snapshot after a failed/partial site build.
5. On staging verify old subscription URLs follow the redirect, the merged feed contains one static and one published online fixture, and draft/unpublish/rename removes online entries. Public responses are `no-store`; third-party readers may retain previously public articles, which cannot be retroactively recalled.

Feed self-links name the actual API request endpoint; article links are pinned to `PUBLIC_SITE_URL`. Static entries retain canonical URL IDs; online entries use immutable post UUIDs, preventing rename from creating duplicate feed identities. A malformed manifest is rejected, rather than silently advertising a dynamic-only feed as complete.

### Minimal identity configuration (recommended: Auth0)

Auth0 fits the current client without an adapter: it supports public SPA Authorization Code + PKCE and custom-API RS256 JWT access tokens with an `audience` authorization parameter. Use a public Single Page Application and a separate custom API identifier, not the Management API or the SPA client ID as API audience. Choose RS256, authorize this SPA for the API user flow, and apply the provider's recommended RBAC/access policy. The Worker still independently enforces its exact owner-subject allowlist and record ownership; it does not trust client role metadata.

Set issuer to the tenant's exact HTTPS issuer (usually ending `/`), JWKS to its verified discovery `jwks_uri`, and use the same custom API identifier in Worker `OIDC_AUDIENCE` and frontend `auth.audience`. Set allowed callback to the exact site/base `auth/callback/`, web origin to the site's origin, and logout URL to site/base `community/`. Scope is `openid profile`; no refresh-token/offline-access or Management API credentials are needed by this implementation. Use the provider's hosted login. Confirm the owner's immutable `sub` after the intended owner logs in; never make the first arbitrary registrant an owner.

Official references checked 2026-11-07:
- [Auth0 API registration and RS256](https://auth0.com/docs/get-started/auth0-overview/set-up-apis)
- [Public-client PKCE flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-pkce)
- [Auth0 pricing](https://auth0.com/pricing): the public B2C Free page currently lists up to25,000 monthly active users and no card for signup. Custom domains require card verification; avoid that optional feature initially. Higher limits/features and plan upgrades can cost extra. These figures do not promise this site's total cost or establish that the user has an account.

Cloudflare account, selected identity tenant/client, permitted owner identity, deploy target and budget still need confirmation. No account existence or paid-plan enrollment is assumed. Access to the intended Cloudflare and Auth0 accounts has not been verified. Use credentials scoped to this project only.

### Minimum approved live actions

- Select the user's intended Cloudflare account and stage target; create one named D1 database, bind it as `DB` with its real `database_id` and `migrations_dir="migrations"`, and apply `0001_community.sql` through `wrangler d1 migrations apply <explicit-database-name> --remote`. Local migration/testing is not evidence of remote schema readiness.
- Create/configure the intended Auth0 tenant (only if needed), public SPA, custom API and login connection under the user's chosen account; authorize only the intended application/user flow. No client secret should be copied into this frontend.
- Generate/configure the Worker-only random `RATE_LIMIT_SALT`; fill the public issuer/JWKS/audience/origin/site variables and the explicit owner subject. Configure any deployment credential through approved secure storage with the smallest useful account/resource scope, not an unrestricted account-admin key.
- Authorize the chosen Worker exposure (a workers.dev endpoint is sufficient if deliberately enabled, or an approved custom domain), then Worker and Pages deployment. Current `workers_dev=false` plus no route is intentionally not a usable public endpoint. Enabling one is a deployment decision, not an automatic local build step.
- Confirm any paid subscription/upgrade and its budget separately. Test actual sign-in, owner/visitor permissions, D1 writes, combined subscriptions, homepage/search discovery and remote backup recovery before production acceptance.

## Local verification

From `backend/`, Node22.13+ (Node24 recommended):

```sh
node --test test/*.test.mjs
```

No dependency installation, credentials, network, deployment or production writes are needed for the test suite. Fixtures simulate D1 using SQLite and stub only the trusted JWKS HTTP response; auth uses real RSA signatures. The suite also makes an actual SQLite `VACUUM INTO` snapshot, reopens it, checks integrity and restored privacy/moderation/content, and verifies restored view triggers. This tests the local schema backup/restore path, not Cloudflare D1 export/import or disaster recovery, which still needs staging verification. Run the site's separate Astro/build/UI checks from the repository root for frontend changes.
