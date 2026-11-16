import { expect, test } from "@playwright/test";
import library from "../../public/assets/creative/comic-library.json";

test("chapter directory distinguishes available chapters from page navigation", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/worlds/comics/namer/");
	const directory = page.locator("#chapter-directory");
	await expect(
		directory.getByRole("heading", { name: "每话目录" }),
	).toBeVisible();
	await expect(directory.locator('a[href$="episode-08/"]')).toBeVisible();
	const pending = library.categories
		.find((c) => c.id === "namer")
		?.series.find((s) => s.items.length === 0);
	if (pending)
		await expect(directory.locator(`a[href$="${pending.id}/"]`)).toHaveCount(0);
	await directory.locator('a[href$="episode-02/"]').click();
	await expect(page).toHaveURL(/episode-02/);
	await expect(
		page
			.locator(".comic-chapter-shortcuts")
			.getByRole("link", { name: "← 上一话" }),
	).toHaveAttribute("href", /episode-01/);
	await expect(
		page
			.locator(".comic-chapter-shortcuts")
			.getByRole("link", { name: "下一话 →" }),
	).toHaveAttribute("href", /episode-03/);
	await expect(page.locator(".comic-page-index a")).toHaveCount(12);
	await page.locator(".comic-chapter-expand summary").click();
	await expect(
		page.locator('#chapter-directory a[aria-current="page"]'),
	).toHaveAttribute("href", /episode-02/);
	await page
		.locator(".comic-chapter-shortcuts")
		.getByRole("link", { name: "每话目录", exact: true })
		.click();
	await expect(page).toHaveURL(/namer\/#chapter-directory/);
	await page.goBack();
	await expect(page.locator(".comic-page-index a")).toHaveCount(12);
	await expect(page.locator("body")).toHaveJSProperty("scrollWidth", 390);
});
