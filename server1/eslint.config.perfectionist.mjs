// eslint.config.perfectionist.mjs
import pluginPerfectionist from 'eslint-plugin-perfectionist';

const config = {
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
            'error',
            {
                groups: [
                    'type',
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'side-effect',
                    'style',
                    'unknown',
                ],
                newlinesBetween: 1,
                order: 'asc',
                type: 'natural',
            },
        ],
        'perfectionist/sort-interfaces': ['error', { order: 'asc', type: 'natural' }],
        // Disabled temporarily to avoid strict schema validation issues
        'perfectionist/sort-jsx-props': 'off',

        'perfectionist/sort-maps': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-object-types': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-objects': ['warn', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-sets': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-switch-case': ['error', { order: 'asc', type: 'natural' }],
        // too restrictive for now
        'perfectionist/sort-union-types': ['off', { order: 'asc', type: 'natural' }],
    },
};

export default config;