import type { Image } from './Image';

export type PlaceUrl = {
  readonly alt?: string;
  readonly description?: string;
  readonly name?: string;
  readonly role?: string;
  readonly type?: string;
  readonly url: string;
};

export type Place = {
  readonly address?: string;
  readonly city?: string;
  readonly continent?: string;
  readonly country?: string;
  readonly date?: string;
  readonly description?: string;
  readonly id: number;
  readonly images?: Image[];
  readonly latitude?: number;
  readonly longitude?: number;
  readonly name: string;
  readonly parent_id?: number;
  readonly tags?: string[];
  readonly type?: string;
  readonly urls?: PlaceUrl[];
};
