import AppInitializer from 'components/common/AppInitializer/AppInitializer';
import Snackbar from 'components/ui/Snackbar/Snackbar';
import StyledAvatar from 'components/ui/SytledAvatar/StyledAvatar';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
const Header = lazy(() => import('components/ui/Header/Header'));

export const MainLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppInitializer />
    <Header
      avatar={
        <StyledAvatar alt="Avatar" id="avatar" src="/avatar.jpg">
          JD
        </StyledAvatar>
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

export default MainLayout;

const LayoutDiv = styled.div`
  max-width: 1920px;
  margin-inline: auto;
  min-height: 100vh;
  margin-top: 50px;
  color: var(--palette-text);
  background-color: var(--palette-background);
`;