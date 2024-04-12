import { styled } from 'styled-components';

import useMenu from 'hooks/useMenu';
import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';

export const HomeMenu = (): JSX.Element => {
  const { data } = useMenu();

  return (
    <StyledNav>
      {data?.items?.map((item) => (
        <StyledMenuSection key={item.id}>
          <StyledMenuTitle key={item.id}>{item.name}</StyledMenuTitle>
          {item?.items?.map((x) => (
            <StyledMenuItem key={x.name}>
              <StyledNavLink
                key={x.name}
                to={`/${item.url}/${x.url}`}
                variant="dark">
                {x.name}
              </StyledNavLink>
            </StyledMenuItem>
          ))}
        </StyledMenuSection>
      ))}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  color: var(--palette-text-dark);
  column-count: 4;
  column-width: 200px;
  column-gap: 20px;
  column-rule-width: thin;
`;
const StyledMenuItem = styled.div`
  font-size: 0.8rem;
  padding: 6px 0;
`;
const StyledMenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin-bottom: 6px;
`;
const StyledMenuSection = styled.div`
  margin-bottom: 18px;
  break-inside: avoid;
`;
