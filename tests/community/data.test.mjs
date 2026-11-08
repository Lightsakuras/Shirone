import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
async function pureModule(path) {
 const source = await readFile(new URL(path, import.meta.url), "utf8");
 const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
 return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}
const { isCommunityUrl } = await pureModule("../../src/utils/community/urls.ts");
const { cleanPosts, cleanComments } = await pureModule("../../src/utils/community/data.ts");
test("only HTTPS or loopback endpoints, never credential-bearing URLs", () => {
 for (const url of ["https://api.example.com", "http://localhost:8787", "http://127.0.0.1:8787", "http://[::1]:8787"]) assert.equal(isCommunityUrl(url),true,url);
 for (const url of ["", "javascript:alert(1)", "http://api.example.com", "https://user:secret@example.com", "https://example.com/?token=secret", "https://example.com/#fragment", "//example.com"]) assert.equal(isCommunityUrl(url),false,url);
});
test("public summary posts without bodies remain valid; remote extras are discarded", () => {
 const [post] = cleanPosts([{id:"1",slug:"hello",title:"Hello",excerpt:"A note",ownerToken:"secret"}]);
 assert.equal(post.body,""); assert.equal(post.title,"Hello"); assert.equal("ownerToken" in post,false);
 assert.deepEqual(cleanPosts([null,{},42,{id:1,slug:"x",title:"x"}]),[]);
});
test("post fields are bounded, malicious markup stays plain text", () => {
 const [post] = cleanPosts([{id:"1",slug:"x",title:"a".repeat(400),body:"<script>alert(1)</script>",status:"owner"}]);
 assert.equal(post.title.length,180); assert.equal(post.body,"<script>alert(1)</script>"); assert.equal(post.status,"published");
 assert.equal(cleanPosts(Array.from({length:101},()=>({id:"1",slug:"x",title:"x"}))).length,100);
});
test("comment schema filters invalid data and removes untrusted fields", () => {
 const [comment] = cleanComments([{id:"c1",body:"x".repeat(5000),displayName:42,status:"pending",secret:"hidden"}]);
 assert.equal(comment.body.length,4000); assert.equal(comment.displayName,undefined); assert.equal("secret" in comment,false);
 assert.deepEqual(cleanComments({comments:[]}),[]);
});
test("optional panel gates before importing hydrated island", async () => {
 const source = await readFile(new URL("../../src/components/organisms/community/CommunityPanel.astro",import.meta.url),"utf8");
 assert.match(source,/const options = resolveCommunityOptions\(\)/);
 assert.match(source,/options\s+\? \(await import/);
});
test("OIDC uses code flow and session-scoped state with no browser secret", async () => {
 const source = await readFile(new URL("../../src/utils/community/auth.ts",import.meta.url),"utf8");
 assert.match(source,/response_type: "code"/); assert.match(source,/store: sessionStorage/);
 assert.doesNotMatch(source,/client_secret\s*:/); assert.doesNotMatch(source,/localStorage/);
});

const { communityMarkdown } = await pureModule("../../src/utils/community/markdown.ts");
test("fenced code preserves blank lines and never parses HTML", () => {
 const blocks = communityMarkdown("# A title\n\n```js\nconst a = 1;\n\n<script>test</script>\n```\n\n- one\n- two");
 assert.equal(blocks[0].kind,"heading"); assert.equal(blocks[1].kind,"code");
 assert.equal(blocks[1].text,"const a = 1;\n\n<script>test</script>"); assert.equal(blocks[2].kind,"list");
});

const { draftStorageTarget, isLocalDraft } = await pureModule("../../src/utils/community/drafts.ts");
test("cloud drafts never use generic persistent storage or restore before login", () => {
 assert.deepEqual(draftStorageTarget(""), {area:"local",key:"shirone.community.draft.v1"});
 assert.equal(draftStorageTarget("cloud-1"),null);
 assert.deepEqual(draftStorageTarget("cloud-1","owner-a"),{area:"session",key:"shirone.community.owner.owner-a"});
 assert.deepEqual(draftStorageTarget("","owner-b"),{area:"session",key:"shirone.community.owner.owner-b"});
 assert.equal(isLocalDraft({id:"cloud-1",body:"private"}),false);
 assert.equal(isLocalDraft({id:"",body:"local"}),true);
});
test("community navigation opts out of Swup and guards failed draft persistence before navigation", async () => {
 const source = await readFile(new URL("../../src/components/organisms/community/CommunityApp.svelte",import.meta.url),"utf8");
 assert.doesNotMatch(source,/data-astro-reload/); assert.match(source,/data-no-swup/);
 assert.match(source,/addEventListener\("click", protectClick, true\)/);
 assert.match(source,/addEventListener\("popstate", protectHistory, true\)/);
 assert.match(source,/if \(!localSave\(\)\) \{\s*event.preventDefault\(\);\s*event.stopImmediatePropagation\(\)/);
 assert.match(source,/isLocalDraft\(parsed\)/);
});

const { shouldTrackCommunityViews } = await pureModule("../../src/utils/community/privacy.ts");
test("view collection requires explicit opt-in and honors DNT and GPC", () => {
 assert.equal(shouldTrackCommunityViews(undefined,{}),false);
 assert.equal(shouldTrackCommunityViews(false,{}),false);
 assert.equal(shouldTrackCommunityViews(true,{}),true);
 assert.equal(shouldTrackCommunityViews(true,{doNotTrack:"1"}),false);
 assert.equal(shouldTrackCommunityViews(true,{doNotTrack:"yes"}),false);
 assert.equal(shouldTrackCommunityViews(true,{globalPrivacyControl:true}),false);
});
test("moderation defaults to pending and all comment and personal lists expose pagination", async () => {
 const source = await readFile(new URL("../../src/components/organisms/community/CommunityApp.svelte",import.meta.url),"utf8");
 assert.match(source,/moderationStatus = \$state\("pending"\)/);
 assert.match(source,/admin\/comments\?status=/);
 assert.match(source,/commentOffset=/); assert.match(source,/bookmarkOffset=/);
 assert.match(source,/myBookmarksMore/); assert.match(source,/myCommentsMore/);
 assert.match(source,/loadComments\(true\)/);
});
