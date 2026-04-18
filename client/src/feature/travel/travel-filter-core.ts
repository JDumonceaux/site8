import type { Place } from '@site8/shared';

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[^\s\w-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');
};

export const hasValue = (value?: string): value is string => {
  return value != null && value !== '';
};

export const byCountry =
  (country?: string) =>
  (place: Place): boolean => {
    return !hasValue(country) || slugify(place.country ?? '') === country;
  };

export const byCity =
  (city?: string) =>
  (place: Place): boolean => {
    return !hasValue(city) || slugify(place.city ?? '') === city;
  };

export const byItem =
  (item?: string) =>
  (place: Place): boolean => {
    return !hasValue(item) || slugify(place.name) === item;
  };
