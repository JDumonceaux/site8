// eslint.config.react-compiler.mjs
import pluginReactCompiler from 'eslint-plugin-react-compiler';

export default {
    name: 'Site8-react-compiler',
    plugins: {
        'react-compiler': pluginReactCompiler,
    },
    rules: {
        'react-compiler/react-compiler': 'error',
    },
};
