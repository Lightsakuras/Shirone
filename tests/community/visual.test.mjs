import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { compile } from "svelte/compiler";

const island = await readFile(
	new URL(
		"../../src/components/organisms/community/CommunityIsland.astro",
		import.meta.url,
	),
	"utf8",
);
const app = await readFile(
	new URL(
		"../../src/components/organisms/community/CommunityApp.svelte",
		import.meta.url,
	),
	"utf8",
);
const css = island.split("const css = `")[1].split("`;", 1)[0];

test("all four community compositions inherit semantic colors", () => {
	for (const style of ["sakura", "journal", "atelier", "starlit"])
		assert.ok(css.includes(`html[data-visual-style="${style}"]`), style);
	assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|\b(?:rgb|hsl|oklch)\(/i);
	assert.match(css, /var\(--primary-container\)/);
	assert.match(css, /var\(--on-primary-container\)/);
});
test("studio columns follow available container width instead of viewport width", () => {
	assert.match(css, /container-type:inline-size/);
	assert.match(css, /@container\(min-width:46rem\)/);
	assert.doesNotMatch(css, /@media\(min-width:1100px\)/);
	assert.match(css, /overflow-wrap:anywhere/);
	assert.match(css, /min-height:48px/);
});
test("community has SSR page headings, active navigation semantics and safe hydration", () => {
	assert.match(app, /class="community-heading"/);
	assert.match(app, /aria-current=/);
	assert.match(app, /data-community-mode=\{mode\}/);
	assert.match(app, /communityUnconfigured/);
	assert.match(app, /disabled=\{busy \|\| !canPublish/);
	const result = compile(app, {
		filename: "CommunityApp.svelte",
		generate: "server",
	});
	assert.deepEqual(result.warnings, []);
});
test("community theme styling stays optional and inline", () => {
	assert.match(island, /<style is:inline set:html=\{css\}>/);
	assert.doesNotMatch(island, /<style(?:\s+[^>]*?)?>\s*\.community/);
});
