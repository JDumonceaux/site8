import type { ArtistWithItems, Metadata } from '@site8/shared';

export type ArtistsItems = {
  readonly items: ArtistWithItems[] | undefined;
  readonly metadata: Metadata;
};
