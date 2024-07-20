import AppInitializer from 'components/common/AppInitializer/AppInitializer';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
const Header = lazy(() => import('components/common/Header/Header'));
const Snackbar = lazy(() => import('components/common/Snackbar/Snackbar'));

export const MainLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
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
  margin-top: 50px;
  color: var(--palette-text);
  background-color: var(--palette-background);
`;
