import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle=await build({entryPoints:['src/data/knowledgeContext.ts'],bundle:true,write:false,format:'esm',platform:'node'});
const {zodiacMyths,mythSources,houseGroups}=await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
test('Cultural notes cover all signs with source links; house groups partition 12 houses',()=>{assert.equal(zodiacMyths.length,12);for(const [title,description,source] of zodiacMyths){assert.ok(title&&description);assert.ok(mythSources[source].startsWith('https://'));}assert.deepEqual(houseGroups.flatMap(g=>g.numbers).sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+1));});
