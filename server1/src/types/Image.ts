import { z } from 'zod';

export const ImageSchema = z.object({
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  itemId: z.number(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
});

export type Image = z.infer<typeof ImageSchema>;
