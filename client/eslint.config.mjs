import checkFileConfig from './eslint.config.check-file.mjs';
import importConfig from './eslint.config.import.mjs';
import javascriptConfig from './eslint.config.javascript.mjs';
import jsxA11yConfig from './eslint.config.jsx-a11y.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import performanceConfig from './eslint.config.performance.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import reactEffectConfig from './eslint.config.react-effect.mjs';
import reactQueryConfig from './eslint.config.react-query.mjs';
import reactConfig from './eslint.config.react.mjs';
import regexpConfig from './eslint.config.regexp.mjs';
import securityConfig from './eslint.config.security.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import unicornConfig from './eslint.config.unicorn.mjs';

const config = [
    // Ignore generated/vendor files
    {
        ignores: ['stats.html', 'dist/**', 'node_modules/**'],
    },
    javascriptConfig,
    checkFileConfig,
    importConfig,
    preferArrowConfig,
    securityConfig,
    regexpConfig,
    reactQueryConfig,
    jsxA11yConfig,
    perfectionistConfig,
    promiseConfig,
    reactConfig,
    reactEffectConfig,
    performanceConfig,
    tsConfig,
    unicornConfig,
    // Relax rules for test files
    {
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
        },
    },];

export default config;