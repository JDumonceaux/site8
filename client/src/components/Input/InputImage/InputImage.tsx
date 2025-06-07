import type { JSX } from 'react';

import InputBase, { type InputBaseProps } from '../Base/InputBase/InputBase';

type InputImageProps = Omit<
  InputBaseProps,
  'autocapitalize' | 'pattern' | 'required' | 'step' | 'type' | 'value'
> & {
  readonly type?: 'image';
};

// Remove: 'autocapitalize', 'pattern', 'required', 'step', 'value'

// alt - image - alt attribute for the image type. Required for accessibility
// height - image - Vertical dimension of the image type
// src - image - Address of the image type
// width - image - Horizontal dimension (width) of the image type

export const InputImage = ({
  type = 'image',
  ...rest
}: InputImageProps): JSX.Element | null => <InputBase type={type} {...rest} />;

InputImage.displayName = 'InputImage';
export default InputImage;
