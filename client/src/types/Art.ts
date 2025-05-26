// ArtSchema.ts
import { z } from 'zod';
import { ArtItemSchema } from './ArtItem';
import { MetadataSchema } from './Metadata';

/**
 * Zod schema for an Art collection,
 * with built-in defaults, strict key enforcement, and deep readonly.
 */
export const ArtSchema = z
  .object({
    items: z.array(ArtItemSchema).default([]),
    metadata: MetadataSchema.default({
      title: '',
      description: '',
    }),
  })
  .strict() // reject any unexpected keys
  .readonly(); // deeply immutable

export type Art = z.infer<typeof ArtSchema>;

/** A zero-state default for Art */
export const ArtDefault: Art = ArtSchema.parse({});
