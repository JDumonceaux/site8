/**
 * Music Item type
 * Represents a music-related item with metadata
 * Using the more comprehensive client version as the canonical type
 */
export type MusicItem = {
  readonly channel?: string;
  readonly description?: string;
  readonly display?: string;
  readonly id: number;
  readonly name?: string;
  readonly section?: string;
  readonly tags?: string[];
  readonly url: string;
};
