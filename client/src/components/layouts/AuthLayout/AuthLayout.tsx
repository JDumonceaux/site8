import Header from 'components/core/Header/Header';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const AuthLayout = (): React.JSX.Element => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
  min-height: 100dvh;
  margin-top: 50px;
`;
