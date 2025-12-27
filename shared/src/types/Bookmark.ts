/**
 * Bookmark type - represents a saved URL with metadata
 */
export type Bookmark = {
  readonly description?: string;
  readonly id: number;
  readonly name: string;
  readonly page?: number[];
  readonly rank?: number;
  readonly set?: number[];
  readonly tags?: string[];
  readonly url: string;
};
