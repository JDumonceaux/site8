import type { JSX } from 'react';
import type { FallbackProps } from 'react-error-boundary';

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
 * Error fallback for any rendering errors in layouts.
 * @param props - FallbackProps from react-error-boundary
 */
export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => (
  <ErrorContainer
    aria-live="assertive"
    role="alert"
  >
    <ErrorTitle>Something went wrong</ErrorTitle>
    <ErrorMessage>
      {error && typeof error === 'object' && 'message' in error
        ? (error as { message?: string }).message
        : String(error)}
    </ErrorMessage>
    <RetryButton
      onClick={resetErrorBoundary}
      type="button"
    >
      Try again
    </RetryButton>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background: light-dark(#fee, #4a1a1a);
  color: light-dark(#900, #ff6b6b);
  border-radius: var(--border-radius-md);
`;

const ErrorTitle = styled.p`
  font-weight: var(--font-weight-semibold);
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
`;

const ErrorMessage = styled.pre`
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  background: light-dark(#fdd, #3a1515);
  border-radius: var(--border-radius-md);
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
  background: var(--status-info);
  color: var(--text-inverted-color);
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background: light-dark(#0056b3, #1976d2);
  }

  &:active {
    background: light-dark(#004085, #1565c0);
  }
`;
