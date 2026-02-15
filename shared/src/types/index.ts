/**
 * Core types module
 * Exports all shared type definitions
 */

export type { Collection, RequiredCollection } from "./Collection.js";
export type { Image, Images } from "./Images.js";
export type { Metadata } from "./Metadata.js";
export type { MenuItem } from "./MenuItem.js";
export type { Menus } from "./Menus.js";
export type { Page, Parent } from "./Pages.js";
export type { PageMenu } from "./PageMenu.js";
export type { Pages } from "./Pages.js";
export type { Place, PlaceImage, PlaceUrl } from "./Places.js";
export type { Places } from "./Places.js";
export type {
  TestGroup,
  TestSection,
  TestCode,
  Tests,
  Test,
  TestsSectionGroup,
  TestsSection,
} from "./Tests.js";

// Re-export schemas
export { PageSchema, ParentSchema } from "./Pages.js";
