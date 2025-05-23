import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputHiddenProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
> & {
  /** Always "password" for this input */
  type?: 'password';
};

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

export const InputHidden: FC<InputHiddenProps> = ({
  type = 'password',
  ...rest
}) => <InputBase type={type} {...rest} />;

InputHidden.displayName = 'InputHidden';
export default InputHidden;
