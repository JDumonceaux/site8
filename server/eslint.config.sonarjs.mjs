import pluginSonarjs from 'eslint-plugin-sonarjs';

const config = {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    name: 'Roots-sonarjs',
    plugins: {
        sonarjs: pluginSonarjs,
    },
    rules: {
        ...pluginSonarjs.configs.recommended.rules,
    },
};

export default config;