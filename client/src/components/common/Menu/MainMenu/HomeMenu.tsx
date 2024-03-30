import { styled } from 'styled-components';

import CustomNavLink from 'components/common/CustomNavLink/CustomNavLink';
import useMenu from 'services/hooks/useMenu';

export const HomeMenu = (): JSX.Element => {
  const { data } = useMenu();

  return (
    <StyledNav>
      <StyledGrid>
        {data?.items?.map((item) => (
          <StyledMenuSection key={item.id}>
            <StyledMenuTitle>{item.name}</StyledMenuTitle>
            {item?.items?.map((x) => (
              <CustomNavLink key={x.name} to={`/${item.url}/${x.url}`}>
                {x.name}
              </CustomNavLink>
            ))}
          </StyledMenuSection>
        ))}
      </StyledGrid>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  color: #fff;
`;
const StyledGrid = styled.div`
  column-count: 4;
  column-gap: 16px;
`;
const StyledMenuSection = styled.div`
  break-inside: avoid;
  margin-bottom: 18px;
  a {
    color: white;
    font-size: 0.8rem;
    display: block;
    display: block;
    text-decoration: none;
    padding: 3px 0px;
  }
  a:hover {
    text-decoration: underline;
  }
`;
const StyledMenuTitle = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding-bottom: 3px;
  margin-bottom: 6px;
`;
