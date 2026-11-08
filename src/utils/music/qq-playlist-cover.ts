import type { QQPlaylistDescriptor } from "../../types/qqPlaylistConfig.ts";

/** A failed image stays unavailable during the mounted view, without retries. */
export function resolveQQPlaylistCover(
	playlist: QQPlaylistDescriptor,
	failedSources: readonly string[],
): string | null {
	const source = playlist.cover?.trim();
	return source && !failedSources.includes(source) ? source : null;
}

export function rememberQQPlaylistCoverFailure(
	failedSources: readonly string[],
	source: string | null,
): readonly string[] {
	if (!source || failedSources.includes(source)) return failedSources;
	return [...failedSources, source];
}
