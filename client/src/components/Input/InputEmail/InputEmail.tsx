import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputEmailProps = {
  readonly type?: 'email';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: multiple, pattern, value

const InputEmail = ({
  type = 'email',
  ...rest
}: InputEmailProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputEmail.displayName = 'InputEmail';

export default InputEmail;
