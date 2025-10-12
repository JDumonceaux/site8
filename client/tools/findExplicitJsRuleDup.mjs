import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import util from 'node:util';
import js from '@eslint/js';

const KEY_RE = /['"]([a-z-]+(?:-[a-z-]+)*)['"]\s*:\s*([^,]+),?/gi;

function parseExplicitKeys(source) {
    // Collect string-literal keys inside rules object; ignores spreads
    const keys = [];
    let m;
    while ((m = KEY_RE.exec(source))) {
        const key = m[1];
        // Skip likely object literal keys that aren't rule names (e.g., 'message', 'selector', 'terms')
        if (key.includes('/') || /^[a-z-]+$/.test(key)) {
            // Filter out obvious non-rule keys used in options objects
            if (['selector', 'message', 'terms', 'location', 'maximum', 'when', 'importNames', 'name', 'paths', 'property'].includes(key)) continue;
            keys.push(key);
        }
    }
    return Array.from(new Set(keys));
}

async function main(filePath) {
    const source = fs.readFileSync(filePath, 'utf8');
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = js.configs?.recommended?.rules || {};

    const explicitKeys = parseExplicitKeys(source).filter(k => rules[k] !== undefined);

    const explicitDup = [];
    const explicitOverrides = [];
    const deprecated = [];

    const DEPRECATED = new Set(['indent-legacy', 'no-native-reassign', 'no-spaced-func']);

    for (const key of explicitKeys) {
        if (DEPRECATED.has(key)) deprecated.push(key);
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(rules[key], rec[key])) explicitDup.push(key);
            else explicitOverrides.push(key);
        } else {
            explicitOverrides.push(key);
        }
    }

    console.log(JSON.stringify({ explicitDup, explicitOverrides, deprecated }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/findExplicitJsRuleDup.mjs <abs-path-to-eslint.config.javascript.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
