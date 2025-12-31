import type { MenuItem } from '@site8/shared';
import type { Place, Places } from '@site8/shared';

import { Logger } from '../../utils/logger.js';
import { TravelService } from './TravelService.js';

/**
 * ID generation constants for hierarchical menu structure
 */
const ID_MULTIPLIER = {
  COUNTRY_TO_CITY: 1000,
  CITY_TO_PLACE: 1000,
} as const;

/**
 * Service for building a recursive menu structure from places data
 * Hierarchy: Country > City > Place Name
 */
export class PlacesMenuService {
  private readonly travelService: TravelService;

  public constructor(travelService: TravelService) {
    this.travelService = travelService;
  }

  /**
   * Convert a string to URL-friendly slug (lowercase, hyphens)
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  }

  /**
   * Builds a recursive menu structure grouped by Country > City > Name
   * @returns Array of MenuItem representing countries with nested cities and places
   */
  public async getPlacesMenu(): Promise<MenuItem[] | undefined> {
    Logger.info('PlacesMenuService: getPlacesMenu called');

    try {
      const data: Places | undefined = await this.travelService.getAllItems();

      if (!data?.items || data.items.length === 0) {
        Logger.warn('PlacesMenuService: No places data available');
        return undefined;
      }

      return this.buildRecursiveMenu(data.items);
    } catch (error) {
      Logger.error(
        `PlacesMenuService: getPlacesMenu -> Error: ${String(error)}`,
      );
      return undefined;
    }
  }

  /**
   * Builds the recursive menu structure by grouping places by country and city
   */
  private buildRecursiveMenu(places: readonly Place[]): MenuItem[] {
    // Group places by country
    const countriesMap = new Map<string, Place[]>();

    for (const place of places) {
      if (!place.country) continue;

      const countryPlaces = countriesMap.get(place.country) || [];
      countryPlaces.push(place);
      countriesMap.set(place.country, countryPlaces);
    }

    // Build country-level menu items
    const countryMenuItems: MenuItem[] = [];
    let countryId = 1;

    for (const [country, countryPlaces] of Array.from(
      countriesMap.entries(),
    ).sort(([a], [b]) => a.localeCompare(b))) {
      const countrySlug = this.slugify(country);
      const countryUrl = `/travel/${countrySlug}`;
      const countryItem: MenuItem = {
        id: countryId,
        label: country,
        title: country,
        type: 'menu',
        to: countryUrl,
        url: countryUrl,
        items: this.buildCityMenuItems(countryPlaces, countryId, countrySlug),
      };

      countryMenuItems.push(countryItem);
      countryId++;
    }

    return countryMenuItems;
  }

  /**
   * Builds city-level menu items for a given country
   */
  private buildCityMenuItems(
    places: Place[],
    countryId: number,
    countrySlug: string,
  ): MenuItem[] {
    // Group places by city
    const citiesMap = new Map<string, Place[]>();

    for (const place of places) {
      const city = place.city || 'Unknown';
      const cityPlaces = citiesMap.get(city) || [];
      cityPlaces.push(place);
      citiesMap.set(city, cityPlaces);
    }

    // Build city-level menu items
    const cityMenuItems: MenuItem[] = [];
    let cityIdOffset = 1;

    for (const [city, cityPlaces] of Array.from(citiesMap.entries()).sort(
      ([a], [b]) => a.localeCompare(b),
    )) {
      const cityId = countryId * ID_MULTIPLIER.COUNTRY_TO_CITY + cityIdOffset;
      const citySlug = this.slugify(city);
      const cityUrl = `/travel/${countrySlug}/${citySlug}`;

      const cityItem: MenuItem = {
        id: cityId,
        label: city,
        title: city,
        type: 'menu',
        to: cityUrl,
        url: cityUrl,
        parentItem: { id: countryId, seq: cityIdOffset },
        items: this.buildPlaceMenuItems(
          cityPlaces,
          cityId,
          countrySlug,
          citySlug,
        ),
      };

      cityMenuItems.push(cityItem);
      cityIdOffset++;
    }

    return cityMenuItems;
  }

  /**
   * Builds place-level menu items (leaf nodes)
   */
  private buildPlaceMenuItems(
    places: Place[],
    cityId: number,
    countrySlug: string,
    citySlug: string,
  ): MenuItem[] {
    return places
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      .map((place, index) => {
        const placeId = cityId * ID_MULTIPLIER.CITY_TO_PLACE + index + 1;
        const placeSlug = this.slugify(place.name);
        const placeUrl = `/travel/${countrySlug}/${citySlug}/${placeSlug}`;

        return {
          id: placeId,
          label: place.name,
          title: place.name,
          type: 'page',
          to: placeUrl,
          url: placeUrl,
          parentItem: { id: cityId, seq: index + 1 },
          // Store the original place ID for reference
          lineId: place.id,
        } satisfies MenuItem;
      });
  }
}
