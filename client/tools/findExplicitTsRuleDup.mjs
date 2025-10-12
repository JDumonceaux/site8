import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import util from 'node:util';
import tsPlugin from '@typescript-eslint/eslint-plugin';

const KEY_RE = /['"](@?typescript-eslint\/[a-z0-9-]+|no-[a-z0-9-]+)['"]\s*:\s*([^,]+),?/gi;

function parseExplicitKeys(source) {
    const keys = [];
    // naive: find all quoted rule keys inside the rules object
    let m;
    while ((m = KEY_RE.exec(source))) {
        keys.push(m[1]);
    }
    return keys;
}

async function main(filePath) {
    const source = fs.readFileSync(filePath, 'utf8');
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};

    const recA = tsPlugin.configs?.recommended?.rules || {};
    const recB = tsPlugin.configs?.['recommended-requiring-type-checking']?.rules || {};
    const recAll = { ...recA, ...recB };

    const explicitKeys = parseExplicitKeys(source);

    const explicitDup = [];
    const explicitOverrides = [];
    const deprecated = [];
    const unknown = [];

    const tsRuleDefs = Object.fromEntries(Object.keys(tsPlugin.rules || {}).map(k => [`@typescript-eslint/${k}`, tsPlugin.rules[k]]));

    for (const key of explicitKeys) {
        const val = rules[key];
        const def = tsRuleDefs[key];
        if (!def && key.startsWith('@typescript-eslint/')) unknown.push(key);
        if (def?.meta?.deprecated) deprecated.push(key);

        if (Object.prototype.hasOwnProperty.call(recAll, key)) {
            if (util.isDeepStrictEqual(val, recAll[key])) explicitDup.push(key);
            else explicitOverrides.push(key);
        } else if (key.startsWith('@typescript-eslint/')) {
            explicitOverrides.push(key);
        }
    }

    console.log(JSON.stringify({ explicitDup, explicitOverrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/findExplicitTsRuleDup.mjs <abs-path-to-eslint.config.typescript.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
