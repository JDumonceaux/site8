import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputEmailProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
> & {
  readonly type?: 'email';
};

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: multiple, pattern, value

export const InputEmail: FC<InputEmailProps> = ({
  type = 'email',
  ...rest
}) => <InputBase type={type} {...rest} />;

InputEmail.displayName = 'InputEmail';
export default InputEmail;
