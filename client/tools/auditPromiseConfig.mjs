import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginPromise from 'eslint-plugin-promise';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginPromise.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    const promiseRuleKeys = new Set(Object.keys(pluginPromise.rules || {}).map(k => `promise/${k}`));

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('promise/')) {
            const short = key.slice('promise/'.length);
            const ruleDef = pluginPromise.rules?.[short];
            if (!promiseRuleKeys.has(key)) unknown.push(key);
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else if (key.startsWith('promise/')) {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditPromiseConfig.mjs <abs-path-to-eslint.config.promise.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
