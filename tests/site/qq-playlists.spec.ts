import { expect, test } from "@playwright/test";
import { qqPlaylists } from "../../src/data/qq-playlists";

// Uses the repository's one-worker browser/server configuration. Never fetches audio.
test.beforeEach(async ({ page }) => {
	await page.route(
		/https:\/\/(y\.qq\.com\/music\/photo_new|qpic\.y\.qq\.com\/music_cover)\//,
		(route) => route.abort(),
	);
});

test("five selections synchronize public title, cover fallback and official URL without audio", async ({
	page,
}) => {
	const mediaRequests: string[] = [];
	page.on("request", (request) => {
		if (
			request.resourceType() === "media" ||
			/meting|\.mp3(?:\?|$)/i.test(request.url())
		)
			mediaRequests.push(request.url());
	});
	await page.goto("/");
	const card = page.locator("[data-music-artwork]");
	await expect(card).toHaveCount(1);
	const select = card.locator("select");
	await expect(select).toBeEnabled();
	await expect(select.locator("option")).toHaveCount(5);
	for (const playlist of qqPlaylists) {
		await select.selectOption(playlist.id);
		await expect(card).toHaveAttribute("data-playlist-id", playlist.id);
		await expect(card.locator(".music-artwork__title")).toHaveText(
			playlist.title,
		);
		await expect(card.locator(".music-artwork__open")).toHaveAttribute(
			"href",
			playlist.url,
		);
		await expect(card.locator(".music-artwork__cover")).toHaveAttribute(
			"data-cover-state",
			"unavailable",
		);
		await expect(card.locator(".music-artwork__placeholder")).toBeVisible();
		await expect(card).toHaveAttribute("data-playing", "false");
		await expect(card).toHaveAttribute("data-status", "external");
	}
	await expect(page.locator("audio")).toHaveCount(0);
	await expect(
		card.locator('input[type="range"], [role="progressbar"]'),
	).toHaveCount(0);
	expect(mediaRequests).toEqual([]);
});

test("selection survives article navigation and Swup back, with no full-page storage", async ({
	page,
}) => {
	await page.goto("/");
	const card = page.locator("[data-music-artwork]");
	await expect(card.locator("select")).toBeEnabled();
	await card.locator("select").selectOption(qqPlaylists[3].id);
	const link = page
		.locator('a[href*="/posts/"]')
		.filter({ visible: true })
		.first();
	await link.click();
	await expect(page).toHaveURL(/\/posts\//);
	await page.goBack();
	await expect(page).not.toHaveURL(/\/posts\//);
	await expect(card.locator("select")).toHaveValue(qqPlaylists[3].id);
	await expect(card.locator(".music-artwork__title")).toHaveText(
		qqPlaylists[3].title,
	);
	await page.reload();
	await expect(card.locator("select")).toHaveValue(qqPlaylists[0].id);
	await expect(card).toHaveAttribute("data-playing", "false");
});

test("320px layout retains long title and 48px touch controls", async ({
	page,
}) => {
	await page.setViewportSize({ width: 320, height: 740 });
	await page.goto("/");
	const card = page.locator("[data-music-artwork]");
	await expect(card.locator("select")).toBeEnabled();
	await card.locator("select").selectOption(qqPlaylists[1].id);
	await expect(card.locator(".music-artwork__title")).toHaveText(
		qqPlaylists[1].title,
	);
	await expect(card).toBeVisible();
	for (const control of [
		card.locator("select"),
		card.locator(".music-artwork__open"),
	]) {
		const box = await control.boundingBox();
		expect(box).not.toBeNull();
		if (!box) throw new Error("The playlist control must be rendered");
		expect(box.height).toBeGreaterThanOrEqual(48);
		expect(box.x).toBeGreaterThanOrEqual(0);
		expect(box.x + box.width).toBeLessThanOrEqual(320);
	}
});
