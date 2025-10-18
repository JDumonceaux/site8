import { type JSX, Suspense } from 'react';
import AppInitializer from '@features/app/AppInitializer/AppInitializer';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

/** Accessible fallback displayed during lazy-loading */
const LoadingFallback = (): JSX.Element => (
  <div
    role="status"
    aria-live="polite"
  >
    Loading…
  </div>
);

/** Error fallback for unexpected rendering errors */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}): JSX.Element => (
  <ErrorContainer role="alert">
    <p>Sorry, an unexpected error occurred.</p>
    <pre>{error.message}</pre>
    <RetryButton onClick={resetErrorBoundary}>Retry</RetryButton>
  </ErrorContainer>
);

/**
 * Layout wrapper for the home (root) routes.
 */
const HomeLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AppInitializer />
    <Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Main>
  </ErrorBoundary>
);

HomeLayout.displayName = 'HomeLayout';
export default HomeLayout;

// Styled components
const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background: #fee;
  color: #900;
  border-radius: 4px;
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
