import type { Bookmark } from "./Bookmark.js";
import type { RequiredCollection } from "./Collection.js";

/**
 * Bookmarks collection type
 * Wraps Bookmark items in a RequiredCollection structure
 */
export type Bookmarks = RequiredCollection<Bookmark>;
