import { z } from 'zod';
import { MetadataSchema } from './Metadata';
import { TestSchema } from './Test';

export const TestsSchema = z
  .object({
    /** Optional array of Test items */
    items: z.array(TestSchema).optional(),
    /** Metadata object */
    metadata: MetadataSchema,
  })
  .strict()
  .readonly();

export type Tests = z.infer<typeof TestsSchema>;
