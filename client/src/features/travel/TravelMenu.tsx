import { type JSX, useCallback, useMemo, useTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ItemRender from '@features/generic/ItemRender';
import type { MenuItem } from '@site8/shared';
import TravelMenuSkeleton from './TravelMenuSkeleton';
import useMenuExpansion from './useMenuExpansion';
import useTravelMenu from './useTravelMenu';
import styled from 'styled-components';

type TravelMenuProps = {
  readonly onPlaceSelect?: (placeId: number) => void;
  readonly ref?: React.Ref<HTMLElement>;
};

const TravelMenu = ({ onPlaceSelect, ref }: TravelMenuProps): JSX.Element => {
  const navigate = useNavigate();
  const { city, country, item } = useParams<{
    city?: string;
    country?: string;
    item?: string;
  }>();
  const { getRootMenuItems: rootItems, isError, isLoading } = useTravelMenu();
  const { expandedItems, setExpandedItems } = useMenuExpansion({
    city,
    country,
    item,
    rootItems,
  });
  const [, startNavigationTransition] = useTransition();

  const handleItemClick = useCallback(
    (menuItem: MenuItem): void => {
      // Navigate to the item's URL if it exists
      if (menuItem.to != null || menuItem.url != null) {
        const url = menuItem.to ?? menuItem.url ?? '';
        // Mark navigation as non-urgent to keep UI responsive
        startNavigationTransition(() => {
          void navigate(url);
        });
      }

      // If item has no children, it's a place (leaf node)
      // Call onPlaceSelect with the original place ID (stored in lineId)
      if (
        menuItem.lineId != null &&
        menuItem.lineId !== 0 &&
        onPlaceSelect != null
      ) {
        onPlaceSelect(menuItem.lineId);
      }
    },
    [navigate, onPlaceSelect, startNavigationTransition],
  );

  const handleToggle = useCallback(
    (menuItem: MenuItem): void => {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(menuItem.id)) {
          newSet.delete(menuItem.id);
        } else {
          newSet.add(menuItem.id);
        }
        return newSet;
      });
      handleItemClick(menuItem);
    },
    [handleItemClick, setExpandedItems],
  );

  // Render menu items recursively - memoized to prevent unnecessary re-renders
  const renderMenuItems = useMemo(() => {
    const render = (items?: Iterable<MenuItem>, level = 1): JSX.Element[] => {
      if (items == null) return [];

      return Array.from(items).map((menuItem) => {
        const isExpanded = expandedItems.has(menuItem.id);
        const hasChildren = menuItem.items != null && menuItem.items.length > 0;

        return (
          <ItemRender
            hasChildren={hasChildren}
            isExpanded={isExpanded}
            item={menuItem}
            key={menuItem.id}
            level={level}
            onToggle={handleToggle}
          >
            {hasChildren && isExpanded
              ? render(menuItem.items, level + 1)
              : null}
          </ItemRender>
        );
      });
    };

    return render(rootItems, 0);
  }, [expandedItems, handleToggle, rootItems]);

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
