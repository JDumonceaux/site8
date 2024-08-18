import { Bookmark } from './Bookmark';
import { Metadata } from './Metadata';

export type Bookmarks = {
  readonly items: Bookmark[];
  readonly metadata: Metadata;
};
