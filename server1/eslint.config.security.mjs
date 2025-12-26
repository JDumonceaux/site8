// eslint.config.security.mjs
import pluginSecurity from 'eslint-plugin-security';
import pluginNoSecrets from 'eslint-plugin-no-secrets';

export default {
    name: 'Site8-security',
    plugins: {
        security: pluginSecurity,
        'no-secrets': pluginNoSecrets,
    },
    rules: {
        ...pluginSecurity.configs.recommended.rules,
        'no-secrets/no-secrets': 'error',
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-unsafe-regex': 'error',
        'security/detect-buffer-noassert': 'error',
        'security/detect-child-process': 'warn', // Server may need this
        'security/detect-disable-mustache-escape': 'error',
        'security/detect-eval-with-expression': 'error',
        'security/detect-new-buffer': 'error',
        'security/detect-no-csrf-before-method-override': 'error',
        'security/detect-pseudoRandomBytes': 'error',
    },
};
