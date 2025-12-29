import type { Item, ItemArtist, Metadata } from '@site8/shared';

/**
 * Items collection type
 * Collection with both items and artists for display
 */
export type Items = {
  readonly artists: ItemArtist[];
  readonly items: Item[];
  readonly metadata: Metadata;
};
