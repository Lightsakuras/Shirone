import { test, expect } from "@playwright/test";

const root = "/worlds/comics/namer/";
test("Namer shelf exposes only the 148 illustrated pages in chapter order", async ({
	page,
}) => {
	await page.goto("/worlds/comics/");
	await page.locator(`.comic-shelf-card[href="${root}"]`).click();
	await expect(page.locator(".comic-series-card")).toHaveCount(11);
	const hrefs = await page
		.locator(".comic-series-card")
		.evaluateAll((links) => links.map((a) => a.getAttribute("href")));
	expect(hrefs).toEqual([
		`${root}original/`,
		...Array.from(
			{ length: 10 },
			(_, i) => `${root}episode-${String(i + 1).padStart(2, "0")}/`,
		),
	]);
	await page.locator(`.comic-series-card[href="${root}original/"]`).click();
	await expect(page.locator(".comic-reader img")).toHaveCount(28);
	await expect(page.locator(".comic-story-pagination a")).toHaveCount(1);
	await expect(page.locator(".comic-story-pagination a")).toHaveAttribute(
		"href",
		`${root}episode-01/`,
	);
	await expect(page.locator(".creative-footer-note")).toContainText("原创漫画");
});

test("Namer page controls, local resume, chapter navigation and history work", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto(`${root}episode-01/`);
	await expect(page.locator(".comic-reader img")).toHaveCount(12);
	await expect(page.locator("[data-comic-prev]")).toBeDisabled();
	await page.locator("[data-comic-select]").selectOption("12");
	await expect(page.locator("[data-comic-next]")).toBeDisabled();
	await page.reload();
	await expect(page.locator("[data-comic-resume]")).toHaveAttribute(
		"href",
		"#page-12",
	);
	await page.locator("[data-comic-resume]").click();
	await expect(page.locator("[data-comic-select]")).toHaveValue("12");
	await page
		.locator(`.comic-story-pagination a[href="${root}episode-02/"]`)
		.click();
	await expect(page.locator("[data-comic-reader]")).toHaveAttribute(
		"data-comic-reader",
		"namer/episode-02",
	);
	await expect(page.locator("[data-comic-select]")).toHaveValue("1");
	await page.goBack();
	await expect(page.locator("[data-comic-reader]")).toHaveAttribute(
		"data-comic-reader",
		"namer/episode-01",
	);
	await page.locator("[data-comic-select]").selectOption("2");
	await expect(
		page.locator('.comic-page-index a[aria-current="page"]'),
	).toHaveText("02");
	await page.goto(`${root}episode-10/`);
	await expect(page.locator(".comic-story-pagination a")).toHaveCount(1);
	await expect(page.locator(".comic-story-pagination a")).toHaveAttribute(
		"href",
		`${root}episode-09/`,
	);
});

test("Namer shelf and long original reader fit narrow screens", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 740 });
	for (const route of [root, `${root}original/`, `${root}episode-10/`]) {
		await page.goto(route);
		await expect(page.locator(".comic-library")).toBeVisible();
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
		).toBeTruthy();
	}
});
