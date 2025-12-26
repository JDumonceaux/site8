// eslint.config.node.mjs
import pluginNode from 'eslint-plugin-n';

export default {
    name: 'Site8-node',
    plugins: {
        n: pluginNode,
    },
    rules: {
        ...pluginNode.configs.recommended.rules,
        'n/no-process-exit': 'error',
        'n/no-sync': 'warn',
        'n/prefer-promises/fs': 'error',
        'n/no-missing-import': 'off', // TypeScript handles this
        'n/no-unpublished-import': 'off', // Too strict for dev dependencies
        'n/no-unsupported-features/es-syntax': 'off', // TypeScript handles this
        'n/no-extraneous-import': 'off', // Package.json handles this
        'n/handle-callback-err': 'error',
        'n/no-callback-literal': 'error',
        'n/no-deprecated-api': 'error',
    },
};
