import { Bookmark } from './Bookmark';
import { Metadata } from './Metadata';

export type Bookmarks = {
  readonly metadata: Metadata;
  readonly items: Bookmark[];
};
