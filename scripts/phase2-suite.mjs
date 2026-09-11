import { execFileSync } from 'node:child_process';
for (const file of ['completion-phase2.test.mjs','inspect-phase2.mjs','zodiac-wu02.test.mjs','planet-wu03.test.mjs','house-wu04.test.mjs','matrix-wu05.test.mjs','map-wu06.test.mjs','knowledge.test.mjs']) {
 execFileSync(process.execPath,['scripts/'+file],{stdio:'inherit'});
}
console.log('PHASE 2 SUITE PASS');
