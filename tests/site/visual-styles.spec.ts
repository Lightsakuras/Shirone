import { expect, test } from "@playwright/test";

const modes = ["sakura", "journal", "atelier", "starlit"] as const;

async function openPicker(page: import("@playwright/test").Page) {
	const picker = page.locator("[data-visual-style-picker]");
	if ((await picker.getAttribute("open")) === null) {
		await picker.locator("summary").click();
	}
	return picker;
}

test("composition selection persists independently of color and reading preferences", async ({
	page,
}) => {
	await page.goto("/");
	await page.evaluate(() => {
		localStorage.setItem("hue", "280");
		localStorage.setItem("theme", "dark");
		localStorage.setItem("post-list-mode", "grid");
	});
	for (const mode of modes) {
		const picker = await openPicker(page);
		await picker.locator(`[data-visual-style="${mode}"]`).click();
		await expect(page.locator("html")).toHaveAttribute(
			"data-visual-style",
			mode,
		);
		await expect(
			picker.locator(`[data-visual-style="${mode}"]`),
		).toHaveAttribute("aria-pressed", "true");
	}
	await page.reload();
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-style",
		"starlit",
	);
	expect(
		await page.evaluate(() => [
			localStorage.getItem("hue"),
			localStorage.getItem("theme"),
			localStorage.getItem("post-list-mode"),
		]),
	).toEqual(["280", "dark", "grid"]);
	await openPicker(page);
	await page.keyboard.press("Escape");
	await expect(page.locator("[data-visual-style-picker]")).not.toHaveAttribute(
		"open",
	);
	await expect(
		page.locator("[data-visual-style-picker] summary"),
	).toBeFocused();
});

test("picker remains usable after client navigation and resets to site default", async ({
	page,
}) => {
	await page.goto("/");
	await openPicker(page);
	await page.locator('button[data-visual-style="atelier"]').click();
	await page.keyboard.press("Escape");
	await page.locator('a[href="/archive/"]').first().click();
	await expect(page).toHaveURL(/\/archive\//);
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-style",
		"atelier",
	);
	await openPicker(page);
	await page.locator("[data-visual-style-reset]").click();
	expect(
		await page.evaluate(() => localStorage.getItem("shirone-visual-style")),
	).toBeNull();
	const defaultMode = await page
		.locator("script[data-visual-style-default]")
		.first()
		.getAttribute("data-visual-style-default");
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-style",
		defaultMode || "sakura",
	);
});

for (const width of [390, 1280]) {
	test(`all compositions fit a ${width}px viewport`, async ({ page }) => {
		await page.setViewportSize({ width, height: 900 });
		await page.goto("/");
		for (const mode of modes) {
			await openPicker(page);
			await page.locator(`button[data-visual-style="${mode}"]`).click();
			await page.keyboard.press("Escape");
			expect(
				await page.evaluate(
					() => document.documentElement.scrollWidth <= window.innerWidth + 1,
				),
			).toBe(true);
			if (width < 1024 && mode !== "sakura") {
				const main = await page.locator("#main-content-column").boundingBox();
				const sidebar = await page.locator("#sidebar").boundingBox();
				if (main && sidebar) expect(sidebar.y).toBeGreaterThan(main.y);
			}
		}
	});
}

test("desktop compositions change hierarchy rather than only color", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto("/");
	for (const mode of ["journal", "starlit", "atelier"]) {
		await openPicker(page);
		await page.locator(`button[data-visual-style="${mode}"]`).click();
		await page.keyboard.press("Escape");
		const main = await page.locator("#main-content-column").boundingBox();
		const rail = await page.locator("#sidebar").boundingBox();
		expect(main).not.toBeNull();
		expect(rail).not.toBeNull();
		if (!main || !rail) continue;
		if (mode === "journal") expect(rail.x).toBeGreaterThan(main.x);
		if (mode === "starlit") expect(rail.y).toBeGreaterThan(main.y);
		if (mode === "atelier") expect(rail.y).toBeGreaterThan(main.y);
	}
});

test("new layouts use a real editorial home and compact non-home routes", async ({
	page,
}) => {
	await page.goto("/");
	for (const mode of ["journal", "atelier", "starlit"]) {
		await openPicker(page);
		await page.locator(`button[data-visual-style="${mode}"]`).click();
		await page.keyboard.press("Escape");
		await expect(page.locator(".editorial-home")).toBeVisible();
		await expect(page.locator("#banner-wrapper")).toBeHidden();
		const avatar = await page
			.locator("#sidebar .m3-profile__avatar-link")
			.boundingBox();
		if (avatar) expect(avatar.width).toBeLessThanOrEqual(128);
	}
	await page.locator('.editorial-home a[href="/archive/"]').click();
	await expect(page).toHaveURL(/\/archive\//);
	await expect(page.locator(".editorial-home")).toHaveCount(0);
	await expect(page.locator("#banner-wrapper")).toBeHidden();
	await expect
		.poll(
			async () => (await page.locator("#main-content-column").boundingBox())?.y,
		)
		.toBeLessThan(160);
});

test("Sakura keeps the original home composition available", async ({
	page,
}) => {
	await page.goto("/");
	await openPicker(page);
	await page.locator('button[data-visual-style="sakura"]').click();
	await page.keyboard.press("Escape");
	await expect(page.locator(".editorial-home__identity")).toBeHidden();
	await expect(page.locator(".editorial-home__music")).toBeVisible();
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-style",
		"sakura",
	);
});

test("Atelier desktop spread has two columns and mobile home has no hidden-banner gap", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1165, height: 900 });
	await page.goto("/");
	await openPicker(page);
	await page.locator('button[data-visual-style="atelier"]').click();
	await page.keyboard.press("Escape");
	const identity = await page
		.locator(".editorial-home__identity")
		.boundingBox();
	const art = await page.locator(".editorial-home__music").boundingBox();
	expect(identity).not.toBeNull();
	expect(art).not.toBeNull();
	if (identity && art)
		expect(art.x).toBeGreaterThan(identity.x + identity.width);
	await page.setViewportSize({ width: 390, height: 844 });
	for (const mode of ["journal", "atelier", "starlit"]) {
		await openPicker(page);
		await page.locator(`button[data-visual-style="${mode}"]`).click();
		await page.keyboard.press("Escape");
		await expect
			.poll(async () => (await page.locator("#main-layout").boundingBox())?.y)
			.toBeLessThan(120);
	}
});

test("article measure is bounded and only an exact leading duplicate is hidden", async ({
	page,
}) => {
	await page.goto("/");
	await openPicker(page);
	await page.locator('button[data-visual-style="journal"]').click();
	await page.keyboard.press("Escape");
	await page.locator(".m3-blog-postcard__title").first().click();
	const body = page.locator(".post-card > .custom-md").first();
	await expect(body).toBeVisible();
	const measure = await body.evaluate((el) => ({
		width: el.getBoundingClientRect().width,
		em: Number.parseFloat(getComputedStyle(el).fontSize),
	}));
	expect(measure.width).toBeLessThanOrEqual(measure.em * 40 + 1);
	const duplicate = page.locator(
		'[data-leading-title-duplicate="true"] .custom-md > h1:first-child, [data-leading-title-duplicate="true"] .custom-md > section:first-child > h1:first-child',
	);
	if (await duplicate.count()) {
		await expect(duplicate).toBeHidden();
		await openPicker(page);
		await page.locator('button[data-visual-style="sakura"]').click();
		await page.keyboard.press("Escape");
		await expect(duplicate).toBeVisible();
	}
});

test("design colors are independent, persistent and leave personal colors recoverable", async ({
	page,
}) => {
	await page.addInitScript(() => {
		localStorage.setItem("hue", "280");
		localStorage.setItem("theme", "dark");
	});
	await page.goto("/");
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-color",
		"personal",
	);
	await openPicker(page);
	await page.locator('button[data-visual-style="atelier"]').click();
	const personal = await page
		.locator("html")
		.evaluate((el) =>
			getComputedStyle(el).getPropertyValue("--primary").trim(),
		);
	await page.locator('button[data-visual-color="curated"]').click();
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-color",
		"curated",
	);
	const curated = await page
		.locator("html")
		.evaluate((el) =>
			getComputedStyle(el).getPropertyValue("--primary").trim(),
		);
	expect(curated).not.toBe(personal);
	expect(await page.evaluate(() => localStorage.getItem("hue"))).toBe("280");
	await expect(page.locator("html")).toHaveClass(/dark/);
	await page.reload();
	await expect(page.locator("html")).toHaveAttribute(
		"data-visual-color",
		"curated",
	);
	await openPicker(page);
	await page.locator('button[data-visual-color="personal"]').click();
	await expect
		.poll(() =>
			page
				.locator("html")
				.evaluate((el) =>
					getComputedStyle(el).getPropertyValue("--primary").trim(),
				),
		)
		.toBe(personal);
});

test("reduced motion disables the added image movement", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/");
	await openPicker(page);
	await page.locator('button[data-visual-style="starlit"]').click();
	await page.keyboard.press("Escape");
	await page.locator(".editorial-home__art").hover();
	await expect(page.locator(".editorial-home__art img")).toHaveCSS(
		"transform",
		"none",
	);
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.evaluate(() =>
		document.documentElement.classList.add("motion-reduced"),
	);
	await expect(page.locator(".editorial-home__art img")).toHaveCSS(
		"transform",
		"none",
	);
});

test("flow visibly animates, pauses persistently and respects reduced motion", async ({
	page,
}) => {
	await page.goto("/");
	await page.evaluate(() => {
		localStorage.setItem("shirone-visual-style", "journal");
		localStorage.setItem("shirone-visual-color", "curated");
		localStorage.removeItem("shirone-visual-motion");
	});
	await page.reload();
	const beam = page.locator(
		".editorial-home__flow--identity .editorial-home__light",
	);
	await expect(beam).toBeVisible();
	// Decorative motion must work while the truthful QQ card is not playing.
	await expect(page.locator(".music-artwork")).toHaveAttribute(
		"data-playing",
		"false",
	);
	expect(
		await beam.evaluate((el) => getComputedStyle(el, "::before").animationName),
	).toBe("visual-light-flow");
	const first = await beam.evaluate(
		(el) => getComputedStyle(el, "::before").transform,
	);
	await page.waitForTimeout(200);
	expect(
		await beam.evaluate((el) => getComputedStyle(el, "::before").transform),
	).not.toBe(first);
	await page.locator("[data-visual-flow-pause]").check();
	await page.reload();
	await expect(page.locator("[data-visual-flow-pause]")).toBeChecked();
	expect(
		await beam.evaluate((el) => getComputedStyle(el, "::before").animationName),
	).toBe("none");
	await page.locator("[data-visual-flow-pause]").uncheck();
	await page.emulateMedia({ reducedMotion: "reduce" });
	expect(
		await beam.evaluate((el) => getComputedStyle(el, "::before").animationName),
	).toBe("none");
	await expect(page.locator('[data-color-state="curated"]')).toBeVisible();
});

test("Atelier support copy sits on a surface plane instead of blue canvas", async ({
	page,
}) => {
	await page.goto("/");
	await page.evaluate(() => {
		localStorage.setItem("shirone-visual-style", "atelier");
		localStorage.setItem("shirone-visual-color", "curated");
	});
	await page.reload();
	for (const selector of ["#sidebar", "#main-grid > .footer"]) {
		const colors = await page.locator(selector).evaluate((el) => {
			const probe = document.createElement("span");
			probe.style.backgroundColor = "var(--surface-container-lowest)";
			el.append(probe);
			const expected = getComputedStyle(probe).backgroundColor;
			probe.remove();
			return { actual: getComputedStyle(el).backgroundColor, expected };
		});
		expect(colors.actual).toBe(colors.expected);
	}
});

test("each redesigned layout has independent flow without creating playback", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.goto("/");
	await page.evaluate(() => localStorage.removeItem("shirone-visual-motion"));
	await page.reload();
	for (const mode of ["journal", "atelier", "starlit"]) {
		await openPicker(page);
		await page.locator(`button[data-visual-style="${mode}"]`).click();
		await page.keyboard.press("Escape");
		const selector =
			mode === "starlit"
				? ".editorial-home__flow--art"
				: ".editorial-home__flow--identity";
		const beam = page.locator(`${selector} .editorial-home__light`);
		await beam.scrollIntoViewIfNeeded();
		await expect(beam).toBeVisible();
		await expect(page.locator(".music-artwork")).toHaveAttribute(
			"data-playing",
			"false",
		);
		await expect
			.poll(() =>
				beam.evaluate(
					(el) => getComputedStyle(el, "::before").animationPlayState,
				),
			)
			.toBe("running");
		expect(
			await beam.evaluate(
				(el) => getComputedStyle(el, "::before").animationName,
			),
		).toBe(mode === "atelier" ? "visual-light-vertical" : "visual-light-flow");
		await page.evaluate(() =>
			document.documentElement.classList.add("motion-reduced"),
		);
		expect(
			await beam.evaluate(
				(el) => getComputedStyle(el, "::before").animationName,
			),
		).toBe("none");
		await page.evaluate(() =>
			document.documentElement.classList.remove("motion-reduced"),
		);
	}
	await expect(page.locator(".editorial-home__study")).toHaveCount(0);
});
