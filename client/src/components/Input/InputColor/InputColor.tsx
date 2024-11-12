import { memo } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

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
}: InputColorProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputColor.displayName = 'InputColor';

export default memo(InputColor);
