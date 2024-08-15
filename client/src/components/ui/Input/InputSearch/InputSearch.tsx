import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputSearchProps = {
  readonly type?: 'text';
} & Omit<InputBaseProps, 'type' | 'height' | 'src' | 'step' | 'width'>;

// Remove: 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputSearch = ({
  type = 'text',
  ...rest
}: InputSearchProps): JSX.Element => <InputBase type={type} {...rest} />;

InputSearch.displayName = 'InputSearch';

export default memo(InputSearch);
