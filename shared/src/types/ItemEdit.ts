import * as v from "valibot";

/**
 * ItemEdit schema for validation
 * Used for editing existing items
 */
export const ItemEditSchema = v.object({
  artist: v.optional(v.string()),
  description: v.optional(v.string()),
  fileName: v.pipe(v.string(), v.minLength(1)),
  folder: v.optional(v.string()),
  id: v.pipe(v.number(), v.integer(), v.minValue(1)),
  location: v.optional(v.string()),
  name: v.optional(v.string()),
  official_url: v.optional(
    v.union([v.pipe(v.string(), v.url()), v.literal("")])
  ),
  tags: v.optional(v.array(v.string())),
  year: v.optional(v.string()),
});

export type ItemEdit = v.InferOutput<typeof ItemEditSchema>;
