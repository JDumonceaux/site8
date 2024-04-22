import { styled } from 'styled-components';

import useMenu from 'hooks/useMenu';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';

export const HomeMenu = (): JSX.Element => {
  const { data, getLevel, getLevel2 } = useMenu();

  return (
    <StyledNav>
      {data?.level1?.map((x) => (
        <StyledSection key={x.id}>
          <StyledSectionTitle>{x.name}</StyledSectionTitle>
          <StyledGrid>
            {getLevel(x.id)?.map((y) => (
              <StyledMenuSection key={y.id}>
                <StyledMenuTitle key={y.id}>{y.name}</StyledMenuTitle>
                {getLevel2(y.id)?.map((z) => (
                  <StyledMenuItem key={z.name}>
                    <StyledNavLink
                      key={z.name}
                      to={`/${x.url}/${y.url}/${z.url}`}
                      variant="dark">
                      {z.name}
                    </StyledNavLink>
                  </StyledMenuItem>
                ))}
              </StyledMenuSection>
            ))}
          </StyledGrid>
        </StyledSection>
      ))}
    </StyledNav>
  );
};

const StyledGrid = styled.div`
  column-count: 6;
  column-width: 150px;
  column-gap: 20px;
  column-rule-width: thin;
`;
const StyledNav = styled.nav`
  color: var(--palette-text-dark);
`;
const StyledMenuItem = styled.div`
  font-size: 0.8rem;
  padding: 3px 12px;
`;
const StyledMenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 6px;
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
const StyledMenuSection = styled.div`
  margin-bottom: 18px;
  break-inside: avoid;
`;
