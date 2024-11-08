// @ts-check

// JavaScript rules (formerly included in ESLint core)
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import pluginArrow from 'eslint-plugin-prefer-arrow-functions';
import pluginPromise from 'eslint-plugin-promise';
import pluginRedux from 'eslint-plugin-react-redux';
import pluginJest from 'eslint-plugin-jest';
import pluginSonar from 'eslint-plugin-sonarjs';
import pluginReactCompiler from 'eslint-plugin-react-compiler';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginCheckFile from 'eslint-plugin-check-file';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';

// Typescript specific rules
import typescriptParser from '@typescript-eslint/parser';
import pluginTypescript from '@typescript-eslint/eslint-plugin';

// No default export
import * as pluginStorybook from 'eslint-plugin-storybook';

export default [
  {
    name: 'Site8-js',
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    ignores: ['dist/**', 'node_modules/**', 'bin/**'],
    languageOptions: {
      // default
      ecmaVersion: 'latest',
      // default
      sourceType: 'module',
      parser: 'eslintParse',
      // globals:
      // parserOptions:
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      '@eslint/js': js,
      react: pluginReact,
      'react-hooks': pluginHooks,
      'jsx-a11y': pluginA11y,
      'prefer-arrow-functions': pluginArrow,
      promise: pluginPromise,
      'react-redux': pluginRedux,
      sonarjs: pluginSonar,
      'react-compiler': pluginReactCompiler,
      perfectionist: pluginPerfectionist,
      unicorn: pluginUnicorn,
      import: importPlugin,
      'check-file': pluginCheckFile,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs['recommended'].rules,
      ...pluginHooks.configs.recommended.rules,
      ...pluginRedux.configs.recommended.rules,
      ...pluginA11y.configs.recommended.rules,
      ...pluginUnicorn.configs.recommended.rules,
      // ...importPlugin.flatconfig.recommended.rules,

      // There is no config for this plugin
      // ...pluginReactCompiler.configs.recommended.rules,
      // Evaluate: Too many and conflicting rules
      // ...pluginSonar.configs.recommended.rules,

      // Trying out
      'react/jsx-props-no-spread-multi': 'error',

      // Prefer arrow functions
      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowNamedFunctions: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],

      // Promise rules
      'promise/always-return': 'error',
      'promise/avoid-new': 'warn',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-return-in-finally': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/valid-params': 'warn',
      'promise/spec-only': 'warn',
      'promise/prefer-await-to-then': 'warn',
      'promise/prefer-await-to-callbacks': 'warn',
      'promise/no-multiple-resolved': 'warn',

      // Redux rules
      'react-redux/mapStateToProps-prefer-selectors': 'error',

      // A11Y rules
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          aspects: ['invalidHref', 'preferButton'],
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
        },
      ],
      'jsx-a11y/prefer-tag-over-role': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/lang': 'error',

      // React compiler rules
      'react-compiler/react-compiler': 'error',

      // Perfectionist rules
      'perfectionist/sort-array-includes': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-enums': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      // Big Fix
      'perfectionist/sort-objects': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-sets': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-switch-case': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],
      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'natural',
          order: 'asc',
        },
      ],

      // React Rules
      'react/boolean-prop-naming': 'error',
      'react/button-has-type': 'error',
      'react/checked-requires-onchange-or-readonly': 'error',
      'react/default-props-match-prop-types': 'error',
      'react/destructuring-assignment': 'error',
      'react/forbid-component-props': 'error',
      'react/forbid-dom-props': 'error',
      'react/forbid-foreign-prop-types': 'error',
      'react/forbid-prop-types': 'error',
      'react/forward-ref-uses-ref': 'error',
      'react/function-component-definition': 'error',
      'react/hook-use-state': 'error',
      'react/iframe-missing-sandbox': 'error',
      'react/jsx-boolean-value': 'error',
      // 'react/jsx-child-element-spacing': 'error',
      // 'react/jsx-closing-bracket-location': 'error',
      // 'react/jsx-closing-tag-location': 'error',
      'react/jsx-curly-brace-presence': 'error',
      // 'react/jsx-curly-newline': 'error',
      // 'react/jsx-curly-spacing': 'error',
      // 'react/jsx-equals-spacing': 'error',
      'react/jsx-filename-extension': 'error',
      // 'react/jsx-first-prop-new-line': 'error',
      'react/jsx-fragments': 'error',
      'react/jsx-handler-names': 'error',
      // 'react/jsx-indent': 'error',
      // 'react/jsx-indent-props': 'error',
      'react/jsx-max-depth': 'error',
      // 'react/jsx-max-props-per-line': 'error',
      // 'react/jsx-newline': 'error',
      'react/jsx-no-bind': 'error',
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-literals': 'error',
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-useless-fragment': 'error',
      // 'react/jsx-one-expression-per-line': 'error',
      'react/jsx-pascal-case': 'error',
      // 'react/jsx-props-no-multi-spaces': 'error',
      // 'react/jsx-props-no-spread-multi': 'error',
      'react/jsx-props-no-spreading': 'error',
      // 'react/jsx-sort-default-props': 'error',
      'react/jsx-sort-props': 'error',
      // 'react/jsx-space-before-closing': 'error',
      // 'react/jsx-tag-spacing': 'error',
      // 'react/jsx-wrap-multilines': 'error',
      'react/no-access-state-in-setstate': 'error',
      'react/no-adjacent-inline-elements': 'error',
      'react/no-array-index-key': 'error',
      'react/no-arrow-function-lifecycle': 'error',
      'react/no-danger': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-invalid-html-attribute': 'error',
      'react/no-multi-comp': 'error',
      'react/no-namespace': 'error',
      'react/no-object-type-as-default-prop': 'error',
      'react/no-redundant-should-component-update': 'error',
      'react/no-set-state': 'error',
      'react/no-this-in-sfc': 'error',
      'react/no-typos': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/no-unused-class-component-methods': 'error',
      'react/no-unused-prop-types': 'error',
      'react/no-unused-state': 'error',
      'react/no-will-update-set-state': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-exact-props': 'error',
      'react/prefer-read-only-props': 'error',
      'react/prefer-stateless-function': 'error',
      'react/require-default-props': 'error',
      'react/require-optimization': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'error',
      'react/sort-default-props': 'error',
      'react/sort-prop-types': 'error',
      'react/state-in-constructor': 'error',
      'react/static-property-placement': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',

      // Discourage use of deprecated elements
      'react/forbid-elements': [
        'error',
        {
          forbid: [
            { element: 'applet', message: 'use <object> instead' },
            { element: 'acronym', message: 'use <abbr> instead' },
            { element: 'basefont', message: 'use <font> instead' },
            { element: 'bgsound' },
            { element: 'big', message: 'use font-size instead' },
            { element: 'blink', message: 'use css instead' },
            { element: 'center', message: 'use text-align instead' },
            { element: 'dir' },
            { element: 'embed', message: 'use <object> instead' },
            {
              element: 'font',
              message: 'use font-family and font-size instead',
            },
            { element: 'frameset', message: 'use <iframe> instead' },
            { element: 'isindex' },
            { element: 'ilayer' },
            { element: 'keygen' },
            { element: 'frameset', message: 'use <iframe> instead' },
            { element: 'layer' },
            { element: 'menu' },
            { element: 'menuitem' },
            { element: 'menu' },
            { element: 'multicol' },
            { element: 'nobr' },
            { element: 'noembed' },
            { element: 'noframes' },
            { element: 'frameset' },
            { element: 'plaintext', message: 'use <pre> instead' },
            { element: 'frameset', message: 'use <iframe> instead' },
            { element: 'param' },
            { element: 's', message: 'use text-decoration instead' },
            { element: 'strike', message: 'use text-decoration instead' },
            { element: 'spacer', message: 'use <pre> & <br> instead' },
            { element: 'tt', message: 'use <pre> & <kbd> instead' },
            { element: 'u', message: 'use <pre> & <kbd> instead' },
            { element: 'xmp', message: 'use text-decoration instead' },
            { element: 'frame' },
            { element: 'marquee', message: 'use CDD instead' },
          ],
        },
      ],

      // We want to encourage the use of the spread operator
      // 'react/jsx-props-no-spreading': 'off',
      // There is a conflict somewhere with this rule
      // conflicts with perfectionist/sort-jsx-props
      // 'react/jsx-sort-props': 'warn',
      // Deprecated rule
      // 'react/jsx-sort-default-props': 'error',
      // suppress errors for missing 'import React' in files
      'react/react-in-jsx-scope': 'off',

      // js Rules
      'accessor-pairs': 'error',
      'array-callback-return': 'error',
      // Allows you to use _VarName to ignore unused variables
      'no-unused-vars': 'off',
      // a little too aggressive
      'arrow-body-style': 'never',
      'block-scoped-var': 'error',
      //'camelcase': 'error',
      //'capitalized-comments': 'error',
      'class-methods-use-this': 'error',
      complexity: 'error',
      'consistent-return': 'error',
      'consistent-this': 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'func-name-matching': 'error',
      'func-names': 'error',
      'func-style': 'error',
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'id-denylist': 'error',
      //'id-length': 'error',
      'id-match': 'error',
      'init-declarations': 'error',
      'logical-assignment-operators': 'error',
      'max-classes-per-file': 'error',
      'max-depth': 'error',
      'max-lines': ['warn', 600],
      //'max-lines-per-function': 'error',
      'max-nested-callbacks': 'error',
      'max-params': 'error',
      //'max-statements': 'error',
      'new-cap': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-console': 'warn',
      'no-constructor-return': 'error',
      'no-continue': 'error',
      'no-div-regex': 'error',
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-inline-comments': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-labels': 'error',
      'no-label-var': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      // Doesn't work will with zod
      //'no-magic-numbers': 'error',
      'no-multi-assign': 'error',
      'no-multi-str': 'error',
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-object-constructor': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'error',
      'no-plusplus': 'error',
      'no-promise-executor-return': 'error',
      'no-proto': 'error',
      'no-restricted-exports': 'error',
      'no-restricted-globals': 'error',
      'no-restricted-imports': 'error',
      'no-restricted-properties': 'error',
      'no-restricted-syntax': 'error',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-template-curly-in-string': 'error',
      // Too restrictive
      // 'no-ternary': 'error',
      'no-throw-literal': 'error',
      // Don't use on Typescript projects
      'no-undef': 'off',
      'no-undefined': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-expressions': 'error',
      // This does not work with putting sytles at the end of the file
      // 'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'no-warning-comments': 'error',
      'object-shorthand': 'error',
      // Don't like this rule
      // 'one-var': 'warn',
      'operator-assignment': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      radix: 'error',
      'require-atomic-updates': 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'error',
      // 'sort-imports': 'error',
      // 'sort-keys': 'error',
      // 'sort-vars': 'error',
      strict: 'error',
      'symbol-description': 'error',
      'unicode-bom': 'error',
      'vars-on-top': 'error',
      yoda: 'error',

      // Import Rules
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-named-as-default': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // disables cross-feature imports:
            // eg. src/features/discussions should not import from src/features/comments, etc.
            {
              target: './src/features/auth',
              from: './src/features',
              except: ['./auth'],
            },
            {
              target: './src/features/users',
              from: './src/features',
              except: ['./users'],
            },
            // enforce unidirectional codebase:

            // e.g. src/app can import from src/features but not the other way around
            {
              target: './src/features',
              from: './src/app',
            },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
              ],
              from: ['./src/features', './src/app'],
            },
          ],
        },
      ],

      // Deprected
      'array-bracket-newline': 'off',
      'array-bracket-spacing': 'off',
      'array-element-newline': 'off',
      'arrow-parens': 'off',
      'arrow-spacing': 'off',
      'block-spacing': 'off',
      'brace-style': 'off',
      'comma-dangle': 'off',
      'comma-spacing': 'off',
      'comma-style': 'off',
      'computed-property-spacing': 'off',
      'dot-location': 'off',
      'eol-last': 'off',
      'func-call-spacing': 'off',
      'function-call-argument-newline': 'off',
      'function-paren-newline': 'off',
      'generator-star-spacing': 'off',
      'implicit-arrow-linebreak': 'off',
      indent: 'off',
      'indent-legacy': 'off',
      'jsx-quotes': 'off',
      'key-spacing': 'off',
      'keyword-spacing': 'off',
      'linebreak-style': 'off',
      'lines-around-comment': 'off',
      'max-len': 'off',
      'max-lines-per-line': 'off',
      'multiline-ternary': 'off',
      'new-parens': 'off',
      'newline-per-chained-call': 'off',
      'no-confusing-arrow': 'off',
      'no-extra-parens': 'off',
      'no-extra-semi': 'off',
      'no-floating-decimal': 'off',
      'no-mixed-operators': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-multi-spaces': 'off',
      'no-multiple-empty-lines': 'off',
      'no-spaced-func': 'off',
      'no-tabs': 'off',
      'no-trailing-spaces': 'off',
      'no-whitespace-before-property': 'off',
      'nonblock-statement-body-position': 'off',
      'object-curly-newline': 'off',
      'object-curly-spacing': 'off',
      'object-property-newline': 'off',
      'one-var-declaration-per-line': 'off',
      'operator-linebreak': 'off',
      'padded-blocks': 'off',
      'quote-props': 'off',
      quotes: 'off',
      'rest-spread-spacing': 'off',
      semi: 'off',
      'semi-spacing': 'off',
      'semi-style': 'off',
      'space-before-blocks': 'off',
      'space-before-function-paren': 'off',
      'space-in-parens': 'off',
      'space-infix-ops': 'off',
      'space-unary-ops': 'off',
      'switch-colon-spacing': 'off',
      'template-curly-spacing': 'off',
      'template-tag-spacing': 'off',
      'wrap-iife': 'off',
      'wrap-regex': 'off',
      'yield-star-spacing': 'off',
      'react/jsx-space-before-closing': 'off',
      'jsx-a11y/label-has-for': 'off',

      // Prettier Rules
      // Needs to be last- It overrides other rules
      ...configPrettier.rules,

      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,jsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
    },
  },

  {
    name: 'Site8-typescript',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      '@typescript-eslint': pluginTypescript,
      'check-file': pluginCheckFile,
    },

    rules: {
      ...pluginTypescript.configs['recommended'].rules,
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
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/init-declarations': 'error',
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-dynamic-delete': 'error',
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-extraneous-class': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-invalid-void-type': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-magic-numbers': 'warn',
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
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-use-before-defines': 'error',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
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
      '@typescript-eslint/prefer-readonly-parameter-types': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
      '@typescript-eslint/max-params': ['error', 5],
      // Check File
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      // Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'Site8-Jest files',
    files: ['**/*.test.(jsx,tsx)'],
    languageOptions: {
      globals: {
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      ...pluginJest.configs['recommended'].rules,

      // Jest rules
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-lowercase-title': 'error',
      'jest/prefer-each': 'error',
      'jest/prefer-expect-assertions': 'error',
      'jest/prefer-expect-resolves': 'error',
      'jest/padding-around-after-all-blocks': 'error',
      'jest/padding-around-after-each-blocks': 'error',
      'jest/padding-around-all': 'error',
      'jest/padding-around-before-all-blocks': 'error',
      'jest/padding-around-before-each-blocks': 'error',
      'jest/padding-around-describe-blocks': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    name: 'Site8-Storybook files',
    files: ['**/*.stories.(jsx,tsx)'],
    languageOptions: {
      globals: {
        it: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
      },
    },
    plugins: {
      storybook: pluginStorybook,
    },
    rules: {
      //  ...pluginStorybook.configs['flat/recommended'],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'check-file/folder-naming-convention': [
        'error',
        {
          '**/*': 'KEBAB_CASE',
        },
      ],
    },
  },
];
