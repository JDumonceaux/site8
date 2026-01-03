import checkFileConfig from './eslint.config.check-file.mjs';
import importConfig from './eslint.config.import.mjs';
import jsConfig from './eslint.config.javascript.mjs';
import nodeConfig from './eslint.config.node.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import regexpConfig from './eslint.config.regexp.mjs';
import securityConfig from './eslint.config.security.mjs';
import tsConfig from './eslint.config.typescript.mjs';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts'],
  },
  importConfig,
  tsConfig,
  checkFileConfig,
  securityConfig,
  regexpConfig,
  nodeConfig,
  perfectionistConfig,
  ...preferArrowConfig,
  promiseConfig,
  jsConfig,
  // Enforce preferred service usage and response helpers for server routes
  {
    files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx'],
    name: 'ServiceFactory-and-ResponseHelper-rules',
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          message:
            "Instantiate services via ServiceFactory.get*Service() factory functions instead of using 'new <Service>()'.",
          selector: "NewExpression[callee.name=/Service$/]",
        },
        {
          message:
            "Use ResponseHelper methods (ok/created/badRequest/notFound/internalError) instead of res.json()/res.send() in route handlers.",
          selector:
            "MemberExpression[object.name='res'][property.name=/^(json|send)$/]",
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    name: 'Site8-tests',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

