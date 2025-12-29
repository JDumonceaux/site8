import { z } from "zod";

/**
 * Image type - represents an image with metadata
 */
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
  readonly src?: string;
  readonly tags?: string[];
  readonly title?: string;
  readonly url?: string;
};

/**
 * Image edit schema for validation
 */
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
  src: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  title: z.string().nullish(),
  url: z.string().nullish(),
});

/**
 * Image edit type
 */
export type ImageEdit = z.infer<typeof ImageEditSchema>;

/**
 * Image add schema for validation - omits id for new images
 */
export const ImageAddSchema = ImageEditSchema.omit({ id: true });

/**
 * Image add type
 */
export type ImageAdd = z.infer<typeof ImageAddSchema>;
