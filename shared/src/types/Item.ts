import * as v from "valibot";

/**
 * Item Schema for validation
 * Represents an art/music item with comprehensive metadata
 */
export const ItemSchema = v.object({
  artist: v.optional(v.string()),
  artisticPeriod: v.optional(v.string()),
  artistId: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "Artist ID must be a positive integer")
  ),
  description: v.optional(v.string()),
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "Item ID must be a positive integer")
  ),
  lineId: v.optional(v.pipe(v.number(), v.integer())),
  location: v.optional(v.string()),
  officialWebAddress: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  title: v.pipe(v.string(), v.minLength(1, "Item title is required")),
  year: v.optional(v.string()),
  yearDisplay: v.optional(v.string()),
});

export type Item = v.InferOutput<typeof ItemSchema>;
