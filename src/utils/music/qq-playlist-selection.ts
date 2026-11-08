import type { ResolvedQQPlaylistOptions } from "@/config/qqPlaylistConfig";
import type { QQPlaylistDescriptor } from "../../types/qqPlaylistConfig.ts";

export interface QQPlaylistSelection {
	getSelected(): QQPlaylistDescriptor;
	select(id: string): boolean;
	subscribe(listener: (playlist: QQPlaylistDescriptor) => void): () => void;
}

/** Session-only view state: no audio, requests, localStorage or playback claims. */
export function createQQPlaylistSelection(
	options: ResolvedQQPlaylistOptions,
): QQPlaylistSelection {
	if (!options.playlists.length)
		throw new Error("A playlist selection requires a non-empty catalog");
	let selected =
		options.playlists.find(
			(playlist) => playlist.id === options.defaultPlaylistId,
		) ?? options.playlists[0];
	const listeners = new Set<(playlist: QQPlaylistDescriptor) => void>();
	return {
		getSelected: () => selected,
		select(id) {
			const next = options.playlists.find((playlist) => playlist.id === id);
			if (!next) return false;
			if (selected.id === next.id) return true;
			selected = next;
			for (const listener of listeners) listener(selected);
			return true;
		},
		subscribe(listener) {
			listeners.add(listener);
			listener(selected);
			return () => {
				listeners.delete(listener);
			};
		},
	};
}

let selection: QQPlaylistSelection | null = null;
export function getQQPlaylistSelection(
	options: ResolvedQQPlaylistOptions,
): QQPlaylistSelection {
	selection ??= createQQPlaylistSelection(options);
	return selection;
}
