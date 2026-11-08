/** Local QA fixture ONLY. Never import this module into src or a production build.
 * node tests/community/public-fixture.mjs [port]
 * GET /__fixture/mode?value=success|empty|offline switches local test scenario.
 * All stories are visibly labelled QA FIXTURE, never user-authored content.
 */
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

let mode = "success";
const posts = Array.from({ length: 45 }, (_, i) => ({
	id: `fixture-${i}`,
	slug: i === 0 ? "hello-world" : `qa-fixture-${i}`,
	title: `[QA FIXTURE] Online story ${i}`,
	excerpt:
		i === 2
			? '<img src=x onerror="alert(1)"> escaped fixture excerpt'
			: `Test-only note ${i}. Not user content.`,
	status: "published",
	publishedAt: new Date(
		Date.UTC(2026, 10, 7, 0, 0, 0) - i * 86400000,
	).toISOString(),
	updatedAt: "2026-11-07T00:00:00.000Z",
}));
export function handler(request, response) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Cache-Control", "no-store");
	const url = new URL(request.url, "http://127.0.0.1");
	const send = (value, status = 200) => {
		response.writeHead(status, { "Content-Type": "application/json" });
		response.end(JSON.stringify(value));
	};
	if (url.pathname === "/__fixture/mode") {
		const next = url.searchParams.get("value");
		if (["success", "empty", "offline"].includes(next)) mode = next;
		send({ fixture: true, mode });
		return;
	}
	if (mode === "offline") {
		send(
			{
				error: { code: "fixture_offline", message: "Intentional test failure" },
			},
			503,
		);
		return;
	}
	if (url.pathname === "/v1/posts" || url.pathname === "/v1/search") {
		const limit = Math.min(
			25,
			Math.max(1, Number(url.searchParams.get("limit")) || 20),
		);
		const offset = Math.max(0, Number(url.searchParams.get("offset")) || 0);
		const query = (url.searchParams.get("q") || "").toLowerCase();
		const matches =
			mode === "empty"
				? []
				: posts.filter(
						(p) =>
							url.pathname !== "/v1/search" ||
							`${p.title} ${p.excerpt}`.toLowerCase().includes(query),
					);
		send({
			posts: matches.slice(offset, offset + limit),
			pagination: {
				limit,
				offset,
				total: matches.length,
				hasMore: offset + limit < matches.length,
			},
		});
		return;
	}
	if (url.pathname.startsWith("/v1/posts/")) {
		const post = posts.find((p) => p.slug === url.pathname.split("/").at(-1));
		send(
			post
				? {
						post: {
							...post,
							body: "# QA fixture\n\nThis page is test data only.",
						},
					}
				: { error: { code: "not_found" } },
			post ? 200 : 404,
		);
		return;
	}
	send({ error: { code: "fixture_route_missing" } }, 404);
}

if (
	process.argv[1] &&
	import.meta.url === pathToFileURL(process.argv[1]).href
) {
	const server = createServer(handler);
	server.listen(Number(process.argv[2]) || 8791, "127.0.0.1", () =>
		console.log("QA-only public API fixture ready at", server.address()),
	);
}
