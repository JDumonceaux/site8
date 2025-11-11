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
        // Too restrictive
        'unicorn/no-nested-ternary': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    args: false,
                    "e": false,
                    env: false,
                    "ext": false,
                    fn: false,
                    obj: false,
                    param: false,
                    params: false,
                    "prev": false,
                    props: false,
                    ref: false,
                    res: false,
                    "str": false,
                    "temp": false,
                    "util": false,
                    "utils": false,
                    "val": false,
                },
            },
        ],
    },
};