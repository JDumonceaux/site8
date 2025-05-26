// ArtistSchema.ts
import { z } from 'zod';

/**
 * Zod schema for an Artist entity.
 * Enforces required fields, optional date strings, strict shape, and deep immutability.
 */
export const ArtistSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    sortName: z.string(),
    birth: z
      .string()
      .optional()
      .refine((s) => s === undefined || /^\d{4}(-\d{2}(-\d{2})?)?$/.test(s), {
        message:
          'birth must be an ISO date string (YYYY or YYYY-MM or YYYY-MM-DD)',
      }),
    death: z
      .string()
      .optional()
      .refine((s) => s === undefined || /^\d{4}(-\d{2}(-\d{2})?)?$/.test(s), {
        message:
          'death must be an ISO date string (YYYY or YYYY-MM or YYYY-MM-DD)',
      }),
    fullName: z.string().optional(),
  })
  .strict() // Rejects unknown keys
  .readonly(); // Makes all properties deeply immutable

export type Artist = z.infer<typeof ArtistSchema>;
export const ArtistDefault: Artist = ArtistSchema.parse({
  id: 0,
  name: '',
  sortName: '',
  birth: undefined,
  death: undefined,
  fullName: undefined,
});
