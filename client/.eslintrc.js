"use strict";

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:import/react",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prefer-es6-class": enabled,
    always,
    "react/jsx-filename-extension": "react/jsx-pascal-case",

    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": 1,
    "import/no-unused-modules": 1,
    "import/no-useless-path-segments": 1,
    "import/no-anonymous-default-export": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-unused-vars": [1, { ignoreRestSiblings: true }],
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "latest",
    },
  },
};
