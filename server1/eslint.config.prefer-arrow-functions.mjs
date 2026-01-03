// eslint.config.prefer-arrow-functions.mjs
import pluginArrow from 'eslint-plugin-prefer-arrow-functions';

export default [
    {
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
    },
    // Disable for server middleware/config where callbacks are framework requirements
    {
        files: ['src/server.ts', 'src/app.ts'],
        name: 'Site8-prefer-arrow-functions-server-override',
        rules: {
            'prefer-arrow-functions/prefer-arrow-functions': 'off',
        },
    },
];
