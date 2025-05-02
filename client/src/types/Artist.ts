import { z } from 'zod';

export const ArtistSchema = z.object({
  birth: z.string().optional().readonly(),
  death: z.string().optional().readonly(),
  fullName: z.string().optional().readonly(),
  id: z.number().readonly(),
  name: z.string().readonly(),
  sortName: z.string().readonly(),
});

export type Artist = z.infer<typeof ArtistSchema>;
