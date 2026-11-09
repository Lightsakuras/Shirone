# Sakura V9: story shelves and expressive UI

- The profile image is intentionally a pure black disk, per the owner's explicit direction; fixed `#000` is a content exception. No hover icon or image remains.
- Story hierarchy: category → series → reader. Four worlds: cat travel (including cat café), ARK, everyday life (including pudding), other-world adventure. 74 current images, historical correction duplicates excluded. Cat café uses the latest revision, not a claim of owner final approval.
- Dynamic light ribbons, subtle pointer glow on fine pointers, reading progress and progressive entry effects. Content is never hidden awaiting JS. Pause/reduced-motion suppress decorative movement; hidden tabs pause ambient layers.
- Images are lazy loaded only on the specific reader route; indexes load covers rather than all original pages.

Validation: Astro check; 52 static routes built; documented type-check exceptions only; dependency manifest; 9 palette unit tests. Playwright attempted but configured webServer fails to start in current execution sandbox. Preview CUA validation required before publishing: all four categories, café and pudding readers, Back navigation, dark/light, CSS widths 390/768, avatar disk, pause toggle, reduced motion, existing audio persistence.
