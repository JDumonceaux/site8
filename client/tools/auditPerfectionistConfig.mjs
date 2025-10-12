import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginPerfectionist from 'eslint-plugin-perfectionist';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    // Perfectionist doesn't ship a single "recommended" preset exporting .rules in some versions,
    // so we treat duplicates as those we explicitly don't want to override. We'll list deprecated too.
    const rec = (pluginPerfectionist.configs?.recommended?.rules) || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('perfectionist/')) {
            const short = key.slice('perfectionist/'.length);
            const ruleDef = pluginPerfectionist.rules?.[short];
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ hasRecommended: !!pluginPerfectionist.configs?.recommended, dup, overrides, deprecated }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditPerfectionistConfig.mjs <abs-path-to-eslint.config.perfectionist.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
