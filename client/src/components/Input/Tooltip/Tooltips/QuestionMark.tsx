import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { memo } from 'react';
import { styled } from 'styled-components';

type QuestionMarkProps = {};

const QuestionMark = ({}: QuestionMarkProps): JSX.Element => {
  return (
    <StyledButton>
      <QuestionMarkCircledIcon />
    </StyledButton>
  );
};

QuestionMark.displayName = 'QuestionMark';

export default memo(QuestionMark);

const StyledButton = styled.button`
  height: 15px;
  width: 15px;
  user-select: none;
  :hover {
    background-color: var(--tooltip-border-color);
  }
  :focus {
    box-shadow: 0 0 0 2px black;
  }
`;
