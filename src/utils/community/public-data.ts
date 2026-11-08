export interface PublicPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string;
	publishedAt: string;
	updatedAt?: string;
}
export interface PublicPostPage {
	posts: PublicPost[];
	pagination: {
		limit: number;
		offset: number;
		total: number;
		hasMore: boolean;
	};
}
/** A stricter public boundary: missing/unknown status never becomes published. */
export function cleanPublicPostPage(value: unknown): PublicPostPage {
	if (!value || typeof value !== "object") throw new Error("INVALID_RESPONSE");
	const data = value as Record<string, unknown>;
	if (!Array.isArray(data.posts)) throw new Error("INVALID_RESPONSE");
	const posts = data.posts
		.slice(0, 25)
		.filter(
			(post) =>
				post &&
				post.status === "published" &&
				typeof post.id === "string" &&
				typeof post.slug === "string" &&
				post.slug.length <= 160 &&
				/^[a-z0-9][a-z0-9-]*$/.test(post.slug) &&
				typeof post.title === "string" &&
				typeof post.publishedAt === "string" &&
				Number.isFinite(Date.parse(post.publishedAt)),
		)
		.map((post) => ({
			id: post.id.slice(0, 100),
			slug: post.slug.slice(0, 160),
			title: post.title.slice(0, 180),
			excerpt:
				typeof post.excerpt === "string" ? post.excerpt.slice(0, 500) : "",
			publishedAt: post.publishedAt.slice(0, 40),
			updatedAt:
				typeof post.updatedAt === "string"
					? post.updatedAt.slice(0, 40)
					: undefined,
		}));
	const page = data.pagination as Record<string, unknown> | undefined;
	const integer = (input: unknown, fallback: number): number =>
		typeof input === "number" && Number.isSafeInteger(input) && input >= 0
			? input
			: fallback;
	return {
		posts,
		pagination: {
			limit: Math.max(1, Math.min(25, integer(page?.limit, 20))),
			offset: integer(page?.offset, 0),
			total: integer(page?.total, posts.length),
			hasMore: page?.hasMore === true,
		},
	};
}
export function uniquePublicPosts(
	posts: PublicPost[],
	staticSlugs: readonly string[],
): PublicPost[] {
	const seen = new Set(
		staticSlugs.map((slug) => slug.replace(/\.(md|mdx)$/i, "")),
	);
	const ids = new Set<string>();
	return posts.filter((post) => {
		if (ids.has(post.id) || seen.has(post.slug)) return false;
		seen.add(post.slug);
		ids.add(post.id);
		return true;
	});
}
/** SearchPanel supports local Pagefind markup. Escape every remote excerpt first. */
export function escapePublicExcerpt(value: string): string {
	return value.replace(
		/[&<>"']/g,
		(char) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				char
			] || char,
	);
}
