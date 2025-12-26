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
        // Import Plugin Rules
        // ============================================================================
        'import/default': 'off',
        'import/export': 'error',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
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
            'off',
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
        'import/no-commonjs': 'off', // Consider enabling for ES modules only
        'import/no-cycle': ['error', { maxDepth: 3 }],
        'import/no-default-export': 'off', // Consider based on your preference
        'import/no-deprecated': 'warn',
        'import/no-dynamic-require': 'warn',
        'import/no-empty-named-blocks': 'error',
        'import/no-extraneous-dependencies': [
            'off',
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
                    'webpack.config.*',
                ],
                optionalDependencies: false,
                packageDir: './',
                peerDependencies: false,
            },
        ],
        'import/no-import-module-exports': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-default': 'error',
        'import/no-namespace': 'off', // Consider based on your preference
        'import/no-nodejs-modules': 'warn',
        'import/no-relative-packages': 'error',
        'import/no-relative-parent-imports': 'off', // Consider enabling
        'import/no-restricted-paths': [
            // Temporarily off to fix later
            'off',
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
        // Seems to be problem
        'import/no-unused-modules': [ // Missing recommended rule
            'off',
            {
                unusedExports: true,
            },
        ],
        'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',
        // using perfectionist for import sorting
        'import/order': 'off',
        // using perfectionist for import sorting
        'import/sort-imports': 'off',
        'import/prefer-default-export': 'off', // Consider based on your preference
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