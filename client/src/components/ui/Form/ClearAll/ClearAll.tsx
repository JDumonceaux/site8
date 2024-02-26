import { MouseEventHandler } from 'react';
import { styled } from 'styled-components';

type ClearAllProps = {
  readonly children?: React.ReactNode;
  readonly onClear: () => void;
};

export const ClearAll = ({ children, onClear }: ClearAllProps): JSX.Element => {
  const handleClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClear();
  };

  return (
    <StyledDivWrapper>
      {children}
      <button onClick={handleClear} type="reset">
        Clear All
      </button>
    </StyledDivWrapper>
  );
};

const StyledDivWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
  border-bottom: 1px solid #888;
  margin-bottom: 6px;
  font-size: 0.75rem;
  & button {
    padding-bottom: 4px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
