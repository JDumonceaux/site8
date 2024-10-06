import { memo } from 'react';
import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';

type InputNumberProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern','src', 'step', 'width'
// Valid: 'value'

const InputNumber = ({
  type = 'password',
  ...rest
}: InputNumberProps): JSX.Element => <InputBase type={type} {...rest} />;

InputNumber.displayName = 'InputNumber';

export default memo(InputNumber);
