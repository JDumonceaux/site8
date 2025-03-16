import { styled } from 'styled-components';

type LoadingWrapperProps = {
  readonly children: React.ReactNode;
  readonly error: null | string | undefined;
  readonly fallback?: React.ReactNode;
  readonly isLoading?: boolean;
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
  isLoading,
  loadingText,
}: LoadingWrapperProps): React.ReactNode => {
  if (isLoading) {
    return (
      <StyledLoadingDiv>
        {loadingText ?? null}
        {fallback ?? null}
      </StyledLoadingDiv>
    );
  } else if (error) {
    return (
      <>
        <StyledErrorDiv>{error}</StyledErrorDiv>
        {children}
      </>
    );
  }
  return children;
};

LoadingWrapper.displayName = 'LoadingWrapper';

export default LoadingWrapper;

const StyledLoadingDiv = styled.div`
  color: var(--palette-text);
}`;

const StyledErrorDiv = styled.div`
  width: 100%;
  color: var(--palette-error);
  border: 1px solid var(--palette-error);
  padding: 12px;
  margin-bottom: 20px;
}`;
