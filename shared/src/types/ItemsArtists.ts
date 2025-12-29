import type { ItemArtist } from "./ItemArtist.js";
import type { Metadata } from "./Metadata.js";

/**
 * ItemsArtists type
 * Collection of items with artist details
 */
export type ItemsArtists = {
  readonly items: ItemArtist[] | undefined;
  readonly metadata: Metadata;
};
