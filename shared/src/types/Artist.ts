import * as v from "valibot";

/**
 * Artist schema for validation
 */
export const ArtistSchema = v.object({
  born: v.nullish(v.string()),
  died: v.nullish(v.string()),
  fullName: v.nullish(v.string()),
  id: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(1, "Artist ID must be a positive integer")
  ),
  name: v.pipe(v.string(), v.minLength(1, "Artist name is required")),
  sortName: v.nullish(v.string()),
});

/**
 * Artist type - represents an artist/creator
 */
export type Artist = v.InferOutput<typeof ArtistSchema>;
