import type { BookmarksTag } from './BookmarksTag.js';
import type { Metadata } from './Metadata.js';

export type BookmarksTags = {
  readonly items?: BookmarksTag[];
  readonly metadata: Metadata;
};
