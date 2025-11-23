import { z } from 'zod';

export const PhotoSetSchema = z
  .object({
    /** Unique identifier for the photo set */
    id: z.number(),
    /** Name of the photo set */
    name: z.string(),
  })
  .strict()
  .readonly();

export type PhotoSet = z.infer<typeof PhotoSetSchema>;
