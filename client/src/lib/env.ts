import * as v from 'valibot';

/**
 * Environment variables schema with validation and transformation.
 */
const envSchema = v.object({
  BASE_URL: v.pipe(v.string(), v.url()),
  PORT: v.pipe(v.unknown(), v.transform(Number), v.number(), v.integer()),
  USE_AUTH: v.pipe(
    v.unknown(),
    v.transform((val) => String(val).toLowerCase() === 'true'),
    v.boolean(),
  ),
});

/**
 * Parsed environment variables.
 */
export const env = v.parse(envSchema, {
  BASE_URL: String(import.meta.env.VITE_BASE_URL),
  // BASE_URL is sourced from Vite environment variables defined in a `.env` file or through system environment variables.
  PORT:
    import.meta.env.VITE_PORT != null &&
    !Number.isNaN(Number(import.meta.env.VITE_PORT))
      ? Number(import.meta.env.VITE_PORT)
      : 3000,
  USE_AUTH: String(import.meta.env.VITE_USE_AUTH ?? 'false'),
});
