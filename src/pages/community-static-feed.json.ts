import type { APIContext } from "astro";
import { profileConfig, siteConfig } from "@/config";
import { resolveCommunityOptions } from "@/config/communityConfig";
import { getPublishedInstant, getUpdatedInstant } from "@/utils/content-date";
import { getSortedPosts } from "@/utils/content-utils";
import { isEncryptedPost } from "@/utils/post-encryption";
import { getPostUrl } from "@/utils/url-utils";

/** Public metadata only. Never export drafts, even in development. */
export async function GET(context: APIContext): Promise<Response> {
	const origin = context.site ?? new URL(siteConfig.site);
	const base = `/${(siteConfig.base || "/").replace(/^\/+|\/+$/g, "")}/`.replace(/\/+/g, "/");
	const site = new URL(base, origin);
	const posts = (await getSortedPosts())
		.filter((post) => post.data.draft !== true && !isEncryptedPost(post.data))
		.map((post) => ({
			id: post.id,
			title: post.data.title,
			link: new URL(getPostUrl(post), site).href,
			publishedAt: getPublishedInstant(post.data).toISOString(),
			updatedAt: getUpdatedInstant(post.data).toISOString(),
			excerpt: post.data.description || "",
		}));
	return new Response(
		JSON.stringify({
			version: 1,
			apiUrl: resolveCommunityOptions()?.apiUrl || "",
			siteUrl: site.href,
			title: siteConfig.title,
			description: siteConfig.subtitle || "",
			language: siteConfig.lang,
			author: profileConfig.name,
			posts,
		}),
		{ headers: { "Content-Type": "application/json; charset=utf-8" } },
	);
}
