import { Menu } from "./Menu.js";
import { Metadata } from "./Metadata.js";

export type Pages = {
  readonly metadata: Metadata;
  readonly items?: Menu[];
};
