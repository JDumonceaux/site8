module.exports = {
  env: {
    node: true,
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    // Add SonarJS rules
    'plugin:sonarjs/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  plugins: ['sonarjs'],
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

    // Unable to resolve path to module
    'import/no-unresolved': [0],
  },
};
