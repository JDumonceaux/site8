// eslint.config.vitest.mjs
import pluginVitest from '@vitest/eslint-plugin';

export default {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    name: 'Site8-vitest',
    plugins: {
        vitest: pluginVitest,
    },
    rules: {
        ...pluginVitest.configs.recommended.rules,
    },
};
