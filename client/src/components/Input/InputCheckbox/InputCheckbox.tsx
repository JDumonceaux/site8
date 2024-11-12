import { memo } from 'react';

import styled from 'styled-components';

import type { InputBaseProps } from '../Core/InputBase/InputBase';

type Props = {
  readonly type?: 'checkbox';
} & Omit<
  InputBaseProps,
  'height' | 'max' | 'min' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
>;

// Checked
// Value

// Implicit aria-role => 'checkbox'
const InputCheckbox = ({
  type = 'checkbox',
  ...rest
}: Props): React.JSX.Element => {
  const { id, label } = rest;

  return (
    <StyledDiv>
      <label htmlFor={id}>
        <input name={id} type={type} {...rest} />
        {label}
      </label>
    </StyledDiv>
  );
};

InputCheckbox.displayName = 'InputCheckbox';

export default memo(InputCheckbox);

const StyledDiv = styled.div`
  margin-bottom: 16px;
  input {
    margin-right: 6px;
  }
`;
