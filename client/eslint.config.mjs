import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: { 'react/react-in-jsx-scope': 'off' },
  },
  {
    languageOptions: {
      globals: { ....globals.browser }, 
      parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
