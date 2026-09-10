import { execFileSync } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { build } from 'esbuild';
execFileSync(process.execPath,['node_modules/vite/bin/vite.js','build'],{stdio:'inherit'});
await rm('dist/server',{recursive:true,force:true});
await mkdir('dist/server',{recursive:true});
await build({entryPoints:['server/index.ts'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'neutral',target:'es2022',external:['cloudflare:workers'],sourcemap:false});
