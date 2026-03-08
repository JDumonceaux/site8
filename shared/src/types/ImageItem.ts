/**
 * Represents a single image item used in image management features.
 * Shared between client and server.
 */
export type ImageItem = {
  readonly currentFolder: string;
  readonly description?: string;
  readonly isMatched: boolean;
  readonly seq: number;
  readonly src: string;
  readonly title: string;
};
