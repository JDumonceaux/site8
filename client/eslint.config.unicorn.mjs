// eslint.config.unicorn.mjs
import pluginUnicorn from 'eslint-plugin-unicorn';

export default {
    name: 'Site8-unicorn',
    plugins: {
        unicorn: pluginUnicorn,
    },
    rules: {
        ...pluginUnicorn.configs.recommended.rules,

        // ============================================================================
        // Unicorn Rules
        // ============================================================================
        'unicorn/better-regex': 'error',
        'unicorn/consistent-destructuring': 'error',
        'unicorn/custom-error-definition': 'error',
        'unicorn/filename-case': 'off', // Managed by check-file plugin
        'unicorn/no-array-callback-reference': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    args: false,
                    "e": { "event": false },
                    env: false,
                    "ext": { "extension": false },
                    fn: { "func": false, "function": false },
                    params: false,
                    "prev": { "previous": false },
                    props: false,
                    ref: false,
                    "temp": { "temporary": false },
                },
            },
        ],
    },
};