import React, { memo } from 'react';

import PhoneAdornment from '../Core/Adornments/PhoneAdornment';
import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputTelProps = {
  readonly type?: 'tel';
} & Omit<
  InputBaseProps,
  'height' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'height', 'src', 'step', 'width'
// Valid: autocomplete, list, maxlength, minlength, pattern, placeholder, readonly, required, size, value,
// spellcheck, autocorrect, enterkeyhint
// Deprecated: mozactionhint - use enterkeyhint

const InputTel = ({
  autoComplete = 'tel',
  type = 'tel',
  ...rest
}: InputTelProps): React.JSX.Element => (
  <InputBase
    autoComplete={autoComplete}
    startAdornment={<PhoneAdornment />}
    type={type}
    {...rest}
  />
);

InputTel.displayName = 'InputTel';

export default memo(InputTel);
