import importConfig from './eslint.config.import.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import checkFileConfig from './eslint.config.check-file.mjs';
import jsConfig from './eslint.config.javascript.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import promiseConfig from './eslint.config.promise.mjs';

export default [
  importConfig,
  tsConfig,
  checkFileConfig,
  preferArrowConfig,
  promiseConfig,
  jsConfig,
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    name: 'Site8-tests',
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];