import type { ArtistItems } from './ArtistItems';
import type { Metadata } from './Metadata';

export type ArtistsItems = {
  readonly items: ArtistItems[] | undefined;
  readonly metadata: Metadata;
};
