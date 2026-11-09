# V11: frosted paper and botanical geometry

Requested material-art refinement on top of V10. No content, category or avatar changes.

- Small edition control surfaces gain translucent frosted glass, a quiet inset highlight and soft shadow. The photographic number tags also use small-area frost.
- Static CSS paper grain adds tactile texture to intro and shelf copy, never to the artwork itself. No texture image requests or animated noise filter.
- Reusable content-free flower seal and four-point cut-glass star are integrated into section markers and title panels, hidden from accessibility tree.
- Homepage ornament is low-opacity and behind content. Reader background remains opaque. All paint colors derive from existing semantic tokens; only existing image-overlay tags retain white highlights.
- Phone blur is limited to 6px; no new infinite animation, JS handler or asset fetch is added. No-backdrop-filter and increased-contrast fallbacks are explicit.

Preview QA: inspect all three editions in light/dark, 390/768 widths, title ornaments don't cover text, keyboard focus controls remain visible, motif does not capture input; regression reader navigation/resume and persistent music.
