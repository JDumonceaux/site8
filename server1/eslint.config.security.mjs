import pluginNoSecrets from 'eslint-plugin-no-secrets';
// eslint.config.security.mjs
import pluginSecurity from 'eslint-plugin-security';

const config = {
    name: 'Site8-security',
    plugins: {
        'no-secrets': pluginNoSecrets,
        security: pluginSecurity,
    },
    rules: {
        ...pluginSecurity.configs.recommended.rules,
        'no-secrets/no-secrets': 'error',
        'security/detect-buffer-noassert': 'error',
        'security/detect-child-process': 'warn', // Server may need this
        'security/detect-disable-mustache-escape': 'error',
        'security/detect-eval-with-expression': 'error',
        'security/detect-new-buffer': 'error',
        'security/detect-no-csrf-before-method-override': 'error',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-object-injection': 'off', // Disabled - too many false positives with TypeScript
        'security/detect-pseudoRandomBytes': 'error',
        'security/detect-unsafe-regex': 'error',
    },
};

export default config;
