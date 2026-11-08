# Public-home/search QA fixture (not user content)

This is a local test helper, never imported by `src/` and never copied into `dist/`.
Run `node tests/community/public-fixture.mjs 8791`. It binds only 127.0.0.1.
Use only a temporary QA build with community `apiUrl` pointing at the fixture's reachable preview root. Do not add an issuer/client ID, credentials, or deployed service. Preserve and restore the original API-empty config before the final build and archive. If the browser runs on another machine, localhost is not that browser's API; expose the fixture only through the approved local preview/proxy and use that verified URL.

All 45 test articles visibly begin `[QA FIXTURE]`. Never present their screenshots as the user's actual posts. Entry 0 uses static `hello-world` slug and must be omitted by the home/search duplicate filter. Entry 2 contains HTML-like text and must remain harmless escaped text. The first API page is 20 items, so the initial home list is 19 after that duplicate is removed.

Checks on desktop and 390px mobile:

1. Success: `/` retains static posts and adds online test articles. Load more twice reaches 44 unique online articles. Clicks use `/community/read/?slug=...`.
2. Search for `QA FIXTURE`: combined panel lists online results and allows paging. Search for a local post title separately to verify Pagefind still works. Search for `hello` to exercise the static `hello-world` collision; remote fixture duplicate is excluded.
3. Search for `zzzz-no-fixture-match`: no matching online results. If the local index also has none, show the real no-results status, not fabricated examples.
4. Call `http://127.0.0.1:8791/__fixture/mode?value=offline`, then reload the home or run a new search. The homepage reports online unavailability but preserves static posts. Search still returns any local matches and reports partial availability.
5. Call `/__fixture/mode?value=empty`: homepage shows the honest no-online-posts state. Restore with `value=success`.
6. Type queries rapidly and navigate to another page during loading; old results must not reappear. Verify neither cookies nor bearer tokens are sent to the fixture.
7. Restore the original config, stop the fixture, rebuild. API-empty final home emits no `.community-home` island and search makes zero `/v1/search` requests.

Backend SQLite/cryptographic tests cover actual draft access restrictions. This fixture is deliberately anonymous and is not an authentication simulator.
