import type { FC, InputHTMLAttributes } from 'react';

export type InputButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
> & {
  /** Button type */
  type?: 'button' | 'reset' | 'submit';
};

/**
 * A placeholder input button that instructs to use a <button> element instead.
 */
export const InputButton: FC<InputButtonProps> = ({
  'aria-label': ariaLabel,
  type = 'button',
  ...rest
}) => (
  <input
    {...rest}
    aria-label={ariaLabel ?? 'Not implemented - use a button element'}
    type={type}
    value="Not implemented - use a <button> element"
  />
);

InputButton.displayName = 'InputButton';
export default InputButton;
