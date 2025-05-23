// eslint.config.storybook.mjs
import pluginStorybook from 'eslint-plugin-storybook';

export default {
    files: ['**/*.stories.@(jsx|tsx)'],
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
    rules: {
        // Enable Storybook-specific linting rules if desired:
        // ...pluginStorybook.configs['flat/recommended'],
    },
    settings: {
        'check-file/folder-naming-convention': [
            'error',
            {
                '**/*': 'KEBAB_CASE',
            },
        ],
        react: {
            version: 'detect',
        },
    },
};