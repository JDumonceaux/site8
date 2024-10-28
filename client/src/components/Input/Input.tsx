import React from 'react';
import InputBase, { InputBaseProps } from './Core/InputBase/InputBase';
import InputEmail from './InputEmail/InputEmail';
import InputNumber from './InputNumber/InputNumber';
import InputPassword from './InputPassword/InputPassword';
import InputTel from './InputTel/InputTel';
import InputText from './InputText/InputText';
import { TextArea } from './TextArea/TextArea';
import InputCheckbox from './InputCheckbox/InputCheckbox';
import InputToggle from './InputToggle/InputToggle';
import InputSelect from './InputSelect/InputSelect';

type Props = InputBaseProps;

const Input = ({ ...rest }: Props): React.JSX.Element => (
  <InputBase {...rest} />
);

Input.Email = InputEmail;
Input.Number = InputNumber;
Input.Password = InputPassword;
Input.Tel = InputTel;
Input.Text = InputText;
Input.TextArea = TextArea;
Input.Checkbox = InputCheckbox;
Input.Toggle = InputToggle;
Input.Select = InputSelect;

export default Input;
