import { useState, useCallback } from 'react';
import { TextInput } from '../TextInput';
import { TextInputProps } from '../TextInput/TextInput';
import { ShowPasswordButton } from './ShowPasswordButton';

type PasswordFieldType = 'password' | 'text';

type PasswordFieldProps = {
  readonly type?: PasswordFieldType;
  // "For password fields, will hide the \\"show password\\" button",
  readonly hideShowPassword?: boolean;
  // "Sets the text read by screen readers when the password is hidden Default: \\"Password is hidden\\"",
  readonly passwordIsHiddenLabel?: string;
  // "Sets the text read by screen readers when the password is shown Default: \\"Password is shown\\"",
  readonly passwordIsShownLabel?: string;
  // "Set the \`aria-label\` for show password button Default: \\"Show password\\"",
  readonly showPasswordButtonLabel?: string;
  // "Forwarded ref for access to show password button DOM element",
  readonly showPasswordButtonRef?: React.Ref<HTMLButtonElement>;
} & TextInputProps;

export const PasswordField = ({
  autoComplete = 'current-password',
  hideShowPassword = false,
  passwordIsHiddenLabel,
  passwordIsShownLabel,
  showPasswordButtonLabel,
  showPasswordButtonRef,
  hasError,
  type,
  ...rest
}: PasswordFieldProps): JSX.Element => {
  const [localType, setLocalType] = useState<PasswordFieldType>(type);

  const showPasswordOnClick = useCallback(() => {
    if (localType === 'password') {
      setLocalType('text');
    } else {
      setLocalType('password');
    }
  }, [localType]);

  return (
    <TextInput
      autoComplete={autoComplete}
      hasError={hasError}
      inputMode="text"
      outerEndComponent={
        hideShowPassword ? null : (
          <ShowPasswordButton
            hasError={hasError}
            onClick={showPasswordOnClick}
            passwordIsHiddenLabel={passwordIsHiddenLabel}
            passwordIsShownLabel={passwordIsShownLabel}
            ref={showPasswordButtonRef}
            showPasswordButtonLabel={showPasswordButtonLabel}
            type={localType}
          />
        )
      }
      spellCheck="false"
      type={localType}
      {...rest}
    />
  );
};

PasswordField.displayName = 'PasswordField';
