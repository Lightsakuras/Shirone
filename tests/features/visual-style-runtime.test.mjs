import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(
	new URL("../../src/utils/visual-style-runtime.js", import.meta.url),
	"utf8",
);
function boot(saved, blocked = false, extra = {}) {
	const listeners = {};
	const store = new Map(Object.entries(extra));
	if (saved) store.set("shirone-visual-style", saved);
	const root = { dataset: {} };
	class Element {
		constructor(matches = {}) {
			this.matches = matches;
		}
		closest(selector) {
			return this.matches[selector] || null;
		}
	}
	const on = (name, fn) => {
		listeners[name] ||= [];
		listeners[name].push(fn);
	};
	const emit = (name, event = {}) =>
		(listeners[name] || []).forEach((fn) => {
			fn(event);
		});
	const document = {
		documentElement: root,
		currentScript: { dataset: { visualStyleDefault: "journal" } },
		querySelectorAll: () => [],
		querySelector: () => null,
		addEventListener: on,
		dispatchEvent: () => {},
	};
	const window = { addEventListener: on, dispatchEvent: () => {} };
	const localStorage = {
		getItem: (k) => {
			if (blocked) throw Error("private");
			return store.get(k) ?? null;
		},
		setItem: (k, v) => {
			if (blocked) throw Error("private");
			store.set(k, v);
		},
		removeItem: (k) => {
			if (blocked) throw Error("private");
			store.delete(k);
		},
	};
	const pending = [];
	const context = vm.createContext({
		document,
		window,
		localStorage,
		Element,
		Event: class {},
		CustomEvent: class {},
		setTimeout: (fn) => pending.push(fn),
	});
	vm.runInContext(source, context);
	const click = (mode, reset = false) =>
		emit("click", {
			target: new Element({
				"button[data-visual-style], button[data-visual-style-reset]": {
					dataset: { visualStyle: mode },
					hasAttribute: () => reset,
				},
			}),
		});
	const color = (value) =>
		emit("click", {
			target: new Element({
				"button[data-visual-color]": { dataset: { visualColor: value } },
			}),
		});
	const edit = (key, value) => {
		emit("click", { target: new Element({ "#display-settings-switch": {} }) });
		store.set(key, value);
		emit("input", { target: new Element({ "#display-setting": {} }) });
		pending.splice(0).forEach((fn) => {
			fn();
		});
	};
	return { root, store, listeners, click, color, edit, emit, context };
}
test("valid stored layout applies before DOMContentLoaded", () => {
	assert.equal(boot("atelier").root.dataset.visualStyle, "atelier");
});
test("invalid stored layout safely falls back to configured default", () => {
	assert.equal(boot("invalid").root.dataset.visualStyle, "journal");
});
test("blocked storage still permits in-session selection", () => {
	const r = boot(null, true);
	r.click("starlit");
	assert.equal(r.root.dataset.visualStyle, "starlit");
});
test("selection and reset persist independently of other reader settings", () => {
	const r = boot("atelier");
	r.store.set("theme", "dark");
	r.click("starlit");
	assert.equal(r.store.get("shirone-visual-style"), "starlit");
	assert.equal(r.store.get("theme"), "dark");
	r.click(null, true);
	assert.equal(r.root.dataset.visualStyle, "journal");
	assert.equal(r.store.has("shirone-visual-style"), false);
});
test("cross-tab invalid values normalize; repeated script does not rebind", () => {
	const r = boot("atelier");
	const click = r.listeners.click;
	r.store.set("shirone-visual-style", "bad");
	r.emit("storage", { key: "shirone-visual-style" });
	assert.equal(r.root.dataset.visualStyle, "journal");
	vm.runInContext(source, r.context);
	assert.equal(r.listeners.click, click);
});

test("new visitors receive curated color; existing hue is preserved as personal", () => {
	assert.equal(boot().root.dataset.visualColor, "curated");
	const r = boot(null, false, { hue: "275" });
	assert.equal(r.root.dataset.visualColor, "personal");
	assert.equal(r.store.get("hue"), "275");
});
test("explicit color preference overrides adoption and persists without changing reader preferences", () => {
	const r = boot(null, false, {
		hue: "275",
		"shirone-visual-color": "curated",
		theme: "dark",
		"mc-style": "vibrant",
	});
	assert.equal(r.root.dataset.visualColor, "curated");
	r.color("personal");
	assert.equal(r.store.get("shirone-visual-color"), "personal");
	r.color("curated");
	assert.equal(r.store.get("hue"), "275");
	assert.equal(r.store.get("theme"), "dark");
	assert.equal(r.store.get("mc-style"), "vibrant");
});
test("blocked storage preserves both in-session selections across navigation and reexecution", () => {
	const r = boot(null, true);
	r.color("personal");
	r.click("starlit");
	r.emit("swup:page:view");
	vm.runInContext(source, r.context);
	assert.equal(r.root.dataset.visualColor, "personal");
	assert.equal(r.root.dataset.visualStyle, "starlit");
});
test("cross-tab palette updates and storage clear normalize safely", () => {
	const r = boot();
	r.store.set("shirone-visual-color", "personal");
	r.emit("storage", { key: "shirone-visual-color" });
	assert.equal(r.root.dataset.visualColor, "personal");
	r.store.set("shirone-visual-color", "invalid");
	r.emit("storage", { key: "shirone-visual-color" });
	assert.equal(r.root.dataset.visualColor, "curated");
	r.store.clear();
	r.emit("storage", { key: null });
	assert.equal(r.root.dataset.visualStyle, "journal");
});
test("editing existing hue, style or spec exits curated; theme alone does not", () => {
	for (const key of ["hue", "mc-style", "mc-spec"]) {
		const r = boot();
		r.edit(key, "changed");
		assert.equal(r.root.dataset.visualColor, "personal");
	}
	const r = boot();
	r.edit("theme", "dark");
	assert.equal(r.root.dataset.visualColor, "curated");
});

test("motion pause survives Swup, blocked storage and cross-tab changes", () => {
	const r = boot(null, false, { "shirone-visual-motion": "paused" });
	assert.equal(r.root.dataset.visualMotion, "paused");
	r.emit("swup:page:view");
	assert.equal(r.root.dataset.visualMotion, "paused");
	r.store.set("shirone-visual-motion", "running");
	r.emit("storage", { key: "shirone-visual-motion" });
	assert.equal(r.root.dataset.visualMotion, "running");
	const privateSession = boot(null, true);
	privateSession.root.dataset.visualMotion = "paused";
	privateSession.emit("swup:page:view");
	assert.equal(privateSession.root.dataset.visualMotion, "paused");
});
