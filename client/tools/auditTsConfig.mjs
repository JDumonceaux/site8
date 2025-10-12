import { pathToFileURL } from 'node:url';
import util from 'node:util';
import tsPlugin from '@typescript-eslint/eslint-plugin';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};

    const recA = tsPlugin.configs?.recommended?.rules || {};
    const recB = tsPlugin.configs?.['recommended-requiring-type-checking']?.rules || {};
    const recAll = { ...recA, ...recB };

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    const tsRuleKeys = new Set(Object.keys(tsPlugin.rules || {}).map(k => `@typescript-eslint/${k}`));

    for (const [key, val] of Object.entries(rules)) {
        const isTsRule = key.startsWith('@typescript-eslint/');
        if (isTsRule) {
            const short = key.slice('@typescript-eslint/'.length);
            const ruleDef = tsPlugin.rules?.[short];
            if (!tsRuleKeys.has(key)) unknown.push(key);
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }

        if (Object.prototype.hasOwnProperty.call(recAll, key)) {
            if (util.isDeepStrictEqual(val, recAll[key])) dup.push(key);
            else overrides.push(key);
        } else if (isTsRule) {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditTsConfig.mjs <abs-path-to-eslint.config.typescript.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
