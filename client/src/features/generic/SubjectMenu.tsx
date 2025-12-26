import type { JSX } from 'react';
import { useLocation } from 'react-router-dom';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import useMenu from '@features/menu/useMenu';
import { getURLPath } from '@lib/utils/helpers';
import type { MenuItem } from '../../types/MenuItem';
import ItemRender from './ItemRender';
import styled from 'styled-components';

type SubjectMenuProps = {
  readonly ref?: React.Ref<HTMLElement>;
};

const SubjectMenu = ({ ref }: SubjectMenuProps): JSX.Element => {
  const { findMenuItem, getRootMenuItems, isError, isLoading } = useMenu();
  const { pathname } = useLocation();

  const [pn1] = getURLPath(pathname) ?? [];
  const currentItem = pn1 ? findMenuItem(pn1) : undefined;
  const rootItems = getRootMenuItems();

  // Render menu items recursively
  const renderMenuItems = (
    items?: Iterable<MenuItem>,
    level = 1,
  ): JSX.Element[] => {
    if (!items) return [];

    return Array.from(items).map((item) => (
      <ItemRender
        key={item.id}
        item={item}
        level={level}
      >
        {item.items ? renderMenuItems(item.items, level + 1) : null}
      </ItemRender>
    ));
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
            >
              {currentItem.items ? renderMenuItems(currentItem.items, 1) : null}
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
  margin: -16px 0;
  padding: 16px 0;
  position: relative;
  flex: 1;
  width: var(--navbar-width);
  background: var(--navbar-dark-primary);
  box-shadow: 0 0 0 16px var(--navbar-dark-primary);
  overflow-x: hidden;
  transition: width 0.2s;
`;
