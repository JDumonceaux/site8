import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputTextProps = Omit<InputBaseProps, 'type'>;

// Props
// autoComplete
// list
// maxlength
// minlength
// pattern
// placeholder
// readonly
// required
// size
// value
// spellcheck
// autocorrect
// mozactionhint - deprecated use enterkeyhint

const InputText = ({ ...rest }: InputTextProps): JSX.Element => (
  <InputBase type="text" {...rest} />
);

InputText.displayName = 'InputText';

export default memo(InputText);
