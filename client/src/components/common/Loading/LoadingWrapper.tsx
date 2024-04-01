import { ReactNode } from 'react';
import { styled } from 'styled-components';

type IProps = {
  readonly children: ReactNode;
  readonly isLoading?: boolean;
  readonly error: string | undefined | null;
};

// If the progress bar is describing the loading progress of a particular region of a page,
// you should use aria - describedby to point to the progress bar, and set the aria -
// busy attribute to true on that region until it has finished loading.
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role

export const LoadingWrapper = ({
  children,
  isLoading,
  error,
}: IProps): JSX.Element => {
  if (isLoading) return <StyledLoadingDiv>Loading...</StyledLoadingDiv>;

  if (error) return <StyledErrorDiv>{error}</StyledErrorDiv>;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const StyledLoadingDiv = styled.div`
  color: var(  --palette-text);
}`;

const StyledErrorDiv = styled.div`
  color: var(  --palette-text);
}`;
