import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',headless:true});
const errors=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}); page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:4174/mystical-self/#/');
 const section=page.locator('#zodiac'); await section.scrollIntoViewIfNeeded();
 const points=section.locator('.zodiac-point'); await points.first().waitFor(); assert.equal(await points.count(),12);
 for(let i=0;i<12;i++){await points.nth(i).click(); await page.waitForTimeout(280); assert.equal(await points.nth(i).getAttribute('aria-pressed'),'true'); assert.ok((await section.locator('.zodiac-strengths').innerText()).length>30);}
 await points.first().focus(); await page.keyboard.press('ArrowRight'); assert.equal(await points.nth(1).getAttribute('aria-pressed'),'true'); await page.keyboard.press('End'); assert.equal(await points.nth(11).getAttribute('aria-pressed'),'true'); await page.keyboard.press('Home'); assert.equal(await points.first().getAttribute('aria-pressed'),'true');
 await points.nth(7).hover(); assert.match(await section.locator('.zodiac-core').innerText(),/Bọ Cạp/); await points.nth(7).click(); await page.waitForTimeout(300);
 for(const id of ['element-water','modality-fixed','planet-pluto','planet-mars','house-8']) assert.equal(await section.locator(`.explore-next a[href="#/codex/${id}"]`).count(),1);
 await section.getByText('Hiểu nhanh các mối liên hệ',{exact:true}).click(); assert.ok(await section.getByText('Nhà · House',{exact:true}).isVisible());
 for(const width of [320,390,768,1440]) { await page.setViewportSize({width,height:1000}); await section.scrollIntoViewIfNeeded(); assert.ok(await section.evaluate(e=>e.scrollWidth<=e.clientWidth),`overflow ${width}`); if(width<760) {await section.locator('select').selectOption('7'); assert.equal(await points.nth(7).getAttribute('aria-pressed'),'true');} }
 await section.getByRole('button',{name:'Cùng nguyên tố',exact:true}).click(); assert.equal(await section.locator('.zodiac-point.related').count(),2);
 await section.getByRole('button',{name:'Cùng tính chất',exact:true}).click(); assert.equal(await section.locator('.zodiac-point.related').count(),3);
 await section.getByRole('button',{name:'Đối diện',exact:true}).click(); assert.equal(await section.locator('.zodiac-point.related').count(),1);
 for(const id of ['element-water','modality-fixed','planet-pluto','planet-mars','house-8']) {await points.nth(7).click(); await page.waitForTimeout(280); await section.locator('.explore-next a[href="#/codex/'+id+'"]').click(); await page.waitForURL('**/codex/'+id); assert.ok(!(await page.locator('main').innerText()).includes('Chưa tìm thấy mục này')); await page.goto('http://localhost:4174/mystical-self/#/'); await section.scrollIntoViewIfNeeded(); }
 await points.nth(7).click(); await page.waitForTimeout(280); await page.setViewportSize({width:390,height:844}); await section.screenshot({path:'zodiac-wu02-mobile.png'});
 const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'}); const mobile=await touch.newPage(); await mobile.goto('http://localhost:4174/mystical-self/#/'); await mobile.locator('#zodiac').scrollIntoViewIfNeeded(); await mobile.locator('#zodiac .zodiac-point').nth(7).tap(); assert.equal(await mobile.locator('#zodiac .zodiac-point').nth(7).getAttribute('aria-pressed'),'true');
 assert.deepEqual(errors,[]); console.log('PASS: 12 selections, keyboard, mouse preview, five Scorpio links, explanations, 320/390/768/1440 layout, touch emulation; no page errors.');
} finally {await browser.close();}

