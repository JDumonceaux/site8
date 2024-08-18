import React, { forwardRef, memo } from 'react';
import { styled } from 'styled-components';

type PageTitleProps = {
  readonly children?: React.ReactNode;
  readonly title?: React.ReactNode;
};

/**
 * Renders a page title component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed.
 * @param {ReactNode} props.children - The children elements to be rendered.
 * @returns {JSX.Element | null} The rendered page title component.
 */
const PageTitle = forwardRef<HTMLDivElement, PageTitleProps>(
  ({ children, title }: PageTitleProps, ref): JSX.Element | null => {
    if (!title) {
      return null;
    }

    return (
      <StyledWrapper ref={ref}>
        {title ? (
          <div>
            <StyledElement data-testid="page-title">{title}</StyledElement>
          </div>
        ) : null}
        <StyledChildren>{children}</StyledChildren>
      </StyledWrapper>
    );
  },
);

PageTitle.displayName = 'PageTitle';

export default memo(PageTitle);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  row-gap: 12px;
  width: 100%;
  border-bottom: 1px solid #888;
  padding-bottom: 6px;
  margin-bottom: 18px;
  font-size: 0.75rem;
`;
const StyledElement = styled.h1`
  color: var(--palette-page-title);
  font-size: 2.25rem;
  display: inline-block;
`;
const StyledChildren = styled.div`
  display: inline-flex;
  align-items: baseline;
  button,
  a {
    margin-left: 12px;
  }
`;
