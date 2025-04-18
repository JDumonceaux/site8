import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputHiddenProps = {
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

const InputHidden = ({
  type = 'password',
  ...rest
}: InputHiddenProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputHidden.displayName = 'InputHidden';

export default InputHidden;
