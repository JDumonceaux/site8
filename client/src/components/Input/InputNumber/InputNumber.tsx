import { memo } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputNumberProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern','src', 'step', 'width'
// Valid: 'value'

const InputNumber = ({
  type = 'password',
  ...rest
}: InputNumberProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputNumber.displayName = 'InputNumber';

export default memo(InputNumber);
