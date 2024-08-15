import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputPasswordProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'height' | 'src' | 'step' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputPassword = ({
  type = 'password',
  ...rest
}: InputPasswordProps): JSX.Element => <InputBase type={type} {...rest} />;

InputPassword.displayName = 'InputPassword';

export default memo(InputPassword);
