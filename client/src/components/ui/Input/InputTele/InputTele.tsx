import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputTextProps = {
  readonly type?: 'text';
} & Omit<
  InputBaseProps,
  'type' | 'height' | 'src' | 'step' | 'width' | 'mozactionhint'
>;

// Remove: 'height', 'src', 'step', 'width'
// Valid: autocomplete, list, maxlength, minlength, pattern, placeholder, readonly, required, size, value,
// spellcheck, autocorrect, enterkeyhint
// Deprecated: mozactionhint - use enterkeyhint

const InputText = ({ type = 'text', ...rest }: InputTextProps): JSX.Element => (
  <InputBase type={type} {...rest} />
);

InputText.displayName = 'InputText';

export default memo(InputText);
