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
  alt: z.string().nullish(),
  create_date: z.string().nullish(),
  description: z.string().nullish(),
  edit_date: z.string().nullish(),
  fileName: z.string().nullish(),
  folder: z.string().nullish(),
  id: z.number(),
  location: z.string().nullish(),
  name: z.string().nullish(),
  official_url: z.string().nullish(),
  role: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  url: z.string().nullish(),
});

export type ImageEdit = z.infer<typeof ImageEditSchema>;

export const ImageAddSchema = ImageEditSchema.omit({ id: true });

export type ImageAdd = z.infer<typeof ImageAddSchema>;
