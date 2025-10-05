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
    // Used for easier identification in multi-config setups
    name: 'Site8-Storybook files',
    plugins: {
        storybook: pluginStorybook,
    },
    // Enable Storybook-specific linting rules by uncommenting the next line.
    // You can also customize these rules as needed.
    // ...pluginStorybook.configs['flat/recommended'],
    settings: {
        'check-file/folder-naming-convention': [
            'error',
            {
                '**/*': 'kebab-case',
            },
        ],
        react: {
            // Auto-detect React version to support monorepos or projects with multiple React versions.
            version: 'detect',
        },
    },
};