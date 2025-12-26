import type { JSX, ReactNode } from 'react';

import { getUserFriendlyErrorMessage } from '@lib/utils/errorLogger';
import styled, { keyframes } from 'styled-components';

export type LoadingWrapperProps = {
  children: ReactNode;
  error?: unknown;
  fallback?: ReactNode;
  isError?: boolean;
  isLoading?: boolean;
  isPending?: boolean;
  isSaving?: boolean;
  loadingText?: ReactNode;
};

/**
 * Displays a loading, saving, or error state around children content.
 */
const LoadingWrapper = ({
  children,
  error,
  fallback = null,
  isError = false,
  isLoading = false,
  isPending = false,
  isSaving = false,
  loadingText = 'Loading…',
}: LoadingWrapperProps): JSX.Element => {
  // Saving state
  if (isSaving) {
    return (
      <StateContainer
        aria-busy="true"
        aria-label="Saving"
      >
        <ProgressBar aria-valuetext="Saving…" />
        <Message>Saving…</Message>
      </StateContainer>
    );
  }

  // Loading or pending state
  if (isLoading || isPending) {
    const valueText = typeof loadingText === 'string' ? loadingText : undefined;
    return (
      <StateContainer
        aria-busy="true"
        aria-label="Loading"
      >
        <ProgressBar aria-valuetext={valueText} />
        <Message>{loadingText}</Message>
        {fallback}
      </StateContainer>
    );
  }

  // Error state
  if (error || isError) {
    const message = error
      ? getUserFriendlyErrorMessage(error)
      : 'An error occurred.';
    return (
      <StateContainer>
        <ErrorBar
          aria-label="Error"
          role="alert"
        />
        <ErrorMessage>{message}</ErrorMessage>
        {children}
      </StateContainer>
    );
  }

  // Default to children
  return <>{children}</>;
};

LoadingWrapper.displayName = 'LoadingWrapper';
export default LoadingWrapper;

/* --- Styled Components & Animations --- */

const slide = keyframes`
  from { background-position: right; }
  to   { background-position: left; }
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Message = styled.div`
  color: var(--palette-text);
  font-size: 1rem;
  margin: 0.5rem 0 0 0.5rem;
`;

const ErrorMessage = styled(Message)`
  color: var(--palette-error);
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 1.25rem;
  background: #f2f2f2;
  background-image: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%);
  background-size: 300% 100%;
  animation: ${slide} 2s infinite linear;
  border-radius: 0.25rem;
  border: none;
  appearance: none;
  &::-webkit-progress-bar {
    background: #f2f2f2;
    border-radius: 0.25rem;
  }
  &::-webkit-progress-value {
    background: transparent;
  }
  &::-moz-progress-bar {
    background: transparent;
  }
`;

const ErrorBar = styled.div`
  width: 100%;
  height: 1.25rem;
  background: var(--palette-error-light);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;
