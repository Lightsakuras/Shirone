/** Build-time companion palettes. No browser engine, preference writes or
 * independent hand-picked foreground/background pairs are introduced. */
import { type McScheme, resolveScheme } from "./mc-utils.ts";

export const VISUAL_PALETTE_MODES = ["journal", "atelier", "starlit"] as const;
export type VisualPaletteMode = (typeof VISUAL_PALETTE_MODES)[number];

const PALETTES: Record<
	VisualPaletteMode,
	{ accent: number; paper: number; tertiary?: number }
> = {
	journal: { accent: 25, paper: 80 },
	atelier: { accent: 265, paper: 265, tertiary: 55 },
	starlit: { accent: 210, paper: 230 },
};

/** Keep contrast-paired roles together when composing accent and paper families. */
export function resolveVisualPalette(
	mode: VisualPaletteMode,
	dark: boolean,
): McScheme {
	const config = PALETTES[mode];
	const palette = {
		...resolveScheme(config.accent, dark, "tonalSpot", "2025"),
	};
	const paper = resolveScheme(config.paper, dark, "neutral", "2025");
	for (const role of Object.keys(palette)) {
		if (
			/^(surface|onSurface|inverseSurface|inverseOnSurface|outline|shadow|scrim)/.test(
				role,
			)
		) {
			palette[role] = paper[role];
		}
	}
	if (config.tertiary !== undefined) {
		const warm = resolveScheme(config.tertiary, dark, "tonalSpot", "2025");
		for (const suffix of ["", "Container", "Fixed", "FixedDim"]) {
			palette[`tertiary${suffix}`] = warm[`primary${suffix}`];
		}
		for (const suffix of ["", "Container", "Fixed", "FixedVariant"]) {
			palette[`onTertiary${suffix}`] = warm[`onPrimary${suffix}`];
		}
	}
	return palette;
}

let cachedStyles: string | undefined;

export function buildVisualPaletteStyles(): string {
	if (cachedStyles !== undefined) return cachedStyles;
	cachedStyles = VISUAL_PALETTE_MODES.flatMap((mode) =>
		[false, true].map((dark) => {
			const declarations = Object.entries(resolveVisualPalette(mode, dark))
				.flatMap(([role, value]) => {
					if (!value) return [];
					const name = role.replace(
						/[A-Z]/g,
						(letter) => `-${letter.toLowerCase()}`,
					);
					return [
						`--visual-${name}:${value};`,
						`--${name}:var(--visual-${name});`,
					];
				})
				.join("");
			return `html[data-visual-style="${mode}"][data-visual-color="curated"]${dark ? ".dark" : ":not(.dark)"}{${declarations}}`;
		}),
	).join("\n");
	return cachedStyles;
}
