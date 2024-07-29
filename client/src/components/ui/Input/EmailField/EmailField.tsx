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
  readonly type?: EmailFieldType;
  readonly multiple?: boolean;
  // Set Autocomplete
  readonly autoComplete?: 'email' | 'off' | string;
} & Omit<
  TextInputProps,
  InvalidAttributes | 'autoComplete' | 'multiple' | 'type'
>;

export const EmailField = ({
  autoComplete = 'current-password',
  hasError,
  multiple = false,
  type = 'email',
  ...rest
}: EmailFieldProps): JSX.Element => {
  return (
    <TextInput
      autoComplete={autoComplete}
      hasError={hasError}
      inputMode="text"
      multiple={multiple}
      spellCheck="false"
      type={type}
      {...rest}
    />
  );
};

EmailField.displayName = 'EmailField';
