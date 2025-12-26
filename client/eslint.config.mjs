import reactEffectConfig from './eslint.config.react-effect.mjs';
import reactQueryConfig from './eslint.config.react-query.mjs';
import reactConfig from './eslint.config.react.mjs';

import checkFileConfig from './eslint.config.check-file.mjs';
import importConfig from './eslint.config.import.mjs';
import javascriptConfig from './eslint.config.javascript.mjs';
import jsdocConfig from './eslint.config.jsdoc.mjs';
import jsxA11yConfig from './eslint.config.jsx-a11y.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import performanceConfig from './eslint.config.performance.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import regexpConfig from './eslint.config.regexp.mjs';
import securityConfig from './eslint.config.security.mjs';
//import storybookConfig from './eslint.config.storybook.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import unicornConfig from './eslint.config.unicorn.mjs';

export default [
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
    // storybookConfig,
    tsConfig,
    unicornConfig,
    jsdocConfig,
];
