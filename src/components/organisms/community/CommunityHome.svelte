<script lang="ts">
import Key from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { onMount } from "svelte";
import { CommunityPublicClient } from "@/utils/community/public-client";
import {
	type PublicPost,
	uniquePublicPosts,
} from "@/utils/community/public-data";

let {
	apiUrl,
	base,
	staticSlugs,
}: { apiUrl: string; base: string; staticSlugs: string[] } = $props();
let posts = $state<PublicPost[]>([]);
let loading = $state(true);
let failed = $state(false);
let hasMore = $state(false);
let offset = 0;
let client: CommunityPublicClient;
let controller: AbortController;
let alive = false;
async function load(more = false): Promise<void> {
	if (!alive || (loading && more)) return;
	loading = true;
	failed = false;
	try {
		const page = await client.list(
			"posts",
			"",
			more ? offset : 0,
			controller.signal,
		);
		if (!alive) return;
		posts = uniquePublicPosts(
			more ? [...posts, ...page.posts] : page.posts,
			staticSlugs,
		);
		offset = page.pagination.offset + page.pagination.limit;
		hasMore = page.pagination.hasMore;
	} catch {
		if (alive) failed = true;
	} finally {
		if (alive) loading = false;
	}
}
onMount(() => {
	alive = true;
	controller = new AbortController();
	client = new CommunityPublicClient(apiUrl);
	void load();
	const dispose = () => {
		alive = false;
		controller.abort();
	};
	document.addEventListener("swup:content:replace", dispose, { once: true });
	return () => {
		dispose();
		document.removeEventListener("swup:content:replace", dispose);
	};
});
</script>
<section class="community-home" aria-label={i18n(Key.communityFeed)} aria-busy={loading}>
	<header><h2>{i18n(Key.communityFeed)}</h2><a href={`${base}community/`} data-no-swup>{i18n(Key.communityAllStories)} <span aria-hidden="true">↗</span></a></header>
	{#if failed}<p class="community-home__status" role="status">{i18n(Key.communityHomeOffline)} <button disabled={loading} onclick={() => load(posts.length > 0)}>{i18n(Key.communityRetry)}</button></p>{/if}
	{#each posts as post (post.id)}<article class="community-home__story"><time datetime={post.publishedAt}>{post.publishedAt.slice(0,10)}</time><h3><a href={`${base}community/read/?slug=${encodeURIComponent(post.slug)}`} data-no-swup>{post.title}</a></h3><p>{post.excerpt}</p></article>{/each}
	{#if loading}<p class="community-home__status" role="status">{i18n(Key.communityLoading)}</p>{:else if !failed && !posts.length}<p class="community-home__status">{i18n(Key.communityNoOnlineStories)}</p>{/if}
	{#if hasMore && !failed}<button disabled={loading} onclick={() => load(true)}>{i18n(Key.communityMore)}</button>{/if}
</section>
