import { z } from 'zod';

export const ArtistSchema = z.object({
  born: z.string().nullish(),
  died: z.string().nullish(),
  fullName: z.string().nullish(),
  id: z.number().int().positive('Artist ID must be a positive integer'),
  name: z.string().min(1, 'Artist name is required'),
  sortName: z.string().nullish(),
});

export type Artist = z.infer<typeof ArtistSchema>;
