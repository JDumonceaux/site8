import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';

export default [
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: ['@typescript-eslint'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        // Ignore variables prefixed with '_' as they are often used for unused parameters in function signatures.
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
