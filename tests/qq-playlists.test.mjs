import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { qqPlaylists } from "../src/data/qq-playlists.ts";
import {
	qqPlaylistConfig,
	resolveQQPlaylistOptions,
} from "../src/config/qqPlaylistConfig.ts";
import { musicConfig, resolveMusicOptions } from "../src/config/musicConfig.ts";
import {
	createQQPlaylistSelection,
	getQQPlaylistSelection,
} from "../src/utils/music/qq-playlist-selection.ts";
import {
	resolveQQPlaylistCover,
	rememberQQPlaylistCoverFailure,
} from "../src/utils/music/qq-playlist-cover.ts";
import {
	isMusicBundleFile,
	isQQPlaylistBundleFile,
} from "../src/config/integrationsConfig.ts";
import { CONFIG_DOMAINS } from "../scripts/content/config-domains.mjs";

const expected = [
	["9717616331", "低音炮", "低音炮，极致的致幻沉溺", "hnCtGQvGqqiZ"],
	[
		"9493362293",
		"纯音乐",
		"氛围纯音词句旋律，孤独怜惜压抑高涨",
		"XLSvZYvGqmmZ",
	],
	["9471028899", "2077里的音乐", "赛博朋克2077里的音乐", "0hd0uyvGqaDx"],
	["9417693477", "湮灭", "湮灭", "CNyGSCvGqjEa"],
	["9397045418", "仙曲", "仙曲", "9uSsSbvGqnZu"],
];
const options = resolveQQPlaylistOptions(qqPlaylistConfig);
const source = (file) =>
	readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

describe("verified QQ playlist catalog", () => {
	it("pins all five user shares to official IDs, titles and open URLs", () => {
		assert.equal(qqPlaylists.length, 5);
		for (const [index, [id, label, title, share]] of expected.entries()) {
			const entry = qqPlaylists[index];
			assert.equal(entry.id, id);
			assert.equal(entry.label, label);
			assert.equal(entry.title, title);
			assert.equal(entry.url, `https://y.qq.com/n/ryqq_v2/playlist/${id}`);
			assert.equal(
				entry.shareUrl,
				`https://c6.y.qq.com/base/fcgi-bin/u?__=${share}`,
			);
			assert.match(new URL(entry.cover).hostname, /^(?:y|qpic\.y)\.qq\.com$/);
			assert.equal(entry.verifiedAt, "2026-11-07");
			for (const forbidden of ["source", "audio", "tracks", "duration"])
				assert.ok(!(forbidden in entry));
		}
	});
	it("keeps the original disabled audio configuration independent", () => {
		assert.equal(musicConfig.enable, false);
		assert.equal(musicConfig.provider, "mixed");
		assert.equal(resolveMusicOptions(musicConfig), null);
		assert.equal(qqPlaylistConfig.enable, true);
		assert.equal(options.playlists.length, 5);
	});
	it("is omitted when disabled or when no valid playlists exist", () => {
		assert.equal(resolveQQPlaylistOptions({ enable: false }), null);
		assert.equal(resolveQQPlaylistOptions({ enable: true }, []), null);
		assert.equal(
			resolveQQPlaylistOptions({ enable: true }, [
				{ ...qqPlaylists[0], url: "https://example.com" },
			]),
			null,
		);
	});
	it("filters duplicates and invalid entries, with a safe initial selection", () => {
		const resolved = resolveQQPlaylistOptions(
			{ enable: true, defaultPlaylistId: "missing" },
			[
				qqPlaylists[0],
				qqPlaylists[0],
				{ ...qqPlaylists[1], id: "not-id" },
				qqPlaylists[2],
			],
		);
		assert.deepEqual(
			resolved.playlists.map((p) => p.id),
			[qqPlaylists[0].id, qqPlaylists[2].id],
		);
		assert.equal(resolved.defaultPlaylistId, qqPlaylists[0].id);
		assert.ok(Object.isFrozen(resolved));
		assert.ok(Object.isFrozen(resolved.playlists));
	});
	it("registers a domain matching config introspection and package loading", () => {
		const domain = CONFIG_DOMAINS.find((d) => d.key === "qqPlaylist");
		assert.equal(domain.file, "qq-playlist");
		assert.match(source(`src/config/${domain.key}Config.ts`), /withUserConfig/);
	});
});

describe("QQ selection lifecycle (view state, not playback)", () => {
	it("updates title, cover and official link as one descriptor for every choice", () => {
		const state = createQQPlaylistSelection(options);
		const seen = [];
		const unsub = state.subscribe((p) => seen.push(p));
		for (const playlist of options.playlists) {
			assert.equal(state.select(playlist.id), true);
			assert.equal(state.getSelected(), playlist);
			assert.equal(seen.at(-1).title, playlist.title);
			assert.equal(seen.at(-1).cover, playlist.cover);
			assert.equal(seen.at(-1).url, playlist.url);
		}
		const count = seen.length;
		assert.equal(state.select("invalid"), false);
		assert.equal(seen.length, count);
		unsub();
		state.select(options.playlists[0].id);
		assert.equal(seen.length, count);
	});
	it("retains selection when a Swup view unsubscribes and mounts again", () => {
		const state = getQQPlaylistSelection(options);
		const unsubscribe = state.subscribe(() => {});
		state.select(options.playlists[3].id);
		unsubscribe();
		const remounted = getQQPlaylistSelection(options);
		let restored;
		const off = remounted.subscribe((p) => {
			restored = p;
		});
		assert.equal(remounted, state);
		assert.equal(restored.id, options.playlists[3].id);
		off();
	});
	it("does not emit twice when selecting the same playlist", () => {
		const state = createQQPlaylistSelection(options);
		let count = 0;
		state.subscribe(() => count++);
		state.select(state.getSelected().id);
		assert.equal(count, 1);
	});
	it("creates an isolated fresh selection with the configured default, never autoplay", () => {
		const fresh = createQQPlaylistSelection({
			...options,
			defaultPlaylistId: options.playlists[2].id,
		});
		assert.equal(fresh.getSelected().id, options.playlists[2].id);
		assert.deepEqual(Object.keys(fresh).sort(), [
			"getSelected",
			"select",
			"subscribe",
		]);
		assert.throws(() =>
			createQQPlaylistSelection({ playlists: [], defaultPlaylistId: "" }),
		);
	});
});

describe("QQ cover fallback", () => {
	it("returns placeholder for omitted or blank cover metadata", () => {
		assert.equal(
			resolveQQPlaylistCover({ ...qqPlaylists[0], cover: undefined }, []),
			null,
		);
		assert.equal(
			resolveQQPlaylistCover({ ...qqPlaylists[0], cover: "  " }, []),
			null,
		);
	});
	it("changes to stable placeholder after the image error event records its source", () => {
		const first = qqPlaylists[0],
			second = qqPlaylists[1];
		let failures = [];
		assert.equal(resolveQQPlaylistCover(first, failures), first.cover);
		failures = rememberQQPlaylistCoverFailure(failures, first.cover);
		assert.equal(resolveQQPlaylistCover(first, failures), null);
		assert.equal(resolveQQPlaylistCover(second, failures), second.cover);
		failures = rememberQQPlaylistCoverFailure(failures, second.cover);
		assert.equal(resolveQQPlaylistCover(first, failures), null);
		assert.equal(
			rememberQQPlaylistCoverFailure(failures, first.cover),
			failures,
		);
		assert.equal(rememberQQPlaylistCoverFailure(failures, null), failures);
	});
	it("connects the actual image error handler and accessible placeholder to tested helpers", () => {
		const component = source(
			"src/components/organisms/music/MusicArtworkClient.svelte",
		);
		assert.match(
			component,
			/\$derived\(resolveQQPlaylistCover\(selected, failedCovers\)\)/,
		);
		assert.match(component, /onerror=.*rememberQQPlaylistCoverFailure/s);
		assert.match(
			component,
			/role="img" aria-label=\{labels.coverUnavailable\}/,
		);
		assert.match(component, /loading="lazy" decoding="async"/);
	});
});

describe("truthful optional UI contract", () => {
	it("never imports audio or makes service requests, and has no pretend progress", () => {
		for (const path of [
			"src/components/organisms/music/MusicArtworkClient.svelte",
			"src/utils/music/qq-playlist-selection.ts",
			"src/utils/music/qq-playlist-cover.ts",
		]) {
			const text = source(path);
			assert.doesNotMatch(
				text,
				/new Audio|\bfetch\(|getMusicRuntime|music-runtime|\.play\(|<audio|type="range"|role="progressbar"/,
			);
		}
		const component = source(
			"src/components/organisms/music/MusicArtworkClient.svelte",
		);
		assert.match(component, /data-playing="false" data-status="external"/);
		assert.match(
			component,
			/href=\{selected.url\} target="_blank" rel="noopener noreferrer"/,
		);
		assert.match(component, /<noscript>/);
	});
	it("has an independent virtual gate and only cleans its own bundle files", () => {
		const integration = source("src/integration/index.ts");
		assert.match(
			integration,
			/id === RESOLVED_MUSIC_ARTWORK_VIRTUAL_ID\)\s*return qqEnabled\s*\?/,
		);
		assert.match(integration, /!qqEnabled && isQQPlaylistBundleFile/);
		assert.equal(
			isQQPlaylistBundleFile("_astro/MusicArtworkClient.abcd.js"),
			true,
		);
		assert.equal(isMusicBundleFile("_astro/MusicArtworkClient.abcd.js"), false);
		assert.equal(
			isQQPlaylistBundleFile("_astro/MusicSidebarClient.abcd.js"),
			false,
		);
		const home = source("src/components/organisms/EditorialHome.astro");
		assert.match(home, /hasQQPlaylists && MusicArtwork &&/);
	});
	it("supplies meaningful labels and matching placeholders in every locale", () => {
		const keys = [
			"qqPlaylistTitle",
			"qqPlaylistChoose",
			"qqPlaylistOpen",
			"qqPlaylistExternalNote",
			"qqPlaylistCover",
			"qqPlaylistCoverUnavailable",
			"qqPlaylistSelected",
		];
		const files = readdirSync(
			new URL("../src/i18n/languages/", import.meta.url),
		).filter((f) => f.endsWith(".ts"));
		assert.equal(files.length, 10);
		for (const file of files) {
			const text = source(`src/i18n/languages/${file}`);
			for (const key of keys) {
				const match = text.match(
					new RegExp(`\\[Key\\.${key}\\]:\\s*"([^"\\n]+)"`),
				);
				assert.ok(match, `${file}: ${key}`);
				assert.deepEqual(
					[...match[1].matchAll(/\{(\w+)\}/g)].map((m) => m[1]),
					/Cover$|Selected$/.test(key) ? ["title"] : [],
				);
			}
		}
	});
});
