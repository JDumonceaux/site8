import { useMemo } from 'react';

import type { Places } from '@site8/shared';

import {
  filterPlaces,
  getTravelPageTitle,
  groupPlacesByCountry,
  toSortedCountryGroups,
} from './travel-filter-predicates';

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
    return filterPlaces(data, { city, country, item });
  }, [data, country, city, item]);

  // Determine page title based on URL parameters
  const pageTitle = useMemo((): string => {
    return getTravelPageTitle(filteredData, { city, country, item });
  }, [country, city, item, filteredData]);

  // Group by country when no specific country is selected
  const groupedByCountry = useMemo(() => {
    return groupPlacesByCountry(filteredData, country);
  }, [country, filteredData]);

  // Create sorted country entries for rendering
  const sortedCountryGroups = useMemo(() => {
    return toSortedCountryGroups(groupedByCountry, filteredData?.metadata);
  }, [groupedByCountry, filteredData?.metadata]);

  return {
    filteredData,
    pageTitle,
    sortedCountryGroups,
  };
};
