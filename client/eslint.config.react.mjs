// eslint.config.react.mjs
import eslintReact from '@eslint-react/eslint-plugin';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginRedux from 'eslint-plugin-react-redux';

export default [
    eslintReact.configs['recommended-typescript'],
    {
        plugins: {
            'react-hooks': pluginHooks,
            'react-redux': pluginRedux,
        },
        rules: {
            ...pluginHooks.configs.recommended.rules,
            'react-hooks/exhaustive-deps': 'error',
            ...pluginRedux.configs.recommended.rules,
            // react-redux/no-unused-prop-types uses context.getSourceCode() removed in ESLint 10
            'react-redux/no-unused-prop-types': 'off',
        },
    },
];
