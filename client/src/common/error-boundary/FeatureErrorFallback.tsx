import type { JSX } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import styled from 'styled-components';

const getErrorDetail = (error: unknown): string => {
  if (!import.meta.env.DEV) {
    return 'Please try again or refresh the page.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const FeatureErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <Container
      aria-live="assertive"
      role="alert"
    >
      <Title>Something went wrong</Title>
      <Message>{getErrorDetail(error)}</Message>
      <RetryButton
        onClick={resetErrorBoundary}
        type="button"
      >
        Try again
      </RetryButton>
    </Container>
  );
};

FeatureErrorFallback.displayName = 'FeatureErrorFallback';
export default FeatureErrorFallback;

const Container = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 36rem;
  background: light-dark(#fee, #4a1a1a);
  color: light-dark(#900, #ff6b6b);
  border-radius: var(--border-radius-md);
`;

const Title = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: var(--font-weight-semibold);
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RetryButton = styled.button`
  margin-top: 1rem;
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
