import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = resolve('screenshots');
await mkdir(OUT, { recursive: true });

const VIEWPORTS = [
  { name: '375', width: 375, height: 800 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
];

const ROUTES = [
  { path: '/', label: 'home' },
  { path: '/blog/', label: 'blog' },
  { path: '/projects/', label: 'projects' },
  { path: '/experience/', label: 'experience' },
  { path: '/blog/ai-crm-automation/', label: 'blog-post' },
  { path: '/projects/ad-revenue-pipeline/', label: 'project' },
  { path: '/this-route-does-not-exist/', label: '404' },
];

const issues = [];

function logIssue(msg) {
  issues.push(msg);
  console.log(`  ! ${msg}`);
}

async function checkOverflow(page, label) {
  const result = await page.evaluate(() => {
    const root = document.documentElement;
    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    };
  });
  const overflow = result.scrollWidth - result.clientWidth;
  if (overflow > 1) {
    logIssue(`${label}: horizontal overflow of ${overflow}px (scroll=${result.scrollWidth} client=${result.clientWidth})`);
  }
  return overflow;
}

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  console.log(`\n=== viewport ${vp.name} (${vp.width}x${vp.height}) ===`);
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });

  for (const route of ROUTES) {
    const page = await context.newPage();
    const url = `${BASE}${route.path}`;
    let status;
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
      status = resp?.status();
    } catch (err) {
      logIssue(`${vp.name}/${route.label}: navigation error ${err.message}`);
      await page.close();
      continue;
    }

    // 404 page should serve as 404 in built mode, but dev server returns 200. Either way it should render.
    if (status && status >= 500) {
      logIssue(`${vp.name}/${route.label}: status ${status}`);
    }

    await checkOverflow(page, `${vp.name}/${route.label}`);
    await page.screenshot({ path: `${OUT}/${vp.name}-${route.label}.png`, fullPage: false });

    // Interactive checks
    if (vp.width < 768 && route.path === '/') {
      // Mobile hamburger
      const btn = page.locator('#mobile-menu-btn');
      if (await btn.count()) {
        await btn.click();
        await page.waitForTimeout(300);
        const menuVisible = await page.locator('#mobile-menu').isVisible();
        if (!menuVisible) logIssue(`${vp.name}/home: hamburger click did not reveal #mobile-menu`);
        await checkOverflow(page, `${vp.name}/home (menu open)`);
        await page.screenshot({ path: `${OUT}/${vp.name}-home-menu-open.png`, fullPage: false });
        await btn.click();
        await page.waitForTimeout(300);
      } else {
        logIssue(`${vp.name}/home: #mobile-menu-btn not found`);
      }
    }

    if (route.path === '/blog/' || route.path === '/projects/') {
      const btns = page.locator('.category-filter-btn');
      const n = await btns.count();
      if (n < 2) {
        logIssue(`${vp.name}/${route.label}: expected category filters, found ${n}`);
      } else {
        // Click the second filter (not All)
        await btns.nth(1).click();
        await page.waitForTimeout(200);
        await checkOverflow(page, `${vp.name}/${route.label} (filter)`);
        await page.screenshot({ path: `${OUT}/${vp.name}-${route.label}-filtered.png`, fullPage: false });
      }
    }

    await page.close();
  }
  await context.close();
}

await browser.close();

console.log('\n=== summary ===');
if (issues.length === 0) {
  console.log('No issues found.');
} else {
  console.log(`${issues.length} issue(s):`);
  for (const i of issues) console.log(`  - ${i}`);
  process.exitCode = 1;
}
