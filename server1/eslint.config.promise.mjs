// eslint.config.promise.mjs (server)
import pluginPromise from 'eslint-plugin-promise';

export default {
    name: 'Site8-promise',
    plugins: {
        promise: pluginPromise,
    },
    rules: {
        // Include recommended Promise rules
        ...pluginPromise.configs.recommended.rules,

        // Project-specific overrides (not included in recommended or with custom levels)
        'promise/avoid-new': 'warn',
        'promise/no-multiple-resolved': 'warn',
        // Disabled - Express middleware and library callbacks (CORS, error handlers) are legitimate uses
        'promise/prefer-await-to-callbacks': 'off',
        'promise/prefer-await-to-then': 'warn',
        // Allow Promise.try as it's a recommended TC39 Stage 2 proposal
        'promise/spec-only': 'off',
    },
};
