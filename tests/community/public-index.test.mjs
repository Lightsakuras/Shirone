import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { compile } from "svelte/compiler";
import ts from "typescript";

async function moduleUrl(path, replacements = {}) {
	let source = await readFile(new URL(path, import.meta.url), "utf8");
	const result = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.ESNext,
			target: ts.ScriptTarget.ES2022,
		},
	});
	source = result.outputText;
	for (const [name, url] of Object.entries(replacements))
		source = source.replaceAll(`"${name}"`, JSON.stringify(url));
	return `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
}
const dataUrl = await moduleUrl("../../src/utils/community/public-data.ts");
const { cleanPublicPostPage, uniquePublicPosts, escapePublicExcerpt } =
	await import(dataUrl);
const urlUrl = await moduleUrl("../../src/utils/community/urls.ts");
const { CommunityPublicClient } = await import(
	await moduleUrl("../../src/utils/community/public-client.ts", {
		"./public-data": dataUrl,
		"./urls": urlUrl,
	})
);
const published = (slug, id = slug) => ({
	id,
	slug,
	title: `Title ${slug}`,
	excerpt: "A public note",
	status: "published",
	publishedAt: "2026-11-07T00:00:00.000Z",
	body: "Private fields never copied",
	ownerEmail: "never-copy@example.com",
});
test("public schema excludes drafts, unknown status, malformed slugs and private fields", () => {
	const page = cleanPublicPostPage({
		posts: [
			published("live"),
			{ ...published("draft"), status: "draft" },
			{ ...published("unknown"), status: undefined },
			published("../bad"),
			{ ...published("bad-date"), publishedAt: "not-a-date" },
		],
	});
	assert.equal(page.posts.length, 1);
	assert.equal(page.posts[0].slug, "live");
	assert.equal("body" in page.posts[0], false);
	assert.equal("ownerEmail" in page.posts[0], false);
});
test("static and repeated dynamic identities are deduplicated", () => {
	const posts = cleanPublicPostPage({
		posts: [
			published("hello-world"),
			published("new-story"),
			published("new-story"),
			published("other", "new-story"),
		],
	}).posts;
	assert.deepEqual(
		uniquePublicPosts(posts, ["hello-world.md"]).map((p) => p.slug),
		["new-story"],
	);
});
test("remote search markup is escaped before the shared HTML excerpt slot", () => {
	assert.equal(
		escapePublicExcerpt('<img src=x onerror="alert(1)">&'),
		"&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;",
	);
});
test("public client sends anonymous bounded reads, retains pagination and rejects failures", async () => {
	const original = globalThis.fetch;
	const calls = [];
	globalThis.fetch = async (url, options) => {
		calls.push({ url, options });
		return Response.json({
			posts: [published("live")],
			pagination: { limit: 20, offset: 20, total: 41, hasMore: true },
		});
	};
	try {
		const client = new CommunityPublicClient("https://api.example.test/");
		const result = await client.list("search", "<needle>", 20);
		assert.equal(result.pagination.hasMore, true);
		assert.equal(result.pagination.offset, 20);
		assert.equal(calls[0].options.credentials, "omit");
		assert.equal(calls[0].options.headers.Authorization, undefined);
		assert.match(calls[0].url, /\/v1\/search\?/);
		assert.equal(new URL(calls[0].url).searchParams.get("q"), "<needle>");
		globalThis.fetch = async () => new Response("offline", { status: 503 });
		await assert.rejects(client.list("posts"));
		globalThis.fetch = async () =>
			new Response("x".repeat(524289), {
				headers: { "content-type": "application/json" },
			});
		await assert.rejects(client.list("posts"), /RESPONSE_TOO_LARGE/);
	} finally {
		globalThis.fetch = original;
	}
});
test("disabled home and search do not fetch remote modules, static articles are retained", async () => {
	const home = await readFile(
		new URL("../../src/pages/[...page].astro", import.meta.url),
		"utf8",
	);
	const search = await readFile(
		new URL("../../src/components/organisms/Search.svelte", import.meta.url),
		"utf8",
	);
	assert.match(home, /page.currentPage === 1 \? resolveCommunityOptions/);
	assert.match(home, /<PostPage page=\{page\}/);
	assert.match(search, /if \(!options\) return null/);
	assert.match(
		search,
		/await import\(\s*"@\/utils\/community\/public-client"\s*\)/,
	);
	assert.doesNotMatch(search, /fakeResult|Using mock data/);
	assert.match(search, /own !== generation/);
	assert.match(search, /escapePublicExcerpt\(post.excerpt\)/);
	for (const file of [
		"../../src/components/organisms/Search.svelte",
		"../../src/components/organisms/community/CommunityHome.svelte",
	]) {
		const source = await readFile(new URL(file, import.meta.url), "utf8");
		assert.deepEqual(
			compile(source, { filename: file, generate: "server" }).warnings,
			[],
		);
	}
});

test("public slugs preserve backend-valid repeated and trailing hyphens", () => {
	const page = cleanPublicPostPage({
		posts: [published("hello--world"), published("hello-"), published("-bad")],
	});
	assert.deepEqual(
		page.posts.map((post) => post.slug),
		["hello--world", "hello-"],
	);
});
test("remote query is capped to the backend 120-character contract", async () => {
	const original = globalThis.fetch;
	let requested;
	globalThis.fetch = async (url) => {
		requested = new URL(url);
		return Response.json({
			posts: [],
			pagination: { limit: 20, offset: 0, total: 0, hasMore: false },
		});
	};
	try {
		await new CommunityPublicClient("https://api.example.test").list(
			"search",
			"a".repeat(200),
		);
		assert.equal(requested.searchParams.get("q").length, 120);
	} finally {
		globalThis.fetch = original;
	}
});

const { cleanPagefindTitle } = await import(
	await moduleUrl("../../src/utils/search-result-utils.ts")
);
test("Pagefind sentinel cleanup is confined to extracted local titles", async () => {
	assert.equal(
		cleanPagefindTitle("我的第一篇博客. ___END_PAGEFIND_WEIGHT___"),
		"我的第一篇博客.",
	);
	assert.equal(
		cleanPagefindTitle("Keep punctuation.  "),
		"Keep punctuation.  ",
	);
	assert.equal(
		cleanPagefindTitle("___END_OTHER_MARKER___"),
		"___END_OTHER_MARKER___",
	);
	assert.equal(
		cleanPagefindTitle("A ___END_PAGEFIND_WEIGHT______END_PAGEFIND_WEIGHT___"),
		"A",
	);
	const source = await readFile(
		new URL("../../src/components/organisms/Search.svelte", import.meta.url),
		"utf8",
	);
	assert.match(source, /title: cleanPagefindTitle\(item.meta.title\)/);
	assert.match(source, /meta: \{ title: post.title \}/);
	assert.match(source, /excerpt: escapePublicExcerpt\(post.excerpt\)/);
});
