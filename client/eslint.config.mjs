import pluginJs from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import a11yConfig from './eslint_rules/react-a11y.js';
import reactConfig from './eslint_rules/react.js';
import whitespaceConfig from './eslint_rules/whitespaceRules.js';

export default [
  reactConfig,
  whitespaceConfig,
  a11yConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js: pluginJs,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': 'enabled',
    },
  },

  pluginJs.configs.recommended,
];
