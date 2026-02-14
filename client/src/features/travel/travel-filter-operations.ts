import type { Places } from '@site8/shared';

import { byCity, byCountry, byItem, hasValue } from './travel-filter-core';

const DEFAULT_TITLE = 'Travel Destinations';

export const filterPlaces = (
  data: Places | undefined,
  params: { city?: string; country?: string; item?: string },
): Places | undefined => {
  if (data?.items == null) {
    return data;
  }

  const items = data.items
    .filter(byCountry(params.country))
    .filter(byCity(params.city))
    .filter(byItem(params.item));

  return { ...data, items };
};

export const getTravelPageTitle = (
  filteredData: Places | undefined,
  params: { city?: string; country?: string; item?: string },
): string => {
  const firstItem = filteredData?.items?.[0];

  if (!firstItem) {
    return DEFAULT_TITLE;
  }

  if (hasValue(params.item)) {
    return firstItem.name;
  }

  if (hasValue(params.city)) {
    return `${firstItem.city}, ${firstItem.country}`;
  }

  if (hasValue(params.country)) {
    return firstItem.country ?? DEFAULT_TITLE;
  }

  return DEFAULT_TITLE;
};
