import type { FC } from 'react';

import InputBase, { type InputBaseProps } from './Core/InputBase/InputBase';
import InputCheckbox from './InputCheckbox/InputCheckbox';
import InputEmail from './InputEmail/InputEmail';
import InputNumber from './InputNumber/InputNumber';
import InputPassword from './InputPassword/InputPassword';
import InputSelect from './InputSelect/InputSelect';
import InputTel from './InputTel/InputTel';
import InputText from './InputText/InputText';
import InputToggle from './InputToggle/InputToggle';
import TextArea from './TextArea/TextArea';

type InputComponent = FC<InputBaseProps> & {
  Checkbox: typeof InputCheckbox;
  Email: typeof InputEmail;
  Number: typeof InputNumber;
  Password: typeof InputPassword;
  Select: typeof InputSelect;
  Tel: typeof InputTel;
  Text: typeof InputText;
  TextArea: typeof TextArea;
  Toggle: typeof InputToggle;
};

/** Primary input component with static subtypes for various input types */
export const Input: InputComponent = (props) => <InputBase {...rest} />;

Input.Email = InputEmail;
Input.Number = InputNumber;
Input.Password = InputPassword;
Input.Tel = InputTel;
Input.Text = InputText;
Input.TextArea = TextArea;
Input.Checkbox = InputCheckbox;
Input.Toggle = InputToggle;
Input.Select = InputSelect;

Input.displayName = 'Input';
export default Input;
