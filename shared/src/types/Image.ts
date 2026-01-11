import * as v from "valibot";

/**
 * Image type - represents an image with metadata
 */
export type Image = {
  readonly id: number;
  readonly name?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly ext_url?: string;
  readonly tags?: string;
  readonly description?: string;
};

/**
 * Image edit schema for validation
 */
const urlPattern = /^https?:\/\/.+/i;

export const ImageEditSchema = v.object({
  id: v.number(),
  name: v.optional(
    v.pipe(
      v.string("Name must be a string"),
      v.trim(),
      v.maxLength(100, "Name max length exceeded: 100")
    )
  ),
  fileName: v.optional(
    v.pipe(
      v.string("File name must be a string"),
      v.trim(),
      v.maxLength(255, "File name max length exceeded: 255")
    )
  ),
  folder: v.optional(
    v.pipe(
      v.string("Folder must be a string"),
      v.trim(),
      v.maxLength(255, "Folder max length exceeded: 255")
    )
  ),
  ext_url: v.optional(
    v.pipe(
      v.string("URL must be a string"),
      v.trim(),
      v.maxLength(500, "URL max length exceeded: 500"),
      v.check((v) => !v || urlPattern.test(v), "Must be a valid URL")
    )
  ),
  description: v.optional(
    v.pipe(
      v.string("Description must be a string"),
      v.trim(),
      v.maxLength(2000, "Description max length exceeded: 2000")
    )
  ),
});

/**
 * Image edit type
 */
export type ImageEdit = v.InferOutput<typeof ImageEditSchema>;

/**
 * Image add schema for validation - omits id for new images
 */
export const ImageAddSchema = v.omit(ImageEditSchema, ["id"]);

/**
 * Image add type
 */
export type ImageAdd = v.InferOutput<typeof ImageAddSchema>;
