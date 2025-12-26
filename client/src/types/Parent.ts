import { z } from 'zod';

export const ParentSchema = z
  .object({
    /** Unique identifier */
    id: z.number(),
    /** Sequence number */
    seq: z.number(),
    /** Sort by field */
    sortby: z.string().optional(),
  })
  .strict()
  .readonly();

export type Parent = z.infer<typeof ParentSchema>;
