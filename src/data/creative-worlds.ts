/** Author-owned project content; interface copy is translated separately. */
export interface CreativeWorld {
	id: string;
	number: string;
	label: string;
	title: string;
	shortTitle: string;
	description: string;
	accent: string;
	cover: string;
	category: string;
}
export const creativeWorlds: CreativeWorld[] = [
	{
		id: "comics",
		number: "01",
		label: "AI 娘的冒险手记",
		title: "她们的世界，\n不只有日常。",
		shortTitle: "AI 娘漫画",
		description:
			"猫娘的镜头、白龙娘的魔法、大肥鱼的饭盆。走进她们吵吵闹闹又彼此陪伴的冒险。",
		accent: "comics",
		cover: "/assets/creative/ark-01-01-thumb.webp",
		category: "漫画 / COMICS",
	},
	{
		id: "yigou",
		number: "02",
		label: "遗构潮汐 · 原创企划",
		title: "旧世界沉没之后，\n她们走向远方。",
		shortTitle: "遗构潮汐",
		description:
			"废土巨构、赛博联邦与玄幻力量交汇的世界。双女主以独行者的姿态，穿行于文明的余烬。",
		accent: "relic",
		cover: "/assets/creative/yigou-bridge.webp",
		category: "世界观 / WORLDBUILDING",
	},
	{
		id: "fear",
		number: "03",
		label: "巨物与未知 · 视觉实验",
		title: "在渺小与庞大之间，\n看见未知。",
		shortTitle: "巨物与未知",
		description:
			"海面、城市与荒原，不可名状的存在正在苏醒。光、尺度与空间，构成一瞬间的敬畏。",
		accent: "sublime",
		cover: "/assets/creative/fear-sea.webp",
		category: "视觉叙事 / VISUAL STORIES",
	},
];
export const creativeGame = {
	title: "修仙命运录",
	subtitle: "一念之差，仙魔殊途",
	url: "https://yf2cstg3fy.page.coze.site",
};
