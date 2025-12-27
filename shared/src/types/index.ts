/**
 * Core types module
 * Exports all shared type definitions
 */

export type { Artist } from "./Artist.js";
export type { Bookmark } from "./Bookmark.js";
export type { Collection, RequiredCollection } from "./Collection.js";
export type { Image, ImageEdit } from "./Image.js";
export type { Metadata } from "./Metadata.js";
export type { MenuItem } from "./MenuItem.js";
export type { Photo } from "./Photo.js";
export type { Place } from "./Place.js";
export type { Test } from "./Test.js";

// Re-export schemas
export { ArtistSchema } from "./Artist.js";
export { ImageEditSchema } from "./Image.js";
export { MetadataSchema } from "./Metadata.js";
