import type { Page } from "./Page.js";

/**
 * PageMenu type
 * Page with flexible type field
 */
export type PageMenu = {
  readonly type: "page" | "root" | "menu";
} & Omit<Page, "type">;
