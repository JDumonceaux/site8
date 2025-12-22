import { z } from 'zod';
import { MetadataSchema } from './Metadata';
import { PhotoSchema } from './Photo';
import { PhotoSetSchema } from './PhotoSet';

export const PhotosSchema = z
  .object({
    /** Array of Photo objects */
    items: z.array(PhotoSchema),
    /** Metadata object */
    metadata: MetadataSchema,
    /** Array of PhotoSet objects */
    sets: z.array(PhotoSetSchema),
  })
  .strict()
  .readonly();

export type Photos = z.infer<typeof PhotosSchema>;
