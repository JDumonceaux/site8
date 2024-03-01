import { Bookmark } from './Bookmark.js';
import { Metadata } from './Metadata.js';

export type Bookmarks = {
  readonly metadata: Metadata;
  readonly items: Bookmark[];
};
