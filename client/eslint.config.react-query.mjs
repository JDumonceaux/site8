// eslint.config.react-query.mjs
import pluginReactQuery from '@tanstack/eslint-plugin-query';

const reactQueryConfig = {
    name: 'Site8-react-query',
    plugins: {
        '@tanstack/query': pluginReactQuery,
    },
    rules: {
        ...pluginReactQuery.configs.recommended.rules,
    },
};

export default reactQueryConfig;
