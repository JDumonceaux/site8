import type { Collection } from "./Collection.js";

export type ImageFile = {
  readonly description?: string;
  readonly fileName: string;
  readonly folder: string;
  readonly id?: number;
  readonly seq?: number;
  readonly src?: string;
  readonly title?: string;
};

/**
 * ImageFiles collection type
 */
export type ImageFiles = Collection<ImageFile>;
