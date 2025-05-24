import { memo, type JSX } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

/**
 * Props for the full‑screen error fallback.
 */
export type MainErrorFallbackProps = {
  /** Optional error message to display */
  message?: string;
  /** Optional retry handler (defaults to full page reload) */
  onRetry?: () => void;
} & FallbackProps;

/**
 * Full‑screen error fallback UI.
 *
 * Using a named function with an explicit return type (`JSX.Element`) provides better
 * inference and avoids the implicit `children` prop that comes with `FC<>`.
 */
export function MainErrorFallback({
  resetErrorBoundary,
  message,
  onRetry,
}: MainErrorFallbackProps): JSX.Element {
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
      role="alertdialog">
      <Title id="error-title">Oops! Something went wrong.</Title>
      {message && <Message id="error-message">{message}</Message>}
      <RetryButton onClick={handleRetry} type="button">
        Retry
      </RetryButton>
    </Container>
  );
}

MainErrorFallback.displayName = 'MainErrorFallback';
export default memo(MainErrorFallback);

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
