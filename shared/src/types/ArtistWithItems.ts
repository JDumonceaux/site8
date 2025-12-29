import type { Artist } from "./Artist.js";
import type { Item } from "./Item.js";

/**
 * ArtistWithItems type
 * Represents an artist with their associated items
 */
export type ArtistWithItems = {
  readonly artist: Artist;
  readonly items: Item[];
};
