import { LoadingWrapper } from 'components';
import useMenu from 'hooks/useMenu';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { getURLPath } from 'utils/helpers';
import { ItemRender } from './ItemRender';

const SubjectMenu = memo((): JSX.Element => {
  const { getMenu, getOtherMenus, fetchData, isLoading, error } = useMenu();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { pathname } = useLocation();
  const [pn1, pn2] = getURLPath(pathname) || [];
  const data = getMenu(pn1, pn2);
  const data2 = getOtherMenus(data?.id);

  return (
    <StyledNav>
      <StyledContent>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <ItemRender item={data} level={0}>
            {data?.items?.map((x) => (
              <ItemRender item={x} key={x.id} level={1} />
            ))}
          </ItemRender>
        </LoadingWrapper>
        <br />
        <br />

        <LoadingWrapper error={error} isLoading={isLoading}>
          <ItemRender item={data} level={0}>
            {data2?.map((x) => <ItemRender item={x} key={x.id} level={1} />)}
          </ItemRender>
        </LoadingWrapper>
      </StyledContent>
    </StyledNav>
  );
});

SubjectMenu.displayName = 'SubjectMenu';

export default SubjectMenu;

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