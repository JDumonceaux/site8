import type { FC, InputHTMLAttributes } from 'react';

type InputRadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
> & {
  readonly type?: 'radio';
};

/**
 * Placeholder radio input.
 * Not implemented – use a <button> or native radio input as needed.
 */
export const InputRadio: FC<InputRadioProps> = ({
  type = 'radio',
  ...rest
}) => (
  <input {...rest} type={type} value="Not implemented – use a radio element" />
);

InputRadio.displayName = 'InputRadio';
export default InputRadio;
