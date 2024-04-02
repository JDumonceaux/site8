import { BookmarksTag } from './BookmarksTag.js';
import { Metadata } from './Metadata.js';

export type BookmarksTags = {
  readonly metadata: Metadata;
  readonly items?: BookmarksTag[];
};
