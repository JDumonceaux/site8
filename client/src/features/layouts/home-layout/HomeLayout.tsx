import { type JSX, memo, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import AppInitializer from '@features/app/app-initializer/AppInitializer';
import styled from 'styled-components';

/**
 * Accessible fallback shown while the page is lazy-loading.
 */
const LoadingFallback = (): JSX.Element => (
  <output
    aria-busy="true"
    aria-live="polite"
  >
    Loading…
  </output>
);

/**
 * Error fallback for any rendering errors in this layout.
 * @param props - FallbackProps from react-error-boundary
 */
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => (
  <ErrorContainer
    aria-live="assertive"
    role="alert"
  >
    <ErrorTitle>Sorry, an unexpected error occurred</ErrorTitle>
    <ErrorMessage>
      {typeof error === 'object' && error && 'message' in error
        ? (error as { message?: string }).message
        : String(error)}
    </ErrorMessage>
    <RetryButton
      type="button"
      onClick={resetErrorBoundary}
    >
      Retry
    </RetryButton>
  </ErrorContainer>
);

/**
 * Layout wrapper for the home (root) routes.
 * Provides error boundary, app initialization, and suspense for lazy-loaded routes.
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
export default memo(HomeLayout);

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

const ErrorTitle = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
`;

const ErrorMessage = styled.pre`
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  background: #fdd;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-wrap: break-word;
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
  transition: background-color 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:focus-visible {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }

  &:active {
    background: #004085;
  }
`;
