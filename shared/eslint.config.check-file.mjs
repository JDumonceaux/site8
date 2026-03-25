import pluginCheckFile from 'eslint-plugin-check-file';

const config = {
    name: 'Site8-check-file',
    plugins: {
        'check-file': pluginCheckFile,
    },
    rules: {
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.config.{mjs}': 'FLAT_CASE',
                '**/*.{html}': 'FLAT_CASE',
                '**/*.{json}': 'FLAT_CASE',
                '**/*.{jsx}': 'PASCAL_CASE',
                '**/*.{md}': 'SCREAMING_SNAKE_CASE',
            },
            {
                ignoreMiddleExtensions: true,
            },
        ],
        'check-file/folder-naming-convention': [
            'error',
            {
                '**/*': 'KEBAB_CASE',
            },
        ],
    },
};

export default config;