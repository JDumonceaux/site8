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
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
        'unicorn/prefer-module': 'error',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prefer-top-level-await': 'error',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    args: false,
                    env: false,
                    params: false,
                    props: false,
                    ref: false,
                },
            },
        ],
    },
};