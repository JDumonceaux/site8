import checkFileConfig from './eslint.config.check-file.mjs';
import importConfig from './eslint.config.import.mjs';
import jsConfig from './eslint.config.javascript.mjs';
import jsdocConfig from './eslint.config.jsdoc.mjs';
import nodeConfig from './eslint.config.node.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import regexpConfig from './eslint.config.regexp.mjs';
import securityConfig from './eslint.config.security.mjs';
import tsConfig from './eslint.config.typescript.mjs';

export default [
  importConfig,
  tsConfig,
  checkFileConfig,
  securityConfig,
  regexpConfig,
  nodeConfig,
  perfectionistConfig,
  preferArrowConfig,
  promiseConfig,
  jsConfig,
  jsdocConfig,
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