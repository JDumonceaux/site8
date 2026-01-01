import { type JSX } from 'react';
import { useFormStatus } from 'react-dom';

import Button from './Button';

type SubmitButtonProps = {
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly id?: string;
  readonly loadingText?: string;
  readonly variant?: 'primary' | 'secondary' | 'tertiary';
};

/**
 * Submit button component that uses React 19's useFormStatus hook
 * to automatically show loading state during form submission.
 * Must be used inside a <form> element.
 */
const SubmitButton = ({
  children = 'Submit',
  disabled = false,
  id,
  loadingText = 'Processing',
  variant = 'primary',
}: SubmitButtonProps): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      id={id}
      type="submit"
      variant={variant}
    >
      {pending ? loadingText : children}
    </Button>
  );
};

SubmitButton.displayName = 'SubmitButton';
export default SubmitButton;
