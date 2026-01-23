// eslint.config.performance.mjs
import pluginReactPerf from 'eslint-plugin-react-perf';

const config = {
    name: 'Site8-performance',
    plugins: {
        'react-perf': pluginReactPerf,
    },
    rules: {
        // Disabled for React Router v6 element prop pattern
        'react-perf/jsx-no-jsx-as-prop': 'off',
        'react-perf/jsx-no-new-array-as-prop': 'warn',
        'react-perf/jsx-no-new-function-as-prop': 'off', // Disabled - useCallback is preferred but not always necessary
        'react-perf/jsx-no-new-object-as-prop': 'warn',
    },
};

export default config;
