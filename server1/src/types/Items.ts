import type { Item } from '@site8/shared';
import type { ItemArtist } from '@site8/shared';
import type { Metadata } from '@site8/shared';

/**
 * Server-specific Items type
 * Extended collection with both items and artists
 */
export type Items = {
  readonly artists: ItemArtist[];
  readonly items: Item[];
  readonly metadata: Metadata;
};
