import type { JSX } from 'react';

import InputBase, { type InputBaseProps } from '../Base/InputBase/InputBase';

export type InputEmailProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
> & {
  readonly type?: 'email';
};

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: multiple, pattern, value

const InputEmail = ({
  type = 'email',
  ...rest
}: InputEmailProps): JSX.Element => {
  return <InputBase type={type} {...rest} />;
};

InputEmail.displayName = 'InputEmail';
export default InputEmail;
