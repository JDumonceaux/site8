import pluginJs from '@eslint/js';
import plugInJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';
import a11yConfig from './eslint_rules/react-a11y.js';
import reactConfig from './eslint_rules/react.js';
import whitespaceConfig from './eslint_rules/whitespaceRules.js';

export default [
  reactConfig,
  whitespaceConfig,
  a11yConfig,
  // register all of the plugins up-front
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
      js: pluginJs,
      ['react']: pluginReact,
      ['react-hooks']: pluginReactHooks,
      ['jsx-a11y']: plugInJsxA11y,
      ['unicorn']: pluginUnicorn,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '.nx/',
      '.yarn/',
      '**/jest.config.js',
      '**/node_modules/**',
      '**/dist/**',
      '**/fixtures/**',
      '**/coverage/**',
      '**/__snapshots__/**',
      '**/.docusaurus/**',
      '**/build/**',
      '.nx/*',
      '.yarn/*',
      // Files copied as part of the build
      'packages/types/src/generated/**/*.ts',
      // Playground types downloaded from the web
      'packages/website/src/vendor/',
      // see the file header in eslint-base.test.js for more info
      'packages/rule-tester/tests/eslint-base/',
    ],
  },

  // extends ...
  pluginJs.configs.recommended,
  pluginPerfectionist.configs.recommended,
  pluginUnicorn.configs.recommended,
];
