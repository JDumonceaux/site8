import { memo } from 'react';

import InputBase, { type InputBaseProps } from '../Core/InputBase/InputBase';

type InputFileProps = {
  readonly type?: 'file';
} & Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
>;

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

// accept - file - Hint for expected file type in file upload controls
// capture - file - Media capture input method in file upload controls
//      microphone, video, or camera
// multiple - email, file - Boolean. Whether to allow multiple values

const InputFile = ({
  type = 'file',
  ...rest
}: InputFileProps): React.JSX.Element => <InputBase type={type} {...rest} />;

InputFile.displayName = 'InputFile';

export default memo(InputFile);
