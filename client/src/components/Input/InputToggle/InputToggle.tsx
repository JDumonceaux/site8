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
const InputToggle = ({
  type = 'checkbox',
  ...rest
}: Props): React.JSX.Element => {
  const { id, label } = rest;

  return (
    <StyledDiv>
      <StyledLabel htmlFor={id}>
        <input name={id} type={type} {...rest} />
        {label}
        <span />
      </StyledLabel>
    </StyledDiv>
  );
};

InputToggle.displayName = 'InputToggle';

export default memo(InputToggle);

const StyledDiv = styled.div`
  margin-bottom: 16px;
  > label {
    margin-left: 8px;
  }
`;
const StyledLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  > input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  > span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }
  > span:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  > input:checked + span {
    background-color: #2196f3;
  }
  > input:checked + span:before {
    transform: translateX(26px);
  }
`;
