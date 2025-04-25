import { memo } from 'react';

import styled, { keyframes } from 'styled-components';

type LoadingWrapperProps = {
  readonly children: React.ReactNode;
  readonly error?: unknown;
  readonly fallback?: React.ReactNode;
  readonly isError?: boolean;
  readonly isLoading?: boolean;
  readonly isPending?: boolean;
  readonly isSaving?: boolean;
  readonly loadingText?: React.ReactNode;
};

// If the progress bar is describing the loading progress of a particular region of a page,
// you should use aria - describedby to point to the progress bar, and set the aria -
// busy attribute to true on that region until it has finished loading.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role

const LoadingWrapper = ({
  children,
  error,
  fallback,
  isError,
  isLoading,
  isPending,
  isSaving,
  loadingText,
}: LoadingWrapperProps): React.JSX.Element | React.ReactNode => {
  if (isSaving) {
    return (
      <>
        <ProgressBar />
        <LoadingText>Saving</LoadingText>
      </>
    );
  }

  if (isLoading || isPending) {
    return (
      <>
        <ProgressBar />
        {loadingText ? <LoadingText>{loadingText}</LoadingText> : null}
        {fallback ?? null}
      </>
    );
  } else if (error || isError) {
    if (error instanceof Error) {
      return (
        <>
          <ErrorBar />
          <StyledErrorDiv>{error.message}</StyledErrorDiv>
          {children}
        </>
      );
    } else if (typeof error === 'string') {
      return (
        <>
          <StyledErrorDiv>{error}</StyledErrorDiv>
          {children}
        </>
      );
    }
    return (
      <>
        <StyledErrorDiv>Error: Unknown error encountered.</StyledErrorDiv>
        {children}
      </>
    );
  }
  return children;
};

LoadingWrapper.displayName = 'LoadingWrapper';

export default memo(LoadingWrapper);

const LoadingText = styled.div`
  color: var(--palette-text);
  font-size: 16px;
  margin-top: 8px;
  margin-left: 8px;
`;
const StyledErrorDiv = styled.div`
  color: var(--palette-error);
  font-size: 16px;
  margin-top: 8px;
  margin-left: 8px;
`;
const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
  background-size: 300% 100%;
  animation: ${keyframes`
    0% {background-position: right}
  `} 2s infinite linear;
`;
const ErrorBar = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
`;
