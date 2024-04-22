import useMenu from 'hooks/useMenu';

import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';
import { getURLPath } from 'utils/helpers';
import { useEffect } from 'react';
import { LoadingWrapper } from 'components';

const SubjectMenu = (): JSX.Element => {
  const { getLevel3, getRemaining, fetchData, isLoading, error } = useMenu();
  const location = useLocation();
  const { pathname } = location;
  const tempPathName1 = getURLPath(pathname, 1);
  const tempPathName2 = getURLPath(pathname, 2);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { menu1, menu2, menu3 } = getLevel3(tempPathName1, tempPathName2);

  const additionalMenus = getRemaining(menu1?.id, menu2?.id);

  return (
    <StyledNav>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {menu2 ? (
            <StyledMenuSection key={menu2.id}>
              <StyledMenuTitle
                key={menu2.name}
                to={`/${menu1?.url}/${menu2.url}`}>
                {menu2.name}
              </StyledMenuTitle>
              {menu3 ? (
                menu3?.map((x) => (
                  <StyledMenuItem
                    key={x.name}
                    to={`/${menu1?.url}/${menu2?.url}/${x.url}`}>
                    {x.name}
                  </StyledMenuItem>
                ))
              ) : (
                <StyledNoItem>No Items found</StyledNoItem>
              )}
            </StyledMenuSection>
          ) : null}
        </LoadingWrapper>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {additionalMenus?.map((item) => (
            <StyledMenuTitle key={item.name} to={`/${menu1?.url}/${item.url}`}>
              {item.name}
            </StyledMenuTitle>
          ))}
        </LoadingWrapper>
      </StyledContent>
      {/* <StyledFooter>FOOTER</StyledFooter> */}
    </StyledNav>
  );
};

export default SubjectMenu;

const StyledMenuSection = styled.div`
  color: var(--navbar-text);
  break-inside: avoid;
}`;
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
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledMenuTitle = styled(StyledMenuLink)`
  padding: 12px;
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledNoItem = styled.div`
  color: var(--navbar-text);
  font-size: 0.8rem;
  padding: 6px 12px 6px 24px;
`;
const StyledMenuItem = styled(StyledMenuLink)`
  font-size: 0.8rem;
  padding: 6px 12px 6px 24px;
  &.active {
    background: var(--navbar-dark-3);
  }
`;
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
// const StyledHeader = styled.div`
//   position: relative;
//   opacity: 0;
//   pointer-events: none;
//   left: 16px;
//   width: calc(var(--navbar-width) - 16px);
//   min-height: 80px;
//   background: var(--navbar-dark-primary);
//   border-radius: 16px;
//   z-index: 2;
//   display: flex;
//   align-items: center;
//   transition:
//     opacity 0.1s,
//     width 0.2s;
// `;
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
// const StyledFooter = styled.div`
//   position: relative;
//   width: var(--navbar-width);
//   height: 54px;
//   background: var(--navbar-dark-secondary);
//   border-radius: 16px;
//   display: flex;
//   flex-direction: column;
//   z-index: 2;
//   transition:
//     width 0.2s,
//     height 0.2s;
// `;
