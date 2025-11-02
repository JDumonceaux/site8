import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),
  PORT: z.coerce.number().int().positive().default(3000),
  USE_AUTH: z
    .string()
    .default('false')
    .transform((value) => value === 'true'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  BASE_URL: process.env['BASE_URL'],
  PORT: process.env['PORT'],
  USE_AUTH: process.env['USE_AUTH'],
  NODE_ENV: process.env['NODE_ENV'],
});
