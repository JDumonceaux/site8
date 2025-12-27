/**
 * Place type - represents a geographical location
 */
export type Place = {
  readonly city?: string;
  readonly country?: string;
  readonly description?: string;
  readonly id: number;
  readonly lat?: number;
  readonly lon?: number;
  readonly name: string;
  readonly region?: string;
  readonly state?: string;
  readonly tags?: string[];
  readonly type?: string;
  readonly visited?: boolean;
};
