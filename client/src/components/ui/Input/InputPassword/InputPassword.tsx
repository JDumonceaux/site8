import { memo, useCallback, useState } from 'react';
import PasswordAdornment from '../Adornments/EyeAdornment';
import PasswordStartAdornment from '../Adornments/PasswordAdornment';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputPasswordProps = {
  readonly type?: 'password';
  readonly autoComplete?: 'current-password' | 'new-password' | 'off';
} & Omit<
  InputBaseProps,
  | 'type'
  | 'autocapitalize'
  | 'height'
  | 'max'
  | 'min'
  | 'src'
  | 'step'
  | 'width'
  | 'autoComplete'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputPassword = ({
  type = 'password',
  autoComplete = 'off',
  ...rest
}: InputPasswordProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePress = useCallback((value: boolean) => {
    setShowPassword(value);
  }, []);

  return (
    <InputBase
      type={showPassword ? 'text' : 'password'}
      autoComplete={autoComplete}
      {...rest}
      endAdornment={
        <PasswordAdornment
          pressed={showPassword}
          onPressedChange={handlePress}
        />
      }
      startAdornment={<PasswordStartAdornment />}
    />
  );
};

InputPassword.displayName = 'InputPassword';

export default memo(InputPassword);
