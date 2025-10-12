import js from '@eslint/js';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginCheckFile from 'eslint-plugin-check-file';
import typescriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { typescriptRules } from './eslint.rules.mjs';
import { importRules } from './eslint.import-rules.mjs';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'data/**', 'coverage/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    name: 'Site8-js',
    plugins: {
      '@eslint/js': js,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...importRules,
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'no-param-reassign': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    name: 'Site8-typescript',
    plugins: {
      '@typescript-eslint': pluginTypescript,
      'check-file': pluginCheckFile,
    },
    rules: {
      ...pluginTypescript.configs.recommended.rules,
      ...pluginTypescript.configs['recommended-requiring-type-checking'].rules,
      ...typescriptRules,
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.ts': 'CAMEL_CASE',
          '**/*.test.ts': 'CAMEL_CASE',
          '**/*Service.ts': 'PASCAL_CASE',
          '**/*.d.ts': 'KEBAB_CASE',
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'CAMEL_CASE',
          'src/types/': 'CAMEL_CASE',
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    name: 'Site8-tests',
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
];