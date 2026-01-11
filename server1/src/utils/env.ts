import * as v from 'valibot';

const envSchema = v.object({
  BASE_URL: v.optional(v.pipe(v.string(), v.url()), 'http://localhost:3005'),
  NODE_ENV: v.optional(
    v.picklist(['development', 'production', 'test']),
    'development',
  ),
  PORT: v.optional(
    v.pipe(
      v.unknown(),
      v.transform(Number),
      v.number(),
      v.integer(),
      v.minValue(1),
    ),
    3005,
  ),
  USE_AUTH: v.pipe(
    v.optional(v.string(), 'false'),
    v.transform((value) => value === 'true'),
  ),
});

export type Env = v.InferOutput<typeof envSchema>;

const parseEnv = (): Env => {
  return v.parse(envSchema, {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    USE_AUTH: process.env.USE_AUTH,
  });
};

export const env: Env = parseEnv();
