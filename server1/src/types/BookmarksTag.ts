import type { Bookmark } from './Bookmark.js';

export type BookmarksTag = {
  readonly items: Bookmark[];
  readonly tag: string;
};
