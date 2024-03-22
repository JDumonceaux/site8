import { styled } from 'styled-components';

import ErrorBoundary from 'components/common/ErrorBoundary';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/common/Header';

export const AuthLayout = (): JSX.Element => (
  <ErrorBoundary fallback="Error">
    <Header includeMenu={false} />
    <LayoutDiv>
      <Suspense fallback="Loading ...">
        <Outlet />
      </Suspense>
    </LayoutDiv>
  </ErrorBoundary>
);

export default AuthLayout;

const LayoutDiv = styled.div`
  max-width: 1920px;
  margin-inline: auto;
  min-height: 100vh;
  min-height: 100dvh;
  margin-top: 50px;
`;
