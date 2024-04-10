import { styled } from 'styled-components';

import useMenu from 'hooks/useMenu';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';

export const HomeMenu = (): JSX.Element => {
  const { data } = useMenu();

  return (
    <StyledNav>
      <StyledGrid>
        {data?.items?.map((item) => (
          <StyledMenuSection key={item.id}>
            <StyledMenuTitle>{item.name}</StyledMenuTitle>
            {item?.items?.map((x) => (
              <StyledNavLink
                key={x.name}
                to={`/${item.url}/${x.url}`}
                variant="dark">
                {x.name}
              </StyledNavLink>
            ))}
          </StyledMenuSection>
        ))}
      </StyledGrid>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  color: var(--palette-text-dark);
  background-color: var(--palette-background);
`;
const StyledGrid = styled.div`
  column-count: 4;
  column-gap: 16px;
`;
const StyledMenuSection = styled.div`
  break-inside: avoid;
  margin-bottom: 18px;
`;
const StyledMenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 3px;
  margin-bottom: 6px;
`;
