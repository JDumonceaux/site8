import React from 'react';
import { styled } from 'styled-components';

type PageTitleProps = {
  readonly title?: React.ReactNode;
};

export const PageTitle = ({ title }: PageTitleProps): JSX.Element | null => {
  if (!title) {
    return null;
  }

  return <StyledElement data-testid="page-title">{title}</StyledElement>;
};

const StyledElement = styled.h1`
  color: var(--palette-page-title);
  font-size: 2.25rem;
`;
