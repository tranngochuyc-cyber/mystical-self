import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const base=process.env.RELEASE_URL || 'https://tranngochuyc-cyber.github.io/mystical-self/';
const expected=readFileSync('dist/client/index.html','utf8').match(/src="([^"]+\.js)"/)[1];
const browser=await chromium.launch({executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',headless:true});
try {
  // Fresh isolated context: smoke tests never modify the user's browser profile.
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const failures=[];page.on('pageerror',e=>failures.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failures.push(`${r.status()} ${r.url()}`);});
  page.on('requestfailed',r=>{if(r.url().startsWith(base))failures.push(`${r.failure()?.errorText} ${r.url()}`);});
  const response=await page.goto(base);assert.equal(response.status(),200);
  assert.ok((await response.text()).includes(expected),'public entry asset matches final production build');
  await page.getByRole('link',{name:'Tạo Cosmic Profile'}).waitFor();
  const nav=page.getByRole('navigation',{name:'Điều hướng chính',exact:true});
  await nav.getByRole('link',{name:'Công cụ',exact:true}).click();await page.getByLabel('Tìm kiếm công cụ').waitFor();
  await nav.getByRole('link',{name:'Codex',exact:true}).click();await page.locator('.codex-index-entry').first().waitFor();assert.equal(await page.locator('.codex-index-entry').count(),41);
  await page.goto(base+'#/codex/zodiac-scorpio');await page.locator('.codex-guide').waitFor();await page.reload();await page.locator('.codex-guide').waitFor();
  await nav.getByRole('link',{name:'Hồ sơ',exact:true}).click();const region=page.locator('.cosmic-identity');await region.locator('select').first().waitFor();
  await page.locator('#identity-sun').selectOption('zodiac-scorpio');await page.locator('#identity-moon').selectOption('zodiac-pisces');await page.locator('#identity-rising').selectOption('zodiac-leo');
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();assert.equal(await region.locator('.identity-archetype-title').textContent(),'The Deep Keeper');
  await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).click();await region.getByRole('button',{name:'Đã lưu hồ sơ'}).waitFor();await page.reload();await region.locator('.identity-summary').waitFor();
  await region.getByRole('button',{name:'Chỉnh sửa hồ sơ'}).click();await page.locator('#identity-sun').selectOption('zodiac-aries');await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).click();await page.reload();await region.locator('.identity-summary').waitFor();assert.equal(await region.locator('[data-entity="element-fire"]').getAttribute('data-count'),'2');
  await region.locator('a[href="#/codex/planet-mars"]').first().click();await page.locator('.codex-guide').waitFor();
  await page.goto(base+'#/profile');await region.locator('.identity-summary').waitFor();await page.reload();await region.locator('.identity-summary').waitFor();
  await nav.getByRole('link',{name:'Trang chủ',exact:true}).click();await page.locator('#zodiac').waitFor();
  const assetURLs=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name).filter(u=>u.includes('/assets/')));
  assert.ok(assetURLs.length>0);for(const url of new Set(assetURLs)){assert.ok(url.startsWith(new URL('assets/',base).href),url);const r=await page.request.get(url);assert.equal(r.status(),200,url);}
  assert.deepEqual(failures,[]);
  console.log(`PASS: HTTP 200; version asset ${expected}; Home/Explore/Codex/Profile; create/edit/save/reload; hash direct routes/reload; navigation; ${new Set(assetURLs).size} assets HTTP 200; no runtime/asset errors. URL: ${base}`);
}finally{await browser.close();}
