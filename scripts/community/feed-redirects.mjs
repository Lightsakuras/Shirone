import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
export function feedRedirects(snapshot, existing = "") {
	const start = "# BEGIN SHIRONE COMMUNITY FEEDS",
		end = "# END SHIRONE COMMUNITY FEEDS";
	const begin = existing.indexOf(start),
		finish = existing.indexOf(end);
	if (begin < 0 !== finish < 0 || finish < begin)
		throw new Error("Malformed managed feed redirects");
	const clean =
		begin < 0
			? existing
			: existing.slice(0, begin) +
				existing.slice(finish + end.length).replace(/^\r?\n/, "");
	if (!snapshot.apiUrl) return clean;
	const api = new URL(snapshot.apiUrl),
		site = new URL(snapshot.siteUrl);
	if (
		api.protocol !== "https:" ||
		api.username ||
		api.password ||
		api.search ||
		api.hash ||
		/\s/.test(api.href)
	)
		throw new Error("Production feed redirects require a clean HTTPS API URL");
	const routes = ["rss.xml", "atom.xml"].map(
		(name) => new URL(name, site).pathname,
	);
	for (const line of clean.split(/\r?\n/)) {
		const rule = line.trim().split(/\s+/)[0];
		if (routes.includes(rule))
			throw new Error(
				"Existing feed redirect conflicts with community feed routing",
			);
	}
	const target = api.href.replace(/\/+$/, "");
	return (
		start +
		"\n" +
		routes
			.map(
				(route, i) =>
					`${route} ${target}/v1/feeds/${i ? "atom" : "rss"}.xml 302`,
			)
			.join("\n") +
		"\n" +
		end +
		"\n" +
		clean.replace(/^\n/, "")
	);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const dist =
		process.argv[2] || fileURLToPath(new URL("../../dist/", import.meta.url));
	const manifest = JSON.parse(
		await readFile(join(dist, "community-static-feed.json"), "utf8"),
	);
	let existing = "";
	try {
		existing = await readFile(join(dist, "_redirects"), "utf8");
	} catch (e) {
		if (e.code !== "ENOENT") throw e;
	}
	const result = feedRedirects(manifest, existing);
	if (result || existing) await writeFile(join(dist, "_redirects"), result);
	console.log(
		manifest.apiUrl
			? "Prepared exact RSS/Atom Pages redirects."
			: "Community feeds disabled; static feed URLs unchanged.",
	);
}
