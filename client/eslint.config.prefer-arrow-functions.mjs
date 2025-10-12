// eslint.config.prefer-arrow-functions.mjs
import pluginArrow from 'eslint-plugin-prefer-arrow-functions';

const preferArrowConfig = {
    name: 'Site8-prefer-arrow-functions',
    plugins: {
        'prefer-arrow-functions': pluginArrow,
    },
    rules: {
        // Prefer arrow functions: consistent style; allow flexibility via options
        'prefer-arrow-functions/prefer-arrow-functions': [
            'warn',
            {
                allowNamedFunctions: false,
                classPropertiesAllowed: false,
                disallowPrototype: false,
                returnStyle: 'unchanged',
                singleReturnOnly: false,
            },
        ],
    },
};

export default preferArrowConfig;
