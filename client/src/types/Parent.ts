import { z } from 'zod';

export const ParentSchema = z
  .object({
    /** Unique identifier */
    id: z.number(),
    /** Sequence number */
    seq: z.number(),
  })
  .strict()
  .readonly();

export type Parent = z.infer<typeof ParentSchema>;
