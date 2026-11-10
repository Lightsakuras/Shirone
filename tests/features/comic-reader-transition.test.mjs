import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import vm from "node:vm";

const source = stripTypeScriptTypes(
	readFileSync(
		new URL("../../src/utils/comic-reader.ts", import.meta.url),
		"utf8",
	),
);
function fixture(scrollPlugin) {
	const listeners = new Map(),
		classes = new Set(),
		calls = [],
		saved = new Map();
	const target = () => {
		const callbacks = new Map();
		return {
			hidden: true,
			disabled: false,
			value: "1",
			href: "",
			addEventListener: (type, fn) => callbacks.set(type, fn),
			removeEventListener: (type) => callbacks.delete(type),
			dispatch: (type) => callbacks.get(type)?.(),
		};
	};
	const controls = Object.fromEntries(
		["select", "tools", "prev", "next", "resume"].map((key) => [key, target()]),
	);
	const pages = Array.from({ length: 12 }, (_, i) => ({
		getBoundingClientRect: () => ({ top: 500 + i * 1600 }),
		scrollIntoView: () => calls.push(i + 1),
	}));
	const links = pages.map(() => ({ setAttribute() {}, removeAttribute() {} }));
	const reader = {
		...target(),
		dataset: { comicReader: "namer/episode-01" },
		querySelector: (s) => controls[s.match(/data-comic-(\w+)/)?.[1]],
		querySelectorAll: (s) => (s.includes("figure") ? pages : links),
	};
	let active = reader;
	const emit = (name) => listeners.get(name)?.forEach((fn) => fn());
	vm.runInNewContext(source, {
		window: { swup: { findPlugin: () => scrollPlugin } },
		document: {
			querySelector: () => active,
			documentElement: {
				dataset: { creativePaused: "true" },
				classList: { contains: (n) => classes.has(n) },
			},
			addEventListener: (name, fn) => {
				const current = listeners.get(name) || [];
				current.push(fn);
				listeners.set(name, current);
			},
		},
		localStorage: {
			getItem: (k) => saved.get(k),
			setItem: (k, v) => saved.set(k, v),
		},
		history: { state: null, replaceState() {} },
		innerHeight: 844,
		getComputedStyle: () => ({ scrollMarginTop: "160px" }),
		matchMedia: () => ({ matches: false }),
		requestAnimationFrame: () => 1,
		cancelAnimationFrame() {},
		addEventListener() {},
		removeEventListener() {},
	});
	return {
		emit,
		classes,
		calls,
		saved,
		reader,
		select: (n) => {
			controls.select.value = String(n);
			controls.select.dispatch("change");
		},
		leave: () => {
			active = null;
			emit("astro:page-load");
		},
	};
}

test("a page choice waits for both navigation and scroll restoration to finish", () => {
	const f = fixture();
	f.classes.add("is-changing");
	f.emit("swup:scroll:start");
	f.select(12);
	assert.deepEqual(f.calls, []);
	f.classes.delete("is-changing");
	f.emit("swup:visit:end");
	assert.deepEqual(f.calls, []);
	f.emit("swup:scroll:end");
	assert.deepEqual(f.calls, [12]);
	assert.equal(f.saved.get("sakura-reader-v1:namer/episode-01"), "12");
});

test("the latest choice survives reader reinitialization during a Swup visit", () => {
	const f = fixture();
	f.classes.add("is-changing");
	f.select(2);
	f.select(9);
	f.emit("astro:page-load");
	assert.deepEqual(f.calls, []);
	f.classes.delete("is-changing");
	f.emit("swup:visit:end");
	assert.deepEqual(f.calls, [9]);
	assert.equal(f.reader.dataset.pendingComicPage, undefined);
});

test("a pending page cannot scroll a different route after leaving the reader", () => {
	const f = fixture();
	f.emit("swup:scroll:start");
	f.select(8);
	f.leave();
	f.emit("swup:scroll:end");
	assert.deepEqual(f.calls, []);
});

test("settled navigation preserves immediate page controls", () => {
	const f = fixture();
	f.select(4);
	f.select(5);
	assert.deepEqual(f.calls, [4, 5]);
});

test("a lingering history restoration is cancelled before the selected page wins", () => {
	let cancelled = false;
	const plugin = {
		scrl: {
			_raf: 42,
			options: {
				onCancel: () => {
					cancelled = true;
				},
			},
		},
	};
	const f = fixture(plugin);
	f.select(7);
	assert.equal(plugin.scrl._raf, null);
	assert.equal(cancelled, true);
	assert.deepEqual(f.calls, [7]);
});
