import { memo } from 'react';

import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';

type InputDateProps = {
  readonly type?: 'date' | 'datetime-local' | 'month' | 'time' | 'week';
} & Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'height'
  | 'multiple'
  | 'pattern'
  | 'src'
  | 'type'
  | 'width'
>;

// Remove: 'autocapitalize', 'height', 'multiple', 'pattern', 'src', 'width'
// Valid: 'value'

const InputDate = ({ type = 'date', ...rest }: InputDateProps): JSX.Element => (
  <InputBase type={type} {...rest} />
);

InputDate.displayName = 'InputDate';

export default memo(InputDate);
