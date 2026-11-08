import test from "node:test";
import assert from "node:assert/strict";
import { feedRedirects } from "../../scripts/community/feed-redirects.mjs";
const config = {
	siteUrl: "https://blog.example/sub/",
	apiUrl: "https://api.example/community",
};
test("precise feed routes preserve preexisting rules, take precedence and are idempotent", () => {
	const result = feedRedirects(config, "/old /new 301\n/* /fallback 200\n");
	assert.match(
		result,
		/\/sub\/rss.xml https:\/\/api.example\/community\/v1\/feeds\/rss.xml 302/,
	);
	assert.match(
		result,
		/\/sub\/atom.xml https:\/\/api.example\/community\/v1\/feeds\/atom.xml 302/,
	);
	assert.ok(result.indexOf("/sub/rss") < result.indexOf("/*"));
	assert.ok(result.endsWith("/old /new 301\n/* /fallback 200\n"));
	assert.equal(feedRedirects(config, result), result);
	assert.equal(
		feedRedirects({ ...config, apiUrl: "" }, result),
		"/old /new 301\n/* /fallback 200\n",
	);
});
test("disabled integration leaves existing static routes unchanged", () => {
	assert.equal(
		feedRedirects({ apiUrl: "" }, "/test /target 301\n"),
		"/test /target 301\n",
	);
});
test("invalid targets and conflicting existing feed redirects fail closed", () => {
	for (const apiUrl of [
		"http://api.example",
		"https://u:p@api.example",
		"https://api.example/?key=x",
		"https://api.example/#x",
		"javascript:alert(1)",
	])
		assert.throws(() => feedRedirects({ ...config, apiUrl }));
	assert.throws(() => feedRedirects(config, "/sub/rss.xml /other 302\n"));
	assert.throws(() =>
		feedRedirects(config, "# BEGIN SHIRONE COMMUNITY FEEDS\n"),
	);
});
