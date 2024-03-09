import { BookmarksTag } from './BookmarksTag';
import { Metadata } from './Metadata';

export type BookmarksTags = {
  readonly metadata: Metadata;
  readonly items?: BookmarksTag[];
};
