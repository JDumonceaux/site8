import type { Page } from "./Pages.js";

/**
 * PageMenu type
 * Page with flexible type field
 */
export type PageMenu = {
  readonly type: "menu" | "page" | "root";
} & Omit<Page, "type">;
