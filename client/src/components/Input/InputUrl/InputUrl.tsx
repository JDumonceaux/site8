import { memo } from 'react';

import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';

type InputUrlProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputUrl = ({
  type = 'password',
  ...rest
}: InputUrlProps): JSX.Element => <InputBase type={type} {...rest} />;

InputUrl.displayName = 'InputUrl';

export default memo(InputUrl);
