import type { JSX } from 'react';
import type { InputBaseProps } from './Base/InputBase/InputBase';

import InputBase from './Base/InputBase/InputBase';
import InputButton from './InputButton/InputButton';
import InputCheckbox from './InputCheckbox/InputCheckbox';
import InputColor from './InputColor/InputColor';
import InputCounter from './InputCounter/InputCounter';
import InputDate from './InputDate/InputDate';
import InputEmail from './InputEmail/InputEmail';
import InputFile from './InputFile/InputFile';
import InputHidden from './InputHidden/InputHidden';
import InputImage from './InputImage/InputImage';
import InputNumber from './InputNumber/InputNumber';
import InputPassword from './InputPassword/InputPassword';
import InputRadio from './InputRadio/InputRadio';
import InputSearch from './InputSearch/InputSearch';
import InputSelect from './InputSelect/InputSelect';
import InputTel from './InputTel/InputTel';
import InputText from './InputText/InputText';
import InputToggle from './InputToggle/InputToggle';
import InputUrl from './InputUrl/InputUrl';
import TextArea from './TextArea/TextArea';

type InputComponent = ((props: InputBaseProps) => JSX.Element | null) & {
  Button: typeof InputButton;
  Checkbox: typeof InputCheckbox;
  Color: typeof InputColor;
  Counter: typeof InputCounter;
  Date: typeof InputDate;
  Email: typeof InputEmail;
  File: typeof InputFile;
  Hidden: typeof InputHidden;
  Image: typeof InputImage;
  Number: typeof InputNumber;
  Password: typeof InputPassword;
  Radio: typeof InputRadio;
  Search: typeof InputSearch;
  Select: typeof InputSelect;
  Tel: typeof InputTel;
  Text: typeof InputText;
  TextArea: typeof TextArea;
  Toggle: typeof InputToggle;
  Url: typeof InputUrl;
};

const Input: InputComponent = (props: InputBaseProps): JSX.Element | null => (
  <InputBase {...props} />
);

Input.Button = InputButton;
Input.Checkbox = InputCheckbox;
Input.Color = InputColor;
Input.Counter = InputCounter;
Input.Date = InputDate;
Input.Email = InputEmail;
Input.File = InputFile;
Input.Hidden = InputHidden;
Input.Image = InputImage;
Input.Number = InputNumber;
Input.Password = InputPassword;
Input.Radio = InputRadio;
Input.Search = InputSearch;
Input.Select = InputSelect;
Input.Tel = InputTel;
Input.Text = InputText;
Input.TextArea = TextArea;
Input.Toggle = InputToggle;
Input.Url = InputUrl;

export default Input;
