import { styled } from 'styled-components';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import AppSetup from 'components/common/AppSetup/AppSetup';
import Header from 'components/common/Header';
import { ErrorBoundary } from 'react-error-boundary';

export const MainLayout = (): JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <AppSetup />
    <Header />
    <LayoutDiv>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
      {/* <Suspense fallback="Loading ...">
        <Snackbar />
      </Suspense>

      <MainMenu />
      <Suspense fallback="Loading ...">
        <Footer />
      </Suspense> */}
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
  background-color: #000;
  color: #fff;
`;
