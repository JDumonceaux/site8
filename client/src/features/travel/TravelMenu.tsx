import { type JSX, useEffectEvent, useMemo, useTransition } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { MenuItem } from '@site8/shared';

import ItemRender from '@features/generic/ItemRender';
import TravelMenuSkeleton from './TravelMenuSkeleton';
import useMenuExpansion from './useMenuExpansion';
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
  const { expandedItems, setExpandedItems } = useMenuExpansion({
    city,
    country,
    item,
    rootItems,
  });
  const [, startNavigationTransition] = useTransition();

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
      // Mark navigation as non-urgent to keep UI responsive
      startNavigationTransition(() => {
        navigate(url);
      });
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
