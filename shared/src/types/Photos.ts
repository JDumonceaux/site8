import type { Metadata } from "./Metadata.js";
import type { Photo } from "./Photo.js";

/**
 * Photos type
 * Extended collection with photo sets
 */
export type Photos = {
  readonly items: Photo[];
  readonly metadata: Metadata;
};
