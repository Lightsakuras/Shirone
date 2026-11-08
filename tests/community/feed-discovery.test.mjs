import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
const source = await readFile(
	new URL("../../src/pages/community-static-feed.json.ts", import.meta.url),
	"utf8",
);
const fixture = [
	{
		id: "public",
		data: { title: "Visible", description: "Summary", published: "2026-01-01" },
	},
	{ id: "draft", data: { title: "Hidden draft", draft: true } },
	{ id: "locked", data: { title: "Hidden locked", encrypted: true } },
];
const code = ts.transpile(source.replace(/^import .*;\n/gm, ""), {
	module: ts.ModuleKind.ESNext,
	target: ts.ScriptTarget.ES2022,
});
const prelude = `const resolveCommunityOptions=()=>null; const siteConfig={site:'https://example.com/',title:'Blog',subtitle:'Notes',lang:'zh_CN'}; const profileConfig={name:'Owner'}; const getSortedPosts=async()=>${JSON.stringify(fixture)}; const isEncryptedPost=data=>!!data.encrypted; const getPostUrl=post=>'/posts/'+post.id+'/'; const getPublishedInstant=()=>new Date('2026-01-01'); const getUpdatedInstant=getPublishedInstant;`;
const route = await import(
	"data:text/javascript;base64," +
		Buffer.from(prelude + code).toString("base64")
);
test("public build manifest excludes draft and encrypted metadata even outside production", async () => {
	const body = await (
		await route.GET({ site: new URL("https://example.com/") })
	).json();
	assert.deepEqual(
		body.posts.map((x) => x.id),
		["public"],
	);
	assert.equal(body.posts[0].link, "https://example.com/posts/public/");
	assert.equal(body.posts[0].excerpt, "Summary");
	assert.ok(!JSON.stringify(body).includes("Hidden"));
	assert.ok(!("contentHtml" in body.posts[0]));
});
test("feed discovery and copy guide use validated configured API with static fallback", async () => {
	const layout = await readFile(
		new URL("../../src/layouts/Layout.astro", import.meta.url),
		"utf8",
	);
	const guide = await readFile(
		new URL("../../src/components/organisms/FeedGuide.astro", import.meta.url),
		"utf8",
	);
	for (const file of [layout, guide])
		assert.match(file, /resolveCommunityOptions\(\)\?\.apiUrl/);
	assert.match(layout, /href=\{rssFeedUrl\}/);
	assert.match(layout, /href=\{atomFeedUrl\}/);
	assert.match(
		guide,
		/feedApi \? `\$\{feedApi\}\/v1\/feeds\/\$\{feedPath\}` : url\(feedPath\)/,
	);
});

test('public manifest keeps a non-root site base for dynamic article links', async () => {
 const based = prelude.replace("site:'https://example.com/'", "base:'/blog/',site:'https://example.com/'");
 const module = await import('data:text/javascript;base64,' + Buffer.from(based + code).toString('base64'));
 const body = await (await module.GET({site:new URL('https://example.com/')})).json();
 assert.equal(body.siteUrl,'https://example.com/blog/');
});
