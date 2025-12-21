export type PlaceUrl = {
  readonly name?: string;
  readonly type?: string;
  readonly url: string;
};

export type PlaceImage = {
  readonly description?: string;
  readonly fileName?: string;
  readonly folder?: string;
  readonly id: number;
  readonly location?: string;
  readonly name?: string;
  readonly type?: string;
};

export type Place = {
  readonly address?: string;
  readonly city?: string;
  readonly continent?: string;
  readonly country?: string;
  readonly description?: string;
  readonly id: number;
  readonly image_gallery?: number[];
  readonly image_primary?: number;
  readonly images?: PlaceImage[];
  readonly latitude?: number;
  readonly longitude?: number;
  readonly name: string;
  readonly official_url?: string;
  readonly tags?: string[];
  readonly type?: string;
  readonly urls?: PlaceUrl[];
};
