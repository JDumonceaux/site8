import { styled } from 'styled-components';

import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import AppSetup from 'components/common/AppSetup/AppSetup';
import { ErrorBoundary } from 'react-error-boundary';
const Header = lazy(() => import('components/common/Header/Header'));
const Snackbar = lazy(() => import('components/common/Snackbar/Snackbar'));

export const MainLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppSetup />
    <Header />
    <LayoutDiv>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
      <Snackbar />
    </LayoutDiv>
  </ErrorBoundary>
);

export default MainLayout;

const LayoutDiv = styled.div`
  max-width: 1920px;
  margin-inline: auto;
  min-height: 100vh;
  min-height: 100dvh;
  margin-top: 50px;
  color: var(--palette-text);
  background-color: var(--palette-background);
`;
