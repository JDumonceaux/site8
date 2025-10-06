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
        // Import all recommended Storybook rules
        ...pluginStorybook.configs.recommended.rules,

        // Key Storybook-specific rules that should be included:
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'warn',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/prefer-pascal-case': 'warn',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
    },

    settings: {
        react: {
            // Auto-detect React version to support monorepos or projects with multiple React versions.
            version: 'detect',
        },
    },
};