import useMenu from 'hooks/useMenu';

import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';
import { getURLPath } from 'utils/helpers';
import { useCallback, useEffect } from 'react';
import { LoadingWrapper } from 'components';
import { MenuEntry } from 'services/types/MenuEntry';

const SubjectMenu = (): JSX.Element => {
  const { getMenu, fetchData, isLoading, error } = useMenu();
  const location = useLocation();
  const { pathname } = location;
  const tempPathName1 = getURLPath(pathname, 1);
  const tempPathName2 = getURLPath(pathname, 2);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { menu } = getMenu(tempPathName1, tempPathName2);

  const renderWrapper = useCallback(
    (
      itemType: 'menu' | 'page',
      id: number,
      toComplete: string,
      url: string,
      level: number,
      children: React.ReactNode,
    ): JSX.Element | null => {
      console.log('to', toComplete);
      if (itemType === 'menu') {
        const StyledMenuTitleComponent =
          level === 0
            ? StyledMenuTitle
            : level === 1
              ? StyledMenuTitle1
              : StyledMenuTitle2;
        return (
          <StyledMenuTitleComponent key={id} to={`/${toComplete}`}>
            {children}
          </StyledMenuTitleComponent>
        );
      }
      if (itemType === 'page') {
        const StyledMenuLinkComponent =
          level === 0
            ? StyledMenuLink
            : level === 1
              ? StyledMenuLink1
              : StyledMenuLink2;
        return (
          <StyledMenuLinkComponent key={id} to={`/${toComplete}`}>
            {children}
          </StyledMenuLinkComponent>
        );
      }
      return null;
    },
    [],
  );

  const renderItem = useCallback(
    (item: MenuEntry | undefined, level: number): JSX.Element | null => {
      if (!item) {
        return null;
      }

      const menuItem = () => {
        return renderWrapper(
          item.type,
          item.id,
          item.toComplete ?? '',
          item.url ?? '',
          level,
          item.name,
        );
      };
      return (
        <>
          {menuItem()}
          {item.items?.map((x) => renderItem(x, level + 1))}
        </>
      );
    },
    [renderWrapper],
  );

  return (
    <StyledNav>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {menu ? renderItem(menu, 0) : null}
        </LoadingWrapper>
        <br />
        <br />

        <LoadingWrapper error={error} isLoading={isLoading}>
          <div>More</div>
        </LoadingWrapper>
      </StyledContent>
    </StyledNav>
  );
};

export default SubjectMenu;

const StyledNav = styled.nav`
  color: var(--navbar-text);
  background: var(--navbar-dark-primary);
  // position: absolute;
  // left: 1vw;
  // top: 1vw;
  height: calc(100dvh - 2vh);
  // border-radius: 16px;
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
const StyledMenuLink = styled(StyledNavLink)`
  color: var(--navbar-text);
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--navbar-text);
  }
  display: inline-block;
  width: 100%;
  padding: 12px;
  margin-bottom: 4px;
  // &.active {
  //   background: var(--navbar-dark-secondary);
  // }
`;
const StyledMenuLink1 = styled(StyledMenuLink)`
  padding-left: 20px;
`;
const StyledMenuLink2 = styled(StyledMenuLink)`
  padding-left: 30px;
`;
const StyledMenuTitle = styled(StyledMenuLink)`
  padding: 12px;
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledMenuTitle1 = styled(StyledMenuTitle)`
  padding-left: 20px;
`;
const StyledMenuTitle2 = styled(StyledMenuTitle)`
  padding-left: 30px;
`;
