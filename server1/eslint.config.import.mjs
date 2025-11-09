
// eslint.config.import.mjs
import importPlugin from 'eslint-plugin-import';

export default {
    name: 'Site8-import',
    plugins: {
        import: importPlugin,
    },
    rules: {
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
                js: 'always',
                jsx: 'never',
                mjs: 'always',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/first': 'error',
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
                allowObject: true, // Allow for ESLint config files and simple exports
            },
        ],
        'import/no-commonjs': 'off',
        'import/no-cycle': ['error', { maxDepth: 3 }],
        'import/no-default-export': 'off',
        'import/no-deprecated': 'warn',
        'import/no-dynamic-require': 'warn',
        'import/no-empty-named-blocks': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*.test.{js,ts}',
                    '**/*.spec.{js,ts}',
                    '**/*.config.{js,mjs,ts}',
                    '**/*.config.*.{js,mjs,ts}',
                    '**/*.setup.{js,ts}',
                    '**/setupTests.{js,ts}',
                    '**/eslint.config.*.{js,mjs}',
                    'eslint.config.{js,mjs}',
                    '**/jest.config.{js,ts}',
                    '**/vitest.config.{js,ts}',
                ],
                optionalDependencies: false,
                peerDependencies: false,
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
        'import/no-unused-modules': [
            // Too much trouble.
            'off',
            {
                unusedExports: true,
                ignoreExports: [
                    '**/*.config.{js,mjs,ts}',
                    '**/*.config.*.{js,mjs,ts}',
                    '**/eslint.config.*.{js,mjs}',
                    'eslint.config.{js,mjs}',
                    '**/*.d.ts',
                    '**/index.{ts,js}', // Entry points and barrel files
                    '**/main.{ts,js}',
                    '**/server.{ts,js}',
                    '**/*.test.{ts,js}',
                    '**/*.spec.{ts,js}',
                ],
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