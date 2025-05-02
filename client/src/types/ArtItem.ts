import { z } from 'zod';

export const ArtItemSchema = z.object({
  description: z.string().optional().readonly(),
  display: z.string().optional().readonly(),
  id: z.number().readonly(),
  name: z.string().optional().readonly(),
  section: z.string().optional().readonly(),
  tags: z.string().array().optional().readonly(),
  url: z.string().readonly(),
});

export type ArtItem = z.infer<typeof ArtItemSchema>;
