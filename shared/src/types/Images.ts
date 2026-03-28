import * as v from "valibot";

import type { Collection } from "./Collection.js";

export const ImageSchema = v.object({
  alt: v.optional(v.string()),
  description: v.optional(v.string()),
  fileName: v.string(),
  folder: v.string(),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  src: v.optional(v.string()),
  title: v.optional(v.string()),
});

export type Image = v.InferOutput<typeof ImageSchema>;

/**
 * Images type - array of Image objects
 */
export type Images = Collection<Image>;
