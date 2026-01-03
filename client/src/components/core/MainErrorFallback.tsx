import { type JSX, useEffect } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { getUserFriendlyErrorMessage, logError } from '@lib/utils/errorHandler';
import styled from 'styled-components';

export type MainErrorFallbackProps = {
  /** Optional error message to display */
  message?: string;
  /** Optional retry handler (defaults to full page reload) */
  onRetry?: () => void;
} & FallbackProps;

const MainErrorFallback = ({
  error,
  message,
  onRetry,
  resetErrorBoundary,
}: MainErrorFallbackProps): JSX.Element => {
  // Log error when component mounts
  useEffect(() => {
    logError(error, { componentName: 'MainErrorFallback' });
  }, [error]);

  const userMessage = message || getUserFriendlyErrorMessage(error);

  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    } else {
      globalThis.location.reload();
    }
    // Clear the error state so the UI can retry
    resetErrorBoundary();
  };

  return (
    <Container
      aria-describedby={message ? 'error-message' : undefined}
      aria-labelledby="error-title"
      role="alertdialog"
    >
      <Title id="error-title">Oops! Something went wrong.</Title>
      <Message id="error-message">{userMessage}</Message>
      <HelpText>
        If this problem persists, please try refreshing the page or contact
        support.
      </HelpText>
      <RetryButton
        onClick={handleRetry}
        type="button"
      >
        Retry
      </RetryButton>
    </Container>
  );
};

MainErrorFallback.displayName = 'MainErrorFallback';
export default MainErrorFallback;

/* -- styled components -- */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: var(--bg-error, #fef2f2);
  color: var(--text-error, #dc2626);
`;

const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Message = styled.p`
  margin: 0 0 1rem;
  text-align: center;
  max-width: 28rem;
  font-size: 1rem;
`;

const HelpText = styled.p`
  margin: 0 0 1.5rem;
  text-align: center;
  max-width: 28rem;
  font-size: 0.875rem;
  opacity: 0.8;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--btn-error, #dc2626);
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    filter 100ms ease;

  &:hover {
    background-color: var(--btn-error-hover, #b91c1c);
  }

  &:focus-visible {
    outline: 2px solid var(--ring-error, #f87171);
    outline-offset: 2px;
  }
`;
