import { mergeConfig } from 'vite';

export default {
  framework: '@storybook/react-vite',
  core: { builder: 'storybook-builder-vite' },
  addons: [
    '@storybook/addon-essentials',
    // other addons
  ],
  async viteFinal(existingConfig) {
    return mergeConfig(existingConfig, {
      // customize Vite options (alias, plugins, define, etc.)
    });
  }
};