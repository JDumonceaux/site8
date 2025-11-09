// eslint.config.jsx-a11y.mjs
import pluginA11y from 'eslint-plugin-jsx-a11y';

export default {
    name: 'Site8-jsx-a11y',
    plugins: {
        'jsx-a11y': pluginA11y,
    },
    rules: {
        ...pluginA11y.configs.recommended.rules,

        // ============================================================================
        // JSX A11y Rules
        // ============================================================================
        'jsx-a11y/alt-text': [
            'error',
            {
                area: [],
                elements: ['img', 'object', 'area', 'input[type="image"]'],
                img: [],
                'input[type="image"]': [],
                object: [],
            },
        ],
        'jsx-a11y/anchor-ambiguous-text': 'warn',
        'jsx-a11y/anchor-has-content': ['error', { components: [] }],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                aspects: ['invalidHref', 'preferButton'],
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
            },
        ],
        'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],
        'jsx-a11y/autocomplete-valid': [
            'error',
            {
                inputComponents: [],
            },
        ],

        'jsx-a11y/control-has-associated-label': [
            'error',
            {
                ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
                ignoreRoles: ['grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'row', 'tablist', 'toolbar', 'tree', 'treegrid'],
            },
        ],
        'jsx-a11y/heading-has-content': ['error', { components: [] }],

        'jsx-a11y/interactive-supports-focus': 'error',
        'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
        'jsx-a11y/lang': 'error',
        'jsx-a11y/media-has-caption': [
            'error',
            {
                audio: [],
                track: [],
                video: [],
            },
        ],

        'jsx-a11y/no-aria-hidden-on-focusable': 'error',
        'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
        'jsx-a11y/no-distracting-elements': [
            'error',
            {
                elements: ['marquee', 'blink'],
            },
        ],
        'jsx-a11y/no-interactive-element-to-noninteractive-role': [
            'error',
            {
                tr: ['none', 'presentation'],
            },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': [
            'error',
            {
                handlers: [
                    'onClick',
                    'onMouseDown',
                    'onMouseUp',
                    'onKeyPress',
                    'onKeyDown',
                    'onKeyUp',
                ],
            },
        ],
        'jsx-a11y/no-noninteractive-element-to-interactive-role': [
            'error',
            {
                li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
                ol: [
                    'listbox',
                    'menu',
                    'menubar',
                    'radiogroup',
                    'tablist',
                    'tree',
                    'treegrid',
                ],
                table: ['grid'],
                td: ['gridcell'],
                ul: [
                    'listbox',
                    'menu',
                    'menubar',
                    'radiogroup',
                    'tablist',
                    'tree',
                    'treegrid',
                ],
            },
        ],
        'jsx-a11y/no-noninteractive-tabindex': [
            'error',
            {
                roles: ['tabpanel'],
                tags: [],
            },
        ],

        'jsx-a11y/no-static-element-interactions': [
            'error',
            {
                handlers: [
                    'onClick',
                    'onMouseDown',
                    'onMouseUp',
                    'onKeyPress',
                    'onKeyDown',
                    'onKeyUp',
                ],
            },
        ],
        'jsx-a11y/prefer-tag-over-role': 'error',


        // Note: Deprecated rules removed (accessible-emoji, label-has-for, no-onchange)
    },
};