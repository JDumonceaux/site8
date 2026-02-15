import type { InputHTMLAttributes, JSX } from 'react';

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
export const InputRadio = ({
  type = 'radio',
  ...rest
}: InputRadioProps): JSX.Element | null => (
  <input
    {...rest}
    type={type}
    value="Not implemented – use a radio element"
  />
);

InputRadio.displayName = 'InputRadio';
export default InputRadio;
