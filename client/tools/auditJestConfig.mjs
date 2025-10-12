import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginJest from 'eslint-plugin-jest';

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const rec = pluginJest.configs?.recommended?.rules || {};

    const dup = [];
    const overrides = [];
    const deprecated = [];

    for (const [key, val] of Object.entries(rules)) {
        if (key.startsWith('jest/')) {
            const short = key.slice('jest/'.length);
            const ruleDef = pluginJest.rules?.[short];
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
    console.error('Usage: node tools/auditJestConfig.mjs <abs-path-to-eslint.config.jest.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
