import type { HTMLAttributes, JSX, ReactNode } from 'react';

import styled from 'styled-components';

type PageTitleProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional trailing content (e.g. actions, breadcrumbs) */
  children?: ReactNode;
  /** Main title text; if absent, component renders nothing */
  title?: ReactNode;
};

/**
 * Renders a page header title with optional trailing content.
 * Returns null if no title is provided.
 */
const PageTitle = ({
  children,
  title,
  ...rest
}: PageTitleProps): JSX.Element | null => {
  if (!title) return null;

  return (
    <StyledWrapper {...rest}>
      <StyledTitle data-testid="page-title">{title}</StyledTitle>
      {children ? <StyledChildren>{children}</StyledChildren> : null}
    </StyledWrapper>
  );
};

export default PageTitle;

const StyledWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0 0.75rem;
  margin-bottom: 1.125rem;
  border-bottom: 1px solid #888;
  background-color: var(--page-background-color);
`;

const StyledTitle = styled.h1`
  flex: 1;
  margin: 0;
  font-size: 2.25rem;
  color: var(--palette-page-title);
`;

const StyledChildren = styled.div`
  display: inline-flex;
  align-items: baseline;

  & > * + * {
    margin-inline-start: 0.75rem;
  }
`;
