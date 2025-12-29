import type { Artist } from "./Artist.js";
import type { Item } from "./Item.js";

/**
 * ItemArtist type - server version
 * Represents an item with artist details combined
 */
export type ItemArtist = {
  readonly artistId: number;
} & Item &
  Omit<Artist, "id">;
