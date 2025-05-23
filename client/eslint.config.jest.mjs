// eslint.config.jest.mjs
import pluginJest from 'eslint-plugin-jest';

export default {
    files: ['**/*.test.@(js|jsx|ts|tsx)'],
    languageOptions: {
        globals: {
            describe: 'readonly',
            expect: 'readonly',
            it: 'readonly',
        },
    },
    name: 'Site8-Jest files',
    plugins: {
        jest: pluginJest,
    },
    rules: {
        // Include recommended Jest rules
        ...pluginJest.configs.recommended.rules,

        // Enforce best practices in tests
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/padding-around-after-all-blocks': 'error',
        'jest/padding-around-after-each-blocks': 'error',
        'jest/padding-around-all': 'error',
        'jest/padding-around-before-all-blocks': 'error',
        'jest/padding-around-before-each-blocks': 'error',
        'jest/padding-around-describe-blocks': 'error',
        'jest/prefer-each': 'error',
        'jest/prefer-expect-assertions': 'error',
        'jest/prefer-expect-resolves': 'error',
        'jest/prefer-hooks-in-order': 'error',
        'jest/prefer-hooks-on-top': 'error',
        'jest/prefer-lowercase-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
    },
    settings: {
        // Enforce folder naming conventions in test files
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