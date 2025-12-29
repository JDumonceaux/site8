import type { BookmarksTag } from "./BookmarksTag.js";
import type { Metadata } from "./Metadata.js";

/**
 * BookmarksTags type
 * Collection of bookmark tags
 */
export type BookmarksTags = {
  readonly items?: BookmarksTag[];
  readonly metadata: Metadata;
};
