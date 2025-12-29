import type { JSX } from 'react';
import React, { useEffect, useEffectEvent, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { MenuItem } from '@site8/shared';

import ItemRender from '@features/generic/ItemRender';
import TravelMenuSkeleton from './TravelMenuSkeleton';
import useTravelMenu from './useTravelMenu';

type TravelMenuProps = {
  readonly onPlaceSelect?: (placeId: number) => void;
  readonly ref?: React.Ref<HTMLElement>;
};

const TravelMenu = ({ onPlaceSelect, ref }: TravelMenuProps): JSX.Element => {
  const navigate = useNavigate();
  const { country, city, item } = useParams<{
    country?: string;
    city?: string;
    item?: string;
  }>();
  const { getRootMenuItems: rootItems, isError, isLoading } = useTravelMenu();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Find and expand menu items based on URL parameters
  useEffect(() => {
    if (!rootItems || rootItems.length === 0) return;

    const itemsToExpand = new Set<number>();

    // Helper function to search for menu items by URL segments
    const findItemsByUrl = (
      items: MenuItem[],
      searchCountry?: string,
      searchCity?: string,
      searchItem?: string,
    ): void => {
      for (const menuItem of items) {
        // Check if this item matches the country
        if (searchCountry && menuItem.url) {
          const urlParts = menuItem.url.split('/').filter(Boolean);
          const itemCountrySlug = urlParts[1]; // /travel/[country]

          if (itemCountrySlug === searchCountry) {
            itemsToExpand.add(menuItem.id);

            // If we have a city to search for, look in children
            if (searchCity && menuItem.items) {
              for (const cityItem of menuItem.items) {
                const cityUrlParts = (cityItem.url || '')
                  .split('/')
                  .filter(Boolean);
                const itemCitySlug = cityUrlParts[2]; // /travel/country/[city]

                if (itemCitySlug === searchCity) {
                  itemsToExpand.add(cityItem.id);

                  // If we have an item to search for, look in city children
                  if (searchItem && cityItem.items) {
                    for (const placeItem of cityItem.items) {
                      const placeUrlParts = (placeItem.url || '')
                        .split('/')
                        .filter(Boolean);
                      const itemPlaceSlug = placeUrlParts[3]; // /travel/country/city/[item]

                      if (itemPlaceSlug === searchItem) {
                        itemsToExpand.add(placeItem.id);
                      }
                    }
                  }
                }
              }
            }
          }
        }

        // Recursively search children
        if (menuItem.items) {
          findItemsByUrl(menuItem.items, searchCountry, searchCity, searchItem);
        }
      }
    };

    // Search for items matching the current URL
    if (country || city || item) {
      findItemsByUrl(Array.from(rootItems), country, city, item);
    }

    // Update expanded items if we found matches or clear if no URL params
    if (itemsToExpand.size > 0) {
      setExpandedItems(itemsToExpand);
    } else if (!country && !city && !item) {
      setExpandedItems(new Set());
    }
  }, [country, city, item, rootItems]);

  const toggleExpanded = useEffectEvent((itemId: number): void => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  });

  const handleItemClick = useEffectEvent((item: MenuItem): void => {
    // Navigate to the item's URL if it exists
    if (item.to || item.url) {
      const url = item.to || item.url || '';
      navigate(url);
    }

    // If item has no children, it's a place (leaf node)
    // Call onPlaceSelect with the original place ID (stored in lineId)
    if (item.lineId && onPlaceSelect) {
      onPlaceSelect(item.lineId);
    }
  });

  // Render menu items recursively - memoized to prevent unnecessary re-renders
  const renderMenuItems = useMemo(() => {
    const render = (items?: Iterable<MenuItem>, level = 1): JSX.Element[] => {
      if (!items) return [];

      return Array.from(items).map((item) => {
        const isExpanded = expandedItems.has(item.id);
        const hasChildren = item.items && item.items.length > 0;

        return (
          <ItemRender
            key={item.id}
            item={item}
            level={level}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
            onToggle={() => {
              toggleExpanded(item.id);
              handleItemClick(item);
            }}
          >
            {hasChildren && isExpanded ? render(item.items, level + 1) : null}
          </ItemRender>
        );
      });
    };

    return render(rootItems, 0);
  }, [expandedItems, rootItems]);

  return (
    <StyledNav ref={ref}>
      <StyledContent>
        {isLoading ? (
          <TravelMenuSkeleton />
        ) : isError ? (
          <StyledError>Failed to load travel menu</StyledError>
        ) : (
          <>
            <StyledTitle>Travel Destinations</StyledTitle>
            {renderMenuItems}
          </>
        )}
      </StyledContent>
    </StyledNav>
  );
};

TravelMenu.displayName = 'TravelMenu';
export default TravelMenu;

const StyledNav = styled.nav`
  color: var(--navbar-text);
  background: var(--navbar-dark-primary);
  height: calc(100dvh - 2vh);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding: 0.5rem;
  color: var(--navbar-text);
`;

const StyledError = styled.div`
  color: var(--error-color, #ff6b6b);
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;
