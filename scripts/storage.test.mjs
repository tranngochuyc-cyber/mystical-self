import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

test('Rapid saves use ordered per-record mutations and never clear the account', async () => {
  const bundled = await build({ entryPoints: ['src/lib/storage.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
  const savedGlobals = { window: globalThis.window, localStorage: globalThis.localStorage, fetch: globalThis.fetch };
  const data = new Map();
  const operations = [];
  const r = { id: 'original', toolSlug: 'birth-chart', createdAt: '2026-09-10T00:00:00Z', inputSummary: 'Test', saved: false, addedToProfile: false, result: { title: 'Test', details: 'Test', traits: [], facts: [] } };
  data.set('mystical-self:readings', JSON.stringify([{ ...r, id: 'legacy-guest' }]));
  globalThis.window = Object.assign(new EventTarget(), { location: { protocol: 'https:' } });
  globalThis.localStorage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
  globalThis.fetch = async (path, init = {}) => {
    if (path === '/api/me') return Response.json({ authenticated: true, id: 'alice' });
    if (path === '/api/content') return Response.json([]);
    if (path === '/api/readings' && !init.method) return Response.json([r]);
    operations.push({ path, method: init.method, body: init.body ? JSON.parse(init.body) : null });
    return Response.json({ ok: true });
  };
  try {
    const storage = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
    for (let i = 0; i < 30 && !storage.storeSession().ready; i++) await new Promise(resolve => setImmediate(resolve));
    assert.equal(storage.storeSession().ready, true);
    assert.deepEqual(storage.getReadings().map(item => item.id), ['original']);
    assert.equal(JSON.parse(data.get('mystical-self:readings'))[0].id, 'legacy-guest');
    const added = { ...r, id: 'new-reading' };
    storage.saveReadings([added, r]);
    storage.saveReadings([{ ...added, saved: true }, r]);
    storage.saveReadings([{ ...added, saved: true }]);
    for (let i = 0; i < 30 && operations.length < 3; i++) await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(operations.map(({ path, method }) => ({ path, method })), [
      { path: '/api/readings', method: 'POST' },
      { path: '/api/readings/new-reading', method: 'PATCH' },
      { path: '/api/readings/original', method: 'DELETE' },
    ]);
    assert.deepEqual(operations[1].body, { saved: true });
    assert.equal(operations.some(x => x.path === '/api/readings' && x.method === 'DELETE'), false);
  } finally { Object.assign(globalThis, savedGlobals); }
});
