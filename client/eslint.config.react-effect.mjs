// eslint.config.react-effect.mjs
import pluginYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';

const config = {
    name: 'Site8-react-effect',
    plugins: {
        'react-you-might-not-need-an-effect': pluginYouMightNotNeedAnEffect,
    },
    rules: {
        // Spread the plugin's recommended rules and add project-specific overrides if needed
        ...pluginYouMightNotNeedAnEffect.configs.recommended.rules,
    },
};

export default config;
