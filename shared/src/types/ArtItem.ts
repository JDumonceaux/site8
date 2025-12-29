/**
 * Art Item type
 * Represents an art-related item with metadata
 */
export type ArtItem = {
  readonly description?: string;
  readonly display?: string;
  readonly id: number;
  readonly name?: string;
  readonly section?: string;
  readonly tags?: string[];
  readonly url: string;
};
