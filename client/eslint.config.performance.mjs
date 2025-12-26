// eslint.config.performance.mjs
import pluginReactPerf from 'eslint-plugin-react-perf';

export default {
    name: 'Site8-performance',
    plugins: {
        'react-perf': pluginReactPerf,
    },
    rules: {
        'react-perf/jsx-no-new-object-as-prop': 'warn',
        'react-perf/jsx-no-new-array-as-prop': 'warn',
        'react-perf/jsx-no-new-function-as-prop': 'warn',
        'react-perf/jsx-no-jsx-as-prop': 'warn',
    },
};
