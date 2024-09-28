import InputBase, { InputBaseProps } from './InputBase/InputBase';
import InputEmail from './InputEmail/InputEmail';
import InputNumber from './InputNumber/InputNumber';
import InputPassword from './InputPassword/InputPassword';
import InputTel from './InputTel/InputTel';
import InputText from './InputText/InputText';

type Props = InputBaseProps;

const Input = ({ ...rest }: Props): JSX.Element => {
  return <InputBase id={''} value={''} type={'number'} {...rest} />;
};

Input.Email = InputEmail;
Input.Number = InputNumber;
Input.Password = InputPassword;
Input.Tel = InputTel;
Input.Text = InputText;

export default Input;
