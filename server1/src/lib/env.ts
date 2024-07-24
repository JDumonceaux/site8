import * as z from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),
  VITE_PORT: z.number(),
  USE_AUTH: z.string().transform((value) => value === 'true'),
});

export const env = envSchema.parse({
  // BASE_URL: import.meta.env.VITE_BASE_URL,
  // VITE_PORT: import.meta.env.VITE_PORT,
  // USE_AUTH: import.meta.env.VITE_USE_AUTH,
});
