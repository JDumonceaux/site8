import * as v from "valibot";
import { ArtistSchema } from "./Artist.js";
import { ItemSchema } from "./Item.js";
import { MetadataSchema } from "./Metadata.js";

/**
 * ItemsFile schema for validation
 * Used for file-based item storage
 */
export const ItemsFileSchema = v.object({
  artists: v.optional(v.array(ArtistSchema), []),
  items: v.optional(v.array(ItemSchema), []),
  metadata: MetadataSchema,
});

export type ItemsFile = v.InferOutput<typeof ItemsFileSchema>;
