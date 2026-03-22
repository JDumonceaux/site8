import checkFileConfig from './eslint.config.check-file.mjs';
import importConfig from './eslint.config.import.mjs';
import javascriptConfig from './eslint.config.javascript.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import regexpConfig from './eslint.config.regexp.mjs';
import securityConfig from './eslint.config.security.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import unicornConfig from './eslint.config.unicorn.mjs';

const config = [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    javascriptConfig,
    checkFileConfig,
    importConfig,
    preferArrowConfig,
    securityConfig,
    regexpConfig,
    perfectionistConfig,
    promiseConfig,
    tsConfig,
    unicornConfig,
    {
        files: ['**/*.test.ts', '**/*.spec.ts'],
        languageOptions: {
            parserOptions: {
                project: null,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
        },
    },
    {
        files: ['src/utils/httpConstants.ts'],
        rules: {
            '@typescript-eslint/no-redeclare': 'off',
        },
    },
];

export default config;