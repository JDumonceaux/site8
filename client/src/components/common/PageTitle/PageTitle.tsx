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
    <StyledDivWrapper>
      <div>
        <StyledElement data-testid="page-title">{title}</StyledElement>
      </div>
      {children ? <div>{children}</div> : null}
    </StyledDivWrapper>
  );
};

const StyledElement = styled.h1`
  color: var(--palette-page-title);
  font-size: 2.25rem;
  display: inline-block;
`;
const StyledDivWrapper = styled.div`
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
  button,
  a {
    margin-left: 12px;
  }
`;
