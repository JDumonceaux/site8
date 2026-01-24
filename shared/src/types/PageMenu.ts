import type { Page } from "./Pages.js";

/**
 * PageMenu type
 * Page with flexible type field
 */
export type PageMenu = {
  readonly type: "page" | "root" | "menu";
} & Omit<Page, "type">;
