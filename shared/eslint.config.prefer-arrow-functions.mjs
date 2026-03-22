import pluginArrow from 'eslint-plugin-prefer-arrow-functions';

const config = {
    name: 'Site8-prefer-arrow-functions',
    plugins: {
        'prefer-arrow-functions': pluginArrow,
    },
    rules: {
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

export default config;