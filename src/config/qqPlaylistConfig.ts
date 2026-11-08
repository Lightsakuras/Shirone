import { qqPlaylists } from "../data/qq-playlists.ts";
import type {
	QQPlaylistConfig,
	QQPlaylistDescriptor,
} from "../types/qqPlaylistConfig.ts";
import { withUserConfig } from "../utils/config-overlay.ts";

/** 用户明确提供的 QQ 音乐歌单收藏；与现有音频播放器完全独立。 */
export const qqPlaylistConfig: QQPlaylistConfig = withUserConfig("qqPlaylist", {
	enable: true,
	defaultPlaylistId: "9717616331",
});

export interface ResolvedQQPlaylistOptions {
	readonly playlists: readonly QQPlaylistDescriptor[];
	readonly defaultPlaylistId: string;
}

export function resolveQQPlaylistOptions(
	config: QQPlaylistConfig,
	catalog: readonly QQPlaylistDescriptor[] = qqPlaylists,
): ResolvedQQPlaylistOptions | null {
	if (!config.enable) return null;
	const usedIds = new Set<string>();
	const playlists = catalog
		.filter((playlist) => {
			if (
				!/^\d+$/.test(playlist.id) ||
				!playlist.label.trim() ||
				!playlist.title.trim() ||
				usedIds.has(playlist.id)
			)
				return false;
			if (playlist.url !== `https://y.qq.com/n/ryqq_v2/playlist/${playlist.id}`)
				return false;
			usedIds.add(playlist.id);
			return true;
		})
		.map((playlist) => Object.freeze({ ...playlist }));
	if (!playlists.length) return null;
	return Object.freeze({
		playlists: Object.freeze(playlists),
		defaultPlaylistId: playlists.some(
			(playlist) => playlist.id === config.defaultPlaylistId,
		)
			? (config.defaultPlaylistId as string)
			: playlists[0].id,
	});
}
