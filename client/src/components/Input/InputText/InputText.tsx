import { memo, useCallback } from 'react';

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

const InputText = ({
  type = 'text',
  lineId,
  fieldName,
  onChange,
  ...rest
}: Props): React.JSX.Element => {
  const handleChange = useCallback(
    (e) => onChange(lineId, fieldName, e),
    [onChange, lineId, fieldName],
  );

  return <InputBase type={type} onChange={handleChange} {...rest} />;
};

InputText.displayName = 'InputText';

export default memo(InputText);
