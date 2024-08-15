import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputEmailProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'height' | 'src' | 'step' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: multiple, pattern, value

const InputEmail = ({
  type = 'password',
  ...rest
}: InputEmailProps): JSX.Element => <InputBase type={type} {...rest} />;

InputEmail.displayName = 'InputEmail';

export default memo(InputEmail);
