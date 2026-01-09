import { z } from "zod";
import { ArtistSchema } from "./Artist.js";
import { ItemSchema } from "./Item.js";

/**
 * ItemsFile schema for validation
 * Used for file-based item storage
 */
export const ItemsFileSchema = z.object({
  artists: z.array(ArtistSchema).default([]),
  items: z.array(ItemSchema).default([]),
});

export type ItemsFile = z.infer<typeof ItemsFileSchema>;
