import javascriptConfig from './eslint.config.javascript.mjs';
import importConfig from './eslint.config.import.mjs';
import jestConfig from './eslint.config.jest.mjs';
import jsxA11yConfig from './eslint.config.jsx-a11y.mjs';
import checkFileConfig from './eslint.config.check-file.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import reactConfig from './eslint.config.react.mjs';
import reactEffectConfig from './eslint.config.react-effect.mjs';
//import storybookConfig from './eslint.config.storybook.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import unicornConfig from './eslint.config.unicorn.mjs';
import preferArrowConfig from './eslint.config.prefer-arrow-functions.mjs';
import reactQueryConfig from './eslint.config.react-query.mjs';

export default [
    javascriptConfig,
    checkFileConfig,
    importConfig,
    preferArrowConfig,
    reactQueryConfig,
    jestConfig,
    jsxA11yConfig,
    perfectionistConfig,
    promiseConfig,
    reactConfig,
    reactEffectConfig,
    // storybookConfig,
    tsConfig,
    unicornConfig,
];
