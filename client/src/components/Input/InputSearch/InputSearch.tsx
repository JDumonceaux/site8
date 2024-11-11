import { memo } from 'react';

import InputBase, { InputBaseProps } from '../Core/InputBase/InputBase';

type InputSearchProps = {
  readonly type?: 'text';
} & Omit<InputBaseProps, 'height' | 'src' | 'step' | 'type' | 'width'>;

// Remove: 'height', 'src', 'step', 'width'
// Valid: pattern, value

const InputSearch = ({
  type = 'text',
  ...rest
}: InputSearchProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputSearch.displayName = 'InputSearch';

export default memo(InputSearch);
