import type { JSX, InputHTMLAttributes } from 'react';

export type InputButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value'
> & {
  type?: 'button' | 'reset' | 'submit';
};

const InputButton = ({
  'aria-label': ariaLabel,
  type = 'button',
  ...rest
}: InputButtonProps): JSX.Element => {
  return (
    <input
      {...rest}
      aria-label={ariaLabel ?? 'Not implemented - use a button element'}
      type={type}
      value="Not implemented - use a <button> element"
    />
  );
};

InputButton.displayName = 'InputButton';
export default InputButton;
