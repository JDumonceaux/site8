import pluginUnicorn from 'eslint-plugin-unicorn';

const config = {
  name: 'Site8-unicorn',
  plugins: {
    unicorn: pluginUnicorn,
  },
  rules: {
    ...pluginUnicorn.configs.recommended.rules,
    'unicorn/better-regex': 'error',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'unicorn/prefer-node-protocol': 'off',
    'unicorn/prefer-spread': 'error',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          args: false,
          ctx: false,
          db: false,
          dir: false,
          e: false,
          env: false,
          err: false,
          ext: false,
          fn: false,
          i: false,
          idx: false,
          msg: false,
          obj: false,
          param: false,
          params: false,
          prev: false,
          props: false,
          ref: false,
          rel: false,
          repo: false,
          req: false,
          res: false,
          src: false,
          str: false,
          temp: false,
          util: false,
          utils: false,
          val: false,
        },
      },
    ],
  },
};

export default config;