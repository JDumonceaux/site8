import React, { memo } from 'react';

import useMenu from 'hooks/useMenu';
import { styled } from 'styled-components';

const HomeMenu = memo((): React.JSX.Element => {
  const { data } = useMenu();

  return (
    <StyledNav>
      {data?.items?.map((x) => (
        <StyledSection key={x.id}>
          <StyledSectionTitle>{x.name}</StyledSectionTitle>
        </StyledSection>
      ))}
    </StyledNav>
  );
});

HomeMenu.displayName = 'HomeMenu';

export default HomeMenu;

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
