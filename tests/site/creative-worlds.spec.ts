import { test, expect } from '@playwright/test';
test('Sakura defaults and three editions persist through navigation', async ({ page }) => {
 await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-visual-style','sakura');
 for (const mode of ['reverie','nocturne','blossom']) {await page.locator(`button[data-creative-edition="${mode}"]`).click();await expect(page.locator('html')).toHaveAttribute('data-creative-edition',mode)}
 await page.locator('a[href="/worlds/comics/"]').first().click();await expect(page.locator('.comic-pages img')).toHaveCount(16);await page.goBack();await expect(page.locator('button[data-creative-edition="blossom"]')).toHaveAttribute('aria-pressed','true');
});
test('mobile layouts fit; game external; decorative motion controllable',async({page})=>{
 await page.setViewportSize({width:390,height:844});for(const route of ['/','/worlds/','/worlds/comics/','/worlds/yigou/','/worlds/fear/']){await page.goto(route);await page.waitForTimeout(600);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()}
 await page.goto('/');await expect(page.locator('a[href="https://yf2cstg3fy.page.coze.site"]')).toHaveAttribute('target','_blank');await page.locator('[data-creative-motion]').check();await expect(page.locator('html')).toHaveAttribute('data-creative-paused','true');
});
