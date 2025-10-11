import type { ArtistWithtems } from './ArtistWithtems';
import type { Metadata } from './Metadata';

export type ArtistsItems = {
  readonly items: ArtistWithtems[] | undefined;
  readonly metadata: Metadata;
};
