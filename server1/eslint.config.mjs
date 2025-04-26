import js from '@eslint/js';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginCheckFile from 'eslint-plugin-check-file';
import typescriptParser from '@typescript-eslint/parser';
// There is no default export for this plug-in, so import it this way.
import * as  importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    ignores: ['dist/**', 'node_modules/**', 'bin/**'],
    languageOptions: {
      // default
      ecmaVersion: 'latest',
      // parser: 'eslintParse',
      // globals:
      // parserOptions:
      globals: {
        ...globals.node,
      },
      // default
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
      'import/default': 'off',
      'import/no-cycle': 'error',
      // Import Rules
      'import/no-dynamic-require': 'warn',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-nodejs-modules': 'warn',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/discussions should not import from src/features/comments, etc.
            {
              except: ['./auth'],
              from: './src/features',
              target: './src/features/auth',
            },
            {
              except: ['./users'],
              from: './src/features',
              target: './src/features/users',
            },
            // enforce unidirectional codebase:

            // e.g. src/app can import from src/features but not the other way around
            {
              from: './src/app',
              target: './src/features',
            },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              from: ['./src/features', './src/app'],
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
            },
          ],
        },
      ],
      'import/order': [
        'error',
        {
          "alphabetize": {
            "caseInsensitive": true,
            "order": "asc"

          },
          "groups": ["builtin", "external", "internal"],
          "newlines-between": "always",
          "pathGroups": [
            {
              "group": "external",
              "pattern": "react",
              "position": "before"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react"],
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
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

      // Typescript rules
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/ban-tslint-comment': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-return': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      // change to type from interface
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      // Altered to correct the automatic fix
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports', prefer: 'type-imports' }],
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      // Conflicts with no-undef-init
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/max-params': ['error', { max: 5 }],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      // Too restrictive
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-extraneous-class': 'error',
      // Too confusing
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      // Too aggressive
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'error',
      '@typescript-eslint/no-mixed-enums': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/no-restricted-imports': 'error',
      '@typescript-eslint/no-restricted-types': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-parameter-property-assignment':
        'error',
      '@typescript-eslint/no-unnecessary-qualifier': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-parameters': 'error',
      // Rule is not working correctly.  Requires cast to number for numbers
      '@typescript-eslint/no-unsafe-argument': 'off',
      // Rule is not working correctly.  Requires cast to number for numbers
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Rule is not working correctly.  Possibly due to the use of zod
      '@typescript-eslint/no-unsafe-call': 'off',
      // Rules is not working correctly.  Claims "'error' typed value when type is defined"
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // Rules is not working correctly.  Claims return type is any when it is not
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // Prevents placement of styles at the end of the file
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      // Confusing.  Replaces "as string" with "id!"
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/parameter-properties': 'error',
      '@typescript-eslint/prefer-destructuring': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-find': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      // This doesn't seem to work
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/return-await': 'error',
      // This is too restrictive
      '@typescript-eslint/strict-boolean-expressions': 'off',
      // This is too restrictive
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
      // Check File
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.tsx': 'PASCAL_CASE',
          '**/*.ts': 'CAMEL_CASE',
          ignoreMiddleExtensions: true,
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];