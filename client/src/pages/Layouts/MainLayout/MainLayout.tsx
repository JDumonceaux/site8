import { styled } from 'styled-components';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { MainMenu } from 'components/common/MainMenu';
import AppSetup from 'components/common/AppSetup/AppSetup';
import Header from 'components/common/Header';
const Snackbar = lazy(() => import('components/common/Snackbar'));
const Footer = lazy(() => import('components/common/Footer'));

export const MainLayout = (): JSX.Element => (
  <ErrorBoundary fallback="Error">
    <AppSetup />
    <Header />
    <LayoutDiv>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
      <Suspense fallback="Loading ...">
        <Snackbar />
      </Suspense>

      <MainMenu />
      <Suspense fallback="Loading ...">
        <Footer />
      </Suspense>
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
  display: grid;
  grid-template-areas:
    'main-content'
    'left-sidebar'
    'right-sidebar'
    'footer';
  .main-content {
    grid-area: main-content;
    padding: 0 16px;
    margin-bottom: 16px;
  }
  .left-sidebar {
    grid-area: left-sidebar;
  }
  .right-sidebar {
    grid-area: right-sidebar;
    padding: 0 16px;
  }
  .footer {
    grid-area: footer;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'left-sidebar main-content main-content right-sidebar'
      'footer footer  footer  footer';
  }
`;
