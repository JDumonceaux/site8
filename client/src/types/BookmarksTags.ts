import { BookmarksTag } from './BookmarksTag';
import { Metadata } from './Metadata';

export type BookmarksTags = {
  readonly items?: BookmarksTag[];
  readonly metadata: Metadata;
};
