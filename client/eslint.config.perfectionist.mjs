// eslint.config.perfectionist.mjs
import pluginPerfectionist from 'eslint-plugin-perfectionist';

export default {
    name: 'Site8-perfectionist',
    plugins: {
        perfectionist: pluginPerfectionist,
    },
    rules: {
        // ============================================================================
        // Perfectionist Rules
        // ============================================================================
        'perfectionist/sort-array-includes': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-classes': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-enums': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': [
            'warn',
            {
                customGroups:
                    [
                        {
                            selector: "type",
                            groupName: "react",
                            elementNamePattern: ["react", "react-*"],
                            newlinesInside: 0

                        }
                    ],
                groups: [
                    'react',
                    { newlinesBetween: 1 },
                    'type',
                    'builtin',
                    'external',
                    'internal-type',
                    'internal',
                    'parent-type',
                    'parent',
                    'sibling-type',
                    'sibling',
                    'side-effect',
                    'style',
                    'object',
                    'unknown',
                ],
                newlinesBetween: 0,
                order: 'asc',
                fallbackSort: { type: 'alphabetical', order: 'asc' },
                partitionByNewLine: false,
                type: 'natural',
                tsconfig: { rootDir: './', filename: './tsconfig.json' }
            },
        ],
        'perfectionist/sort-interfaces': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-jsx-props': [
            'error',
            {
                customGroups: {
                    callback: 'on*',
                    reserved: ['key', 'ref'],
                },
                groups: ['reserved', 'shorthand', 'multiline', 'unknown', 'callback'],
                order: 'asc',
                type: 'natural',
            },
        ],

        'perfectionist/sort-maps': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-object-types': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-objects': ['warn', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-sets': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-switch-case': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-union-types': ['error', { order: 'asc', type: 'natural' }],
    },
};