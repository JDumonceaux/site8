// eslint.config.base.mjs
import js from '@eslint/js';
import pluginReactQuery from '@tanstack/eslint-plugin-query';
import pluginCheckFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import pluginA11y from 'eslint-plugin-jsx-a11y';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginArrow from 'eslint-plugin-prefer-arrow-functions';
import pluginPromise from 'eslint-plugin-promise';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRedux from 'eslint-plugin-react-redux';
import pluginYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default {
    files: ['**/*.{js,jsx,mjs}'],
    ignorePatterns: ['dist/**', 'node_modules/**', 'bin/**'],
    languageOptions: {
        ecmaVersion: 'latest',
        globals: { ...globals.browser },
        sourceType: 'module'
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'error'
    },
    name: 'Site8-base',
    plugins: {
        '@eslint/js': js,
        '@tanstack/query': pluginReactQuery,
        'check-file': pluginCheckFile,
        import: importPlugin,
        'jsx-a11y': pluginA11y,
        perfectionist: pluginPerfectionist,
        'prefer-arrow-functions': pluginArrow,
        promise: pluginPromise,
        react: pluginReact,
        'react-hooks': pluginHooks,
        'react-redux': pluginRedux,
        'react-you-might-not-need-an-effect': pluginYouMightNotNeedAnEffect,
        unicorn: pluginUnicorn
    },
    rules: {
        ...js.configs.recommended.rules,
        ...pluginReactQuery.configs.recommended.rules,
        ...pluginReact.configs.recommended.rules,
        ...pluginHooks.configs.recommended.rules,
        ...pluginRedux.configs.recommended.rules,
        ...pluginA11y.configs.recommended.rules,
        ...pluginUnicorn.configs.recommended.rules,
        // js Rules
        'accessor-pairs': 'error',
        // ...importPlugin.flatconfig.recommended.rules,

        // Evaluate: Too many and conflicting rules
        // ...pluginSonar.configs.recommended.rules,

        // Deprecated
        'array-bracket-newline': 'off',

        'array-bracket-spacing': 'off',
        // Deprecated

        'array-callback-return': 'error',
        // Deprecated
        'array-element-newline': 'off',
        // a little too aggressive
        'arrow-body-style': 'off',
        // Deprecated
        'arrow-parens': 'off',
        // Deprecated
        'arrow-spacing': 'off',
        'block-scoped-var': 'error',
        // Deprecated
        'block-spacing': 'off',
        // Deprecated
        'brace-style': 'off',
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.config.{mjs}': 'FLAT_CASE',
                '**/*.{html}': 'FLAT_CASE',
                '**/*.{json}': 'KEBAB_CASE',
                '**/*.{jsx}': 'PASCAL_CASE',
                '**/*.{js}': 'CAMEL_CASE',
                '**/*.{md}': 'SCREAMING_SNAKE_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        //'camelcase': 'error',
        //'capitalized-comments': 'error',
        'class-methods-use-this': 'error',
        // Deprecated
        'comma-dangle': 'off',
        // Deprecated
        'comma-spacing': 'off',
        // Deprecated
        'comma-style': 'off',
        complexity: 'error',
        // Deprecated
        'computed-property-spacing': 'off',
        'consistent-return': 'error',
        'consistent-this': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        // Deprecated
        'dot-location': 'off',
        'dot-notation': 'error',
        // Deprecated
        'eol-last': 'off',
        eqeqeq: 'error',
        // Deprecated
        'func-call-spacing': 'off',
        'func-name-matching': 'error',
        'func-names': 'error',
        'func-style': 'error',
        'function-call-argument-newline': 'off',
        'function-paren-newline': 'off',
        'generator-star-spacing': 'off',

        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'id-denylist': 'error',
        //'id-length': 'error',
        'id-match': 'error',
        'implicit-arrow-linebreak': 'off',
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
        indent: 'off',
        'indent-legacy': 'off',
        // conflicts with no-undef-init
        'init-declarations': 'off',
        'jsx-a11y/anchor-ambiguous-text': 'warn',
        // A11Y rules
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                aspects: ['invalidHref', 'preferButton'],
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
            },
        ],
        'jsx-a11y/control-has-associated-label': 'error',
        'jsx-a11y/label-has-associated-control': 'error',
        // Depreacted
        //'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/lang': 'error',
        'jsx-a11y/no-aria-hidden-on-focusable': 'error',
        'jsx-a11y/prefer-tag-over-role': 'error',
        'jsx-quotes': 'off',
        'key-spacing': 'off',
        'keyword-spacing': 'off',
        'linebreak-style': 'off',
        'lines-around-comment': 'off',
        'logical-assignment-operators': 'error',
        'max-classes-per-file': 'error',
        'max-depth': 'error',
        'max-len': 'off',
        'max-lines': ['warn', 1000],
        'max-lines-per-line': 'off',
        //'max-lines-per-function': 'error',
        'max-nested-callbacks': 'error',
        'max-params': ['error', 5],
        'multiline-ternary': 'off',
        //'max-statements': 'error',
        'new-cap': 'error',
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-alert': 'error',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-confusing-arrow': 'off',
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
        'no-extra-parens': 'off',
        'no-extra-semi': 'off',
        'no-floating-decimal': 'off',
        // Too restrictive
        'no-implicit-coercion': 'off',

        'no-implicit-globals': 'error',

        'no-implied-eval': 'error',

        // Too restrictive
        'no-inline-comments': 'off',
        'no-inner-declarations': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-mixed-operators': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        // Doesn't work will with zod
        //'no-magic-numbers': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'off',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'off',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-object-constructor': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        // Too aggressive
        'no-plusplus': 'off',
        'no-promise-executor-return': 'error',
        'no-proto': 'error',
        'no-restricted-exports': 'error',
        'no-restricted-globals': 'error',
        // Added to prevent use of react-router instead of react-router-dom
        'no-restricted-imports': [
            'error', {
                'paths': [
                    { importNames: ["useLocation"], message: "Make sure you are importing useLocation from react-router-dom instead of react-router.", name: "react-router" },
                    { importNames: ["useHistory"], message: "Make sure you are importing useHistory from react-router-dom instead of react-router.", name: "react-router" },
                    { importNames: ["useParams"], message: "Make sure you are importing useParams from react-router-dom instead of react-router.", name: "react-router" },
                    { importNames: ["useRouteMatch"], message: "Make sure you are importing useRouteMatch from react-router-dom instead of react-router.", name: "react-router" },
                    { importNames: ["Link"], message: "Make sure you are importing Link from react-router-dom instead of react-router.", name: "react-router" },

                ]
            }
        ],
        'no-restricted-properties': ['warn',
            {
                message: 'Avoid using reverse, use toReversed instead.',
                property: 'reverse', // Replace  reverse
            },
            {
                message: 'Avoid using sort, use toSorted instead.',
                property: 'sort', // Replace  sort
            },
            {
                message: 'Avoid using splice, use toSpliced instead.',
                property: 'splice', // Replace "splice"
            },],
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-spaced-func': 'off',
        'no-tabs': 'off',
        'no-template-curly-in-string': 'error',
        // Too restrictive
        // 'no-ternary': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off',
        // Don't use on Typescript projects
        'no-undef': 'off',
        'no-undef-init': 'error',
        // no restictive
        'no-undefined': 'off',
        'no-underscore-dangle': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable-loop': 'error',
        'no-unused-expressions': 'error',
        // Allows you to use _VarName to ignore unused variables
        'no-unused-vars': 'off',
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
        'no-whitespace-before-property': 'off',
        'nonblock-statement-body-position': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': 'off',
        'object-property-newline': 'off',
        'object-shorthand': 'error',
        'one-var-declaration-per-line': 'off',
        // Don't like this rule
        // 'one-var': 'warn',
        'operator-assignment': 'error',
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        // Perfectionist rules
        'perfectionist/sort-array-includes': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-enums': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-jsx-props': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-object-types': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        // Big Fix
        'perfectionist/sort-objects': [
            'warn',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-sets': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-switch-case': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-union-types': [
            'error',
            {
                order: 'asc',
                type: 'natural',
            },
        ],
        'prefer-arrow-callback': 'error',
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
        // Promise rules
        'promise/always-return': 'error',
        'promise/avoid-new': 'warn',
        'promise/catch-or-return': 'error',
        'promise/no-callback-in-promise': 'warn',
        'promise/no-multiple-resolved': 'warn',
        'promise/no-native': 'off',
        'promise/no-nesting': 'warn',
        'promise/no-new-statics': 'error',
        'promise/no-promise-in-callback': 'warn',
        'promise/no-return-in-finally': 'warn',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/prefer-await-to-callbacks': 'warn',
        'promise/prefer-await-to-then': 'warn',
        'promise/spec-only': 'warn',
        'promise/valid-params': 'warn',
        'quote-props': 'off',
        quotes: 'off',
        radix: 'error',
        "react-hooks/exhaustive-deps": "warn",
        'react-hooks/react-compiler': 'error',
        // React compiler rules
        "react-hooks/rules-of-hooks": "error",
        'react-redux/connect-prefer-named-arguments': 'error',
        // Redux rules
        'react-redux/mapStateToProps-prefer-selectors': 'error',
        "react-you-might-not-need-an-effect/you-might-not-need-an-effect": "warn",
        // React Rules
        'react/boolean-prop-naming': 'error',
        'react/button-has-type': 'error',
        'react/checked-requires-onchange-or-readonly': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': 'error',
        'react/forbid-component-props': 'error',
        'react/forbid-dom-props': 'error',
        // Discourage use of deprecated elements
        'react/forbid-elements': [
            'error',
            {
                forbid: [
                    { element: 'acronym', message: 'use <abbr> instead' },
                    { element: 'applet', message: 'use <object> instead' },
                    { element: 'basefont', message: 'use <font> instead' },
                    { element: 'bgsound' },
                    { element: 'big', message: 'use font-size instead' },
                    { element: 'blink', message: 'use css instead' },
                    { element: 'center', message: 'use text-align instead' },
                    { element: 'dir' },
                    { element: 'embed', message: 'use <object> instead' },
                    { element: 'font', message: 'use font-family and font-size instead' },
                    { element: 'frame' },
                    { element: 'frameset', message: 'use <iframe> instead' },
                    { element: 'ilayer' },
                    { element: 'isindex' },
                    { element: 'keygen' },
                    { element: 'layer' },
                    { element: 'marquee', message: 'use CDD instead' },
                    { element: 'menu' },
                    { element: 'menuitem' },
                    { element: 'multicol' },
                    { element: 'nobr' },
                    { element: 'noembed' },
                    { element: 'noframes' },
                    { element: 'param' },
                    { element: 'plaintext', message: 'use <pre> instead' },
                    { element: 's', message: 'use text-decoration instead' },
                    { element: 'spacer', message: 'use <pre> & <br> instead' },
                    { element: 'strike', message: 'use text-decoration instead' },
                    { element: 'tt', message: 'use <pre> & <kbd> instead' },
                    { element: 'u', message: 'use <pre> & <kbd> instead' },
                    { element: 'xmp', message: 'use text-decoration instead' },
                ],
            },
        ],
        'react/forbid-foreign-prop-types': 'error',
        'react/forbid-prop-types': 'error',
        'react/forward-ref-uses-ref': 'error',

        // Confusing as to waht is the best practice for component definition
        'react/function-component-definition': 'off',
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
        // Modified from default to allow jsx in tsx files
        'react/jsx-filename-extension': ['error', {
            "extensions": [".jsx", ".tsx"]
        }],
        // 'react/jsx-first-prop-new-line': 'error',
        'react/jsx-fragments': 'error',
        'react/jsx-handler-names': 'error',

        // 'react/jsx-indent': 'error',
        // 'react/jsx-indent-props': 'error',
        'react/jsx-max-depth': ['error', { 'max': 8 }],
        // 'react/jsx-max-props-per-line': 'error',
        // 'react/jsx-newline': 'error',
        // This is out-of-date: https://reacttraining.com/blog/react-inline-functions-and-performance
        'react/jsx-no-bind': 'off',
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-leaked-render': 'error',
        // This is helpful if you're using I18n for translations, but not necessary
        'react/jsx-no-literals': 'off',
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-useless-fragment': 'error',
        // 'react/jsx-one-expression-per-line': 'error',
        'react/jsx-pascal-case': 'error',
        // Trying out
        'react/jsx-props-no-spread-multi': 'error',
        // 'react/jsx-props-no-multi-spaces': 'error',
        // 'react/jsx-props-no-spread-multi': 'error',
        // Too restrictive
        // This is an anit-pattern and can cause unneeded re-renders
        // However, it is useful for passing large numbers of props to children
        'react/jsx-props-no-spreading': 'off',
        // 'react/jsx-sort-default-props': 'error',
        'react/jsx-sort-props': 'error',
        'react/jsx-space-before-closing': 'off',
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
        // added
        'react/no-unsafe': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/no-unused-class-component-methods': 'error',
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',

        'react/no-will-update-set-state': 'error',
        'react/prefer-es6-class': 'error',
        'react/prefer-exact-props': 'error',
        'react/prefer-read-only-props': 'off',
        'react/prefer-stateless-function': 'error',
        // We want to encourage the use of the spread operator
        // 'react/jsx-props-no-spreading': 'off',
        // There is a conflict somewhere with this rule
        // conflicts with perfectionist/sort-jsx-props
        // 'react/jsx-sort-props': 'warn',
        // Deprecated rule
        // 'react/jsx-sort-default-props': 'error',
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        // Too agrressive
        'react/require-default-props': 'off',
        'react/require-optimization': 'error',
        'react/self-closing-comp': 'error',
        'react/sort-comp': 'error',
        'react/sort-default-props': 'error',
        'react/sort-prop-types': 'error',
        'react/state-in-constructor': 'error',
        'react/static-property-placement': 'error',
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'require-unicode-regexp': 'error',
        'rest-spread-spacing': 'off',
        semi: 'off',
        'semi-spacing': 'off',
        'semi-style': 'off',
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'space-in-parens': 'off',
        'space-infix-ops': 'off',
        'space-unary-ops': 'off',
        // 'sort-imports': 'error',
        // 'sort-keys': 'error',
        // 'sort-vars': 'error',
        strict: 'error',
        'switch-colon-spacing': 'off',
        'symbol-description': 'error',
        'template-curly-spacing': 'off',
        'template-tag-spacing': 'off',
        'unicode-bom': 'error',
        'unicorn/better-regex': 'error',
        'unicorn/consistent-destructuring': 'error',
        'unicorn/custom-error-definition': 'error',
        // Unicorn
        'unicorn/filename-case': 'off',
        // confusing
        'unicorn/no-array-callback-reference': 'off',
        // confusing
        'unicorn/no-array-reduce': 'off',
        // Incorrectly prevents the use of null as a component return (i.e. render nothing)
        'unicorn/no-instanceof-builtins': 'off',
        'unicorn/no-null': 'off',
        // conflicts with no-undefine-init
        'unicorn/no-useless-undefined': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'vars-on-top': 'error',
        'wrap-iife': 'off',

        'wrap-regex': 'off',

        'yield-star-spacing': 'off',
        yoda: 'error',
    },
    settings: {
        react: { version: 'detect' }
    }
};
