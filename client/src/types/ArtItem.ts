export type ArtItem = {
  readonly id: number;
  readonly url: string;
  readonly name?: string;
  readonly description?: string;
  readonly section?: string;
  readonly display?: string;
  readonly tags?: string[];
};
