// eslint.config.storybook.mjs
import pluginStorybook from 'eslint-plugin-storybook';

export default {
    files: ['**/*.stories.*'],
    languageOptions: {
        globals: {
            describe: 'readonly',
            expect: 'readonly',
            it: 'readonly',
        },
    },
    name: 'Site8-Storybook files',
    plugins: {
        storybook: pluginStorybook,
    },

    // ✅ SOLUTION: Add the recommended rules
    rules: {
        // Import all recommended Storybook rules; no explicit duplicates below
        ...pluginStorybook.configs.recommended.rules,
    },

    settings: {
        react: {
            // Auto-detect React version to support monorepos or projects with multiple React versions.
            version: 'detect',
        },
    },
};