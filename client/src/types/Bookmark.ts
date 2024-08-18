export type Bookmark = {
  readonly description?: string;
  readonly id: number;
  readonly name: string;
  readonly rank?: number;
  readonly set?: number[];
  readonly tags?: string[];
  readonly url: string;
};
