import { pathToFileURL } from 'node:url';
import util from 'node:util';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRedux from 'eslint-plugin-react-redux';

function prefixedKeys(obj, prefix) {
    return Object.fromEntries(Object.entries(obj || {}).map(([k, v]) => [`${prefix}/${k}`.replace('//', '/'), v]));
}

async function main(filePath) {
    const cfg = (await import(pathToFileURL(filePath).href)).default;
    const rules = cfg.rules || {};

    const recReact = pluginReact.configs?.recommended?.rules || {};
    const recReactJsxRuntime = pluginReact.configs?.['jsx-runtime']?.rules || {};
    const recHooks = pluginHooks.configs?.recommended?.rules || {};
    const recRedux = pluginRedux.configs?.recommended?.rules || {};

    const recAll = {
        ...recReact,
        ...recReactJsxRuntime,
        ...recHooks,
        ...recRedux,
    };

    const dup = [];
    const overrides = [];
    const deprecated = [];
    const unknown = [];

    const allRuleDefs = {
        ...prefixedKeys(pluginReact.rules || {}, 'react'),
        ...prefixedKeys(pluginHooks.rules || {}, 'react-hooks'),
        ...prefixedKeys(pluginRedux.rules || {}, 'react-redux'),
    };

    for (const [key, val] of Object.entries(rules)) {
        const def = allRuleDefs[key];
        if (!def) unknown.push(key);
        if (def?.meta?.deprecated) deprecated.push(key);

        if (Object.prototype.hasOwnProperty.call(recAll, key)) {
            if (util.isDeepStrictEqual(val, recAll[key])) dup.push(key);
            else overrides.push(key);
        } else if (key in allRuleDefs) {
            overrides.push(key);
        }
    }

    console.log(JSON.stringify({ dup, overrides, deprecated, unknown }, null, 2));
}

const file = process.argv[2];
if (!file) {
    console.error('Usage: node tools/auditReactConfig.mjs <abs-path-to-eslint.config.react.mjs>');
    process.exit(2);
}

main(file).catch((e) => { console.error(e); process.exit(1); });
