import React, { memo, useCallback, useState } from 'react';
import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';
import PasswordAdornment from '../Core/Adornments/PasswordAdornment';
import ShowAdornment from '../Core/Adornments/ShowAdornment';

type InputPasswordProps = {
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

const InputPassword = ({
  autoComplete = 'off',
  ...rest
}: InputPasswordProps): React.JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePress = useCallback((value: boolean) => {
    setShowPassword(value);
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

export default memo(InputPassword);
