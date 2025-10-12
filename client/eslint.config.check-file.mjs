// eslint.config.check-file.mjs
import pluginCheckFile from 'eslint-plugin-check-file';

const checkFileConfig = {
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
                '**/*.{json}': 'FLAT_CASE',
                '**/*.{jsx}': 'PASCAL_CASE',
                '**/*.{js,mjs}': 'CAMEL_CASE',
                '**/*.{ts,tsx}': 'PASCAL_CASE',
                '**/*.{md}': 'SCREAMING_SNAKE_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
    },
};

export default checkFileConfig;
