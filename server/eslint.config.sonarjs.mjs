import pluginSonarjs from 'eslint-plugin-sonarjs';

const config = {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    name: 'Roots-sonarjs',
    plugins: {
        sonarjs: pluginSonarjs,
    },
    rules: {
        ...pluginSonarjs.configs.recommended.rules,
        'sonarjs/cognitive-complexity': ['error', 20],
        'sonarjs/no-nested-conditional': 'off',
        'sonarjs/no-unused-vars': 'off',
        'sonarjs/todo-tag': 'warn',
    },
};

export default config;