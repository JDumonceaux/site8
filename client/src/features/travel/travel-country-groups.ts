import type { Place, Places } from '@site8/shared';

import { hasValue } from './travel-filter-core';

export const groupPlacesByCountry = (
  filteredData: Places | undefined,
  country?: string,
): Record<string, Place[]> | null => {
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
  groupedByCountry: Record<string, Place[]> | null,
  metadata: Places['metadata'] | undefined,
):
  | {
      countryName: string;
      data: Places;
    }[]
  | null => {
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
