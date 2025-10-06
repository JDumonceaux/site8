// eslint.config.react-effect.mjs
import pluginYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';

export default {
    name: 'Site8-react-effect',
    plugins: {
        'react-you-might-not-need-an-effect': pluginYouMightNotNeedAnEffect,
    },
    rules: {
        // ============================================================================
        // React You Might Not Need An Effect
        // ============================================================================
        'react-you-might-not-need-an-effect/no-adjust-state-on-prop-change': 'warn',
        'react-you-might-not-need-an-effect/no-chain-state-updates': 'warn',
        'react-you-might-not-need-an-effect/no-derived-state': 'warn',
        'react-you-might-not-need-an-effect/no-empty-effect': 'warn',
        'react-you-might-not-need-an-effect/no-event-handler': 'warn',
        'react-you-might-not-need-an-effect/no-initialize-state': 'warn',
        'react-you-might-not-need-an-effect/no-manage-parent': 'warn',
        'react-you-might-not-need-an-effect/no-pass-data-to-parent': 'warn',
        'react-you-might-not-need-an-effect/no-pass-live-state-to-parent': 'warn',
        'react-you-might-not-need-an-effect/no-reset-all-state-on-prop-change': 'warn',
        'react-you-might-not-need-an-effect/you-might-not-need-an-effect': 'warn',
    },
};
