export type Photo = {
  readonly albums?: number[];
  readonly channel?: string;
  readonly description?: string;
  readonly id: number;
  readonly name?: string;
  readonly tags?: string[];
  readonly url: string;
};
