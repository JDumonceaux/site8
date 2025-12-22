import { z } from 'zod';

export type Image = {
  readonly alt?: string;
  readonly create_date?: string;
  readonly description?: string;
  readonly edit_date?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly id: number;
  readonly location?: string;
  readonly name?: string;
  readonly official_url?: string;
  readonly role?: string;
  readonly tags?: string[];
  readonly url?: string;
};

export const ImageEditSchema = z.object({
  alt: z.string().optional(),
  create_date: z.string().optional(),
  description: z.string().optional(),
  edit_date: z.string().optional(),
  fileName: z.string().optional(),
  folder: z.string().optional(),
  id: z.number(),
  location: z.string().optional(),
  name: z.string().optional(),
  official_url: z.string().optional(),
  role: z.string().optional(),
  tags: z.array(z.string()).optional(),
  url: z.string().optional(),
});

export type ImageEdit = z.infer<typeof ImageEditSchema>;

export const ImageAddSchema = ImageEditSchema.omit({ id: true });

export type ImageAdd = z.infer<typeof ImageAddSchema>;
