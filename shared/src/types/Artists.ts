import type { Artist } from "./Artist.js";
import type { Collection } from "./Collection.js";

/**
 * Artists collection type
 * Wraps Artist items in a Collection structure
 */
export type Artists = Collection<Artist>;
