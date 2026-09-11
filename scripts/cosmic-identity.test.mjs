import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ entryPoints: ['src/lib/cosmicIdentity.ts'], bundle:true, write:false, format:'esm', platform:'node' });
const { createCosmicProfile, deriveCosmicIdentity, validCosmicProfile, identitySigns } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
test('Scorpio / Pisces / Leo uses shared classifications and both Scorpio rulers', () => {
  const p=createCosmicProfile({sun:'zodiac-scorpio',moon:'zodiac-pisces',rising:'zodiac-leo'});
  const d=deriveCosmicIdentity(p);
  assert.deepEqual(d.elements.map(e=>e.count),[1,0,0,2]);
  assert.deepEqual(d.modalities.map(e=>e.count),[0,2,1]);
  assert.equal(d.archetype.name,'The Deep Keeper');
  assert.ok(d.placements[0].connections.some(c=>c.entity.id==='planet-pluto'));
  assert.ok(d.placements[0].connections.some(c=>c.entity.id==='planet-mars'));
  assert.ok(d.placements[0].connections.some(c=>c.entity.id==='house-8'&&c.kind==='analogy'));
});
test('All 1728 combinations preserve totals and deterministic creative rules', () => {
  for(const sun of identitySigns)for(const moon of identitySigns)for(const rising of identitySigns){
    const p=createCosmicProfile({sun:sun.id,moon:moon.id,rising:rising.id});
    const d=deriveCosmicIdentity(p);
    assert.equal(d.elements.reduce((s,e)=>s+e.count,0),3);
    assert.equal(d.modalities.reduce((s,e)=>s+e.count,0),3);
    assert.equal(d.archetype.name,deriveCosmicIdentity(p).archetype.name);
    assert.ok(!d.archetype.name.includes('undefined'));
  }
  const d=deriveCosmicIdentity(createCosmicProfile({sun:'zodiac-gemini',moon:'zodiac-scorpio',rising:'zodiac-capricorn'}));
  assert.equal(d.element.id,'element-air');assert.equal(d.modality.id,'modality-mutable');
});
test('Missing, malformed, non-zodiac and fake calculated profiles are rejected',()=>{
  for(const value of [null,{},[],{version:2,source:'manual',selections:{}},{version:1,source:'calculated',selections:{sun:'zodiac-aries',moon:'zodiac-aries',rising:'zodiac-aries'}}])assert.equal(validCosmicProfile(value),false);
  assert.equal(createCosmicProfile({sun:'planet-mars',moon:'',rising:'__proto__'}),null);
  assert.equal(createCosmicProfile({sun:'zodiac-aries',moon:'zodiac-taurus',rising:''}),null);
});
test('Profile storage roundtrip, corrupt data and scoped reset preserve other records',async()=>{
  const b=await build({entryPoints:['src/lib/cosmicProfileStorage.ts'],bundle:true,write:false,format:'esm',platform:'node',define:{'import.meta.env.MODE':'"github-pages"'}});
  const data=new Map([['mystical-self:notes','{"keep":true}'],['mystical-self:drafts','["keep"]'],['mystical-self:readings','[]']]);
  globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
  const storage=await import(`data:text/javascript;base64,${Buffer.from(b.outputFiles[0].text).toString('base64')}`);
  const p=createCosmicProfile({sun:'zodiac-scorpio',moon:'zodiac-pisces',rising:'zodiac-leo'});
  assert.equal(storage.saveCosmicProfile(p),true);assert.deepEqual(storage.loadCosmicProfile().profile,p);
  data.set('mystical-self:cosmic-profile:v1','{"version":99}');assert.equal(storage.loadCosmicProfile().invalid,true);
  assert.equal(storage.resetCosmicProfile(),true);assert.equal(data.size,3);assert.equal(data.get('mystical-self:notes'),'{"keep":true}');
  globalThis.localStorage.setItem=()=>{throw new Error('quota');};assert.equal(storage.saveCosmicProfile(p),false);
  globalThis.localStorage.removeItem=()=>{throw new Error('denied');};assert.equal(storage.resetCosmicProfile(),false);
  delete globalThis.localStorage;
});
