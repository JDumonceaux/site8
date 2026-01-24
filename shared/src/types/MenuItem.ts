import type { Parent } from "./Pages.js";

/**
 * MenuItem type - represents a menu item in navigation
 */
export type MenuItem = {
  readonly icon?: string;
  readonly id: number;
  readonly issue?: string;
  readonly items?: MenuItem[];
  readonly label: string;
  readonly lineId?: number;
  readonly name?: string;
  readonly order?: number;
  readonly parent?: number;
  readonly parentItem?: Parent;
  readonly path?: string;
  readonly title?: string;
  readonly to?: string;
  readonly toComplete?: string;
  readonly type?: "page" | "root" | "menu";
  readonly url?: string;
};
