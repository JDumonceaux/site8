import pluginSonarjs from 'eslint-plugin-sonarjs';

const config = {
  name: 'Site8-sonarjs',
  plugins: {
    sonarjs: pluginSonarjs,
  },
  rules: {
    'sonarjs/cognitive-complexity': ['warn', 20],
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-collapsible-if': 'warn',
    'sonarjs/no-collection-size-mischeck': 'error',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-duplicated-branches': 'error',
    'sonarjs/no-gratuitous-expressions': 'warn',
    'sonarjs/no-identical-conditions': 'error',
    'sonarjs/no-identical-expressions': 'error',
    'sonarjs/no-identical-functions': ['warn', 4],
    'sonarjs/no-nested-switch': 'warn',
    'sonarjs/no-redundant-jump': 'error',
  },
};

export default config;