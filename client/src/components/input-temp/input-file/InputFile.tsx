import type { JSX } from 'react';

import type { InputBaseProps } from '../base-temp/input-base/InputBase';
import InputBase from '../base-temp/input-base/InputBase';

type InputFileProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'height' | 'pattern' | 'src' | 'step' | 'type' | 'width'
> & {
  /** Always "file" for this input */
  type?: 'file';
};

// Remove: 'autocapitalize', 'height', 'pattern', 'src', 'step', 'width'
// Valid: 'value'

// accept - file - Hint for expected file type in file upload controls
// capture - file - Media capture input method in file upload controls
//           microphone, video, or camera
// multiple - email, file - Boolean. Whether to allow multiple values

export const InputFile = (props: InputFileProps): JSX.Element | null => {
  const { type = 'file', ...rest } = props;
  return (
    <InputBase
      type={type}
      {...rest}
    />
  );
};

InputFile.displayName = 'InputFile';
export default InputFile;
