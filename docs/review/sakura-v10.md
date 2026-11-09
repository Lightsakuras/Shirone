# V10: reading polish

## Observed problem
The V9 library is correctly separated into shelves, but long 20-image collections require scrolling back to the top to change pages, and ARK chapter readers only return to the category. The global top progress bar can retain a previous route's position until a new scroll.

## Improvements
- Compact sticky page selector and previous/next page buttons; current page highlighted.
- Explicit resume link, with a visible note that position is stored only in the current browser. No automatic jump, account or server tracking. Per-series keys avoid unrelated story collisions; unavailable storage degrades gracefully.
- Previous/next story cards within the same category preserve editorial order.
- First reader image eager-loaded, subsequent images remain lazy.
- Pause/reduced-motion stops decorative shelf/cover transforms as well as ambient animation. Navigation resets global reading progress.
- Black circular avatar, four categories and published images unchanged.

## Runtime contract
The reader utility owns per-route listeners, cancels animation frame and cleans up on initialization. Swup page-view and Astro page-load reinitialize it; SSR image links and page anchors work with JS disabled. Native select and buttons have localized labels, focus rings and 44px targets. No external dependency or request added.

## QA to run on preview
Direct load and Swup entry, page selection and disabled boundaries, resume after reload, no forced resume, prev/next story and browser Back, blocked local storage, 390/768 CSS widths, reduced motion/pause, audio across routes. Local Playwright may be blocked by the existing execution browser restriction; don't report browser QA as passed without preview verification.
