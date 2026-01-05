import { useEffect, useState, useTransition } from 'react';

import type { MenuItem } from '@site8/shared';

type UseMenuExpansionResult = {
  expandedItems: Set<number>;
  isExpansionPending: boolean;
  setExpandedItems: React.Dispatch<React.SetStateAction<Set<number>>>;
};

type UseMenuExpansionParams = {
  city?: string;
  country?: string;
  item?: string;
  rootItems?: Iterable<MenuItem>;
};

/**
 * Custom hook to manage menu expansion state based on URL parameters.
 * Automatically finds and expands menu items matching the current route.
 */
const useMenuExpansion = ({
  city,
  country,
  item,
  rootItems,
}: UseMenuExpansionParams): UseMenuExpansionResult => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [isExpansionPending, startExpansionTransition] = useTransition();

  useEffect(() => {
    if (rootItems == null) return;

    const itemsToExpand = new Set<number>();
    const items = Array.from(rootItems);

    // Search for items matching the current URL parameters
    if (
      (country != null && country !== '') ||
      (city != null && city !== '') ||
      (item != null && item !== '')
    ) {
      findItemsByUrlPath(
        items,
        itemsToExpand,
        [country, city, item].filter(
          (s): s is string => s != null && s.trim() !== '',
        ),
      );
    }

    // Update expanded items if we found matches or clear if no URL params
    startExpansionTransition(() => {
      if (itemsToExpand.size > 0) {
        setExpandedItems(itemsToExpand);
      } else if (
        (country == null || country === '') &&
        (city == null || city === '') &&
        (item == null || item === '')
      ) {
        setExpandedItems(new Set());
      }
    });
  }, [country, city, item, rootItems]);

  return { expandedItems, isExpansionPending, setExpandedItems };
};

/**
 * Helper function to find menu items by matching URL path segments.
 * Recursively searches through menu items and expands matching items.
 *
 * @param items - Menu items to search through
 * @param itemsToExpand - Set to collect IDs of items that should be expanded
 * @param pathSegments - URL segments to match (e.g., ['france', 'paris', 'eiffel-tower'])
 * @param currentDepth - Current depth in the menu hierarchy (0 = country, 1 = city, 2 = place)
 */
const findItemsByUrlPath = (
  items: MenuItem[],
  itemsToExpand: Set<number>,
  pathSegments: string[],
  currentDepth = 0,
): void => {
  // Check if we've exhausted the path segments
  if (currentDepth >= pathSegments.length) return;

  // eslint-disable-next-line security/detect-object-injection -- `currentDepth` is a number and is controlled internally.
  const targetSegment = pathSegments[currentDepth];

  for (const menuItem of items) {
    if (menuItem.url == null || menuItem.url.trim() === '') continue;

    // Extract the slug at the current depth from the URL
    // URL format: /travel/country/city/place
    const urlParts = menuItem.url.split('/').filter(Boolean);
    const itemSlug = urlParts[currentDepth + 1]; // +1 to skip 'travel' prefix

    if (itemSlug === targetSegment) {
      itemsToExpand.add(menuItem.id);

      // If we have more segments to match, search children
      if (currentDepth < pathSegments.length - 1 && menuItem.items) {
        findItemsByUrlPath(
          menuItem.items,
          itemsToExpand,
          pathSegments,
          currentDepth + 1,
        );
      }
      break; // Found a match at this level, no need to check other items
    }
  }
};

export default useMenuExpansion;
