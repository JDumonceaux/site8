import { z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url().default('http://localhost:3005'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3005),
  USE_AUTH: z
    .string()
    .default('false')
    .transform((value) => value === 'true'),
});

export type Env = z.infer<typeof envSchema>;

const parseEnv = (): Env => {
  return envSchema.parse({
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    USE_AUTH: process.env.USE_AUTH,
  });
};

export const env: Env = parseEnv();
