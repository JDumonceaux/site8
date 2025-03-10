import React, { useCallback, memo } from 'react';

import StyledNavLink from 'components/Link/StyledNavLink/StyledNavLink';
import useMenu from 'hooks/useMenu';
import { styled } from 'styled-components';
import type { MenuItem } from 'types/MenuItem';

const HomeMenu = memo((): React.JSX.Element => {
  const { data } = useMenu();

  const renderWrapper = useCallback(
    (
      itemType: 'menu' | 'page' | 'root',
      id: number,
      toComplete: string,
      level: number,
      children: React.ReactNode,
    ): null | React.JSX.Element => {
      if (itemType === 'menu') {
        return (
          <StyledMenuTitle $level={level} key={id} to={`/${toComplete}`}>
            {children}
          </StyledMenuTitle>
        );
      }
      if (itemType === 'page') {
        return (
          <StyledMenuLink $level={level} key={id} to={`/${toComplete}`}>
            {children}
          </StyledMenuLink>
        );
      }
      return null;
    },
    [],
  );

  const renderItem = useCallback(
    (item: MenuItem | undefined, level: number): null | React.JSX.Element => {
      if (!item) {
        return null;
      }

      const menuItem = () => {
        return renderWrapper(
          item.type,
          item.id,
          item.toComplete ?? '',
          level,
          item.name,
        );
      };
      return <>{menuItem()}</>;
    },
    [renderWrapper],
  );

  return (
    <StyledNav>
      {data?.items?.map((x) => (
        <StyledSection key={x.id}>
          <StyledSectionTitle>{x.name}</StyledSectionTitle>
          {x.items?.map((item) => (
            <React.Fragment key={item.id}>
              <StyledMenuTitle $level={0} to={`/${item.toComplete}`}>
                {item.name}
              </StyledMenuTitle>
              <StyledGrid>
                {item.items?.map((y) => renderItem(y, 1))}
              </StyledGrid>
            </React.Fragment>
          ))}
        </StyledSection>
      ))}
    </StyledNav>
  );
});

export default memo(HomeMenu);

const StyledGrid = styled.div`
  column-count: 6;
  column-width: 150px;
  column-gap: 20px;
  column-rule-width: thin;
`;
const StyledNav = styled.nav`
  color: var(--palette-text-dark);
`;
const StyledSectionTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  padding-bottom: 6px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--palette-border);
`;
const StyledSection = styled.div`
  margin-bottom: 18px;
  break-inside: avoid;
`;
const StyledMenuLink = styled(StyledNavLink)<{ $level: number }>`
  --left: ${(props) => `${props.$level * 10}px`};
  color: var(--palette-text);
  font-size: 0.8rem;
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--palette-text);
  }
  display: inline-block;
  width: 100%;
  padding-bottom: 6px;
  padding-left: var(--left);
  // &.active {
  //   background: var(--navbar-dark-secondary);
  // }
`;

const StyledMenuTitle = styled(StyledMenuLink)<{ $level: number }>`
  --left: ${(props) => `${props.$level * 10}px`};
  color: var(--palette-text);
  //  padding: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  padding-left: var(--left);
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
