import type { ArtistWithItems } from "./ArtistWithItems.js";
import type { Metadata } from "./Metadata.js";

/**
 * ArtistsItems type
 * Collection of artists with their items
 */
export type ArtistsItems = {
  readonly items: ArtistWithItems[] | undefined;
  readonly metadata: Metadata;
};
