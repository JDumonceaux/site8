import baseConfig from './eslint.config.base.mjs';
import importConfig from './eslint.config.import.mjs';
import jestConfig from './eslint.config.jest.mjs';
import jsxA11yConfig from './eslint.config.jsx-a11y.mjs';
import perfectionistConfig from './eslint.config.perfectionist.mjs';
import promiseConfig from './eslint.config.promise.mjs';
import reactConfig from './eslint.config.react.mjs';
import reactEffectConfig from './eslint.config.react-effect.mjs';
import storybookConfig from './eslint.config.storybook.mjs';
import tsConfig from './eslint.config.typescript.mjs';
import unicornConfig from './eslint.config.unicorn.mjs';

export default [
    baseConfig,
    importConfig,
    jestConfig,
    jsxA11yConfig,
    perfectionistConfig,
    promiseConfig,
    reactConfig,
    reactEffectConfig,
    storybookConfig,
    tsConfig,
    unicornConfig,
];
