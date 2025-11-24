import type { JSX } from 'react';

import type { InputBaseProps } from './base-temp/input-base/InputBase';
import InputBase from './base-temp/input-base/InputBase';
import InputButton from './input-button/InputButton';
import InputCheckbox from './input-checkbox/InputCheckbox';
import InputColor from './input-color/InputColor';
import InputCounter from './input-counter/InputCounter';
import InputDate from './input-date/InputDate';
import InputEmail from './input-email/InputEmail';
import InputFile from './input-file/InputFile';
import InputHidden from './input-hidden/InputHidden';
import InputImage from './input-image/InputImage';
import InputNumber from './input-number/InputNumber';
import InputPassword from './input-password/InputPassword';
import InputRadio from './input-radio/InputRadio';
import InputSearch from './input-search/InputSearch';
import InputSelect from './input-select/InputSelect';
import InputTel from './input-tele/InputTel';
import InputText from './input-text/InputText';
import InputToggle from './input-toggle/InputToggle';
import InputUrl from './input-url/InputUrl';
import TextArea from './text-area/TextArea';

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
