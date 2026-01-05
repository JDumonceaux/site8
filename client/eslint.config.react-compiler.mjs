import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';

const reactCompilerConfig = {
    plugins: {
        'react-compiler': eslintPluginReactCompiler,
    },
    rules: {
        'react-compiler/react-compiler': 'error',
    },
};

export default reactCompilerConfig;
