/**
 * URL reference for a place
 */
export type PlaceUrl = {
  readonly name?: string;
  readonly type?: string;
  readonly url: string;
};

/**
 * PlaceImage type - represents an image reference for a place
 */
export type PlaceImage = {
  readonly description?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly id: number;
  readonly name?: string;
  readonly role?: string;
};

/**
 * Place type - represents a geographical location
 */
export type Place = {
  readonly address?: string;
  readonly city?: string;
  readonly country?: string;
  readonly description?: string;
  readonly id: number;
  readonly images?: PlaceImage[];
  readonly lat?: number;
  readonly lon?: number;
  readonly name: string;
  readonly region?: string;
  readonly state?: string;
  readonly tags?: string[];
  readonly type?: string;
  readonly urls?: PlaceUrl[];
  readonly visited?: boolean;
};
