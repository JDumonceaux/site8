import pluginSonarjs from 'eslint-plugin-sonarjs';

const config = {
    files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts}'],
    name: 'Roots-sonarjs',
    plugins: {
        sonarjs: pluginSonarjs,
    },
    rules: {
        ...pluginSonarjs.configs.recommended.rules,
        'sonarjs/cognitive-complexity': ['error', 20],
        'sonarjs/function-return-type': 'off',
        'sonarjs/no-commented-code': 'warn',
        'sonarjs/no-hardcoded-passwords': 'off',
        'sonarjs/no-nested-conditional': 'off',
        'sonarjs/no-nested-functions': 'off',
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/no-unused-vars': 'off',
        'sonarjs/slow-regex': 'off',
        'sonarjs/todo-tag': 'warn',
    },
};

export default config;