import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputHiddenProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

const InputHidden = ({
  type = 'password',
  ...rest
}: InputHiddenProps): JSX.Element => <InputBase type={type} {...rest} />;

InputHidden.displayName = 'InputHidden';

export default memo(InputHidden);
