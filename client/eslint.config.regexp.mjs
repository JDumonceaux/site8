// eslint.config.regexp.mjs
import pluginRegexp from 'eslint-plugin-regexp';

const config = {
    name: 'Site8-regexp',
    plugins: {
        regexp: pluginRegexp,
    },
    rules: {
        ...pluginRegexp.configs.recommended.rules,
        'regexp/no-super-linear-backtracking': 'error',
        'regexp/no-useless-assertions': 'error',
        'regexp/optimal-quantifier-concatenation': 'error',
        'regexp/prefer-character-class': 'error',
        'regexp/prefer-lookaround': 'warn',
        'regexp/prefer-named-capture-group': 'warn',
        'regexp/prefer-quantifier': 'error',
        'regexp/sort-character-class-elements': 'warn',
    },
};

export default config;
