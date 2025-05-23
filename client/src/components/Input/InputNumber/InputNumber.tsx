import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputNumberProps = {
  readonly type?: 'number';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern','src', 'step', 'width'
// Valid: 'value'

export const InputNumber: FC<InputNumberProps> = ({
  type = 'number',
  ...rest
}) => <InputBase type={type} {...rest} />;

InputNumber.displayName = 'InputNumber';
export default InputNumber;
