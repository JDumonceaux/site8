import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

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
}: InputUrlProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputUrl.displayName = 'InputUrl';

export default InputUrl;
