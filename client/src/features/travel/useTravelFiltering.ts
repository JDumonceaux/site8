import { useMemo } from 'react';

import type { Place, Places } from '@site8/shared';

/**
 * Slugify helper to match URL parameters to place data
 */
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[^\s\w-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');
};

type UseTravelFilteringParams = {
  readonly city?: string;
  readonly country?: string;
  readonly data?: Places;
  readonly item?: string;
};

type CountryGroup = {
  readonly countryName: string;
  readonly data: Places;
};

type UseTravelFilteringResult = {
  readonly filteredData?: Places;
  readonly pageTitle: string;
  readonly sortedCountryGroups: CountryGroup[] | null;
};

/**
 * Custom hook for filtering and grouping travel data
 * Handles URL parameter-based filtering, country grouping, and page title generation
 */
export const useTravelFiltering = ({
  city,
  country,
  data,
  item,
}: UseTravelFilteringParams): UseTravelFilteringResult => {
  // Filter data based on URL parameters
  const filteredData = useMemo(() => {
    if (data?.items == null) return data;

    let filtered = data.items;

    // Filter by country
    if (country != null && country !== '') {
      filtered = filtered.filter(
        (place) => slugify(place.country ?? '') === country,
      );
    }

    // Filter by city
    if (city != null && city !== '') {
      filtered = filtered.filter((place) => slugify(place.city ?? '') === city);
    }

    // Filter by specific item
    if (item != null && item !== '') {
      filtered = filtered.filter((place) => slugify(place.name) === item);
    }

    return { ...data, items: filtered };
  }, [data, country, city, item]);

  // Determine page title based on URL parameters
  const pageTitle = useMemo((): string => {
    if (item != null && item !== '' && filteredData?.items?.[0] != null) {
      return filteredData.items[0].name;
    }
    if (city != null && city !== '' && filteredData?.items?.[0] != null) {
      return `${filteredData.items[0].city}, ${filteredData.items[0].country}`;
    }
    if (country != null && country !== '' && filteredData?.items?.[0] != null) {
      return filteredData.items[0].country ?? 'Travel Destinations';
    }
    return 'Travel Destinations';
  }, [country, city, item, filteredData]);

  // Group by country when no specific country is selected
  const groupedByCountry = useMemo(() => {
    if (country != null && country !== '') {
      // Country is selected, don't group
      return null;
    }

    if (filteredData?.items == null) {
      return null;
    }

    const grouped = filteredData.items.reduce<Record<string, Place[]>>(
      (accumulator, place) => {
        const countryName = place.country ?? 'Unknown';
        accumulator[countryName] ??= [];
        accumulator[countryName].push(place);
        return accumulator;
      },
      {},
    );

    return grouped;
  }, [country, filteredData]);

  // Create sorted country entries for rendering
  const sortedCountryGroups = useMemo(() => {
    if (groupedByCountry == null) return null;

    return Object.entries(groupedByCountry)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([countryName, places]) => ({
        countryName,
        data: {
          items: places,
          metadata: filteredData?.metadata ?? { title: '' },
        },
      }));
  }, [groupedByCountry, filteredData?.metadata]);

  return {
    filteredData,
    pageTitle,
    sortedCountryGroups,
  };
};
