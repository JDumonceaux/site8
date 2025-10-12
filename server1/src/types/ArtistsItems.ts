import type { ArtistWithItems } from './ArtistWithItems.js';
import type { Metadata } from './Metadata.js';

export type ArtistsItems = {
  readonly items: ArtistWithItems[] | undefined;
  readonly metadata: Metadata;
};
