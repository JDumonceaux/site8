import type { JSX } from 'react';

import type { InputBaseProps } from '../base-temp/input-base/InputBase';
import InputBase from '../base-temp/input-base/InputBase';

// Remove: 'height', 'src', 'step', 'width'
// Valid: pattern, value

export type InputSearchProps = Omit<
  InputBaseProps,
  'height' | 'src' | 'step' | 'type' | 'width'
> & {
  readonly type?: 'text';
};

/** Text input optimized for search usage */
export const InputSearch = ({
  type = 'text',
  ...rest
}: InputSearchProps): JSX.Element | null => (
  <InputBase
    type={type}
    {...rest}
  />
);

InputSearch.displayName = 'InputSearch';
export default InputSearch;
