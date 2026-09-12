import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const base=process.env.RELEASE_URL || 'http://localhost:4174/mystical-self/';
const browser=await chromium.launch({executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',headless:true});
try {
 const page=await browser.newPage({reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.getByRole('link',{name:'Create Your Cosmic Identity',exact:true}).waitFor();
 assert.ok(await page.locator('meta[property="og:description"]').getAttribute('content'));assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://tranngochuyc-cyber.github.io/mystical-self/');
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});for(const route of ['/','/explore','/codex','/profile','/not-a-star']){await page.goto(base+'#'+route);await page.locator('main h1').waitFor();assert.ok(await page.locator('body').evaluate(e=>e.scrollWidth<=innerWidth),`${route} overflow at ${width}`);}}
 await page.getByRole('link',{name:'Return Home',exact:true}).focus();await page.keyboard.press('Enter');await page.getByRole('link',{name:'Explore the Cosmos',exact:true}).click();assert.equal(new URL(page.url()).hash,'#/');
 await page.setViewportSize({width:390,height:844});await page.locator('.bottom-nav a[href="#/profile"]').click();await page.locator('.identity-builder').waitFor();assert.equal(await page.locator('.bottom-nav a[href="#/profile"]').getAttribute('aria-current'),'page');
 await page.locator('.release-footer a[href="#/codex"]').click();await page.locator('.codex-index-entry').first().waitFor();await page.reload();await page.locator('.codex-index-entry').first().waitFor();
 assert.deepEqual(errors,[]);
 const failed=await browser.newPage();await failed.route('**/assets/CosmicHome-*.js',r=>r.abort());await failed.goto(base);await failed.getByRole('heading',{name:'Chưa thể mở vùng trời này.'}).waitFor();await failed.getByRole('link',{name:'Trở về trang chủ',exact:true}).waitFor();await failed.unroute('**/assets/CosmicHome-*.js');await failed.getByRole('button',{name:'Tải lại trang',exact:true}).click();await failed.getByRole('link',{name:'Create Your Cosmic Identity',exact:true}).waitFor();
 console.log('PASS V1 closure: metadata, 404 recovery, four widths × five routes, keyboard CTA, mobile/footer navigation, reload, failed chunk recovery.');
}finally{await browser.close();}
