import { IconVisibility } from 'components/icons/IconVisibility';
import { IconVisibilityOff } from 'components/icons/IconVisibilityOff';
import { useState } from 'react';
import { styled } from 'styled-components';

import { Tooltip } from '../Tooltip/Tooltip';

type EndAdornmentProps = {
  readonly onClick: () => void;
};

export const EndAdornment = ({ onClick }: EndAdornmentProps): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
    onClick();
  };

  return (
    <StyledButton onClick={handleClick} type="button">
      <Tooltip text={show ? 'Hide password' : 'Show password'}>
        {show ? <IconVisibility /> : <IconVisibilityOff />}
      </Tooltip>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  svg {
    width: 18px;
    height: 18px;
  }
`;
