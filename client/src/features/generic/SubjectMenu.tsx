import type { JSX } from 'react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useMenu from '@features/menu/useMenu';
import { getURLPath } from '@lib/utils/helpers';
import type { MenuItem } from '@site8/shared';
import ItemRender from './ItemRender';
import styled from 'styled-components';

type SubjectMenuProps = {
  readonly ref?: React.Ref<HTMLElement>;
};

const SubjectMenu = ({ ref }: SubjectMenuProps): JSX.Element => {
  const { findMenuItem, getRootMenuItems, isError, isLoading } = useMenu();
  const { pathname } = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const [pn1] = getURLPath(pathname) ?? [];

  const currentItem = pn1 ? findMenuItem(pn1) : undefined;
  const rootItems = getRootMenuItems();

  // Auto-expand the current item if it exists
  React.useEffect(() => {
    if (currentItem && currentItem.items && currentItem.items.length > 0) {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        newSet.add(currentItem.id);
        return newSet;
      });
    }
  }, [currentItem]);

  const toggleExpanded = (itemId: number): void => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Render menu items recursively
  const renderMenuItems = (
    items?: Iterable<MenuItem>,
    level = 1,
  ): JSX.Element[] => {
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
          onToggle={() => toggleExpanded(item.id)}
        >
          {hasChildren && isExpanded
            ? renderMenuItems(item.items, level + 1)
            : null}
        </ItemRender>
      );
    });
  };

  return (
    <StyledNav ref={ref}>
      <StyledContent>
        <LoadingWrapper
          isError={isError}
          isLoading={isLoading}
        >
          {currentItem ? (
            <ItemRender
              item={currentItem}
              level={0}
              isExpanded={expandedItems.has(currentItem.id)}
              hasChildren={
                currentItem.items !== undefined && currentItem.items.length > 0
              }
              onToggle={() => toggleExpanded(currentItem.id)}
            >
              {currentItem.items && expandedItems.has(currentItem.id)
                ? renderMenuItems(currentItem.items, 1)
                : null}
            </ItemRender>
          ) : (
            <>{renderMenuItems(rootItems, 0)}</>
          )}
        </LoadingWrapper>
      </StyledContent>
    </StyledNav>
  );
};

SubjectMenu.displayName = 'SubjectMenu';
export default SubjectMenu;

const StyledNav = styled.nav`
  color: var(--navbar-text);
  background: var(--navbar-dark-primary);
  height: calc(100dvh - 2vh);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;

const StyledContent = styled.div`
  margin: 16px 0;
  padding: 16px 0;
  position: relative;
  flex: 1;
  width: var(--navbar-width);
  background: var(--navbar-dark-primary);
  box-shadow: 0 0 0 16px var(--navbar-dark-primary);
  overflow-x: hidden;
  transition: width 0.2s;
`;
