import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../../", import.meta.url));
const raw = readFileSync(
	path.join(root, "public/assets/creative/comic-library.json"),
	"utf8",
);
const library = JSON.parse(raw);
const namer = library.categories.find((c) => c.id === "namer");

test("Namer adds an ordered shelf without replacing the 74 existing images", () => {
	assert.ok(namer);
	const other = library.categories.filter((c) => c.id !== "namer");
	assert.deepEqual(
		other.map((c) => c.id),
		["cat-travel", "ark", "daily", "fantasy"],
	);
	assert.equal(
		other.flatMap((c) => c.series.flatMap((s) => s.items)).length,
		74,
	);
	assert.deepEqual(
		namer.series.map((s) => s.id),
		[
			"original",
			...Array.from(
				{ length: 10 },
				(_, i) => `episode-${String(i + 1).padStart(2, "0")}`,
			),
		],
	);
	assert.deepEqual(
		namer.series.map((s) => s.items.length),
		[28, ...Array(10).fill(12)],
	);
	assert.equal(namer.series.flatMap((s) => s.items).length, 148);
});

test("every final comic asset is unique, local, and numbered in reading order", () => {
	const sources = new Set();
	for (const series of namer.series) {
		series.items.forEach((item, index) => {
			const prefix = `/assets/creative/namer/${series.id}-${String(index + 1).padStart(2, "0")}-`;
			assert.ok(item.src.startsWith(prefix));
			assert.match(item.src, /[a-f0-9]{12}\.webp$/);
			assert.equal(sources.has(item.src), false);
			sources.add(item.src);
			assert.equal(item.width, 1024);
			assert.equal(item.height, 1536);
			assert.ok(existsSync(path.join(root, "public", item.src)));
			if (index === 0)
				assert.ok(existsSync(path.join(root, "public", item.thumb)));
		});
	}
});

test("published data contains no private provenance or unillustrated chapters", () => {
	assert.match(namer.credits, /原创漫画/);
	assert.doesNotMatch(
		JSON.stringify(namer),
		/libfile_|\/workspace\/|agent_notes|ledger|<script|episode-(?:1[1-9]|20)|未完成剧本/,
	);
	assert.match(namer.description, /148 页/);
	assert.match(namer.description, /第 1–10 话，连载中/);
});
