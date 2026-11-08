import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { communityConfig } from "../../src/config/communityConfig";
import I18nKey from "../../src/i18n/i18nKey";
import { i18n } from "../../src/i18n/translation";

test.describe("community local studio", () => {
	test.skip(
		!communityConfig.enable || !!communityConfig.apiUrl,
		"Local preview requires enabled community with no remote API.",
	);
	test("unconfigured editor stores a draft locally without auth or API calls", async ({
		page,
	}) => {
		const requests: string[] = [];
		page.on("request", (request) => {
			if (/\/v1\/|\/authorize|\/\.well-known\//.test(request.url()))
				requests.push(request.url());
		});
		await page.goto("/admin/");
		await expect(
			page.getByText(i18n(I18nKey.communityUnconfigured)),
		).toBeVisible();
		await page
			.getByLabel(i18n(I18nKey.communityTitleLabel), { exact: true })
			.fill("A quiet afternoon");
		await page
			.getByLabel(i18n(I18nKey.communitySlug), { exact: true })
			.fill("quiet-afternoon");
		await page
			.getByLabel(i18n(I18nKey.communityBody), { exact: true })
			.fill(
				"# Hello\n\n<script>window.injected=true</script>\n\n```js\nline one\n\nline two\n```",
			);
		await expect(
			page.getByRole("button", {
				name: i18n(I18nKey.communityPublish),
				exact: true,
			}),
		).toBeDisabled();
		await page
			.getByRole("button", { name: i18n(I18nKey.communityDraft), exact: true })
			.click();
		await expect(
			page.getByText(i18n(I18nKey.communityLocalSaved)),
		).toBeVisible();
		await page.reload();
		await expect(
			page.getByLabel(i18n(I18nKey.communityTitleLabel), { exact: true }),
		).toHaveValue("A quiet afternoon");
		await page
			.getByRole("button", {
				name: i18n(I18nKey.communityPreview),
				exact: true,
			})
			.click();
		await expect(page.locator(".community-prose")).toContainText(
			"<script>window.injected=true</script>",
		);
		await expect(page.locator(".community-prose code")).toContainText(
			"line one\n\nline two",
		);
		expect(await page.evaluate(() => "injected" in window)).toBe(false);
		const download = page.waitForEvent("download");
		await page
			.getByRole("button", { name: i18n(I18nKey.communityExport), exact: true })
			.click();
		expect((await download).suggestedFilename()).toBe("quiet-afternoon.md");
		expect(requests).toEqual([]);
	});
	test("studio is keyboard labelled and has no horizontal overflow on mobile", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/admin/");
		await page.waitForFunction(
			() =>
				!!getComputedStyle(document.documentElement)
					.getPropertyValue("--mc-primary")
					.trim(),
		);
		await expect(page.locator(".community-editor")).toBeVisible();
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
		).toBe(true);
		const result = await new AxeBuilder({ page })
			.include(".community-app")
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze();
		expect(result.violations).toEqual([]);
	});
});

// Visual integration checks; run against the freshly built current source, not an older preview.
for (const style of ["sakura", "journal", "atelier", "starlit"]) {
	test(`community ${style} preserves navigation, honest setup and mobile studio`, async ({
		page,
	}) => {
		test.skip(
			!communityConfig.enable || !!communityConfig.apiUrl,
			"Requires an unconfigured community preview.",
		);
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/admin/");
		await page.waitForFunction(
			() =>
				!!getComputedStyle(document.documentElement)
					.getPropertyValue("--mc-primary")
					.trim(),
		);
		await page.evaluate((style) => {
			document.documentElement.dataset.visualStyle = style;
		}, style);
		await expect(page.locator(".community-heading h1")).toHaveText(
			i18n(I18nKey.communityAdmin),
		);
		await expect(
			page.locator('.community-nav a[aria-current="page"]'),
		).toHaveAttribute("href", /\/admin\/$/);
		await expect(
			page.getByText(i18n(I18nKey.communityUnconfigured)),
		).toBeVisible();
		await expect(
			page.getByRole("button", {
				name: i18n(I18nKey.communityPublish),
				exact: true,
			}),
		).toBeDisabled();
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
		).toBe(true);
		await expect(page.locator(".community-studio")).toHaveCSS(
			"grid-template-columns",
			/^\d+(?:\.\d+)?px$/,
		);
	});
}
