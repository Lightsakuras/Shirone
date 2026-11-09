/** Original procedural score; reproducible with scripts/audio/compose.py. No third-party samples. */
export interface CreativeAudioTrack {
	id: string;
	title: string;
	source: string;
}
export const creativeAudioTracks: readonly CreativeAudioTrack[] = [
	{
		id: "sakura-after-rain",
		title: "雨后樱庭 / Sakura After Rain",
		source: "/audio/creative/sakura-after-rain.mp3",
	},
	{
		id: "tidal-observatory",
		title: "潮汐观测站 / Tidal Observatory",
		source: "/audio/creative/tidal-observatory.mp3",
	},
	{
		id: "starlit-walk",
		title: "星灯漫步 / Starlit Walk",
		source: "/audio/creative/starlit-walk.mp3",
	},
];
