module.exports = [
  {
    files: ['*.ts', '*.tsx'],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/jsx-runtime',
      'prettier',
    ],
    settings: {
      react: {
        reactVersion: 'detect',
      },
    },
    ignorePatterns: [
      '!.storybook'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: true,
    },
    plugins: ['typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
];