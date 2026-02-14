import type { Place } from '@site8/shared';

type PlaceFormValues = {
  address: string;
  city: string;
  country: string;
  description: string;
  lat: string;
  lon: string;
  name: string;
  region: string;
  state: string;
  tags: string;
  type: string;
  visited: boolean;
};

const formatTags = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return '';
  return tags.join(', ');
};

const parseTags = (tagsString: string): string[] | undefined => {
  const trimmed = tagsString.trim();
  if (!trimmed) return undefined;
  return trimmed
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};

const toOptionalNumber = (value: string): number | undefined => {
  return value.trim() ? Number(value) : undefined;
};

const toOptionalString = (value: string): string | undefined => {
  return value.trim() || undefined;
};

export const createPlaceFormValues = (item: null | Place): PlaceFormValues => {
  return {
    address: item?.address ?? '',
    city: item?.city ?? '',
    country: item?.country ?? '',
    description: item?.description ?? '',
    lat: item?.lat?.toString() ?? '',
    lon: item?.lon?.toString() ?? '',
    name: item?.name ?? '',
    region: item?.region ?? '',
    state: item?.state ?? '',
    tags: formatTags(item?.tags),
    type: item?.type ?? '',
    visited: item?.visited ?? false,
  };
};

export const toPlaceFormData = (values: PlaceFormValues) => {
  return {
    address: toOptionalString(values.address),
    city: toOptionalString(values.city),
    country: toOptionalString(values.country),
    description: toOptionalString(values.description),
    lat: toOptionalNumber(values.lat),
    lon: toOptionalNumber(values.lon),
    name: values.name,
    region: toOptionalString(values.region),
    state: toOptionalString(values.state),
    tags: values.tags.trim(),
    type: toOptionalString(values.type),
    visited: values.visited,
  };
};

export const toPlaceToSave = (
  item: null | Place,
  values: PlaceFormValues,
): Place => {
  const base = {
    address: toOptionalString(values.address),
    city: toOptionalString(values.city),
    country: toOptionalString(values.country),
    description: toOptionalString(values.description),
    lat: toOptionalNumber(values.lat),
    lon: toOptionalNumber(values.lon),
    name: values.name,
    region: toOptionalString(values.region),
    state: toOptionalString(values.state),
    tags: parseTags(values.tags),
    type: toOptionalString(values.type),
    visited: values.visited,
  };

  if (item) {
    return {
      ...item,
      ...base,
    };
  }

  return {
    ...base,
    id: 0,
  };
};

export type { PlaceFormValues };
