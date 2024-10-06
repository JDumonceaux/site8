import { memo } from 'react';

import PhoneAdornment from '../Adornments/PhoneAdornment';
import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';

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
  type = 'tel',
  autoComplete = 'tel',
  ...rest
}: InputTelProps): JSX.Element => (
  <InputBase type={type} startAdornment={<PhoneAdornment />} {...rest} />
);

InputTel.displayName = 'InputTel';

export default memo(InputTel);
