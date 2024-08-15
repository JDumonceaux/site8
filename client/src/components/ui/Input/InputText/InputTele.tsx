import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputTeleProps = {
  readonly type?: 'tele';
} & Omit<
  InputBaseProps,
  'type' | 'height' | 'src' | 'step' | 'width' | 'mozactionhint'
>;

// Remove: 'height', 'src', 'step', 'width'
// Valid: autocomplete, list, maxlength, minlength, pattern, placeholder, readonly, required, size, value,
// spellcheck, autocorrect, enterkeyhint
// Deprecated: mozactionhint - use enterkeyhint

const InputTele = ({ type = 'tele', ...rest }: InputTeleProps): JSX.Element => (
  <InputBase type={type} {...rest} />
);

InputTele.displayName = 'InputTele';

export default memo(InputTele);
