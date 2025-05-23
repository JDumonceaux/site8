import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

// Remove: 'height', 'src', 'step', 'width'
// Valid: pattern, value

export type InputSearchProps = Omit<
  InputBaseProps,
  'height' | 'src' | 'step' | 'type' | 'width'
> & {
  readonly type?: 'text';
};

/** Text input optimized for search usage */
export const InputSearch: FC<InputSearchProps> = ({
  type = 'text',
  ...rest
}) => <InputBase type={type} {...rest} />;

InputSearch.displayName = 'InputSearch';
export default InputSearch;
