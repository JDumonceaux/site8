import { z } from 'zod';

/**
 * Environment variables schema with validation and transformation.
 */
const envSchema = z.object({
  BASE_URL: z.url(),
  PORT: z.coerce.number().int(), // Coerces string to number and ensures an integer.
  // Converts truthy strings like 'true' (case-insensitive) to a boolean value.
  USE_AUTH: z.preprocess(
    (val) => String(val).toLowerCase() === 'true',
    z.boolean(),
  ),
});

/**
 * Parsed environment variables.
 */
export const env = envSchema.parse({
  BASE_URL: String(import.meta.env.VITE_BASE_URL),
  // BASE_URL is sourced from Vite environment variables defined in a `.env` file or through system environment variables.
  PORT:
    import.meta.env.VITE_PORT != null &&
    !Number.isNaN(Number(import.meta.env.VITE_PORT))
      ? Number(import.meta.env.VITE_PORT)
      : 3000,
  USE_AUTH: String(import.meta.env.VITE_USE_AUTH ?? 'false'),
});
