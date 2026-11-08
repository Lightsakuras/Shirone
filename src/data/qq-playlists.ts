import type { QQPlaylistDescriptor } from "../types/qqPlaylistConfig.ts";

/**
 * User-supplied QQ shares, resolved on the official website on 2026-11-07.
 * Titles and cover URLs are the public playlist page's heading and matching image.
 * A cover here represents the playlist, not a claimed currently playing album.
 * No audio URLs, cookies, private APIs or copied audio are stored in this catalog.
 */
export const qqPlaylists: readonly QQPlaylistDescriptor[] = [
	{
		id: "9717616331",
		label: "低音炮",
		title: "低音炮，极致的致幻沉溺",
		url: "https://y.qq.com/n/ryqq_v2/playlist/9717616331",
		shareUrl: "https://c6.y.qq.com/base/fcgi-bin/u?__=hnCtGQvGqqiZ",
		cover:
			"https://y.qq.com/music/photo_new/T002R500x500M000000YcW6z3MwiEB.jpg?max_age=2592000&err_retry=1",
		verifiedAt: "2026-11-07",
	},
	{
		id: "9493362293",
		label: "纯音乐",
		title: "氛围纯音词句旋律，孤独怜惜压抑高涨",
		url: "https://y.qq.com/n/ryqq_v2/playlist/9493362293",
		shareUrl: "https://c6.y.qq.com/base/fcgi-bin/u?__=XLSvZYvGqmmZ",
		cover:
			"https://qpic.y.qq.com/music_cover/jEspYJic0xDTricH1FBRFCPKq4k5oic1s6WIWctgvLzGy9c81vTTKlxQA/600",
		verifiedAt: "2026-11-07",
	},
	{
		id: "9471028899",
		label: "2077里的音乐",
		title: "赛博朋克2077里的音乐",
		url: "https://y.qq.com/n/ryqq_v2/playlist/9471028899",
		shareUrl: "https://c6.y.qq.com/base/fcgi-bin/u?__=0hd0uyvGqaDx",
		cover:
			"https://y.qq.com/music/photo_new/T002R500x500M000001ZZKGJ3ALMnT.jpg?max_age=2592000",
		verifiedAt: "2026-11-07",
	},
	{
		id: "9417693477",
		label: "湮灭",
		title: "湮灭",
		url: "https://y.qq.com/n/ryqq_v2/playlist/9417693477",
		shareUrl: "https://c6.y.qq.com/base/fcgi-bin/u?__=CNyGSCvGqjEa",
		cover:
			"https://y.qq.com/music/photo_new/T002R500x500M000001ncM7o3oCeFb.jpg?max_age=2592000",
		verifiedAt: "2026-11-07",
	},
	{
		id: "9397045418",
		label: "仙曲",
		title: "仙曲",
		url: "https://y.qq.com/n/ryqq_v2/playlist/9397045418",
		shareUrl: "https://c6.y.qq.com/base/fcgi-bin/u?__=9uSsSbvGqnZu",
		cover:
			"https://y.qq.com/music/photo_new/T002R500x500M000001KsTdW3f3W9A.jpg?max_age=2592000",
		verifiedAt: "2026-11-07",
	},
];
