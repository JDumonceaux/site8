import type { Bookmark } from './Bookmark.js';

export type BookmarksTag = {
  readonly tag: string;
  readonly items: Bookmark[];
};
