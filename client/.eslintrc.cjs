module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-redux/recommended',
    'plugin:react/jsx-runtime',
    'eslint-config-prettier',
    'plugin:css/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: [
    'react-redux',
    'immutable',
    'promise',
    'jest',
    'react-refresh',
    'prefer-arrow-functions',
    'eslint-plugin-react-compiler',
    'simple-import-sort',
    'css',
  ],
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
    'object-shorthand': 'warn',
    // React Compiler
    'react-compiler/react-compiler': 'error',
    // Enforce ES5 or ES6 class for React Components
    'react/prefer-es6-class': 'warn',
    // PascalCase file names - warning
    'react/jsx-pascal-case': 'warn',
    //  JSX not allowed in files in Typescript files
    'react/jsx-filename-extension': 'off',
    'immutable/no-let': 'warn',
    'immutable/no-this': 'warn',
    //'immutable/no-mutation': 'warn',
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
    // Jest rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    // react refresh
    //'react-refresh/only-export-components': 'warn',
    // https://timjames.dev/blog/the-best-eslint-rules-for-react-projects-30i8
    'react/prefer-stateless-function': 'error',
    'react/button-has-type': 'error',
    'react/no-unused-prop-types': 'error',
    'react/jsx-no-script-url': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/jsx-fragments': 'error',
    'react/destructuring-assignment': [
      'error',
      'always',
      { destructureInSignature: 'always' },
    ],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-max-depth': ['error', { max: 8 }],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-typos': 'warn',
    'react/display-name': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/prefer-read-only-props': 'warn',
    'react/no-array-index-key': 'warn',
    // This is no longer a problem
    // 'react/jsx-no-bind': 'warn',
    // 'react/jsx-props-no-spreading': 'warn',
    'react/no-multi-comp': 'warn',
    //'filename-rules/match': [2, { '.ts': 'camelcase', '.tsx': 'pascalcase' }],
    //'import/no-default-export': 'error',
    'prefer-arrow-functions/prefer-arrow-functions': [
      'warn',
      {
        allowNamedFunctions: false,
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],
    // This conflicts with ?
    // 'simple-import-sort/imports': [
    //   'warn',
    //   {
    //     groups: [
    //       // React
    //       ['^react', '^@?\\w'],
    //       // External packages
    //       ['^\\w'],
    //       // Internal files
    //       ['^\\./'],
    //       // Styles
    //       ['^.+\\.s?css$'],
    //       // ?
    //       ['^\\u0000'],
    //       ['^\\w'],
    //       ['^\\..*'],
    //     ],
    //   },
    // ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'no-restricted-imports': ['error', { paths: ['prop-types'] }],
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-unused-vars': 2,
        '@typescript-eslint/no-unused-vars': 0,
        'immutable/no-mutation': 'warn',
      },
    },
    {
      files: ['*.test.*'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'max-lines': 0,
        'jest/prefer-expect-assertions': 'off',
      },
    },
  ],
};
