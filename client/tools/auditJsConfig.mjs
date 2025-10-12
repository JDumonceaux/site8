import { pathToFileURL } from 'node:url';
import util from 'node:util';
import js from '@eslint/js';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = js.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    // Core ESLint rules deprecations mapping is not exported, so we maintain a small set here
    const DEPRECATED = new Set([
        'indent-legacy',
        'no-native-reassign',
        'no-spaced-func',
    ]);

    for (const [key, val] of Object.entries(rules)) {
        const isCore = !key.includes('/');
        if (isCore && DEPRECATED.has(key)) deprecated.push(key);

        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditJsConfig.mjs <abs-path-to-eslint.config.javascript.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
