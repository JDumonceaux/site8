import { z } from "zod";

/**
 * Image type - represents an image with metadata
 */
export type Image = {
  readonly id: number;
  readonly name?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly url?: string;
  readonly tags?: string;
  readonly description?: string;
  readonly width?: number;
  readonly height?: number;
  readonly size?: number;
};

/**
 * Image edit schema for validation
 */
const urlPattern = /^https?:\/\/.+/i;

export const ImageEditSchema = z.object({
  id: z.number(),
  name: z
    .string({ message: "Name must be a string" })
    .trim()
    .max(100, "Name max length exceeded: 100")
    .optional(),
  fileName: z
    .string({ message: "File name must be a string" })
    .trim()
    .max(255, "File name max length exceeded: 255")
    .optional(),
  folder: z
    .string({ message: "Folder must be a string" })
    .trim()
    .max(255, "Folder max length exceeded: 255")
    .optional(),
  url: z
    .string({ message: "URL must be a string" })
    .trim()
    .max(500, "URL max length exceeded: 500")
    .optional()
    .refine((v) => !v || urlPattern.test(v), {
      message: "Must be a valid URL",
    }),
  tags: z
    .string({ message: "Tags must be a string" })
    .trim()
    .max(500, "Tags max length exceeded: 500")
    .optional(),
  description: z
    .string({ message: "Description must be a string" })
    .trim()
    .max(2000, "Description max length exceeded: 2000")
    .optional(),
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
