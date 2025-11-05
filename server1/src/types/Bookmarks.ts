import type { Bookmark } from './Bookmark.js';
import type { Metadata } from './Metadata.js';

export type Bookmarks = {
  readonly metadata: Metadata;
  readonly items: Bookmark[];
};
