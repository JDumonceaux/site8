import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputTextProps = Omit<InputBaseProps, 'type'>;

const InputText = ({ ...rest }: InputTextProps): JSX.Element => (
  <InputBase type="text" {...rest} />
);

InputText.displayName = 'InputText';

export default memo(InputText);
