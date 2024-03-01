export interface Photo {
  readonly id: number;
  readonly url: string;
  readonly name?: string;
  readonly description?: string;
  readonly channel?: string;
  readonly albums?: number[];
  readonly tags?: string[];
}
