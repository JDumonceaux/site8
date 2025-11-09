// eslint.config.check-file.mjs
import pluginCheckFile from 'eslint-plugin-check-file';

export default {
    name: 'Site8-check-file',
    plugins: {
        'check-file': pluginCheckFile,
    },
    rules: {
        // Filename conventions by extension
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.config.{mjs}': 'FLAT_CASE',
                '**/*.{html}': 'FLAT_CASE',
                '**/*.{js,mjs}': 'CAMEL_CASE',
                '**/*.{json}': 'FLAT_CASE',
                '**/*.{jsx}': 'PASCAL_CASE',
                '**/*.{md}': 'SCREAMING_SNAKE_CASE',
                // '**/*.{ts,tsx}': 'PASCAL_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
    },
};
