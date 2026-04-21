import type { JSX } from 'react';

import type { InputBaseProps } from '../base/input-base/InputBase';
import styled from 'styled-components';

type Props = {
  label: string;
  readonly type?: 'checkbox';
} & Omit<
  InputBaseProps,
  'height' | 'max' | 'min' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
>;

// Checked
// Value

// Implicit aria-role => 'checkbox'
export const InputToggle = ({
  id,
  label,
  type = 'checkbox',
  ...rest
}: Props): JSX.Element | null => (
  <Wrapper>
    <ToggleLabel htmlFor={id}>
      <input
        id={id}
        name={id}
        type={type}
        {...rest}
      />
      {label}
      <Slider />
    </ToggleLabel>
  </Wrapper>
);

InputToggle.displayName = 'InputToggle';
export default InputToggle;

const Wrapper = styled.div`
  margin-bottom: 16px;
  > label {
    margin-inline-start: 8px;
  }
`;

const ToggleLabel = styled.label`
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
    inset: 0;
    background-color: var(--disabled-background);
    transition: background-color 0.4s;
    border-radius: 34px;
  }

  > span::before {
    content: '';
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--color-white);
    transition: transform 0.4s;
    border-radius: 50%;
  }

  > input:checked + span {
    background-color: var(--status-info);
  }

  > input:checked + span::before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span``;
