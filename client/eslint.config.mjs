// @ts-check

import eslint from '@eslint/js';
//import reactPromise from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarLint from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  sonarLint.configs.recommended,
  // ...reactPromise.configs.flat.recommended,
  // ...a11y.configs.flat.recommended,
  // ...prettier.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
);

// export default [
//   reactConfig,
//   whitespaceConfig,
//   a11yConfig,
//   // register all of the plugins up-front
//   {
//     files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
//     plugins: {
//       ['@typescript-eslint']: tseslint.plugin,
//       js: pluginJs,
//       ['react']: pluginReact,
//       ['react-hooks']: pluginReactHooks,
//       ['jsx-a11y']: plugInJsxA11y,
//       ['unicorn']: pluginUnicorn,
//     },
//     languageOptions: {
//       parserOptions: { ecmaFeatures: { jsx: true } },
//     },
//     rules: {
//       'react/react-in-jsx-scope': 'off',
//     },
//   },
// ];
