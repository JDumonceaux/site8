// eslint.config.promise.mjs
import pluginPromise from 'eslint-plugin-promise';

export default {
    name: 'Site8-promise',
    plugins: {
        promise: pluginPromise,
    },
    rules: {
        // Include recommended Promise rules
        ...pluginPromise.configs.recommended.rules, // Missing recommended rules import

        // ============================================================================
        // Promise Rules
        // ============================================================================
        'promise/always-return': 'error',
        'promise/avoid-new': 'warn',
        'promise/catch-or-return': 'error',
        'promise/no-callback-in-promise': 'warn',
        'promise/no-multiple-resolved': 'warn',
        'promise/no-native': 'off',
        'promise/no-nesting': 'warn',
        'promise/no-new-statics': 'error',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-return-in-finally': 'warn',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/prefer-await-to-callbacks': 'warn',
        'promise/prefer-await-to-then': 'warn',
        'promise/spec-only': 'warn',
        'promise/valid-params': 'warn',

        // ============================================================================
        // Additional Recommended Rules (not yet configured)
        // ============================================================================
        'promise/no-promise-constructor-in-new-expression': 'error', // Missing recommended rule
        'promise/no-callback-in-promise': 'warn', // You already have this
        'promise/no-extra-parens': 'error', // Missing recommended rule (if available)
    },
};