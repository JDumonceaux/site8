import { styled } from 'styled-components';

import useMenu from 'services/hooks/useMenu';
import CustomNavLink from 'components/common/CustomNavLink/CustomNavLink';
import { LoadingWrapper } from 'components/common/Loading';

type SubjectMenuProps = {
  readonly id?: number;
};

export const SubjectMenu = ({ id }: SubjectMenuProps): JSX.Element => {
  const { data, isLoading, error } = useMenu();

  const filteredData =
    id && id > 0 ? data?.items?.filter((item) => item.id === id) : data?.items;

  return (
    <StyledNav>
      <LoadingWrapper error={error} isLoading={isLoading}>
        {filteredData?.map((item) => (
          <StyledMenuSection key={item.id}>
            <StyledMenuTitle>{item.name}</StyledMenuTitle>
            {item?.items?.map((x) => (
              <CustomNavLink key={x.name} to={`/${item.url}/${x.id}/${x.url}`}>
                {x.name}
              </CustomNavLink>
            ))}
          </StyledMenuSection>
        ))}
      </LoadingWrapper>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  color: var(--palette-text);
  background-color: var(--palette-background);
`;
const StyledMenuSection = styled.div`
  break-inside: avoid;
  a {
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
