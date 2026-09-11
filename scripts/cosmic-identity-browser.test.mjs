import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/CocCoc/Browser/Application/browser.exe',headless:true});
const root='http://localhost:4174/mystical-self/#';
try {
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(root+'/');await page.getByRole('link',{name:'Tạo Cosmic Profile'}).click();
  const region=page.locator('.cosmic-identity');await region.waitFor();
  assert.equal(await region.locator('input').count(),0);
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();await region.getByRole('alert').waitFor();assert.ok(await page.locator('#identity-sun').evaluate(e=>document.activeElement===e));
  await page.locator('#identity-sun').selectOption('zodiac-scorpio');await page.locator('#identity-moon').selectOption('zodiac-pisces');
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();assert.ok(await page.locator('#identity-rising').evaluate(e=>document.activeElement===e));
  await page.locator('#identity-rising').selectOption('zodiac-leo');
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:1000});assert.ok(await page.locator('body').evaluate(e=>e.scrollWidth<=innerWidth),`builder overflow ${width}`);for(const select of await region.locator('select').all())assert.ok((await select.boundingBox()).height>=44);}
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).focus();await page.keyboard.press('Enter');await region.locator('.identity-summary').waitFor();
  assert.equal(await region.locator('[data-entity="element-water"]').getAttribute('data-count'),'2');assert.equal(await region.locator('[data-entity="modality-fixed"]').getAttribute('data-count'),'2');
  assert.equal(await region.locator('.identity-archetype-title').textContent(),'The Deep Keeper');assert.ok(await region.locator('#identity-heading').evaluate(e=>document.activeElement===e));
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:1000});assert.ok(await page.locator('body').evaluate(e=>e.scrollWidth<=innerWidth),`result overflow ${width}`);assert.equal(await region.locator('meter').count(),7);}
  await page.setViewportSize({width:390,height:844});await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).tap();await region.getByRole('button',{name:'Đã lưu hồ sơ'}).waitFor();await page.reload();await region.locator('.identity-summary').waitFor();
  await region.getByRole('button',{name:'Chỉnh sửa hồ sơ'}).click();assert.equal(await page.locator('#identity-sun').inputValue(),'zodiac-scorpio');
  await page.locator('#identity-sun').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');await page.keyboard.press('Tab');assert.equal(await page.locator('#identity-sun').inputValue(),'zodiac-aries');
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).click();await page.reload();await region.locator('.identity-summary').waitFor();assert.equal(await region.locator('[data-entity="element-fire"]').getAttribute('data-count'),'2');
  await region.locator('a[href="#/codex/planet-mars"]').first().click();await page.locator('.codex-guide').waitFor();await page.goto(root+'/profile');await region.locator('.identity-summary').waitFor();
  await page.evaluate(()=>{localStorage.setItem('mystical-self:notes','{"keep":true}');localStorage.setItem('mystical-self:drafts','["keep"]');});
  await region.locator('.identity-share').screenshot({path:'cosmic-identity-card-mobile.png'});await region.screenshot({path:'cosmic-identity-mobile.png'});
  await region.getByRole('button',{name:'Đặt lại Cosmic Profile',exact:true}).click();await region.getByRole('button',{name:'Giữ hồ sơ'}).click();assert.equal(await region.locator('.identity-summary').count(),1);
  await region.getByRole('button',{name:'Đặt lại Cosmic Profile',exact:true}).click();await region.getByRole('button',{name:'Xác nhận đặt lại'}).click();await region.locator('select').first().waitFor();
  assert.equal(await page.evaluate(()=>localStorage.getItem('mystical-self:cosmic-profile:v1')),null);assert.equal(await page.evaluate(()=>localStorage.getItem('mystical-self:notes')),'{"keep":true}');assert.equal(await page.evaluate(()=>localStorage.getItem('mystical-self:drafts')),'["keep"]');
  await page.reload();await region.locator('select').first().waitFor();assert.equal(await page.locator('#identity-sun').inputValue(),'');
  await page.evaluate(()=>localStorage.setItem('mystical-self:cosmic-profile:v1','{"version":99}'));await page.reload();await region.locator('select').first().waitFor();assert.match(await region.getByRole('status').textContent(),/không hợp lệ/);
  await page.locator('#identity-sun').selectOption('zodiac-scorpio');await page.locator('#identity-moon').selectOption('zodiac-pisces');await page.locator('#identity-rising').selectOption('zodiac-leo');
  await page.setViewportSize({width:390,height:844});await region.locator('.identity-builder').screenshot({path:'cosmic-identity-builder-mobile.png'});
  await region.getByRole('button',{name:'Tạo Cosmic Identity'}).click();
  await region.getByRole('button',{name:'Chỉnh sửa hồ sơ'}).click();await page.locator('#identity-sun').selectOption('zodiac-aries');await region.getByRole('button',{name:'Hủy chỉnh sửa'}).click();assert.equal(await region.locator('.identity-archetype-title').textContent(),'The Deep Keeper');
  await page.evaluate(()=>{window.identitySetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw new DOMException('Quota','QuotaExceededError');};});
  await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).click();assert.match(await region.getByRole('alert').textContent(),/Không thể lưu/);assert.equal(await region.locator('.identity-summary').count(),1);
  await page.evaluate(()=>{Storage.prototype.setItem=window.identitySetItem;});await region.getByRole('button',{name:'Lưu hồ sơ',exact:true}).click();await region.getByRole('button',{name:'Đã lưu hồ sơ'}).waitFor();
  await page.setViewportSize({width:1440,height:1000});await region.locator('.identity-summary').screenshot({path:'cosmic-identity-desktop.png'});
  assert.deepEqual(errors,[]);console.log('PASS Cosmic Identity: full create/save/reload/edit/cancel/Codex/reset, invalid selections/storage, failed-save recovery, four widths, keyboard, emulated touch, no runtime errors.');
}finally{await browser.close();}
