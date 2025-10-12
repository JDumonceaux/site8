import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginUnicorn from 'eslint-plugin-unicorn';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginUnicorn.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    const unicornRuleKeys = new Set(Object.keys(pluginUnicorn.rules || {}).map(k => `unicorn/${k}`));

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('unicorn/')) {
            const short = key.slice('unicorn/'.length);
            const ruleDef = pluginUnicorn.rules?.[short];
            if (!unicornRuleKeys.has(key)) unknown.push(key);
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else if (key.startsWith('unicorn/')) {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditUnicornConfig.mjs <abs-path-to-eslint.config.unicorn.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
