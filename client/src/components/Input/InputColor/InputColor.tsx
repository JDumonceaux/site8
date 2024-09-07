import { memo } from 'react';

import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputColorProps = {
  readonly type?: 'color';
} & Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'multiple'
  | 'pattern'
  | 'readonly'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

// Remove: 'autocapitalize', 'height', 'multiple', 'pattern','readonly', 'src',  'step', 'width'
// Valid: 'value'

const InputColor = ({
  type = 'color',
  ...rest
}: InputColorProps): JSX.Element => <InputBase type={type} {...rest} />;

InputColor.displayName = 'InputColor';

export default memo(InputColor);
