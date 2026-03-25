import pluginPromise from 'eslint-plugin-promise';

const config = {
    name: 'Site8-promise',
    plugins: {
        promise: pluginPromise,
    },
    rules: {
        ...pluginPromise.configs.recommended.rules,
        'promise/avoid-new': 'warn',
        'promise/no-multiple-resolved': 'warn',
        'promise/prefer-await-to-callbacks': 'warn',
        'promise/prefer-await-to-then': 'warn',
        'promise/prefer-catch': 'warn',
        'promise/spec-only': 'off',
    },
};

export default config;