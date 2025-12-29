import type { Bookmark } from "./Bookmark.js";

/**
 * BookmarksTag type
 * Represents bookmarks grouped by a specific tag
 */
export type BookmarksTag = {
  readonly items: Bookmark[];
  readonly tag: string;
};
