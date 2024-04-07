import useMenu from 'hooks/useMenu';
import { LoadingWrapper } from 'components/common/Loading';
import { useLocation } from 'react-router-dom';
import { Menu } from 'services/types';
import { styled } from 'styled-components';
import StyledNavLink from 'components/common/StyledNavLink/StyledNavLink';

const SubjectMenu = (): JSX.Element => {
  const { data, isLoading, error } = useMenu();
  const location = useLocation();
  const { pathname } = location;
  const tempPathName =
    pathname.split('/').length > 1 ? pathname.split('/')[1] : undefined;

  const menus = data?.items;

  const filteredData: Menu | undefined = menus
    ? tempPathName
      ? menus.find((x) => x.url === tempPathName)
      : menus[0]
    : undefined;

  const filtereMenus: Menu[] | undefined = menus
    ? tempPathName
      ? menus.filter((x) => x.id !== filteredData?.id)
      : menus
    : undefined;

  return (
    <StyledNav>
      <StyledHeader>CODEPEN</StyledHeader>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {filteredData ? (
            <StyledMenuSection key={filteredData.id}>
              <StyledMenuTitle
                key={filteredData.name}
                to={`/${filteredData.url}`}>
                {filteredData.name}
              </StyledMenuTitle>
              {filteredData?.items?.map((x) => (
                <StyledMenuItem
                  key={x.name}
                  to={`/${filteredData.url}/${x.url}`}>
                  {x.name}
                </StyledMenuItem>
              ))}
            </StyledMenuSection>
          ) : null}
        </LoadingWrapper>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {filtereMenus?.map((item) => (
            <StyledMenuTitle key={item.name} to={`/${item.url}`}>
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
  height: calc(100% - 2vw);
  // border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`;
const StyledHeader = styled.div`
  position: relative;
  opacity: 0;
  pointer-events: none;
  left: 16px;
  width: calc(var(--navbar-width) - 16px);
  min-height: 80px;
  background: var(--navbar-dark-primary);
  border-radius: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  transition:
    opacity 0.1s,
    width 0.2s;
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
