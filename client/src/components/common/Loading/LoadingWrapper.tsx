import { memo, ReactNode } from 'react';
import { styled } from 'styled-components';

type LoadingWrapperProps = {
  readonly children: ReactNode;
  readonly loadingText?: ReactNode;
  readonly isLoading?: boolean;
  readonly error: string | undefined | null;
  readonly fallback?: ReactNode;
};

// If the progress bar is describing the loading progress of a particular region of a page,
// you should use aria - describedby to point to the progress bar, and set the aria -
// busy attribute to true on that region until it has finished loading.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role

const LoadingWrapper = ({
  children,
  isLoading,
  loadingText,
  error,
  fallback,
}: LoadingWrapperProps): JSX.Element => {
  if (isLoading)
    return (
      <StyledLoadingDiv>
        {loadingText ? loadingText : null}
        {fallback ? fallback : null}
      </StyledLoadingDiv>
    );

  if (error)
    return (
      <>
        <StyledErrorDiv>{error}</StyledErrorDiv>
        {children}
      </>
    );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default memo(LoadingWrapper);

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
