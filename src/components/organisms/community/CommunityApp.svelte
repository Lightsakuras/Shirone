<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { onMount } from "svelte";
import { isCommunityUrl } from "@/config/communityConfig";
import type { CommunityConfig, CommunityMode } from "@/types/communityConfig";
import {
	accessToken,
	completeLogin,
	login,
	logout,
} from "@/utils/community/auth";
import {
	CommunityClient,
	type CommunityComment,
	CommunityError,
	type CommunityMember,
	type CommunityPost,
	cleanComments,
	cleanPosts,
	type Reactions,
} from "@/utils/community/client";
import {
	draftStorageTarget,
	isLocalDraft,
	localDraftKey,
} from "@/utils/community/drafts";
import { shouldTrackCommunityViews } from "@/utils/community/privacy";
import CommunityMarkdown from "./CommunityMarkdown.svelte";

let {
	config,
	mode = "feed",
	target = "",
	base = "/",
	staticPostLinks = {},
}: {
	config: CommunityConfig;
	mode?: CommunityMode;
	target?: string;
	base?: string;
	staticPostLinks?: Record<string, string>;
} = $props();
const t = (key: keyof typeof I18nKey): string => i18n(I18nKey[key]);
const connected = $derived(config.enable && isCommunityUrl(config.apiUrl));
const canLogin = $derived(
	connected && isCommunityUrl(config.auth.issuer) && !!config.auth.clientId,
);
let loading = $state(false);
let busy = $state(false);
let error = $state("");
let notice = $state("");
let member = $state<CommunityMember | null>(null);
let posts = $state<CommunityPost[]>([]);
let comments = $state<CommunityComment[]>([]);
let commentsMore = $state(false);
let moderationStatus = $state("pending");
let myCommentsMore = $state(false);
let myBookmarksMore = $state(false);
let reactions = $state<Reactions>({
	likes: 0,
	liked: false,
	bookmarked: false,
});
let stats = $state<Record<string, number>>({});
let article = $state<CommunityPost | null>(null);
let message = $state("");
let displayName = $state("");
let bio = $state("");
let draft = $state({
	id: "",
	title: "",
	slug: "",
	excerpt: "",
	body: "",
	status: "draft" as "draft" | "published",
	updatedAt: "",
});
let preview = $state(false);
let dirty = $state(false);
let offset = $state(0);
let hasMore = $state(false);
let client: CommunityClient | undefined;
let alive = true;
function requireClient(): CommunityClient {
	if (!client) throw new CommunityError("UNCONFIGURED");
	return client;
}
const activeTarget = $derived(
	mode === "guestbook"
		? "guestbook"
		: mode === "reader" && article
			? `post:${article.slug}`
			: target,
);
const canPublish = $derived(connected && member?.user.isOwner === true);
const draftKey = localDraftKey;
function fail(reason: unknown): void {
	if (
		!alive ||
		(reason instanceof DOMException && reason.name === "AbortError")
	)
		return;
	error =
		reason instanceof CommunityError && reason.status === 409
			? t("communityConflict")
			: reason instanceof CommunityError && reason.status === 401
				? t("communitySessionExpired")
				: t("communityError");
}
async function act(work: () => Promise<void>): Promise<void> {
	if (busy) return;
	busy = true;
	error = "";
	notice = "";
	try {
		await work();
	} catch (e) {
		fail(e);
	} finally {
		busy = false;
	}
}
async function loadComments(more = false): Promise<void> {
	if (!client || (mode !== "admin" && !activeTarget)) return;
	const offset = more ? comments.length : 0;
	const path =
		mode === "admin"
			? `/admin/comments?status=${moderationStatus}`
			: `/comments?target=${encodeURIComponent(activeTarget)}`;
	const data = await client.request<{
		comments: unknown;
		pagination?: { hasMore?: boolean };
	}>(`${path}&limit=20&offset=${offset}`);
	if (alive) {
		const incoming = cleanComments(data.comments);
		comments = more ? [...comments, ...incoming] : incoming;
		commentsMore = data.pagination?.hasMore ?? incoming.length === 20;
	}
}
async function loadMemberList(kind: "comments" | "bookmarks"): Promise<void> {
	if (!client || !member) return;
	const commentOffset = kind === "comments" ? member.comments.length : 0;
	const bookmarkOffset = kind === "bookmarks" ? member.bookmarks.length : 0;
	const data = await client.request<CommunityMember>(
		`/me?commentOffset=${commentOffset}&bookmarkOffset=${bookmarkOffset}&limit=20`,
	);
	if (!alive || !member) return;
	if (kind === "comments") {
		const incoming = cleanComments(data.comments);
		member.comments = [...member.comments, ...incoming];
		myCommentsMore = data.commentPagination?.hasMore ?? incoming.length === 20;
	} else {
		const incoming = Array.isArray(data.bookmarks)
			? data.bookmarks
					.filter((item) => typeof item?.target === "string")
					.slice(0, 25)
					.map((item) => ({ target: item.target.slice(0, 200) }))
			: [];
		member.bookmarks = [...member.bookmarks, ...incoming];
		myBookmarksMore =
			data.bookmarkPagination?.hasMore ?? incoming.length === 20;
	}
}
async function loadReactions(): Promise<void> {
	if (!client || !activeTarget || activeTarget === "guestbook") return;
	const data = await client.request<Reactions>(
		`/reactions?target=${encodeURIComponent(activeTarget)}`,
	);
	if (alive)
		reactions = {
			likes: Number.isFinite(data.likes) ? Math.max(0, data.likes) : 0,
			liked: data.liked === true,
			bookmarked: data.bookmarked === true,
		};
}
async function loadPosts(more = false): Promise<void> {
	if (!client) return;
	const next = more ? offset + 2 : 0;
	const data = await client.request<{ posts: unknown }>(
		`${mode === "admin" ? "/admin" : ""}/posts?limit=2&offset=${next}`,
	);
	if (!alive) return;
	const incoming = cleanPosts(data.posts);
	posts = more ? [...posts, ...incoming] : incoming;
	offset = next;
	hasMore = incoming.length === 2;
}
async function initialize(): Promise<void> {
	if (!connected) return;
	loading = true;
	error = "";
	try {
		if (mode === "callback") {
			await completeLogin(config, base);
			return;
		}
		client ??= new CommunityClient(config, base);
		if (await accessToken(config, base)) {
			const data = await client.request<CommunityMember>("/me");
			if (!alive) return;
			if (!data.user || typeof data.user.id !== "string")
				throw new CommunityError("INVALID_RESPONSE");
			member = {
				user: {
					id: data.user.id,
					displayName: String(data.user.displayName || "").slice(0, 60),
					bio: String(data.user.bio || "").slice(0, 500),
					isOwner: data.user.isOwner === true,
				},
				comments: cleanComments(data.comments),
				bookmarks: Array.isArray(data.bookmarks)
					? data.bookmarks
							.filter((b) => typeof b?.target === "string")
							.slice(0, 100)
					: [],
			};
			myCommentsMore =
				data.commentPagination?.hasMore ?? member.comments.length === 20;
			myBookmarksMore =
				data.bookmarkPagination?.hasMore ?? member.bookmarks.length === 20;
			displayName = member.user.displayName;
			bio = member.user.bio;
			if (mode === "admin" && member.user.isOwner) {
				try {
					const saved = sessionStorage.getItem(
						`shirone.community.owner.${member.user.id}`,
					);
					if (saved) {
						const restored = cleanPosts([JSON.parse(saved)])[0];
						if (restored)
							draft = { ...restored, updatedAt: restored.updatedAt || "" };
					}
				} catch {
					error = t("communityDraftStorageError");
				}
			}
		}
		if (mode === "feed") {
			await loadPosts();
			const data = await client.request<Record<string, number>>("/stats");
			if (alive)
				stats = Object.fromEntries(
					["views", "likes", "comments", "posts"].map((key) => [
						key,
						Number.isFinite(data[key]) ? Math.max(0, data[key]) : 0,
					]),
				);
		}
		if (mode === "admin" && member?.user.isOwner) {
			await loadPosts();
			await loadComments();
		}
		if (mode === "reader") {
			const slug = new URL(location.href).searchParams.get("slug");
			if (slug) {
				const data = await client.request<{ post: unknown }>(
					`/posts/${encodeURIComponent(slug)}`,
				);
				if (alive) article = cleanPosts([data.post])[0] || null;
			}
		}
		if (["reader", "post", "guestbook"].includes(mode)) {
			await Promise.all([loadComments(), loadReactions()]);
			// Aggregate visit event only; no cookies or persistent visitor identifier.
			if (
				activeTarget &&
				activeTarget !== "guestbook" &&
				shouldTrackCommunityViews(config.trackViews, navigator)
			)
				await client.request("/views", "POST", { target: activeTarget });
		}
	} catch (e) {
		fail(e);
	} finally {
		if (alive) loading = false;
	}
}
onMount(() => {
	alive = true;
	if (mode === "admin") {
		try {
			const saved = localStorage.getItem(draftKey);
			if (saved) {
				const parsed = JSON.parse(saved);
				const clean = isLocalDraft(parsed)
					? cleanPosts([{ ...parsed, id: "local" }])[0]
					: undefined;
				if (clean)
					draft = {
						...clean,
						id: parsed.id || "",
						updatedAt: clean.updatedAt || "",
					};
			}
		} catch {
			error = t("communityDraftStorageError");
		}
	}
	void initialize();
	const beforeUnload = (event: BeforeUnloadEvent) => {
		if (mode === "admin" && dirty && !localSave()) event.preventDefault();
	};
	const protectClick = (event: MouseEvent) => {
		if (
			mode !== "admin" ||
			!dirty ||
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		)
			return;
		const anchor =
			event.target instanceof Element
				? (event.target.closest("a[href]") as HTMLAnchorElement | null)
				: null;
		if (
			!anchor ||
			anchor.hasAttribute("download") ||
			(anchor.target && anchor.target !== "_self")
		)
			return;
		const next = new URL(anchor.href, location.href);
		if (
			next.origin !== location.origin ||
			(next.pathname === location.pathname && next.search === location.search)
		)
			return;
		if (!localSave()) {
			event.preventDefault();
			event.stopImmediatePropagation();
		}
	};
	const originUrl = location.href;
	const originState = history.state;
	let returning = false;
	const protectHistory = (event: PopStateEvent) => {
		if (returning) {
			returning = false;
			event.stopImmediatePropagation();
			return;
		}
		if (mode !== "admin" || !dirty || localSave()) return;
		event.stopImmediatePropagation();
		const oldIndex = originState?.index;
		const newIndex = event.state?.index;
		if (
			Number.isFinite(oldIndex) &&
			Number.isFinite(newIndex) &&
			oldIndex !== newIndex
		) {
			returning = true;
			history.go(oldIndex - newIndex);
		} else {
			// Unknown history entry: keep the editor and restore its URL rather than lose text.
			history.pushState(originState, "", originUrl);
		}
	};
	document.addEventListener("click", protectClick, true);
	window.addEventListener("popstate", protectHistory, true);
	window.addEventListener("beforeunload", beforeUnload);
	const onReplace = () => {
		alive = false;
		client?.destroy();
	};
	document.addEventListener("swup:content:replace", onReplace, { once: true });
	return () => {
		alive = false;
		client?.destroy();
		window.removeEventListener("beforeunload", beforeUnload);
		document.removeEventListener("click", protectClick, true);
		window.removeEventListener("popstate", protectHistory, true);
		document.removeEventListener("swup:content:replace", onReplace);
	};
});
function localSave(): boolean {
	try {
		const destination = draftStorageTarget(
			draft.id,
			member?.user.isOwner ? member.user.id : undefined,
		);
		if (!destination) throw new Error("OWNER_REQUIRED");
		const storage =
			destination.area === "session" ? sessionStorage : localStorage;
		storage.setItem(destination.key, JSON.stringify(draft));
		dirty = false;
		notice = t("communityLocalSaved");
		return true;
	} catch {
		error = t("communityDraftStorageError");
		return false;
	}
}
async function saveDraft(publish = false): Promise<void> {
	if (busy || !draft.title.trim() || !draft.slug.trim() || !draft.body.trim())
		return;
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) {
		error = t("communitySlugHelp");
		return;
	}
	if (canPublish && staticPostLinks[`post:${draft.slug}`]) {
		error = t("communityReservedSlug");
		return;
	}
	if (!canPublish || !client) {
		localSave();
		return;
	}
	if (
		!publish &&
		draft.status === "published" &&
		!window.confirm(t("communityConfirmUnpublish"))
	)
		return;
	if (publish && !window.confirm(t("communityConfirmPublish"))) return;
	await act(async () => {
		const data = await requireClient().request<{ post: unknown }>(
			draft.id
				? `/admin/posts/${encodeURIComponent(draft.id)}`
				: "/admin/posts",
			draft.id ? "PATCH" : "POST",
			{
				title: draft.title,
				slug: draft.slug,
				excerpt: draft.excerpt,
				body: draft.body,
				status: publish ? "published" : "draft",
				...(draft.id ? { updatedAt: draft.updatedAt } : {}),
			},
		);
		const saved = cleanPosts([data.post])[0];
		if (!saved) throw new CommunityError("INVALID_RESPONSE");
		draft = { ...saved, updatedAt: saved.updatedAt || "" };
		dirty = false;
		if (member)
			sessionStorage.removeItem(`shirone.community.owner.${member.user.id}`);
		notice = t("communitySaved");
		await loadPosts();
	});
}
function exportDraft(): void {
	const content = `---\ntitle: ${JSON.stringify(draft.title)}\nslug: ${JSON.stringify(draft.slug)}\ndescription: ${JSON.stringify(draft.excerpt)}\ndraft: ${draft.status !== "published"}\n---\n\n${draft.body}\n`;
	const url = URL.createObjectURL(
		new Blob([content], { type: "text/markdown;charset=utf-8" }),
	);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${draft.slug.replace(/[^a-zA-Z0-9_-]/g, "-") || "draft"}.md`;
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function choosePost(post?: CommunityPost): void {
	if (busy) return;
	if (dirty && !window.confirm(t("communityConfirmSwitch"))) return;
	draft = post
		? { ...post, updatedAt: post.updatedAt || "" }
		: {
				id: "",
				title: "",
				slug: "",
				excerpt: "",
				body: "",
				status: "draft",
				updatedAt: "",
			};
	dirty = false;
	preview = false;
}
async function signIn(): Promise<void> {
	await act(async () => {
		if (!canLogin) {
			error = t("communityNoAuth");
			return;
		}
		await login(config, base);
	});
}
async function signOut(): Promise<void> {
	if (
		mode === "admin" &&
		(dirty || (member?.user.isOwner && !!draft.body)) &&
		!window.confirm(t("communityConfirmSignOut"))
	)
		return;
	await act(async () => {
		await logout(config, base);
		if (member)
			sessionStorage.removeItem(`shirone.community.owner.${member.user.id}`);
		// Discard legacy cloud records from the older generic storage layout.
		try {
			const saved = localStorage.getItem(draftKey);
			if (saved && !isLocalDraft(JSON.parse(saved)))
				localStorage.removeItem(draftKey);
		} catch {
			/* Keep sign-out independent of unavailable storage. */
		}
		dirty = false;
		draft = {
			id: "",
			title: "",
			slug: "",
			excerpt: "",
			body: "",
			status: "draft",
			updatedAt: "",
		};
		member = null;
		comments = [];
		posts = [];
		await initialize();
	});
}
async function sendComment(): Promise<void> {
	if (!client || !member || !message.trim()) return;
	await act(async () => {
		await requireClient().request("/comments", "POST", {
			target: activeTarget,
			body: message.trim(),
		});
		message = "";
		notice = t("communityPending");
	});
}
async function moderate(id: string, status: string): Promise<void> {
	await act(async () => {
		await requireClient().request(
			`/admin/comments/${encodeURIComponent(id)}`,
			"PATCH",
			{ status },
		);
		await loadComments();
		notice = t("communitySaved");
	});
}
async function removeComment(id: string): Promise<void> {
	if (!window.confirm(t("communityConfirmDelete"))) return;
	await act(async () => {
		await requireClient().request(
			`/comments/${encodeURIComponent(id)}`,
			"DELETE",
		);
		if (member) member.comments = member.comments.filter((c) => c.id !== id);
	});
}
function bookmarkUrl(target: string): string {
	if (staticPostLinks[target]) return staticPostLinks[target];
	return target.startsWith("post:")
		? `${base}community/read/?slug=${encodeURIComponent(target.slice(5))}`
		: `${base}guestbook/`;
}
</script>

<section class="community-app" data-community-mode={mode} aria-busy={busy || loading}>
	{#if mode !== "post" && mode !== "reader"}
		<header class="community-heading">
			<h1>{t(mode === "admin" ? "communityAdmin" : mode === "space" ? "communitySpace" : mode === "guestbook" ? "communityGuestbook" : mode === "callback" ? "communityLogin" : "communityTitle")}</h1>
			<p>{t("communityIntro")}</p>
		</header>
	{/if}
	{#if mode !== "post"}
		<nav class="community-nav" aria-label={t("communityTitle")}>
			{#each [["community/", "communityFeed"], ["guestbook/", "communityGuestbook"], ["space/", "communitySpace"], ["admin/", "communityAdmin"]] as [path, key]}
				<a href={`${base}${path}`} aria-current={(path === "community/" && (mode === "feed" || mode === "reader")) || (path === "guestbook/" && mode === "guestbook") || (path === "space/" && mode === "space") || (path === "admin/" && mode === "admin") ? "page" : undefined} data-no-swup>{t(key as keyof typeof I18nKey)}</a>
			{/each}
		</nav>
	{/if}
	{#if !connected}<p class="community-note" role="status">{t("communityUnconfigured")}</p>{/if}
	{#if mode !== "callback"}
		<div class="community-session">
			{#if member}<span class="community-member">{member.user.displayName || t("communityGuest")}</span><button onclick={signOut} disabled={busy}>{t("communityLogout")}</button>
			{:else if connected}<p>{t("communitySignInHint")}</p><button class="primary" onclick={signIn} disabled={!canLogin || busy}>{t("communityLogin")}</button>{/if}
		</div>
	{/if}
	{#if error}<div class="community-error" role="alert"><p>{error}</p><button disabled={busy || loading} onclick={() => initialize()}>{t("communityRetry")}</button></div>{/if}
	{#if notice}<p class="community-notice" role="status">{notice}</p>{/if}
	{#if loading}<p role="status">{t("communityLoading")}</p>{/if}

	{#if mode === "feed"}
		{#if Object.keys(stats).length}<section aria-label={t("communityStats")} class="community-stats">{#each [["posts", "communityPosts"], ["views", "communityViews"], ["likes", "communityLikes"], ["comments", "communityComments"]] as [key,label]}<div><strong>{stats[key] || 0}</strong><span>{t(label as keyof typeof I18nKey)}</span></div>{/each}</section>{/if}
		<div class="community-feed">{#each posts as post}<article><span class="community-eyebrow">{post.publishedAt?.slice(0,10) || ""}</span><h2><a href={`${base}community/read/?slug=${encodeURIComponent(post.slug)}`} data-no-swup>{post.title}</a></h2><p>{post.excerpt}</p><a class="community-read" href={`${base}community/read/?slug=${encodeURIComponent(post.slug)}`} data-no-swup>{t("communityRead")} <span aria-hidden="true">↗</span></a></article>{:else}{#if !loading}<p class="community-empty">{t("communityEmpty")}</p>{/if}{/each}</div>
		{#if hasMore}<button onclick={() => act(() => loadPosts(true))} disabled={busy}>{t("communityMore")}</button>{/if}
	{:else if mode === "reader"}
		<a href={`${base}community/`} data-no-swup>← {t("communityBack")}</a>
		{#if article}<article class="community-story"><p class="community-eyebrow">{article.publishedAt?.slice(0,10) || ""}</p><h1>{article.title}</h1><p class="community-deck">{article.excerpt}</p><CommunityMarkdown body={article.body}/></article>{:else if !loading}<p class="community-empty">{t("communityReadMissing")}</p>{/if}
	{:else if mode === "space"}
		{#if member}
			<form class="community-profile" onsubmit={(event) => { event.preventDefault(); void act(async () => { await requireClient().request("/me", "PATCH", { displayName, bio }); if (member) { member.user.displayName = displayName; member.user.bio = bio; } notice = t("communitySaved"); }); }}>
				<h2>{t("communityProfile")}</h2><label>{t("communityDisplayName")}<input bind:value={displayName} maxlength="60" required /></label><label>{t("communityBio")}<textarea bind:value={bio} maxlength="500" rows="3"></textarea></label><button class="primary" disabled={busy}>{t("communitySaveProfile")}</button>
			</form>
			<section class="community-section"><h2>{t("communityBookmarks")}</h2>{#each member.bookmarks as bookmark}<div class="community-list-row"><a href={bookmarkUrl(bookmark.target)} data-no-swup>{bookmark.title || bookmark.target.replace(/^post:/, "")}</a><button disabled={busy} onclick={() => act(async () => { await requireClient().request("/bookmarks", "PUT", { target: bookmark.target, saved: false }); if (member) member.bookmarks = member.bookmarks.filter((b) => b.target !== bookmark.target); })}>{t("communityDelete")}</button></div>{:else}<p class="community-muted">{t("communityEmpty")}</p>{/each}{#if myBookmarksMore}<button disabled={busy} onclick={() => act(() => loadMemberList("bookmarks"))}>{t("communityMore")}</button>{/if}</section>
			<section class="community-section"><h2>{t("communityMyComments")}</h2>{#each member.comments as comment}<article class="community-comment"><p>{comment.body}</p><div class="community-list-row"><span class="community-muted">{comment.status === "pending" ? t("communityPendingStatus") : comment.status === "rejected" ? t("communityRejected") : t("communityPublished")}</span><button onclick={() => removeComment(comment.id)} disabled={busy}>{t("communityDelete")}</button></div></article>{:else}<p class="community-muted">{t("communityEmpty")}</p>{/each}{#if myCommentsMore}<button disabled={busy} onclick={() => act(() => loadMemberList("comments"))}>{t("communityMore")}</button>{/if}</section>
		{:else if !loading}<p class="community-empty">{t("communitySignInHint")}</p>{/if}
	{:else if mode === "admin"}
		{#if connected && !member?.user.isOwner}<p class="community-note">{t("communityOwnerOnly")}</p>{/if}
		<div class="community-studio">
			<aside class="community-drafts"><button onclick={() => choosePost()} disabled={busy}>{t("communityNew")} <span aria-hidden="true">＋</span></button>{#each posts as post}<button disabled={busy} class:chosen={draft.id === post.id} onclick={() => choosePost(post)}><strong>{post.title}</strong><small>{post.status === "published" ? t("communityPublished") : t("communityDraftStatus")}</small></button>{/each}{#if hasMore}<button onclick={() => act(() => loadPosts(true))} disabled={busy}>{t("communityMore")}</button>{/if}</aside>
			<form class="community-editor" onsubmit={(event) => { event.preventDefault(); void saveDraft(); }} oninput={() => { dirty = true; notice = ""; }}>
				<div class="community-editor-top"><div><span class="community-eyebrow">{t("communityAdmin")}</span><p class="community-muted">{dirty ? t("communityUnsaved") : t("communityDraftStatus")}</p></div><button type="button" aria-pressed={preview} onclick={() => { preview = !preview; }}>{preview ? t("communityEdit") : t("communityPreview")}</button></div>
				{#if preview}<div class="community-preview"><h2>{draft.title}</h2><p class="community-deck">{draft.excerpt}</p><CommunityMarkdown body={draft.body}/></div>
				{:else}<label>{t("communityTitleLabel")}<input class="community-title-input" bind:value={draft.title} maxlength="180" required /></label><label>{t("communitySlug")}<input bind:value={draft.slug} title={t("communitySlugHelp")} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxlength="160" required /></label><label>{t("communityExcerpt")}<textarea bind:value={draft.excerpt} maxlength="500" rows="2"></textarea></label><label>{t("communityBody")}<textarea class="community-body-input" bind:value={draft.body} maxlength="100000" rows="18" required></textarea></label><p class="community-muted">{t("communityMarkdownHelp")}</p>{/if}
				<div class="community-actions"><button class="primary" type="submit" disabled={busy || !draft.title.trim() || !draft.slug.trim() || !draft.body.trim()}>{t("communityDraft")}</button><button type="button" onclick={() => saveDraft(true)} disabled={busy || !canPublish || !draft.title.trim() || !draft.slug.trim() || !draft.body.trim()}>{t("communityPublish")}</button><button type="button" onclick={exportDraft}>{t("communityExport")}</button></div>
				<p class="community-muted">{t("communityLocalDraft")}</p>{#if !canPublish}<p class="community-muted">{t("communityPublishNeedsService")}</p>{/if}
			</form>
		</div>
		{#if member?.user.isOwner}<section class="community-section"><h2>{t("communityModeration")}</h2><div class="community-actions" role="group" aria-label={t("communityModeration")}>{#each [["pending","communityPendingStatus"],["approved","communityPublished"],["rejected","communityRejected"]] as [status,label]}<button disabled={busy} aria-pressed={moderationStatus === status} onclick={() => act(async () => { moderationStatus = status; await loadComments(); })}>{t(label as keyof typeof I18nKey)}</button>{/each}</div>{#each comments as comment}<article class="community-comment"><strong>{comment.displayName || t("communityGuest")}</strong><p>{comment.body}</p><div class="community-actions"><button disabled={busy} onclick={() => moderate(comment.id, "approved")}>{t("communityApprove")}</button><button disabled={busy} onclick={() => moderate(comment.id, "rejected")}>{t("communityReject")}</button></div></article>{:else}<p class="community-muted">{t("communityEmpty")}</p>{/each}{#if commentsMore}<button disabled={busy} onclick={() => act(() => loadComments(true))}>{t("communityMore")}</button>{/if}</section>{/if}
	{/if}

	{#if ["post", "reader"].includes(mode) && activeTarget && connected}<div class="community-actions community-reactions"><button aria-pressed={reactions.liked} disabled={!member || busy} onclick={() => act(async () => { await requireClient().request("/reactions", "PUT", { target: activeTarget, liked: !reactions.liked }); await loadReactions(); })}>♡ {t("communityLike")} · {reactions.likes}</button><button aria-pressed={reactions.bookmarked} disabled={!member || busy} onclick={() => act(async () => { await requireClient().request("/bookmarks", "PUT", { target: activeTarget, saved: !reactions.bookmarked }); await loadReactions(); })}>{reactions.bookmarked ? t("communityBookmarked") : t("communityBookmark")}</button></div>{/if}
	{#if ["post", "reader", "guestbook"].includes(mode) && activeTarget}
		<section class="community-section"><h2>{mode === "guestbook" ? t("communityGuestbook") : t("communityComments")}</h2><p class="community-muted">{t("communityModerationNote")}</p>
			{#if member}<form onsubmit={(event) => { event.preventDefault(); void sendComment(); }}><label>{t("communityMessage")}<textarea bind:value={message} maxlength="4000" rows="4" required></textarea></label><button class="primary" disabled={busy || !message.trim()}>{t("communitySend")}</button></form>{/if}
			{#each comments as comment}<article class="community-comment"><div class="community-list-row"><strong>{comment.displayName || t("communityGuest")}</strong><time class="community-muted">{comment.createdAt?.slice(0, 10) || ""}</time></div><p>{comment.body}</p></article>{:else}{#if !loading}<p class="community-empty">{t("communityEmpty")}</p>{/if}{/each}
			{#if commentsMore}<button disabled={busy} onclick={() => act(() => loadComments(true))}>{t("communityMore")}</button>{/if}
		</section>
	{/if}
</section>
