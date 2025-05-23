import { useState, useCallback, type FC } from 'react';

import PasswordAdornment from '../Core/Adornments/PasswordAdornment';
import ShowAdornment from '../Core/Adornments/ShowAdornment';
import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

export type InputPasswordProps = {
  readonly autoComplete?: 'current-password' | 'new-password' | 'off';
  readonly type?: 'password';
} & Omit<
  InputBaseProps,
  | 'autocapitalize'
  | 'autoComplete'
  | 'height'
  | 'max'
  | 'min'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

// Remove: 'autocapitalize', 'height', 'src', 'step', 'width'
// Valid: pattern, value

export const InputPassword: FC<InputPasswordProps> = ({
  autoComplete = 'off',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = useCallback((pressed: boolean) => {
    setShowPassword(pressed);
  }, []);

  return (
    <InputBase
      autoComplete={autoComplete}
      type={showPassword ? 'text' : 'password'}
      {...rest}
      endAdornment={
        <ShowAdornment onPressedChange={handlePress} pressed={showPassword} />
      }
      startAdornment={<PasswordAdornment />}
    />
  );
};

InputPassword.displayName = 'InputPassword';
export default InputPassword;
