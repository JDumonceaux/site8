import type { Place, Places } from '@site8/shared';
import { hasValue } from './travel-filter-core';

export const groupPlacesByCountry = (
  filteredData: Places | undefined,
  country?: string,
): null | Record<string, Place[]> => {
  if (hasValue(country) || filteredData?.items == null) {
    return null;
  }

  return filteredData.items.reduce<Record<string, Place[]>>(
    (accumulator, place) => {
      const countryName = place.country ?? 'Unknown';
      accumulator[countryName] ??= [];
      accumulator[countryName].push(place);
      return accumulator;
    },
    {},
  );
};

export const toSortedCountryGroups = (
  groupedByCountry: null | Record<string, Place[]>,
  metadata: Places['metadata'] | undefined,
):
  | null
  | {
      countryName: string;
      data: Places;
    }[] => {
  if (groupedByCountry == null) {
    return null;
  }

  return Object.entries(groupedByCountry)
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([countryName, places]) => ({
      countryName,
      data: {
        items: places,
        metadata: metadata ?? { title: '' },
      },
    }));
};
