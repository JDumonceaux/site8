// eslint.config.typescript.mjs
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import pluginCheckFile from 'eslint-plugin-check-file';

export default {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        ecmaVersion: 'latest',
        parser: typescriptParser,
        parserOptions: {
            ecmaFeatures: { jsx: true },
            project: './tsconfig.json',
        },
        sourceType: 'module',
    },
    linterOptions: {
        reportUnusedDisableDirectives: 'error',
    },
    name: 'site8-ts-eslint-config',
    plugins: {
        '@typescript-eslint': pluginTypescript,
        'check-file': pluginCheckFile,
    },
    rules: {
        // TypeScript recommended rules
        ...pluginTypescript.configs.recommended.rules,
        ...pluginTypescript.configs['recommended-requiring-type-checking'].rules,

        // Enforce consistent type definitions
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/await-thenable': 'error', // Missing recommended rule
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/ban-ts-comment': 'error', // Missing recommended rule
        '@typescript-eslint/ban-types': 'error', // Missing recommended rule
        '@typescript-eslint/class-literal-property-style': 'error',
        '@typescript-eslint/class-methods-use-this': 'error',
        '@typescript-eslint/consistent-generic-constructors': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-return': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
        '@typescript-eslint/consistent-type-exports': 'error',
        '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports', prefer: 'type-imports' }],
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/dot-notation': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/max-params': ['error', { max: 5 }],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/naming-convention': [ // Missing recommended rule
            'error',
            {
                selector: 'variableLike',
                format: ['camelCase'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
        '@typescript-eslint/no-array-constructor': 'error', // Missing recommended rule
        '@typescript-eslint/no-base-to-string': 'error', // Missing recommended rule
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-deprecated': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error', // Missing recommended rule
        '@typescript-eslint/no-duplicate-type-constituents': 'error', // Missing recommended rule
        '@typescript-eslint/no-dupe-class-members': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-empty-function': 'error', // Missing recommended rule
        '@typescript-eslint/no-empty-interface': 'error', // Missing recommended rule
        // Allow empty functions for cases such as interface implementations or intentional stubs.
        // The 'any' type is permitted in rare cases where type safety cannot be guaranteed or for rapid prototyping.
        // Please document the reason for using 'any' in code comments when it is used.
        '@typescript-eslint/no-explicit-any': 'off', // Remove duplicate
        '@typescript-eslint/no-extra-non-null-assertion': 'error', // Missing recommended rule
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-floating-promises': 'error', // Missing recommended rule
        '@typescript-eslint/no-for-in-array': 'error', // Missing recommended rule
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error', // Missing recommended rule
        '@typescript-eslint/no-loss-of-precision': 'error', // Missing recommended rule
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-misused-new': 'error', // Missing recommended rule
        '@typescript-eslint/no-misused-promises': 'error', // Missing recommended rule
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-namespace': 'error', // Missing recommended rule
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // Missing recommended rule
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error', // Missing recommended rule
        '@typescript-eslint/no-require-imports': 'error', // Missing recommended rule
        '@typescript-eslint/no-restricted-imports': 'error',
        '@typescript-eslint/no-restricted-types': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-this-alias': 'error', // Missing recommended rule
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error', // Missing recommended rule
        '@typescript-eslint/no-unnecessary-type-constraint': 'error', // Missing recommended rule
        '@typescript-eslint/no-unnecessary-type-parameters': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error', // Missing recommended rule
        '@typescript-eslint/no-unsafe-assignment': 'error', // Missing recommended rule
        '@typescript-eslint/no-unsafe-call': 'error', // Missing recommended rule
        '@typescript-eslint/no-unsafe-enum-comparison': 'error', // Missing recommended rule
        '@typescript-eslint/no-unsafe-member-access': 'error', // Missing recommended rule
        '@typescript-eslint/no-unsafe-return': 'error', // Missing recommended rule
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-var-requires': 'error', // Missing recommended rule
        '@typescript-eslint/prefer-as-const': 'error', // Missing recommended rule
        '@typescript-eslint/prefer-destructuring': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error', // Missing recommended rule
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-readonly': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/require-array-sort-compare': 'error',
        '@typescript-eslint/require-await': 'error', // Missing recommended rule
        '@typescript-eslint/restrict-plus-operands': 'error', // Missing recommended rule
        '@typescript-eslint/restrict-template-expressions': 'error', // Missing recommended rule
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/triple-slash-reference': 'error', // Missing recommended rule
        '@typescript-eslint/typedef': 'error',
        '@typescript-eslint/unbound-method': 'error', // Missing recommended rule
        '@typescript-eslint/unified-signatures': 'error',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

        // Filename convention for TypeScript files
        'check-file/filename-naming-convention': [
            'error',
            // Both .ts and .tsx files use PASCAL_CASE for consistency across the team
            { '**/*.{ts,tsx}': 'PASCAL_CASE' },
            { ignoreMiddleExtensions: true }
        ],
    },
    settings: {
        react: { version: 'detect' }
    },
};