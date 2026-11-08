<script lang="ts">
import Icon from "@components/atoms/display/Icon.svelte";
import {
	rememberQQPlaylistCoverFailure,
	resolveQQPlaylistCover,
} from "@utils/music/qq-playlist-cover";
import type { QQPlaylistSelection } from "@utils/music/qq-playlist-selection";
import { onMount } from "svelte";
import type { ResolvedQQPlaylistOptions } from "@/config/qqPlaylistConfig";

interface Labels {
	title: string;
	choose: string;
	open: string;
	note: string;
	cover: string;
	coverUnavailable: string;
	selected: string;
}
interface Props {
	options: ResolvedQQPlaylistOptions;
	labels: Labels;
	class?: string;
}
let { options, labels, class: className = "" }: Props = $props();
let selected = $state(
	options.playlists.find(
		(playlist) => playlist.id === options.defaultPlaylistId,
	) ?? options.playlists[0],
);
let state = $state<QQPlaylistSelection | null>(null);
let failedCovers = $state<readonly string[]>([]);
let cover = $derived(resolveQQPlaylistCover(selected, failedCovers));
onMount(() => {
	let active = true;
	let unsubscribe = () => {};
	void import("@utils/music/qq-playlist-selection").then(
		({ getQQPlaylistSelection }) => {
			if (!active) return;
			state = getQQPlaylistSelection(options);
			unsubscribe = state.subscribe((playlist) => {
				selected = playlist;
			});
		},
	);
	return () => {
		active = false;
		unsubscribe();
	};
});
function selectPlaylist(event: Event): void {
	const id = (event.currentTarget as HTMLSelectElement).value;
	state?.select(id);
}
</script>

<section class={`music-artwork ${className}`} data-music-artwork data-playing="false" data-status="external" data-playlist-id={selected.id} aria-label={labels.title}>
	<div class="music-artwork__cover" data-cover-state={cover ? "available" : "unavailable"}>
		{#if cover}
			{#key cover}
				<img src={cover} alt={labels.cover.replace("{title}", selected.title)} width="600" height="600" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror={(event) => { failedCovers = rememberQQPlaylistCoverFailure(failedCovers, event.currentTarget.getAttribute("src")); }} />
			{/key}
		{:else}
			<span class="music-artwork__placeholder" role="img" aria-label={labels.coverUnavailable}><Icon icon="material-symbols:queue-music-rounded" aria-hidden="true" /></span>
		{/if}
	</div>
	<div class="music-artwork__body">
		<p class="music-artwork__status">{labels.title}</p>
		<strong class="music-artwork__title">{selected.title}</strong>
		<label class="music-artwork__selector"><span>{labels.choose}</span>
			<select value={selected.id} onchange={selectPlaylist} disabled={!state}>
				{#each options.playlists as playlist (playlist.id)}<option value={playlist.id}>{playlist.label}</option>{/each}
			</select>
		</label>
		<a class="music-artwork__open m3-state-layer" href={selected.url} target="_blank" rel="noopener noreferrer">{labels.open}<Icon icon="material-symbols:arrow-outward-rounded" aria-hidden="true" /></a>
		<p class="music-artwork__note">{labels.note}</p>
		<p class="sr-only" aria-live="polite" aria-atomic="true">{labels.selected.replace("{title}", selected.title)}</p>
		<noscript><ul>{#each options.playlists as playlist}<li><a href={playlist.url} target="_blank" rel="noopener noreferrer">{playlist.label}</a></li>{/each}</ul></noscript>
	</div>
</section>

<style lang="stylus">
@import "../../../styles/breakpoints.styl"
.music-artwork
	display: grid
	grid-template-columns: var(--music-artwork-columns, 1fr)
	gap: var(--m3e-space-4)
	align-items: start
	width: 100%
	min-width: 0
	color: var(--on-surface)
.music-artwork__cover
	width: 100%
	max-width: var(--music-artwork-cover-size, 240px)
	aspect-ratio: 1
	display: grid
	place-items: center
	overflow: hidden
	border-radius: var(--shape-corner-s)
	background: var(--surface-container-high)
	img
		width: 100%
		height: 100%
		object-fit: contain
		display: block
.music-artwork__placeholder
	display: grid
	place-items: center
	width: 100%
	height: 100%
	color: var(--on-surface-variant)
	:global(svg)
		width: 28%
		height: 28%
.music-artwork__body
	min-width: 0
.music-artwork__status
	margin: 0 0 var(--m3e-space-1)
	font: var(--m3e-type-label-small)
	color: var(--on-surface-variant)
.music-artwork__title
	display: block
	font: var(--m3e-type-title-medium)
	overflow-wrap: anywhere
.music-artwork__selector
	display: grid
	gap: var(--m3e-space-1)
	margin-top: var(--m3e-space-3)
	font: var(--m3e-type-label-medium)
	select
		min-height: 48px
		width: 100%
		min-width: 0
		padding: var(--m3e-space-2) var(--m3e-space-3)
		border: 1px solid var(--outline-variant)
		border-radius: var(--shape-corner-m)
		color: var(--on-surface)
		background: var(--surface-container-low)
		font: var(--m3e-type-body-medium)
.music-artwork__open
	display: inline-flex
	gap: var(--m3e-space-2)
	align-items: center
	justify-content: center
	min-height: 48px
	padding: var(--m3e-space-2) var(--m3e-space-3)
	margin-top: var(--m3e-space-3)
	border-radius: var(--shape-corner-m)
	background: var(--primary)
	color: var(--on-primary)
	font: var(--m3e-type-label-large)
	text-decoration: none
	--m3e-state-color: var(--on-primary)
	:global(svg)
		width: 20px
		height: 20px
.music-artwork__open:focus-visible,
.music-artwork__selector select:focus-visible
	outline: 2px solid var(--primary)
	outline-offset: 3px
.music-artwork__note
	margin: var(--m3e-space-2) 0 0
	font: var(--m3e-type-body-small)
	color: var(--on-surface-variant)
	overflow-wrap: anywhere
@media (max-width: bp-sm - 1px)
	.music-artwork
		grid-template-columns: 64px minmax(0, 1fr)
		gap: var(--m3e-space-3)
	.music-artwork__cover
		width: 64px
</style>
