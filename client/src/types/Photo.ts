import { z } from 'zod';

export const PhotoSchema = z
  .object({
    /** Array of album IDs */
    albums: z.array(z.number()).optional(),
    /** Channel name */
    channel: z.string().optional(),
    /** Photo description */
    description: z.string().optional(),
    /** Unique identifier */
    id: z.number(),
    /** Photo name */
    name: z.string().optional(),
    /** Tags associated with the photo */
    tags: z.array(z.string()).optional(),
    /** URL of the photo */
    url: z.string(),
  })
  .strict()
  .readonly();

export type Photo = z.infer<typeof PhotoSchema>;
