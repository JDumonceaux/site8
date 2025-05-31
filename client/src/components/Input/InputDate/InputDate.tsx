import type { JSX } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

// Remove: 'autocapitalize', 'height', 'multiple', 'pattern', 'src', 'width'
// Valid: 'value'
export type InputDateProps = Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'height'
  | 'multiple'
  | 'pattern'
  | 'src'
  | 'type'
  | 'width'
> & {
  /** Supported HTML5 date/time input types */
  type?: 'date' | 'datetime-local' | 'month' | 'time' | 'week';
};

/** Date/time input wrapper */
const InputDate = ({ type = 'date', ...rest }: InputDateProps): JSX.Element => {
  return <InputBase type={type} {...rest} />;
};

InputDate.displayName = 'InputDate';
export default InputDate;
