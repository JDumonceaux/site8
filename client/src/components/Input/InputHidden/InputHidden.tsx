import type { JSX } from 'react';
import type { InputBaseProps } from '../Core/InputBase/InputBase';
import InputBase from '../Core/InputBase/InputBase';

type InputHiddenProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
> & {
  /** Always "password" for this input */
  type?: 'password';
};

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

export const InputHidden = ({
  type = 'password',
  ...rest
}: InputHiddenProps): JSX.Element | null => <InputBase type={type} {...rest} />;

InputHidden.displayName = 'InputHidden';
export default InputHidden;
