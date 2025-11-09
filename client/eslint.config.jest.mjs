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
    // Used to identify this ESLint configuration in logs and error messages
    name: 'Site8-Jest',
    plugins: {
        jest: pluginJest,
    },
    rules: {
        // Include recommended Jest rules
        ...pluginJest.configs.recommended.rules,

        // Enforce folder naming conventions in test files
        // 'check-file/folder-naming-convention' is a non-standard ESLint rule.
        // See: https://github.com/ljosberinn/eslint-plugin-check-file#folder-naming-convention
        'check-file/folder-naming-convention': [
            'error',
            {
                // Using 'KEBAB_CASE' for folder naming to match project convention; update if other casing is used elsewhere
                '**/*': 'kebab-case',
            },
        ],
        // Enforce best practices in tests
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
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};