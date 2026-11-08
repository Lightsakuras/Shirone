# Optional community and writing studio

The static journal stays static. The optional community island talks to a separately deployed Cloudflare Worker + D1 service; no Astro SSR server is required. The supplied personal preview enables the UI with an empty API URL. It deliberately cannot publish, sign in, or fabricate account data. Local writing, preview, and Markdown export work without a service.

## Routes

- `/community/`: published online posts and aggregate counts.
- `/community/read/?slug=...`: client-side online article reader; links work on static hosts.
- `/guestbook/`: approved messages and authenticated submissions to moderation.
- `/space/`: your profile, reading list, and your comments.
- `/admin/`: local writing and, after owner authentication, remote drafts/publishing/moderation.
- `/auth/callback/`: authorization-code callback, then a same-origin return to the originating page.

Community pages use a distinct `community` sidebar page identifier. Private utility routes are excluded from the sitemap. Post panels are absent when the API URL is missing/invalid, or the feature is disabled. All style declarations remain inline with the optional island, and the OIDC SDK is imported only when authentication is needed.

## Configure

Edit `src/config/communityConfig.ts`, or override the `community` config domain in external-content mode. `enable: false` turns off routes, navigation, and post panels. `apiUrl` is the Worker root without `/v1`; use HTTPS in production. `http://localhost`/loopback is allowed for local development only.

Authentication uses `oidc-client-ts`, an OIDC public browser client with authorization code + PKCE, issuer/state/nonce processing and sessionStorage state/token storage. Supply `auth.issuer`, `auth.clientId`, `auth.scope`, and optional API `auth.audience`. Never put a client secret, signing key, database binding, or owner secret in this public file. Register the exact site URL plus `/auth/callback/` (including any Astro base path) with the provider. Configure provider CORS for the exact site origin. Worker issuer, audience, CORS origin and owner subject allowlist must agree with the provider and frontend; see `backend/README.md`.

The sign-out control explicitly signs out of this site by removing this tab's local token, not every application at the identity provider. The provider may therefore allow a subsequent sign-in without another password. There is no silent refresh or background polling. Expired tokens require sign-in again.

## Writing and data safety

The editor supports a deliberately limited, safe Markdown preview: headings, paragraphs, fenced code (including blank lines), blockquotes and unordered lists. HTML and unsupported inline syntax remain visible text. Export preserves the full original Markdown for the theme's build-time renderer, rather than executing user HTML in the browser.

“Save draft” saves one private browser draft when the backend is unavailable or the current account is not an owner. The status says exactly where it was saved. Local storage is not a backup and may be cleared by browser settings. Export before changing machines or clearing browser data. Switching stories with unsaved content asks before discarding it. Same-origin links are guarded before Swup handles them: offline work is saved locally, authenticated owner work is saved to account-scoped sessionStorage, and navigation is cancelled if that save fails. Back/Forward saves before Swup handles the history event; on failure, known history indices are restored, with a URL-restoration fallback for unknown history entries. Native unload also attempts a save and warns if it fails. Community links opt out of Swup with `data-no-swup`. Cloud drafts never restore from the generic local draft key; owner recovery waits for an authenticated owner account, and site sign-out clears that account’s session recovery draft and editor memory. Remote saves enforce the Worker revision (`updatedAt`) and report conflicts. Changing a published story back to a draft asks explicitly because it removes public access.

Publish requires a server-validated owner account and an explicit UI confirmation. The backend remains authoritative for ownership and moderation. This feature does not infer owner status from display names or client claims. Comments enter moderation; likes and bookmarks require an authenticated account. Public profile fields and comment bodies are bounded and rendered as escaped text. The moderation queue defaults to pending and offers approved/rejected filters, each with Load more pagination. Public conversation threads, personal comments, and bookmarks also support Load more; the first page is not presented as the complete history.

Each API request has an 8-second abort timeout and a 512 KiB streaming response cap. In-flight GETs are deduplicated per island; unmount and Swup replacement abort requests. POST create/comment attempts reuse a UUID idempotency key for the same payload in the same island session, so a timeout retry does not duplicate the request. No automatic mutation retry is performed. If a PATCH response is uncertain, a later retry can surface a revision conflict: export work, then reload the server copy before overwriting it. No visit cookies, fingerprint, or persistent visitor ID are created; aggregate view events are sent only when `trackViews: true` is explicitly configured and neither Do Not Track nor Global Privacy Control is enabled. `trackViews` defaults to false; displaying real existing statistics does not enable collection.

Static-post reading-list links resolve at build time through the theme's canonical permalink adapter; online articles use the query-based reader. Configured public online posts now appear in a separate, theme-matched section on the first homepage alongside the preserved static journal. Site search combines the local Pagefind index with anonymous server-side published-only search, with separate failures, safe escaped excerpts, pagination, and static-slug deduplication. Remote posts do not enter the build-time Pagefind index, social metadata, or static sitemap; export into the local collection when those build-time outputs are needed. Feed integration is described in the backend guide.

## Validation

- `node --test tests/community/data.test.mjs`: URL allowlist, schema boundaries, safe Markdown block parsing, optional gate and OIDC configuration contract.
- `pnpm exec astro check`: Astro/Svelte/TypeScript checks.
- `pnpm exec playwright test tests/site/community.spec.ts tests/site/a11y.spec.ts`: browser flows, local draft persistence, export, injection escaping, mobile overflow and accessibility. Run against an enabled, API-empty local preview for local-studio tests.
- `cd backend && npm test`: Worker contract, database mutations and cryptographic authentication checks.

Deployment and provider setup are separate actions. This implementation alone does not deploy anything, create an identity provider account, provision a database, or upload personal data.
