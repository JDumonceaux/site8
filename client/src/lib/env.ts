import * as z from 'zod';

/**
 * Environment variables schema with validation and transformation.
 */
const envSchema = z.object({
  BASE_URL: z.string().url(),
  PORT: z.coerce.number().int(), // Coerces string to number and ensures an integer.
  USE_AUTH: z.preprocess(
    (val) => String(val).toLowerCase() === 'true',
    z.boolean(),
  ),
});

/**
 * Parsed environment variables.
 */
export const env = envSchema.parse({
  BASE_URL: import.meta.env.VITE_BASE_URL,
  PORT: import.meta.env.VITE_PORT,
  USE_AUTH: import.meta.env.VITE_USE_AUTH,
});
