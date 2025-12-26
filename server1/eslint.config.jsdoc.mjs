// eslint.config.jsdoc.mjs
import pluginJsdoc from 'eslint-plugin-jsdoc';

export default {
    name: 'Site8-jsdoc',
    plugins: {
        jsdoc: pluginJsdoc,
    },
    rules: {
        'jsdoc/check-alignment': 'warn',
        'jsdoc/check-indentation': 'warn',
        'jsdoc/check-syntax': 'error',
        'jsdoc/check-tag-names': 'warn',
        'jsdoc/check-types': 'warn',
        'jsdoc/no-undefined-types': 'off',
        'jsdoc/require-description': 'warn',
        'jsdoc/require-jsdoc': [
            'warn',
            {
                require: {
                    FunctionDeclaration: true,
                    ClassDeclaration: true,
                    MethodDefinition: false,
                },
            },
        ],
        'jsdoc/require-param': 'warn',
        'jsdoc/require-param-description': 'warn',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns': 'warn',
        'jsdoc/require-returns-description': 'warn',
        'jsdoc/require-returns-type': 'off',
    },
};
