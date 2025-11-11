import type { JSX } from 'react';

import type { InputBaseProps } from '../Base/InputBase/InputBase';
import InputBase from '../Base/InputBase/InputBase';

type InputUrlProps = {
  readonly type?: 'url';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

export const InputUrl = ({
  type = 'url',
  ...rest
}: InputUrlProps): JSX.Element | null => (
  <InputBase
    type={type}
    {...rest}
  />
);

InputUrl.displayName = 'InputUrl';
export default InputUrl;
