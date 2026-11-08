/** A verified public QQ Music playlist, not a playable audio source. */
export interface QQPlaylistDescriptor {
	readonly id: string;
	readonly label: string;
	readonly title: string;
	readonly url: string;
	readonly shareUrl: string;
	readonly cover?: string;
	readonly verifiedAt: string;
}

export interface QQPlaylistConfig {
	/** 独立歌单收藏开关；不启用或修改 musicConfig 的音频服务。 */
	readonly enable: boolean;
	/** 首次打开页面时选择的真实 QQ 歌单 ID。无效时使用列表第一项。 */
	readonly defaultPlaylistId?: string;
}
