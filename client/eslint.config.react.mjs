// eslint.config.react.mjs
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRedux from 'eslint-plugin-react-redux';

export default {
    name: 'Site8-react',
    plugins: {
        react: pluginReact,
        'react-hooks': pluginHooks,
        'react-redux': pluginRedux,
    },
    rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReact.configs['jsx-runtime'].rules,
        ...pluginHooks.configs.recommended.rules,
        ...pluginRedux.configs.recommended.rules,

        // ============================================================================
        // React Rules
        // ============================================================================
        'react/boolean-prop-naming': ['error', { rule: '^(is|has|should|can|will|did)[A-Z]([A-Za-z0-9]?)+' }],
        'react/button-has-type': 'error',
        'react/checked-requires-onchange-or-readonly': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/destructuring-assignment': ['error', 'always'],
        'react/display-name': 'error', // Missing recommended rule
        'react/forbid-component-props': ['error', { forbid: ['style'] }],
        'react/forbid-dom-props': ['error', { forbid: ['style'] }],
        'react/forbid-elements': [
            'error',
            {
                forbid: [
                    { element: 'acronym', message: 'use <abbr> instead' },
                    { element: 'applet', message: 'use <object> instead' },
                    { element: 'basefont', message: 'use CSS instead' },
                    { element: 'bgsound', message: 'use audio element instead' },
                    { element: 'big', message: 'use CSS font-size instead' },
                    { element: 'blink', message: 'use CSS animation instead' },
                    { element: 'center', message: 'use CSS text-align instead' },
                    { element: 'dir', message: 'use <ul> instead' },
                    { element: 'embed', message: 'use <object> instead' },
                    { element: 'font', message: 'use CSS font-family and font-size instead' },
                    { element: 'frame', message: 'use <iframe> instead' },
                    { element: 'frameset', message: 'use <iframe> instead' },
                    { element: 'marquee', message: 'use CSS animation instead' },
                    { element: 's', message: 'use CSS text-decoration instead' },
                    { element: 'strike', message: 'use CSS text-decoration instead' },
                    { element: 'tt', message: 'use <code> or <kbd> instead' },
                    { element: 'u', message: 'use CSS text-decoration instead' },
                ],
            },
        ],
        'react/forbid-foreign-prop-types': 'error',
        'react/forbid-prop-types': ['error', { forbid: ['any', 'array', 'object'] }],
        'react/forward-ref-uses-ref': 'error',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/hook-use-state': 'error',
        'react/iframe-missing-sandbox': 'error',
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
        'react/jsx-closing-tag-location': 'error',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/jsx-curly-newline': [ // Missing recommended rule
            'error',
            {
                multiline: 'consistent',
                singleline: 'consistent',
            },
        ],
        'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'], // Missing recommended rule
        'react/jsx-fragments': ['error', 'syntax'],
        'react/jsx-handler-names': [
            'error',
            {
                checkInlineFunction: false,
                checkLocalVariables: false,
                eventHandlerPrefix: 'handle',
                eventHandlerPropPrefix: 'on',
            },
        ],
        'react/jsx-indent': ['error', 2],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-key': 'error',
        'react/jsx-max-depth': ['error', { max: 8 }],
        'react/jsx-max-props-per-line': [ // Missing recommended rule
            'error',
            { maximum: 1, when: 'multiline' },
        ],
        'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
        'react/jsx-no-constructed-context-values': 'error',
        'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
        'react/jsx-no-script-url': 'error',
        'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }], // Missing recommended rule
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'error', // Missing recommended rule
        'react/jsx-props-no-spread-multi': 'error',
        'react/jsx-props-no-spreading': ['warn', { custom: 'ignore', explicitSpread: 'ignore' }],
        'react/jsx-sort-props': 'off',
        'react/jsx-tag-spacing': [
            'error',
            {
                closingSlash: 'never',
                beforeSelfClosing: 'always',
                afterOpening: 'never',
                beforeClosing: 'never',
            },
        ],
        'react/jsx-wrap-multilines': [
            'error',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ],
        'react/no-access-state-in-setstate': 'error',
        'react/no-adjacent-inline-elements': 'error',
        'react/no-array-index-key': 'error',
        'react/no-arrow-function-lifecycle': 'error',
        'react/no-children-prop': 'error', // Missing recommended rule
        'react/no-danger': 'error',
        'react/no-danger-with-children': 'error', // Missing recommended rule
        'react/no-deprecated': 'error', // Missing recommended rule
        'react/no-did-mount-set-state': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-find-dom-node': 'error', // Missing recommended rule
        'react/no-invalid-html-attribute': 'error',
        'react/no-multi-comp': ['error', { ignoreStateless: true }],
        'react/no-namespace': 'error',
        'react/no-object-type-as-default-prop': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-render-return-value': 'error', // Missing recommended rule
        'react/no-set-state': 'error',
        'react/no-string-refs': 'error', // Missing recommended rule
        'react/no-this-in-sfc': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': 'error', // Missing recommended rule
        'react/no-unknown-property': 'error', // Missing recommended rule
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
        'react/prop-types': 'off', // Turn off for TypeScript projects
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'react/require-optimization': 'warn',
        'react/require-render-return': 'error', // Missing recommended rule
        'react/self-closing-comp': 'error',
        'react/sort-comp': 'error',
        'react/sort-default-props': 'off',
        'react/sort-prop-types': 'error',
        'react/state-in-constructor': ['error', 'never'],
        'react/static-property-placement': 'error',
        'react/style-prop-object': 'error',
        'react/void-dom-elements-no-children': 'error',

        // ============================================================================
        // React Hooks Rules
        // ============================================================================
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/react-compiler': 'warn', // Changed from 'error' to 'warn' since React Compiler is experimental
        'react-hooks/rules-of-hooks': 'error',

        // ============================================================================
        // React Redux Rules
        // ============================================================================
        'react-redux/connect-prefer-named-arguments': 'error',
        'react-redux/mapStateToProps-prefer-selectors': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};