import { z } from 'zod';

/**
 * Zod schema for Metadata, enforcing required title and description fields.
 */
export const MetadataSchema = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .strict()
  .readonly();

export type Metadata = z.infer<typeof MetadataSchema>;

export const MetadataDefault: Metadata = MetadataSchema.parse({});
