
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
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowArray: false,
                allowArrowFunction: false,
                allowCallExpression: true,
                allowLiteral: false,
                allowNew: false,
                allowObject: true, // Allow for ESLint config files and simple exports
            },
        ],
        'import/no-commonjs': 'off',
        // False errors
        'import/no-cycle': 'off',
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
        // Not applicable in our codebase
        'import/no-nodejs-modules': 'off',
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
                unusedExports: true,
            },
        ],
        'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',
        // Let perfectionist handle
        'import/order': 'off',
        'import/prefer-default-export': 'off',
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'], // Missing extensions setting
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'], // Added .ts and .tsx
            },
            typescript: { // Missing TypeScript resolver configuration
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },
};