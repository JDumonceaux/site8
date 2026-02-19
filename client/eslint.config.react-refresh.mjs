// eslint.config.react-refresh.mjs
import pluginReactRefresh from 'eslint-plugin-react-refresh';

const config = {
    name: 'Site8-react-refresh',
    plugins: {
        'react-refresh': pluginReactRefresh,
    },
    rules: {
        ...pluginReactRefresh.configs.vite.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
};

export default config;
