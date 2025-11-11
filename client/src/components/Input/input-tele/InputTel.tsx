import type { JSX } from 'react';

import type { InputBaseProps } from '../base/input-base/InputBase';
import PhoneAdornment from '../base/adornments/PhoneAdornment';
import InputBase from '../base/input-base/InputBase';

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

export const InputTel = ({
  autoComplete = 'tel',
  type = 'tel',
  ...rest
}: InputTelProps): JSX.Element | null => (
  <InputBase
    type={type}
    autoComplete={autoComplete}
    startAdornment={<PhoneAdornment />}
    {...rest}
  />
);

InputTel.displayName = 'InputTel';
export default InputTel;
