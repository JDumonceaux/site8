import { type JSX, useState } from 'react';

import PasswordAdornment from '../base-temp/adornments-temp/PasswordAdornment';
import ShowAdornment from '../base-temp/adornments-temp/ShowAdornment';
import InputBase, {
  type InputBaseProps,
} from '../base-temp/input-base/InputBase';

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

export const InputPassword = ({
  autoComplete = 'off',
  ...rest
}: InputPasswordProps): JSX.Element | null => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = (pressed: boolean) => {
    setShowPassword(pressed);
  };

  return (
    <InputBase
      type={showPassword ? 'text' : 'password'}
      autoComplete={autoComplete}
      {...rest}
      endAdornment={
        <ShowAdornment
          pressed={showPassword}
          onPressedChange={handlePress}
        />
      }
      startAdornment={<PasswordAdornment />}
    />
  );
};

InputPassword.displayName = 'InputPassword';
export default InputPassword;
