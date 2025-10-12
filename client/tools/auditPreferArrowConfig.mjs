import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginArrow from 'eslint-plugin-prefer-arrow-functions';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginArrow.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('prefer-arrow-functions/')) {
            const short = key.slice('prefer-arrow-functions/'.length);
            const ruleDef = pluginArrow.rules?.[short];
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ hasRecommended: !!pluginArrow.configs?.recommended, dup, overrides, deprecated }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditPreferArrowConfig.mjs <abs-path-to-eslint.config.prefer-arrow-functions.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
