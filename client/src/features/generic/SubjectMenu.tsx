import React from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import useMenu from 'features/menu/useMenu';
import { getURLPath } from 'lib/utils/helpers';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import ItemRender from './ItemRender';

const SubjectMenu = ({ ref, ..._ }: any): JSX.Element => {
  const { getMenu, getOtherMenus, isError, isLoading } = useMenu();
  const { pathname } = useLocation();

  const [pn1, pn2] = getURLPath(pathname) || [];
  const data = getMenu(pn1, pn2);
  const data2 = getOtherMenus(data?.id);

  const mappedItems = data?.items?.map((x) => (
    <ItemRender item={x} key={x.id} level={1} />
  ));

  const mappedData2 = data2?.map((x) => (
    <ItemRender item={x} key={x.id} level={1} />
  ));

  return (
    <StyledNav ref={ref}>
      <StyledContent>
        <LoadingWrapper isError={isError} isLoading={isLoading}>
          <ItemRender item={data} level={0}>
            {mappedItems}
          </ItemRender>
          <br />
          <br />
          <ItemRender item={data} level={0}>
            {mappedData2}
          </ItemRender>
        </LoadingWrapper>
      </StyledContent>
    </StyledNav>
  );
};

SubjectMenu.displayName = 'SubjectMenu';
export default SubjectMenu;

const StyledNav = styled.nav`
  color: var(--navbar-text);
  background: var(--navbar-dark-primary);
  height: calc(100dvh - 2vh);
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
