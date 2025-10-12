import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRedux from 'eslint-plugin-react-redux';

const KEY_RE = /['"]([a-z-]+\/[a-z0-9-]+(?:\/[a-z0-9-]+)?)['"]\s*:\s*([^,]+),?/gi;

function parseExplicitKeys(source) {
    // Naive scan: capture rule keys declared as string keys after the spreads in the rules object.
    // We'll assume spreads appear before explicit keys (as in this repo), so just collect all keys.
    const keys = [];
    let m;
    while ((m = KEY_RE.exec(source))) {
        keys.push(m[1]);
    }
    return keys;
}

function getRecAll() {
    return {
        ...(pluginReact.configs?.recommended?.rules || {}),
        ...(pluginReact.configs?.['jsx-runtime']?.rules || {}),
        ...(pluginHooks.configs?.recommended?.rules || {}),
        ...(pluginRedux.configs?.recommended?.rules || {}),
    };
}

async function main(filePath) {
    const source = fs.readFileSync(filePath, 'utf8');
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};
    const recAll = getRecAll();

    const explicitKeys = parseExplicitKeys(source);

    const explicitDup = [];
    const explicitOverrides = [];

    for (const key of explicitKeys) {
        if (!(key in rules)) continue; // safety
        if (key in recAll) {
            if (util.isDeepStrictEqual(rules[key], recAll[key])) explicitDup.push(key);
            else explicitOverrides.push(key);
        } else {
            explicitOverrides.push(key);
        }
    }

    console.log(JSON.stringify({ explicitDup, explicitOverrides }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/findExplicitReactRuleDup.mjs <abs-path-to-eslint.config.react.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
