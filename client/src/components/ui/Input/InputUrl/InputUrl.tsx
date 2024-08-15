import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputUrlProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'height' | 'src' | 'step' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputUrl = ({
  type = 'password',
  ...rest
}: InputUrlProps): JSX.Element => <InputBase type={type} {...rest} />;

InputUrl.displayName = 'InputUrl';

export default memo(InputUrl);
