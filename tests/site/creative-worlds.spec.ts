import { test, expect } from '@playwright/test';
test('Sakura defaults and three editions persist through navigation', async ({ page }) => {
 await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-visual-style','sakura');
 for (const mode of ['reverie','nocturne','blossom']) {await page.locator(`.creative-editions button[data-creative-edition="${mode}"]`).click();await expect(page.locator('html')).toHaveAttribute('data-creative-edition',mode)}
 await page.locator('a[href="/worlds/comics/"]').first().click();await expect(page.locator('.comic-shelf-card')).toHaveCount(5);await page.goBack();await expect(page.locator('.creative-editions button[data-creative-edition="blossom"]')).toHaveAttribute('aria-pressed','true');
});
test('mobile layouts fit; game external; decorative motion controllable',async({page})=>{
 await page.setViewportSize({width:390,height:844});for(const route of ['/','/worlds/','/worlds/comics/','/worlds/yigou/','/worlds/fear/']){await page.goto(route);await page.waitForTimeout(600);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()}
 await page.goto('/');await expect(page.locator('a[href="https://yf2cstg3fy.page.coze.site"]')).toHaveAttribute('target','_blank');await page.locator('[data-creative-motion]').check();await expect(page.locator('html')).toHaveAttribute('data-creative-paused','true');
});

test('comic categories lead to ordered readers and avatar stays empty',async({page})=>{
 await page.goto('/worlds/comics/');await expect(page.locator('.comic-shelf-card')).toHaveCount(5);
 await page.locator('.comic-shelf-card[href="/worlds/comics/cat-travel/"]').click();await expect(page.locator('.comic-series-card')).toHaveCount(3);
 await page.locator('.comic-series-card[href="/worlds/comics/cat-travel/cat-cafe/"]').click();await expect(page.locator('.comic-reader img')).toHaveCount(3);
 await page.goBack();await expect(page.locator('.comic-series-card')).toHaveCount(3);
 await page.goto('/worlds/comics/daily/pudding/');await expect(page.locator('.comic-reader img')).toHaveCount(3);
 await page.goto('/');await expect(page.locator('.m3-profile__avatar-link img').first()).toHaveAttribute('src',/avatar-black.svg/);await expect(page.locator('.m3-profile__avatar-overlay')).toHaveCount(0);
 await page.locator('[data-creative-motion]').check();expect(await page.locator('.creative-light-ribbons path').first().evaluate(el=>getComputedStyle(el).animationPlayState)).toBe('paused');
});

test('reader controls track page, resume locally, and navigate chapters',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/worlds/comics/daily/pudding/');
 await expect(page.locator('[data-comic-tools]')).toBeVisible();
 await expect(page.locator('[data-comic-prev]')).toBeDisabled();
 await page.locator('[data-comic-select]').selectOption('3');
 await expect(page.locator('[data-comic-next]')).toBeDisabled();
 const toolbar=await page.locator('[data-comic-tools]').boundingBox();
 expect(toolbar?.y).toBeGreaterThanOrEqual(0);
 expect(toolbar?.y).toBeLessThan(120);
 await expect(page.locator('.comic-page-index a[aria-current="page"]')).toHaveText('03');
 await page.reload();
 await expect(page.locator('[data-comic-resume]')).toBeVisible();
 await expect(page.locator('[data-comic-resume]')).toHaveAttribute('href','#page-3');
 await page.locator('[data-comic-resume]').click();
 await expect(page.locator('[data-comic-select]')).toHaveValue('3');
 await page.locator('.comic-story-pagination a').last().click();
 await expect(page.locator('[data-comic-reader]')).not.toHaveAttribute('data-comic-reader','daily/pudding');
 await page.goBack();
 await expect(page.locator('[data-comic-tools]')).toBeVisible();
 await page.locator('[data-comic-select]').selectOption('2');
 await expect(page.locator('.comic-page-index a[aria-current="page"]')).toHaveText('02');
});

test('material motifs are decorative and reading artwork remains opaque',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.creative-intro__ornament .creative-motif')).toHaveCount(2);
 await expect(page.locator('.creative-intro__ornament .creative-motif').first()).toHaveAttribute('aria-hidden','true');
 await page.goto('/worlds/comics/daily/pudding/');
 await expect(page.locator('.comic-library__heading .creative-motif')).toHaveCount(1);
 expect(await page.locator('.comic-library').evaluate(el=>getComputedStyle(el).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
});


test('header versions expose new editions and preserve legacy styles', async ({page}) => {
 await page.goto('/');
 const picker=page.locator('[data-visual-style-picker]');
 await picker.locator('summary').click();
 await picker.locator('[data-visual-style="journal"]').click();
 await picker.locator('[data-creative-edition="reverie"]').click();
 await expect(page.locator('html')).toHaveAttribute('data-visual-style','sakura');
 await expect(page.locator('html')).toHaveAttribute('data-creative-edition','reverie');
 await expect(picker.locator('[data-creative-edition="reverie"]')).toHaveAttribute('aria-pressed','true');
 await page.keyboard.press('Escape');await expect(picker).not.toHaveAttribute('open','');
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-creative-edition','reverie');
});
