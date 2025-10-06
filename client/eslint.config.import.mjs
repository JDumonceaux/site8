// eslint.config.import.mjs
import importPlugin from 'eslint-plugin-import';

export default {
    name: 'Site8-import',
    plugins: {
        import: importPlugin,
    },
    rules: {
        // Include recommended Import rules
        ...importPlugin.configs.recommended.rules, // Missing recommended rules import

        // ============================================================================
        // Import Plugin Rules
        // ============================================================================
        'import/default': 'off',
        'import/export': 'error',
        'import/extensions': [ // Missing recommended rule
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
        'import/named': 'error', // Missing recommended rule  
        'import/namespace': 'error', // Missing recommended rule
        'import/newline-after-import': 'error',
        'import/no-absolute-path': 'error',
        'import/no-amd': 'error', // Missing recommended rule
        'import/no-anonymous-default-export': [ // Missing recommended rule
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
        'import/no-commonjs': 'off', // Consider enabling for ES modules only
        'import/no-cycle': ['error', { maxDepth: 3 }],
        'import/no-default-export': 'off', // Consider based on your preference
        'import/no-deprecated': 'warn', // Missing recommended rule
        'import/no-duplicates': 'error',
        'import/no-dynamic-require': 'warn',
        'import/no-empty-named-blocks': 'error', // Missing recommended rule
        'import/no-extraneous-dependencies': [ // Missing recommended rule
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
        'import/no-import-module-exports': 'error', // Missing recommended rule
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-default': 'error', // Missing recommended rule
        'import/no-namespace': 'off', // Consider based on your preference
        'import/no-nodejs-modules': 'warn',
        'import/no-relative-packages': 'error', // Missing recommended rule
        'import/no-relative-parent-imports': 'off', // Consider enabling
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
        'import/no-unassigned-import': [ // Missing recommended rule
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
        'import/no-unresolved': 'error', // Missing recommended rule
        'import/no-unused-modules': [ // Missing recommended rule
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
        'import/prefer-default-export': 'off', // Consider based on your preference
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'], // Added .ts and .tsx
            },
            typescript: { // Missing TypeScript resolver configuration
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'], // Missing extensions setting
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
};