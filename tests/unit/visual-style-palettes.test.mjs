import assert from "node:assert/strict";
import test from "node:test";
import { buildSync } from "esbuild";

// Material's upstream ESM has extensionless internal imports; use the same
// bundling resolution as Astro instead of mutating that dependency on disk.
const output = buildSync({
	entryPoints: [
		new URL("../../src/utils/visual-style-palettes.ts", import.meta.url)
			.pathname,
	],
	bundle: true,
	write: false,
	format: "esm",
	platform: "node",
}).outputFiles[0].text;
const { resolveVisualPalette, VISUAL_PALETTE_MODES, buildVisualPaletteStyles } =
	await import(
		`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`
	);

function luminance(hex) {
	const [r, g, b] = hex
		.slice(1)
		.match(/../g)
		.map((v) => Number.parseInt(v, 16) / 255)
		.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
	const x = luminance(a);
	const y = luminance(b);
	return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
const pairs = [
	["onSurface", "surfaceContainerLowest"],
	["onSurfaceVariant", "surfaceContainerLowest"],
	["primary", "surfaceContainerLowest"],
	["onPrimary", "primary"],
	["onPrimaryContainer", "primaryContainer"],
	["onSecondaryContainer", "secondaryContainer"],
	["onTertiaryContainer", "tertiaryContainer"],
];
for (const mode of VISUAL_PALETTE_MODES) {
	for (const dark of [false, true]) {
		test(`${mode} ${dark ? "dark" : "light"}: text role pairs meet 4.5:1`, () => {
			const p = resolveVisualPalette(mode, dark);
			for (const [foreground, background] of pairs) {
				const ratio = contrast(p[foreground], p[background]);
				assert.ok(
					ratio >= 4.5,
					`${foreground}/${background}: ${ratio.toFixed(2)}:1`,
				);
			}
		});
	}
}
test("palette CSS is gated, keeps Sakura and personal engine values untouched", () => {
	const css = buildVisualPaletteStyles();
	assert.ok(css.includes('[data-visual-color="curated"]'));
	assert.ok(!css.includes('data-visual-style="sakura"'));
	assert.ok(!css.includes("--mc-"));
	assert.ok(css.includes("--primary:var(--visual-primary)"));
});

for (const dark of [false, true]) {
	test(`page/support planes retain readable explicit ink (${dark ? "dark" : "light"})`, () => {
		for (const mode of VISUAL_PALETTE_MODES) {
			const palette = resolveVisualPalette(mode, dark);
			// Atelier's canvas has no bare support text: widgets/footer own paper planes.
			const background =
				mode === "atelier" ? "surfaceContainerLowest" : "secondaryContainer";
			for (const foreground of ["onSurface", "onSurfaceVariant", "primary"]) {
				assert.ok(
					contrast(palette[foreground], palette[background]) >= 4.5,
					`${mode} ${foreground}/${background}`,
				);
			}
		}
	});
}
