export type Bookmark = {
  readonly id: number;
  readonly url: string;
  readonly name: string;
  readonly description?: string;
  readonly tags?: string[];
  readonly rank?: number;
  readonly page?: number[];
};
