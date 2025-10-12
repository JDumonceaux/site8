import fs from 'node:fs/promises';
import path from 'node:path';
import js from '@eslint/js';

async function main() {
    const file = path.resolve(process.cwd(), 'eslint.config.javascript.mjs');
    const src = await fs.readFile(file, 'utf8');
    const recKeys = Object.keys(js.configs.recommended.rules);
    const explicit = new Set();
    for (const key of recKeys) {
        const pattern = new RegExp(`['\"]${key}['\"]\s*:`);
        if (pattern.test(src)) {
            explicit.add(key);
        }
    }
    console.log(JSON.stringify({ count: explicit.size, keys: Array.from(explicit).sort() }, null, 2));
}

main().catch(err => { console.error(err); process.exit(1); });
