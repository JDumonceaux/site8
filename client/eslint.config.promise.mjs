// eslint.config.promise.mjs
import pluginPromise from 'eslint-plugin-promise';

export default {
    name: 'Site8-promise',
    plugins: {
        promise: pluginPromise,
    },
    rules: {
        // Include recommended Promise rules
        ...pluginPromise.configs.recommended.rules,

        // ============================================================================
        // Promise Rules - project overrides (not included in recommended or with custom levels)
        // ============================================================================
        'promise/avoid-new': 'warn',
        'promise/no-multiple-resolved': 'warn',
        'promise/prefer-await-to-callbacks': 'warn',
        'promise/prefer-await-to-then': 'warn',
        'promise/prefer-catch': 'warn',
        // Allow Promise.try as it's a recommended TC39 Stage 2 proposal
        'promise/spec-only': 'off',
    },
};