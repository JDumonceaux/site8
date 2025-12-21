import { z } from 'zod';

export const ImageSchema = z.object({
  create_date: z.string().optional(),
  description: z.string().trim().optional(),
  edit_date: z.string().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  itemId: z.number(),
  location: z.string().trim().optional(),
  name: z.string().trim().optional(),
  official_url: z.string().trim().optional(),
  src: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const ImageEditSchema = z.object({
  create_date: z.string().optional(),
  description: z.string().trim().optional(),
  edit_date: z.string().optional(),
  fileName: z.string().trim(),
  folder: z.string().trim().optional(),
  id: z.number(),
  isNewItem: z.boolean().optional(),
  itemId: z.number(),
  location: z.string().trim().optional(),
  name: z.string().trim().optional(),
  originalFolder: z.string().trim().optional(),
  tags: z.array(z.string()).optional(),
});

export const ImageSchemaAdd = ImageSchema.omit({ id: true });

export type Image = z.infer<typeof ImageSchema>;

export type ImageAdd = Omit<Image, 'id'>;

export type ImageEdit = z.infer<typeof ImageEditSchema>;
