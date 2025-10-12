import js from '@eslint/js';
import util from 'node:util';

async function main() {
    const rec = js.configs.recommended.rules;
    const cfg = (await import(new URL('../eslint.config.javascript.mjs', import.meta.url))).default;
    const dup = [];
    const shadowed = [];
    for (const [k, v] of Object.entries(cfg.rules || {})) {
        if (Object.prototype.hasOwnProperty.call(rec, k)) {
            if (util.isDeepStrictEqual(v, rec[k])) {
                dup.push(k);
            } else {
                shadowed.push({ rule: k, current: v, recommended: rec[k] });
            }
        }
    }
    console.log(JSON.stringify({ count: dup.length, dup, shadowedCount: shadowed.length }, null, 2));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
