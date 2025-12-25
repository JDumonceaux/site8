export type Bookmark = {
  readonly description?: string;
  readonly id: number;
  readonly name: string;
  readonly page?: number[];
  readonly rank?: number;
  readonly tags?: string[];
  readonly url: string;
};
