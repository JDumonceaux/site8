import React from 'react';
import InputBase, { InputBaseProps } from './Core/InputBase/InputBase';
import InputEmail from './InputEmail/InputEmail';
import InputNumber from './InputNumber/InputNumber';
import InputPassword from './InputPassword/InputPassword';
import InputTel from './InputTel/InputTel';
import InputText from './InputText/InputText';
import { TextArea } from './TextArea/TextArea';

type Props = InputBaseProps;

const Input = ({ ...rest }: Props): React.JSX.Element => <InputBase id={''} type={'number'} value={''} {...rest} />;

Input.Email = InputEmail;
Input.Number = InputNumber;
Input.Password = InputPassword;
Input.Tel = InputTel;
Input.Text = InputText;
Input.TextArea = TextArea;

export default Input;
