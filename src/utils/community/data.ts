import type { CommunityComment, CommunityPost } from "./client";

/** Field whitelist at the remote boundary. Unknown objects never become rendered HTML. */
export function cleanPosts(value: unknown): CommunityPost[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter(
			(p) =>
				p &&
				typeof p.id === "string" &&
				typeof p.slug === "string" &&
				typeof p.title === "string",
		)
		.slice(0, 100)
		.map((p) => ({
			id: p.id.slice(0, 100),
			slug: p.slug.slice(0, 160),
			title: p.title.slice(0, 180),
			excerpt: String(p.excerpt || "").slice(0, 500),
			body: typeof p.body === "string" ? p.body.slice(0, 100000) : "",
			status: p.status === "draft" ? "draft" : "published",
			publishedAt:
				typeof p.publishedAt === "string" ? p.publishedAt : undefined,
			updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : undefined,
		}));
}
export function cleanComments(value: unknown): CommunityComment[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter((c) => c && typeof c.id === "string" && typeof c.body === "string")
		.slice(0, 100)
		.map((c) => ({
			id: c.id.slice(0, 100),
			body: c.body.slice(0, 4000),
			displayName:
				typeof c.displayName === "string"
					? c.displayName.slice(0, 60)
					: undefined,
			createdAt: typeof c.createdAt === "string" ? c.createdAt : undefined,
			status: typeof c.status === "string" ? c.status : undefined,
			target: typeof c.target === "string" ? c.target.slice(0, 200) : undefined,
		}));
}
