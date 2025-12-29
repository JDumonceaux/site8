import type { Collection } from "./Collection.js";
import type { Image, ImageEdit } from "./Image.js";

/**
 * Images collection type
 */
export type Images = Collection<Image>;

/**
 * ImagesEdit collection type
 * For editing multiple images
 */
export type ImagesEdit = Collection<ImageEdit>;
