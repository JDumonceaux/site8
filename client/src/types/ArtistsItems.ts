import type { ArtistWithItems } from './ArtistWithItems';
import type { Metadata } from './Metadata';

export type ArtistsItems = {
  readonly items: ArtistWithItems[] | undefined;
  readonly metadata: Metadata;
};
