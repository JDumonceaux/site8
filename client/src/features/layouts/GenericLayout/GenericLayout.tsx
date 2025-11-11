import { type JSX, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Avatar from '@components/core/Avatar/Avatar';
import Header from '@components/core/Header/Header';
import AppInitializer from '@features/app/AppInitializer/AppInitializer';
import Snackbar from '@features/app/Snackbar/Snackbar';
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
 */
const ErrorFallback = ({
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
 * Layout wrapper for general application pages.
 */
const GenericLayout = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AppInitializer />
    <Header
      avatar={
        <Avatar
          alt="User avatar"
          id="avatar"
          src="/avatar.jpg"
        >
          JD
        </Avatar>
      }
    />
    <Main>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
      <Snackbar />
    </Main>
  </ErrorBoundary>
);

GenericLayout.displayName = 'GenericLayout';
export default GenericLayout;

// Styled Components
const Main = styled.main`
  max-width: 1920px;
  margin: 50px auto 0;
  min-height: 100vh;
  padding: 0 1rem;
  color: var(--palette-text);
  background-color: var(--palette-background);
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
