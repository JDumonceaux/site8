import pluginCheckFile from 'eslint-plugin-check-file';

export default {
    files: ['**/*.{ts,tsx}'],
    name: 'Site8-check-file',
    plugins: {
        'check-file': pluginCheckFile,
    },
    rules: {
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.{ts,tsx}': 'CAMEL_CASE',
                '**/*.d.ts': 'KEBAB_CASE',
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
