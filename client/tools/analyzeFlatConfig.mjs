import js from '@eslint/js';
import util from 'node:util';
import { pathToFileURL } from 'node:url';

async function main(file) {
    const cfg = (await import(pathToFileURL(file).href)).default;
    const rec = js.configs.recommended.rules;
    const dup = [];
    const overrides = [];
    for (const [k, v] of Object.entries(cfg.rules || {})) {
        if (Object.prototype.hasOwnProperty.call(rec, k)) {
            if (util.isDeepStrictEqual(v, rec[k])) dup.push(k);
            else overrides.push(k);
        }
    }
    console.log(JSON.stringify({ dup, overrides }, null, 2));
}

const file = process.argv[2];
if (!file) { console.error('Usage: node tools/analyzeFlatConfig.mjs <abs-file>'); process.exit(2); }
main(file).catch(e => { console.error(e); process.exit(1); });
