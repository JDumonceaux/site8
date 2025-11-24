import type { JSX } from 'react';

import type { InputBaseProps } from '../base-temp/input-base/InputBase';
import InputBase from '../base-temp/input-base/InputBase';

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
}: InputHiddenProps): JSX.Element | null => (
  <InputBase
    type={type}
    {...rest}
  />
);

InputHidden.displayName = 'InputHidden';
export default InputHidden;
