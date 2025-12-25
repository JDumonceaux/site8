import { z } from 'zod';

import { ArtistSchema } from './Artist.js';
import { ItemSchema } from './Item.js';
import { MetadataSchema } from './Metadata.js';

export const ItemsFileSchema = z.object({
  artists: z.array(ArtistSchema).default([]),
  items: z.array(ItemSchema).default([]),
  metadata: MetadataSchema,
});

export type ItemsFile = z.infer<typeof ItemsFileSchema>;
