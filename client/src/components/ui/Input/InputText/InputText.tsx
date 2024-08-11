import { memo } from 'react';
import InputBase, { ImageProps, InputBaseProps } from '../InputBase/InputBase';

// Most attributes have an effect on only
// a specific subset of input types. In addition, the way some
// attributes impact an input depends on the input type,
// impacting different input types in different ways.

type InputTextProps = Omit<InputBaseProps, 'type' | ImageProps>;

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
