import type { FC } from 'react';

import PhoneAdornment from '../Core/Adornments/PhoneAdornment';
import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

export type InputTelProps = Omit<
  InputBaseProps,
  'height' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
> & {
  readonly type?: 'tel';
};

// Remove: 'height', 'src', 'step', 'width'
// Valid: autocomplete, list, maxlength, minlength, pattern, placeholder, readonly, required, size, value,
// spellcheck, autocorrect, enterkeyhint
// Deprecated: mozactionhint - use enterkeyhint

export const InputTel: FC<InputTelProps> = ({
  autoComplete = 'tel',
  type = 'tel',
  ...rest
}) => (
  <InputBase
    autoComplete={autoComplete}
    startAdornment={<PhoneAdornment />}
    type={type}
    {...rest}
  />
);

InputTel.displayName = 'InputTel';
export default InputTel;
