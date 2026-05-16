import { expect, test } from '@playwright/test';

test('main navigation opens first-version pages', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '个人数字平台', exact: true })).toBeVisible();

  const menuButton = page.getByRole('button', { name: '菜单' });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '项目', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: '项目作品' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '博客', exact: true }).click();
  await expect(page.getByRole('heading', { name: '博客记录' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '工具', exact: true }).click();
  await expect(page.getByRole('heading', { name: '工具入口' })).toBeVisible();

  if (await menuButton.isVisible()) {
    await menuButton.click();
  }
  await page.getByRole('link', { name: '关于', exact: true }).click();
  await expect(page.getByRole('heading', { name: '关于我' })).toBeVisible();
});

test('deep routes and public SEO files are reachable locally', async ({ page }) => {
  const routes = [
    '/',
    '/projects',
    '/projects/nexfolio',
    '/blog',
    '/blog/testing-from-day-one',
    '/tools',
    '/about',
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.getByText('页面没有找到')).toHaveCount(0);
  }

  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain('Sitemap: https://nexfolio-one.vercel.app/sitemap.xml');

  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('https://nexfolio-one.vercel.app/blog/testing-from-day-one');
});

test('project and blog detail pages include richer content', async ({ page }) => {
  await page.goto('/projects/nexfolio');
  await expect(page.getByText('项目背景')).toBeVisible();
  await expect(page.getByText('为什么做')).toBeVisible();
  await expect(page.getByText('解决什么问题')).toBeVisible();
  await expect(page.getByText('访问链接状态')).toBeVisible();

  await page.goto('/blog/testing-from-day-one');
  await expect(page.getByRole('heading', { name: '从第一天开始建立测试体系' })).toBeVisible();
  await expect(page.getByText('测试不是项目收尾时的补丁。')).toBeVisible();
});

test('horizontal rails support wheel-assisted horizontal scroll', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'wheel-assisted scrolling is a desktop pointer behavior');

  await page.goto('/');
  const rail = page.getByLabel('精选项目横向滑动', { exact: true });

  const before = await rail.evaluate((element) => element.scrollLeft);
  await rail.hover();
  await page.mouse.wheel(0, 460);
  await expect.poll(async () => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before);

  await page.getByRole('button', { name: '向右切换' }).first().click();
  await expect.poll(async () => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
});

test('studio login degrades gracefully without Supabase env vars', async ({ page }) => {
  await page.goto('/studio/login');
  await expect(page.getByRole('heading', { name: 'Supabase 未配置' })).toBeVisible();

  await page.goto('/studio');
  await expect(page).toHaveURL(/\/studio\/login$/);
  await expect(page.getByRole('heading', { name: 'Supabase 未配置' })).toBeVisible();
});

test('mobile navigation uses a compact menu and layout stays within viewport', async ({ page }) => {
  for (const width of [390, 430, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(width);
    await expect(page.getByRole('button', { name: '菜单' })).toBeVisible();
  }

  await page.getByRole('button', { name: '菜单' }).click();
  await expect(page.getByRole('navigation', { name: '主导航' })).toBeVisible();
  await expect(page.getByRole('link', { name: '项目', exact: true })).toBeVisible();
});
