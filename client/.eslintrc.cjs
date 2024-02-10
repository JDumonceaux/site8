module.exports = {
  env: {
    node: true,
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    // React Redux
    'plugin:react-redux/recommended',
    // Handle JSX transform in React 17+
    'plugin:react/jsx-runtime',
    // Add SonarJS rules
    'plugin:sonarjs/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  plugins: ['sonarjs', 'react-redux', 'immutable', 'promise'],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },

    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    // Enforce ES5 or ES6 class for React Components
    'react/prefer-es6-class': 1,
    // PascalCase file names - warning
    'react/jsx-pascal-case': [1],
    //  JSX not allowed in files in Typescript files
    'react/jsx-filename-extension': 'off',
    // 'immutable/no-let': 2,
    //'immutable/no-this': 2,
    //"immutable/no-mutation": 2
    // Accessibility rules
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    // Promise rules
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
  },
};
