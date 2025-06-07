import type { JSX } from 'react';
import type { InputBaseProps } from '../Base/InputBase/InputBase';
import InputBase from '../Base/InputBase/InputBase';

type InputNumberProps = {
  readonly type?: 'number';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern','src', 'step', 'width'
// Valid: 'value'

export const InputNumber = ({
  type = 'number',
  ...rest
}: InputNumberProps): JSX.Element | null => <InputBase type={type} {...rest} />;

InputNumber.displayName = 'InputNumber';
export default InputNumber;
