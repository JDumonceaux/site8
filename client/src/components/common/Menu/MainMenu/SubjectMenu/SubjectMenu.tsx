import { styled } from 'styled-components';

import useMenu from 'services/hooks/useMenu';
import { LoadingWrapper } from 'components/common/Loading';
import { NavLink } from 'react-router-dom';

type SubjectMenuProps = {
  readonly id?: number;
};

export const SubjectMenu = ({ id }: SubjectMenuProps): JSX.Element => {
  const { data, isLoading, error } = useMenu();

  const filteredData =
    id && id > 0 ? data?.items?.filter((item) => item.id === id) : data?.items;

  return (
    <StyledNav>
      <StyledHeader>CODEPEN</StyledHeader>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {filteredData?.map((item) => (
            <StyledMenuSection key={item.id}>
              <StyledMenuTitle key={item.name} to={`/${item.url}`}>
                {item.name}
              </StyledMenuTitle>
              {item?.items?.map((x) => (
                <StyledMenuItem key={x.name} to={`/${item.url}/${x.url}`}>
                  {x.name}
                </StyledMenuItem>
              ))}
            </StyledMenuSection>
          ))}
        </LoadingWrapper>
        <LoadingWrapper error={error} isLoading={isLoading}>
          {data?.items?.map((item) => (
            <StyledMenuTitle key={item.name} to={`/${item.url}`}>
              {item.name}
            </StyledMenuTitle>
          ))}
        </LoadingWrapper>
      </StyledContent>
      <StyledFooter>FOOTER</StyledFooter>
    </StyledNav>
  );
};

const StyledMenuSection = styled.div`
  color: var(--navbar-text);
  break-inside: avoid;
}`;
const StyledMenuTitle = styled(NavLink)`
  color: var(--navbar-text);
  display: inline-block;
  width: 100%;
  padding: 12px;
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledMenuItem = styled(NavLink)`
  color: var(--navbar-text);
  font-size: 0.8rem;
  display: inline-block;
  width: 100%;
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
const StyledFooter = styled.div`
  position: relative;
  width: var(--navbar-width);
  height: 54px;
  background: var(--navbar-dark-secondary);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transition:
    width 0.2s,
    height 0.2s;
`;
