import importPlugin from 'eslint-plugin-import';

const config = {
    name: 'Site8-import',
    plugins: {
        import: importPlugin,
    },
    rules: {
        ...importPlugin.configs.recommended.rules,
        'import/default': 'off',
        'import/export': 'off',
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
            'off',
            {
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowArray: false,
                allowArrowFunction: false,
                allowCallExpression: true,
                allowLiteral: false,
                allowNew: false,
                allowObject: true,
            },
        ],
        'import/no-commonjs': 'off',
        'import/no-cycle': ['error', { maxDepth: 3 }],
        'import/no-default-export': 'off',
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
        'import/no-namespace': 'off',
        'import/no-nodejs-modules': 'warn',
        'import/no-relative-packages': 'error',
        'import/no-relative-parent-imports': 'off',
        'import/no-self-import': 'error',
        'import/no-unassigned-import': [
            'error',
            {
                allow: ['**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
            },
        ],
        'import/no-unused-modules': [
            'off',
            {
                unusedExports: true,
            },
        ],
        'import/no-useless-path-segments': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'import/sort-imports': 'off',
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
            },
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
    },
};

export default config;