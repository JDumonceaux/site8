// eslint.config.check-file.mjs
import pluginCheckFile from 'eslint-plugin-check-file';

const config = {
    files: ['**/*.{ts}'],
    name: 'Site8-check-file',
    plugins: {
        'check-file': pluginCheckFile,
    },
    rules: {
        'check-file/filename-naming-convention': [
            'warn',
            {
                '**/*.config.{mjs}': 'FLAT_CASE',
                '**/*.{html}': 'FLAT_CASE',
                '**/*.{js,mjs}': 'CAMEL_CASE',
                '**/*.{json}': 'FLAT_CASE',
                '**/*.{jsx}': 'PASCAL_CASE',
                '**/*.{md}': 'SCREAMING_SNAKE_CASE',
                '**/*.{ts,tsx}': 'PASCAL_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        'check-file/folder-naming-convention': [
            'error',
            {
                '**/src/**/': 'CAMEL_CASE',
                '**/src/types/**/': 'CAMEL_CASE',
            },
        ],
    },
};

export default config;
