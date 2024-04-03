import { PageTitle } from 'components/common';
import React, { MouseEventHandler } from 'react';
import { styled } from 'styled-components';
import { StyledPlainButton } from '../StyledPlainButton/StyledPlainButton';

type ClearAllProps = {
  readonly title?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly onClear: () => void;
};

export const ClearAll = ({
  title,
  children,
  onClear,
}: ClearAllProps): JSX.Element => {
  const handleClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClear();
  };

  return (
    <StyledDivWrapper>
      <div>
        <PageTitle title={title} />
      </div>
      <div>
        {children}
        <StyledPlainButton
          data-testid="button-clear"
          onClick={handleClear}
          type="reset">
          Clear All
        </StyledPlainButton>
      </div>
    </StyledDivWrapper>
  );
};

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
