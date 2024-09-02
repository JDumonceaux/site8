import TextInput, { TextInputProps } from '../TextInput/TextInput';

type EmailFieldType = 'email' | 'text';

// Attributes that are not valid or recommended for email fields
type InvalidAttributes =
  | 'accept'
  | 'alt'
  | 'autocapitalize'
  | 'capture'
  | 'dirname'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'min'
  | 'src'
  | 'value'
  | 'width';

// Valid attributes for email fields
// autoComplete
// disabled
// form
// id
// list
// maxlength
// minlength
// multiple
// name
// pattern
// placeholder
// readonly
// required
// size
// type
// value

type EmailFieldProps = {
  // Set Autocomplete
  readonly autoComplete?: 'email' | 'off' | string;
  readonly multiple?: boolean;
  readonly type?: EmailFieldType;
} & Omit<
  TextInputProps,
  'autoComplete' | 'multiple' | 'type' | InvalidAttributes
>;

export const EmailField = ({
  autoComplete = 'email',
  multiple = false,
  type = 'email',
  ...rest
}: EmailFieldProps): JSX.Element => {
  return (
    <TextInput
      autoComplete={autoComplete}
      inputMode="text"
      multiple={multiple}
      spellCheck="false"
      type={type}
      {...rest}
    />
  );
};

EmailField.displayName = 'EmailField';
