import type { ArtistWithtems } from './ArtistWithtems.js';
import type { Metadata } from './Metadata.js';

export type ArtistsItems = {
  readonly items: ArtistWithtems[] | undefined;
  readonly metadata: Metadata;
};
