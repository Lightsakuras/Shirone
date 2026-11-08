<script lang="ts">
import IconButton from "@components/atoms/action/IconButton.svelte";
import SearchPanel from "@components/atoms/blog/SearchPanel.svelte";
import SearchBar from "@components/molecules/SearchBar.svelte";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { url } from "@utils/url-utils.ts";
import { onMount } from "svelte";
import { resolveCommunityOptions } from "@/config/communityConfig";
import type { SearchResult } from "@/global";
import type { CommunityPublicClient } from "@/utils/community/public-client";
import type { PublicPost } from "@/utils/community/public-data";
import { cleanPagefindTitle } from "@/utils/search-result-utils";

export let staticSlugs: string[] = [];
const options = resolveCommunityOptions();
let keyword = "";
let result: (SearchResult & { reload?: boolean })[] = [];
let remotePosts: PublicPost[] = [];
let localResults: SearchResult[] = [];
let isSearching = false;
let initialized = false;
let status = "";
let remoteHasMore = false;
let remoteOffset = 0;
let generation = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | undefined;
let remoteClient: CommunityPublicClient | undefined;
let localUnavailable = false;
let remoteUnavailable = false;

$: panelResults = result.map((r) => ({
	url: r.url,
	title: r.meta.title,
	excerpt: r.excerpt,
	reload: r.reload,
}));
const setPanelVisibility = (show: boolean): void => {
	document
		.getElementById("search-panel")
		?.classList.toggle("float-panel-closed", !show);
};
const togglePanel = (): void => {
	document
		.getElementById("search-panel")
		?.classList.toggle("float-panel-closed");
};

async function staticSearch(query: string): Promise<SearchResult[]> {
	if (!import.meta.env.PROD) throw new Error("LOCAL_INDEX_UNAVAILABLE");
	if (!window.pagefind) {
		const load = (
			window as unknown as { __loadPagefind?: () => Promise<unknown> }
		).__loadPagefind;
		if (load) await load();
	}
	if (!window.pagefind) throw new Error("LOCAL_INDEX_UNAVAILABLE");
	const response = await window.pagefind.search(query);
	const found = await Promise.all(
		response.results.slice(0, 100).map((item) => item.data()),
	);
	return found.map((item) => ({
		...item,
		meta: { ...item.meta, title: cleanPagefindTitle(item.meta.title) },
	}));
}
async function onlineSearch(
	query: string,
	offset: number,
	signal: AbortSignal,
) {
	if (!options) return null;
	const { CommunityPublicClient } = await import(
		"@/utils/community/public-client"
	);
	remoteClient ??= new CommunityPublicClient(options.apiUrl);
	return remoteClient.list("search", query, offset, signal);
}
async function combineResults(own: number): Promise<void> {
	if (own !== generation) return;
	if (!options) {
		result = localResults;
		return;
	}
	const { uniquePublicPosts, escapePublicExcerpt } = await import(
		"@/utils/community/public-data"
	);
	if (own !== generation) return;
	const online = uniquePublicPosts(remotePosts, staticSlugs).map((post) => ({
		url: url(`/community/read/?slug=${encodeURIComponent(post.slug)}`),
		meta: { title: post.title },
		excerpt: escapePublicExcerpt(post.excerpt),
		reload: true,
	}));
	const seen = new Set<string>();
	result = [...localResults, ...online].filter((item) => {
		if (seen.has(item.url)) return false;
		seen.add(item.url);
		return true;
	});
}
function updateStatus(): void {
	status =
		localUnavailable || remoteUnavailable
			? i18n(I18nKey.communitySearchPartial)
			: !result.length
				? i18n(I18nKey.communitySearchEmpty)
				: "";
}
async function search(query: string): Promise<void> {
	controller?.abort();
	controller = new AbortController();
	const signal = controller.signal;
	const own = ++generation;
	if (!query.trim()) {
		result = [];
		remotePosts = [];
		remoteHasMore = false;
		status = "";
		isSearching = false;
		return;
	}
	isSearching = true;
	status = i18n(I18nKey.communityLoading);
	setPanelVisibility(true);
	localResults = [];
	remotePosts = [];
	remoteHasMore = false;
	localUnavailable = false;
	remoteUnavailable = false;
	await Promise.all([
		(async () => {
			try {
				const found = await staticSearch(query);
				if (own !== generation) return;
				localResults = found;
			} catch {
				if (own !== generation) return;
				localUnavailable = true;
			}
			await combineResults(own);
		})(),
		(async () => {
			try {
				const page = await onlineSearch(query, 0, signal);
				if (own !== generation) return;
				remotePosts = page?.posts || [];
				remoteHasMore = page?.pagination.hasMore || false;
				remoteOffset = page
					? page.pagination.offset + page.pagination.limit
					: 0;
			} catch {
				if (own !== generation) return;
				remoteUnavailable = !!options;
			}
			await combineResults(own);
		})(),
	]);
	if (own !== generation) return;
	isSearching = false;
	updateStatus();
}
async function loadMore(): Promise<void> {
	if (isSearching || !remoteHasMore || !controller) return;
	const own = generation;
	isSearching = true;
	try {
		const page = await onlineSearch(keyword, remoteOffset, controller.signal);
		if (own !== generation || !page) return;
		remotePosts = [...remotePosts, ...page.posts];
		remoteHasMore = page.pagination.hasMore;
		remoteOffset = page.pagination.offset + page.pagination.limit;
		remoteUnavailable = false;
		await combineResults(own);
	} catch {
		if (own === generation) remoteUnavailable = true;
	} finally {
		if (own === generation) {
			isSearching = false;
			updateStatus();
		}
	}
}
function schedule(query: string): void {
	result = [];
	remoteHasMore = false;
	clearTimeout(timer);
	controller?.abort();
	generation++;
	if (!query.trim()) {
		result = [];
		status = "";
		isSearching = false;
		remoteHasMore = false;
		return;
	}
	timer = setTimeout(() => {
		void search(query);
	}, 180);
}
onMount(() => {
	initialized = true;
	const reset = () => {
		clearTimeout(timer);
		controller?.abort();
		generation++;
		keyword = "";
		result = [];
		remotePosts = [];
		remoteHasMore = false;
		status = "";
		isSearching = false;
		setPanelVisibility(false);
	};
	document.addEventListener("swup:content:replace", reset);
	return () => {
		reset();
		document.removeEventListener("swup:content:replace", reset);
	};
});
$: if (initialized) schedule(keyword);
</script>

<SearchBar bind:value={keyword} id="search-input-desktop" name="search-desktop" placeholder={i18n(I18nKey.search)} onfocus={() => { if (keyword.trim()) setPanelVisibility(true); }} oncollapse={() => setPanelVisibility(false)} />
<IconButton icon="material-symbols:search" label={i18n(I18nKey.search)} id="search-switch" size="small" shape="round" onclick={togglePanel} class="lg:!hidden !w-10 !h-10 !text-[1.25rem]" />
<SearchPanel id="search-panel" class="float-panel float-panel-closed absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4" bind:query={keyword} results={panelResults} {status} loading={isSearching} moreLabel={remoteHasMore ? i18n(I18nKey.communityMore) : ""} onloadmore={() => { void loadMore(); }} placeholder={i18n(I18nKey.search)} hideInputOnDesktop />
