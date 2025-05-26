import type { JSX } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

export type InputColorProps = Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'multiple'
  | 'pattern'
  | 'readonly'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
> & {
  /** Always "color" for this input */
  type?: 'color';
};

// Remove: 'autocapitalize', 'height', 'multiple', 'pattern','readonly', 'src',  'step', 'width'
// Valid: 'value'

const InputColor = ({
  type = 'color',
  ...rest
}: InputColorProps): JSX.Element => {
  return <InputBase type={type} {...rest} />;
};

InputColor.displayName = 'InputColor';
export default InputColor;
