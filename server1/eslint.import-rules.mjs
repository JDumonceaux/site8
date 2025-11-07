/* eslint-disable import/no-extraneous-dependencies */
// eslint.config.import.mjs
import importPlugin from 'eslint-plugin-import';


export default {
    // Include recommended Import rules
    ...importPlugin.configs.recommended.rules,

    // ============================================================================
    // Import Plugin Rules (mirrored from client)
    // ============================================================================
    'import/default': 'off',
    'import/export': 'error',
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'never',
            jsx: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
        },
    ],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': [
        'warn',
        {
            allowArray: false,
            allowArrowFunction: false,
            allowAnonymousClass: false,
            allowAnonymousFunction: false,
            allowCallExpression: true,
            allowNew: false,
            allowLiteral: false,
            allowObject: false,
        },
    ],
    'import/no-commonjs': 'off',
    'import/no-cycle': ['error', { maxDepth: 3 }],
    'import/no-default-export': 'off',
    'import/no-deprecated': 'warn',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'warn',
    'import/no-empty-named-blocks': 'error',
    'import/no-extraneous-dependencies': [
        'error',
        {
            devDependencies: [
                '**/*.test.{js,jsx,ts,tsx}',
                '**/*.spec.{js,jsx,ts,tsx}',
                '**/*.config.{js,mjs,ts}',
                '**/*.setup.{js,ts}',
                '**/setupTests.{js,ts}',
                '**/*.stories.{js,jsx,ts,tsx}',
                'vite.config.*',
                'vitest.config.*',
                'jest.config.*',
                'webpack.config.*',
            ],
            optionalDependencies: false,
        },
    ],
    'import/no-import-module-exports': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-default': 'error',
    'import/no-namespace': 'off',
    'import/no-nodejs-modules': 'warn',
    'import/no-relative-packages': 'error',
    'import/no-relative-parent-imports': 'off',
    'import/no-restricted-paths': [
        'error',
        {
            zones: [
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
                {
                    from: './src/app',
                    target: './src/features',
                },
                {
                    from: ['./src/features', './src/app'],
                    target: ['./src/components', './src/hooks', './src/lib', './src/types', './src/utils'],
                },
            ],
        },
    ],
    'import/no-self-import': 'error',
    'import/no-unassigned-import': [
        'error',
        {
            allow: [
                '**/*.css',
                '**/*.scss',
                '**/*.sass',
                '**/*.less',
            ],
        },
    ],
    'import/no-unresolved': 'error',
    'import/no-unused-modules': [
        'warn',
        {
            unusedExports: true,
        },
    ],
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': [
        'error',
        {
            alphabetize: {
                caseInsensitive: true,
                order: 'asc',
            },
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type'],
            'newlines-between': 'always',
            pathGroups: [
                {
                    group: 'external',
                    pattern: 'react',
                    position: 'before',
                },
            ],
            pathGroupsExcludedImportTypes: ['react'],
        },
    ],
    'import/prefer-default-export': 'off',
};