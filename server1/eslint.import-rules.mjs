export const importRules = {
    'import/default': 'off',
    'import/export': 'error',
    'import/extensions': ['error', 'ignorePackages'],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'off',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'warn',
    'import/no-extraneous-dependencies': [
        'error',
        {
            devDependencies: [
                '**/*.test.ts',
                '**/*.test.tsx',
                '**/*.spec.ts',
                '**/test/**',
            ],
        },
    ],
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-default': 'error',
    'import/no-relative-packages': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
        'error',
        {
            'alphabetize': {
                'caseInsensitive': true,
                'order': 'asc',
            },
            'groups': [
                'builtin',
                'external',
                'internal',
                ['parent', 'sibling', 'index'],
                'type',
            ],
            'newlines-between': 'always',
            'pathGroups': [
                {
                    pattern: '@/**',
                    group: 'internal',
                    position: 'before',
                },
            ],
            'pathGroupsExcludedImportTypes': ['builtin'],
        },
    ],
    'import/no-restricted-paths': [
        'error',
        {
            zones: [
                {
                    from: './src/routes',
                    target: './src/features',
                    message: 'Routes should not be imported into features',
                },
                {
                    from: ['./src/features', './src/routes'],
                    target: ['./src/lib', './src/types', './src/middleware'],
                    message: 'Lib, types, and middleware should not depend on features or routes',
                },
            ],
        },
    ],
};