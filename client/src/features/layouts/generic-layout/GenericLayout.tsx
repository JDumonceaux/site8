import { type JSX, memo, Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Avatar from '@components/core/avatar/Avatar';
import Header from '@components/core/header/Header';
import AppInitializer from '@features/app/app-initializer/AppInitializer';
import Snackbar from '@features/app/snackbar/Snackbar';
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
    <ErrorTitle>Something went wrong</ErrorTitle>
    <ErrorMessage>
      {typeof error === 'object' && error && 'message' in error
        ? (error as { message?: string }).message
        : String(error)}
    </ErrorMessage>
    <RetryButton
      type="button"
      onClick={resetErrorBoundary}
    >
      Try again
    </RetryButton>
  </ErrorContainer>
);

/**
 * Layout wrapper for general application pages.
 * Provides error boundary, app initialization, header with avatar, and suspense for lazy-loaded routes.
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
export default memo(GenericLayout);

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
