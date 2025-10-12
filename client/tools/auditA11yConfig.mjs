import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginA11y from 'eslint-plugin-jsx-a11y';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginA11y.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('jsx-a11y/')) {
            const short = key.slice('jsx-a11y/'.length);
            const ruleDef = pluginA11y.rules?.[short];
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditA11yConfig.mjs <abs-path-to-eslint.config.jsx-a11y.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
