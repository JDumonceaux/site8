import { type JSX, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Header from '@components/core/Header/Header';
import styled from 'styled-components';

/**
 * Accessible fallback shown while the page is lazy-loading.
 */
export const LoadingFallback = (): JSX.Element => (
  <output
    aria-busy="true"
    aria-live="polite"
  >
    Loading…
  </output>
);

/**
 * Error fallback for any rendering errors in this layout.
 */
export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}): JSX.Element => (
  <ErrorContainer role="alert">
    <p>Something went wrong.</p>
    <pre>{error.message}</pre>
    <RetryButton onClick={resetErrorBoundary}>Try again</RetryButton>
  </ErrorContainer>
);

/**
 * Layout wrapper for authentication-related routes.
 */
const AuthLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Header />
    <Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Main>
  </ErrorBoundary>
);

AuthLayout.displayName = 'AuthLayout';
export default AuthLayout;

// Styled Components
const Main = styled.main`
  max-width: 1920px;
  margin: 50px auto 0;
  min-height: 100dvh;
  padding: 0 1rem;
`;

const ErrorContainer = styled.div`
  padding: 1rem;
  background: #fee;
  color: #900;
  border-radius: 4px;
  margin: 2rem auto;
  max-width: 600px;
`;

const RetryButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background: #0056b3;
  }
`;
