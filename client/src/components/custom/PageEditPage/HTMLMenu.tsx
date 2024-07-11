import { memo } from 'react';
import { styled } from 'styled-components';

type HTMLMenuProps = {
  readonly onClick: (value: string) => void;
} 

const HTMLMenu = ({onClick} : HTMLMenuProps): JSX.Element => {
 
  return (
    <StyledSubMenu>
    <button
      data-testid="insert-code"
      onClick={() => onClick('code')}
      type="button">
      Code
    </button>
    <button
      data-testid="insert-h2"
      onClick={() => onClick('h2')}
      type="button">
      H2
    </button>
    <button
      data-testid="insert-link"
      onClick={() => onClick('link')}
      type="button">
      Link
    </button>
    <button
      data-testid="insert-ul"
      onClick={() => onClick('ul')}
      type="button">
      UL
    </button>
  </StyledSubMenu>
 );
};

export default memo (HTMLMenu);

const StyledSubMenu = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
`;