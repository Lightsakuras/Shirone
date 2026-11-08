# Visual compositions

`siteConfig.visualStyle` enables four locally switchable compositions. The original
Sakura layout remains available; three independent home compositions use the
existing Astro content and routing rather than changing the content model.

```ts
visualStyle: { enable: true, defaultMode: "journal" }
```

- `sakura`: the original illustration-led theme and its existing controls.
- `journal`: a text-first editorial masthead, real article stream and supporting
  author/section rail. Hierarchy comes from typography, a margin dot and rules.
- `atelier`: a studio spread pairing real identity copy with an original code-native
  geometric study, followed by a short chronological article line. A bounded,
  horizontal author panel sits below the writing.
- `starlit`: an image plane followed by a separate title and narrow narrative
  column. Supporting information follows rather than competes with the essay.

`EditorialHome.astro` renders actual configured identity, introduction, public
article count and archive/about links. Atelier uses an original token-colored SVG geometric study; Starlit retains
existing decorative site artwork. Neither is claimed as the author's portfolio work. No posts, projects, metrics or credentials are
invented. All new home content lives inside the Swup replacement region.

New styles do not use the legacy banner stage. Article, archive and community
routes start compactly below navigation; the homepage introduction only exists on
the homepage. On mobile, studio spreads become one column and author information
follows reading content. Avatars remain 96–112 CSS pixels rather than growing with
widget width. The shared outer footer follows all supporting content, avoiding a
large footer interval before the author panel.

All four support the visitor's existing light/dark palette. The feature does not
write palette, texture, wallpaper or article-list preferences. Opaque reading
planes keep global decoration out from behind text. Choosing no wallpaper also
hides the new home art. Existing preferences are still there on return to Sakura.

Omitting `visualStyle` or setting `enable: false` removes the picker, optional
head CSS/runtime, and editorial home component. CSS/runtime use conditional raw
imports to avoid Astro's shared-bundle hoisting. No fonts, dependencies or external
services were added. Artwork uses the existing configured asset resolver.

The head script validates `shirone-visual-style`, restores it before paint, handles
unavailable localStorage, and delegates interactions through Swup navigation.
Site default clears only this feature's setting.

## Validation

`tests/site/visual-styles.spec.ts` covers persistence, independent preferences,
Escape focus restoration, navigation/reset, mobile reflow, real composition
geometry, bounded portraits and compact non-home routes. Run with the site
accessibility suite. Screenshot review should include 320/390px and desktop,
light/dark, each mode, and home → article → archive → home navigation.

The prior design files are preserved under `backups/design-v1/` for local review.

## V3: companion palettes and restrained interactions

The picker now offers **Design colors / My colors** independently of composition.
The `shirone-visual-color` key stores only this choice. On first adoption, visitors
with saved hue/style/spec values keep their own colors; visitors without them get
design colors. This decision is saved before the existing settings island writes
its default values. Existing hue, theme, style, spec and texture values are never
replaced. Editing the original hue/style/spec controls automatically selects My
colors so that the control still does what the visitor expects. Dark/light mode
always follows the original control and OS choice. Sakura always retains its
original color system, as stated beside the new controls.

`visual-style-palettes.ts` generates paired HCT roles at build time with the
existing Material engine. Journal combines warm neutral paper and rust accents;
Atelier combines neutral paper, ultramarine and a warm tertiary plane; Starlit
uses cool neutral surfaces and cyan accents. Light and dark schemes are separate.
The output only matches `data-visual-color="curated"`; `--mc-*` values remain owned
by the personal theme engine. Navbar and popup tokens use the companion roles
when present and fall back to the original engine otherwise. There is no client
color-generation dependency added by this feature.

Local effects use existing duration/easing tokens: link underlines reveal on
hover/focus, their arrows move two pixels, and the Starlit image scales 1.015 only
with a fine hover pointer. There is no perpetual animation, parallax, global
filter, backdrop blur or JavaScript visibility gate. Both OS reduced motion and
Shirone's `motion-reduced` class remove added movement; focus indicators remain.

Run `node --test tests/unit/visual-style-palettes.test.mjs` to validate 42 actual
HCT text-role pairs at 4.5:1 plus gating/ownership. This numeric test supplements,
not replaces, the browser accessibility check. The site suite also covers palette
persistence, original-color recovery and both reduced-motion switches. Review
all modes in light/dark, change hue while Design colors is selected, navigate
through Swup, reload, and check a narrow mobile popup for clipping.

V2 touched files were preserved under `backups/design-v2/` before this revision.

The build-time Material import is bundled for Astro's `ssr`, `astro` and
`prerender` Vite environments via the shared integration configuration. This is
needed because Material 0.4's extensionless internal ESM imports cannot be loaded
directly by Node during static prerender. Both repository and npm-package modes
use this configuration; no dependency files are patched.

Run `node --test tests/features/visual-style-runtime.test.mjs` for dependency-free
runtime regression checks: stored choices, reset, existing palette adoption,
blocked storage, cross-tab updates, Swup re-entry, and automatic return to personal
colors after editing hue/style/spec (but not after changing light/dark).

## V4: visible color planes and requested flowing light

Design colors now occupy larger areas: Journal's paired primary masthead and
warm page canvas, Atelier's blue canvas/title and warm/blue geometric planes,
and Starlit's cyan picture surround and tonal identity panel. Article body
surfaces remain quiet. The homepage shows the active color direction explicitly;
existing personal choices still take precedence and are never overwritten.

A clipped, text-free light edge uses a static gradient translated by CSS, with
one moving layer and no blur, canvas, animated gradients or frame loop. Journal uses its masthead’s bottom rule, Atelier its geometric artwork’s left
edge, and Starlit its picture frame’s bottom edge. No separate light panel takes
space in the layout. The
10-second desktop cycle slows to 14 seconds on mobile. A visible 48px “Reduce
motion” pill beside the homepage index pauses motion and persists independently in
`shirone-visual-motion`. OS and site reduced-motion always win. Offscreen light
and background tabs pause through IntersectionObserver and visibility events.
The effect is decorative, aria-hidden, and remains a static colored detail when
motion is disabled. Sakura retains the original design.

Identity entrance starts at 85% opacity with only 8px travel, and fine-pointer
article hover lifts 3px. Existing Swup transitions are reused, not intercepted;
pausing also disables these transitions and entry movement. No content depends
on animation or JavaScript to become readable. Site regression tests inspect
actual computed animation, successive transforms, persisted pause and OS stop.
V3 originals of touched existing design files are in `backups/design-v3/`.

## V5: genuine QQ playlists instead of geometric decoration

Atelier's standalone geometric SVG is removed. Its second column accepts the
shared music feature's genuine public QQ playlist cover, title, selection and
link to open the official player. Cover sizing is 240px on the Atelier desktop spread and compact 64px on narrow mobile,
with compact 64px Journal and 72px Starlit rows. The current phase does not claim
in-site playback: QQ playback is login-gated. There is no invented album cover,
fake track/progress or sample music fallback. User-supplied artwork can be added
later; playlist covers are labeled truthfully by the component.

Sakura retains its previous hero and exposes the same compact playlist card
above the article list, without duplicating the component. Palette and reduced-motion preferences
remain intact. Decorative flow is independent UI motion, not music playback
feedback. Journal's masthead rule, Atelier's identity margin and Starlit's picture
frame animate while the QQ chooser truthfully remains not playing. Explicit
pause, OS/site reduced motion, background tabs and offscreen rules still stop
motion. No geometry illustration or synthetic cover is reintroduced.
Turning the QQ feature off removes its DOM and
bundle through the shared virtual module; Atelier collapses its unused column.
Wallpaper hiding does not hide functional playlist controls. The restored V4
visual originals are backed up in `backups/design-v4/`.

The pre-decoupling V5 files are saved in `backups/design-v5-playlist/`.
The visual regression test now requires visible motion with `data-playing=false`
rather than manufacturing a playing attribute.
