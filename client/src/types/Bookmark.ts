import { z } from 'zod';

export const BookmarkSchema = z.object({
  description: z.string().optional().readonly(),
  id: z.number().readonly(),
  name: z.string().readonly(),
  rank: z.number().optional().readonly(),
  set: z.number().array().optional().readonly(),
  tags: z.string().array().optional().readonly(),
  url: z.string().readonly(),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;
