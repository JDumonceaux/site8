import { Suspense } from 'react';

import Avatar from 'components/core/Avatar/Avatar';
import Header from 'components/core/Header/Header';
import Snackbar from 'components/core/Snackbar/Snackbar';
import AppInitializer from 'features/app/AppInitializer/AppInitializer';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const GenericLayout = (): React.JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <Header
      avatar={
        <Avatar alt="Avatar" id="avatar" src="/avatar.jpg">
          JD
        </Avatar>
      }
    />
    <LayoutDiv>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
      <Snackbar />
    </LayoutDiv>
  </ErrorBoundary>
);

GenericLayout.displayName = 'GenericLayout';

export default GenericLayout;

const LayoutDiv = styled.div`
  max-width: 1920px;
  margin-inline: auto;
  min-height: 100vh;
  margin-top: 50px;
  color: var(--palette-text);
  background-color: var(--palette-background);
`;
