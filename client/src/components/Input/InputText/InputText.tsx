import type { FC } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type Props = {
  readonly type?: 'text';
} & Omit<
  InputBaseProps,
  'height' | 'max' | 'min' | 'mozactionhint' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'height', max, min, mozactionhint, 'src', 'step', 'width'
// Valid: autocomplete, maxlength, minlength, pattern, placeholder, readonly, required, size, list, value,
// spellcheck, autocorrect, enterkeyhint
// Deprecated: mozactionhint - use enterkeyhint

// Accessibility
// No aria-role is required. The default, inferred type is 'textbox'.
// With a list, 'combobox' is inferred.

export const InputText: FC<Props> = ({ type = 'text', ...rest }) => (
  <InputBase type={type} {...rest} />
);

InputText.displayName = 'InputText';
export default InputText;
