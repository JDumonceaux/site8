import { z } from 'zod';
import { MetadataSchema } from './Metadata';
import { PageSchema } from './PageSchema';

export const PagesSchema = z
  .object({
    /** Optional array of Page objects */
    items: z.array(PageSchema).optional(),
    /** Metadata object */
    metadata: MetadataSchema,
  })
  .strict()
  .readonly();

export type Pages = z.infer<typeof PagesSchema>;
