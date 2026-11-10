import source from "../../public/assets/creative/comic-library.json";
export interface ComicImage {
	src: string;
	thumb?: string;
	title?: string;
	width?: number;
	height?: number;
}
export interface ComicSeries {
	id: string;
	title: string;
	description: string;
	status?: string;
	items: ComicImage[];
}
export interface ComicCategory {
	/** Author-owned attribution for an original series; existing shelves keep the default. */
	credits?: string;
	id: string;
	title: string;
	description: string;
	cover?: string;
	series: ComicSeries[];
}
export const comicCategories: ComicCategory[] = source.categories;
export const comicHref = (category: string, series?: string): string =>
	`/worlds/comics/${category}/${series ? `${series}/` : ""}`;
