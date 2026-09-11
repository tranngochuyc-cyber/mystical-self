import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ entryPoints: ['src/data/knowledge.ts'], bundle: true, write: false, format: 'esm', platform: 'node' });
const { knowledgeEntities, entityById, relatedEntities, discover } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
test('All 41 knowledge entries have valid links and an onward discovery', () => {
  assert.equal(knowledgeEntities.length, 41);
  assert.equal(new Set(knowledgeEntities.map(e => e.id)).size, 41);
  for (const entity of knowledgeEntities) {
    for (const relation of entity.relationships) assert.ok(entityById[relation.target], relation.target);
    assert.ok(relatedEntities(entity.id).length > 0, entity.id);
  }
  assert.equal(entityById.toString, undefined);
  assert.deepEqual(relatedEntities('missing'), []);
});
test('Zodiac matrix covers each element/modality combination exactly once', () => {
  const pairs = knowledgeEntities.filter(e => e.type === 'zodiac').map(e => e.relationships.filter(r => ['element', 'modality'].includes(r.kind)).map(r => r.target).join('/'));
  assert.equal(pairs.length, 12);
  assert.equal(new Set(pairs).size, 12);
});
test('Search finds related rulers, Vietnamese accents and respects categories', () => {
  assert.deepEqual(discover('Mars').map(e => e.id).sort(), ['planet-mars', 'zodiac-aries', 'zodiac-scorpio']);
  assert.ok(discover('bach duong').some(e => e.id === 'zodiac-aries'));
  assert.equal(discover('', 'house').length, 12);
  assert.equal(discover('not-an-entry').length, 0);
});
