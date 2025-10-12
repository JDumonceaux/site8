import js from '@eslint/js';
import util from 'node:util';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

async function analyze(filePath) {
    const src = await fs.readFile(filePath, 'utf8');
    // naive find explicit rule keys: matches 'rule-name':
    const keyRegex = /['\"]([a-z0-9-]+)['\"]\s*:/gi;
    const explicitKeys = new Set();
    let m;
    while ((m = keyRegex.exec(src))) {
        explicitKeys.add(m[1]);
    }
    const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const cfg = (await import(pathToFileURL(resolved).href)).default;
    const rec = js.configs.recommended.rules;
    const dup = [];
    const overrides = [];
    for (const k of explicitKeys) {
        if (k in rec) {
            if (util.isDeepStrictEqual(cfg.rules?.[k], rec[k])) {
                dup.push(k);
            } else {
                overrides.push(k);
            }
        }
    }
    return { dup, overrides };
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/findRuleDupForFile.mjs <absolute-path-to-config>');
    process.exit(2);
}

analyze(file).then((res) => {
    console.log(JSON.stringify(res, null, 2));
}).catch((e) => { console.error(e); process.exit(1); });
