import type { Bookmark } from './Bookmark';
import type { Metadata } from './Metadata';

export type Bookmarks = {
  readonly items: Bookmark[];
  readonly metadata: Metadata;
};
