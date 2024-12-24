import type { ArtistItems } from './ArtistItems.js';
import type { Metadata } from './Metadata.js';

export type ArtistsItems = {
  readonly items: ArtistItems[] | undefined;
  readonly metadata: Metadata;
};
