import React from 'react';
import { styled } from 'styled-components';

type PageTitleProps = {
  readonly title?: React.ReactNode;
  readonly children?: React.ReactNode;
};

export const PageTitle = ({
  title,
  children,
}: PageTitleProps): JSX.Element | null => {
  if (!title) {
    return null;
  }

  return (
    <StyledWrapper>
      <div>
        <StyledElement data-testid="page-title">{title}</StyledElement>
      </div>
      {children ? <StyledChildren>{children}</StyledChildren> : null}
    </StyledWrapper>
  );
};

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
