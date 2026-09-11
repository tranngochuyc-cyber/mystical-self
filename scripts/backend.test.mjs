import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker from '../dist/server/index.js';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../drizzle/0001_dynamic_data.sql', import.meta.url), 'utf8'));
  sqlite.exec(readFileSync(new URL('../drizzle/0002_articles.sql', import.meta.url), 'utf8'));
  return { sqlite, prepare(sql) {
    let values = [];
    // D1 numbered placeholders are converted for the SQLite test adapter.
    const stmt = sqlite.prepare(sql.replace(/\?\d+/g, '?'));
    return { bind(...args) { values = args; return this; }, async all() { return { results: stmt.all(...values) }; }, async first() { return stmt.get(...values) || null; }, async run() { return stmt.run(...values); } };
  } };
}
const result = { title: 'Test', subtitle: '', symbol: '', traits: [], details: 'Test result', strength: '', growth: '', reflection: '', facts: [] };
const reading = { id: 'test-result', toolSlug: 'birth-chart', createdAt: '2026-09-10T00:00:00Z', inputSummary: 'Synthetic test', result, saved: false, addedToProfile: false };
function request(path, user, method = 'GET', body) {
  return new Request(`https://example.test${path}`, { method, headers: { ...(user ? { 'oai-authenticated-user-id': user } : {}), 'content-type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
}
test('Unauthenticated requests cannot read or write account data', async () => {
  const response = await worker.fetch(request('/api/readings'), {});
  assert.equal(response.status, 401);
});
test('Admin access fails closed without an explicit allowlist', async () => {
  const DB = database();
  assert.equal((await worker.fetch(request('/api/admin/content', 'any-user'), { DB })).status, 403);
  DB.sqlite.close();
});
test('Two users cannot overwrite or delete each other; flag update preserves result', async () => {
  const DB = database();
  const env = { DB, ADMIN_USER_IDS: 'owner' };
  await worker.fetch(request('/api/readings', 'alice', 'POST', reading), env);
  await worker.fetch(request('/api/readings', 'bob', 'POST', { ...reading, result: { ...result, title: 'Unauthorized overwrite' } }), env);
  await worker.fetch(request('/api/readings/test-result', 'bob', 'DELETE'), env);
  await worker.fetch(request('/api/readings/test-result', 'alice', 'PATCH', { saved: true }), env);
  const rows = await (await worker.fetch(request('/api/readings', 'alice'), env)).json();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].result.title, 'Test');
  assert.equal(rows[0].saved, true);
  assert.deepEqual(await (await worker.fetch(request('/api/readings', 'bob'), env)).json(), []);
  DB.sqlite.close();
});
test('Editing one tool keeps the entire catalog and configured admin access is enforced', async () => {
  const DB = database();
  const env = { DB, ADMIN_USER_IDS: 'owner' };
  const denied = await worker.fetch(request('/api/admin/content', 'visitor'), env);
  assert.equal(denied.status, 403);
  const all = await (await worker.fetch(request('/api/admin/content', 'owner'), env)).json();
  assert.equal(all.length, 9);
  const updated = { ...all[0], name: 'Updated test name' };
  assert.equal((await worker.fetch(request(`/api/admin/content/${updated.slug}`, 'owner', 'PUT', updated), env)).status, 200);
  const publicContent = await (await worker.fetch(request('/api/content', 'visitor'), env)).json();
  assert.equal(publicContent.length, 9);
  assert.equal(publicContent.find(t => t.slug === updated.slug).name, updated.name);
  DB.sqlite.close();
});
test('Authors can create and edit articles while other users cannot edit drafts', async () => {
  const DB = database();
  const env = { DB };
  const draft = { title: 'Một ghi chép mới', excerpt: 'Tóm tắt đủ dài cho bài viết.', content: 'Nội dung đủ dài để tạo một bài viết có thể lưu.', category: 'Suy ngẫm', status: 'draft' };
  const createdResponse = await worker.fetch(request('/api/articles', 'alice', 'POST', draft), env);
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  assert.equal((await (await worker.fetch(request('/api/articles', 'alice'), env)).json()).length, 1);
  assert.equal((await (await worker.fetch(request('/api/articles', 'bob'), env)).json()).length, 0);
  assert.equal((await worker.fetch(request(`/api/articles/${created.id}`, 'bob', 'PUT', { ...draft, title: 'Không được sửa' }), env)).status, 403);
  const published = await (await worker.fetch(request(`/api/articles/${created.id}`, 'alice', 'PUT', { ...draft, status: 'published' }), env)).json();
  assert.equal(published.status, 'published');
  const visible = await (await worker.fetch(request(`/api/articles/${created.slug}`, 'bob'), env)).json();
  assert.equal(visible.title, draft.title);
  assert.equal(visible.editable, false);
  DB.sqlite.close();
});
