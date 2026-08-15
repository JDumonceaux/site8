// eslint.config.testing-library.mjs
import pluginTestingLibrary from 'eslint-plugin-testing-library';

export default {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    name: 'Site8-testing-library',
    plugins: {
        'testing-library': pluginTestingLibrary,
    },
    rules: {
        ...pluginTestingLibrary.configs['flat/react'].rules,
    },
};
