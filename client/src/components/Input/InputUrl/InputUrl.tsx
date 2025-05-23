import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputUrlProps = {
  readonly type?: 'url';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

export const InputUrl: FC<InputUrlProps> = ({ type = 'url', ...rest }) => (
  <InputBase type={type} {...rest} />
);

InputUrl.displayName = 'InputUrl';
export default InputUrl;
