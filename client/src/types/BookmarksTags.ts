import type { BookmarksTag } from './BookmarksTag';
import type { Metadata } from './Metadata';

export type BookmarksTags = {
  readonly items?: BookmarksTag[];
  readonly metadata: Metadata;
};
