import { memo } from 'react';
import InputBase, { InputBaseProps } from '../InputBase/InputBase';

type InputImageProps = {
  readonly type?: 'color';
} & Omit<
  InputBaseProps,
  'type' | 'autocapitalize' | 'pattern' | 'required' | 'step' | 'value'
>;

// Remove: 'autocapitalize', 'pattern', 'required', 'step', 'value'

// alt - image - alt attribute for the image type. Required for accessibility
// height - image - Vertical dimension of the image type
// src - image - Address of the image type
// width - image - Horizontal dimension (width) of the image type

const InputImage = ({
  type = 'color',
  ...rest
}: InputImageProps): JSX.Element => <InputBase type={type} {...rest} />;

InputImage.displayName = 'InputImage';

export default memo(InputImage);
