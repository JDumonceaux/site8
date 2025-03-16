import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputDateProps = {
  readonly type?: 'date' | 'datetime-local' | 'month' | 'time' | 'week';
} & Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'height'
  | 'multiple'
  | 'pattern'
  | 'src'
  | 'type'
  | 'width'
>;

// Remove: 'autocapitalize', 'height', 'multiple', 'pattern', 'src', 'width'
// Valid: 'value'

const InputDate = ({
  type = 'date',
  ...rest
}: InputDateProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputDate.displayName = 'InputDate';

export default InputDate;
