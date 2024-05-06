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

  console.log('menuxxxxx', menu);

  //const additionalMenus = getRemaining(menu1?.id, menu2?.id);

  const renderItem = useCallback(
    (item: MenuEntry | undefined): JSX.Element | null => {
      if (!item) {
        return null;
      }

      const menuItem = () => {
        if (item.type === 'menu') {
          if (item.level === 1) {
            return (
              <StyledMenuTitle key={item.id} to={item.url || ''}>
                {item.name}
              </StyledMenuTitle>
            );
          } else {
            return (
              <StyledMenuTitle1 key={item.id} to={item.url || ''}>
                {item.name}
              </StyledMenuTitle1>
            );
          }
        }
        if (item.type === 'page') {
          if (item.level === 1) {
            return (
              <StyledMenuLink key={item.id} to={item.url || ''}>
                {item.name}
              </StyledMenuLink>
            );
          } else {
            return (
              <StyledMenuLink1 key={item.id} to={item.url || ''}>
                {item.name}
              </StyledMenuLink1>
            );
          }
        }
        return undefined;
      };
      return (
        <>
          {menuItem()}
          {item.items?.map((x) => renderItem(x))}
        </>
      );
    },
    [],
  );

  return (
    <StyledNav>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {menu ? renderItem(menu) : null}
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
  padding-left: 30px;
`;
const StyledMenuTitle = styled(StyledMenuLink)`
  padding: 12px;
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledMenuTitle1 = styled(StyledMenuTitle)`
  padding-left: 18px;
`;
