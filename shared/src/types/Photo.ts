/**
 * Photo type - represents a photo with metadata
 */
export type Photo = {
  readonly description?: string;
  readonly fileName?: string;
  readonly id: number;
  readonly location?: string;
  readonly name?: string;
  readonly photo_date?: string;
  readonly set?: number[];
  readonly tags?: string[];
};
