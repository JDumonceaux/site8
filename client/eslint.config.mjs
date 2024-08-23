import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import reactConfig from './eslint_rules/react';
import a11yConfig from './eslint_rules/react-a11y';
import whitespaceConfig from './eslint_rules/whitespaceRules';

export default [
  reactConfig,
  whitespaceConfig,
  a11yConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: { 'react/react-in-jsx-scope': 'off' },
  },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
