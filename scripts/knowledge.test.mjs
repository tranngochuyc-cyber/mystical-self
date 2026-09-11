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
test('Shared model preserves routes, content layers and house concepts', () => {
  for (const entity of knowledgeEntities) {
    assert.equal(entity.slug, entity.id);
    assert.match(entity.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(entity.shortDescription, entity.description);
    assert.equal(entity.interpretation, 'astrology');
    if (entity.type === 'house') assert.ok(entity.concepts.length > 0);
    if (entity.type === 'planet') assert.ok(entity.metadata.astronomy);
  }
});
test('Scorpio links resolve forward and backward without conflating house analogy with rulership', () => {
  const expected = ['element-water', 'modality-fixed', 'planet-pluto', 'planet-mars', 'house-8'];
  assert.deepEqual(relatedEntities('zodiac-scorpio').map(r => r.entity.id).sort(), expected.sort());
  for (const id of expected) assert.ok(relatedEntities(id).some(r => r.entity.id === 'zodiac-scorpio'));
  assert.equal(relatedEntities('zodiac-scorpio').find(r => r.entity.id === 'house-8').kind, 'analogy');
});
test('Search finds related rulers, Vietnamese accents and respects categories', () => {
  assert.deepEqual(discover('Mars').map(e => e.id).sort(), ['planet-mars', 'zodiac-aries', 'zodiac-scorpio']);
  assert.ok(discover('bach duong').some(e => e.id === 'zodiac-aries'));
  assert.equal(discover('', 'house').length, 12);
  assert.equal(discover('not-an-entry').length, 0);
});
