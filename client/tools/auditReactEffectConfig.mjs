import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginReactEffect from 'eslint-plugin-react-you-might-not-need-an-effect';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginReactEffect.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    const prefix = 'react-you-might-not-need-an-effect/';
    const ruleKeys = new Set(Object.keys(pluginReactEffect.rules || {}).map(k => prefix + k));

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith(prefix)) {
            const short = key.slice(prefix.length);
            const ruleDef = pluginReactEffect.rules?.[short];
            if (!ruleKeys.has(key)) unknown.push(key);
            if (ruleDef?.meta?.deprecated) deprecated.push(key);
        }
        if (Object.prototype.hasOwnProperty.call(rec, key)) {
            if (util.isDeepStrictEqual(val, rec[key])) dup.push(key);
            else overrides.push(key);
        } else if (key.startsWith(prefix)) {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ hasRecommended: !!pluginReactEffect.configs?.recommended, dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditReactEffectConfig.mjs <abs-path-to-eslint.config.react-effect.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
