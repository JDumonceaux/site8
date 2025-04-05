import { z } from 'zod';

export const ImageSchema = z.object({
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  itemId: z.number(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
});

export const ImageEditSchema = z.object({
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  itemId: z.number(),
  originalFolder: z.string().trim().optional(),
  isNewItem: z.boolean().optional(),
});

export const ImageSchemaAdd = ImageSchema.omit({ id: true });

export type Image = z.infer<typeof ImageSchema>;

export type ImageAdd = Omit<Image, 'id'>;

export type ImageEdit = z.infer<typeof ImageEditSchema>;
