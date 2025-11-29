import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import useMenu from '@features/menu/useMenu';
import styled from 'styled-components';

const HomeMenu = (): JSX.Element => {
  const { data, error, isLoading } = useMenu();

  let tempTo = '';
  return (
    <StyledNav>
      <LoadingWrapper
        error={error}
        isLoading={isLoading}
      >
        {data?.items?.map((x) => {
          switch (x.type) {
            case 'menu': {
              tempTo = x.to ? `${tempTo}/${x.to}` : tempTo;
              return <StyledMenuDiv key={x.id}>{x.name}</StyledMenuDiv>;
            }
            case 'page': {
              return (
                <StyledPageDiv
                  key={x.id}
                  to={`${tempTo}/${x.to}`}
                >
                  {x.name}
                </StyledPageDiv>
              );
            }
            case 'root': {
              tempTo = x.to ?? '';
              return <StyledRootDiv key={x.id}>{x.name}</StyledRootDiv>;
            }
            default: {
              return null;
            }
          }
        })}
      </LoadingWrapper>
    </StyledNav>
  );
};

HomeMenu.displayName = 'HomeMenu';

export default HomeMenu;

const StyledNav = styled.nav`
  color: var(--palette-text-dark);
`;
const StyledRootDiv = styled.div`
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 12px 12px 6px 12px;
  background-color: var(--navbar-light-secondary);
  break-inside: avoid;
`;
const StyledPageDiv = styled(NavLink)`
  font-weight: 500;
  font-size: 1rem;
  padding: 6px 12px 6px 36px;
  background-color: var(--navbar-light-primary);
  break-inside: avoid;
  border-bottom: 1px solid var(--navbar-light-secondary);
  display: block;
`;
const StyledMenuDiv = styled.div`
  font-weight: 500;
  font-size: 1rem;
  padding: 12px 12px 6px 18px;
  background-color: var(--navbar-light-primary);
  break-inside: avoid;
  border-bottom: 1px solid var(--navbar-light-secondary);
`;
